# Anti-Drift Correction Spec — genu.im
**Date:** 2026-03-18
**Revised:** 2026-03-18 (post code-review — R1–R4 applied)
**Source audit:** `_bmad-output/reviews/anti-drift-audit-2026-03-18.md`
**Source handoff:** `_bmad-output/reviews/anti-drift-handoff-2026-03-18.md`
**Scope:** Minimal corrections only — no new features, no site changes, no audit re-run.
**Status:** READY FOR IMPLEMENTATION (Patches 1–3 only; Patch 4 moved to manual review)

---

## 1. Ordered Patch Plan

Execute in this order. Each patch is independent; no inter-patch dependencies.

| Order | Patch | Type | Risk | Drift item |
|-------|-------|------|------|-----------|
| 1 | Update P1 plan status line | 1-line edit | None | D1 CRITICAL |
| 2 | Fill project-context tech stack | ~12-line replacement | None | D4 HIGH |
| 3 | Add superseded notice to remediation-brief §4 | ~3-line insertion | None | D2 HIGH |

**Patch 4 (package.json version policy) moved to Manual Review M5 — requires founder decision on version policy and Biome acceptance verification before any implementation. See Section 4.**

**Other manual review items are in Section 4.**

---

## 2. File-by-File Actions

### Patch 1 — `_bmad-output/plans/p1-remediation-plan.md`

**Action:** Edit (1-line change)

**Current line 5:**
```
**Status:** READY FOR REVIEW
```

**Replace with:**
```
**Status:** COMPLETED — 2026-03-17/18. All 6 items verified fixed. See findings register v3.
```

No other lines in this file should be touched. This file becomes a historical execution record.

---

### Patch 2 — `_bmad-output/project-context.md`

**Action:** Edit (replace placeholder line)

**Current line 5:**
```
- [Fill from the actual project: framework, language, package manager, test stack, CSS toolchain, deploy target]
```

**Replace with:**
```
- Language: HTML/CSS/JavaScript (TypeScript types only — no TS runtime compilation)
- Package manager: npm
- CSS: Tailwind CSS v4 (`@tailwindcss/cli ^4.2.1`) — `site/assets/css/input.css` → `site/assets/css/output.css`
- Linter/formatter: Biome v2.4.7
- Unit tests: Jest v30 + jsdom
- E2E tests: Playwright v1.58.2
- Type checking: TypeScript v5.9.3
- Git hooks: husky v9.1.7
- Performance: Lighthouse v13 (`scripts/run-lighthouse.cjs`)
- Deploy target: GitHub Pages (static — no server runtime, no build step on deploy)
```

Lines 6–10 of the current file (the already-correct bullet points about `site/`, `input.css`, `output.css`, GitHub Pages, no HTML/JS build step) become redundant but **do not remove them** — they are referenced by existing rules. The replacement goes in place of line 5 only.

---

### Patch 3 — `docs/remediation-brief.md`

**Action:** Edit (insert notice before §4 item count list)

**Current lines 61–65:**
```
Current item counts:

- **12 active verified defects**
- **4 closed items**
- **1 strategic / founder-track item**
```

**Replace with:**
```
Current item counts:

> **Note (2026-03-18):** The counts below reflect the pre-execution audit state.
> Current state: **6 open defects**, **6 fixed items**. See `docs/audits/genu.im-1/02_findings_register.md` v3 for authoritative current counts.

- ~~12 active verified defects~~ _(pre-execution count — superseded)_
- ~~4 closed items~~ _(pre-execution count — superseded)_
- **1 strategic / founder-track item** _(unchanged)_
```

No other sections of `remediation-brief.md` are touched.

> **IMPORTANT — do not edit these files to match the corrected counts:**
> `docs/audits/genu.im-1/03_severity_summary.md`, `04_priority_matrix.md`, `06_executive_summary.md`, `10_integrity_and_limitations.md`
> All four contain `12 active / 4 closed` counts that were correct at audit snapshot time. They are protected historical audit records. An implementing agent must not attempt to make them consistent with the current 6/6 state.

---

## 3. Files to Relabel as Historical / Superseded

These files do **not** need content edits beyond what is already covered in patches above. Apply label only if and when the file is next touched for another reason. **Do not open these files solely to add labels.**

| File | Label / action | Reason |
|------|---------------|--------|
| `_bmad-output/plans/adversarial-review-p1-remediation.md` | No change needed — status was resolved at implementation | Pre-execution spec review; blockers resolved |
| `_bmad-output/implementation-artifacts/sprint-status.yaml` | Accept as historical snapshot; no edit | Generated 2026-03-12; predates P1 remediation |
| `CHANGELOG.md` | No change needed now | See manual review item M3 |
| `RETROSPECTIVE.md` | No change needed now | See manual review item M3 |

---

## 4. Items Requiring Manual Review

These items cannot be resolved by mechanical edit — they require a human decision.

### M1 — D6: `perevir-product/` and `v/index.html` nav gap

**Files:** `site/perevir-product/index.html`, `site/v/index.html`
**Issue:** No `#mainNav`/`#burgerBtn`. CSS at `v=17` and `v=19` respectively (not `v=20`).
**Decision needed:** Are these pages intentionally exempt from nav? Options:
  - (a) Add as new open findings in `02_findings_register.md` (recommended)
  - (b) Add an explicit exemption note in the findings register
**Do not touch `site/` HTML until this is decided.**

### M2 — D5: ADR stubs

**Files:** `_bmad-output/solutioning/adrs/ADR-001.md`, `ADR-002.md`, `ADR-003.md`
**Issue:** 7-line stubs; no real decision content.
**Decision needed:** Fill with real decisions or delete and note in `docs/project-contract.md` that ADRs were not formalized.
**Do not touch these files until decided.**

