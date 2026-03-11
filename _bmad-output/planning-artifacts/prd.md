---
workflowType: prd
workflow: edit
project_name: gm
user_name: GenuIm
date: 2026-02-23
lastEdited: 2026-03-11
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-e-01-discovery
  - step-e-02-review
  - step-e-03-edit
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-gm-2026-02-23.md
  - _bmad-output/design-thinking-2026-02-23.md
  - _bmad-output/problem-solution-2026-02-23.md
  - _bmad-output/planning-artifacts/validation-report-2026-03-09.md
  - _bmad-output/planning-artifacts/validation-report-2026-03-10.md
  - docs/genu-im-homepage-master-plan.md
classification:
  projectType: web_app
  domain: general
  complexity: low-medium
  projectContext: brownfield
editHistory:
  - date: 2026-03-10
    changes: Reworked the PRD for full homepage transformation with measurable requirements, restored traceability, implementation-agnostic core sections, and appendix-based technical notes.
  - date: 2026-03-11
    changes: Tightened Phase 1 FR/NFR measurability, moved future-phase requirement IDs out of the active FR set, corrected traceability boundaries, and compressed repeated wording.
  - date: 2026-03-11
    changes: Compressed FR wording, restored operator-risk and explainer nuance from the brief, and made procurement FAQ topics more explicit.
---

# Product Requirements Document - gm

**Author:** GenuIm  
**Original Date:** 2026-02-23  
**Last Edited:** 2026-03-11

## Executive Summary

`genu.im` is the public proof-first surface for `genu.mark`: it helps manufacturers and partners understand marking, public proof, and next-step contact without asking them to trust slogans first. Phase 1 must transform the homepage into a compact sequence that explains the category, shows why the product is more than a generic QR landing page, leads into a verification example, separates two business branches, and supports contact conversion.

The trust model is explicit. `genu.im` does not act as certification, expert assessment, or a state service. Official consumer checking for `еАкциз` belongs to `Дія`. `genu.im` explains and demonstrates what `genu.mark` can prove for products inside its own contour: marked-product proof, public transparency facts, and a clear no-data boundary when public proof is unavailable.

Phase 1 is a build-now web delivery slice, not a full product platform. It ships the homepage, a canonical verification example, a paste-first demo input, one defined no-data proof state, request capture, trust-floor destinations, and proof-path attribution. The experience must communicate production-contour reliability through operational confidence, low-surprise language, visible proof boundaries, and explicit avoidance of line-stoppage and data-chaos risk while meeting the Phase 1 performance, accessibility, browser, language, and theme stability gates in this PRD. Live lookup, private B2B workflows, and richer knowledge-base or analytics capabilities remain staged for later phases.

### What Makes This Product Different

- Trust is built through action: the homepage leads to a verification example instead of relying on claims alone.
- The product clearly separates the official `Дія` path from the `genu.mark` manufacturer/brand proof layer.
- Production-grade industrial experience is conveyed through operational confidence, proof surfaces, and low-surprise language rather than broad claims.
- A neutral no-data state is treated as a credibility feature, not hidden as a failure.
- The same marked-product story can speak to two audiences early, then split into deeper paths later:
  - `еАкциз`-ready operations
  - responsible manufacturers and brand transparency

## Project Classification

Project Type: `web_app`  
Domain: `general`  
Complexity: `low-medium`  
Project Context: `brownfield`

## Success Criteria

### User Success

- **SC1:** In a 10-second first-screen review, at least 70% of ICP respondents can explain what `genu.im` is, why it is trustworthy, and what action to take next.
- **SC2:** In moderated review, at least 70% of ICP respondents correctly distinguish the roles of `Дія` and `genu.mark` without confusing `genu.im` with a state or certification service.
- **SC3:** In moderated task-based review before Phase 1 release, at least 80% of ICP respondents who open the canonical verification example can correctly identify (1) what the page shows, (2) what it does not claim, and (3) the intended next CTA.
- **SC4:** In moderated task-based review before Phase 1 release, at least 80% of ICP respondents can choose the branch that matches their situation (`еАкциз` operations or manufacturer/brand proof) and reach its branch-specific CTA without taking a wrong branch first.

### Business Success

- **SC5:** Every submitted qualified request captures scenario, company name, short business context, and source path.
- **SC6:** Within 2 weeks of release, the team can review a measurable proof-first path from homepage entry to proof example to request submission.
- **SC7:** Within 2 weeks of release, the team has a baseline for qualified requests, proof-example visits, and proof-to-request conversion to support later product target setting.

### Technical and Quality Success

- **SC8:** Phase 1 public pages meet the agreed performance gates in this PRD.
- **SC9:** Phase 1 key flows meet the agreed accessibility gates in this PRD.
- **SC10:** Language and theme controls remain stable across supported browsers and reloads on Phase 1 public pages.
- **SC11:** Trust-floor destinations are live, reachable, and clearly non-empty.
- **SC12:** Homepage IA reserves a future knowledge-base surface without requiring a navigation rewrite later.
- **SC13:** No-data proof states and consumer-intent intercept content pass copy review for honesty, neutrality, and no false state mimicry.
- **SC14:** Source-tagged proof-path measurement is available for release review, even if deeper automated analytics are deferred.

