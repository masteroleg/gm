# CLAUDE - Internal Context & Session Notes

**Last Updated:** 2026-03-10

---

## Session Summary: UX Design Workflow Complete

### What Was Done

**UX Design Specification for gm** — 1,156-line document covering:
- Executive Summary (Project Vision, Target Users, Key Challenges)
- Core Experience & Emotional Response
- Design System (Tailwind v4, Manrope Variable, Green + Amber tokens)
- Design Direction Decision: **D3 Bento Hero + D1 Dark Forest** (hybrid)
- User Journey Flows (6 journeys + Live Trust Samples concept)
- Component Strategy (10 custom components + new IconSystem)
- UX Consistency Patterns (buttons, forms, nav, proof-moments)
- Responsive Design & Accessibility (mobile-first, WCAG 2.1 AA)

**Document Location:** `_bmad-output/planning-artifacts/ux-design-specification.md`

### Key Decisions Fixed

1. **TopNav Architecture (2026 level)**
   - Minimal: `[genu.im] [✓ Перевірити] [Увійти*] [Зв'язатись →]`
   - No "About", "Brand", "eАкциз" in nav — they're scroll-narrative sections
   - Language/Theme moved to **footer** (Phase 1) → **user profile dropdown** (Phase 3 auth)

2. **`/v/` Proof Hub Design**
   - Google search simplicity + Jonny Ive atmosphere
   - Viewport-size DataMatrix glyph (opacity 3-4%) as background
   - Three elements: Input, Sample shortcuts, Ambient design
   - Demo banner + B2B CTA appear only after interaction (not on entry)

3. **Live Trust Samples Pattern**
   - `/v/genuim` — Platform verifies itself (meta-verification)
   - `/v/genu.alko` — Sample for alcohol brands
   - `/v/genu.cosm` — Sample for cosmetics
   - Used in emails, presentations, sales decks as proof artifacts

4. **Branch Handling**
   - eАкциз (cold tones, ⚖️ scales, document iconography) 
   - Brand (warm amber, 👁️ eye, storytelling)
   - Both present as scroll-narrative sections, not nav items; footer has anchor-links

### Issues Fixed

✅ **Language Unification** — Entire document now Ukrainian (was mixed Russian/Ukrainian)  
✅ **"Branch always visible" contradiction** — Clarified: branches are scroll-sections, not nav  
✅ **Language/Theme placement** — Footer Phase 1, user profile Phase 3  
✅ **Component table** — Split Navigation and Footer rows correctly  

---

## Project Context (gm)

### Technology Stack
- **Tailwind CSS v4** — CSS-first (no `@tailwind`, use `@import "tailwindcss"`)
- **Manrope Variable** — Typography (300→800 weights, single file)
- **Static Site** — GitHub Pages, no build step, `site/assets/css/output.css` committed
- **Jest + JSDOM** — Unit tests (controllers, state, accessibility)
- **Playwright** — E2E/smoke/mobile (desktop & mobile projects)
- **Biome** — Linting/formatting
- **Husky** — Pre-commit/pre-push hooks

### Critical Rules
- **No framework hydration** — Direct DOM controllers on static markup
- **Mobile-first** — 360px → 768px → 1280px breakpoints
- **Lighthouse gates** — Performance ≥95, Accessibility ≥97
- **WCAG 2.1 AA** — Minimum compliance level
- **localStorage with try/catch** — Private browsing fallback
- **No `data-i18n` hardcodes** — All UI text from translation maps
- **FOUC prevention** — Theme/lang applied in `<head>` before render

### Project Goals
- **Proof-first B2B lander** — genu.im demonstrates genu.mark through live verification
- **Two audiences, one page** — eАкциз (compliance) + Brand (voluntary) split at branch
- **Sequential persuasion** — Hook → Clarify → Bridge → Prove → Branch → Convert → Trust
- **Honest no-data state** — Missing proof is feature, not failure

---

## Current Workflow Position

**Completed:** Create PRD ✅ → Create UX Design ✅ (Steps 1–14)

**Next Required:** Create Architecture (phase 3-solutioning)

Then: Create Epics and Stories → Check Implementation Readiness → Sprint Planning

---

## Design System Tokens (Fixed in Session)

**Colors:**
- Proof Green: `#0d8a4f` (light) / `#00e676` (dark)
- Verification Amber: `#c97a0a` (light) / `#ffb340` (dark) — *NEW*
- Dark Forest: `#0c1410` (ambient background)

**Typography:**
- Display: 72–96px, weight 700–800
- H1: 48–56px, weight 700
- H2: 32–40px, weight 600
- Body: 16–18px, weight 400
- Label: 11–12px UPPER, weight 600

**Spacing Base:** 4px unit

---

## Component Roadmap

