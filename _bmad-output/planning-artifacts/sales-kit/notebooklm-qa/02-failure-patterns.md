---
title: Notebook LM QA - Failure Patterns and Routing
asset_type: QA gate
audience: Reviewer / Notebook LM operator / sales enablement
funnel_stage: Review
decision_to_unlock: Diagnose why a mandatory regulated output failed and route the fix to the right layer
one_sentence_purpose: Turn QA failures into precise upstream corrections instead of random manual patching
single_key_message: Fix the broken layer first; do not hide structural failures with cosmetic edits
primary_cta: Route failure correctly
secondary_cta: Approve rerun only after upstream correction
owner: Sales enablement / reviewer
status: Locked fail gate
last_updated: 2026-03-21
source_inputs:
  - notebooklm-qa/01-output-checklist.md
  - regulated-final-bundle/03-run-paths.md
  - regulated-final-bundle/04-acceptance-gate.md
---

# Notebook LM QA - Failure Patterns and Routing

| Failure pattern | What it looks like | Fix first |
|-----------------|--------------------|-----------|
| Product drift | platform-first story, weak product identity, `genu.mark` not clearly sold | `regulated-final-bundle/01-control-packet.md` and `regulated-final-bundle/02-approved-regulated-source-packet.md` |
| Contour drift | `ERP` or `еАкциз` look internal, ERP split missing | `regulated-final-bundle/01-control-packet.md`, then the approved buyer-facing source asset |
| Scenario mixing | regulated plus voluntary logic, early `genu.code`, proof branch takes over | control packet and upload pack discipline |
| Draft leakage | output sounds like notes, meta-language, internal memo | prompt first, then approved buyer-facing source asset |
| Wrong asset structure | wrong slide order, missing mandatory blocks, weak CTA | matching brief |
| Weak format | too long, dense, hard to design, poor hierarchy | matching prompt |
| Reviewer disagreement | pass/fail feels ambiguous | matching `notebooklm-qa/1x-...` file and `regulated-final-bundle/04-acceptance-gate.md` |

## Rule

If the failure changes strategy, fix upstream.

If the failure changes only formatting, fix the prompt.

If the failure changes only the artifact skeleton, fix the brief.
