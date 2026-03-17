# P1 Remediation Plan — genu.im
**Scope:** IA-001, TRUST-002, TRUST-003, TRUST-004, TRUST-005, TRUST-006  
**Type:** Brownfield defect fix — verified P1 findings only  
**Date:** 2026-03-17  
**Status:** READY FOR REVIEW

---

## Summary

Six verified P1 defects. Three work streams:

| Stream | Finding(s) | Files touched | Effort |
|--------|-----------|---------------|--------|
| A — Nav | IA-001 | 9 HTML files | S |
| B — Phase 1 language | TRUST-003, TRUST-004, TRUST-005, TRUST-006 | `lang-toggle.js` only | XS |
| C — Source pill visual | TRUST-002 | `input.css` + rebuild `output.css` | XS |

**Execution order:** B → C → A  
Rationale: B and C are single-file, zero-risk, zero-layout changes. A touches 9 HTML files and must be validated across viewports — doing it last reduces noise if anything needs rechecking.

---

## Stream B — Remove Phase 1 Internal Language

**Finding(s):** TRUST-003, TRUST-004, TRUST-005, TRUST-006  
**File:** `site/assets/js/lang-toggle.js`  
**Risk:** Minimal. Translation string updates only — no markup, no CSS, no controller logic change.

### Constraint
- Do NOT remove disclaimers from the proof page (trust boundary rule). The `fact3Body` string must remain informative — just strip the "Phase 1" internal label from the end.
- Do NOT introduce new partner/authority claims.
- Text must remain factually accurate and complete.

### Changes (4 string pairs — EN + UK each)

#### TRUST-004 — `knowledge.section2.body`
**EN** (line ~314) — replace:
```
"Right now this is a Phase 1 placeholder. We are opening the navigation slot early so the information architecture is clear before the full content area is published."
```
with:
```
"This section is open early so the information architecture is clear before the full content area is published."
```

**UK** (line ~742) — replace:
```
"Зараз це сторінка-заглушка для першої фази. Ми відкриваємо цей розділ завчасно, щоб структура сайту була зрозумілою ще до появи повного набору матеріалів."
```
with:
```
"Цей розділ відкрито завчасно, щоб структура сайту була зрозумілою ще до появи повного набору матеріалів."
```

#### TRUST-005 — `privacy.lead`
**EN** (line ~342) — replace:
```
"Phase 1 starter policy. This page describes how genu.im handles data at this stage of operations."
```
with:
```
"This page describes how genu.im handles data at this stage of operations."
```

**UK** (line ~770) — replace:
```
"Стартова політика першої фази. На цій сторінці описано, як genu.im обробляє дані на поточному етапі роботи."
```
with:
```
"На цій сторінці описано, як genu.im обробляє дані на поточному етапі роботи."
```

#### TRUST-006 — `terms.lead`
**EN** (line ~359) — replace:
```
"Phase 1 starter terms. By using genu.im you agree to these conditions."
```
with:
```
"By using genu.im you agree to these conditions."
```

**UK** (line ~787) — replace:
```
"Стартові умови першої фази. Використовуючи genu.im, ви погоджуєтесь із цими умовами."
```
with:
```
"Використовуючи genu.im, ви погоджуєтесь із цими умовами."
```

#### TRUST-003 — `verification.fact3Body`
**EN** (line ~245) — replace:
```
"This sample item is shown as a static proof example for Phase 1."
```
with:
```
"This sample item is shown as a static proof example."
```

**UK** (line ~672) — replace:
```
"Цю одиницю показано як статичний приклад доказу для першої фази."
```
with:
```
"Цю одиницю показано як статичний приклад доказу."
```

### Post-fix verification
- Load `/knowledge/`, `/privacy/`, `/terms/`, `/v/genuim/` in both EN and UK.
- Confirm no "Phase 1", "placeholder", "starter" text visible.
- Confirm proof page still shows disclaimer (`proof-demo-banner`, `verification.lead`, `verification.demoNotice` — these must remain untouched).
- Run `npm test` — lang-toggle unit tests must pass.