### Measurement Notes

- Release acceptance uses the criteria above.
- Growth targets that depend on new baseline data are tracked in `Appendix B - Open Decisions` and are not release blockers for Phase 1.
- Moderated checks for `SC1`-`SC4` use at least `10` ICP respondents per review round.
- `SC1`-`SC3` count as pass only when a respondent completes every required comprehension check in one attempt.
- `SC4` counts as pass only when the respondent chooses the correct branch first and reaches its intended CTA without first entering the wrong branch.

## Product Scope & Phased Development

### Phase 1 (MVP): Build-Now Homepage Transformation

Phase 1 includes only the public surfaces and measurement needed to ship the proof-first homepage:

- Homepage with this ordered experience:
  - category framing
  - bridge section explaining why this is not just a QR landing page
  - mandatory verification example entry point
  - branch split for `еАкциз` and responsible manufacturers
  - explicit CTA layer
  - trust floor
- Language and theme foundations across all public Phase 1 surfaces
- Compact compare-vs-generic-QR explanation plus a named `marking -> protocol -> proof` explainer
- Canonical verification example
- Paste-first demo input with example-code action
- One neutral no-data proof state
- Persistent demo-mode labeling on non-live proof surfaces
- Qualified request form with scenario and source-path capture
- Shareable public proof and demo links for approved Phase 1 states
- Trust-floor destinations for About, Contact, Proof & Cases, Privacy, Terms, FAQ, and external company presence
  - About includes a compact company-controlled self-verification explanation of what `genu.im` is and is not
  - FAQ includes starter procurement and audit questions for Phase 1
- NDA-safe evidence framing for public proof and proof/case starter content
- Navigation and IA reservation for future knowledge-base growth
- Proof-path attribution sufficient for Phase 1 funnel review
- SEO foundation for the homepage, proof surfaces, trust surfaces, and one consumer-intent intercept path

### Phase 1 Out of Scope

- Live production lookup against real product data
- Full private B2B portal or investigation workflow
- Full knowledge-base rollout beyond IA reservation and placeholder-ready destinations
- Arbitrary-code public deep-link behavior for every possible input unless approved later
- Full Safari and iOS Safari support
- Public claims that depend on unapproved proof metrics or undefined scale framing

### Phase 2: Growth and Content Expansion

- Knowledge-base rollout aligned to high-intent clusters
- Deeper funnel analytics and reporting automation
- Expanded public proof content and proof/case surfaces
- Optional expansion of approved shareable proof states

### Phase 3: Live Proof and Private Layer

- Live lookup against production data for approved use cases
- Abuse controls for real public lookup
- Private B2B access for deeper operational workflows
- Additional browser/platform support as approved

## User Journeys

### Journey 1 - Automation lead, integrator, or equipment partner

- **Trigger:** Automation lead, integrator, or equipment partner needs a proof surface that strengthens a marking or implementation decision without introducing line-stability or data-integrity doubt.
- **Needs:** Clear role separation, operational confidence, implementation-owner relevance, proof example, and a shareable next step.
- **Success Outcome:** The implementation owner or partner uses the public proof/demo surface as a presales or alignment artifact that supports line-confidence discussion and leads to a qualified request.

### Journey 2 - Manufacturer preparing for `еАкциз`

- **Trigger:** Operations or compliance stakeholder wants a low-surprise marking path that avoids line stoppage, data chaos, and regulatory surprise.
- **Needs:** Clear division between `Дія` and `genu.mark`, confidence in proof/readiness language, and a request path with operational context.
- **Success Outcome:** Stakeholder understands the contour, does not confuse the product with state checking, and requests a relevant conversation.

### Journey 3 - Responsible manufacturer or brand owner

- **Trigger:** Brand team wants product-level trust and public transparency beyond the state minimum.
- **Needs:** A clear example of what a proof page can show and what it cannot claim.
- **Success Outcome:** User sees the verification example, understands the value of public proof, and requests a relevant next step.

### Journey 4 - Skeptical procurement, audit, or partner visitor

- **Trigger:** Visitor sees or receives a no-data proof state and expects either overclaiming or an empty marketing page.
- **Needs:** Neutral messaging, explicit honesty, and a useful next step.
- **Success Outcome:** Visitor understands that no public proof is available in `genu.im`, sees what could exist inside the `genu.mark` contour, and either exits cleanly or converts to a lead.

### Journey 5 - Consumer-intent search visitor

- **Trigger:** Visitor arrives through a consumer-style query about checking marked products.
- **Needs:** Immediate redirection to the correct official path and a non-confusing separation between consumer checking and B2B value.
- **Success Outcome:** Visitor is directed to `Дія` for official consumer checking and can still discover a separate B2B CTA if relevant.

### Cross-Journey Enablement

These capabilities support all journeys rather than one branch only:

- language and theme stability
- accessibility and responsive behavior
- trust-floor destinations
- request source capture and proof-path measurement
- honest demo labeling and no-data boundaries
- knowledge-base IA reservation only; knowledge-consumption behavior remains out of Phase 1 scope

