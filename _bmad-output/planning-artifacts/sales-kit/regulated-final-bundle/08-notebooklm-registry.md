---
title: NotebookLM Registry - Regulated Sales Kit
status: Active
owner: Sales enablement / NotebookLM operator
last_updated: 2026-03-22
---

# NotebookLM Registry / Regulated Sales Kit

## Purpose

This file is the single local source of truth for the NotebookLM operating state of the regulated sales kit.

It answers:
- how many notebooks exist for the regulated sales kit
- what each notebook is for
- what has already been generated
- what artifacts were saved locally
- what still needs to happen next

Start every interrupted session from:

- `regulated-final-bundle/00-continue-here.md`

This registry is an operational support document, not the onboarding document.
For a new Claude agent, use:
- `regulated-final-bundle/11-claude-handoff-main.md`
- `regulated-final-bundle/12-claude-handoff-appendix.md`

## Count

Regulated sales-kit notebooks currently tracked:

- active working notebooks: 10
- extra empty draft notebook: 1
- total regulated notebooks in scope: 11

Not included in this registry:

- unrelated human notebooks
- shared external notebooks

## Naming convention

Working notebook titles should follow this pattern:

- `REGULATED / <Asset Name> / Text`
- `REGULATED / <Asset Name> / Visual`
- `REGULATED / <Asset Name> / Text + Visual`
- `REGULATED / <Asset Name> / Visual / Empty Draft`

## Notebook inventory

### 1. Executive deck

Notebook:

- title: `REGULATED / Executive Deck / Text + Visual`
- id: `8493747d-88a6-42d8-8aa4-202243245726`
- url: https://notebooklm.google.com/notebook/8493747d-88a6-42d8-8aa4-202243245726
- source_count: 4

Purpose:

- text generation and visual generation for the mandatory regulated executive deck

Sources:

- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- `buyer-facing/regulated/01-executive-deck-regulated.md`
- `notebooklm-briefs/11-regulated-executive-deck-brief.md`

What was done:

- baseline run
- reruns after source/brief/prompt hardening
- clean text pass achieved
- visual slide deck generated

Saved outputs:

- `run-results/2026-03-22-executive-deck-notebooklm-baseline.md`
- `run-results/2026-03-22-executive-deck-notebooklm-rerun-2.md`
- `run-results/2026-03-22-executive-deck-notebooklm-rerun-valid.md`
- `run-results/2026-03-22-executive-deck-notebooklm-rerun-v2-clean.md`
- `run-results/visuals/regulated-executive-deck-genu-mark-yak-sylne-iadro.pdf`

Current status:

- text: passed
- visual: release-ready candidate

Next step:

- human visual review of the PDF

### 2. Why Us

Notebook:

- title: `REGULATED / Why Us / Text + Visual`
- id: `e4f3eece-586c-49e0-897a-544cebe56761`
- url: https://notebooklm.google.com/notebook/e4f3eece-586c-49e0-897a-544cebe56761
- source_count: 4

Purpose:

- text generation and visual generation for the mandatory regulated Why Us asset

Sources:

- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- `buyer-facing/regulated/02-why-us-regulated.md`
- `notebooklm-briefs/12-regulated-why-us-brief.md`

What was done:

- first text run
- rerun after tightening claim/language controls
- clean text pass achieved
- visual slide deck generated

Saved outputs:

- `run-results/2026-03-22-why-us-notebooklm-clean.md`
- `run-results/visuals/regulated-why-us-bezpechnishe-vprovadzhennia.pdf`

Current status:

- text: passed
- visual: release-ready candidate

Next step:

- human visual review of the PDF

### 3. One Job / Text

Notebook:

- title: `REGULATED / One Job / Text`
- id: `32eafde7-dc70-4663-9f2b-c744e59769ab`
- url: https://notebooklm.google.com/notebook/32eafde7-dc70-4663-9f2b-c744e59769ab
- source_count: 4

Purpose:

- text generation for the mandatory regulated One Job asset

Sources:

- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- `buyer-facing/regulated/03-one-job-unified-line.md`
- `notebooklm-briefs/13-regulated-one-job-brief.md`

