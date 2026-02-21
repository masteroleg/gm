#!/usr/bin/env python3
import argparse
import json
import os
from pathlib import Path

def iter_jsonl(path: Path):
    with path.open("r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            yield json.loads(line)

def normalize_rel_from_file_path(file_path: str) -> Path | None:
    """
    Claude sessions often store absolute Windows paths like:
    D:\\w\\proj\\_bmad-output\\planning-artifacts\\prd.md

    We only want to restore files UNDER _bmad-output/** (repo-relative).
    """
    if not file_path:
        return None

    # Normalize slashes for searching
    fp = file_path.replace("\\", "/")

    marker = "/_bmad-output/"
    idx = fp.lower().find(marker)
    if idx == -1:
        # also handle if path ends with "_bmad-output/..."
        idx = fp.lower().find("_bmad-output/")
        if idx == -1:
            return None
        rel = fp[idx:]
    else:
        rel = fp[idx+1:]  # drop leading "/"

    # Security: ensure it starts correctly
    if not rel.lower().startswith("_bmad-output/"):
        return None

    return Path(rel)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sessions", default="migration/raw/.claude-sessions", help="Path to .claude-sessions dir")
    ap.add_argument("--out", default=".", help="Repo root (where _bmad-output should be created)")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    sessions_dir = Path(args.sessions)
    out_root = Path(args.out)

    if not sessions_dir.exists():
        raise SystemExit(f"Sessions dir not found: {sessions_dir}")

    writes = {}  # rel_path -> content (keep last write)

    for jsonl in sorted(sessions_dir.glob("*.jsonl")):
        for obj in iter_jsonl(jsonl):
            if obj.get("type") != "assistant":
                continue
            msg = obj.get("message", {})
            content = msg.get("content")
            if not isinstance(content, list):
                continue

            for item in content:
                if item.get("type") != "tool_use":
                    continue
                if item.get("name") != "Write":
                    continue
                inp = item.get("input", {})
                file_path = inp.get("file_path")
                file_content = inp.get("content", "")
                rel = normalize_rel_from_file_path(file_path)
                if rel is None:
                    continue
                writes[rel] = file_content

    if not writes:
        raise SystemExit("No _bmad-output Write events found in sessions.")

    print(f"Found {len(writes)} _bmad-output files to restore:")
    for rel in sorted(writes.keys()):
        print(f" - {rel}")

    if args.dry_run:
        print("Dry-run: no files written.")
        return

    for rel, file_content in writes.items():
        target = out_root / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(file_content, encoding="utf-8")

    print("Done.")

if __name__ == "__main__":
    main()