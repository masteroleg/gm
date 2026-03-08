# CI и деплой: техническая схема

Этот документ нужен как техническое дополнение к `site/README.md`. В `README` описан понятный пользовательский flow, а здесь зафиксировано, как это реализовано в репозитории.

## Краткая цель

Нужно было добиться трех вещей одновременно:

1. Простая ежедневная работа из VS Code
2. Защита production от неуспешных локальных и CI-сборок
3. Отсутствие лишней бюрократии вроде обязательных PR для solo-режима

Итоговое решение:

- работа ведется в постоянной ветке `work`
- локальный `pre-push` не дает отправить очевидно плохой commit, когда изменения реально влияют на сайт
- GitHub CI проверяет только site-impacting push в `work`
- deploy идет прямо из `work`, но только если менялся публикуемый сайт и CI успешен

## Локальный gate

`.husky/pre-push` сначала смотрит diff между `HEAD` и upstream-веткой.

Если изменений сайта нет, hook пишет `No site-impacting changes detected; skipping local push checks.` и сразу пропускает push.

Если изменения сайта есть, запускаются:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test:smoke`

`test:smoke` использует Playwright-тег `@smoke` и локально гоняется только на `chromium`, чтобы gate оставался быстрым.

`site/assets/css/output.css` теперь обновляется на этапе `pre-commit`, но только если staged-изменения затронули `site/assets/css/input.css`.

## GitHub Actions workflow

Основной workflow: `.github/workflows/ci.yml`

Workflow вообще не стартует для BMAD- и docs-only изменений. Он слушает только такие пути:

- `site/index.html`
- `site/assets/**`
- `tests/**`
- `playwright.config.ts`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `.github/workflows/ci.yml`
- `.husky/**`

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
- запускается только если менялся публикуемый сайт: `site/index.html` или `site/assets/**`
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
3. если в push нет site-impacting файлов, GitHub site-CI вообще не запускается
4. если site-impacting файлы есть, GitHub Actions запускает `quick-checks` и полный `e2e`
5. если менялся сам сайт и CI зеленый, push автоматически деплоится в GitHub Pages

## Полезные команды

```bash
npm run lint
npm run typecheck
npm run test:smoke
npm run test:e2e -- --project=firefox
npm run test:ci
```
