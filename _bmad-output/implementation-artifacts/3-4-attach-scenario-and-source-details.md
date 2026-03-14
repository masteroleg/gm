# Story 3.4: Attach Scenario and Source Details

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a business visitor,
I want the site to carry over the path and scenario that led me to the request form,
So that I do not have to repeat that context by hand.

## Acceptance Criteria

**Given** a visitor reaches the request flow from a specific path or scenario
**When** the request form loads or prepares the handoff
**Then** the scenario and source-path details are attached automatically
**And** the visitor does not need to type them manually

**Given** a request handoff is created
**When** the request details are assembled
**Then** the scenario and source-path details are included with the request
**And** `proof_path` is included when the request starts from a proof surface without adding extra user-entered fields

**Given** the request flow runs in an environment that supports the generated `mailto:` payload
**When** metadata is attached to the handoff
**Then** `scenario`, `source_path`, and optional `proof_path` are passed on a best-effort basis
**And** the flow does not claim guaranteed transport or server-side capture of that metadata

**Given** scenario or source metadata is missing or unavailable
**When** the visitor submits the request
**Then** the request still works
**And** missing metadata does not block submission

**Given** the `mailto:` handoff is unavailable
**When** metadata cannot be carried into a client mail composer
**Then** the fallback path still keeps the visible scenario/context available to the user on page
**And** the absence of metadata transport does not get presented as a completed submission

## Tasks / Subtasks

