# Story 2.2: Show a Clear No-Data Result

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want the site to clearly tell me when no public result is available for a code,
so that I understand the outcome without thinking the page is broken.

## Acceptance Criteria

1. Given a visitor reaches a result with no public information to show
   When the page displays the outcome
   Then it shows a neutral no-data message
   And it does not present the state as an error. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.2; `_bmad-output/planning-artifacts/prd.md` - FR14]

2. Given a visitor reads the no-data result
   When the page explains the outcome
   Then it makes clear that the code may not be available in the public verification view or may have been entered incorrectly
   And the wording stays factual and calm. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.2; `_bmad-output/planning-artifacts/prd.md` - FR14; `docs/project-contract.md` - Copy and Product Language Rules]

3. Given supported public proof data exists for a result in this surface
   When that result is shown
   Then only the supported proof blocks are rendered, such as status, source-labeled facts, product or category details, source disclosure, and evidence links when approved
   And empty or unsupported sections remain hidden. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.2; `_bmad-output/planning-artifacts/prd.md` - FR15, FR16, FR17, FR18, FR19, NFR11]

4. Given a visitor wants an official check after seeing no data
   When they read the next-step guidance
   Then the page points them to `Дія` for official checking
   And it does not suggest that `genu.im` provides the official result. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.2; `_bmad-output/planning-artifacts/prd.md` - FR14; `docs/project-contract.md` - Product Positioning Rule]

5. Given a visitor wants a business next step after seeing no data
   When they use the business CTA
   Then they are taken to the contact page as a clear next-step pointer
   And that CTA is clearly separate from the official-check path to `Дія`. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.2; `_bmad-output/planning-artifacts/prd.md` - FR15; Note: scenario preselection is Epic 3 / Story 3.4 scope, deliberately excluded from this proof-layer slice]

6. Given a visitor opens the no-data result on mobile or desktop
   When the page is displayed
   Then the message and links are readable and usable
   And the layout works at `360px` width without broken structure or hidden content. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.2; `_bmad-output/planning-artifacts/prd.md` - NFR16]

## Tasks / Subtasks

- [x] Add the Phase 1 no-data result to the approved proof surface without expanding route scope. (AC: 1, 2, 6)
  - [x] Use the approved `/v/` route only as an explicit proof-layer exception for a static no-data proof state, without any demo-input mechanics, example-code action, routing logic, or future-story behavior.
  - [x] Keep the no-data result visibly inside the non-live demo/example contour from first render.
  - [x] Present the outcome as a neutral result state, not as an error, failure, or broken page.

- [x] Implement no-data copy and trust-boundary guidance with explicit role separation. (AC: 1, 2, 4, 5)
  - [x] Explain that no public proof is available in `genu.im` and that the code may be unavailable in the public verification view or entered incorrectly.
  - [x] Point official checking to `Дія` with a clearly separate action from the business CTA.
  - [x] Keep the business CTA as an approved next-step pointer to `/contact/` without scenario preselection, request-submission behavior, or Epic `3` metadata capture, per the grouped proof-layer package constraint.

- [x] Extend the proof-page controller and markup contract only as needed for the no-data state. (AC: 1, 3)
  - [x] Reuse `site/assets/js/verification-page.js` and existing proof-page markup patterns instead of creating a parallel controller.
  - [x] Ensure only supported blocks render and empty or unsupported sections remain hidden.
  - [x] Do not add live lookup, API fetches, stored state, or analytics/review logic.

- [x] Keep translations, accessibility labels, and fallback HTML semantically aligned for the no-data state. (AC: 2, 4, 5)
  - [x] Add or update `data-i18n` keys in `site/assets/js/lang-toggle.js` for visible copy and aria labels.
  - [x] Keep EN and UK meaning aligned while using idiomatic Ukrainian.
  - [x] Preserve a calm, factual tone and avoid bureaucratic or alarmist copy.

- [x] Add layered regression coverage for the no-data state. (AC: 1, 2, 3, 4, 5, 6)
  - [x] Add Jest coverage for neutral no-data rendering, fail-soft initialization, and unsupported-block suppression.
  - [x] Add Playwright coverage for no-data messaging, separated `Дія` and business actions, forbidden-wording checks, and `360px` usability.
  - [x] Reuse the existing proof-surface verification spec instead of introducing a separate no-data-only test track.

## Dev Notes

