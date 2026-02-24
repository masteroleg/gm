---
title: 'Shipping-ready миграция Claude Sessions в канонический _bmad-output'
slug: shipping-ready-migraciya-claude-sessions-v-bmad-output
created: '2026-02-21'
status: 'implementation-complete'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['Python 3 (stdlib-first)', 'Node.js (existing legacy tooling)', 'JSONL (Claude session export format)']
files_to_modify: ['scripts/migrate_sessions.py', 'package.json', 'migration/migration.md']
code_patterns: ['Parse Claude JSONL records: rec.type + rec.message.content blocks', 'Normalize text from content blocks (text/tool_result), skip noise types (progress/snapshot/thinking)', 'Deterministic extraction (regex) + conservative defaults; never invent missing info', 'Safe writes: staging by default; explicit --force to overwrite; optional backups', 'Optional supplemental inputs: read curated design docs from repo root to enrich tags/open-questions without overwriting the docs themselves']
test_patterns: ['CLI smoke tests: --dry-run, --force, idempotency', 'Unit tests for JSONL parsing + filename slug/timestamp normalization']
---

# Tech-Spec: Shipping-ready миграция Claude Sessions в канонический _bmad-output

**Created:** 2026-02-21

## Overview

### Problem Statement

В репозитории уже есть частичные результаты миграции из `migration/raw/.claude-sessions/*.jsonl` в `_bmad-output`, но они выглядят «коряво»: неполная генерация, разный формат, возможные дубли и несколько конкурирующих скриптов. Нужен один канонический, воспроизводимый и безопасный к перезапускам пайплайн, который не перетирает ручные правки по умолчанию.

### Solution

Сделать один основной миграционный скрипт (Python, минимум зависимостей) и одну команду запуска, которые читают все `.jsonl` сессии и генерируют канонические фрагменты знаний. Навигационные `index.md` создаются/обновляются только канонической командой BMAD `/index-docs`.

### Scope

**In Scope:**
- Инвентаризация текущего состояния `_bmad-output` и существующих миграционных инструментов (скрипты/форматы)
- Нормализация без создания параллельных «v2/new/final2»: один источник истины (1 основной скрипт + 1 команда)
- Канонический формат:
  - `_bmad-output/knowledge/fragments/*.md`
  - (опц.) `_bmad-output/knowledge/open-questions.md` (если нужен единый файл; по умолчанию вопросы живут внутри каждого фрагмента)
  - (опц.) `_bmad-output/knowledge/migration-report.md`
- Безопасность перезапуска: по умолчанию не перетирать ручные правки; поддержать `--dry-run`, `--force`, `--since`, `--out`
- Валидация и отчетность: счетчики входных данных/выходных артефактов, список ошибок парсинга без падения всего прогона
- Извлечение planning artifacts только если они явно обнаруживаются в raw (без выдумываний)
 - Подготовка структуры так, чтобы дальнейшая индексация выполнялась только через `/index-docs` в формате `_bmad/core/tasks/index-docs.xml`

**Out of Scope:**
- Генерация артефактов «из головы» при отсутствии явных сигналов в raw
- Тихая перезапись/порча ручных правок при запуске без явного флага
- Добавление второй параллельной реализации миграции (дублирующих пайплайнов)
 - Замена `/index-docs` собственным генератором индекса (индексирование делает BMAD)

## Context for Development

### Codebase Patterns

- Проект статического сайта (Node.js используется для tooling), но мигратор целесообразно сделать отдельным детерминированным CLI (Python stdlib-first)
- Уже есть 3 разных подхода к миграции (и они конфликтуют):
  - `scripts/migrate_sessions.js`: пишет в `_bmad-output/knowledge/fragments/` и генерит `index.md/open-questions.md` *внутрь* `fragments/` (не канон), создаёт фрагменты с рандомными именами и ожидает `message.content` строкой
  - `tools/claude2chunks.mjs` → `migration/normalized/*.turns.json` + `migration/chunks/*.json`: наиболее корректно извлекает текст из `message.content` блоков и фильтрует noise-ивенты
  - `tools/run_migration.mjs` + `tools/apply_delta.mjs`: попытка LLM-дельта пайплайна, но фактически 100% фейлится (в `migration/deltas/*.bad.txt` видно, что OpenCode CLI воспринимает prompt как file path)
