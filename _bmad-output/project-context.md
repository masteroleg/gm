---
project_name: gm
user_name: GenuIm
date: '2026-03-09'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
existing_patterns_found: 17
status: 'complete'
rule_count: 195
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | ^4.2.1 | Styling with CSS-first Tailwind v4 config |
| Jest | ^30.2.0 | Unit testing with JSDOM |
| Playwright | ^1.58.2 | E2E, smoke, mobile, and regression testing |
| Biome | ^2.4.6 | Linting and formatting |
| TypeScript | ^5.9.3 | Type-checking for tooling and tests |
| Husky | ^9.1.7 | Local git hooks |
| Lighthouse | ^13.0.3 | Performance, accessibility, best-practices, and SEO audits |
| http-server | ^14.1.1 | Static local dev/E2E server |

### Critical Version Notes

- Tailwind is v4 and must use `@import "tailwindcss"`; never use legacy `@tailwind` directives.
- Tailwind customization is CSS-first via `@theme`, `@custom-variant`, and design tokens in `site/assets/css/input.css`.
- Jest is configured inline in `package.json`, not in a separate config file.
- TypeScript runs with `strict: true` for configured TS tooling and Playwright test files.
- Playwright uses one shared config with desktop and mobile projects from `playwright.config.ts`.
- Lighthouse is part of the local quality toolchain and is used to validate user-facing regressions for both mobile and desktop.

### Architecture Context

- The app is a static site published from `site/`, not from the repository root.
- HTML, CSS, and JS ship as static assets; there is no bundler, SSR layer, SPA runtime, or framework hydration lifecycle.
- Frontend behavior is implemented as direct DOM controllers attached to static markup.
- Treat this as a DOM-first static site architecture; do not introduce framework-era abstractions unless the architecture explicitly changes.

### Runtime / Delivery Context

- Production is GitHub Pages; there is no runtime build step on deploy.
- `site/assets/css/output.css` is a committed production artifact and must stay in git.
- Browser preferences such as theme and language are client-side concerns; keep persistence lightweight, local-first, and browser-native unless deployment architecture changes.
- Initial render consistency matters: early theme/lang application affects FOUC, mixed-language flash, Lighthouse scores, and visual test stability.

### Testing Runtime Assumptions

- Playwright starts the local web server from config; tests should use configured `baseURL` flow, not custom ad hoc server bootstrapping.
- Playwright intentionally fixes `colorScheme: "light"` by default to reduce environment-driven flakiness.
- Mobile validation is first-class: smoke and full E2E include mobile browser projects, not desktop-only coverage.
- Extend the existing page-object helper pattern in `tests/e2e/pages/` instead of duplicating low-level selectors across specs.

### Testing Boundaries

- Jest + JSDOM: controller logic, DOM state sync, accessibility attributes, missing-DOM guards, translation/state helpers, and storage failure handling.
- Playwright: persisted preferences across reload, smoke journeys, CSS application, mobile responsiveness, and browser-level rendering behavior.
- Do not rely on Jest for reload persistence or browser-render fidelity that is only trustworthy in a real browser.
- New frontend controllers must have layered coverage: unit tests for state/DOM logic and browser tests for critical persisted or user-visible flows.

### Key Scripts

- `npm run dev` — Tailwind watch mode
- `npm run build:css` — production CSS build
- `npm test` — Jest unit suite
- `npm run test:smoke` — fast Chromium smoke checks
- `npm run test:smoke:mobile` — mobile smoke checks
- `npm run test:e2e` — full Playwright E2E suite
- `npm run lint` — Biome checks
- `npm run typecheck` — `tsc --noEmit`
- `npm run test:ci` — lint + typecheck + Jest + Playwright CI flow

---

## Critical Implementation Rules

### JavaScript Rules

**Error Handling:**
- Wrap `localStorage` access in `try/catch`; private browsing and restricted storage can throw.
- Use `console.error()` for actual failures and `console.warn()` only for recoverable/non-blocking conditions.
- Frontend controllers must fail soft when optional DOM or storage is unavailable; do not crash page initialization.

**DOM Access and Initialization:**
- Scripts are loaded with `defer`, so DOM is already parsed when controller files execute.
- Do not add `DOMContentLoaded` wrappers unless script loading strategy changes.
- Guard every DOM lookup before use: if a controller's required node set is missing, return early without throwing.
- Prefer small controller functions such as `syncState()`, `bindEvents()`, and `apply*()` over large immediately-invoked blocks.

