# BMAD Documentation Inconsistency Report

**Date:** 2026-03-19
**Scope:** Core planning artifacts, second-pass workspace audit across `_bmad`, `_bmad-output`, and `docs`, plus implementation-consistency audit of final `site/`
**Status:** Core document fixes applied; wider-workspace document inconsistencies corrected; implementation-level `site/` mismatches still open

## Confirmed Inconsistencies

### 1. UX had overstated future-phase sample pages

- **Where:** `_bmad-output/planning-artifacts/ux-design-specification.md`
- **Evidence:** named sample pages such as `/v/genu.alko` and `/v/genu.cosm` appeared in journeys, examples, and sample-page concepts as if they were near-term deliverables
- **Conflict:** `prd.md`, `architecture.md`, and `epics.md` consistently treat these as deferred or separately approved future-phase references
- **Risk:** teams may accidentally treat deferred sample pages as active Phase 1 scope
- **Resolution:** corrected in `ux-design-specification.md` by explicitly marking named sample references as future-phase and removing active-looking named sample chips from the `/v/` proof-hub concept

### 2. UX had implied submission semantics for a `mailto:` handoff

- **Where:** `_bmad-output/planning-artifacts/ux-design-specification.md`
- **Evidence:** loading/submit wording had included `"Надсилаємо..."`
- **Conflict:** `prd.md` and `architecture.md` define Phase 1 request handling as `mailto:` handoff only, environment-dependent, and explicitly not guaranteed submission
- **Risk:** copy implies successful transport when the implementation contract only guarantees handoff initiation attempt
- **Resolution:** corrected in `ux-design-specification.md` by switching the loading language to explicit email-handoff wording (`"Готуємо email..."`, draft/handoff messaging, and non-submission semantics)

### 3. Demo-input story had been under-specified on invalid input handling

- **Where:** `_bmad-output/planning-artifacts/epics.md` (`Story 2.3`)
- **Evidence:** acceptance criteria cover happy path and example-code flow, but do not explicitly define empty or invalid input behavior
- **Conflict:** PRD readiness expects implementation-ready coverage for the Phase 1 demo entry surface; UX also defines explicit feedback/error patterns
- **Risk:** different implementers may invent different invalid-input behavior, causing drift between UX and implementation
- **Resolution:** corrected in `epics.md` `Story 2.3` by adding explicit empty/invalid input handling and visible inline feedback requirements

### 4. Funnel review story had been less measurable than source requirements

- **Where:** `_bmad-output/planning-artifacts/epics.md` (`Story 4.3`)
- **Evidence:** the story says the team can `see where visitors continue and where they stop`, but does not define the review output as concretely as `FR29`-`FR31`
- **Conflict:** PRD defines measurable funnel-review outcomes and Architecture preserves the same release-review framing
- **Risk:** analytics/review work may be accepted with weaker evidence than the source requirements require
- **Resolution:** corrected in `epics.md` `Story 4.3` by aligning the review output to same-period counts and explicit step definitions tied to `FR29`, `FR30`, and `FR31`

### 5. Agent menu workflow paths had stale `IR` references

- **Where:** `_bmad/bmm/agents/pm.md`, `_bmad/bmm/agents/architect.md`
- **Evidence:** both agent menus had pointed `IR` to `{project-root}/_bmad/bmm/workflows/3-solutioning/check-implementation-readiness/workflow.md`
- **Conflict:** the actual workflow file is at `_bmad/bmm/workflows/3-solutioning/bmad-check-implementation-readiness/workflow.md`
- **Risk:** agent activation succeeds, but the menu routes the user into a non-existent file path and breaks the workflow launch path
- **Resolution:** corrected both agent menu entries to the real workflow path

### 6. UX trust-boundary wording had implied a single `Дія`/`genu.mark` verification chain

- **Where:** `_bmad-output/planning-artifacts/ux-design-specification.md`
- **Evidence:** one clarification sentence described `Дія` as the result of verification performed through `genu.mark`
- **Conflict:** `prd.md` and `architecture.md` require explicit separation between official checking in `Дія` and manufacturer/brand proof in `genu.mark`
- **Risk:** wording can make `genu.im` sound like an upstream state-verification layer instead of a separate proof surface
- **Resolution:** corrected the clarification language so `Дія` and `genu.mark` are described as different trust layers with separate roles

### 7. Wider review guidance had overstated Phase 1 funnel observability

- **Where:** `docs/review-guide-funnel.md`, `_bmad-output/implementation-artifacts/4-3-review-the-proof-first-funnel.md`
- **Evidence:** these documents had implied Google Search Console could directly support homepage-to-proof review in a way that matched `FR29`-`FR31`
- **Conflict:** the PRD only allows a directional, best-effort Phase 1 review; GSC does not distinguish homepage CTA traffic from other internal navigation or direct arrivals
- **Risk:** review guidance could overclaim measurement certainty and create false acceptance confidence for funnel visibility
- **Resolution:** corrected both documents to state clearly that GSC is only a proxy for proof-page visibility, not a direct homepage-entry measure, and that Phase 1 review remains directional rather than a precise same-period analytics system

### 8. Final `site/` implementation still contains open consistency mismatches

- **Where:** `site/index.html`, `site/request/index.html`, `site/contact/index.html`, `site/faq/index.html`, `site/perevir-produkt/index.html`, `site/assets/js/lang-toggle.js`
- **Evidence:** the final implementation still contains a mix of route, copy, and expectation drift against the current planning baseline:
  - `site/perevir-produkt/index.html` exposes a legacy product story and public verification posture outside the approved Phase 1 surface
  - `site/index.html` final CTA still goes directly to `mailto:` instead of the approved `/request/` qualified-request flow
  - homepage/runtime copy in `site/index.html` and `site/assets/js/lang-toggle.js` still includes language that can read as live public lookup or real-time verification
  - `site/faq/index.html` overstates verification reach by implying product identity can be checked from `any scan`
  - `site/request/index.html` and `site/contact/index.html` add a response-time expectation not defined in the planning baseline
- **Conflict:** `prd.md`, `architecture.md`, `epics.md`, and `ux-design-specification.md` define a bounded Phase 1 proof/demo surface, explicit `Дія` vs `genu.mark` separation, `mailto:` handoff through the request form, and careful wording that avoids overclaiming live public verification or undeclared service guarantees
- **Risk:** the docs may now be cleaner than the shipped implementation, which creates product-trust drift and makes future reviews falsely pass on document consistency while user-facing pages still contradict the approved model
- **Required correction:** bring `site/` into the same source-of-truth audit loop and remediate the open implementation mismatches before treating the workspace as fully consistency-clean

## Strongly Aligned Areas

- PRD to Epic FR coverage: complete (`29/29` active FRs covered)
- PRD to Architecture: structurally aligned on static-site boundary, proof-first scope, trust boundary, and Phase 1 handoff model
- UX to PRD/Architecture: aligned on proof-first narrative, `Дія` vs `genu.mark`, no-data honesty, branch split, language/theme persistence, and trust-floor expectations

## Assessment Summary

- The core chain `PRD -> Architecture -> Epics -> UX` remains structurally strong and now has the previously confirmed sharpness gaps corrected
- The broader BMAD workspace audit found additional drift in agent menus and review guidance, and those active inconsistencies were corrected in source documents during this pass
- `site/` must now be treated as part of the active consistency perimeter, not as a downstream artifact assumed to match the docs automatically
- Use `prd.md`, `architecture.md`, `epics.md`, and `ux-design-specification.md` as the active source-of-truth baseline; treat this report as an audit snapshot, not a primary requirements source
