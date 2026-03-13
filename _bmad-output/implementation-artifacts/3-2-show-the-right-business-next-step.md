# Story 3.2: Show the Right Business Next Step

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a business visitor,
I want the site to show a separate business next step,
So that I can continue toward marking, proof, or transparency help instead of the official-check path.

## Acceptance Criteria

**Given** a visitor sees the routing choices
**When** the business option is displayed
**Then** it is clearly separate from the official-check path
**And** it makes clear that it is for business use

**Given** a visitor wants the business path
**When** they use its CTA
**Then** they are taken to the request form with the matching scenario already selected
**And** the CTA text makes that request step clear before click

**Given** a visitor opens this business option on mobile or desktop
**When** the section or page is displayed
**Then** the business copy and CTA are readable and usable
**And** the layout works at `360px` width without hidden or broken controls

**Given** optional measurement or metadata enhancement is unavailable
**When** a visitor uses the business CTA path
**Then** the matching next step still opens normally
**And** the business route does not fail or degrade into a dead end

## Tasks / Subtasks

- [x] Implement audience routing decision surface (AC: #1, #2)
  - [x] Create separate routing UI that distinguishes official-check path from business path
  - [x] Ensure business option copy clearly indicates it is for business/B2B intent
- [x] Implement business CTA (AC: #3, #4)
  - [x] Create CTA that navigates to request form with scenario pre-selected
  - [x] Ensure CTA text clearly describes the business next step
- [x] Ensure responsive design (AC: #5)
  - [x] Verify routing UI displays correctly at 360px width
  - [x] Test on mobile and desktop viewports
- [x] Implement graceful degradation (AC: #6)
  - [x] Ensure routing works even if optional metadata/measurement unavailable
  - [x] Verify business route navigates to request form even if enhancements fail

## Dev Notes

### Previous Story Intelligence (3.1)

Story 3.1 established the official-check guidance pattern:
- Clear messaging that directs to `Дія` for official verification
- Explicit statement that `genu.im` does not provide official results
- CTA pattern that directs to external service (`Дія`)
- Responsive design at 360px baseline
- Graceful degradation when features unavailable

**Key patterns to apply:**
- Use same responsive baseline (360px) and graceful degradation approach
- Maintain distinction between official and business paths (3.1 established official guidance)
- Keep messaging clear and calm (not hype-based)
- Ensure both paths are visible and equally accessible

### Contract-First Implementation Brief

- Story scope:
  - Implement audience routing that shows business visitors a separate B2B next step
  - Create clear visual and copy separation between official-check path (from 3.1) and business path
  - Implement business CTA that navigates to request form with scenario pre-selected
  - Ensure responsive design works at 360px width baseline
  - Implement graceful degradation when optional features unavailable
  - Pre-populate request form with scenario based on routing choice

- Explicitly out of scope:
  - Implementing full request form functionality (Story 3.3 handles form submission)
  - Creating consumer-intent intercept page (Story 3.1 establishes official-check guidance only)
  - Implementing scenario-based routing logic beyond pre-selecting form field
  - Adding metadata/measurement capture (Story 3.4 handles scenario/source attachment)
  - Creating backend submission or request handling
  - Implementing authentication or account creation for business path

- Files or areas expected to change:
  - `site/` - New or updated HTML markup for routing decision surface
  - `site/assets/js/` - New controller to handle business CTA navigation and form pre-population
  - `site/assets/css/input.css` - Styles for routing UI and business option display
  - `tests/` - Unit tests for routing logic and form pre-population
  - `tests/e2e/` - E2E tests for CTA navigation and scenario pre-selection

- Protected files or areas not to change:
  - `site/assets/css/output.css` - Must remain committed
  - Official-check guidance from Story 3.1
  - Homepage structure and existing navigation patterns
  - Existing theme and language switching
  - Existing proof example and demo input flows
  - Trust-floor destination links

- User-visible behavior that will change:
  - Business visitors will see clear routing options distinguishing official vs. business paths
  - A visible business CTA will appear that navigates to the request form
  - Request form will pre-populate scenario field based on routing choice
  - Messaging will clearly indicate this is a business next step, not a consumer service

- Behavior that must remain unchanged:
  - Official-check guidance (Story 3.1) remains visible and unchanged
  - Theme and language persistence functionality
  - Responsive layout breaking points (360px baseline)
  - Accessibility attributes and ARIA labels
  - Translation consistency between EN and UK versions
  - Request form functionality (to be implemented in Story 3.3)

- Tests to add or update:
  - Unit tests for routing logic and CTA behavior
  - Tests for scenario pre-population in request form
  - Tests for responsive behavior at 360px width
  - Tests for graceful degradation when features unavailable
  - E2E tests verifying business CTA navigates to request form
  - E2E tests verifying scenario pre-selection works correctly
  - Smoke tests for critical business routing path

- Validation commands to run:
  - `npm test` - Run unit test suite
  - `npm run test:smoke` - Run Chromium smoke tests
  - `npm run test:smoke:mobile` - Run mobile smoke tests
  - `npm run lint` - Run Biome linting checks
  - `npm run typecheck` - Run TypeScript compilation check
  - `npm run build:css` - Rebuild CSS if styles modified
  - `npm run lighthouse` - Run Lighthouse performance audit

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming):
  - Controller follows naming convention: kebab-case for JS files
  - CSS updates follow Tailwind v4 utility-first approach in `site/assets/css/input.css`
  - Test files follow existing patterns in `tests/` and `tests/e2e/` directories
  - HTML updates follow existing semantic structure and data attribute patterns
  - No new directories or structural changes required

- Detected conflicts or variances (with rationale):
  - Story depends on Story 3.1 (official-check guidance) being implemented first
  - Request form URL parameter support needed (`?scenario=`) to pre-select field (already supported per architecture.md line 84)
  - Story pairs with Story 3.3 (send qualified request) — 3.2 pre-selects scenario, 3.3 implements form submission

### Project Contract Guardrails

- Preserve the current static-site architecture unless the story explicitly changes it
- Preserve product positioning: brand publishes proof via genu.mark; official state verification happens in Diia
- Avoid misleading claims not supported by the story
- Preserve semantic HTML, accessibility alignment, responsive integrity, CTA clarity, and translation quality
- Keep business/B2B messaging professional and separate from consumer guidance

### Architecture Alignment

**Routing Pattern (from architecture.md):**
- Static HTML directory/index pattern: `site/` uses directory/index routing
- URL params prefill: `?scenario=` parameter supported by request form controller
- Two-audience model: Homepage catches two audiences early, then separates them into branches later (per PRD)

**Request Form Integration:**
- Request form controller expects `?scenario=` URL parameter
- Controller pre-populates scenario field based on query param value
- Supported scenarios: per Story 3.3 acceptance criteria

### References

- [Source: docs/project-contract.md#7] - Product Positioning Rule
- [Source: docs/project-contract.md#10] - Misleading Claims Rule
- [Source: _bmad-output/planning-artifacts/epics.md#544-603] - Epic 3: Audience Routing and Qualified Conversion
- [Source: _bmad-output/planning-artifacts/epics.md#576-602] - Story 3.2: Show the Right Business Next Step
- [Source: _bmad-output/planning-artifacts/prd.md#69] - Two-audience model in PRD
- [Source: _bmad-output/planning-artifacts/prd.md#193-195] - Consumer-intent vs B2B needs
- [Source: _bmad-output/planning-artifacts/architecture.md#80-85] - Request form URL params and routing patterns
- [Source: _bmad-output/project-context.md#285-287] - Frontend Architecture Rules: Controller Pattern
- [Source: _bmad-output/project-context.md#306-308] - Testing Rules: Jest Patterns

## Dev Agent Record

### Agent Model Used

anthropic/claude-sonnet-4-6

### Debug Log References

- Fixed strict mode violation in `official-check.spec.ts` tests (lines 22, 75): two Diia CTAs now exist on page (Story 3.1 original + Story 3.2 routing card). Scoped selectors to `.info-page__cta-section` to preserve existing test intent.
- Fixed 3 Biome lint warnings (`noNonNullAssertion`) in `business-next-step.spec.ts` — replaced `!` with `?.` optional chaining.

### Completion Notes List

- Implemented `[data-audience-routing]` surface on `/perevir-product/` with two `routing-card` articles: `routing-card--official` (→ Diia) and `routing-card--business` (→ `/request?scenario=brand-proof`).
- Business card: eyebrow "Business next step", title "Want proof for your own products?", body referencing genu.mark, CTA "Send a request" with `data-business-cta` hook.
- Official card mirrors existing Story 3.1 Diia guidance, preserving separation between official and business paths.
- Added 10 EN + 10 UK translation keys under `routing.official.*` and `routing.business.*` namespaces in `lang-toggle.js`.
- Added CSS in `input.css`: `.audience-routing` responsive grid (1-col → 2-col at 640px), `.routing-card` with brand-accented business variant, touch targets ≥44px.
- All 4 tasks and 8 subtasks checked. 85 unit tests pass. 29 smoke (desktop) + 30 smoke (mobile) pass. Lint clean. Typecheck clean.

### File List

- `site/perevir-product/index.html` — added `[data-audience-routing]` section with official and business routing cards
- `site/assets/js/lang-toggle.js` — added `routing.official.*` and `routing.business.*` translation keys (EN + UK)
- `site/assets/css/input.css` — added `.audience-routing`, `.routing-card`, `.routing-card--official`, `.routing-card--business` styles
- `site/assets/css/output.css` — rebuilt CSS production artifact
- `tests/business-next-step.test.js` — new unit tests (21 tests, all AC covered)
- `tests/e2e/business-next-step.spec.ts` — new E2E smoke tests for routing surface
- `tests/e2e/official-check.spec.ts` — updated selectors to be more specific (`.info-page__cta-section`) to handle 2 Diia CTAs on page

## Change Log

- 2026-03-13: Story 3.2 implemented — audience routing surface with business CTA on `/perevir-product/`. Added routing cards, translations (EN/UK), CSS, unit tests, E2E tests. All validations pass.