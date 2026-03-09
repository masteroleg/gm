# BMAD review without story file

Этот документ фиксирует, как делать формальный BMAD-style review, когда story-файла нет, он не создан или он отстает от фактического состояния репозитория.

## Когда использовать

Используй этот режим, если:

- пользователь просит code review текущего состояния репозитория
- изменения уже есть в worktree, но story-file не передан
- нужно быстро оценить quality, risks и repo-fit без проверки AC/tasks against story

## Что считается source of truth

При отсутствии story-файла источником истины считаются:

- `git diff` и `git status`
- publishable app в `site/`
- unit/e2e tests в `tests/`
- root/site/docs documentation
- `_bmad-output/project-context.md`

Это позволяет проверить код, тесты, accessibility, architecture fit и delivery quality даже без story artifact.

## Что можно и нельзя валидировать

### Можно валидировать

- соответствие project rules и current architecture
- correctness и risks в diff/current state
- gaps в tests, accessibility, i18n, persistence, initial render
- deploy/CI readiness
- docs drift

### Нельзя валидировать полноценно

- completion of story acceptance criteria
- completion of named subtasks from a missing story
- exact product intent, если он не отражен в repo/docs

Это ограничение должно быть явно проговорено в review summary.

## Recommended review format

Review без story-файла должен быть structured и коротким.

### 1. Scope

- что именно review'ится: worktree, latest diff, current branch state, deployed site state
- есть ли story-file или review идет без него

### 2. Findings by severity

- `HIGH`: user-visible bugs, broken state model, architecture violations, missing critical tests
- `MEDIUM`: maintainability/a11y/i18n/test-width gaps, risky assumptions
- `LOW`: consistency, docs, polish, naming, non-blocking cleanup

### 3. Claim vs implementation

Если в docs/README/project-context что-то обещано, а код ведет себя иначе, это нужно помечать явно.

Примеры:

- docs говорят fail-soft controllers, но script падает на missing DOM
- project-context требует no hardcoded UI text in JS, но strings зашиты в controller
- docs требуют layered coverage, но controller covered only by smoke

### 4. Test gaps

Review должен отдельно отвечать:

- хватает ли Jest coverage на state/DOM/a11y/storage fallbacks
- хватает ли browser coverage на reload/mobile/CSS/render-sensitive behavior
- не маскирует ли smoke отсутствие deeper coverage

### 5. Accessibility and initial-render gaps

Отдельно смотри:

- `aria-*` synchronization
- focus/touch usability
- mixed-language first paint
- theme/lang state mismatch между `<head>` и deferred controllers

### 6. Architecture fit

Проверяй, что изменения не тащат в static-site проект framework-era assumptions:

- no hydration assumptions
- no server-managed prefs for simple browser settings
- no backend-state jumps without explicit architecture change

### 7. Required follow-ups

В конце review должны быть clearly separated:

- what is fixed already
- what is still open
- what blocks merge/deploy confidence

## Minimal final template

Можно использовать такой concise template:

```text
BMAD-style review (without story file)

Scope:
- reviewed: <diff/worktree/current state>
- limitation: no story file, so AC/task completion cannot be validated

Findings:
- HIGH: ...
- MEDIUM: ...
- LOW: ...

Test gaps:
- ...

Architecture / a11y / initial-render notes:
- ...

Required follow-ups:
1. ...
2. ...
```

## Rule of thumb

Если story-file отсутствует, review все равно должен быть полезным и action-oriented. Не нужно отказываться от review целиком; нужно просто честно отделить:

- what can be validated from the repo
- what cannot be proven without the story artifact