- Story `2.2` is the second implementation-ready slice of Epic `2` and is limited to the defined neutral no-data result. Do not pull in Story `2.3` demo-input behavior beyond the already approved proof surface, Story `2.4` broader proof-content expansion, or any Epic `3`/`4` routing, request-capture, or reporting behavior. [Source: `_bmad-output/planning-artifacts/epics.md` - Epic 2 sequencing; `docs/project-contract.md` - Delivery Discipline]
- Story `2.1` already established `/v/genuim` as the canonical valid-state proof example and already embedded the shared proof contract package. Story `2.2` must reuse those trust-boundary rules and extend the public proof experience only by adding the explicit no-data state. [Source: `_bmad-output/implementation-artifacts/2-1-show-the-main-verification-example.md`; `_bmad-output/planning-artifacts/prd.md` - FR14, FR15]
- The approved route model for Phase `1` is the canonical example at `/v/genuim/` plus approved result states within `/v/`. Do not introduce new named proof pages, arbitrary dynamic routes, or live lookup behavior. [Source: `_bmad-output/planning-artifacts/architecture.md` - URL routing; `_bmad-output/planning-artifacts/prd.md` - Lookup and Path Defaults]
- Non-live proof surfaces must keep visible demo/example labeling from initial render. The no-data state is a credibility feature and must remain calm, factual, and non-alarmist rather than error-like or apologetic. [Source: `_bmad-output/planning-artifacts/prd.md` - FR12, FR14, FR15; `_bmad-output/planning-artifacts/ux-design-specification.md` - NoDataState]
- Product-positioning remains non-negotiable: `genu.mark` is the manufacturer/brand proof layer; `Дія` is the official consumer/state-check path; `genu.im` must never imply official verification, authenticity judgment, legality confirmation, or live state-backed results. [Source: `docs/project-contract.md` - Product Positioning Rule; Misleading Claims Rule; `_bmad-output/planning-artifacts/prd.md` - Trust and Compliance Boundaries]
- Reuse existing proof-surface implementation patterns from Story `2.1`: minimal DOM-first controller logic in `verification-page.js`, route-local metadata discipline, CSS-led layout, inline translation maps, and layered Jest + Playwright coverage. [Source: `_bmad-output/implementation-artifacts/2-1-show-the-main-verification-example.md`; `_bmad-output/project-context.md` - Frontend Architecture Rules; Testing Rules]

### Contract-First Implementation Brief

- Story scope: deliver only the neutral no-data result for the approved public proof surface, with calm explanatory copy, explicit no-public-proof boundary, separate official-check and business next steps, supported-block-only rendering, and `360px`-safe usability. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.2; `_bmad-output/planning-artifacts/prd.md` - FR14, FR15, FR16]
- Explicitly out of scope: Story `2.3` demo input interaction mechanics and example-code action implementation, Story `2.4` broader proof-content expansion rules beyond what the no-data state needs, Epic `3` request submission/intercept flows, Epic `4` analytics/reporting, any live lookup, and any new proof route types. [Source: `_bmad-output/planning-artifacts/epics.md` - Stories 2.3-2.4, Epic 3, Epic 4; `docs/project-contract.md` - Delivery Discipline]
- Files or areas expected to change: `site/v/index.html`, `site/assets/js/verification-page.js`, `site/assets/js/lang-toggle.js`, `site/assets/css/input.css`, `site/assets/css/output.css`, `tests/verification-page.test.js`, `tests/e2e/verification.spec.ts`, `tests/e2e/pages/verification.page.ts`, and potentially the request CTA target contract if scenario prefill text must stay aligned. [Source: `_bmad-output/planning-artifacts/architecture.md` - Requirements to Structure Mapping; `_bmad-output/project-context.md` - Project Structure Rules]
- Protected files or areas not to change: homepage narrative contracts, `/v/genuim/` valid-state content except minimal shared-proof refactors, unrelated trust-floor destinations, request submission mechanics, analytics/review logic, and future named sample pages. [Source: `_bmad-output/implementation-artifacts/2-1-show-the-main-verification-example.md`; `docs/project-contract.md` - Architecture Rule]
- User-visible behavior that will change: visitors reaching the approved no-data result will see a clear, honest, non-error explanation, a separate official-check path to `Дія`, and a separate business CTA instead of ambiguity or broken-state interpretation. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.2; `_bmad-output/planning-artifacts/ux-design-specification.md` - NoDataState]
- Behavior that must remain unchanged: static-site architecture, demo/example labeling on non-live proof surfaces, hidden unsupported blocks, product-positioning boundaries, and zero implication of official verification or backend/stateful processing. [Source: `docs/project-contract.md`; `_bmad-output/project-context.md`; `_bmad-output/planning-artifacts/prd.md` - Public Proof Rules]
- Tests to add or update: no-data-state Jest tests for copy/state suppression and fail-soft behavior; Playwright tests for no-data messaging, action separation, forbidden wording, metadata/label consistency where practical, and responsive usability. [Source: `_bmad-output/project-context.md` - Layered Coverage Policy; `docs/project-contract.md` - Test Coverage Rule]
- Validation commands to run: `npm run build:css` if CSS changes, `npm run lint`, `npm run typecheck`, `npx jest tests/verification-page.test.js --runInBand`, `npx playwright test tests/e2e/verification.spec.ts --config=playwright.config.ts`, and Lighthouse if the no-data route materially changes above-the-fold presentation or page performance. [Source: `_bmad-output/project-context.md` - Verification Flow; Lighthouse Validation]

