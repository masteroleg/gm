---
title: QA - Edge Cases / Regulated
status: Locked asset QA gate
owner: NotebookLM QA layer
last_updated: 2026-03-22
---

# QA / Edge Cases / Regulated

## Instant fail

FAIL if the asset stays on happy path only, hides the contour split, lacks a next step, introduces unsourced entities, reads like a decorative list of exceptions, or shows NotebookLM branding / watermark / service chrome / generator residue.

## Asset checklist

- the contour restatement appears before exception detail
- exceptions feel real, not decorative
- ERP handoffs are explicit
- `еАкциз` remains external
- the CTA is explicit
- the buyer should feel that the team understands real production, not only happy path
- No NotebookLM branding, watermark, service badge, UI chrome, or document-reference residue is visible.

## Acceptance criteria

- print / verify / reject / rework covered
- offline / line stop / changeover covered
- aggregation break logic covered
- ERP handoff risk covered
- next step present
- the buyer could retell why this is a maturity proof, not a feature list
