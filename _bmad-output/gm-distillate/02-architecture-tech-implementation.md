This section covers tech stack, ADRs, file layout, design system, component specs, and mandatory implementation patterns. Part 2 of 4.

## Tech Stack
- HTML/CSS/JavaScript; TypeScript strict mode for tooling/Playwright files only — no TS runtime compilation
- Package manager: npm
- CSS: Tailwind CSS v4 (@tailwindcss/cli ^4.2.1); use @import "tailwindcss" — no legacy @tailwind directives; CSS-first via @theme in site/assets/css/input.css
- Linter/formatter: Biome v2.4.7; unit tests: Jest v30 + JSDOM; E2E: Playwright v1.58.2; TypeScript v5.9.3; git hooks: Husky v9.1.7; performance: Lighthouse v13
- Rejected: any framework hydration, TS runtime compilation, separate JSON i18n files
- Deploy: GitHub Pages (static, no SSR, no server runtime); production surface = site/
- Brand color tokens: light #0d8a4f, dark #00e676; do not reintroduce #00A95C
- Pre-existing Biome lint baseline: 8 warnings in scripts/generate-commit-msg.cjs — not regressions

## Architecture Decisions (ADRs)
- ADR-001: site/assets/css/output.css committed to git; rationale: GitHub Pages static deploy, no build step, accidental removal prevention
- ADR-002: target customer = B2B verification in regulatory contexts; primary: alcohol/tobacco/food needing eАкциз compliance + consumer verification; excluded: B2B-only without consumer scan behavior
- ADR-003: static site pipeline GitHub Pages (Epics 1–2); Azure Static Web Apps for Epic 3 (portal with MSAL.js auth); TraceAvit API integration (closed, auth-gated)
- NOTE: ADR stubs are 7-line content-empty files — M2 open drift item: fill with real content or delete
- Azure Free F1: no custom domain + SSL; needs B1 or Cloudflare proxy for production

## File Layout (Phase 1 Deliverables)
- HTML: site/v/genuim/index.html, site/v/index.html, site/about/, site/faq/, site/contact/, site/privacy/, site/terms/, site/cases/, site/knowledge/ (IA placeholder)
- JS controllers: animated-counter.js (IO + rAF), verification-page.js (StatusBadge, NoDataState, demo banner), request-form.js (mailto handoff + ?scenario= prefill + fallback), scroll-reveal.js (SVG stroke-dashoffset)
- Fonts: Manrope Variable self-hosted in site/assets/fonts/; font-display: swap; preload link FIRST in <head>
- SEO: site/sitemap.xml (static), site/robots.txt, site/assets/img/og-default.png (1200×630), site/knowledge/article-template.html (JSON-LD stubs)

## Design System
- Direction: D3 Bento Hero + D1 Dark Forest hybrid; Rejected: D4 Gradient Drama (too SaaS), D5 Monolith (too dense)
- Dark Forest rationale: enterprise/serious tone, differentiated from Дія (light/white), Linear.app effect
- Bento Hero rationale: multiple proof signals visible without scroll (10-second requirement)
- Colors: proof-green-light #0d8a4f / proof-green-dark #00e676 (brand identity); amber-light #c97a0a / amber-dark #ffb340 (verified moment); surface-forest #0c1410; surface-forest-card #121f17; surface-forest-raised #1a2e20
- Contrast: #0d8a4f on white = 4.8:1 WCAG AA; #c97a0a on white = 4.5:1 WCAG AA; light ~7.2:1, dark ~11.5:1 (both pass AA)
- Typography: Manrope Variable 300→800; Display 72–96px/700–800; H1 48–56px/700; H2 32–40px/600; Label 11–12px UPPER/600; Body 16–18px/400
- CSS tokens (in @theme only): --surface-forest, --surface-forest-card, --glow-green (rgba(13,138,79,0.15)), --glow-amber (rgba(255,179,64,0.12)), --font-display, --weight-thin (300), --weight-ultra (800), --radius-bento (24px)
- CSS patterns: .bento-grid, .verification-ui, .branch-card, .kinetic-number, .flow-diagram
- Section rhythm: hero dark forest → bridge dark variant → verification dark+amber → branch split dual surface → how-it-works light → trust floor light → CTA dark

