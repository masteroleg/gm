---
title: Asset State Board - Regulated Sales Kit
status: Active
owner: Founder / next agent / QA
last_updated: 2026-03-23
---

# Asset State Board / Regulated Sales Kit

## Status fields

- `text_source_ready`
- `brief_ready`
- `prompt_ready`
- `text_run_done`
- `text_passed`
- `visual_run_done`
- `visual_passed`
- `needs_rerun`
- `blocked_by`
- `generation_lane`
- `next_action`

## Board

| Asset | text_source_ready | brief_ready | prompt_ready | text_run_done | text_passed | visual_run_done | visual_passed | needs_rerun | blocked_by | generation_lane | next_action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Executive Deck | yes | yes | yes | yes | yes | yes | no | yes | visual_language_drift | slide_deck | **RERUN** — keep structure; replace English labels on p4 p5 p6 p7 p9; preserve exact contour wording and Ukrainian-only visible copy. |
| Why Us | yes | yes | yes | yes | yes | yes | no | yes | visual_language_drift | slide_deck | **RERUN** — preserve strong p5 contour wording; remove English labels on p5 p6 p7 p9 p10; remove English approval stamp; enforce Ukrainian-only visible copy. |
| One Job | yes | yes | yes | yes | yes | yes | no | yes | visual_language_drift | slide_deck | **IN PROGRESS** — rerun started as artifact `154d007d-9de3-4260-b02d-fb3fbb3e8405`; review it when complete, then continue. |
| Edge Cases | yes | yes | yes | yes | yes | yes | no | yes | visual_language_drift | infographic | **IN PROGRESS** — rerun started as artifact `0ef38cfd-1fcb-474f-ae9b-6fb09d716b3a`; review it when complete. |
| Evidence Pack | yes | yes | yes | yes | yes | yes | no | yes | visual_language_drift + layout_overload | infographic | **RERUN LATER** — Ukrainian only; simplify unreadable density; preserve evidence hierarchy. |
| Technical Deck | yes | yes | yes | yes | yes | yes | no | yes | visual_language_drift + weak_claim | infographic | **REVIEW NEW SLIDE DECK** — new slide-deck artifact `ebbb927d-5d8c-4ff0-b2bd-bbe6274569ac` exists; review it before deciding whether infographic fallback remains active. |

## Current verdicts — 2026-03-23

| Priority | Asset | Reason |
| --- | --- | --- |
| P0 | One Job | Rerun already started; review completion first |
| P0 | Why Us | Preserve p5 contour slide; remove English labels and approval stamp |
| P0 | Executive Deck | Largest English diagram cleanup in slide_deck lane |
| P1 | Edge Cases | Infographic lane rerun once infographic quota is available |
| P1 | Evidence Pack | Infographic lane rerun with stronger hierarchy control |
| P1 | Technical Deck | New slide-deck artifact exists and must be reviewed before more reruns |

## Interpretation rules

- `needs_rerun=yes` means do not rewrite the meaning layer first; fix the visual-generation layer unless a new QA signal proves otherwise.
- `blocked_by` must name the real blocker type, not a vague summary.
- `generation_lane` must explicitly say whether the artifact belongs to `slide_deck` or `infographic`.
- `slide_deck` and `infographic` must be tracked as independent lanes with independent availability.
- buyer-facing outputs with English or mixed visible copy must not be treated as visually passed.
- buyer-facing outputs with NotebookLM branding, watermark, service logo, product chrome, or generator residue must not be treated as visually passed.

## Language policy

- handoff and operating docs may be in English
- buyer-facing outputs must be Ukrainian only
- approved visible exceptions are limited to names such as `genu.mark`, `Domino`, and `ERP`

## Current priority order

1. Review One Job rerun artifact when complete
2. Why Us slide-deck rerun
3. Executive Deck slide-deck rerun
4. Review Edge Cases infographic rerun when complete
5. Evidence Pack infographic rerun
6. Review Technical Deck new slide deck
7. only then move to the next branch