## Domain-Specific Requirements

### Trust and Compliance Boundaries

- `Дія` is the official consumer-check path for `еАкциз`; `genu.im` must never imitate, replace, or visually mimic a state service.
- `genu.im` is not certification, expert assessment, or legal confirmation of product legitimacy.
- Public proof on `genu.im` is limited to what can be shown honestly from the `genu.mark` contour and approved brand-provided facts.
- If no public proof data exists, the product must show a neutral no-data state and must not assert authenticity, legality, or state approval.
- Sustainability or similar trust claims can appear only when supporting evidence is available.

### Public Proof Rules

- Phase 1 public proof surfaces are examples and demo flows, not live production verification.
- Public proof content must expose source category for every displayed fact.
- Empty proof sections remain hidden.
- Public proof content must not expose personal data.
- No-data states must remain useful, factual, and clearly separate from official state checking.

### Lookup and Path Defaults

- Phase 1 default proof path is the canonical verification example plus the paste-first demo input surface.
- Approved Phase 1 proof/demo states are limited to the canonical verification example and the demo-input flow with its approved result states.
- Named sector-specific sample pages require separate approval and are deferred by default.
- Phase 1 does not require arbitrary dynamic public proof pages for every possible code.
- Live lookup is a later-phase capability and must not be implied by Phase 1 copy.

## Innovation & Novel Patterns

- **Proof-first homepage:** The homepage earns trust by leading users into proof, not by stacking claims.
- **Two-fish capture model:** The public site catches two audiences early, then separates them into clearer branches later.
- **State layer vs brand/manufacturer layer:** The product respects the official `Дія` path while demonstrating the additional value of manufacturer-controlled public proof.
- **Honest no-data state:** Lack of public proof becomes an explicit and credible boundary instead of a disguised failure.
- **Sequential persuasion model:** Hook -> Clarify -> Differentiate -> Prove -> Branch -> Convert -> Trust.

## web_app Specific Requirements

### Project-Type Overview

- Phase 1 is a public web experience with a homepage, proof example, demo input, no-data example state, and trust-floor destinations.
- The product must remain understandable without requiring account creation, scanner hardware, or private access.

### browser_matrix

- Supported in Phase 1: current stable Chrome, Edge, and Firefox.
- Unsupported browsers must fail gracefully without hiding core comprehension, contact paths, or proof/example entry points.
- Full Safari and iOS Safari support is deferred.

### responsive_design

- Key Phase 1 flows must remain usable at 360px, 768px, and 1280px widths.
- First-screen clarity, primary CTA visibility, request form usability, and trust-floor access must remain intact at those widths.
- No key Phase 1 page may require horizontal scrolling to complete its primary task.

### performance_targets

- Key Phase 1 pages must satisfy the performance targets defined in `NFR1`-`NFR4`.
- Performance validation is a release gate, not a stretch goal.

### accessibility_level

- Phase 1 key flows must satisfy WCAG 2.1 AA expectations.
- Accessibility is evaluated on the homepage, canonical proof example, demo input, request form, and trust-floor navigation.
- Accessibility validation is a release gate, not a later polish task.

### seo_strategy

- SEO targets B2B intent first: `еАкциз` readiness, marking operations, DataMatrix implementation, and trust/proof education.
- Consumer-intent search is handled through a dedicated intercept path that points official checking to `Дія` and keeps B2B messaging separate.
- Phase 1 ships SEO-ready IA and trust-floor destinations; deep knowledge content is staged for later phases unless explicitly approved.

## Functional Requirements

### Language and Theme Foundations

- **FR1:** Public site language is switchable between UK and EN.
  - **Scope/Context:** Homepage, proof example, demo input, and trust-floor destinations.
  - **Acceptance/Verification:** The selected language updates visible UI copy on supported Phase 1 surfaces.

- **FR2:** Selected language persists for returning visits on supported browsers.
  - **Scope/Context:** Phase 1 public pages.
  - **Acceptance/Verification:** After reload or navigation during returning visits on supported browsers, the previously selected language remains active.

- **FR3:** Public site theme is switchable between light and dark.
  - **Scope/Context:** Homepage, proof example, demo input, and trust-floor destinations.
  - **Acceptance/Verification:** The selected theme updates visible UI state on supported Phase 1 surfaces.

- **FR4:** Selected theme persists for returning visits on supported browsers.
  - **Scope/Context:** Phase 1 public pages.
  - **Acceptance/Verification:** After reload or navigation during returning visits on supported browsers, the previously selected theme remains active.

### Homepage Narrative and Branches

- **FR5:** Homepage messaging states that `genu.im` is a public proof surface for marked products and not a generic QR landing page.
  - **Scope/Context:** Homepage hero and bridge content.
  - **Acceptance/Verification:** The homepage contains category framing, a named `marking -> protocol -> proof` explainer, and a bridge section before the proof example entry point.

