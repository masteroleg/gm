# Anti-Drift Audit — genu.im
**Date:** 2026-03-18  
**Method:** Read-only inventory and cross-reference across all project files. No files modified.  
**Scope:** Full repository — site/, docs/, _bmad-output/, design-artifacts/, scripts/, tools/, root config files.

---

## 1. Canonical Truth Map by Domain

| Domain | Authoritative Source | Path |
|--------|---------------------|------|
| Defect status (open/fixed) | Findings Register v3 FINAL | `docs/audits/genu.im-1/02_findings_register.md` |
| Coding standards & process rules | Project Contract | `docs/project-contract.md` |
| AI agent working context | Project Context | `_bmad-output/project-context.md` |
| Architecture decisions (intended) | ADRs — currently stubs | `_bmad-output/solutioning/adrs/` |
| Remediation scope and rules | Remediation Brief | `docs/remediation-brief.md` |
| Execution plan (P1) | P1 Remediation Plan | `_bmad-output/plans/p1-remediation-plan.md` |
| Live site state | Published HTML/CSS/JS | `site/` |
| Build / dependency config | package.json | `package.json` |
| Implementation history | Story files + epic retros | `_bmad-output/implementation-artifacts/` |
| Product requirements | PRD | `_bmad-output/planning-artifacts/prd.md` |
| Architecture design | Architecture doc | `_bmad-output/planning-artifacts/architecture.md` |

**Conflict resolution rule (from `docs/remediation-brief.md` §3):**  
If any document conflicts with the findings register, the findings register wins.

---

## 2. File Classification

### 2.1 Current-State Documents (authoritative, reflects present reality)

These files accurately describe what is true RIGHT NOW. Trust these.

| File | What it reflects |
|------|-----------------|
| `docs/audits/genu.im-1/02_findings_register.md` v3 2026-03-17 | Defect status: 6 fixed, 6 open |
| `docs/project-contract.md` | Permanent coding + delivery rules |
| `site/**/*.html`, `site/assets/js/*.js`, `site/assets/css/input.css` | Live published site implementation |
| `site/assets/css/output.css` | Committed CSS build artifact (current) |
| `package.json`, `biome.json`, `tsconfig.json` | Build tooling config |
| `.github/workflows/*.yml` | CI pipeline (current) |
| `.husky/` | Git hooks (current) |
| `tests/` | Unit + e2e test suite (current) |
| `docs/audits/genu.im-1/` (all 10 files except 02) | Supporting audit context (current) |

### 2.2 Historical / Snapshot Documents (point-in-time captures, may be stale)

These files were accurate when written but may not reflect the present state. Do not treat them as current truth without cross-checking.

| File | Generated | What it captured |
|------|-----------|-----------------|
| `CHANGELOG.md` | 2026-03-18 | Narrative v1.0→v2.0.2 history (not per-commit conventional format) |
| `RETROSPECTIVE.md` | 2026-03-18 | Phase 1 completion retrospective (same narrative as CHANGELOG) |
| `_bmad-output/implementation-artifacts/sprint-status.yaml` | 2026-03-12 | Sprint state before P1 remediation cycle |
| `_bmad-output/knowledge/fragments/` | Various | Migrated AI session transcripts |
| `_bmad-output/knowledge/migration-converter-*.md` | Pre-2026-03-17 | Code review findings from migration period |
| `AI-GENERATION-FINDINGS.md` | Pre-2026-03-17 | Investigation of OpenCode AI commit generation |
| `CODE_REVIEW.MD` | Historical | Single menu-toggle code review, not a living doc |

### 2.3 Plans (pre-execution intent documents)

These describe what was planned. Some are now fully executed; status annotations below.

| File | Date | Status |
|------|------|--------|
| `_bmad-output/plans/p1-remediation-plan.md` | 2026-03-17 | **STALE** — says "READY FOR REVIEW" but all P1 items are executed and fixed |
| `_bmad-output/plans/adversarial-review-p1-remediation.md` | 2026-03-17 | Pre-execution spec review — blockers B1/B2 were resolved in implementation |
| `docs/remediation-brief.md` | Pre-2026-03-17 | Transfer doc — defect count section is stale (says 12 active, now 6) |
| `_bmad-output/planning-artifacts/prd.md` | 2026-03-11 | Pre-implementation product requirements |
| `_bmad-output/planning-artifacts/epics.md` | Pre-2026-03-12 | Sprint epics — all marked done |
| `_bmad-output/planning-artifacts/architecture.md` | 2026-03-10 | Architecture design — static site, no server runtime |
| `_bmad-output/planning-artifacts/sprint-change-proposal-2026-03-11.md` | 2026-03-11 | Sprint scope change record |
| `docs/genu-im-homepage-master-plan.md` | 2026-03-09 | Pre-implementation planning narrative |

