---
title: Visual Release Status - Regulated Mandatory Pack
status: Active
owner: Sales enablement / QA
last_updated: 2026-03-23
---

# Visual Release Status / Regulated Mandatory Pack

## Summary

The mandatory regulated visual batch has been generated end-to-end.

Current split:

- 3 assets generated as slide decks and downloaded locally
- 3 assets generated as infographics and downloaded locally
- `slide_deck` and `infographic` must be treated as separate visual-generation lanes with separate practical limits
- the slide-deck lane was exhausted after the first three visual artifacts, so the remaining assets were completed through the separate infographic lane

## Language policy

- all outgoing buyer-facing visuals must be Ukrainian only
- visible English or mixed-language copy makes the artifact non-final
- approved visible exceptions are limited to names such as `genu.mark`, `Domino`, and `ERP`

## Release-ready artifacts

None at this time. All three slide-deck PDFs reviewed 2026-03-23 and failed language QA gate.

## Reviewed and requiring visual rerun

### Executive Deck

Artifact:

- `run-results/visuals/regulated-executive-deck-genu-mark-yak-sylne-iadro.pdf`

Reason:

- English visible copy on pages 4, 5, 6, 7, 9 — diagram labels, UI chrome, placeholder text
- Worst page: p6 (seam/risk slide — nearly all diagram labels in English)
- Meaning layer: intact, do not reopen

Recommended rerun condition:

- rerun visual generation only
- enforce Ukrainian-only visible copy
- use Why Us deck p5 as reference for correct ERP contour wording

### Why Us

Artifact:

- `run-results/visuals/regulated-why-us-bezpechnishe-vprovadzhennia.pdf`

Reason:

- English visible copy on pages 5, 6, 7, 9, 10
- Most visible failure: `APPROVED FOR AUDIT` English stamp on p10 CTA slide
- Note: p5 contour wording is correctly Ukrainian — use as reference prompt template
- Meaning layer: intact, do not reopen

Recommended rerun condition:

- rerun visual generation only
- enforce Ukrainian-only visible copy
- retain p5 contour wording as reference: `ERP -> джерело виробничого завдання` etc.

### One Job

Artifact:

- `run-results/visuals/regulated-one-job-kerovana-liniia.pdf`

Reason:

- English visible copy on pages 1 and 4 only — fewest failures of the three decks
- p1: `DOC.REF : GENU.MARK // REGULATORY COMPLIANCE` metadata on cover
- p4: English ERP contour labels (same pattern as Executive Deck p4)
- Meaning layer: intact, do not reopen

Recommended rerun condition:

- rerun visual generation only
- enforce Ukrainian-only visible copy
- remove doc-ref metadata from cover or translate
- use Why Us deck p5 for correct ERP contour wording

## Generated but requiring later rerun

### Edge Cases

Artifact:

- `run-results/visuals/regulated-edge-cases-zrilist-vprovadzhennia.png`

Reason:

- visible copy drifted into English

Recommended rerun condition:

- rerun when another infographic slot is available
- force Ukrainian-only visible copy

### Evidence Pack

Artifact:

- `run-results/visuals/regulated-evidence-pack-spokii-i-kontrol.png`

Reason:

- mixed English / Ukrainian output

Recommended rerun condition:

- rerun when another infographic slot is available
- force Ukrainian-only visible copy

### Technical Deck

Artifact:

- `run-results/visuals/regulated-technical-deck-arkhitektura-iadra.png`

Reason:

- mixed-language visible copy
- unsafe `Risk-Free` wording in headline
- architecture wording was paraphrased rather than kept in approved form

Recommended rerun condition:

- rerun when another infographic slot is available
- force Ukrainian-only visible copy
- ban `risk-free` / similar weak claims
- require exact approved ERP / eАкциз contour wording

## Mandatory batch status

Meaning layer:

- passed

NotebookLM text generation layer:

- passed for all 6 mandatory assets

Visual generation layer:

- completed for all 6 mandatory assets
- none are release-ready yet
- all 6 require visual rerun due to production drift, not meaning drift

## Next priority

1. Rerun `One Job` in the `slide_deck` lane
2. Rerun `Why Us` in the `slide_deck` lane
3. Rerun `Executive Deck` in the `slide_deck` lane
4. Later rerun the three infographic artifacts when infographic capacity allows
5. Only after that: account-specific branch or optional expansion

## Operating reference

For full notebook-level state, use:

- `regulated-final-bundle/08-notebooklm-registry.md`
