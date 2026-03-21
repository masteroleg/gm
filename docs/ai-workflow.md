# AI Workflow — інструкція для команди

**Проект:** genu.im · **Оновлено:** 2026-03-21

Цей документ пояснює як працювати з AI-агентами (Claude Code, BMAD-скіли)
в цьому репозиторії так, щоб кожна сесія стартувала швидко і не дублювала роботу.

---

## Перший раз у проекті — з чого почати

Якщо `_bmad-output/analysis/normalized-context.md` ще не існує:

1. Запусти `/bmad-analyst` і передай промпт `docs/prompts/consistency-audit.md`
2. Агент сам просканує репозиторій, покаже що знайшов, і створить потрібні файли
3. Після цього — стандартний флоу нижче

---

## Старт будь-якої AI-сесії — 2 файли

Завжди завантажуй ці два файли **першими**, до будь-якої іншої роботи:

```
1. _bmad-output/analysis/normalized-context.md   ← стан проекту (~600 токенів)
2. _bmad-output/gm-distillate/_index.md          ← карта артефактів
```

З `_index.md` бери тільки потрібні секції по темі сесії — не читай всі 4 частини одразу.

> **Чому?** Без цього агент читає сирі артефакти (1000+ рядків кожен),
> витрачає токени і може суперечити вже прийнятим рішенням.

---

## Де що лежить

| Що шукаєш | Файл |
|---|---|
| Поточний стан, канонічні терміни | `_bmad-output/analysis/normalized-context.md` |
| Відкриті дефекти, дрейф, рішення на паузі | `_bmad-output/analysis/missing-pieces.md` |
| Карта всіх артефактів | `_bmad-output/gm-distillate/_index.md` |
| Продуктова стратегія, вимоги (29 FR, 16 NFR) | `_bmad-output/gm-distillate/01-product-strategy-requirements.md` |
| Архітектура, ADR, дизайн-система | `_bmad-output/gm-distillate/02-architecture-tech-implementation.md` |
| Аудит, дефекти, Epic 5 | `_bmad-output/gm-distillate/03-audit-remediation-current-state.md` |
| CI/CD, контракти, docs authority | `_bmad-output/gm-distillate/04-cicd-docs-governance-contracts.md` |
| Повний глосарій | `docs/governance/glossary.md` |
| Правила AI (195 правил) | `_bmad-output/project-context.md` |
| Реєстр дефектів (авторитетний) | `docs/audits/genu.im-1/02_findings_register.md` |

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

При перейменуванні використовуй `git mv` — зберігає git-історію файлу.

---

## Що і коли оновлювати — повна таблиця

Після будь-якої значущої зміни в проекті оновлюй відповідні файли:

| Тригер | Що оновити | Як |
|---|---|---|
| Завершено epic | `normalized-context.md` → секція Current State | вручну |
| Завершено epic | `CLAUDE.md` → секція Current State | вручну |
| Змінився PRD або Architecture | Відповідна частина дистиляту | `bmad-distillator` |
| Нові або закриті дефекти | `_bmad-output/analysis/missing-pieces.md` | вручну |
| Перейменовано або видалено файли | `_bmad-output/index.md` | вручну |
| Перейменовано або видалено файли | `_bmad-output/gm-distillate/_index.md` | вручну |
| Доданий новий термін | `docs/governance/glossary.md` | вручну |
| Новий реюзабельний промпт | `docs/prompts/` | зберегти файл |
| Нові правила для AI-агентів | `_bmad-output/project-context.md` | вручну або `bmad-generate-project-context` |

> **Правило:** `CLAUDE.md` і `normalized-context.md` — живі документи. Якщо вони старіші за 1 epic, вважай їх застарілими.

---

## Коли оновлювати normalized-context.md

| Тригер | Що оновити |
|---|---|
| Завершено epic | `normalized-context.md` → секція Current State |
| Змінився PRD або Architecture | Перегнати відповідну частину через `bmad-distillator` |
| Нові або закриті дефекти | `missing-pieces.md` → вручну |
| Перейменовано / видалено файли | `_bmad-output/index.md` + `gm-distillate/_index.md` → вручну |
| Доданий новий термін | `docs/governance/glossary.md` → вручну |

> **Правило великого пальця:** якщо `normalized-context.md` старіший за 1 epic — час оновити.

---

## Аудит консистентності

### Коли запускати

- На початку нового epic або спринту
- Після великих змін у PRD / Architecture
- Коли `normalized-context.md` застарів (старіший за 1 epic)
- Коли новий член команди починає роботу з проектом
- Після злиття великого PR з суперечливими змінами

### Як запустити

Запускай через скіл `/bmad-analyst`, потім вистав вміст промпту:

```
/bmad-analyst
```

Далі скопіюй вміст файлу `docs/prompts/consistency-audit.md` в чат.
Або передай шлях агенту: "Use docs/prompts/consistency-audit.md as your instructions."

Промпт сам:
1. **Перевіряє що вже існує** (PRE-CHECK) — показує таблицю знайдених аналогів
2. **Визначає режим** — Brownfield (є артефакти) або Greenfield (з нуля)
3. **Застосовує ієрархію джерел** — PRD виграє Architecture, Architecture виграє UX Spec
4. **Показує file tree** з розмірами перед записом → чекає підтвердження
5. **Пише тільки те чого не існує** — не дублює вже наявні файли

### Що отримаєш на виході (`_bmad-output/analysis/`)

| Файл | Призначення |
|---|---|
| `consistency-report.md` | Конфлікти між артефактами + розв'язання за ієрархією |
| `terminology.md` | Єдиний глосарій (або посилання на `docs/governance/glossary.md`) |
| `system-summary.md` | Стислий огляд системи (або посилання на дистилят) |
| `missing-pieces.md` | Відкриті дефекти, дрейф, стратегічні рішення на паузі |
| `normalized-context.md` | ≤600 токенів — стартовий контекст для всіх майбутніх сесій |

### Чому промпт написаний саме так

Оригінальна версія (до покращення) мала 5 структурних дефектів:
- Не перевіряла існуючі файли → дублювала glossary і distillate
- Мала конфліктні шляхи у двох місцях (`analysis/` vs `/bmad/analysis/`)
- Не мала ієрархії джерел → конфлікти розв'язувались випадково
- Не розрізняла Brownfield/Greenfield → завжди писала з нуля
- Одразу писала файли без підтвердження

Поточна версія виправляє всі п'ять. Оцінка: **5/5**.

---

## Brownfield-правило для BMAD агентів

Перед створенням будь-якого нового файлу агент **зобов'язаний** перевірити чи не існує вже аналог.
Якщо існує — доповнити або послатись, а не створювати паралельний файл.

```
❌  Створити terminology.md
✅  Перевірити docs/governance/glossary.md → доповнити його
```

---

## Коміти

В проекті є pre-commit хук (`scripts/generate-commit-msg.cjs`) що **автоматично генерує** повідомлення коміту на основі diff. Стандартний флоу:

```bash
rtk git add <files>
git commit        # ← хук генерує повідомлення сам, редактор не відкривається
```

Якщо потрібно **перевизначити** автогенерацію (наприклад для складного коміту з кількох логічних частин) — передавай через HEREDOC:

```bash
git commit -m "$(cat <<'EOF'
docs(scope): short summary

Detailed explanation of why, not what.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
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
□ Не читаю планувальні артефакти напряму (тільки через дистилят)
□ Перед створенням файлу — перевірив чи не існує аналог
```
