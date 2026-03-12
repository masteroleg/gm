# Story 2.1: Show the Main Verification Example

Status: done
Release: 2.1
Tag: 2.1

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to open the main verification example and see a clear verified result,
so that I can understand what information this page provides.

## Acceptance Criteria

1. Given a visitor opens `/v/genuim`
   When the page loads
   Then it shows a clear verified result
   And it is clear that this page is an example of the public verification view. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.1; `_bmad-output/planning-artifacts/prd.md` - FR10, FR13]

2. Given a visitor reads the result on the page
   When the proof details are shown
   Then the visible facts are labeled by source
   And the information is presented clearly. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.1; `_bmad-output/planning-artifacts/prd.md` - FR17]

3. Given a visitor opens this page in Phase 1
   When the page is displayed
   Then the required demo or sample label is visible from initial render
   And the page does not present the result as a live check. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.1; `_bmad-output/planning-artifacts/prd.md` - FR12; `docs/project-contract.md` - Misleading Claims Rule]

4. Given a visitor opens the page on mobile or desktop
   When the page is displayed
   Then the result content and links are readable and usable
   And the layout works at `360px` width without broken structure or hidden core content. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.1; `_bmad-output/planning-artifacts/prd.md` - NFR16; `_bmad-output/project-context.md` - Accessibility Requirements]

5. Given an optional supporting section has no approved content to display
   When the main verification example loads
   Then the core verified example, source-labeled facts, and next-step CTA still render correctly
   And empty or unsupported sections are not shown. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.1; `_bmad-output/planning-artifacts/prd.md` - FR16, FR18, FR19, NFR11]

## Tasks / Subtasks

- [x] Create the canonical Phase 1 proof page at `site/v/genuim/index.html` as the primary static proof artifact. (AC: 1, 3, 4)
  - [x] Add a semantic page structure with a clear verified-result presentation, one intended next-step CTA, and a visible explanation that this is an example/demo public proof view.
  - [x] Keep the page fully static in Phase 1: no live lookup, no API fetch, no backend state, no framework routing, and no dynamic rendering contract.
  - [x] Include indexable SEO/head metadata for `/v/genuim` using the required head order, canonical, `hreflang`, OG metadata, and JSON-LD in `<head>`.

- [x] Implement the shared Epic 2 proof contract package inside Story `2.1` page content and controller behavior. (AC: 1, 2, 3, 5)
  - [x] Show only approved proof content for the canonical example and label every visible fact by source category.
  - [x] Show supporting evidence links or documents only where approved NDA-safe public evidence exists for a displayed claim.
  - [x] Keep unsupported or empty proof sections hidden instead of rendering placeholders.
  - [x] Add the non-negotiable proof boundary in visible copy and testable labels: Phase 1 proof pages are static non-official product-proof examples and must never imply live, state-backed, or authoritative verification.

- [x] Add the proof-page controller and translation support only as needed for Story `2.1`. (AC: 2, 3, 5)
  - [x] Create or extend `site/assets/js/verification-page.js` as a DOM-first controller with fail-soft guards for optional nodes.
  - [x] If runtime copy or labels are language-switched, wire all user-visible and accessibility text through `site/assets/js/lang-toggle.js` using `data-i18n` and aligned fallback HTML.
  - [x] Do not introduce request-submit behavior, no-data result logic, demo input flow, or analytics instrumentation in this story.

- [x] Preserve product-positioning and trust-boundary copy across the canonical proof page. (AC: 1, 3)
  - [x] Keep `genu.mark` positioned as the manufacturer/brand proof layer and keep `Diia` as the official state-check destination when mentioned.
  - [x] Remove or avoid any wording that suggests certification, authenticity judgment, legal confirmation, live status, or official verification by `genu.im`.
  - [x] Keep tone calm, factual, and confidence-building rather than promotional or governmental.

