# Documentation Governance — genu.im

**Last Updated:** 2026-03-20
**Status:** Active canonical — load by default in all sessions.

---

## 1. Precedence Rules

### Layer 1 — Product / Implementation Authority
*Governs: what the system must do, allowed scope, trust boundaries, UI/UX contracts.*

```
PRD → Architecture → Epics → UX Specification → ADRs
```

- `_bmad-output/planning-artifacts/prd.md` — root requirements; all FRs/NFRs
- `_bmad-output/planning-artifacts/architecture.md` — static-site constraints; Phase 1 trust model
- `_bmad-output/planning-artifacts/epics.md` — sprint acceptance criteria; phase boundaries
- `_bmad-output/planning-artifacts/ux-design-specification.md` — UI contracts; design tokens; copy rules
- `_bmad-output/solutioning/adrs/ADR-00*.md` — bounded technical decisions (output.css, customer criteria, architecture choices)

**Conflict rule:** higher item always wins. No derived doc may override any item in this chain.

### Layer 2 — Remediation / Release-Status Authority
*Governs: what is currently open, fixed, superseded, or broken.*

```
Findings Register → Inconsistency Report → Consistency Todo → Alignment Plan → Anti-Drift Spec
```

- `docs/audits/genu.im-1/02_findings_register.md` — primary remediation source of truth
- `_bmad-output/planning-artifacts/bmad-doc-inconsistency-report-2026-03-19.md` — doc-layer audit snapshot
- `_bmad-output/planning-artifacts/bmad-doc-consistency-todo-2026-03-19.md` — open items tracker
- `_bmad-output/planning-artifacts/consistency-alignment-plan-2026-03-19.md` — execution sequence
- `_bmad-output/specs/anti-drift-correction-spec-2026-03-18.md` — drift prevention rules

**Critical rule:** Layer 2 tracks execution state only. Layer 2 docs never override Layer 1 product/implementation authority.

---

## 2. Document Authority Classes

| Class | Meaning |
|---|---|
| **active canonical** | Current source of truth. Future agents must rely on this by default. May not be overridden by derived docs. |
| **active derived** | Summary, rollup, or derivative view that depends on canonical docs. Authoritative only within its stated scope. |
| **active working** | Draft or operational file still in use but not authoritative. May be superseded without a formal deprecation step. |
| **historical BMAD artifact** | Useful for traceability and history but non-authoritative by default. Do not load unless investigating history. |
| **archive candidate** | Should be moved out of the active context layer. No incoming canonical dependencies. |

---

## 3. How to Handle Conflicts

1. Identify which layer the conflict belongs to (product/implementation vs. remediation/status).
2. Consult the highest-authority document in the relevant layer.
3. Never resolve a conflict by editing the higher-authority document to match the lower one.
4. If a derived doc contradicts a canonical doc, the canonical doc is correct. Update the derived doc.
5. If two Layer 1 docs conflict, the higher item in the chain wins.
6. `docs/project-contract.md` governs all approved trust/copy language in `site/` content.

---

## 4. Default Loading Rules

### Core Default Context (always load)

| File | Role |
|---|---|
| `docs/governance/doc-governance.md` | This file — precedence rules |
| `_bmad-output/project-context.md` | LLM-optimized implementation safety rules |
| `_bmad-output/planning-artifacts/prd.md` | Root product requirements |
| `_bmad-output/planning-artifacts/architecture.md` | Static-site constraints; trust boundary |
| `_bmad-output/planning-artifacts/epics.md` | Sprint AC; phase boundaries |
| `docs/audits/genu.im-1/02_findings_register.md` | Primary remediation source of truth |

### Task-Specific Context (load only when role requires)

| Task | Additional files to load |
|---|---|
| UX / copy / component work | `ux-design-specification.md`, `docs/project-contract.md` |
| site/ remediation | `bmad-doc-consistency-todo-2026-03-19.md`, `consistency-alignment-plan-2026-03-19.md`, `anti-drift-correction-spec-2026-03-18.md` |
| Story creation / sprint planning | `docs/genu-im-homepage-master-plan.md`, `docs/audits/genu.im-1/04_priority_matrix.md` |
| Architecture decisions | ADR-001, ADR-002, ADR-003 |

### Do Not Load by Default (ever)

- Completed story files (`1-1` through `4-3`) — all `Status: done`; historical only
- Retrospectives and handoff docs (`epic-*-retro*.md`, `epic-*-dev-handoff.md`)
- Session fragments (`knowledge/20260217_*` through `20260220_*`)
- Old product briefs (`product-brief-gm-2026-02-23.md`, `-03-05.md`) — superseded by PRD
- Old validation reports (`validation-report-2026-03-09/10/11.md`) — superseded by inconsistency report
- `docs/delivr/` — external reference material, not core project docs

---

## 5. Refresh Rule for project-context.md

`_bmad-output/project-context.md` must be refreshed only after:
1. Authority is stabilized (this governance doc is published and active)
2. `site/` fixes are implemented (Priority 3A from consistency-todo)
3. Statuses are validated (all open items confirmed closed)

Do not refresh project-context.md before these conditions are met. A premature refresh documents a false-clean state.
