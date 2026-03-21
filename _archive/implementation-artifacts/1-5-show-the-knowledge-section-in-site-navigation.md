# Story 1.5: Show the Knowledge Section in Site Navigation

Status: done
Release: 2.1
Tag: 2.1

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Как посетитель,
я хочу находить knowledge section из публичного сайта,
чтобы понимать, где со временем будут жить guides и articles.

## Acceptance Criteria

1. Дано: посетитель использует site links.
   Когда: он выбирает knowledge section.
   Тогда: сайт открывает working knowledge page.
   И: страница ясно показывает, что этот раздел предназначен для guides и articles. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.5; `_bmad-output/planning-artifacts/prd.md` - FR27]

2. Дано: посетитель открывает knowledge section.
   Когда: страница отображается.
   Тогда: ясно сказано, что это ранняя версия более крупной content area.
   И: страница не притворяется уже готовой полной library. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.5; `_bmad-output/planning-artifacts/prd.md` - FR27]

3. Дано: посетитель перемещается между homepage и knowledge section.
   Когда: он использует site links.
   Тогда: navigation остается clear и usable.
   И: посетитель может легко вернуться на homepage или продолжить в другой public destination. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.5]

4. Дано: посетитель открывает knowledge section на mobile или desktop.
   Когда: страница загружается.
   Тогда: content и links читаемы и usable.
   И: layout работает на ширине `360px` без broken navigation или hidden links. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.5; `_bmad-output/planning-artifacts/prd.md` - NFR16]

5. Дано: full knowledge library еще не доступна в Phase 1.
   Когда: посетитель открывает knowledge section.
   Тогда: страница все равно объясняет purpose section и дает usable way back into the main site flow.
   И: visitor не попадает в dead end или broken placeholder. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.5; `_bmad-output/planning-artifacts/prd.md` - FR27]

## Tasks / Subtasks

- [x] Добавить knowledge-base slot в public IA. (AC: 1, 3, 4)
  - [x] Добавить named navigation/footer entry для knowledge section на homepage и/или других public entry surfaces, сохранив clear discoverability.
  - [x] Выбрать понятный public label для knowledge slot (`Knowledge`, `Insights` или `Resources`) и провести его последовательно через HTML и translation maps.
  - [x] Убедиться, что на mobile knowledge link остается reachable и usable, а не исчезает из compact navigation patterns.

- [x] Создать working placeholder page для `site/knowledge/`. (AC: 1, 2, 4, 5)
  - [x] Создать `site/knowledge/index.html` как honest Phase 1 placeholder destination с clear title, purpose statement и starter content.
  - [x] Явно объяснить, что section предназначена для guides, articles и future explainers, но full library еще не опубликована.
  - [x] Дать usable way back to homepage и/или current approved CTA path without inventing article-consumption flow.

- [x] Сохранить knowledge page как IA reservation, а не full content rollout. (AC: 2, 5)
  - [x] Не показывать fake counts, empty category grids, fabricated article cards или wording, будто полноценная library already exists.
  - [x] Если `site/knowledge/article-template.html` добавляется или резервируется как architecture support file, не делать его visitor-facing live article route в рамках этой story.
  - [x] Следовать recommended Phase 1 default: placeholder-ready destination only, если live starter article не был отдельно approved. [Source: `_bmad-output/planning-artifacts/prd.md` - Recommended Phase 1 Default]

- [x] Привести knowledge page к public-page contract по SEO и metadata. (AC: 1, 2, 5)
  - [x] Добавить unique `<title>`, `<meta name="description">`, canonical, OG tags и `hreflang` (`uk`, `en`, `x-default`) для `/knowledge/`.
  - [x] Сохранить required `<head>` order pattern и indexable placeholder contract for `/knowledge/`.
  - [x] Если используется `article-template.html` как reserved artifact, держать его вне public navigation и не смешивать с indexable placeholder page.

