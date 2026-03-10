---
workflowType: prd
workflow: edit
project_name: gm
user_name: GenuIm
date: 2026-02-23
lastEdited: 2026-03-10
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
  - _bmad-output/project-context.md
  - _bmad-output/design-thinking-2026-02-23.md
  - _bmad-output/problem-solution-2026-02-23.md
  - _bmad-output/planning-artifacts/validation-report-2026-03-09.md
  - docs/genu-im-homepage-master-plan.md
  - AGENTS.md
  - CLAUDE.md
classification:
  projectType: web_app
  domain: general
  complexity: low-medium
  projectContext: brownfield
editHistory:
  - date: 2026-03-10
    changes: Reworked the PRD for full homepage transformation with measurable requirements, restored traceability, implementation-agnostic core sections, and appendix-based technical notes.
---

# Product Requirements Document - gm

**Author:** GenuIm  
**Original Date:** 2026-02-23  
**Last Edited:** 2026-03-10

## Executive Summary

`genu.im` is the public proof-first surface for `genu.mark`: it helps manufacturers and partners understand marking, public proof, and next-step contact without asking them to trust slogans first. Phase 1 must transform the homepage into a compact sequence that explains the category, shows why the product is more than a generic QR landing page, leads into a verification example, separates two business branches, and supports contact conversion.

The trust model is explicit. `genu.im` does not act as certification, expert assessment, or a state service. Official consumer checking for `еАкциз` belongs to `Дія`. `genu.im` explains and demonstrates what `genu.mark` can prove for products inside its own contour: marked-product proof, public transparency facts, and a clear no-data boundary when public proof is unavailable.

Phase 1 is a build-now web delivery slice, not a full product platform. It ships the homepage, a canonical verification example at `/v/genuim`, a paste-first demo input page at `/v/`, one neutral no-data proof state, request capture, trust-floor destinations, and measurement-ready proof-path attribution. Live lookup, private B2B workflows, and richer knowledge-base/analytics capabilities remain staged for later phases.

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

- **SC5:** Every submitted qualified request captures scenario, company type, business context, and source path.
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
- Compact compare-vs-generic-QR explanation and operational flow content
- Canonical verification example
- Paste-first demo input with example-code action
- One neutral no-data proof state
- Persistent demo-mode labeling on non-live proof surfaces
- Qualified request form with scenario and source-path capture
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

### Journey 1 - Equipment or integration partner

- **Trigger:** Partner needs a proof surface that strengthens a marking or implementation sale.
- **Needs:** Clear role separation, operational confidence, proof example, and a shareable next step.
- **Success Outcome:** Partner shares the public proof/demo surface and uses it as a presales asset that leads to a qualified request.

### Journey 2 - Manufacturer preparing for `еАкциз`

- **Trigger:** Operations or compliance stakeholder wants a low-surprise marking path.
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

- Phase 1 default proof path is the canonical example route `/v/genuim` plus the paste-first demo input page `/v/`.
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

- **FR1:** Users can switch the public site between UK and EN.
  - **Scope/Context:** Homepage, proof example, demo input, and trust-floor destinations.
  - **Acceptance/Verification:** The selected language updates visible UI copy on supported Phase 1 surfaces.

- **FR2:** The system can persist the selected language for returning visits on supported browsers.
  - **Scope/Context:** Phase 1 public pages.
  - **Acceptance/Verification:** After reload or navigation, the previously selected language remains active unless storage is unavailable.

- **FR3:** Users can switch the public site between light and dark theme.
  - **Scope/Context:** Homepage, proof example, demo input, and trust-floor destinations.
  - **Acceptance/Verification:** The selected theme updates visible UI state on supported Phase 1 surfaces.

- **FR4:** The system can persist the selected theme for returning visits on supported browsers.
  - **Scope/Context:** Phase 1 public pages.
  - **Acceptance/Verification:** After reload or navigation, the previously selected theme remains active unless storage is unavailable.

### Homepage Narrative and Branches

- **FR5:** Visitors can identify from the homepage that `genu.im` is a proof-first surface for marked products rather than a generic QR landing page.
  - **Scope/Context:** Homepage hero and bridge content.
  - **Acceptance/Verification:** The homepage contains category framing and a bridge section before the proof example entry point.

- **FR6:** Visitors can see explicit role separation between official consumer checking in `Дія` and manufacturer/brand proof in `genu.mark`.
  - **Scope/Context:** Homepage branch messaging, proof example, no-data state, and intercept path.
  - **Acceptance/Verification:** Each relevant public surface includes clear copy that distinguishes the two roles without state mimicry.

- **FR7:** Visitors can open the canonical verification example from the primary homepage CTA.
  - **Scope/Context:** Homepage hero and first proof CTA.
  - **Acceptance/Verification:** The primary proof CTA opens the canonical verification example surface.

