# Anti-Pattern Examples

**❌ BAD: E2E test for business logic**

```typescript
// DON'T DO THIS
test('calculate discount via UI', async ({ page }) => {
  await page.goto('/calculator');
  await page.fill('[data-testid="price"]', '100');
  await page.fill('[data-testid="discount"]', '20');
  await page.click('[data-testid="calculate"]');
  await expect(page.getByText('$80')).toBeVisible();
});
// Problem: Slow, brittle, tests logic that should be unit tested
```

**✅ GOOD: Unit test for business logic**

```typescript
test('calculate discount', () => {
  expect(calculateDiscount(100, 20)).toBe(80);
});
// Fast, reliable, isolated
```

_Source: Murat Testing Philosophy (test pyramid), existing test-levels-framework.md structure._
