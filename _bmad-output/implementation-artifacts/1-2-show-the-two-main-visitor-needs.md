# Story 1.2: Show the Two Main Visitor Needs

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Как посетитель главной страницы,
я хочу видеть две основные задачи, которые решает предложение,
чтобы быстро понять, подходит ли оно под мой кейс.

## Acceptance Criteria

1. Дано: посетитель прокручивает страницу ниже первого экрана.
   Когда: появляется следующий section homepage.
   Тогда: section показывает два явно разных блока.
   И: один блок посвящен подготовке к `еАкциз`, а второй - публичному proof о маркированном товаре для покупателей, партнеров или аудиторов. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.2; `_bmad-output/planning-artifacts/prd.md` - FR8]

2. Дано: посетитель читает оба блока.
   Когда: он сравнивает заголовки, краткие описания и CTA.
   Тогда: каждый блок говорит о другой потребности.
   И: каждый CTA ясно объясняет, что посетитель может сделать дальше. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.2; `_bmad-output/planning-artifacts/prd.md` - FR8]

3. Дано: посетитель выбирает блок, который соответствует его ситуации.
   Когда: он нажимает CTA этого блока.
   Тогда: он попадает в request form с уже выбранным подходящим сценарием.
   И: ему не нужно догадываться, какой блок для него и что произойдет после клика. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.2; `_bmad-output/planning-artifacts/architecture.md` - URL params prefill; `_bmad-output/planning-artifacts/ux-design-specification.md` - Prefill pattern]

4. Дано: посетитель открывает этот section на mobile или desktop.
   Когда: section отображается.
   Тогда: оба блока и оба CTA видимы, читаемы и usable.
   И: layout работает на ширине `360px` без скрытых или перекрытых действий. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.2; `_bmad-output/planning-artifacts/prd.md` - NFR16; `_bmad-output/project-context.md` - Accessibility Requirements]

5. Дано: декоративные визуальные элементы или вторичная supporting information недоступны.
   Когда: посетитель читает два need blocks.
   Тогда: различие между ветками остается понятным из copy и CTA language alone.
   И: посетитель не вынужден угадывать, какой путь подходит под его case. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.2]

## Tasks / Subtasks

- [ ] Превратить section `#use-cases` в явный branch split между двумя business needs. (AC: 1, 2, 5)
  - [ ] Переписать section heading и copy в `site/index.html` и `site/assets/js/lang-toggle.js` так, чтобы она описывала две разные visitor needs, а не абстрактные brand jobs.
  - [ ] Для блока `еАкциз` прямо назвать operational readiness и risk-reduction value.
  - [ ] Для блока manufacturer/brand proof прямо назвать public-proof value для buyers, partners и auditors.
  - [ ] Сохранить copy distinction достаточной даже без decorative rails, visuals и footer-style supporting elements.

- [ ] Добавить branch-specific CTA в каждый из двух блоков. (AC: 2, 3)
  - [ ] Ввести отдельный CTA для `еАкциз` branch и отдельный CTA для manufacturer/brand-proof branch.
  - [ ] Текст каждого CTA должен заранее объяснять business next step, а не использовать generic wording вроде `Talk to us`.
  - [ ] Не сводить эти CTA обратно к direct `mailto:` или к hero proof CTA; это отдельные branch-entry actions.

- [ ] Подключить branch CTA к shared request-form path с scenario prefill contract. (AC: 3)
  - [ ] Использовать standard navigation к request surface, а не SPA-routing, modal flow или JS-only state transition.
  - [ ] Передавать branch context через стабильный `?scenario=` contract, который request-form controller сможет прочитать при init.
  - [ ] Если request surface еще отсутствует в codebase, не заменять это direct `mailto:` handoff; сохранить navigation + prefill contract как source-of-truth implementation target.

- [ ] Сохранить scope Story `1.2` в пределах branch section и branch-entry behavior. (AC: 1, 2, 3, 4, 5)
  - [ ] Не трогать first-screen explanation и hero CTA `/v/genuim`, зафиксированные Story `1.1`, кроме случаев strict compatibility.
  - [ ] Не вводить official-check guidance to `Дія`; это scope Story `3.1`.
  - [ ] Не вводить request submission, mailto handoff, validation rules или fallback messaging; это scope Stories `3.3` и `3.4`.
  - [ ] Не тянуть trust-floor navigation или info-page behavior; это scope Story `1.4`.