- **FR8:** Visitors can identify two distinct homepage paths: `еАкциз` readiness and responsible-manufacturer proof.
  - **Scope/Context:** Homepage branch section.
  - **Acceptance/Verification:** The homepage exposes two differentiated branch entry points with branch-specific next-step CTAs.

- **FR9:** Visitors can reach trust-floor destinations from the public site.
  - **Scope/Context:** Homepage navigation and footer.
  - **Acceptance/Verification:** About, Contact, Proof & Cases, Privacy, Terms, and FAQ are visible and resolvable from the public site.

### Proof Example and Demo Input

- **FR10:** Visitors can open the canonical verification example and view a canonical valid proof example.
  - **Scope/Context:** Primary proof page.
  - **Acceptance/Verification:** The page displays a valid proof state, source-labeled facts, and a next-step CTA.

- **FR11:** Visitors can open the Phase 1 demo input surface and submit a pasted code or use an example-code action to view a demo result.
  - **Scope/Context:** Phase 1 demo input page.
  - **Acceptance/Verification:** The page accepts paste-first input and offers an example-code action without requiring a scanner.

- **FR12:** The system can display a persistent demo-mode notice on every non-live verification surface.
  - **Scope/Context:** Demo input, canonical verification example, and any Phase 1 no-data example.
  - **Acceptance/Verification:** A visible notice above the result or input area states that the flow is a demo/example, not a live production lookup.

- **FR13:** The system can present a valid-state example for a product inside the `genu.mark` public proof contour.
  - **Scope/Context:** Canonical proof example.
  - **Acceptance/Verification:** The result page shows an approved proof state and public facts allowed by policy.

- **FR14:** The system can present a neutral no-data state for products without public proof in `genu.im`.
  - **Scope/Context:** Phase 1 no-data example.
  - **Acceptance/Verification:** The page states that no public proof data is available in `genu.im` and makes no authenticity or legality claims.

- **FR15:** The system can explain what public proof could appear in the no-data state and offer a next-step CTA.
  - **Scope/Context:** Phase 1 no-data example.
  - **Acceptance/Verification:** The page includes a factual list of potential proof blocks and a business CTA.

- **FR16:** The system can hide empty proof sections instead of rendering placeholder content.
  - **Scope/Context:** Valid-state proof example.
  - **Acceptance/Verification:** No empty section appears on a public proof page.

- **FR17:** The system can label each displayed public proof fact by source category.
  - **Scope/Context:** Valid-state proof example and future live proof surfaces.
  - **Acceptance/Verification:** Each displayed fact indicates whether it comes from `genu.mark`, the brand, or a supporting document.

- **FR18:** The system can show supporting evidence links or documents when they exist for a displayed public claim.
  - **Scope/Context:** Valid-state proof example and future live proof surfaces.
  - **Acceptance/Verification:** Evidence is visible and clickable wherever evidence is provided.

- **FR19:** The system can suppress sustainability content when required evidence is missing.
  - **Scope/Context:** Public proof surfaces.
  - **Acceptance/Verification:** No sustainability claim renders without evidence.

- **FR20:** Phase 2+ only: approved public proof extensions can add new content fields within the existing public proof structure without requiring a new page type.
  - **Scope/Context:** Future-phase extensibility beyond the Phase 1 baseline; not part of Phase 1 decomposition.
  - **Acceptance/Verification:** Appendix A defines the allowed extension field types for future phases and requires them to follow the same source labeling, evidence visibility, and no-empty-section rules as the Phase 1 proof surface.

### SEO Intercept and Lead Capture

- **FR21:** Consumer-intent visitors can open a dedicated intercept page that points them to `Дія` for official consumer checking.
  - **Scope/Context:** Consumer-intent search path.
  - **Acceptance/Verification:** The intercept page explicitly names `Дія` as the official consumer-check path and does not mimic a state interface.

- **FR22:** Consumer-intent visitors can also see a separate B2B CTA for marking, proof, or transparency services.
  - **Scope/Context:** Consumer-intent intercept page.
  - **Acceptance/Verification:** The B2B CTA is visibly separate from the `Дія` action and uses non-governmental language.

- **FR23:** Visitors can submit a qualified request with contact data, scenario, and business context.
  - **Scope/Context:** Public request form.
  - **Acceptance/Verification:** Submission requires contact, scenario, company type, and short context before completion.

- **FR24:** The system can attach scenario and source-path metadata to each qualified request.
  - **Scope/Context:** Public request handling.
  - **Acceptance/Verification:** Each submitted request includes scenario and source-path metadata in the receiving record or notification.

