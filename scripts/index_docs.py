#!/usr/bin/env python3
"""
Auto-generate Markdown index files for repository docs.
Generates:
- _bmad-output/index.md
- repo-index.md

Algorithm:
- Walk target directories for Markdown files,
- Group by top-level subdirectory, sort, dedupe,
- Read first heading or first paragraph for short description,
- Write relative links with descriptions.
"""

from pathlib import Path
import sys
import datetime
from collections import defaultdict

ROOT = Path(__file__).resolve().parents[1]  # repo root (scripts/..)
TARGETS = [
    ROOT / "_bmad-output",
    ROOT / "knowledge",
    ROOT / "planning-artifacts",
    ROOT / "solutioning",
    ROOT / "test-artifacts",
    ROOT / "_archive",
]


def describe(file_path: Path) -> str:
    try:
        text = file_path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""
    for line in text.splitlines():
        s = line.strip()
        if not s:
            continue
        if s.startswith("#"):
            # remove leading hashes
            return s.lstrip("#").strip()
        # fall back to first non-empty line
        return s
    return file_path.name


def gather_md(target: Path):
    items = []
    if not target.exists():
        return items
    for p in sorted(target.rglob("*.md")):
        if p.name.lower().startswith("."):  # skip hidden
            continue
        # skip auto-generated bookkeeping files? keep all md as per plan
        rel = p.relative_to(ROOT).as_posix()
        items.append((rel, p))
    return items


def group_by_dir(items):
    groups = defaultdict(list)
    for rel, _ in items:
        parts = rel.split("/")
        if len(parts) > 1:
            dir_name = parts[0]
        else:
            dir_name = "."
        groups[dir_name].append(rel)
    # sort within groups
    for k in groups:
        groups[k].sort()
    return dict(groups)


def build_index(base_name: str, groups: dict) -> str:
    lines = []
    lines.append(f"Directory Index: {base_name}")
    lines.append("")
    if base_name == "_bmad-output":
        lines.append("BMAD artifacts (deduplicated) for genu.im.")
    lines.append("---")
    lines.append("## Files")
    for dir_name in sorted(groups.keys()):
        if dir_name == ".":
            # flat files in root of base
            for rel in groups[dir_name]:
                lines.append(
                    f"- **[{Path(rel).name}]({rel})** - {describe((ROOT / rel).resolve())}"
                )
        else:
            lines.append(f"### {dir_name}/")
            for rel in groups[dir_name]:
                desc = describe((ROOT / rel).resolve())
                lines.append(f"- **[{Path(rel).name}]({rel})** - {desc}")
    # archive section if present
    archive = ROOT / "_archive"
    if archive.exists():
        subdirs = sorted([d.name for d in archive.iterdir() if d.is_dir()])
        if subdirs:
            lines.append("")
            lines.append("---")
            lines.append("### _archive/")
            lines.append("Archived legacy materials and migration inputs.")
            for sd in subdirs:
                lines.append(f"- **[/{'_archive'}/{sd}](./_archive/{sd}/)**")
    # footer
    lines.append("")
    lines.append(f"Last updated: {datetime.date.today().isoformat()}")
    return "\n".join(lines)


def write_file(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def main():
    # gather items from target directories
    all_items = []
    for t in TARGETS:
        if not t.exists():
            continue
        md = gather_md(t)
        all_items.extend(md)
    if not all_items:
        print("No Markdown files found; nothing to index.")
        return
    # Build groups by top-level directory under repo root
    groups = defaultdict(list)
    for rel, path in all_items:
        parts = rel.split("/")
        if len(parts) > 1:
            dir_name = parts[0]
        else:
            dir_name = "."
        groups[dir_name].append(rel)
    for k in groups:
        groups[k] = sorted(groups[k])

    # write both indices
    idx_bmad = build_index("_bmad-output", groups)
    idx_repo = build_index("repo-root", {"_bmad-output/index.md": ""})  # placeholder
    # For repo-index, rebuild from root-level files across repo
    repo_groups = defaultdict(list)
    for rel, _ in sorted(all_items, key=lambda x: x[0]):
        top = rel.split("/")[0]
        repo_groups[top].append(rel)
    idx_repo = build_index("repo-root", repo_groups)

    write_file(ROOT / "_bmad-output/index.md", idx_bmad)
    write_file(ROOT / "repo-index.md", idx_repo)


if __name__ == "__main__":
    main()
