---
title: Claims Register
asset_type: Governance
audience: Internal
funnel_stage: All stages
decision_to_unlock: Lock which regulated claims are safe, qualified, or blocked
one_sentence_purpose: Keep regulated language credible, bounded, and consistent across source packet, briefs, prompts, and buyer-facing outputs
single_key_message: Every allowed claim must preserve `genu.mark`-first logic, the ERP split, the `еАкциз` boundary, and disciplined proof language
primary_cta: Approve claim states
secondary_cta: Use in drafting and QA
owner: Founder / analyst / reviewer
status: Approved upstream
review_status: Reviewed for mandatory regulated pack on 2026-03-21
last_updated: 2026-03-22
source_inputs:
  - notebooklm-source/05-regulated-master-pack-sync.md
  - source-of-truth/01-platform-core.md
  - source-of-truth/05-message-house.md
---

# Claims Register

## Safe claims

| ID | Claim | Usage rule |
|----|-------|------------|
| C-01 | `genu.mark is the strong line core for еАкциз implementation.` | Use broadly in regulated assets |
| C-02 | `ERP is external in two roles: source of production job and exchange of results/statuses.` | Must appear whenever architecture is shown |
| C-03 | `еАкциз is a separate external contour.` | Use wherever external boundaries are shown |
| C-04 | `Strong core first reduces launch risk, overload, and manual error.` | Safe commercial framing |
| C-05 | `Dominanta + Logictime gives the buyer a more controllable implementation path.` | Safe comparative framing |
| C-06 | `25M+ industrial deployment in Ukraine.` | Use as written; do not inflate |
| C-07 | `Public proof does not replace official or legal verification.` | Use whenever public proof is mentioned |
| C-08 | `genu.mark receives codes, applies, verifies, aggregates, and gives packaging result.` | Safe simple-core rendering for regulated assets |

## Qualified claims

| ID | Claim | Usage rule |
|----|-------|------------|
| Q-01 | Segment-specific strength wording for SZZR / plant-protection market | Use only in tailored reviewed material |
| Q-02 | Case-comparison wording based on open-source review | Use only with attribution and careful scope |

## Blocked claims

Never use externally:
- `ми єдині`, `№1`, `найбільші`, `тільки ми можемо`;
- `guaranteed compliance`, `ensures compliance`, `guarantees acceptance`;
- `best equipment`, `turnkey`, `single responsibility`, `full package`, or equivalent unsupported superiority claims;
- any wording that makes `ERP` or `еАкциз` part of the core;
- any early regulated narrative that introduces `genu.code`;
- any opening sell that makes `genu.im` the main object of sale;
- any new product, platform layer, or architectural entity not present in approved regulated sources.

## Mandatory fail gate

Reject the asset if:
- it says only `ERP integration` and hides the two-role split;
- it shows `еАкциз` as part of the core;
- it sounds stronger than what can be calmly defended in a buyer meeting;
- it reads like internal planning notes.

## Replacement guide

| Risky wording | Replace with |
|---------------|--------------|
| `platform / ecosystem offer` | `strong line core plus external contours` |
| `ERP integration` | `ERP -> production job; ERP / internal systems <- results and statuses` |
| `proof solves compliance` | `proof supports review but does not replace official verification` |
| `full contour from day one` | `start from the core and connect external blocks deliberately` |
| `best equipment / turnkey / single responsibility / full package` | `reliable equipment / safer path / clearer boundaries / controllable rollout` |
