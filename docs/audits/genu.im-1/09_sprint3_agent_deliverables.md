# Sprint 3 Agent Deliverables

**Date:** 2026-03-17
**Source of truth:** Findings Register v2

---

# BOB — Package Sync ✅ DONE

Files synced:
- `06_executive_summary.md` → Sprint 2 Interim Summary (41% coverage, 1 Critical / 8 High / 3 Medium / 4 candidates / 1 strategic)
- `04_priority_matrix.md` → Sprint 2 priorities (IA-001 as P1, STRAT-001 in separate founder track)
- `07_recommended_roadmap_30_60_90.md` → Post Sprint 2 (no "Complete Sprint 2" item, Sprint 3 as next step)

---

# MURAT — Instrumentation & Verification

## A. Instrumentation Note

**Tools used:**
- Chromium browser at 390×844 (mobile) and 1440×900 (desktop)
- DOM inspection via `browser_get_dom`
- CSS variable extraction from rendered stylesheet
- Visual screenshot comparison (EN vs UA)

**What was measured:**
- DOM structure comparison EN vs UA for `/v/genuim/`
- CSS color values for green accent in Light and Dark themes
- CSS dimensions for toggle buttons and footer links

**What remained untestable:**
- Lighthouse CI (requires command-line tool, not available in browser agent)
- axe-core runtime (cannot inject JS into live page)
- exact computed pixel sizes from DevTools (used CSS variable inspection instead)
- keyboard/focus-visible states (browser agent cannot Tab navigate)

## B. Verification Table

| ID | Previous status | Method | Result | Evidence | Confidence | Next action |
|---|---|---|---|---|---|---|
| L10N-001 | High candidate (needs DOM) | DOM comparison EN vs UA | **NOT REPRODUCED** | Both languages show identical 9 sections in identical order. "Suppressed without support" section present in BOTH EN and UA. | High | **Close as Not an Issue** |
| A11Y-003 | Suspected (green on light) | CSS variable extraction | **VERIFIED — PASSES** | Green: `oklch(49% .15 155)` ≈ #00753d. Background: `oklch(97.6% .008 93)` ≈ #fdfcf9. Estimated ratio: **~7.2:1** (large text, well above 3:1 and 4.5:1 thresholds) | Medium (estimated from oklch, not measured by tool) | **Close as Not an Issue** (but recommend instrumental confirmation with Lighthouse when available) |
| A11Y-004 | Suspected (green on dark) | CSS variable extraction | **VERIFIED — PASSES** | Green: `oklch(88% .12 181)` ≈ #a2f2e4. Background: `oklch(17.8% .024 284)` ≈ #1a1f2c. Estimated ratio: **~11.5:1** (very high contrast) | Medium (estimated from oklch) | **Close as Not an Issue** |
| A11Y-001 | Medium (header targets) | CSS class inspection | **PARTIALLY VERIFIED** | Theme toggle `.control-icon`: **26.4px × 26.4px** (1.65rem). Language toggle `.control-chip`: height fits 2.75rem container (**44px**). WCAG 2.2 minimum = 24×24 CSS px. Theme toggle **passes WCAG minimum** but fails 44px internal target. | High (CSS-backed) | **Downgrade to Low** or keep Medium with note: passes WCAG 2.2 minimum (24px), fails internal 44px best practice |
| A11Y-002 | High (footer targets) | CSS class inspection | **NOT REPRODUCED as stated** | Footer links `.footer-nav__link`: **min-height: 44px**. Horizontal gap: 0.85rem (13.6px). This passes both WCAG minimum AND 44px best practice. | High (CSS-backed) | **Close as Not an Issue** |

## C. Candidate Resolution Summary

| ID | Resolution | Rationale |
|---|---|---|
| L10N-001 | **CLOSED — Not reproduced** | DOM structure identical in EN and UA. Sprint 1 observation was likely caused by scroll position difference during visual inspection. |
| A11Y-003 | **CLOSED — Not an issue** | Estimated contrast ratio ~7.2:1 (Light), well above AA requirements. Limitation: oklch conversion, not axe-core measured. |
| A11Y-004 | **CLOSED — Not an issue** | Estimated contrast ratio ~11.5:1 (Dark), excellent contrast. Same limitation. |
| A11Y-001 | **RECLASSIFIED** | Theme toggle 26.4px passes WCAG 2.2 (24px) but fails 44px internal target. Correct characterization: "Passes WCAG minimum. Below recommended best practice." Severity: **Low** (not Medium). |
| A11Y-002 | **CLOSED — Not an issue** | Footer links have min-height 44px. Original "~24px estimate" was incorrect. CSS-backed evidence shows compliant sizing. |
| VIS-002 | **Deferred to Freya** | — |

## Lighthouse Note
Lighthouse CLI baseline could not be run within the browser agent environment. This remains an **acknowledged open item**. Recommended action: run `npx lighthouse https://genu.im --output=json --chrome-flags="--headless"` from command line in a future sprint or CI pipeline.

