# Story 5-4: Narrow FAQ verification claims

**Status:** done
**Completed:** 2026-03-21 — `faq.q4.answer` (EN/UK) phrase "real-time scan resolution" / "розпізнавання сканування в реальному часі" replaced with "fast scan response" / "швидка обробка сканування"; HTML fallback updated in `site/faq/index.html`; all other FAQ keys audited and confirmed compliant
**Epic:** 5 — Priority 3A site remediation

---

## Goal

Ensure FAQ content does not imply generic verification from any arbitrary scan, live public proof from any QR code, or official state verification performed by genu.im. Scope to approved Phase 1 brand-layer proof semantics only.

## Why it exists

`consistency-alignment-plan-2026-03-19.md` §A.4 identifies `site/faq/index.html` as overstating verification reach with language like "from any scan." A site read on 2026-03-21 did not surface the exact problematic string in the rendered HTML lines 100–250, but the `lang-toggle.js` FAQ keys have not been fully grepped. This story requires a full audit of all `faq.*` keys before any edit decision.

**⚠ Important sequencing constraint:** This story and Story 5-3 both modify `site/assets/js/lang-toggle.js`. Story 5-3 must complete first. Story 5-4 must be implemented in the same editing pass or immediately after, by the same agent — never in parallel.

## Authoritative source files

- `_bmad-output/planning-artifacts/consistency-alignment-plan-2026-03-19.md` — §A.4
- `docs/project-contract.md` — Rule 7 (product positioning: genu.mark vs. Дія), Rule 10 (misleading claims)
- `_bmad-output/planning-artifacts/prd.md` — Phase 1 approved proof surface scope
- `docs/governance/glossary.md` — Deprecated terms: "any scan", "official verification"

## Acceptance Criteria

1. No EN or UK FAQ string implies a user can verify any arbitrary product by scanning any QR code through genu.im.
2. No EN or UK FAQ string implies genu.im performs official state verification.
3. All FAQ answers are scoped to brand-layer product proof via approved genu.mark codes only.
4. Дія is correctly described as the official state verification channel whenever official checks are referenced.
5. EN and UK FAQ strings remain semantically paired after any edits.
6. If a full audit of all `faq.*` keys finds no problematic string: story closes with a documented confirmation, no code change.
7. `rtk vitest run` passes (no lang-toggle unit test regressions).
8. `rtk playwright test --project=smoke` passes.

## Non-goals

- Do not rewrite FAQ questions or add new FAQ entries.
- Do not change FAQ page structure or layout.
- Do not touch any non-FAQ string keys in `lang-toggle.js`.

## Copy / trust constraints

- Rule 7 (project-contract.md): genu.mark = brand proof; Дія = official state verification. Site must never be positioned as performing official verification.
- Rule 10: no live lookup, real-time verification, or arbitrary scan semantics.
- Rule 9: Ukrainian copy must be idiomatic.

## Affected paths

- `site/assets/js/lang-toggle.js` — `faq.*` key edits only if violations found
- `site/faq/index.html` — HTML fallback text for any modified `data-i18n` keys

## Validation notes

- First action: grep `lang-toggle.js` for all keys matching `faq.` prefix in both EN and UK sections. Log all values before any edit.
- Check for: "any scan", "будь-який", "official", "офіційн", "real-time", "live".
- If no violations found: update consistency-todo checkbox, document finding, no code change.
- Run: `rtk vitest run`
- Run: `rtk playwright test --project=smoke`
