import { test, expect } from '@playwright/test';

// End-to-end test: verify GM landing page loads and key elements exist
test('GM landing page loads and shows hero CTA', async ({ page }) => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle(/genu.im/);
  await expect(page.locator('text=Verify Product')).toBeVisible();
  await expect(page.locator('text=Trust built through transparency.')).toBeVisible();
});