**Phase 1 — Core (blockers):**
1. VerificationPage + StatusBadge + NoDataState → `/v/genuim` live
2. BentoCard + AnimatedCounter → Hero
3. BranchCard → Branch Split
4. RequestForm → CTA / lead capture
5. IconSystem → icon audit & replacement

**Phase 2 — Enhancement:**
6. SVGFlowDiagram → Bridge section
7. DataMatrixGlyph → ambient motif
8. VerificationBadge hero-variant with pulse

**Phase 3 — Delight:**
9. AnimatedCounter with Intersection Observer
10. Stagger animations on bento grid
11. Sample pages `/v/genu.alko`, `/v/genu.cosm`

---

## Navigation & Footer Architecture

**TopNav (Desktop):**
```
[genu.im ▦]                    [✓ Перевірити]   [Увійти*]   [Зв'язатись →]
```

**TopNav (Mobile):**
```
[genu.im ▦]                                     [Зв'язатись →]   [≡]
```

**Footer (Phase 1):**
- Мова / Тема перемикачі
- Trust links: About, Cases, FAQ, Privacy, Terms, Contact
- Anchor-посилання на eАкциз & Brand секції

---

## Principal Designer Recommendations (Accepted)

- **Typographic contrast** — label thin 300 + headline ultra-bold 800 on one block
- **DataMatrix as DNA motif** — subtle, omnipresent, recognizable
- **VW stagger animation** — numbers count on scroll-in, kinetic trust moment
- **Green/Amber semantics** — Green = brand identity, Amber = verified moment
- **Bridge "Not just QR" section** — explains difference from generic QR landing
- **Branch visual DNA split** — eАкциз = cold/documents, Brand = warm/stories
- **Horizontal SVG flow infographic** — 4 nodes: Print → Code → Scan → Verify → Report
- **Micro-motion principles** — hover lift 4px, transition 200ms ease-out, 2px focus ring

---

## Important Files & Locations

**Specification:**
- `_bmad-output/planning-artifacts/ux-design-specification.md` (complete, 1,156 lines)
- `_bmad-output/planning-artifacts/prd.md` (PRD, complete)
- `_bmad-output/planning-artifacts/product-brief-gm-2026-03-05.md` (brief, complete)

**Project Knowledge:**
- `_bmad-output/project-context.md` (195 rules, LLM-optimized)
- `docs/genu-im-homepage-master-plan.md` (master plan)
- `README.md` (CI/CD workflow, solo-flow, commit-msg auto-gen)

**Code:**
- `site/` — published static site (GitHub Pages)
- `site/assets/css/input.css` — Tailwind config source
- `site/assets/css/output.css` — **committed** production artifact
- `site/assets/js/` — DOM controllers
- `tests/` — unit tests (Jest)
- `tests/e2e/` — Playwright specs

**CI/CD:**
- `.husky/pre-push` — local gate (lint, typecheck, smoke)
- `.github/workflows/ci.yml` — GitHub CI pipeline
- `.github/workflows/full-regression.yml` — manual/nightly regression
- `.github/workflows/infra.yml` — hook/workflow changes only

---

## Working with the Specification

### For Developers
1. Read: Design Direction (sections on Bento Hero + Dark Forest)
2. Read: Component Strategy (detailed specs for 10 custom components)
3. Read: Responsive Design & Accessibility (breakpoints, WCAG requirements)
4. Implement Phase 1 Core components first (VerificationPage, BentoCard, BranchCard, RequestForm, IconSystem)

### For Designers
1. Review: Visual Design Foundation (colors, typography, spacing)
2. Review: Design Direction (D3+D1 rationale, implementation approach)
3. Implement: Icon System audit + replacement (10 semantic icons)
4. Validate: Color contrast, WCAG AA, mobile touch targets (≥44×44px)

### For QA
1. Accessibility testing: WCAG 2.1 AA, Lighthouse ≥97, screen reader labels
2. Responsive testing: 360px, 768px, 1280px breakpoints
3. Proof-moment animations: Counter scroll-in, badge pulse, SVG draw
4. No-data state: Honest messaging, no red colors, no overclaiming

---

## Session Notes for Next Continuations

- **UX Specification is finalized** — No further changes expected without new PRD requirements
- **Language is consistent** — All Ukrainian, ready for translation if needed
- **Architecture design is next** — Create technical solution blueprint
- **Sample pages** are Phase 2 delight, not Phase 1 blockers
- **Live Trust Samples** concept is strong differentiator — emphasize in marketing
- **Footer-based language/theme** frees TopNav for minimal, focused navigation

---

## Communication Notes

- **Language:** Russian (config) → Ukrainian (documents)
- **Tone:** B2B serious, proof-first, no overclaiming
- **Audience:** COO/compliance, engineers, brand managers, procurement auditors
- **Key message:** "We prove, we don't promise"