- `_bmad-output/knowledge/fragments/` уже содержит вручную/полуручно оформленные знания (не в требуемом каноне фрагментов) — их нельзя “перетереть” по умолчанию
- `_bmad-output/solutioning/adrs/` существует, но пустой; при этом `_bmad-output/knowledge/index.md` содержит ссылки на ADR-ы, которых нет (несогласованность состояния)
- `migration/index.md` ссылается на `migration/transcripts/`, но папки нет (ещё один индикатор частичной/неконсистентной миграции)
- В корне репозитория есть выделенные артефакты по UX/дизайну, извлеченные из тех же JSONL-сессий: `UX_DESIGN_SUMMARY.txt`, `UX_DESIGN_LANDING_PAGE.md`, `DESIGN_EXTRACTION_INDEX.md`. Это хороший “ground truth” по решениям/терминам/рискам и их нужно включить в обработку как доп. источник (без перезаписи самих файлов)
- В корне репозитория есть дополнительные “вынесенные” документы, которые нужно включить в обработку и затем переместить в `_bmad-output` (по явному требованию):
  - `Analysis and Improvement Plan.md` (план улучшений; содержит предложения про Next.js и Context7, что потенциально конфликтует с текущим контекстом проекта как статического сайта — важно сохранить как факт/идею, но не принять как обязательное решение)
- Требования к канону: строгая структура фрагментов, без `TBD/XXX/???`, без `file:///` и без абсолютных путей; ссылки только относительные
- Требования к безопасности: по умолчанию не перетирать существующее; безопасный режим (dry-run/staging) и явный `--force` для прямой перезаписи

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `migration/raw/.claude-sessions/*.jsonl` | Источник данных для миграции |
| `migration/normalized/*.turns.json` | Нормализованные “turns” (если нужен промежуточный слой/инкрементальность) |
| `migration/chunks/*.json` | Готовые LLM-чаны (сейчас используются legacy пайплайном) |
| `migration/deltas/*.bad.txt` | Логи провалов LLM-конвертации (диагностика текущего состояния) |
| `_bmad-output/knowledge/fragments/` | Целевые фрагменты знаний (не перетирать по умолчанию) |
| `_bmad-output/knowledge/index.md` | Канонический индекс (нужно нормализовать к требованиям) |
| `_bmad-output/knowledge/open-questions.md` | Канонический список вопросов (нужно реально наполнять + дедуп) |
| `_bmad-output/planning-artifacts/` | Извлеченные planning artifacts (если явно есть в raw) |
| `_bmad-output/solutioning/adrs/` | ADR-ы (сейчас пусто; индексы ссылаются на несуществующие файлы) |
| `scripts/migrate_sessions.js` | Legacy-скрипт миграции (ожидаемо заменить/заморозить) |
| `tools/claude2chunks.mjs` | Legacy-нормализатор JSONL → turns/chunks (полезный референс логики) |
| `tools/run_migration.mjs` | Legacy LLM-дельта пайплайн (сейчас не работает) |
| `tools/extract_bmad_output_from_claude_sessions.py` | Python-утилита восстановления `_bmad-output` из tool Write событий |
| `UX_DESIGN_SUMMARY.txt` | Короткая сводка ключевых UX/визуальных решений и ограничений (извлечено из JSONL) |
| `UX_DESIGN_LANDING_PAGE.md` | Полный UX design doc с требованиями (performance/accessibility/IA/копирайт/анимации) |
| `DESIGN_EXTRACTION_INDEX.md` | Индекс источников и “15 major decisions” (маппинг решений → JSONL-сессии) |
| `Analysis and Improvement Plan.md` | План улучшений/экземпляры/идеи (включая Next.js/Context7); источник требований и open questions, но не канон по стеку |
| `package.json` | Точка добавления одной команды запуска |

### Technical Decisions

- Язык документации: русский (по `communication_language`)
- Канонический мигратор: Python (stdlib-first), одна точка входа (например `scripts/migrate_sessions.py`)
- Режим обновления по умолчанию: безопасный (staging/dry-run); прямая перезапись только при `--force`
- Извлечение planning artifacts: только при явном обнаружении (без эвристик, которые выдумывают содержимое)
- Legacy LLM-дельта пайплайн не является источником истины (сейчас неработоспособен); если останется — только как опциональный режим, не обязательный для DoD

