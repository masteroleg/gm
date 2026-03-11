---
stepsCompleted:
  - step-01-document-discovery
  - step-02-prd-analysis
  - step-03-epic-coverage-validation
  - step-04-ux-alignment
  - step-05-epic-quality-review
  - step-06-final-assessment
project: gm
date: 2026-03-11
documentsIncluded:
  prd:
    - _bmad-output/planning-artifacts/prd.md
  architecture:
    - _bmad-output/planning-artifacts/architecture.md
  epics:
    - _bmad-output/planning-artifacts/epics.md
  ux:
    - _bmad-output/planning-artifacts/ux-design-specification.md
---

# Implementation Readiness Assessment Report

**Date:** 2026-03-11
**Project:** gm

## Document Discovery

### Files Selected for Assessment

- PRD: `_bmad-output/planning-artifacts/prd.md`
- Architecture: `_bmad-output/planning-artifacts/architecture.md`
- Epics & Stories: `_bmad-output/planning-artifacts/epics.md`
- UX Design: `_bmad-output/planning-artifacts/ux-design-specification.md`

### Discovery Notes

- Whole-document versions were found for PRD, Architecture, Epics & Stories, and UX Design.
- No sharded document folders were found for any required document type.
- No duplicate whole/sharded conflicts were found.
- No required planning document was missing at discovery time.

## PRD Analysis

### Functional Requirements

FR1: Public site language is switchable between UK and EN.
FR2: Selected language persists for returning visits on supported browsers.
FR3: Public site theme is switchable between light and dark.
FR4: Selected theme persists for returning visits on supported browsers.
FR5: Homepage messaging states that `genu.im` is a public proof surface for marked products and not a generic QR landing page.
FR6: Homepage branch messaging, canonical proof example, no-data state, and the consumer-intent intercept page show explicit role separation between official consumer checking in `Дія` and manufacturer or brand proof in `genu.mark`.
FR7: Primary homepage CTA opens the canonical verification example.
FR8: Homepage exposes one `еАкциз` entry point and one responsible-manufacturer entry point, each with its own branch-specific CTA.
FR9: Trust-floor destinations are reachable from the public site.
FR10: Canonical verification example displays an approved proof-example state.
FR11: Phase 1 demo input surface accepts a pasted code or an example-code action to open a demo result.
FR12: Every non-live verification surface displays a persistent demo-mode notice.
FR13: Canonical proof example displays a valid-state example for a product inside the `genu.mark` public proof contour.
FR14: Products without public proof in `genu.im` display the defined no-data state.
FR15: No-data state explains what public proof could appear and offers a next-step CTA.
FR16: Empty proof sections remain hidden instead of rendering placeholder content.
FR17: Each displayed public proof fact is labeled by source category.
FR18: Supporting evidence links or documents appear in NDA-safe public form for each displayed public claim that has supporting evidence.
FR19: Sustainability content stays hidden when required evidence is missing.
FR21: Consumer-intent intercept page points official consumer checking to `Дія`.
FR22: Consumer-intent intercept page also shows a separate B2B CTA for marking, proof, or transparency services.
FR23: Public request form captures a qualified request with contact data, scenario, and business context.
FR24: Submitted qualified requests include scenario and source-path metadata.
FR25: Shareable public proof or demo links open the same intended public state and CTA destination without requiring login.
FR26: Trust-floor destinations for About, Contact, Proof & Cases, Privacy, Terms, and FAQ are reachable from the public site.
FR27: Public IA includes a reserved knowledge-base navigation slot without requiring full Phase 1 knowledge content.
FR29: Homepage-to-proof traffic is distinguishable in Phase 1 funnel review.
FR30: Qualified requests are distinguishable by scenario and entry source.
FR31: Phase 1 proof-first funnel is reviewable across homepage, proof example, proof-surface CTA continuation, and request steps.

Total FRs: 29

### Non-Functional Requirements

