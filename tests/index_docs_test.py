import os
from pathlib import Path
import subprocess


def run_script():
    subprocess.run(["python", "scripts/index_docs.py"], check=True)


def test_index_docs_runs_and_outputs():
    # Run the index docs script
    run_script()
    # Assert that output files exist and contain Directory Index header
    base = Path(__file__).resolve().parents[2]  # repo root/tests -> go up
    idx1 = base / "_bmad-output/index.md"
    idx2 = base / "repo-index.md"
    assert idx1.exists(), f"Missing {idx1}"
    assert idx2.exists(), f"Missing {idx2}"
    with idx1.open("r", encoding="utf-8") as f:
        content = f.read()
    assert "Directory Index" in content
    with idx2.open("r", encoding="utf-8") as f:
        content2 = f.read()
    assert "Directory Index" in content2