- **FR25:** Partners can share a public proof or demo link that opens the same intended public state and CTA destination without requiring login.
  - **Scope/Context:** Canonical proof example and any approved Phase 1 demo state.
  - **Acceptance/Verification:** A shared public link opens successfully in a new browser session, shows the same intended proof or demo state, and preserves the intended CTA destination.

### Knowledge Base and Trust Surface

- **FR26:** Visitors can open trust-floor destinations for About, Contact, Proof & Cases, Privacy, Terms, and FAQ from the public site.
  - **Scope/Context:** Homepage and public proof surfaces.
  - **Acceptance/Verification:** Each destination resolves successfully and contains non-empty starter content or approved placeholder content. In Phase 1, About explains the company-controlled proof role of `genu.im`, and FAQ includes starter procurement or audit-oriented questions.

- **FR27:** Visitors can see reserved navigation and IA for the future knowledge base without requiring full Phase 1 knowledge content.
  - **Scope/Context:** Homepage navigation, footer, and trust-floor references.
  - **Acceptance/Verification:** Public IA shows where the knowledge base will live or links to an approved placeholder destination.

- **FR28:** Phase 2 only: when knowledge content is enabled, visitors can open a knowledge entry and continue to a relevant CTA.
  - **Scope/Context:** Phase 2 knowledge-base rollout; not part of Phase 1 decomposition.
  - **Acceptance/Verification:** Knowledge entries support bilingual readiness and next-step CTA placement.

### Measurement and Enablement

- **FR29:** The product team can distinguish visits that move from the homepage into the proof example path.
  - **Scope/Context:** Phase 1 proof-first funnel review.
  - **Acceptance/Verification:** A dedicated proof-entry path or equivalent source tagging allows homepage-to-proof traffic review.

- **FR30:** The product team can distinguish qualified requests by scenario and entry source.
  - **Scope/Context:** Request review and basic reporting.
  - **Acceptance/Verification:** Request records can be filtered by scenario and source path.

- **FR31:** The product team can review a proof-first funnel consisting of homepage, proof example, and request steps.
  - **Scope/Context:** Phase 1 release review and Phase 2 reporting expansion.
  - **Acceptance/Verification:** Phase 1 provides a reviewable source-tagged funnel; deeper automated reporting may be added later.

### Abuse Control

- **FR32:** Phase 3 only: when live public lookup is enabled, the system can apply bounded abuse controls to reduce repeated enumeration-style requests against the public proof endpoint.
  - **Scope/Context:** Future live public lookup only; not part of Phase 1 decomposition.
  - **Acceptance/Verification:** Before Phase 3 release, the product specification defines the request-limit rule, the neutral blocked-response behavior, and the review procedure for suspected abuse events.

## Non-Functional Requirements

### Performance

- **NFR1:** Key Phase 1 pages shall achieve Performance >= 97 in the agreed mobile and desktop release validation run.
  - **Scope/Context:** Homepage, demo input surface, canonical verification example, no-data example, and trust-floor destinations.
  - **Verification Signal:** Agreed release-validation results are captured for each required page type.

- **NFR2:** Key Phase 1 pages shall meet `LCP < 2.5s`, `CLS < 0.1`, and `INP < 200ms` at the release validation stage.
  - **Scope/Context:** Same key public pages as `NFR1`.
  - **Verification Signal:** Agreed release-validation measurements record the required metrics for each key page type.

- **NFR3:** Deferred client-side code for each key Phase 1 public page shall stay within a `<= 150 KB` compressed delivery budget and shall not be required to render first-screen explanatory content.
  - **Scope/Context:** Homepage, canonical verification example, demo input surface, and no-data example.
  - **Verification Signal:** Release network review confirms each required page stays within the compressed deferred-code budget and first-screen explanatory content remains visible before deferred interactions initialize.

- **NFR4:** Above-the-fold media and layout containers shall reserve space so no key Phase 1 page exceeds `CLS 0.1`.
  - **Scope/Context:** Homepage, proof example, demo input, and trust-floor destinations.
  - **Verification Signal:** Lighthouse CLS check plus slow-load manual review.

### Accessibility and Language Integrity

- **NFR5:** Key Phase 1 flows shall conform to WCAG 2.1 AA.
  - **Scope/Context:** Homepage, canonical proof example, demo input, request form, and trust-floor navigation.
  - **Verification Signal:** Accessibility review checklist plus release validation approval.

- **NFR6:** Key Phase 1 flows shall achieve Accessibility >= 97 in the agreed release validation run.
  - **Scope/Context:** Same key flows as `NFR5`.
  - **Verification Signal:** Agreed release-validation results are captured for each required flow.

- **NFR7:** All key Phase 1 controls shall be keyboard accessible, visibly focusable, and screen-reader labeled, with `0` blocked tasks and `0` unlabeled interactive controls in release review.
  - **Scope/Context:** Navigation, branch selection, CTA buttons, proof-example entry, demo input, request form, and footer links.
  - **Verification Signal:** Manual keyboard walkthrough and screen-reader label review confirm no blocked tasks and no unlabeled interactive controls across the required surfaces.

