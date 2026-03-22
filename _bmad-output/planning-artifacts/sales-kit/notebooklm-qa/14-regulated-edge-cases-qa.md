---
title: QA - Edge Cases / Regulated
status: Locked asset QA gate
owner: NotebookLM QA layer
last_updated: 2026-03-21
---

# QA / Edge Cases / Regulated

## Instant fail

FAIL if the asset stays on happy path only, hides the contour split, or lacks a next step.

## Asset checklist

- the contour restatement appears before exception detail
- exceptions feel real, not decorative
- ERP handoffs are explicit
- `еАкциз` remains external
- the CTA is explicit

## Acceptance criteria

- print / verify / reject / rework covered
- offline / line stop / changeover covered
- aggregation break logic covered
- ERP handoff risk covered
- next step present
