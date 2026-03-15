---
title: 'Fix ambiguous Diia CTA locator in official-check.spec.ts'
slug: 'fix-ambiguous-diia-locator'
created: '2026-03-15'
status: 'ready-for-dev'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['Playwright', 'E2E Testing', 'TypeScript']
files_to_modify: ['tests/e2e/official-check.spec.ts']
files_to_review: ['tests/e2e/official-check.spec.ts', 'site/perevir-product/index.html']
code_patterns: ['locator specificity', 'scoped selectors', 'BEM naming']
test_patterns: ['Playwright locator patterns', 'selector scoping best practices']
---

# Tech-Spec: Fix ambiguous Diia CTA locator in official-check.spec.ts

**Created:** 2026-03-15

## Overview

### Problem Statement

E2E тест `official-check.spec.ts:37-41` падает в CI с ошибкой "multiple elements found". Locator `a.cta-button[href="https://diia.gov.ua/"]` находит ДВА элемента на странице `/perevir-product/`:
1. `info-page__cta-section` → Diia CTA (основной CTA)
2. `routing-card--official` → Второй Diia CTA (из Epic 3 routing)

Причина: в Epic 3 добавили routing cards с двумя Diia ссылками, а тест был написан когда была только ОДНА ссылка.

### Solution

Обновить locator в тесте `official-check.spec.ts:38` использовать более специфичный selector `.info-page__cta-section a.cta-button[href="https://diia.gov.ua/"]`, аналогично другим тестам в этом же файле (строки 25 и 101).

### Scope

**In Scope:**
- Исправить locator в тесте `tests/e2e/official-check.spec.ts:38`
- Проверить другие тесты на аналогичные ambiguous selectors
- Запустить локально для верификации

**Out of Scope:**
- Изменение production кода
- Рефакторинг routing cards
- Изменение page structure

## Context for Development

### Codebase Patterns

Тесты в `official-check.spec.ts` используют scoped selectors:

| Line | Selector | Status |
|------|----------|--------|
| 25 | `.info-page__cta-section a.cta-button[href="https://diia.gov.ua/"]` | ✅ Correct |
| 38 | `a.cta-button[href="https://diia.gov.ua/"]` | ❌ Ambiguous (NEEDS FIX) |
| 101 | `.info-page__cta-section a.cta-button[href="https://diia.gov.ua/"]` | ✅ Correct |

**Pattern confirmed:** Все работающие тесты используют scoped selector с `.info-page__cta-section`.

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `tests/e2e/official-check.spec.ts` | Файл с падающим тестом (строка 38) |
| `site/perevir-product/index.html` | Страница с двумя Diia ссылками |

### Technical Decisions

1. **Использовать scoped selector** вместо `.first()` - более явный и понятный подход
2. **Применить тот же паттерн**, что уже используется в строках 25 и 101

## Implementation Plan

### Tasks

- [ ] **Task 1:** Исправить ambiguous locator в тесте
  - File: `tests/e2e/official-check.spec.ts`
  - Line: 38
  - Action: Заменить `'a.cta-button[href="https://diia.gov.ua/"]'` на `'.info-page__cta-section a.cta-button[href="https://diia.gov.ua/"]'`
  - Notes: Использовать тот же паттерн что в строках 25 и 101

- [ ] **Task 2:** Запустить smoke тесты для быстрой проверки
  - Command: `npm run test:smoke`
  - Expected: Все 42 теста проходят

- [ ] **Task 3:** Запустить полный E2E suite для подтверждения
  - Command: `npm run test:e2e:ci`
  - Expected: Все тесты в official-check.spec.ts проходят

### Acceptance Criteria

- [ ] **AC1:** Given тест `page has accessible aria-label on CTA` запущен, when выполняется locator для Diia CTA, then находится ровно ОДИН элемент and тест проходит успешно

- [ ] **AC2:** Given запущен полный E2E suite, when все тесты выполнены, then нет падений связанных с ambiguous selectors

- [ ] **AC3:** Given выполнен commit, when CI workflow запущен, then все jobs проходят успешно

## Additional Context

### Dependencies

None - это изолированный test fix.

### Testing Strategy

- **Быстрая проверка:** `npm run test:smoke` (42 теста, ~12 сек)
- **Полное подтверждение:** `npm run test:e2e:ci` (447 тестов, ~2 мин)
- **CI верификация:** GitHub Actions full-e2e jobs

### Notes

- Проблема была выявлена через GitHub Actions CI run #23103805672
- quick-checks прошли успешно, full-e2e упал на всех browser projects
- Локально `npm run test:smoke` проходит (42/42)
