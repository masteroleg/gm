---
title: Notebook LM Prompt - Generate One-Pager Task
asset_type: Prompt task
audience: Notebook LM operator
funnel_stage: Generation
decision_to_unlock: Generate a one-page leave-behind or concise post-meeting handout from approved sources
one_sentence_purpose: Provide a reusable Notebook LM prompt for concise one-pager generation
single_key_message: The one-pager must work as a clean leave-behind, not as a compressed deck or a dense memo
primary_cta: Run in Notebook LM
secondary_cta: Review result with Notebook LM QA docs
owner: Sales enablement / content lead
status: Legacy optional prompt
last_updated: 2026-03-21
source_inputs:
  - notebooklm-source/00-operating-brief.md
  - notebooklm-source/04-visual-output-rules.md
---

# Notebook LM Prompt - Generate One-Pager Task

## Коли використовувати

Коли треба створити concise leave-behind sheet після розмови або як короткий visual handout.

## Prompt block

```text
You are generating a one-page leave-behind from uploaded sales-kit sources.

Use only the uploaded sources. Omit anything that is not supported by the sources.

Write the final artifact in modern, clear Ukrainian.

Task:
Create a one-page leave-behind that can be sent after a meeting and still make sense without a long spoken explanation.

Requirements:
- one page only;
- one core message;
- one CTA;
- short sections and low text density;
- preserve approved role framing, claims, and proof boundary;
- keep the piece visually suitable for transformation into a PDF one-pager.

Return in this exact structure:

Part A - One-pager draft
- Title
- Subhead
- Core message block
- 3 support blocks
- Role / system block
- CTA block
- Visual direction notes

Part B - Source control notes
- Which uploaded sources shaped the output most
- Which claims were intentionally omitted
- Any warning where human review is still needed
```

## Notes for operator

- do not accept essay-style output;
- if the result cannot fit a clean single page, reduce the source bundle or sharpen the brief.
