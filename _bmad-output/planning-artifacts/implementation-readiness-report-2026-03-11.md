---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-gm-2026-03-05.md
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/epics.md
date: 2026-03-11
project: gm
author: John
---

# Implementation Readiness Assessment Report

**Date:** 2026-03-11
**Project:** gm

## Document Discovery

### Selected Documents for Assessment

- Product Brief (active context): `_bmad-output/planning-artifacts/product-brief-gm-2026-03-05.md`
- PRD (primary product contract): `_bmad-output/planning-artifacts/prd.md`
- UX specification: `_bmad-output/planning-artifacts/ux-design-specification.md`
- Architecture: `_bmad-output/planning-artifacts/architecture.md`
- Epics and Stories: `_bmad-output/planning-artifacts/epics.md`

### Inventory

#### PRD Files Found

**Whole Documents:**
- `_bmad-output/planning-artifacts/prd.md` (39356 bytes, 2026-03-10 14:09:06)

**Sharded Documents:**
- None found

#### Architecture Files Found

**Whole Documents:**
- `_bmad-output/planning-artifacts/architecture.md` (52891 bytes, 2026-03-10 22:15:12)

**Sharded Documents:**
- None found

#### Epics & Stories Files Found

**Whole Documents:**
- `_bmad-output/planning-artifacts/epics.md` (34217 bytes, 2026-03-11 01:54:03)

**Sharded Documents:**
- None found

#### UX Design Files Found

**Whole Documents:**
- `_bmad-output/planning-artifacts/ux-design-specification.md` (63475 bytes, 2026-03-10 17:51:32)

**Sharded Documents:**
- None found

#### Additional Planning Inputs Found

**Product Brief Files:**
- `_bmad-output/planning-artifacts/product-brief-gm-2026-03-05.md` (selected as active brief)
- `_bmad-output/planning-artifacts/product-brief-gm-2026-02-23.md` (historical brief, excluded from active assessment set)

### Resolution Notes

- No duplicate whole-vs-sharded document conflicts found in the required assessment set.
- Product brief version conflict resolved by document seniority: `product-brief-gm-2026-03-05.md` is the active source, while `product-brief-gm-2026-02-23.md` is retained as historical context only.

## PRD Analysis

### Functional Requirements

FR1: Users can switch the public site between UK and EN.

FR2: The system can persist the selected language for returning visits on supported browsers.

FR3: Users can switch the public site between light and dark theme.

FR4: The system can persist the selected theme for returning visits on supported browsers.

FR5: Visitors can identify from the homepage that `genu.im` is a proof-first surface for marked products rather than a generic QR landing page.

FR6: Visitors can see explicit role separation between official consumer checking in `Дія` and manufacturer/brand proof in `genu.mark`.

FR7: Visitors can open the canonical verification example from the primary homepage CTA.

FR8: Visitors can identify two distinct homepage paths: `еАкциз` readiness and responsible-manufacturer proof.

FR9: Visitors can reach trust-floor destinations from the public site.

FR10: Visitors can open the canonical verification example and view a canonical valid proof example.

FR11: Visitors can open the Phase 1 demo input surface and submit a pasted code or use an example-code action to view a demo result.

FR12: The system can display a persistent demo-mode notice on every non-live verification surface.

FR13: The system can present a valid-state example for a product inside the `genu.mark` public proof contour.

FR14: The system can present a neutral no-data state for products without public proof in `genu.im`.

FR15: The system can explain what public proof could appear in the no-data state and offer a next-step CTA.

FR16: The system can hide empty proof sections instead of rendering placeholder content.

FR17: The system can label each displayed public proof fact by source category.

FR18: The system can show supporting evidence links or documents when they exist for a displayed public claim.

FR19: The system can suppress sustainability content when required evidence is missing.

FR20: Phase 2+ only: approved public proof extensions can add new content fields within the existing public proof structure without requiring a new page type.

FR21: Consumer-intent visitors can open a dedicated intercept page that points them to `Дія` for official consumer checking.

