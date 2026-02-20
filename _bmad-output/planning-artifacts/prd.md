---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain-skipped, step-06-innovation-skipped, step-07-project-type]
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-gm-2026-02-18.md"
briefCount: 1
researchCount: 0
brainstormingCount: 0
projectDocsCount: 0
workflowType: 'prd'
classification:
  projectType: web_app
  domain: general_regtech
  complexity: medium
  projectContext: brownfield
---

# Product Requirements Document - gm

**Author:** GenuIm
**Date:** 2026-02-19

## Executive Summary

**genu.im** — платформа верифікації автентичності продуктів. Два джерела клієнтів: (1) виробники під регуляторним мандатом еАкциз (xtrace.gov.ua) — вимушений попит, та (2) бренди, які добровільно захищають продукцію від підробок — як Укравіт, перший клієнт платформи, що підключився задля brand protection, не compliance.

Проєкт gm — вебсайт платформи: лендінг, система верифікаційних паспортів продуктів та B2B-портал для клієнтів.

Сайт вирішує три задачі одночасно: переконує B2B-клієнтів підключитися до платформи, демонструє споживачам як працює верифікація, та надає існуючим клієнтам робочий інструмент управління маркуванням.

**Цільові аудиторії та їхні емоційні тригери:**
- **CEO/власник виробництва** — страх: штраф за невідповідність еАкциз, контрафакт на ринку
- **Маркетолог бренду** — можливість: аналітика сканувань, ROI промо-кампаній
- **Споживач** — безпека: "чи не підробка? чи не отруюся?"

**Три епіки:**

| Епік | Scope | URL |
|------|-------|-----|
| **1. Лендінг** | Головна сторінка — єдиний narrative довіри для всіх аудиторій | `genu.im/` |
| **2. Верифікація** | Паспорти продуктів за вертикалями + майбутня API-верифікація реальних кодів | `genu.im/v/{code}` |
| **3. B2B-портал** | Кабінет клієнта: дашборд, коди, виробництво, 10+ екранів, MSAL.js Azure AD | `genu.im/portal/` |

**Контекст:** Україна 2026, четвертий рік війни. Суррогатний алкоголь вбиває людей. Довіра — не маркетинговий термін, а питання безпеки. Дизайн побудований на принципі "тиха сила": власний бренд-стиль, champagne + зелений, нуль драми. Принцип Дії: працює одразу, поважає час — але візуал повністю свій.

**Існуючий backend:** TraceAvit Azure API (`/api/Code/{code}`) повертає дані продукту: партія, лінія, дата виробництва, історія дій (P/V/C/W). API закритий авторизацією; consumer-доступ — Фаза 2.

**Технічний стек:** HTML/CSS/JS без фреймворку (Епіки 1-2), Tailwind CSS v4, GitHub Pages. Міграція на Azure Static Web Apps при Епіку 3. Вибір фреймворку для порталу — на етапі Architecture Doc.

### What Makes This Special

**Демо-верифікація як продукт.** `genu.im/v/genuim` — предвизначений код, де "продукт" = сама платформа. Споживач бачить той самий UX, який отримає бренд для свого товару. У конкурента (Сайтекс) навіть демо відсутнє.

**Вертикальні паспорти.** Один шаблон, різне оформлення: `genuim-alco` (теплий бурштин, свято), `genuim-tobacco` (стриманий, compliance). JSON з даними + CSS-змінні = нова вертикаль без коду. Sales-інструмент для кожної індустрії.

**Два мотиватори — одна платформа.** Регуляторний мандат (еАкциз) створює вимушений попит. Brand protection створює добровільний попит. genu.im обслуговує обидва, не обмежуючись жодним.

**Позиціонування через прозорість.** Конкурент мімікрує під державний сайт. genu.im — власний бренд, відкритість, "справжнє".

**Архітектура для зростання.** Статичні паспорти → API-верифікація. Один `if` у коді. Перехід без рефакторингу.

## Project Classification

| Параметр | Значення |
|----------|---------|
| **Тип проєкту** | Web application (статичний сайт + SPA-портал) |
| **Домен** | General з regtech-контекстом |
| **Складність** | Medium |
| **Контекст** | Brownfield — MVP працював для Укравіт, сайт-заглушка існує |
| **Мова інтерфейсу** | Українська першою, English для міжнародної аудиторії |
| **Візуальна мова** | "Тиха сила": champagne + зелений, власний бренд-стиль. Принцип Дії: працює одразу, поважає час |