**State and Preference Patterns:**
- Separate persisted user preference from resolved runtime UI state.
- For theme logic, do not persist an auto-resolved theme as if it were an explicit user override.
- Browser preferences should remain local-first and lightweight; avoid introducing cookies, server sessions, or complex client storage for simple UI preferences.
- Initial document state in `<head>` must align with later controller application to avoid FOUC, mixed-language flash, and unnecessary rerendering.

**i18n Patterns:**
- Do not hardcode user-visible text in JavaScript.
- Use translation maps with `translations[lang][key]` and `data-i18n`-driven DOM updates.
- Translate accessibility text too: `aria-label`, stateful labels, and any UI copy changed by controllers must come from the translation source.
- HTML fallback copy must stay aligned with the default language/render path to avoid mismatched first paint.

**Module / Tooling Compatibility:**
- Keep browser scripts compatible with Jest-based loading patterns used in `tests/*.test.js`.
- When a script executes on require/import, tests should use `jest.resetModules()` before loading it.
- Commit-message automation in `scripts/generate-commit-msg.cjs` must degrade safely to local fallback behavior if OpenCode session reuse or model lookup fails; commit creation must not break.
- Helper scripts used by hooks/CI should stay shell-safe and deterministic; do not make local commit/push flow depend on network-only behavior.
- Prefer exportable helpers for non-trivial logic where that improves unit test coverage without changing runtime behavior.

**Code Style:**
- Use `const`/`let`, arrow functions, and template literals consistently.
- Use camelCase for variables/functions and kebab-case for file names.
- Add comments only when a block is genuinely non-obvious; avoid restating simple DOM operations.

### Frontend Architecture Rules

**Controller Pattern:**
- Implement frontend behavior as small DOM-first controllers bound to existing static markup.
- Prefer one responsibility per script/controller (theme, language, menu, etc.) instead of large shared UI runtimes.
- Keep selectors and state updates close to the controller that owns them.

**Markup Contract:**
- Treat HTML structure, IDs, `data-i18n`, and accessibility attributes as part of the controller contract.
- When changing controller behavior, update the related static markup and tests together.
- Avoid introducing markup requirements that are hard to infer from the HTML alone.

**State Synchronization:**
- Keep DOM state, accessibility state, and persisted preference state synchronized.
- If UI state changes visually, update the corresponding `aria-*` or semantic attributes in the same flow.
- Initial inline `<head>` state and deferred controller-applied state must remain consistent.

**Static-Site Boundaries:**
- Do not add client-side routing, framework hydration hooks, or build-time-only assumptions to page logic.
- Do not move simple browser preferences to network-backed or server-managed flows without an architectural reason.
- Favor browser-native APIs and progressive enhancement over framework-like abstractions.

**i18n and Content Delivery:**
- Keep translations inline in JavaScript; do not introduce separate JSON translation fetches for this architecture unless the architecture changes.
- Prefer updating existing DOM nodes via `data-i18n` keys over regenerating large DOM sections.
- Preserve meaningful HTML fallback content for first render.

### Testing Rules

**Test Organization:**
- Unit tests: `tests/*.test.js` (Jest + JSDOM)
- E2E tests: `tests/e2e/*.spec.js` (Playwright)
- Manual checks: `tests/manual-*.js` (NOT run via `npm test`)
- Setup file: `tests/setup.js` for global mocks

**Jest Patterns:**
- Use `beforeEach()` to set up DOM with `document.body.innerHTML`
- Call `jest.resetModules()` before `require()` for immediately-invoked scripts
- Global mocks in `tests/setup.js` — don't duplicate in test files
- Run coverage: `npm test -- --coverage`

**Playwright Patterns:**
- Use `test.beforeEach()` with `page.goto('/')`
- Always `await` Playwright operations
- Use `page.locator()` for element selection
- Extend the existing page-object pattern in `tests/e2e/pages/`
- Requires local server: `npm start` before `npm run test:e2e`
- Playwright config intentionally separates desktop and mobile projects and allows project filtering via `PW_PROJECT`

