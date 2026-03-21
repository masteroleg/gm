# Story 5-5: Confirm response-time language does not imply an SLA

**Status:** done
**Completed:** 2026-03-21 — SLA language found and removed; contact.section3.body EN/UK softened
**Epic:** 5 — Priority 3A site remediation

---

## Goal

Ensure `site/contact/index.html` and `site/request/index.html` do not present a response-time commitment that is not in the planning baseline. If current wording is already acceptably soft, confirm and close with no code change.

## Why it exists

`bmad-doc-consistency-todo-2026-03-19.md` §3A.5 flags response-time language in request/contact pages as introducing "a response-time expectation not defined in the planning baseline." A site read on 2026-03-21 found that `contact.section3.heading = "Response time" / "Час відповіді"` exists but the body contains no specific SLA (no "24h", "48h", "1–2 business days"). The heading with soft expectation-setting body may already be acceptable.

**This story is verify-first. The most likely outcome is zero code change and a documented confirmation.**

## Authoritative source files

- `_bmad-output/planning-artifacts/bmad-doc-consistency-todo-2026-03-19.md` — open item §3A.5
- `docs/project-contract.md` — Rule 10 (no implied stored request confirmation or service commitment)
- `_bmad-output/planning-artifacts/prd.md` — Phase 1 does not define SLAs; mailto: handoff only

## Acceptance Criteria

1. No EN or UK string in `lang-toggle.js` for `contact.*` or `request.*` keys states a specific response-time SLA (no "24 hours", "48 hours", "1–2 business days", "same day", "within X", or equivalent Ukrainian).
2. A "Response time" / "Час відповіді" heading is acceptable if the body only sets soft expectations without committing to a deadline.
3. `request.*` keys do not imply server-side receipt or guaranteed delivery of the request.
4. If current copy already meets AC 1–3: story closes with documented confirmation, consistency-todo item marked closed, no code change committed.
5. Smoke tests pass if any change is made.

## Non-goals

- Do not remove the "Response time" section heading unless the body body is genuinely non-compliant and cannot be softened.
- Do not change the contact email address or page structure.
- Do not touch `site/assets/js/lang-toggle.js` keys outside `contact.*` and `request.*`.

## Copy / trust constraints

- Rule 10 (project-contract.md): no implied stored request confirmation, guaranteed delivery, or service-level commitment.
- Rule 6: tone must be clear, calm, factual — expectation-setting without promising.

## Affected paths

- `site/assets/js/lang-toggle.js` — `contact.section3.*` and `request.*` keys (verify; edit only if SLA language found)
- `site/contact/index.html` — HTML fallback if keys change
- `site/request/index.html` — HTML fallback if keys change

## Validation notes

- First action: read all `contact.` and `request.` keys from both EN and UK sections of `lang-toggle.js`.
- Grep for: "hour", "day", "business", "within", "годин", "день", "робочий", "протягом".
- If no SLA language found: mark consistency-todo item closed, document confirmation, no code change.
- Run: `rtk playwright test --project=smoke` only if a string change was made.