- [x] Add layered regression coverage for the canonical proof example. (AC: 1, 2, 3, 4, 5)
  - [x] Add Jest coverage for proof-page controller fail-soft behavior, source-label synchronization, and hidden-when-unsupported sections.
  - [x] Add positive and negative checks for evidence-link rendering: visible when approved, absent when support is missing.
  - [x] Add Playwright coverage for `/v/genuim` page load, initial demo/sample label visibility, verified-result rendering, source labels, CTA visibility, and `360px` usability.
  - [x] Add at least one `@smoke` browser assertion for the proof-entry path because `/v/genuim` is a critical Phase 1 route.

## Dev Notes

- Story `2.1` is the first implementation-ready slice of Epic `2` and must stay strictly limited to the canonical proof example at `/v/genuim`. Do not use this story to generate Story `2.2`, `2.3`, or `2.4` behavior in advance. [Source: `_bmad-output/planning-artifacts/epics.md` - Epic 2 sequencing; `_bmad-output/implementation-artifacts/epic-1-dev-handoff.md`]
- Epic `1` established the entry path into `/v/genuim` from homepage hero and preview. Story `2.1` closes that existing gap by delivering the proof artifact itself, not by revisiting homepage narrative, branch cards, request flow, or analytics. [Source: `_bmad-output/implementation-artifacts/1-1-clarify-the-homepage-first-screen.md`; `_bmad-output/implementation-artifacts/1-2-show-the-two-main-visitor-needs.md`; `_bmad-output/planning-artifacts/ux-design-specification.md` - 2.2 User Mental Model]
- Current source-of-truth planning says `/v/genuim` is the primary proof artifact and `site/v/genuim/index.html` is the canonical static route. The current checked-in codebase does not yet contain `site/v/`, so absence of the route is a delivery gap to close, not a reason to weaken story scope. [Source: `_bmad-output/planning-artifacts/architecture.md` - FR10-FR19, FR25; `_bmad-output/planning-artifacts/ux-design-specification.md` - 2.2 User Mental Model]
- The proof surface must remain static and DOM-first in Phase `1`: static HTML route, direct DOM controller, CSS in `site/assets/css/input.css`, and committed `site/assets/css/output.css`. Do not introduce framework routing, API fetches, or backend state. [Source: `_bmad-output/planning-artifacts/architecture.md` - FR10-FR19, FR25; `_bmad-output/project-context.md` - Architecture Context; `_bmad-output/implementation-artifacts/epic-1-dev-handoff.md`]
- Mandatory product boundary: `genu.mark` publishes product proof; official state verification happens in `Diia`; `genu.im` must never imply official verification, real-time lookup, or state-backed authority. [Source: `docs/project-contract.md` - Product Positioning Rule; `docs/project-contract.md` - Misleading Claims Rule; `_bmad-output/planning-artifacts/prd.md` - NFR10]
- Evidence handling must be honest and NDA-safe: show supporting evidence references only when approved public evidence exists and never fabricate a document trail for visual completeness. [Source: `_bmad-output/planning-artifacts/prd.md` - FR18; NFR11]
- Testing must be layered: Jest for controller logic and hidden/unsupported sections, Playwright for page load, initial render honesty, mobile usability, and critical proof-entry behavior. Add smoke coverage for the proof path when practical. [Source: `_bmad-output/project-context.md` - Test Boundaries; `docs/project-contract.md` - Test Coverage Rule]

### Contract-First Implementation Brief