## Current State

### Репозиторий: фактическое состояние

- **Raw источники:** `migration/raw/.claude-sessions/` содержит 9 файлов `*.jsonl`.
- **Промежуточные артефакты миграции (legacy):**
  - `migration/normalized/` содержит 9 файлов `*.turns.json`.
  - `migration/chunks/` содержит 96 файлов `*-chunk-*.json`.
  - `migration/deltas/` содержит множество `*.bad.txt` (ошибка OpenCode CLI: prompt интерпретируется как путь к файлу).
- **_bmad-output:**
  - `_bmad-output/knowledge/` уже содержит `index.md`, `open-questions.md`, а также серию файлов `migration-converter-*.md` (отчеты/аналитика).
  - `_bmad-output/knowledge/fragments/` содержит 4 “knowledge fragments” (не в требуемом каноне структуры фрагмента) + `index.md/open-questions.md` внутри `fragments/` (это не соответствует целевой структуре канона из задачи).
  - `_bmad-output/planning-artifacts/` существует, но фактически пуст (есть только `temp/`).
  - `_bmad-output/solutioning/adrs/` существует, но пуст.
- **Скрипты миграции (конкурирующие):**
  - `scripts/migrate_sessions.js` (legacy): пытается генерить `_bmad-output/knowledge/fragments/*` + `fragments/index.md` + `fragments/open-questions.md`, но опирается на упрощенное чтение `message.content` и генерит несоответствующий канон.
  - `tools/claude2chunks.mjs` (legacy, полезный референс): корректно нормализует JSONL → turns/chunks.
  - `tools/run_migration.mjs` + `tools/apply_delta.mjs` (legacy LLM-дельта): сейчас не работает (все чанки дают `.bad.txt`).
  - `tools/extract_bmad_output_from_claude_sessions.py`: утилита “восстановить `_bmad-output` по tool Write событиям” (не покрывает канон и безопасность перезапуска).
- **Доп. документы в корне (включить в обработку, затем убрать в архив):**
  - `UX_DESIGN_SUMMARY.txt`
  - `UX_DESIGN_LANDING_PAGE.md`
  - `DESIGN_EXTRACTION_INDEX.md`
  - `Analysis and Improvement Plan.md`

## Problems / Gaps (приоритет)

### P0 (блокеры shipping-ready)

- **Нет единственного канонического пайплайна:** несколько скриптов делают разное и дают разный формат.
- **Нарушение канона структуры:** сейчас встречается `index.md/open-questions.md` внутри `_bmad-output/knowledge/fragments/`, а целевой канон требует `_bmad-output/knowledge/index.md` и `_bmad-output/knowledge/open-questions.md`.
- **Безопасность перезапуска не определена:** нет строгого правила “что можно перезаписывать”, нет staging/force-режимов как канона.
- **LLM-дельта пайплайн неработоспособен:** 100% чанков падают; нельзя полагаться на него для воспроизводимой миграции.

### P1 (качество и воспроизводимость)

- **Парсинг JSONL неоднороден:** разные скрипты по-разному читают `message.content` (строка vs блоки); без единого парсера будет расхождение фактов.
- **Несогласованность ADR:** `_bmad-output/knowledge/index.md` уже ссылается на ADR-ы, но `_bmad-output/solutioning/adrs/` пуст.
- **Отсутствует отчётность в каноне:** нет консистентного `migration-report.md` с цифрами created/updated/skipped и списком ошибок парсинга.

### P2 (гигиена репозитория)

- **Документы-источники (UX/Design/Plan) “мешаются” в корне:** нужно после обработки убрать их в архив внутри `_bmad-output`.
- **Legacy следы миграции:** `migration/deltas/*.bad.txt`, `migration/index.md` ссылается на отсутствующие директории.

## Target Structure

Целевая структура после внедрения канонической миграции (ориентирована на дальнейшее использование канонической команды BMAD `/index-docs`):

