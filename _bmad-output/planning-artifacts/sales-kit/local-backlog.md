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

1. Keep the mandatory regulated pack frozen at the meaning layer unless a concrete QA failure appears.
2. The mandatory visual generation batch is now complete.
3. Any further NotebookLM generation should move only to the next approved priority, not reopen the frozen meaning layer without a concrete QA signal.
4. Keep `source-of-truth/07-regulated-sop-distillate.md` as upstream reinforcement only, not a default upload file.
5. Keep `dominanta-sales/07-gorobina-account-note.md` as an account-specific branch, not a generic regulated source.
6. Defer Figma visual transfer until the mandatory visual batch is either completed or technically blocked with a clear retry path.

## Backlog items

### B-01. Run executive baseline in NotebookLM

Status: completed

Run:

- `notebooklm-runs/11-run-regulated-executive-deck.md`

Success condition:

- generated output exists and is reviewed against the locked gates.

Outcome:

- completed on 2026-03-22
- clean result saved in `run-results/2026-03-22-executive-deck-notebooklm-rerun-v2-clean.md`

### B-02. Review executive output through QA gates

Status: completed

Review against:

- `notebooklm-qa/11-regulated-executive-deck-qa.md`
- `notebooklm-qa/01-output-checklist.md`
- `regulated-final-bundle/04-acceptance-gate.md`

Decision rule:

- `Pass` -> continue to B-04
- `Fail` -> continue to B-03

Outcome:

- executive route passed the tightened meaning gate after rerun
- this unlocked the rest of the mandatory regulated batch

### B-03. Apply targeted upstream correction only if the run fails

Status: completed

Routing:

- strategic drift -> `regulated-final-bundle/01-control-packet.md` or `02-approved-regulated-source-packet.md`
- structure drift -> matching brief
- delivery drift -> matching prompt
- exception / evidence / responsibility depth gap -> use `source-of-truth/07-regulated-sop-distillate.md`

Guardrail:

- do not make broad upstream edits without a concrete failure signal from the run.

Outcome:

- targeted corrections were applied to control docs, briefs, prompts, and QA gates
- all six mandatory regulated text routes now have clean pass candidates in `run-results/`

### B-04. Finish mandatory visual generation in NotebookLM

Status: completed

Current state:

- completed:
  - `run-results/visuals/regulated-executive-deck-genu-mark-yak-sylne-iadro.pdf`
  - `run-results/visuals/regulated-why-us-bezpechnishe-vprovadzhennia.pdf`
  - `run-results/visuals/regulated-one-job-kerovana-liniia.pdf`
  - `run-results/visuals/regulated-edge-cases-zrilist-vprovadzhennia.png`
  - `run-results/visuals/regulated-evidence-pack-spokii-i-kontrol.png`
  - `run-results/visuals/regulated-technical-deck-arkhitektura-iadra.png`

Goal:

- finish the remaining three mandatory visual artifacts without changing the frozen meaning layer unless a concrete QA failure appears

Guardrail:

- if Studio returns `Could not create slide deck.` while sources are present and meaning-layer outputs already passed, treat it as a Studio-execution blocker, not a strategy blocker

Outcome:

- slide-deck generation was completed for the first three assets
- the remaining three assets were completed through the separate infographic quota
- the full mandatory regulated visual batch now exists locally

### B-05. Review the completed mandatory visual batch

Status: next

Artifacts to review:

- `run-results/visuals/regulated-executive-deck-genu-mark-yak-sylne-iadro.pdf`
- `run-results/visuals/regulated-why-us-bezpechnishe-vprovadzhennia.pdf`
- `run-results/visuals/regulated-one-job-kerovana-liniia.pdf`
- `run-results/visuals/regulated-edge-cases-zrilist-vprovadzhennia.png`
- `run-results/visuals/regulated-evidence-pack-spokii-i-kontrol.png`
- `run-results/visuals/regulated-technical-deck-arkhitektura-iadra.png`

Success condition:

- identify which artifacts are release-ready as-is and which need targeted rerun or local cleanup

Known findings:

- the infographic batch is completed, but `Edge Cases`, `Evidence Pack`, and `Technical deck` need a later rerun because visible copy drifted from Ukrainian-only rules
- the technical infographic also needs a ban on `Risk-Free` / similar weak claims in visible copy

### B-06. Prepare Gorobina follow-up packet

Status: next-after-mandatory-visuals

Use:

- `dominanta-sales/07-gorobina-account-note.md`
- `dominanta-sales/04-objection-cheat-sheet.md`
- `dominanta-sales/01-ready-solution-presentation.md`

Goal:

- prepare a compact account-specific follow-up centered on contour review and pilot definition

### B-07. Request only the minimum visual references for later transfer

Status: later

If visual transfer starts, request only 3-5 Figma screens:

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
- The mandatory regulated pack meaning layer is now validated and should stay frozen while the visual batch is being completed.
- The current NotebookLM operating state is fixed in `regulated-final-bundle/08-notebooklm-registry.md`.