- Story scope: implement only the canonical valid-state proof example at `/v/genuim` with a visible demo/example notice from first render, source-labeled proof facts, one intended next-step CTA, hidden empty/unsupported sections, and `360px`-safe usability. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.1; `_bmad-output/planning-artifacts/prd.md` - FR10, FR12, FR13, FR16, FR17]
- Explicitly out of scope: Story `2.2` no-data result copy/flow, Story `2.3` demo input surface `/v/`, Story `2.4` broader proof-content expansion rules beyond what this canonical example needs, all Epic `3` request/intercept behavior, and all Epic `4` measurement/review behavior. [Source: `_bmad-output/planning-artifacts/epics.md` - Stories 2.2-2.4, Epic 3, Epic 4; `_bmad-output/implementation-artifacts/epic-1-dev-handoff.md`]
- Files or areas expected to change: `site/v/genuim/index.html`, `site/assets/js/verification-page.js`, `site/assets/js/lang-toggle.js`, `site/assets/css/input.css`, `site/assets/css/output.css`, `tests/verification-page.test.js`, `tests/e2e/verification.spec.js`, and a page object under `tests/e2e/pages/` if needed. [Source: `_bmad-output/planning-artifacts/architecture.md` - FR10-FR19, FR25; `_bmad-output/project-context.md` - Project Structure Rules]
- Protected files or areas not to change: homepage story contracts from Epic `1`, request-form semantics, no-data flow, analytics/reporting surfaces, and unrelated trust-floor/knowledge behavior unless a minimal link consistency update is strictly required. [Source: `_bmad-output/implementation-artifacts/1-1-clarify-the-homepage-first-screen.md`; `_bmad-output/implementation-artifacts/1-5-show-the-knowledge-section-in-site-navigation.md`; `_bmad-output/implementation-artifacts/epic-1-dev-handoff.md`]
- User-visible behavior that will change: visitors can open a real canonical proof example at `/v/genuim` instead of a missing route and see a trustworthy example result with labeled facts and a clear next action. [Source: `_bmad-output/planning-artifacts/ux-design-specification.md` - 2.2 User Mental Model; `_bmad-output/planning-artifacts/prd.md` - FR10]
- Behavior that must remain unchanged: static-site architecture, language/theme preference contracts, product-positioning boundary between `genu.mark` and `Diia`, no live-check implication, and no unsupported claim display. [Source: `_bmad-output/project-context.md`; `docs/project-contract.md`; `_bmad-output/planning-artifacts/prd.md` - NFR10, NFR11]
- Tests to add or update: controller unit tests for fail-soft init and section suppression; browser tests for `/v/genuim` render, demo banner visibility, source labels, CTA, responsive integrity, and negative-claim assertions; translation/alignment checks if runtime language support is added. [Source: `_bmad-output/planning-artifacts/architecture.md` - tests; `_bmad-output/project-context.md` - Coverage Width Requirements]
- Validation commands to run: `npm run build:css` when CSS changes, `npm run lint`, `npm run typecheck`, targeted Jest for proof controller, targeted Playwright for proof page, and broader validation/lighthouse if the implementation materially changes user-facing layout or performance. [Source: `_bmad-output/project-context.md` - Verification Flow; `_bmad-output/project-context.md` - Lighthouse Validation]

### Operational Dev-Ready Checklist

#### Target Files

- Primary delivery files:
  - `site/v/genuim/index.html`
  - `site/assets/js/verification-page.js`
  - `site/assets/css/input.css`
  - `site/assets/css/output.css`
- Translation and shared-control touchpoints if the proof page ships with runtime language/theme controls:
  - `site/assets/js/lang-toggle.js`
  - `site/assets/js/theme-toggle.js`
  - `site/assets/js/menu.js`
- Required test surfaces:
  - `tests/verification-page.test.js`
  - `tests/e2e/pages/genuim.page.ts` or a new proof-page object following the existing page-object pattern
  - focused proof browser coverage in `tests/e2e/` using the repository's current `.ts` Playwright convention
- Optional consistency touchpoints only if strictly needed:
  - `site/index.html` for existing CTA/link consistency
  - `site/sitemap.xml` if the new indexable route must be included there under current site conventions

#### Implementation Task Sequence

- Build the static route first: create `site/v/genuim/index.html` with semantic proof-page markup, persistent demo/example notice, one intended CTA, and required metadata.
- Add the proof controller second: create `site/assets/js/verification-page.js` only for DOM-first behavior needed by Story `2.1`, including fail-soft guards and optional-section suppression.
- Add styling third: extend `site/assets/css/input.css` for proof-page layout and rebuild `site/assets/css/output.css`.
- Wire translations fourth only if the page participates in runtime language switching; keep fallback HTML, translation keys, and aria labels aligned.
- Add tests last in the same slice: unit coverage for controller logic and browser coverage for critical proof behavior.

#### Required Tests

