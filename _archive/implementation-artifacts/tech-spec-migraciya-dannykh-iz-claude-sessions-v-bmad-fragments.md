---
title: 'Миграция данных из Claude Sessions в BMAD fragments'
slug: migraciya-dannykh-iz-claude-sessions-v-bmad-fragments
created: '2026-02-21'
status: 'ready-for-dev'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['Node.js', 'Tailwind CSS v4', 'Playwright', 'Jest', 'Husky', 'serve']
files_to_modify: ['_github/workflows/ci.yml', 'playwright.config.ts', 'tests/e2e/genuim.spec.js', 'index.html', 'assets/css/input.css']
code_patterns: ['Static site architecture', 'Utility-first CSS with Tailwind v4', 'E2E testing with Playwright', 'Unit testing with Jest + JSDOM', 'Git hooks with Husky']
test_patterns: ['Playwright E2E tests', 'Jest unit tests', 'Visual regression testing', 'Accessibility testing']
---

# Tech-Spec: Миграция данных из Claude Sessions в BMAD fragments

**Created:** 2026-02-21

## Overview

### Problem Statement

Нужно мигрировать данные из 9 сессий Claude в формат BMAD fragments для создания структурированной базы знаний. Существующие сессии в migration/raw/.claude-sessions/ содержат важные решения, требования и обсуждения, которые необходимо нормализовать в Markdown-фрагменты.

### Solution

Создать конвертер (скрипт/утилиту) который читает все *.jsonl из migration/raw/.claude-sessions/, извлекает важные сообщения, нормализует их в Markdown-фрагменты в _bmad-output/knowledge/fragments/, и генерирует индексные файлы (index.md, open-questions.md).

### Scope

**In Scope:**
- Чтение всех *.jsonl файлов из migration/raw/.claude-sessions/
- Извлечение финальных текстов, важных решений, требований, TODO, вопросов, ссылок на файлы
- Нормализация в Markdown-фрагменты с метаданными
- Генерация index.md и open-questions.md
- Обработка найденных артефактов BMAD (PRD, brief, architecture, epics)
- Создание инструкции запуска конвертера

**Out of Scope:**
- Ручная правка фрагментов без флага --force
- Обработка сессий из других источников
- Создание новых сессий Claude
- Интеграция с внешними системами

## Context for Development

### Codebase Patterns

- **Static site architecture**: Vanilla HTML/JS with Tailwind CSS v4
- **Utility-first CSS**: Tailwind v4 with @import "tailwindcss" syntax
- **E2E testing**: Playwright with Chromium, Firefox, WebKit browsers
- **Unit testing**: Jest with JSDOM for DOM manipulation
- **Git hooks**: Husky v9 for pre-commit CSS build
- **Dark mode**: CSS-based theme toggle with localStorage persistence
- **Responsive design**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG 2.1 AA compliance with aria-labels and focus states

### Files to Reference

