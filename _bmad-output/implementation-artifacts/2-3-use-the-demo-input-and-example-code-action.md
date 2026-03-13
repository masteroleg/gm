# Story 2.3: Use the Demo Input and Example-Code Action

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to enter a code or use an example-code action on the demo page,
so that I can reach a result page without needing an account.

## Acceptance Criteria

1. Given a visitor opens `/v/`
   When the page loads
   Then it shows a clear code input, an example-code action, and a persistent demo-mode notice from initial render
   And the page makes clear what the visitor can do there. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.3; `_bmad-output/planning-artifacts/prd.md` - FR11, FR12]

2. Given a visitor enters or pastes a code
   When they submit it
   Then the site takes them to the matching approved Phase 1 result state for that code flow
   And the visitor does not need to log in. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.3; `_bmad-output/planning-artifacts/prd.md` - FR11, FR25; `_bmad-output/planning-artifacts/prd.md` - Lookup and Path Defaults]

3. Given a visitor uses the example-code action
   When they activate it
   Then the approved Phase 1 result state opens
   And the demo labeling remains visible. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.3; `_bmad-output/planning-artifacts/prd.md` - FR11, FR12]

4. Given a visitor opens the demo page on mobile or desktop
   When the page is displayed
   Then the input and example-code action are readable and usable
   And the layout works at `360px` width without broken structure or hidden controls. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.3; `_bmad-output/planning-artifacts/prd.md` - NFR16]

## Tasks / Subtasks

- [ ] Convert `/v/` from the temporary proof-layer exception into the approved demo-input surface for Story `2.3`. (AC: 1, 4)
  - [ ] Add a clear input-first layout on `site/v/index.html` with one code field, one submit action, one example-code action, and a persistent demo-mode notice visible from initial render.
  - [ ] Keep the surface semantic, mobile-first, and CSS-led; do not introduce framework routing, modal-heavy interaction, or JS-managed layout behavior.
  - [ ] Preserve the existing noindex/non-live route contract for `/v/`.

- [ ] Implement minimal DOM-first input handling that navigates only to already-approved static result states. (AC: 2, 3)
  - [ ] Reuse `site/assets/js/verification-page.js` only if the added logic can remain narrow, fail-soft, and route-local; otherwise keep any extension minimal and explicit.
  - [ ] Define a small approved mapping for accepted demo inputs and the example-code action so navigation opens only existing Phase 1 states such as `/v/genuim/` or the approved `/v/` no-data state.
  - [ ] Do not implement arbitrary-code resolution, live lookup, backend submission, fetch calls, loading-state theatrics, or any implication that the code is being checked against a real-time source.

- [ ] Keep the no-data state and canonical proof state reusable as destinations without reopening their semantics. (AC: 2, 3)
  - [ ] Treat Stories `2.1`, `2.2`, and `2.4` as completed contracts: Story `2.3` may navigate to those approved states but must not rewrite their proof semantics, supported-content rules, or trust-boundary copy.
  - [ ] Ensure the example-code action points only to an already-approved result state and does not introduce new named sample routes.
  - [ ] Keep business next-step behavior limited to whatever the destination state already defines; do not pull in Epic `3` request-flow behavior.

- [ ] Keep translations, labels, and accessibility behavior aligned across the demo-input surface. (AC: 1, 4)
  - [ ] Add or update `data-i18n` keys in `site/assets/js/lang-toggle.js` for the input label, helper copy, action labels, and any aria text.
  - [ ] Keep EN and UK meaning aligned while preserving idiomatic Ukrainian and calm, factual product language.
  - [ ] Use links for navigation targets and buttons for in-page actions, with clear accessible names for submit and example-code controls.

- [ ] Add layered regression coverage for the demo-input entry flow and approved-state navigation. (AC: 1, 2, 3, 4)
  - [ ] Add Jest coverage for fail-soft initialization, approved input-to-destination mapping, example-code behavior, and non-live label/state synchronization.
  - [ ] Add Playwright coverage for `/v/` first render, example-code navigation, pasted-code submission, persistent demo notice, and `360px` usability.
  - [ ] Reuse the existing proof-surface page object and verification spec where practical instead of creating a disconnected testing track.

## Dev Notes

