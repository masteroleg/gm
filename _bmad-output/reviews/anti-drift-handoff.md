# Anti-Drift Handoff — genu.im
**Date:** 2026-03-18  
**Source audit:** `_bmad-output/reviews/anti-drift-audit-2026-03-18.md`  
**Purpose:** Concise input for the next BMAD workflow session. Do not re-run the audit — use this file.

---

## 1. Top Unresolved Drift Items

Ordered by agent-impact risk (highest first):

### D1 — CRITICAL: P1 plan is stale — claims pending work that is already done
- **File:** `_bmad-output/plans/p1-remediation-plan.md`
- **Problem:** Line 5 reads `Status: READY FOR REVIEW`. All 6 P1 items (IA-001, TRUST-002/003/004/005/006) are confirmed fixed in live site and findings register v3.
- **Risk:** An agent reading this file believes it must implement changes. It would re-apply already-applied fixes.
- **Fix needed:** Change status line to `COMPLETED — 2026-03-17/18`. Optionally add a one-line note: "All items verified fixed. See findings register v3."

### D4 — HIGH: `project-context.md` tech stack section is an unfilled placeholder
- **File:** `_bmad-output/project-context.md`
- **Problem:** The technology stack section contains literal placeholder text `[Fill from the actual project: ...]`. This file is injected into every AI agent session as system context.
- **Risk:** Every agent starts with degraded context about the actual stack.
- **Fix needed:** Replace placeholder with actual stack:
  - Language: HTML/CSS/JavaScript (no TS runtime)
  - CSS: Tailwind CSS v4 (`@tailwindcss/cli ^4.2.1`), `input.css` → `output.css`
  - Linter: Biome v2.4.7
  - Unit tests: Jest v30 + jsdom
  - E2E tests: Playwright v1.58.2
  - Type checking: TypeScript v5.9.3
  - Git hooks: husky v9.1.7
  - Performance: Lighthouse v13
  - Package manager: npm
  - Deploy: GitHub Pages (static, no server runtime)

### D2 — HIGH: Remediation brief has stale defect count
- **File:** `docs/remediation-brief.md`
- **Problem:** Section 4 says "12 active verified defects, 4 closed". Actual state: 6 open, 6 fixed.
- **Risk:** Moderate. The brief correctly defers to the findings register for conflicts, so a careful agent recovers. But the stale count misleads scope estimation.
- **Fix needed:** Update §4 counts, or add a superseded notice pointing to the register.

### D3 — HIGH: `package.json` version mismatch
- **File:** `package.json`
- **Problem:** `"version": "1.0.0"` while CHANGELOG and RETROSPECTIVE claim v2.0.2.
- **Risk:** Low operational impact (not published to npm). High confusion for agents reading package.json to determine project state.
- **Fix needed:** Decision required — bump to `2.0.2` or explicitly document the static-site no-bump policy in package.json comments.

### D6 — MEDIUM: Two pages lack nav and are not tracked as open defects
- **Files:** `site/perevir-product/index.html`, `site/v/index.html`
- **Problem:** Both pages have no `#mainNav`/`#burgerBtn`. `perevir-product` is at CSS `v=17`, `v/index.html` at `v=19`. Not in findings register as open defects.
- **Risk:** User-facing nav inconsistency. Could be confused with a regression.
- **Fix needed:** Either add as new findings in the register (recommended), or explicitly document as intentionally exempt.

---

## 2. Files Most Likely Needing Content Edits

These files need actual content changes (not just labeling):

| File | Change needed |
|------|--------------|
| `_bmad-output/plans/p1-remediation-plan.md` | Update status line from "READY FOR REVIEW" to "COMPLETED — 2026-03-17/18" |
| `_bmad-output/project-context.md` | Fill tech stack placeholder with actual stack facts |
| `docs/remediation-brief.md` | Update §4 defect count from 12→6 open, or add superseded notice |
| `package.json` | Bump version to `2.0.2` or add policy comment explaining `1.0.0` |
| `docs/audits/genu.im-1/02_findings_register.md` | Optionally add new findings for `perevir-product/` and `v/index.html` nav gap |

---

## 3. Files That Need Historical / Superseded Labeling (not content edits)

These files should be marked as historical records rather than edited for accuracy — their value is as a record of intent, not as current state.

| File | Label to add | Reason |
|------|-------------|--------|
| `_bmad-output/plans/p1-remediation-plan.md` | `Status: COMPLETED` header + date | Execution plan, fully executed |
| `_bmad-output/plans/adversarial-review-p1-remediation.md` | No label needed — "REQUIRES FIXES BEFORE DEV" status was resolved | Pre-execution spec review |
| `docs/remediation-brief.md` | Add notice: "Defect count in §4 reflects pre-execution state. See findings register for current counts." | Transfer doc, written before P1 execution |
| `_bmad-output/implementation-artifacts/sprint-status.yaml` | No edit needed — accept as historical sprint snapshot | Generated 2026-03-12, predates P1 |
| `CHANGELOG.md` / `RETROSPECTIVE.md` | Consider adding: "Phase 1 completion narrative — generated 2026-03-18" to clarify document purpose | Neither follows conventional format; both are same narrative |

---

## 4. Recommended Next BMAD Skill

**`bmad-quick-dev`**

Rationale: The required fixes are all small, targeted content edits to existing files — no new features, no architecture decisions, no sprint planning needed. The two P1 actions (plan status + project-context stack section) are each under 20 lines of change. This is exactly the scope `bmad-quick-dev` is designed for.

Do NOT use: `bmad-create-prd`, `bmad-sprint-planning`, `bmad-create-architecture` — these reopen discovery and planning that is already complete.

---

## 5. Exact Scope for Next Step

**Session goal:** Close the two P1 drift items that actively degrade AI agent performance.

**In scope — do these first:**

1. `_bmad-output/plans/p1-remediation-plan.md` — change line 5 status to `COMPLETED — 2026-03-17/18`
2. `_bmad-output/project-context.md` — replace tech stack placeholder with actual stack facts (see D4 above for exact content)

**In scope — do these second (same session or next):**

3. `docs/remediation-brief.md` — update §4 defect count or add superseded notice
4. `package.json` — bump version or add policy comment (requires founder decision on version policy)

**Out of scope for next step:**
- Do not touch `site/` HTML, CSS, or JS
- Do not modify the findings register unless adding the `perevir-product`/`v/index.html` gap findings
- Do not run a new audit
- Do not open any new planning or redesign workflows
- Do not address D5 (ADR stubs), D7 (CHANGELOG/RETROSPECTIVE), D8 (design-artifacts scaffold), D9 (leftover files) in the same session — these are P3 and do not affect agent performance

**Verification after each edit:**
- `npm run lint` — must pass
- Read the edited file back and confirm no placeholder text remains
- Confirm no functional content was accidentally removed

---

*Source: `_bmad-output/reviews/anti-drift-audit-2026-03-18.md`*  
*No project files were modified during the audit that produced this handoff.*