**Smoke vs Full Regression:**
- `@smoke` means fast critical-path coverage suitable for local pre-push and push CI
- Every new critical user flow should add at least one `@smoke` test when practical
- Push CI runs smoke coverage only; full cross-browser regression is reserved for PR/manual/nightly workflows
- Do not put every browser assertion into smoke scope; keep smoke lean and focused on survival-critical paths

**Test Boundaries:**
- Jest: DOM logic, class toggles, aria attributes, state changes, translation updates, missing-DOM guards, and storage failure handling
- Playwright: localStorage persistence after reload, responsive design, CSS loading, and visual/browser rendering
- Do not test browser reload persistence in Jest when the real requirement is browser behavior
- Smoke tests prove app survival, not full regression depth

**Coverage Width Requirements:**
- Every frontend controller must have unit coverage for its primary state transitions and DOM synchronization behavior
- Controllers that update accessibility attributes must have tests for `aria-*` state synchronization
- Controllers that use storage must have tests for both normal reads/writes and storage failure fallbacks
- Controllers that can run on partial page markup must have tests proving they fail soft when required nodes are absent
- Preference, navigation, accessibility, and initial-render controllers are priority coverage zones and must not be left with smoke-only coverage
- As the site grows, add tests per controller/module and per critical flow; do not rely on one broad smoke test or one catch-all unit spec to cover expanding UI logic

**Layered Coverage Policy:**
- Critical user-visible flows must be covered at the lowest useful level first, then promoted to Playwright when reload, CSS, layout, or browser behavior matters
- Prefer unit tests for logic density and E2E tests for integration confidence; do not push all coverage upward into slower browser suites
- New persisted preference flows should usually have both Jest coverage for logic and Playwright coverage for reload persistence
- When a controller contract changes, update markup, tests, and related docs together

**Lighthouse Validation:**
- Lighthouse is part of the quality-validation layer for user-facing changes, especially layout, hero/media, navigation, theme/lang bootstrap, and accessibility state changes
- Use `npm run lighthouse`, `npm run lighthouse:mobile`, `npm run lighthouse:desktop`, or `npm run lighthouse:ci` depending on scope
- Treat accepted Lighthouse baseline regressions as implementation issues to fix before push when reproducible locally

**TDD Approach:**
- New features: write test first, then code
- Bug fixes: write reproducing test first
- All tests must pass before marking story complete

### Code Quality & Style Rules

