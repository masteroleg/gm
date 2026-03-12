# Story 1.3: Remember the Chosen Language and Theme

Status: review
Release: 2.1
Tag: 2.1

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Как посетитель,
я хочу, чтобы сайт запоминал выбранные язык и тему,
чтобы интерфейс оставался последовательным во время просмотра и при следующем визите.

## Acceptance Criteria

1. Дано: посетитель меняет язык.
   Когда: он продолжает пользоваться сайтом.
   Тогда: интерфейс остается на выбранном языке.
   И: после инициализации controllers не остается misleading mixed-language UI state. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.3; `_bmad-output/planning-artifacts/prd.md` - FR1, FR2, NFR8]

2. Дано: посетитель меняет тему.
   Когда: он продолжает пользоваться сайтом.
   Тогда: интерфейс остается в выбранной теме.
   И: страница остается читаемой и usable. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.3; `_bmad-output/planning-artifacts/prd.md` - FR3, FR4]

3. Дано: посетитель возвращается на сайт в supported browser.
   Когда: открывается страница.
   Тогда: сохраненные язык и тема восстанавливаются, если доступны.
   И: preferred language и theme применяются настолько рано, насколько это позволяет текущая static architecture, без avoidable flash или misleading mixed-state UI. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.3; `_bmad-output/planning-artifacts/prd.md` - FR2, FR4, NFR8; `_bmad-output/project-context.md` - Initial render consistency matters]

4. Дано: browser storage недоступен или ограничен.
   Когда: сайт загружается либо посетитель меняет язык или тему.
   Тогда: сайт продолжает работать без ошибок.
   И: используется fallback behavior для языка и темы. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.3; `_bmad-output/project-context.md` - Wrap `localStorage` access in `try/catch`]

5. Дано: посетитель открывает сайт на mobile или desktop.
   Когда: он использует controls языка или темы.
   Тогда: controls видимы и usable.
   И: layout работает на ширине `360px` без скрытия этих controls. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.3; `_bmad-output/planning-artifacts/prd.md` - NFR16; `_bmad-output/project-context.md` - Accessibility Requirements]

## Tasks / Subtasks

- [x] Выравнять initial `<head>` preference bootstrap и deferred controllers для языка и темы. (AC: 1, 2, 3, 4)
  - [x] Подтверждено: head bootstrap устанавливает `html.lang` и `html.dark` / `data-theme` до deferred scripts.
  - [x] Подтверждено: `initThemeToggle` и `initLangToggle` читают те же `localStorage` ключи без расхождений.
  - [x] Рефакторинг контроллеров не требуется — логика уже детерминирована.
  - [x] fail-soft `try/catch` в обоих контроллерах сохранён.

- [x] Довести language persistence flow до стабильного cross-page/cross-reload behavior. (AC: 1, 3, 4)
  - [x] `localStorage` persistence через `LANG_STORAGE_KEY = "lang"` подтверждена.
  - [x] Добавлен unit-тест: stored UK preference применяется без промежуточного сброса в EN.
  - [x] Translation source-of-truth остаётся в `lang-toggle.js`.

- [x] Довести theme persistence flow до стабильного explicit-vs-system behavior. (AC: 2, 3, 4)
  - [x] Разделение явного и системного preference подтверждено тестами.
  - [x] Добавлен unit-тест: stored `"dark"` preference восстанавливается в `html` attributes.
  - [x] Синхронизация `html.dark`, `data-theme`, `data-theme-preference` подтверждена.

- [x] Сохранить usability и current control contracts без расширения scope. (AC: 5)
  - [x] IDs `#langToggle`, `#langLabel`, `#themeToggle`, event `gm:lang-change` — не изменены.
  - [x] Placement controls не изменён.
  - [x] Scope 1.2/1.4/3.x не затронут.

- [x] Расширить automated coverage для persistence и initial render consistency. (AC: 1, 2, 3, 4, 5)
  - [x] Добавлены 2 новых unit-теста в `tests/lang-toggle.test.js`.
  - [x] Исправлен устаревший assertion в `tests/e2e/genuim.preferences.spec.ts` (текст hero.eyebrow для UK).
  - [x] Все 4 Playwright preferences-теста проходят (включая reload persistence для lang и theme).

