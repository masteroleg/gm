#!/usr/bin/env python3
"""Deterministic migration of Claude session JSONL to BMAD knowledge fragments.

This script is intentionally stdlib-only and does NOT attempt to generate index.md.
After migration, run BMAD `/index-docs` on:
  - _bmad-output/knowledge/
  - _bmad-output/knowledge/fragments/
  - _bmad-output/planning-artifacts/
  - _bmad-output/solutioning/adrs/

Notes on determinism:
- Fragment contents are generated deterministically from inputs.
- Run metadata (staging snapshot folder names, report timestamps) can vary by run.
"""

from __future__ import annotations

import argparse
import dataclasses
import datetime as dt
import difflib
import hashlib
import json
import os
import re
import shutil
import sys
from pathlib import Path
from typing import Any, Iterable


AUTO_MARKER = "<!-- AUTO-GENERATED: scripts/migrate_sessions.py -->"


NOISE_TYPES = {
    "progress",
    "file-history-snapshot",
    "trace",
    "tool",
    "queue-operation",
}


CANON_TAGS = ["PRD", "Architecture", "QA", "Release", "Sales", "Process", "Other"]


INPUT_ARCHIVE_FILES = [
    "UX_DESIGN_SUMMARY.txt",
    "UX_DESIGN_LANDING_PAGE.md",
    "DESIGN_EXTRACTION_INDEX.md",
    "Analysis and Improvement Plan.md",
]


@dataclasses.dataclass
class ParseError:
    file: str
    line_no: int
    reason: str
    snippet: str


@dataclasses.dataclass
class Turn:
    session_id: str
    role: str
    timestamp: str | None
    uuid: str | None
    text: str


def utc_now_iso() -> str:
    return dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()


def parse_iso8601(s: str) -> dt.datetime | None:
    if not s:
        return None
    try:
        # Accept Z suffix.
        if s.endswith("Z"):
            s = s[:-1] + "+00:00"
        return dt.datetime.fromisoformat(s)
    except Exception:
        return None


def safe_relpath(p: Path, base: Path) -> str:
    try:
        rel = p.resolve().relative_to(base.resolve())
        return str(rel).replace("\\", "/")
    except Exception:
        # Fall back to basename only (still relative).
        return p.name


def iter_jsonl(path: Path, errors: list[ParseError]) -> Iterable[dict[str, Any]]:
    with path.open("r", encoding="utf-8") as f:
        for i, line in enumerate(f, start=1):
            raw = line.strip()
            if not raw:
                continue
            try:
                obj = json.loads(raw)
            except Exception as e:
                errors.append(
                    ParseError(
                        file=str(path).replace("\\", "/"),
                        line_no=i,
                        reason=f"json_decode_error: {type(e).__name__}",
                        snippet=raw[:200],
                    )
                )
                continue
            if isinstance(obj, dict):
                yield obj
            else:
                errors.append(
                    ParseError(
                        file=str(path).replace("\\", "/"),
                        line_no=i,
                        reason="non_object_json",
                        snippet=raw[:200],
                    )
                )


def is_noise_record(rec: dict[str, Any]) -> bool:
    t = str(rec.get("type") or "").lower()
    return t in NOISE_TYPES


def extract_text(content: Any) -> str:
    """Extract plain text from Claude message content.

    Handles:
    - string
    - list of blocks (text/tool_result/thinking)
    - nested structures
    """
    if content is None:
        return ""
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts: list[str] = []
        for b in content:
            if b is None:
                continue
            if isinstance(b, str):
                if b.strip():
                    parts.append(b)
                continue
            if isinstance(b, dict):
                t = str(b.get("type") or "").lower()
                if t == "thinking":
                    continue
                if t == "text" and isinstance(b.get("text"), str):
                    parts.append(b["text"])
                    continue
                if t == "tool_result":
                    parts.append(extract_text(b.get("content")))
                    continue
                if isinstance(b.get("text"), str):
                    parts.append(b["text"])
                elif b.get("content") is not None:
                    parts.append(extract_text(b.get("content")))
        return "\n".join([p for p in (x.strip() for x in parts) if p])
    if isinstance(content, dict):
        if isinstance(content.get("text"), str):
            return content["text"]
        if content.get("content") is not None:
            return extract_text(content.get("content"))
    return ""