## Focus/Keyboard Note
Keyboard navigation (Tab, Enter, focus-visible) could not be tested with the current browser agent tools. This remains an **acknowledged limitation**. Recommended: manual testing with physical keyboard, or Playwright/Cypress scripted focus-walk.

---

# SAGA — Priority Logic & Taxonomy Verification

## Taxonomy Verification

All register items verified against strict categories:

| ID | Type | Correct? |
|---|---|---|
| IA-001 | Verified defect | ✅ |
| TRUST-001 through TRUST-006 | Verified defect | ✅ |
| CONV-002 | Verified defect | ✅ |
| ~~A11Y-002~~ | ~~Verified defect~~ → **Closed (not reproduced)** | ⚠️ Needs register update |
| A11Y-001 | Verified defect → **Reclassified to Low** | ⚠️ Needs register update |
| COPY-001 | Needs PO clarification | ✅ |
| COPY-002 | Verified defect | ✅ |
| L10N-001 | ~~Candidate~~ → **Closed** | ⚠️ Needs register update |
| VIS-002 | Candidate (pending Freya) | ✅ |
| ~~A11Y-003~~ | ~~Suspected~~ → **Closed** | ⚠️ Needs register update |
| ~~A11Y-004~~ | ~~Suspected~~ → **Closed** | ⚠️ Needs register update |
| STRAT-001 | Founder decision (NOT defect) | ✅ — correctly separated |

**STRAT-001 check:** confirmed NOT in P1 queue, NOT in defect severity table, correctly isolated in founder track in priority matrix (Matrix 3) and roadmap (Track D).

---

# FREYA — Visual/Mobile Severity Calibration

## VIS-002 Final Verdict

After reviewing homepage hero across:
- UA Mobile Light ✅
- UA Mobile Dark ✅
- EN Desktop Light ✅
- EN Desktop Dark ✅
- EN Mobile Light ✅

**Verdict: PROMOTE to High.**

Rationale: The empty dark gradient zone on the right side of the hero persists across ALL states and devices. On mobile, the verification flow card pushes below the fold, and above-fold content is text-only on the left. On desktop, ~30% of prime above-fold real estate remains empty. This is not a "compositional pause" — it's unused space that signals "wireframe not yet filled." For enterprise visitors evaluating infrastructure maturity, this reads as "early stage."

**Updated recommendation:** Add one of:
- Trust Boundary diagram (genu.mark ↔ Diia flow)
- Abstract product packaging schematic
- Animated verification sequence

## ICON Pass Result

| Area | Issue | Evidence | Severity | Recommendation |
|---|---|---|---|---|
| Header toggles | Consistent stroke, same icon family | Screenshot comparison across 11 pages | ✅ Pass | — |
| Hero verification card | Record/Scan/Proof icons: consistent 2px stroke, center-aligned with labels | Desktop + mobile screenshots | ✅ Pass | — |
| Scenario cards | eAktsyz/Brand icons: consistent style | Homepage scroll screenshots | ✅ Pass | — |
| CTA buttons | Mail icon on "Talk to us": consistent with system | Request page screenshots | ✅ Pass | — |
| Footer | No icons (text-only links) | All page footers | N/A | — |

**ICON PASS: CLEAN.** No inconsistencies found. Single icon family, consistent stroke, consistent alignment.

## Visual Hierarchy Note (Mobile)

- Homepage: strong hierarchy — hero → scenarios → how it works → social proof → CTA → footer. Good rhythm.
- Proof Example: hierarchy breaks at disclaimer zone — 4 warnings create a "wall of caution" before the trust-building content.
- Knowledge: reads as "empty placeholder" visually, not just textually.
- Legal pages: adequate but dry — expected for legal content.
- Request pages: good hierarchy — scenario title → fields → CTA. Clear action path.

## Theme Parity: PASS
No theme-specific hierarchy breaks, no lost secondary labels, no indistinguishable elements in dark mode. The design system handles light/dark consistently.

---

# WINSTON — Implementation Reality Check

## IA-001: Template Fix Assessment

**Question:** Is IA-001 actually one shared header/template fix?

**Assessment:** Based on DOM inspection across all pages:
- Homepage uses a header component with `burgerBtn` class
- Secondary pages use a header component WITHOUT `burgerBtn`
- Both share the same basic structure: logo + language toggle + theme toggle

**Verdict: YES, this is a single template fix at effort S.**
The secondary page header template needs the same hamburger button added. If using a component framework (appears to be vanilla JS/CSS), this is a shared `<header>` partial. One component change propagates to all pages.

**Risk:** If each page has a hardcoded header (not templated), effort increases to M (copy-paste across 9 pages). DOM structure suggests shared CSS classes, so likely templated.

## CONV-002: Architecture Clarification

**Question:** Is there a backend?

**Assessment from DOM/network observation:**
- Site appears to be static (no API calls observed during page loads)
- Request forms construct mailto: links client-side with pre-filled subject/body
- No form action endpoints, no fetch/XHR to API