- Unit tests must cover:
  - fail-soft controller initialization when optional DOM nodes are missing
  - source-label rendering and synchronization
  - hidden empty/unsupported sections
  - evidence-link visibility only when approved support exists
- Browser tests must cover:
  - `/v/genuim` resolves successfully
  - demo/example notice is visible from initial render
  - visible proof facts are labeled by source
  - primary CTA is visible and matches the intended proof-view continuation
  - no misleading live/official wording appears
  - page remains usable at `360px`
- Smoke requirement:
  - at least one proof-entry assertion must run in smoke coverage because `/v/genuim` is a critical Phase `1` path

#### Validation Command Set

- Minimum required commands after implementation:
  - `npm run build:css`
  - `npm run lint`
  - `npm run typecheck`
  - `npx jest tests/verification-page.test.js --runInBand`
  - `npx playwright test <proof-specs> --config=playwright.config.ts`
- If the implementation updates shared homepage-to-proof behavior or shared public-page metadata contracts, also run:
  - `npx playwright test tests/e2e/home.spec.ts --config=playwright.config.ts`
  - relevant existing `genuim` specs already covering shared controls or mobile behavior
- If layout or above-the-fold rendering changes materially, run a Lighthouse check on the proof page before closing the story. [Source: `_bmad-output/project-context.md` - Lighthouse Validation]

#### Explicit Out-of-Scope Boundaries

- Do not create or draft Story `2.2`, `2.3`, or `2.4` artifacts in this pass.
- Do not implement `/v/` demo input, pasted code handling, example-code actions, or routing from arbitrary input.
- Do not implement no-data page copy, no-data CTA behavior, or no-data/Diia split behavior beyond preserving the boundary that unsupported content stays hidden.
- Do not add request-form submission, `mailto:` handoff, scenario/source metadata capture, official-check intercept behavior, analytics instrumentation, or proof-funnel review logic.
- Do not add live lookup, backend APIs, stored proof state, authentication, or framework-era abstractions.

### Epic 2 Shared Proof Contract Package

#### Proof-Content Contract

- Phase `1` proof pages are static public examples inside the `genu.mark` proof contour and are not live production verification surfaces. [Source: `_bmad-output/planning-artifacts/architecture.md` - FR10-FR19, FR25; `_bmad-output/planning-artifacts/prd.md` - FR12, FR13]
- Story `2.1` may show only the approved canonical valid-state example and only approved public proof facts. [Source: `_bmad-output/planning-artifacts/prd.md` - FR10, FR13]
- Every displayed proof fact must disclose source category: `genu.mark`, brand, or supporting document. [Source: `_bmad-output/planning-artifacts/prd.md` - FR17]
- Supporting evidence links or documents may appear only where approved public evidence exists in NDA-safe public form. [Source: `_bmad-output/planning-artifacts/prd.md` - FR18]
- Empty or unsupported sections must be hidden rather than rendered as shells, placeholders, or speculative proof blocks. [Source: `_bmad-output/planning-artifacts/prd.md` - FR16, FR19, NFR11]

#### Forbidden Claims List

- Do not imply live lookup, real-time verification, official verification, state approval, authenticity judgment, legality confirmation, backend submission, stored request confirmation, or any authoritative state-backed result. [Source: `docs/project-contract.md` - Misleading Claims Rule; `_bmad-output/planning-artifacts/prd.md` - NFR10]
- Do not present `genu.im` as replacing `Diia` or as a consumer official-check path. [Source: `docs/project-contract.md` - Product Positioning Rule; `_bmad-output/planning-artifacts/prd.md` - NFR10]
- Do not render sustainability or similar trust claims without the required approved evidence. [Source: `_bmad-output/planning-artifacts/prd.md` - FR19; `_bmad-output/planning-artifacts/prd.md` - NFR11]
- Do not fabricate documents, evidence references, partner naming, or proof facts that are not explicitly approved for public display. [Source: `_bmad-output/planning-artifacts/prd.md` - Shared Functional Definitions; FR18; NFR11]

#### No-Data Semantics Boundary

