# E2E Testing: Visual Regression Gap

**Category:** testing  
**Tags:** playwright, e2e, css, regression  
**Created:** 2026-02-18

## Problem

E2E tests that check DOM elements can pass even when CSS is completely missing. A page with bare HTML (no styles) technically contains all required elements.

## Example

```javascript
// This test PASSES even with no CSS loaded
test('page has hero section', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-i18n="hero.title"]')).toBeVisible();
  // ↑ Element exists in DOM, test passes
});
```

## Solution: Check Computed Styles

```javascript
test('CSS is loaded and applied', async ({ page }) => {
  await page.goto('/');
  
  // Method 1: Check CSS custom property exists
  const bgColor = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--color-bg-body')
  );
  expect(bgColor.trim()).not.toBe('');
  
  // Method 2: Check Tailwind utilities work
  const logo = page.locator('img[alt="genu.im logo dark"]');
  await expect(logo).toBeHidden(); // Hidden in light theme via dark:hidden
});
```

## Key Insight

> "Tests passed because Playwright checks presence of elements in DOM, but not visual rendering."  
> — Session d0cd1940-c774-432a-9f3f-d27724b57e60, 2026-02-18T19:53:26Z

## When This Matters

- CSS file accidentally removed from tracking
- Tailwind build failed silently
- CDN/stylesheet 404 in production
- Critical CSS not inlined

---

**Sources:**
- Session: d0cd1940-c774-432a-9f3f-d27724b57e60
- Timestamps: 2026-02-18T19:53:26Z, 2026-02-18T19:54:11Z