NFR1: Key Phase 1 pages shall achieve Performance >= 97 in the Phase 1 release validation protocol.
NFR2: Key Phase 1 pages shall meet `LCP < 2.5s`, `CLS < 0.1`, and `INP < 200ms` in the Phase 1 release validation protocol.
NFR3: Each key Phase 1 public page shall stay within the approved Phase 1 delivery budget and shall not require deferred interactions to render first-screen explanatory content.
NFR4: Above-the-fold media and layout containers shall reserve space so no key Phase 1 page exceeds `CLS 0.1`.
NFR5: Key Phase 1 flows shall conform to the accessibility level defined in `accessibility_level`.
NFR6: Key Phase 1 flows shall achieve Accessibility >= 97 in the Phase 1 release validation protocol.
NFR7: All key Phase 1 controls shall be keyboard accessible, visibly focusable, and screen-reader labeled, with `0` blocked tasks and `0` unlabeled interactive controls in release review.
NFR8: Language, theme, proof-state labels, and no-data messaging shall remain consistent across UK and EN public pages, with `0` mixed-language UI fragments and `0` contradictory proof-state labels in release review.
NFR9: `100%` of indexable Phase 1 pages shall include the required SEO metadata set and required structured search data set defined in `Shared Validation Definitions`.
NFR10: Consumer-intent public pages shall direct official checking to `Дія` and shall contain zero claims of official state status for `genu.im`.
NFR11: Canonical proof example and no-data example shall present `0` unsupported claims in release review; if required evidence or approved proof data is missing, the page shall fall back to the neutral no-data state instead.
NFR12: Public request capture shall require no more than `5` user-entered fields and shall not require personal data beyond business contact name, business email or phone, company name, scenario, and short context.
NFR13: Public measurement and reporting shall expose `0` full raw codes and `0` personal-data fields in public analytics outputs.
NFR14: Public pages shall be served over HTTPS in Phase 1. Each key public page type shall have documented browser-facing security controls or documented limitations with compensating controls.
NFR15: Phase 1 public flows shall complete the primary task set across the supported-browser matrix with `0` blocked tasks, and unsupported browsers shall preserve homepage comprehension and contact access.
NFR16: Phase 1 public flows shall complete the primary task set across the required responsive widths with `0` horizontal scrolling on key content and `0` hidden primary CTAs.

Total NFRs: 16

### Additional Requirements

- Phase 1 scope is explicitly limited to a proof-first public web slice: homepage, canonical verification example, paste-first demo input, one no-data state, request capture, trust-floor destinations, and proof-path attribution.
- Phase 1 must not imply live production lookup, private B2B workflows, or richer knowledge/analytics capabilities that are deferred to later phases.
- `genu.im` must not imitate certification, expert assessment, legal confirmation, or a state service, and must never mimic `Дія`.
- Public proof is limited to facts that can be honestly shown from the `genu.mark` contour and approved brand-provided facts.
- No-data handling is a hard product rule: if no public proof data exists, the experience must stay neutral and avoid authenticity, legality, or state-approval claims.
- Public proof content must expose fact source category, hide empty proof sections, avoid personal data exposure, and keep sustainability claims gated on supporting evidence.
- Phase 1 support matrix is limited to current stable Chrome, Edge, and Firefox; Safari and iOS Safari remain deferred.
- Key flows must work at `360px`, `768px`, and `1280px` widths with no horizontal scrolling for primary tasks.
- SEO strategy is B2B-first, with a dedicated consumer-intent intercept path that redirects official checking to `Дія` while separating B2B value.
- Shared functional definitions constrain qualified lead capture and NDA-safe public evidence representation.
- Appendix A preserves delivery and architecture boundary notes, keeping implementation-detail decisions outside PRD core.
- Appendix B lists unresolved decisions that should not block Phase 1, each with a recommended default.

### PRD Completeness Assessment

- The PRD is structurally complete for readiness analysis: it defines scope, success criteria, journeys, domain rules, active FRs, active NFRs, assumptions, and traceability mappings.
- Requirement decomposition is strong and measurable overall, with explicit acceptance or verification wording on each active FR and verification signals on each NFR.
- The PRD clearly separates active Phase 1 requirements from roadmap-only identifiers (`FR20`, `FR28`, `FR32`), which reduces downstream traceability ambiguity.
- The main readiness question for later steps is not missing PRD content, but whether epics and stories fully cover the dense trust-boundary, proof-state, reporting, and trust-surface requirements captured here.

## Epic Coverage Validation

### Coverage Matrix

