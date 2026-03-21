# AI Workflow — інструкція для команди

**Проект:** genu.im · **Оновлено:** 2026-03-21

Цей документ пояснює як працювати з AI-агентами (Claude Code, BMAD-скіли)
в цьому репозиторії так, щоб кожна сесія стартувала швидко і не дублювала роботу.

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

Якщо потрібно перевірити узгодженість артефактів або створити новий `normalized-context.md` —
використовуй готовий промпт:

```
docs/prompts/consistency-audit.md
```

Промпт автоматично визначає Brownfield/Greenfield режим, перевіряє що вже існує,
і запитує підтвердження перед записом файлів.

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

Повідомлення комітів — через HEREDOC, ніколи `--no-verify`:

```bash
git commit -m "$(cat <<'EOF'
feat(scope): short summary

Detailed explanation of why, not what.
What changed and what impact it has.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

Формат: `type(scope): summary` — conventional commits.
Типи: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`.

---

## Швидкий чекліст для нової сесії

```
□ Завантажив normalized-context.md
□ Переглянув _index.md (знаю де що)
□ Перевірив missing-pieces.md (знаю відкриті проблеми)
□ Не читаю планувальні артефакти напряму (тільки через дистилят)
□ Перед створенням файлу — перевірив чи не існує аналог
```
