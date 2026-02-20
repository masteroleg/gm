---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain-skipped, step-06-innovation-skipped, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish, step-12-complete]
workflowStatus: COMPLETE
completionDate: '2026-02-20'
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

### MVP0 — Design Milestone (Landing Only)

**Definition:** Visual prototype of landing page. NOT a product launch — design approval milestone.

| Feature | Status | Notes |
|---------|--------|-------|
| Landing page (all sections) | ✅ | Visual + content |
| Hero section | ✅ | Headline + CTA placeholder |
| Як це працює | ✅ | 3 steps with icons |
| Три треки | ✅ | 3 cards |
| Сигнали | ✅ | 3-4 placeholder rows |
| Розслідування | ✅ | 2 placeholder cards |
| Форма "Перевірте бренд" | ⚠️ Placeholder | Visual only, non-functional |
| Hero CTA | ⚠️ Placeholder | Visual only, non-functional |
| Контакти | ✅ | Phone + Telegram |
| Dark mode | ✅ | Toggle functional |
| i18n UK/EN | ✅ | Toggle functional |
| Responsive | ✅ | All breakpoints |
| Analytics | ✅ | Plausible script |

**NOT in MVP0:**
- ❌ `/v/` verification pages
- ❌ Demo verification (`/v/genuim`)
- ❌ Working form submission
- ❌ Consumer scans

**Success Criteria:** Design approved by stakeholder

---

### MVP1 — Verification Launch

**Definition:** Working verification pages + functional form. First market validation.

| Feature | Status | Notes |
|---------|--------|-------|
| All MVP0 features | ✅ Inherited | — |
| `/v/genuim` | ✅ | Platform showcase page |
| `/v/genuim-alco` | ✅ | Alcohol vertical |
| 4-state verification | ✅ | AUTHENTIC / SUSPICIOUS / NOT FOUND / OFFLINE |
| Hero CTA | ✅ Functional | Links to `/v/genuim` |
| Form submission | ✅ | Telegram Bot |
| Badge animation | ✅ | Spring easing (630ms) |

**Success Criteria:**
- First B2B leads via form
- Consumer scans working
- `≥3% visitor → lead conversion`

---

### MVP2 — B2B Portal

**Definition:** Full client portal with authentication. Revenue-generating product.

| Feature | Status | Notes |
|---------|--------|-------|
| All MVP1 features | ✅ Inherited | — |
| B2B Portal (`/portal/`) | ✅ | 10+ screens |
| Azure AD authentication | ✅ | MSAL.js |
| Client dashboard | ✅ | Code management |
| Production data | ✅ | Analytics for brands |
| Azure Static Web Apps | ✅ | Migration from GitHub Pages |

**Success Criteria:**
- First paying client
- `$2-12K ARR` trajectory

---

### Feature Mapping by Stage

| Feature | MVP0 | MVP1 | MVP2 |
|---------|------|------|------|
| Landing (all sections) | ✅ | ✅ | ✅ |
| Dark mode toggle | ✅ | ✅ | ✅ |
| i18n UK/EN | ✅ | ✅ | ✅ |
| Hero CTA | ⚠️ Placeholder | ✅ | ✅ |
| Form | ⚠️ Placeholder | ✅ | ✅ |
| `/v/genuim` | ❌ | ✅ | ✅ |
| `/v/genuim-alco` | ❌ | ✅ | ✅ |
| 4-state verification | ❌ | ✅ | ✅ |
| Badge animation | ❌ | ✅ | ✅ |
| B2B Portal | ❌ | ❌ | ✅ |
| Azure AD auth | ❌ | ❌ | ✅ |
| Migration to Azure | ❌ | ❌ | ✅ |

---

### Growth Features (Post-MVP2)

- Additional vertical passports: `genuim-tobacco`, `genuim-food`, `genuim-cosm`
- Build script for `/v/` subfolders from JSON
- Dynamic signals and investigations from JSON
- `/signals/` and `/cases/` archive pages
- Service Worker (offline access)
- Real API verification (`/v/XXXXXX` → TraceAvit API)
- `getCodeData()` abstraction: JSON → API with one `if`
- Extended analytics: passport views, traffic sources, conversion funnel

---

### Vision (Long-term)

- Consumer data loop: scans → brand analytics → ROI
- Real verification with production data (factory, line, date, batch, action timeline)
- Multi-vertical expansion (food, cosmetics, pharmaceuticals)
- Integration ecosystem (ERP, CRM, POS)

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

---

## Project Scoping & Phased Development

### MVP Strategy

**Approach:** Progressive Delivery

| Stage | Goal | Validation | Timeline |
|-------|------|------------|----------|
| MVP0 | Design approval | Stakeholder sign-off | 1-2 weeks |
| MVP1 | Market validation | First leads, scans | 2-3 weeks |
| MVP2 | Revenue | First paying client | 2-3 months |

### Resource Requirements

| Stage | Team | Duration |
|-------|------|----------|
| MVP0 | 1 Developer (Amelia) | 1-2 weeks |
| MVP1 | + QA (Murat) | 2-3 weeks |
| MVP2 | + Architect (Winston), CTO | 2-3 months |

### Risk Mitigation