| FR Number | PRD Requirement | Epic Coverage | Status |
| --------- | --------------- | ------------- | ------ |
| FR1 | Public site language is switchable between UK and EN. | Epic 1 - language switching across public surfaces | Covered |
| FR2 | Selected language persists for returning visits on supported browsers. | Epic 1 - persisted language preference | Covered |
| FR3 | Public site theme is switchable between light and dark. | Epic 1 - theme switching across public surfaces | Covered |
| FR4 | Selected theme persists for returning visits on supported browsers. | Epic 1 - persisted theme preference | Covered |
| FR5 | Homepage messaging states that `genu.im` is a public proof surface for marked products and not a generic QR landing page. | Epic 1 - homepage proof-first category clarity | Covered |
| FR6 | Homepage branch messaging, canonical proof example, no-data state, and the consumer-intent intercept page show explicit role separation between official consumer checking in `Дія` and manufacturer or brand proof in `genu.mark`. | Epic 1 - `Дія` vs `genu.mark` role separation | Covered |
| FR7 | Primary homepage CTA opens the canonical verification example. | Epic 1 - homepage CTA into proof path | Covered |
| FR8 | Homepage exposes one `еАкциз` entry point and one responsible-manufacturer entry point, each with its own branch-specific CTA. | Epic 1 - homepage branch recognition | Covered |
| FR9 | Trust-floor destinations are reachable from the public site. | Epic 1 - reachability of trust-floor destinations | Covered |
| FR10 | Canonical verification example displays an approved proof-example state. | Epic 2 - canonical verification example | Covered |
| FR11 | Phase 1 demo input surface accepts a pasted code or an example-code action to open a demo result. | Epic 2 - demo input and example-code entry flow | Covered |
| FR12 | Every non-live verification surface displays a persistent demo-mode notice. | Epic 2 - persistent demo-mode notice on non-live surfaces | Covered |
| FR13 | Canonical proof example displays a valid-state example for a product inside the `genu.mark` public proof contour. | Epic 2 - valid proof-state example | Covered |
| FR14 | Products without public proof in `genu.im` display the defined no-data state. | Epic 2 - neutral no-data proof state | Covered |
| FR15 | No-data state explains what public proof could appear and offers a next-step CTA. | Epic 2 - explanatory no-data next step | Covered |
| FR16 | Empty proof sections remain hidden instead of rendering placeholder content. | Epic 2 - hidden empty proof sections | Covered |
| FR17 | Each displayed public proof fact is labeled by source category. | Epic 2 - source-labeled public proof facts | Covered |
| FR18 | Supporting evidence links or documents appear in NDA-safe public form for each displayed public claim that has supporting evidence. | Epic 2 - supporting evidence links/documents | Covered |
| FR19 | Sustainability content stays hidden when required evidence is missing. | Epic 2 - suppression of unsupported sustainability content | Covered |
| FR21 | Consumer-intent intercept page points official consumer checking to `Дія`. | Epic 3 - consumer-intent intercept to `Дія` | Covered |
| FR22 | Consumer-intent intercept page also shows a separate B2B CTA for marking, proof, or transparency services. | Epic 3 - separate B2B CTA on consumer/B2B routing paths | Covered |
| FR23 | Public request form captures a qualified request with contact data, scenario, and business context. | Epic 3 - qualified request submission flow | Covered |
| FR24 | Submitted qualified requests include scenario and source-path metadata. | Epic 3 - scenario and source-path metadata capture | Covered |
| FR25 | Shareable public proof or demo links open the same intended public state and CTA destination without requiring login. | Epic 2 - shareable public proof/demo states without login | Covered |
| FR26 | Trust-floor destinations for About, Contact, Proof & Cases, Privacy, Terms, and FAQ are reachable from the public site. | Epic 1 - trust-floor destination access from the public site | Covered |
| FR27 | Public IA includes a reserved knowledge-base navigation slot without requiring full Phase 1 knowledge content. | Epic 1 - reserved knowledge navigation and IA | Covered |
| FR29 | Homepage-to-proof traffic is distinguishable in Phase 1 funnel review. | Epic 4 - visibility into homepage-to-proof movement | Covered |
| FR30 | Qualified requests are distinguishable by scenario and entry source. | Epic 4 - reporting by scenario and entry source | Covered |
| FR31 | Phase 1 proof-first funnel is reviewable across homepage, proof example, proof-surface CTA continuation, and request steps. | Epic 4 - reviewable proof-first funnel | Covered |

### Missing Requirements

#### Critical Missing FRs

- None. All 29 active Phase 1 PRD FRs are explicitly represented in the epics FR coverage map.

#### Additional Coverage Notes

- The epics document also tracks roadmap-only references `FR20`, `FR28`, and `FR32` as deferred future-phase items rather than active implementation scope.
- No extra active FR identifiers were found in epics that are absent from the PRD active Phase 1 set.

### Coverage Statistics

- Total PRD FRs: 29
- FRs covered in epics: 29
- Coverage percentage: 100%

## UX Alignment Assessment

### UX Document Status

- Found: `_bmad-output/planning-artifacts/ux-design-specification.md`

### Alignment Issues