Story `2.3` converts `site/v/index.html` from the temporary proof-layer no-data exception (established in Story `2.2`) into the approved Phase 1 demo-input surface. The no-data result state itself remains correct and unchanged as a navigation destination — only the entry shell around it changes. This story adds an input field, a submit action, and an example-code action to the `/v/` surface and implements client-side navigation to two and only two approved static result states. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.3; `_bmad-output/planning-artifacts/prd.md` - FR11, FR25]

### Contract 1 — Input Mapping

The demo input resolves against a single hard-coded static lookup table defined as a JS literal constant inside the controller. No pattern matching, regex, wildcard, multi-code registry, fetch, async operation, or simulated search is permitted.

**Approved Phase 1 mapping (complete and final):**

| Input condition | Destination |
|---|---|
| Value equals the single approved example code (case-insensitive trim) | `/v/genuim/` |
| Example-code action activated | `/v/genuim/` |
| Any other non-empty value | `/v/` (no-data state) |
| Empty or whitespace-only value | `/v/` (no-data state) |

The approved example code value is `GM-GENUIM-2026` (matches the code already displayed in the canonical proof example at `/v/genuim/`). This value must be defined as a single named constant in the controller — never inlined in multiple places.

No new named routes (`/v/genu.alko/`, `/v/genu.cosm/`, etc.) are approved in this story. The mapping table has exactly two distinct destinations and must not grow in this story. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.3; `_bmad-output/planning-artifacts/prd.md` - FR11; `_bmad-output/planning-artifacts/ux-design-specification.md` - `/v/` Proof Hub]

### Contract 2 — Navigation

All navigation from the demo input must be standard full-page browser navigation. The following forms are all acceptable and equivalent:

```js
// Acceptable — full page navigation
window.location.href = '/v/genuim/';

// Acceptable — anchor link (preferred for example-code action)
<a href="/v/genuim/">See the genu.im proof example</a>

// Acceptable — form action (if input submitted as an HTML form)
window.location.href = destination; // inside submit handler after event.preventDefault()
```

The following are all **forbidden** regardless of intent:

| Forbidden pattern | Reason |
|---|---|
| `history.pushState()` / `history.replaceState()` | Manipulates URL without full page reload |
| Any SPA router (`React Router`, `Vue Router`, etc.) | Not part of this architecture |
| `fetch()` or `XMLHttpRequest` for code resolution | No async lookup allowed |
| In-page result rendering without navigation | Violates demo-notice persistence contract |
| `location.hash` routing | SPA-style pattern |

**The practical consequence:** After any input submission or example-code activation, the browser performs a full page load. The destination page renders from its static HTML. There is no in-page result rendering, no DOM mutation to display a result, and no back-button state to manage. [Source: `docs/project-contract.md` - Architecture Rule; `_bmad-output/project-context.md` - Architecture Context; `_bmad-output/planning-artifacts/architecture.md` - static-site model]

### Contract 3 — Demo-Label Persistence

The `proof-demo-banner` element must be visible from initial render on every non-live proof surface and must remain visible after any navigation action. [Source: `_bmad-output/planning-artifacts/prd.md` - FR12]

**How persistence is guaranteed (by design, not by JS):**

- `/v/` (`site/v/index.html`) already contains `<p class="proof-demo-banner" data-i18n="verification.demoNotice">` as static HTML — visible before any script runs.
- `/v/genuim/` (`site/v/genuim/index.html`) already contains the same static `proof-demo-banner` element — visible before any script runs.
- Because navigation is full-page (Contract 2), every destination page renders its own complete static HTML on load. The demo notice is therefore structurally guaranteed to appear on every result state without any JS involvement.

**What must not happen:**

| Forbidden | Why |
|---|---|
| Removing or conditionally hiding `proof-demo-banner` via JS | Breaks FR12 |
| Rendering `proof-demo-banner` only after navigation via JS insertion | Violates static-first contract and creates FOUC risk |
| Demo notice appearing only on `/v/` but not on `/v/genuim/` after navigation | PR12 applies to all non-live proof surfaces |

**Dev verification:** A Playwright test must assert that `proof-demo-banner` is visible on `/v/genuim/` after activating the example-code action from `/v/`. This supplements, not replaces, the existing test already asserting banner visibility on `/v/genuim/` directly. [Source: `_bmad-output/planning-artifacts/prd.md` - FR12; `tests/e2e/verification.spec.ts`]

### Current State of `site/v/index.html`

