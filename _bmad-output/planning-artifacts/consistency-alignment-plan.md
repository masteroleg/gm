# Consistency Alignment Plan

Date: 2026-03-19
Workspace: `D:\w\genu.im\gm`
Scope: `_bmad`, `_bmad-output`, `docs`, `site`

## Objective

Bring the approved source-of-truth chain and the shipped public site into one aligned baseline:

`PRD -> Architecture -> Epics -> UX -> derived docs -> site/`

This plan assumes the chosen disposition for `site/perevir-produkt/` is: remove it from the public surface rather than preserve or fully rewrite it.

## Source of Truth Baseline

Primary baseline documents:

1. `_bmad-output/planning-artifacts/prd.md`
2. `_bmad-output/planning-artifacts/architecture.md`
3. `_bmad-output/planning-artifacts/epics.md`
4. `_bmad-output/planning-artifacts/ux-design-specification.md`

Supporting but subordinate artifacts:

- `_bmad-output/planning-artifacts/implementation-readiness-report-2026-03-19.md`
- `_bmad-output/planning-artifacts/bmad-doc-inconsistency-report-2026-03-19.md`
- `_bmad-output/planning-artifacts/bmad-doc-consistency-todo-2026-03-19.md`
- `docs/**`
- `site/**`

## Confirmed Open Gaps

### A. Final implementation drift in `site/`

1. `site/perevir-produkt/` exposes a legacy story outside the approved Phase 1 public surface and trust boundary.
2. `site/index.html` final CTA bypasses `/request/` and goes straight to `mailto:`.
3. Homepage/runtime copy in `site/index.html` and `site/assets/js/lang-toggle.js` overreaches into live-lookup or real-time-verification semantics.
4. `site/faq/index.html` overstates verification reach with language like verification from "any scan".
5. `site/request/index.html` and `site/contact/index.html` introduce a response-time expectation not present in the planning baseline.

### B. Governance / drift-prevention gaps

1. No explicit workspace-wide precedence rule is yet published as the active editing policy.
2. Derived artifacts do not consistently self-identify as subordinate to the source-of-truth chain.
3. `site/` is not yet explicitly included in the same pre-release consistency loop as planning artifacts.

## Proposed Sequencing

### Phase 1 - Lock the baseline

Goal: prevent more drift while remediation is in progress.

Tasks:

1. Publish an explicit precedence rule in project docs: `PRD -> Architecture -> Epics -> UX -> derived docs -> site/`.
2. Add a short source-of-truth note to the inconsistency report and ToDo if needed for clarity.
3. Treat all new user-facing copy changes in `site/` as requiring comparison against the four primary planning artifacts.

Acceptance criteria:

- One document states the precedence order clearly.
- The plan, ToDo, and inconsistency report no longer imply that derived docs can override primary planning docs.

### Phase 2 - Correct public-surface implementation mismatches in `site/`

Goal: align the shipped site with the approved Phase 1 product model.

Tasks:

1. Remove `site/perevir-produkt/` from the public surface.
2. Update `site/index.html` so the final CTA routes to `/request/` instead of direct `mailto:`.
3. Reword homepage and runtime translations in `site/index.html` and `site/assets/js/lang-toggle.js` to avoid implying live public lookup, real-time verification, official verification, or stronger proof semantics than approved.
4. Narrow FAQ claims in `site/faq/index.html` to approved proof/demo semantics.
5. Review and soften response-time promises in `site/request/index.html` and `site/contact/index.html` unless explicitly promoted into approved requirements.

Acceptance criteria:

- No public page implies live lookup, real-time verification, official verification, backend submission, or generic proof from arbitrary scans.
- Homepage CTA flow matches the qualified request model in the planning baseline.
- Removed legacy route no longer behaves like an active public offer.

### Phase 3 - Reconcile support docs with the implementation reality

Goal: ensure supporting docs describe the same site that actually ships.

Tasks:

1. Re-run a focused audit of `docs/**` and `_bmad-output/**` after `site/` changes land.
2. Update audit artifacts so open items refer only to genuinely unresolved mismatches.
3. Mark superseded reports or observations as historical where needed.

Acceptance criteria:

- ToDo reflects only still-open work.
- Inconsistency report separates resolved issues from active ones.
- No support doc points reviewers at already-fixed problems as if they remain current.

### Phase 4 - Validation and regression control

Goal: prove the aligned baseline is real, not just editorial.

Tasks:

1. Run `npm run lint`.
2. Run `npm run typecheck`.
3. Run `npm test`.
4. Run `npm run test:smoke`.
5. If CTA, request flow, or copy changes affect browser-level behavior materially, run relevant browser smoke/e2e checks and, if warranted, Lighthouse.
6. Re-run a final consistency audit across `_bmad`, `_bmad-output`, `docs`, and `site`.

Acceptance criteria:

- Validation passes for changed areas.
- Final audit finds no active contradiction between primary planning docs and the shipped `site/`.

## Recommended Implementation Order

1. Publish source-of-truth precedence.
2. Fix `site/index.html` CTA flow.
3. Remove `site/perevir-produkt/` from public surface.
4. Clean homepage/runtime wording and FAQ overclaims.
5. Clean request/contact response-time promises.
6. Reconcile reports and ToDo with the post-fix state.
7. Run validation and final consistency pass.

## Risks and Controls

### Risk 1 - Breaking an existing inbound path

Issue: removing `site/perevir-produkt/` may affect old links.

Control:

- Replace with a safe redirect or approved intercept pattern if needed rather than silent breakage.
- Verify sitemap/navigation/internal links no longer promote it.

### Risk 2 - Copy cleanup changes product meaning unintentionally

Issue: aggressive copy reduction could weaken legitimate production-confidence claims.

Control:

- Only remove claims that exceed the approved Phase 1 contract.
- Preserve calm, factual proof-language allowed by `docs/project-contract.md`.

### Risk 3 - Docs become stale again after site fixes

Issue: if `site/` is fixed but audit artifacts are not refreshed, drift returns immediately.

Control:

- Refresh ToDo and inconsistency report in the same remediation cycle.

## Deliverables

1. Updated `site/` implementation aligned to the planning baseline.
2. Updated ToDo and inconsistency report reflecting the real remaining state.
3. Explicit source-of-truth policy published in workspace docs.
4. Validation record showing the aligned state passes checks.

## Recommendation

Proceed as one bounded remediation initiative with two execution waves:

- Wave 1: source-of-truth policy + `site/` corrections
- Wave 2: artifact refresh + validation + final audit

This is lower risk than trying to keep docs and public implementation in partial sync over multiple ad hoc edits.