- `_bmad-output/knowledge/fragments/` (канонические фрагменты, строго по шаблону из задачи)
- `_bmad-output/knowledge/open-questions.md` (опционально, если мы оставляем единый файл вопросов; иначе вопросы живут только внутри каждого фрагмента)
- `_bmad-output/knowledge/migration-report.md` (опционально; итоговый отчет прогона)
- `_bmad-output/planning-artifacts/` (только явно обнаруженное в raw: PRD/brief/architecture/epics)
- `_bmad-output/_archive/migration-inputs/` (архив “мешающих” файлов из корня, после обработки)
- `_bmad-output/_archive/legacy/` (опционально: перенос legacy `fragments/index.md` и `fragments/open-questions.md` при явном флаге cleanup)

Важное правило: после миграции индексы должны создаваться/обновляться **только** канонической командой BMAD `/index-docs`.

Это означает:
- мигратор НЕ должен пытаться генерировать `index.md` в директориях (чтобы не конфликтовать с `/index-docs`),
- структура должна быть такой, чтобы `/index-docs` можно было запускать точечно по нужным папкам (`_bmad-output/knowledge/`, `_bmad-output/knowledge/fragments/`, `_bmad-output/planning-artifacts/`, `_bmad-output/solutioning/adrs/`).

## Parsing Strategy

### Входные данные

- Основной источник: `migration/raw/.claude-sessions/*.jsonl`.
- Доп. источники (curated docs в корне) используются только как справочные входы для тэгинга/обогащения вопросов и для контроля полноты, но **не являются источником истины** вместо JSONL.

### Чтение JSONL

- Читать файл построчно.
- Для каждой строки:
  - `json.loads` в try/catch.
  - При ошибке: добавить запись в список `parse_errors` и продолжить.
- Фильтровать “noise” типы (как в `tools/claude2chunks.mjs`): `progress`, `file-history-snapshot`, `trace`, `tool`, `queue-operation`.
- Для валидных сообщений извлекать:
  - `session_id`: `rec.sessionId` (если есть) иначе имя файла.
  - `timestamp`: `rec.timestamp` (если есть) иначе `null`.
  - `role`: из `rec.type` или `rec.message.role`.
  - `text`: нормализованный текст из `message.content`:
    - строка → как есть
    - массив блоков → собрать `type=text`/`text`, рекурсивно развернуть `tool_result.content`, игнорировать `thinking`.

### Выходные фрагменты

- Базовая единица: 1 фрагмент на 1 `*.jsonl` сессию (каноничный и воспроизводимый минимум).
- Название файла:
  - если удается определить “примерное время” (например, по минимальному timestamp в сессии): `YYYYMMDD_HHMM_<slug>.md`
  - иначе: `<sessionid>_<slug>.md`
- `slug`:
  - из краткого заголовка темы (если детектируется), иначе из `session_id` (без плейсхолдеров).
- Заголовок `# <Title>`:
  - из первого осмысленного user prompt или из curated docs (если есть уверенный матч), иначе `Session <session_id>`.

### Извлечение содержимого (без LLM)

Детерминированные правила (heuristics, но воспроизводимые):
- **Key Decisions / Facts:** строки с маркерами `Decision:`, `Key difference:`, `Recommendation:`, `CRITICAL:` и т.п.; плюс устойчивые факты (версии/пути/команды) найденные в тексте.
- **Requirements / Tasks:** чеклисты `- [ ]`, `TODO`, “нужно/должно/требуется/implement”.
- **Open Questions:** предложения с `?` или маркерами “Question:”/“Open question:”.
- **References:** относительные пути, упомянутые в тексте (regex на `[_a-zA-Z0-9./-]+\.(md|js|mjs|py|json|yml|yaml|html|css)`), строго без абсолютных путей.

Если раздел в конкретной сессии пуст — заполнять только фактическими утверждениями (например: “В этой сессии не обнаружены устойчивые решения/вопросы; зафиксирован только контекст/обсуждение.”), без `TBD/XXX/???`.

## Dedup Strategy (open questions)

Варианты:

1) **Минимально-канонично (предпочтительно для “только BMAD команды”):**
- вопросы хранятся только внутри каждого фрагмента в разделе `## Open Questions`.
- единый файл `_bmad-output/knowledge/open-questions.md` ведется вручную/через отдельный BMAD workflow (не частью миграции).

2) **Автоген единый файл вопросов (если все же нужен):**
- детерминированно собрать вопросы из всех фрагментов,
- дедуп по `difflib.SequenceMatcher(...).ratio()` с порогом 0.86,
- в `_bmad-output/knowledge/open-questions.md` хранить вопрос + ссылки на фрагменты.

