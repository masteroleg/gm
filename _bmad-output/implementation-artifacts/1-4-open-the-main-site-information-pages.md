# Story 1.4: Open the Main Site Information Pages

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Как посетитель главной страницы,
я хочу открывать основные информационные страницы сайта,
чтобы быстро находить background и policy information перед следующим шагом.

## Acceptance Criteria

1. Дано: посетитель хочет получить больше информации перед следующим шагом.
   Когда: он использует site links с homepage.
   Тогда: он может открыть страницы `About`, `Contact`, `Proof & Cases`, `Privacy`, `Terms` и `FAQ`.
   И: каждая ссылка открывает working public page. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.4; `_bmad-output/planning-artifacts/prd.md` - FR9, FR26]

2. Дано: посетитель открывает одну из этих страниц.
   Когда: страница отображается.
   Тогда: ясно, для чего она нужна.
   И: страница содержит page-specific title, starter content по назначению и понятную навигацию обратно на homepage или в текущий approved CTA path. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.4; `_bmad-output/planning-artifacts/prd.md` - FR26]

3. Дано: посетитель открывает одну из этих страниц из публичного сайта.
   Когда: страница загружается.
   Тогда: у нее есть clear title и purpose.
   И: она готова быть linked как public destination без вида broken placeholder. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.4; `_bmad-output/planning-artifacts/prd.md` - FR26, NFR9]

4. Дано: посетитель перемещается между homepage и этими страницами.
   Когда: он использует site links.
   Тогда: links ясны и usable.
   И: он может легко вернуться на homepage или продолжить в другой public destination. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.4]

5. Дано: посетитель открывает эти страницы на mobile или desktop.
   Когда: страницы загружаются.
   Тогда: content и links читаемы и usable.
   И: layout работает на ширине `360px` без broken navigation или hidden links. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.4; `_bmad-output/planning-artifacts/prd.md` - NFR16]

6. Дано: одна из этих destinations пока содержит только starter-level Phase 1 content.
   Когда: посетитель открывает ее.
   Тогда: она все равно работает как valid public destination с clear purpose, starter content и usable navigation.
   И: она не выглядит broken, empty или falsely complete. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.4; `_bmad-output/planning-artifacts/prd.md` - FR26]

## Tasks / Subtasks

- [x] Добавить trust-floor destinations как реальные статические страницы в `site/`. (AC: 1, 2, 3, 6)
  - [x] Создать public routes для `About`, `Contact`, `Proof & Cases`, `Privacy`, `Terms`, `FAQ` в структуре `site/<slug>/index.html`, используя project-consistent kebab-case slugs.
  - [x] Убедиться, что каждая страница содержит осмысленный `<main>` с page-specific heading, starter content и clear purpose statement, а не пустую заглушку.
  - [x] Для `About` явно объяснить, что такое `genu.im` и чем он не является как company-controlled proof surface. [Source: `_bmad-output/planning-artifacts/prd.md` - About includes compact self-verification explanation]
  - [x] Для `FAQ` включить starter procurement / audit questions Phase 1, а не общий lorem placeholder. [Source: `_bmad-output/planning-artifacts/prd.md` - FAQ includes starter procurement and audit questions]

- [x] Сделать эти страницы достижимыми из публичного сайта. (AC: 1, 4, 5)
  - [x] Добавить entry points на homepage navigation и/или footer так, чтобы visitor мог открыть все шесть destinations с public site без dead ends.
  - [x] Сохранить clear way back to homepage и переходы между public destinations.
  - [x] Не прятать trust-floor links за desktop-only patterns; на `360px` они должны оставаться usable.

- [x] Привести trust-floor pages к общему public-page contract по SEO и metadata. (AC: 2, 3, 6)
  - [x] Добавить unique `<title>`, `<meta name="description">`, canonical, OG tags и `hreflang` (`uk`, `en`, `x-default`) на каждую indexable page.
  - [x] Сохранить обязательный `<head>` order pattern из architecture и не выносить JSON-LD в конец `<body>`.
  - [x] Если structured data для starter pages минимальна, все равно не оставлять metadata пустой или generic-copy duplicated across all pages.

