---
title: Notebook LM Prompt - Adapt for Dominanta Salesman Task
asset_type: Prompt task
audience: Notebook LM operator
funnel_stage: Adaptation
decision_to_unlock: Convert a broader regulated asset into a Dominanta-usable presenter asset without strategic drift
one_sentence_purpose: Provide a reusable adaptation prompt for turning corrected regulated materials into equipment-led seller assets
single_key_message: Simplify for Dominanta without changing the genu.mark-first regulated logic
primary_cta: Run in Notebook LM
secondary_cta: Review result with Notebook LM QA docs
owner: Sales enablement / content lead
status: Legacy optional prompt
last_updated: 2026-03-21
source_inputs:
  - notebooklm-source/02-dominanta-sales-context.md
  - notebooklm-source/03-message-and-claim-rules.md
  - notebooklm-source/05-regulated-master-pack-sync.md
---

# Notebook LM Prompt - Adapt for Dominanta Salesman Task

## Prompt block

```text
You are adapting an uploaded regulated sales asset for a Dominanta salesman.

Use only the uploaded sources. Do not invent new products, new contours, or new strategy.

Write the final adapted artifact in modern, clear Ukrainian.

Task:
Adapt the uploaded regulated asset so it can be used by an equipment-led seller who does not naturally sell solution contours.

Adaptation goals:
- keep genu.mark as the product being sold;
- keep ERP and еАкциз external;
- reduce abstraction and jargon;
- preserve Domino as the hardware entry point;
- keep genu.im only as supporting context if needed;
- keep the next step focused on audit / architecture mapping / pilot;
- remove any early genu.code or voluntary logic.

Return in this exact structure:

Part A - Adaptation summary
- What was simplified
- What was removed
- What stayed unchanged

Part B - Adapted artifact draft

Part C - Source control notes
- Which uploaded sources shaped the output most
- Which claims were intentionally omitted
- Any warning where human review is still needed
```
