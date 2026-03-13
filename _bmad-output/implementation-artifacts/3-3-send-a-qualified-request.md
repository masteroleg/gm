# Story 3.3: Send a Qualified Request

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a business visitor,
I want to send a short request with my company and situation,
So that I can ask for help without filling a long form.

## Acceptance Criteria

**Given** a visitor opens the request form
**When** the form is displayed
**Then** it asks only for these Phase 1 user-entered fields: business contact name, business email or phone, company name, scenario, and short context
**And** no additional user-entered fields are required

**Given** a visitor fills in the required fields correctly
**When** they submit the form
**Then** the site initiates the Phase 1 `mailto:` handoff with their entered contact details, company name, scenario, and short context
**And** that handoff works without requiring login when the client environment supports it

**Given** a visitor fills in the required fields correctly
**When** the request handoff uses `mailto:` in a supported client environment
**Then** the generated handoff includes the visible request details
**And** the flow confirms handoff initiation only, not a server-side submission or stored request record

**Given** a visitor misses a required field or enters invalid data
**When** they try to submit the form
**Then** the form is not sent
**And** the page clearly shows what needs to be fixed

**Given** a visitor opens the form on mobile or desktop
**When** they use it
**Then** the fields, labels, and submit action are readable and usable
**And** the layout works at `360px` width without broken structure or hidden controls

**Given** a visitor has no configured mail client or the `mailto:` handoff cannot open
**When** they attempt to submit the form
**Then** the page keeps the entered values visible and editable on screen
**And** it shows an explicit fallback contact next step without claiming that the request was submitted

## Tasks / Subtasks