- [ ] Адаптировать layout и styling section под два различимых branch cards с visible CTA. (AC: 1, 2, 4, 5)
  - [ ] Расширить существующую систему `use-case-grid` / `content-card` в `site/assets/css/input.css` без full-page redesign.
  - [ ] Обеспечить читаемость headings, body copy и CTA на `360px`, `768px`, `1280px`.
  - [ ] Сохранить keyboard focus, touch targets >= `44x44px`, отсутствие horizontal scroll и отсутствие hidden/overlapping actions.

- [ ] Обновить regression coverage для branch split section. (AC: 1, 2, 3, 4, 5)
  - [ ] Обновить homepage browser coverage так, чтобы проверялись наличие двух отличимых blocks и двух branch-specific CTA.
  - [ ] Проверить, что CTA target uses request-form navigation with distinct scenario prefill values rather than generic anchors or direct `mailto:`.
  - [ ] Если в этой story вводится request-surface prefill logic, добавить focused unit/browser coverage для initial selected scenario без захвата submit semantics.

## Dev Notes

- Story `1.2` отвечает только за section immediately after first screen: branch split, branch wording и branch-entry CTA behavior. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.2]
- Story `1.1` уже зафиксировала first-screen intent: hero объясняет категорию и ведет на `/v/genuim`; Story `1.2` не должна размывать или переопределять этот contract. [Source: `_bmad-output/implementation-artifacts/1-1-clarify-the-homepage-first-screen.md`]
- По PRD homepage должна ловить две аудитории рано, а затем разделять их на более четкие branches later; именно этот section реализует branch split. [Source: `_bmad-output/planning-artifacts/prd.md` - Executive Summary; FR8]
- В текущем codebase блоки уже существуют как `use-case-grid`, но они пока не содержат branch-specific CTA и не доводят посетителя до request-form path с preselected scenario. Это divergence from source-of-truth, а не основание ослаблять story intent. [Source: `site/index.html`; `_bmad-output/planning-artifacts/epics.md`; `_bmad-output/planning-artifacts/prd.md`]

### Scope Guardrails

- Story `1.2` не меняет hero explanation, hero preview panel или primary proof CTA из Story `1.1`, кроме strict compatibility updates.
- Story `1.2` не вводит official-check routing to `Дія`; здесь обе cards - business-oriented branches.
- Story `1.2` вводит только branch-entry transition к request form with selected scenario; она не вводит request submission semantics, `mailto:` handoff behavior, validation rules или fallback contact UX.
- Story `1.2` не тянет knowledge/info-page navigation, trust-floor destinations или footer IA.
- Story `1.2` может использовать существующую card system без полного bento-redesign, если distinction между branches и CTA clarity остаются очевидными.

### Technical Requirements

- Сохранить DOM-first static-site architecture: homepage markup в `site/index.html`, styles в `site/assets/css/input.css`, translations в `site/assets/js/lang-toggle.js`; не добавлять framework abstractions, SPA runtime или backend dependencies. [Source: `_bmad-output/project-context.md` - Architecture Context]
- Любой новый user-visible CTA text, branch copy и accessibility text должен идти через translation maps и `data-i18n` / `data-i18n-aria-label`; не хардкодить новый JS text вне translation source. [Source: `_bmad-output/project-context.md` - i18n Patterns]
- Branch-entry navigation должна использовать standard links. `?scenario=` читается request-form controller при init; branch CTAs должны быть совместимы с этим contract. [Source: `_bmad-output/planning-artifacts/architecture.md` - URL params prefill; `request-form.js` deliverable]
- Не переводить branch CTA в direct `mailto:` handoff. `mailto:` UX handoff - отдельный request-surface concern и Phase 1 transport boundary, не behavior branch section itself. [Source: `_bmad-output/planning-artifacts/architecture.md` - Request/contact handoff Phase 1]

### Architecture Compliance

