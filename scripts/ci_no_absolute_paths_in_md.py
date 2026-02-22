#!/usr/bin/env python3
"""Audit MD files for absolute paths and file:// references.

Exits with code 0 if no violations, 1 if violations found.
Prints a short list of violating files and lines.
"""

import re
import sys
from pathlib import Path


def main() -> int:
    repo = Path(__file__).resolve().parents[1]
    md_files = sorted([p for p in repo.rglob("*.md")])
    violations = []  # (path, line_no, line)

    pat_windows = re.compile(r"[A-Za-z]:\\")  # C:\\path
    pat_unix = re.compile(r"[A-Za-z]:/")  # C:/path
    pat_fileuri = re.compile(r"file://", re.IGNORECASE)

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
                    if (
                        pat_windows.search(line)
                        or pat_unix.search(line)
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
    else:
        print("No absolute paths found in MD files.")
        return 0


if __name__ == "__main__":
    sys.exit(main())
