---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-03-10'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
  - '_bmad-output/project-context.md'
  - 'docs/genu-im-homepage-master-plan.md'
workflowType: 'architecture'
project_name: 'gm'
user_name: 'GenuIm'
cssKnowledgeSources:
  - name: 'CSS-Tricks Almanac'
    url: 'https://css-tricks.com/almanac/'
    scope: 'CSS properties, functions, selectors — reference + examples'
  - name: 'CSS-Tricks: animation-timeline'
    url: 'https://css-tricks.com/almanac/properties/a/animation-timeline/'
    scope: 'Scroll-driven animations, view(), scroll() timelines'
  - name: 'CSS-Tricks: view()'
    url: 'https://css-tricks.com/almanac/functions/v/view/'
    scope: 'CSS-native Intersection Observer replacement'
  - name: 'CSS-Tricks: scroll()'
    url: 'https://css-tricks.com/almanac/functions/s/scroll/'
    scope: 'Scroll progress timeline animations'
  - name: 'CSS-Tricks Links Category'
    url: 'https://css-tricks.com/category/links/'
    scope: 'Curated modern CSS techniques — primary discovery source'
  - name: 'CSS-Tricks: Sequential linear() Animation'
    url: 'https://css-tricks.com/sequential-linear-animation-with-n-elements/'
    scope: 'Native stagger animations for N elements'
  - name: 'Chrome for Developers: Scroll-Triggered Animations'
    url: 'https://developer.chrome.com/blog/scroll-triggered-animations'
    scope: 'Official spec + browser support notes, Dec 2025'
  - name: 'Interop 2026'
    url: 'https://css-tricks.com/interop-2026/'
    scope: 'Cross-browser CSS feature roadmap for 2026'
date: '2026-03-10'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
32 FRs у 5 категоріях:
- Language & Theme (FR1–FR4): localStorage persistence; sync без SPA
- Homepage Narrative & Branches (FR5–FR9): proof-first з двома гілками; статичний HTML + JS scroll-narrative
- Proof Example & Demo Input (FR10–FR19, FR25): статичні proof-pages Phase 1; live lookup — Phase 3
- SEO Intercept & Lead Capture (FR21–FR24): форма — `mailto:` handoff Phase 1; scenario/source-path metadata capture без backend
- Knowledge Base & Trust Surface (FR26–FR31): статичні сторінки; knowledge base — IA reservation тільки

**Non-Functional Requirements:**
Ключові архітектурні constraints:
- Performance (NFR1–NFR4): Lighthouse ≥97, LCP <2.5s, CLS <0.1, INP <200ms, ≤150KB deferred JS — найжорсткіша constraint
- Accessibility (NFR5–NFR7): WCAG 2.1 AA; aria-* sync у всіх контролерах
- Language integrity (NFR8): 0 mixed-language fragments; нові компоненти через data-i18n / JS translation maps
- SEO (NFR9–NFR11): повний metadata stack на кожній індексованій сторінці
- Privacy & Security (NFR12–NFR14): HTTPS + security headers; ≤5 form fields; no PII in analytics
- Compatibility (NFR15–NFR16): Chrome/Edge/Firefox; 360px–1280px

**Scale & Complexity:**
- Primary domain: static web frontend (brownfield, GitHub Pages → Azure Web App)
- Complexity level: low-medium
- Estimated components: 8–10 JS-контролерів, 5–7 нових HTML-сторінок, 1 CSS шар розширення

### Technical Constraints & Dependencies

- **No build step on deploy:** output.css committed; без bundler runtime
- **Form submission Phase 1:** lightweight `mailto:` handoff for the approved 5-field request form; легко замінюється при переході на Azure
- **Planned migration: Azure Web App (free tier F1):** Known constraint: F1 не підтримує custom domain + SSL; при міграції потрібен мінімум B1 або Cloudflare proxy для SSL
- **Azure migration benefit:** custom HTTP headers (CSP, NFR14), form backend (Azure Functions), scenario/source/proof metadata — вирішуються нативно
- **URL routing:** `/v/genuim` і `/v/` — approved Phase 1 proof routes; additional named proof pages only after separate approval
- **External font (Manrope Variable):** ризик LCP/FOUC; self-host рекомендовано; font-display: swap + preload обов'язково
- **Performance budget ≤150KB:** обмежує бібліотеки; Intersection Observer + rAF нативні; без animation libraries
- **Security headers Phase 1:** GitHub Pages не підтримує повний control response headers; release gate = documented mitigations + явне визнання header limitations + `<meta http-equiv>` fallback для CSP де доречно
- **URL params prefill:** `?scenario=` читається RequestForm-контролером при init
- **Analytics Phase 1:** UTM params + manual review достатньо; GA/Plausible — опційно, з урахуванням privacy та бюджету

### Cross-Cutting Concerns Identified

1. **Performance budget** — обмежує шрифти, анімації, third-party scripts
2. **Bilingual support (UK/EN)** — inline translations, localStorage, hreflang; всі нові компоненти через data-i18n / JS translation maps
3. **Accessibility (WCAG 2.1 AA)** — aria-* sync у кожному JS-контролері
4. **Demo/Sample labeling** — наскрізний banner на всіх non-live surfaces
5. **No-data boundary** — semantic + copy + visual; ніяких червоних "помилок"
6. **Security headers** — meta-tag fallback Phase 1; повноцінно — після Azure
7. **Deployment migration path** — GitHub Pages → Azure Web App; архітектурні рішення мають враховувати обидва стани

## Starter Template Evaluation

### Primary Technology Domain

Static web frontend (brownfield). Проект вже існує і має зафіксований стек — нова ініціалізація не потрібна.

### Existing Foundation (No New Starter Required)

Brownfield проект з повністю зафіксованим стеком:

**Language & Runtime:**
- Vanilla JavaScript (ES modules, no transpilation)
- TypeScript strict mode — тільки для tooling і Playwright test files

**Styling Solution:**
- Tailwind CSS v4 (CSS-first, `@import "tailwindcss"`)
- Custom tokens via `@theme` in `site/assets/css/input.css`
- `output.css` committed to git (GitHub Pages, no build step)

**Build Tooling:**
- No bundler; Tailwind CLI watch for CSS only (`npm run dev`)
- `npm run build:css` for production artifact

