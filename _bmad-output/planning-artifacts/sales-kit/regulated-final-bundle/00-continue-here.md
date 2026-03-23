---
title: Continue Here - Regulated Sales Kit
status: Active entry point
owner: Founder / next agent / NotebookLM operator
last_updated: 2026-03-23
---

# Continue Here / Regulated Sales Kit

## Current phase

Mandatory regulated pack is complete at the meaning layer and complete at the first visual-generation layer.

Current work mode:

- review and improve the generated visuals without reopening the frozen meaning layer unless a concrete QA signal appears

## What is already completed

- control layer updated and locked around `genu.mark first`
- buyer-facing mandatory regulated assets updated
- all 6 mandatory text routes passed NotebookLM generation
- all 6 mandatory visual routes produced artifacts
- notebook registry and operating memory are recorded locally

## What is currently usable

No slide-deck PDFs are release-ready. All three failed language QA gate on 2026-03-23.

Visual rerun required for all six mandatory artifacts:

| Artifact | Path | Status |
| --- | --- | --- |
| Executive Deck | `run-results/visuals/regulated-executive-deck-genu-mark-yak-sylne-iadro.pdf` | visual QA fail — English on p4 p5 p6 p7 p9 |
| Why Us | `run-results/visuals/regulated-why-us-bezpechnishe-vprovadzhennia.pdf` | visual QA fail — English on p5 p6 p7 p9 p10 |
| One Job | `run-results/visuals/regulated-one-job-kerovana-liniia.pdf` | visual QA fail — English on p1 p4 only (fewest failures) |
| Edge Cases | `run-results/visuals/regulated-edge-cases-zrilist-vprovadzhennia.png` | English visible copy |
| Evidence Pack | `run-results/visuals/regulated-evidence-pack-spokii-i-kontrol.png` | mixed-language visible copy |
| Technical Deck | `run-results/visuals/regulated-technical-deck-arkhitektura-iadra.png` | mixed-language + weak claim |

## Current blockers

- no meaning-layer blocker is active
- no source-packet blocker is active
- all six visual artifacts require rerun before release
- root cause: NotebookLM generated English diagram labels despite Ukrainian-only instruction
- reference fix available: Why Us deck p5 has correct Ukrainian ERP contour wording

## Exact next action

Rerun visual generation for all three slide-deck PDFs with stricter Ukrainian-only enforcement.

Priority order (least work first):

1. **One Job** — only 2 pages need fixing (p1 doc-ref, p4 contour labels)
2. **Why Us** — 5 pages, p10 stamp is the most visible failure; p5 contour wording is correct (preserve it)
3. **Executive Deck** — 5 pages, p6 is worst (fully English diagram labels)

For each rerun:

- add to the generation prompt: `All visible copy must be in Ukrainian only. Do not generate English headings, labels, parentheticals, metadata, or stamps. Use this exact wording for ERP contour labels: ERP -> джерело виробничого завдання / ERP / внутрішні системи <- обмін результатами та статусами / еАкциз (окремий зовнішній державний контур).`
- do not reopen meaning layer or source packets
- full QA findings: `regulated-final-bundle/13-visual-review-protocol.md`

After slide-deck reruns pass:

- prepare the next quality-improvement loop for:
  - Edge Cases visual
  - Evidence Pack visual
  - Technical Deck visual

## Claude onboarding path

For a new Claude agent, open these files in this exact order:

1. `regulated-final-bundle/00-continue-here.md`
2. `regulated-final-bundle/11-claude-handoff-main.md`
3. `regulated-final-bundle/12-claude-handoff-appendix.md`
4. supporting operational files only after that

## Language policy

- handoff and agent operating docs: English
- buyer-facing generated outputs: Ukrainian only
- visible English or mixed-language copy in buyer-facing visuals = not release-ready

## Resume protocol

When resuming after interruption:

1. Open `regulated-final-bundle/00-continue-here.md`
2. Open `regulated-final-bundle/08-notebooklm-registry.md`
3. Open `regulated-final-bundle/09-asset-state-board.md`
4. Read `next_action` and `blocked_by` for the active asset
5. Continue only from the last passed state; do not reopen frozen meaning docs without a concrete QA signal

## Operating references

- notebook inventory and exact notebook state:
  - `regulated-final-bundle/08-notebooklm-registry.md`
- Claude onboarding main:
  - `regulated-final-bundle/11-claude-handoff-main.md`
- Claude onboarding appendix:
  - `regulated-final-bundle/12-claude-handoff-appendix.md`
- compact asset-by-asset state board:
  - `regulated-final-bundle/09-asset-state-board.md`
- chronological generation history:
  - `regulated-final-bundle/10-run-ledger.md`
- reviewer status:
  - `regulated-final-bundle/06-reviewer-pass-log.md`
- visual release state:
  - `regulated-final-bundle/07-visual-release-status.md`
- visual review protocol:
  - `regulated-final-bundle/13-visual-review-protocol.md`
- local next-step queue:
  - `local-backlog.md`
