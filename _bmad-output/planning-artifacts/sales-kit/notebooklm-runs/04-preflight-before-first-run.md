# Preflight Before First Run

## Purpose

This is the short preflight check before the first mandatory regulated run in NotebookLM.

## When to use it

Use this file:
- after `README.md`;
- after `regulated-final-bundle/03-run-paths.md`;
- before the first regulated generation run.

## 5-point preflight

### 1. Strategy lock is loaded

Confirm that you have read:
- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`

`NO-GO` if you cannot explain in one sentence that the regulated motion sells `genu.mark` first.

### 2. Core vs external contours are obvious

Confirm in the approved source asset that:
- `genu.mark` = core;
- `ERP -> source of production job`;
- `ERP / internal systems <- exchange of results and statuses`;
- `еАкциз` = separate external contour.

`NO-GO` if any of these are blurred.

### 3. Upload pack is compact and exact

Confirm that the notebook will contain only:
- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- one approved buyer-facing regulated source asset
- one matching brief

`NO-GO` if the upload pack is mixed, expanded, or improvised.

### 4. Fail gates are understood

Before generation, confirm that you will reject any output that:
- sells a platform instead of `genu.mark`;
- hides the ERP split;
- makes `ERP` or `еАкциз` look like core;
- sounds like internal draft wording;
- lacks audit / architecture session / pilot.

`NO-GO` if these fail gates are not clear.

### 5. Expected output is clear

Confirm that the expected output is:
- modern Ukrainian;
- buyer-facing;
- self-contained;
- compact enough to forward;
- ready for QA and later visual production.

`NO-GO` if the deliverable expectation is vague.

## Decision

### GO

Set `GO` only if all five points pass.

Then run the exact asset path from `regulated-final-bundle/03-run-paths.md`.

### NO-GO

Set `NO-GO` if any point fails.

Then fix the upstream layer first and rerun this preflight.