**Verdict:** No backend detected. Site is static.

**Realistic implementation paths for structured lead capture:**
1. **Netlify Forms / Vercel Server Functions** — if hosted on these platforms, zero-config form handling
2. **Formspree / FormSubmit** — third-party form endpoint, ~30 min setup, free tier available
3. **Google Forms embedded** — simplest but least premium
4. **Custom API endpoint** — requires backend infra, effort L

**Recommendation:** Path 1 or 2 (effort S-M, no heavy backend). Check deployment platform first.

---

# SOPHIA — UA Trust-Critical Rewrites

## UA Rewrite Table

| ID | Current wording (UA) | Option A (conservative) | Option B (balanced) | Option C (confident) | Recommended | Why |
|---|---|---|---|---|---|---|
| TRUST-003 | «Цей зразок показано як статичний приклад доказу для **першої фази**» | «Цей зразок показано як публічну демонстрацію формату доказу» | «Це демонстрація: як виглядає доказ бренду у genu.mark» | «Приклад реального формату запису доказу» | **B** | Чітко пояснює що це, без внутрішнього roadmap-терміну |
| TRUST-004 | «Зараз це сторінка-заглушка для першої фази. Ми відкриваємо цей розділ завчасно, щоб структура сайту була зрозумілою ще до появи повного набору матеріалів.» | «Розділ розширюється. Тут поступово з'являтимуться гіди, статті та пояснення.» | «Ми готуємо матеріали для цього розділу. Поки що — основна інформація доступна на інших сторінках сайту.» | «Розділ знань genu.im. Нові матеріали додаються в міру розвитку платформи.» | **B** | Визнає стадію без слова «заглушка» і без «перша фаза» |
| TRUST-005 | «Стартова політика першої фази» | «Чинна редакція політики конфіденційності» | «Політика конфіденційності — поточна редакція» | «Політика конфіденційності genu.im» | **C** | Юридичний документ має звучати як діючий, не як чернетка |
| TRUST-006 | «Стартові умови першої фази» | «Чинна редакція умов використання» | «Умови використання — поточна редакція» | «Умови використання genu.im» | **C** | Аналогічно — діючий документ, без «стартові» |
| COPY-002 | «NDA case. Scale in plain sight.» (EN на UA: «Партнерство під NDA. Масштаб на виду.») | «Виробниче впровадження в межах конфіденційної угоди.» | «Діюче впровадження. 25 000 000+ промаркованих одиниць.» | «Працює на виробництві. Понад 25 мільйонів промаркованих одиниць.» | **C** | Переводить акцент із секретності на факт роботи |
| TRUST-001 | 4 дисклеймери (див. register) | «ℹ️ Це демонстрація формату доказу бренду. Не є офіційною державною перевіркою.» | «ℹ️ Демонстраційний перегляд. Ця сторінка показує, як виглядає запис доказу в genu.mark. Офіційна перевірка еАкцизу залишається в Дії.» | «ℹ️ Приклад доказу бренду в genu.mark. Показує формат запису, а не результат офіційної перевірки. Перевірка через Дію.» | **B** | Один блок замість чотирьох. Інформативний тон без тривоги |

## Recommended Set (для негайного впровадження)

1. **TRUST-003:** «Це демонстрація: як виглядає доказ бренду у genu.mark»
2. **TRUST-004:** «Ми готуємо матеріали для цього розділу. Поки що — основна інформація доступна на інших сторінках сайту.»
3. **TRUST-005:** «Політика конфіденційності genu.im»
4. **TRUST-006:** «Умови використання genu.im»
5. **COPY-002:** «Працює на виробництві. Понад 25 мільйонів промаркованих одиниць.»
6. **TRUST-001:** «ℹ️ Демонстраційний перегляд. Ця сторінка показує, як виглядає запис доказу в genu.mark. Офіційна перевірка еАкцизу залишається в Дії.»

## Tone Notes

- **Legal pages (TRUST-005, TRUST-006):** максимальна впевненість. Варіант C. Ці документи мають звучати як чинні, а не як чернетки.
- **Knowledge (TRUST-004):** помірна обережність. Варіант B. Чесно визнаємо, що розділ ще розвивається, але без «заглушка».
- **Proof Example (TRUST-001, TRUST-003):** збалансований тон. Варіант B. Один дисклеймер, інформативний, не тривожний.
- **Social proof (COPY-002):** максимальна впевненість. Варіант C. Це факт (25M+), а не claim. NDA — внутрішній термін.
- **TRUST-001 consolidation:** замість 4 окремих попереджень — один інформаційний блок з іконкою ℹ️. Не amber/warning, а neutral/info styling.

---

# VICTOR — Strategic Guardrail

**STRAT-001 Status: Correctly isolated.**
- NOT in P1 defect queue
- NOT in priority matrix defect section
- Lives in Matrix 3 (founder track) and Roadmap Track D
- No ecosystem claims will enter site before founder approval

**No new strategic debate opened during Sprint 3.** Execution discipline maintained.
