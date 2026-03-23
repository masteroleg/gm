---
type: external-distillate
status: active reference
last_updated: 2026-03-23
source:
  - https://github.com/jacob-bd/notebooklm-mcp-cli
  - https://github.com/jacob-bd/notebooklm-mcp-cli/tree/main/docs
purpose: Distilled operating reference for NotebookLM CLI/MCP usage in this project.
---

# notebooklm-mcp-cli / Distillate

## What changed upstream

- Upstream project now presents a unified package that exposes both:
  - `nlm` CLI
  - `notebooklm-mcp` MCP server
- Docs directory contains dedicated guides for:
  - Authentication
  - CLI Guide
  - MCP Guide
  - API Reference
  - Known Issues

## Two usage lanes upstream

- CLI lane:
  - direct terminal control through `nlm`
  - useful for notebook management, sources, studio generation, downloads, sharing, diagnostics
- MCP lane:
  - tool-based agent access through `notebooklm-mcp`
  - useful when an AI agent needs structured notebook operations

## Capabilities confirmed in upstream README

- notebook list / create
- source add
- notebook query
- studio create
- artifact download
- slide revision
- research
- sharing
- tag management
- setup automation
- diagnostics via `nlm doctor`

## Authentication model

- NotebookLM access requires authentication before CLI or MCP use.
- Upstream examples shown:
  - `nlm login`
  - `nlm login --manual`
  - `nlm login --check`
  - `nlm login switch <profile>`
  - `nlm login profile list`
- Profiles are isolated browser sessions.

## Setup model

- Upstream examples shown:
  - `nlm setup add claude-code`
  - `nlm setup add claude-desktop`
  - `nlm setup add gemini`
  - `nlm setup add cursor`
  - `nlm setup add json`

## Project-specific interpretation

- Upstream docs are capability references, not the local source of truth for current project state.
- Local project truth still lives in:
  - `regulated-final-bundle/00-continue-here.md`
  - `regulated-final-bundle/08-notebooklm-registry.md`
  - `regulated-final-bundle/10-run-ledger.md`

## Critical local operating rule

- NotebookLM sources are static copies.
- If a source or brief changes, refresh it in the notebook before rerunning.

## Generation-lane policy to preserve

- `slide_deck` and `infographic` are two separate visual-generation lanes with separate practical limits.
- If the `slide_deck` lane is exhausted, continue approved work in the `infographic` lane.
- If the `infographic` lane is exhausted, continue approved work in the `slide_deck` lane.
- Do not mark the whole visual pipeline blocked unless both lanes are unavailable.

## Multi-agent rule

- Both Codex and Claude must read local continuity docs before acting.
- Neither agent should treat upstream docs as permission to override local policy.
- Any meaningful operational discovery must be written back into local continuity docs.

## Recommended use in this project

- Use this distillate for onboarding and tooling decisions.
- Do not upload it into NotebookLM as a buyer-facing source.
- Do not let it override Ukrainian-only output policy or regulated narrative rules.
