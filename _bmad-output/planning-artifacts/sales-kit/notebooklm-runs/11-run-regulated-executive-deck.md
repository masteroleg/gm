---
title: Runbook - Executive Deck / Regulated
status: Approved execution runbook
owner: NotebookLM run layer
last_updated: 2026-03-22
---

# Runbook / Executive Deck / Regulated

## Exact source upload set

Upload exactly these four files into one notebook:
- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- `buyer-facing/regulated/01-executive-deck-regulated.md`
- `notebooklm-briefs/11-regulated-executive-deck-brief.md`

## Exact prompt to paste

Paste:
- `notebooklm-prompts/11-generate-regulated-executive-deck.md`

## Expected deliverable

- 10-12 slide executive deck by default
- 8-9 slides only if no mandatory meaning is lost
- 13-14 slides only if each extra slide closes a distinct buying-question
- audience: CEO / owner / GM / sponsor
- CTA: audit / architecture session / pilot

## Review gate

Review the generated output against:
- `notebooklm-qa/11-regulated-executive-deck-qa.md`
- `notebooklm-qa/01-output-checklist.md`
- `regulated-final-bundle/04-acceptance-gate.md`

## If the output fails

- strategic drift -> fix `regulated-final-bundle/01-control-packet.md` or `regulated-final-bundle/02-approved-regulated-source-packet.md`
- wrong asset structure -> fix `notebooklm-briefs/11-regulated-executive-deck-brief.md`
- wrong formatting or weak delivery style -> fix `notebooklm-prompts/11-generate-regulated-executive-deck.md`
- unclear failure cause -> route with `notebooklm-qa/02-failure-patterns.md`

## Release rule

Release only if the deck is buyer-facing, modern Ukrainian, strategically correct, ready to forward without verbal correction, and easy for the buyer to retell in five points: what is sold, what is core, what is external, why this is safer, and what the next step is.