**Testing Framework:**
- Jest v30 + JSDOM (unit/controller tests in `tests/`)
- Playwright v1.58 (E2E + smoke in `tests/e2e/`)
- Biome v2 (lint + format)
- Lighthouse v13 (performance/accessibility audits)

**Code Organization:**
- `site/` — единственная публичная поверхность
- `site/assets/js/` — DOM-first controllers (one responsibility per file)
- `site/assets/css/` — input.css (source) + output.css (artifact)
- `tests/` — Jest unit, `tests/e2e/` — Playwright, `tests/e2e/pages/` — page objects
- `scripts/` — automation/hooks

**Development Experience:**
- `npm run dev` — Tailwind watch
- `npm test` — Jest suite
- `npm run test:smoke` — Playwright smoke
- `npm run test:ci` — full CI flow (lint + typecheck + Jest + Playwright)
- Husky v9 pre-commit: auto build:css when input.css changes

**New Deliverables Structure for Phase 1:**

New HTML pages (in `site/`):
- `site/v/genuim/index.html` — canonical verification example
- `site/v/index.html` — paste-first demo input
- `site/about/index.html`, `site/faq/index.html`, etc. — trust-floor destinations

New JS controllers (in `site/assets/js/`):
- `animated-counter.js` — Intersection Observer + requestAnimationFrame
- `verification-page.js` — StatusBadge, NoDataState, demo-mode banner
- `request-form.js` — mailto fallback + URL param prefill (`?scenario=`)
- `scroll-reveal.js` — SVG flow diagram scroll animations

CSS extensions (in `site/assets/css/input.css`):
- New `@theme` tokens: `--surface-forest`, `--glow-green`, `--glow-amber`,
  `--font-display`, `--weight-ultra`, `--radius-bento`
- New patterns: `.bento-grid`, `.verification-ui`, `.branch-card`,
  `.kinetic-number`, `.flow-diagram`

Font (new):
- Manrope Variable — self-hosted in `site/assets/fonts/`
- `font-display: swap` + `<link rel="preload">` in `<head>`

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Proof page content model: Pure static HTML (Option A)
- Animation strategy: CSS-first + JS тільки для counter/SVG (Option B)
- URL routing: Directory/index pattern — `site/v/genuim/index.html` (Option A)
- SEO metadata: Manual HTML з шаблоном-коментарем + Refined SEO Architecture

**Important Decisions (Shape Architecture):**
- Knowledge Base IA: `/knowledge/{slug}/` зарезервовано; `/news/` зарезервовано
- JSON-LD стратегія: Layered Schema (Article + FAQPage + BreadcrumbList)
- hreflang: Single-URL паттерн з `x-default`
- robots.txt: явні Allow для AI-crawlers
- og:image: статичний `og-default.png` Phase 1

**Deferred Decisions (Post-Phase 1):**
- Per-page OG images → Phase 2
- Automated sitemap generation → Phase 2+
- NewsArticle schema + /news/ контент → Phase 2+
- Full HTTP security headers → migration to header-capable hosting
- Server-side language detection → Azure migration

### Data Architecture

Немає бази даних у Phase 1. Весь контент — статичний HTML.

- **Proof page data model:** Pure static HTML — контент закодований в HTML файлах. Нуль JS overhead для рендерингу. Phase 1 baseline обмежений canonical proof example `/v/genuim` і approved result states within `/v/`; named sample pages — тільки після окремого approval.
- **Translation data:** Inline JS translation maps (існуючий паттерн проекту); нові компоненти через `data-i18n` + JS translation maps
- **User preference persistence:** localStorage only (lang + theme)

### Authentication & Security

Немає автентифікації Phase 1 — публічний сайт.

- **Security headers Phase 1:** HTTPS + documented platform-appropriate mitigations + explicit acknowledgment of GitHub Pages header limitations; `<meta http-equiv>` fallback для CSP де доречно
- **Security headers on header-capable hosting:** Повноцінні HTTP headers після міграції на платформу з response-header control
- **Known limitation:** meta-tag CSP не покриває всього що HTTP header покриває; це зафіксовано як прийняте обмеження GitHub Pages Phase 1, а не як виконаний full-header equivalent

### API & Communication Patterns

Немає API Phase 1.

- **Form submission Phase 1:** `mailto:` handoff — мінімум зусиль, легко замінюється при Azure migration
- **Request metadata:** `scenario`, `source_path`, і опційний `proof_path` serializуються у generated mailto body/notification payload
- **Phase 2+:** Azure Functions endpoint для форми з повноцінним metadata capture

### Frontend Architecture

- **JS підхід:** Vanilla JS DOM-controllers, one responsibility per file
- **Animation strategy:** CSS-first для статичних ефектів (hover, pulse, fade-in через `@keyframes` + Tailwind transitions); JS тільки де CSS не справляється:
  - `animated-counter.js`: Intersection Observer + requestAnimationFrame
  - `scroll-reveal.js`: SVG stroke-dashoffset animation
- **State management:** localStorage only (lang + theme preference)
- **Routing:** Static HTML directory/index pattern; no client-side routing
- **Component rendering:** Pure static HTML для approved Phase 1 proof surfaces; JS-rendered з data object — Phase 2+ при розширенні catalog of named sample pages
- **URL param prefill:** `?scenario=` читається `request-form.js` при init (300ms delay)

### Infrastructure & Deployment

- **Phase 1:** GitHub Pages (static, committed output.css, no build on deploy)
- **Phase 2+:** Azure Web App
  - Free tier F1: Known constraint — no custom domain + SSL
  - Production: мінімум B1 або Cloudflare proxy для SSL
  - Azure benefit: custom HTTP headers, Azure Functions для форми, source-path metadata natively
- **CI/CD:** Існуючий GitHub Actions pipeline
- **Analytics Phase 1:** UTM params + manual review; GA/Plausible — опційно

### SEO Architecture

**Metadata паттерн (кожна індексована сторінка):**
- `<title>` унікальний
- `<meta description>` 150–160 chars
- `<link rel="canonical">`
- hreflang: uk + en + x-default → одна URL (single-URL JS i18n паттерн)
- `og:title`, `og:description`, `og:type`, `og:url`, `og:image` → `og-default.png`
- `og:locale: uk_UA` + `og:locale:alternate: en_US`
- `<html lang="uk">` статичний
- Known limitation: AI-crawlers без JS rendering бачать тільки `lang="uk"`

