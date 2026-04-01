# CI и деплой: техническая схема

Этот документ нужен как техническое дополнение к `site/README.md`. В `README` описан понятный пользовательский flow, а здесь зафиксировано, как это реализовано в репозитории.

## Краткая цель

Нужно было добиться трех вещей одновременно:

1. Простая ежедневная работа из VS Code
2. Защита production от неуспешных локальных и CI-сборок
3. Отсутствие лишней бюрократии вроде обязательных PR для solo-режима

Итоговое решение:

- ежедневная работа идет прямо в `main`
- локальный `pre-push` не дает отправить очевидно плохой commit, когда изменения реально влияют на сайт
- GitHub CI проверяет только site-impacting push в `main`
- deploy идет из `main`, но только если менялся публикуемый сайт и CI успешен

## Локальный gate

`.husky/pre-push` сначала смотрит diff между `HEAD` и upstream-веткой.

Если изменений сайта нет, hook пишет `No site-impacting changes detected; skipping local push checks.` и сразу пропускает push.

Если изменения сайта есть, запускаются:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test:smoke`

`test:smoke` использует Playwright-тег `@smoke` и локально гоняется только на `chromium`, чтобы gate оставался быстрым.

`site/assets/css/output.css` теперь обновляется на этапе `pre-commit`, но только если staged-изменения затронули `site/assets/css/input.css`.

## GitHub Actions workflows

Используются два отдельных workflow:

- `.github/workflows/ci.yml` - только для сайта и его deploy-контура
- `.github/workflows/full-regression.yml` - полный cross-browser regression для PR/manual/nightly
- `.github/workflows/infra.yml` - только для CI/hook-инфраструктуры

`docs/BMAD only` изменения не запускают ни один из них.

`Site CI` слушает такие пути:

- `site/**`
- `.github/workflows/ci.yml`
- `tests/**`
- `playwright.config.ts`
- `package.json`
- `package-lock.json`
- `tsconfig.json`

`Site CI` является push-only deploy workflow для `main`.

`Infra Checks` слушает только такие пути:

- `.github/workflows/**`
- `.husky/**`
- `scripts/has-site-impact.sh`
- `scripts/generate-commit-msg.cjs`

### `Site CI -> quick-checks`

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build:css`
- `git diff --exit-code -- site/assets/css/output.css`
- upload Pages artifact from `./site`

### `Site CI -> smoke-e2e`

Для обычного `push` в `main` запускается быстрый smoke-набор в официальном контейнере Playwright:

- `chromium`
- `mobile-chrome`

Это дает быстрый desktop + mobile сигнал перед deploy.

### `Site CI -> full-e2e`

Полный Playwright matrix вынесен в отдельный workflow `.github/workflows/full-regression.yml` для более дорогих прогонов:

- `pull_request` в `main`
- `workflow_dispatch`
- nightly `schedule`

Матрица:

- `chromium`
- `firefox`
- `webkit`
- `mobile-chrome`
- `mobile-safari`

### `Site CI -> required-checks`

Это агрегирующий статус site-pipeline. Он показывает общий результат `quick-checks` и `smoke-e2e`.

### `Site CI -> deploy-pages`

- выполняется только после успеха `quick-checks` и `smoke-e2e` на `main`
- запускается только если менялся публикуемый сайт: любой файл внутри `site/**`
- использует уже подготовленный artifact
- публикует именно содержимое `./site`
- не делает повторный `npm ci` или повторную сборку сайта

### `Custom domain source of truth`

Для GitHub Pages источником истины считается `site/CNAME`, потому что в Pages уходит artifact из `./site`.

### `Infra Checks -> infra-checks`

- запускается только для `.github/workflows/**`, `.husky/**`, `scripts/has-site-impact.sh`
- проверяет shell syntax локальных hook-скриптов и helper-скрипта
- не запускает Playwright
- не делает deploy

## Самый простой solo-flow

### Каждый день

Работаешь в `main` и используешь обычный Sync в VS Code.

CLI-эквивалент:

```bash
git push
```

### Что происходит после Sync

1. `pre-push` делает локальные проверки
2. если все ок, VS Code отправляет push в `main`
3. если push касается только docs/BMAD, GitHub site-инфраструктура вообще не стартует
4. если изменились только `.github/workflows/**`, `.husky/**`, `scripts/has-site-impact.sh` или `scripts/generate-commit-msg.cjs`, запускается только `Infra Checks`
5. если site-impacting файлы есть, обычный `push` запускает `Site CI` с `quick-checks` и быстрым `smoke-e2e`
6. полный `full-e2e` идет отдельным workflow для `pull_request`, ручного запуска и nightly
7. если менялся сам сайт и push-flow зеленый, push автоматически деплоится в GitHub Pages

## Полезные команды

Этот документ описывает только flow для сайта и связанной CI-инфраструктуры.

```bash
npm run lint
npm run typecheck
npm run test:smoke
npm run test:e2e -- --project=firefox
npm run test:ci
```

## Recommended verification ladder

Для site-impacting изменений полезно держать такую лестницу локальной уверенности:

1. `npm run lint`
2. `npm run typecheck`
3. `npm test`
4. `npm run test:smoke`
5. `npm run test:e2e` или выборочный browser project, если менялись persistence/mobile/render-sensitive зоны

Особенно поднимать проверку до browser-level нужно, когда меняются:

- theme/lang persistence
- initial render behavior в `<head>`
- mobile navigation
- CSS delivery и visual states
- accessibility state transitions

Smoke нужен как быстрый survival-signal, но он не заменяет controller-level unit coverage и не считается достаточным regression-depth для preference/a11y/init-render логики.

По мере роста сайта browser-level coverage тоже должен расти:

- добавляй новые e2e/spec сценарии по critical flows, а не только новые assertions в один smoke-file
- расширяй page objects в `tests/e2e/pages/` вместе с ростом UI surface
- если feature user-visible после reload, mobile interaction или CSS/render path matters, одного Jest слоя недостаточно

## Lighthouse recommendation

Lighthouse не встроен в текущий CI как обязательный gate, но рекомендуется как регулярная ручная quality-проверка для user-facing изменений.

Целевой ориентир:

- `100/100/100/100`, когда это достижимо без искусственных компромиссов

Практический baseline:

- не допускать просадки относительно project constraints по Performance/Accessibility
- отдельно проверять mobile viewport
- прогонять Lighthouse после изменений в layout, hero/media, navigation, theme/lang, accessibility и first-paint behavior

Current accepted baseline for this repo:

- mobile: `98 / 100 / 100 / 100`
- desktop: `100 / 100 / 100 / 100`

Это рабочий baseline, а не regression. Mobile `100` остается stretch-goal.

Подробный чек-лист и стратегия повышения оценок: `docs/lighthouse.md`.

Для repeatable local checks используй automation script:

```bash
npm run lighthouse
```

Если нужен формальный BMAD-style review без story file, используй `docs/bmad-review-without-story.md`.