- **FR6:** Homepage branch messaging, canonical proof example, no-data state, and the consumer-intent intercept page show explicit role separation between official consumer checking in `Дія` and manufacturer or brand proof in `genu.mark`.
  - **Scope/Context:** Homepage branch messaging, canonical proof example, no-data state, and consumer-intent intercept page.
  - **Acceptance/Verification:** Each listed surface includes copy that distinguishes the two roles without state mimicry.

- **FR7:** Primary homepage CTA opens the canonical verification example.
  - **Scope/Context:** Homepage hero and first proof CTA.
  - **Acceptance/Verification:** The primary proof CTA opens the canonical verification example surface.

- **FR8:** Homepage exposes one `еАкциз` entry point and one responsible-manufacturer entry point, each with its own branch-specific CTA.
  - **Scope/Context:** Homepage branch section.
  - **Acceptance/Verification:** The homepage exposes the two named branch entry points with branch-specific next-step CTAs; the `еАкциз` branch names low-surprise operational readiness and risk reduction, and the responsible-manufacturer branch names public-proof value.

- **FR9:** Trust-floor destinations are reachable from the public site.
  - **Scope/Context:** Homepage navigation and footer.
  - **Acceptance/Verification:** About, Contact, Proof & Cases, Privacy, Terms, and FAQ are visible and resolvable from the public site.

### Proof Example and Demo Input

### Shared Functional Definitions

- **Phase 1 qualification fields:** business contact name, one reachable business email or phone, company name, scenario, and short context.

- **FR10:** Canonical verification example displays an approved proof-example state.
  - **Scope/Context:** Primary proof page.
  - **Acceptance/Verification:** The page identifies the proof-example context, shows source-labeled public facts, states that the surface is a demo/example rather than a live production lookup, and includes one intended next-step CTA.

- **FR11:** Phase 1 demo input surface accepts a pasted code or an example-code action to open a demo result.
  - **Scope/Context:** Phase 1 demo input page.
  - **Acceptance/Verification:** The page accepts paste-first input and offers an example-code action without requiring a scanner.

- **FR12:** Every non-live verification surface displays a persistent demo-mode notice.
  - **Scope/Context:** Demo input, canonical verification example, and any Phase 1 no-data example.
  - **Acceptance/Verification:** A visible notice above the result or input area states that the flow is a demo/example, not a live production lookup.

- **FR13:** Canonical proof example displays a valid-state example for a product inside the `genu.mark` public proof contour.
  - **Scope/Context:** Canonical proof example.
  - **Acceptance/Verification:** The result page shows a valid proof state and public facts permitted by `Trust and Compliance Boundaries`.

- **FR14:** Products without public proof in `genu.im` display the defined no-data state.
  - **Scope/Context:** Phase 1 no-data example.
  - **Acceptance/Verification:** The page states that no public proof data is available in `genu.im`, makes no authenticity, legality, or state-approval claims, and keeps the next-step CTA separate from any official consumer-check action.

- **FR15:** No-data state explains what public proof could appear and offers a next-step CTA.
  - **Scope/Context:** Phase 1 no-data example.
  - **Acceptance/Verification:** The page includes a list of potential proof blocks permitted by `Public Proof Rules` and a business CTA.

- **FR16:** Empty proof sections remain hidden instead of rendering placeholder content.
  - **Scope/Context:** Valid-state proof example.
  - **Acceptance/Verification:** No empty section appears on a public proof page.

- **FR17:** Each displayed public proof fact is labeled by source category.
  - **Scope/Context:** Valid-state proof example.
  - **Acceptance/Verification:** Each displayed fact indicates whether it comes from `genu.mark`, the brand, or a supporting document.

- **FR18:** Supporting evidence links or documents appear in NDA-safe public form for each displayed public claim that has supporting evidence.
  - **Scope/Context:** Valid-state proof example.
  - **Acceptance/Verification:** Each displayed public claim with supporting evidence includes at least one visible and clickable evidence link or document.

- **FR19:** Sustainability content stays hidden when required evidence is missing.
  - **Scope/Context:** Public proof surfaces.
  - **Acceptance/Verification:** No sustainability claim renders without evidence.

### SEO Intercept and Lead Capture

- **FR21:** Consumer-intent intercept page points official consumer checking to `Дія`.
  - **Scope/Context:** Consumer-intent search path.
  - **Acceptance/Verification:** The intercept page explicitly names `Дія` as the official consumer-check path and does not mimic a state interface.

- **FR22:** Consumer-intent intercept page also shows a separate B2B CTA for marking, proof, or transparency services.
  - **Scope/Context:** Consumer-intent intercept page.
  - **Acceptance/Verification:** The B2B CTA is visibly separate from the `Дія` action and uses non-governmental language.

- **FR23:** Public request form captures a qualified request with contact data, scenario, and business context.
  - **Scope/Context:** Public request form.
  - **Acceptance/Verification:** A request counts as qualified when submission requires and captures the Phase 1 qualification fields defined in `Shared Functional Definitions` before completion.

- **FR24:** Submitted qualified requests include scenario and source-path metadata.
  - **Scope/Context:** Public request handling.
  - **Acceptance/Verification:** Each submitted request retains scenario and source-path metadata, and includes proof-origin metadata when the request starts from a proof surface.

