This section covers CI/CD pipeline architecture, project contract rules, documentation authority map, homepage master plan staged execution, and key file locations. Part 4 of 4.

## CI/CD Architecture
- Solo workflow: work directly in main; linear history (rebase, no merge commits); no feature branches by default
- pre-push hook: detects site-impacting diff; if none → skip; if site changes → lint + typecheck + test:smoke (chromium only)
- pre-commit hook: auto-builds output.css if input.css staged; auto-generates commit messages (Conventional Commits) via scripts/generate-commit-msg.cjs
- Three GitHub Actions workflows:
  - ci.yml (Site CI): triggers on site/index.html, site/assets/**, tests/**, playwright.config.ts, package.json, package-lock.json, tsconfig.json
  - full-regression.yml: PR/manual/nightly; matrix: chromium, firefox, webkit, mobile-chrome, mobile-safari
  - infra.yml: triggers on .github/workflows/**, .husky/**, scripts/has-site-impact.sh, scripts/generate-commit-msg.cjs; shell syntax check only, no Playwright, no deploy
- docs/BMAD-only changes trigger no workflow
- Site CI jobs: quick-checks (npm ci → lint → typecheck → test → build:css → git diff --exit-code output.css → upload artifact) → smoke-e2e → required-checks → deploy-pages (only if site/index.html or site/assets/** changed)
- Lighthouse: not CI gate; manual quality check; mobile baseline 98/100/100/100, desktop 100/100/100/100; strict CI thresholds: Performance 95, Accessibility 95, Best Practices 95, SEO 95
- GitHub settings required: Pages source = GitHub Actions; branch protection requires required-checks; github-pages environment exists
- No custom secrets required for current Pages pipeline
- Remaining manual setup: set Pages source to GitHub Actions; configure branch protection to require required-checks; Lighthouse baseline not yet run

## Project Contract (Implementation Rules)
- Delivery discipline: implement strictly within active story scope; stop and report if scope is ambiguous
- Contract-first rule: before coding — state story scope, out-of-scope, files to change, protected files, user-visible changes, unchanged behavior, tests, validation commands (8–12 lines max)
- Architecture rule: preserve static-site architecture unless story explicitly requires otherwise
- HTML: semantic elements, correct heading hierarchy, links for nav/buttons for actions, no unnecessary wrapper divs, preserve aria-labels, maintain 360px baseline
- Accessibility: WCAG 2.2; contrast ≥4.5:1 normal text, ≥3:1 large text; touch target ≥24×24px (prefer 44×44px mobile); focus ring visible
- Copy tone: clear, calm, factual, confident; no hype, no jargon; all i18n text from translation maps
- Product positioning (non-negotiable): brand publishes proof → genu.mark; official state verification → Дія; never imply genu.im performs official verification
- Translation: EN/UK semantic parity (not word-for-word); Ukrainian must be idiomatic
- Story execution sequence: contract → implement → run validation → update story record → update file list → update sprint status → next story
- menu.js exits if ANY one of #burgerBtn, #closeMenu, #mainNav is absent (OR logic)
- Rule 10: no live lookup, real-time verification, official state verification, backend submission implied
- Rule 12: CTA text must match actual navigation behavior
- Controller contracts: IDs, data-i18n, behavior-driving attributes are stable; changing them requires markup+tests+docs update together

## Documentation Authority Map
- Layer 1 (product/implementation authority): PRD → Architecture → Epics → UX Specification → ADRs
- Layer 2 (remediation/release-status): Findings Register → Inconsistency Report → Consistency Todo → Alignment Plan → Anti-Drift Spec
- Defect status: docs/audits/genu.im-1/02_findings_register.md v3 (wins all conflicts)
- Coding standards/process rules: docs/project-contract.md
- AI agent working context: _bmad-output/project-context.md
- Remediation scope rules: docs/remediation-brief.md
- ADRs: _bmad-output/solutioning/adrs/ (stubs, no real content)
- Audit files 03, 04, 06, 10: snapshot counts — DO NOT edit
- Do not load by default: completed story files (1-1 through 4-3), retrospectives, session fragments, old product briefs, old validation reports, docs/delivr/
- project-context.md must NOT be refreshed until: governance doc published, site/ fixes implemented, statuses validated

## Homepage Master Plan (Staged Execution)
- Stage 0: language/terminology discipline — keep еАкциз/Дія in Ukrainian, remove false bilingual fragments
- Stage 1: stop-loss trust cleanup — cut risky claims, remove internal-looking labels, reduce proof strip
- Stage 2: catch both categories early — rewrite hero for dual audience, expand navigation
- Stage 3: introduce mechanism in order — add bridge section ("not just QR") before verification preview
- Stage 4: make verification preview real proof — show valid/suspicious/no-record with record ID, status, source, timestamp, product reference, next action
- Stage 5: split two branches cleanly — eАкциз and responsible-manufacturer with different emphasis/CTA
- Stage 6: rebuild weak sections — replace "Why genu.im", rebuild "How it works", add FAQ
- Stage 7: add placeholder destinations for About, Contact, Proof & Cases, Privacy, Terms, FAQ
- Stage 8: validate (clarity, regulatory, CTA, mobile, language)

## BMAD Remediation Workflow
- Required: BMAD Quick Flow (bmad-quick-spec → review spec → bmad-quick-dev → implement → recheck audit artifacts)
- Escalation rule: if remediation reveals system-level architectural changes → stop and escalate to full BMAD planning path
- DoD: code changed + intended state visible in rendered UI + affected states rechecked + findings register updated + no regression
- P1 fix order (do first): IA-001, TRUST-004, TRUST-005, TRUST-006, TRUST-003, TRUST-002
- P2 fix order (after P1): TRUST-001, CONV-002, VIS-002, COPY-001, COPY-002

## Key File Locations
- Planning specs: _bmad-output/planning-artifacts/ux-design-specification.md (1,156 lines), _bmad-output/planning-artifacts/prd.md, _bmad-output/planning-artifacts/architecture.md, _bmad-output/planning-artifacts/epics.md
- AI working context: _bmad-output/project-context.md (195 rules)
- Master plan: docs/genu-im-homepage-master-plan.md
- Contract: docs/project-contract.md
- Findings register: docs/audits/genu.im-1/02_findings_register.md
- Code: site/ (published), site/assets/css/input.css (Tailwind source), site/assets/css/output.css (COMMITTED production artifact), site/assets/js/ (DOM controllers)
- Tests: tests/ (Jest unit), tests/e2e/ (Playwright)
- CI: .husky/pre-push, .github/workflows/ci.yml, .github/workflows/full-regression.yml, .github/workflows/infra.yml