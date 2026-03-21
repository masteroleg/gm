# Story 5-3: Reword homepage/runtime copy implying live lookup or real-time verification

**Status:** done
**Completed:** 2026-03-21 — `why.point2.title` (EN/UK) and `proof.point1.title` (EN/UK) reworded to remove deprecated terms; matching HTML fallbacks updated in `site/index.html`
**Epic:** 5 — Priority 3A site remediation

---

## Goal

Ensure all user-facing strings in `site/index.html` and `site/assets/js/lang-toggle.js` are consistent with the Phase 1 trust boundary — no implication of live public lookup, real-time verification, official state verification, or backend submission.

## Why it exists

`consistency-alignment-plan-2026-03-19.md` §A.3 flags homepage and runtime copy as still containing language that can read as live public lookup or real-time verification. The P1 remediation (TRUST-003–006, completed 2026-03-17/18) fixed internal-facing label language, but semantic overclaims in user-facing proof-section or hero strings may remain. This story audits and corrects any surviving violations.

**⚠ Important sequencing constraint:** This story and Story 5-4 both modify `site/assets/js/lang-toggle.js`. They must be implemented sequentially by the same agent or in the same editing pass — never in parallel.

## Authoritative source files

- `_bmad-output/planning-artifacts/bmad-doc-inconsistency-report-2026-03-19.md` — §8 (open site/ mismatches)
- `_bmad-output/planning-artifacts/consistency-alignment-plan-2026-03-19.md` — §A.3
- `docs/project-contract.md` — Rule 10 (misleading claims), Rule 6 (copy tone), Rule 9 (Ukrainian idiom)
- `docs/governance/glossary.md` — Deprecated/Risky Synonyms table
- `_bmad-output/planning-artifacts/ux-design-specification.md` — Phase 1 proof/demo semantics
- `_bmad-output/planning-artifacts/prd.md` — FR6 (trust boundary: Дія vs. genu.mark)

## Acceptance Criteria

1. No EN or UK string in `lang-toggle.js` implies live lookup, real-time verification, or official state verification in a claim-making context.
2. Strings that already clarify the trust boundary (e.g., "It is not live lookup and it is not an official state check") are preserved intact — do not remove disclaimers.
3. Hero, use-cases, and proof-section strings frame the product as "brand-layer product proof" consistently.
4. Every modified `data-i18n` key has a matching HTML fallback value updated in `site/index.html`.
5. EN and UK strings for modified keys remain semantically equivalent after edits.
6. If a full grep reveals no problematic strings: story closes with a documented confirmation, no code change.
7. `rtk vitest run` passes (no lang-toggle unit test regressions).
8. `rtk playwright test --project=smoke` passes.

## Non-goals

- Do not change strings that are already trust-boundary-correct.
- Do not redesign the page layout or CTA structure.
- Do not touch the proof page (`/v/genuim/`) — separate surface.
- Do not change structural HTML beyond updating fallback text for edited keys.
- Do not remove disclaimers entirely — simplify only if explicitly required.

## Copy / trust constraints

- Rule 10 (project-contract.md): no live lookup, real-time verification, official verification, backend submission.
- Rule 6: tone must be clear, calm, factual, confident.
- Rule 9: Ukrainian copy must be idiomatic — avoid calques or machine-translation sound.
- Preserve existing trust-boundary-clarifying language — it is compliant and should remain.

## Affected paths

- `site/assets/js/lang-toggle.js` — string edits for flagged keys only
- `site/index.html` — HTML fallback text for any modified `data-i18n` keys

## Validation notes

- First action: grep `lang-toggle.js` for all terms in `docs/governance/glossary.md` Deprecated/Risky Synonyms table before editing. Log findings.
- Also grep for: "verify", "перевір" in claim-making (not disclaimer) context.
- Confirm no Jest test asserts a specific string value that would break on edit.
- Run: `rtk vitest run`
- Run: `rtk playwright test --project=smoke`
- After this story completes, hand the modified `lang-toggle.js` directly to Story 5-4 in the same pass.
