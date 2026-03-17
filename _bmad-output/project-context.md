---
# Project Context — genu.im

## Technology Stack & Versions
- [Fill from the actual project: framework, language, package manager, test stack, CSS toolchain, deploy target]
- Published application surface is `site/`
- Styling source is `site/assets/css/input.css`
- Committed production CSS artifact is `site/assets/css/output.css`
- Static site deployment target is GitHub Pages
- There is no HTML/JS build step on deploy

## Critical Implementation Rules

### Brownfield / Delivery Context
- This is an existing brownfield website.
- Primary market is Ukraine.
- UA-first. EN is secondary.
- Mobile-priority, desktop-mandatory.
- Use the audit findings register as the remediation source of truth:
  `docs/audits/genu.im-1/02_findings_register.md`
- Keep founder-track items outside the defect-fix queue.
- Do not introduce new partner, authority, or ecosystem claims without founder approval.
- Do not start founder-track work before verified P1 fixes are complete.

### Product / Trust Boundary
- Preserve the trust boundary between brand-layer proof and official state verification.
- Do not remove proof disclaimers entirely; simplify or consolidate them only when explicitly required by the approved remediation brief.
- Do not introduce wording that makes demo/example pages sound like live official verification.
- Keep public trust language mature; avoid unfinished/public-internal wording such as “Phase 1 placeholder”, “starter”, or similar unless explicitly approved.

### Runtime / Architecture Constraints
- Keep the current architecture static-site-first.
- Do not introduce server-side code, authentication, backend-managed state, or runtime-backed persistence unless architecture is explicitly changed first.
- Do not move simple browser preferences to backend-managed flows without explicit architectural approval.
- Reuse shared header/navigation patterns across pages.
- Navigation behavior must remain consistent across homepage and secondary pages.

### HTML / DOM / i18n Contracts
- Use semantic HTML5 elements.
- Keep accessibility and i18n attributes synchronized with visible UI state in the same update flow.
- Use `data-i18n` attributes for translatable content.
- Treat IDs, `data-i18n`, and behavior-driving attributes as stable controller contracts.
- Hardcoded user-facing text in JavaScript is not allowed.
- Decorative SVGs must use `aria-hidden="true"`.
- Fallback language is driven by the HTML `lang` attribute and must align with first render.
- Avoid mixed-language first paint.

### Theme / Preference / Storage Rules
- Dark mode is controlled by applying `.dark` to `<html>`.
- Prevent FOUC by applying theme state in `<head>` before CSS.
- Head-applied theme state must match deferred controller state.
- Keep persisted user preference separate from resolved runtime theme.
- Theme preference must check both persisted preference and system preference.
- Access `localStorage` only inside `try/catch` because it can throw in private browsing.
- Keep theme/test hooks aligned with actual rendered state.

### Styling / Token Rules
- Tailwind CSS v4 only: use `@import "tailwindcss"`; do not use legacy `@tailwind` directives.
- Define theme colors through CSS variables and tokens.
- Current brand color tokens:
  - light: `#0d8a4f`
  - dark: `#00e676`
- Do not reintroduce outdated brand green `#00A95C`.
- Maintain the current icon system unless a verified inconsistency is explicitly documented.

### Asset / Build / Deploy Rules
- `site/assets/css/output.css` MUST remain committed to git.
- GitHub Pages has no CSS build step; committed CSS is required for deploy.
- NEVER run `git rm --cached site/assets/css/output.css`.
- Husky may rebuild CSS on commit when `site/assets/css/input.css` changes.
- Do not broaden CI/deploy triggers to docs-only changes without reason.
- Normal delivery branch is `main`.

### Verification Rules
- Use `npm run lint` for Biome checks.
- Use `npm run typecheck` for TypeScript verification.
- Use `npm test` for controller/unit validation.
- Use browser/smoke/E2E checks when changes affect:
  - persisted preferences
  - initial render behavior
  - mobile navigation
  - CSS delivery
  - accessibility state transitions
  - browser-specific behavior
- Prefer verification ladder:
  `lint -> typecheck -> unit -> browser tests -> Lighthouse`
- When tooling allows, run Lighthouse for user-facing layout/navigation/theme changes.

### Accessibility / Quality Targets
- WCAG contrast minimum:
  - `>= 4.5:1` for normal text
  - `>= 3:1` for large text
- WCAG 2.2 target size minimum:
  - `>= 24×24 CSS px` or valid spacing-based exception
- Internal product target for touch controls on mobile:
  - prefer `44×44px` where practical
- Focus ring must remain visible on interactive elements.
- Keep interactive controls keyboard-focusable and visibly focusable.

### Change Management
- When controller contracts change, update markup, tests, and related docs together.
- Preserve deployability and existing user-visible stability while iterating.
- Keep diffs lean and avoid unnecessary formatting churn.
- After implementing a remediation fix:
  - update the findings register
  - recheck the affected states
  - confirm no regression on previously checked states

### Known Project Priorities for Current Work
- Current work mode is remediation of verified defects, not exploratory redesign.
- Prioritize verified P1 fixes before P2 or founder-track items.
- Do not open new audit loops before the current fix cycle is executed.

## Permanent Project Contract
Authoritative source: `docs/project-contract.md`

Use `docs/project-contract.md` as the durable contract for:
- broader coding standards
- delivery discipline
- architecture and controller-boundary rules
- HTML/accessibility/responsive standards in full detail
- copy/translation/CTA/product-positioning policy
- code-review expectations
- release/versioning policy
- test coverage expectations beyond this context file

When guidance overlaps:
- read this file first
- then read `docs/project-contract.md`
- follow the more restrictive rule

## Usage
- Read this file before `bmad-quick-spec`, `bmad-quick-dev`, story implementation, or code review.
- Update this file when architecture, deployment constraints, or project-specific rules materially change.
- Keep this file lean; move broad permanent standards to `docs/project-contract.md`.

---