---

## Stream C — Differentiate `proof-source-pill` Variants

**Finding:** TRUST-002  
**Files:** `site/assets/css/input.css` + `site/assets/css/output.css` (rebuild required)  
**Risk:** Minimal. CSS-only change, scoped to `.proof-source-pill` block. No markup change needed — pills are already distinguished by text content (`Source: genu.mark` vs `Source: brand`). We add a modifier class to the `genu.mark` pill to apply a distinct style.

### Decision required before executing
There are two implementation approaches. **Approach 1 is recommended.**

**Approach 1 — CSS attribute selector (no markup change)**  
Add a `[data-i18n="verification.fact1Source"]` attribute selector (or a content-based `:has` / sibling selector) directly in `input.css`. This targets the pill that maps to the `genu.mark` source without touching any HTML.

However, attribute-value selectors on `data-i18n` are fragile — if the key ever changes, the selector silently breaks. A cleaner alternative within this approach:

Add a `data-source-type="primary"` attribute to the `genu.mark` pill in `v/genuim/index.html` and style via `[data-source-type="primary"]`. This is a one-line HTML change on one file.

**Approach 2 — BEM modifier class**  
Add `proof-source-pill--primary` class to the `genu.mark` pill in `v/genuim/index.html` and define the modifier in `input.css`.

Both approaches require a one-line HTML change + CSS addition + CSS rebuild. Approach 1 with `data-source-type` is preferred: it uses a semantic data attribute, is resilient to i18n key changes, and clearly expresses intent.

### Chosen approach (pending your approval): `data-source-type="primary"` on HTML + CSS rule

#### HTML change — `site/v/genuim/index.html` line 115
```html
<!-- before -->
<span class="proof-source-pill" data-i18n="verification.fact1Source">Source: genu.mark</span>

<!-- after -->
<span class="proof-source-pill" data-source-type="primary" data-i18n="verification.fact1Source">Source: genu.mark</span>
```
Lines 121 and 126 (`fact2Source`, `fact3Source`) — no change. They remain `Source: brand` pills with neutral styling.

#### CSS change — `site/assets/css/input.css` after line 3276
Add immediately after the `.proof-source-pill` closing brace:
```css
.proof-source-pill[data-source-type="primary"] {
    border-color: --alpha(var(--color-brand) / 20%);
    background: --alpha(var(--color-brand) / 10%);
    color: var(--color-brand-deep);
    font-weight: 600;
}
```
This reuses the same brand color tokens already used by `.proof-evidence-link` (lines 3285–3287 in `input.css`), keeping the visual vocabulary consistent.

#### CSS rebuild
After editing `input.css`, run the Tailwind build to regenerate `output.css`. The CSS version query string on `v/genuim/index.html` line 51 (`output.css?v=19`) must be bumped to `v=20` (or the current next version).

> **Note:** Secondary pages use `output.css?v=17`. The proof page already uses `v=19`. Check what version secondary pages should be bumped to after Stream A — this must be consistent.

### Post-fix verification
- Load `/v/genuim/` in both EN and UK, both themes.
- Confirm `Source: genu.mark` pill has a brand-tinted appearance distinct from the two `Source: brand` pills.
- Confirm `Source: brand` pills remain unchanged (neutral).
- Run `npm test` — verification-page unit tests must pass.
- Run `npm run lint` — no new CSS violations.

---

## Stream A — Add Navigation to All Secondary Pages

**Finding:** IA-001  
**Affected files (9):**
1. `site/about/index.html`
2. `site/contact/index.html`
3. `site/knowledge/index.html`
4. `site/faq/index.html`
5. `site/proof-cases/index.html`
6. `site/privacy/index.html`
7. `site/terms/index.html`
8. `site/request/index.html`
9. `site/v/genuim/index.html`

**Risk:** Medium. Nine files, multiple viewports. The nav block includes interactive controls (burger, close). `menu.js` must be added to each page's script load. The nav link targets for section anchors (`#use-cases`, `#how-it-works`) are on the homepage only — secondary pages must use absolute paths.

