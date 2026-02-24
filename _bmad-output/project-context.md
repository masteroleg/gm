---
project_name: gm
user_name: GenuIm
date: '2026-02-21'
sections_completed: ['technology_stack', 'language_rules', 'testing_rules', 'code_quality_style', 'workflow_rules', 'critical_rules']
existing_patterns_found: 25
status: 'complete'
rule_count: 45
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | v4.2.0 | Styling (NEW CLI syntax, CSS-based config) |
| Jest | v19.0.2 | Unit testing with JSDOM |
| Playwright | v1.58.2 | E2E browser testing |
| Husky | v9.1.7 | Git hooks |
| serve | v14.2.5 | Local dev server |

### Critical Version Notes

- **Tailwind v4**: Uses `@import "tailwindcss"` in CSS, NOT old `@tailwind` directives
- **Tailwind CLI**: `npx tailwindcss -i ./input.css -o ./output.css` syntax
- **Node.js**: >=14 required for Tailwind v4

### Testing Boundaries

- **Jest + JSDOM**: DOM manipulation tests (no real browser)
- **Playwright**: Real browser E2E tests (visual, network, multi-browser)
- **Setup**: `tests/setup.js` for global Jest configuration

### Scripts

- `npm run dev` — Tailwind watch mode
- `npm run build:css` — Production CSS minification
- `npm start` — Local server on port 3000
- `npm test` — Jest unit tests
- `npm run test:e2e` — Playwright E2E tests

---

## Critical Implementation Rules

### JavaScript Rules

**Error Handling:**
- Wrap `localStorage` operations in try/catch (private browsing throws)
- Use `console.error()` for errors, `console.warn()` for non-critical issues

**DOM Access:**
- Check element existence before use: `if (!element) return;`
- Scripts use `defer` attribute — DOM is ready when script executes
- No need for `DOMContentLoaded` if script is deferred

**Accessibility:**
- All interactive elements need `aria-label`
- Toggle buttons need `aria-pressed` state
- Update labels when state changes

**i18n Pattern:**
- Use `data-i18n` attributes for translatable text
- Translation object: `translations[lang][key]`
- Don't hardcode user-visible text in JavaScript

**Code Style:**
- ES6+ syntax: `const`/`let`, arrow functions, template literals
- `'use strict'` at file top (optional with ES6 modules)
- CommonJS exports for Jest compatibility

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
- Requires local server: `npm start` before `npm run test:e2e`

**Test Boundaries:**
- Jest: DOM logic, class toggles, aria attributes, state changes
- Playwright: localStorage persistence after reload, responsive design, CSS loading, visual rendering

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

**HTML Style:**
- Use semantic HTML5 elements (`<header>`, `<main>`, `<nav>`, `<footer>`)
- Include accessibility attributes (`aria-label`, `role`, `tabindex`)
- Decorative SVG: `aria-hidden="true"`
- Use `data-i18n` attributes for i18n: `data-i18n="key.subkey"`
- Critical images: `loading="eager"`, below-fold: `loading="lazy"`
- Indent with tabs

**Tailwind CSS v4 Specifics:**
- Use `@import "tailwindcss"` (NOT old `@tailwind` directives)
- Content sources: `@source "../**/*.html"` and `@source not "../exclude"`
- Custom dark variant: `@custom-variant dark (&:where(.dark, .dark *))`
- Theme config: `@theme { --font-sans: ...; }`
- Custom utilities: `@utilities { .text-brand { ... } }`
- Utility-first — add custom CSS only when Tailwind can't do it

**CSS Variables Pattern:**
- Define theme colors in `:root` (light) and `.dark` (dark)
- Brand color: `#0d8a4f` (light), `#00e676` (dark)
- Access via `var(--color-brand)` in CSS and Tailwind

**Dark Mode Implementation:**
- Add `.dark` class to `<html>` element
- FOUC prevention: theme script in `<head>` BEFORE CSS
- Use `dark:` prefix in Tailwind classes
- Update `data-theme` attribute for CSS hooks and tests

**File Organization:**
- Static assets in `assets/` (css, js, img, favicon)
- Tests in `tests/` (unit) and `tests/e2e/` (E2E)
- Don't commit `node_modules/`

### Development Workflow Rules

**Before Marking Story Complete:**
- All tests pass (`npm test`)
- CSS built if modified (`npm run build:css`)
- No hardcoded text — use `data-i18n` attributes

**Git Workflow:**
- Husky runs `npm run build:css` on pre-commit automatically
- `output.css` IS committed (required for GitHub Pages deployment)
- Commit message: Conventional format (feat:, fix:, docs:)
- Husky v9 format: `#!/bin/sh` without `_/husky.sh` (see knowledge fragments)

**Deployment Context:**
- Epic 1-2: Static HTML → GitHub Pages
- Epic 3: SPA + Azure AD → Azure Static Web Apps
- Check PRD before adding server-side code or authentication

**Environment Notes:**
- No build step for HTML/JS (static files)
- Tailwind v4 uses new CLI syntax
- Node.js >=14 required

### Critical Don't-Miss Rules

**Anti-Patterns to Avoid:**
- Using `@tailwind` directives (use `@import "tailwindcss"` for v4)
- Hardcoding text in JavaScript (use `data-i18n` attributes)
- Accessing `localStorage` without try/catch (throws in private browsing)
- Adding server-side code or authentication before Epic 3
- Using `#00A95C` brand color (outdated — use `#0d8a4f` light / `#00e676` dark)

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
- **Removing `output.css` from git tracking** — will break production (see ADR-001)

**CRITICAL: output.css:**
- `assets/css/output.css` MUST stay in git tracking
- GitHub Pages has no build step — CSS must be committed
- NEVER run `git rm --cached assets/css/output.css`
- E2E test `CSS is loaded and applied` catches this regression

**Edge Cases:**
- Dark mode: script must run BEFORE CSS loads (FOUC prevention)
- Theme preference: check both localStorage AND system preference
- i18n: fallback language is HTML `lang` attribute
- Private browsing: localStorage throws — always wrap in try/catch

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

**Last Updated:** 2026-02-21

<!-- Knowledge Fragments: See _bmad-output/knowledge/ for detailed patterns -->
<!-- ADRs: See _bmad-output/solutioning/adrs/ for architectural decisions -->