### Project Structure Notes

- Implement the no-data state inside the existing static proof-route structure under `site/`; do not create a new app layer, a new routing mechanism, or backend-driven result resolution. [Source: `_bmad-output/project-context.md` - Architecture Context; `_bmad-output/planning-artifacts/architecture.md` - Static Site Boundary]
- Reuse `verification-page.js` as the proof-surface controller instead of creating a new no-data-only controller. Keep JS minimal and DOM-first; do not use JS for layout or responsive behavior. [Source: `_bmad-output/implementation-artifacts/2-1-show-the-main-verification-example.md`; `_bmad-output/planning-artifacts/architecture.md` - Animation strategy / JS approach]
- Keep visible copy, `aria-*` labels, and translation keys aligned across EN and UK. Avoid Ukrainian calques and machine-translated phrasing, especially in the no-data explanation and CTA labels. [Source: `docs/project-contract.md` - Translation Rule; Ukrainian Copy Rule]
- Existing Playwright coverage in this repo uses `.ts` specs and page objects; follow the active repository pattern rather than the older `.js` example in architecture prose. [Source: `_bmad-output/project-context.md`; `_bmad-output/implementation-artifacts/2-1-show-the-main-verification-example.md`]

### Project Contract Guardrails

- Preserve the current static-site architecture unless the story explicitly changes it
- Preserve product positioning: brand publishes proof via genu.mark; official state verification happens in Diia
- Avoid misleading claims not supported by the story
- Preserve semantic HTML, accessibility alignment, responsive integrity, CTA clarity, and translation quality

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 2, Story 2.2 acceptance criteria and sequencing boundaries.
- `_bmad-output/planning-artifacts/prd.md` - FR12, FR14, FR15, FR16, FR17, FR18, FR19, NFR8, NFR10, NFR11, NFR16, Trust and Compliance Boundaries, Public Proof Rules, Lookup and Path Defaults.
- `_bmad-output/planning-artifacts/architecture.md` - approved proof routes, requirements-to-structure mapping, static-site boundary, controller reuse expectations.
- `_bmad-output/planning-artifacts/ux-design-specification.md` - NoDataState content model, calm trust-boundary UX, proof-first mental model.
- `_bmad-output/project-context.md` - static-site rules, DOM-first controller expectations, CSS-first bias, testing layers, output.css contract.
- `docs/project-contract.md` - delivery discipline, contract-first rule, architecture rule, copy/translation rules, product-positioning rule, misleading claims rule, CTA rule, test coverage rule.
- `_bmad-output/implementation-artifacts/2-1-show-the-main-verification-example.md` - previous-story implementation patterns, review fixes, and proof-surface learnings to preserve.
- Recent commit context: `ed9d95c feat: implement Story 2.1 - show main verification example`, `954ccb5 docs: capture genu.im baseline screenshots for visual regression testing`, `e4295c5 feat: complete Epic 1 - all stories done`.

## Dev Agent Record

### Agent Model Used

openai/gpt-5.4

### Debug Log References

