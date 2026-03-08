# CI и деплой: техническая схема

Этот документ нужен как техническое дополнение к `site/README.md`. В `README` описан понятный пользовательский flow, а здесь зафиксировано, как это реализовано в репозитории.

## Краткая цель

Нужно было добиться трех вещей одновременно:

1. Простая ежедневная работа из VS Code
2. Защита production от неуспешных локальных и CI-сборок
3. Отсутствие лишней бюрократии вроде обязательных PR для solo-режима

Итоговое решение:

- работа ведется в постоянной ветке `work`
- локальный `pre-push` не дает отправить очевидно плохой commit
- GitHub CI проверяет каждый push в `work`
- deploy идет прямо из `work`, но только после успешного CI

## Локальный gate

`.husky/pre-push` запускает:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test:smoke`

`test:smoke` использует Playwright-тег `@smoke` и локально гоняется только на `chromium`, чтобы gate оставался быстрым.

`site/assets/css/output.css` теперь обновляется на этапе `pre-commit`, поэтому `Sync` больше не должен ломаться из-за повторной локальной пересборки CSS.

## GitHub Actions workflow

Основной workflow: `.github/workflows/ci.yml`

### `quick-checks`

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build:css`
- `git diff --exit-code -- site/assets/css/output.css`
- upload Pages artifact

### `e2e`

Полный Playwright matrix в официальном контейнере Playwright:

- `chromium`
- `firefox`
- `webkit`
- `mobile-chrome`
- `mobile-safari`

### `required-checks`

Это агрегирующий check для branch protection. Он должен быть зеленым, чтобы GitHub считал commit годным для продвижения в `main`.

### `deploy-pages`

- выполняется только после успеха `quick-checks` и `e2e` на `work`
- использует уже подготовленный artifact
- не делает повторный `npm ci` или повторную сборку сайта

## Самый простой solo-flow

### Один раз

```bash
git switch -C work
git push -u origin work
```

### Каждый день

Работаешь в `work` и используешь обычный Sync в VS Code.

CLI-эквивалент:

```bash
git push
```

### Что происходит после Sync

1. `pre-push` делает локальные проверки
2. если все ок, VS Code отправляет push в `work`
3. GitHub Actions запускает `quick-checks` и полный `e2e`
4. если CI зеленый, тот же push автоматически деплоится в GitHub Pages

## Полезные команды

```bash
npm run lint
npm run typecheck
npm run test:smoke
npm run test:e2e -- --project=firefox
npm run test:ci
```
