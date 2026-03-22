---
title: Notebook LM QA - Universal Output Checklist
asset_type: QA gate
audience: Reviewer / sales enablement / founder
funnel_stage: Review
decision_to_unlock: Decide whether a generated mandatory regulated asset is ready or must be rejected
one_sentence_purpose: Give reviewers one universal checklist for validating any mandatory regulated Notebook LM output
single_key_message: If the output fails `genu.mark`-first logic, exact contour clarity, buyer-facing readability, or CTA discipline, it is not ready
primary_cta: Approve or reject generated output
secondary_cta: Route fixes to the correct upstream layer
owner: Sales enablement / reviewer
status: Locked fail gate
last_updated: 2026-03-21
source_inputs:
  - regulated-final-bundle/01-control-packet.md
  - regulated-final-bundle/04-acceptance-gate.md
---

# Notebook LM QA - Universal Output Checklist

## Instant FAIL

Reject immediately if any item below is true:
- [ ] the deck or one-pager sells a platform instead of `genu.mark`
- [ ] `ERP` is shown as part of the core
- [ ] `еАкциз` is shown as part of the core
- [ ] `genu.code` appears in early regulated narrative
- [ ] regulated and voluntary logic are mixed
- [ ] the text sounds like operator-source draft
- [ ] the output does not lead to audit / architecture session / pilot

## Core clarity

- [ ] it is obvious from the first screen or first block that `genu.mark` is being sold
- [ ] the core inside `genu.mark` is visible
- [ ] `ERP -> source of production job` is visible
- [ ] `ERP / internal systems <- exchange of results and statuses` is visible
- [ ] `еАкциз` is visibly external

## Buyer-facing quality

- [ ] the output reads like something safe to forward to a buyer
- [ ] the language is modern Ukrainian
- [ ] the structure is visual and scannable, not memo-like
- [ ] one main message per slide / block is obvious

## Claim safety

- [ ] only safe or properly qualified claims are used
- [ ] no guarantees, rank claims, or unsupported comparisons appear
- [ ] proof language stays inside the approved boundary

## Decision

- `Pass` = no instant fail, all checklist items hold
- `Revise` = strategy is correct but local structure or wording is weak
- `Reject` = any instant fail is triggered