FR22: Consumer-intent visitors can also see a separate B2B CTA for marking, proof, or transparency services.

FR23: Visitors can submit a qualified request with contact data, scenario, and business context.

FR24: The system can attach scenario and source-path metadata to each qualified request.

FR25: Partners can share a public proof or demo link that opens the same intended public state and CTA destination without requiring login.

FR26: Visitors can open trust-floor destinations for About, Contact, Proof & Cases, Privacy, Terms, and FAQ from the public site.

FR27: Visitors can see reserved navigation and IA for the future knowledge base without requiring full Phase 1 knowledge content.

FR28: Phase 2 only: when knowledge content is enabled, visitors can open a knowledge entry and continue to a relevant CTA.

FR29: The product team can distinguish visits that move from the homepage into the proof example path.

FR30: The product team can distinguish qualified requests by scenario and entry source.

FR31: The product team can review a proof-first funnel consisting of homepage, proof example, and request steps.

FR32: Phase 3 only: when live public lookup is enabled, the system can apply bounded abuse controls to reduce repeated enumeration-style requests against the public proof endpoint.

Total FRs: 32

### Non-Functional Requirements

NFR1: Key Phase 1 pages shall achieve Performance >= 97 in the agreed mobile and desktop release validation run.

NFR2: Key Phase 1 pages shall meet `LCP < 2.5s`, `CLS < 0.1`, and `INP < 200ms` at the release validation stage.

NFR3: Deferred client-side code for each key Phase 1 public page shall stay within a `<= 150 KB` compressed delivery budget and shall not be required to render first-screen explanatory content.

NFR4: Above-the-fold media and layout containers shall reserve space so no key Phase 1 page exceeds `CLS 0.1`.

NFR5: Key Phase 1 flows shall conform to WCAG 2.1 AA.

NFR6: Key Phase 1 flows shall achieve Accessibility >= 97 in the agreed release validation run.

NFR7: All key Phase 1 controls shall be keyboard accessible, visibly focusable, and screen-reader labeled, with `0` blocked tasks and `0` unlabeled interactive controls in release review.

NFR8: Language, theme, proof-state labels, and no-data messaging shall remain consistent across UK and EN public pages, with `0` mixed-language UI fragments and `0` contradictory proof-state labels in release review.

NFR9: Every indexable Phase 1 page shall include unique title, description, canonical, hreflang, social-preview metadata, and structured search metadata.

NFR10: Consumer-intent public pages shall direct official checking to `Дія` and shall contain zero claims of official state status for `genu.im`.

NFR11: Public proof pages shall present `0` unsupported claims in release review; if required evidence or approved proof data is missing, the page shall fall back to the neutral no-data state instead.

NFR12: Public request capture shall require no more than `5` user-entered fields and shall not require personal data beyond business contact name, business email or phone, company name, scenario, and short context.

NFR13: Public measurement and reporting shall exclude full raw codes and personal data from public analytics outputs.

NFR14: Public pages shall be served over HTTPS and, in deployed review, shall expose at minimum `Content-Security-Policy`, `X-Content-Type-Options`, and `Referrer-Policy` headers appropriate for a static public site.

NFR15: Phase 1 public flows shall work on current stable Chrome, Edge, and Firefox, and unsupported browsers shall fail gracefully without blocking core comprehension or contact.

NFR16: Phase 1 public flows shall remain usable at 360px, 768px, and 1280px widths without horizontal scrolling on key content or hidden primary CTAs.

Total NFRs: 16

### Additional Requirements

