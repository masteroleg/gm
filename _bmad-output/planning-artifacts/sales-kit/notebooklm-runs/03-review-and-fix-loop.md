---
title: NotebookLM Runbook - Review and Fix Loop
asset_type: Operator runbook
audience: Operator / reviewer / sales enablement
funnel_stage: Review and iteration
decision_to_unlock: Decide what to fix after a regulated generation pass fails or comes out weak
one_sentence_purpose: Turn QA findings into a clean upstream correction loop instead of random manual patching
single_key_message: Fix the broken layer, then rerun; do not hide structural problems with cosmetic edits
primary_cta: Route failure to the correct layer
secondary_cta: Approve rerun after upstream correction
owner: Sales enablement / reviewer
status: Approved execution runbook
last_updated: 2026-03-21
source_inputs:
  - notebooklm-qa/01-output-checklist.md
  - notebooklm-qa/02-failure-patterns.md
  - regulated-final-bundle/04-acceptance-gate.md
---

# NotebookLM Runbook - Review and Fix Loop

## Correct cycle

`output review -> failure type -> upstream fix -> rerun -> QA again`

## Rule zero

Do not mask a system error with cosmetic rewriting.

## Step 1 - identify the asset path

Open `regulated-final-bundle/03-run-paths.md` and identify the exact asset you generated.

## Step 2 - run the gates

Review the output against:
- `notebooklm-qa/01-output-checklist.md`
- the matching detailed QA file in `notebooklm-qa/11-16`
- `regulated-final-bundle/04-acceptance-gate.md`

## Step 3 - fix the right layer

### Fix the final bundle if strategy drift appears

Use this path when the output:
- sells a platform instead of `genu.mark`;
- hides the ERP split;
- treats `ERP` or `еАкциз` as core;
- mixes regulated and voluntary logic.

Open:
- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`

### Fix the brief if structure drift appears

Use this path when the output has the wrong sections, wrong order, or weak CTA.

Open the matching file in `notebooklm-briefs/11-16`.

### Fix the prompt if formatting drift appears

Use this path when the output is too long, too memo-like, visually unusable, or structurally sloppy.

Open the matching file in `notebooklm-prompts/11-16`.

### Fix QA interpretation if the team cannot decide

Open:
- `notebooklm-qa/01-output-checklist.md`
- `notebooklm-qa/02-failure-patterns.md`
- the matching detailed QA file in `notebooklm-qa/11-16`

## Step 4 - decide whether to reuse the notebook

### Reuse the same notebook

If you changed only the prompt or tightened the brief.

### Start a new notebook

If you changed the control packet, the approved source packet, or the uploaded source mix.

## Step 5 - rerun discipline

After each material fix:
1. note which layer changed;
2. rerun generation;
3. pass the same three QA gates again.

## Good review decision

### Pass

The asset is strategically correct, buyer-facing, modern Ukrainian, and ready to forward.

### Revise

The asset is close but still needs one more upstream correction loop.

### Reject

The asset breaks strategy, contour logic, or release readiness and should not be cosmetically patched.
