# Test Design: 100% E2E Coverage — genu.im

**Date:** 2026-06-06
**Author:** Murat / Master Test Architect
**Status:** Draft

---

## Executive Summary

**Scope:** System-level E2E test design for complete genu.im site (11 pages, core user journeys)

**Coverage Summary:**
- Pages: 11/11 covered (goal: 100%)
- Existing dedicated specs: 6 (home, request, verification×2, funnel, preferences, mobile)
- Trust-floor proxy coverage: 6 pages (about, contact, faq, privacy, proof-cases, terms)
- Gaps to close: 8 items

**Existing test inventory:**
- `home.spec.ts` — 486 lines (homepage, use-cases tabs, trust-floor, knowledge)
- `request-form.spec.ts` — 201 lines (form fields, validation, scenario, responsive)
- `verification.spec.ts` — 310 lines (/v/genuim/ proof + /v/ input surface)
- `funnel.spec.ts` — 33 lines (basic user flow)
- `genuim.preferences.spec.ts` — 113 lines (theme/lang, localStorage)
- `genuim.smoke.spec.ts` — 37 lines (basic smoke)
- `genuim.mobile.spec.ts` — 17 lines (burger menu)

**Total effort to close gaps:** ~8 hours

---

## Not in Scope

| Item | Reasoning | Mitigation |
|------|-----------|------------|
| **Performance/Lighthouse** | Separate scripts/run-lighthouse.cjs exists | Run via dedicated Lighthouse CI step |
| **Visual regression** | No screenshot diff baseline established | Add in future sprint |
| **API-level integration** | Static site, no backend API | N/A — E2E + static checks sufficient |

---

## Risk Assessment

### High-Priority Risks (Score ≥6)

| ID | Category | Description | P | I | Score | Mitigation | Owner |
|----|----------|-------------|---|---|-------|------------|-------|
| R1 | Analytics | GA4 not firing on all pages → lost visibility | 3 | 4 | 12 | Verify gtag loads + fires on every page | Murat |
| R2 | Navigation | Broken links between pages | 2 | 4 | 8 | Link validation across trust-floor pages | Murat |
| R3 | i18n | Language switch not persisting through navigation | 2 | 4 | 8 | Verify lang persistence across page visits | Murat |
| R4 | Theme | Dark mode preference lost on navigation | 2 | 4 | 8 | Verify theme persistence across page visits | Murat |
| R5 | Responsive | Content overflow on mobile (360px) | 3 | 3 | 9 | verify no horizontal overflow on all pages | Murat |

### Medium Risks (Score 3–5)

| ID | Category | Description | P | I | Score | Mitigation |
|----|----------|-------------|---|---|-------|------------|
| R6 | Edge inputs | Form/input handles special chars, XSS | 2 | 3 | 6 | Fuzz input tests |
| R7 | 404 | User lands on non-existent page | 1 | 4 | 4 | Verify 404 redirects to index |
| R8 | SEO | Structured data broken on one page | 2 | 2 | 4 | Verify JSON-LD per page type |

---

## Coverage Matrix

### Feature → Test Map

