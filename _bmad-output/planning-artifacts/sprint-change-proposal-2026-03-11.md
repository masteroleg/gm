---
date: 2026-03-11
project: gm
workflow: correct-course
change_trigger: implementation-readiness-report-2026-03-11
mode: Incremental
status: approved
scope_classification: Moderate
routed_to:
  - Product Owner / Scrum Master
  - Product Manager / Architect
  - Development Team
source_documents:
  - _bmad-output/planning-artifacts/implementation-readiness-report-2026-03-11.md
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/epics.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/project-context.md
---

# Sprint Change Proposal

## 1. Сводка проблемы

### Что вызвало корректировку курса

Триггером стал отчет `_bmad-output/planning-artifacts/implementation-readiness-report-2026-03-11.md` со статусом `NEEDS WORK`.

### Что именно обнаружено

1. В implementation-ready backlog смешаны активные `Phase 1` элементы и future-phase элементы:
   - `FR20`, `FR28`, `FR32`
   - `Story 2.5`, `Story 4.4`, `Story 4.5`
2. `PRD`, `UX` и `Architecture` не до конца согласованы по трем контрактам:
   - поведение `demo banner`
   - состав и semantics полей request form
   - scope sample pages вне `/v/genuim`
3. `NFR14` в текущей формулировке конфликтует с фактическим `Phase 1` hosting на GitHub Pages, потому что требует response headers, которыми текущая платформа не управляет.

### Почему это важно сейчас

Если идти в implementation без исправления артефактов:

- команда может начать реализовывать отложенные phase-2/phase-3 элементы;
- форма будет собрана по разным контрактам в разных документах;
- тесты и acceptance criteria будут противоречить друг другу;
- `NFR14` останется заведомо невыполнимым release gate.

## 2. Анализ влияния

### Влияние на эпики

- `Epic 2` требует очистки implementation-ready scope: `Story 2.5` должна быть выведена из активного `Phase 1` набора.
- `Epic 4` не должен оставаться в текущем виде: он смешивает Phase 1 funnel/reporting и future-phase expansion.
- `Epic 1` и `Epic 3` в целом сохраняются, но нуждаются в усилении acceptance criteria по degraded-state / fallback behavior.

### Влияние на истории

- `Story 2.1` и `Story 2.3` требуют синхронизации с обязательным persistent `demo banner` для non-live proof surfaces.
- `Story 2.3` требует сужения до `example-code action` вместо открытого scope sample links.
- `Story 3.3` и `Story 3.4` требуют явного контракта по visible fields и metadata capture.
- `Story 1.1`, `1.2`, `1.4`, `1.5`, `2.1`, `3.1`, `3.2` требуют явных resilience/degraded-state AC.

### Конфликты артефактов

#### PRD

- `FR12` требует persistent notice на всех non-live surfaces.
- `FR23`/`NFR12` описывают 5 полей и контракт qualified request строже, чем UX.
- baseline scope уже уже, чем UX-описание sample pages.
- `NFR14` в текущем виде не согласован с GitHub Pages.

#### UX

- `demo banner` описан как появляющийся только после ввода/клика, что конфликтует с `FR12`.
- `RequestForm` описан как `sector + company + message`, что конфликтует с `FR23` и `NFR12`.
- `/v/genu.alko` и `/v/genu.cosm` описаны как активная часть core UX, хотя Phase 1 baseline этого не закрепляет.

#### Architecture

- безопасность Phase 1 описана через `<meta http-equiv>` fallback, а не через реальные response headers;
- request capture завязан на `mailto:` + `?sector=`, что не совпадает с итоговым contract wording;
- data/rendering model предполагает несколько именованных sample pages в Phase 1;
- test plan завязан на конфликтные assumptions по banner/form/sample scope.

### Техническое влияние

- Код можно оставить в рамках статического сайта; forced migration на новую платформу не требуется.
- Но acceptance wording и implementation contract нужно привести в состояние, которое реально можно реализовать и протестировать на GitHub Pages.
- После коррекции артефактов implementation можно продолжить без полного replanning.

## 3. Рекомендуемый подход

### Выбранный путь

`Hybrid`: прямые правки существующих артефактов + точечный review Phase 1 acceptance wording там, где обнаружено platform/scope contradiction.

### Почему это лучший вариант