<!-- rtk-instructions v2 -->
# RTK (Rust Token Killer) - Token-Optimized Commands

## Golden Rule

**Always prefix commands with `rtk`**. If RTK has a dedicated filter, it uses it. If not, it passes through unchanged. This means RTK is always safe to use.

**Important**: Even in command chains with `&&`, use `rtk`:
```bash
# ❌ Wrong
git add . && git commit -m "msg" && git push

# ✅ Correct
rtk git add . && rtk git commit -m "msg" && rtk git push
```

## RTK Commands by Workflow

### Build & Compile (80-90% savings)
```bash
rtk cargo build         # Cargo build output
rtk cargo check         # Cargo check output
rtk cargo clippy        # Clippy warnings grouped by file (80%)
rtk tsc                 # TypeScript errors grouped by file/code (83%)
rtk lint                # ESLint/Biome violations grouped (84%)
rtk prettier --check    # Files needing format only (70%)
rtk next build          # Next.js build with route metrics (87%)
```

### Test (90-99% savings)
```bash
rtk cargo test          # Cargo test failures only (90%)
rtk vitest run          # Vitest failures only (99.5%)
rtk playwright test     # Playwright failures only (94%)
rtk test <cmd>          # Generic test wrapper - failures only
```

### Git (59-80% savings)
```bash
rtk git status          # Compact status
rtk git log             # Compact log (works with all git flags)
rtk git diff            # Compact diff (80%)
rtk git show            # Compact show (80%)
rtk git add             # Ultra-compact confirmations (59%)
rtk git commit          # Ultra-compact confirmations (59%)
rtk git push            # Ultra-compact confirmations
rtk git pull            # Ultra-compact confirmations
rtk git branch          # Compact branch list
rtk git fetch           # Compact fetch
rtk git stash           # Compact stash
rtk git worktree        # Compact worktree
```

Note: Git passthrough works for ALL subcommands, even those not explicitly listed.

### GitHub (26-87% savings)
```bash
rtk gh pr view <num>    # Compact PR view (87%)
rtk gh pr checks        # Compact PR checks (79%)
rtk gh run list         # Compact workflow runs (82%)
rtk gh issue list       # Compact issue list (80%)
rtk gh api              # Compact API responses (26%)
```

### JavaScript/TypeScript Tooling (70-90% savings)
```bash
rtk pnpm list           # Compact dependency tree (70%)
rtk pnpm outdated       # Compact outdated packages (80%)
rtk pnpm install        # Compact install output (90%)
rtk npm run <script>    # Compact npm script output
rtk npx <cmd>           # Compact npx command output
rtk prisma              # Prisma without ASCII art (88%)
```

### Files & Search (60-75% savings)
```bash
rtk ls <path>           # Tree format, compact (65%)
rtk read <file>         # Code reading with filtering (60%)
rtk grep <pattern>      # Search grouped by file (75%)
rtk find <pattern>      # Find grouped by directory (70%)
```

### Analysis & Debug (70-90% savings)
```bash
rtk err <cmd>           # Filter errors only from any command
rtk log <file>          # Deduplicated logs with counts
rtk json <file>         # JSON structure without values
rtk deps                # Dependency overview
rtk env                 # Environment variables compact
rtk summary <cmd>       # Smart summary of command output
rtk diff                # Ultra-compact diffs
```

### Infrastructure (85% savings)
```bash
rtk docker ps           # Compact container list
rtk docker images       # Compact image list
rtk docker logs <c>     # Deduplicated logs
rtk kubectl get         # Compact resource list
rtk kubectl logs        # Deduplicated pod logs
```

### Network (65-70% savings)
```bash
rtk curl <url>          # Compact HTTP responses (70%)
rtk wget <url>          # Compact download output (65%)
```

### Meta Commands
```bash
rtk gain                # View token savings statistics
rtk gain --history      # View command history with savings
rtk discover            # Analyze Claude Code sessions for missed RTK usage
rtk proxy <cmd>         # Run command without filtering (for debugging)
rtk init                # Add RTK instructions to CLAUDE.md
rtk init --global       # Add RTK to ~/.claude/CLAUDE.md
```

## Token Savings Overview

| Category | Commands | Typical Savings |
|----------|----------|-----------------|
| Tests | vitest, playwright, cargo test | 90-99% |
| Build | next, tsc, lint, prettier | 70-87% |
| Git | status, log, diff, add, commit | 59-80% |
| GitHub | gh pr, gh run, gh issue | 26-87% |
| Package Managers | pnpm, npm, npx | 70-90% |
| Files | ls, read, grep, find | 60-75% |
| Infrastructure | docker, kubectl | 85% |
| Network | curl, wget | 65-70% |

Overall average: **60-90% token reduction** on common development operations.
<!-- /rtk-instructions -->