- [ ] Implement request form HTML with 5 required fields (AC: #1)
  - [ ] Create form with: business contact name, email/phone, company name, scenario, short context
  - [ ] Ensure no additional user-entered fields are required
  - [ ] Add meaningful labels and accessibility attributes for each field
- [ ] Implement form validation (AC: #4)
  - [ ] Validate required fields are filled before submission
  - [ ] Validate email format if email is provided
  - [ ] Display clear error messages for missing or invalid fields
- [ ] Implement `mailto:` handoff generation (AC: #2, #3)
  - [ ] Build `mailto:` URL with form data
  - [ ] Generate human-readable email body with entered details
  - [ ] Confirm handoff initiation only (not server submission)
- [ ] Implement fallback handling (AC: #5)
  - [ ] Detect when `mailto:` handoff cannot open
  - [ ] Keep form values visible on screen when fallback triggered
  - [ ] Show explicit contact fallback next step
  - [ ] Never claim request was submitted if fallback activated
- [ ] Ensure responsive design (AC: #6)
  - [ ] Verify form displays correctly at 360px width
  - [ ] Test on mobile and desktop viewports

## Dev Notes

### Previous Story Intelligence (3.1 & 3.2)

Stories 3.1-3.2 established routing patterns:
- Clear messaging that directs users to appropriate next steps
- Responsive design at 360px baseline
- Graceful degradation when features unavailable
- URL parameter support for pre-selecting form fields

**Key patterns to apply:**
- Use same responsive baseline (360px) for form display
- Implement graceful degradation for `mailto:` handoff failure
- Maintain clear messaging about what happens (handoff initiation, not server submission)
- Keep form simple: exactly 5 user-entered fields per NFR12

### Contract-First Implementation Brief

- Story scope:
  - Implement request form with exactly 5 user-entered fields (business contact name, email/phone, company name, scenario, context)
  - Implement form validation for required fields and email format
  - Implement Phase 1 `mailto:` handoff mechanism
  - Implement graceful fallback when `mailto:` cannot open
  - Ensure responsive design works at 360px width baseline
  - Do NOT implement server-side request capture or storage
  - Do NOT claim request was "submitted" if `mailto:` fails

- Explicitly out of scope:
  - Server-side request handling or storage
  - Email delivery guarantee or confirmation
  - Backend request logging or database persistence
  - Request tracking numbers or automated responses
  - Authentication or account creation
  - Full analytics pipeline or telemetry
  - Private B2B portal or investigation workflow

- Files or areas expected to change:
  - `site/` - New request form page (likely `/request/index.html` or similar)
  - `site/assets/js/` - New controller for form handling and `mailto:` generation
  - `site/assets/css/input.css` - Styles for form layout and validation states
  - `tests/` - Unit tests for form validation and `mailto:` generation
  - `tests/e2e/` - E2E tests for form submission and fallback behavior

- Protected files or areas not to change:
  - `site/assets/css/output.css` - Must remain committed
  - Routing from Stories 3.1-3.2
  - Theme and language switching functionality
  - Existing proof example and demo input flows
  - Trust-floor destination links
  - Homepage structure

- User-visible behavior that will change:
  - Business visitors can access a request form with 5 fields
  - Form validates required fields before sending
  - Form generates `mailto:` handoff with company and situation details
  - Form shows fallback contact information if `mailto:` cannot open
  - Explicit messaging confirms this is a handoff mechanism, not server storage

- Behavior that must remain unchanged:
  - Routing from Stories 3.1-3.2
  - Theme and language persistence functionality
  - Responsive layout breaking points (360px baseline)
  - Accessibility attributes and ARIA labels
  - Translation consistency between EN and UK versions
  - No backend submission or request storage

- Tests to add or update:
  - Unit tests for form validation logic
  - Unit tests for `mailto:` URL generation
  - Tests for required field validation
  - Tests for email format validation
  - Tests for fallback detection when `mailto:` unavailable
  - Tests that form values remain visible after fallback
  - E2E tests for form display and field interaction
  - E2E tests for `mailto:` handoff (mocked browser behavior)
  - Smoke tests for critical form submission path

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
  - Form page follows directory/index routing: `site/request/index.html` (or similar approved path)
  - Controller follows naming convention: kebab-case for JS files (`request-form.js`)
  - CSS updates follow Tailwind v4 utility-first approach in `site/assets/css/input.css`
  - Test files follow existing patterns in `tests/` and `tests/e2e/` directories
  - No new directories or structural changes required beyond new form page

- Detected conflicts or variances (with rationale):
  - Story depends on Story 3.2 (pre-selects scenario field) being implemented first
  - Story pairs with Story 3.4 (attaches scenario/source metadata) — 3.3 implements form, 3.4 adds metadata
  - `mailto:` handoff is Phase 1 UX mechanism only (per architecture.md line 77) — not reliable transport

### Project Contract Guardrails

- Preserve the current static-site architecture unless the story explicitly changes it
- Preserve product positioning: brand publishes proof via genu.mark; official state verification happens in Diia
- Avoid misleading claims not supported by the story
- **CRITICAL:** Never claim request was "submitted" if `mailto:` handoff fails — be explicit about fallback
- **CRITICAL:** Never implement server-side request capture in Phase 1 — `mailto:` is UX handoff only
- Keep form simple: exactly 5 user-entered fields (NFR12 constraint)
- Preserve semantic HTML, accessibility alignment, responsive integrity, and translation quality

### Architecture Alignment

**Request Capture Model (from architecture.md & PRD):**
- Phase 1 qualification fields: business contact name, email/phone, company name, scenario, short context (per PRD line 324)
- Maximum 5 user-entered fields (NFR12)
- `mailto:` UX handoff mechanism (per architecture.md line 77)
- Best-effort metadata transport only (per architecture.md line 96)
- No server-side request capture in Phase 1 (per PRD line 98)

**Email Handoff Pattern (from architecture.md):**
- `RequestForm` controller reads `?scenario=` param and page context
- Builds `mailto:` payload with scenario, source_path, and optional proof_path
- Confirmation shows handoff initiation only, not stored submission

### References

- [Source: docs/project-contract.md#10] - Misleading Claims Rule
- [Source: _bmad-output/planning-artifacts/epics.md#604-640] - Story 3.3: Send a Qualified Request
- [Source: _bmad-output/planning-artifacts/prd.md#91] - Phase 1 request/contact flow uses `mailto:` as UX handoff
- [Source: _bmad-output/planning-artifacts/prd.md#96-97] - Metadata in Phase 1 handoff is best-effort
- [Source: _bmad-output/planning-artifacts/prd.md#98] - No backend request capture in Phase 1 backlog
- [Source: _bmad-output/planning-artifacts/architecture.md#77] - Request/contact handoff Phase 1: `mailto:` UX mechanism
- [Source: _bmad-output/planning-artifacts/architecture.md#856] - RequestForm controller pattern with URL params
- [Source: _bmad-output/project-context.md#89-91] - JavaScript error handling rules
- [Source: _bmad-output/project-context.md#218-226] - HTML and DOM contract rules

## Dev Agent Record

### Agent Model Used

opencode/nemotron-3-super-free

### Debug Log References

### Completion Notes List

### File List