- Trust/compliance boundary: `genu.im` must never imitate, replace, or visually mimic `Дія`.
- Trust/compliance boundary: `genu.im` is not certification, expert assessment, or legal confirmation of product legitimacy.
- Public proof boundary: if no public proof data exists, the product must show a neutral no-data state and must not assert authenticity, legality, or state approval.
- Content integrity boundary: sustainability or similar trust claims can appear only when supporting evidence is available.
- Public proof rule: Phase 1 public proof surfaces are examples and demo flows, not live production verification.
- Public proof rule: public proof content must expose source category for every displayed fact and must not expose personal data.
- Lookup/path constraint: Phase 1 default proof path is `/v/genuim` plus the paste-first demo input page `/v/`.
- Scope constraint: Phase 1 does not require arbitrary dynamic public proof pages for every possible code.
- Platform constraint: Phase 1 is a public web experience that must remain understandable without account creation, scanner hardware, or private access.
- Browser constraint: full Safari and iOS Safari support is explicitly deferred.
- SEO/content constraint: consumer-intent search must route official checking to `Дія` while keeping B2B messaging separate.
- Open-decision constraint: unapproved public proof metrics such as the `25M+` claim must not be used until validated.

### PRD Completeness Assessment

- PRD is structurally strong for traceability: it contains explicit success criteria, phased scope, journeys, 32 FRs, 16 NFRs, appendices, and traceability mappings.
- PRD clearly separates Phase 1 scope from later-phase items, which reduces false implementation assumptions.
- Requirements quality is generally high because each requirement is phrased as a testable capability or release gate.
- Readiness risk remains around future-phase requirements being present in the same list (`FR20`, `FR28`, `FR32`), which may confuse epic decomposition if phase ownership is not enforced.
- Another readiness risk is open-decision carryover around analytics depth, growth targets, and public-proof claim framing; these are correctly documented, but they still require disciplined handling during implementation planning.

## Epic Coverage Validation

### Coverage Matrix

| FR Number | PRD Requirement | Epic Coverage | Status |
| --------- | --------------- | ------------- | ------ |
| FR1 | Users can switch the public site between UK and EN. | Epic 1 - language switching across public surfaces | Covered |
| FR2 | The system can persist the selected language for returning visits on supported browsers. | Epic 1 - persisted language preference | Covered |
| FR3 | Users can switch the public site between light and dark theme. | Epic 1 - theme switching across public surfaces | Covered |
| FR4 | The system can persist the selected theme for returning visits on supported browsers. | Epic 1 - persisted theme preference | Covered |
| FR5 | Visitors can identify from the homepage that `genu.im` is a proof-first surface for marked products rather than a generic QR landing page. | Epic 1 - homepage proof-first category clarity | Covered |
| FR6 | Visitors can see explicit role separation between official consumer checking in `Дія` and manufacturer/brand proof in `genu.mark`. | Epic 1 - `Дія` vs `genu.mark` role separation | Covered |
| FR7 | Visitors can open the canonical verification example from the primary homepage CTA. | Epic 1 - homepage CTA into proof path | Covered |
| FR8 | Visitors can identify two distinct homepage paths: `еАкциз` readiness and responsible-manufacturer proof. | Epic 1 - homepage branch recognition | Covered |
| FR9 | Visitors can reach trust-floor destinations from the public site. | Epic 1 - reachability of trust-floor destinations | Covered |
| FR10 | Visitors can open the canonical verification example and view a canonical valid proof example. | Epic 2 - canonical verification example | Covered |
| FR11 | Visitors can open the Phase 1 demo input surface and submit a pasted code or use an example-code action to view a demo result. | Epic 2 - demo input and example-code entry flow | Covered |
| FR12 | The system can display a persistent demo-mode notice on every non-live verification surface. | Epic 2 - persistent demo-mode notice on non-live surfaces | Covered |
| FR13 | The system can present a valid-state example for a product inside the `genu.mark` public proof contour. | Epic 2 - valid proof-state example | Covered |
| FR14 | The system can present a neutral no-data state for products without public proof in `genu.im`. | Epic 2 - neutral no-data proof state | Covered |
| FR15 | The system can explain what public proof could appear in the no-data state and offer a next-step CTA. | Epic 2 - explanatory no-data next step | Covered |
| FR16 | The system can hide empty proof sections instead of rendering placeholder content. | Epic 2 - hidden empty proof sections | Covered |
| FR17 | The system can label each displayed public proof fact by source category. | Epic 2 - source-labeled public proof facts | Covered |
| FR18 | The system can show supporting evidence links or documents when they exist for a displayed public claim. | Epic 2 - supporting evidence links/documents | Covered |
| FR19 | The system can suppress sustainability content when required evidence is missing. | Epic 2 - suppression of unsupported sustainability content | Covered |
| FR20 | Phase 2+ only: approved public proof extensions can add new content fields within the existing public proof structure without requiring a new page type. | Epic 2 - future-ready proof model extension seam | Covered (future phase) |
| FR21 | Consumer-intent visitors can open a dedicated intercept page that points them to `Дія` for official consumer checking. | Epic 3 - consumer-intent intercept to `Дія` | Covered |
| FR22 | Consumer-intent visitors can also see a separate B2B CTA for marking, proof, or transparency services. | Epic 3 - separate B2B CTA on consumer/B2B routing paths | Covered |
| FR23 | Visitors can submit a qualified request with contact data, scenario, and business context. | Epic 3 - qualified request submission flow | Covered |
| FR24 | The system can attach scenario and source-path metadata to each qualified request. | Epic 3 - scenario and source-path metadata capture | Covered |
| FR25 | Partners can share a public proof or demo link that opens the same intended public state and CTA destination without requiring login. | Epic 2 - shareable public proof/demo states without login | Covered |
| FR26 | Visitors can open trust-floor destinations for About, Contact, Proof & Cases, Privacy, Terms, and FAQ from the public site. | Epic 1 - trust-floor destination access from the public site | Covered |
| FR27 | Visitors can see reserved navigation and IA for the future knowledge base without requiring full Phase 1 knowledge content. | Epic 1 - reserved knowledge navigation and IA | Covered |
| FR28 | Phase 2 only: when knowledge content is enabled, visitors can open a knowledge entry and continue to a relevant CTA. | Epic 4 - future knowledge entry to CTA flow | Covered (future phase) |
| FR29 | The product team can distinguish visits that move from the homepage into the proof example path. | Epic 4 - visibility into homepage-to-proof movement | Covered |
| FR30 | The product team can distinguish qualified requests by scenario and entry source. | Epic 4 - reporting by scenario and entry source | Covered |
| FR31 | The product team can review a proof-first funnel consisting of homepage, proof example, and request steps. | Epic 4 - reviewable proof-first funnel | Covered |
| FR32 | Phase 3 only: when live public lookup is enabled, the system can apply bounded abuse controls to reduce repeated enumeration-style requests against the public proof endpoint. | Epic 4 - future abuse controls for live lookup | Covered (future phase) |