**JSON-LD патерни:**
- Homepage: `Organization` + `WebSite`
- Knowledge articles: `Article` + `FAQPage` + `BreadcrumbList`
- Verification pages (`/v/genuim/`): `ItemPage` + `BreadcrumbList`
- Demo input (`/v/`): noindex — JSON-LD не потрібен

**URL індексування:**
- `/v/genuim/` → index, follow
- `/v/` → noindex, nofollow
- `/knowledge/` → index, follow (placeholder Phase 1)
- `/news/` → не існує Phase 1

**Файлові SEO deliverables Phase 1:**
- `site/sitemap.xml` — статичний з priority схемою
- `site/robots.txt` — з Allow для GPTBot, ClaudeBot, PerplexityBot
- `site/assets/img/og-default.png` — 1200×630px
- `site/knowledge/article-template.html` — Layered JSON-LD заглушки

**Knowledge Base IA:**
- `/knowledge/{slug}/` — вічнозелений B2B контент (Phase 2+)
- `/news/` — зарезервовано (Phase 2+)
- Nav label: гнучкий (Knowledge / Insights / Resources)
- `article-template.html`: Article + FAQPage + BreadcrumbList JSON-LD

**robots.txt паттерн:**
```
User-agent: *
Allow: /
Disallow: /v/

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://genu.im/sitemap.xml
```

### Decision Impact Analysis

**Implementation Sequence:**
1. CSS tokens + Manrope Variable font (блокує всі компоненти)
2. Homepage HTML + JSON-LD + SEO metadata
3. `/v/genuim/` static HTML + ItemPage JSON-LD
4. JS controllers: `animated-counter.js`, `scroll-reveal.js`
5. Branch cards + `request-form.js` (mailto)
6. Trust-floor static pages
7. `sitemap.xml` + `robots.txt` + `og-default.png`
8. `article-template.html` (Knowledge IA reservation)

**Cross-Component Dependencies:**
- Font loading → LCP → всі сторінки залежать від preload стратегії
- CSS tokens → всі компоненти і сторінки
- hreflang паттерн → копіюється на кожну нову сторінку
- mailto заглушка → замінюється повністю при Azure; нема залежностей

## Implementation Patterns & Consistency Rules

### Critical Conflict Points (9 identified)

Правила нижче запобігають конфліктам між AI-агентами при реалізації Phase 1 deliverables.
Загальні правила проекту — в `project-context.md`.

### Naming Patterns

**JS-контролери (файли):** kebab-case
- ✅ `animated-counter.js`, `scroll-reveal.js`, `request-form.js`
- ❌ `animatedCounter.js`, `AnimatedCounter.js`, `scroll_reveal.js`

**CSS-класи (нові паттерни):** kebab-case BEM-подібний
- ✅ `.bento-grid`, `.bento-grid__card`, `.branch-card--eakciz`
- ❌ `.bentoGrid`, `.BentoGrid`, `.bento_grid`

**CSS-токени (нові):** префікс за категорією
- ✅ `--surface-forest`, `--glow-green`, `--font-display`
- Префікс: `--surface-*` для поверхонь, `--glow-*` для тіней, `--font-*` для шрифтів
- ❌ `--forestSurface`, `--greenGlow`, `--displayFont`

**HTML id атрибути:** camelCase
- ✅ `id="animatedCounter"`, `id="requestForm"`, `id="branchSection"`
- ❌ `id="animated-counter"`, `id="request_form"`

**data-i18n ключі:** dot-notation
- ✅ `data-i18n="hero.headline"`, `data-i18n="branch.eakciz.cta"`
- ❌ `data-i18n="heroHeadline"`, `data-i18n="hero_headline"`

### Structure Patterns

**JS Controller Pattern — обов'язкова структура:**

```javascript
// Шаблон для КОЖНОГО нового контролера
(function () {
  'use strict';

  function init() {
    const el = document.getElementById('myElement');
    if (!el) return; // fail soft — обов'язково
    bindEvents(el);
    syncState(el);
  }

  function bindEvents(el) { /* ... */ }
  function syncState(el) { /* ... */ }

  init();
})();
```

**Заборонено:**
- `document.addEventListener('DOMContentLoaded', ...)` — скрипти `defer`, DOM вже готовий
- `class MyController { ... }` — не використовуємо класи для контролерів
- Глобальні змінні без IIFE-обгортки

---

**HTML сторінка — обов'язковий порядок в `<head>`:**

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 1. Preload шрифт — ПЕРШИМ -->
  <link rel="preload" href="/assets/fonts/manrope-variable.woff2"
        as="font" type="font/woff2" crossorigin>
  <!-- 2. CSS -->
  <link rel="stylesheet" href="/assets/css/output.css">
  <!-- 3. SEO metadata -->
  <title><!-- FILL: унікальний title --></title>
  <meta name="description" content="<!-- FILL: 150-160 chars -->">
  <link rel="canonical" href="<!-- FILL: URL -->">
  <!-- 4. hreflang (завжди всі три) -->
  <link rel="alternate" hreflang="uk" href="<!-- FILL: URL -->">
  <link rel="alternate" hreflang="en" href="<!-- FILL: URL -->">
  <link rel="alternate" hreflang="x-default" href="<!-- FILL: URL -->">
  <!-- 5. OG tags -->
  <meta property="og:title" content="<!-- FILL -->">
  <meta property="og:description" content="<!-- FILL -->">
  <meta property="og:type" content="<!-- FILL: website|article -->">
  <meta property="og:url" content="<!-- FILL -->">
  <meta property="og:image" content="https://genu.im/assets/img/og-default.png">
  <meta property="og:locale" content="uk_UA">
  <meta property="og:locale:alternate" content="en_US">
  <!-- 6. JSON-LD — в <head>, НЕ перед </body> -->
  <script type="application/ld+json"><!-- FILL --></script>
  <!-- 7. Тема inline script для запобігання FOUC -->
  <script>/* theme init */</script>
