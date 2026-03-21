---
title: 'P1 Brownfield Remediation — Navigation + Trust Language + Source Pills'
slug: 'p1-remediation-nav-trust-pills'
created: '2026-03-17'
status: 'ready-for-dev'
stepsCompleted: [1, 2, 3, 4]
tech_stack:
  - 'Static HTML5'
  - 'Tailwind CSS v4'
  - 'Vanilla JS (ES modules, defer)'
  - 'Jest (unit tests)'
  - 'Playwright (e2e)'
  - 'Biome (lint)'
files_to_modify:
  - 'site/assets/js/lang-toggle.js'
  - 'site/assets/css/input.css'
  - 'site/assets/css/output.css'
  - 'site/about/index.html'
  - 'site/contact/index.html'
  - 'site/knowledge/index.html'
  - 'site/faq/index.html'
  - 'site/proof-cases/index.html'
  - 'site/privacy/index.html'
  - 'site/terms/index.html'
  - 'site/request/index.html'
  - 'site/v/genuim/index.html'
code_patterns:
  - 'data-i18n attribute binding for all user-facing strings'
  - 'lang-toggle.js holds all EN+UK translation strings inline'
  - 'Homepage nav pattern: <nav id="mainNav"> + <button id="burgerBtn"> inside <div class="header-controls">'
  - 'menu.js requires #mainNav + #burgerBtn + #closeMenu; exits early if all absent'
  - 'Secondary pages load: lang-toggle.js + theme-toggle.js (defer); no menu.js'
  - 'CSS: Tailwind v4, output.css must be committed, version bumped via ?v=N query string'
  - 'proof-source-pill: currently uniform neutral style regardless of source type'
test_patterns:
  - 'Jest unit: tests/lang-toggle.test.js, tests/menu.test.js, tests/verification-page.test.js'
  - 'Playwright e2e: tests/e2e/genuim.smoke.spec.ts, tests/e2e/genuim.mobile.spec.ts'
---

# Tech-Spec: P1 Brownfield Remediation — Navigation + Trust Language + Source Pills

**Created:** 2026-03-17

## Overview

### Problem Statement

Шесть верифицированных P1-дефектов на live-сайте genu.im, зафиксированных аудитом:

1. **IA-001 (CRITICAL)** — Навигация отсутствует на ВСЕХ вторичных страницах (about, contact, knowledge, faq, proof-cases, privacy, terms, request, v/genuim) на всех viewports. Пользователь не может перемещаться по сайту с этих страниц.

2. **TRUST-004 (HIGH)** — Knowledge-страница содержит внутреннюю фразу «Phase 1 placeholder» в публичном тексте.

3. **TRUST-005 (HIGH)** — Privacy-страница содержит «Phase 1 starter policy» в lead-абзаце.

4. **TRUST-006 (HIGH)** — Terms-страница содержит «Phase 1 starter terms» в lead-абзаце.

5. **TRUST-003 (HIGH)** — Proof example (v/genuim) содержит «static proof example for Phase 1» в тексте fact3Body.

6. **TRUST-002 (HIGH)** — На proof-странице пилюли `Source: genu.mark` и `Source: brand` визуально идентичны, хотя семантически различны.

### Solution

Три независимых потока изменений:

- **Поток B** (XS): 8 замен строк только в `lang-toggle.js` — удалить внутренние «Phase 1» метки из публичных переводов.
- **Поток C** (XS): Добавить атрибут `data-source-type="primary"` к pill в `v/genuim/index.html` + 4 строки CSS в `input.css` + пересборка `output.css`.
- **Поток A** (S): Вставить блок `<nav>` + `<button id="burgerBtn">` в 9 HTML-файлов + добавить `menu.js` в каждый скрипт-блок.

Порядок выполнения: B → C → A.

### Scope

**In Scope:**
- IA-001: добавить nav + burger menu на 9 вторичных страниц
- TRUST-002: визуально дифференцировать pill `genu.mark` от `brand` через CSS
- TRUST-003: удалить «for Phase 1» из `verification.fact3Body` (EN + UK)
- TRUST-004: удалить «Phase 1 placeholder» из `knowledge.section2.body` (EN + UK)
- TRUST-005: удалить «Phase 1 starter policy.» из `privacy.lead` (EN + UK)
- TRUST-006: удалить «Phase 1 starter terms.» из `terms.lead` (EN + UK)
- Обновить `docs/audits/genu.im-1/02_findings_register.md` по завершении