| Page / Feature | Existing Coverage | Test File(s) | Status |
|----------------|-------------------|--------------|--------|
| **/** homepage | Hero, CTA, UTM, use-cases tabs, responsive | home.spec.ts | ✅ Complete |
| **/** theme toggle | Light/dark/system, localStorage | genuim.preferences.spec.ts | ✅ Complete |
| **/** lang toggle | en/uk, localStorage | genuim.preferences.spec.ts | ✅ Complete |
| **/** mobile menu | Open/close at 375px | genuim.mobile.spec.ts | ✅ Complete |
| **/about/** | Trust-floor (resolve, h1, title, SEO, i18n, a11y, responsive) | home.spec.ts | ✅ Complete |
| **/contact/** | Trust-floor | home.spec.ts | ✅ Complete |
| **/faq/** | Trust-floor | home.spec.ts | ✅ Complete |
| **/privacy/** | Trust-floor | home.spec.ts | ✅ Complete |
| **/terms/** | Trust-floor | home.spec.ts | ✅ Complete |
| **/proof-cases/** | Trust-floor only (no content-specific tests) | home.spec.ts | ⚠️ GAP |
| **/knowledge/** | Full sections, SEO, JSON-LD, responsive | home.spec.ts | ✅ Complete |
| **/request/** | Form fields, validation, email fallback, scenario, responsive | request-form.spec.ts | ⚠️ GAP |
| **/v/** | Example code nav, known/unknown/empty, i18n, responsive, a11y | verification.spec.ts | ⚠️ GAP |
| **/v/genuim/** | Proof example, facts, demo, i18n, responsive, no-forbidden-words | verification.spec.ts | ✅ Complete |
| **GA4 analytics (all pages)** | ❌ Not tested | — | 🔴 GAP |
| **Desktop main nav** | No direct test for knowledge link in desktop | — | ⚠️ GAP |
| **Theme/lang cross-nav** | Preference not verified to persist through navigation | genuim.preferences.spec.ts | ⚠️ GAP |
| **404 / not-found** | ❌ Not tested | — | 🔴 GAP |
| **Structured data** | Only knowledge page checked | home.spec.ts | ⚠️ GAP |
| **User funnel** | Basic homepage→v/genuim→request/ | funnel.spec.ts | ✅ Complete |

---

## Gap Closure Plan

### 🔴 GAP-1: GA4 Analytics Tracking (P0)
**Risk:** R1 (Score: 12)

**Test scenarios:**
1. **GA gtag script loads on production hostname** — stub `location.hostname` → verify `<script>` with `G-RBD0C4LE5V` is injected
2. **GA gtag does NOT load on non-production** — stub non-matching hostname → verify no gtag script
3. **dataLayer initialized** — verify `window.dataLayer` exists
4. **gtag('config') called with correct ID** — spy on dataLayer.push
5. **Verify on every page** — run GA presence check on all 11 pages

**Effort:** 0.5h

---

### 🔴 GAP-2: 404 Behavior (P1)
**Risk:** R7 (Score: 4)

**Test scenarios:**
1. Navigate to `/nonexistent-page/` → verify redirect/fallback
2. Navigate to `/knowledge/nonexistent/` → verify graceful handling

**Effort:** 0.5h

---

### ⚠️ GAP-3: Verification /v/ Edge Input Cases (P0)
**Risk:** R6 (Score: 6)

**Test scenarios:**
1. Input code with leading/trailing spaces → verify trimmed
2. Input lowercase `gm-rb...` → verify case-insensitive match
3. Very long code (100+ chars) → verify not truncated, no overflow
4. Input `select`, `<script>`, XSS payload → verify no execution, safe display
5. Mixed case `Gm-RbD0...` → verify matched

**Effort:** 1h

---

### ⚠️ GAP-4: Request Form Edge Cases (P1)
**Risk:** R6 (Score: 6)

**Test scenarios:**
1. All fields empty → verify validation errors shown (all 5 fields)
2. XSS in name/company/context → verify HTML-escaped
3. Very long name (500 chars) → verify not truncated, respects maxlength
4. Email field: `not-an-email` → validation rejects
5. Email field: `user@` → validation rejects
6. Context: line breaks, emoji, HTML → verify safe
7. Tab navigation order → verify logical (name→email→company→scenario→context)

**Effort:** 1.5h

---

### ⚠️ GAP-5: Proof-Cases Content Tests (P2)
**Risk:** R2 (Score: 8)

**Test scenarios:**
1. Page renders with correct title `"Proof & Cases"`
2. Content sections render (case studies)
3. "Live deployment" case present and renders correctly
4. Responsive at 360px — no overflow
5. i18n: both languages render

**Effort:** 0.5h

---

### ⚠️ GAP-6: Desktop Main Nav — Knowledge Link (P2)
**Risk:** R2 (Score: 8)

**Test scenarios:**
1. At viewport ≥1024px: knowledge link visible in `#mainNav`
2. Click knowledge link → navigates to `/knowledge/`
3. Verify knowledge link has correct href, aria-label

**Effort:** 0.5h

---

### ⚠️ GAP-7: Theme/Lang Cross-Navigation Persistence (P1)
**Risk:** R3, R4 (Score: 8+8)

**Test scenarios:**
1. Set theme=dark → navigate to /about/ /contact/ /faq/ /knowledge/ → verify `.dark` persists on each page
2. Set lang=uk → navigate to 3 other pages → verify `html[lang="uk"]` persists
3. Set theme=light → navigate → verify light persists
4. Toggle theme, navigate, return → verify preference matches

**Effort:** 1.5h

---

### ⚠️ GAP-8: Structured Data on Non-Knowledge Pages (P2)
**Risk:** R8 (Score: 4)

**Test scenarios:**
1. Homepage: verify WebSite JSON-LD present, schema.org type, URL, name
2. Knowledge page: already tested
3. About / Contact / FAQ / Privacy / Terms: verify Organization or WebPage JSON-LD

**Effort:** 1h

---

## Test Architecture Recommendations

1. **New test file: `genuim.analytics.spec.ts`** — GAP-1 GA4 verification
2. **Extend `verification.spec.ts`** — GAP-3 edge input cases
3. **Extend `request-form.spec.ts`** — GAP-4 edge cases
4. **New test file: `trust-floor.spec.ts`** — GAP-5 proof-cases content
5. **Extend `home.spec.ts` or new `navigation.spec.ts`** — GAP-6 desktop main nav
6. **Extend `genuim.preferences.spec.ts`** — GAP-7 cross-navigation persistence
7. **Extend `home.spec.ts` or new `seo.spec.ts`** — GAP-8 structured data
8. **New test file: `routing.spec.ts`** — GAP-2 404 behavior

**New page objects (if needed):**
- Extend `genuim.page.ts` with GA/analytics helpers
- No new page objects needed for gaps 2-8

---

## Sign-off

| Role | Decision | Date |
|------|----------|------|
| Master Test Architect | | |