What was done:

- first text run with drift
- targeted prompt tightening
- second text run with clean pass candidate

Saved outputs:

- `run-results/2026-03-22-one-job-notebooklm-revise.md`
- `run-results/2026-03-22-one-job-notebooklm-clean.md`

Current status:

- text: passed

Next step:

- none at text layer unless later wording correction is required

### 4. One Job / Visual

Notebook:

- title: `REGULATED / One Job / Visual`
- id: `9be5e89c-132c-43ed-9024-1046f6177c1d`
- url: https://notebooklm.google.com/notebook/9be5e89c-132c-43ed-9024-1046f6177c1d
- source_count: 4

Purpose:

- visual generation for the mandatory regulated One Job asset

Sources:

- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- `buyer-facing/regulated/03-one-job-unified-line.md`
- `notebooklm-briefs/13-regulated-one-job-brief.md`

What was done:

- visual slide deck generated

Saved outputs:

- `run-results/visuals/regulated-one-job-kerovana-liniia.pdf`

Current status:

- visual: release-ready candidate

Next step:

- human visual review of the PDF

### 5. Edge Cases / Text

Notebook:

- title: `REGULATED / Edge Cases / Text`
- id: `25b37bc9-6f79-4da1-a153-6fbe6d01c463`
- url: https://notebooklm.google.com/notebook/25b37bc9-6f79-4da1-a153-6fbe6d01c463
- source_count: 4

Purpose:

- text generation for the mandatory regulated Edge Cases asset

Sources:

- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- `buyer-facing/regulated/04-edge-cases-exceptions.md`
- `notebooklm-briefs/14-regulated-edge-cases-brief.md`

What was done:

- first text run with overclaims
- rerun after tightening prompt
- clean text pass achieved

Saved outputs:

- `run-results/2026-03-22-edge-cases-notebooklm-revise.md`
- `run-results/2026-03-22-edge-cases-notebooklm-clean.md`

Current status:

- text: passed

Next step:

- none at text layer unless later wording correction is required

### 6. Edge Cases / Visual

Notebook:

- title: `REGULATED / Edge Cases / Visual`
- id: `d7f0e00a-81ce-481b-a6aa-b5bd4ab19852`
- url: https://notebooklm.google.com/notebook/d7f0e00a-81ce-481b-a6aa-b5bd4ab19852
- source_count: 4

Purpose:

- visual generation for the mandatory regulated Edge Cases asset

Sources:

- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- `buyer-facing/regulated/04-edge-cases-exceptions.md`
- `notebooklm-briefs/14-regulated-edge-cases-brief.md`

What was done:

- slide deck generation failed because the free-plan slide-deck quota was exhausted
- asset was rerouted through infographic generation
- infographic completed and downloaded locally

Saved outputs:

- `run-results/visuals/regulated-edge-cases-zrilist-vprovadzhennia.png`

Current status:

- visual: generated, but requires later rerun

Reason:

- visible copy drifted into English

Next step:

- rerun later with infographic quota and stricter Ukrainian-only visual rules

### 7. Evidence Pack / Text

Notebook:

- title: `REGULATED / Evidence Pack / Text`
- id: `df81338e-e697-454c-9b1e-013c38ac13fd`
- url: https://notebooklm.google.com/notebook/df81338e-e697-454c-9b1e-013c38ac13fd
- source_count: 4

Purpose:

- text generation for the mandatory regulated Evidence Pack asset

Sources:

- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- `buyer-facing/regulated/05-evidence-pack-audit-ready.md`
- `notebooklm-briefs/15-regulated-evidence-pack-brief.md`

What was done:

- first text run with claim drift
- rerun after tightening prompt
- clean text pass achieved

Saved outputs:

- `run-results/2026-03-22-evidence-pack-notebooklm-revise.md`
- `run-results/2026-03-22-evidence-pack-notebooklm-clean.md`

Current status:

- text: passed

Next step:

- none at text layer unless later wording correction is required

### 8. Evidence Pack / Visual

Notebook:

- title: `REGULATED / Evidence Pack / Visual`
- id: `f3973629-1ac6-4a98-a4e4-3edcc1b0a6e8`
- url: https://notebooklm.google.com/notebook/f3973629-1ac6-4a98-a4e4-3edcc1b0a6e8
- source_count: 4

Purpose:

- visual generation for the mandatory regulated Evidence Pack asset

Sources:

- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- `buyer-facing/regulated/05-evidence-pack-audit-ready.md`
- `notebooklm-briefs/15-regulated-evidence-pack-brief.md`

What was done:

- slide deck generation failed because the free-plan slide-deck quota was exhausted
- asset was rerouted through infographic generation
- infographic completed and downloaded locally

Saved outputs:

- `run-results/visuals/regulated-evidence-pack-spokii-i-kontrol.png`

Current status:

- visual: generated, but requires later rerun

Reason:

- mixed English / Ukrainian visible copy

Next step:

- rerun later with infographic quota and stricter Ukrainian-only visual rules

### 9. Technical Deck / Text

Notebook:

- title: `REGULATED / Technical Deck / Text`
- id: `7b495a98-d837-4144-b9f7-8c1a15bfc1bc`
- url: https://notebooklm.google.com/notebook/7b495a98-d837-4144-b9f7-8c1a15bfc1bc
- source_count: 4

Purpose:

- text generation for the mandatory regulated Technical Deck asset

Sources:

- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- `buyer-facing/regulated/06-technical-presale-deck.md`
- `notebooklm-briefs/16-regulated-technical-deck-brief.md`

What was done:

- first text run with architecture paraphrase and overclaims
- rerun after tightening prompt
- clean text pass achieved

Saved outputs:

- `run-results/2026-03-22-technical-deck-notebooklm-revise.md`
- `run-results/2026-03-22-technical-deck-notebooklm-clean.md`

Current status:

- text: passed

Next step:

- none at text layer unless later wording correction is required

### 10. Technical Deck / Visual

Notebook:

- title: `REGULATED / Technical Deck / Visual`
- id: `cf45709c-fa6b-4c40-9def-25b0456a6776`
- url: https://notebooklm.google.com/notebook/cf45709c-fa6b-4c40-9def-25b0456a6776
- source_count: 4

Purpose:

- visual generation for the mandatory regulated Technical Deck asset

Sources:

- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- `buyer-facing/regulated/06-technical-presale-deck.md`
- `notebooklm-briefs/16-regulated-technical-deck-brief.md`

What was done:

- slide deck generation failed because the free-plan slide-deck quota was exhausted
- asset was rerouted through infographic generation
- infographic completed and downloaded locally

Saved outputs:

- `run-results/visuals/regulated-technical-deck-arkhitektura-iadra.png`

Current status:

- visual: generated, but requires later rerun

Reason:

- mixed-language visible copy
- unsafe `Risk-Free` wording in headline
- architecture wording was paraphrased

Next step:

- rerun later with infographic quota and stricter Ukrainian-only visual rules plus exact contour wording

### 11. Technical Deck / Visual / Empty Draft

Notebook:

- title: `REGULATED / Technical Deck / Visual / Empty Draft`
- id: `27a60eee-9f31-4bca-ae23-c4ddb19f755a`
- url: https://notebooklm.google.com/notebook/27a60eee-9f31-4bca-ae23-c4ddb19f755a
- source_count: 0

Purpose:

- accidental or abandoned draft notebook

What was done:

- created, but not used

Current status:

- inactive

Next step:

- leave untouched for now
- do not use it in the working flow

## Current operating picture

### Mandatory text layer

- all 6 mandatory regulated text routes are complete

### Mandatory visual layer

- 3 assets are generated as slide decks and are the main release candidates:
  - Executive Deck
  - Why Us
  - One Job
- 3 assets are generated as infographics and need later rerun:
  - Edge Cases
  - Evidence Pack
  - Technical Deck

## Next actions

1. Review the three slide-deck PDFs visually and decide whether they are release-ready as-is
2. Use the tightened visual rules for the next rerun wave
3. Rerun later:
   - Edge Cases visual
   - Evidence Pack visual
   - Technical Deck visual
4. After mandatory visual review, move to the next approved branch:
   - Gorobina follow-up packet
