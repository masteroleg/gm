# Story 2.4: Show Only Supported Proof Content

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want proof pages to show only information that is supported,
so that I can trust what the page displays.

## Acceptance Criteria

1. Given a proof page has supported proof details to show
   When the page loads
   Then only supported sections are displayed
   And each visible claim can be tied to its source. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.4; `_bmad-output/planning-artifacts/prd.md` - FR16, FR17]

2. Given a visible proof claim has a supporting link or document
   When that claim is shown
   Then the evidence link is also shown
   And it is clearly associated with the claim it supports. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.4; `_bmad-output/planning-artifacts/prd.md` - FR18]

3. Given a proof section has no approved data or required support
   When the page loads
   Then that section is hidden
   And unsupported sustainability or similar claims are not shown. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.4; `_bmad-output/planning-artifacts/prd.md` - FR16, FR19, NFR11]

4. Given a visitor opens the proof page on mobile or desktop
   When the visible proof sections are displayed
   Then the content and evidence links are readable and usable
   And the layout works at `360px` width without broken structure or hidden content. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.4; `_bmad-output/planning-artifacts/prd.md` - NFR16]

## Tasks / Subtasks

- [x] Tighten supported-content rendering rules across the proof surface only where approved proof data exists. (AC: 1, 3, 4)
  - [x] Reuse the existing proof-surface markup and `verification-page.js` controller instead of creating a parallel content-rendering path.
  - [x] Ensure only approved proof sections render and unsupported sections remain fully hidden.
  - [x] Keep the proof surface static and CSS-led; do not introduce live lookup, APIs, or dynamic content fetching.

- [x] Make visible claims traceable to source and evidence only when support exists. (AC: 1, 2)
  - [x] Keep every displayed proof fact explicitly labeled by source category.
  - [x] Show supporting evidence links or documents only when an approved public evidence reference exists for the displayed claim.
  - [x] Keep evidence visibly associated with the claim it supports.

- [x] Suppress unsupported sustainability or similar trust claims without falling into broader no-data or routing behavior. (AC: 3)
  - [x] Hide unsupported sustainability content when required evidence is missing.
  - [x] Do not turn this story into no-data messaging, official-check routing, request capture, or analytics behavior.
  - [x] Preserve existing demo/example labeling and product-positioning boundaries already established on non-live proof surfaces.

- [x] Keep translations, accessibility labels, and fallback HTML aligned for supported-content states. (AC: 1, 2, 4)
  - [x] Add or update `data-i18n` keys in `site/assets/js/lang-toggle.js` only where supported-content labels or evidence wording need it.
  - [x] Keep EN and UK meaning aligned while preserving idiomatic Ukrainian.
  - [x] Keep visible claim wording, source labels, and aria descriptions semantically consistent.

- [x] Add layered regression coverage for supported/unsupported proof-content behavior. (AC: 1, 2, 3, 4)
  - [x] Add Jest coverage for supported-section visibility, unsupported-section suppression, and evidence-link visibility rules.
  - [x] Add Playwright coverage for source-labeled claims, evidence-link association, hidden unsupported sections, and `360px` usability.
  - [x] Reuse existing proof-surface tests and page objects instead of creating a separate testing track.

## Dev Notes

