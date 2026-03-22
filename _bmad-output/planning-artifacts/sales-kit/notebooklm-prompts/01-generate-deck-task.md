---
title: Notebook LM Prompt - Generate Deck Task
asset_type: Prompt task
audience: Notebook LM operator
funnel_stage: Generation
decision_to_unlock: Generate a source-grounded regulated presentation draft
one_sentence_purpose: Provide a reusable Notebook LM prompt for short regulated deck generation without strategic drift
single_key_message: Ask for an exact deck format, grounded only in uploaded sources, with Ukrainian output and hard strategic exclusions
primary_cta: Run in Notebook LM
secondary_cta: Review result with Notebook LM QA docs
owner: Sales enablement / content lead
status: Legacy optional prompt
last_updated: 2026-03-21
source_inputs:
  - notebooklm-source/00-operating-brief.md
  - notebooklm-briefs/01-dominanta-ready-solution-deck-brief.md
---

# Notebook LM Prompt - Generate Deck Task

## Prompt block

```text
You are generating a source-grounded regulated sales presentation draft.

Use only the uploaded sources. If a statement, role, claim, contour, or visual instruction is not supported by the uploaded sources, omit it.

Write the final artifact in modern, clear Ukrainian. The final artifact must be self-contained and readable if forwarded by email.

Task:
Create a short regulated sales deck based strictly on the uploaded brief and control packet.

Hard exclusions:
- do not introduce additional products;
- do not create one unified deck across regulated and voluntary scenarios;
- do not elevate platform over product;
- do not make ERP or еАкциз look like the core itself;
- do not make genu.im the lead object of sale;
- do not introduce genu.code into the early regulated narrative;
- do not use operator-language or meta-language in the final artifact.

Requirements:
- keep one main message per slide;
- make it obvious from slide 1 that genu.mark is being sold;
- keep the core and external contours visually clear;
- keep the primary CTA exact;
- do not use banned claims.

Return in this exact structure:

Part A - Deck draft table
| Slide | Headline | On-slide copy | Speaker note | Visual instruction | CTA role |

Part B - Source control notes
- Which uploaded sources shaped the output most
- Which claims were intentionally omitted
- Any warning where human review is still needed
```