Решение по умолчанию для этого спека: вариант (1), чтобы после миграции для индексации и навигации использовались только канонические команды BMAD.

## Update Strategy (без перезаписи по умолчанию)

### Принцип

- По умолчанию — **staging**: писать результат в staging-папку внутри `--out`, не трогая существующие файлы.
- Прямая запись в `_bmad-output` — только при `--force`.

### Auto-generated маркер

- Все генерируемые файлы (index/open-questions/report и любые фрагменты, созданные мигратором) получают верхний маркер:
  - `<!-- AUTO-GENERATED: scripts/migrate_sessions.py -->`
- При `--force` разрешено перезаписывать только:
  - файлы с этим маркером,
  - либо отсутствующие файлы.
- Файлы без маркера считаются “ручными” и не перезаписываются даже при `--force` (если нужен режим “перезаписать всё”, это отдельный флаг и не входит в DoD).

### Cleanup / Archiving

- “Мешающее” из корня репозитория после успешного прогона переносится в `_bmad-output/_archive/migration-inputs/`.
- Legacy файлы, которые не соответствуют канону (например `_bmad-output/knowledge/fragments/index.md`) не удаляются автоматически; вместо этого:
  - при флаге `--cleanup-legacy` переносятся в `_bmad-output/_archive/legacy/`.

## CLI / Usage

### Каноничный запуск миграции

Миграция все равно требует конвертации JSONL → markdown фрагменты. Каноничные BMAD команды это не делают, поэтому остаётся один детерминированный CLI-мигратор:

- `python scripts/migrate_sessions.py`

### Индексация (только BMAD)

После успешной миграции пользователь запускает каноническую BMAD команду `/index-docs` для нужных директорий:

- `/index-docs _bmad-output/knowledge/`
- `/index-docs _bmad-output/knowledge/fragments/`
- `/index-docs _bmad-output/planning-artifacts/`
- `/index-docs _bmad-output/solutioning/adrs/`

Ожидаемый формат `index.md` соответствует `_bmad/core/tasks/index-docs.xml`.

### Рекомендуемый npm wrapper (одна команда для проекта)

- Добавить в `package.json`:
  - `"migrate:bmad-memory": "python scripts/migrate_sessions.py"`

### Флаги

- `--sessions migration/raw/.claude-sessions` (по умолчанию)
- `--out _bmad-output` (по умолчанию)
- `--dry-run` (только отчёт, без записи/переноса)
- `--force` (применить в `--out` напрямую, но только авто-ген файлы/новые)
- `--since <ISO8601|YYYY-MM-DD>` (опционально: обрабатывать только сессии, где max timestamp >= since)
- `--report` (создать/обновить `_bmad-output/knowledge/migration-report.md`)
- `--archive-inputs` (после успешного прогона перенести входные repo-root документы в архив)
- `--cleanup-legacy` (перенести legacy/неканон файлы в `_bmad-output/_archive/legacy/`)

## Test Plan

- `--dry-run`:
  - проверка счётчиков jsonl/строк/ошибок парсинга/создаваемых артефактов без записи.
- `--force`:
  - генерация в `_bmad-output` + создание index/open-questions/report.
- Идемпотентность:
  - 2 запуска подряд без `--force` не меняют существующие файлы и не трогают ручные.
- Safety:
  - проверить, что файл без маркера не перезаписывается даже при `--force`.
- Archiving:
  - `--archive-inputs` переносит только известный whitelist файлов и не падает, если файл уже перемещён.

## Rollback / Recovery

- Staging по умолчанию = нулевой риск: можно просто удалить staging каталог.
- При `--force`:
  - перед перезаписью авто-ген файлов делать резервную копию в `_bmad-output/_archive/backups/<UTC timestamp>/...`.
- При проблемах:
  - восстановить файлы из backup,
  - вернуть archived inputs обратно в корень (если нужно) вручную или отдельной командой `--restore-inputs` (опционально, не обязательна для DoD).

## Implementation Steps

- [x] 1) Зафиксировать каноничную структуру `knowledge/` и исключить генерацию `index.md` (индекс делает `/index-docs`)
  - File: `scripts/migrate_sessions.py`
  - Action: реализовать генерацию строго в `_bmad-output/knowledge/fragments/` и НЕ создавать `index.md`

