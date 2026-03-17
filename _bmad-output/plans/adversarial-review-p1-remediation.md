# Adversarial Review — tech-spec-p1-remediation-nav-trust-pills.md
**Date:** 2026-03-17  
**Spec:** `_bmad-output/implementation-artifacts/tech-spec-p1-remediation-nav-trust-pills.md`  
**Method:** Three parallel reviewers — Blind Hunter (gaps), Edge Case Hunter (boundary failures), Acceptance Auditor (AC quality)  
**Status:** REQUIRES FIXES BEFORE DEV

---

## Verdict

The spec is **correct in intent** and **mostly correct in mechanics**. Two confirmed blockers (one real, one apparent) and several HIGH issues that, if unaddressed, will produce silent failures or non-verifiable ACs. All issues are fixable with targeted edits to the spec — no architectural rethink needed.

---

## Findings

### BLOCKERS

---

#### B1 — CSS version inventory is incomplete: `request/index.html` is at `v=18`, not `v=17`

**Finding:** Task 5 states "Текущие: homepage = `v=17`, большинство secondary = `v=17`". In reality, `site/request/index.html:43` is `output.css?v=18`. The Task 13 instruction says "идентично Task 6" which says bump `output.css?v=17` → `output.css?v=20`. A dev applying the instruction literally will search for `?v=17` in `request/index.html`, find nothing, and silently leave it at `v=18`.

**Actual inventory (confirmed):**
```
site/index.html:28              ?v=17
site/about/index.html:44        ?v=17
site/contact/index.html:44      ?v=17
site/faq/index.html:44          ?v=17
site/knowledge/index.html:6     ?v=17
site/privacy/index.html:44      ?v=17
site/proof-cases/index.html:44  ?v=17
site/terms/index.html:44        ?v=17
site/request/index.html:43      ?v=18   ← EXCEPTION
site/v/genuim/index.html:51     ?v=19
site/v/index.html:51            ?v=19   ← not in spec scope but exists
site/perevir-product/index.html:44  ?v=17  ← not in spec scope but exists
```

**Fix:** Task 5 must explicitly list each file + current version. Task 13 must say "bump `output.css?v=18` → `output.css?v=20`".

---

#### B2 — `site/index.html` CSS bump: spec says "all pages" (line 171) but homepage is Out of Scope (line 88) — direct contradiction

**Finding:** Task 5 says "Найти все `output.css?v=` на всех страницах и поднять версию." The Out of Scope section says "Изменения homepage (`site/index.html`) — там всё исправно." These are contradictory. After the CSS rebuild, homepage continues serving `v=17`. If a CDN or browser has cached the old `v=17`, the homepage won't get the new CSS. The new pill CSS only appears on `/v/genuim/` so homepage rendering is unaffected functionally — but version skew across the site is explicitly flagged as a risk in the spec's own Technical Decision #3.

**Fix:** Make an explicit decision and write it into Task 5:
- **Option A (recommended):** Bump `site/index.html` to `v=20` along with all other pages. It's a one-line change, zero functional risk, eliminates version skew.
- **Option B:** Keep homepage at `v=17` and document explicitly that homepage is exempt from version bump because no CSS changes affect it.

Either option is valid. The ambiguity is the bug.

---

### HIGH

---

#### H1 — `menu.js` guard description is wrong: "all absent → exit" should be "any absent → exit"

**Finding:** Spec lines 96 and 326 state `menu.js` "exits early if **all** absent." The actual code (`menu.js:37`):
```js
if (!burgerBtn || !closeMenu || !mainNav) { return; }
```
This exits if **any one** of the three is missing (OR, not AND). This matters for Task 14 (`v/genuim/`) which is a two-step insert (nav block + burger button). If a developer adds the nav block (providing `#mainNav` + `#closeMenu`) but forgets to add `#burgerBtn`, or vice versa, `menu.js` silently does nothing. The wrong description reduces the chance the developer checks for partial DOM presence.

**Fix:** Update spec lines 96 and 326 to: "Если **хотя бы один** из трёх элементов отсутствует — menu.js выходит без ошибки."

---

#### H2 — `border-color: --alpha(...)` in Task 4 CSS vs `border:` shorthand — NOT a real issue

**Verified:** `input.css` uses `border-color: --alpha(...)` standalone on lines 766, 1031, 1050, 1324, 1579. It's a valid pattern in this project's build. Edge Case Hunter finding is a false alarm — **no fix needed**.

---

#### H3 — ACs 11–16: negative-only assertions, no positive assertion for replacement text

**Finding:** AC-11 through AC-16 all specify what must NOT be present (Phase 1 prefixes) but none assert the correct replacement text IS present. A full deletion of the paragraph would silently pass all 6 ACs.