- [x] Сохранить current architecture и scope boundaries. (AC: 2, 4, 5, 6)
  - [x] Не превращать эти pages в knowledge hub; knowledge section reserved for Story `1.5`.
  - [x] Не вводить request submission semantics, request form behavior или `mailto:` handoff logic; можно только дать clear navigation back to existing public CTA path without inventing flow semantics.
  - [x] Не переиспользовать legacy content from `site/perevir-produkt/` как public trust-floor source-of-truth.
  - [x] Не тянуть сюда proof-page implementation из Epic `2`; `Proof & Cases` page может быть starter trust-floor explainer, а не полноценный proof surface.

- [x] Добавить regression coverage для trust-floor navigation и public-page validity. (AC: 1, 2, 3, 4, 5, 6)
  - [x] Расширить homepage/browser tests так, чтобы проверялась достижимость trust-floor links.
  - [x] Добавить browser smoke coverage, что каждая trust-floor page resolves, имеет visible title/heading и usable way back.
  - [x] По возможности проверить базовый head/SEO contract на каждой new page: title, canonical и non-empty description.

## Dev Notes

- Story `1.4` отвечает за trust-floor destinations: public informational pages, reachable links and valid public destinations. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.4; `_bmad-output/planning-artifacts/prd.md` - FR9, FR26]
- Current homepage не предоставляет ни footer trust links, ни public informational routes for About/Contact/Privacy/Terms/FAQ. Это delivery gap относительно source-of-truth planning, а не повод сокращать scope story. [Source: `site/index.html`; `_bmad-output/planning-artifacts/prd.md` - FR26]
- Story `1.4` может ship starter-level content. Цель Phase 1 - valid public destinations with clear purpose, а не fully mature editorial library. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.4; `_bmad-output/planning-artifacts/prd.md` - Recommended Phase 1 Default]
- Existing files `site/perevir-produkt/index.html` и `site/perevir-product/index.html` относятся к legacy migration context и не покрывают trust-floor requirements этой story. [Source: project files]

### Scope Guardrails

- Story `1.4` не создает knowledge section, article index или article-template flow; это scope Story `1.5`.
- Story `1.4` не реализует canonical proof pages, no-data pages или demo-input behavior; это scope Epic `2`.
- Story `1.4` не вводит request form semantics, submission UX, scenario prefill or `mailto:` handoff; она только дает clear public destinations and navigation.
- Story `1.4` не требует full legal copy depth; `Privacy` и `Terms` могут быть concise Phase 1 starter pages, если они clearly labeled and usable.
- Story `1.4` не должна выглядеть как fake-complete content library; honest starter content is preferred over inflated placeholder prose.

### Technical Requirements

- Все новые pages остаются static HTML routes under `site/` with committed assets; no SSR, no framework routing, no backend dependencies. [Source: `_bmad-output/project-context.md` - Architecture Context]
- Bilingual support остается в current project pattern: single-URL pages with shared JS i18n approach, `hreflang` tags and language/theme controls where needed. [Source: `_bmad-output/planning-artifacts/architecture.md` - hreflang single-URL pattern]
- User-visible copy on new pages should be compatible with `data-i18n` / translation-map model if pages participate in runtime language switching. [Source: `_bmad-output/project-context.md` - i18n Patterns]
- New pages should preserve existing preference behavior expectations from Story `1.3` if they include theme/lang controls. [Source: `_bmad-output/implementation-artifacts/1-3-remember-the-chosen-language-and-theme.md`]

### Architecture Compliance

- Architecture already reserves `site/about/index.html` and `site/faq/index.html` as trust-floor pages; extend that pattern consistently for `contact`, `proof-cases`, `privacy`, and `terms`. [Source: `_bmad-output/planning-artifacts/architecture.md` - file structure]
- Every indexable trust-floor page should follow the required `<head>` order: preload, CSS, SEO metadata, `hreflang`, OG tags, JSON-LD, theme bootstrap. [Source: `_bmad-output/planning-artifacts/architecture.md` - HTML page head order]
- `hreflang` must include `uk`, `en`, and `x-default`; do not omit `x-default`. [Source: `_bmad-output/planning-artifacts/architecture.md` - head rules]
- Trust-floor destinations are part of public navigation validation and release review, so link reachability and valid content must be testable. [Source: `_bmad-output/planning-artifacts/prd.md` - primary task set / trust-floor navigation]

### Library / Framework Requirements