### Nav block to insert

The nav block is identical to the homepage pattern, with two adaptations:
1. Section-anchor links become absolute (prefix `/`).
2. The `closeMenu` button `aria-label` keeps `data-i18n` — no static string.

```html
<nav id="mainNav"
    class="site-nav fixed inset-0 z-50 hidden md:flex md:static md:inset-auto md:z-auto">
    <a href="/#use-cases" class="site-nav__link" data-i18n="nav.useCases">Use cases</a>
    <a href="/#how-it-works" class="site-nav__link" data-i18n="nav.howItWorks">How it works</a>
    <a href="/knowledge/" class="site-nav__link" data-i18n="nav.knowledge">Knowledge</a>
    <button id="closeMenu" type="button" class="site-nav__close absolute top-5 right-5 md:hidden"
        aria-label="Close menu">&times;</button>
</nav>
```

> The homepage uses relative `#use-cases` and `#how-it-works` anchors. On secondary pages these must be `/#use-cases` and `/#how-it-works` (absolute root-relative) so they navigate back to the homepage section. The `/knowledge/` link remains unchanged.

### Insertion point (same for all 8 standard secondary pages)

In `site/about/index.html` (and all equivalent secondary pages), the current `<div class="header-controls">` at line 56 is:

```html
<div class="header-controls">
    <div class="utility-strip">
        ...
    </div>
</div>
```

Insert the `<nav>` block **before** `<div class="utility-strip">`:

```html
<div class="header-controls">
    <nav id="mainNav"
        class="site-nav fixed inset-0 z-50 hidden md:flex md:static md:inset-auto md:z-auto">
        <a href="/#use-cases" class="site-nav__link" data-i18n="nav.useCases">Use cases</a>
        <a href="/#how-it-works" class="site-nav__link" data-i18n="nav.howItWorks">How it works</a>
        <a href="/knowledge/" class="site-nav__link" data-i18n="nav.knowledge">Knowledge</a>
        <button id="closeMenu" type="button" class="site-nav__close absolute top-5 right-5 md:hidden"
            aria-label="Close menu">&times;</button>
    </nav>
    <div class="utility-strip">
        ...
    </div>
    <button id="burgerBtn" type="button" class="control-icon burger-button md:hidden"
        aria-controls="mainNav" aria-expanded="false" aria-label="Open menu">
        <svg class="burger-button__icon" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    </button>
</div>
```

The `<button id="burgerBtn">` must be placed **after** `<div class="utility-strip">`, matching the homepage DOM order exactly (since `menu.js` relies on correct tab order and `aria-controls`).

### `v/genuim/index.html` — identical insert
Same `<nav>` + `<button id="burgerBtn">` pattern. Insert point is `<div class="header-controls">` at line 62. The `v/genuim/` page is two levels deep so asset paths use `../../` — nav links use absolute `/` paths and are unaffected.

### Script tag additions

Each secondary page needs `menu.js` added to the end-of-body script block.

**Standard secondary pages** (one level deep, e.g. `about/index.html`):
```html
<script src="../assets/js/lang-toggle.js" defer></script>
<script src="../assets/js/theme-toggle.js" defer></script>
<script src="../assets/js/menu.js" defer></script>   <!-- ADD THIS LINE -->
```

**`v/genuim/index.html`** (two levels deep):
```html
<script src="../../assets/js/lang-toggle.js" defer></script>
<script src="../../assets/js/theme-toggle.js" defer></script>
<script src="../../assets/js/verification-page.js" defer></script>
<script src="../../assets/js/menu.js" defer></script>   <!-- ADD THIS LINE -->
```

Load order: `menu.js` after `lang-toggle.js` and `theme-toggle.js` to match the homepage pattern. `menu.js` calls `gmSiteI18n.t()` which is initialised by `lang-toggle.js`.

### CSS version bump for secondary pages
Secondary pages currently reference `output.css?v=17`. If Stream C rebuilds `output.css` (bumping to `v=20`), all secondary pages must be updated to the new version string at the same time. Coordinate with Stream C.

