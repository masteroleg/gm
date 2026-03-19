# BMAD Document Consistency ToDo

**Date:** 2026-03-19
**Goal:** Bring core planning artifacts, the wider BMAD workspace, and the final `site/` implementation into one consistent source-of-truth set

## Priority 1 - Fix confirmed core inconsistencies

- [x] Update `_bmad/bmm/agents/pm.md` so the `IR` menu item points to `_bmad/bmm/workflows/3-solutioning/bmad-check-implementation-readiness/workflow.md`
- [x] Update `_bmad-output/planning-artifacts/ux-design-specification.md` so named sample-page references are explicitly marked as deferred/future-phase and submission-style wording is replaced with explicit Phase 1 email-handoff wording
- [x] Update `_bmad-output/planning-artifacts/epics.md` `Story 2.3` to include explicit acceptance criteria for empty input, invalid input, and visible non-blocking feedback
- [x] Update `_bmad-output/planning-artifacts/epics.md` `Story 4.3` so funnel-review outputs are measurable and directly traceable to `FR29`, `FR30`, and `FR31`
- [x] Update `_bmad/bmm/agents/architect.md` so the `IR` menu item points to `_bmad/bmm/workflows/3-solutioning/bmad-check-implementation-readiness/workflow.md`
- [x] Correct `_bmad-output/planning-artifacts/ux-design-specification.md` trust-boundary wording so `Дія` is not described as the result layer of `genu.mark`
- [x] Remove active-looking named sample chips from the `/v/` proof-hub concept in `_bmad-output/planning-artifacts/ux-design-specification.md`

## Priority 2 - Re-validate core planning artifacts after edits

- [x] Re-run a targeted consistency pass across `prd.md`, `architecture.md`, `epics.md`, and `ux-design-specification.md`
- [x] Confirm that Phase 1 vs future-phase boundaries are described the same way in all four files
- [x] Confirm that request-flow semantics are described the same way in all four files
- [x] Confirm that analytics/review expectations are equally measurable in PRD, Architecture, and Epics

## Priority 3 - Audit wider BMAD workspace documentation

- [x] Audit `_bmad/` workflow files and agent menus for stale paths, renamed workflow folders, and outdated command mappings
- [x] Audit `_bmad-output/` reports, summaries, and planning derivatives for statements that conflict with the current `prd.md`, `architecture.md`, `epics.md`, or `ux-design-specification.md`
- [x] Audit `docs/` files that are treated as reference inputs for wording or scope statements that conflict with the current Phase 1 baseline
- [x] Identify duplicate guidance where the same rule is described differently across AGENTS/project-context/BMAD outputs
- [x] Confirm wider-workspace inconsistencies in `_bmad`, `_bmad-output`, and `docs` and fold them into the remediation list

## Priority 3A - Audit final `site/` implementation against source-of-truth docs

- [x] Audit `site/` against `prd.md`, `architecture.md`, `epics.md`, and `ux-design-specification.md`
- [ ] Remove or replace legacy public routes in `site/` that conflict with the approved Phase 1 public surface and trust boundary (notably `site/perevir-produkt/`)
- [ ] Update `site/index.html` final CTA so it routes to `/request/` instead of going directly to `mailto:` and bypassing the qualified-request flow
- [ ] Reword homepage implementation copy that implies live public lookup or real-time verification if the approved Phase 1 source of truth only allows bounded proof/demo semantics
- [ ] Narrow FAQ and similar support pages so they do not imply generic verification from any scan or arbitrary live public proof beyond approved Phase 1 scope
- [ ] Review `site/request/` and `site/contact/` response-time promises against approved requirements; remove or explicitly approve SLA-style language if it is not in source docs
- [ ] Re-run a consistency pass after `site/` fixes to confirm final implementation matches the current planning baseline

## Priority 4 - Normalize source-of-truth policy

- [ ] Declare a document precedence order for this workspace (for example: PRD -> Architecture -> Epics -> UX -> derived reports)
- [ ] Add a short "source of truth" note to major BMAD output artifacts so future edits do not drift
- [ ] Mark archived or superseded reports as reference-only if they should no longer drive decisions
- [x] Fix stale menu/workflow references in agent files where actual workflow paths have changed
- [x] Update wider-workspace guidance files that overstated Phase 1 analytics observability or still referenced superseded inconsistencies
- [ ] Extend the same source-of-truth policy so `site/` content is explicitly checked against `PRD -> Architecture -> Epics -> UX` before release changes are treated as final

## Done criteria

- [x] No active Phase 1 file implies future-phase scope without explicit labeling
- [x] No artifact describes `mailto:` handoff as guaranteed submission
- [x] Story acceptance criteria are specific enough to prevent implementation drift
- [x] BMAD agent/workflow references resolve to real current files
- [x] Derived reports no longer contradict current source documents
- [ ] Final `site/` implementation no longer contradicts current source documents
