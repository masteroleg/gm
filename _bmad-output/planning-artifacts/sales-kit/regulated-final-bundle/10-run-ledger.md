---
title: Run Ledger - Regulated Sales Kit
status: Active history log
owner: Founder / NotebookLM operator
last_updated: 2026-03-23
---

# Run Ledger / Regulated Sales Kit

## Purpose

This ledger records the meaningful NotebookLM runs and their outcomes so that the next session does not need to reconstruct history from scattered files.

## Shared-agent rule

- Codex and Claude must both use this ledger as shared project memory.
- If either agent learns something that changes operating truth, artifact quality, or lane availability, that change must be written here and into the relevant continuity docs.

## Generation lanes

- `slide_deck` and `infographic` are separate visual-generation lanes.
- A failure or quota limit in one lane does not automatically block the other lane.
- Every visual entry in this ledger explicitly records which lane produced the artifact.

## Entries

### 2026-03-22 / Executive Deck / text

- notebook: `REGULATED / Executive Deck / Text + Visual`
- notebook_id: `8493747d-88a6-42d8-8aa4-202243245726`
- result sequence:
  - baseline -> `run-results/2026-03-22-executive-deck-notebooklm-baseline.md`
  - rerun -> `run-results/2026-03-22-executive-deck-notebooklm-rerun-2.md`
  - rerun valid -> `run-results/2026-03-22-executive-deck-notebooklm-rerun-valid.md`
  - clean pass candidate -> `run-results/2026-03-22-executive-deck-notebooklm-rerun-v2-clean.md`
- final interpretation:
  - text passed after control / brief / prompt hardening

### 2026-03-22 / Executive Deck / visual

- notebook: `REGULATED / Executive Deck / Text + Visual`
- artifact title: `REGULATED / Executive Deck / genu.mark як сильне ядро`
- artifact_id: `82eafbb2-b335-4e5b-a925-a847ffd31c40`
- generation_lane: `slide_deck`
- saved artifact:
  - `run-results/visuals/regulated-executive-deck-genu-mark-yak-sylne-iadro.pdf`
- final interpretation:
  - generated successfully in the `slide_deck` lane
  - later visual QA failed due to English visible copy on pages 4, 5, 6, 7, 9
  - rerun required; meaning layer remains intact

### 2026-03-22 / Why Us / text

- notebook: `REGULATED / Why Us / Text + Visual`
- notebook_id: `e4f3eece-586c-49e0-897a-544cebe56761`
- clean pass candidate:
  - `run-results/2026-03-22-why-us-notebooklm-clean.md`
- final interpretation:
  - text passed

### 2026-03-22 / Why Us / visual

- notebook: `REGULATED / Why Us / Text + Visual`
- artifact title: `REGULATED / Why Us / Безпечніше впровадження`
- artifact_id: `3a604c9e-ce6b-46c9-b517-31442d61d695`
- generation_lane: `slide_deck`
- saved artifact:
  - `run-results/visuals/regulated-why-us-bezpechnishe-vprovadzhennia.pdf`
- final interpretation:
  - generated successfully in the `slide_deck` lane
  - later visual QA failed due to English visible copy on pages 5, 6, 7, 9, 10
  - page 5 contains the correct Ukrainian contour wording and should be used as the reference contour slide
  - rerun required

### 2026-03-22 / One Job / text

- notebook: `REGULATED / One Job / Text`
- notebook_id: `32eafde7-dc70-4663-9f2b-c744e59769ab`
- revise:
  - `run-results/2026-03-22-one-job-notebooklm-revise.md`
- clean pass candidate:
  - `run-results/2026-03-22-one-job-notebooklm-clean.md`
- final interpretation:
  - text passed after prompt tightening

### 2026-03-22 / One Job / visual

- notebook: `REGULATED / One Job / Visual`
- artifact title: `REGULATED / One Job / Керована лінія`
- artifact_id: `1e043704-33c6-4867-b169-1bd237e5491b`
- generation_lane: `slide_deck`
- saved artifact:
  - `run-results/visuals/regulated-one-job-kerovana-liniia.pdf`
- final interpretation:
  - generated successfully in the `slide_deck` lane
  - later visual QA failed due to English visible copy on pages 1 and 4 only
  - cleanest failed slide deck; rerun first

### 2026-03-23 / One Job / visual rerun

- notebook: `REGULATED / One Job / Visual`
- artifact_id: `154d007d-9de3-4260-b02d-fb3fbb3e8405`
- generation_lane: `slide_deck`
- status:
  - in progress
