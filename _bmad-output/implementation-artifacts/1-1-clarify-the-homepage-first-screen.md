# Story 1.1: Прояснить первый экран главной страницы

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Как посетитель, который впервые попал на главную страницу,
я хочу сразу понять, что такое `genu.im` и чем он не является,
чтобы без путаницы понять ценность предложения и следующий шаг.

## Acceptance Criteria

1. Дано: посетитель впервые открывает главную страницу.
   Когда: отображается первый экран.
   Тогда: на первом экране прямо сказано, что `genu.im` - это публичная proof-first surface для маркированных товаров.
   И: сайт не подается как generic QR landing page. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.1; `_bmad-output/planning-artifacts/prd.md` - FR5]

2. Дано: посетитель читает copy первого экрана.
   Когда: описывается роль продукта.
   Тогда: copy явно разделяет публичный proof в `genu.mark` и официальную проверку в `Дія`.
   И: copy не намекает, что `genu.im` является официальным сервисом проверки. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.1; `_bmad-output/planning-artifacts/prd.md` - FR6]

3. Дано: посетитель решает продолжить с первого экрана.
   Когда: он использует main CTA.
   Тогда: CTA ведет на каноническую proof-страницу `/v/genuim`.
   И: текст CTA заранее объясняет, что произойдет дальше. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.1; `_bmad-output/planning-artifacts/prd.md` - FR7]

4. Дано: посетитель открывает главную страницу на mobile или desktop.
   Когда: отображается первый экран.
   Тогда: основное сообщение и main CTA видимы и usable.
   И: layout работает на ширине `360px` без horizontal scroll. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.1; `_bmad-output/planning-artifacts/prd.md` - NFR16; `_bmad-output/planning-artifacts/ux-design-specification.md` - Responsive Strategy]

5. Дано: декоративные или вторичные интерфейсные элементы недоступны либо не загрузились.
   Когда: посетитель видит первый экран.
   Тогда: основное объяснение и primary next step остаются понятными и usable.
   И: понимание `genu.im` не зависит от вторичных embellishments. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.1]

## Tasks / Subtasks

- [ ] Переписать first-screen messaging в `site/index.html` так, чтобы hero сразу объяснял категорию продукта, границу доверия и следующий шаг. (AC: 1, 2, 5)
  - [ ] Заменить текущую generic trust copy на формулировки, которые явно говорят: `genu.im` = публичная proof-first surface, `genu.mark` = слой proof производителя/бренда, `Дія` = официальный путь проверки.
  - [ ] Убрать или переработать wording, который звучит как generic QR landing page, official checker или live-state claim без доказуемой опоры в PRD.
  - [ ] Сохранить понятность первого экрана даже если decorative preview, signal pills или ambient visuals не загрузятся.

- [ ] Исправить primary CTA первого экрана на переход к `/v/genuim` с ясной подписью действия. (AC: 3)
  - [ ] Убрать текущее расхождение, где primary CTA ведет на `#final-cta`, а не на канонический proof path.
  - [ ] Обновить текст CTA в HTML fallback и в `site/assets/js/lang-toggle.js`, чтобы пользователь заранее понимал переход к proof example.

- [ ] Сохранить существующие контракты header controls и preference controllers. (AC: 4)
  - [ ] Не ломать существующие ID и связи: `#langToggle`, `#langLabel`, `#themeToggle`, `#burgerBtn`, `#closeMenu`, `#mainNav`.
  - [ ] Не переносить persistence logic языка/темы в эту story; это зона Story `1.3`.

- [ ] Подстроить hero layout под обновленную copy без регрессий в mobile/tablet. (AC: 4, 5)
  - [ ] Проверить, что `.hero-title`, `.hero-description`, `.hero-actions`, `.hero-proof-strip` и `.hero-visual` остаются читаемыми на `360px`, `768px`, `1280px`.
  - [ ] Если текущий preview panel остается на первом экране, сделать его supporting proof context, а не главным источником понимания.
  - [ ] Сохранить visible focus, touch targets >= `44x44px`, отсутствие horizontal scroll и корректную работу light/dark themes.

- [ ] Удержать scope Story `1.1` строго в пределах first screen. (AC: 1, 2, 3, 4, 5)
  - [ ] Не переносить в эту story branch behavior и branch decision logic из Story `1.2`.
  - [ ] Не добавлять request-flow semantics, handoff behavior или submission semantics из Epic `3.x`.
  - [ ] Не затрагивать knowledge/info-page behavior, trust destinations или navigation behavior из Story `1.4` beyond what already exists on the first screen.

