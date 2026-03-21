# Missing Pieces — genu.im

**Source:** Consolidated from findings register v3, anti-drift audit, strategic log
**As of:** 2026-03-21
**Status:** Epic 5 remediation COMPLETE. 6 open defects remain.

---

## A — Open Defects (findings register v3)

| ID | Severity | Description | Effort | Notes |
|---|---|---|---|---|
| VIS-002 | HIGH | ~30% empty hero right panel at desktop/tablet (all states) | M | No approved fix yet |
| TRUST-001 | HIGH | Proof page has 4 disclaimers — consolidate to 1 info banner | S | UA rewrite Option B ready: «ℹ️ Демонстраційний перегляд...» |
| CONV-002 | HIGH | Request flows use `mailto:` handoff — brittle, no delivery guarantee | M | Recommended: Formspree or Netlify Forms (no backend needed) |
| COPY-001 | MEDIUM | Token-like homepage pills feel internal/technical | S | Needs PO decision before implementation |
| COPY-002 | MEDIUM | "NDA case" jargon in homepage copy | S | UA rewrite Option C ready: «Працює на виробництві. Понад 25 мільйонів промаркованих одиниць.» |
| A11Y-001 | LOW | Theme toggle touch target 26.4px (passes WCAG 2.2 min 24px, below 44px best-practice) | S | Accept or expand |

> Source: `docs/audits/genu.im-1/02_findings_register.md` v3 — authoritative. Wins all conflicts.

---

## B — Open Drift Items (manual decisions required)

**M2** — ADR stubs are 7-line content-empty files
- Files: `_bmad-output/solutioning/adrs/ADR-001`, `ADR-002`, `ADR-003`
- Decision: fill with real rationale content **or** delete entirely
- Risk: stubs imply documented decisions that don't actually exist

**M5** — Version policy conflict
- `package.json` says `"version": "1.0.0"`
- CHANGELOG / RETROSPECTIVE previously claimed v2.0.2 (now deleted as empty files)
- Decision: what is the canonical version? Requires founder sign-off before any edit.

**Empty files cleanup**
- `CHANGELOG.md` and `RETROSPECTIVE.md` were both 0 bytes — deleted 2026-03-21
- If either is needed: create with real content and clear purpose boundary

---

## C — Strategic Decisions (founder track only)

- **STRAT-001** — Domino/Omron equipment disclosure: do not reference without founder approval
- **25M+ proof claim** — unit/framing unresolved; do not publish until founder-approved
- **/v/genu.alko, /v/genu.cosm** — future phase sample pages; require separate approval; Phase 1 only has `/v/genuim`

---

## D — Migration Pipeline (broken, low urgency)

The knowledge migration pipeline (run_migration.mjs / apply_delta.mjs) has a critical bug:
- `run_migration.mjs:112-113` — delta write logic is unreachable code
- `apply_delta.mjs:82` — `applyAdrs()` never called with populated array
- Result: 87 of 96 processed chunks have no knowledge artifacts; `migration/deltas/` is empty

**Impact:** Low — migration was a one-time historical import. No active workflow depends on it.
**Action:** Fix if knowledge migration is needed again; otherwise leave dormant.

---

## E — Conditions for project-context.md Refresh

`_bmad-output/project-context.md` (195 rules) must NOT be refreshed until all three conditions are met:

| Condition | Status |
|---|---|
| site/ fixes implemented (Epic 5) | ✅ COMPLETE — 2026-03-21 |
| Governance doc published | ✅ COMPLETE — doc-governance.md active, updated 2026-03-20 |
| Defect register statuses validated post-Epic-5 | ❓ PENDING — needs re-check |

Once all three are met: refresh `project-context.md` from distillate + current defect register.

---

## F — Quick Wins (no decision needed)

- **Promote glossary** — `docs/governance/glossary.md` content is complete; remove Draft status → Active *(done in this pass)*
- **ADR stubs** — decide M2 above; if deleting, also remove from `solutioning/index.md`