**Out of Scope:**
- TRUST-001, CONV-002, VIS-002, COPY-001, COPY-002, STRAT-001
- Любые founder-track или content-authority задачи
- Редизайн навигации или изменение её информационной архитектуры
- Серверный код, аутентификация, backend-состояние
- Изменения homepage (`site/index.html`) — там всё исправно

## Context for Development

### Codebase Patterns

- **i18n**: Все видимые пользователю строки — через `data-i18n` атрибуты. Обе локали (`en`, `uk`) хранятся inline в `site/assets/js/lang-toggle.js`. Хардкод строк в HTML или JS запрещён. **Исключение:** `#burgerBtn` и `#closeMenu` имеют `aria-label="Open menu"` / `aria-label="Close menu"` как статический fallback — это намеренно. `menu.js` владеет этими атрибутами и обновляет их динамически через `translateMenuLabel()` при инициализации и при смене языка. **Не добавлять `data-i18n-aria-label` на эти кнопки** — создаст конфликт с `menu.js`.
- **Навигация**: Единственный образец — homepage `site/index.html`. Структура внутри `<div class="header-controls">`: `<nav id="mainNav">` → `<div class="utility-strip">` → `<button id="burgerBtn">`.
- **menu.js**: Требует три элемента в DOM: `#mainNav`, `#burgerBtn`, `#closeMenu`. Если **хотя бы один** из трёх отсутствует — выходит без ошибки (OR-guard, не AND). Важно: вставлять все три элемента атомарно. `menu.js` загружается defer, после `lang-toggle.js` и `theme-toggle.js`.
- **CSS**: Tailwind v4. Источник `input.css`, результат `output.css` — обязательно committed в git. Версия на странице — query string `?v=N`. CSS-переменные для цветов бренда: `var(--color-brand)`, `var(--color-brand-deep)`.
- **proof-source-pill**: `.proof-source-pill` — нейтральный стиль. `.proof-evidence-link` рядом (строки 3278–3290 в `input.css`) уже использует `--color-brand` токены — можно переиспользовать.
- **Relative paths**: Одноуровневые страницы (`about/`) используют `../assets/`. Двухуровневые (`v/genuim/`) используют `../../assets/`.

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `site/index.html` | Источник образца nav-блока (строки 93–137) |
| `site/about/index.html` | Образец вторичной страницы (строки 56–74 = header-controls без nav) |
| `site/v/genuim/index.html` | Proof-страница — двухуровневая, нужны TRUST-002, TRUST-003, IA-001 |
| `site/assets/js/lang-toggle.js` | Все i18n строки — строки 244–245, 313–314, 341–342, 358–359, 671–672, 741–742, 769–770, 786–787 |
| `site/assets/css/input.css` | `.proof-source-pill` строки 3267–3276; вставка после строки 3276 |
| `site/assets/css/output.css` | Пересборка после изменения input.css |
| `tests/lang-toggle.test.js` | Unit-тесты строк — проверить после изменения строк |
| `tests/menu.test.js` | Unit-тесты menu.js — проверить |
| `tests/e2e/genuim.mobile.spec.ts` | E2E мобильная навигация |
| `tests/e2e/genuim.smoke.spec.ts` | E2E smoke — все страницы |

### Technical Decisions

1. **TRUST-002 pill**: Использовать `data-source-type="primary"` атрибут на HTML-элементе + CSS-правило по этому атрибуту. Причина: семантично, устойчиво к переименованию i18n-ключей, не загрязняет CSS-пространство имён BEM.
2. **Ссылки в nav вторичных страниц**: `/#use-cases` и `/#how-it-works` (абсолютные root-relative). На вторичных страницах нет этих anchor-элементов, абсолютный путь возвращает на homepage-секцию.
3. **CSS-версия**: Bump query string на всех страницах при пересборке `output.css` — единая версия на весь сайт, чтобы избежать stale-cache.
4. **Порядок изменений**: B (lang-toggle) → C (CSS + pill HTML) → A (nav на всех страницах). B и C — нулевой риск layout. A — 9 файлов, требует проверки на всех viewports.
5. **Дисклеймеры proof-страницы**: `verification.lead`, `verification.demoNotice`, `proof-demo-banner` — НЕ трогать. Trust boundary сохранить.

