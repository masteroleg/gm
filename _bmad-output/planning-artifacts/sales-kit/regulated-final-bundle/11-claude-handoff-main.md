---
title: Claude Handoff Main - Regulated Sales Kit
status: Active onboarding document
owner: Founder / next agent
last_updated: 2026-03-22
---

# Claude Handoff Main / Regulated Sales Kit

## Executive Summary

This project builds and hardens a regulated `sales-kit` for `еАкциз`-driven buyer conversations. The business objective is not to educate the market about why regulation exists, but to persuade buyers that `genu.mark` is the safest and clearest implementation path for a mandatory rollout.

The core audience is:
- executives and owners
- production and operations leaders
- technical buyers and presale stakeholders
- compliance and audit stakeholders later in the deal

Current state:
- the mandatory regulated meaning layer is complete
- all 6 mandatory text-generation routes have passed
- all 6 mandatory visual routes have produced artifacts
- 3 visual artifacts are current release candidates
- 3 visual artifacts were generated through infographic fallback and need later rerun because of visible-copy drift

Already done:
- control packet and source packet are locked
- mandatory regulated assets were rewritten around `genu.mark first`
- prompts, briefs, runbooks, and QA files were hardened
- NotebookLM notebook inventory and lineage are recorded

Not finished:
- final human visual review of the 3 PDF release candidates
- later rerun of 3 infographic visuals with stricter Ukrainian-only output control
- next branch after mandatory review: `Gorobina` follow-up packet

Most important decisions already made:
- sell `genu.mark`, not the platform, because the buyer must immediately understand the object of sale
- keep `ERP` and `еАкциз` outside the core, because architecture confusion weakens trust
- use `strong core first` as the central sales logic, because buyers are choosing a safer rollout path, not maximum system breadth
- keep the handoff and operating docs in English, because this improves agent comprehension
- keep all outgoing buyer-facing artifacts in Ukrainian only, because English or mixed visible copy is not release-ready

## System Context

The system consists of:
- source-of-truth docs
- buyer-facing regulated assets
- NotebookLM briefs, prompts, runbooks, and QA gates
- working notebooks and saved artifacts
- continuity and handoff docs in `regulated-final-bundle`

The working regulated notebooks are split by asset and by layer when needed:
- executive deck
- why us
- one job
- edge cases
- evidence pack
- technical deck

Primary working artifacts:
- 3 slide-deck PDFs:
  - executive deck
  - why us
  - one job
- 3 infographic PNGs:
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

## Sales Narrative

What is sold:
- `genu.mark`
- safe regulated implementation around the line core
- `Dominanta + Logictime` as the safer route to rollout

Narrative order:
1. `еАкциз` implementation is mandatory
2. the real buyer question is how to launch safely
3. `genu.mark` is the strong line core
4. `ERP` and `еАкциз` are external contours
5. `strong core first` lowers rollout risk
6. `Dominanta + Logictime` is the safer implementation path
7. next step is audit / architecture session / pilot

Mandatory wording:
- `genu.mark` is the line core
- `ERP -> source of production job`
- `ERP / internal systems <- exchange of results and statuses`
- `еАкциз <- separate external state contour`
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
- `еАкциз` state contour
- other internal systems

What must never be mixed:
- `genu.mark` core with `ERP` or `еАкциз`
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

Current visual review focus:
- `Executive Deck`
- `Why Us`
- `One Job`

Visual issues already found in the infographic batch:
- English or mixed-language visible copy
- unsafe visible claim like `Risk-Free`
- paraphrased architecture wording where exact contour wording should remain

Successful prompt behavior:
- tighter prompts improved text-generation quality across all 6 mandatory assets
- visual rules now explicitly require Ukrainian-only visible copy and exact contour wording when architecture appears

Not yet visually finalized:
- `Edge Cases`
- `Evidence Pack`
- `Technical Deck`

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

Practical rule:
- source files in NotebookLM are static copies
- if a source or brief changes, refresh it in the notebook before rerunning

Known working local references:
- notebooks and statuses are tracked in `08-notebooklm-registry.md`
- run history is tracked in `10-run-ledger.md`

Known instability:
- free NotebookLM plan has a slide-deck generation cap
- infographic generation may still work after slide-deck quota is exhausted

## Risks And Failure Modes

High-risk mistakes:
- selling `genu.im` instead of `genu.mark`
- blending core with `ERP` or `еАкциз`
- reintroducing `genu.code` into regulated buyer-facing logic
- treating passed text assets as permission to reopen meaning-layer decisions
- trusting mixed-language visual outputs as final

False assumptions to avoid:
- “visual generation succeeded” does not mean “release-ready”
- “English in visuals is acceptable because the handoff is English” is false
- “a new notebook title explains itself” is false unless it is recorded in the registry

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

## What Must Not Be Broken

- `genu.mark first`
- `strong core first`
- `ERP` external in two roles
- `еАкциз` external
- safe rollout message over platform story
- Ukrainian-only buyer-facing outputs
- one notebook = one asset
- source-of-truth vs experimental outputs must stay explicit

## What The Next Agent Must Do First

1. read `00-continue-here.md`
2. read this handoff
3. read the appendix inventory
4. read `09-asset-state-board.md`
5. review the three PDF release candidates
6. decide what is release-ready and what needs targeted visual revision

## Next Actions

Highest priority now:
- review the three slide-deck PDFs visually

Next deliverable after that:
- a clean visual review verdict for:
  - Executive Deck
  - Why Us
  - One Job

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
- `run-results/visuals/regulated-executive-deck-genu-mark-yak-sylne-iadro.pdf`
- `run-results/visuals/regulated-why-us-bezpechnishe-vprovadzhennia.pdf`
- `run-results/visuals/regulated-one-job-kerovana-liniia.pdf`

## First 60 Minutes Plan

1. Read the Executive Summary and Language Policy
2. Read Roles And Product Boundaries
3. Read Sales Narrative
4. Read the appendix inventory
5. Confirm the active notebooks and artifacts
6. Review the three PDF release candidates
7. Record visual findings without reopening the frozen meaning layer
8. Prepare the next revision loop only for the assets that still fail visual quality

## Questions Claude Should Not Re-ask

- what `genu.im`, `genu.mark`, and `genu.code` are
- who `Dominanta`, `Domino`, and `Logictime` are
- what is core and what is external
- what the regulated narrative is
- what the mandatory regulated assets are
- which notebooks are active
- which MCP path is already working
- what language the outgoing artifacts must use

## Open Questions That Actually Matter

- are the three PDF release candidates visually strong enough to be accepted as-is
- which of the three infographic assets should be rerun first once more quota is available
- should the next branch after mandatory visual review be `Gorobina` or another explicitly approved deliverable
