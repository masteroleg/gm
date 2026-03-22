---
title: Notebook LM Prompt - Generate Talk-Track Card Task
asset_type: Prompt task
audience: Notebook LM operator
funnel_stage: Generation
decision_to_unlock: Generate a compact seller-support card from approved sources
one_sentence_purpose: Provide a reusable Notebook LM prompt for speaking-aid generation
single_key_message: The talk-track card must help the seller answer briefly and move to the next step, not explain the whole solution
primary_cta: Run in Notebook LM
secondary_cta: Review result with Notebook LM QA docs
owner: Sales enablement
status: Legacy optional prompt
last_updated: 2026-03-21
source_inputs:
  - notebooklm-source/00-operating-brief.md
  - notebooklm-briefs/04-dominanta-objection-card-brief.md
---

# Notebook LM Prompt - Generate Talk-Track Card Task

## Коли використовувати

Коли треба створити seller-support card або objection-response sheet для live conversation.

## Prompt block

```text
You are generating a seller-support talk-track card from uploaded sales-kit sources.

Use only the uploaded sources. Do not invent product logic, claims, legal positions, or integration promises.

Write the final artifact in modern, clear Ukrainian.

Task:
Create a compact talk-track card that helps an equipment-led seller answer briefly, reframe the conversation, and move the buyer to the correct next step.

Requirements:
- keep answers short enough to speak aloud;
- preserve the 3-step answer model if present in the sources;
- protect against banned claims;
- make escalation boundaries explicit;
- keep the joint contour session as the core next step.

Return in this exact structure:

Part A - Talk-track card draft
- Card title
- 3-step answer model
- Question / short answer / reframe / next-step table
- Escalation block
- Safe bridge phrases
- What not to say

Part B - Source control notes
- Which uploaded sources shaped the output most
- Which claims were intentionally omitted
- Any warning where human review is still needed
```

## Notes for operator

- if the card becomes too long to scan in one glance, the result is not usable.
