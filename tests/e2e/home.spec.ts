import { test, expect } from '@playwright/test';

test('GM landing page loads and shows hero CTA', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveTitle(/genu.im/);
  await expect(page.locator('[data-i18n="hero.cta"]')).toBeVisible();
  await expect(page.locator('[data-i18n="hero.title"]')).toBeVisible();
});