- **NFR8:** Language, theme, proof-state labels, and no-data messaging shall remain consistent across UK and EN public pages, with `0` mixed-language UI fragments and `0` contradictory proof-state labels in release review.
  - **Scope/Context:** Homepage, proof example, demo input, intercept page, and trust-floor destinations.
  - **Verification Signal:** Cross-language and cross-theme review confirms no mixed-language UI fragments and no contradictory proof-state or no-data labels across the required surfaces.

### SEO and Content Integrity

- **NFR9:** Every indexable Phase 1 page shall include unique title, description, canonical, hreflang, social-preview metadata, and structured search metadata.
  - **Scope/Context:** Homepage, proof example, intercept path, and trust-floor destinations intended for indexing.
  - **Verification Signal:** Markup review passes for each indexed page.

- **NFR10:** Consumer-intent public pages shall direct official checking to `Дія` and shall contain zero claims of official state status for `genu.im`.
  - **Scope/Context:** Intercept path and any proof pages referencing official checking.
  - **Verification Signal:** Copy review confirms compliance before release.

- **NFR11:** Public proof pages shall present `0` unsupported claims in release review; if required evidence or approved proof data is missing, the page shall fall back to the neutral no-data state instead.
  - **Scope/Context:** Canonical proof example, no-data example, and later live proof pages.
  - **Verification Signal:** Copy and state review confirm that every displayed public claim has approved proof support and that unsupported content is absent.

### Privacy and Security

- **NFR12:** Public request capture shall require no more than `5` user-entered fields and shall not require personal data beyond business contact name, business email or phone, company name, scenario, and short context.
  - **Scope/Context:** Phase 1 request form.
  - **Verification Signal:** Form-field review confirms the required-field count stays within the limit and no additional personal fields are mandatory.

- **NFR13:** Public measurement and reporting shall exclude full raw codes and personal data from public analytics outputs.
  - **Scope/Context:** Phase 1 source tagging and later analytics expansion.
  - **Verification Signal:** Measurement-field review confirms public analytics outputs exclude raw codes and PII.

- **NFR14:** Public pages shall be served over HTTPS and, in deployed review, shall expose at minimum `Content-Security-Policy`, `X-Content-Type-Options`, and `Referrer-Policy` headers appropriate for a static public site.
  - **Scope/Context:** All public Phase 1 pages.
  - **Verification Signal:** Deployed response review confirms HTTPS and the required security headers on each key public page type.

### Compatibility and Responsive Quality

- **NFR15:** Phase 1 public flows shall work on current stable Chrome, Edge, and Firefox, and unsupported browsers shall fail gracefully without blocking core comprehension or contact.
  - **Scope/Context:** Homepage, proof example, demo input, request form, and trust-floor destinations.
  - **Verification Signal:** Manual browser smoke run passes on supported browsers and confirms graceful degradation elsewhere.

- **NFR16:** Phase 1 public flows shall remain usable at 360px, 768px, and 1280px widths without horizontal scrolling on key content or hidden primary CTAs.
  - **Scope/Context:** Homepage, proof example, demo input, request form, and trust-floor destinations.
  - **Verification Signal:** Responsive smoke review passes at each required width.

## Appendix A - Implementation Notes

This appendix preserves technical detail without turning the PRD core into a solution-design document.

### A1. Phase 1 Default Path Decisions

- Recommended Phase 1 proof surfaces:
  - homepage
  - canonical proof example at `/v/genuim`
  - paste-first demo input at `/v/`
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

- Current public delivery is a static site.
- Exact stack, hosting vendor, protocol choice, route implementation details, and interface design belong in architecture and implementation notes, not the PRD core.

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
| FR20 | Phase 2 future criteria | Phase 2 public-proof extension journey TBD |
| FR21 | SC2, SC13 | J5 |
| FR22 | SC4 | J5 |
| FR23 | SC5 | J1, J2, J3, J4, J5 |
| FR24 | SC5, SC6 | J1, J2, J3, J4, J5 |
| FR25 | SC6 | J1 |
| FR26 | SC11 | J1, J2, J3, J4, J5 |
| FR27 | SC12 | J1, J2, J3, J5 |
| FR28 | Phase 2 future criteria | Phase 2 knowledge-consumption journey TBD |
| FR29 | SC6, SC14 | J1, J2, J3 |
| FR30 | SC5, SC6 | J1, J2, J3, J4, J5 |
| FR31 | SC6, SC14 | J1, J2, J3 |
| FR32 | Phase 3 future criteria | Phase 3 live-lookup journey TBD |

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
