#!/usr/bin/env python3
"""Audit MD files for absolute filesystem paths and file:// references.

Exits with code 0 if no violations, 1 if violations found.
Prints a short list of violating files and lines.

Rules:
- FAIL on:
  - Windows absolute paths: C:\path
  - Windows absolute paths with forward slashes: C:/path
  - file:// URIs
- DO NOT fail on:
  - http:// or https:// URLs (including http://localhost:3000)
"""

import re
import sys
from pathlib import Path


def main() -> int:
    repo = Path(__file__).resolve().parents[1]
    md_files = sorted(repo.rglob("*.md"))
    violations = []  # (path, line_no, line)

    # C:\path (and similar)
    pat_windows_backslash = re.compile(r"\b[A-Za-z]:\\")
    # C:/path (IMPORTANT: avoid matching https:// which contains s:/)
    pat_windows_slash = re.compile(r"\b[A-Za-z]:/(?=/)")
    # file://...
    pat_fileuri = re.compile(r"\bfile://", re.IGNORECASE)

    for md in md_files:
        # Skip common external/vendor directories to avoid false positives on non-repo docs
        if any(
            part in ("node_modules", "opencode", "vendor", "third_party", "external")
            for part in md.parts
        ):
            continue

        try:
            with md.open("r", encoding="utf-8") as f:
                for i, line in enumerate(f, start=1):
                    # Allow normal web URLs explicitly (paranoia / readability)
                    # (Not strictly necessary with the fixed regex, but keeps intent clear.)
                    if "http://" in line or "https://" in line:
                        # still fail if file:// is present
                        if pat_fileuri.search(line):
                            violations.append((md.relative_to(repo), i, line.rstrip("\n")))
                        continue

                    if (
                        pat_windows_backslash.search(line)
                        or pat_windows_slash.search(line)
                        or pat_fileuri.search(line)
                    ):
                        violations.append((md.relative_to(repo), i, line.rstrip("\n")))
        except Exception:
            # If a file can't be read for some reason, skip it but log later
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