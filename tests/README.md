# Test Strategy

## Layers

- `tests/*.test.js` - fast Jest DOM checks
- `tests/e2e/*.spec.ts` - Playwright end-to-end coverage
- `tests/e2e/pages/` - Page Objects and reusable locators

## Smoke vs Full

- `@smoke` means fast critical-path coverage suitable for local pre-push
- Full regression means all Playwright specs across all configured projects in CI

## Rules

1. Every new critical user flow should add at least one `@smoke` test
2. Prefer `data-testid` for new interactive UI where practical
3. Keep locators in Page Objects/components, not copied through tests
4. Keep assertions in tests unless a helper is obviously an assertion helper
5. Avoid hard waits; prefer state-based waits

## Commands

```bash
npm test
npm run test:smoke
npm run test:smoke:all
npm run test:e2e
```