`site/v/index.html` currently renders the approved Story `2.2` no-data result state directly — there is no input field on the page. The page includes:
- `<main class="verification-page" data-proof-page>` — the proof-page controller root
- A `proof-demo-banner` paragraph already visible from initial render
- Two `data-proof-required="always"` sections (result card and guidance list)
- One `data-proof-required="always"` actions section with Diia and business CTAs
- Scripts: `lang-toggle.js`, `theme-toggle.js`, `verification-page.js`

Story `2.3` must **prepend** a demo-input section before the main content — it must not remove, replace, or restructure the existing no-data result display. After navigation from input submission, the visitor lands on the already-complete no-data result state. [Source: `site/v/index.html`; `_bmad-output/planning-artifacts/epics.md` - Story 2.3]

### Input Controller Architecture

Add a new minimal input controller, not an extension of `verification-page.js`. The existing `verification-page.js` owns proof-section gating and evidence synchronization — that scope must not grow. The new demo-input controller should be a separate small script (e.g. `site/assets/js/demo-input.js`) or optionally a small inline script on `site/v/index.html` only if the logic is trivial enough. Key constraints:

- No `DOMContentLoaded` wrapper (scripts are deferred; DOM is ready at execution time). [Source: `_bmad-output/project-context.md` - DOM Access and Initialization]
- Guard every DOM lookup: if the input or submit button is absent, return early without throwing.
- The approved mapping is a small literal constant — not a data structure fetched from anywhere.
- Use standard `form.addEventListener('submit', handler)` with `event.preventDefault()` to intercept and then set `window.location.href`.
- The example-code action may be implemented as a button that populates the input and immediately triggers navigation, or as a direct anchor link to `/v/genuim/` — prefer the simpler anchor link approach to avoid unnecessary JS.
- Wrap any `localStorage` access in `try/catch`. [Source: `_bmad-output/project-context.md` - Error Handling]

### UX Design Reference for `/v/` Input Surface

The approved UX spec describes three elements only: input, example-code action, DataMatrix ambient background. The demo banner sits above the input/result area. B2B CTA is placed after the result — never at the entry point. [Source: `_bmad-output/planning-artifacts/ux-design-specification.md` - `/v/` Proof Hub section]

The UX spec also calls for a minimalist aesthetic ("Google search level of minimalism + Jonny Ive atmosphere"), which means the input section should be clean, centered, and uncluttered. The implementation should use CSS for all layout and visual behavior — no JS layout control. [Source: `_bmad-output/planning-artifacts/ux-design-specification.md` - `/v/` Proof Hub; `_bmad-output/project-context.md` - Architectural preference]

The DataMatrix ambient glyph (`aria-hidden="true"`, decorative SVG or CSS-rendered, opacity `3–4%`) is called for in the UX spec but is non-blocking for story completion — it may be added as CSS background decoration if simple, or deferred as a separate task if complex.

### AC Gap: Empty and Invalid Input Handling

The planning readiness report flagged that Story `2.3` lacks an explicit invalid/empty-input AC. Rather than adding a new AC that could open scope, the agreed safe default is: submitting an empty or unrecognised code navigates to `/v/` (no-data state). This is a neutral, calm, non-error outcome — no red states, no "not found" wording, no validation theatrics. [Source: `_bmad-output/planning-artifacts/implementation-readiness-report-2026-03-11.md` - Minor Concerns; `_bmad-output/planning-artifacts/ux-design-specification.md` - Empty States; `docs/project-contract.md`]

The controller must not display inline error messages, spinner states, or loading indicators. All fallback behavior is the `/v/` no-data state itself.

### Translation Requirements

Add the following new `data-i18n` key groups to `site/assets/js/lang-toggle.js` (both `en` and `uk` maps) for the demo-input section:
- `demoInput.eyebrow` — section eyebrow above the input (e.g. "Try the demo")
- `demoInput.label` — visible `<label>` or accessible name for the input
- `demoInput.placeholder` — input placeholder text
- `demoInput.submitAria` — aria-label for the submit button
- `demoInput.exampleAction` — visible text of the example-code anchor/button
- `demoInput.exampleActionAria` — aria-label for the example-code action

Ukrainian copy must be idiomatic — not calqued from English. Keep language calm, factual, and in line with the platform tone. [Source: `_bmad-output/project-context.md` - i18n Patterns; `docs/project-contract.md` - Ukrainian Copy Rule]

### SEO / Head Contract