- Tailwind CSS remains on v4 CSS-first contract; page styling should extend `site/assets/css/input.css` or existing utility patterns, not introduce external UI libraries. [Source: `site/assets/css/input.css`; `https://tailwindcss.com/blog/tailwindcss-v4`]
- Official Tailwind browser support baseline is sufficient for these pages, but readability/navigation cannot rely on optional advanced-only CSS behavior. [Source: `https://tailwindcss.com/docs/browser-support`]
- Keep implementation lightweight to preserve static-site performance budget and Lighthouse expectations. [Source: `_bmad-output/planning-artifacts/architecture.md` - Technical Constraints & Dependencies; `_bmad-output/project-context.md` - Performance Requirements]

### File Structure Requirements

- New/updated production files likely include `site/about/index.html`, `site/contact/index.html`, `site/proof-cases/index.html`, `site/privacy/index.html`, `site/terms/index.html`, `site/faq/index.html`, and homepage links in `site/index.html`. [Source: architecture trust-floor pattern + story scope]
- Shared styling may require additions in `site/assets/css/input.css`; keep `site/assets/css/output.css` committed if CSS source changes. [Source: `_bmad-output/project-context.md` - output.css]
- If common header/footer markup is duplicated across new static pages, keep contracts for `lang-toggle.js`, `theme-toggle.js`, and `menu.js` consistent with existing IDs/attributes. [Source: `site/index.html`; `site/assets/js/lang-toggle.js`; `site/assets/js/theme-toggle.js`; `site/assets/js/menu.js`]

### Testing Requirements

- Add browser coverage that trust-floor links are reachable from the public site and that each destination resolves successfully. [Source: `_bmad-output/planning-artifacts/prd.md` - FR26 verification]
- Verify every new page has a visible page heading, usable navigation, and no broken mobile layout at `360px`. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.4; `_bmad-output/planning-artifacts/prd.md` - NFR16]
- Validate basic SEO metadata presence on new pages: unique title, description, canonical, `hreflang` and social-preview metadata. [Source: `_bmad-output/planning-artifacts/prd.md` - NFR9; `_bmad-output/planning-artifacts/architecture.md` - head order]
- If new pages include preference controls, reuse existing preference tests/patterns rather than creating page-specific preference logic. [Source: `_bmad-output/implementation-artifacts/1-3-remember-the-chosen-language-and-theme.md`]

### Current Implementation Intelligence

- Current site only exposes the homepage and two migration-related product-check pages; required trust-floor destinations are missing from checked-in public IA. [Source: `site/index.html`; `site/perevir-product/index.html`; `site/perevir-produkt/index.html`]
- Homepage footer currently contains only a tagline and no trust-floor links, so FR9/FR26 are not satisfied. [Source: `site/index.html`]
- `lang-toggle.js` currently contains no translation keys for About/Contact/Privacy/Terms/FAQ navigation, so implementing this story will likely require expanding the translation map alongside page markup. [Source: `site/assets/js/lang-toggle.js`]
- Architecture and PRD explicitly allow starter-level destinations, so the main risk is not sparse content itself but pages that look empty, broken or semantically unfinished. [Source: `_bmad-output/planning-artifacts/prd.md` - FR26]

### Latest Tech Information

- Tailwind CSS v4 official guidance continues to support CSS-first customization and token-driven page styling, which fits these lightweight trust-floor destinations. [Source: `https://tailwindcss.com/blog/tailwindcss-v4`]
- Official Tailwind browser support guidance reinforces using stable layout and typography patterns for informational pages rather than relying on bleeding-edge-only enhancements. [Source: `https://tailwindcss.com/docs/browser-support`]

### Project Context Reference

- Published app surface remains entirely under `site/`; production site code should not move to repo root or docs zones. [Source: `_bmad-output/project-context.md` - Project Structure Rules]
- New pages must preserve accessibility basics: semantic HTML, visible focus, usable touch targets, decorative SVGs `aria-hidden="true"`, and mobile readability. [Source: `_bmad-output/project-context.md` - HTML and DOM Contract; Accessibility Requirements]
- Keep diffs lean and avoid unnecessary formatting churn; static placeholder content should still be purposeful, not verbose filler. [Source: `_bmad-output/project-context.md` - Editing Constraints]

### Project Structure Notes

- Story aligns with the existing static-site structure by adding new route folders under `site/` and linking them from homepage navigation/footer.
- Previous-story carryover: `1.1` through `1.3` define homepage meaning, branch split and preference stability; `1.4` adds trust-floor navigation without reopening those decisions.
- Because knowledge and proof surfaces are separate future/parallel scopes, these new pages should act as honest trust destinations, not as overloaded substitutes for Epics `2` or Story `1.5`.

