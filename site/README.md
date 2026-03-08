# Публикуемый сайт (`site/`) genu.im

В этой папке лежит статический сайт, который публикуется на GitHub Pages. Корень репозитория используется не только для сайта, но и для BMAD-конфигурации, служебных документов и артефактов. Поэтому важно явно зафиксировать, как именно устроены проверки и деплой, чтобы через полгода можно было быстро восстановить полную картину.

## Что здесь публикуется

- GitHub Pages выкладывает содержимое папки `site/`
- CSS собирается из `site/assets/css/input.css` в `site/assets/css/output.css`
- `site/assets/css/output.css` хранится в git и обязан быть актуальным, потому что в production нет отдельного шага сборки

## Зачем мы меняли процесс

Раньше была опасная ситуация: деплой мог происходить независимо от полного CI-прогона. Это означало риск выкатить сломанный `main` в production.

Что сделано теперь:

- локально перед `git push` запускается быстрый защитный gate только для site-impacting изменений
- в GitHub Actions push-flow, full regression и infra-проверки разделены по разным workflow
- деплой запускается только после успешного CI на `main` и только когда меняется сам публикуемый сайт

Идея простая: если код не проходит локально или не проходит в GitHub, production не обновляется.

## Как теперь работать каждый день

Чтобы VS Code Sync работал нормально и без лишней ручной возни, ежедневная работа идет прямо в `main`.

Почему именно так:

- одна основная ветка `main` убирает путаницу между тем, что деплоится, и тем, что видно на GitHub
- тот же push в `main` и проверяется, и публикуется
- не нужен отдельный транзитный branch

После этого в VS Code можно работать как обычно в ветке `main` и использовать обычный Sync.

### Обычный ежедневный flow

Локальный запуск сайта:

```bash
npm ci
npm run build:css
npm run start
```

Обычная отправка изменений из `main`:

```bash
git push
```

После `Sync` происходит ровно то, что ожидается в ежедневной работе:

1. локальный `pre-push` прогоняет быстрые проверки
2. commit уходит в `main`
3. если push касается только BMAD/документов, GitHub workflow для сайта не стартует
4. если push влияет на сайт, запускается быстрый `Site CI`
5. если push влияет только на `.github/workflows/**`, `.husky/**`, `scripts/has-site-impact.sh` или `scripts/generate-commit-msg.cjs`, запускается только `Infra Checks`
6. если меняется сам сайт и `Site CI` зеленый, GitHub Pages получает новый сайт автоматически

## Что проверяется локально и зачем

Перед каждым `git push` в `main` срабатывает `.husky/pre-push`.

Он запускает:

1. `npm run lint` - базовая проверка качества и единообразия кода
2. `npm run typecheck` - защита от ошибок в TypeScript-конфигурации и типах
3. `npm run test:smoke` - быстрые E2E-проверки критического пути сайта

Но это происходит только если push затрагивает сайт, тесты или CI/hook-инфраструктуру сайта. Для BMAD- и docs-only изменений локальный gate пропускается.

Актуальность `site/assets/css/output.css` обеспечивается раньше - в `pre-commit`, где CSS пересобирается и автоматически добавляется в commit только при изменении `site/assets/css/input.css`.

Если любой шаг падает, push не уходит на GitHub.

## Что проверяется в GitHub и зачем

После push в `main` GitHub Actions запускает один из двух workflow.

`Site CI` стартует только если changed files входят в один из путей:

- `site/index.html`
- `site/assets/**`
- `tests/**`
- `playwright.config.ts`
- `package.json`
- `package-lock.json`
- `tsconfig.json`

`Infra Checks` стартует только для:

- `.github/workflows/**`
- `.husky/**`
- `scripts/has-site-impact.sh`
- `scripts/generate-commit-msg.cjs`

docs/BMAD-only изменения не стартуют ни один из этих workflow.

Сначала идет `quick-checks`:

- install dependencies
- lint
- typecheck
- Jest
- build CSS
- verify committed CSS

Для обычного push в `main` потом идет быстрый smoke-прогон:

- `chromium`
- `mobile-chrome`

Полный Playwright matrix вынесен в отдельный workflow `Site Full Regression` для `pull_request`, ручного запуска и nightly:

- `chromium`
- `firefox`
- `webkit`
- `mobile-chrome`
- `mobile-safari`

После этого выполняется `required-checks` - агрегирующий check общего статуса.

И только потом запускается `deploy-pages`, причем только если менялся сам публикуемый сайт.

## Что происходит при ошибках

### Если ошибка локально

- push блокируется до отправки на GitHub
- CI не запускается
- production не трогается

Если push вообще не затрагивает сайт, локальный gate и sites-only CI просто пропускаются.

### Если локально все прошло, но ошибка в GitHub CI

- сайт не обновляется
- `deploy-pages` не запускается
- production не трогается

### Если все зеленое

- commit успешно проходит CI
- GitHub Pages получает обновление из `main`

## Почему это решение считается максимально простым и надежным

- одна рабочая ветка `main`
- обычный VS Code Sync работает без экзотики
- деплой возможен только для уже проверенного SHA
- не нужен PR-процесс и не нужен отдельный promote-шаг

## Если через полгода нужно быстро вспомнить картину

Смотри в таком порядке:

1. `site/README.md` - зачем нужен текущий flow и как им пользоваться
2. `docs/ci.md` - более техническая схема CI/CD
3. `.husky/pre-push` - что реально блокирует push локально
4. `.github/workflows/ci.yml` - что реально происходит в GitHub
5. `package.json` - команды `test:smoke`, `test:e2e:ci`