## Success Criteria

### User Success

**Споживач:**
- Сканує QR → сторінка `/v/` завантажується за <1 сек → мікро-ритуал верифікації 0.5-1 сек → зрозумілий вердикт. Весь flow ≤2 сек
- Вердикт читається однозначно: 4 стани верифікації (СПРАВЖНЄ / ПІДОЗРІЛО / НЕ ЗНАЙДЕНО / ОФЛАЙН) + 1 тип сторінки (showcase)
- Mobile-first: весь flow оптимізований під телефон (QR сканують з телефону)

**CEO/власник виробництва:**
- Потрапляє на лендінг → за 30 сек розуміє "що це" і "навіщо мені"
- Hero + CTA "Подивитись як це працює" видимі без скролу на 375×667 (iPhone SE)
- Сканує QR (з візитки продажника або з лендінгу) → бачить демо-верифікацію → розуміє "ось що побачить мій покупець"
- Очевидний шлях з паспорта `/v/` на лендінг: блок "Що таке genu.im?" + CTA "Дізнатись більше →" + "Підключити бренд →"

**Маркетолог бренду:**
- Розслідування дають розуміння ринку та масштабу проблеми контрафакту
- Сигнали показують що платформа жива і актуальна

### Business Success

| Метрика | Значення | Тип |
|---------|----------|-----|
| **Конверсія відвідувач → лід** | ≥3% | Product KPI |
| **Конверсія лендінг → демо** | ≥30% відвідувачів клікають на демо-верифікацію | Product KPI |
| **Конверсія демо → форма** | ≥10% тих, хто бачив демо | Product KPI |
| **Avg. session duration** | ≥45 сек на лендінгу | Product KPI |
| **Scroll depth** | ≥70% (дістались до форми) | Product KPI |
| **Перший платящий клієнт** | З алко/тютюн вертикалі, 6 місяців | Бізнес-ціль (не product metric) |
| **Контент** | ≥2 розслідування + ≥8 сигналів до запуску | Deliverable |

**Аналітика:** Plausible Analytics (1 скрипт, privacy-friendly, zero cookies) — в MVP для вимірювання конверсій.

**Відповідальний за контент-оновлення:** визначити до запуску. Сигнали мають оновлюватись не рідше 1 разу на 2 тижні, інакше лендінг виглядає мертвим.

### Technical Success

| Метрика | Значення |
|---------|----------|
| **Lighthouse Performance** | ≥95 (лендінг і `/v/`) |
| **Завантаження** | <1 сек (статика, без API) |
| **Mobile** | Hero + CTA без скролу на 375×667 |
| **i18n** | UK/EN коректно на всіх breakpoints (UK текст довший — не ламає layout) |
| **Форма** | Telegram Bot primary → Formspree або mailto fallback |
| **Аналітика** | Plausible скрипт підключений, `defer`, не блокує рендеринг |
| **Тести** | E2E Playwright: всі секції лендінгу, flow верифікації (4 стани + showcase), форма, responsive |

### Measurable Outcomes

- **"Перевірте свій бренд"** — кожен submit = кваліфікований лід (назва + телефон + вертикаль)
- **Мікро-ритуал** верифікації ≤1 сек (настроювана константа `VERIFICATION_RITUAL_DURATION`)
- **`SUSPICIOUS_CHECK_THRESHOLD = 5`** — настроювана константа
- **Свіжість контенту** — operational commitment: сигнали оновлюються ≥1 раз/2 тижні

## Product Scope

### MVP — Епіки 1+2

**Епік 1: Лендінг** (`genu.im/`)

| Секція | Деталі |
|--------|--------|
| **Hero** | Заголовок + підзаголовок + CTA "Подивитись як це працює" → `/v/genuim` |
| **Як це працює** | 3 кроки: Виробник маркує (іконка лінії) → Покупець сканує (іконка телефону+QR) → Отримує підтвердження (іконка ✅) |
| **Три треки** | Карточки: захист бренду, аналітика, довіра споживача |
| **Сигнали** | 3-4 рядки, захардкоджені в HTML (JSON — Growth фаза) |
| **Розслідування** | 2 картки-справи, посилання на `/cases/001.html`, `/cases/002.html` |
| **Перевірте бренд** | Форма: назва + телефон + вертикаль → Telegram Bot + fallback. Підтвердження у стилі "✅ ПЕРЕВІРЕНО. Справа #2026-02-47" |
| **Контакти** | Тел (клікабельний `tel:`) + Telegram — в шапці/футері і під формою |
| **Аналітика** | Plausible Analytics (1 скрипт, `defer`) |
| **Інше** | Тема light/dark, i18n UK/EN (UK першою), responsive |