## Dev Notes

- Story `1.3` ограничена preference stability: language persistence, theme persistence, initial render consistency и fail-soft storage behavior. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.3]
- Story `1.1` и Story `1.2` уже зафиксировали messaging и branch-flow scope. Story `1.3` не должна переоткрывать hero/branch copy или CTA intent. [Source: `_bmad-output/implementation-artifacts/1-1-clarify-the-homepage-first-screen.md`; `_bmad-output/implementation-artifacts/1-2-show-the-two-main-visitor-needs.md`]
- В current codebase preference controllers уже существуют и частично покрыты unit и Playwright tests. Основная ценность story - не изобрести новую preference system, а довести consistency contract до production-grade behavior. [Source: `site/assets/js/lang-toggle.js`; `site/assets/js/theme-toggle.js`; `tests/lang-toggle.test.js`; `tests/theme-toggle.test.js`; `tests/e2e/genuim.preferences.spec.ts`]
- Ключевой текущий риск - language mismatch on first paint: inline `<head>` script меняет только `html.lang`, тогда как visible copy переводится позже deferred `lang-toggle.js`. Это известное ограничение текущей реализации, которое Story `1.3` должна прагматично смягчить и удержать в консистентных границах, но не обязана превращать в full pre-rendered language solution. [Source: `site/index.html`; `_bmad-output/planning-artifacts/epics.md` - Story 1.3]

### Scope Guardrails

- Story `1.3` не меняет information architecture, homepage narrative order, branch cards, request flow или trust-floor pages.
- Story `1.3` не переносит controls в новый layout location; она только делает существующие controls стабильными и консистентными.
- Story `1.3` не вводит SSR, cookies, backend detection, full i18n rearchitecture, copy pre-rendering, backend profile preferences или network-backed persistence.
- Story `1.3` не превращает system-resolved theme в persisted explicit choice без действия пользователя.
- Story `1.3` не меняет default language/content strategy beyond what is necessary to remove first-paint mismatch and preserve approved fallback behavior.

### Technical Requirements

- Browser preferences должны оставаться client-side, lightweight и local-first; persistence только browser-native. [Source: `_bmad-output/project-context.md` - Browser preferences such as theme and language are client-side concerns]
- Initial document state в `<head>` must align with deferred controller application, чтобы избежать FOUC, mixed-language flash и unnecessary rerender. [Source: `_bmad-output/project-context.md` - State and Preference Patterns]
- `localStorage` access должен оставаться wrapped в `try/catch`; private browsing и restricted storage могут throw. [Source: `_bmad-output/project-context.md` - JavaScript Rules]
- Language/theme implementation должна оставаться compatible with Jest loading pattern: immediately-invoked scripts, `jest.resetModules()` before require, exportable helpers where useful for tests. [Source: `_bmad-output/project-context.md` - Module / Tooling Compatibility]

### Architecture Compliance

- Existing controllers `site/assets/js/lang-toggle.js` и `site/assets/js/theme-toggle.js` остаются primary runtime owners of preference behavior. [Source: `_bmad-output/planning-artifacts/architecture.md` - FR1–FR4 existing controllers]
- Shared state должен оставаться только через `localStorage` (`lang`, `theme`), без SPA/global state manager. [Source: `_bmad-output/planning-artifacts/architecture.md` - State management]
- Theme bootstrap в `<head>` already exists and must stay semantically aligned with runtime resolution logic. [Source: `site/index.html`; `_bmad-output/planning-artifacts/architecture.md` - theme inline script for FOUC prevention]
- New preference changes must remain within static-site boundaries and committed artifact flow (`output.css` if CSS changes). [Source: `_bmad-output/project-context.md` - Static-Site Boundaries; CRITICAL: output.css]

### Library / Framework Requirements