def get_role(rec: dict[str, Any]) -> str:
    # Common fields: rec.type, rec.message.role
    t = str(rec.get("type") or "").lower()
    if t in ("user", "assistant", "system"):
        return t
    msg = rec.get("message")
    if isinstance(msg, dict):
        role = str(msg.get("role") or "").lower()
        if role in ("user", "assistant", "system"):
            return role
    return ""


def get_session_id(rec: dict[str, Any], fallback: str) -> str:
    for k in ("sessionId", "session_id"):
        v = rec.get(k)
        if isinstance(v, str) and v.strip():
            return v.strip()
    return fallback


def get_meta(rec: dict[str, Any]) -> tuple[str | None, str | None]:
    msg = rec.get("message")
    if not isinstance(msg, dict):
        msg = {}
    uuid = msg.get("uuid") or rec.get("uuid") or rec.get("message_id") or rec.get("id")
    ts = (
        rec.get("timestamp")
        or msg.get("timestamp")
        or rec.get("created_at")
        or rec.get("time")
    )
    uuid_s = uuid if isinstance(uuid, str) else None
    ts_s = ts if isinstance(ts, str) else None
    return uuid_s, ts_s


def slugify(s: str, max_len: int = 60) -> str:
    s = s.strip().lower()
    # Keep ASCII-ish slug.
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    if not s:
        return "session"
    return s[:max_len].strip("-")


def stable_id_for_file(path: Path, repo_root: Path) -> str:
    """Stable short id used to avoid filename collisions."""
    rel = safe_relpath(path, repo_root)
    return hashlib.sha1(rel.encode("utf-8")).hexdigest()[:8]


def choose_tags(text: str) -> list[str]:
    lt = text.lower()
    tags: list[str] = []

    def add(tag: str):
        if tag in CANON_TAGS and tag not in tags:
            tags.append(tag)

    if any(k in lt for k in ("prd", "product requirements", "brief", "epic", "scope")):
        add("PRD")
    if any(k in lt for k in ("architecture", "adr", "decision record", "design doc")):
        add("Architecture")
    if any(k in lt for k in ("test", "jest", "playwright", "e2e", "qa")):
        add("QA")
    if any(k in lt for k in ("release", "deploy", "github pages", "production")):
        add("Release")
    if any(k in lt for k in ("pricing", "sales", "leads", "gtm", "business")):
        add("Sales")
    if any(
        k in lt for k in ("process", "workflow", "migration", "pipeline", "husky", "ci")
    ):
        add("Process")
    if not tags:
        add("Other")
    return tags


def extract_references(text: str) -> list[str]:
    # Enhanced reference extraction: filter out repo-local/system paths and normalize to ./rel paths
    refs: list[str] = []
    for m in re.finditer(
        r"([_A-Za-z0-9][\\w./\\-]+\\.(md|js|mjs|py|json|yml|yaml|html|css))", text
    ):
        p = m.group(1)
        p = p.replace("\\", "/")
        if p.startswith("Users/"):
            continue
        if "genu.im" in p or "w/genu.im/gm" in p:
            continue
        if p.startswith("/"):
            continue
        lp = p.lower()
        if lp.startswith("file:"):
            continue
        if re.match(r"^[a-z]:/", p):
            continue
        if "//" in p:
            continue
        if not (p.startswith("./") or p.startswith("../")):
            p = "./" + p
        if p not in refs:
            refs.append(p)
    return refs