- Story `2.1` does not implement Story `2.2`, but it must preserve the no-data boundary now: if required approved proof data or evidence is missing, the implementation must suppress unsupported content rather than inventing or overstating proof. [Source: `_bmad-output/planning-artifacts/epics.md` - Stories 2.1, 2.2; `_bmad-output/planning-artifacts/prd.md` - NFR11]
- The future neutral no-data state remains a separate story and must not be partially improvised inside Story `2.1`. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.2]
- Non-negotiable rule: Phase `1` proof pages are static non-official product-proof examples and must never imply live, state-backed, or authoritative verification. [Source: `_bmad-output/planning-artifacts/prd.md` - FR12; `docs/project-contract.md` - Misleading Claims Rule]

#### Negative Checks

- Assert the page does not contain wording equivalent to `live lookup`, `real-time verification`, `official verification`, or similar misleading variants in English or Ukrainian unless explicitly framed as unavailable. [Source: `docs/project-contract.md` - Misleading Claims Rule]
- Assert no empty proof sections render. [Source: `_bmad-output/planning-artifacts/prd.md` - FR16]
- Assert no visible proof fact appears without a source label. [Source: `_bmad-output/planning-artifacts/prd.md` - FR17]
- Assert no unsupported sustainability claim renders without evidence. [Source: `_bmad-output/planning-artifacts/prd.md` - FR19; NFR11]
- Assert no request-submit semantics, no demo-input behavior, no no-data page messaging, and no analytics/review UI leak into Story `2.1`. [Source: `_bmad-output/planning-artifacts/epics.md` - Stories 2.2-2.4, Epic 3, Epic 4]

#### Review / Self-Check Gates

- Copy gate: review against `genu.mark` / `Diia` positioning, calm factual tone, CTA clarity, and zero misleading claims. [Source: `docs/project-contract.md` - Product Positioning Rule; CTA Rule; Code Review Rules]
- Content gate: every displayed public claim maps to approved proof support or evidence, otherwise it is absent. [Source: `_bmad-output/planning-artifacts/prd.md` - NFR11]
- UX gate: demo/example label visible from initial render, key value understandable in about `10` seconds, and page remains usable at `360px`. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.1; `_bmad-output/planning-artifacts/ux-design-specification.md` - 2.1 Proof-first Value Proposition]
- SEO/head gate: unique title and description, canonical, `hreflang`, social-preview metadata, and JSON-LD kept in `<head>` using required order. [Source: `_bmad-output/planning-artifacts/prd.md` - NFR9; `_bmad-output/planning-artifacts/architecture.md` - SEO head order]
- Architecture gate: static route under `site/`, DOM-first controller, no backend/API/state introduction, and committed `output.css` if CSS changes. [Source: `_bmad-output/project-context.md` - Project Structure Rules; `_bmad-output/implementation-artifacts/epic-1-dev-handoff.md`]

### Project Structure Notes

- Align implementation to the existing static-site structure: route HTML under `site/v/genuim/`, controller in `site/assets/js/`, styles in `site/assets/css/`, unit tests in `tests/`, browser specs in `tests/e2e/`, and optional page object in `tests/e2e/pages/`. [Source: `_bmad-output/planning-artifacts/architecture.md` - File Organization Patterns; `_bmad-output/project-context.md` - Project Structure Rules]
- Use the existing flat-controller pattern rather than nested JS modules or framework components. [Source: `_bmad-output/planning-artifacts/architecture.md` - Source Organization]
- If language switching is supported on the proof page, keep fallback HTML, translation keys, and accessibility labels aligned to avoid mixed-language first paint or contradictory proof-state labels. [Source: `_bmad-output/project-context.md` - i18n Patterns; `_bmad-output/planning-artifacts/prd.md` - NFR8]
- Detected variance: the architecture names `tests/e2e/verification.spec.js`, while current Epic `1` story artifacts and repo patterns also use `.ts` in Playwright surfaces. Follow the current repository convention actually used in the touched area rather than forcing an extension change. [Source: `_bmad-output/planning-artifacts/architecture.md` - FR10-FR19, FR25; `_bmad-output/implementation-artifacts/1-1-clarify-the-homepage-first-screen.md`; `_bmad-output/project-context.md`]