- Публикуемая поверхность остается в `site/`; branch split реализуется в homepage section, а не как framework-driven component tree. [Source: `_bmad-output/project-context.md` - Project Structure Rules]
- Extend existing `use-case-grid` / `content-card` patterns or introduce lightweight branch-card styling in `site/assets/css/input.css`; не добавлять UI libraries. [Source: `_bmad-output/planning-artifacts/architecture.md` - CSS extensions; `_bmad-output/project-context.md` - Tailwind CSS v4 Contract]
- Branch distinction должна поддерживать trust boundary из `FR6`: official checking остается в `Дія`, manufacturer/brand proof - в `genu.mark`; wording не должно звучать как government or certification flow. [Source: `_bmad-output/planning-artifacts/prd.md` - FR6]
- Phase 1 request/contact flow остается isolated request-surface concern. Branch CTAs only hand off context into that flow. [Source: `_bmad-output/planning-artifacts/architecture.md` - Cross-Component Dependencies]

### Library / Framework Requirements

- Tailwind CSS остается на v4 CSS-first contract: `@import "tailwindcss"`, `@theme`, existing tokens и utility-first styling with selective custom CSS patterns. [Source: `site/assets/css/input.css`; `https://tailwindcss.com/blog/tailwindcss-v4`]
- Tailwind modern-browser baseline допускает современные CSS features, но branch clarity и CTA usability не должны зависеть от non-critical motion or unsupported edge-only features. [Source: `https://tailwindcss.com/docs/browser-support`]
- Не добавлять animation/component libraries; performance budget и static-site delivery требуют native DOM/CSS approach. [Source: `_bmad-output/planning-artifacts/architecture.md` - Technical Constraints & Dependencies]

### File Structure Requirements

- Основные production files для Story `1.2`: `site/index.html`, `site/assets/js/lang-toggle.js`, `site/assets/css/input.css`. [Source: `site/index.html`; `site/assets/js/lang-toggle.js`; `site/assets/css/input.css`]
- Если request-surface entry contract вводится в этой story, вероятные новые/adjacent surfaces: shared request-form markup surface and `site/assets/js/request-form.js`, because architecture already reserves controller support for `?scenario=` prefill. [Source: `_bmad-output/planning-artifacts/architecture.md` - New JS controllers]
- Вероятные regression/test surfaces: `tests/e2e/home.spec.ts`, future request-form tests, and any selector-sensitive homepage specs. [Source: `tests/e2e/home.spec.ts`; `_bmad-output/planning-artifacts/architecture.md` - testing plan references]

### Testing Requirements

- Проверить, что section after hero показывает две clearly different cards, а не две вариации одной и той же sales claim. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.2]
- Проверить, что каждая card имеет distinct CTA text и distinct branch destination semantics. [Source: `_bmad-output/planning-artifacts/prd.md` - FR8]
- Проверить mobile behavior на `360px`: оба CTA видимы, focusable, не перекрываются и не уходят за viewport. [Source: `_bmad-output/project-context.md` - Accessibility Requirements; `_bmad-output/planning-artifacts/prd.md` - NFR16]
- Если request-form prefill visibility реализуется в этой story, добавить browser/unit coverage на чтение `?scenario=` и initial selected scenario state without submit behavior. [Source: `_bmad-output/planning-artifacts/architecture.md` - URL params prefill; `_bmad-output/planning-artifacts/ux-design-specification.md` - Prefill pattern]

### Current Implementation Intelligence

- Текущий `#use-cases` section уже размещен сразу после first screen, что совпадает с story order, но heading и cards сейчас поданы как generic `Use cases` / `brand jobs`, а не как two main visitor needs with explicit branch choice. [Source: `site/index.html`]
- В current codebase у обоих cards нет CTA вообще; это главный functional gap относительно Story `1.2` и `FR8`. [Source: `site/index.html`; `_bmad-output/planning-artifacts/prd.md` - FR8]
- Current site also lacks a request-form surface/controller in the checked-in codebase, although architecture already defines `request-form.js` and `?scenario=` prefill as Phase 1 contract. Это divergence from source-of-truth planning, а не основание возвращаться к direct `mailto:` in branch CTAs. [Source: `_bmad-output/planning-artifacts/architecture.md` - New JS controllers; URL params prefill; `site/index.html`]
- Existing CSS already collapses `use-case-grid` to one column at `<=1023px` and keeps card content readable at mobile sizes, so implementation should extend that responsive pattern instead of replacing it wholesale. [Source: `site/assets/css/input.css`]

### Latest Tech Information