- prompt intent:
  - keep meaning layer and structure
  - remove English doc-ref metadata
  - enforce Ukrainian-only visible copy
  - remove NotebookLM branding, watermark, service chrome, and generator residue
  - preserve exact ERP / eАкциз contour wording

### 2026-03-22 / Edge Cases / text

- notebook: `REGULATED / Edge Cases / Text`
- notebook_id: `25b37bc9-6f79-4da1-a153-6fbe6d01c463`
- revise:
  - `run-results/2026-03-22-edge-cases-notebooklm-revise.md`
- clean pass candidate:
  - `run-results/2026-03-22-edge-cases-notebooklm-clean.md`
- final interpretation:
  - text passed after prompt tightening

### 2026-03-22 / Edge Cases / visual

- notebook: `REGULATED / Edge Cases / Visual`
- slide deck attempt:
  - failed due to slide-deck lane quota at that time
- infographic artifact title:
  - `REGULATED / Edge Cases / Зрілість впровадження`
- artifact_id:
  - `9d7b789e-dbd0-403e-a1a5-13ecb0785010`
- generation_lane: `infographic`
- saved artifact:
  - `run-results/visuals/regulated-edge-cases-zrilist-vprovadzhennia.png`
- final interpretation:
  - visual produced via the independent `infographic` lane
  - needs rerun later because visible copy drifted into English

### 2026-03-23 / Edge Cases / visual rerun

- notebook: `REGULATED / Edge Cases / Visual`
- artifact_id: `0ef38cfd-1fcb-474f-ae9b-6fb09d716b3a`
- generation_lane: `infographic`
- status:
  - in progress
- prompt intent:
  - Ukrainian-only visible copy
  - preserve exception-maturity logic
  - reduce text density only if it improves scan speed
  - preserve exact contour wording if architecture appears

### 2026-03-22 / Evidence Pack / text

- notebook: `REGULATED / Evidence Pack / Text`
- notebook_id: `df81338e-e697-454c-9b1e-013c38ac13fd`
- revise:
  - `run-results/2026-03-22-evidence-pack-notebooklm-revise.md`
- clean pass candidate:
  - `run-results/2026-03-22-evidence-pack-notebooklm-clean.md`
- final interpretation:
  - text passed after prompt tightening

### 2026-03-22 / Evidence Pack / visual

- notebook: `REGULATED / Evidence Pack / Visual`
- slide deck attempt:
  - failed due to slide-deck lane quota at that time
- infographic artifact title:
  - `REGULATED / Evidence Pack / Спокій і контроль`
- artifact_id:
  - `6cf10629-ab59-42e4-91d5-29e25201a4fb`
- generation_lane: `infographic`
- saved artifact:
  - `run-results/visuals/regulated-evidence-pack-spokii-i-kontrol.png`
- final interpretation:
  - visual produced via the independent `infographic` lane
  - needs rerun later because visible copy is mixed-language

### 2026-03-22 / Technical Deck / text

- notebook: `REGULATED / Technical Deck / Text`
- notebook_id: `7b495a98-d837-4144-b9f7-8c1a15bfc1bc`
- revise:
  - `run-results/2026-03-22-technical-deck-notebooklm-revise.md`
- clean pass candidate:
  - `run-results/2026-03-22-technical-deck-notebooklm-clean.md`
- final interpretation:
  - text passed after prompt tightening

### 2026-03-22 / Technical Deck / visual

- notebook: `REGULATED / Technical Deck / Visual`
- slide deck attempt:
  - failed due to slide-deck lane quota at that time
- infographic artifact title:
  - `REGULATED / Technical Deck / Архітектура ядра`
- artifact_id:
  - `b15739a6-4403-4742-abf3-0d4dbb0e944a`
- generation_lane: `infographic`
- saved artifact:
  - `run-results/visuals/regulated-technical-deck-arkhitektura-iadra.png`
- final interpretation:
  - visual produced via the independent `infographic` lane
  - needs rerun later because of mixed-language visible copy, `Risk-Free` wording, and paraphrased architecture labels

### 2026-03-23 / Technical Deck / visual

- notebook: `REGULATED / Technical Deck / Visual`
- artifact title: `Resilient e-Excise Production Architecture`
- artifact_id: `ebbb927d-5d8c-4ff0-b2bd-bbe6274569ac`
- generation_lane: `slide_deck`
- final interpretation:
  - new slide-deck artifact exists
  - this proves the `slide_deck` lane is available again
  - artifact quality is not yet reviewed and must not be treated as canonical

## Resume rule

When resuming:

1. find the asset in this ledger
2. read the last interpretation
3. confirm the `next_action` in `09-asset-state-board.md`
4. continue from the latest passed state instead of reconstructing older experiments