**Fix:** Add positive assertions to each:

| AC | Positive assertion to add |
|----|--------------------------|
| AC-11 | `"This section is open early so the information architecture is clear before the full content area is published."` |
| AC-12 | `"Цей розділ відкрито завчасно, щоб структура сайту була зрозумілою ще до появи повного набору матеріалів."` |
| AC-13 | `"This page describes how genu.im handles data at this stage of operations."` |
| AC-14 | `"На цій сторінці описано, як genu.im обробляє дані на поточному етапі роботи."` |
| AC-15 | `"By using genu.im you agree to these conditions."` |
| AC-16 | `"Використовуючи genu.im, ви погоджуєтесь із цими умовами."` |

---

#### H4 — AC-10: disclaimer check has wrong naming and no exact text specified

**Finding:** AC-10 says "дисклеймеры `proof-demo-banner`, `verification.lead`, `verification.demoNotice` остаются нетронутыми" — uses a CSS class name and two i18n keys inconsistently, and gives no exact expected text in either locale. A tester has no baseline to compare against.

**Fix:** Rewrite AC-10:
```
Given /v/genuim/ in EN, then:
  - element [data-i18n="verification.lead"] contains:
    "This page shows a brand-published proof example inside genu.mark. It is not live lookup and it is not an official state check."
  - element [data-i18n="verification.demoNotice"] / .proof-demo-banner contains:
    "Demo/example view only. This page shows a static proof example, not a live production lookup."
Given /v/genuim/ in UK, then the same elements contain their UK equivalents (keys unchanged, text unchanged from baseline).
```

---

#### H5 — Missing AC: `output.css` committed to git after Task 5

**Finding:** The project contract is explicit: `output.css` MUST be committed. Task 5 only says "запустить `npm run build:css`" and "проверить что файл изменился." There is no AC or task step requiring `git add site/assets/css/output.css`. Given the AGENTS.md git policy (all git mutating ops require explicit user permission), an AI agent implementing the spec will rebuild but never stage the file — and the live deploy will serve the old CSS.

**Fix:** Add to Task 5: "Note: `output.css` must be staged and committed as part of this change — GitHub Pages serves the committed file, not the local build artifact." Add a corresponding AC: "Given Task 5 is complete, `site/assets/css/output.css` in the git working tree contains the `.proof-source-pill[data-source-type='primary']` CSS rule."

---

#### H6 — AC-11 contains wrong prohibited phrase

**Finding:** AC-11 bans "opening the navigation slot" from the new knowledge body text. The new replacement text ("This section is open early so the information architecture is clear before the full content area is published.") does not contain this phrase, so the prohibition tests nothing. Additionally, banning this specific fragment could block legitimate future revisions that happen to use similar phrasing.

**Fix:** Remove "opening the navigation slot" from AC-11's prohibition list. Replace with the positive assertion from H3 above, which is strictly more useful.

---

### MEDIUM

---

#### M1 — Task 14 script insert line reference is off by one

