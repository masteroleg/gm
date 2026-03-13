# Story 3.1: Guide Official Checks to `Дія`

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor looking for an official check,
I want the site to direct me to `Дія`,
So that I use the correct service for an official result.

## Acceptance Criteria

**Given** a visitor reaches the official-check guidance
**When** the message is shown
**Then** it clearly says that official checking belongs in `Дія`
**And** it does not suggest that `genu.im` provides the official result

**Given** a visitor wants to continue to the official check
**When** they use the official-check CTA
**Then** they are directed to `Дія`
**And** the CTA makes that destination clear before click

**Given** a visitor opens this guidance on mobile or desktop
**When** the section or page is displayed
**Then** the message and CTA are readable and usable
**And** the layout works at `360px` width without hidden or broken controls

**Given** optional measurement or enhancement behavior is unavailable
**When** a visitor uses the official-check guidance
**Then** the message and CTA still work as the core path
**And** the visitor is not blocked or misled about where the official check happens

## Tasks / Subtasks

- [ ] Implement official-check guidance component (AC: #1, #2)
  - [ ] Create clear messaging that directs users to `Дія` for official checks
  - [ ] Ensure messaging explicitly states that `genu.im` does not provide official results
- [ ] Implement official-check CTA (AC: #3, #4)
  - [ ] Create a CTA that directs users to `Дія`
  - [ ] Ensure CTA text clearly describes the navigation action
- [ ] Ensure responsive design (AC: #5)
  - [ ] Verify layout works at 360px width without hidden or broken controls
  - [ ] Test on mobile and desktop viewports
- [ ] Implement graceful degradation (AC: #6)
  - [ ] Ensure guidance works even if optional measurement/enhancement behavior is unavailable
  - [ ] Verify visitor is not blocked or misled about where the official check happens

## Dev Notes

- Relevant architecture patterns and constraints
- Source tree components to touch
- Testing standards summary

### Contract-First Implementation Brief

- Story scope:
  - Implement official-check guidance that directs users to `Дія` for official verification
  - Create clear messaging that separates `genu.im` (brand proof) from `Дія` (official state verification)
  - Implement a CTA that navigates to the `Дія` official checking service
  - Ensure responsive design works at 360px width baseline
  - Implement graceful degradation when optional features are unavailable

- Explicitly out of scope:
  - Implementing actual official verification functionality (this is handled by `Дія`)
  - Creating backend submission or request handling for official checks
  - Implementing live lookup or real-time verification features
  - Adding authentication or user accounts for official checking
  - Creating storage or persistence of request data for official verification

- Files or areas expected to change:
  - `site/assets/js/` - New controller file for official-check guidance
  - `site/` - Potential updates to HTML markup for guidance placement
  - `site/assets/css/input.css` - Potential new styles for guidance component
  - `tests/` - Unit tests for the official-check guidance controller
  - `tests/e2e/` - E2E tests for guidance functionality and navigation

- Protected files or areas not to change:
  - `site/assets/css/output.css` - Must remain committed (GitHub Pages deployment artifact)
  - Core homepage structure and existing navigation patterns
  - Existing theme and language switching functionality
  - Existing proof example and demo input flows
  - Existing trust-floor destination links (About, Contact, etc.)

- User-visible behavior that will change:
  - Visitors seeking official checks will see clear guidance directing them to `Дія`
  - A visible CTA will appear that directs to the official checking service
  - Messaging will explicitly distinguish between brand proof (`genu.mark`) and official verification (`Дія`)

- Behavior that must remain unchanged:
  - Theme and language persistence functionality
  - Proof example display and demo input behavior
  - Navigation to trust-floor destinations
  - Responsive layout breaking points (360px baseline)
  - Accessibility attributes and ARIA labels
  - Translation consistency between EN and UK versions

- Tests to add or update:
  - Unit tests for official-check guidance controller logic
  - Tests for messaging clarity and accuracy
  - Tests for CTA functionality and navigation behavior
  - Tests for responsive behavior at 360px width
  - Tests for graceful degradation when optional features unavailable
  - E2E tests verifying guidance appears in appropriate contexts
  - E2E tests verifying CTA navigation to external `Дія` resource (mocked)

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
  - Controller follows naming convention: kebab-case for JS files (`official-check-guidance.js`)
  - CSS updates follow Tailwind v4 utility-first approach in `site/assets/css/input.css`
  - Test files follow existing patterns in `tests/` and `tests/e2e/` directories
  - No new directories or structural changes required

- Detected conflicts or variances (with rationale):
  - No conflicts detected with existing project structure
  - Story implements guidance within existing static-site architecture boundaries
  - All changes align with established patterns for DOM-first controllers

### Project Contract Guardrails

- Preserve the current static-site architecture unless the story explicitly changes it
- Preserve product positioning: brand publishes proof via genu.mark; official state verification happens in Diia
- Avoid misleading claims not supported by the story
- Preserve semantic HTML, accessibility alignment, responsive integrity, CTA clarity, and translation quality

### References

- [Source: docs/project-contract.md#7] - Product Positioning Rule
- [Source: docs/project-contract.md#10] - Misleading Claims Rule
- [Source: _bmad-output/planning-artifacts/epics.md#548-554] - Epic 3: Audience Routing and Qualified Conversion
- [Source: _bmad-output/planning-artifacts/epics.md#549-565] - Story 3.1: Guide Official Checks to `Дія`
- [Source: _bmad-output/project-context.md#285-287] - Frontend Architecture Rules: Controller Pattern
- [Source: _bmad-output/project-context.md#306-308] - Testing Rules: Jest Patterns
- [Source: _bmad-output/project-context.md#347-349] - Testing Rules: Playwright Patterns

## Dev Agent Record

### Agent Model Used

opencode/nemotron-3-super-free

### Debug Log References

### Completion Notes List

### File List