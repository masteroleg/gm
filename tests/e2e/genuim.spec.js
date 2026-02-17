const { test, expect } = require('@playwright/test');

test.describe('genu.im E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/genu.im/);
  });

  test('theme toggle switches between light and dark', async ({ page }) => {
    const themeToggle = page.locator('#themeToggle');
    const html = page.locator('html');

    const initialTheme = await html.getAttribute('data-theme');

    await themeToggle.click();
    await expect(html).not.toHaveAttribute('data-theme', initialTheme);

    const newTheme = await html.getAttribute('data-theme');
    expect(['light', 'dark']).toContain(newTheme);

    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', initialTheme);
  });

  test('language toggle switches between EN and UK', async ({ page }) => {
    const langToggle = page.locator('#langToggle');
    const langLabel = page.locator('#langLabel');
    const html = page.locator('html');

    const initialLang = await html.getAttribute('lang');

    await langToggle.click();
    await expect(html).not.toHaveAttribute('lang', initialLang);

    const newLang = await html.getAttribute('lang');
    expect(['en', 'uk']).toContain(newLang);
    await expect(langLabel).toHaveText(newLang.toUpperCase());

    const title = page.locator('[data-i18n="hero.title"]');
    if (newLang === 'uk') {
      await expect(title).toContainText('Довіра');
    } else {
      await expect(title).toContainText('Trust');
    }
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const burgerBtn = page.locator('#burgerBtn');
    const mainNav = page.locator('#mainNav');
    const closeMenu = page.locator('#closeMenu');

    await expect(mainNav).toHaveClass(/hidden/);

    await burgerBtn.click();
    await expect(mainNav).not.toHaveClass(/hidden/);

    await closeMenu.click();
    await expect(mainNav).toHaveClass(/hidden/);
  });

  test('page has all required elements', async ({ page }) => {
    await expect(page.locator('img[alt="Genu.im Logo"]')).toBeVisible();
    await expect(page.locator('#themeToggle')).toBeVisible();
    await expect(page.locator('#langToggle')).toBeVisible();
    await expect(page.locator('#mainNav')).toBeAttached();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-i18n="hero.title"]')).toBeVisible();
    await expect(page.locator('img[alt="QR Code"]')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('localStorage persists theme preference', async ({ page }) => {
    const themeToggle = page.locator('#themeToggle');
    const html = page.locator('html');

    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'dark');

    const savedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(savedTheme).toBe('dark');

    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('localStorage persists language preference', async ({ page }) => {
    const langToggle = page.locator('#langToggle');
    const html = page.locator('html');

    const initialLang = await html.getAttribute('lang');
    await langToggle.click();
    await expect(html).not.toHaveAttribute('lang', initialLang);

    const newLang = await html.getAttribute('lang');
    const savedLang = await page.evaluate(() => localStorage.getItem('lang'));
    expect(savedLang).toBe(newLang);

    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await expect(html).toHaveAttribute('lang', newLang);
  });
});