`/v/` is and must remain `noindex, nofollow`. No JSON-LD is required or permitted on this route. The `<title>` and `<meta name="description">` currently reflect the no-data proof example framing. After Story `2.3`, the page functions as both input surface and no-data result — update the title and description to reflect the input surface purpose (e.g. `Demo Input — genu.im`) while keeping the `noindex` directive intact. [Source: `_bmad-output/planning-artifacts/architecture.md` - sitemap priority scheme; `site/v/index.html`]

### Contract-First Implementation Brief

- **Story scope:** Convert `/v/` into the demo-input surface by adding an input section with one code field, one submit button, and one example-code anchor to the top of `site/v/index.html`. Implement a minimal controller that resolves only the approved two-state static mapping using standard browser navigation. Keep demo notice persistence guaranteed through static HTML on destination pages, not through JS state.
- **Explicitly out of scope:** No arbitrary-code resolution; no pattern matching; no multi-code registry; no fetch or async lookup; no loading states or spinners; no inline validation error messages; no SPA-style rendering; no `history.pushState`; no client-side routing; no Epic 3 request-flow semantics; no Epic 4 analytics instrumentation; no new named sample routes beyond `/v/genuim/`; no reopening of proof semantics in `site/v/genuim/index.html` or `site/v/index.html` no-data sections.
- **Files expected to change:**
  - `site/v/index.html` — add input section, update `<title>` and `<meta name="description">` for input-surface framing
  - `site/assets/js/lang-toggle.js` — add `demoInput.*` translation keys in both `en` and `uk` maps
  - `site/assets/js/demo-input.js` — new minimal controller (preferred) OR inline `<script defer>` on `site/v/index.html` (only if logic is trivially small and benefits from co-location)
  - `site/assets/css/input.css` — extend for demo-input section layout if needed; rebuild `site/assets/css/output.css`
  - `tests/verification-page.test.js` — add unit tests for demo-input controller logic (approved mapping, fail-soft init, example-code behavior)
  - `tests/e2e/verification.spec.ts` — add browser tests for `/v/` as input surface (first render, example-code navigation, pasted-code navigation, demo notice visibility, `360px` usability)
  - `tests/e2e/pages/verification.page.ts` — extend with `gotoInput()` helper and input-surface locators (`inputField`, `submitBtn`, `exampleCodeLink`)
- **Protected files — do not change:**
  - `site/v/genuim/index.html` — completed Story `2.1` and `2.4` contract; no touch unless a trivial shared-template consistency fix is strictly required
  - `site/assets/js/verification-page.js` — no scope expansion; proof-section gating behavior must not change
  - `site/index.html`, `site/assets/js/theme-toggle.js`, `site/assets/js/menu.js` — unrelated to this story
  - All Epic 1 pages and trust-floor pages
- **User-visible behavior that will change:** Visitors who open `/v/` now see an input field and an example-code action at the top of the page, above the existing no-data result display. Entering the approved example code or using the example-code action navigates to `/v/genuim/`. Entering any other code or submitting empty stays on `/v/` (no-data state).
- **Behavior that must remain unchanged:** The no-data result content currently on `/v/` remains intact below the new input section. Demo notice is present from initial render on both `/v/` and `/v/genuim/`. Product-positioning boundary (`genu.mark` vs `Diia`) is preserved. No live-check implication at any point. Static-site architecture and controller patterns unchanged.
- **Tests to add or update:**
  - Unit: controller init (fail-soft when input absent), approved-code mapping, example-code navigation trigger, empty-input fallback
  - Browser: `/v/` loads with visible input and example-code action; example-code action leads to `/v/genuim/`; approved code submission leads to `/v/genuim/`; unknown code submission stays on `/v/` with no error state; demo notice remains visible on both surfaces after navigation; `360px` usability; accessibility label checks on input and actions
  - Extend `VerificationPage` page object with `gotoInput()`, `inputField`, `submitBtn`, `exampleCodeLink` locators
- **Validation commands to run:**
  - `npm run build:css` if `input.css` changes
  - `npm run lint`
  - `npm run typecheck`
  - `npx jest tests/verification-page.test.js --runInBand` (or new `demo-input.test.js` if controller is a new file)
  - `npx playwright test tests/e2e/verification.spec.ts --config=playwright.config.ts`
  - Broader regression if shared controls are touched: `npx playwright test --config=playwright.config.ts`

### Operational Dev-Ready Checklist

#### Target Files