### 2.4 Derived / Generated Artifacts (rebuild outputs, not truth sources)

These are outputs of tools or scripts. Do not edit manually.

| File | How generated |
|------|--------------|
| `site/assets/css/output.css` | Tailwind CLI build from `input.css` |
| `coverage/` | Jest LCOV coverage output |
| `test-results/` | Playwright test output |
| `_bmad-output/implementation-artifacts/baseline-screenshots/` | Visual regression baselines |
| `repo-index.md`, `index.md`, `_bmad-output/knowledge/index.md` | Auto-generated by `scripts/index_docs.py` |

### 2.5 Implementation Artifacts (story-level records, historical)

| Files | Notes |
|-------|-------|
| `_bmad-output/implementation-artifacts/story-*.md` (16 files, 1.1–4.3) | All marked done |
| `_bmad-output/implementation-artifacts/epic-*-retro.md` (4 files) | Post-epic retrospectives |
| `_bmad-output/implementation-artifacts/tech-spec-*.md` (4 files) | Per-epic tech specs |

### 2.6 Stub / Incomplete (created but never filled)

| File | Issue |
|------|-------|
| `_bmad-output/solutioning/adrs/ADR-001.md` | 7-line stub — title + 1-line description only |
| `_bmad-output/solutioning/adrs/ADR-002.md` | 7-line stub — title + 1-line description only |
| `_bmad-output/solutioning/adrs/ADR-003.md` | 7-line stub — title + 1-line description only |
| `_bmad-output/project-context.md` tech stack section | Contains literal placeholder: `[Fill from the actual project: framework, language, package manager, test stack, CSS toolchain, deploy target]` |
| `design-artifacts/A/`, `B/`, `C/`, `D/`, `F/`, `G/` | All empty scaffold directories |
| `design-artifacts/E/Design-Deliveries/` | Empty subdirectory |

### 2.7 Noise / Leftover Files

| File | Issue |
|------|-------|
| `find` (repo root) | Likely output of a `find` shell command, committed accidentally |
| `debug.log` (repo root) | Debug log artifact |
| `commit-msg-test.txt` (repo root) | Test artifact from commit message tooling |

---

## 3. Drift / Conflict Matrix

### D1 — CRITICAL: P1 plan says "READY FOR REVIEW" but P1 is fully executed

**Type:** Stale plan vs. live implementation  
**Files in conflict:**
- `_bmad-output/plans/p1-remediation-plan.md:5` — `Status: READY FOR REVIEW`
- `docs/audits/genu.im-1/02_findings_register.md` v3 — IA-001, TRUST-002/003/004/005/006 all marked Fixed
- Live `site/` files — confirmed fixes present

**Verification (read-only checks performed):**
- `lang-toggle.js`: zero occurrences of "Phase 1", "starter policy", "starter terms", "Phase 1 placeholder"
- `site/about/index.html:57` and all 8 other secondary pages: `#mainNav` + `#burgerBtn` present
- `site/v/genuim/index.html:132`: `data-source-type="primary"` present on genu.mark pill
- CSS: all 9 in-scope secondary pages + homepage at `output.css?v=20`

**Risk:** An AI agent reading only the plan file believes the work is pending and may re-apply changes to already-fixed files.

**Recommended fix:** Update `p1-remediation-plan.md` status line to `COMPLETED — 2026-03-17/18`.

---

### D2 — HIGH: `remediation-brief.md` defect count is stale

**Type:** Stale snapshot vs. current truth  
**Files in conflict:**
- `docs/remediation-brief.md:55–66` — "12 active verified defects, 4 closed items"
- `docs/audits/genu.im-1/02_findings_register.md` v3 — 6 open, 6 fixed

The brief correctly identifies the findings register as the conflict-winning source (§3), but its own count contradicts that register.

**Risk:** Moderate. An agent that reads the brief without the register will work from the wrong scope baseline.