**Naming Conventions:**
- Variables/Functions: camelCase (`themeToggle`, `setTheme`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- DOM IDs: camelCase (`themeToggle`, `langLabel`)
- CSS classes: kebab-case (`main-nav__link`)
- CSS variables: `--color-*`, `--brand-*`, `--card-*`
- JS files: kebab-case (`theme-toggle.js`)

**HTML and DOM Contract:**
- Use semantic HTML5 elements (`<header>`, `<main>`, `<nav>`, `<footer>`)
- Include accessibility attributes (`aria-label`, `aria-expanded`, `aria-pressed`, `role`, `tabindex`) where behavior requires them
- Keep accessibility and i18n attributes synchronized with visible UI state in the same update flow
- Use `data-i18n` attributes for translatable content: `data-i18n="key.subkey"`
- Treat IDs, `data-i18n`, and behavior-driving attributes as stable controller contracts and testable interfaces, not casual markup details
- Decorative SVGs must use `aria-hidden="true"`
- Critical images: `loading="eager"`; below-fold images: `loading="lazy"`
- Indent HTML with tabs

**Project Structure Rules:**
- Treat `site/` as the only published application surface; do not place production site code in the repository root.
- Keep HTML entry points in `site/` and related static routes under their own subdirectories inside `site/`.
- Keep browser controllers in `site/assets/js/`, styles in `site/assets/css/`, and static assets in the corresponding `site/assets/*` folders.
- Treat `site/assets/css/input.css` as the source stylesheet and `site/assets/css/output.css` as the committed production artifact.
- Keep unit tests in `tests/`, browser specs in `tests/e2e/`, and shared Playwright page objects in `tests/e2e/pages/`.
- Put repository automation and quality scripts in `scripts/`; do not mix them into `site/assets/js/`.
- Treat `_bmad/`, `_bmad-output/`, and most of `docs/` as project-system/documentation zones, not as the published site.

**Tailwind CSS v4 Contract:**
- Use `@import "tailwindcss"` (NOT legacy `@tailwind` directives)
- Content sources: `@source "../**/*.html"` and `@source not "../exclude"`
- Custom dark variant: `@custom-variant dark (&:where(.dark, .dark *))`
- Theme tokens belong in `@theme`
- Prefer utility-first implementation; add custom CSS only for tokens, reusable patterns, or cases Tailwind cannot express cleanly
- Before adding bespoke CSS, check whether the same result can be expressed more cleanly with existing Tailwind utilities, variants, tokens, or markup structure
- Check idiomatic Tailwind v4 best practice before introducing complex custom styling

**Theme and Token Rules:**
- Define theme colors in `:root` (light) and `.dark` (dark)
- Brand color: `#0d8a4f` (light), `#00e676` (dark)
- Access theme values through CSS variables and Tailwind tokens
- Dark mode is controlled by adding `.dark` to `<html>`
- Prevent FOUC by applying theme state in `<head>` before CSS
- Keep `data-theme` and other test/accessibility hooks aligned with actual theme state

**Comments and Documentation:**
- Add comments only when logic is non-obvious or protecting against a known regression
- Prefer clear naming and small functions over explanatory comments
- Update related docs when a controller contract or project rule changes

**Quality Constraints:**
- Changes must preserve or improve Lighthouse outcomes across Performance, Accessibility, Best Practices, and SEO
- Build and validate UI mobile-first, making layout, touch-target, and interaction decisions for the smallest viewport before scaling up
- Initial render and controller-applied render must remain semantically and visually aligned
- Avoid extra render passes, unnecessary first-paint DOM rewrites, mixed-language first paint, broken accessibility state, unnecessary render-blocking behavior, or degraded mobile usability
- Preserve the established visual language and interaction patterns of an existing page unless the task is an intentional redesign
- Extend existing spacing, typography, color-token, and interaction patterns where a page already establishes them
- Keep interactive controls keyboard-focusable, visibly focusable, and usable on touch devices

**Editing Constraints:**
- Use ASCII by default when editing or creating files unless the file already requires non-ASCII content
- Keep diffs lean and avoid unnecessary formatting churn

**File Organization:**
- Static assets in `assets/` (css, js, img, favicon)
- Tests in `tests/` (unit) and `tests/e2e/` (E2E)
- Do not commit `node_modules/`

### Development Workflow Rules

**Before Marking Story Complete:**
- All tests pass (`npm test`)
- CSS built if modified (`npm run build:css`)
- No hardcoded text — use `data-i18n` attributes
- If controller contracts or project rules changed, update related docs as part of done

**Git Workflow:**
- Daily work happens directly on `main`; do not use `work` as the normal delivery branch anymore.
- Husky runs `npm run build:css` on pre-commit automatically when `site/assets/css/input.css` changes.
- `output.css` IS committed (required for GitHub Pages deployment)
- Commit message: Conventional format (`feat:`, `fix:`, `docs:`)
- Husky v9 format: `#!/bin/sh` without `_/husky.sh` bootstrap
- Commit-message automation in `.husky/prepare-commit-msg` is allowed, but commit creation must still succeed if AI generation falls back to local logic.

**Deployment Context:**
- Current delivery target is static HTML on GitHub Pages
- There is no HTML/JS build step on deploy
- Do not introduce server-side code, authentication, backend-managed state, or runtime-backed persistence unless the architecture explicitly changes
- Do not move simple browser preferences to backend-managed flows without an explicit architectural reason

**Verification Flow:**
- Use `npm run lint` for Biome checks
- Use `npm run typecheck` for TS verification
- Use `npm test` for controller/unit validation
- Use smoke/E2E runs when changes affect persisted preferences, initial render behavior, mobile navigation, CSS delivery, accessibility state transitions, or browser behavior
- Use `npm run test:ci` when full local confidence is needed across lint, typecheck, unit, and browser coverage
- Prefer a verification ladder of lint -> typecheck -> unit -> browser tests -> Lighthouse as change impact increases

**CI / Deploy Flow:**
- Normal developer flow is `Commit -> Sync -> push to main -> GitHub CI -> deploy`.
- `Site CI` runs only for site-impacting changes.
- `Infra Checks` runs only for workflow/hook/helper-script changes.
- `docs/BMAD-only` changes should not trigger site CI or deploy.
- `deploy-pages` runs only from `main` and only after successful site pipeline checks.

**Release / Versioning Rules:**
- Use git tags and GitHub Releases to mark meaningful public site versions.
- `1.0` is the first compact published version of the site before the large landing-page redesign.
- `2.0` is the current large landing-page version.
- `2.1` is the current Phase 1 delivery release scope and consists of Epics 1-4 defined in `_bmad-output/planning-artifacts/epics.md`.
- Treat major site milestones as releases; do not create a release for every small fix.
- Create the git tag and GitHub Release `2.1` after the Epic 1-4 scope is complete and release validation passes.
- Future version numbering principles should evolve from these anchored release points rather than from arbitrary commit counts.

**Change Management:**
- When changing controller contracts, update markup, tests, and docs together
- Keep changes aligned with the current static-site architecture unless the architecture explicitly changes first
- Preserve deployability and existing user-visible stability while iterating

### Critical Don't-Miss Rules

**Anti-Patterns to Avoid:**
- Using `@tailwind` directives (use `@import "tailwindcss"` for v4)
- Hardcoding text in JavaScript (use `data-i18n` attributes)
- Accessing `localStorage` without try/catch (throws in private browsing)
- Adding server-side code, authentication, or backend-managed state before the architecture explicitly changes
- Using `#00A95C` brand color (outdated — use `#0d8a4f` light / `#00e676` dark)

**Workflow / Release Mistakes:**
- Do not reintroduce `work` as the normal delivery branch; the active solo flow is `main`-only.
- Do not make `prepare-commit-msg` or commit creation depend on mandatory network/AI availability.
- Do not broaden site CI triggers to BMAD/docs-only changes without a clear reason.
- Do not create GitHub Releases for every small fix; reserve releases for meaningful site milestones.

**Accessibility Requirements (WCAG 2.1 AA):**
- All decorative SVGs: `aria-hidden="true"`
- Color contrast: ≥ 4.5:1 for body text, ≥ 3:1 for large text
- Touch targets: ≥ 44×44px on mobile
- Focus ring visible on all interactive elements
- Lighthouse Accessibility score ≥ 90

**Performance Requirements:**
- LCP < 2.5 seconds
- CLS < 0.1
- Lighthouse Performance ≥ 95
- Zero render-blocking resources (JS deferred, CSS non-blocking)
- Page size < 500KB uncompressed

**Common Mistakes:**
- Using `DOMContentLoaded` with deferred scripts (redundant)
- Testing localStorage persistence in Jest (use Playwright for reload tests)
- Missing `aria-hidden="true"` on decorative SVGs
- Creating separate JSON translation files (translations are inline in JS)
- Removing `site/assets/css/output.css` from git tracking
- Relying on smoke-only coverage for critical preference, accessibility, or initial-render logic

**CRITICAL: output.css:**
- `site/assets/css/output.css` MUST stay in git tracking
- GitHub Pages has no build step — CSS must be committed
- NEVER run `git rm --cached site/assets/css/output.css`
- E2E test `CSS is loaded and applied` catches this regression

**Edge Cases:**
- Dark mode: head-applied theme state must match deferred controller state to prevent FOUC
- Theme preference: separate persisted user preference from resolved runtime theme
- Theme preference: check both localStorage AND system preference
- i18n: fallback language is HTML `lang` attribute and must align with first render
- Private browsing: localStorage throws — always wrap in try/catch

---

## Permanent Project Contract

_These rules apply to ALL BMAD dev-story and code-review workflows. They override ad-hoc stylistic choices by agents._

Authoritative source: `docs/project-contract.md`

Use that file as the durable contract for:

- delivery discipline and contract-first execution
- architecture and controller-boundary rules
- HTML, accessibility, and responsive implementation constraints
- copy, translation, CTA, and product-positioning rules
- code-review expectations and finding severity
- critical test coverage and story execution sequence

When implementing or reviewing, read `docs/project-contract.md` together with this file and follow the more restrictive rule when guidance overlaps.

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**
- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

**Last Updated:** 2026-03-12

<!-- Knowledge Fragments: See _bmad-output/knowledge/ for detailed patterns -->
<!-- ADRs: See _bmad-output/solutioning/adrs/ for architectural decisions -->
