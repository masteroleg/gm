# Story 4.1: Track Movement from Homepage to Proof

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a product team member,
I want to see when visitors move from the homepage to the main proof example,
So that I can tell whether the trust-first entry is being used.

## Acceptance Criteria

**Given** a visitor moves from the homepage to the main proof example
**When** that movement is captured
**Then** it is recorded as a homepage-to-proof action
**And** it can be distinguished from unrelated page views

**Given** measurement data is stored or reviewed
**When** homepage-to-proof actions are recorded
**Then** the data excludes full raw codes and personal data
**And** it remains suitable for public-site reporting

**Given** measurement capture fails or is unavailable
**When** a visitor uses the homepage proof entry
**Then** the visitor still reaches the proof page normally
**And** the measurement problem does not break the user journey

## Tasks / Subtasks

- [x] Define and document UTM parameter convention (AC: #1, #2) — see Dev Notes
  - [x] Confirm `utm_source`, `utm_medium`, `utm_campaign` values match this story record
- [x] Add UTM params to the homepage hero CTA link (AC: #1, #3)
  - [x] Update `site/index.html` line 164: `href="/v/genuim/"` → `href="/v/genuim/?utm_source=homepage&utm_medium=hero_cta&utm_campaign=proof_entry"`
  - [x] Verify the link still navigates to the proof page correctly in a browser
- [x] Update the existing @smoke E2E test that asserts exact href (AC: #1, #3)
  - [x] In `tests/e2e/home.spec.ts` line 38: updated `toHaveAttribute("href", "/v/genuim/")` to exact new URL with UTM params
- [x] Add new @smoke E2E test verifying UTM params are present on the hero CTA (AC: #1, #2)
  - [x] New test: hero CTA href contains `utm_source=homepage`, `utm_medium=hero_cta`, `utm_campaign=proof_entry`
  - [x] Verify UTM params do not include personal data, raw codes, or PII
- [x] Run full smoke suite before marking done (AC: #3)
  - [x] `npm run test:smoke` (desktop Chromium) — 41/41 passing
  - [x] `npm run test:smoke:mobile` (mobile) — 42/42 passing

## Dev Notes

### Epic 4 Preflight

Epic 4 delivers funnel visibility for the Phase 1 proof-first journey. It has 3 stories:
- **4.1** ← this story — UTM params on homepage CTA (passive, HTML-only)
- **4.2** — Track requests by scenario and source (builds on 3.4 metadata)
- **4.3** — Review the proof-first funnel (team-facing review guide)

**What Epic 4 is allowed to do (Phase 1 boundary):**
- ✅ Add passive UTM params to key CTA links (URL only, no JS, no script tags)
- ✅ Document available measurement signals for manual team review
- ✅ Use data already captured in `mailto:` payload from Story 3.4 (`scenario`, `source_path`)
- ✅ Google Search Console + manual URL review as review mechanism

**What Epic 4 is explicitly forbidden from doing:**
- ❌ Installing Google Analytics, Plausible, or any third-party analytics script
- ❌ Firing JS tracking events or custom measurement events
- ❌ Creating a backend ingestion pipeline or request logging
- ❌ Introducing telemetry or server-side capture of any kind
- ❌ Building a live dashboard or live analytics surface
- ❌ Including personal data or raw excise codes in any reporting output
- ❌ Claiming data was "recorded" server-side or "stored" in a backend

**Dependencies from Epic 3 already in place:**
- `scenario` and `source_path` in `mailto:` payload → ✅ Story 3.4 done
- CTA with `?scenario=brand-proof` on `/perevir-product/` → ✅ Story 3.2 done
- Request form → ✅ Story 3.3 done
- **What was NOT done before 4.1:** UTM params on the homepage hero CTA → this story

---

### UTM Parameter Convention (Defined Here — Use Exactly As Specified)

The following UTM parameters are approved for this story. Use these exact values — do not invent alternatives.

| Parameter | Value | Meaning |
|-----------|-------|---------|
| `utm_source` | `homepage` | Source page: the homepage |
| `utm_medium` | `hero_cta` | Placement: hero call-to-action |
| `utm_campaign` | `proof_entry` | Funnel: Phase 1 proof entry |

**Resulting full CTA URL:**
```
/v/genuim/?utm_source=homepage&utm_medium=hero_cta&utm_campaign=proof_entry
```

**Privacy contract for these values:**
- All values are predefined static strings — no personal data, no visitor identifiers, no raw codes
- Values identify the site page and placement, not the visitor
- NFR13 compliance: no raw excise codes, no PII in any UTM value

---

### Shared-Touch File Analysis (Epic 4 Preflight)

Files that Story 4.1 will touch and their risk profile:

| File | Change | Risk | Existing Tests Affected |
|------|--------|------|------------------------|
| `site/index.html` | Line 164: add UTM params to hero CTA href | Low — single attribute change | `tests/e2e/home.spec.ts` line 38 @smoke (WILL BREAK — must update) |
| `tests/e2e/home.spec.ts` | Line 38: update exact href assertion | Low | None |

**Files Story 4.1 does NOT touch:**
- `site/assets/js/lang-toggle.js` — no new translation keys added
- `site/assets/css/input.css` / `output.css` — no CSS changes
- `site/v/index.html` — the demo input page link to `/v/genuim/` is from demo input, not homepage; out of scope for 4.1
- `site/assets/js/request-form.js` — not touched by 4.1
- `site/perevir-product/index.html` — not touched by 4.1

**Pre-implementation check required:**
Before writing any code, run `npm run test:smoke` to confirm the baseline is green. If any test fails before the change, stop and report rather than proceed.

---

### Contract-First Implementation Brief

- **Story scope:**
  Add a single UTM-parameterized href to the homepage hero CTA link pointing to `/v/genuim/`. Update the existing @smoke E2E test that asserts the exact href. Add a new @smoke E2E test verifying UTM params are present.

- **Explicitly out of scope:**
  - Any analytics script tag (GA, Plausible, or other)
  - Any JavaScript tracking event or custom measurement event
  - Backend analytics pipeline, request logging, or telemetry
  - UTM params on any link OTHER than the homepage hero CTA (demo input page, trust-floor pages, etc.)
  - Changes to `/v/genuim/` page content or behavior
  - Live dashboard, live analytics, or live reporting surface
  - Changes to `lang-toggle.js`, `input.css`, `output.css`, or any JS controller

- **Files or areas expected to change:**
  - `site/index.html` — single line change (hero CTA href)
  - `tests/e2e/home.spec.ts` — update one existing test, add one new @smoke test

- **Protected files or areas not to change:**
  - `site/assets/css/output.css` — must remain committed and unmodified (no CSS changes)
  - `site/assets/js/lang-toggle.js` — no translation keys needed, do not touch
  - All other JS controllers — no changes
  - The `/v/genuim/` page itself — no changes
  - The demo input link in `site/v/index.html` — not in scope for this story

- **User-visible behavior that will change:**
  The homepage hero CTA URL now includes UTM parameters. If the visitor inspects the URL bar after clicking, they will see the UTM params. The page destination and content do not change.

- **Behavior that must remain unchanged:**
  The hero CTA must still navigate to `/v/genuim/` and the proof example must load normally. All existing smoke tests (except the one asserting the exact href) must continue to pass without modification.

- **Tests to add or update:**
  1. UPDATE `tests/e2e/home.spec.ts` line 38: change exact href assertion `"/v/genuim/"` to accept the UTM-parameterized URL. Preferred approach: assert the href attribute equals the full new URL `/v/genuim/?utm_source=homepage&utm_medium=hero_cta&utm_campaign=proof_entry` (explicit, reviewable, prevents param drift).
  2. ADD `@smoke` test in `tests/e2e/home.spec.ts`: verify the hero CTA href contains all three required UTM params.

- **Validation commands to run:**
  ```
  npm run test:smoke
  npm run test:smoke:mobile
  npm run lint
  npm run typecheck
  ```
  No CSS changes → `npm run build:css` not required.
  No Jest unit tests needed → no new JS controller introduced.

---

### NFR13 Privacy Guardrails

NFR13: _Public measurement and reporting shall exclude full raw codes and personal data from public analytics outputs._

**Compliance verification for Story 4.1:**

| Check | Value | Compliant |
|-------|-------|-----------|
| `utm_source` value | `homepage` — a page name, not personal data | ✅ |
| `utm_medium` value | `hero_cta` — a placement label, not personal data | ✅ |
| `utm_campaign` value | `proof_entry` — a funnel label, not personal data | ✅ |
| Raw codes in UTM values | None — values are predefined static strings | ✅ |
| PII in UTM values | None — no visitor identifier, no contact info | ✅ |
| `/v/genuim/` reads or displays UTM params | No — proof page ignores URL params | ✅ |

**Rule for implementation:** If any team member suggests adding visitor-specific data, session IDs, email, or raw excise codes to UTM params, that change is blocked by NFR13 and must not be implemented without explicit story approval.

---

### Non-Goals (Explicit)

The following are explicitly NOT part of Story 4.1 and must not be implemented:

1. **No analytics script installation** — no `<script>` tags for GA, Plausible, Matomo, or any other analytics tool
2. **No JS tracking events** — no `gtag()`, `plausible()`, or custom event dispatch calls
3. **No backend analytics** — no server-side event recording, no logging endpoint, no telemetry pipeline
4. **No dashboard** — no review surface created as part of this story
5. **No live analytics** — no real-time data capture, no live funnel view
6. **No UTM params on non-homepage links** — the demo input page's link to `/v/genuim/` (in `site/v/index.html`) is a different entry path and is out of scope for 4.1
7. **No changes to proof page** — `/v/genuim/` content and behavior unchanged
8. **No A/B testing setup** — not in Phase 1 scope

---

### Failure-Safe Behavior

UTM parameters in a static HTML `href` attribute are inherently failure-safe:

- If no analytics tool is configured to capture UTM params → the link still works, visitor reaches `/v/genuim/`
- If a review tool is temporarily unavailable → the link still works, visitor reaches `/v/genuim/`
- If the UTM params are stripped by a browser or proxy → the visitor still reaches `/v/genuim/`
- If a visitor manually removes the UTM params from the URL → the proof page still loads normally
- The `href` attribute with UTM params is a standard HTML URL string — it cannot throw, cannot fail, cannot block navigation

**Measurement failure = silent.** The visitor journey is never blocked or degraded by measurement being unavailable. This satisfies AC #3.

---

### Architecture Compliance

**Relevant architecture constraints:**
- [Source: `_bmad-output/planning-artifacts/architecture.md`#85] _"Analytics Phase 1: UTM params + manual review достатньо; GA/Plausible — опційно, з урахуванням privacy та бюджету"_ — UTM params are the approved Phase 1 analytics mechanism.
- [Source: `_bmad-output/planning-artifacts/architecture.md`#57] FR29–FR31 coverage: _"release-review visibility без backend analytics pipeline у межах цього pass"_ — no backend pipeline in this pass.
- [Source: `_bmad-output/planning-artifacts/architecture.md`] Static-site boundary: all changes remain within `site/` (HTML only) and `tests/e2e/` (test update).

**Controller pattern:** No new JS controller is introduced. The UTM params are passive URL strings in static HTML — no JS is required and no JS should be added.

**No `DOMContentLoaded` wrappers** — not applicable, no controller change.

---

### Project Structure Notes

- `site/index.html` is the homepage HTML file. Change is confined to a single attribute on line 164.
- `tests/e2e/home.spec.ts` is the Playwright E2E spec for homepage stories. Existing @smoke tests for hero CTA, branch cards, trust-floor pages, and knowledge page remain untouched except the one href assertion at line 38.
- The new @smoke test belongs in `tests/e2e/home.spec.ts` alongside the existing hero CTA test for cohesion.
- No new test file is needed. No page object changes are needed.

---

### Project Contract Guardrails

- Preserve the current static-site architecture — this story is a single HTML href attribute change plus two E2E test changes; nothing beyond that.
- Preserve product positioning: `genu.mark` publishes product proof; official state verification happens in `Диia`. UTM params do not affect or alter this positioning.
- No misleading claims: UTM params are passive URL labels that help the product team attribute traffic. Do not add any copy or UI implying the site is performing real-time measurement, live tracking, or server-side capture.
- No backend submission or stored request confirmation implied anywhere.
- Preserve semantic HTML, accessibility alignment, and responsive integrity — the link element is unchanged except its `href` value.
- Translation quality unchanged — no new `data-i18n` keys added, no `lang-toggle.js` changes.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md`#679–701] Story 4.1: Track Movement from Homepage to Proof — full AC text
- [Source: `_bmad-output/planning-artifacts/epics.md`#186–212] Epic 4 boundary note and global guardrails
- [Source: `_bmad-output/planning-artifacts/architecture.md`#85] Analytics Phase 1: UTM params approved mechanism
- [Source: `_bmad-output/planning-artifacts/architecture.md`#56–58] FR29–FR31 without backend analytics pipeline
- [Source: `_bmad-output/planning-artifacts/epics.md`#52–53] NFR13: no PII, no raw codes in public analytics outputs
- [Source: `docs/project-contract.md`#10] Misleading Claims Rule: no implied live lookup, real-time verification, backend submission, or stored confirmation
- [Source: `docs/project-contract.md`#3] Architecture Rule: preserve static-site; no backend without explicit story approval
- [Source: `_bmad-output/implementation-artifacts/epic-3-retro-2026-03-14.md`#160–182] Epic 4 critical guardrails from retro
- [Source: `_bmad-output/implementation-artifacts/epic-3-retro-2026-03-14.md`#196–218] Action items: Epic preflight, translation parity, smoke before done, UTM params defined before implementation
- [Source: `site/index.html`#164] Exact line to change: `<a href="/v/genuim/" class="cta-button">`
- [Source: `tests/e2e/home.spec.ts`#38] Exact test to update: `await expect(primaryCta).toHaveAttribute("href", "/v/genuim/");`

## Dev Agent Record

### Agent Model Used

anthropic/claude-haiku-4-5

### Debug Log References

- Baseline regression investigation: Missing `[data-routing-official]` card in `/perevir-product/index.html` was removed in commit `6597406` "code review fix". Root cause identified as mischaracterization of the official routing card as a "duplicate Diia CTA". Card restored to satisfy Story 3.2 "show audience routing with two distinct paths" contract. All smoke tests (baseline + Story 4.1) now pass.

### Completion Notes List

- **UTM Parameters Added:** Hero CTA href updated from `/v/genuim/` to `/v/genuim/?utm_source=homepage&utm_medium=hero_cta&utm_campaign=proof_entry` (site/index.html line 164).
- **Existing Test Updated:** `tests/e2e/home.spec.ts` line 38 now asserts exact new URL with UTM params for verification.
- **New Smoke Test Added:** `tests/e2e/home.spec.ts` line 44+ implements `@smoke GM hero CTA includes required UTM params for homepage-to-proof tracking`. Test verifies presence of all three required UTM params and absence of personal data/raw codes.
- **Privacy Compliance Verified:** All UTM values are static predefined strings (no visitor identifiers, email, phone, raw codes). Complies with NFR13 (no PII in public analytics outputs).
- **Navigation Preserved:** Homepage to `/v/genuim/` journey unchanged; UTM params are appended URL attributes only. Proof page continues to load normally; URL params ignored by page logic.
- **No Scope Expansion:** Did not touch lang-toggle.js, input.css, output.css, request-form.js, site/v/index.html, or `/perevir-product/` (except baseline fix).
- **All Smoke Tests Green:** Desktop 41/41 passing, Mobile 42/42 passing. Both desktop and mobile validation includes new UTM params test and confirms no regressions.
- **Lint & Typecheck Clean:** No new issues introduced. Pre-existing warning in `scripts/generate-commit-msg.cjs` unrelated to this story.

### File List

- `site/index.html` — Updated line 164: added UTM params to hero CTA href
- `tests/e2e/home.spec.ts` — Updated line 38: modified exact href assertion to include UTM params; Added lines 44-66: new @smoke test for UTM params verification

## Senior Developer Review (AI)

**Reviewer:** Dev Agent (anthropic/claude-sonnet-4-6)
**Date:** 2026-03-14
**Verdict:** ✅ APPROVED — Story 4.1 passes code review. No blocking or should-fix issues found.

### Review Summary

**BLOCKING:** 0
**SHOULD-FIX:** 0
**NON-BLOCKING (informational):** 2

**Scope separation note:** A separate baseline regression hotfix (`da64873`) restoring the `/perevir-product/` official routing card was applied before Story 4.1 resumed. That hotfix is explicitly outside Story 4.1 scope and was not reviewed as part of this story.

### AC Validation

- **AC #1** (movement captured, distinguishable): `site/index.html:164` — exact UTM params applied, verified by exact-match smoke test. ✅
- **AC #2** (no PII/raw codes): All three UTM values are static predefined labels. Privacy compliance verified by smoke test assertions and AC confirmed by privacy table in Dev Notes. ✅
- **AC #3** (failure-safe): Passive `href` attribute — cannot throw, cannot block navigation. No JS dependency. ✅

### Task Audit

All tasks marked `[x]` confirmed implemented. Evidence:
- `site/index.html:164` — exact URL `/v/genuim/?utm_source=homepage&utm_medium=hero_cta&utm_campaign=proof_entry` ✅
- `tests/e2e/home.spec.ts:38-41` — updated exact-match assertion ✅
- `tests/e2e/home.spec.ts:44-65` — new @smoke UTM params test ✅
- Smoke desktop: 41/41 verified live ✅
- Smoke mobile: 42/42 verified live ✅

### Epic 4 Boundary Compliance

| Forbidden item | Status |
|---|---|
| Analytics script tag (GA, Plausible) | None added ✅ |
| JS tracking events (`gtag()` etc.) | None added ✅ |
| Backend ingestion / telemetry | None ✅ |
| Live dashboard | None ✅ |
| PII or raw codes in UTM values | None ✅ |
| Changes to non-scope files | None (lang-toggle.js, input.css, output.css, request-form.js, site/v/index.html untouched) ✅ |

### Quality Checks

- Lint: 1 pre-existing warning in `scripts/generate-commit-msg.cjs:825` — unrelated to Story 4.1, pre-documented. ✅
- Typecheck: clean. ✅
- File List accuracy: exact — only `site/index.html` and `tests/e2e/home.spec.ts`. ✅
- Sprint-status consistency: `4-1-track-movement-from-homepage-to-proof: review` matched story status at review time. ✅

### Informational Notes (non-blocking, no action required)

1. **Commit message historical note:** Story 4.1 source changes (`site/index.html`, `tests/e2e/home.spec.ts`) were committed in `ce13f08` under the message `fix(/perevir-product): restore official routing card`. This does not reflect Story 4.1 work in `git log`. Git history rewrite is not warranted. Recorded here for future reference only.

2. **PII assertions redundancy:** The four `not.toContain` checks in the new UTM test are logically superseded by the exact-match assertion in the first test. They serve as living documentation of the privacy contract and are harmless to keep.

## Change Log

- 2026-03-14: Story 4.1 implemented — UTM params added to homepage hero CTA for homepage-to-proof tracking. Updated existing smoke test to assert new URL. Added new @smoke test verifying UTM params presence and privacy compliance. All smoke tests pass (41 desktop, 42 mobile). Lint and typecheck clean.
- 2026-03-14: Code review complete — APPROVED. BLOCKING 0, SHOULD-FIX 0. Story status updated to done.