## Implementation Plan

### Tasks

- [ ] **Task 1 (Поток B):** Удалить внутренние Phase 1 метки из строк EN в `lang-toggle.js`
  - File: `site/assets/js/lang-toggle.js`
  - Action: 4 замены в EN-блоке (строки ~244–245, ~313–314, ~341–342, ~358–359):
    - `verification.fact3Body` EN: `"This sample item is shown as a static proof example for Phase 1."` → `"This sample item is shown as a static proof example."`
    - `knowledge.section2.body` EN: `"Right now this is a Phase 1 placeholder. We are opening the navigation slot early so the information architecture is clear before the full content area is published."` → `"This section is open early so the information architecture is clear before the full content area is published."`
    - `privacy.lead` EN: `"Phase 1 starter policy. This page describes how genu.im handles data at this stage of operations."` → `"This page describes how genu.im handles data at this stage of operations."`
    - `terms.lead` EN: `"Phase 1 starter terms. By using genu.im you agree to these conditions."` → `"By using genu.im you agree to these conditions."`

- [ ] **Task 2 (Поток B):** Удалить внутренние Phase 1 метки из строк UK в `lang-toggle.js`
  - File: `site/assets/js/lang-toggle.js`
  - Action: 4 замены в UK-блоке (строки ~671–672, ~741–742, ~769–770, ~786–787):
    - `verification.fact3Body` UK: `"Цю одиницю показано як статичний приклад доказу для першої фази."` → `"Цю одиницю показано як статичний приклад доказу."`
    - `knowledge.section2.body` UK: `"Зараз це сторінка-заглушка для першої фази. Ми відкриваємо цей розділ завчасно, щоб структура сайту була зрозумілою ще до появи повного набору матеріалів."` → `"Цей розділ відкрито завчасно, щоб структура сайту була зрозумілою ще до появи повного набору матеріалів."`
    - `privacy.lead` UK: `"Стартова політика першої фази. На цій сторінці описано, як genu.im обробляє дані на поточному етапі роботи."` → `"На цій сторінці описано, як genu.im обробляє дані на поточному етапі роботи."`
    - `terms.lead` UK: `"Стартові умови першої фази. Використовуючи genu.im, ви погоджуєтесь із цими умовами."` → `"Використовуючи genu.im, ви погоджуєтесь із цими умовами."`

- [ ] **Task 3 (Поток C):** Добавить атрибут `data-source-type="primary"` к pill genu.mark
  - File: `site/v/genuim/index.html`
  - Action: В строке 115 добавить атрибут к первому `<span class="proof-source-pill">`:
    ```html
    <!-- before -->
    <span class="proof-source-pill" data-i18n="verification.fact1Source">Source: genu.mark</span>
    <!-- after -->
    <span class="proof-source-pill" data-source-type="primary" data-i18n="verification.fact1Source">Source: genu.mark</span>
    ```
  - Notes: Строки 121 и 126 (fact2Source, fact3Source — `Source: brand`) — не трогать.

- [ ] **Task 4 (Поток C):** Добавить CSS-правило для дифференциации pill в `input.css`
  - File: `site/assets/css/input.css`
  - Action: После закрывающей скобки `.proof-source-pill` (строка 3276) вставить:
    ```css
    .proof-source-pill[data-source-type="primary"] {
        border-color: --alpha(var(--color-brand) / 20%);
        background: --alpha(var(--color-brand) / 10%);
        color: var(--color-brand-deep);
        font-weight: 600;
    }
    ```
  - Notes: Те же токены, что у `.proof-evidence-link` (строки 3285–3287). Светлая и тёмная тема покрываются автоматически через переменные.