- Story `2.4` is the supported/unsupported proof-content slice of Epic `2`. It is tightly coupled to the proof layer but remains semantically narrower than Story `2.2`: it governs what proof content may appear, not the no-data explanation flow itself. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.4; `docs/project-contract.md` - Delivery Discipline]
- Story `2.1` already delivered the canonical valid-state proof example and Story `2.2` defines the neutral no-data semantics. Story `2.4` must refine supported-content rules inside the same proof surface without pulling in demo-input mechanics or request/analytics behavior. [Source: `_bmad-output/implementation-artifacts/2-1-show-the-main-verification-example.md`; `_bmad-output/implementation-artifacts/2-2-show-a-clear-no-data-result.md`]
- Approved Phase `1` route scope remains limited to `/v/genuim/` and approved result states within `/v/`. Do not create named sample pages, arbitrary public proof routes, or future proof-model expansion. [Source: `_bmad-output/planning-artifacts/architecture.md` - URL routing; `_bmad-output/planning-artifacts/prd.md` - Lookup and Path Defaults]
- Proof-content integrity is contract-critical: every visible claim must map to approved source/evidence support; unsupported sections must be absent, not weakened by disclaimers or placeholders. [Source: `_bmad-output/planning-artifacts/prd.md` - FR16, FR17, FR18, FR19, NFR11]
- Product positioning remains unchanged: `genu.mark` is the proof layer, `Diia` is the official state-check destination, and no content rule here may imply live lookup, official status, or backend-backed truth. [Source: `docs/project-contract.md` - Product Positioning Rule; Misleading Claims Rule]
- Reuse the minimal DOM-first proof controller and CSS-over-JS bias already established in Story `2.1`. Shared proof-surface refinements are allowed only when explicitly classified as approved shared-touch changes, not as silent scope expansion. [Source: `_bmad-output/implementation-artifacts/2-1-show-the-main-verification-example.md`; `_bmad-output/project-context.md` - Frontend Architecture Rules]

### Contract-First Implementation Brief

- Story scope: enforce supported/unsupported proof-content rules on approved public proof surfaces so that only supported sections, source-labeled claims, and approved evidence links render, while unsupported sections stay hidden and `360px` usability remains intact. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.4; `_bmad-output/planning-artifacts/prd.md` - FR16, FR17, FR18, FR19]
- Explicitly out of scope: Story `2.2` no-data explanatory semantics beyond the fallback boundary already defined, Story `2.3` demo-input interaction mechanics and example-code action behavior, Epic `3` routing/request submission/metadata capture, Epic `4` analytics/reporting, any new proof fields or routes, and any live lookup behavior. [Source: `_bmad-output/planning-artifacts/epics.md` - Stories 2.2-2.3, Epic 3, Epic 4; `_bmad-output/planning-artifacts/prd.md` - Phase 1 Out of Scope]
- Files or areas expected to change: `site/v/genuim/index.html`, `site/v/index.html` if supported-content rules must also constrain approved result states there, `site/assets/js/verification-page.js`, `site/assets/js/lang-toggle.js`, `site/assets/css/input.css`, `site/assets/css/output.css`, `tests/verification-page.test.js`, `tests/e2e/verification.spec.ts`, and `tests/e2e/pages/verification.page.ts`. [Source: `_bmad-output/planning-artifacts/architecture.md` - Requirements to Structure Mapping; `_bmad-output/project-context.md` - Project Structure Rules]
- Protected files or areas not to change: homepage narrative/branch stories, unrelated trust-floor destinations, request-form mechanics, official-check routing logic, analytics/reporting layers, and future sample-route concepts. [Source: `docs/project-contract.md` - Architecture Rule; `_bmad-output/implementation-artifacts/2-1-show-the-main-verification-example.md`]
- User-visible behavior that will change: proof surfaces will show only approved, source-traceable content with evidence where available, and unsupported sections will disappear rather than appearing incomplete or overstated. [Source: `_bmad-output/planning-artifacts/prd.md` - FR16, FR18, FR19]
- Behavior that must remain unchanged: static-site architecture, non-live demo labeling, no-data semantics as a separate story concern, product-positioning boundaries, and zero implication of official verification, live lookup, or backend/state-backed behavior. [Source: `docs/project-contract.md`; `_bmad-output/project-context.md`; `_bmad-output/implementation-artifacts/2-2-show-a-clear-no-data-result.md`]
- Tests to add or update: Jest tests for supported/unsupported section visibility and evidence-link gating; Playwright tests for source-labeled claims, evidence association, hidden unsupported sections, and responsive integrity. [Source: `_bmad-output/project-context.md` - Coverage Width Requirements; `docs/project-contract.md` - Test Coverage Rule]
- Validation commands to run: `npm run build:css` if CSS changes, `npm run lint`, `npm run typecheck`, `npx jest tests/verification-page.test.js --runInBand`, `npx playwright test tests/e2e/verification.spec.ts --config=playwright.config.ts`, and Lighthouse if proof-surface layout/performance changes materially. [Source: `_bmad-output/project-context.md` - Verification Flow; Lighthouse Validation]