</head>
```

**Заборонено:**
- JSON-LD перед `</body>` — має бути в `<head>`
- hreflang без `x-default`
- `<link rel="preload">` після CSS

---

**Tailwind — розширення токенів:**

```css
/* site/assets/css/input.css — ТІЛЬКИ через @theme */
@theme {
  --surface-forest: #0c1410;
  --glow-green: rgba(13, 138, 79, 0.15);
}
```

**Заборонено:**
- `style="background-color: #0c1410"` — inline стилі для design tokens
- Новий окремий `.css` файл замість розширення `input.css`

---

**Переклади нових компонентів:**

```javascript
// У JS translation map — ОБОВ'ЯЗКОВО для кожного user-visible string
const translations = {
  uk: { hero: { headline: 'Маркування що доводить себе' } },
  en: { hero: { headline: 'Marking that proves itself' } }
};
```

```html
<!-- В HTML — data-i18n атрибут, НЕ hardcode тексту -->
<h1 data-i18n="hero.headline">Маркування що доводить себе</h1>
```

**Заборонено:**
- Hardcode тексту в JS: `el.textContent = 'Маркування що доводить себе'`
- Окремі JSON-файли для перекладів
- Переклади без відповідного `data-i18n` атрибута в HTML

### Format Patterns

**Proof page static HTML — обов'язкова структура:**

```html
<main>
  <!-- Demo banner — ОБОВ'ЯЗКОВО на всіх Phase 1 proof pages -->
  <div class="demo-banner" role="status" aria-live="polite"
       data-i18n="demo.banner">
    Це демо-сторінка. Живі дані — після підключення.
  </div>
  <!-- Status badge -->
  <div class="status-badge status-badge--verified"
       role="status" aria-label="Верифіковано genu.mark">
    ✓ VERIFIED
  </div>
  <!-- Proof facts — source-labeled -->
  <dl class="proof-facts">
    <div class="proof-fact">
      <dt class="proof-fact__source">genu.mark</dt>
      <dd class="proof-fact__value"><!-- content --></dd>
    </div>
  </dl>
</main>
```

**Заборонено:**
- Proof page без persistent demo banner з initial render (Phase 1)
- Status badge без `role="status"` і `aria-label`
- Proof facts без source label

---

**Animation — CSS-first правило (2026):**

> 📚 Джерело: css-tricks.com — `animation-timeline`, `view()`, `scroll()`
> Chrome Dec 2025 shipped scroll-triggered animations natively.
> `view()` = CSS-native Intersection Observer. Використовуємо де є підтримка.

| Ефект | Підхід 2026 | Fallback |
|-------|------------|---------|
| hover lift | CSS `transition: transform 200ms ease-out` | — |
| pulse badge | CSS `@keyframes pulse` | — |
| fade-in секції | CSS `view()` + `animation-timeline` | JS `.is-visible` клас |
| scroll reveal (SVG flow) | CSS `view()` + `animation-timeline` | JS IO → клас |
| DataMatrix materialization | CSS `view()` + stagger via `--cell-index` | JS IO → `.is-visible` |
| number counter | JS (IO + rAF) — CSS не може рахувати числа | — |
| entry анімації | CSS `@starting-style` | `@keyframes` з `animation-fill-mode: both` |
| будь-що інше | CSS-first; JS тільки якщо CSS неможливо | — |

**Сучасний паттерн scroll-trigger (без JS):**
```css
/* view() = CSS-native Intersection Observer — Chrome/Firefox/Edge 2024+ */
.datamatrix-cell {
  animation: cellMaterialize 300ms ease-out both;
  animation-delay: calc(var(--cell-index) * 25ms);
  animation-timeline: view(); /* замість JS IntersectionObserver */
  animation-range: entry 0% entry 30%;
}
```

**Заборонено:**
- JS `setInterval` для анімацій
- CSS animation libraries (GSAP, Animate.css)
- JS-анімація для hover ефектів
- JS IntersectionObserver там де `view()` + `animation-timeline` підтримується

### Process Patterns

**Тестове покриття нових контролерів — обов'язковий мінімум:**

| Тип тесту | Що покриває | Де |
|-----------|------------|-----|
| Jest unit | `init()`, fail-soft при відсутності DOM | `tests/*.test.js` |
| Jest unit | aria-* sync при зміні стану | `tests/*.test.js` |
| Jest unit | localStorage read/write + failure fallback | `tests/*.test.js` |
| Playwright smoke | критичний user flow видимий | `tests/e2e/*.spec.js` |
| Playwright E2E | persistence після reload | `tests/e2e/*.spec.js` |

**Заборонено:**
- Контролер без Jest тесту на fail-soft (відсутній DOM)
- localStorage persistence тестувати в Jest (тільки Playwright)

---

**Error handling у контролерах:**

```javascript
// localStorage — ЗАВЖДИ try/catch
function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn('localStorage unavailable:', e);
  }
}

// DOM lookup — ЗАВЖДИ guard before use
function init() {
  const el = document.getElementById('myElement');
  if (!el) return; // silent fail — не console.error для optional nodes
}
```

### Special Pattern: DataMatrix Materialization ("25M+ кодів" блок)

**Концепція:** CSS-only анімація що комунікує унікальність і достовірність через
візуальну метафору друку і верифікації — без прямих слів.

**Три фази (CSS-driven):**
- Фаза 1 (0–800ms): 8×8 сітка квадратів матеріалізується зі stagger через `--cell-index`
  → кожен квадрат = унікальний верифікований запис; мікро-варіація opacity = неповторність
- Фаза 2 (800–1200ms): Amber scan-лінія (pseudo-element) проходить горизонтально
  → момент верифікації: надруковано і перевірено
- Фаза 3 (1200ms+): Soft green glow pulse — живий реєстр що росте
- Паралельно: JS `AnimatedCounter` 0 → 25M+ (окремий незалежний елемент)

**Subtle differentiator:** Ghost QR outline (`opacity: 0.08`, stroke only) у кутку блоку.
Без підписів. Контраст DataMatrix (живий, верифікований) vs QR (тінь, застарілий).

**CSS патерн (2026 — view() + animation-timeline):**

```css
/* === Фаза 1: Матеріалізація квадратів === */
/* Сучасний підхід: view() замість JS IntersectionObserver */
.datamatrix-cell {
  animation: cellMaterialize 300ms ease-out both;
  animation-delay: calc(var(--cell-index) * 25ms); /* native stagger */
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
  opacity: 0; /* @starting-style alternative for entry */
}
@keyframes cellMaterialize {
  from { opacity: 0; transform: scale(0.6); }
  to   { opacity: var(--cell-opacity, 1); transform: scale(1); }
}

