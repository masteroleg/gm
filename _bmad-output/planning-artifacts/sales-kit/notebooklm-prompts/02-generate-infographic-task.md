---
title: Notebook LM Prompt - Generate Infographic Task
asset_type: Prompt task
audience: Notebook LM operator
funnel_stage: Generation
decision_to_unlock: Generate a source-grounded regulated infographic draft
one_sentence_purpose: Provide a reusable Notebook LM prompt for one-page regulated infographic generation
single_key_message: Ask for one visual regulated argument, not a memo, and keep the output grounded in the uploaded sources
primary_cta: Run in Notebook LM
secondary_cta: Review result with Notebook LM QA docs
owner: Sales enablement / content lead
status: Legacy optional prompt
last_updated: 2026-03-21
source_inputs:
  - notebooklm-source/00-operating-brief.md
  - notebooklm-briefs/02-dominanta-one-job-infographic-brief.md
---

# Notebook LM Prompt - Generate Infographic Task

## Prompt block

```text
You are generating a one-page regulated infographic draft from uploaded sales-kit sources.

Use only the uploaded sources. Do not invent claims, products, contours, or visual blocks beyond those sources.

Write the final artifact in modern, clear Ukrainian. The final artifact must be self-contained and easy to forward by email.

Task:
Create a one-page infographic draft that follows the uploaded brief exactly.

Hard exclusions:
- do not introduce additional products;
- do not mix regulated and voluntary scenarios;
- do not make genu.im the main object on the page;
- do not make ERP or еАкциз look like the core itself;
- do not introduce genu.code into the page;
- do not return an essay or memo.

Requirements:
- one main idea only;
- clear contrast;
- low text density;
- obvious reading order;
- obvious CTA;
- clear core vs external contours.

Return in this exact structure:

Part A - Infographic draft
- Headline
- Subhead
- Top band
- Main visual structure
- Left-side copy blocks
- Right-side copy blocks
- Bottom outcomes
- CTA strip
- Visual direction notes

Part B - Source control notes
- Which uploaded sources shaped the output most
- Which claims were intentionally omitted
- Any warning where human review is still needed
```