### Project Contract Guardrails

- Preserve the current static-site architecture unless the story explicitly changes it
- Preserve product positioning: brand publishes proof via genu.mark; official state verification happens in Diia
- Avoid misleading claims not supported by the story
- Preserve semantic HTML, accessibility alignment, responsive integrity, CTA clarity, and translation quality

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 2, Story 2.1 acceptance criteria; Story 2.2-2.4 sequencing; public proof constraints.
- `_bmad-output/planning-artifacts/prd.md` - FR10, FR12, FR13, FR16, FR17, FR18, FR19, FR25, NFR8, NFR9, NFR10, NFR11.
- `_bmad-output/planning-artifacts/architecture.md` - proof-page route/controller/test structure; SEO/head order; file organization patterns.
- `_bmad-output/planning-artifacts/ux-design-specification.md` - proof-first mental model; `/v/genuim` as the anchor trust moment; homepage-to-proof transition intent.
- `_bmad-output/project-context.md` - static-site architecture, DOM-first controllers, i18n/storage/testing rules, accessibility and output.css constraints.
- `docs/project-contract.md` - product positioning, translation quality, misleading claims, CTA rule, code review and test coverage rules.
- `_bmad-output/implementation-artifacts/epic-1-dev-handoff.md` - sequence discipline, scope-splitting, and static-site guardrails carried from Epic 1.
- `_bmad-output/implementation-artifacts/1-1-clarify-the-homepage-first-screen.md` - canonical `/v/genuim` CTA and trust-boundary carryover.
- `_bmad-output/implementation-artifacts/1-2-show-the-two-main-visitor-needs.md` - branch-flow boundary; do not pull request behavior into proof story.
- `_bmad-output/implementation-artifacts/1-3-remember-the-chosen-language-and-theme.md` - language/theme consistency expectations on new public pages.
- `_bmad-output/implementation-artifacts/1-4-open-the-main-site-information-pages.md` - public page metadata/head and trust-floor consistency lessons.
- `_bmad-output/implementation-artifacts/1-5-show-the-knowledge-section-in-site-navigation.md` - placeholder honesty, negative-check discipline, and metadata coverage lessons.
- `https://tailwindcss.com/blog/tailwindcss-v4` - official Tailwind CSS v4 CSS-first configuration guidance.
- `https://tailwindcss.com/docs/compatibility` - official Tailwind CSS v4 browser-support guidance for modern browser baseline.

## Dev Agent Record

### Agent Model Used

openai/gpt-5.4

### Debug Log References

- Analyzed Epic `2` Story `2.1` acceptance criteria and proof-page constraints from `epics.md`, `prd.md`, `architecture.md`, and `ux-design-specification.md`.
- Reused Epic `1` retrospective evidence from `epic-1-dev-handoff.md` and stories `1.1`-`1.5` to carry forward scope discipline, negative-check rigor, first-render honesty, metadata rigor, and translation alignment.
- Confirmed `site/v/` is not present in the current checked-in repo, so Story `2.1` is framed as the first implementation-ready proof-page delivery slice rather than as a refinement of an existing route.
- Manual create-story checklist review used because the referenced workflow validation helper is not available in the loaded artifacts.
- Implemented `site/v/genuim/index.html` as a route-local static proof example with first-render demo notice, source-labeled facts, one CTA to `/contact/`, and route-local SEO metadata plus `ItemPage`/`BreadcrumbList` JSON-LD.
- Kept `verification-page.js` minimal and DOM-first per project architecture and user reminder: no layout control, no responsive logic, no simulated lookup state; only fail-soft optional-section/evidence suppression where CSS alone would not validate content presence.
- Added proof-page translations to `site/assets/js/lang-toggle.js` only because the new route ships with runtime language switching and shared public-page controls.
- Added CSS for the proof page in `site/assets/css/input.css`, rebuilt committed `site/assets/css/output.css`, and kept responsive/visual behavior in CSS rather than JS.
- Validation executed successfully with `npm run build:css`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e`, and `node scripts/run-lighthouse.cjs --mobile --desktop --url=http://localhost:3000/v/genuim/`.