/* === Фаза 2: Amber scan line === */
.datamatrix-grid::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  height: 2px;
  background: var(--color-amber, #c97a0a);
  box-shadow: 0 0 12px var(--glow-amber);
  animation: scanSweep 500ms ease-in-out both;
  animation-delay: 800ms;
  animation-timeline: view();
  animation-range: entry 20% entry 60%;
}
@keyframes scanSweep {
  from { top: 0; opacity: 0; }
  50%  { opacity: 1; }
  to   { top: 100%; opacity: 0; }
}

/* === Фаза 3: Living pulse === */
.datamatrix-grid {
  animation: gridPulse 3s 1200ms ease-in-out infinite;
}
@keyframes gridPulse {
  0%, 100% { filter: drop-shadow(0 0 4px var(--glow-green)); }
  50%       { filter: drop-shadow(0 0 14px var(--glow-green)); }
}

/* === Fallback для старих браузерів (без animation-timeline) === */
@supports not (animation-timeline: view()) {
  .datamatrix-cell {
    animation-play-state: paused;
    animation-timeline: auto; /* reset */
  }
  .datamatrix-grid.is-visible .datamatrix-cell {
    animation-play-state: running;
  }
  /* JS додає .is-visible через IntersectionObserver як fallback */
}

/* === prefers-reduced-motion — ОБОВ'ЯЗКОВО === */
@media (prefers-reduced-motion: reduce) {
  .datamatrix-cell,
  .datamatrix-grid::after,
  .datamatrix-grid { animation: none; opacity: 1; }
}
```

**Правило для агентів:**
- Весь візуал блоку — CSS
- JS тільки як fallback: `@supports not (animation-timeline: view())` → IO → `.is-visible`
- `AnimatedCounter` (25M+) — окремий JS-контролер, незалежний від CSS grid
- Ghost QR — декоративний inline SVG з `aria-hidden="true"`
- `--cell-index: N` встановлюється в HTML `style` атрибуті кожного `.datamatrix-cell`
- `--cell-opacity` варіюється (0.7–1.0) для ефекту унікальності кожного квадрата

### Enforcement Guidelines

**Всі AI-агенти МУСЯТЬ:**
- Читати `project-context.md` перед реалізацією будь-якої story
- Використовувати `data-i18n` для кожного user-visible string
- Додавати fail-soft guard на кожен DOM lookup в контролері
- Обгортати localStorage в try/catch
- Дотримуватись HTML `<head>` порядку з цього документа
- Розміщувати JSON-LD в `<head>`, не перед `</body>`
- Покривати кожен новий контролер Jest unit тестами

**Перевірка:**
- `npm run lint` — Biome перевіряє JS/CSS стиль
- `npm run typecheck` — TS перевіряє tooling файли
- `npm test` — Jest покриття контролерів
- `npm run test:smoke` — Playwright критичні flows
- `npm run lighthouse` — performance/accessibility gates

### CSS Knowledge Sources (2026)

> AI-агенти ПОВИННІ звертатись до цих джерел перед реалізацією будь-яких
> CSS анімацій, scroll-ефектів, або нових CSS-паттернів. Джерела актуальні
> станом на 2026 і відображають сучасні можливості браузерів.

| Джерело | URL | Область |
|---------|-----|---------|
| **CSS-Tricks Almanac** | https://css-tricks.com/almanac/ | Properties, functions, selectors — reference + приклади |
| **CSS-Tricks Links** | https://css-tricks.com/category/links/ | Curated modern CSS — **primary discovery source** |
| **animation-timeline** | https://css-tricks.com/almanac/properties/a/animation-timeline/ | Scroll-driven animations, `view()`, `scroll()` timelines |
| **view() function** | https://css-tricks.com/almanac/functions/v/view/ | CSS-native Intersection Observer для scroll-trigger |
| **scroll() function** | https://css-tricks.com/almanac/functions/s/scroll/ | Scroll progress timeline |
| **Sequential linear()** | https://css-tricks.com/sequential-linear-animation-with-n-elements/ | Native stagger для N елементів |
| **Chrome: Scroll-Triggered** | https://developer.chrome.com/blog/scroll-triggered-animations | Офіційний spec + browser support (Dec 2025) |
| **Interop 2026** | https://css-tricks.com/interop-2026/ | Cross-browser CSS roadmap 2026 |

**Ключові сучасні CSS можливості (2025–2026) для цього проекту:**

| Функція | Підтримка | Застосування в genu.im |
|---------|-----------|----------------------|
| `animation-timeline: view()` | Chrome/Firefox/Edge ✅ Safari partial | DataMatrix reveal, section fade-in |
| `animation-range` | Chrome/Firefox/Edge ✅ | Контроль scroll-trigger точки |
| `@starting-style` | Chrome/Firefox ✅ Edge ✅ | Entry-анімації без JS |
| Native stagger `calc(var(--i) * Nms)` | Всі ✅ | DataMatrix cell stagger |
| Container Queries | Всі ✅ | Bento grid responsive адаптація |
| `linear()` easing | Chrome/Firefox/Edge ✅ | Smooth counter animation |

**Правило для агентів:** Перед написанням JS-анімації — перевір чи `view()` +
`animation-timeline` вирішує задачу. Якщо так — використовуй CSS. JS тільки
для логіки (лічильники, стан) або `@supports`-fallback.

## Project Structure & Boundaries

### Complete Project Directory Structure

```
gm/ (repository root)
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Lint + typecheck + Jest + Playwright
│       ├── deploy-pages.yml          # GitHub Pages deploy (main only)
│       ├── site-ci.yml               # Site-impacting changes only
│       └── infra-checks.yml          # Workflow/hook/script changes only
├── .husky/
│   ├── pre-commit                    # auto build:css when input.css changes
│   └── prepare-commit-msg            # AI commit message generation (with fallback)
├── _bmad/                            # BMAD project system (not published)
├── _bmad-output/                     # BMAD outputs (not published)
│   └── planning-artifacts/
│       ├── architecture.md           # ← ЦЕЙ ДОКУМЕНТ
│       ├── prd.md
│       └── ux-design-specification.md
├── docs/                             # Project documentation (not published)
├── scripts/
│   ├── generate-commit-msg.cjs       # AI commit message automation
│   └── lighthouse.cjs                # Lighthouse audit runner
├── tests/
│   ├── setup.js                      # Jest global mocks
│   ├── theme-toggle.test.js          # [existing]
│   ├── lang-toggle.test.js           # [existing]
│   ├── animated-counter.test.js      # [NEW] counter init, IO, fail-soft
│   ├── scroll-reveal.test.js         # [NEW] SVG animation, fail-soft
│   ├── verification-page.test.js     # [NEW] status badge, demo banner, no-data state
│   ├── request-form.test.js          # [NEW] mailto, URL param prefill, validation
│   └── e2e/
│       ├── pages/
│       │   ├── HomePage.js           # [existing] page object
│       │   ├── VerificationPage.js   # [NEW] /v/genuim/ page object
│       │   └── RequestFormPage.js    # [NEW] form page object
│       ├── smoke.spec.js             # [existing + NEW @smoke tests]
│       ├── homepage.spec.js          # [NEW] homepage narrative, branches, counter
│       ├── verification.spec.js      # [NEW] proof page, demo banner, no-data state
│       └── form.spec.js              # [NEW] mailto submit, URL param prefill
├── site/                             # ← ЄДИНА ПУБЛІЧНА ПОВЕРХНЯ
│   ├── index.html                    # Homepage (extended with Phase 1 sections)
│   ├── sitemap.xml                   # [NEW] static, manual, with priority scheme
│   ├── robots.txt                    # [NEW] with AI-crawler Allow rules
│   ├── 404.html                      # [existing or new]
│   ├── v/
│   │   ├── index.html                # [NEW] /v/ — paste-first demo input (noindex)
│   │   └── genuim/
│   │       └── index.html            # [NEW] /v/genuim/ — canonical verification example
│   ├── about/
│   │   └── index.html                # [NEW] trust-floor: about GenuIm
│   ├── faq/
│   │   └── index.html                # [NEW] trust-floor: FAQ
│   ├── knowledge/
│   │   ├── index.html                # [NEW] knowledge base placeholder (Phase 1)
│   │   └── article-template.html     # [NEW] Layered JSON-LD template for future articles
│   └── assets/
│       ├── css/
│       │   ├── input.css             # Tailwind source (with @theme extensions)
│       │   └── output.css            # ← COMMITTED ARTIFACT (GitHub Pages)
│       ├── js/
│       │   ├── theme-toggle.js       # [existing]
│       │   ├── lang-toggle.js        # [existing]
│       │   ├── animated-counter.js   # [NEW] Intersection Observer + rAF counter
│       │   ├── scroll-reveal.js      # [NEW] SVG stroke-dashoffset animation
│       │   ├── verification-page.js  # [NEW] StatusBadge, NoDataState, demo-mode banner
│       │   └── request-form.js       # [NEW] mailto fallback + URL param prefill
│       ├── fonts/
│       │   └── manrope-variable.woff2 # [NEW] self-hosted Manrope Variable
│       └── img/
│           ├── og-default.png         # [NEW] 1200×630px for OG meta
│           ├── favicon.ico            # [existing]
│           └── logo.svg               # [existing or new]
├── package.json                      # Jest config inline, npm scripts
├── playwright.config.ts              # desktop + mobile projects, PW_PROJECT filter
├── biome.json                        # Lint + format config
├── tsconfig.json                     # strict: true for tooling + Playwright
└── tailwind.config.js                # (if exists; v4 is CSS-first, may not be needed)
```

### Architectural Boundaries

**Static Site Boundary (публічна поверхня):**
- **In:** `site/` — весь HTML, CSS, JS, шрифти, зображення
- **Out:** `_bmad/`, `_bmad-output/`, `docs/`, `tests/`, `scripts/`, конфіги кореневого рівня
- **Правило:** Нічого з поза `site/` не деплоїться

**Controller Boundaries (JS контролери):**
- Кожен файл = одна відповідальність
- Контролери НЕ знають один про одного — нема cross-controller imports
- Спільний стан тільки через `localStorage` (lang, theme)
- Communication pattern: прямий DOM; не event bus, не shared state object

**CSS Token Boundary:**
- Нові токени ТІЛЬКИ через `@theme` в `input.css`
- Компоненти посилаються на токени через CSS змінні (`var(--surface-forest)`)
- Inline стилі заборонені для design tokens

**Translation Boundary:**
- Переклади в кожному контролері як inline JS map
- HTML несе тільки `data-i18n` атрибут + fallback текст дефолтної мови
- Нових JSON-файлів для перекладів немає

**Data Boundary (Phase 1 — статичний):**
- Нема БД, нема API, нема server-state
- User preferences: `localStorage` (lang, theme)
- Form submission: `mailto:` href (заглушка)
- Proof page data: HTML-encoded статичний контент
- URL params: `?scenario=`, `?source=` читаються тільки на client-side

### Requirements to Structure Mapping

**FR1–FR4 (Language & Theme):**
- `site/assets/js/theme-toggle.js` — існуючий, може потребувати доповнень
- `site/assets/js/lang-toggle.js` — існуючий, може потребувати доповнень
- Тести: `tests/theme-toggle.test.js`, `tests/lang-toggle.test.js`

**FR5–FR9 (Homepage Narrative & Branches):**
- `site/index.html` — нові секції: hero, proof narrative, branch cards
- `site/assets/js/animated-counter.js` — "25M+ кодів" лічильник
- `site/assets/js/scroll-reveal.js` — SVG flow diagram
- CSS: нові `@theme` токени + `.bento-grid`, `.branch-card`, `.kinetic-number` в `input.css`
- Тести: `tests/animated-counter.test.js`, `tests/e2e/homepage.spec.js`

**FR10–FR19, FR25 (Proof Pages & Demo Input):**
- `site/v/genuim/index.html` — canonical verification example (index, follow)
- `site/v/index.html` — paste-first demo input (noindex, nofollow)
- `site/assets/js/verification-page.js` — StatusBadge, NoDataState, demo banner
- CSS: `.verification-ui`, `.status-badge`, `.demo-banner`, `.proof-facts` в `input.css`
- Тести: `tests/verification-page.test.js`, `tests/e2e/verification.spec.js`

**FR21–FR25 (SEO Intercept & Lead Capture):**
- `site/assets/js/request-form.js` — mailto + `?scenario=` prefill
- `site/sitemap.xml` — static з priority scheme
- `site/robots.txt` — з AI-crawler Allow
- `site/assets/img/og-default.png` — OG image
- Тести: `tests/request-form.test.js`, `tests/e2e/form.spec.js`

**FR26–FR31 (Knowledge Base & Trust Surface):**
- `site/knowledge/index.html` — placeholder Phase 1
- `site/knowledge/article-template.html` — Layered JSON-LD template
- `site/about/index.html`, `site/faq/index.html` — trust-floor pages
- Тести: smoke test для кожної нової сторінки

### Integration Points

**Internal Communication:**
- Контролери → DOM: прямі `document.getElementById()` / `document.querySelectorAll()`
- Контролери → localStorage: `try/catch` wrapped reads/writes
- `request-form.js` → URL: `new URLSearchParams(window.location.search)` при init
- CSS animations → JS fallback: `@supports not (animation-timeline: view())` → IO → `.is-visible`
- `animated-counter.js` ↔ `verification-page.js`: незалежні, нема зв'язку

**External Integrations (Phase 1):**
- Form: `mailto:info@genu.im?subject=...&body=...` — browser native, нема external API
- Font: `site/assets/fonts/manrope-variable.woff2` — self-hosted, нема CDN calls
- Analytics: UTM params у URL → manual Google Search Console review
- No third-party scripts у Phase 1

**Data Flow:**
```
User lands on page
  → <head> inline script applies saved theme/lang (FOUC prevention)
  → output.css loads (committed artifact)
  → Deferred JS controllers execute (DOM already ready)
  → Controllers read localStorage + DOM attributes
  → Controllers bind events + sync aria-* state
  → scroll / intersection triggers CSS animations (view() + animation-timeline)
  → JS fallback (if @supports not supported) adds .is-visible classes
  → User clicks CTA → request-form.js reads ?scenario= and page context → builds mailto body with `scenario`, `source_path`, and optional `proof_path`
  → User submits → mailto: opens native email client