- **FR25:** Shareable public proof or demo links open the same intended public state and CTA destination without requiring login.
  - **Scope/Context:** Canonical proof example and approved Phase 1 demo states.
  - **Acceptance/Verification:** A shared public link opens successfully in a new browser session, shows the same intended proof or demo state, and preserves the intended CTA destination.

### Knowledge Base and Trust Surface

- **FR26:** Trust-floor destinations for About, Contact, Proof & Cases, Privacy, Terms, and FAQ are reachable from the public site.
  - **Scope/Context:** Homepage and public proof surfaces.
  - **Acceptance/Verification:** Each destination resolves successfully and contains either at least one user-visible starter content section or a placeholder page that states the destination purpose and current CTA path. In Phase 1, About explains the company-controlled proof role of `genu.im`, and FAQ includes starter procurement or audit-oriented questions covering SLA expectations, access model, business data handling, and no-surprise operating boundaries.

- **FR27:** Public IA includes a reserved knowledge-base navigation slot without requiring full Phase 1 knowledge content.
  - **Scope/Context:** Homepage navigation, footer, and trust-floor references.
  - **Acceptance/Verification:** Public IA shows where the knowledge base will live or links to a placeholder destination that names the future knowledge-base purpose and preserves a current Phase 1 CTA path.

### Measurement and Enablement

- **FR29:** Homepage-to-proof traffic is distinguishable in Phase 1 funnel review.
  - **Scope/Context:** Phase 1 proof-first funnel review.
  - **Acceptance/Verification:** Review data separates homepage-to-proof visits from other entry paths.

- **FR30:** Qualified requests are distinguishable by scenario and entry source.
  - **Scope/Context:** Request review and basic reporting.
  - **Acceptance/Verification:** Request records can be filtered by scenario and source path.

- **FR31:** Phase 1 proof-first funnel is reviewable across homepage, proof example, proof-surface CTA continuation, and request steps.
  - **Scope/Context:** Phase 1 release review.
  - **Acceptance/Verification:** Phase 1 release review shows homepage entry, proof entry, proof-surface CTA continuation, and request submission when that final step occurs.

## Non-Functional Requirements

### Release Validation Protocol

### Shared Validation Definitions

- **Primary task set:** homepage comprehension, proof-example entry, demo input interaction, request-form completion readiness, and trust-floor navigation.
- **Supported-browser matrix:** the browser commitments defined in `browser_matrix`.
- **Required responsive widths:** the viewport commitments defined in `responsive_design`.
- **Approved Phase 1 delivery budget:** deferred page-delivery budget of `<= 150 KB` compressed for each key public page.
- **Phase 1 release validation protocol:** one mobile audit run and one desktop audit run for each required page type, using the same approved page-quality audit workflow and browser settings across all measured pages.
- **Trust-boundary copy-review checklist:** confirms `Дія` separation, non-state positioning, and absence of unsupported proof claims.
- **Required SEO metadata set:** unique title, description, canonical, hreflang, and social-preview metadata.
- **Required structured search data set:** at least one structured-data block describing page type and canonical subject.
- **Deployment-security requirements:** HTTPS on all public pages plus the project's required browser-facing security controls where direct controls are available, or documented compensating controls where they are not.

### Performance

- **NFR1:** Key Phase 1 pages shall achieve Performance >= 97 in the Phase 1 release validation protocol.
  - **Scope/Context:** Homepage, demo input surface, canonical verification example, no-data example, and trust-floor destinations.
  - **Verification Signal:** Validation results are captured for each required page type using the Phase 1 release validation protocol defined in `Shared Validation Definitions`.

- **NFR2:** Key Phase 1 pages shall meet `LCP < 2.5s`, `CLS < 0.1`, and `INP < 200ms` in the Phase 1 release validation protocol.
  - **Scope/Context:** Same key public pages as `NFR1`.
  - **Verification Signal:** Validation results record `LCP`, `CLS`, and `INP` for each key page type using the Phase 1 release validation protocol defined in `Shared Validation Definitions`.

- **NFR3:** Each key Phase 1 public page shall stay within the approved Phase 1 delivery budget and shall not require deferred interactions to render first-screen explanatory content.
  - **Scope/Context:** Homepage, canonical verification example, demo input surface, and no-data example.
  - **Verification Signal:** Delivery-budget review confirms each required page stays within the approved Phase 1 budget defined in `Shared Validation Definitions`, and first-screen explanatory content remains visible on initial page render.

- **NFR4:** Above-the-fold media and layout containers shall reserve space so no key Phase 1 page exceeds `CLS 0.1`.
  - **Scope/Context:** Homepage, proof example, demo input, and trust-floor destinations.
  - **Verification Signal:** Release validation results and slow-load manual review confirm the required `CLS` threshold.

### Accessibility and Language Integrity