**Епік 2: Верифікація** (`genu.im/v/{code}`)

| Компонент | Деталі |
|-----------|--------|
| **Архітектура** | Один HTML-шаблон + JS, дані в JSON per вертикаль, теми через CSS-змінні (`data-theme-vertical`) |
| **Предвизначені коди MVP** | `genuim` (showcase платформи) + `genuim-alco` (алкоголь). Підпапки вручну (build-скрипт — Growth) |
| **Вертикальні теми** | 3-4 CSS-змінних per вертикаль (accent, surface, icon) |
| **4 стани верифікації** | СПРАВЖНЄ / ПІДОЗРІЛО (nbChecks≥5) / НЕ ЗНАЙДЕНО / ОФЛАЙН |
| **1 тип showcase** | `genuim` — опис платформи (не вердикт, а showcase-контент) |
| **Мікро-ритуал** | Мінімальна анімація "перевірка..." перед вердиктом (≤1 сек, настроювана) |
| **Шлях на лендінг** | Блок внизу: "Що таке genu.im?" + CTA "Дізнатись більше →" + "Підключити бренд →" |
| **Actions** | P=Надруковано, V=Перевірено системою, C=Перевірено покупцем, W=Списано |
| **Mobile-first** | QR сканують з телефону — мобільна сторінка в першу чергу |

**Контент-deliverables (до запуску):**
- 2 розслідування (контент-задача, не dev)
- 8+ сигналів
- Тексти для демо-паспортів `genuim` + `genuim-alco` (micro-stories per вертикаль)

### Growth Features (Post-MVP)

- Додаткові вертикальні паспорти: `genuim-tobacco`, `genuim-food`, `genuim-cosm`
- Build-скрипт для генерації підпапок `/v/` з JSON (при 4+ паспортах)
- Динамічне завантаження сигналів і розслідувань з JSON
- Сторінки `/signals/` та `/cases/` з повним архівом
- Service Worker (offline-доступ до лендінгу і паспортів)
- API-верифікація реальних кодів (`/v/XXXXXX` → TraceAvit API без авторизації)
- Абстракція `getCodeData()`: JSON → API — один `if` у коді
- Розширена аналітика: які паспорти дивляться, звідки приходять, конверсія в форму

### Vision (Future)

- **Епік 3: B2B-портал** (`genu.im/portal/`) — детальний PRD від CTO в окремому проєкті. Scope на високому рівні: 10+ екранів, MSAL.js Azure AD, дашборд, управління кодами, виробничі дані. Міграція на Azure Static Web Apps
- **Спільні артефакти** (контрактні точки між PRD):
  - Architecture Doc (один на всі епіки)
  - Дизайн-система (shared Tailwind config, CSS-змінні, компоненти)
  - Навігація лендінг ↔ портал
  - URL-структура `genu.im/portal/*`
- Реальна верифікація з даними виробництва (родословна продукту: завод, лінія, дата, партія, timeline дій)
- Consumer data loop: сканування → аналітика для бренду → ROI

## User Journeys (MVP0)

### MVP0 Scope Definition

**MVP0 = Design Milestone (Landing only)**

| Feature | Status |
|---------|--------|
| Landing page (all sections) | ✅ Visual + content |
| Hero CTA | ⚠️ Placeholder (non-functional) |
| Form "Перевірте бренд" | ⚠️ Placeholder (non-functional) |
| `/v/` verification pages | ❌ Post MVP0 |
| Demo verification | ❌ Post MVP0 |

**Success Criteria:** Design approved by stakeholder, NOT user conversion.

---

### Flow 1: Design Review Flow (P1)

**Owner:** GenuIm  
**Trigger:** Deploy completed  
**Duration:** 15-30 min