**Finding:** Spec line 238 says "В конце тела (строка 183) добавить после `verification-page.js`". Actual `v/genuim/index.html:183` = `</body>` tag. Line 182 = `verification-page.js` script. The "after `verification-page.js`" instruction is correct; the parenthetical "(строка 183)" is wrong (that's the `</body>` line, not the insertion point).

**Fix:** Change "(строка 183)" to "(после строки 182, перед `</body>`)" or remove the line reference.

---

#### M2 — AC-7 is a non-testable composite criterion

**Finding:** AC-7 says "AC-1–AC-6 apply to ALL 9 secondary pages" — which is 54 distinct states in one checkbox. If any single state fails, the entire AC fails with no traceability to which page + behavior.

**Fix (pragmatic):** Keep AC-7 but add a verification matrix requirement: "The tester SHALL produce a 9-page × 4-state checklist (desktop/EN, desktop/UK, mobile-open/EN, mobile-open/UK) and attach it as the acceptance artifact for this AC." Alternatively, expand to per-page ACs — but that's 54 rows, which is excessive for a quick-spec.

---

#### M3 — Task 5 "find all" version bump is vague; enumerate explicitly

**Finding:** "Найти все `output.css?v=` на всех страницах" will capture `site/index.html`, `site/v/index.html`, `site/perevir-product/index.html` — none of which are in `files_to_modify`. The instruction produces a larger diff than intended.

**Fix:** Replace the grep-and-bump instruction with an explicit table. See B1 fix above for the full inventory.

---

#### M4 — `burgerBtn`/`closeMenu` hardcoded `aria-label` inconsistency not documented

**Finding:** The spec's HTML template has `aria-label="Open menu"` and `aria-label="Close menu"` hardcoded (matching the homepage pattern). `menu.js` overwrites these on init via `translateMenuLabel()`. The spec doesn't explain that this is intentional design and that `data-i18n-aria-label` must NOT be added to these buttons (which would conflict with `menu.js`'s ownership of those attributes).

This is not a bug — it works. But a developer reading the i18n rule ("hardcoded text in HTML is not allowed") will be confused and may "fix" it incorrectly.

**Fix:** Add a note in the Codebase Patterns section: "Exception: `#burgerBtn` and `#closeMenu` have hardcoded `aria-label` as a fallback; `menu.js` owns and updates these attributes dynamically via `translateMenuLabel()`. Do NOT add `data-i18n-aria-label` to these elements."

---

#### M5 — `site/perevir-product/` and `site/v/index.html` also lack nav and are not in scope

**Finding:** Two additional pages exist that were not in the IA-001 audit scope:
- `site/perevir-product/index.html` (at `?v=17`, no nav)
- `site/v/index.html` (at `?v=19`, no nav)

These are not in `files_to_modify` and are explicitly outside the current P1 scope. However, a developer doing a site-wide CSS version bump (per Task 5's "all pages" instruction) may touch these files too.

**Fix:** The explicit inventory fix in B1 above implicitly handles this — an enumerated list prevents accidental inclusion of out-of-scope files. Log this as a follow-up: `site/perevir-product/` and `site/v/index.html` likely need nav too — consider a separate P1 follow-up finding or confirm they're intentionally exempt.

---

### LOW

---

#### L1 — `knowledge/index.html` CSS `<link>` is at line 6, not line 44 like other secondary pages

Task 8 says "идентично Task 6" but the CSS link line is at line 6, not line 44 — the file has an unusual `<head>` structure. No structural impact on the nav insert (which goes into `<body>`), but a developer who tries to insert at "line 56" (as in about/) will insert at the wrong location. The "идентично" instruction is at risk on this page.

**Fix:** Add a note in Task 8: "Note: `knowledge/index.html` has an unusual `<head>` structure — CSS `<link>` is at line 6. Find `<div class='header-controls'>` by content search, not line number."

---

#### L2 — Nav self-link on active pages: `/knowledge/` link on the Knowledge page has no `aria-current`

The nav template includes `<a href="/knowledge/">Knowledge</a>` on all 9 pages. On the Knowledge page itself, this is a self-link with no `aria-current="page"` indicator. Same for any future active-page state. Not a regression (the homepage nav has the same limitation), but a missed accessibility improvement since nav is being added fresh to all pages.

**This is out of scope for P1 defect fixes.** Log as a follow-up accessibility improvement. No spec change needed now.

---

#### L3 — AC-11 "opening the navigation slot" prohibition is redundant

(See H6 above — folded into that fix.)

---

## Changes Required to Spec

Prioritized by impact:

| # | Location in spec | Change |
|---|-----------------|--------|
| B1 | Task 5 + Task 13 | Replace "majority at v=17" with explicit per-file version table; Task 13 must say bump `v=18` → `v=20` |
| B2 | Task 5 + line 88 | Explicitly decide: bump `site/index.html` to `v=20` (recommended) OR enumerate exact files to exclude homepage. Remove the contradiction. |
| H1 | Lines 96, 326 | "если все три отсутствуют" → "если хотя бы один из трёх отсутствует" |
| H3 | AC-11–AC-16 | Add positive assertion (exact expected text) to each |
| H4 | AC-10 | Rewrite with exact expected text in both EN and UK |
| H5 | Task 5 + new AC | Add "output.css must be committed" as task step + add AC |
| H6 | AC-11 | Remove "opening the navigation slot" from prohibited list |
| M1 | Task 14, line 238 | Fix "(строка 183)" → "(после строки 182, перед `</body>`)" |
| M2 | AC-7 | Add verification matrix requirement |
| M3 | Task 5 | Replace grep instruction with explicit file list |
| M4 | Codebase Patterns | Add note about aria-label ownership by menu.js |
| M5 | (follow-up) | Log perevir-product + v/index.html as follow-up nav gap |

---

## False Alarms (rejected findings)

| Claim | Why rejected |
|-------|-------------|
| `border-color: --alpha()` syntax invalid | `input.css` uses this pattern at lines 766, 1031, 1050, 1324, 1579 — confirmed valid |
| `v/genuim/` currently has `#burgerBtn` in DOM | Confirmed: `v/genuim/index.html:57–90` has NO `#burgerBtn`, `#mainNav`, or `#closeMenu` — only `#langToggle` and `#themeToggle` |
| Desktop nav hidden by `hidden` class conflict | Pre-existing homepage pattern, confirmed working; same CSS on secondary pages will work identically |