- [ ] **Task 5 (Поток C):** Пересобрать `output.css`, закоммитить и обновить версию
  - Action: Запустить `npm run build:css`
  - After build: Проверить что `site/assets/css/output.css` изменился и содержит правило `.proof-source-pill[data-source-type="primary"]`
  - **ВАЖНО — output.css должен быть закоммичен:** GitHub Pages деплоит committed файлы. Пересборка без коммита означает, что live-сайт будет обслуживать старый CSS. После проверки файла — `git add site/assets/css/output.css` и включить в коммит вместе с остальными изменениями потока C.
  - Version bump — обновить query string `output.css?v=` до `v=20` в следующих файлах (точные текущие версии):

    | Файл | Текущая версия | Новая версия |
    |------|---------------|-------------|
    | `site/index.html:28` | `?v=17` | `?v=20` |
    | `site/about/index.html:44` | `?v=17` | `?v=20` |
    | `site/contact/index.html:44` | `?v=17` | `?v=20` |
    | `site/faq/index.html:44` | `?v=17` | `?v=20` |
    | `site/knowledge/index.html:6` | `?v=17` | `?v=20` |
    | `site/privacy/index.html:44` | `?v=17` | `?v=20` |
    | `site/proof-cases/index.html:44` | `?v=17` | `?v=20` |
    | `site/terms/index.html:44` | `?v=17` | `?v=20` |
    | `site/request/index.html:43` | `?v=18` | `?v=20` |
    | `site/v/genuim/index.html:51` | `?v=19` | `?v=20` |

  - Примечание: `site/v/index.html` (`?v=19`) и `site/perevir-product/index.html` (`?v=17`) — вне scope этого спека. Не трогать.
  - `site/index.html` трогается **только** для version bump в строке 28. Никаких других изменений на homepage.

- [ ] **Task 6 (Поток A):** Добавить nav-блок и burger-кнопку в `site/about/index.html`
  - File: `site/about/index.html`
  - Action:
    1. Внутри `<div class="header-controls">` (строка 56) вставить перед `<div class="utility-strip">`:
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
    2. После `</div>` закрывающего `utility-strip` и перед `</div>` закрывающего `header-controls` вставить:
    ```html
    <button id="burgerBtn" type="button" class="control-icon burger-button md:hidden"
        aria-controls="mainNav" aria-expanded="false" aria-label="Open menu">
        <svg class="burger-button__icon" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    </button>
    ```
    3. В конце тела (строка 122) добавить script-тег после `theme-toggle.js`:
    ```html
    <script src="../assets/js/menu.js" defer></script>
    ```
    4. Обновить query string CSS: `output.css?v=17` → `output.css?v=20`

- [ ] **Task 7 (Поток A):** Добавить nav-блок в `site/contact/index.html`
  - File: `site/contact/index.html`
  - Action: Идентично Task 6 — вставить nav, burger, menu.js script, поднять CSS version.

- [ ] **Task 8 (Поток A):** Добавить nav-блок в `site/knowledge/index.html`
  - File: `site/knowledge/index.html`
  - Action: Идентично Task 6 — вставить nav, burger, menu.js script, поднять CSS version.

- [ ] **Task 9 (Поток A):** Добавить nav-блок в `site/faq/index.html`
  - File: `site/faq/index.html`
  - Action: Идентично Task 6 — вставить nav, burger, menu.js script, поднять CSS version.

- [ ] **Task 10 (Поток A):** Добавить nav-блок в `site/proof-cases/index.html`
  - File: `site/proof-cases/index.html`
  - Action: Идентично Task 6 — вставить nav, burger, menu.js script, поднять CSS version.

- [ ] **Task 11 (Поток A):** Добавить nav-блок в `site/privacy/index.html`
  - File: `site/privacy/index.html`
  - Action: Идентично Task 6 — вставить nav, burger, menu.js script, поднять CSS version.

- [ ] **Task 12 (Поток A):** Добавить nav-блок в `site/terms/index.html`
  - File: `site/terms/index.html`
  - Action: Идентично Task 6 — вставить nav, burger, menu.js script, поднять CSS version.

- [ ] **Task 13 (Поток A):** Добавить nav-блок в `site/request/index.html`
  - File: `site/request/index.html`
  - Action: Идентично Task 6 — вставить nav, burger, menu.js script, поднять CSS version.
  - **Примечание:** Эта страница уже на `?v=18` (не `?v=17` как другие). Bump: `output.css?v=18` → `output.css?v=20`.