- [x] Сохранить согласованность с trust-floor assumptions из Story `1.4`. (AC: 3, 5)
  - [x] Добавить knowledge section как отдельный IA slot, не заменяя trust-floor destinations `About`, `Contact`, `Proof & Cases`, `Privacy`, `Terms`, `FAQ`.
  - [x] Не обнаружено прямого противоречия со Story `1.4`; реализовать knowledge link как additive public destination, а не как замену trust-floor links.
  - [x] Не тянуть сюда request-flow semantics, proof-page behavior или deep article taxonomy beyond placeholder scope.

- [x] Добавить regression coverage для knowledge navigation и placeholder validity. (AC: 1, 2, 3, 4, 5)
  - [x] Расширить browser smoke/homepage coverage так, чтобы knowledge link был reachable из public site.
  - [x] Добавить browser check, что `/knowledge/` resolves, имеет visible heading/purpose copy и usable way back.
  - [x] По возможности проверить базовый head/SEO contract на `/knowledge/`: non-empty title, description, canonical.

## Dev Notes

- Story `1.5` отвечает за knowledge IA reservation: public navigation slot + working placeholder destination, а не за full knowledge product behavior. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.5; `_bmad-output/planning-artifacts/prd.md` - FR27]
- PRD прямо говорит, что Phase 1 требует reserved knowledge-base navigation slot without requiring full knowledge content. [Source: `_bmad-output/planning-artifacts/prd.md` - FR27]
- Architecture already reserves `site/knowledge/index.html` as Phase 1 placeholder and `site/knowledge/article-template.html` as support artifact for future articles. [Source: `_bmad-output/planning-artifacts/architecture.md` - knowledge file structure]
- No direct dependency or contradiction detected with Story `1.4` trust-floor assumptions: knowledge slot is additive IA reservation, while trust-floor pages remain separate public destinations. [Source: `_bmad-output/implementation-artifacts/1-4-open-the-main-site-information-pages.md`; `_bmad-output/planning-artifacts/prd.md` - FR26, FR27]

### Scope Guardrails

- Story `1.5` не вводит full knowledge library, live article list, article filtering, search, pagination или topic taxonomy.
- Story `1.5` не притворяется, что у knowledge section уже есть published article inventory; honest placeholder is required.
- Story `1.5` не заменяет trust-floor pages из Story `1.4` и не пересматривает их assumptions без прямого противоречия.
- Story `1.5` не реализует article-consumption behavior из `FR28` Phase 2 roadmap note.
- Story `1.5` не вводит proof-page behavior, request submission semantics, `mailto:` handoff или scenario-specific flows.

### Technical Requirements

- Knowledge section остается static HTML under `site/knowledge/`; no SSR, no CMS, no backend content fetching, no framework routing. [Source: `_bmad-output/project-context.md` - Architecture Context; `_bmad-output/planning-artifacts/architecture.md` - static pages]
- Public label and placeholder copy should remain compatible with current JS i18n approach using translation maps and `data-i18n` where relevant. [Source: `_bmad-output/project-context.md` - i18n Patterns]
- If knowledge page includes shared theme/lang controls, preserve Story `1.3` preference behavior and controller contracts. [Source: `_bmad-output/implementation-artifacts/1-3-remember-the-chosen-language-and-theme.md`]
- Keep navigation and page markup keyboard-accessible, touch-usable and mobile-safe within the current static-site architecture. [Source: `_bmad-output/project-context.md` - Accessibility Requirements]

### Architecture Compliance

- `/knowledge/` is explicitly indexable in Phase 1 and should be implemented as an indexable placeholder page, not as a hidden route. [Source: `_bmad-output/planning-artifacts/architecture.md` - URL indexing]
- Knowledge Base IA reserves `/knowledge/{slug}/` and `/news/` for later phases; do not open these as live public sub-routes in this story. [Source: `_bmad-output/planning-artifacts/architecture.md` - Knowledge Base IA]
- `site/knowledge/article-template.html` is a reserved support artifact for future knowledge articles; it should not be presented as a published article from public navigation now. [Source: `_bmad-output/planning-artifacts/architecture.md` - article-template]
- `/knowledge/` should follow the same required `<head>` order and SEO metadata pattern as other indexable public pages. [Source: `_bmad-output/planning-artifacts/architecture.md` - HTML page head order]

### Library / Framework Requirements