### Missing Requirements

- No uncovered PRD functional requirements found.
- No extra FR identifiers were found in the epics document that do not exist in the PRD.
- Coverage risk note: `FR20`, `FR28`, and `FR32` are represented in epics even though they are explicitly future-phase requirements. Traceability is intact, but implementation planning must keep them out of Phase 1 delivery scope unless scope is intentionally expanded.

### Coverage Statistics

- Total PRD FRs: 32
- FRs covered in epics: 32
- Coverage percentage: 100%

## UX Alignment Assessment

### UX Document Status

Found: `_bmad-output/planning-artifacts/ux-design-specification.md`

### Alignment Issues

- UX, PRD, and Architecture align strongly on the core proof-first narrative: homepage clarification -> proof example -> branch split -> conversion -> trust floor.
- UX and Architecture align on the static-site delivery model, lightweight DOM-first controllers, responsive-first behavior, and strong accessibility expectations.
- UX and PRD align on critical trust principles: clear `Дія` vs `genu.mark` separation, honest no-data behavior, proof-before-promise flow, and business-first CTA routing.
- UX introduces sample pages such as `/v/genu.alko` and `/v/genu.cosm` as meaningful journey artifacts, while the PRD Phase 1 baseline names only `/v/genuim`, `/v/`, and one neutral no-data state. This is a scope-alignment gap unless those sample pages are explicitly deferred or added to the approved Phase 1 scope.
- UX defines the Phase 1 request form primarily around sector/company/message plus hidden metadata, but the PRD requires contact data, scenario, company type, and short business context. The UX form spec is therefore under-specified relative to the PRD acceptance contract.
- UX states that the demo banner on `/v/` should appear only after code entry or sample click, while `FR12` requires a persistent demo-mode notice on every non-live verification surface. This is a direct UX-to-PRD mismatch that needs one source of truth.
- Architecture uses a `mailto:` fallback for Phase 1 request capture, which can satisfy a lightweight submission path, but it weakens confidence in structured metadata capture and validation discipline compared with the PRD expectation for qualified requests and attached scenario/source-path metadata.
- Architecture records Phase 1 security-header fallback via `<meta http-equiv>` because GitHub Pages cannot deliver the required HTTP headers. This conflicts with the literal wording of `NFR14`, which expects deployed header presence on public pages.

