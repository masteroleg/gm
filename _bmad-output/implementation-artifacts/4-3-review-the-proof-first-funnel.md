# Story 4.3: Review the Proof-First Funnel

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a product team member,
I want to review the journey from homepage to proof to request,
So that I can judge whether the release supports the intended trust-first funnel.

## Acceptance Criteria

**AC #1 — Funnel steps visible together with consistent definitions:**

**Given** homepage-to-proof and request-source data exist
**When** the funnel is reviewed
**Then** the homepage, proof, and request steps can be seen together
**And** those steps use consistent definitions

**AC #2 — Funnel readable without raw personal data:**

**Given** the team reviews the funnel
**When** they compare the major steps
**Then** they can see where visitors continue and where they stop
**And** they can review the funnel without needing raw personal data

**AC #3 — Partial/missing inputs handled honestly:**

**Given** some measurement inputs are missing, delayed, or only partially available
**When** the funnel is reviewed
**Then** the available homepage, proof, and request signals still use consistent definitions
**And** the review makes incomplete inputs visible without implying missing data was captured elsewhere

## Tasks / Subtasks

- [x] Task 1: Shared-touch preflight — run baseline smoke before any change (AC: all)
  - [x] Run `npm run test:smoke` — confirm all 41 desktop tests pass
  - [x] Run `npm run test:smoke:mobile` — confirm all 42 mobile tests pass
  - [x] If any test fails before your change, stop and report; do NOT proceed