def extract_references2(text: str) -> list[str]:
    # Enhanced reference extraction: filter out repo-local/system paths and normalize to ./rel paths
    refs: list[str] = []
    for m in re.finditer(
        r"([_A-Za-z0-9][\\w./\\-]+\\.(md|js|mjs|py|json|yml|yaml|html|css))",
        text,
    ):
        p = m.group(1)
        p = p.replace("\\", "/")
        # Ignore repo-local users/hosts
        if p.startswith("Users/"):
            continue
        if "genu.im" in p or "w/genu.im/gm" in p:
            continue
        if p.startswith("/"):
            continue
        lp = p.lower()
        if lp.startswith("file:"):
            continue
        if re.match(r"^[a-z]:/", p):
            continue
        if "://" in p:
            continue
        if not (p.startswith("./") or p.startswith("../")):
            p = "./" + p
        if p not in refs:
            refs.append(p)
    return refs


def extract_questions(text: str) -> list[str]:
    qs: list[str] = []
    # Split into lines; collect lines with '?' but avoid URLs.
    for line in text.splitlines():
        if "?" not in line:
            continue
        if "http://" in line or "https://" in line:
            continue
        q = re.sub(r"\s+", " ", line.strip())
        q = q.strip("- ")
        if len(q) < 6:
            continue
        # Ensure it ends with '?'
        if not q.endswith("?"):
            continue
        if q not in qs:
            qs.append(q)
    return qs


def extract_task_lines(text: str) -> list[str]:
    # Prefer explicit checkboxes from text.
    tasks: list[str] = []
    for line in text.splitlines():
        m = re.match(r"^\s*-\s*\[ \]\s+(.+)$", line)
        if not m:
            continue
        item = re.sub(r"\s+", " ", m.group(1).strip())
        if item and item not in tasks:
            tasks.append(item)
    return tasks


def extract_decision_lines(text: str, max_items: int = 12) -> list[str]:
    lines: list[str] = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            continue
        lt = line.lower()
        if (
            lt.startswith("decision")
            or lt.startswith("recommendation")
            or lt.startswith("key difference")
            or lt.startswith("critical")
        ):
            lines.append(line)
            continue
        # Ukrainian/Russian cues (kept ASCII via unicode escapes)
        if (
            "\u0440\u0435\u0448\u0435\u043d\u0438\u0435" in lt
            or "\u0432\u0438\u0440\u0456\u0448\u0435\u043d\u043e" in lt
        ):
            lines.append(line)
            continue
        if len(lines) >= max_items:
            break
    # Dedup similar lines (simple)
    out: list[str] = []
    for l in lines:
        if any(difflib.SequenceMatcher(None, l, x).ratio() >= 0.92 for x in out):
            continue
        out.append(l)
        if len(out) >= max_items:
            break
    return out


def format_yaml_list(items: list[str]) -> str:
    return "[" + ", ".join(items) + "]"


def yaml_quote(s: str) -> str:
    # JSON string syntax is valid YAML scalar.
    return json.dumps(s, ensure_ascii=True)