**Recommended fix:** Update remediation-brief.md §4 count to "6 active verified defects, 6 fixed items" — or mark the section as superseded and point to the findings register.

---

### D3 — HIGH: `package.json` version `1.0.0` vs. docs claiming `v2.0.2`

**Type:** Implementation artifact vs. documentation  
**Files in conflict:**
- `package.json:3` — `"version": "1.0.0"`
- `CHANGELOG.md:16` — v2.0.2, 2026-03-18
- `RETROSPECTIVE.md` — "v2.0.2 released"

No runtime impact (static site, not published to npm). But any tooling or agent that reads `package.json` version to determine project state will report `1.0.0`.

**Recommended fix:** Either bump `package.json` to `2.0.2` to match documentation, or add a comment documenting that version is intentionally not bumped (static site policy).

---

### D4 — HIGH: `project-context.md` tech stack section is an unfilled placeholder

**Type:** Incomplete AI-facing context document  
**File:** `_bmad-output/project-context.md` — technology stack section contains:  
`[Fill from the actual project: framework, language, package manager, test stack, CSS toolchain, deploy target]`

This file is explicitly referenced as the first thing AI agents must read (per `docs/remediation-brief.md:205` and `AGENTS.md` system context injection). The placeholder degrades every AI session.

**Actual stack (from `package.json`):**
- Language: HTML/CSS/JavaScript (TypeScript types only, no TS runtime)
- CSS: Tailwind CSS v4 (`@tailwindcss/cli ^4.2.1`), `input.css` → `output.css`
- Linter/formatter: Biome v2.4.7
- Unit tests: Jest v30 + jsdom
- E2E tests: Playwright v1.58.2
- Type checking: TypeScript v5.9.3
- Git hooks: husky v9.1.7
- Performance: Lighthouse v13 (`scripts/run-lighthouse.cjs`)
- Package manager: npm
- Deploy target: GitHub Pages (static, no server runtime)

**Recommended fix:** Fill the placeholder in `project-context.md` with the above facts.

---

### D5 — MEDIUM: ADR-001/002/003 are title stubs with no decision content

**Type:** Referenced artifacts that don't exist as real documents  
**Files:** `_bmad-output/solutioning/adrs/ADR-001.md`, `ADR-002.md`, `ADR-003.md`  
Each file is 7 lines: a generated title, a 1-line description, and nothing else.

- ADR-001: output.css committed to git (rule correctly captured in `project-context.md`)
- ADR-002: target customer decision criteria
- ADR-003: architecture decisions

**Risk:** Medium. Rules are duplicated in project-context/project-contract so nothing breaks. Traceability for why the rules exist is missing.

**Recommended fix:** Either populate ADRs with real decision content (context, options considered, decision, consequences, status), or delete stubs and add a note to project-contract that ADRs were not formalized.

---

### D6 — MEDIUM: `perevir-product/` and `v/index.html` have no nav and stale CSS versions

**Type:** Scope gap — pages exist but were excluded from P1 remediation  
**Files:**
- `site/perevir-product/index.html` — no `#mainNav`, no `#burgerBtn`, CSS at `v=17`
- `site/v/index.html` — no `#mainNav`, no `#burgerBtn`, CSS at `v=19`

These pages were deliberately out-of-scope for IA-001. The adversarial review (M5) logged them as a known follow-up gap. They are not currently tracked as open defects in the findings register.

**Risk:** Low-medium. Users landing on these pages get inconsistent navigation. Not a regression from P1 (they never had nav), but a gap relative to the rest of the site.

**Recommended fix:** Add new findings to the findings register for these two pages, or document explicitly that they are intentionally exempt.

---

### D7 — MEDIUM: `CHANGELOG.md` and `RETROSPECTIVE.md` are the same narrative document

**Type:** Naming vs. content mismatch  
**Files:** `CHANGELOG.md`, `RETROSPECTIVE.md`

Both contain an identical release timeline table (v1.0→v2.0.2), identical section headers, same narrative content. Neither follows conventional CHANGELOG format (no `[Unreleased]` sections, no per-commit entries in Keep A Changelog or Conventional Commits style). They appear to be two exports of the same AI-generated document.

**Risk:** Low. Creates confusion about which is canonical for what purpose.