### M3 — D7: CHANGELOG vs. RETROSPECTIVE

**Files:** `CHANGELOG.md`, `RETROSPECTIVE.md`
**Issue:** Identical narrative content in both files. Neither follows conventional changelog format.
**Decision needed:** Pick one purpose per file. Options:
  - (a) Keep RETROSPECTIVE as Phase 1 narrative; convert CHANGELOG to conventional format going forward
  - (b) Add a purpose header to each clarifying scope
  - (c) Delete one; add pointer in the other
**No changes until decided.**

### M4 — D8/D9: Design-artifacts scaffold + root leftover files

**Files:** `design-artifacts/A–G/` (empty dirs), `find`, `debug.log`, `commit-msg-test.txt`
**Issue:** Unused scaffold + committed shell/debug artifacts.
**Decision needed:** Confirm safe to delete. These are P3 (low agent-impact risk). Delete in a separate cleanup commit only after confirmation.

### M5 — D3: `package.json` version policy (moved from Patch 4)

**File:** `package.json`
**Issue:** `"version": "1.0.0"` while CHANGELOG/RETROSPECTIVE claim v2.0.2.
**Why deferred:** `package.json` is in the Biome lint scope. Adding a `_versionPolicy` key requires verifying Biome accepts unknown keys without error. The underlying question is also a version policy decision, not a documentation decision — an automatic fix would make an implicit policy choice without founder input.
**Decision needed (pick one):**
  - (a) Bump `"version"` to `"2.0.2"` to match CHANGELOG — simple, no lint risk
  - (b) Add `"_versionPolicy"` key — first run `npm run lint` after adding the key to confirm Biome accepts it
  - (c) Document the intentional hold in `CHANGELOG.md` header instead of `package.json`
**Do not implement until founder confirms version policy.**

---

## 5. Acceptance Criteria

### AC-1: P1 plan status updated
- **Given** `_bmad-output/plans/p1-remediation-plan.md` is read by any agent
- **When** it reads line 5
- **Then** it sees `Status: COMPLETED — 2026-03-17/18` (not `READY FOR REVIEW`)
- **And** no other content in the file is altered

### AC-2: Project-context tech stack filled
- **Given** `_bmad-output/project-context.md` is read by any agent
- **When** it reads the Technology Stack section
- **Then** it finds the actual stack (npm, Tailwind v4, Biome, Jest, Playwright, husky, Lighthouse, GitHub Pages)
- **And** the literal text `[Fill from the actual project` is absent from the file

### AC-3: Remediation brief defect count annotated
- **Given** `docs/remediation-brief.md` is read
- **When** an agent reads §4
- **Then** it sees a notice that the counts reflect pre-execution state and that the findings register is authoritative
- **And** `docs/remediation-brief.md §3` conflict-resolution rule is unchanged

### AC-4: Lint passes after patches 1–3
- **Given** patches 1–3 are applied
- **When** `npm run lint` is run
- **Then** it exits with no violations **beyond the 8 pre-existing warnings/infos in `scripts/generate-commit-msg.cjs`**
- **Note:** The pre-existing baseline is: 2× `lint/style/useTemplate`, 3× `lint/correctness/noUnusedVariables`, 2× `lint/correctness/noUnusedFunctionParameters` (1 non-fixable), 1× unused variable (`enPart`). These are not introduced by this patch set.

---

## 6. Revalidation Criteria

After implementing patches 1–3:

| Check | Command / method | Pass condition |
|-------|-----------------|----------------|
| Lint | `npm run lint` | No new violations beyond the 8 pre-existing in `generate-commit-msg.cjs` |
| No placeholder remains | Read `_bmad-output/project-context.md` | String `[Fill from the actual project` not present |
| Plan status correct | Read `_bmad-output/plans/p1-remediation-plan.md` line 5 | Contains `COMPLETED` |
| Brief annotated | Read `docs/remediation-brief.md` §4 | Note visible before stale counts |
| Audit files untouched | `git diff docs/audits/genu.im-1/` | Empty — audit support files not modified |
| No site files touched | `git diff site/` | Empty — no site changes |
| No test files touched | `git diff tests/` | Empty — no test changes |
| Findings register unchanged | `git diff docs/audits/genu.im-1/02_findings_register.md` | Empty (unless M1 decision made separately) |

**Do not run a new audit. Do not run Playwright or Lighthouse for this patch set — no functional code was changed.**

---

## 7. Out of Scope

The following are explicitly excluded from this spec:

- Any changes to `site/` HTML, CSS, or JS
- Any changes to `tests/`
- Any changes to `.github/workflows/`
- `package.json` version field (M5 — requires founder decision first)
- Re-running or extending the audit
- Opening new planning or redesign workflows
- **Historical audit support files — do not edit to fix stale counts:**
  - `docs/audits/genu.im-1/03_severity_summary.md`
  - `docs/audits/genu.im-1/04_priority_matrix.md`
  - `docs/audits/genu.im-1/06_executive_summary.md`
  - `docs/audits/genu.im-1/10_integrity_and_limitations.md`
- D5 ADR stubs (M2 above — needs decision first)
- D7 CHANGELOG/RETROSPECTIVE (M3 above — needs decision first)
- D8 design-artifacts scaffold (M4 above — needs decision first)
- D9 root leftover files (M4 above — needs decision first)
- D10 sprint-status YAML (accepted as historical snapshot, no action needed)

---

*Source: `_bmad-output/reviews/anti-drift-audit-2026-03-18.md` + `_bmad-output/reviews/anti-drift-handoff-2026-03-18.md`*
*Reviewed: `_bmad-output/reviews/anti-drift-audit-2026-03-18.md` (code review 2026-03-18 — R1–R4 applied)*
*No project files were modified during spec creation or revision.*
