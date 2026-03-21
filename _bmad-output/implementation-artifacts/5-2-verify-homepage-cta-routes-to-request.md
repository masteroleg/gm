# Story 5-2: Verify homepage CTA routes to `/request/` — close or fix

**Status:** done
**Completed:** 2026-03-21 — violation found and fixed; branch CTAs already correct
**Epic:** 5 — Priority 3A site remediation

---

## Goal

Confirm that `site/index.html` final CTA and both branch CTAs route to the `/request/` qualified-request form, not directly to `mailto:`. If already correct, document the verification and close with no code change. If still broken, fix.

## Why it exists

`bmad-doc-consistency-todo-2026-03-19.md` lists CTA routing as an open item. A site read on 2026-03-21 found `href="/request?from=/"` at the final CTA (line 632) and `href="/request?scenario=..."` at both branch CTAs (lines 366, 422), suggesting the fix may already be in place. This story formally gates confirmation before the todo item is marked closed.

**This story is verify-first. The most likely outcome is zero code change and a documented confirmation.**

## Authoritative source files

- `_bmad-output/planning-artifacts/bmad-doc-consistency-todo-2026-03-19.md` — open item §3A.2
- `_bmad-output/planning-artifacts/prd.md` — qualified request flow is the approved Phase 1 conversion mechanism
- `_bmad-output/planning-artifacts/epics.md` — Story 3.3 "Send a Qualified Request" (completed; established /request/ routing)
- `docs/project-contract.md` — Rule 12 (CTA text must match actual behavior)

## Acceptance Criteria

1. `site/index.html` final CTA (`#final-cta`) `href` resolves to `/request/` or `/request?...` — not a bare `mailto:`.
2. eАкциз branch CTA resolves to `/request?scenario=eaktsyz` or equivalent.
3. Brand-proof branch CTA resolves to `/request?scenario=brand-proof` or equivalent.
4. No `mailto:` link appears as a primary CTA anywhere in `site/index.html`.
5. `bmad-doc-consistency-todo-2026-03-19.md` item for CTA routing is confirmed closed.
6. If no fix was needed: close with a verification note; no code change committed.
7. Smoke tests pass.

## Non-goals

- Do not redesign or relabel the CTA.
- Do not change CTA copy unless a separate story requires it.
- Do not touch `site/request/index.html`.

## Copy / trust constraints

- Rule 12 (project-contract.md): CTA text must match actual navigation behavior.
- Do not add wording that implies server-side submission or guaranteed delivery.

## Affected paths

- `site/index.html` — read-verify; apply `href` patch only if `mailto:` is found

## Validation notes

- First action: read `site/index.html` lines 600–650 to confirm final CTA `href` value.
- If already `/request/...`: update consistency-todo checkbox, commit confirmation note, no code change.
- If `mailto:` found: replace with `/request?from=/` and verify all three CTAs.
- Run: `rtk playwright test --project=smoke`