- [ ] Обновить regression coverage для first-screen behavior. (AC: 1, 2, 3, 4, 5)
  - [ ] Обновить `tests/e2e/home.spec.ts` или родственный homepage spec так, чтобы проверялись hero explanation, видимость CTA и destination `/v/genuim`.
  - [ ] Если изменятся accessible labels или control text, точечно обновить unit tests для `lang-toggle`, `theme-toggle` и `menu`, не расширяя scope beyond changed contracts.

## Dev Notes

- Story `1.1` ограничена первым экраном homepage. Не втягивать сюда branch split, request form, trust-floor destinations, knowledge IA reservation или persistence behavior следующих stories. [Source: `_bmad-output/planning-artifacts/epics.md` - Epic 1 priority order]
- В текущем implementation первый экран уже содержит сложный hero, proof strip и verification preview, но copy и CTA не совпадают с approved story intent: сейчас primary CTA ведет на `#final-cta`, а не на `/v/genuim`. [Source: `site/index.html`]
- Основная задача story - не полный redesign homepage, а выравнивание first-screen message hierarchy под PRD: category clarity -> role separation -> proof next step. [Source: `_bmad-output/planning-artifacts/prd.md` - Executive Summary, FR5-FR7; `_bmad-output/planning-artifacts/ux-design-specification.md` - Critical Success Moments]
- Не использовать vague wording вроде `real-time verification`, если текст на первом экране может быть прочитан как обещание official state checking или live lookup, которых в Phase 1 нет. [Source: `_bmad-output/planning-artifacts/prd.md` - Domain-Specific Requirements; `_bmad-output/project-context.md` - Static-Site Boundaries]

### Scope Guardrails

- Если preview panel уже существует на первом экране, в рамках Story `1.1` она может остаться без редизайна.
- Удаление, переработка или расширение preview panel не входит в scope Story `1.1`.
- Единственное требование к preview panel в рамках этой story: first-screen explanation и primary CTA должны оставаться визуально доминирующими над supporting proof context.
- Primary CTA ведет на `/v/genuim` через standard navigation.
- Story `1.1` не вводит SPA-routing, dynamic state transition, request-flow logic или submission semantics.
- Story `1.1` не тянет branch behavior из Story `1.2`, request-flow semantics из Epic `3.x` или knowledge/info-page behavior из Story `1.4`.

### Technical Requirements

- Сохранить DOM-first static-site architecture: `site/index.html` + direct controllers в `site/assets/js/`; не добавлять framework abstractions, SSR, SPA routing или backend dependencies. [Source: `_bmad-output/project-context.md` - Architecture Context]
- Любой user-visible text и accessibility text, который изменяется через JS, должен оставаться в `site/assets/js/lang-toggle.js` через `data-i18n` / `data-i18n-aria-label`; не хардкодить новый текст в JS. [Source: `_bmad-output/project-context.md` - i18n Patterns]
- Theme/lang bootstrap в `<head>` и deferred controller sync должны остаться согласованными; HTML fallback copy и translation map нельзя разводить по смыслу. [Source: `site/index.html`; `site/assets/js/lang-toggle.js`; `_bmad-output/project-context.md` - State and Preference Patterns]
- Story `1.1` не меняет storage model. `localStorage` access и try/catch contracts в `theme-toggle.js` / `lang-toggle.js` должны остаться без регрессий. [Source: `site/assets/js/lang-toggle.js`; `site/assets/js/theme-toggle.js`]

### Architecture Compliance

- Публикуемая поверхность остается в `site/`; homepage остается в `site/index.html`. Не выносить production code в корень репозитория или `_bmad-output/`. [Source: `_bmad-output/project-context.md` - Project Structure Rules]
- Расширять существующую hero/layout систему в `site/assets/css/input.css`; не создавать новый production CSS file для этой story. [Source: `_bmad-output/project-context.md` - Tailwind CSS v4 Contract]
- Сохранять narrative order, заданный master plan и PRD: category framing -> bridge -> verification preview -> branch split -> conversion -> trust floor. Story `1.1` отвечает только за category framing и proof entry on first screen. [Source: `_bmad-output/planning-artifacts/prd.md` - Phase 1 scope; `_bmad-output/planning-artifacts/architecture.md` - Requirements to Structure Mapping]
- Существующие control contracts меню и preference toggles должны остаться совместимыми с их текущими controller tests и `gm:lang-change` event flow. [Source: `site/assets/js/menu.js`; `site/assets/js/theme-toggle.js`; `site/assets/js/lang-toggle.js`]

