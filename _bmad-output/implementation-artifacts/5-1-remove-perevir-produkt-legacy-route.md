# Story 5-1: Remove `site/perevir-produkt/` from the public surface

**Status:** done
**Completed:** 2026-03-21 — both legacy route directories removed; perevir-produkt/ (noindex redirect, wrong-domain canonical) and perevir-product/ (orphaned destination, zero site/ inbound links) deleted; E2E spec files for orphaned route removed; docs/review-guide-requests.md and docs/review-guide-funnel.md updated to remove /perevir-product/ source-path references
**Epic:** 5 — Priority 3A site remediation

---

## Goal

Ensure `site/perevir-produkt/` no longer constitutes a live public surface that implies a legacy product story or verification posture outside the approved Phase 1 trust boundary.

## Why it exists

`consistency-alignment-plan-2026-03-19.md` identifies this route as exposing "a legacy product story and public verification posture outside the approved Phase 1 surface and trust boundary." The current file is a meta-refresh redirect, but the route is still live and may be indexed by search engines. The route itself is the problem regardless of where it redirects.

## Authoritative source files

- `_bmad-output/planning-artifacts/consistency-alignment-plan-2026-03-19.md` — disposition: remove from public surface
- `_bmad-output/planning-artifacts/prd.md` — Phase 1 approved public surface definition
- `docs/project-contract.md` — Rule 10 (no implied live lookup or official verification)
- `docs/governance/doc-governance.md` — trust boundary rule

## Acceptance Criteria

1. `GET /perevir-produkt/` no longer returns a user-facing page implying verification capability.
2. If known inbound links exist, a safe intercept (redirect to `/` or `/v/genuim/`) is in place and clearly documents the redirect target.
3. The route is removed from `sitemap.xml` (if present) and from any internal navigation that promotes it.
4. Existing smoke tests continue to pass — no previously-passing test references `/perevir-produkt/` as an expected active route.
5. No regression on any other route.

## Non-goals

- Do not rewrite or redesign the `/v/genuim/` proof page.
- Do not add new content or features.

## Copy / trust constraints

- If a redirect is used, the destination must be an approved Phase 1 surface (`/` or `/v/genuim/`).
- Redirect destination must not imply live lookup or official state verification.

## Affected paths

- `site/perevir-produkt/index.html` — deleted (noindex redirect, wrong-domain canonical, zero inbound refs)
- `site/perevir-product/index.html` — deleted (orphaned destination, zero site/ inbound links; E2E specs for orphaned route also removed)
- `tests/e2e/business-next-step.spec.ts` — deleted
- `tests/e2e/official-check.spec.ts` — deleted
- `docs/review-guide-requests.md` — updated (removed /perevir-product/ source-path references)
- `docs/review-guide-funnel.md` — updated (removed /perevir-product/ source-path references)

## Validation notes

- Both route directories confirmed deleted.
- Both E2E spec files confirmed deleted.
- grep for `perevir-product` across `site/`, `tests/`, `docs/` returns zero results.
- Smoke tests passed: 3/3 (`npx playwright test tests/e2e/genuim.smoke.spec.ts --project=chromium`).