- Tailwind CSS remains on v4 CSS-first contract; style the knowledge placeholder using existing tokens/utilities or `site/assets/css/input.css`, not external libraries. [Source: `site/assets/css/input.css`; `https://tailwindcss.com/blog/tailwindcss-v4`]
- Official Tailwind browser support baseline is sufficient, but placeholder usability and navigation should rely on stable layout patterns, not edge-only effects. [Source: `https://tailwindcss.com/docs/browser-support`]
- Keep the implementation lightweight to preserve static-site performance and Lighthouse budgets. [Source: `_bmad-output/project-context.md` - Performance Requirements]

### File Structure Requirements

- Core production files likely include `site/knowledge/index.html`, optional `site/knowledge/article-template.html`, homepage/public-nav updates in `site/index.html`, plus translation updates in `site/assets/js/lang-toggle.js`. [Source: architecture + current codebase gaps]
- Supporting styling may require additions in `site/assets/css/input.css`; if CSS source changes, keep `site/assets/css/output.css` committed. [Source: `_bmad-output/project-context.md` - output.css]
- Browser checks will likely touch `tests/e2e/home.spec.ts` and one new or expanded page smoke spec for `/knowledge/`. [Source: current test layout]

### Testing Requirements

- Add browser coverage that the knowledge link is reachable from the public site and opens `/knowledge/` successfully. [Source: `_bmad-output/planning-artifacts/prd.md` - FR27 verification]
- Verify `/knowledge/` has a visible heading, clear purpose statement, usable way back, and no broken mobile layout at `360px`. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.5; `_bmad-output/planning-artifacts/prd.md` - NFR16]
- Validate basic SEO metadata presence on `/knowledge/`: title, description, canonical, `hreflang`, social-preview metadata. [Source: `_bmad-output/planning-artifacts/prd.md` - NFR9; `_bmad-output/planning-artifacts/architecture.md` - URL indexing]
- If `article-template.html` is added, keep its verification structural/non-public and do not assert it as a user-facing article in smoke tests. [Source: `_bmad-output/planning-artifacts/architecture.md` - article-template]

### Current Implementation Intelligence

- Current checked-in public IA has no knowledge route and no knowledge nav slot; `site/knowledge/` does not exist yet. [Source: repository file scan]
- Current homepage nav/footer also lacks any translation keys or visible link for a knowledge destination, so both markup and translation maps will need extension. [Source: `site/index.html`; `site/assets/js/lang-toggle.js`]
- PRD and architecture intentionally scope Phase 1 knowledge to IA reservation and placeholder-ready destination only; this means sparse-but-honest content is correct, while fake article inventory would be incorrect. [Source: `_bmad-output/planning-artifacts/prd.md` - FR27; Recommended Phase 1 Default; `_bmad-output/planning-artifacts/architecture.md` - knowledge placeholder]
- Story `1.5` does not expose a contradiction with Story `1.4`; it adds a separate knowledge slot alongside trust-floor pages rather than replacing them. [Source: `_bmad-output/implementation-artifacts/1-4-open-the-main-site-information-pages.md`]

### Latest Tech Information

- Tailwind CSS v4 official guidance continues to support CSS-first customization for lightweight informational/placeholder pages, which matches the intended implementation of `/knowledge/`. [Source: `https://tailwindcss.com/blog/tailwindcss-v4`]
- Official Tailwind browser support guidance reinforces favoring robust page structure and typography over advanced optional effects for indexable content surfaces. [Source: `https://tailwindcss.com/docs/browser-support`]

### Project Context Reference

- Published app surface remains under `site/`; knowledge reservation should be implemented there, not under docs/system directories. [Source: `_bmad-output/project-context.md` - Project Structure Rules]
- New pages must preserve semantic HTML, visible focus, usable touch targets and honest content framing. [Source: `_bmad-output/project-context.md` - HTML and DOM Contract; Accessibility Requirements]
- Keep diffs lean and avoid unnecessary formatting churn; placeholder content must still feel intentional and truthful. [Source: `_bmad-output/project-context.md` - Editing Constraints]

### Project Structure Notes