- Tailwind CSS v4 official guidance confirms CSS-first customization and theme variables as the intended extension model, which matches how this homepage section should be evolved. [Source: `https://tailwindcss.com/blog/tailwindcss-v4`]
- Official Tailwind browser support guidance reinforces that usability-critical branch selection and CTA actions should not depend on optional platform features with limited support. [Source: `https://tailwindcss.com/docs/browser-support`]

### Project Context Reference

- Controllers must fail soft when optional DOM is absent; if request-form hooks are introduced later, homepage CTA markup should degrade to normal navigation without JS crashes. [Source: `_bmad-output/project-context.md` - DOM Access and Initialization]
- Keep diffs lean, avoid unnecessary formatting churn, and do not disturb unrelated dirty worktree files. [Source: `_bmad-output/project-context.md` - Editing Constraints]
- `site/assets/css/output.css` remains a committed artifact when CSS source changes. [Source: `_bmad-output/project-context.md` - CRITICAL: output.css]

### Project Structure Notes

- Story aligned with existing structure: homepage branch split stays in `site/index.html`, translated text in `site/assets/js/lang-toggle.js`, styling in `site/assets/css/input.css`, and verification in `tests/` / `tests/e2e/`.
- Previous-story carryover: Story `1.1` fixed the first-screen boundary and primary proof CTA. Story `1.2` must build the next decision layer without reopening that earlier intent.
- Current implementation gaps around missing CTA and missing checked-in request surface are treated as delivery gaps to close, not as reasons to weaken the branch-split outcome.

### References

- `_bmad-output/planning-artifacts/epics.md` - Story 1.2 acceptance criteria and scope ordering.
- `_bmad-output/planning-artifacts/prd.md` - Executive Summary; FR6; FR8; NFR16; SC4.
- `_bmad-output/planning-artifacts/architecture.md` - request/contact constraints, `request-form.js`, `?scenario=` prefill, CSS/JS deliverables.
- `_bmad-output/planning-artifacts/ux-design-specification.md` - Bento branch split, BranchCard pattern, Prefill pattern.
- `_bmad-output/project-context.md` - static-site architecture, i18n, testing, accessibility, output.css constraints.
- `_bmad-output/implementation-artifacts/1-1-clarify-the-homepage-first-screen.md` - previous-story boundary and first-screen contract.
- `site/index.html` - current `#use-cases` structure, missing branch CTA, current final `mailto:` CTA.
- `site/assets/js/lang-toggle.js` - translation source-of-truth for use-case copy and future CTA labels.
- `site/assets/css/input.css` - existing `use-case-grid` / `content-card` patterns and responsive rules.
- `tests/e2e/home.spec.ts` - current homepage smoke baseline.
- `https://tailwindcss.com/blog/tailwindcss-v4` - official Tailwind CSS v4 guidance.
- `https://tailwindcss.com/docs/browser-support` - official Tailwind browser compatibility guidance.

## Dev Agent Record

### Agent Model Used

openai/gpt-5.4

### Debug Log References

- Проанализированы Story `1.2` requirements из epic, FR8/FR6 из PRD, branch-card/prefill guidance из UX spec и request-surface contract из architecture.
- Использованы предыдущие guardrails из `_bmad-output/implementation-artifacts/1-1-clarify-the-homepage-first-screen.md`, чтобы не смешать first-screen scope и branch-split scope.
- Проверен текущий homepage code state: `#use-cases` cards already exist, but branch CTA and request-form contract are not yet represented in checked-in implementation.
- `validate-workflow.xml`, на который ссылается workflow, отсутствует в `_bmad/core/tasks/`; checklist review выполнен вручную по `_bmad/bmm/workflows/4-implementation/create-story/checklist.md`.

### Completion Notes List

- Story `1.2` подготовлена как implementation-ready single-story artifact.
- Зафиксирован explicit boundary между branch-entry behavior (`1.2`) и request submit/handoff semantics (`3.3` / `3.4`).
- Зафиксировано, что отсутствие checked-in request surface в current codebase не меняет source-of-truth intent и не оправдывает возврат к generic `mailto:` CTA.
- Completion note: Ultimate context engine analysis completed - comprehensive developer guide created.

### File List

- `site/index.html`
- `site/assets/js/lang-toggle.js`
- `site/assets/css/input.css`
- `site/assets/js/request-form.js`
- `tests/e2e/home.spec.ts`
- `tests/request-form.test.js`