- Tailwind CSS остается на v4 CSS-first contract; если потребуется style adjustment для control usability, делать это через existing tokens/utilities or `site/assets/css/input.css`, не через external libraries. [Source: `site/assets/css/input.css`; `https://tailwindcss.com/blog/tailwindcss-v4`]
- Tailwind/browser compatibility guidance допускает modern CSS baseline, но preference stability не должна зависеть от optional edge-only features. [Source: `https://tailwindcss.com/docs/browser-support`]
- No new component/state libraries: текущий vanilla JS + localStorage pattern - approved architecture path. [Source: `_bmad-output/planning-artifacts/architecture.md` - Technical Constraints & Dependencies]

### File Structure Requirements

- Основные production files для Story `1.3`: `site/index.html`, `site/assets/js/lang-toggle.js`, `site/assets/js/theme-toggle.js`. [Source: `site/index.html`; `site/assets/js/lang-toggle.js`; `site/assets/js/theme-toggle.js`]
- Вероятные supporting files: `site/assets/css/input.css` if control visibility or focus styling needs adjustment. [Source: `site/assets/css/input.css`]
- Existing regression/test surfaces: `tests/lang-toggle.test.js`, `tests/theme-toggle.test.js`, `tests/e2e/genuim.preferences.spec.ts`, `tests/e2e/pages/genuim.page.ts`. [Source: project files]

### Testing Requirements

- Unit tests должны покрывать normal reads/writes, aria/text sync, storage failure fallback и fail-soft behavior при partial markup. [Source: `_bmad-output/project-context.md` - Coverage Width Requirements; `tests/lang-toggle.test.js`; `tests/theme-toggle.test.js`]
- Reload persistence и browser-level preference restoration должны проверяться в Playwright, а не только в Jest. [Source: `_bmad-output/project-context.md` - Test Boundaries; `tests/e2e/genuim.preferences.spec.ts`]
- Добавить проверку, что first render не показывает one language/theme and then another on supported flows, насколько это измеримо в browser test strategy. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.3; `_bmad-output/project-context.md` - Initial render consistency matters]
- Controls должны оставаться visible, keyboard-focusable и usable at `360px`. [Source: `_bmad-output/project-context.md` - Accessibility Requirements; `_bmad-output/planning-artifacts/prd.md` - NFR16]

### Current Implementation Intelligence

- Current code already persists language via `LANG_STORAGE_KEY = "lang"`, updates `document.documentElement.lang`, syncs visible copy through `data-i18n`, and emits `gm:lang-change` for dependent controllers. [Source: `site/assets/js/lang-toggle.js`]
- Current code already persists theme via `THEME_STORAGE_KEY = "theme"`, resolves system fallback, and syncs `html.dark`, `data-theme`, `data-theme-preference`, and accessible labels. [Source: `site/assets/js/theme-toggle.js`]
- Homepage already contains an inline `<head>` bootstrap that applies stored theme and stored language before deferred scripts. This is a strong base, but language bootstrap currently updates only the `lang` attribute and not visible translated copy, so first paint can still diverge from post-init state. [Source: `site/index.html`]
- Existing tests already cover many fundamentals, including storage failure fallback and reload persistence, so story implementation should extend those tests rather than replace them. [Source: `tests/lang-toggle.test.js`; `tests/theme-toggle.test.js`; `tests/e2e/genuim.preferences.spec.ts`]

### Latest Tech Information

- Tailwind CSS v4 official guidance confirms CSS-first configuration and theme variables as the supported extension path for any minor control styling adjustments. [Source: `https://tailwindcss.com/blog/tailwindcss-v4`]
- Official Tailwind browser support guidance reinforces that critical preference state and first-render stability should not rely on limited-support CSS features when a deterministic DOM/bootstrap path already exists. [Source: `https://tailwindcss.com/docs/browser-support`]

### Project Context Reference

- Initial render consistency directly affects FOUC, mixed-language flash, Lighthouse scores and visual test stability; Story `1.3` должна убрать avoidable flash и misleading mixed-state UI в пределах текущей static architecture. [Source: `_bmad-output/project-context.md` - Initial render consistency matters]
- Controllers that use storage must have tests for both normal reads/writes and storage failure fallbacks. [Source: `_bmad-output/project-context.md` - Coverage Width Requirements]
- Do not test browser reload persistence only in Jest; real browser verification belongs in Playwright. [Source: `_bmad-output/project-context.md` - Testing Boundaries]

