# CI и деплой: техническая схема

Этот документ нужен как техническое дополнение к `site/README.md`. В `README` описан понятный пользовательский flow, а здесь зафиксировано, как это реализовано в репозитории.

## Краткая цель

Нужно было добиться трех вещей одновременно:

1. Простая ежедневная работа из VS Code
2. Защита production от неуспешных локальных и CI-сборок
3. Отсутствие лишней бюрократии вроде обязательных PR для solo-режима

Итоговое решение:

- работа ведется в постоянной ветке `work`
- `main` остается защищенной
- локальный `pre-push` не дает отправить очевидно плохой commit
- GitHub CI не дает продвинуть commit в `main`, пока он не зеленый
- deploy идет только из `main` и только после успешного CI

## Локальный gate

`.husky/pre-push` запускает:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run build:css`
4. проверку актуальности `site/assets/css/output.css`
5. `npm run test:smoke`

`test:smoke` использует Playwright-тег `@smoke` и локально гоняется только на `chromium`, чтобы gate оставался быстрым.

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

- выполняется только после успеха `quick-checks` и `e2e`
- использует уже подготовленный artifact
- не делает повторный `npm ci` или повторную сборку сайта

## Branch protection на `main`

Зафиксированная схема:

1. Включен `Require status checks to pass before merging`
2. Required check: `required-checks`
3. `Require a pull request before merging` выключен
4. `Require linear history` включен
5. `Do not allow bypassing the above settings` включен

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

### Когда CI на `work` зеленый

Продвижение того же SHA в `main`:

```bash
npm run promote:main
```

Скрипт выполняет:

```bash
git push origin HEAD:main
```

## Почему прямой push в `main` больше не работает

Потому что теперь `main` защищена required check-ом. GitHub не принимает новый commit в `main`, если для него еще не существует успешного `required-checks`.

Поэтому commit сначала живет в `work`, проходит CI, и только потом тот же SHA продвигается в `main`.

## Полезные команды

```bash
npm run lint
npm run typecheck
npm run test:smoke
npm run test:e2e -- --project=firefox
npm run test:ci
npm run promote:main
```
