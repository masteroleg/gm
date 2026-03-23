---
title: Claude Handoff Main - Regulated Sales Kit
status: Active onboarding document
owner: Founder / next agent
last_updated: 2026-03-23
---

# Claude Handoff Main / Regulated Sales Kit

## Executive Summary

This project builds and hardens a regulated `sales-kit` for `eАкциз`-driven buyer conversations. The business objective is not to educate the market about regulation, but to persuade buyers that `genu.mark` is the safest and clearest path for a mandatory rollout.

The core audience is:
- executives and owners
- production and operations leaders
- technical buyers and presale stakeholders
- compliance and audit stakeholders later in the deal

Current state:
- the mandatory regulated meaning layer is complete
- all 6 mandatory text-generation routes have passed
- all 6 mandatory visual routes have produced artifacts
- none of the 6 visual artifacts are release-ready yet
- the 3 slide-deck artifacts later failed language QA
- the 3 infographic artifacts remain fallback outputs that need later rerun because of language or claim drift
- `slide_deck` lane is confirmed available again because a new Technical Deck slide deck was created on 2026-03-23
- `One Job` rerun in the `slide_deck` lane is currently in progress
- `Edge Cases` infographic rerun in the `infographic` lane is currently in progress

Already done:
- control packet and source packet are locked
- mandatory regulated assets were rewritten around `genu.mark first`
- prompts, briefs, runbooks, and QA files were hardened
- NotebookLM notebook inventory and lineage are recorded
- continuity and handoff system is in place

Not finished:
- rerun of the 3 slide-deck visuals with stricter Ukrainian-only output control
- later rerun of the 3 infographic visuals with stricter Ukrainian-only output control
- next branch after mandatory visual reruns: `Gorobina` follow-up packet

Most important decisions already made:
- sell `genu.mark`, not the platform, because the buyer must immediately understand the object of sale
- keep `ERP` and `eАкциз` outside the core, because architecture confusion weakens trust
- use `strong core first` as the central sales logic, because buyers are choosing a safer rollout path, not maximum system breadth
- keep handoff and operating docs in English, because this improves agent comprehension
- keep all outgoing buyer-facing artifacts in Ukrainian only, because English or mixed visible copy is not release-ready

## System Context

The system consists of:
- source-of-truth docs
- buyer-facing regulated assets
- NotebookLM briefs, prompts, runbooks, and QA gates
- working notebooks and saved artifacts
- continuity and handoff docs in `regulated-final-bundle`
- external distilled references for prompt design and NotebookLM tooling

The working regulated notebooks are split by asset and by layer when needed:
- executive deck
- why us
- one job
- edge cases
- evidence pack
- technical deck

Primary working artifacts:
- 3 slide-deck PDFs that require rerun:
  - executive deck
  - why us
  - one job
- 3 infographic PNGs that require rerun:
  - edge cases
  - evidence pack
  - technical deck

Primary source-of-truth docs:
- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- `source-of-truth/04-regulated-buyer-model.md`
- `source-of-truth/05-message-house.md`
- `source-of-truth/06-claims-register.md`

Operational support docs:
- `regulated-final-bundle/08-notebooklm-registry.md`
- `regulated-final-bundle/09-asset-state-board.md`
- `regulated-final-bundle/10-run-ledger.md`

External distilled references:
- `external-references/01-awesome-notebooklm-prompts-distillate.md`
- `external-references/02-notebooklm-mcp-cli-distillate.md`

## Sales Narrative

What is sold:
- `genu.mark`
- safe regulated implementation around the line core
- `Dominanta + Logictime` as the safer route to rollout

Narrative order:
1. `eАкциз` implementation is mandatory
2. the real buyer question is how to launch safely
3. `genu.mark` is the strong line core
4. `ERP` and `eАкциз` are external contours
5. `strong core first` lowers rollout risk
6. `Dominanta + Logictime` is the safer implementation path
7. next step is audit / architecture session / pilot

Mandatory wording:
- `genu.mark` is the line core
- `ERP -> source of production job`
- `ERP / internal systems <- exchange of results and statuses`
- `eАкциз <- separate external state contour`
- the core receives codes, applies, verifies, aggregates, and returns packaging result

Forbidden wording:
- platform-first opening
- ecosystem-first explanation
- shared-core framing
- early regulated mention of `genu.code`
- unsourced new entities or new architecture layers
- weak claims such as `risk-free`, `guaranteed`, `turnkey`, `single responsibility`, `full package`