- [x] Implement scenario/source metadata capture (AC: #1, #2)
  - [x] Capture scenario from routing decision (Story 3.2)
  - [x] Capture source_path from current page context
  - [x] Capture proof_path when request originates from proof surface
- [x] Implement metadata attachment to `mailto:` handoff (AC: #3, #4)
  - [x] Include scenario, source_path, and optional proof_path in email body
  - [x] Use best-effort approach with no guarantees
  - [x] Do NOT claim metadata will be captured server-side
- [x] Implement metadata fallback handling (AC: #5)
  - [x] Keep metadata visible on page if `mailto:` handoff fails
  - [x] Preserve scenario/context for user reference
  - [x] Do NOT claim submission succeeded if metadata cannot be transported
- [x] Implement graceful degradation (AC: #5)
  - [x] Request form works even if metadata is missing or unavailable
  - [x] Form submission not blocked by missing metadata
  - [x] Ensure all 5 user-entered fields can be submitted independently

## Dev Notes

### Previous Story Intelligence (3.1, 3.2, 3.3)

Stories 3.1-3.3 established the request flow foundation:
- Story 3.1: Official-check guidance pattern
- Story 3.2: Business routing with scenario pre-selection
- Story 3.3: Request form with 5 fields and `mailto:` handoff

**Key patterns to apply:**
- Build on Story 3.2's scenario pre-selection (request form already has scenario field)
- Build on Story 3.3's `mailto:` handoff mechanism
- Apply same best-effort, no-guarantee messaging pattern
- Keep graceful degradation if metadata unavailable

### Contract-First Implementation Brief

- Story scope:
  - Capture scenario from routing choice (Story 3.2) and attach to request
  - Capture source_path from page context and attach to request
  - Capture proof_path when request originates from proof page
  - Attach metadata to `mailto:` handoff payload
  - Keep metadata visible on page if `mailto:` fails
  - Implement best-effort metadata transport (no guarantees)
  - Do NOT implement server-side metadata capture or validation

- Explicitly out of scope:
  - Server-side metadata storage or validation
  - Backend request logging or tracking
  - Guaranteed metadata delivery
  - Request tracking numbers or references
  - Full analytics pipeline or telemetry
  - Authentication or account requirements
  - Private B2B portal workflows

- Files or areas expected to change:
  - `site/assets/js/request-form.js` - Enhance to capture and attach metadata
  - Potentially `site/` - Update page markup to include data attributes for source tracking
  - `site/assets/css/input.css` - Minimal changes (may need styles for metadata display in fallback)
  - `tests/` - Unit tests for metadata capture and attachment
  - `tests/e2e/` - E2E tests for metadata in `mailto:` payload

- Protected files or areas not to change:
  - `site/assets/css/output.css` - Must remain committed
  - Form submission flow from Story 3.3
  - Request form validation from Story 3.3
  - Routing decisions from Stories 3.1-3.2
  - Theme and language switching functionality
  - Existing proof example and demo input flows

- User-visible behavior that will change:
  - Scenario field will be automatically filled when routing from Story 3.2
  - Request email will include source-path and scenario metadata
  - Fallback display will show captured context if `mailto:` cannot open
  - Explicit messaging will show metadata is attached (best-effort, not guaranteed)

- Behavior that must remain unchanged:
  - Form validation and error handling from Story 3.3
  - `mailto:` handoff mechanism from Story 3.3
  - Fallback contact display from Story 3.3
  - Request form required fields (5 fields, no additions)
  - Routing flow from Stories 3.1-3.2

- Tests to add or update:
  - Unit tests for scenario/source metadata capture
  - Unit tests for proof_path detection
  - Unit tests for metadata attachment to `mailto:` payload
  - Unit tests for metadata in fallback display
  - Tests that request works even with missing metadata
  - E2E tests for scenario pre-population from routing
  - E2E tests for source_path in email payload (simulated)
  - E2E tests for proof_path detection from proof pages
  - Tests for fallback showing all captured metadata

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
  - Metadata capture integrates into existing `request-form.js` controller
  - No new files required for core functionality
  - Data attributes follow existing patterns (e.g., `data-proof-*`)
  - CSS updates follow Tailwind v4 utility-first approach
  - Test files follow existing patterns in `tests/` and `tests/e2e/` directories

- Detected conflicts or variances (with rationale):
  - Story depends on Stories 3.2-3.3 (scenario pre-selection and form implementation)
  - Proof_path detection depends on page structure used in Stories 2.1-2.4
  - Source_path requires page context awareness (may need data attributes)

### Project Contract Guardrails

- Preserve the current static-site architecture unless the story explicitly changes it
- Preserve product positioning: brand publishes proof via genu.mark; official state verification happens in Diia
- Avoid misleading claims not supported by the story
- **CRITICAL:** Never claim metadata is "guaranteed" or "will be captured server-side"
- **CRITICAL:** Always use best-effort language ("included when available," "if supported," etc.)
- **CRITICAL:** Never block form submission if metadata is missing
- Preserve semantic HTML, accessibility alignment, responsive integrity, and translation quality

### Architecture Alignment

**Metadata Capture Pattern (from architecture.md line 856):**
- RequestForm controller reads `?scenario=` param for scenario
- Builds `mailto:` payload with scenario, source_path, and optional proof_path
- Metadata is best-effort; no guarantees on transport or server capture

**Source Attribution (from PRD line 96):**
- Metadata in Phase 1 handoff is best-effort and environment-dependent
- `scenario`, `source_path`, and optional `proof_path` included when client supports generated `mailto:` payload
- If `mailto:` cannot open, fallback preserves user-entered values on page

**Supported Scenarios (from epics.md & architecture):**
- Two main scenarios from Story 1.2: `еАкциз` readiness and responsible-manufacturer proof
- Additional scenarios may exist per request form design

### References

- [Source: docs/project-contract.md#10] - Misleading Claims Rule
- [Source: _bmad-output/planning-artifacts/epics.md#642-673] - Story 3.4: Attach Scenario and Source Details
- [Source: _bmad-output/planning-artifacts/prd.md#91-97] - Phase 1 request/contact flow and metadata model
- [Source: _bmad-output/planning-artifacts/prd.md#98] - No backend request capture in Phase 1
- [Source: _bmad-output/planning-artifacts/architecture.md#77] - Request/contact handoff Phase 1: `mailto:` UX mechanism
- [Source: _bmad-output/planning-artifacts/architecture.md#84] - URL params prefill: `?scenario=` pattern
- [Source: _bmad-output/planning-artifacts/architecture.md#856] - RequestForm controller with scenario, source_path, proof_path
- [Source: _bmad-output/planning-artifacts/epics.md#29-33] - Homepage branch split defining scenarios

## Dev Agent Record

### Agent Model Used

anthropic/claude-sonnet-4-6

### Debug Log References

- Pre-existing regression in `business-next-step.test.js`: missing `routing.official.*` and `routing.business.*` UK translations from Story 3.2. Fixed as part of this story since it blocked full suite green.
- JSDOM `window.location` cannot be reassigned directly; `captureMetadata` accepts optional `_loc` parameter for testability.
- Code review identified E2E test timing issue for fallback visibility - fixed by adding proper wait timeout and form submission trigger.

### Completion Notes List

- Implemented `captureMetadata(_loc)` in `request-form.js`: reads `?scenario=`, `?from=`, `window.location.pathname`, and `data-proof-path` attribute. Returns `{scenario, source_path, proof_path}` — best-effort, never throws.
- Extended `buildMailtoUrl({..., source_path, proof_path})`: appends `Source:` line when `source_path` non-empty; appends `Proof page:` line when `proof_path` non-empty. No guarantees claimed in body text.
- Added `showFallbackWithMeta({scenario, source_path, proof_path})`: shows fallback panel and populates `#requestFallbackMeta` with captured context. Works safely when element is absent.
- Updated `triggerMailtoWithFallback(mailtoUrl, metadata)` to call `showFallbackWithMeta(metadata)` instead of bare `showFallback()`.
- Updated `initRequestForm()`: captures metadata before building mailto URL; passes metadata to trigger function.
- Added `data-request-fallback-meta` hidden `<p>` to `site/request/index.html` fallback section.
- Fixed pre-existing regression: added `routing.official.*` and `routing.business.*` UK translations to `lang-toggle.js`.
- All exports: `buildMailtoUrl`, `captureMetadata`, `initRequestForm`, `isValidContact`, `showConfirmation`, `showFallback`, `showFallbackWithMeta`, `validateForm`.
- Unit tests: 25 new tests across 4 describe blocks. Total suite: 150 tests, all green.
- E2E smoke tests: 4 new tests added to `request-form.spec.ts`. All 41 smoke tests pass.
- Code review fix: Updated E2E test "fallback link is present in fallback message" to properly wait for fallback appearance after form submission and increased timeout to accommodate 1.8s delay.

### File List

- `site/assets/js/request-form.js` — enhanced with `captureMetadata`, `showFallbackWithMeta`, updated `buildMailtoUrl`, `triggerMailtoWithFallback`, `initRequestForm`
- `site/assets/js/lang-toggle.js` — added UK translations for `routing.official.*` and `routing.business.*`
- `site/request/index.html` — added `data-request-fallback-meta` element in fallback section
- `tests/request-form.test.js` — added 25 new unit tests for Story 3.4 metadata features
- `tests/e2e/request-form.spec.ts` — added 4 new E2E smoke tests for Story 3.4 (1 fixed during code review)

## Change Log

- 2026-03-14: Story 3.4 implemented — metadata capture and attachment to mailto: handoff, fallback meta display, graceful degradation. Pre-existing routing UK translation regression also fixed.
- 2026-03-14: Code review fixes — updated E2E test for fallback link visibility to properly handle timeout behavior and added missing form submission trigger.