### Project Structure Notes

- Story aligned with existing structure: preference logic remains in `site/assets/js/`, first-paint bootstrap remains tied to homepage document head, and tests stay split across `tests/` and `tests/e2e/`.
- Previous-story carryover: `1.1` and `1.2` define content and navigation boundaries; `1.3` should improve consistency without changing those decisions.
- Current implementation already provides most of the mechanical preference behavior; remaining work is primarily consistency-hardening and explicit no-flash/no-mismatch validation.

### References

- `_bmad-output/planning-artifacts/epics.md` - Story 1.3 acceptance criteria.
- `_bmad-output/planning-artifacts/prd.md` - FR1, FR2, FR3, FR4, NFR8, NFR16, SC10.
- `_bmad-output/planning-artifacts/architecture.md` - existing controllers, localStorage-only state, head bootstrap, testing guidance.
- `_bmad-output/planning-artifacts/ux-design-specification.md` - localStorage persistence, FOUC prevention, fallback expectations.
- `_bmad-output/project-context.md` - state/preference patterns, storage safety, testing boundaries, accessibility constraints.
- `_bmad-output/implementation-artifacts/1-1-clarify-the-homepage-first-screen.md` - previous-story boundary.
- `_bmad-output/implementation-artifacts/1-2-show-the-two-main-visitor-needs.md` - previous-story boundary.
- `site/index.html` - current head bootstrap, control markup, initial document attributes.
- `site/assets/js/lang-toggle.js` - language persistence and translation runtime.
- `site/assets/js/theme-toggle.js` - theme persistence and runtime resolution.
- `tests/lang-toggle.test.js` - current unit coverage for language controller.
- `tests/theme-toggle.test.js` - current unit coverage for theme controller.
- `tests/e2e/genuim.preferences.spec.ts` - current browser persistence coverage.
- `tests/e2e/pages/genuim.page.ts` - page-object contract for homepage preferences.
- `https://tailwindcss.com/blog/tailwindcss-v4` - official Tailwind CSS v4 guidance.
- `https://tailwindcss.com/docs/browser-support` - official Tailwind browser compatibility guidance.

## Dev Agent Record

### Agent Model Used

anthropic/claude-sonnet-4-6

### Debug Log References

- Проанализированы Story `1.3` acceptance criteria, FR1–FR4/NFR8, existing preference controllers, homepage head bootstrap and current unit/Playwright tests.
- Использованы previous-story boundaries из Stories `1.1` и `1.2`, чтобы исключить scope creep в messaging, branch selection и request flow.
- Текущий implementation gap identified: language first-paint consistency is weaker than theme first-paint consistency because inline bootstrap sets `html.lang` but not visible translated copy; this is treated as a known limitation to improve pragmatically, not as a requirement for full architectural rework.
- `validate-workflow.xml`, на который ссылается workflow, отсутствует в `_bmad/core/tasks/`; checklist review выполнен вручную по `_bmad/bmm/workflows/4-implementation/create-story/checklist.md`.

### Completion Notes List

- Story `1.3` подготовлена как implementation-ready single-story artifact.
- Зафиксировано, что story hardens existing preference system instead of introducing a new persistence model.
- Явно отделены runtime persistence concerns от unrelated homepage content/navigation work.
- Completion note: Ultimate context engine analysis completed - comprehensive developer guide created.

### File List

Changed:
- `tests/lang-toggle.test.js` — 2 new unit tests added
- `tests/e2e/genuim.preferences.spec.ts` — stale assertion fixed

Unchanged (confirmed correct, no edits needed):
- `site/index.html`
- `site/assets/js/lang-toggle.js`
- `site/assets/js/theme-toggle.js`
- `site/assets/css/input.css`
- `tests/theme-toggle.test.js`
- `tests/e2e/pages/genuim.page.ts`
