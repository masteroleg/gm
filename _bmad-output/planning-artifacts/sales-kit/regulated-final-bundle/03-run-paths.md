---
title: Final Regulated Run Paths
status: Approved execution map
owner: Sales-kit control layer
last_updated: 2026-03-23
---

# Final Regulated Run Paths

## Standard run order

1. Read `regulated-final-bundle/01-control-packet.md`.
2. Read `regulated-final-bundle/02-approved-regulated-source-packet.md`.
3. Pick exactly one asset path below.
4. Upload the four source files listed in that asset path.
5. Paste the matching prompt.
6. Review against the matching QA file and `regulated-final-bundle/04-acceptance-gate.md`.
7. If the output fails, route fixes using `notebooklm-qa/02-failure-patterns.md`.

## Visual lane rule

- `slide_deck` and `infographic` are two separate generation lanes with separate practical limits.
- If the target output is blocked in one lane by quota, continue approved work in the other lane if that other lane still has capacity.
- Do not mark the whole visual pipeline blocked unless both lanes are unavailable or a meaning-layer blocker appears.
- Always record which lane produced the current artifact in the continuity docs.

## Asset paths

### 11. Executive deck

- Source asset: `buyer-facing/regulated/01-executive-deck-regulated.md`
- Brief: `notebooklm-briefs/11-regulated-executive-deck-brief.md`
- Prompt: `notebooklm-prompts/11-generate-regulated-executive-deck.md`
- QA: `notebooklm-qa/11-regulated-executive-deck-qa.md`
- Runbook: `notebooklm-runs/11-run-regulated-executive-deck.md`

### 12. Why us

- Source asset: `buyer-facing/regulated/02-why-us-regulated.md`
- Brief: `notebooklm-briefs/12-regulated-why-us-brief.md`
- Prompt: `notebooklm-prompts/12-generate-regulated-why-us.md`
- QA: `notebooklm-qa/12-regulated-why-us-qa.md`
- Runbook: `notebooklm-runs/12-run-regulated-why-us.md`

### 13. One Job

- Source asset: `buyer-facing/regulated/03-one-job-unified-line.md`
- Brief: `notebooklm-briefs/13-regulated-one-job-brief.md`
- Prompt: `notebooklm-prompts/13-generate-regulated-one-job.md`
- QA: `notebooklm-qa/13-regulated-one-job-qa.md`
- Runbook: `notebooklm-runs/13-run-regulated-one-job.md`

### 14. Edge Cases

- Source asset: `buyer-facing/regulated/04-edge-cases-exceptions.md`
- Brief: `notebooklm-briefs/14-regulated-edge-cases-brief.md`
- Prompt: `notebooklm-prompts/14-generate-regulated-edge-cases.md`
- QA: `notebooklm-qa/14-regulated-edge-cases-qa.md`
- Runbook: `notebooklm-runs/14-run-regulated-edge-cases.md`

### 15. Evidence Pack

- Source asset: `buyer-facing/regulated/05-evidence-pack-audit-ready.md`
- Brief: `notebooklm-briefs/15-regulated-evidence-pack-brief.md`
- Prompt: `notebooklm-prompts/15-generate-regulated-evidence-pack.md`
- QA: `notebooklm-qa/15-regulated-evidence-pack-qa.md`
- Runbook: `notebooklm-runs/15-run-regulated-evidence-pack.md`

### 16. Technical deck

- Source asset: `buyer-facing/regulated/06-technical-presale-deck.md`
- Brief: `notebooklm-briefs/16-regulated-technical-deck-brief.md`
- Prompt: `notebooklm-prompts/16-generate-regulated-technical-deck.md`
- QA: `notebooklm-qa/16-regulated-technical-deck-qa.md`
- Runbook: `notebooklm-runs/16-run-regulated-technical-deck.md`
