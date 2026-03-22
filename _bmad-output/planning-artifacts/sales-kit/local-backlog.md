---
title: Sales-Kit Local Backlog
asset_type: Internal backlog
audience: Founder / next agent / reviewer
funnel_stage: Execution
decision_to_unlock: Keep the next actions explicit, ordered, and separated between generic regulated work and account-specific work
one_sentence_purpose: Record the agreed next-step resolution after the BMAD party-mode review
single_key_message: Freeze the locked regulated pack, run the real executive baseline first, then branch based on QA outcome
owner: Founder / sales enablement
status: Active
last_updated: 2026-03-22
---

# Sales-Kit Local Backlog

## Resolution

The agreed next-step resolution is:

1. Do not expand the locked mandatory regulated pack further before a real baseline run.
2. Run the executive route first.
3. Review only through the locked QA gates.
4. Use `source-of-truth/07-regulated-sop-distillate.md` only if the run exposes a concrete depth gap in exceptions, evidence, or responsibilities.
5. Keep `dominanta-sales/07-gorobina-account-note.md` as an account-specific branch, not a generic regulated source.
6. Defer Figma visual transfer until after the baseline run and backlog review.

## Backlog items

### B-01. Run executive baseline in NotebookLM

Status: next

Run:

- `notebooklm-runs/11-run-regulated-executive-deck.md`

Success condition:

- generated output exists and is reviewed against the locked gates.

### B-02. Review executive output through QA gates

Status: next

Review against:

- `notebooklm-qa/11-regulated-executive-deck-qa.md`
- `notebooklm-qa/01-output-checklist.md`
- `regulated-final-bundle/04-acceptance-gate.md`

Decision rule:

- `Pass` -> continue to B-04
- `Fail` -> continue to B-03

### B-03. Apply targeted upstream correction only if the run fails

Status: conditional

Routing:

- strategic drift -> `regulated-final-bundle/01-control-packet.md` or `02-approved-regulated-source-packet.md`
- structure drift -> matching brief
- delivery drift -> matching prompt
- exception / evidence / responsibility depth gap -> use `source-of-truth/07-regulated-sop-distillate.md`

Guardrail:

- do not make broad upstream edits without a concrete failure signal from the run.

### B-04. Prepare Gorobina follow-up packet

Status: next-after-pass

Use:

- `dominanta-sales/07-gorobina-account-note.md`
- `dominanta-sales/04-objection-cheat-sheet.md`
- `dominanta-sales/01-ready-solution-presentation.md`

Goal:

- prepare a compact account-specific follow-up centered on contour review and pilot definition.

### B-05. Request only the minimum visual references for later transfer

Status: later

If visual work starts, request only 3-5 Figma screens:

- operator screen
- verification / reject / rework screen
- aggregation hierarchy screen
- evidence / logs screen
- pilot / setup / handoff screen, if available

Guardrail:

- use visuals to support the contour story, not to replace the `genu.mark`-first strategy.

## Notes

- `source-of-truth/07-regulated-sop-distillate.md` is approved as upstream reinforcement, not as a default NotebookLM upload file.
- `dominanta-sales/07-gorobina-account-note.md` is approved as internal account prep, not as generic buyer-facing copy.
- The mandatory regulated pack remains frozen until the first real executive run is reviewed.
