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
| Executive Deck | yes | yes | yes | yes | yes | yes | review_pending | no | human_visual_review_pending | Review `regulated-executive-deck-genu-mark-yak-sylne-iadro.pdf` |
| Why Us | yes | yes | yes | yes | yes | yes | review_pending | no | human_visual_review_pending | Review `regulated-why-us-bezpechnishe-vprovadzhennia.pdf` |
| One Job | yes | yes | yes | yes | yes | yes | review_pending | no | human_visual_review_pending | Review `regulated-one-job-kerovana-liniia.pdf` |
| Edge Cases | yes | yes | yes | yes | yes | yes | no | yes | visual_language_drift | Rerun visual asset later with stricter Ukrainian-only rules |
| Evidence Pack | yes | yes | yes | yes | yes | yes | no | yes | visual_language_drift | Rerun visual asset later with stricter Ukrainian-only rules |
| Technical Deck | yes | yes | yes | yes | yes | yes | no | yes | visual_language_drift_and_weak_claim_drift | Rerun visual asset later with stricter Ukrainian-only rules and exact architecture wording |

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