- **NFR5:** Key Phase 1 flows shall conform to the accessibility level defined in `accessibility_level`.
  - **Scope/Context:** Homepage, canonical proof example, demo input, request form, and trust-floor navigation.
  - **Verification Signal:** A documented accessibility review confirms `0` blockers against the required accessibility level, `0` blocked critical-path tasks, and explicit release approval against the checklist defined in `Shared Validation Definitions`.

- **NFR6:** Key Phase 1 flows shall achieve Accessibility >= 97 in the Phase 1 release validation protocol.
  - **Scope/Context:** Same key flows as `NFR5`.
  - **Verification Signal:** Validation results are captured for each required flow using the Phase 1 release validation protocol defined in `Shared Validation Definitions`.

- **NFR7:** All key Phase 1 controls shall be keyboard accessible, visibly focusable, and screen-reader labeled, with `0` blocked tasks and `0` unlabeled interactive controls in release review.
  - **Scope/Context:** Navigation, branch selection, CTA buttons, proof-example entry, demo input, request form, and footer links.
  - **Verification Signal:** A keyboard and labeling review using the checklist defined in `Shared Validation Definitions` confirms `100%` completion of critical tasks, `0` keyboard traps, `0` missing visible focus indicators, and `0` unlabeled interactive controls.

- **NFR8:** Language, theme, proof-state labels, and no-data messaging shall remain consistent across UK and EN public pages, with `0` mixed-language UI fragments and `0` contradictory proof-state labels in release review.
  - **Scope/Context:** Homepage, proof example, demo input, intercept page, and trust-floor destinations.
  - **Verification Signal:** Cross-language and cross-theme review using the release checklist defined in `Shared Validation Definitions` confirms `0` mixed-language UI fragments, `0` contradictory proof-state or no-data labels, and `0` language or theme persistence mismatches after reload on the required surfaces.

### SEO and Content Integrity

- **NFR9:** `100%` of indexable Phase 1 pages shall include the required SEO metadata set and required structured search data set defined in `Appendix A`.
  - **Scope/Context:** Homepage, proof example, intercept path, and trust-floor destinations intended for indexing.
  - **Verification Signal:** A markup inventory confirms presence of the complete SEO metadata set and structured search data set defined in `Shared Validation Definitions` on `100%` of indexed Phase 1 pages.

- **NFR10:** Consumer-intent public pages shall direct official checking to `Дія` and shall contain zero claims of official state status for `genu.im`.
  - **Scope/Context:** Intercept path and any proof pages referencing official checking.
  - **Verification Signal:** The documented trust-boundary copy-review checklist defined in `Shared Validation Definitions` confirms compliance before release.

- **NFR11:** Canonical proof example and no-data example shall present `0` unsupported claims in release review; if required evidence or approved proof data is missing, the page shall fall back to the neutral no-data state instead.
  - **Scope/Context:** Canonical proof example and no-data example.
  - **Verification Signal:** A claim inventory using the review checklist defined in `Shared Validation Definitions` confirms that every displayed public claim maps to approved proof support or evidence, and any claim lacking that support is absent or replaced by the defined no-data state.

### Privacy and Security

- **NFR12:** Public request capture shall require no more than `5` user-entered fields and shall not require personal data beyond business contact name, business email or phone, company name, scenario, and short context.
  - **Scope/Context:** Phase 1 request form.
  - **Verification Signal:** Form-field review confirms the required-field count stays within the limit, supporting metadata fields do not count toward that limit, and no additional personal fields are mandatory.

- **NFR13:** Public measurement and reporting shall expose `0` full raw codes and `0` personal-data fields in public analytics outputs.
  - **Scope/Context:** Phase 1 source tagging.
  - **Verification Signal:** A measurement-field inventory confirms `0` full raw-code fields and `0` personal-data fields are present in public analytics outputs.

- **NFR14:** Public pages shall be served over HTTPS in Phase 1. Each key public page type shall satisfy the deployment-security requirements defined in `Appendix A`, whether through direct controls or documented compensating controls.
  - **Scope/Context:** All public Phase 1 pages.
  - **Verification Signal:** A deployment security review confirms HTTPS on all public Phase 1 pages and verifies the deployment-security requirements defined in `Shared Validation Definitions` for each key public page type.

### Compatibility and Responsive Quality

- **NFR15:** Phase 1 public flows shall complete the primary task set across the supported-browser matrix with `0` blocked tasks, and unsupported browsers shall preserve homepage comprehension and contact access.
  - **Scope/Context:** Homepage, proof example, demo input, request form, and trust-floor destinations.
  - **Verification Signal:** A manual browser smoke run completes the primary task set defined in `Shared Validation Definitions` across the supported-browser matrix with `0` blocked tasks and confirms preserved homepage comprehension and contact access on unsupported browsers.

- **NFR16:** Phase 1 public flows shall complete the primary task set across the required responsive widths with `0` horizontal scrolling on key content and `0` hidden primary CTAs.
  - **Scope/Context:** Homepage, proof example, demo input, request form, and trust-floor destinations.
  - **Verification Signal:** A responsive smoke review completes the primary task set defined in `Shared Validation Definitions` across the required responsive widths with `0` horizontal-scrolling blockers and `0` hidden primary CTAs.