### Library / Framework Requirements

- Tailwind CSS остается на v4 CSS-first contract: использовать `@import "tailwindcss"`, `@theme`, existing tokens и utility-first подход; не возвращать legacy `@tailwind` directives. [Source: `site/assets/css/input.css`; `https://tailwindcss.com/blog/tailwindcss-v4`]
- Tailwind v4 рассчитан на modern browser baseline (`Chrome 111`, `Safari 16.4`, `Firefox 128`). Bleeding-edge features вроде `@starting-style` допустимы только как non-critical enhancement, не как обязательная опора для first-screen clarity. [Source: `https://tailwindcss.com/docs/browser-support`]
- Не добавлять новые UI, animation или component libraries; project architecture и performance budget требуют lightweight native CSS/DOM implementation. [Source: `_bmad-output/planning-artifacts/architecture.md` - Technical Constraints & Dependencies]

### File Structure Requirements

- Основные production files для Story `1.1`: `site/index.html`, `site/assets/js/lang-toggle.js`, `site/assets/css/input.css`. [Source: `site/index.html`; `site/assets/js/lang-toggle.js`; `site/assets/css/input.css`]
- Вероятные regression surfaces: `site/assets/js/theme-toggle.js`, `site/assets/js/menu.js`, `tests/e2e/home.spec.ts`, а также текущие tests preference/menu, если затронуты labels или control expectations. [Source: `site/assets/js/theme-toggle.js`; `site/assets/js/menu.js`; `tests/e2e/home.spec.ts`]
- Не создавать новые routes или trust pages в этой story. `/v/genuim` используется как existing target contract из planning artifacts, но его реализация относится к Epic 2. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 2.1]

### Testing Requirements

- Проверить homepage hero в Playwright: title load, visible hero heading, visible primary CTA и переход CTA на `/v/genuim`. [Source: `tests/e2e/home.spec.ts`; `_bmad-output/project-context.md` - Playwright Patterns]
- Если меняется hero copy, сохранить синхронность first paint и post-init language state: HTML fallback text и `translations` must match в `lang-toggle.js`. [Source: `site/index.html`; `site/assets/js/lang-toggle.js`]
- Сохранить accessibility state: CTA focusable, control labels корректны, decorative SVG остаются `aria-hidden="true"`, mobile nav не ломается. [Source: `_bmad-output/project-context.md` - Accessibility Requirements]
- Проверить responsive behavior минимум на `360px`, `768px`, `1280px`; first-screen message и CTA должны оставаться видимыми без horizontal scroll. [Source: `_bmad-output/planning-artifacts/prd.md` - NFR16; `_bmad-output/planning-artifacts/ux-design-specification.md` - Breakpoint Strategy]

### Current Implementation Intelligence

- Текущий hero использует generic positioning: `Trust through transparency`, `Make each product instantly checkable`, `Others promise. We prove.`; этого недостаточно для FR5/FR6, потому что first screen не называет marked-product proof category и не разделяет `Дія` vs `genu.mark`. [Source: `site/index.html`; `_bmad-output/planning-artifacts/prd.md` - FR5, FR6]
- Сейчас right-side preview и signal pills могут казаться более содержательными, чем основной explanatory message. После обновления copy preview должен поддерживать понимание, а не быть единственным носителем смысла. [Source: `site/index.html`; `_bmad-output/planning-artifacts/ux-design-specification.md` - 10-second clarity]
- В translation source уже есть часть text mismatches с HTML fallback (`hero.proofLabel`, `hero.previewEyebrow`), поэтому story implementation должна привести fallback и translated states к одному смыслу. [Source: `site/index.html`; `site/assets/js/lang-toggle.js`]
- Текущий hero/CTA в codebase рассматривается как divergence from source-of-truth planning artifacts, а не как основание менять intent Story `1.1`. [Source: `site/index.html`; `_bmad-output/planning-artifacts/epics.md`; `_bmad-output/planning-artifacts/prd.md`]

### Latest Tech Information