- Story aligns with the existing static-site structure by adding a new route under `site/knowledge/` and wiring it into public navigation.
- Previous-story carryover: trust-floor pages from `1.4` remain implementation-ready and are not contradicted by this knowledge placeholder story.
- The knowledge placeholder should feel like a deliberate reserved area for future content, not a dead-end stub or a disguised trust-floor page.

### References

- `_bmad-output/planning-artifacts/epics.md` - Story 1.5 acceptance criteria.
- `_bmad-output/planning-artifacts/prd.md` - FR27, SC12, NFR9, NFR16, Recommended Phase 1 Default.
- `_bmad-output/planning-artifacts/architecture.md` - knowledge placeholder route, URL indexing, article-template reservation, SEO/head rules.
- `_bmad-output/project-context.md` - static-site architecture, i18n rules, accessibility and output.css constraints.
- `_bmad-output/implementation-artifacts/1-4-open-the-main-site-information-pages.md` - trust-floor assumptions retained without contradiction.
- `site/index.html` - current nav/footer gap.
- `site/assets/js/lang-toggle.js` - current nav/footer translation gap.
- `site/assets/css/input.css` - styling system for extending placeholder page and nav.
- `tests/e2e/home.spec.ts` - homepage smoke baseline for navigation extension.
- `https://tailwindcss.com/blog/tailwindcss-v4` - official Tailwind CSS v4 guidance.
- `https://tailwindcss.com/docs/browser-support` - official Tailwind browser compatibility guidance.

## Dev Agent Record

### Agent Model Used

openai/gpt-5.4

### Debug Log References

- Проанализированы Story `1.5` acceptance criteria, FR27/SC12, architecture knowledge placeholder rules and current codebase navigation gaps.
- Проверено, что `site/knowledge/` в checked-in public IA отсутствует, а public navigation slot for knowledge is missing.
- Проверена Story `1.4` на возможное противоречие; прямой конфликт не обнаружен, knowledge slot трактуется как additive IA reservation.
- `validate-workflow.xml`, на который ссылается workflow, отсутствует в `_bmad/core/tasks/`; checklist review выполнен вручную по `_bmad/bmm/workflows/4-implementation/create-story/checklist.md`.
- RED phase: добавлены browser tests для knowledge nav slot, `/knowledge/` placeholder, SEO metadata и `360px` usability; до реализации они падали ожидаемо.
- GREEN phase: knowledge slot добавлен в homepage main nav и footer, а также в trust-floor footers как additive IA destination без замены existing links.
- Создан `site/knowledge/index.html` как indexable Phase 1 placeholder с honest copy, back link, shared theme/lang controls и public-page metadata pattern.
- Translation map расширен ключами `nav.knowledge` и `knowledge.*` для `en` и `uk`; добавлен unit test для translation + aria-label sync.
- Validation выполнена командами `npm test`, `npm run lint`, `npm run typecheck`, `npm run test:smoke`, `npm run test:smoke:mobile`, `npx playwright test tests/e2e/home.spec.ts --config=playwright.config.ts --project=chromium -g "GM knowledge page is usable at 360px width"`.
- Final regression suite `npm run test:ci` выполнен успешно; all Jest and Playwright projects passed without regressions.
- Code review fix pass: для `/knowledge/` выровнен SEO/head contract, добавлены missing social-preview metadata и strengthened metadata ordering against architecture head pattern.
- Code review fix pass: knowledge placeholder tests расширены negative checks against fake library/auth/verification semantics и richer assertions для `hreflang`, social-preview metadata и JSON-LD.
- Code review fix pass: украинский knowledge copy очищен от mixed-language UI wording (`placeholder`, `navigation slot`, `content area`, `knowledge area`) в пользу idiomatic Ukrainian.
- Review validation выполнена командами `npx playwright test tests/e2e/home.spec.ts -g "knowledge"`, `npx jest tests/lang-toggle.test.js --runInBand`, `npx biome check site/assets/js/lang-toggle.js tests/e2e/home.spec.ts tests/lang-toggle.test.js`, `npx tsc --noEmit`.
- Follow-up lint cleanup по запросу пользователя: вычищены Biome issues в homepage/trust pages и в дополнительных site artifacts; в `biome.json` включён Tailwind CSS parser support для `@theme` / `@custom-variant`, после чего `biome check site` проходит clean.
- Follow-up validation: `npx biome check site` и `npx playwright test tests/e2e/home.spec.ts --config=playwright.config.ts --project=chromium` выполнены успешно.

