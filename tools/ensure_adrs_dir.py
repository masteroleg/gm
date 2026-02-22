#!/usr/bin/env python3
import os
from pathlib import Path


def main():
    repo = Path(".")
    adrs_dir = repo / "_bmad-output" / "solutioning" / "adrs"
    adrs_dir.mkdir(parents=True, exist_ok=True)
    # If directory is empty, seed with a placeholder ADR to ensure non-empty state
    if not any(adrs_dir.iterdir()):
        placeholder = adrs_dir / "ADR-000-placeholder.md"
        placeholder.write_text(
            "---\ntitle: ADR-000-placeholder\nstatus: draft\ndate: 2026-02-22\ncontent: |\n  Placeholder ADR seeded by ensure_adrs_dir.py.\n---\n",
            encoding="utf-8",
        )
        print(f"Seeded placeholder ADR: {placeholder}")
    else:
        print("ADRs already present; no action taken.")


if __name__ == "__main__":
    main()