- Primary delivery files:
  - `site/v/index.html`
  - `site/assets/js/demo-input.js` (new controller — preferred)
  - `site/assets/css/input.css` and `site/assets/css/output.css`
- Translation touchpoint:
  - `site/assets/js/lang-toggle.js`
- Test surfaces:
  - `tests/verification-page.test.js` or new `tests/demo-input.test.js`
  - `tests/e2e/verification.spec.ts`
  - `tests/e2e/pages/verification.page.ts`

#### Implementation Task Sequence

1. Extend `VerificationPage` page object with `gotoInput()`, `inputField`, `submitBtn`, `exampleCodeLink`.
2. Add failing browser tests for the demo-input surface (TDD entry point).
3. Add the demo-input section HTML to `site/v/index.html`; update `<title>` and `<meta name="description">`.
4. Add `demoInput.*` translation keys to `site/assets/js/lang-toggle.js`.
5. Create `site/assets/js/demo-input.js` with the minimal approved-mapping controller.
6. Extend `site/assets/css/input.css` for the input section layout; rebuild `site/assets/css/output.css`.
7. Add unit tests for the new controller.
8. Run full validation sequence.

#### Required Tests

- Unit tests must cover:
  - Fail-soft init when input DOM is absent — controller must not throw
  - Submit with approved example code → `window.location.href` set to `/v/genuim/`
  - Submit with unknown code → `window.location.href` set to `/v/`
  - Submit with empty value → `window.location.href` set to `/v/`
  - Example-code action populates or directly navigates — the chosen behavior is testable
- Browser tests must cover:
  - `/v/` loads with visible input field, submit control, and example-code action
  - Demo notice (`proof-demo-banner`) is visible from initial render on `/v/`
  - Example-code action leads to `/v/genuim/`
  - Demo notice is still visible on `/v/genuim/` after navigation (static, no JS involvement)
  - Input and controls are usable at `360px` without broken structure or horizontal scroll
  - Accessibility: input has a label, submit and example-code action have aria names
  - No-data result content remains intact below input section
  - Existing no-data test (`no-data proof example stays neutral`) continues to pass

#### Explicit Out-of-Scope Boundaries

- Do not implement or simulate a real-time lookup, async fetch, loading spinner, or server-side code resolution.
- Do not add `history.pushState`, client-side routing, or SPA-style result rendering.
- Do not introduce new named sample routes (no `/v/genu.alko`, `/v/genu.cosm`, etc.).
- Do not extend `verification-page.js` with input-handling logic — keep controllers separate.
- Do not open the proof-semantics of `site/v/genuim/index.html` or the no-data sections of `site/v/index.html`.
- Do not add Epic 3 request-flow behavior (scenario prefill, form metadata capture, `mailto:` handoff).
- Do not add Epic 4 analytics or funnel instrumentation.

### Forbidden Copy / Semantic Patterns

The demo-input surface must not contain wording or semantic patterns that imply:
- Live lookup, real-time verification, or official state checking
- "Code verified", "Code registered", "Code found" as confirmation states
- "Not found", "Invalid code", "Error" as negative states (the fallback is always the neutral no-data state)
- Loading ("Checking...", "Searching...") — there is no async operation
- Authenticity confirmation or official result

Acceptable wording examples (adapt to final copy):
- EN: "Enter a code or try the example" / "See a demo result"
- UK: "Введіть код або спробуйте приклад" / "Переглянути демо-результат"

### Negative Checks (Review Gate)

- Assert no wording equivalent to "verified", "live lookup", "official result", "code found", "code not found", "checking", or "loading" appears on `/v/` unless explicitly bounded as demo/example labeling.
- Assert no `fetch()`, `XMLHttpRequest`, `async/await` for code resolution appears in the new controller.
- Assert no `history.pushState`, `history.replaceState`, or framework router calls appear.
- Assert the `proof-demo-banner` is visible on `/v/` before and after input interaction.
- Assert the `proof-demo-banner` is visible on `/v/genuim/` after example-code navigation (already covered by existing spec — do not regress).
- Assert `site/v/genuim/index.html` is not modified for this story (no proof-semantics bleed).

### Project Structure Notes