- [x] Task 2: Create funnel review guide document (AC: #1, #2, #3)
  - [x] Create `docs/review-guide-funnel.md` (new file)
  - [x] Section 1 — Phase 1 Funnel Overview: define the three-step proof-first funnel; explain all signals are passive and manual; no backend, no live dashboard, no guaranteed capture
  - [x] Section 2 — Funnel Step Definitions with consistent signal sources:
    - [x] Step 1 (Homepage → Proof): UTM param `proof_entry`; source = `/v/genuim/?utm_source=homepage&utm_medium=hero_cta&utm_campaign=proof_entry`; observable via Google Search Console; limitation: only homepage hero CTA carries this UTM; direct arrivals, demo input, external links do not
    - [x] Step 2 (Proof Page Engagement): page views on `/v/genuim/`; observable via GSC impressions/clicks for that URL; limitation: GSC shows organic search only; direct navigation is not captured without additional tooling (out of Phase 1 scope)
    - [x] Step 3 (Request Submission): email received at `hello@genu.im` with scenario/source in body; observable via inbox review (see `docs/review-guide-requests.md`); limitation: `mailto:` is best-effort — not all requests arrive
  - [x] Section 3 — Reading the Funnel Together: how to combine the three signals in a manual review session; what the data does and does NOT tell the team; include a minimal review template (step 1 signal count → step 2 GSC visits → step 3 inbox count)
  - [x] Section 4 — NFR13 Privacy Guardrails: no personal data in funnel aggregate; no raw excise codes; counts by scenario label and source path are safe; reference consistent with `docs/review-guide-requests.md` guardrails
  - [x] Section 5 — Partial/Missing Data Handling: explicit guidance for each missing-signal scenario; "state it as unavailable" — never extrapolate; partial funnel review is still valid and useful
  - [x] Section 6 — Known Phase 1 Limitations: UTM params captured at homepage hero CTA only; proof page views not tracked end-to-end without analytics; `mailto:` delivery is environment-dependent; no backend, no live data, no guaranteed capture

- [x] Task 3: Add @smoke E2E funnel navigation test (AC: #1)
  - [x] Create `tests/e2e/funnel.spec.ts` (new file)
  - [x] Add one @smoke test: "proof-first funnel path is navigable end-to-end"
    - [x] Navigate to `/` (homepage)
    - [x] Assert hero CTA is visible and has `proof_entry` UTM params in href
    - [x] Navigate to `/v/genuim/` (proof page) — simulate the funnel step
    - [x] Assert proof page loads (title or demo banner or main heading visible)
    - [x] Navigate to `/request/` (request form) — simulate the final funnel step
    - [x] Assert request form is present and the scenario field exists
    - [x] Assert the funnel path is complete and unbroken — no 404 or error state
  - [x] Tag test with `@smoke` annotation (match existing pattern from `home.spec.ts`)
  - [x] Verify test is picked up by `npm run test:smoke`

- [x] Task 4: Run full validation (AC: all)
  - [x] `npm run lint` — no new issues
  - [x] `npm run typecheck` — no new issues
  - [x] `npm test` — all existing unit tests pass (no new Jest tests needed; no controller change)
  - [x] `npm run test:smoke` — desktop smoke passes including new funnel test
  - [x] `npm run test:smoke:mobile` — mobile smoke passes

## Dev Notes

### Epic 4 Boundary (Carry-Forward from Stories 4.1 and 4.2)

Story 4.3 is the SYNTHESIS story of Epic 4. Its role is to combine the signals established in 4.1 and 4.2 into a single reviewable team guide, and to add a lightweight funnel navigation test that verifies the end-to-end funnel path is intact.

**What Story 4.3 is allowed to do:**
- ✅ Create a static Markdown team review guide at `docs/review-guide-funnel.md`
- ✅ Reference and synthesize signals already in place from 4.1 (UTM params) and 4.2 (request inbox review)
- ✅ Add one @smoke E2E test verifying the full proof-first funnel path is navigable
- ✅ Document honest gaps, limitations, and partial-data handling

**What Story 4.3 is explicitly forbidden from doing:**
- ❌ Installing Google Analytics, Plausible, or any third-party analytics script
- ❌ Firing JS tracking events (`gtag()`, `plausible()`, custom event dispatch)
- ❌ Creating a backend ingestion pipeline, request logging, or telemetry pipeline
- ❌ Building a live dashboard, live analytics surface, or any invented reporting UI
- ❌ Including personal data or raw excise codes in any reporting output
- ❌ Adding new UTM params beyond the three defined in Story 4.1
- ❌ Changing the request form, proof page, homepage, or any JS controller
- ❌ Adding new user-facing translation keys to `lang-toggle.js`
- ❌ Claiming guaranteed transport, server-side storage, or precise funnel counts

---

### Strict Signal Separation (4.1 → 4.2 → 4.3)

This separation is mandatory. Do not blur the boundaries.

| Story | Signal Layer | What it produces |
|-------|-------------|-----------------|
| **4.1** (done) | Homepage → Proof ENTRY | UTM param `proof_entry` on hero CTA href → `utm_source=homepage&utm_medium=hero_cta&utm_campaign=proof_entry` |
| **4.2** (done) | Request REVIEW | Scenario label in email body; `docs/review-guide-requests.md` for inbox review |
| **4.3** (this story) | FUNNEL SYNTHESIS | Combines 4.1 and 4.2 signals into one reviewable guide; adds one E2E funnel navigation test |

**Story 4.3 does NOT re-implement anything from 4.1 or 4.2.** It synthesizes them.

---

### Critical Dependencies Already in Place

Everything Story 4.3 synthesizes was built in earlier stories. Do not touch these.

| Component | Story | Status | Do NOT change |
|-----------|-------|--------|---------------|
| UTM params on hero CTA | 4.1 | ✅ done | `site/index.html:164` — exact UTM href |
| `SCENARIO_LABELS` map | 4.2 | ✅ done | `site/assets/js/request-form.js` |
| `getScenarioLabel()` function | 4.2 | ✅ done | `site/assets/js/request-form.js` |
| Scenario body line in `buildMailtoUrl` | 4.2 | ✅ done | `site/assets/js/request-form.js` |
| `docs/review-guide-requests.md` | 4.2 | ✅ done | Team review guide for inbox |
| `captureMetadata()` function | 3.4 | ✅ done | `site/assets/js/request-form.js` |
| Request form at `/request/` | 3.3 | ✅ done | `site/request/index.html` |
| Proof page at `/v/genuim/` | 2.1 | ✅ done | `site/v/genuim/index.html` |

---

### Review Guide Content Requirements

The guide at `docs/review-guide-funnel.md` must follow the same quality bar as `docs/review-guide-requests.md`. Structure required:

**Section 1: Phase 1 Funnel Overview**
- The three-step funnel: Homepage → Proof Example (`/v/genuim/`) → Request (`/request/`)
- All signals are passive and manual — no backend, no live data, no telemetry
- Review mechanism: combine GSC URL data + manual inbox review
- This guide is for product team review sessions, not for real-time monitoring

**Section 2: Funnel Step Definitions**

Step 1 — Homepage Entry → Proof Page:
- Signal source: UTM param `utm_campaign=proof_entry` on hero CTA href
- Observable: Google Search Console → Performance → filter `/v/genuim/` referral from homepage
- Limitation: Only the homepage HERO CTA carries this UTM. Direct navigation, demo input (`/v/`), external links, and other CTAs do not carry it.

Step 2 — Proof Page Engagement:
- Signal source: Page views on `/v/genuim/`
- Observable: GSC → Performance → queries + clicks for URL `/v/genuim/`
- Limitation: GSC reflects organic search impressions, not direct navigation or UTM arrivals. True page-view counts for non-organic traffic require an analytics tool (out of Phase 1 scope).
- Note: Visitors arriving via the homepage hero CTA will have UTM params in their URL bar — these are distinguishable in browser-level review tools if separately configured, but are not captured server-side.

Step 3 — Request Submission:
- Signal source: Email received at `hello@genu.im` with subject `genu.im request: CompanyName — scenario` and body containing `Scenario: Label [value]` and `Source: /path/`
- Observable: Manual inbox inspection (full guidance in `docs/review-guide-requests.md`)
- Limitation: `mailto:` is best-effort — delivery depends on visitor's mail client. Not all requests submitted will arrive in the inbox.

**Section 3: Reading the Funnel Together**

The minimal Phase 1 funnel review combines:
1. GSC signal count for `/v/genuim/` arrivals (directional, not precise)
2. Inbox count of received requests, grouped by scenario and source
3. A directional assessment: "Does the homepage entry path appear to be in use? Are requests arriving, and from which paths?"

Review template (simple, manual):
```
Funnel Review — [Date range]

Step 1: Homepage → Proof
- GSC impressions for /v/genuim/ in period: [N]
- GSC clicks for /v/genuim/ in period: [N]
- Note: UTM-attributed arrivals from hero CTA are not separately counted without an analytics tool

Step 2: Proof Engagement
- No direct signal beyond GSC page data above
- Qualitative: demo banner visible, proof page loads correctly ✅

Step 3: Requests
- Total emails received in period: [N]
- Brand Proof Rollout: [N]
- eAktsyz Readiness: [N]
- Scenario not set: [N]
- From /perevir-product/: [N]
- Source unknown: [N]

Phase 1 Limitation: mailto: delivery is not guaranteed. Request counts are directional only.
```

**Section 4: NFR13 Privacy Guardrails**
- Count by scenario label — safe
- Count by source path — safe
- Never include contact names, email, phone, or raw excise codes in funnel aggregates
- This applies to internal team documents shared beyond the inbox owner
- Reference: consistent with `docs/review-guide-requests.md` Section 5

**Section 5: Partial/Missing Data Handling**

| Missing input | What to write in review | What NOT to write |
|---|---|---|
| Step 1 GSC data unavailable | "Homepage-to-proof signal unavailable for this period" | "X visitors moved from homepage to proof" |
| Step 2 engagement not tracked | "Proof page engagement not measurable in Phase 1 without additional tooling" | "Y visitors engaged with the proof page" |
| Step 3 inbox empty | "No requests received in period via mailto: — known delivery limitation" | "0 requests submitted" |
| Step 3 partial delivery | "Z requests received; actual submission count may be higher due to mailto: delivery gap" | "Z requests submitted" |

Key principle: incomplete funnel data is expected and acceptable. State what is available, state what is not, and avoid claiming gaps are zero.

**Section 6: Known Phase 1 Limitations**
- UTM signal covers only the homepage hero CTA; other funnel entry paths carry no equivalent signal
- Proof page engagement is not directly measured; GSC data is organic-search-only
- `mailto:` delivery is environment-dependent; request count is directional, not definitive
- No backend, no live analytics, no telemetry pipeline
- This guide will be superseded when Phase 2+ analytics are adopted

---

### Funnel Smoke E2E Test Specification

New file: `tests/e2e/funnel.spec.ts`

**Pattern to follow:** identical to `tests/e2e/home.spec.ts` imports and structure.

```typescript
import { expect, test } from "@playwright/test";

test("@smoke proof-first funnel path is navigable end-to-end", async ({
  page,
  baseURL,
}) => {
  const base = baseURL ?? "http://localhost:3000";

  // Step 1: Homepage loads and hero CTA has proof_entry UTM params
  await page.goto(new URL("/", base).toString());
  await page.waitForLoadState("domcontentloaded");
  const heroCta = page.locator(".hero-actions .cta-button").first();
  await expect(heroCta).toBeVisible();
  const href = await heroCta.getAttribute("href");
  expect(href).toContain("/v/genuim/");
  expect(href).toContain("utm_campaign=proof_entry");

  // Step 2: Proof page loads
  await page.goto(new URL("/v/genuim/", base).toString());
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveTitle(/genu\.im/i);
  await expect(page.locator("main")).toBeVisible();

  // Step 3: Request form is reachable
  await page.goto(new URL("/request/", base).toString());
  await page.waitForLoadState("domcontentloaded");
  await expect(page.locator("form")).toBeVisible();
  await expect(page.locator("#scenario")).toBeVisible();
});
```

**Notes for the developer:**
- The `@smoke` tag is part of the test name string (existing convention — see `home.spec.ts` line 28)
- Use `page.goto()` for step transitions rather than clicking CTAs — avoids timing issues and keeps the test focused on funnel path existence, not navigation UX
- `#scenario` is the ID of the scenario select field in `site/request/index.html` (confirmed in `request-form.js`)
- Do NOT assert exact form field values or pre-filled params — that is covered by `tests/e2e/request-form.spec.ts`
- The test verifies the funnel path exists and each step loads, not specific business logic

---

### Shared-Touch Preflight (Carry-Forward from Epic 3 Retro)

**Run before writing any file:**
```
npm run test:smoke
npm run test:smoke:mobile
```
If any test fails before your change, stop and report. Do not proceed with a failing baseline.

**Files Story 4.3 WILL touch:**

| File | Change | Risk | Existing Tests Affected |
|------|--------|------|------------------------|
| `docs/review-guide-funnel.md` | New file | None | None |
| `tests/e2e/funnel.spec.ts` | New file | Low — additive | None (new file, runs in existing smoke suite) |

**Files Story 4.3 does NOT touch:**

| File | Reason |
|------|--------|
| `site/index.html` | Not in scope — UTM params already in place from 4.1 |
| `site/assets/js/request-form.js` | Not in scope — scenario labels already in place from 4.2 |
| `site/assets/js/lang-toggle.js` | Not in scope — no new user-facing translation keys |
| `site/assets/css/input.css` / `output.css` | Not in scope — no CSS changes |
| `site/request/index.html` | Not in scope — form unchanged |
| `site/v/genuim/index.html` | Not in scope — proof page unchanged |
| `tests/e2e/home.spec.ts` | Not in scope — existing UTM tests unchanged |
| `tests/request-form.test.js` | Not in scope — no new unit test needed (no new controller code) |

**Translation parity check:** NOT required. `lang-toggle.js` is not touched. No new user-facing strings added.

**Full smoke before done:** `npm run test:smoke && npm run test:smoke:mobile` MUST pass before marking story done. This includes the new funnel test.

---

### NFR13 Privacy Guardrails

NFR13: _Public measurement and reporting shall exclude full raw codes and personal data from public analytics outputs._

**Story 4.3 compliance:**

| Check | Compliance |
|-------|-----------|
| Funnel review guide aggregate data | Counts by scenario label and source path only — no names, email, phone, raw codes ✅ |
| Funnel review template | Uses placeholder variables [N] — instructs team to fill with counts only ✅ |
| E2E test assertions | Verifies structural presence of funnel steps — no personal data asserted ✅ |
| Missing-data language | States "unavailable" or "not captured" — never extrapolates to fill gaps ✅ |
| `mailto:` delivery framing | Explicitly described as best-effort; counts described as directional ✅ |

---

### Failure-Safe Behavior

This story produces documentation and a navigation smoke test. Both are inherently failure-safe:

| Scenario | Expected behavior |
|----------|-------------------|
| GSC data unavailable for a period | Review guide instructs to state "unavailable" — Section 5 |
| No inbox requests received | Review guide instructs to state "no requests received via mailto:, known delivery limitation" — Section 5 |
| `mailto:` delivery partial | Review guide instructs to state count as directional + note delivery gap — Section 5 |
| Funnel E2E test fails | Surfaces a regression in funnel path — test failure is intentional signal; fix the broken path before marking done |
| Future analytics tool adoption | Review guide Section 6 explicitly notes it will be superseded when Phase 2+ analytics are adopted |

---

### Non-Goals (Explicit)

The following are explicitly NOT part of Story 4.3 and must not be implemented:

1. **No analytics scripts** — no `<script>` tags for GA, Plausible, Matomo, or any analytics tool
2. **No JS tracking events** — no `gtag()`, `plausible()`, or custom event dispatch
3. **No backend ingestion** — no server-side event recording, logging endpoint, or telemetry pipeline
4. **No live dashboard** — no real-time data capture, no live funnel view, no invented HTML reporting page
5. **No new UTM params** — UTM scope is fixed from Story 4.1 (homepage hero CTA only); no additional UTM coverage in this story
6. **No new request form fields** — form is closed at 5 fields per NFR12; Story 4.2 is done
7. **No funnel page in `site/`** — the review guide is a `docs/` Markdown artifact for the team, not a published page
8. **No changes to existing controllers** — `request-form.js`, `lang-toggle.js`, `theme-toggle.js` must not be modified
9. **No precision claims** — do not imply that GSC data or inbox counts are precise funnel metrics; always describe them as directional signals
10. **No Epic 4 retrospective** — retrospective is a separate workflow; do not prepare it in this story

---

### Contract-First Implementation Brief

- **Story scope:**
  Create `docs/review-guide-funnel.md` synthesizing the three Phase 1 funnel signals from Stories 4.1 and 4.2 into a single reviewable team guide. Create `tests/e2e/funnel.spec.ts` with one @smoke test verifying the funnel path (homepage → proof → request) is navigable end-to-end.

- **Explicitly out of scope:**
  Analytics scripts, backend capture, live dashboard, telemetry, new UTM params, changes to any controller, new form fields, `lang-toggle.js` changes, new HTML pages in `site/`, Epic retrospective.

- **Files or areas expected to change:**
  - `docs/review-guide-funnel.md` — new file (primary deliverable)
  - `tests/e2e/funnel.spec.ts` — new file (one @smoke test)

- **Protected files or areas not to change:**
  - `site/assets/css/output.css` — must remain committed and unmodified (no CSS changes)
  - `site/assets/js/lang-toggle.js` — no changes
  - `site/assets/js/request-form.js` — no changes; Story 4.2 protected behavior must be preserved
  - `site/index.html` — no changes; UTM params from Story 4.1 must remain intact
  - `site/request/index.html` — no changes
  - `site/v/genuim/index.html` — no changes
  - All existing E2E spec files — no modifications to existing tests
  - `tests/request-form.test.js` — no new unit tests (no new controller code)

- **User-visible behavior that will change:**
  None. This story produces team-internal documentation and a regression test. No published site surface changes.

- **Behavior that must remain unchanged:**
  - The homepage hero CTA UTM params (4.1) must remain exactly `utm_source=homepage&utm_medium=hero_cta&utm_campaign=proof_entry`
  - The proof page at `/v/genuim/` must continue to load correctly
  - The request form at `/request/` must continue to load correctly with the `#scenario` field present
  - All 165 existing unit tests must continue to pass
  - All 41 desktop + 42 mobile existing smoke tests must continue to pass

- **Tests to add or update:**
  - NEW: `tests/e2e/funnel.spec.ts` — one @smoke test verifying the three-step funnel path is navigable

- **Validation commands to run:**
  ```
  npm run lint
  npm run typecheck
  npm test
  npm run test:smoke
  npm run test:smoke:mobile
  ```
  No CSS changes → `npm run build:css` not required.
  No new Jest unit tests → Jest coverage unchanged.

---

### Project Structure Notes

- `docs/review-guide-funnel.md` — follows the same zone as `docs/review-guide-requests.md` (team operational documentation, not published site content)
- `tests/e2e/funnel.spec.ts` — new spec file following the existing pattern from `tests/e2e/home.spec.ts`; imports from `@playwright/test` only; no page object needed (direct navigation pattern used)
- No new page object in `tests/e2e/pages/` is needed; the funnel test uses direct `page.goto()` navigation
- The review guide Markdown style should match `docs/review-guide-requests.md` for consistency: tables, code blocks for email formats, section numbering

---

### Project Contract Guardrails

- Preserve the current static-site architecture — this story produces documentation and a test only; nothing changes the published site surface
- Preserve product positioning: `genu.mark` publishes product proof; official state verification happens in `Diia` — the review guide must reinforce this distinction, not blur it
- No misleading claims: the review guide must clearly state that all Phase 1 signals are passive and best-effort; do not imply live lookup, real-time verification, backend submission, or guaranteed capture anywhere in the guide or test assertions
- No accessibility impact — no HTML changes
- No translation regression — no `lang-toggle.js` changes
- Review guide language must be honest about measurement gaps; use "directional signal" language, not "precise metric" language
- Review guide must not imply a live analytics pipeline exists now or will exist at review time

---

### Architecture Compliance

**Relevant constraints:**
- [Source: `_bmad-output/planning-artifacts/architecture.md`#85] Analytics Phase 1: "UTM params + manual review достатньо; GA/Plausible — опційно, з урахуванням privacy та бюджету" — the approved Phase 1 mechanism is exactly what 4.3 synthesizes.
- [Source: `_bmad-output/planning-artifacts/architecture.md`#56-58] FR29-FR31: "release-review visibility без backend analytics pipeline у межах цього pass" — Story 4.3 stays within this boundary.
- [Source: `_bmad-output/planning-artifacts/architecture.md`#207-210] Phase 1 metadata: "best-effort у generated `mailto:` payload; поведінка environment-dependent" — the review guide must reflect this constraint explicitly.
- [Source: `_bmad-output/planning-artifacts/epics.md`#77] NFR13: no raw codes, no personal data in public analytics outputs — applies to the review guide.
- [Source: `docs/project-contract.md`#3] Architecture Rule: no backend without explicit story approval — no backend in 4.3.
- [Source: `docs/project-contract.md`#10] Misleading Claims Rule: no implied live lookup, real-time verification, backend submission, or stored confirmation.

---

### Learnings from 4.1, 4.2, and Retrospectives

**From Story 4.1 (done):**
- Epic 4 preflight table proved its value — use it here too (see Shared-Touch Preflight above)
- Smoke before done is non-negotiable; run full suite, not just new tests
- UTM convention is locked: `utm_source=homepage`, `utm_medium=hero_cta`, `utm_campaign=proof_entry` — do not redefine

**From Story 4.2 (done):**
- The `docs/review-guide-requests.md` pattern works well — follow the same structure for the funnel guide
- `mailto:` transport limitation must be stated explicitly in every review artifact; never imply guaranteed delivery
- NFR13 guardrail must be explicitly included in each 4.x story review artifact (done above)
- Separation contract between stories is valuable — do not let 4.3 bleed into 4.1 or 4.2 concerns

**From Epic 3 Retrospective:**
- Shared-touch preflight is mandatory before any change — run smoke first
- Translation parity check only when `lang-toggle.js` is touched — NOT required for 4.3
- Status sync: after marking story done, verify sprint-status.yaml; after 4.3, check if epic-4 should close
- `[AI-Review][Should-Fix]` notation pattern — use it if any code review finds issues during implementation

**From Epic 2 Retrospective:**
- Story not `done` when known quality gaps remain — the funnel guide must be complete and honest before marking done
- Shared-touch files must be identified before implementation (done above — only 2 new files added)
- Tests before development: the funnel test spec is defined in Tasks before any file is written

---

### References

- [Source: `_bmad-output/planning-artifacts/epics.md`#725-748] Story 4.3 full AC text and epic boundary notes
- [Source: `_bmad-output/planning-artifacts/epics.md`#186-212] Epic 4 global guardrails and boundary
- [Source: `_bmad-output/planning-artifacts/epics.md`#77] NFR13: no raw codes, no personal data in public analytics outputs
- [Source: `_bmad-output/planning-artifacts/epics.md`#95-98] Phase 1 `mailto:` metadata: best-effort, no backend capture, environment-dependent
- [Source: `_bmad-output/planning-artifacts/architecture.md`#85] Analytics Phase 1: UTM params + manual review approved
- [Source: `_bmad-output/planning-artifacts/architecture.md`#56-58] FR29-FR31: release-review visibility without backend pipeline
- [Source: `_bmad-output/planning-artifacts/architecture.md`#207-210] Phase 1 metadata: best-effort; no backend capture defined
- [Source: `docs/project-contract.md`#3] Architecture Rule: preserve static-site boundary
- [Source: `docs/project-contract.md`#10] Misleading Claims Rule
- [Source: `docs/review-guide-requests.md`] 4.2 review guide — style template and consistency reference
- [Source: `_bmad-output/implementation-artifacts/epic-3-retro-2026-03-14.md`#155-182] Epic 4 boundary and critical guardrails
- [Source: `_bmad-output/implementation-artifacts/epic-3-retro-2026-03-14.md`#196-218] Action items: smoke before done, shared-touch preflight, translation parity, NFR13, status sync
- [Source: `_bmad-output/implementation-artifacts/epic-2-retrospective.md`#57-75] Process changes: preflight, strict done, shared-touch, tests before dev
- [Source: `_bmad-output/implementation-artifacts/4-1-track-movement-from-homepage-to-proof.md`#49-68] Epic 4 preflight and forbidden list
- [Source: `_bmad-output/implementation-artifacts/4-1-track-movement-from-homepage-to-proof.md`#76-98] UTM convention locked (do not redefine)
- [Source: `_bmad-output/implementation-artifacts/4-2-track-requests-by-scenario-and-source.md`#82-99] Epic 4 boundary carry-forward
- [Source: `_bmad-output/implementation-artifacts/4-2-track-requests-by-scenario-and-source.md`#416-424] Separation contract: 4.1 → 4.2 → 4.3
- [Source: `tests/e2e/home.spec.ts`#28-65] @smoke test naming and pattern convention to follow
- [Source: `tests/e2e/verification.spec.ts`#1-16] VerificationPage pattern for proof page smoke
- [Source: `site/index.html`#164] Hero CTA exact UTM href (do not modify)
- [Source: `site/assets/js/request-form.js`] SCENARIO_LABELS, getScenarioLabel, buildMailtoUrl (do not modify)

## Dev Agent Record

### Agent Model Used

anthropic/claude-haiku-4-5

### Implementation Plan

Story 4.3 synthesizes Phase 1 funnel signals from Stories 4.1 and 4.2 into a reviewable team guide. Implementation follows a narrow scope:

1. **Preconditions verified:** Story 4.1 UTM params (✅ in place), Story 4.2 scenario labels (✅ in place), review-guide-requests.md (✅ exists)
2. **Baseline smoke tests:** 41 desktop + 42 mobile tests pass ✅
3. **Created docs/review-guide-funnel.md** with all 6 required sections
4. **Created tests/e2e/funnel.spec.ts** with one @smoke test verifying funnel navigation
5. **All validations pass:** lint, typecheck, unit tests (165), desktop smoke (42), mobile smoke (43)
6. **No controller, CSS, or HTML changes** — Story 4.3 scope respected throughout

### Completion Notes

✅ **All Tasks Complete and Verified**

- **Task 1 (Preflight):** Baseline smoke tests all pass. No regressions to report.
- **Task 2 (Review Guide):** `docs/review-guide-funnel.md` created with comprehensive 6-section structure covering funnel overview, step definitions (with limitations and privacy guardrails), reading methodology, partial data handling, and Phase 1 constraints. Follows the same quality bar as `docs/review-guide-requests.md`.
- **Task 3 (E2E Test):** `tests/e2e/funnel.spec.ts` created with one @smoke test verifying the full proof-first funnel path (homepage → `/v/genuim/` → `/request/`) is navigable end-to-end. Test properly tags with `@smoke` and is picked up by smoke suite.
- **Task 4 (Validation):** All checks pass:
  - `npm run lint` — no new issues (1 pre-existing warning in commit-msg script, unrelated)
  - `npm run typecheck` — no type errors
  - `npm test` — all 165 unit tests pass
  - `npm run test:smoke` — 42 desktop tests pass (41 original + 1 new funnel test)
  - `npm run test:smoke:mobile` — 43 mobile tests pass (42 original + 1 new funnel test)

**Acceptance Criteria Satisfaction:**
- AC #1 (Funnel steps visible with consistent definitions): ✅ Review guide Section 2 defines all three steps with consistent sources and observable methods
- AC #2 (Funnel readable without raw personal data): ✅ Guide explicitly addresses privacy guardrails (Section 4) and only uses scenario labels and source paths, not personal data
- AC #3 (Partial/missing inputs handled honestly): ✅ Guide Section 5 provides explicit table of how to handle each missing-signal scenario; never extrapolates

**Scope Compliance:**
- ✅ No analytics scripts added (static Markdown doc only)
- ✅ No backend ingestion
- ✅ No new UTM params (uses only Story 4.1 params)
- ✅ No changes to request-form.js, lang-toggle.js, input.css, output.css, or any HTML
- ✅ No new user-facing strings requiring translation
- ✅ Funnel test focuses on navigation path, not form logic (existing tests cover form)

**Separation Contract Preserved:**
- Story 4.1 signal layer (UTM params) — unchanged ✅
- Story 4.2 signal layer (request inbox review) — unchanged ✅
- Story 4.3 synthesis layer (funnel guide + navigation test) — implemented ✅

### File List

**NEW FILES CREATED:**
- `docs/review-guide-funnel.md` — Team-internal Phase 1 funnel review guide
- `tests/e2e/funnel.spec.ts` — Playwright E2E test for funnel navigation (@smoke)

**MODIFIED FILES:**
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — Story status updated from `backlog` → `review` during story execution; 4-1 moved to `done`, 4-2 moved to `done`

**FILES NOT MODIFIED (as per story scope):**
- `site/index.html` — Hero CTA UTM params remain from Story 4.1
- `site/assets/js/request-form.js` — Scenario labels remain from Story 4.2
- `site/assets/js/lang-toggle.js` — No changes
- `site/assets/css/input.css` — No changes
- `site/assets/css/output.css` — Committed; no changes
- All other E2E specs — No modifications
- `tests/request-form.test.js` — No changes (no new Jest tests)

**TEST RESULTS SUMMARY:**
- Desktop smoke: 42 tests (41 existing + 1 new funnel test) — **ALL PASS** ✅
- Mobile smoke: 43 tests (42 existing + 1 new funnel test) — **ALL PASS** ✅
- Unit tests: 165 tests — **ALL PASS** ✅
- Typecheck: **OK** ✅
- Lint: **OK** (1 pre-existing warning, no new issues) ✅

---

### Senior Developer Review (AI)

**Reviewer model:** anthropic/claude-sonnet-4-6 (fresh context)
**Review date:** 2026-03-15
**Review outcome:** PASSED after fixes applied

**Findings summary:** 0 blocking · 4 should-fix (all fixed) · 3 non-blocking (documented)

**Should-fix issues fixed in this review pass:**

- `[AI-Review][Should-Fix][SF-1]` `docs/review-guide-funnel.md` Section 2 Step 1: UTM param (`utm_campaign=proof_entry`) is not observable via GSC — GSC measures organic search traffic, not homepage CTA clicks. Rewrote Observable, How-to-find, and Interpretation to clearly separate the UTM signal (Phase 2+ only) from the GSC organic search proxy.
- `[AI-Review][Should-Fix][SF-2]` `docs/review-guide-funnel.md` Section 2 Step 1 Interpretation: "Clicks >> Impressions" is mathematically impossible in GSC (clicks ≤ impressions by definition). Removed the false bullet and replaced with accurate interpretation bullets.
- `[AI-Review][Should-Fix][SF-3]` `docs/review-guide-funnel.md` Section 2 Step 2: Steps 1 and 2 shared the same GSC signal but presented duplicate "How to find it" instructions as if they were separate observables. Rewrote Step 2 to explicitly state it shares the Step 1 GSC proxy and has no independent Phase 1 signal.
- `[AI-Review][Should-Fix][SF-4]` Story File List: `sprint-status.yaml` was modified during story execution (status transitions) but not documented. Added to MODIFIED FILES.
- `[AI-Review][Should-Fix][SF-1-template]` `docs/review-guide-funnel.md` Section 3 Review Template: Note "UTM arrivals are included in the general click count above" was factually wrong (homepage CTA traffic is not in GSC at all). Corrected to state UTM arrivals are not captured in GSC.

**Non-blocking findings (not fixed, documented only):**

- `[AI-Review][Non-Blocking][NB-1]` Appendix email template shows `[raw-code]` placeholder without explicit note distinguishing inbox format from shareable report format. Privacy checklist in same Appendix covers this.
- `[AI-Review][Non-Blocking][NB-2]` "True page-view count" block in Step 1 was conceptually Step 2 content. Folded into "What the GSC proxy misses" note during SF-1 fix.
- `[AI-Review][Non-Blocking][NB-3]` E2E funnel test verifies only `utm_campaign=proof_entry`, not full UTM string. Acceptable: full UTM already covered by `home.spec.ts`; funnel test is scoped to navigation path existence.

**Scope and contract compliance:** ✅ All protected files untouched. No analytics scripts, no backend, no telemetry, no live dashboard, no personal data in review outputs. NFR13 fully compliant. Dependencies on 4.1 and 4.2 correctly referenced and not re-implemented.