- [x] 2) Реализовать детерминированный JSONL парсер и нормализатор текста (как референс: `tools/claude2chunks.mjs`)
  - File: `scripts/migrate_sessions.py`
  - Action: `iter_jsonl()` + `extract_text()` + фильтрация noise
  - Notes: ошибки парсинга не валят прогон

- [x] 3) Реализовать генерацию канонических fragments (1 на session) по строгому шаблону
  - File: `scripts/migrate_sessions.py`
  - Action: создать markdown с YAML frontmatter и разделами Summary/Key Decisions/Requirements/Open Questions/References
  - Notes: без `TBD/XXX/???`, без `file:///`, ссылки только относительные

- [x] 4) Open Questions: хранить вопросы внутри каждого фрагмента (канон) и не генерировать единый файл по умолчанию
  - File: `scripts/migrate_sessions.py`
  - Action: заполнять раздел `## Open Questions` в каждом фрагменте; `_bmad-output/knowledge/open-questions.md` не создавать, если не включен отдельный флаг

- [x] 5) Реализовать safe update: staging по умолчанию, `--force` для применения, авто-ген маркер
  - File: `scripts/migrate_sessions.py`
  - Action: режимы записи + проверка маркера + backup при `--force`

- [x] 6) Реализовать отчётность и (опц.) `migration-report.md`
  - File: `scripts/migrate_sessions.py`
  - Action: счетчики + список ошибок + итоговый summary; опциональная запись отчёта

- [x] 7) Обработать repo-root документы как supplemental inputs и убрать их “в архив, чтобы не мешались”
  - File: `scripts/migrate_sessions.py`
  - Action: при `--archive-inputs` переместить whitelist файлов в `_bmad-output/_archive/migration-inputs/`

- [x] 8) Добавить одну команду запуска миграции (npm script) + явно задокументировать “после миграции прогнать `/index-docs` по папкам”
  - File: `package.json`
  - Action: `migrate:bmad-memory`

- [x] 9) Документировать новый канонический пайплайн (миграция + `/index-docs`) и пометить legacy подходы
  - File: `migration/migration.md`
  - Action: обновить документ: “каноничный путь = scripts/migrate_sessions.py + /index-docs”, legacy LLM-дельта — не рекомендуется

## Acceptance Criteria

- [x] AC1: Given текущий репозиторий, when запускается `python scripts/migrate_sessions.py --dry-run`, then выводится отчет с количеством jsonl/строк/ошибок и без записи файлов.
- [x] AC2: Given 9 файлов `migration/raw/.claude-sessions/*.jsonl`, when запускается миграция в staging режиме по умолчанию, then создаётся staging результат с каноническими fragments/index/open-questions без изменения существующих `_bmad-output` файлов.
- [x] AC3: Given существующий ручной файл без маркера `AUTO-GENERATED`, when запускается `--force`, then этот файл не перезаписывается.
- [x] AC4: Given миграция выполнена, when пользователь запускает `/index-docs` на `_bmad-output/knowledge/` и `_bmad-output/knowledge/fragments/`, then создаются/обновляются `index.md` в формате задачи Index Docs и они содержат корректные относительные ссылки `./...`.
- [x] AC5: Given битые строки JSON или неизвестные поля, when миграция выполняется, then ошибки перечисляются в отчёте и прогон продолжается.
- [x] AC6: Given повторный запуск без `--force`, when миграция выполняется повторно, then результат и логика пропусков идемпотентны (нет неожиданных перезаписей/перемещений).
- [x] AC7: Given флаг `--archive-inputs`, when миграция успешно завершена, then файлы `UX_DESIGN_SUMMARY.txt`, `UX_DESIGN_LANDING_PAGE.md`, `DESIGN_EXTRACTION_INDEX.md`, `Analysis and Improvement Plan.md` перемещены в `_bmad-output/_archive/migration-inputs/`.

## Additional Context

### Dependencies

- Python (stdlib-first). Внешние зависимости не требуются.

### Notes

- Этот план сознательно уходит от LLM в пайплайне миграции, чтобы обеспечить воспроизводимость и отсутствие зависимости от внешнего сервиса.
- Документ `Analysis and Improvement Plan.md` содержит предложения про Next.js/Context7 — это фиксируется как “идея/план”, но не как принятое решение для текущего стека.
