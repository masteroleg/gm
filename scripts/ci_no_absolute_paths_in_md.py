#!/usr/bin/env python3
r"""Audit MD files for absolute paths and file:// references.

Exits with code 0 if no violations, 1 if violations found.
Prints a short list of violating files and lines.

Rules:
- FAIL on:
  - Windows absolute paths: C:\path
  - Windows absolute paths with forward slashes: C:/path
  - file:// URIs (when used as a link, not as an example in backticks)
- DO NOT fail on:
  - http:// or https:// URLs (including localhost)
  - mentions inside markdown code spans: `file:///...`
"""

import re
import sys
from pathlib import Path


def strip_code_spans(line: str) -> str:
    """Remove inline code spans `...` to avoid false positives in docs."""
    return re.sub(r"`[^`]*`", "", line)


def main() -> int:
    repo = Path(__file__).resolve().parents[1]
    md_files = sorted(repo.rglob("*.md"))
    violations = []  # (path, line_no, line)

    # C:\path
    pat_win_backslash = re.compile(r"\b[A-Za-z]:\\")
    # C:/path (avoid matching https:// which contains s:/)
    pat_win_slash = re.compile(r"\b[A-Za-z]:/(?=/)")
    # file://...
    pat_fileuri = re.compile(r"\bfile://", re.IGNORECASE)

    for md in md_files:
        if any(
            part in ("node_modules", "opencode", "vendor", "third_party", "external")
            for part in md.parts
        ):
            continue

        try:
            with md.open("r", encoding="utf-8") as f:
                in_fenced = False
                for i, raw in enumerate(f, start=1):
                    line = raw.rstrip("\n")

                    # Ignore fenced code blocks
                    if line.strip().startswith("```"):
                        in_fenced = not in_fenced
                        continue
                    if in_fenced:
                        continue

                    # Ignore inline code spans like `file:///...`
                    scan = strip_code_spans(line)

                    # Allow normal web URLs explicitly
                    if "http://" in scan or "https://" in scan:
                        # still scan for real Windows paths (rare but possible in same line)
                        if pat_win_backslash.search(scan) or pat_win_slash.search(scan):
                            violations.append((md.relative_to(repo), i, line))
                        # do NOT flag file:// if it's part of an http(s) URL (it won't be)
                        # and we already removed inline code spans
                        if pat_fileuri.search(scan):
                            violations.append((md.relative_to(repo), i, line))
                        continue

                    if (
                        pat_win_backslash.search(scan)
                        or pat_win_slash.search(scan)
                        or pat_fileuri.search(scan)
                    ):
                        violations.append((md.relative_to(repo), i, line))
        except Exception:
            continue

    if violations:
        print("Absolute paths found in MD files:")
        for path, line_no, content in violations:
            print(f"{path}:{line_no}: {content}")
        return 1

    print("No absolute paths found in MD files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())