**Recommended fix:** Decide which file serves which purpose. Options: (a) keep RETROSPECTIVE as the Phase 1 narrative, convert CHANGELOG to conventional format going forward; (b) delete one and add a pointer; (c) label both as "Phase 1 completion narrative" in their headers.

---

### D8 — LOW: `design-artifacts/A–G/` scaffold is entirely empty

**Type:** Promised structure with no content  
**Files:** `design-artifacts/A/` through `design-artifacts/G/` (directories created, all empty)

Design artifacts exist in `_bmad-output/planning-artifacts/` instead. The `design-artifacts/` tree is an unused BMAD workflow scaffold.

**Recommended fix:** Either populate with cross-references/symlinks to `_bmad-output/planning-artifacts/`, or delete the scaffold and document the decision.

---

### D9 — LOW: Root-level leftover files

**Type:** Repository hygiene  
**Files:** `find` (shell command output), `debug.log`, `commit-msg-test.txt`

No project function. Should not be committed.

**Recommended fix:** Delete all three files.

---

### D10 — LOW: Sprint status YAML predates P1 remediation cycle

**Type:** Stale snapshot  
**File:** `_bmad-output/implementation-artifacts/sprint-status.yaml` — generated 2026-03-12

P1 remediation (IA-001, TRUST-002–006) was executed 2026-03-17/18 as a post-sprint activity. There is no sprint record of P1 execution.

**Risk:** Low. Informational gap only. Sprint system is not actively driven by agents at this stage.

**Recommended fix:** No urgent action. Either append a P1 remediation entry to the YAML, or accept the YAML as a historical snapshot of the main sprint only.

---

## 4. What Is Correct (No Drift Found)

The following areas were cross-checked and found internally consistent:

| Area | Finding |
|------|---------|
| P1 implementation complete | All 6 fixes live in `site/`. Findings register v3 accurately reflects this. |
| CSS version coordination | All 9 in-scope secondary pages + homepage at `v=20`. Adversarial review B1/B2 issues resolved. |
| Nav pattern consistency | `#mainNav` + `#burgerBtn` present on all 9 specified pages with correct absolute href links. |
| Phase 1 language removal | Zero occurrences of "Phase 1", "starter", "placeholder" in user-facing strings in `lang-toggle.js`. |
| TRUST-002 pill differentiation | `data-source-type="primary"` correctly added to genu.mark pill in `v/genuim/index.html`. |
| Project contract rules | `output.css` committed, Tailwind v4 `@import` syntax, brand color tokens (`#0d8a4f`/`#00e676`) correct. |
| CI structure | `.github/workflows/` + `.husky/` hooks in place, match `docs/ci.md`. |
| Open defects correctly tracked | Findings register v3 lists 6 open (VIS-002, TRUST-001, CONV-002, COPY-001, COPY-002, A11Y-001). Nothing in `site/` falsely claims these as fixed. |
| Remediation brief conflict rule | `docs/remediation-brief.md §3` correctly states findings register wins all conflicts. |
| `output.css` committed | ADR-001 intent (even as stub) is honoured — `output.css` is committed and tracked. |

---

## 5. Prioritized Recommendations

| Priority | Action | Target File(s) |
|----------|--------|---------------|
| P1 | Update plan status: "READY FOR REVIEW" → "COMPLETED — 2026-03-17/18" | `_bmad-output/plans/p1-remediation-plan.md` |
| P1 | Fill tech stack placeholder with actual stack facts | `_bmad-output/project-context.md` |
| P2 | Update defect count in remediation brief (12→6 open) or label section as superseded | `docs/remediation-brief.md` |
| P2 | Decide and act on `package.json` version (`1.0.0` vs. `v2.0.2`) | `package.json` |
| P2 | Log `perevir-product/` and `v/index.html` nav gap as open findings | `docs/audits/genu.im-1/02_findings_register.md` |
| P3 | Fill ADRs with real decision content or delete stubs | `_bmad-output/solutioning/adrs/ADR-00[1-3].md` |
| P3 | Delete leftover root files | `find`, `debug.log`, `commit-msg-test.txt` |
| P3 | Clarify CHANGELOG vs. RETROSPECTIVE purpose | `CHANGELOG.md`, `RETROSPECTIVE.md` |
| P3 | Delete `design-artifacts/A–G/` scaffold or cross-reference `_bmad-output/` | `design-artifacts/` |

---

*Audit performed read-only. No project files were modified.*
