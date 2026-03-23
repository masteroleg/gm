---
title: Asset State Board - Regulated Sales Kit
status: Active
owner: Founder / next agent / QA
last_updated: 2026-03-22
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
- `next_action`

## Board

| Asset | text_source_ready | brief_ready | prompt_ready | text_run_done | text_passed | visual_run_done | visual_passed | needs_rerun | blocked_by | next_action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Executive Deck | yes | yes | yes | yes | yes | yes | no | yes | visual_language_drift + copy_energy | **REFINE** — keep structure and narrative; fix English labels; strengthen CTA (audit / architecture mapping / pilot); shorten 1–2 slides; check trust-claim per-slide. Do NOT regenerate from scratch. |
| Why Us | yes | yes | yes | yes | yes | yes | no | yes | wrong_format | **REGENERATE** — must become a one-pager (vertical), not a deck. One page only. 5 blocks: headline / framing paragraph / 4 buyer criteria / Dominanta+Logictime rationale / CTA. No multi-page output. |
| One Job | yes | yes | yes | yes | yes | yes | no | yes | wrong_format | **REGENERATE** — must become a one-page vertical infographic. 4 blocks: problem (manual chaos) / solution (one controlled flow) / result (calm + transparency) / CTA. Sell calm and manageability, not "unified process". |
| Edge Cases | yes | yes | yes | yes | yes | yes | no | yes | visual_language_drift + text_density | **REFINE** — format is already close to correct. Translate to full Ukrainian; reduce body copy; speed up scanning. Keep: composition, maturity-through-exceptions logic, comparison, CTA location. |
| Evidence Pack | yes | yes | yes | yes | yes | yes | no | yes | visual_language_drift + layout_overload | **STRONG REFINE** — full Ukrainian; reduce text blocks; enforce hierarchy: headline → evidence layers → business calm → CTA; simplify or remove unreadable table. Meaning layer sound. |
| Technical Deck | yes | yes | yes | yes | yes | yes | no | yes | wrong_format + visual_language_drift + weak_claim | **FULLY REGENERATE** — current output is a single poster, not a deck. Must become a real multi-slide deck: 10–12 slides minimum. Required slides: genu.mark as core / core only / ERP role ×2 / eАкциз boundary / line flow / aggregation / verification-reject-rework / offline-resilience / evidence / responsibilities / pilot-rollout. No poster format. |

## External review verdicts — 2026-03-23

Priority for rerun:

| Priority | Asset | Reason |
| --- | --- | --- |
| P0 | Technical Deck | Format failure — poster instead of deck |
| P0 | Why Us | Format failure — deck instead of one-pager |
| P0 | One Job | Format failure — deck instead of one-page infographic |
| P1 | Evidence Pack | Meaning sound, execution weak — strong refine needed |
| P1 | Edge Cases | Close to right format — clean refine only |
| P2 | Executive Deck | Best current output — refine only, do not regenerate |

## Interpretation rules

- `review_pending` means the asset exists and is a candidate, but still needs final visual review
- `needs_rerun=yes` means do not rewrite the meaning layer first; rerun only the visual generation layer unless a new QA signal proves otherwise
- `blocked_by` must always name the real blocker type, not a vague summary
- buyer-facing outputs with English or mixed visible copy must not be treated as visually passed

## Language policy

- handoff and operating docs may be in English
- buyer-facing outputs must be Ukrainian only
- approved visible exceptions are limited to names such as `genu.mark`, `Domino`, and `ERP`

## Current priority order

1. Executive Deck visual review
2. Why Us visual review
3. One Job visual review
4. Edge Cases visual rerun
5. Evidence Pack visual rerun
6. Technical Deck visual rerun
7. only then move to the next branch