Allowed CTAs:
- audit the line
- architecture session
- pilot

## Roles And Product Boundaries

`genu.im`
- supporting proof context only when needed
- never the opening frame in regulated motion

`genu.mark`
- the only product being sold in regulated motion
- the strong line core
- receives codes
- applies
- verifies
- aggregates
- returns packaging result

`genu.code`
- separate voluntary branch
- never introduced in early regulated narrative

`Dominanta / Domino`
- Domino equipment
- trusted commercial entry point

`Logictime`
- architecture
- integrations
- exceptions
- implementation
- launch

What belongs to the core:
- line flow
- code application
- verification
- reject / rework control
- aggregation
- packaging result state

What stays external:
- ERP in two roles
- `eАкциз` state contour
- other internal systems

What must never be mixed:
- `genu.mark` core with `ERP` or `eАкциз`
- regulated narrative with `genu.code`
- safe rollout story with abstract platform story

## Source Of Truth And Content Governance

Generation is governed by:
- control packet
- approved regulated source packet
- approved buyer-facing asset
- matching brief
- matching prompt
- matching QA gate

Locked and generation-ready:
- mandatory regulated control docs
- mandatory regulated buyer-facing assets
- mandatory regulated briefs / prompts / runbooks / QA

Do not rewrite without a concrete failure signal:
- `regulated-final-bundle/01-control-packet.md`
- `regulated-final-bundle/02-approved-regulated-source-packet.md`
- passed buyer-facing regulated assets

Do not use as default upload sources:
- prompt docs
- QA docs
- SOP distillate
- account-specific notes
- optional shared assets unless intentionally branching

## Deck Review State

Current visual rerun focus:
- `One Job` rerun artifact `154d007d-9de3-4260-b02d-fb3fbb3e8405`
- `Why Us`
- `Executive Deck`
- `Technical Deck` new slide-deck artifact `ebbb927d-5d8c-4ff0-b2bd-bbe6274569ac` needs review

Known slide-deck failures:
- Executive Deck:
  - English visible copy on pages 4, 5, 6, 7, 9
- Why Us:
  - English visible copy on pages 5, 6, 7, 9, 10
  - page 5 contour wording is correct and should be preserved
- One Job:
  - English visible copy on pages 1 and 4 only
  - best first rerun target

Known infographic failures:
- `Edge Cases`:
  - English visible copy
- `Evidence Pack`:
  - mixed-language visible copy
- `Technical Deck`:
  - mixed-language visible copy
  - unsafe `Risk-Free` wording
  - paraphrased contour labels

## Visual Direction

Correct visual language:
- regulated industrial premium
- calm, structured, explainable
- executive and evidence-led rather than SaaS-demo style

Good output:
- one strong message per slide or screen
- clear hierarchy
- easy to forward and explain
- visibly grounded in industrial rollout reality

Bad output:
- startup or dashboard aesthetics
- decorative complexity
- English or mixed visible copy
- NotebookLM branding, service logo, watermark, product chrome, or generator residue
- architecture sprawl
- unsourced new concepts
- broad superiority claims

NotebookLM visual failure patterns:
- drifts into English if language rules are not explicit enough
- invents stronger claims than allowed
- paraphrases architecture wording unless told to preserve it exactly

## Working Methods

For any mandatory regulated run:
1. start from `00-continue-here.md`
2. use `03-run-paths.md`
3. upload exactly 4 sources:
   - control packet
   - approved source packet
   - one approved asset
   - one matching brief
4. paste the matching prompt separately
5. save raw output locally
6. review against the matching QA gate and acceptance gate

Revision logic:
- strategy drift -> fix control packet or source packet
- structure drift -> fix brief
- tone / format drift -> fix prompt
- visual copy drift -> fix visual rules and rerun visual generation

Do not lose source grounding:
- one notebook = one asset
- no prompt docs or QA docs in sources
- no optional sources unless the branch explicitly requires them

## Tooling And Environment

Working environment:
- NotebookLM via MCP is operational
- notebook state, ids, and outputs are tracked locally
- upstream NotebookLM access docs are distilled locally in `external-references/02-notebooklm-mcp-cli-distillate.md`

Practical rule:
- source files in NotebookLM are static copies
- if a source or brief changes, refresh it in the notebook before rerunning

Generation-lane rule:
- `slide_deck` and `infographic` are independent practical lanes with separate limits
- if one lane is exhausted, continue approved work in the other lane
- do not call the whole visual pipeline blocked unless both lanes are unavailable

