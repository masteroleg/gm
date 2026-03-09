# Lighthouse: регулярная проверка качества

Этот документ нужен как практическая памятка для ручной проверки сайта через Lighthouse. Цель - не просто "посмотреть на цифры", а ловить regressions в first paint, accessibility state, mobile usability и delivery quality до попадания в production.

## Цель

Рекомендуемый ориентир:

- `100/100/100/100`
  - Performance
  - Accessibility
  - Best Practices
  - SEO

Если идеальные `100` временно недостижимы, задача минимум - не опускаться ниже project constraints и не принимать regressions без понятной причины.

## Когда прогонять

Прогоняй Lighthouse регулярно, особенно после изменений в:

- layout и responsive behavior
- mobile navigation
- theme/lang logic
- initial render в `<head>`
- hero/media/typography
- accessibility states и interactive controls
- CSS delivery или font loading

На практике достаточно такого ритма:

- после заметных user-facing изменений
- перед важным `git push`, если затронут first paint или navigation
- перед manual release checks

## Как запускать локально

1. Подними сайт локально:

```bash
npm ci
npm run build:css
npm run start
```

2. Открой `http://localhost:3000`
3. Запусти Lighthouse в Chrome DevTools
4. Проверяй минимум mobile viewport, затем desktop

Если хочется повторяемости, всегда проверяй один и тот же URL и в тех же условиях после hard reload.

## На что смотреть в первую очередь

### 1. Performance

Следи прежде всего за:

- LCP
- CLS
- render-blocking resources
- unnecessary first-paint DOM rewrites
- font loading behavior

Что обычно помогает:

- раннее применение theme state в `<head>` без лишнего rerender
- согласованное initial language state без mixed-language flash
- не заставлять deferred controllers переписывать полстраницы сразу после первого paint
- не раздувать hero/media и не добавлять лишние blocking assets

### 2. Accessibility

Проверяй:

- корректные `aria-label`, `aria-expanded`, `aria-pressed`
- visible focus states
- touch targets на mobile
- contrast
- semantic structure

Что обычно помогает:

- синхронизировать a11y attributes в том же state-flow, что и visual update
- не оставлять decorative SVG без `aria-hidden="true"`
- не полагаться только на видимый текст там, где control state должен быть объявлен явно

### 3. Best Practices

Проверяй:

- отсутствие console/runtime errors
- корректную загрузку ресурсов
- отсутствие сломанного client-side behavior на partial markup
- безопасность и предсказуемость browser APIs

Что обычно помогает:

- `try/catch` вокруг storage access
- fail-soft controllers
- отсутствие лишних framework-like abstractions в static-site code

### 4. SEO

Проверяй:

- `<title>` и `meta description`
- корректный `lang` на `<html>`
- семантические heading levels
- crawlable static content

Что обычно помогает:

- не ломать first render из-за поздней инициализации языка
- сохранять meaningful fallback content в HTML

## Как приблизиться к 100/100/100/100

### Performance

- минимизируй first-paint DOM rewrites
- не добавляй render-blocking JS
- следи, чтобы CSS оставался компактным и актуальным
- не загружай тяжелые медиа без необходимости

### Accessibility

- делай все interactive controls keyboard-usable и visibly focusable
- проверяй `aria-*` как часть correctness, а не как post-fix
- не допускай mobile controls меньше `44x44`

### Best Practices

- избегай console errors и unsafe storage usage
- не допускай fragile initialization order
- держи controllers маленькими и single-purpose

### SEO

- сохраняй качественный static HTML first render
- не ломай heading hierarchy
- не допускай language mismatch между `<html lang>` и фактическим first paint

## Practical review checklist

Перед завершением user-facing задачи быстро ответь на вопросы:

- first paint совпадает с итоговым theme/lang state?
- нет ли лишнего визуального или semantic jump после deferred scripts?
- menu/theme/lang controls корректно обновляют `aria-*`?
- mobile navigation и touch targets удобны?
- Lighthouse mobile не показал новых regressions?

Если на любой вопрос ответ "нет", исправляй это до финального merge/push confidence.