- [ ] **Task 14 (Поток A):** Добавить nav-блок в `site/v/genuim/index.html`
  - File: `site/v/genuim/index.html`
  - Action:
    1. Внутри `<div class="header-controls">` (строка 62) вставить перед `<div class="utility-strip">` тот же `<nav>` блок с теми же href.
    2. После `utility-strip` вставить `<button id="burgerBtn">` с тем же SVG.
    3. Добавить после строки 182 (`verification-page.js` script), перед строкой 183 (`</body>`):
    ```html
    <script src="../../assets/js/menu.js" defer></script>
    ```
    4. CSS query string уже `v=19`, поднять до `v=20` (строка 51).
  - Notes: Страница двухуровневая (`../../assets/`). Nav-ссылки используют абсолютные пути — работают корректно.

- [ ] **Task 15:** Обновить findings register
  - File: `docs/audits/genu.im-1/02_findings_register.md`
  - Action: Пометить IA-001, TRUST-002, TRUST-003, TRUST-004, TRUST-005, TRUST-006 как FIXED с датой.

### Acceptance Criteria

#### IA-001 — Навигация на вторичных страницах

- [ ] **AC-1:** Given пользователь на `/about/` на desktop (≥768px), when страница загружается, then nav-ссылки «Use cases», «How it works», «Knowledge» видны в header; burger-кнопка скрыта.
- [ ] **AC-2:** Given пользователь на `/about/` на mobile (<768px), when страница загружается, then burger-кнопка видна; nav скрыт (`hidden` класс присутствует).
- [ ] **AC-3:** Given пользователь на mobile, when нажимает burger-кнопку, then nav открывается (класс `hidden` снимается), `aria-expanded="true"` устанавливается на `#burgerBtn`.
- [ ] **AC-4:** Given nav открыт на mobile, when нажимает кнопку закрытия (×), then nav закрывается, `aria-expanded="false"` возвращается.
- [ ] **AC-5:** Given язык установлен в UK, when вторичная страница загружается, then nav-ссылки отображают украинские переводы («Сценарії», «Як це працює», «База знань»).
- [ ] **AC-6:** Given пользователь кликает ссылку `/#use-cases` на вторичной странице, then браузер переходит на homepage и прокручивает к секции `#use-cases`.
- [ ] **AC-7:** AC-1–AC-6 выполняются на ВСЕХ 9 вторичных страницах: about, contact, knowledge, faq, proof-cases, privacy, terms, request, v/genuim.

#### TRUST-003 — Proof example fact3Body

- [ ] **AC-8:** Given страница `/v/genuim/` в EN, then текст `"This sample item is shown as a static proof example."` — без «for Phase 1».
- [ ] **AC-9:** Given страница `/v/genuim/` в UK, then текст `"Цю одиницю показано як статичний приклад доказу."` — без «для першої фази».
- [ ] **AC-10:** Given страница `/v/genuim/` в EN, then:
  - элемент `[data-i18n="verification.lead"]` содержит `"This page shows a brand-published proof example inside genu.mark. It is not live lookup and it is not an official state check."`
  - элемент `[data-i18n="verification.demoNotice"]` (`.proof-demo-banner`) содержит `"Demo/example view only. This page shows a static proof example, not a live production lookup."`
  
  Given страница `/v/genuim/` в UK, then те же элементы содержат соответствующие UK-строки (ключи `verification.lead` и `verification.demoNotice` — без изменений относительно исходника).

#### TRUST-004 — Knowledge section2.body

- [ ] **AC-11:** Given страница `/knowledge/` в EN, then абзац «Current stage» (элемент `[data-i18n="knowledge.section2.body"]`) содержит `"This section is open early so the information architecture is clear before the full content area is published."` — и не содержит «Phase 1» или «placeholder».
- [ ] **AC-12:** Given страница `/knowledge/` в UK, then абзац «Поточний етап» (элемент `[data-i18n="knowledge.section2.body"]`) містить `"Цей розділ відкрито завчасно, щоб структура сайту була зрозумілою ще до появи повного набору матеріалів."` — і не містить «заглушка» або «першої фази».

#### TRUST-005 — Privacy lead

- [ ] **AC-13:** Given страница `/privacy/` в EN, then элемент `[data-i18n="privacy.lead"]` содержит `"This page describes how genu.im handles data at this stage of operations."` — и не начинается с «Phase 1».
- [ ] **AC-14:** Given страница `/privacy/` в UK, then элемент `[data-i18n="privacy.lead"]` містить `"На цій сторінці описано, як genu.im обробляє дані на поточному етапі роботи."` — і не містить «Стартова політика першої фази».