### Completion Notes List

- Story `1.5` реализует public knowledge IA slot без расширения scope до full article library.
- `/knowledge/` открыт как честный indexable placeholder для будущих guides, articles и explainers.
- Navigation остается clear: knowledge link reachable с homepage, на mobile и через footer surfaces; back path на homepage сохранен.
- Trust-floor destinations из Story `1.4` сохранены и дополнены knowledge link как additive public destination.
- Browser smoke и targeted `360px` checks подтверждают knowledge reachability, metadata и usability.
- Unit coverage подтверждает translation-driven sync для `nav.knowledge`, `knowledge.*` и accessibility labels.
- Code review fixes довели `/knowledge/` до expected placeholder honesty and public-page metadata contract without expanding story scope.

### File List

- `_bmad-output/implementation-artifacts/1-5-show-the-knowledge-section-in-site-navigation.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `biome.json`
- `site/index.html`
- `site/about/index.html`
- `site/assets/css/input.css`
- `site/assets/favicon/site.webmanifest`
- `site/contact/index.html`
- `site/proof-cases/index.html`
- `site/faq/index.html`
- `site/privacy/index.html`
- `site/terms/index.html`
- `site/knowledge/index.html`
- `site/perevir-produkt/index.html`
- `site/assets/js/lang-toggle.js`
- `tests/e2e/home.spec.ts`
- `tests/lang-toggle.test.js`

## Senior Developer Review (AI)

### Reviewer

Amelia (`openai/gpt-5.4`)

### Outcome

Approved after fixes.

### Review Notes

- Git vs story check against latest story commit found no substantive File List discrepancy for Story `1.5`.
- Fixed blocking issue on `site/knowledge/index.html`: restored story-level SEO/head contract by moving stylesheet loading ahead of SEO/script metadata, keeping JSON-LD in `<head>`, and adding missing social-preview metadata including `og:image` and Twitter tags.
- Fixed should-fix issue in `tests/e2e/home.spec.ts`: added negative placeholder-honesty assertions so `/knowledge/` does not silently regress into fake library depth, auth/search semantics, or misleading CTA behavior.
- Fixed should-fix issue in `tests/e2e/home.spec.ts`: expanded metadata coverage for `hreflang`, OG/Twitter social-preview tags, and JSON-LD so CI now protects the claimed contract.
- Fixed should-fix issue in `site/assets/js/lang-toggle.js`: replaced mixed-language Ukrainian placeholder copy with idiomatic UI wording consistent with the project contract.

### Process Follow-up

- Non-blocking governance note: release/tag `2.1` should be set consistently across all Epic `1`-`4` stories. This is logged as a process follow-up and is not treated as a product blocker for Story `1.5`.

### Validation

- `npx playwright test tests/e2e/home.spec.ts -g "knowledge"`
- `npx jest tests/lang-toggle.test.js --runInBand`
- `npx biome check site/assets/js/lang-toggle.js tests/e2e/home.spec.ts tests/lang-toggle.test.js`
- `npx tsc --noEmit`
- `npx biome check site`
- `npx playwright test tests/e2e/home.spec.ts --config=playwright.config.ts --project=chromium`

## Change Log

- 2026-03-12: Added public knowledge navigation slot, created `/knowledge/` placeholder page, extended translations, and added browser/unit coverage for knowledge reachability and metadata.
- 2026-03-12: Code review fix pass aligned `/knowledge/` SEO/head metadata, strengthened knowledge regression checks, refined Ukrainian placeholder copy, and logged the separate `2.1` governance follow-up.
- 2026-03-12: User-requested lint cleanup enabled Tailwind-aware Biome parsing, fixed site-wide HTML/manifest lint findings, and verified `biome check site` clean.