### Warnings

- Warning: sample-page expansion beyond `/v/genuim` can create hidden scope creep in epics and implementation if not explicitly marked as Phase 2 or optional stretch work.
- Warning: request-form field definitions are not yet fully synchronized across UX, PRD, and Architecture; this can produce rework in copy, markup, validation, analytics, and tests.
- Warning: `NFR14` is not realistically fully satisfiable on GitHub Pages as currently described; either hosting assumptions, release criteria, or acceptance wording must be reconciled before implementation sign-off.
- Warning: future-phase concepts are well documented in all three artifacts, but they remain close enough to Phase 1 language that teams could accidentally implement beyond MVP unless backlog boundaries stay explicit.

## Epic Quality Review

### Overall Assessment

- Epic set is generally strong on traceability, user-centered naming, and BDD-style acceptance criteria.
- Epic ordering is mostly coherent: Epic 1 establishes the public trust surface, Epic 2 builds proof experiences, Epic 3 handles routing and request capture, and Epic 4 handles review/expansion concerns.
- No hard forward dependency violations were found where an epic explicitly requires a later epic to function.
- Main quality problem is not missing coverage. It is scope hygiene: future-phase and enablement work is mixed into a supposedly implementation-ready epic/story set.

### Best Practices Compliance Checklist

| Epic | User value | Independent | Story sizing | No forward dependencies | Clear ACs | Traceable to FRs | Notes |
| ---- | ---------- | ----------- | ------------ | ----------------------- | --------- | ---------------- | ----- |
| Epic 1 | Yes | Yes | Mostly yes | Yes | Mostly yes | Yes | Broad but coherent Phase 1 foundation epic |
| Epic 2 | Mostly yes | Yes | Partial | Yes | Mostly yes | Yes | Contains one future-proofing story that behaves like technical enablement |
| Epic 3 | Yes | Yes | Yes | Yes | Mostly yes | Yes | Strongest implementation-ready epic |
| Epic 4 | Partial | Partial | Partial | Yes | Partial | Yes | Mixes analytics, future knowledge flow, and future abuse protection |

### 🔴 Critical Violations

- **Epic 4 is not cleanly implementation-ready.** It mixes Phase 1 funnel reporting (`FR29`-`FR31`) with future-phase knowledge behavior (`FR28`) and Phase 3 abuse controls (`FR32`). This breaks the standard that implementation epics should deliver a coherent, current-phase user outcome.
  - Example: `Story 4.4` and `Story 4.5` are explicitly future-phase by their own acceptance criteria.
  - Recommendation: split Epic 4 into a Phase 1 analytics/review epic and a deferred future-phase backlog group.

- **Story 2.5 is a technical-enablement story disguised as a user story.** “Keep the Proof Page Ready for Future Fields” describes extensibility architecture, not current user value.
  - Impact: encourages pre-optimization and implementation of future seams that are not required to release Phase 1.
  - Recommendation: move this into architecture notes, a technical task under an implementation story, or a deferred Phase 2 backlog item.

- **Future-phase requirements are embedded as if they are current delivery stories.** `FR20`, `FR28`, and `FR32` have traceability, but they are not Phase 1-complete implementation stories.
  - Impact: team can accidentally burn Phase 1 capacity on work the PRD explicitly defers.
  - Recommendation: mark them as deferred references only, not active implementation stories in the readiness set.