- UX and PRD remain strongly aligned on the core Phase 1 narrative: proof-first homepage order, explicit `Дія` vs `genu.mark` separation, branch split, request capture, no-data honesty, language/theme persistence, and trust-floor destinations.
- The narrow correction pass resolved the previously reported Story `1.2`, `1.4`, `2.2`, `3.2`, and `3.3` alignment issues by tying branch and business CTAs to the same request form with scenario prefill, tightening trust-page starter-content expectations, and making no-data/business continuation explicit.
- The UX `NoDataState` section now aligns with PRD `FR15` and architecture boundaries by describing proof blocks as conditionally rendered only when supported data exists and by keeping empty sections hidden.
- The UX request-flow patterns now align with architecture by stating that Phase 1 initiates `mailto:` handoff only, that support is environment-dependent, and that fallback must not imply successful submission.
- Architecture continues to support the active UX direction through static routes, DOM-first controllers, Tailwind token extension, self-hosted Manrope, request-form controller behavior, and mobile-first constraints.

### Warnings

- Warning: UX still includes future-phase named sample pages such as `/v/genu.alko` and `/v/genu.cosm` in journeys and examples; these remain acceptable only as future-phase or separately approved references and must not be interpreted as active Phase 1 backlog.
- Warning: the UX `Loading States` table still uses the phrase `"Надсилаємо..."` for form submitting, while the corrected Phase 1 handoff model now uses email-handoff semantics. This is a minor residual wording inconsistency to clean up in a future UX wording pass if stricter artifact consistency is required.

## Epic Quality Review

### Best-Practice Assessment

- Epic titles and epic goals are user-centric overall; none of the four active epics are technical milestones.
- Epic sequencing remains coherent: Epic 1 establishes public-site foundations, Epic 2 adds proof surfaces, Epic 3 handles routing and conversion, and Epic 4 enables review visibility.
- Traceability discipline remains strong at epic level because each epic explicitly lists covered FRs and the roadmap-only requirements are separated from active Phase 1 scope.
- The narrow correction pass removed the previously identified forward-dependency and destination-ambiguity problems in Story `1.2`, Story `2.2`, Story `3.2`, and Story `3.3`, and tightened Story `1.4` so trust-surface expectations are directly testable.

### Critical Violations

- None identified.

### Major Issues

- None identified after the narrow correction pass for Story `1.2`, `1.4`, `2.2`, `3.2`, and `3.3`.

### Minor Concerns

- `Story 2.3` still lacks an explicit invalid-input or empty-input handling acceptance criterion for the demo entry surface, so it remains slightly under-specified beyond the happy path and example-code flow.
- `Story 4.3` is still somewhat abstract in its review semantics; `"see where visitors continue and where they stop"` is meaningful but remains less measurable than the stronger definitions already used in `FR29`-`FR31`.

### Epic Independence Review

- Epic 1 is independently valuable and can ship as a trust-first public homepage plus trust-surface baseline.
- Epic 2 can build on Epic 1 outputs without requiring Epic 3 or Epic 4 to function.
- Epic 3 can operate using public-site and request-flow foundations without requiring Epic 4 reporting outcomes to exist first.
- Epic 4 correctly depends on prior product behavior for measurement visibility; this is a valid backward dependency, not a forbidden forward dependency.

### Remediation Guidance

- Keep the corrected request-form, branch-CTA, and no-data story wording as the new baseline for implementation.
- Add one explicit invalid-input acceptance criterion to `Story 2.3` in a future cleanup pass if the team wants stronger implementation-ready completeness outside the currently approved narrow scope.
- Consider tightening `Story 4.3` with more explicit funnel-step review outputs if a later artifact pass targets analytics-story measurability.

## Summary and Recommendations

### Overall Readiness Status

READY

### Critical Issues Requiring Immediate Action

- None blocking implementation readiness for the current artifact set.
- The remaining findings are non-blocking precision and wording issues, not structural readiness defects.

### Recommended Next Steps

1. Use `_bmad-output/planning-artifacts/epics.md` and `_bmad-output/planning-artifacts/ux-design-specification.md` as the implementation baseline for the current Phase 1 scope.
2. Optionally tighten `Story 2.3`, `Story 4.3`, and the UX request-loading wording in a narrow cleanup pass before implementation starts.
3. Proceed into implementation planning or story execution with the Phase 1 `mailto:` handoff boundary and no-data proof rules kept intact.

### Final Note

This assessment identified 4 non-blocking issues across 2 categories: residual UX wording and remaining story-precision concerns. No blocking gaps were found in PRD coverage, UX alignment, or epic structure, so the current planning set is ready to proceed.

### Assessment Metadata

- Assessor: Mary
- Assessment Date: 2026-03-11
- Source Documents: PRD, Architecture, Epics & Stories, UX Design Specification