```
Step 1: Open landing on desktop
        → Load time < 2 sec ✓
        → Hero visible without scroll ✓

Step 2: Check Hero section
        → Headline "Ви впевнені?" ✓
        → CTA button visible ✓
        → Dark mode toggle works ✓

Step 3: Scroll through sections
        → Як це працює: 3 steps ✓
        → Три треки: 3 cards ✓
        → Сигнали: 3-4 rows ✓
        → Розслідування: 2 cards ✓
        → Контакти: phone + Telegram ✓

Step 4: Toggle dark mode
        → All sections readable ✓
        → Contrast WCAG AA ✓

Step 5: Toggle language (UK/EN)
        → Text switches ✓
        → Layout not broken ✓

Step 6: Test responsive
        → Mobile (375px): Hero visible ✓
        → Tablet (768px): Layout adapts ✓
        → Desktop (1024px+): Full layout ✓

Step 7: Footer check
        → Phone clickable (tel:) ✓
        → Telegram link works ✓

DECISION: [Approve] [Request changes: ___]
```

---

### Flow 2: Content Review Flow (P1)

**Owner:** GenuIm  
**Trigger:** Design review approved  
**Duration:** 30-60 min

```
Section-by-section content validation:

Hero:
□ Заголовок: "Ви впевнені?"
□ Підзаголовок: matches UX doc
□ CTA: "Подивитись як це працює" (placeholder)

Як це працює:
□ Step 1: "Виробник маркує" + icon
□ Step 2: "Покупець сканує" + icon
□ Step 3: "Отримує підтвердження" + icon

Три треки:
□ Card 1: Захист бренду + copy
□ Card 2: Аналітика + copy
□ Card 3: Довіра споживача + copy

Сигнали:
□ 3-4 placeholder rows
□ Format consistent

Розслідування:
□ Card 1: placeholder title + summary
□ Card 2: placeholder title + summary

Форма (placeholder):
□ Visual structure present
□ Fields: назва, телефон, вертикаль

Контакти:
□ Phone number
□ Telegram link

DECISION: [Approve] [Request changes: ___]
```

---

### Flow 3: Developer Handoff Flow (P2)

**Owner:** Sally → Amelia  
**Trigger:** Content approved  
**Duration:** Dev kickoff

```
Deliverables for Amelia:

□ index.html
  - Semantic HTML5 structure
  - data-i18n attributes on all text
  - Tailwind classes applied

□ tailwind.config.js
  - Custom colors (champagne, green)
  - Dark mode: class strategy
  - Responsive breakpoints

□ assets/
  - img/: all images optimized
  - favicon/: all sizes
  - css/input.css: Tailwind source

□ i18n/
  - uk.json: Ukrainian strings
  - en.json: English strings

□ JS modules (minimal):
  - theme-toggle.js
  - lang-toggle.js

Acceptance Criteria:
□ `npm run dev` starts local server
□ `npm run build` produces minified CSS
□ All sections render correctly
□ Dark mode persists in localStorage
□ Language persists in localStorage

HANDOFF: [Complete] [Missing items: ___]
```

---

### Flow 4: QA Validation Flow (P2)

**Owner:** Quinn + Murat (TEA)  
**Trigger:** Build ready  
**Duration:** Automated (CI/CD)

```
AUTOMATED GATES (Playwright + Lighthouse CI):

□ Lighthouse Performance: ≥95
□ Lighthouse Accessibility: ≥90
□ Lighthouse Best Practices: ≥95
□ Lighthouse SEO: ≥90

□ Playwright E2E:
  □ landing-hero-visible.spec.ts
    - Hero + CTA visible on 375×667
    - Hero + CTA visible on 768×1024
    - Hero + CTA visible on 1920×1080

  □ landing-dark-mode.spec.ts
    - Toggle switches theme
    - Theme persists on refresh
    - All text readable in dark mode

  □ landing-i18n.spec.ts
    - UK language default
    - EN toggle switches text
    - Language persists on refresh
    - No layout breaks on language switch

  □ landing-links.spec.ts
    - Phone link triggers tel:
    - Telegram link opens correct URL

  □ landing-responsive.spec.ts
    - 375px: mobile layout
    - 768px: tablet layout
    - 1024px+: desktop layout

□ Visual Regression (Playwright):
  □ hero-light.snap.png
  □ hero-dark.snap.png
  □ sections-light.snap.png
  □ sections-dark.snap.png
  □ mobile-viewport.snap.png

□ Accessibility (axe-core):
  □ No critical violations
  □ No serious violations
  □ Keyboard navigation complete
  □ ARIA labels present

CI/CD GATE:
┌─────────────────────────────────────┐
│  All tests pass → Deploy allowed    │
│  Any test fail → Block deploy       │
└─────────────────────────────────────┘

MANUAL CHECKS (only if automated unclear):

□ Content accuracy (matches UX doc)
□ Visual design fidelity (colors, spacing)
□ Copy review (typos, tone)

VALIDATION: 
[✅ All automated gates pass] 
[❌ Failures: ___ → Fix → Re-run]
```