## Appendix A - Delivery Notes

This appendix preserves technical detail without turning the PRD core into a solution-design document.

### A1. Phase 1 Default Path Decisions

- Recommended Phase 1 proof surfaces:
  - homepage
  - canonical proof example
  - paste-first demo input
  - one approved no-data example state
- Recommended Phase 1 public deep-linking default: keep shareable links for canonical or approved demo states only; do not require arbitrary encoded-code public links yet.

### A2. Public Proof Content Contract

- Public proof content should distinguish source category.
- Sustainability content requires evidence.
- Public proof field categories supported in later implementation should include at least:
  - text
  - date
  - link
  - document
- Internal schema, storage model, or API design belongs in architecture and technical design artifacts.

### A3. Measurement Notes

- Recommended Phase 1 default: review proof-path behavior through source-tagged page paths and request metadata.
- Richer event taxonomy and automated funnel reporting can expand in Phase 2.

### A4. Architecture Boundary Notes

- Public delivery remains lightweight and deployment-specific.
- Exact stack, hosting vendor, protocol choice, route implementation details, and interface design belong in architecture and implementation notes, not the PRD core.

### A5. Future-Phase Requirement Notes (Not Part of Phase 1 Functional Decomposition)

- **FR20 (Phase 2+ roadmap note):** Approved public proof extensions may add new proof field categories within the existing public proof structure without requiring a new public page type. Later-phase implementation must preserve source labeling, evidence visibility, and no-empty-section rules.
- **FR28 (Phase 2 roadmap note):** When knowledge content is enabled, visitors may open a knowledge entry and continue to a CTA aligned to that entry's topic. This behavior is deferred until Phase 2 knowledge rollout is approved.
- **FR32 (Phase 3 roadmap note):** When live public lookup is enabled, the product specification must define bounded abuse controls, neutral blocked-response behavior, and a review procedure for suspected enumeration-style requests before Phase 3 release.


## Appendix B - Open Decisions

These decisions should not block the PRD edit pass. Each item includes a recommended Phase 1 default.

1. **Growth targets after baseline**
   - **Open Question:** What exact uplift targets should the team set for qualified requests, proof-entry CTR, and proof-to-request conversion?
   - **Recommended Phase 1 Default:** Establish baseline within 2 weeks of release and do not make uplift targets a release gate.

2. **Public DataMatrix access model beyond the canonical example**
   - **Open Question:** Should Phase 1 support arbitrary-code public deep-links, paste-first only, or both?
   - **Recommended Phase 1 Default:** Ship canonical proof example plus paste-first demo input; defer arbitrary-code public deep-linking.

3. **`25M+` proof claim framing**
   - **Open Question:** What exact unit is being counted, and is that claim approved for public homepage use?
   - **Recommended Phase 1 Default:** Do not use the claim until the counted unit and framing are approved.

4. **Analytics depth in Phase 1**
   - **Open Question:** Is lightweight source-tagged review sufficient, or must Phase 1 ship deeper automated event instrumentation?
   - **Recommended Phase 1 Default:** Require source-path and request-source visibility in Phase 1; defer richer event automation to Phase 2.

5. **Knowledge-base rollout depth in Phase 1**
   - **Open Question:** Does Phase 1 include only IA and trust-floor placeholders, or also one live starter article?
   - **Recommended Phase 1 Default:** Ship IA reservation and placeholder-ready destinations only unless a starter article is explicitly approved.

## Appendix C - Traceability Mapping

### Functional Requirements Mapping

| Requirement | Supports Success Criteria | Supports Journeys |
|-------------|---------------------------|-------------------|
| FR1 | SC10 | J1, J2, J3, J4, J5 |
| FR2 | SC10 | J1, J2, J3, J4, J5 |
| FR3 | SC10 | J1, J2, J3, J4, J5 |
| FR4 | SC10 | J1, J2, J3, J4, J5 |
| FR5 | SC1 | J1, J2, J3 |
| FR6 | SC2, SC13 | J1, J2, J3, J4, J5 |
| FR7 | SC3, SC14 | J1, J2, J3 |
| FR8 | SC4 | J1, J2, J3 |
| FR9 | SC11 | J1, J2, J3, J4, J5 |
| FR10 | SC3, SC14 | J1, J3 |
| FR11 | SC3, SC13 | J1, J2, J3, J4 |
| FR12 | SC3 | J1, J2, J3 |
| FR13 | SC3 | J1, J3 |
| FR14 | SC13 | J4 |
| FR15 | SC13 | J4 |
| FR16 | SC3, SC13 | J1, J2, J3 |
| FR17 | SC3 | J1, J2, J3 |
| FR18 | SC3, SC13 | J1, J2, J3 |
| FR19 | SC3, SC13 | J3 |
| FR21 | SC2, SC13 | J5 |
| FR22 | SC4 | J5 |
| FR23 | SC5 | J1, J2, J3, J4, J5 |
| FR24 | SC5, SC6 | J1, J2, J3, J4, J5 |
| FR25 | SC6, SC7 | J1 |
| FR26 | SC11 | J1, J2, J3, J4, J5 |
| FR27 | SC12 | J1, J2, J3, J5 |
| FR29 | SC6, SC7, SC14 | J1, J2, J3 |
| FR30 | SC5, SC6, SC7 | J1, J2, J3, J4, J5 |
| FR31 | SC6, SC7, SC14 | J1, J2, J3 |