| File | Purpose |
| ---- | ------- |
| migration/raw/.claude-sessions/*.jsonl | Исходные сессии Claude |
| _bmad-output/knowledge/fragments/ | Целевые фрагменты |
| _bmad-output/knowledge/index.md | Главный индекс |
| _bmad-output/knowledge/open-questions.md | Список вопросов |
| _github/workflows/ci.yml | GitHub Actions CI/CD pipeline |
| playwright.config.ts | Playwright E2E test configuration |
| tests/e2e/genuim.spec.js | E2E test specs |
| index.html | Main landing page |
| assets/css/input.css | Tailwind CSS source |

### Technical Decisions

- **Language**: Russian (соответствует config)
- **Framework**: BMAD for migration and knowledge management
- **Testing**: Playwright E2E + Jest unit tests
- **CI/CD**: GitHub Actions with Cloudflare Pages deployment
- **CSS**: Tailwind v4 with dark mode variants
- **Error handling**: Try/catch for localStorage operations
- **Performance**: Lighthouse score ≥ 95, CLS ≤ 0.1, LCP ≤ 2.5s

## Implementation Plan

### Tasks

- [ ] Task 1: Создать структуру директорий для миграции
  - File: `scripts/migrate_sessions.js`
  - Action: Создать основной скрипт миграции
  - Notes: Инициализировать Node.js скрипт с базовой структурой

- [ ] Task 2: Реализовать чтение JSONL файлов
  - File: `scripts/migrate_sessions.js`
  - Action: Добавить логику чтения всех *.jsonl файлов из migration/raw/.claude-sessions/
  - Notes: Использовать fs.readdir и fs.readFile с обработкой ошибок

- [ ] Task 3: Парсинг сообщений и извлечение метаданных
  - File: `scripts/migrate_sessions.js`
  - Action: Извлечь sessionId, timestamp, role, author из каждого сообщения
  - Notes: Обработать структуру JSONL с сообщениями и вложенными инструментами

- [ ] Task 4: Фильтрация важных сообщений
  - File: `scripts/migrate_sessions.js`
  - Action: Выделить финальные тексты, решения, требования, TODO, вопросы, ссылки
  - Notes: Игнорировать служебные сообщения (snapshots, progress, thinking)

- [ ] Task 5: Нормализация в Markdown-фрагменты
  - File: `scripts/migrate_sessions.js`
  - Action: Создать фрагменты с заголовками, Source, Key Decisions, Requirements, Open Questions, Links
  - Notes: Сохранить в _bmad-output/knowledge/fragments/ с уникальными именами

- [ ] Task 6: Генерация index.md
  - File: `scripts/migrate_sessions.js`
  - Action: Создать индексный файл со списком всех фрагментов и summary
  - Notes: Добавить теги (PRD, Architecture, QA, Release, Sales) на основе содержания

- [ ] Task 7: Генерация open-questions.md
  - File: `scripts/migrate_sessions.js`
  - Action: Создать дедуплицированный список вопросов со ссылками на источники
  - Notes: Сгруппировать вопросы по темам и сессиям

- [ ] Task 8: Обработка артефактов BMAD
  - File: `scripts/migrate_sessions.js`
  - Action: Найти и обработать PRD, brief, architecture, epics из сессий
  - Notes: Положить в _bmad-output/planning-artifacts/ без плейсхолдеров

- [ ] Task 9: Создание инструкции запуска
  - File: `scripts/migrate_sessions.js`
  - Action: Добавить README раздел с командой запуска
  - Notes: Описать флаги (например --force для перезаписи)

- [ ] Task 10: Добавление валидации
  - File: `scripts/migrate_sessions.js`
  - Action: Реализовать отчет по количеству прочитанных сессий и созданных фрагментов
  - Notes: Добавить валидацию на ошибки парсинга и предупреждения

### Acceptance Criteria

- [ ] AC1: Given пользователь запускает скрипт миграции, when скрипт завершается, then создаются все Markdown-фрагменты в _bmad-output/knowledge/fragments/
- [ ] AC2: Given есть сессии Claude в migration/raw/.claude-sessions/, when скрипт выполняется, then index.md содержит список всех созданных фрагментов с summary
- [ ] AC3: Given есть вопросы в сессиях, when скрипт выполняется, then open-questions.md содержит дедуплицированный список вопросов со ссылками на источники
- [ ] AC4: Given найдены артефакты BMAD (PRD, brief, architecture, epics), when скрипт выполняется, then артефакты сохранены в _bmad-output/planning-artifacts/ без плейсхолдеров
- [ ] AC5: Given пользователь запускает скрипт, when скрипт завершается, then выводится отчет с количеством прочитанных сессий и созданных фрагментов
- [ ] AC6: Given скрипт запускается повторно без флага --force, when скрипт завершается, then ручные правки в фрагментах не перетираются
- [ ] AC7: Given скрипт запускается с флагом --force, when скрипт завершается, then все фрагменты перезаписываются заново
- [ ] AC8: Given есть ошибки в JSONL файлах, when скрипт выполняется, then ошибки логируются и скрипт продолжает работу
- [ ] AC9: Given нет сессий в migration/raw/.claude-sessions/, when скрипт выполняется, then создается пустой index.md с сообщением о отсутствии данных

## Additional Context

### Dependencies

- **BMAD framework**: Для миграции и управления знаниями
- **Node.js**: Runtime для выполнения скрипта миграции
- **File system**: Для чтения JSONL файлов и записи Markdown фрагментов
- **Markdown parser**: Для генерации структурированных фрагментов
- **Validation library**: Для проверки целостности данных

### Testing Strategy

- **Unit тесты**: Для функций парсинга JSONL и генерации Markdown
- **Integration тесты**: Для полного процесса миграции с тестовыми данными
- **Validation тесты**: Для проверки корректности созданных фрагментов и индексных файлов
- **Error handling тесты**: Для проверки обработки некорректных JSONL файлов
- **Idempotency тесты**: Для проверки поведения при повторном запуске

### Notes

- **High risk**: Парсинг структуры JSONL сессий Claude может быть сложным из-за вложенных сообщений
- **Performance**: Обработка 1814 строк в самой большой сессии может занять время
- **Data integrity**: Важно сохранить метаданные (timestamp, sessionId, role, author) для traceability
- **Edge cases**: Обработка пустых сессий, поврежденных файлов, дубликатов
- **Future considerations**: Возможность миграции из других источников (ChatGPT, etc.)