---

### Flow 5: Stakeholder Preview Flow (P3)

**Owner:** GenuIm  
**Trigger:** QA validated  
**Duration:** Variable

```
External stakeholder review (if applicable):

Step 1: Share preview URL
        → GitHub Pages deploy link
        → Password protection (optional)

Step 2: Stakeholder reviews
        → Device: [desktop/tablet/mobile]
        → Browser: [Chrome/Safari/Firefox]
        → Language: [UK/EN]

Step 3: Collect feedback
        → What works
        → What needs change
        → Priority of changes

Step 4: Decision
        → [Approve] → Ready for public
        → [Changes needed] → Iterate
        → [Block] → Major revision

STAKEHOLDER SIGN-OFF: [Approved by: ___] [Date: ___]
```

---

### Journey Requirements Summary

| Flow | Primary Check | Pass Criteria |
|------|---------------|---------------|
| Design Review | Visual alignment with UX doc | All sections present, responsive, themes work |
| Content Review | Text accuracy | Matches PRD + UX doc |
| Developer Handoff | Deliverables complete | Amelia has all specs |
| QA Validation | Quality gates | Lighthouse ≥95, all automated tests pass |
| Stakeholder Preview | External approval | Sign-off received |

---

### Post-MVP0 Journeys (Future)

**MVP1 will add:**
- Consumer verification journeys (scan QR → verdict)
- Sales demo journeys (QR on business card)
- Form submission journey (working form)

**MVP2 will add:**
- B2B portal journeys (CTO, Line Operator)
- Dashboard management journeys

---

## Web Application Specific Requirements

### Browser Matrix

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| Chrome | Last 2 versions | Primary desktop browser |
| Safari | Last 2 versions (iOS 15+) | Primary mobile browser |
| Firefox | Last 2 versions | Secondary desktop |
| Edge | Last 2 versions | Enterprise users |
| IE11 | ❌ Not supported | Tailwind CSS v4 incompatible |

**Rationale:** Modern browser features (CSS custom properties, ES6+) required for Tailwind CSS v4 and dark mode functionality.

---

### Responsive Design

**Breakpoints:**

| Breakpoint | Width | Target |
|------------|-------|--------|
| `sm` | 375px | Mobile (iPhone SE baseline) |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |

**Requirements:**
- Mobile-first approach (base styles for 375px)
- Hero + CTA visible without scroll on 375×667 (iPhone SE)
- All text readable without zoom on mobile
- Touch targets ≥44px on mobile
- No horizontal overflow on any breakpoint

---

### Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | ≥95 | CI/CD gate |
| Lighthouse Accessibility | ≥90 | CI/CD gate |
| Lighthouse Best Practices | ≥95 | CI/CD gate |
| Lighthouse SEO | ≥90 | CI/CD gate |
| LCP (Largest Contentful Paint) | <2.5s | Field + Lab |
| FID (First Input Delay) | <100ms | Field |
| CLS (Cumulative Layout Shift) | <0.1 | Field + Lab |
| Page Load | <1s | Static HTML |

---

### SEO Strategy

**On-Page SEO:**

| Element | Implementation |
|---------|----------------|
| Title tag | Unique per page, UK/EN variants |
| Meta description | 150-160 chars, compelling |
| H1-H6 hierarchy | Single H1, logical structure |
| Alt text | All images |
| Canonical URLs | Self-referencing |

**Technical SEO:**

| Element | Implementation |
|---------|----------------|
| robots.txt | Allow all, sitemap reference |
| sitemap.xml | Generated at build |
| JSON-LD | Organization schema |
| Open Graph | Title, description, image |
| Twitter Cards | Summary large image |

**International SEO:**

| Element | Implementation |
|---------|----------------|
| hreflang tags | UK/EN variants |
| lang attribute | html lang="uk" / "en" |

---

### Accessibility Level

**Target:** WCAG 2.1 AA

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | ≥4.5:1 for text, ≥3:1 for large text |
| Keyboard navigation | All interactive elements focusable |
| Focus indicators | Visible focus rings |
| Screen reader | ARIA labels, semantic HTML |
| Skip links | Skip to main content |
| Reduced motion | Respect prefers-reduced-motion |

**Testing:**
- axe-core automated tests (CI/CD)
- Keyboard navigation manual test
- Screen reader test (VoiceOver/NVDA)