### Completion Notes List

- Story `2.1` now delivers `/v/genuim` as a working static proof example instead of a missing route.
- The page keeps scope strictly to the canonical valid-state proof example: no `/v/` input flow, no no-data story behavior, no request submission, and no analytics/review instrumentation.
- Product-positioning guardrails are visible in page copy: brand proof stays in `genu.mark`, official state checks stay in `Diia`, and the page explicitly remains a static demo/example surface.
- Proof-page JS stays minimal and architecture-safe: no layout or responsive behavior in JS; CSS handles presentation while `verification-page.js` only fails soft and suppresses unsupported optional content.
- Added unit and browser coverage for the proof path, forbidden-wording checks, language switching, metadata, and `360px` usability; full Jest and Playwright regression suites pass.
- Lighthouse on `http://localhost:3000/v/genuim/` passes mobile and desktop at `100/100/100/100` or `99/100/100/100` across core categories.

### File List

- `_bmad-output/implementation-artifacts/2-1-show-the-main-verification-example.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `site/v/genuim/index.html`
- `site/assets/js/verification-page.js`
- `site/assets/js/lang-toggle.js`
- `site/assets/css/input.css`
- `site/assets/css/output.css`
- `site/index.html`
- `tests/verification-page.test.js`
- `tests/e2e/pages/verification.page.ts`
- `tests/e2e/verification.spec.ts`
- `tests/e2e/home.spec.ts` (updated trailing slash in expected href)

### Senior Developer Review (AI)

Reviewed 2026-03-13. Five issues found and fixed in this session:

- **B1 (fixed):** `<title>`, `og:title`, `twitter:title`, and JSON-LD `name` used hyphen `-` as separator instead of the site-wide em-dash `—`. Fixed to `Proof Example — genu.im` across all four locations. (`site/v/genuim/index.html`)
- **B2 (fixed):** `<head>` order placed `<link rel="stylesheet">` and favicon links before `<title>`, `<meta name="description">`, canonical, OG, JSON-LD, and FOUC guard — the reverse of all other site pages. Reordered to match the established pattern: charset → viewport → title → description → canonical → hreflang → OG → Twitter → JSON-LD → FOUC guard → favicon → CSS. (`site/v/genuim/index.html`)
- **S1 (fixed):** Homepage hero CTA linked to `/v/genuim` without trailing slash, inconsistent with the canonical URL `/v/genuim/` and the Playwright page object. Fixed to `/v/genuim/`. (`site/index.html`) **Also updated `tests/e2e/home.spec.ts` to match.**
- **S2 (fixed):** `verification.ctaAria` was identical to `verification.cta` in both EN and UK — a redundant aria-label with no added context. Updated to describe the navigation destination: `"Go to contact page to talk about proof for your product"` / `"Перейти на сторінку контактів і обговорити доказ для свого продукту"`. HTML fallback updated accordingly. (`site/assets/js/lang-toggle.js`, `site/v/genuim/index.html`)
- **S3 (fixed):** `"Серіалізований запис одиниці"` is a direct calque of "Serialized unit record", violating the Ukrainian Copy Rule (`docs/project-contract.md §9`). Replaced with idiomatic `"Запис одиниці з унікальним кодом"`. (`site/assets/js/lang-toggle.js`)

All 23 Jest tests pass. Biome lint clean. TypeScript clean. Playwright tests: 135 passed (verification + homepage).

## Change Log

- 2026-03-12: Implemented Story `2.1` proof example route at `/v/genuim`, added minimal proof-page controller and translations, added unit/Playwright coverage, rebuilt CSS artifact, and completed lint/typecheck/test/Lighthouse validation.
- 2026-03-13: Code review fixes — corrected `<head>` order and title separator (B1, B2), homepage CTA trailing slash (S1), ctaAria informativeness (S2), Ukrainian calque replacement (S3). All 23 Jest tests pass.
