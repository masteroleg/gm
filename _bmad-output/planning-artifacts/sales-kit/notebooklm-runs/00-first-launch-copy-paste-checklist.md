---
title: NotebookLM Runbook - First Launch Copy-Paste Checklist
asset_type: Operator shortcut
audience: Operator / reviewer / sales enablement
funnel_stage: First execution
decision_to_unlock: Run the first safe mandatory regulated generation without browsing the archive
one_sentence_purpose: Give one compact checklist for the first executive-deck run or the first One Job run
single_key_message: Start from the final regulated bundle, keep the upload pack compact, then pass QA before any design work
primary_cta: Run first launch safely
secondary_cta: Route failures to the correct upstream layer
owner: Sales enablement / content lead
status: Approved execution shortcut
last_updated: 2026-03-21
source_inputs:
  - README.md
  - regulated-final-bundle/03-run-paths.md
  - regulated-final-bundle/04-acceptance-gate.md
---

# NotebookLM Runbook - First Launch Copy-Paste Checklist

## Main rule

- do not upload extra files;
- do not mix regulated and voluntary;
- do not improvise the prompt in the first run;
- do not move to design before QA pass.

## Option A - first run for executive deck

### Upload pack

1. `regulated-final-bundle/01-control-packet.md`
2. `regulated-final-bundle/02-approved-regulated-source-packet.md`
3. `buyer-facing/regulated/01-executive-deck-regulated.md`
4. `notebooklm-briefs/11-regulated-executive-deck-brief.md`

### Prompt

Paste `notebooklm-prompts/11-generate-regulated-executive-deck.md`.

### Quick sanity check

Accept only if:
- slide 1 already sells `genu.mark`;
- one slide clearly shows core vs external contours;
- both ERP roles are explicit;
- `еАкциз` stays external;
- CTA leads to audit / architecture session / pilot.

## Option B - first run for One Job

### Upload pack

1. `regulated-final-bundle/01-control-packet.md`
2. `regulated-final-bundle/02-approved-regulated-source-packet.md`
3. `buyer-facing/regulated/03-one-job-unified-line.md`
4. `notebooklm-briefs/13-regulated-one-job-brief.md`

### Prompt

Paste `notebooklm-prompts/13-generate-regulated-one-job.md`.

### Quick sanity check

Accept only if:
- the contrast is simple and obvious;
- `genu.mark` is clearly the core;
- both ERP roles are outside the core;
- `еАкциз` stays external;
- CTA is concrete.

## After any first run

Review:
- `notebooklm-qa/01-output-checklist.md`
- the matching detailed QA file in `notebooklm-qa/11-16`
- `regulated-final-bundle/04-acceptance-gate.md`

If the output fails, go to `notebooklm-runs/03-review-and-fix-loop.md`.