#### TRUST-006 — Terms lead

- [ ] **AC-15:** Given страница `/terms/` в EN, then элемент `[data-i18n="terms.lead"]` содержит `"By using genu.im you agree to these conditions."` — и не начинается с «Phase 1».
- [ ] **AC-16:** Given страница `/terms/` в UK, then элемент `[data-i18n="terms.lead"]` містить `"Використовуючи genu.im, ви погоджуєтесь із цими умовами."` — і не містить «Стартові умови першої фази».

#### TRUST-002 — Source pill visual differentiation

- [ ] **AC-17:** Given страница `/v/genuim/`, when DOM отрендерен, then pill с `data-i18n="verification.fact1Source"` («Source: genu.mark») имеет brand-цветную рамку и фон, визуально отличимые от двух `Source: brand` pills.
- [ ] **AC-18:** Given `/v/genuim/` в dark mode, then pill «genu.mark» по-прежнему визуально отличается от `brand` pills (CSS-переменные автоматически адаптируются к теме).
- [ ] **AC-19:** Given pills «Source: brand» (fact2Source, fact3Source), then они остаются в нейтральном стиле без изменений.

#### CSS Build — output.css committed

- [ ] **AC-20:** Given Task 5 выполнен, then файл `site/assets/css/output.css` в git-репозитории содержит правило `.proof-source-pill[data-source-type="primary"]` (т.е. файл пересобран и закоммичен — не только изменён локально).

## Additional Context

### Dependencies

- Tasks 1–2 (Поток B) независимы — никаких зависимостей.
- Task 3 (добавить атрибут) логически предшествует Task 4 (CSS), но оба могут идти параллельно.
- Task 5 (пересборка CSS) зависит от Task 4.
- Tasks 6–14 (Поток A) независимы друг от друга, но должны идти после Task 5 (чтобы включить обновлённую CSS-версию).
- Task 15 (findings register) — последний, после всей верификации.

### Testing Strategy

**Автоматическое:**
```bash
npm run lint         # Biome — после каждого потока
npm run typecheck    # TypeScript — после изменений JS
npm test             # Jest unit — lang-toggle, menu, verification-page
npm run test:smoke   # Playwright smoke — все страницы
```

**Специфично для потоков:**
- После Потока B: `npm test` — проверить lang-toggle.test.js на корректность строк
- После Потока C: `npm run build:css` + визуальная проверка `/v/genuim/` в обеих темах
- После Потока A: `npm run test:smoke` + `genuim.mobile.spec.ts`

**Ручная проверка (критична для Потока A):**
- Каждая из 9 страниц × desktop + mobile × EN + UK = 36 состояний
- Приоритет: mobile burger open/close на каждой странице
- Проверить что `/#use-cases` и `/#how-it-works` переходят на homepage

**Lighthouse (рекомендуется):**
```bash
npm run lighthouse   # После Потока A — проверить accessibility nav
```

### Notes

**Риски регрессии:**
1. **menu.js + страницы без burger**: `menu.js` выходит без ошибки если **хотя бы один** из `#burgerBtn`/`#mainNav`/`#closeMenu` отсутствует (OR-guard). Homepage не трогается — нет риска. При вставке nav-блока на вторичные страницы убедиться, что все три элемента присутствуют в DOM — иначе меню тихо не инициализируется.
2. **CSS version mismatch**: Если `output.css?v=N` на странице не совпадает с фактическим файлом — браузер отдаёт кешированную версию без новых стилей. Критично синхронизировать все страницы.
3. **Proof page disclaimer**: `verification.demoNotice` и `verification.lead` защищены — spec явно запрещает их трогать.
4. **Украинские символы**: При правке `lang-toggle.js` сохранять файл в UTF-8 без BOM.
5. **Якорные ссылки**: `/#use-cases` на вторичной странице потребует полной загрузки homepage — ожидаемое поведение для static site.

**Escalation flag (нет):** Все 6 дефектов умещаются в quick-flow. Ни один не требует архитектурных изменений, новых компонентов или backend-взаимодействия.

**Post-fix:**
- Обновить `docs/audits/genu.im-1/02_findings_register.md`: IA-001, TRUST-002, TRUST-003, TRUST-004, TRUST-005, TRUST-006 → FIXED
- Перепроверить затронутые состояния после каждого потока