- сохраняет текущий `Phase 1` план и momentum;
- не требует rollback уже выполненной работы;
- устраняет реальные blockers до начала implementation;
- очищает implementation-ready backlog без потери traceability future-phase items.

### Оценка

- `Effort:` Medium
- `Risk:` Medium
- `Timeline impact:` короткая задержка на artifact cleanup до запуска story creation / implementation; ожидаемо меньше, чем стоимость последующей переделки

### Альтернативы

- `Potential Rollback` — не рекомендуется: проблема не в уже вредно реализованном коде, а в planning/readiness artifacts.
- `Full MVP Review` — не рекомендуется как основной путь: слишком тяжелый ответ на локализованные противоречия.

## 4. Детализированные предложения по изменениям

### 4.1. Очистить implementation-ready backlog от future-phase stories

**Артефакт:** `epics.md`

**OLD:**
```text
Epic 2 includes Story 2.5 as an active recommended story.
Epic 4 includes Story 4.4 and Story 4.5 as active recommended stories.
```

**NEW:**
```text
Story 2.5, Story 4.4, and Story 4.5 are removed from the implementation-ready Phase 1 backlog.
They remain traceable as deferred future-phase references only.
```

**Обоснование:** `FR20`, `FR28` и `FR32` уже помечены как future-phase. Они не должны оставаться активными implementation stories.

### 4.2. Сузить Epic 4 до Phase 1 analytics/review scope

**Артефакт:** `epics.md`

**OLD:**
```text
Title: Funnel Visibility and Growth-Ready Trust Expansion
FRs covered: FR28, FR29, FR30, FR31, FR32
Recommended stories: 4.1, 4.2, 4.3, 4.4, 4.5
```

**NEW:**
```text
Title: Funnel Visibility and Review
FRs covered: FR29, FR30, FR31
Recommended stories: 4.1, 4.2, 4.3

Deferred future-phase references:
- FR20 / Story 2.5
- FR28 / Story 4.4
- FR32 / Story 4.5
```

**Обоснование:** активный `Epic 4` должен быть цельным и shippable в рамках `Phase 1`, без смешения с future knowledge/live-lookup expansion.

### 4.3. Синхронизировать контракт request form и metadata capture

**Артефакты:** `prd.md`, `epics.md`, `ux-design-specification.md`, `architecture.md`

**OLD:**
```text
PRD: contact + scenario + company type + short context
UX: sector + company + message + hidden source_path/proof_path
Architecture: mailto fallback + ?sector= prefill
```

**NEW:**
```text
Phase 1 visible user-entered fields:
- business contact name
- business email or phone
- company name
- scenario
- short context

Hidden metadata:
- source_path
- optional proof_path

Prefill/defaulting:
- ?scenario=... or branch-driven default

Metadata rules:
- source_path always attached when available
- proof_path attached when request starts from a proof surface
- missing metadata does not block request handoff
```

**Story updates:**

- `Story 3.3` should name all 5 visible fields explicitly.
- `Story 3.4` should state automatic attachment of `scenario`, `source_path`, and optional `proof_path`.

**Обоснование:** это устраняет противоречие `company type` vs `company name`, делает форму implementable/testable и сохраняет лимит `<= 5` полей.

### 4.4. Зафиксировать persistent demo banner на всех non-live proof surfaces

**Артефакты:** `prd.md`, `epics.md`, `ux-design-specification.md`, `architecture.md`

**OLD:**
```text
UX: demo banner appears only after code entry or sample click.
Architecture: some Phase 1 proof-page wording implies no initial demo banner.
```

**NEW:**
```text
PRD FR12 remains the source of truth.
In Phase 1, every non-live proof surface shows a persistent demo-mode notice from initial render.
On /v/ the notice appears above the input/result area.
On /v/genuim and any approved Phase 1 demo proof state it appears above the proof content.
```

**Story updates:**

- `Story 2.1` — banner visible from initial render on `/v/genuim`
- `Story 2.3` — banner visible from initial render on `/v/` and approved result states

**Обоснование:** это прямое выравнивание с `FR12`, уменьшающее trust risk и неоднозначность для UX, implementation и тестов.

### 4.5. Ограничить Phase 1 proof/demo scope маршрутом `/v/genuim` и flow `/v/`

**Артефакты:** `prd.md`, `epics.md`, `ux-design-specification.md`, `architecture.md`

**OLD:**
```text
UX and Architecture assume named sample pages such as /v/genu.alko and /v/genu.cosm as active Phase 1 artifacts.
Story 2.3 uses sample links language broadly.
```

