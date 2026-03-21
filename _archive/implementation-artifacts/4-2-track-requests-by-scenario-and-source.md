# Story 4.2: Track Requests by Scenario and Source

Status: done

## Story

As a product team member,
I want to review requests by scenario and entry source,
So that I can see which paths create useful demand.

## Acceptance Criteria

**AC #1 — Metadata preserved for review:**

**Given** a qualified request is created
**When** request metadata is available
**Then** the request keeps its scenario and source details for review
**And** requests can be grouped by those fields

**AC #2 — No raw codes or personal data in reporting outputs:**

**Given** request review data is displayed
**When** scenario and source details are shown
**Then** full raw codes and personal data are not exposed in reporting outputs
**And** the request can still be understood for business review

**AC #3 — Missing metadata does not break reporting:**

**Given** a request is missing some metadata
**When** it appears in review data
**Then** the request is still visible
**And** missing metadata does not break reporting

## Tasks / Subtasks

- [x] Task 1: Verify baseline smoke is green before any change (AC: all)
  - [x] Run `npm run test:smoke` — confirm all existing tests pass before touching anything
  - [x] If any test fails, stop and report before proceeding

- [x] Task 2: Add scenario label lookup to `request-form.js` (AC: #1, #2)
  - [x] Add `SCENARIO_LABELS` constant map at the top of `request-form.js`, AFTER the `RECIPIENT` constant
  - [x] Entries (use exact values from `site/request/index.html` select options):
    - `"brand-proof"` → `"Brand Proof Rollout"`
    - `"eaktsyz"` → `"eAktsyz Readiness"`
  - [x] Add `getScenarioLabel(scenario)` function: returns `SCENARIO_LABELS[scenario]` if found, otherwise returns the raw `scenario` value (never throws, never returns undefined)
  - [x] Update `buildMailtoUrl`: change the Scenario body line from `Scenario: ${scenario}` to `Scenario: ${getScenarioLabel(scenario)} [${scenario}]` — keeps raw value in brackets for inbox filtering
  - [x] Keep subject line unchanged: `genu.im request: ${companyName} — ${scenario}` (already suitable for inbox filtering)
  - [x] Add `SCENARIO_LABELS` and `getScenarioLabel` to `module.exports` block

- [x] Task 3: Add unit tests for label lookup and review-readiness (AC: #1, #2, #3)
  - [x] Test `getScenarioLabel("brand-proof")` returns `"Brand Proof Rollout"`
  - [x] Test `getScenarioLabel("eaktsyz")` returns `"eAktsyz Readiness"`
  - [x] Test `getScenarioLabel("unknown-value")` returns `"unknown-value"` (raw value fallback)
  - [x] Test `getScenarioLabel("")` returns `""` (empty string fallback, no throw)
  - [x] Test `buildMailtoUrl` with `scenario: "brand-proof"` — Scenario body line contains `"Brand Proof Rollout [brand-proof]"`
  - [x] Test `buildMailtoUrl` with `scenario: "eaktsyz"` — Scenario body line contains `"eAktsyz Readiness [eaktsyz]"`
  - [x] Test `buildMailtoUrl` with `scenario: ""` — email body still produced, no crash, Scenario line is `" []"` or gracefully empty
  - [x] Test `buildMailtoUrl` with `source_path: ""` — Source line is omitted (existing behavior, verify still passes)
  - [x] Test `buildMailtoUrl` with `proof_path: ""` — Proof page line is omitted (existing behavior, verify still passes)
  - [x] Test `buildMailtoUrl` with all metadata empty — still returns a valid `mailto:` URL string
  - [x] NFR13 assertion: iterate `Object.values(SCENARIO_LABELS)` — assert no value contains only digits or matches an excise-code-like pattern (e.g., `/^\d+/`) — all values are descriptive text labels

- [x] Task 4: Create static team review guide (AC: #1, #2, #3)
  - [x] Create `docs/review-guide-requests.md` (new file)
  - [x] Include: Phase 1 review overview (manual inbox review, no backend, no dashboard)
  - [x] Include: Scenario-to-label mapping table
  - [x] Include: Source path reference table (known paths → page descriptions)
  - [x] Include: How to group requests (inbox filtering by subject keyword and body label)
  - [x] Include: NFR13 privacy guardrails for any aggregated reporting the team produces
  - [x] Include: Missing-metadata guidance (what a request without scenario/source looks like and how to handle it)
  - [x] Include: Explicit note that `mailto:` is best-effort — not all requests will arrive; do not claim guaranteed capture

- [x] Task 5: Run full validation (AC: all)
  - [x] `npm test` — all existing 150+ unit tests + new tests pass
  - [x] `npm run lint` — no new issues
  - [x] `npm run typecheck` — no new issues
  - [x] `npm run test:smoke` — desktop smoke passes (shared-touch: `request-form.js` modified, existing request form E2E coverage validates no regression)
  - [x] `npm run test:smoke:mobile` — mobile smoke passes

## Dev Notes

### Epic 4 Boundary (Carry-Forward from Story 4.1 Preflight)

**What Story 4.2 is allowed to do:**
- ✅ Add a scenario label lookup map to `request-form.js` for email body clarity
- ✅ Create a static team review guide Markdown document (`docs/review-guide-requests.md`)
- ✅ Add unit tests for label lookup, review-readiness, and missing-metadata graceful handling
- ✅ Build on data already captured in `mailto:` payload by Story 3.4 (`scenario`, `source_path`, `proof_path`)

**What Story 4.2 is explicitly forbidden from doing:**
- ❌ Installing Google Analytics, Plausible, or any analytics script tag
- ❌ Firing JS tracking events (`gtag()`, `plausible()`, custom event dispatch)
- ❌ Creating a backend ingestion pipeline, request logging, or telemetry pipeline
- ❌ Building a live dashboard or live analytics surface
- ❌ Including personal data or raw excise codes in any aggregated reporting output
- ❌ Claiming guaranteed transport or server-side storage of metadata
- ❌ Inventing a new request capture mechanism beyond what Story 3.4 established
- ❌ Adding new request form fields (NFR12: 5 fields max is already achieved)
- ❌ Building Story 4.3 content (funnel synthesis comes in the next story)

---

### Critical Dependency: Story 3.4 Metadata Foundation

Story 3.4 already implemented all metadata capture. Story 4.2 builds on it without replacing it.

**Existing functions (DO NOT change signatures or behavior):**

| Function | Location | Contract |
|----------|----------|---------|
| `captureMetadata(_loc)` | `request-form.js:26` | Reads `scenario`, `source_path`, `proof_path` — best-effort, returns empty strings when unavailable |
| `buildMailtoUrl({...})` | `request-form.js:53` | Builds `mailto:` URL from request data + metadata |
| `showFallbackWithMeta({...})` | `request-form.js:111` | Shows fallback UI with metadata preserved on page |

**The ONLY change to `buildMailtoUrl` is the Scenario body line:**

Current (Story 3.4):
```
Scenario: brand-proof
```

After Story 4.2:
```
Scenario: Brand Proof Rollout [brand-proof]
```

Everything else in `buildMailtoUrl` remains unchanged. Subject line format unchanged.

---

### Scenario Values and Labels (Audited from Source)

**Source files verified:**
- `site/request/index.html:147-149` — select option values
- `site/assets/js/lang-toggle.js:414-415` — EN display labels
- `site/assets/js/lang-toggle.js:844-845` — UK display labels

**Exact `SCENARIO_LABELS` map to implement:**

```javascript
// Scenario display labels for review-friendly email body.
// Keys: option values from #scenario select in site/request/index.html.
// Values: English display names for team-internal review emails.
// Source: lang-toggle.js EN translations (request.scenario.*).
const SCENARIO_LABELS = {
  "brand-proof": "Brand Proof Rollout",
  "eaktsyz":     "eAktsyz Readiness",
};
```

**Place this constant immediately after the `RECIPIENT` constant at the top of `request-form.js`.**

**`getScenarioLabel()` implementation:**

```javascript
const getScenarioLabel = (scenario) => {
  if (!scenario) return scenario || "";
  return SCENARIO_LABELS[scenario] || scenario;
};
```

Failure-safe: never throws, never returns undefined.

---

### Updated `buildMailtoUrl` Email Body Format (Story 4.2 Change)

Change the Scenario body line from:
```javascript
`Scenario: ${scenario}`,
```
To:
```javascript
`Scenario: ${getScenarioLabel(scenario)} [${scenario}]`,
```

**Full resulting email format (for developer verification):**

```
Subject: genu.im request: CompanyName — brand-proof

Contact: Jane Smith
Email / Phone: jane@company.ua
Company: Acme LLC
Scenario: Brand Proof Rollout [brand-proof]

Context:
We're launching a new product line and need marking proof for B2B clients.

Source: /perevir-product/

---
Sent via genu.im request form (mailto: handoff — not server submission)
```

When metadata is missing:
```
Subject: genu.im request: CompanyName — 

Contact: Jane Smith
Email / Phone: jane@company.ua
Company: Acme LLC
Scenario:  []

Context:
...

---
Sent via genu.im request form (mailto: handoff — not server submission)
```
(No Source or Proof page lines — omitted when empty. This is existing behavior from Story 3.4.)

---

### Team Review Guide Content Requirements

The guide at `docs/review-guide-requests.md` must cover:

**1. Phase 1 Review Overview**
- Requests arrive in the `hello@genu.im` inbox via `mailto:` handoff
- `mailto:` is best-effort: delivery depends on visitor's mail client being configured
- No backend storage; no guaranteed capture; no live dashboard
- Review mechanism: manual inbox inspection + optional email client filtering

**2. Scenario-to-Label Reference Table**

| Select Value | Display Label | Description |
|---|---|---|
| `brand-proof` | Brand Proof Rollout | Visitor exploring public proof for their marked product |
| `eaktsyz` | еАкциз Readiness | Visitor assessing readiness for еАкциз marking requirements |
| *(empty)* | *(not set)* | Scenario was not captured or visitor reached form directly |

**3. Source Path Reference Table**

| Source Path Value | Origin Page | Entry Trigger |
|---|---|---|
| `/perevir-product/` | Official check / routing page | B2B CTA on `/perevir-product/` with `?scenario=brand-proof` |
| `/request/` | Request form direct | Visitor opened `/request/` directly; no `?from=` param |
| `/v/genuim/` | Canonical proof example | CTA from proof example page (if implemented in future) |
| *(empty)* | Unknown / not captured | `captureMetadata()` returned empty string |

**4. Grouping Requests**
- Filter inbox by subject keyword: `brand-proof` or `eaktsyz`
- Filter inbox by body keyword: `Brand Proof Rollout` or `eAktsyz Readiness`
- Source path visible in email body as `Source: /perevir-product/` etc.

**5. NFR13 Privacy Guardrails for Any Team-Produced Summary**
- ✅ Count by scenario label (e.g., "8 brand-proof requests") — safe
- ✅ Count by source path (e.g., "5 from /perevir-product/") — safe
- ❌ Do NOT include contact names in any aggregated report
- ❌ Do NOT include email addresses or phone numbers in any aggregated report
- ❌ Do NOT include raw excise codes (product identifiers) anywhere in reporting outputs
- ❌ Do NOT publish request summaries that could identify individual requestors

**6. Missing-Metadata Handling**
- Requests without scenario: counted as "Scenario not set" — still visible and valid
- Requests without source: counted as "Source unknown" — still visible and valid
- Requests where `mailto:` likely failed (no email received): cannot be counted; this is a known Phase 1 limitation; do not claim guaranteed capture

---

### NFR13 Privacy Compliance Table

NFR13: _Public measurement and reporting shall exclude full raw codes and personal data from public analytics outputs._

| Check | Story 4.2 Compliance |
|-------|---------------------|
| `SCENARIO_LABELS` values | Descriptive text labels only — no excise codes, no visitor identifiers ✅ |
| `source_path` in email body | URL pathname strings — no personal data, no excise codes ✅ |
| `proof_path` in email body | URL pathname strings — no personal data, no excise codes ✅ |
| Team aggregated summary | Must NOT include contact names, email, phone (guide explicitly instructs) ✅ |
| Team aggregated summary | Must NOT include raw excise codes (guide explicitly instructs) ✅ |
| Email body itself | CAN include contact data (that is the purpose of the request form) — but team summaries cannot ✅ |

**Test requirement:** `Object.values(SCENARIO_LABELS).forEach(label => expect(label).not.toMatch(/^\d+/))` — no label starts with digits (excise code pattern guard).

---

### Shared-Touch Preflight (Carry-Forward from Epic 3 Retro)

**Run before writing any code:**
```
npm run test:smoke
```
If any test fails before your change, stop and report. Do not proceed with failing baseline.

**Files Story 4.2 WILL touch:**

| File | Change | Risk | Existing Tests Affected |
|------|--------|------|------------------------|
| `site/assets/js/request-form.js` | Add `SCENARIO_LABELS`, `getScenarioLabel()`, update one line in `buildMailtoUrl` | Low — additive | `tests/request-form.test.js` (run to confirm existing 150+ tests still pass) |
| `tests/request-form.test.js` | Add new test cases (label lookup + review-readiness) | Low | None broken |
| `docs/review-guide-requests.md` | New file | None | None |

**Files Story 4.2 does NOT touch:**

| File | Reason |
|------|--------|
| `site/assets/js/lang-toggle.js` | No new user-facing translation keys; email labels are team-internal English |
| `site/assets/css/input.css` / `output.css` | No CSS changes |
| `site/request/index.html` | No HTML changes; form structure unchanged |
| `site/index.html` | Not in scope |
| `tests/e2e/request-form.spec.ts` | Existing smoke tests cover request form flow; no new E2E needed (email body not testable in Playwright) |
| `tests/e2e/home.spec.ts` | Not in scope |

**Translation parity check:** NOT required. `lang-toggle.js` is not touched. No new user-facing strings added.

**Full smoke before done:** `npm run test:smoke && npm run test:smoke:mobile` MUST pass before marking story done.

---

### Failure-Safe Behavior

The scenario label lookup must be unconditionally failure-safe:

| Scenario | Expected behavior |
|----------|-------------------|
| `getScenarioLabel("brand-proof")` | Returns `"Brand Proof Rollout"` |
| `getScenarioLabel("eaktsyz")` | Returns `"eAktsyz Readiness"` |
| `getScenarioLabel("unknown")` | Returns `"unknown"` (raw value, no crash) |
| `getScenarioLabel("")` | Returns `""` (empty string, no crash) |
| `getScenarioLabel(undefined)` | Returns `""` (no crash) |
| `buildMailtoUrl` with all-empty metadata | Returns valid `mailto:` URL string |
| Request missing scenario AND source | Email still arrives, team can still review contact + context |

This matches the existing `captureMetadata()` pattern: best-effort, empty strings as graceful fallback. Do not break this pattern.

---

### Non-Goals (Explicit)

1. **No analytics scripts** — no `<script>` tags for GA, Plausible, Matomo, or any analytics tool
2. **No JS tracking events** — no `gtag()`, `plausible()`, or custom event dispatch
3. **No backend ingestion** — no server-side event recording, logging endpoint, or telemetry pipeline
4. **No live dashboard** — no real-time data capture, no live funnel view, no invented reporting UI
5. **No new request form fields** — NFR12 (5 user-entered fields) is already met; do not add fields
6. **No funnel synthesis** — synthesis of the homepage→proof→request funnel is Story 4.3
7. **No additional UTM params** — UTM scope is fixed from Story 4.1 (homepage hero CTA only)
8. **No changes to fallback mechanism** — `visibilitychange` + 1.8s timeout in `triggerMailtoWithFallback` is a known Phase 1 tradeoff; do not change it in this story
9. **No route renaming** — `/perevir-product/` technical debt is tracked and deferred to Phase 2

---

### Contract-First Implementation Brief

- **Story scope:** Add `SCENARIO_LABELS` constant and `getScenarioLabel()` function to `request-form.js`; update one line in `buildMailtoUrl` (Scenario body line) to include a human-readable label; add unit tests for label lookup and missing-metadata graceful handling; create a static team review guide at `docs/review-guide-requests.md`.

- **Explicitly out of scope:** Analytics scripts, backend capture, live dashboard, telemetry, new form fields, funnel synthesis (4.3), additional UTM params beyond 4.1, changes to any controller other than `request-form.js`.

- **Files or areas expected to change:**
  - `site/assets/js/request-form.js` — additive: new constant, new function, one updated line in `buildMailtoUrl`, updated `module.exports`
  - `tests/request-form.test.js` — new test cases appended
  - `docs/review-guide-requests.md` — new file

- **Protected files or areas not to change:**
  - `site/assets/css/output.css` — must remain committed and unmodified (no CSS changes)
  - `site/assets/js/lang-toggle.js` — no changes
  - `site/request/index.html` — no changes
  - `captureMetadata()` function signature and behavior — must remain unchanged
  - `showFallbackWithMeta()` function signature and behavior — must remain unchanged
  - `buildMailtoUrl()` subject line format — must remain unchanged
  - All other body lines in `buildMailtoUrl()` — only the Scenario line changes

- **User-visible behavior that will change:** None. The email body format changes slightly (Scenario line now includes display label in brackets). This is team-internal only and not visible to site visitors.

- **Behavior that must remain unchanged:**
  - All existing request form submission behavior
  - `captureMetadata()` — no changes to function
  - `validateForm()` — no changes
  - `applyUrlParams()` — no changes
  - `triggerMailtoWithFallback()` — no changes
  - All existing `buildMailtoUrl()` behavior except the Scenario body line
  - All existing 150+ unit tests must continue to pass

- **Tests to add or update:**
  - NEW: `getScenarioLabel()` for each known scenario value (`brand-proof`, `eaktsyz`)
  - NEW: `getScenarioLabel()` fallback for unknown and empty values
  - NEW: `buildMailtoUrl()` with label in Scenario body line (both known scenarios)
  - NEW: `buildMailtoUrl()` with missing scenario — no crash, valid mailto URL produced
  - NEW: `buildMailtoUrl()` with missing source_path — Source line omitted (verify existing behavior)
  - NEW: NFR13 assertion: no `SCENARIO_LABELS` value contains raw excise code pattern

- **Validation commands to run:**
  ```
  npm test
  npm run lint
  npm run typecheck
  npm run test:smoke
  npm run test:smoke:mobile
  ```
  No CSS changes → `npm run build:css` not required.
  No HTML changes → no manual browser check required.

---

### Project Structure Notes

- `site/assets/js/request-form.js` — add `SCENARIO_LABELS` after `RECIPIENT` constant; add `getScenarioLabel()` after `SCENARIO_LABELS`; update one line in `buildMailtoUrl`; extend `module.exports`
- `tests/request-form.test.js` — append new test blocks; do not restructure existing tests
- `docs/review-guide-requests.md` — new file; follows same zone as `docs/project-contract.md` (team operational documentation)
- No new test file needed; no new page object needed; no new E2E spec needed

---

### Project Contract Guardrails

- Preserve the current static-site architecture — this story touches one JS controller (additive only) and adds one Markdown doc; nothing changes the site's published surface
- Preserve product positioning: `genu.mark` publishes product proof; official state verification happens in `Diia` — not affected by this story
- No misleading claims: the review guide must clearly state that `mailto:` is best-effort and not guaranteed transport; do not claim that requests are "stored" or "recorded" server-side anywhere in the guide or code
- No accessibility impact — no HTML changes
- No translation regression — no `lang-toggle.js` changes
- Scenario labels in `SCENARIO_LABELS` are team-internal English labels for email review; they are NOT user-facing UI copy and do NOT need to be translated via `lang-toggle.js`

---

### Separation Contract (Story 3.4 → 4.2 → 4.3)

**Story 3.4 (done):** Metadata CAPTURE — `captureMetadata()`, `buildMailtoUrl()` with `scenario`/`source_path`/`proof_path` in body. Best-effort. No guarantees.

**Story 4.2 (this story):** Review/REPORTING USE — add human-readable label to email body; create team review guide; add tests for review-readiness and NFR13 compliance.

**Story 4.3 (next):** FUNNEL SYNTHESIS — review the homepage→proof→request funnel as a whole. Builds on 4.1 (UTM tracking) and 4.2 (request review). Story 4.3 is NOT in scope here.

Do not implement any Story 4.3 content in this story.

---

### References

- [Source: `_bmad-output/planning-artifacts/epics.md`#702-723] Story 4.2 full AC text
- [Source: `_bmad-output/planning-artifacts/epics.md`#677-212] Epic 4 boundary notes and global guardrails
- [Source: `_bmad-output/planning-artifacts/epics.md`#77] NFR13: no raw codes, no personal data in public analytics outputs
- [Source: `_bmad-output/planning-artifacts/epics.md`#95-98] Phase 1 `mailto:` metadata: best-effort, no backend capture, environment-dependent
- [Source: `_bmad-output/planning-artifacts/architecture.md`#85] Analytics Phase 1: UTM params + manual review; GA/Plausible optional
- [Source: `_bmad-output/planning-artifacts/architecture.md`#206-210] Phase 1 metadata: `scenario`, `source_path`, `proof_path` best-effort; no backend capture defined
- [Source: `docs/project-contract.md`#3] Architecture Rule: preserve static-site boundary
- [Source: `docs/project-contract.md`#10] Misleading Claims Rule: no implied live lookup, backend submission, or stored confirmation
- [Source: `_bmad-output/implementation-artifacts/epic-3-retro-2026-03-14.md`#159-182] Epic 4 boundary and critical guardrails from Epic 3 retro
- [Source: `_bmad-output/implementation-artifacts/epic-3-retro-2026-03-14.md`#196-218] Action items: translation parity check, full smoke before done, shared-touch preflight, NFR13 in every 4.x story
- [Source: `_bmad-output/implementation-artifacts/4-1-track-movement-from-homepage-to-proof.md`#49-68] Epic 4 preflight and forbidden list from Story 4.1
- [Source: `site/assets/js/request-form.js`#1-5] RECIPIENT constant — place SCENARIO_LABELS after this
- [Source: `site/assets/js/request-form.js`#22-48] `captureMetadata()` — must remain unchanged
- [Source: `site/assets/js/request-form.js`#51-91] `buildMailtoUrl()` — only Scenario body line changes
- [Source: `site/assets/js/request-form.js`#302-313] `module.exports` block — extend with new exports
- [Source: `site/request/index.html`#147-149] Scenario select option values: `brand-proof`, `eaktsyz`
- [Source: `site/assets/js/lang-toggle.js`#414-415] EN scenario display labels: "Brand proof rollout", "eAktsyz readiness"
- [Source: `site/assets/js/lang-toggle.js`#844-845] UK scenario display labels (reference only; not used in SCENARIO_LABELS)

## Dev Agent Record

### Agent Model Used

anthropic/claude-sonnet-4-6

### Debug Log References

- Baseline smoke: 41/41 passed before any code change
- All 65 pre-existing unit tests passed after Scenario line change (no regressions)
- JSDOM navigation `console.error` in `demo-input.test.js` is pre-existing, unrelated to Story 4.2
- Lint: 1 pre-existing warning in `scripts/generate-commit-msg.cjs` (`hasEnglish` unused variable), not in scope

### Completion Notes List

- Task 1: Baseline smoke green (41/41) — confirmed before touching any file
- Task 2: Added `SCENARIO_LABELS` constant after `RECIPIENT` in `request-form.js`; added `getScenarioLabel()` function (failure-safe); changed Scenario body line in `buildMailtoUrl` from `${scenario}` to `${getScenarioLabel(scenario)} [${scenario}]`; extended `module.exports` with both new exports
- Task 3: Added 15 new unit tests across 2 new `describe` blocks in `tests/request-form.test.js` — covers `getScenarioLabel()` for all 4 cases (brand-proof, eaktsyz, unknown, empty/undefined), `SCENARIO_LABELS` export, NFR13 pattern guard, `buildMailtoUrl` Scenario line format for both known scenarios, subject line unchanged assertion, empty scenario graceful handling, Source/Proof omission existing behavior verification, all-empty metadata valid URL
- Task 4: Created `docs/review-guide-requests.md` covering all 6 required sections: Phase 1 overview, Scenario-to-Label table, Source Path table, inbox grouping instructions, NFR13 privacy guardrails, missing-metadata handling + transport limitation reminder
- Task 5: Full validation — `npm test` 165/165, `npm run lint` 0 new issues, `npm run typecheck` clean, `npm run test:smoke` 41/41, `npm run test:smoke:mobile` 42/42
- Story 3.4 protected behavior fully preserved: `captureMetadata()`, `showFallbackWithMeta()`, `validateForm()`, `applyUrlParams()`, `triggerMailtoWithFallback()` — no changes to signatures or behavior
- Subject line format unchanged: `genu.im request: ${companyName} — ${scenario}`

### File List

- `site/assets/js/request-form.js` — added `SCENARIO_LABELS`, `getScenarioLabel()`, updated Scenario body line in `buildMailtoUrl`, extended `module.exports`
- `tests/request-form.test.js` — added 15 new tests in 2 new describe blocks (Story 4.2 label lookup + review-readiness)
- `docs/review-guide-requests.md` — new file, team review guide
- `_bmad-output/implementation-artifacts/4-2-track-requests-by-scenario-and-source.md` — story file updated (tasks, status, Dev Agent Record)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — status updated to "review"

## Senior Developer Review (AI)

**Date:** 2026-03-15  
**Reviewer:** Amelia (claude-sonnet-4-6)  
**Outcome:** ✅ APPROVED

**Summary:** 0 blocking / 0 should-fix / 3 non-blocking (accepted). Story stayed within narrow scope. All Story 3.4 protected behavior preserved. No scope creep. NFR13 compliant. File list accurate. Validation results consistent with 165/165 unit tests + 41/41 smoke (desktop) + 42/42 smoke (mobile).

**Non-blocking (accepted):**
- NB-1: `eaktsyz` key unquoted vs `"brand-proof"` quoted in SCENARIO_LABELS — style only, functionally identical
- NB-2: Empty scenario test checks `toContain("Scenario:")` but not ` []` format — within story spec tolerance
- NB-3: `AGENTS.md` in git diff, absent from File List — confirmed as separate governance addition, not app source