### Project Structure Notes

- Keep supported-content rules within the existing proof-surface files under `site/`; do not add a new rendering layer or split proof logic into multiple controllers. [Source: `_bmad-output/project-context.md` - Static-Site Boundaries; `_bmad-output/planning-artifacts/architecture.md` - Controller Boundaries]
- Use CSS and semantic markup for presentation and hidden-state behavior where possible; keep JS limited to fail-soft DOM synchronization and evidence/support gating where CSS alone cannot validate content presence. [Source: `_bmad-output/planning-artifacts/architecture.md` - CSS-first rule; `_bmad-output/project-context.md` - Frontend Architecture Rules]
- Keep visible text, source labels, evidence wording, and accessibility labels aligned in both EN and UK. Avoid calques and avoid vague “proof available” wording that loses source/evidence meaning. [Source: `docs/project-contract.md` - Accessibility Rules; Translation Rule; Ukrainian Copy Rule]
- Existing repository convention for Playwright proof tests is `.ts` plus page objects in `tests/e2e/pages/`; follow that active pattern. [Source: `_bmad-output/project-context.md`; `_bmad-output/implementation-artifacts/2-1-show-the-main-verification-example.md`]

### Project Contract Guardrails

- Preserve the current static-site architecture unless the story explicitly changes it
- Preserve product positioning: brand publishes proof via genu.mark; official state verification happens in Diia
- Avoid misleading claims not supported by the story
- Preserve semantic HTML, accessibility alignment, responsive integrity, CTA clarity, and translation quality

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 2, Story 2.4 acceptance criteria and sequencing boundaries.
- `_bmad-output/planning-artifacts/prd.md` - FR16, FR17, FR18, FR19, FR12, NFR8, NFR10, NFR11, NFR16, Public Proof Rules, Trust and Compliance Boundaries, Lookup and Path Defaults.
- `_bmad-output/planning-artifacts/architecture.md` - proof-route model, `verification-page.js` role, CSS-first/static-site constraints, requirements-to-structure mapping.
- `_bmad-output/planning-artifacts/ux-design-specification.md` - VerificationPage and NoDataState component expectations, honest-proof UX, calm trust boundaries.
- `_bmad-output/project-context.md` - DOM-first controller rules, CSS-first bias, test layering, committed CSS artifact rules.
- `docs/project-contract.md` - delivery discipline, architecture rule, accessibility/copy/translation rules, product-positioning rule, misleading claims rule, test coverage rule.
- `_bmad-output/implementation-artifacts/2-1-show-the-main-verification-example.md` - implemented proof-layer baseline and approved shared-proof contract.
- `_bmad-output/implementation-artifacts/2-2-show-a-clear-no-data-result.md` - no-data semantics boundary to avoid scope bleed.

## Dev Agent Record

### Agent Model Used

openai/gpt-5.4

### Debug Log References