```

### File Organization Patterns

**Configuration Files:**
- Root level: `package.json` (Jest inline config), `playwright.config.ts`, `biome.json`, `tsconfig.json`
- No separate Jest config file (inline in package.json)
- Tailwind v4: CSS-first — конфіг у `input.css`, не в `tailwind.config.js`

**Source Organization:**
- `site/assets/js/` — контролери у flat structure (не вкладені папки), бо їх ~6–8
- `site/assets/css/` — тільки `input.css` і `output.css`
- `site/assets/fonts/` — один файл (Manrope Variable woff2)
- `site/assets/img/` — статичні зображення, flat structure
- HTML pages: directory/index pattern (`site/v/genuim/index.html`)

**Test Organization:**
- `tests/*.test.js` — Jest unit по одному файлу на контролер
- `tests/e2e/*.spec.js` — Playwright specs по feature/page
- `tests/e2e/pages/` — page object helpers (один клас на сторінку)
- `tests/setup.js` — global Jest mocks (не дублювати в test files)

**Asset Organization:**
- Шрифти: `site/assets/fonts/` (self-hosted, тільки woff2)
- Зображення: `site/assets/img/` (og-default.png, favicon, logo)
- CSS artifact: `output.css` — COMMITTED (GitHub Pages вимагає)

### Development Workflow Integration

**Development Server:**
```bash
npm run dev          # Tailwind watch (input.css → output.css)
npm start            # http-server site/ (для Playwright E2E)
npm test             # Jest unit suite
npm run test:smoke   # Fast Playwright smoke (Chromium only)
npm run test:e2e     # Full Playwright suite (desktop + mobile)
npm run test:ci      # lint + typecheck + Jest + Playwright (full CI)
npm run lighthouse   # Performance/accessibility audit
```

**Build Process:**
- `npm run build:css` → Tailwind CLI: `input.css` → `output.css`
- Husky pre-commit: auto-runs `build:css` if `input.css` changed
- Після зміни CSS токенів: ЗАВЖДИ commit `output.css` разом з `input.css`
- Нема bundler, нема transpilation для browser scripts

**Deployment Structure:**
- GitHub Pages: деплоїть `site/` folder
- `output.css` COMMITTED — нема build step на deploy
- GitHub Actions `deploy-pages.yml` тригер: тільки `main`, тільки після site CI pass
- Phase 2+ Azure: деплоїть `site/` через Azure Static Web Apps або Web App + custom domain

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
Всі технологічні вибори сумісні без конфліктів: Vanilla JS + Tailwind v4 + Jest + Playwright підтверджені існуючим brownfield стеком. CSS-first animations (`view()` + `animation-timeline`) чітко розділені від JS fallback через `@supports`. `defer`-стратегія скриптів + відсутність `DOMContentLoaded` узгоджені у Patterns. `mailto:` заглушка Phase 1 ізольована без shared state з майбутньою Azure Functions заміною.

**Pattern Consistency:**
Naming conventions (kebab-case files, camelCase IDs, dot-notation i18n keys) послідовні по всьому документу. IIFE + fail-soft guard + `try/catch` localStorage задокументовані з прикладами. `@theme` token boundary підтримується explicit правилами і заборонами.

**Structure Alignment:**
`site/` як єдина публічна поверхня відображена у Project Tree і Boundaries. Directory/index URL pattern (`site/v/genuim/index.html`) відповідає рішенню Step 4. Flat `site/assets/js/` обґрунтована кількістю (~6–8) контролерів.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
Всі 32 FR покриті архітектурними рішеннями:
- FR1–FR4: існуючі контролери + localStorage pattern
- FR5–FR9: `animated-counter.js`, `scroll-reveal.js`, CSS animation patterns
- FR10–FR19, FR25: `site/v/`, `verification-page.js`, static HTML model, demo-banner pattern
- FR21–FR24: `request-form.js`, sitemap.xml, robots.txt, og-default.png
- FR26–FR31: `site/knowledge/`, `site/about/`, `site/faq/`, article-template.html

**Non-Functional Requirements Coverage:**
- Performance (NFR1–NFR4): self-hosted font + preload; CSS-first анімації; нема JS libs; ≤150KB бюджет адресований явно
- Accessibility (NFR5–NFR7): `aria-*` sync у кожному контролері, demo banner `role="status"`, WCAG 2.1 AA patterns
- Language integrity (NFR8): `data-i18n` enforced, inline JS maps, HTML fallback = default lang
- SEO (NFR9–NFR11): `<head>` order pattern, JSON-LD placement rules, hreflang single-URL
- Security (NFR12–NFR14): HTTPS + documented GitHub Pages mitigations in Phase 1; full HTTP headers after migration to a header-capable host
- Compatibility (NFR15–NFR16): Tailwind mobile-first; `@supports` fallback; Safari Phase 1 exclusion зафіксована

### Implementation Readiness Validation ✅

**Decision Completeness:**
4 критичних рішення задокументовані з обґрунтуванням і відхиленими альтернативами. SEO Architecture розширена через Advanced Elicitation. Deferred decisions явно позначені (Phase 2+ / Azure migration).

**Structure Completeness:**
Повне дерево директорій з `[existing]` / `[NEW]` маркерами. Всі компоненти прив'язані до конкретних файлів. Integration points та data flow задокументовані.

**Pattern Completeness:**
9 conflict points ідентифіковано і адресовано. 5 основних patterns з кодовими прикладами. DataMatrix animation повністю специфікована. Process patterns включають мінімум тестового покриття і заборони.

### Gap Analysis Results

**Critical Gaps:** Відсутні ✅

**Important Gaps (addressed inline below):**

1. **Font fallback stack** — специфіковано нижче (захист від CLS)
2. **sitemap.xml priority scheme** — конкретні значення нижче

**Nice-to-Have Gaps (deferred):**

1. `og-default.png` дизайн-специфікація — графічний asset, поза scope architecture doc
2. `404.html` структура — `[existing or new]`; не блокує Phase 1

### Validation Issues Addressed

**Font Fallback Stack (CLS protection):**

```css
/* site/assets/css/input.css — у @theme або body */
font-family: 'Manrope Variable', 'Helvetica Neue', Arial, sans-serif;
```

Встановлювати через Tailwind token або безпосередньо у `body`. Fallback stack мінімізує FOUT і захищає від CLS при повільному завантаженні шрифту.

**sitemap.xml Priority Scheme:**

```xml
<!-- site/sitemap.xml — priority values -->
<!-- /                  --> priority="1.0" changefreq="weekly"
<!-- /v/genuim/         --> priority="0.9" changefreq="monthly"
<!-- /knowledge/        --> priority="0.7" changefreq="weekly"
<!-- /about/            --> priority="0.6" changefreq="monthly"
<!-- /faq/              --> priority="0.6" changefreq="monthly"
<!-- /v/                --> noindex — НЕ включати в sitemap
```

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed (32 FR + 16 NFR)
- [x] Scale and complexity assessed (low-medium, brownfield)
- [x] Technical constraints identified (7 cross-cutting concerns)
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified (existing brownfield)
- [x] Integration patterns defined (mailto Phase 1, Azure Phase 2)
- [x] Performance considerations addressed (≤150KB, CSS-first)
- [x] SEO architecture defined (Layered JSON-LD, hreflang, robots.txt)

**✅ Implementation Patterns**
- [x] Naming conventions established (5 categories)
- [x] Structure patterns defined (IIFE controller template)
- [x] Communication patterns specified (direct DOM, no event bus)
- [x] Process patterns documented (test coverage matrix, error handling)
- [x] Special patterns (DataMatrix animation, CSS Knowledge Sources)

**✅ Project Structure**
- [x] Complete directory structure defined (with [existing]/[NEW] markers)
- [x] Component boundaries established (5 boundaries)
- [x] Integration points mapped (internal + external + data flow)
- [x] Requirements to structure mapping complete (5 FR categories)

### Architecture Readiness Assessment

**Overall Status:** ✅ READY FOR IMPLEMENTATION

**Confidence Level:** HIGH

**Key Strengths:**
- Brownfield context повністю врахований — нема конфліктів з існуючим стеком
- CSS-first animation strategy з `view()` + `animation-timeline` — future-proof для 2026
- Phase 1 / Phase 2+ / Azure migration path чітко розмежовані
- 9 conflict points проактивно адресовані перед реалізацією
- CSS Knowledge Sources зафіксовані — AI-агенти знатимуть куди звертатись
- Proof page static HTML model — обґрунтований вибір для 3 sample сторінок Phase 1

**Areas for Future Enhancement:**
- Per-page OG images (Phase 2)
- Automated sitemap generation (Phase 2+)
- NewsArticle schema + `/news/` контент (Phase 2+)
- Full HTTP security headers (після міграції на header-capable hosting)
- Server-side language detection (після Azure migration)
- Live data lookup для verification pages (Phase 3)

### Implementation Handoff

**AI Agent Guidelines:**
- Читати `project-context.md` + `architecture.md` перед реалізацією будь-якої story
- Починати з: CSS tokens + Manrope font (блокує всі компоненти)
- Використовувати HTML `<head>` order pattern для кожної нової сторінки
- JSON-LD — тільки в `<head>`, не перед `</body>`
- Кожен новий контролер → Jest unit тест + Playwright smoke

**First Implementation Priority:**
```
1. CSS tokens у input.css + build:css       ← унблокує все
2. Manrope Variable font + preload           ← унблокує LCP
3. Homepage HTML sections + JSON-LD
4. /v/genuim/ static HTML
5. animated-counter.js + scroll-reveal.js
6. request-form.js (mailto заглушка)
7. sitemap.xml + robots.txt + og-default.png
8. Trust-floor pages (about, faq, knowledge placeholder)
```