- Tailwind CSS v4 использует CSS-first configuration и theme variables directly in CSS, что совпадает с текущим проектным контрактом; для этой story изменения должны оставаться внутри `site/assets/css/input.css`. [Source: `https://tailwindcss.com/blog/tailwindcss-v4`]
- Official Tailwind compatibility guidance подтверждает, что современные CSS features допустимы только в рамках modern browser baseline; critical comprehension, CTA visibility и layout stability нельзя ставить в зависимость от edge-only animation behavior. [Source: `https://tailwindcss.com/docs/browser-support`]

### Project Context Reference

- Контроллеры должны fail soft при отсутствии DOM-узлов; Story `1.1` не должна ломать init `lang-toggle`, `theme-toggle`, `menu` при частичных markup changes. [Source: `_bmad-output/project-context.md` - DOM Access and Initialization]
- Не добавлять комментарии без необходимости, не делать unnecessary formatting churn, не менять unrelated dirty worktree files. [Source: `_bmad-output/project-context.md` - Editing Constraints]
- `site/assets/css/output.css` остается committed artifact; если CSS source меняется во время implementation, build artifact должен оставаться в git. [Source: `_bmad-output/project-context.md` - CRITICAL: output.css]

### Project Structure Notes

- Story aligned with existing structure: homepage changes остаются в `site/index.html`, style changes в `site/assets/css/input.css`, i18n changes в `site/assets/js/lang-toggle.js`, regression checks в `tests/` и `tests/e2e/`.
- Обнаруженный конфликт текущего implementation: primary first-screen CTA и hero wording не соответствуют approved Epic 1 source-of-truth; Story `1.1` должна исправить этот конфликт без расширения scope в `1.2`-`1.5`, и сам этот конфликт не переопределяет story intent.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 1, Story 1.1, sequencing and scope boundary.
- `_bmad-output/planning-artifacts/prd.md` - Executive Summary; FR5; FR6; FR7; NFR16; trust/compliance boundaries.
- `_bmad-output/planning-artifacts/architecture.md` - homepage sequence, static-site boundaries, controller pattern, Tailwind v4 contract.
- `_bmad-output/planning-artifacts/ux-design-specification.md` - 10-second clarity, proof-first moment, quiet confidence, mobile-first behavior.
- `_bmad-output/project-context.md` - i18n, DOM, storage, testing, accessibility and deploy constraints.
- `site/index.html` - current hero content, CTA target, control IDs and first-screen structure.
- `site/assets/js/lang-toggle.js` - translation source-of-truth for hero and controls.
- `site/assets/js/theme-toggle.js` - theme sync contract and aria updates.
- `site/assets/js/menu.js` - mobile nav and `gm:lang-change` contract.
- `site/assets/css/input.css` - hero layout, responsive behavior, existing token system.
- `tests/e2e/home.spec.ts` - current homepage smoke expectation.
- `https://tailwindcss.com/blog/tailwindcss-v4` - official Tailwind CSS v4 guidance.
- `https://tailwindcss.com/docs/browser-support` - official Tailwind browser compatibility guidance.

## Dev Agent Record

### Agent Model Used

openai/gpt-5.4

### Debug Log References

- Анализ текущей homepage implementation выполнен по `site/index.html`, `site/assets/css/input.css`, `site/assets/js/lang-toggle.js`, `site/assets/js/theme-toggle.js`, `site/assets/js/menu.js`, `tests/e2e/home.spec.ts`.
- Предыдущей story в Epic 1 еще нет, поэтому previous-story intelligence и git-pattern carryover для implementation отсутствуют.
- `validate-workflow.xml`, на который ссылается workflow, отсутствует в `_bmad/core/tasks/`; checklist review выполнен вручную по `_bmad/bmm/workflows/4-implementation/create-story/checklist.md`.

### Completion Notes List

- Подготовлен implementation-ready context для Story `1.1` на основе epic, PRD, architecture, UX spec, project context и текущего codebase state.
- Story переведена в `ready-for-dev` после контекстной подготовки.
- Во время quality review выявлена исходная неоднозначность around first-screen scope, CTA destination и роли preview panel; в этом документе она снята явными guardrails.
- Во исполнение пользовательского ограничения batch processing по Epic 1 должен быть остановлен после Story `1.1`; следующие stories продолжать в single-story mode, а не форсировать автоматически.
- Completion note: Ultimate context engine analysis completed - comprehensive developer guide created.

### File List

- `site/index.html`
- `site/assets/js/lang-toggle.js`
- `site/assets/js/theme-toggle.js`
- `site/assets/js/menu.js`
- `site/assets/css/input.css`
- `tests/e2e/home.spec.ts`