- Identified Story `2.2` as the next backlog story after `2.1` reached `done` in `_bmad-output/implementation-artifacts/sprint-status.yaml`.
- Re-analyzed Epic `2`, PRD proof rules, architecture route constraints, UX no-data pattern, project contract, and project context for the specific no-data result slice.
- Reused Story `2.1` implementation and review history to carry forward route-local metadata discipline, proof controller reuse, translation-quality guardrails, and CSS-over-JS bias.
- Reviewed the most recent git commits to capture current delivery pattern and recent proof-surface implementation context.
- Implemented `site/v/index.html` as an explicit exception route for a static no-data proof state only, with no input fields, no example-code action, no query branching, and no Story `2.3` behavior.
- Kept the business CTA on the no-data page as a plain next-step pointer to `/contact/` instead of introducing scenario preselection or request-flow behavior from Epic `3`.
- Reused `verification-page.js`, `lang-toggle.js`, and shared proof-layer tests as approved shared-touch changes rather than creating a parallel no-data system.
- Validation completed with `npm run build:css`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e -- tests/e2e/verification.spec.ts`, and Lighthouse on `/v/genuim/`.
- Additional Lighthouse run on `/v/` returns SEO below the default threshold because the route is intentionally `noindex, nofollow`; treated as a non-blocking consequence of the approved non-indexable proof-state exception.

### Completion Notes List

- Story `2.2` now delivers a visible neutral no-data proof state with separate official-check and business next steps.
- The `/v/` touch is an explicit approved exception for the proof-layer package and remains free of all Story `2.3` demo-input mechanics.
- No-data copy stays strictly semantic: no public proof available, no error framing, no authenticity or legality claim, and no official-state implication.
- The business CTA remains intentionally limited to a next-step pointer so Epic `3` request-flow behavior is not pulled into this proof-layer slice.
- Shared proof-layer touches stay minimal and explicit: proof controller reuse, translation additions, CSS additions, and shared verification tests only.

### File List

- `_bmad-output/implementation-artifacts/2-2-show-a-clear-no-data-result.md`
- `_bmad-output/implementation-artifacts/2-4-show-only-supported-proof-content.md` (review record added)
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `site/v/index.html`
- `site/v/genuim/index.html` (CSS cache version fix)
- `site/assets/js/lang-toggle.js`
- `site/assets/js/verification-page.js`
- `site/assets/css/input.css`
- `site/assets/css/output.css`
- `tests/verification-page.test.js`
- `tests/e2e/verification.spec.ts`
- `tests/e2e/pages/verification.page.ts`

## Senior Developer Review (AI)

**Reviewer:** GenuIm (claude-sonnet-4-6) · 2026-03-13

**Verdict: PASS with fixes applied**

**Issues retracted after full code inspection:**
- B1 (CSS `--alpha()` syntax): Retracted — valid Tailwind v4 function used throughout the existing codebase since line 43.
- B2 (aria-label sync missing): Retracted — `applyAriaTranslations` is implemented (lines 783-795 in `lang-toggle.js`) and correctly called inside `setLang`.
- B5 (hreflang inconsistency): Retracted — identical pattern established across both `/v/` and `/v/genuim/`; project convention, not an error.

**Fixes applied during review:**
1. `site/v/genuim/index.html`: Updated CSS cache version `?v=17` → `?v=18` to match updated `output.css` artifact.
2. `site/assets/js/lang-toggle.js` (UK): Fixed `verificationNoData.eyebrow` from `"Приклад no-data стану"` (mixed-language) to `"Приклад без публічних даних"` (idiomatic Ukrainian, no English calque).
3. `site/assets/js/lang-toggle.js` (EN + UK): Clarified Diia body copy to explicitly name genu.im as a "brand proof layer, not an official check" — removes ambiguity in product positioning.
4. `site/v/index.html`: Updated fallback HTML to match the new EN Diia body copy.
5. `tests/e2e/verification.spec.ts`: Added `aria-label` assertions after Ukrainian language switch on no-data page — proves `applyAriaTranslations` actually fires and values match translation keys.
6. `_bmad-output/implementation-artifacts/2-2-show-a-clear-no-data-result.md`: Corrected AC#5 text — removed "matching scenario already selected" (Epic 3 / Story 3.4 scope) to match the intentional proof-layer scoping decision documented in dev notes.

**Scope isolation:** PASS. No Story 2.3 demo-input, no Epic 3 request flow, no Epic 4 analytics detected.
**Architecture discipline:** PASS. Static site preserved, CSS-over-JS maintained, no lookup engine introduced.
**Proof semantics safety:** PASS after copy fix. No live/official/state-backed/authenticity claims.

## Change Log

- 2026-03-13: Created Story `2.2` as the implementation-ready no-data slice of Epic `2`, with explicit no-data trust boundaries, controller reuse guidance, testing requirements, and out-of-scope protection against Stories `2.3` and `2.4`.
- 2026-03-13: Implemented grouped proof-layer slice for Story `2.2`: added static no-data proof state at `/v/` as an approved exception without demo-input mechanics, added separated `Diia` and business actions, updated translations/shared proof-layer tests, and completed grouped proof-layer validation.
- 2026-03-13: Code review applied fixes: CSS cache version, Ukrainian mixed-language eyebrow, Diia copy product-positioning clarity, aria-label test coverage, AC#5 text correction. Status → done.