- Re-read Epic `2` story definitions and FR coverage to isolate Story `2.4` from Stories `2.2` and `2.3`.
- Reused Story `2.1` implemented proof-layer contract and Story `2.2` no-data boundaries to frame Story `2.4` as supported-content governance rather than route or flow expansion.
- Reconfirmed the architecture's approved proof routes and CSS-first static-site constraints before finalizing story notes.
- Implemented supported-content rules on the canonical proof page by adding visible evidence tied to a source-labeled claim and by suppressing unsupported sustainability-style content.
- Kept `verification-page.js` limited to DOM-first support/evidence gating only; no lookup, no loading, no fetching, and no official-state determination behavior was introduced.
- Reused shared proof-layer CSS, translations, and tests as approved shared-touch changes and avoided opportunistic refactors outside the proof surface.
- Validation completed with `npm run build:css`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e -- tests/e2e/verification.spec.ts`, and Lighthouse on `/v/genuim/`.

### Completion Notes List

- Story `2.4` is prepared as the proof-content integrity slice of the proof-layer package.
- The story explicitly stays out of no-data semantics except where unsupported content must fall back to absence or the already-defined no-data boundary.
- The story explicitly excludes demo-input mechanics, request routing, and analytics so grouped proof-layer work does not silently absorb adjacent epics.
- Shared proof-surface changes are intended to be implemented as approved shared-touch updates, not as untracked scope leakage.
- The canonical proof page now shows explicit evidence only where approved public support exists and keeps that support visibly tied to the relevant proof claim.
- Unsupported sustainability-style content stays hidden instead of appearing as a weak placeholder or disclaimer.
- Shared-touch work stayed inside the proof layer: `/v/genuim/`, `verification-page.js`, shared translations, shared CSS, and shared proof-layer tests.
- No Story `2.3`, Epic `3`, or Epic `4` behavior was introduced during grouped implementation.

### File List

- `_bmad-output/implementation-artifacts/2-4-show-only-supported-proof-content.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `site/v/genuim/index.html`
- `site/assets/js/lang-toggle.js`
- `site/assets/js/verification-page.js`
- `site/assets/css/input.css`
- `site/assets/css/output.css`
- `tests/verification-page.test.js`
- `tests/e2e/verification.spec.ts`
- `tests/e2e/pages/verification.page.ts`

## Senior Developer Review (AI)

**Reviewer:** GenuIm (claude-sonnet-4-6) · 2026-03-13

**Verdict: PASS with shared-layer fixes applied**

**Shared-layer fixes (see Story 2.2 review for details):**
- CSS cache version `?v=17→?v=18` on `/v/genuim/index.html` — ensures updated CSS is served.
- `verification-page.js` controller additions (`hasRequiredEvidence`, `syncSupportedProofBlocks`, `hasHiddenAncestorWithinSection`): all verified correct — clean DOM-first logic, no side effects.
- Evidence links (`data-proof-evidence`): correctly hidden when href is empty or content is whitespace — logic confirmed against controller code.
- Unsupported proof block in `/v/genuim/index.html` (line 142, `hidden`): verified intentional — serves as static demonstration of suppression for Phase 1. The empty `href=""` is the deliberate suppression signal for `hasApprovedEvidence`. Acceptable by design.

**Scope isolation:** PASS. Supported-content rules stay strictly within `/v/genuim/`. No Story 2.3, no Epic 3/4 behavior.
**Evidence traceability:** PASS. Visible fact claims carry `proof-source-pill` labels; evidence links explicitly associated via `data-proof-evidence`.
**Unsupported suppression:** PASS. Hidden section with `data-proof-requires-evidence` + empty href demonstrates suppression mechanism correctly.
**Architecture discipline:** PASS. CSS-first, minimal JS, controller reused rather than duplicated.
**Translation consistency:** PASS. EN and UK semantically aligned across source labels, evidence wording, and aria descriptions.

## Change Log

- 2026-03-13: Created Story `2.4` as the implementation-ready supported-proof-content slice of Epic `2`, with explicit supported/unsupported rendering rules, evidence-link constraints, shared-touch guidance, and out-of-scope protection against `2.2`, `2.3`, Epic `3`, and Epic `4` scope leakage.
- 2026-03-13: Implemented grouped proof-layer slice for Story `2.4`: added source-tied evidence on `/v/genuim/`, suppressed unsupported proof content, updated shared proof-layer translations/controller/tests, and completed grouped proof-layer validation.
- 2026-03-13: Code review completed — no Story 2.4-specific code fixes required. Shared-layer fixes applied via Story 2.2 review pass. Status → done.