Known working local references:
- notebooks and statuses are tracked in `08-notebooklm-registry.md`
- run history is tracked in `10-run-ledger.md`

## Risks And Failure Modes

High-risk mistakes:
- selling `genu.im` instead of `genu.mark`
- blending core with `ERP` or `eАкциз`
- reintroducing `genu.code` into regulated buyer-facing logic
- treating passed text assets as permission to reopen meaning-layer decisions
- trusting mixed-language visual outputs as final
- forgetting that `slide_deck` and `infographic` are separate lanes

False assumptions to avoid:
- “visual generation succeeded” does not mean “release-ready”
- “English in visuals is acceptable because the handoff is English” is false
- “a new notebook title explains itself” is false unless it is recorded in the registry
- “slide-deck quota exhausted means all visual work is blocked” is false

## Multi-Agent Coordination

Codex and Claude are working on the same project.

Rules:
- do not keep critical discoveries in private memory only
- reread continuity docs before acting on interrupted work
- after any meaningful change, update the local continuity system
- if one agent changes operating truth, the other agent must be able to discover it from local files, not from chat reconstruction

## Language Policy

Agent-facing handoff and operating docs:
- English

Chat with the founder:
- Russian

All outgoing buyer-facing artifacts:
- Ukrainian only

Allowed visible exceptions:
- approved names such as `genu.mark`, `Domino`, `ERP`

Automatic non-final condition:
- any buyer-facing artifact with English or mixed visible copy is not release-ready
- any buyer-facing artifact with NotebookLM branding, watermark, service logo, product chrome, or generator residue is not release-ready

## What Must Not Be Broken

- `genu.mark first`
- `strong core first`
- `ERP` external in two roles
- `eАкциз` external
- safe rollout message over platform story
- Ukrainian-only buyer-facing outputs
- one notebook = one asset
- `slide_deck` and `infographic` must stay distinct as operating lanes
- source-of-truth vs experimental outputs must stay explicit

## What The Next Agent Must Do First

1. read `00-continue-here.md`
2. read this handoff
3. read the appendix inventory
4. read `09-asset-state-board.md`
5. rerun `One Job` in the `slide_deck` lane
6. continue with `Why Us`
7. continue with `Executive Deck`

## Next Actions

Highest priority now:
- review `One Job` rerun artifact when complete
- then continue the failed slide-deck visuals in this order:
  - Why Us
  - Executive Deck

Parallel note:
- because the lanes are independent, infographic reruns may continue whenever infographic capacity exists
- current infographic rerun already in progress:
  - Edge Cases artifact `0ef38cfd-1fcb-474f-ae9b-6fb09d716b3a`

Next deliverable after that:
- three Ukrainian-only slide-deck reruns that pass language QA

Then:
- prepare rerun prompts for:
  - Edge Cases visual
  - Evidence Pack visual
  - Technical Deck visual

## Immediate Start Guide For Claude

Open in this order:
1. `regulated-final-bundle/00-continue-here.md`
2. `regulated-final-bundle/11-claude-handoff-main.md`
3. `regulated-final-bundle/12-claude-handoff-appendix.md`
4. `regulated-final-bundle/09-asset-state-board.md`

Then inspect:
- current slide-deck QA failures
- `13-visual-review-protocol.md`
- relevant notebook and prompt files before rerunning

## First 60 Minutes Plan

1. Read the Executive Summary and Language Policy
2. Read Roles And Product Boundaries
3. Read Sales Narrative
4. Read the appendix inventory
5. Confirm the active notebooks, lanes, and artifacts
6. Review `One Job` rerun artifact when complete
7. Update continuity docs with the new result
8. Continue with `Why Us` only after the shared state is updated

## Questions Claude Should Not Re-ask

- what `genu.im`, `genu.mark`, and `genu.code` are
- who `Dominanta`, `Domino`, and `Logictime` are
- what is core and what is external
- what the regulated narrative is
- what the mandatory regulated assets are
- which notebooks are active
- which MCP path is already working
- what language the outgoing artifacts must use
- whether `slide_deck` and `infographic` are one combined quota

## Open Questions That Actually Matter

- can the next `slide_deck` reruns eliminate English visible copy without harming structure quality
- in what order should infographic reruns be executed once infographic capacity is available
- should the next branch after mandatory visual reruns be `Gorobina` or another explicitly approved deliverable
