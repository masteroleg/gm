# CI и деплой: техническая схема

Этот документ фиксирует фактический deploy-контур сайта.

## Коротко

- работа идет прямо в `main`
- локальный `pre-push` останавливает очевидно плохой push
- `Site CI` запускается только на site-impacting изменениях
- deploy идет только после зеленых `quick-checks` и `smoke-e2e`

## Workflow-файлы

- `.github/workflows/ci.yml` — сайт и деплой
- `.github/workflows/full-regression.yml` — полный cross-browser regression
- `.github/workflows/infra.yml` — CI/hook-инфраструктура

## Что запускает `Site CI`

`Site CI` слушает только:

- `site/**`
- `tests/**`
- `playwright.config.ts`
- `package.json`
- `package-lock.json`
- `tsconfig.json`

Изменения только в `.github/workflows/**` не должны запускать `Site CI`; для них существует `Infra Checks`.

## Что делает `Site CI`

### `quick-checks`

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build:css`
- `git diff --exit-code -- site/assets/css/output.css`

### `smoke-e2e`

Быстрый Playwright smoke на:

- `chromium`
- `mobile-chrome`

### `deploy-pages`

После успеха `quick-checks` и `smoke-e2e` deploy job делает:

- `checkout`
- `configure-pages`
- `upload-pages-artifact` из `./site`
- `deploy-pages`

## Custom domain

Источник истины для GitHub Pages — `site/CNAME`.

## Infra Checks

`Infra Checks` запускается для:

- `.github/workflows/**`
- `.husky/**`
- `scripts/has-site-impact.sh`
- `scripts/generate-commit-msg.cjs`

Он не делает deploy.

## Solo-flow

Обычный сценарий:

```bash
git push
```

После этого:

1. локальный `pre-push` делает быстрые проверки
2. если изменен сайт, стартует `Site CI`
3. если `Site CI` зеленый, GitHub Pages публикует `./site`
4. если изменена только CI/hook-инфраструктура, стартует только `Infra Checks`

## Полезные команды

```bash
npm run lint
npm run typecheck
npm test
npm run test:smoke
npm run test:e2e -- --project=firefox
npm run lighthouse
```