### 🟠 Major Issues

- **Acceptance-criteria depth is inconsistent across stories.** Many stories have good happy-path coverage but limited explicit failure/fallback conditions.
  - Examples: `Story 1.1`, `Story 1.2`, `Story 1.4`, `Story 1.5`, `Story 2.1`, `Story 3.1`, and `Story 3.2` do not explicitly cover broken-link, missing-content, or degraded-state scenarios.
  - Recommendation: add concise failure-mode ACs where the PRD expects resilience, clarity, or graceful degradation.

- **Request-form story details are not fully synchronized with the PRD contract.** `Story 3.3` says the form stays within 5 fields, but it does not explicitly lock in all required business fields from `FR23` and `NFR12`.
  - Recommendation: revise the ACs so required contact method, company name, scenario, company type, and short context are unambiguous.

- **Epic 1 is broad enough to risk implementation batching.** It still passes the user-value test, but homepage clarity, preference persistence, trust pages, and knowledge IA reservation may be too much change volume for one “foundation” epic if strict incremental delivery is desired.
  - Recommendation: keep the epic if needed for sequencing, but ensure story acceptance and release slicing are independently shippable.

### 🟡 Minor Concerns

- Story phrasing is consistently readable, but some stories use “As a visitor” for what are partly internal enablement outcomes, which softens true user-value clarity.
- Epic 4 title is more portfolio/roadmap language than direct user-outcome language.
- The document is highly traceable, but deferred references should be visually distinguished more clearly from active implementation backlog items.

### Dependency Review

- No explicit forward story dependencies were found.
- Epic dependency direction is acceptable: Epic 2 can build on the trust surface established by Epic 1; Epic 3 can use those surfaces; Epic 4 reviews outcomes created by earlier epics.
- The main dependency risk is conceptual, not structural: future-phase stories sitting beside current-phase stories create execution confusion even when formal dependency order is valid.

### Remediation Guidance

- Remove or defer `Story 2.5`, `Story 4.4`, and `Story 4.5` from the implementation-ready set.
- Split Epic 4 into:
  - Phase 1: funnel visibility and reporting review
  - Deferred: knowledge-entry CTA behavior and live-lookup abuse protection
- Tighten ACs for trust-floor pages, routing pages, and form handling with explicit degraded-state and validation scenarios.
- Reconfirm that every story in the final implementation set can be completed, tested, and shipped without relying on future-phase architecture.

## Summary and Recommendations

### Overall Readiness Status

NEEDS WORK

### Critical Issues Requiring Immediate Action

- Epic/story set is not yet cleanly Phase 1-ready because future-phase work is mixed into active implementation planning (`FR20`, `FR28`, `FR32`; `Story 2.5`, `Story 4.4`, `Story 4.5`).
- UX, PRD, and Architecture are not fully synchronized on demo-banner behavior, request-form field contract, and sample-page scope.
- `NFR14` and the current GitHub Pages hosting model are misaligned: the requirement expects deployed security headers that the documented Phase 1 platform cannot fully provide.

### Recommended Next Steps

1. Refactor the epic backlog so the implementation-ready set contains only true Phase 1 stories with current user value.
2. Reconcile the PRD, UX, and Architecture around three specific contracts: request-form fields, demo-banner visibility, and whether sample proof pages beyond `/v/genuim` are Phase 1 or deferred.
3. Resolve the hosting/security contradiction by either relaxing `NFR14`, changing the release gate wording, or moving Phase 1 deployment to infrastructure that can serve the required headers.
4. Tighten acceptance criteria for degraded states, validation behavior, and resilience on trust-floor, routing, and form stories before implementation starts.

### Final Note

This assessment identified 10 issues requiring attention across 3 categories: epic/story quality, cross-document alignment, and platform-readiness constraints. Address the critical issues before proceeding to implementation. These findings can be used to improve the artifacts or you may choose to proceed as-is, but doing so would knowingly carry avoidable scope and delivery risk.

### Assessor Information

- Assessor: John, Product Manager
- Assessment Date: 2026-03-11