- New controller file `site/assets/js/demo-input.js` should follow the flat IIFE-or-function pattern established by `verification-page.js`, `theme-toggle.js`, and `lang-toggle.js`. Use `const`/`let`, arrow functions, and camelCase naming. [Source: `_bmad-output/project-context.md` - Code Style; `_bmad-output/planning-artifacts/architecture.md` - Source Organization]
- If the controller exports a testable function, add a `if (typeof module !== 'undefined') { module.exports = {...}; }` guard at the bottom of the file, consistent with the existing `verification-page.js` export pattern. [Source: `site/assets/js/verification-page.js`]
- The `VerificationPage` page object in `tests/e2e/pages/verification.page.ts` is the shared proof-surface helper. Extend it with new input-surface locators rather than creating a parallel page object. [Source: `tests/e2e/pages/verification.page.ts`]
- `site/assets/css/output.css` is a committed production artifact. If `input.css` changes, `output.css` must be rebuilt and committed. Never `git rm --cached` it. [Source: `_bmad-output/project-context.md` - CRITICAL: output.css]

### Project Contract Guardrails

- Preserve the current static-site architecture unless the story explicitly changes it.
- Preserve product positioning: brand publishes proof via `genu.mark`; official state verification happens in `Diia`.
- Avoid misleading claims not supported by the story; no wording that implies live lookup, official result, or authenticity confirmation.
- Preserve semantic HTML, accessibility alignment (labels, aria-names, keyboard usability, `44×44px` touch targets), responsive integrity, CTA clarity, and translation quality.
- Demo notice must remain visible after navigation — this is guaranteed by static HTML on destination pages, not by JS state management.

### References

- `_bmad-output/planning-artifacts/epics.md` — Epic 2, Story 2.3 acceptance criteria and FR coverage (FR11, FR12, FR25).
- `_bmad-output/planning-artifacts/prd.md` — FR11 (demo input), FR12 (persistent demo notice), FR25 (shareable links without login), NFR16 (responsive widths), NFR10 (zero official-state claims).
- `_bmad-output/planning-artifacts/architecture.md` — static-site route model, controller pattern, no client-side routing, `/v/` noindex directive.
- `_bmad-output/planning-artifacts/ux-design-specification.md` — `/v/` Proof Hub three-element design (input, example-code action, DataMatrix ambient); demo banner placement; empty states; mobile-first approach; touch target requirements.
- `_bmad-output/project-context.md` — DOM-first controller rules, defer-script init, fail-soft guards, `localStorage` try/catch, Tailwind v4 CSS-first config, i18n inline-map pattern, output.css commit requirement, Playwright/Jest test boundaries.
- `docs/project-contract.md` — Misleading Claims Rule; Product Positioning Rule; Ukrainian Copy Rule; CTA Rule; Code Review Rules; Test Coverage Rule.
- `_bmad-output/planning-artifacts/implementation-readiness-report-2026-03-11.md` — Minor Concern: Story 2.3 missing invalid-input AC; agreed safe default is neutral `/v/` fallback, no error state.
- `_bmad-output/implementation-artifacts/2-1-show-the-main-verification-example.md` — completed `/v/genuim/` contract; Story 2.3 navigates to it as a destination only.
- `_bmad-output/implementation-artifacts/2-2-show-a-clear-no-data-result.md` — completed no-data state on `/v/`; Story 2.3 preserves it and adds input surface above it.
- `_bmad-output/implementation-artifacts/2-4-show-only-supported-proof-content.md` — proof-content gating rules; `verification-page.js` scope boundary.
- `site/v/index.html` — current no-data state markup and script dependencies; full understanding required before modifying.
- `site/assets/js/verification-page.js` — existing proof-section gating controller; must not be extended with input-handling scope.
- `tests/e2e/verification.spec.ts` — existing proof-surface spec; Story 2.3 extends, not replaces, this spec.
- `tests/e2e/pages/verification.page.ts` — shared page object to extend with input-surface locators.

## Dev Agent Record

### Agent Model Used

_To be filled by dev agent during dev-story execution._

### Debug Log References

_To be filled by dev agent._

### Completion Notes List

_To be filled by dev agent._

### File List

_To be filled by dev agent._

## Change Log

- 2026-03-13: Story `2.3` created. Proof-layer slice (Stories 2.1, 2.2, 2.4) cleared. Demo-input package scoped strictly to `/v/` input surface with three explicit contracts: input mapping (static two-state lookup, `GM-GENUIM-2026` → `/v/genuim/`, fallback → `/v/`), navigation (standard full-page browser navigation only, no SPA patterns), and demo-label persistence (guaranteed by static HTML on destination pages, not by JS).
