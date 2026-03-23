---
title: Reviewer Pass Log - Regulated
status: Active reviewer log
owner: Sales-kit QA layer
last_updated: 2026-03-23
---

# Reviewer Pass Log / Regulated

## Reviewer used for this pass

- reviewer: OpenCode agent QA reviewer
- pass date: 2026-03-21
- pass type: in-session reviewer pass

## Approved buyer-facing regulated assets

- `buyer-facing/regulated/01-executive-deck-regulated.md` -> passed reviewer QA for narrative order, architecture contour, and CTA
- `buyer-facing/regulated/02-why-us-regulated.md` -> passed reviewer QA for value order, partner framing, and CTA
- `buyer-facing/regulated/03-one-job-unified-line.md` -> passed reviewer QA for one-line core framing and contour clarity
- `buyer-facing/regulated/04-edge-cases-exceptions.md` -> passed reviewer QA for exception coverage and contour restatement
- `buyer-facing/regulated/05-evidence-pack-audit-ready.md` -> passed reviewer QA for evidence model and split-of-responsibility framing
- `buyer-facing/regulated/06-technical-presale-deck.md` -> passed reviewer QA for core/external architecture, ERP split, evidence, exceptions, and rollout path

## Operationalized mandatory generation paths

- executive deck -> brief / prompt / runbook / QA created
- why us -> brief / prompt / runbook / QA created
- one job -> brief / prompt / runbook / QA created
- edge cases -> brief / prompt / runbook / QA created
- evidence pack -> brief / prompt / runbook / QA created
- technical deck -> brief / prompt / runbook / QA created

## Remaining note

If a later human commercial reviewer requests wording changes, update the matching asset, matching brief or prompt, and rerun the QA gate before release.

## NotebookLM validation pass - 2026-03-22

- executive deck -> clean pass candidate saved in `run-results/2026-03-22-executive-deck-notebooklm-rerun-v2-clean.md`
- why us -> clean pass candidate saved in `run-results/2026-03-22-why-us-notebooklm-clean.md`
- one job -> clean pass candidate saved in `run-results/2026-03-22-one-job-notebooklm-clean.md`
- edge cases -> clean pass candidate saved in `run-results/2026-03-22-edge-cases-notebooklm-clean.md`
- evidence pack -> clean pass candidate saved in `run-results/2026-03-22-evidence-pack-notebooklm-clean.md`
- technical deck -> clean pass candidate saved in `run-results/2026-03-22-technical-deck-notebooklm-clean.md`

All six mandatory routes were rerun against updated regulated sources, updated briefs, updated prompts, and tightened QA gates.

## NotebookLM visual generation status - 2026-03-22

Completed and downloaded locally:

- executive deck -> `run-results/visuals/regulated-executive-deck-genu-mark-yak-sylne-iadro.pdf`
- why us -> `run-results/visuals/regulated-why-us-bezpechnishe-vprovadzhennia.pdf`
- one job -> `run-results/visuals/regulated-one-job-kerovana-liniia.pdf`

Prepared and source-ready, but blocked by NotebookLM Studio slide-deck creation failure:

- edge cases -> notebook prepared, Studio returned `Could not create slide deck.`
- evidence pack -> notebook prepared, Studio returned `Could not create slide deck.`
- technical deck -> notebook prepared, Studio returned `Could not create slide deck.`

Current interpretation:

- the mandatory regulated meaning layer is passing
- the remaining blocker is now Studio artifact generation, not source quality or prompt discipline
- the prepared notebooks should be retried before any optional expansion begins

## NotebookLM infographic generation status - 2026-03-22

The remaining three mandatory assets were rerouted through the separate infographic quota after the free-plan slide-deck limit was reached.

Infographics completed and downloaded locally for:

- edge cases -> `run-results/visuals/regulated-edge-cases-zrilist-vprovadzhennia.png`
- evidence pack -> `run-results/visuals/regulated-evidence-pack-spokii-i-kontrol.png`
- technical deck -> `run-results/visuals/regulated-technical-deck-arkhitektura-iadra.png`

Result:

- the full mandatory regulated batch now exists as generated buyer-facing visuals
- the free-plan slide-deck cap was bypassed for the remaining assets through the separate infographic quota

## Visual QA findings - 2026-03-22

Primary findings from the completed infographic batch:

- edge cases infographic -> structure is directionally strong, but visible copy drifted into English; requires Ukrainian-only rerun when another infographic slot is available
- evidence pack infographic -> mixed English / Ukrainian output; structure is useful, but buyer-facing language discipline failed
- technical deck infographic -> mixed-language output and unsafe `Risk-Free` headline; also paraphrases the approved architecture wording instead of preserving it exactly

Interpretation:

- this is a visual-production drift, not a meaning-layer failure
- the next rerun should tighten visible-language rules, ban `risk-free` / similar weak claims, and require exact approved contour wording when architecture appears

## Visual QA findings - 2026-03-23

Slide-deck review later found that the first three PDF artifacts are also not release-ready.

Findings:

- executive deck -> English visible copy on pages 4, 5, 6, 7, 9
- why us -> English visible copy on pages 5, 6, 7, 9, 10; page 5 contour wording is correct and should be preserved as the reference contour slide
- one job -> English visible copy on pages 1 and 4 only; best first rerun target

Interpretation:

- all six mandatory visual artifacts currently require rerun before release
- no meaning-layer blocker is active
- `slide_deck` and `infographic` must now be tracked as independent visual-generation lanes with independent practical limits
