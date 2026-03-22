# AI Workflow — командна інструкція

**Оновлено:** 2026-03-21
**Проект:** genu.im · **Distillate:** `gm-distillate/` · **Git prefix:** `rtk`

> Інструкція налаштована для genu.im. Для іншого BMAD-проекту — зміни значення вище.

---

## Перший раз у проекті — з чого почати

Якщо `normalized-context.md` ще не існує — спочатку створи артефакти:

```
1. /bmad-distillator         ← стисни планувальні артефакти в дистилят
2. /bmad-index-docs          ← збудуй index.md для навігації по дистиляту
3. /bmad-generate-project-context  ← створи project-context.md (AI rules)
4. /bmad-analyst             ← аудит консистентності + normalized-context.md
   "Use docs/prompts/consistency-audit.md as your instructions."
```

Після цього — стандартний флоу нижче.

---

## Старт будь-якої AI-сесії — 2 файли

Завжди завантажуй **першими**, до будь-якої іншої роботи:

```
1. _bmad-output/analysis/normalized-context.md    ← стан проекту (~600 токенів)
2. gm-distillate/_index.md                        ← карта артефактів
```

З `_index.md` бери тільки потрібні секції по темі — не читай все одразу.

> **Чому?** Без цього агент читає сирі артефакти (1000+ рядків кожен),
> витрачає токени і суперечить вже прийнятим рішенням.

---

## Де що лежить (загальна структура)

| Що шукаєш | Де шукати |
|---|---|
| Поточний стан, канонічні терміни (≤600 токенів) | `_bmad-output/analysis/normalized-context.md` |
| Відкриті дефекти та рішення на паузі | `_bmad-output/analysis/missing-pieces.md` |
| Карта всіх артефактів | `gm-distillate/_index.md` |
| Деталі по темі | Секції дистиляту — через `_index.md` |
| Повний глосарій | `docs/governance/glossary.md` |
| AI-правила проекту | `_bmad-output/project-context.md` ← `/bmad-generate-project-context` |
| Реюзабельні промпти | `docs/prompts/` |

> Специфічні шляхи для цього проекту — в `CLAUDE.md` → секція Key Files.

---

## BMAD Skills — що і коли використовувати

Скіли викликаються командою `/skill-name` **в чаті Claude Code** (не в терміналі).
Просто введи `/bmad-distillator` — і агент запуститься з відповідними інструкціями.

| Задача | Skill |
|---|---|
| Аудит консистентності + normalized-context | `/bmad-analyst` → передай `docs/prompts/consistency-audit.md` |
| Стиснути артефакти в дистилят | `/bmad-distillator` |
| Згенерувати або оновити index.md | `/bmad-index-docs` |
| Оновити project-context.md (AI rules) | `/bmad-generate-project-context` |
| Перевірити PRD | `/bmad-validate-prd` |
| Перевірити готовність до реалізації | `/bmad-check-implementation-readiness` |
| Ретроспектива після epic | `/bmad-retrospective` |

---

## Ієрархія джерел істини

При конфлікті між документами — вищий виграє:

```
PRD  >  Architecture  >  UX Spec  >  Epics  >  Stories
```

Конфлікт завжди фіксуй в `_bmad-output/analysis/` — не вирішуй мовчки.

---

## Правила іменування файлів

**Ніяких дат у назвах.** Git зберігає історію — дати в іменах це шум.

```
✅  validation-report.md
❌  validation-report-2026-03-11.md
```

При перейменуванні: `git mv` — зберігає git-історію файлу.

---

## Що і коли оновлювати

| Тригер | Що оновити | Як |
|---|---|---|
| Завершено epic | `_bmad-output/analysis/normalized-context.md` → Current State | вручну |
| Завершено epic | `CLAUDE.md` → Current State | вручну |
| Змінився PRD або Architecture | Відповідна частина дистиляту | `/bmad-distillator` |
| Нові або закриті дефекти | `_bmad-output/analysis/missing-pieces.md` | вручну |
| Перейменовано / видалено файли | `_bmad-output/index.md` + `<distillate>/_index.md` | вручну |
| Доданий новий термін | `docs/governance/glossary.md` | вручну |
| Нові AI-правила | `project-context.md` | `/bmad-generate-project-context` |
| Новий реюзабельний промпт | `docs/prompts/` | зберегти файл |

> **Правило:** якщо `normalized-context.md` старіший за 1 epic — вважай застарілим.

---

## Аудит консистентності

### Коли запускати

- Початок нового epic або спринту
- Після великих змін у PRD / Architecture
- Коли `normalized-context.md` застарів
- Новий член команди починає роботу
- Після злиття PR з суперечливими змінами

### Як запускати

```
/bmad-analyst
```
Далі: "Use docs/prompts/consistency-audit.md as your instructions."

### Що отримаєш (`_bmad-output/analysis/`)

| Файл | Призначення |
|---|---|
| `consistency-report.md` | Конфлікти між артефактами + розв'язання за ієрархією |
| `terminology.md` | Єдиний глосарій (або посилання на `docs/governance/glossary.md`) |
| `system-summary.md` | Стислий огляд або посилання на дистилят |
| `missing-pieces.md` | Відкриті дефекти, дрейф, стратегічні рішення на паузі |
| `normalized-context.md` | ≤600 токенів — стартовий контекст для всіх сесій |

### Brownfield-правило (перевір перед створенням)

```
❌  Створити terminology.md
✅  Перевірити docs/governance/glossary.md → доповнити його
```

---

## Коміти

Pre-commit хук **автоматично генерує** повідомлення. Стандартний флоу:

```bash
rtk git add <files>
rtk git commit        # хук генерує повідомлення сам
```

Для складного коміту — передай вручну через HEREDOC:

```bash
rtk git commit -m "$(cat <<'EOF'
docs(scope): short summary

Detailed explanation of why, not what.

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

Формат: `type(scope): summary` — conventional commits.
Типи: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`.
Ніколи не використовуй `--no-verify`.

---

## Швидкий чекліст для нової сесії

```
□ Завантажив normalized-context.md
□ Переглянув _index.md (знаю де що)
□ Перевірив missing-pieces.md (знаю відкриті проблеми)
□ Не читаю артефакти напряму — тільки через дистилят
□ Перед створенням файлу — перевірив чи не існує аналог
□ normalized-context.md свіжий (не старіший за 1 epic)?
```
