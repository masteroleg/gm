# gm

Этот репозиторий содержит статический сайт (публикуется на GitHub Pages) и набор файлов BMAD/TEA для разработки и тестовой архитектуры. Ниже зафиксирована "полная картина" того, что было настроено, зачем это сделано и как этим пользоваться. Цель - чтобы через 6+ месяцев можно было быстро восстановить контекст.

## Главная цель изменений

Сделать так, чтобы production (GitHub Pages) никогда не обновлялся, если:

1) локальные быстрые проверки (до push) падают
2) GitHub CI падает

То есть: "сломанный билд" не должен попасть на прод.

## Ключевые принципы

- `main` защищена required checks
- ежедневная работа идет прямо в `main`
- локальный husky gate блокирует push, если базовые проверки/смоук-тесты не проходят
- деплой на Pages выполняется только после успешного CI и только из `main`

## Что именно настроено

### 1) Локальный gate (до push)

Файл: `.husky/pre-push`

Перед каждым `git push` выполняется:

- `npm run lint` (Biome)
- `npm run typecheck` (tsc --noEmit)
- `npm run test:smoke` (Playwright, tag `@smoke`, локально только `chromium`)

Если push не затрагивает сайт или связанную CI-инфраструктуру, локальный gate пропускается.

Если любой шаг падает - push не уходит на GitHub, а значит CI/deploy не стартуют.

### 2) GitHub CI + Deploy

Файл: `.github/workflows/ci.yml`

Pipeline:

1. `quick-checks` - install/lint/typecheck/Jest/build css/verify css
2. `smoke-e2e` - быстрый Playwright smoke в Docker image:
   - `chromium`, `mobile-chrome`
3. `required-checks` - агрегатор для branch protection
4. `deploy-pages` - деплой в GitHub Pages только после успеха push-flow jobs

Отдельный файл `.github/workflows/full-regression.yml` хранит полный cross-browser regression для manual/nightly/PR сценариев.

`.github/workflows/infra.yml` отдельно проверяет изменения в workflow/hooks/helper-скриптах без Playwright и без deploy.

### 3) Защита ветки `main`

В GitHub включено:

- Linear history
- Bypass запрещен

В текущем solo-flow `main` используется как единственная рабочая ветка, а контроль качества обеспечивается локальными hooks и GitHub Actions после push.

## Самый простой workflow (solo, без PR)

Идея: одна основная ветка `main`, чтобы GitHub, код и деплой всегда показывали одно и то же состояние.

### Каждый день

1) работаешь в `main`
2) коммитишь
3) обычный VS Code Sync / `git push` отправляет изменения в `origin/main`
4) ждешь зеленый CI на `main`
5) если менялся сайт, после зеленого CI автоматически идет deploy

## Автогенерация commit message (бесплатно)

Файл: `.husky/prepare-commit-msg`

Если ты оставляешь commit message пустым, hook генерирует:

- subject line: English Conventional Commits
- body: короткое объяснение на русском

Источник: `scripts/generate-commit-msg.cjs`.

Логика такая:

- список предпочтительных моделей хранится в `commit-message.config.json`
- затем скрипт проверяет, какие модели реально доступны через `opencode models`
- используется первая подходящая модель из массива
- если нужная модель исчезла из бесплатного списка, достаточно обновить массив в `commit-message.config.json`
- если staged diff слишком большой, скрипт сознательно переключается на локальный fallback по лимиту `maxPromptChars`
- если `opencode` не дал результата, включается локальный fallback, чтобы commit из VS Code не ломался

Это решение сделано так, чтобы не зависеть от одной жестко прошитой модели и при этом не терять рабочий сценарий при смене бесплатных моделей.

## Где смотреть подробности 

- Публикуемый сайт и "человеческий" flow: `site/README.md`
- Техническая схема CI/CD: `docs/ci.md`
- Локальные проверки: `.husky/pre-push`
- CI/deploy pipeline: `.github/workflows/ci.yml`
- Скрипты: `package.json`

## Быстрые команды

```bash
npm run lint
npm run typecheck
npm run build:css
npm test
npm run test:smoke
npm run test:e2e
```

## Политика покрытия frontend-контроллеров

Для `site/assets/js/**` базовым стандартом считается не просто наличие smoke-проверки, а достаточная ширина покрытия по слоям.

- каждый новый контроллер обязан иметь unit-тесты на основные state transitions
- если контроллер меняет `aria-*`, это должно проверяться тестами явно
- если контроллер использует storage, нужны тесты и на нормальный путь, и на fallback при ошибках storage
- если контроллер может исполняться при неполной разметке, нужен test на fail-soft поведение
- preference, navigation, accessibility и initial-render логика не может оставаться только под smoke-покрытием
- при росте сайта тесты добавляются по контроллерам и critical flows, а не одним большим catch-all spec

Практический принцип такой: logic/state/a11y покрываются в Jest, а reload persistence, CSS delivery, mobile behavior и browser truth подтверждаются в Playwright.

## Lighthouse: регулярная проверка качества

Для пользовательских изменений сайта рекомендуется регулярно прогонять Lighthouse и стремиться к `100/100/100/100` по:

- Performance
- Accessibility
- Best Practices
- SEO

Минимум: не опускаться ниже текущих project constraints из `_bmad-output/project-context.md`.

Подробная памятка:

- `docs/lighthouse.md` - как проверять
- `docs/lighthouse.md` - на что смотреть в первую очередь
- `docs/lighthouse.md` - как повышать оценки без деградации UX

Быстрый automation flow:

```bash
npm run lighthouse
```