**NEW:**
```text
Phase 1 approved proof/demo states are limited to:
- canonical proof example: /v/genuim
- paste-first demo input flow: /v/

Named sector-specific sample pages are deferred by default unless separately approved.
Story 2.3 becomes: Use the Demo Input and Example-Code Action.
```

**Обоснование:** это убирает scope creep, делает `Story 2.3` согласованной с `FR11` и удерживает implementation-ready baseline в управляемых границах.

### 4.6. Переформулировать NFR14 под реальный hosting Phase 1

**Артефакты:** `prd.md`, `architecture.md`

**OLD:**
```text
Public pages shall be served over HTTPS and, in deployed review, shall expose at minimum Content-Security-Policy, X-Content-Type-Options, and Referrer-Policy headers appropriate for a static public site.
Verification Signal: deployed review confirms those headers on each key page type.
```

**NEW:**
```text
Public pages shall be served over HTTPS in Phase 1.
Where the deployment platform supports response-header control, public pages shall expose at minimum Content-Security-Policy, X-Content-Type-Options, and Referrer-Policy headers appropriate for a static public site.
For GitHub Pages-based Phase 1 deployment, the release gate is documented platform-appropriate mitigation and explicit acknowledgment of header limitations, including CSP-oriented meta fallback where applicable.

Verification Signal:
Phase 1 deployed review confirms HTTPS, documents the platform header limitation, and verifies configured mitigations for the active hosting target.
When a header-capable hosting target is adopted, deployed response review confirms the required security headers on each key public page type.
```

**Обоснование:** это убирает невыполнимый release gate без forced infra migration и сохраняет security intent + future upgrade path.

### 4.7. Усилить degraded-state / resilience acceptance criteria

**Артефакт:** `epics.md`

**Затронутые истории:** `1.1`, `1.2`, `1.4`, `1.5`, `2.1`, `3.1`, `3.2`

**OLD:**
```text
Stories focus mainly on happy-path behavior.
```

**NEW:**
```text
Add fallback acceptance criteria confirming that if optional content, decorative enhancements, or secondary destinations are unavailable,
the core message, routing, and next-step actions remain understandable and usable,
and the page does not show broken states, dead ends, or misleading claims.
```

**Concrete additions:**

- `1.1` / `1.2` — clarity and branch recognition survive without decorative/secondary UI
- `1.4` — trust-floor destinations remain valid public pages even if some content is starter-level
- `1.5` — knowledge page does not dead-end the user even before a full library exists
- `2.1` — proof example still works when optional evidence blocks are absent
- `3.1` / `3.2` — routing/CTA path works even if measurement or metadata enhancement is unavailable

**Обоснование:** это закрывает замечание readiness report о слабом explicit failure/fallback coverage и улучшает testability.

## 5. Передача в работу

### Классификация масштаба изменений

`Moderate`

Причина: требуется backlog reorganization и синхронизация нескольких planning artifacts, но не требуется полный replan продукта.

### Кому передается

#### Product Owner / Scrum Master

- обновить `epics.md` в соответствии с approved Phase 1 scope;
- удалить future-phase stories из implementation-ready набора;
- усилить story AC по resilience и form contract;
- зафиксировать deferred backlog references.

#### Product Manager / Architect

- согласовать итоговую формулировку `NFR14`;
- подтвердить Phase 1 hosting assumption на GitHub Pages;
- подтвердить, что named sample pages остаются deferred по умолчанию.

#### Development Team

- не начинать implementation по `Story 2.5`, `Story 4.4`, `Story 4.5`;
- реализовывать только обновленный active `Phase 1` scope после синхронизации артефактов;
- использовать единый contract по form fields, demo banner и proof/demo routes.

### Критерии успеха handoff

1. В implementation-ready backlog остаются только актуальные `Phase 1` stories.
2. `PRD`, `UX` и `Architecture` согласованы по form contract, demo banner и proof/demo scope.
3. `NFR14` больше не является заведомо невыполнимым release gate для текущего hosting target.
4. Следующие workflows (`create-story`, implementation, validation) могут идти без скрытых scope/platform contradictions.

### Примечание по sprint-status

Файл `sprint-status.yaml` в доступных артефактах не найден. Если он появится позже, его нужно будет синхронизировать с обновленным epic/story scope после утверждения этого proposal.