### Post-fix verification — per page
For each of the 9 pages:
- [ ] Desktop (≥768px): nav links visible in header, no burger button
- [ ] Mobile (<768px): burger button visible, nav hidden; tap burger → nav opens; tap close → nav closes
- [ ] Both EN and UK: nav link text translates correctly
- [ ] Both light and dark themes: nav renders correctly
- [ ] Clicking `/#use-cases` or `/#how-it-works` navigates to homepage section

Run `npm test` — `menu.test.js` must pass.  
Run Playwright e2e: `genuim.mobile.spec.ts` and `genuim.smoke.spec.ts` must pass.

---

## Open Questions / Decisions Needed

1. **TRUST-002 pill approach:** Confirmed choice is `data-source-type="primary"` attribute + CSS. Alternative is a BEM modifier class. Which do you prefer?

2. **TRUST-004 replacement text:** The proposed EN replacement is `"This section is open early so the information architecture is clear before the full content area is published."` — does this match the intent you want to convey? It keeps the factual substance while removing the internal label.

3. **CSS version coordination:** After Stream C rebuilds `output.css`, do you want all pages updated to the same version string (e.g. `v=20`), or only the pages that need the new pill styles? (Recommendation: bump all pages to the same version to avoid stale-cache issues.)

4. **`v/genuim/` nav context:** The proof page is a demo/example page. Should the nav on that page include the "Back to homepage" style, or is the standard nav (Use cases / How it works / Knowledge) appropriate? (Recommendation: standard nav — consistent with all other secondary pages.)

---

## Files Changed Summary

| File | Stream | Change type |
|------|--------|-------------|
| `site/assets/js/lang-toggle.js` | B | 8 string replacements (4 EN + 4 UK) |
| `site/assets/css/input.css` | C | Add ~4 CSS lines after `.proof-source-pill` |
| `site/assets/css/output.css` | C | Rebuild (Tailwind) |
| `site/v/genuim/index.html` | C + A | Add `data-source-type="primary"` to pill; add nav + burger block; add `menu.js` script; bump CSS version |
| `site/about/index.html` | A | Insert nav + burger block; add `menu.js`; bump CSS version |
| `site/contact/index.html` | A | Insert nav + burger block; add `menu.js`; bump CSS version |
| `site/knowledge/index.html` | A | Insert nav + burger block; add `menu.js`; bump CSS version |
| `site/faq/index.html` | A | Insert nav + burger block; add `menu.js`; bump CSS version |
| `site/proof-cases/index.html` | A | Insert nav + burger block; add `menu.js`; bump CSS version |
| `site/privacy/index.html` | A | Insert nav + burger block; add `menu.js`; bump CSS version |
| `site/terms/index.html` | A | Insert nav + burger block; add `menu.js`; bump CSS version |
| `site/request/index.html` | A | Insert nav + burger block; add `menu.js`; bump CSS version |

**Total files:** 12  
**`site/index.html`:** NOT touched (homepage nav is already correct)

---

## Post-Implementation Checklist

- [ ] `npm run lint` — passes
- [ ] `npm run typecheck` — passes
- [ ] `npm test` — all unit tests pass (lang-toggle, menu, verification-page)
- [ ] Playwright e2e — `genuim.smoke.spec.ts`, `genuim.mobile.spec.ts` pass
- [ ] Manual check: all 9 secondary pages render nav on mobile and desktop
- [ ] Manual check: all 9 secondary pages have no "Phase 1" / "placeholder" / "starter" text visible
- [ ] Manual check: `/v/genuim/` proof page — `genu.mark` pill visually distinct from `brand` pills
- [ ] Manual check: proof disclaimer text (`proof-demo-banner`, `verification.lead`) remains intact
- [ ] Update `docs/audits/genu.im-1/02_findings_register.md` — mark IA-001, TRUST-002, TRUST-003, TRUST-004, TRUST-005, TRUST-006 as FIXED
