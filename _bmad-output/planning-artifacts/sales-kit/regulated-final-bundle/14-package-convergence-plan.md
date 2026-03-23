---
title: Package Convergence Plan - Regulated Sales Kit
status: Active
owner: Founder / Codex / Claude
last_updated: 2026-03-23
---

# Package Convergence Plan / Regulated Sales Kit

## Purpose

This phase cleans, verifies, and converges the full sales-kit package so the project is:
- coherent
- non-contradictory
- traceable
- operationally workable
- ready for repeated improvement cycles

## Phase 0. Ralph loop before convergence

Before broad package convergence, first prove that the full loop works on one mandatory asset end to end.

## Phase 0A. Pilot Ralph loop on one mandatory asset

Goal:

- run the full closed loop on one mandatory asset
- reach a checked final artifact candidate
- confirm the end-to-end pipeline is actually workable before scaling the loop to the rest

Chosen pilot asset:

- `One Job`

Why this asset:

- smallest known failure footprint
- rerun already started
- easiest place to validate:
  - prompt correction
  - rerun
  - review
  - continuity update
  - final candidate decision

Pilot success condition:

- `One Job` completes the full Ralph loop
- the result is reviewed
- recommendations are captured
- continuity docs reflect the actual path taken
- the team can then reuse the same loop structure for the remaining mandatory assets

## Phase 0B. Expand Ralph loop to the rest of mandatory assets

Only after Phase 0A succeeds, run the same closed loop for the remaining mandatory assets.

For each mandatory asset:

1. generate or rerun the current target artifact
2. inspect the result
3. analyze what failed and what worked
4. write explicit recommendations
5. apply the recommendations:
   - page-level revision strategy for slide decks
   - rerun strategy for infographics
6. generate the improved version
7. verify the new result
8. record the outcome in continuity docs

This is the required `ralph loop` for each document.

Rule:
- do not treat an artifact as converged just because it exists
- drive each asset through at least one full improvement loop to a checked final candidate

## Ralph loop output requirements

Each loop must record:
- what changed
- why it changed
- whether the fix was page-level or full rerun
- what is current now
- what the next agent must know

## Current mandatory Ralph-loop order

Pilot:

1. One Job

Then:

2. Why Us
3. Executive Deck
4. Edge Cases
5. Evidence Pack
6. Technical Deck

## What happens next

### Phase 1. Full package inventory

- walk the full package document by document
- classify every file as:
  - source of truth
  - approved working asset
  - operating support doc
  - experimental output
  - deprecated / old clutter

### Phase 2. Relevance and clutter review

- decide what is still required
- identify what is duplicated, obsolete, or misleading
- remove or mark old clutter instead of leaving it ambiguous

### Phase 3. Consistency audit

- check cross-document consistency for:
  - object of sale
  - product boundaries
  - lane logic
  - language policy
  - artifact status
  - next-action ordering
- eliminate contradictions between:
  - handoff docs
  - backlog
  - registry
  - state board
  - run ledger
  - source-of-truth docs

### Phase 4. Flow validation

- verify the actual workflow works end to end:
  - source selection
  - prompt usage
  - notebook state handling
  - lane switching between `slide_deck` and `infographic`
  - rerun recording
  - handoff update discipline

### Phase 5. Finalization pass

- tighten documents
- remove stale assumptions
- ensure every active document has a clear role
- ensure every deprecated document is clearly marked or removed from active navigation

### Phase 6. Improvement cycles

- after the package is converged, run targeted improvement cycles
- keep meaning layer stable unless a concrete QA signal appears
- improve:
  - visual outputs
  - prompt quality
  - flow reliability
  - handoff readiness

## Priority order inside this phase

1. regulated-final-bundle
2. notebooklm-source
3. notebooklm-briefs
4. notebooklm-prompts
5. notebooklm-runs
6. notebooklm-qa
7. buyer-facing regulated assets
8. only then older shared / voluntary / account-specific branches

## What must not happen during convergence

- do not reopen frozen meaning-layer decisions without a concrete QA signal
- do not keep ambiguous duplicate docs in active circulation
- do not leave unlabeled experimental artifacts mixed with canonical docs
- do not let cleanup break lineage or traceability

## First concrete task in this phase

- complete Phase 0A pilot Ralph loop on `One Job`
- then expand to the remaining mandatory assets
- then build a file-by-file classification pass for the active package
- identify:
  - keep
  - keep but tighten
  - archive / deprecated
  - experimental only

## Success condition

The package is converged when:
- a new agent can traverse it without confusion
- active docs do not contradict each other
- obsolete docs are no longer mistaken for live sources
- the NotebookLM workflow is documented and repeatable
- final improvement cycles can happen on top of a stable package