| Risk | Stage | Mitigation |
|------|-------|------------|
| Design not approved | MVP0 | Iterate on feedback, clear UX specs |
| No B2B leads | MVP1 | SEO optimization, marketing push |
| No paying clients | MVP2 | Sales outreach, flexible pricing |
| Technical complexity | MVP2 | Architecture doc before dev |

### Critical Path

```
MVP0 (Design) → MVP1 (Verification) → MVP2 (Portal)
     ↓                ↓                    ↓
  Approve          Validate             Monetize
```

---

## Functional Requirements

### Landing Page Content

- FR1: Visitors can view a Hero section with headline, subheading, and CTA button
- FR2: Visitors can view a "How It Works" section with 3 steps and icons
- FR3: Visitors can view a "Three Tracks" section with 3 cards (brand protection, analytics, consumer trust)
- FR4: Visitors can view a "Signals" section with 3-4 operational update rows
- FR5: Visitors can view an "Investigations" section with 2 case study cards
- FR6: Visitors can view a Contact section with phone number and Telegram link
- FR7: Visitors can see a form placeholder with company name, phone, and vertical fields

### Theme & Personalization

- FR8: Visitors can toggle between light and dark theme
- FR9: Visitors can have their theme preference persisted across sessions
- FR10: Visitors can switch between Ukrainian and English languages
- FR11: Visitors can have their language preference persisted across sessions

### Responsive Design

- FR12: Visitors can view all content on mobile devices (375px width)
- FR13: Visitors can view Hero and CTA without scrolling on iPhone SE (375×667)
- FR14: Visitors can view adapted layouts on tablet (768px) and desktop (1024px+)
- FR15: Visitors can interact with touch targets of at least 44px on mobile

### Navigation & Links

- FR16: Visitors can click the phone link to initiate a phone call
- FR17: Visitors can click the Telegram link to open Telegram
- FR18: Visitors can see placeholder CTA buttons (non-functional in MVP0)

### SEO & Discoverability

- FR19: Search engines can index the landing page with title and meta description
- FR20: Social platforms can display Open Graph preview cards when the page is shared
- FR21: Search engines can discover the page via sitemap.xml
- FR22: Search engines can understand the page structure via JSON-LD schema

### Accessibility

- FR23: Visitors using screen readers can navigate the page with proper ARIA labels
- FR24: Visitors using keyboards can navigate all interactive elements
- FR25: Visitors can skip to main content via skip link
- FR26: Visitors with motion sensitivity can use the page with reduced animations

### Analytics

- FR27: Product team can track page views and session duration
- FR28: Product team can measure scroll depth
- FR29: Product team can analyze traffic sources

### Quality Assurance

- FR30: QA team can run automated Lighthouse tests via CI/CD
- FR31: QA team can run automated Playwright E2E tests
- FR32: QA team can detect visual regressions via screenshot comparison
- FR33: QA team can validate accessibility compliance via axe-core

---

## Non-Functional Requirements

### Performance

| NFR | Criterion | Measurement |
|-----|-----------|-------------|
| NFR1 | Page load time | < 1 second on 3G connection |
| NFR2 | First Contentful Paint | < 0.5 seconds |
| NFR3 | Largest Contentful Paint | < 2.5 seconds |
| NFR4 | Cumulative Layout Shift | < 0.1 |
| NFR5 | First Input Delay | < 100ms |
| NFR6 | Lighthouse Performance score | ≥ 95 |
| NFR7 | Total page size | < 500KB (uncompressed) |
| NFR8 | Critical render blocking resources | 0 (CSS inlined, JS deferred) |

### Accessibility

| NFR | Criterion | Measurement |
|-----|-----------|-------------|
| NFR9 | WCAG compliance level | 2.1 AA |
| NFR10 | Color contrast ratio | ≥ 4.5:1 for body text, ≥ 3:1 for large text |
| NFR11 | Touch target size | ≥ 44×44px on mobile |
| NFR12 | Keyboard navigation | All interactive elements focusable via Tab |
| NFR13 | Screen reader compatibility | VoiceOver (iOS/macOS), NVDA (Windows) |
| NFR14 | Focus visibility | Visible focus ring on all interactive elements |
| NFR15 | Lighthouse Accessibility score | ≥ 90 |
| NFR16 | axe-core violations | 0 critical, 0 serious |

### Browser Compatibility

| NFR | Criterion | Measurement |
|-----|-----------|-------------|
| NFR17 | Chrome support | Last 2 major versions |
| NFR18 | Safari support | Last 2 major versions (iOS 15+) |
| NFR19 | Firefox support | Last 2 major versions |
| NFR20 | Edge support | Last 2 major versions |
| NFR21 | Mobile viewport support | 375px minimum width |

### SEO

| NFR | Criterion | Measurement |
|-----|-----------|-------------|
| NFR22 | Lighthouse SEO score | ≥ 90 |
| NFR23 | Meta title length | 50-60 characters |
| NFR24 | Meta description length | 150-160 characters |
| NFR25 | Image alt text coverage | 100% of images |
| NFR26 | Heading hierarchy | Single H1, logical H2-H6 structure |

### Maintainability

| NFR | Criterion | Measurement |
|-----|-----------|-------------|
| NFR27 | Build time | < 30 seconds |
| NFR28 | CSS architecture | Tailwind utility classes, no custom CSS |
| NFR29 | i18n structure | JSON-based translation files |
| NFR30 | Code documentation | Inline comments for non-obvious logic |