def build_fragment(
    *,
    source_file_rel: str,
    session_id: str,
    approx_time: str | None,
    tags: list[str],
    title: str,
    summary_bullets: list[str],
    decisions: list[str],
    tasks: list[str],
    open_questions: list[str],
    references: list[str],
) -> str:
    # Enforce no empty placeholders; keep sections present.
    if not summary_bullets:
        summary_bullets = [
            "Session migrated deterministically; see source for full context."
        ]
    if not decisions:
        decisions = ["No explicit decisions/facts extracted deterministically."]
    if not tasks:
        tasks_md = "- [ ] No explicit tasks extracted deterministically."
    else:
        tasks_md = "\n".join([f"- [ ] {t}" for t in tasks])
    if not open_questions:
        open_questions = ["No explicit open questions extracted deterministically."]
    if not references:
        references = [source_file_rel]

    approx_yaml = "null" if not approx_time else yaml_quote(approx_time)

    frontmatter = (
        "---\n"
        "source:\n"
        "  type: claude-session\n"
        f"  file: {yaml_quote(source_file_rel)}\n"
        f"  session_id: {yaml_quote(session_id)}\n"
        f"  approx_time: {approx_yaml}\n"
        f"tags: {format_yaml_list(tags)}\n"
        "---\n"
    )

    md = [
        AUTO_MARKER,
        frontmatter,
        f"# {title}",
        "",
        "## Summary",
        "\n".join([f"- {b}" for b in summary_bullets[:3]]),
        "",
        "## Key Decisions / Facts",
        "\n".join([f"- {d}" for d in decisions]),
        "",
        "## Requirements / Tasks",
        tasks_md,
        "",
        "## Open Questions",
        "\n".join([f"- {q}" for q in open_questions]),
        "",
        "## References",
        "\n".join([f"- {r}" for r in references]),
        "",
    ]
    # Write as UTF-8 markdown.
    return "\n".join(md)


def read_text_if_exists(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except Exception:
        return ""


def ensure_dir(path: Path, dry_run: bool) -> None:
    if path.exists():
        return
    if dry_run:
        return
    path.mkdir(parents=True, exist_ok=True)


def read_existing_marker(path: Path) -> bool:
    try:
        head = path.read_text(encoding="utf-8")[:2048]
        return AUTO_MARKER in head
    except Exception:
        return False


def write_file_safe(
    path: Path,
    content: str,
    *,
    dry_run: bool,
    force: bool,
    backups_root: Path | None,
    backups_base: Path | None,
) -> str:
    """Write file with safety rules.

    Returns: "created" | "updated" | "skipped"
    """
    if path.exists():
        if not force:
            return "skipped"
        # force: only overwrite if previous file was auto-generated
        if not read_existing_marker(path):
            return "skipped"
        if backups_root is not None and not dry_run:
            # IMPORTANT (Windows): never embed an absolute path (e.g. "D:/...")
            # under backups_root, otherwise CopyFile2 fails.
            if backups_base is not None:
                rel = safe_relpath(path, backups_base)
            else:
                rel = path.name
            backup_path = backups_root / Path(rel)
            backup_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, backup_path)
        if dry_run:
            return "updated"
        path.write_text(content, encoding="utf-8")
        return "updated"
    else:
        if dry_run:
            return "created"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
        return "created"