Roadmap identifiers `FR20`, `FR28`, and `FR32` are tracked in `Appendix A` as future-phase notes and are intentionally excluded from the active Phase 1 traceability chain.

`SC7`, `SC12`, and `SC14` are supported primarily through Cross-Journey Enablement and release-review behavior rather than a single numbered journey.

### Non-Functional Requirements Mapping

| Requirement | Supports Success Criteria | Supports Journeys |
|-------------|---------------------------|-------------------|
| NFR1 | SC8 | J1, J2, J3, J4, J5 |
| NFR2 | SC8 | J1, J2, J3, J4, J5 |
| NFR3 | SC8 | J1, J2, J3, J4, J5 |
| NFR4 | SC8 | J1, J2, J3, J4, J5 |
| NFR5 | SC9 | J1, J2, J3, J4, J5 |
| NFR6 | SC9 | J1, J2, J3, J4, J5 |
| NFR7 | SC9 | J1, J2, J3, J4, J5 |
| NFR8 | SC10, SC13 | J1, J2, J3, J4, J5 |
| NFR9 | SC11 | J1, J2, J3, J5 |
| NFR10 | SC2, SC13 | J4, J5 |
| NFR11 | SC2, SC13 | J1, J2, J3, J4 |
| NFR12 | SC5 | J1, J2, J3, J4, J5 |
| NFR13 | SC6, SC14 | J1, J2, J3, J4, J5 |
| NFR14 | SC11 | J1, J2, J3, J4, J5 |
| NFR15 | SC10 | J1, J2, J3, J4, J5 |
| NFR16 | SC10 | J1, J2, J3, J4, J5 |

## Appendix D - Assumptions Used in This Edit Pass

- Phase 1 should remain a compact public-site slice and should not be forced to absorb live lookup, full analytics automation, or a private B2B layer.
- The safest default for unresolved lookup behavior is canonical proof example plus paste-first demo input, not arbitrary dynamic public deep-linking.
- Growth targets that require new baseline data are valid product questions, but they should not block a clean Phase 1 PRD.
- Trust-floor placeholder destinations are better than missing destinations, provided they are honest, reachable, and clearly branded as company-controlled pages.
- The PRD core should describe product capability and acceptance, while route mechanics, stack/hosting choices, and payload/interface detail should live in appendices or later architecture artifacts.

## Appendix E - Homepage Master Plan Alignment

This appendix records how the remarks in `docs/genu-im-homepage-master-plan.md` are handled in the PRD so they are accounted for explicitly without expanding the Phase 1 scope.

### E1. Key Decisions and Priority Ladder Alignment

- `еАкциз` and `Дія` remain in Ukrainian form throughout the PRD core.
- `еАкциз` / marking remains the strategic core through the executive summary, Journey 2, branch logic, and intercept rules.
- Two homepage audiences are caught early, then split later, through the ordered Phase 1 homepage experience and `FR8`.
- The verification preview remains mandatory and appears after category framing and the bridge section through Phase 1 scope, `FR5`, and `FR7`-`FR18`.
- Trust placeholders are included now through trust-floor destinations, `FR26`, and `FR27`.
- P0 trust-cleanup remarks are handled through `FR6`, `FR21`-`FR22`, `NFR8`, `NFR10`, and `NFR11`.
- P1 understanding and CTA remarks are handled through the executive summary, homepage ordering in scope, `FR5`-`FR9`, and `FR26`.
- P2 reveal-sequence and branch-split remarks are handled through homepage ordering in scope, Journey 2-3, and `FR5`, `FR7`, `FR8`, and `FR10`-`FR18`.
- P3 evidence and conversion remarks are handled through the compare-vs-generic-QR and operational-flow scope items, proof/evidence FRs, `FR23`-`FR25`, FAQ starter content, and NDA-safe evidence framing.
- P4 validation and iteration remarks are handled through `SC1`-`SC4`, `SC8`-`SC10`, `SC13`, `NFR8`, `NFR15`, and `NFR16` rather than as separate product-scope deliverables.

### E2. Staged Execution Plan Handling

- Stage 0 and Stage 1 remarks are treated as Phase 1 quality and copy constraints, not separate feature work.
- Stage 2 through Stage 7 remarks are reflected directly in Phase 1 scope, journeys, FRs, trust-floor requirements, and appendices.
- Stage 8 validation remarks are treated as release-validation checks derived from the success criteria and NFRs, not as additional product requirements.

### E3. Explicit De-scope Notes

- The PRD accounts for all master-plan remarks, but not every remark becomes a standalone FR.
- Some remarks are represented as acceptance constraints, messaging obligations, or release-validation checks rather than separate surfaces.
- The recommended homepage v2 blueprint remains a downstream decomposition artifact, not a PRD-core deliverable.