## CSS Variable Safety Rules (project-contract §14)
- No custom properties inside shorthand background, border, transition, animation declarations — invalid var invalidates entire declaration
- Prefer longhand: background-color/background-image, border-width+border-style+border-color, transition-property+transition-duration+transition-timing-function
- Private component vars: --_ prefix in base selector; override only public vars in state/theme selectors
- Focus API: --outline-size and --outline-offset fallbacks on a, button; preserve --color-focus-ring token
- Component hover/focus/theme state: drive through custom property overrides, not repeated resolved values
- CSS refactor completed: violations fixed in .hero-card (523), .cta-button (698), .content-card__cta (707), .vcard (799), .demo-input__field (3560), .demo-input__submit (3593), card components (1338); state duplication and focus API gaps resolved

## Components (10 Custom)
- BentoCard: 1×1/2×1/1×2 sizes; hover lift 4px + glow 200ms ease-out; role=region + aria-label; fail-soft if el absent
- VerificationBadge/StatusBadge: hero 64px (pulse), page 40px, inline 20px; states: verified (amber glow), pending (neutral), no-data (muted); scale 0.8→1.0 + opacity 400ms; role=status, aria-live=polite
- AnimatedCounter: IO + rAF, 0→target linear 1200ms; aria-live=polite (final value available immediately for screen readers)
- DataMatrixGlyph: SVG 21×21 grid, ambient glow, opacity 0.6; aria-hidden=true (decorative)
- SVGFlowDiagram: 4 nodes (Printer → DataMatrix → Scan → Дія result); stroke-dashoffset on scroll-in; stagger 150ms; vertical <768px; role=img + aria-label
- VerificationPage: demo banner (mandatory Phase 1), StatusBadge, source-labeled facts in dl.proof-facts, About inline block, CTA, trust floor; states: demo/live/no-data
- NoDataState: neutral copy (no red, no errors, no overclaiming); shows Дія as external action; separate business CTA; only supported proof blocks rendered; role=status
- BranchCard: eАкциз (cold tones, scales icon, --surface-slate); Brand (warm amber, eye icon); hover border amber/green + lift; ?scenario= prefill passes to request form
- RequestForm: 5 fields (name, email/phone, company, scenario, context); hidden source_path + optional proof_path; mailto handoff with spinner "Готуємо email..."; fallback preserves values; validation on-blur
- IconSystem: Phosphor Icons or custom SVG; stroke 1.5px; sizes 16/24/40/64px; eАкциз=scales, verification=magnifying-glass+amber dot, marking=DataMatrix, brand=eye, integration=plugs-connected, reliability=chart-line-up

## Implementation Patterns (Mandatory)
- JS controller structure: IIFE + 'use strict'; init() with fail-soft guard; no DOMContentLoaded (scripts are defer); no classes; no global vars
- HTML <head> order: preload font FIRST → CSS → SEO metadata → hreflang (always all 3 incl x-default) → OG tags → JSON-LD (in <head> NOT before </body>) → theme inline script
- CSS tokens: only via @theme in input.css; no inline style for design tokens; no separate .css files
- Translations: all user-visible strings in JS translation map; data-i18n on HTML elements; no hardcoded text in JS; no separate JSON files
- Animation: CSS-first; view() + animation-timeline for scroll-triggers (Chrome/Firefox/Edge 2024+); @supports not (animation-timeline: view()) → JS IO fallback adding .is-visible; prefers-reduced-motion: reduce MUST disable all animations; JS only for counters + SVG stroke-dashoffset
- Proof page HTML: mandatory demo-banner role=status aria-live=polite; StatusBadge role=status aria-label; proof-facts in dl with dt.proof-fact__source + dd.proof-fact__value
- Naming: JS files kebab-case; CSS classes kebab-case BEM-like; CSS tokens prefixed (--surface-*, --glow-*, --font-*); HTML id camelCase; data-i18n dot-notation
- State: localStorage only (lang + theme); always try/catch; fallback = system theme + uk language
- FOUC prevention: theme + lang applied inline in <head> before render
- Request/contact Phase 1: mailto: UX handoff only — not reliable transport; no-mail-client fallback: preserve entered values, show contact fallback, never claim request submitted
- Testing: every controller requires Jest unit (init fail-soft, aria sync, localStorage fallback) + Playwright smoke (critical flow visible) + Playwright E2E (persistence after reload); localStorage persistence tested only in Playwright

## Tooling Notes
- Husky v9 breaking change from v8: no _/husky.sh sourcing; prepare script = "husky" (not "husky install"); hook files need only #!/bin/sh shebang; Windows requires shebang or git fails
- E2E CSS regression gap: Playwright DOM element tests pass even with CSS missing; fix via computed style check (getPropertyValue('--color-bg-body')) or theme-dependent visibility test (dark logo hidden in light theme)
- CI value on static site: primary = catching dependabot regressions; CI does not deploy or build CSS; runs ~2 minutes; Epic 3 Azure migration needs CI build step