def move_to_archive(src: Path, dst: Path, *, dry_run: bool) -> str:
    if not src.exists():
        return "skipped"
    if dry_run:
        return "moved"
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(src), str(dst))
    return "moved"


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Migrate Claude JSONL sessions into BMAD knowledge fragments"
    )
    ap.add_argument(
        "--sessions",
        default="migration/raw/.claude-sessions",
        help="Path to .claude-sessions directory",
    )
    ap.add_argument(
        "--out",
        default="_bmad-output",
        help="Output root directory (default: _bmad-output)",
    )
    ap.add_argument(
        "--dry-run", action="store_true", help="Report only; do not write or move files"
    )
    ap.add_argument(
        "--force",
        action="store_true",
        help="Apply writes into --out (overwriting only auto-generated files)",
    )
    ap.add_argument(
        "--snapshot",
        action="store_true",
        help="Use a timestamped staging folder instead of stable '.staging/.../latest'",
    )
    ap.add_argument(
        "--run-id",
        default=None,
        help="Custom staging run id (default: 'latest' unless --snapshot)",
    )
    ap.add_argument(
        "--since",
        default=None,
        help="Process only sessions with max timestamp >= since (ISO8601 or YYYY-MM-DD)",
    )
    ap.add_argument(
        "--report", action="store_true", help="Write knowledge/migration-report.md"
    )
    ap.add_argument(
        "--archive-inputs",
        action="store_true",
        help="Move curated repo-root inputs into _archive",
    )
    ap.add_argument(
        "--cleanup-legacy",
        action="store_true",
        help="Move legacy non-canon files into _archive/legacy",
    )
    args = ap.parse_args()

    repo_root = Path(__file__).resolve().parents[1]
    sessions_dir = (
        (repo_root / args.sessions).resolve()
        if not os.path.isabs(args.sessions)
        else Path(args.sessions)
    )
    out_root = (
        (repo_root / args.out).resolve()
        if not os.path.isabs(args.out)
        else Path(args.out)
    )

    if not sessions_dir.exists() or not sessions_dir.is_dir():
        print(f"ERROR: sessions dir not found: {sessions_dir}", file=sys.stderr)
        return 2

    # Staging by default.
    staging_root = out_root / ".staging" / "migrate_sessions"
    if args.force:
        write_root = out_root
    else:
        run_id = args.run_id
        if not run_id:
            run_id = (
                dt.datetime.now(dt.timezone.utc).strftime("%Y%m%d_%H%M%S")
                if args.snapshot
                else "latest"
            )
        write_root = staging_root / run_id

    knowledge_fragments_dir = write_root / "knowledge" / "fragments"
    archive_inputs_dir = out_root / "_archive" / "migration-inputs"
    archive_legacy_dir = out_root / "_archive" / "legacy"
    backups_dir = (
        out_root
        / "_archive"
        / "backups"
        / dt.datetime.now(dt.timezone.utc).strftime("%Y%m%d_%H%M%S")
    )
    backups_root = backups_dir if args.force else None

    ensure_dir(knowledge_fragments_dir, args.dry_run)

    parse_errors: list[ParseError] = []
    jsonl_files = sorted(sessions_dir.glob("*.jsonl"))

    since_dt: dt.datetime | None = None
    if args.since:
        since_dt = parse_iso8601(args.since)
        if since_dt is None:
            # allow YYYY-MM-DD
            try:
                since_dt = dt.datetime.strptime(args.since, "%Y-%m-%d").replace(
                    tzinfo=dt.timezone.utc
                )
            except Exception:
                print(f"ERROR: invalid --since value: {args.since}", file=sys.stderr)
                return 2

    # Supplemental curated docs (optional): used for tag enrichment.
    curated_text_parts: list[str] = []
    for name in INPUT_ARCHIVE_FILES:
        t = read_text_if_exists(repo_root / name)
        if not t:
            t = read_text_if_exists(out_root / "_archive" / "migration-inputs" / name)
        if t:
            curated_text_parts.append(t)
    curated_text = "\n".join(curated_text_parts)

    stats = {
        "jsonl_found": len(jsonl_files),
        "lines_read": 0,
        "parse_errors": 0,
        "sessions_processed": 0,
        "sessions_skipped_since": 0,
        "fragments_created": 0,
        "fragments_updated": 0,
        "fragments_skipped": 0,
        "inputs_archived": 0,
        "legacy_archived": 0,
    }

    created_or_updated: list[str] = []

    for jsonl in jsonl_files:
        session_fallback = jsonl.stem
        turns: list[Turn] = []
        min_ts: dt.datetime | None = None
        max_ts: dt.datetime | None = None

        # First pass: parse and collect turns.
        for rec in iter_jsonl(jsonl, parse_errors):
            stats["lines_read"] += 1
            if not isinstance(rec, dict):
                continue
            if is_noise_record(rec):
                continue
            role = get_role(rec)
            if not role:
                continue
            session_id = get_session_id(rec, session_fallback)
            uuid, ts = get_meta(rec)
            msg = rec.get("message")
            content = None
            if isinstance(msg, dict):
                content = msg.get("content")
            else:
                content = rec.get("content")
            text = extract_text(content).strip()
            if not text:
                continue
            turns.append(
                Turn(
                    session_id=session_id, role=role, timestamp=ts, uuid=uuid, text=text
                )
            )
            if ts:
                dt_ts = parse_iso8601(ts)
                if dt_ts is not None:
                    if min_ts is None or dt_ts < min_ts:
                        min_ts = dt_ts
                    if max_ts is None or dt_ts > max_ts:
                        max_ts = dt_ts

        # Fallback timestamps: use file mtime when session has none.
        try:
            file_dt = dt.datetime.fromtimestamp(
                jsonl.stat().st_mtime, tz=dt.timezone.utc
            )
        except Exception:
            file_dt = None
        if file_dt is not None:
            if min_ts is None:
                min_ts = file_dt
            if max_ts is None:
                max_ts = file_dt

        # since filter
        if since_dt is not None and max_ts is not None and max_ts < since_dt:
            stats["sessions_skipped_since"] += 1
            continue

        stats["sessions_processed"] += 1

        # Build content corpus.
        all_text = "\n\n".join([t.text for t in turns])
        # Tag selection enriched by curated docs (but still deterministic).
        tags = choose_tags(all_text + "\n" + curated_text)

        approx_time = None
        if min_ts is not None:
            approx_time = (
                min_ts.astimezone(dt.timezone.utc).replace(microsecond=0).isoformat()
            )

        # Title: first non-meta user turn first line (fallback to session id).
        title = f"Session {session_fallback}"
        for t in turns:
            if t.role != "user":
                continue
            first = t.text.strip().splitlines()[0].strip()
            first = re.sub(r"\s+", " ", first)
            if len(first) >= 8:
                title = first[:120]
                break

        slug = slugify(title)
        sid = stable_id_for_file(jsonl, repo_root)
        if min_ts is not None:
            fname = (
                min_ts.astimezone(dt.timezone.utc).strftime("%Y%m%d_%H%M")
                + f"_{slug}-{sid}.md"
            )
        else:
            fname = f"{session_fallback}_{slug}-{sid}.md"

        source_file_rel = safe_relpath(jsonl, repo_root)

        decisions = extract_decision_lines(all_text)
        tasks = extract_task_lines(all_text)
        open_questions = extract_questions(all_text)
        references = extract_references2(all_text)
        if source_file_rel not in references:
            references.insert(0, source_file_rel)

        summary: list[str] = []
        if decisions and decisions[0]:
            summary.append(decisions[0])
        if tasks:
            summary.append(f"Tasks found: {len(tasks)}")
        if open_questions:
            summary.append(f"Open questions: {len(open_questions)}")

        md = build_fragment(
            source_file_rel=source_file_rel,
            session_id=turns[0].session_id if turns else session_fallback,
            approx_time=approx_time,
            tags=tags,
            title=title,
            summary_bullets=summary,
            decisions=decisions,
            tasks=tasks,
            open_questions=open_questions,
            references=references,
        )

        target_path = knowledge_fragments_dir / fname
        result = write_file_safe(
            target_path,
            md,
            dry_run=args.dry_run,
            force=args.force,
            backups_root=backups_root,
            backups_base=out_root,
        )
        if result == "created":
            stats["fragments_created"] += 1
            created_or_updated.append(str(target_path))
        elif result == "updated":
            stats["fragments_updated"] += 1
            created_or_updated.append(str(target_path))
        else:
            stats["fragments_skipped"] += 1

    stats["parse_errors"] = len(parse_errors)

    # Legacy cleanup (optional)
    legacy_moves: list[tuple[Path, Path]] = []
    if args.cleanup_legacy and not (args.force or args.dry_run):
        print(
            "WARN: --cleanup-legacy is ignored in staging mode (use --force or --dry-run)"
        )
    if args.cleanup_legacy and (args.force or args.dry_run):
        legacy_candidates = [
            (out_root / "knowledge" / "fragments" / "index.md"),
            (out_root / "knowledge" / "fragments" / "open-questions.md"),
        ]
        for p in legacy_candidates:
            if p.exists():
                rel = safe_relpath(p, out_root)
                dst = archive_legacy_dir / rel
                legacy_moves.append((p, dst))
        for src, dst in legacy_moves:
            m = move_to_archive(src, dst, dry_run=args.dry_run)
            if m == "moved":
                stats["legacy_archived"] += 1

    # Archive curated inputs (optional)
    if args.archive_inputs and not (args.force or args.dry_run):
        print(
            "WARN: --archive-inputs is ignored in staging mode (use --force or --dry-run)"
        )
    if args.archive_inputs and (args.force or args.dry_run):
        for name in INPUT_ARCHIVE_FILES:
            src = repo_root / name
            dst = archive_inputs_dir / name
            m = move_to_archive(src, dst, dry_run=args.dry_run)
            if m == "moved":
                stats["inputs_archived"] += 1

    # Write report (optional)
    if args.report:
        report_path = write_root / "knowledge" / "migration-report.md"
        ensure_dir(report_path.parent, args.dry_run)
        # Relative path reporting for cleaner diffs
        relative_sessions_dir = str(sessions_dir.relative_to(repo_root)).replace(
            "\\", "/"
        )
        relative_out_root = str(out_root.relative_to(repo_root)).replace("\\", "/")
        relative_write_root = str(write_root.relative_to(repo_root)).replace("\\", "/")
        report_lines = [
            AUTO_MARKER,
            "# Migration Report",
            "",
            f"- run_at: {utc_now_iso()}",
            f"- sessions_dir: {relative_sessions_dir}",
            f"- out_root: {relative_out_root}",
            f"- write_root: {relative_write_root}",
            "",
            "## Counters",
            "",
        ]
        for k in (
            "jsonl_found",
            "lines_read",
            "parse_errors",
            "sessions_processed",
            "sessions_skipped_since",
            "fragments_created",
            "fragments_updated",
            "fragments_skipped",
            "inputs_archived",
            "legacy_archived",
        ):
            report_lines.append(f"- {k}: {stats[k]}")
        report_lines.append("")
        if parse_errors:
            report_lines.extend(["## Parse Errors", ""])
            for e in parse_errors[:50]:
                report_lines.append(f"- {e.file}:{e.line_no} {e.reason} `{e.snippet}`")
            report_lines.append("")
        if created_or_updated:
            report_lines.extend(["## Outputs", ""])
            for p in created_or_updated[:200]:
                report_lines.append(f"- {safe_relpath(Path(p), write_root)}")
            report_lines.append("")
        write_file_safe(
            report_path,
            "\n".join(report_lines) + "\n",
            dry_run=args.dry_run,
            force=True,
            backups_root=backups_root,
            backups_base=out_root,
        )

    # Console summary
    print("\nBMAD Memory Migration")
    print(f"- baseline: deterministic (no LLM)")
    print(f"- sessions: {stats['jsonl_found']} jsonl files")
    print(f"- lines_read: {stats['lines_read']}")
    print(f"- parse_errors: {stats['parse_errors']}")
    print(
        f"- sessions_processed: {stats['sessions_processed']} (skipped_since={stats['sessions_skipped_since']})"
    )
    print(
        "- fragments: "
        + f"created={stats['fragments_created']} updated={stats['fragments_updated']} skipped={stats['fragments_skipped']}"
    )
    print(f"- write_root: {str(write_root).replace('\\\\', '/')}")
    if not args.force:
        print("- mode: staging (default). Use --force to apply into --out")
    if args.archive_inputs:
        print(f"- inputs_archived: {stats['inputs_archived']}")
    if args.cleanup_legacy:
        print(f"- legacy_archived: {stats['legacy_archived']}")
    if args.report:
        print("- report: enabled")

    print("\nNext (BMAD canonical):")
    print("- /index-docs _bmad-output/knowledge/")
    print("- /index-docs _bmad-output/knowledge/fragments/")
    print("- /index-docs _bmad-output/planning-artifacts/")
    print("- /index-docs _bmad-output/solutioning/adrs/")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
