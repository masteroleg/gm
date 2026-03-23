---
title: NotebookLM Registry - Regulated Sales Kit
status: Active
owner: Sales enablement / NotebookLM operator
last_updated: 2026-03-23
---

# NotebookLM Registry / Regulated Sales Kit

## Purpose

This file is the single local source of truth for the NotebookLM operating state of the regulated sales kit.

It answers:
- how many notebooks exist for the regulated sales kit
- what each notebook is for
- what has already been generated
- which generation lane was used
- what artifacts were saved locally
- what still needs to happen next
- how Codex and Claude must coordinate on shared state

Start every interrupted session from:

- `regulated-final-bundle/00-continue-here.md`

This registry is an operational support document, not the onboarding document.
For a new Claude agent, use:
- `regulated-final-bundle/11-claude-handoff-main.md`
- `regulated-final-bundle/12-claude-handoff-appendix.md`

## Shared-agent rule

- Codex and Claude operate on the same project memory.
- Neither agent may keep critical operational knowledge only in chat or private reasoning.
- Any meaningful discovery about NotebookLM state, lane availability, artifact quality, or workflow constraints must be written back into the continuity system.

## Generation lanes

- `slide_deck` and `infographic` are independent visual-generation lanes.
- They have separate practical limits and must be tracked separately.
- If one lane is exhausted, continue approved work in the other lane.
- Do not describe the whole visual pipeline as blocked unless both lanes are blocked or meaning-layer QA fails.

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
- visual slide deck generated in the `slide_deck` lane

Saved outputs:

- `run-results/2026-03-22-executive-deck-notebooklm-baseline.md`
- `run-results/2026-03-22-executive-deck-notebooklm-rerun-2.md`
- `run-results/2026-03-22-executive-deck-notebooklm-rerun-valid.md`
- `run-results/2026-03-22-executive-deck-notebooklm-rerun-v2-clean.md`
- `run-results/visuals/regulated-executive-deck-genu-mark-yak-sylne-iadro.pdf`

Current status:

- text: passed
- visual: visual QA fail

Reason:

- English visible copy on pages 4, 5, 6, 7, 9

Next step:

- rerun in the `slide_deck` lane with Ukrainian-only visible-copy enforcement

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
- visual slide deck generated in the `slide_deck` lane

Saved outputs:

- `run-results/2026-03-22-why-us-notebooklm-clean.md`
- `run-results/visuals/regulated-why-us-bezpechnishe-vprovadzhennia.pdf`

Current status:

- text: passed
- visual: visual QA fail

Reason:

- English visible copy on pages 5, 6, 7, 9, 10
- page 5 has correct Ukrainian contour wording and should be preserved as the reference contour slide

Next step:

- rerun in the `slide_deck` lane with Ukrainian-only visible-copy enforcement

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

- visual slide deck generated in the `slide_deck` lane
- rerun started on 2026-03-23 with stricter Ukrainian-only visible-copy enforcement

Saved outputs:

- `run-results/visuals/regulated-one-job-kerovana-liniia.pdf`

Current in-progress artifact:

- `154d007d-9de3-4260-b02d-fb3fbb3e8405` -> new `slide_deck` rerun started

Current status:

- visual: visual QA fail

Reason:

- English visible copy on pages 1 and 4 only
- this is the cleanest failed slide deck and the best first rerun candidate

Next step:

- rerun in the `slide_deck` lane first

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

- slide deck generation failed because the `slide_deck` lane was exhausted at that time
- asset was rerouted into the independent `infographic` lane
- infographic completed and downloaded locally
- infographic rerun started on 2026-03-23 with stricter Ukrainian-only visible-copy enforcement

Saved outputs:

- `run-results/visuals/regulated-edge-cases-zrilist-vprovadzhennia.png`

Current in-progress artifact:

- `0ef38cfd-1fcb-474f-ae9b-6fb09d716b3a` -> new `infographic` rerun started

Current status:

- visual: generated, but requires later rerun

Reason:

- visible copy drifted into English

Next step:

- review rerun artifact `0ef38cfd-1fcb-474f-ae9b-6fb09d716b3a` when complete

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

- slide deck generation failed because the `slide_deck` lane was exhausted at that time
- asset was rerouted into the independent `infographic` lane
- infographic completed and downloaded locally

Saved outputs:

- `run-results/visuals/regulated-evidence-pack-spokii-i-kontrol.png`

Current status:

- visual: generated, but requires later rerun

Reason:

- mixed English / Ukrainian visible copy

Next step:

- rerun later in the `infographic` lane with stricter Ukrainian-only visual rules

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

- slide deck generation failed because the `slide_deck` lane was exhausted at that time
- asset was rerouted into the independent `infographic` lane
- infographic completed and downloaded locally
- a new `slide_deck` artifact was also created on 2026-03-23, proving the `slide_deck` lane is available again

Saved outputs:

- `run-results/visuals/regulated-technical-deck-arkhitektura-iadra.png`

Additional artifact recorded in NotebookLM:

- `ebbb927d-5d8c-4ff0-b2bd-bbe6274569ac` -> `slide_deck` titled `Resilient e-Excise Production Architecture`

Current status:

- visual: generated, but requires later rerun

Reason:

- mixed-language visible copy
- unsafe `Risk-Free` wording in headline
- architecture wording was paraphrased
- new slide-deck artifact exists but is still unreviewed and not yet canonical

Next step:

- review the new slide-deck artifact first
- keep the infographic fallback as experimental until the new slide deck is reviewed

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

- all 6 mandatory assets have visual artifacts
- none are currently release-ready
- `slide_deck` lane artifacts that failed QA:
  - Executive Deck
  - Why Us
  - One Job
- `infographic` lane artifacts that failed QA:
  - Edge Cases
  - Evidence Pack
  - Technical Deck

## External references now stored locally

- `external-references/01-awesome-notebooklm-prompts-distillate.md`
- `external-references/02-notebooklm-mcp-cli-distillate.md`

## Next actions

1. Rerun `One Job` first in the `slide_deck` lane
2. Review `One Job` rerun artifact `154d007d-9de3-4260-b02d-fb3fbb3e8405` when complete
3. Rerun `Why Us` next in the `slide_deck` lane
4. Rerun `Executive Deck` after that in the `slide_deck` lane
4. Continue with `infographic`-lane reruns when that lane is available:
   - Edge Cases visual
   - Evidence Pack visual
   - Technical Deck visual
5. Review the new Technical Deck slide-deck artifact before deciding canonical visual direction
6. After mandatory visual reruns pass, move to the next approved branch:
   - Gorobina follow-up packet