### References

- `_bmad-output/planning-artifacts/epics.md` - Story 1.4 acceptance criteria.
- `_bmad-output/planning-artifacts/prd.md` - FR9, FR26, NFR9, NFR16, trust-floor destination requirements.
- `_bmad-output/planning-artifacts/architecture.md` - trust-floor file structure, `<head>` order, `hreflang` pattern, SEO architecture.
- `_bmad-output/planning-artifacts/ux-design-specification.md` - trust-floor gap context and About/trust-floor framing cues.
- `_bmad-output/project-context.md` - static-site boundaries, i18n rules, accessibility and output.css constraints.
- `_bmad-output/implementation-artifacts/1-1-clarify-the-homepage-first-screen.md` - previous-story boundary.
- `_bmad-output/implementation-artifacts/1-2-show-the-two-main-visitor-needs.md` - previous-story boundary.
- `_bmad-output/implementation-artifacts/1-3-remember-the-chosen-language-and-theme.md` - preference carryover for new pages.
- `site/index.html` - current public navigation and footer gap.
- `site/assets/js/lang-toggle.js` - current translation map and nav label surface.
- `site/assets/css/input.css` - existing styling system for extending informational pages.
- `site/perevir-product/index.html` - migration stub, not trust-floor destination.
- `site/perevir-produkt/index.html` - legacy migrated content, not trust-floor destination contract.
- `tests/e2e/home.spec.ts` - current homepage smoke baseline.
- `https://tailwindcss.com/blog/tailwindcss-v4` - official Tailwind CSS v4 guidance.
- `https://tailwindcss.com/docs/browser-support` - official Tailwind browser compatibility guidance.

## Dev Agent Record

### Agent Model Used

openai/gpt-5.4

### Debug Log References

- Проанализированы Story `1.4` acceptance criteria, trust-floor PRD requirements, architecture file structure/head rules and current public site routes.
- Проверено, что в checked-in codebase отсутствуют required trust-floor destinations and homepage links for them.
- Проверено, что current homepage footer is too thin for FR9/FR26 and that translation map lacks trust-floor navigation labels.
- `validate-workflow.xml`, на который ссылается workflow, отсутствует в `_bmad/core/tasks/`; checklist review выполнен вручную по `_bmad/bmm/workflows/4-implementation/create-story/checklist.md`.
- Созданы public pages `site/privacy/index.html` и `site/terms/index.html` по established trust-floor template с SEO metadata, hreflang, JSON-LD, lang/theme controls и back navigation.
- Homepage footer расширен до trust-floor navigation surface; добавлены links на `About`, `Contact`, `Proof & Cases`, `FAQ`, `Privacy`, `Terms`.
- Translation map `site/assets/js/lang-toggle.js` расширен nav keys и page-content keys для всех trust-floor destinations на `en` и `uk`.
- В `site/assets/css/input.css` добавлены `info-page*` и `footer-nav*` classes; `site/assets/css/output.css` пересобран для production delivery.
- Browser regression coverage расширено в `tests/e2e/home.spec.ts` для footer reachability, per-page heading/back-link checks, unique meta descriptions и `360px` usability.
- Validation выполнена командами `npm test`, `npm run lint`, `npm run typecheck`, `npm run test:smoke`, `npm run test:smoke:mobile` - все passing.

### Completion Notes List

- Story `1.4` реализует все 6 trust-floor destinations как valid public static pages under `site/`.
- Navigation contract закрыт через footer links on homepage and reciprocal footer/back navigation on trust-floor pages.
- SEO/public-page contract закрыт: unique title/description, canonical, OG, `hreflang`, JSON-LD на каждой new page.
- Mobile/browser validation закрыта smoke coverage на desktop и `mobile-chrome`; trust-floor pages usable на `360px` без overflow regression.
- Scope guardrails соблюдены: knowledge hub, request semantics и Epic `2` proof-surface logic не внедрялись.

### File List

- `_bmad-output/implementation-artifacts/1-4-open-the-main-site-information-pages.md`
- `site/index.html`
- `site/about/index.html`
- `site/contact/index.html`
- `site/proof-cases/index.html`
- `site/privacy/index.html`
- `site/terms/index.html`
- `site/faq/index.html`
- `site/assets/js/lang-toggle.js`
- `site/assets/css/input.css`
- `site/assets/css/output.css`
- `tests/e2e/home.spec.ts`
