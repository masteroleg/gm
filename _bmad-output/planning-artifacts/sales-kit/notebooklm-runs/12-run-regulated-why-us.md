---
title: Runbook - Why Us / Regulated
status: Approved execution runbook
owner: NotebookLM run layer
last_updated: 2026-03-21
---

# Runbook / Why Us / Regulated

## Exact source upload set

Upload exactly these four files into one notebook:
- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- `buyer-facing/regulated/02-why-us-regulated.md`
- `notebooklm-briefs/12-regulated-why-us-brief.md`

## Exact prompt to paste

Paste:
- `notebooklm-prompts/12-generate-regulated-why-us.md`

## Review gate

Review the generated output against:
- `notebooklm-qa/12-regulated-why-us-qa.md`
- `notebooklm-qa/01-output-checklist.md`
- `regulated-final-bundle/04-acceptance-gate.md`

## Fix routing

- strategy drift -> final bundle docs
- structure drift -> `notebooklm-briefs/12-regulated-why-us-brief.md`
- tone / formatting drift -> `notebooklm-prompts/12-generate-regulated-why-us.md`
- unclear cause -> `notebooklm-qa/02-failure-patterns.md`
