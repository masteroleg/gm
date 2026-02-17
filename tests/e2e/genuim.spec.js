const { test, expect } = require('@playwright/test');

test.describe('genu.im E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/genu.im/);
  });

  test('theme toggle switches between light and dark', async ({ page }) => {
    const themeToggle = page.locator('#themeToggle');
    const html = page.locator('html');
    
    // Check initial state
    const initialTheme = await html.getAttribute('data-theme');
    console.log('Initial theme:', initialTheme);
    
    // Click theme toggle
    await themeToggle.click();
    
    // Wait for theme change
    await page.waitForTimeout(500);
    
    // Check if theme changed
    const newTheme = await html.getAttribute('data-theme');
    console.log('Theme after click:', newTheme);
    
    expect(newTheme).not.toBe(initialTheme);
    expect(['light', 'dark']).toContain(newTheme);
    
    // Click again to toggle back
    await themeToggle.click();
    await page.waitForTimeout(500);
    
    const finalTheme = await html.getAttribute('data-theme');
    console.log('Theme after second click:', finalTheme);
    expect(finalTheme).toBe(initialTheme);
  });

  test('language toggle switches between EN and UK', async ({ page }) => {
    const langToggle = page.locator('#langToggle');
    const langLabel = page.locator('#langLabel');
    const html = page.locator('html');
    
    // Get initial state
    const initialLang = await html.getAttribute('lang');
    const initialLabel = await langLabel.textContent();
    console.log('Initial language:', initialLang, 'Label:', initialLabel);
    
    // Click language toggle
    await langToggle.click();
    await page.waitForTimeout(500);
    
    // Check if language changed
    const newLang = await html.getAttribute('lang');
    const newLabel = await langLabel.textContent();
    console.log('Language after click:', newLang, 'Label:', newLabel);
    
    expect(newLang).not.toBe(initialLang);
    expect(['en', 'uk']).toContain(newLang);
    expect(newLabel).toBe(newLang?.toUpperCase());
    
    // Check if text content changed
    const title = page.locator('[data-i18n="hero.title"]');
    const titleText = await title.textContent();
    console.log('Title after language change:', titleText);
    
    // Verify Ukrainian text
    if (newLang === 'uk') {
      expect(titleText).toContain('Довіра');
    } else {
      expect(titleText).toContain('Trust');
    }
  });

  test('mobile menu opens and closes', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const burgerBtn = page.locator('#burgerBtn');
    const mainNav = page.locator('#mainNav');
    const closeMenu = page.locator('#closeMenu');
    
    // Check initial state - menu should be hidden on mobile
    const initialClasses = await mainNav.getAttribute('class');
    console.log('Initial nav classes:', initialClasses);
    expect(initialClasses).toContain('hidden');
    
    // Open menu
    await burgerBtn.click();
    await page.waitForTimeout(300);
    
    const openClasses = await mainNav.getAttribute('class');
    console.log('Nav classes after open:', openClasses);
    expect(openClasses).not.toContain('hidden');
    
    // Close menu
    await closeMenu.click();
    await page.waitForTimeout(300);
    
    const closeClasses = await mainNav.getAttribute('class');
    console.log('Nav classes after close:', closeClasses);
    expect(closeClasses).toContain('hidden');
  });

  test('page has all required elements', async ({ page }) => {
    // Check for logo
    await expect(page.locator('img[alt="Genu.im Logo"]')).toBeVisible();
    
    // Check for theme toggle
    await expect(page.locator('#themeToggle')).toBeVisible();
    
    // Check for language toggle
    await expect(page.locator('#langToggle')).toBeVisible();
    
    // Check for navigation - verify element exists in DOM (visibility controlled by JS)
    await expect(page.locator('#mainNav')).toBeAttached();
    
    // Check for main content
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-i18n="hero.title"]')).toBeVisible();
    
    // Check for QR code
    await expect(page.locator('img[alt="QR Code"]')).toBeVisible();
    
    // Check for footer
    await expect(page.locator('footer')).toBeVisible();
  });

  test('localStorage persists theme preference', async ({ page }) => {
    const themeToggle = page.locator('#themeToggle');
    
    // Set dark theme
    await themeToggle.click();
    await page.waitForTimeout(500);
    
    // Check localStorage
    const savedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    console.log('Saved theme in localStorage:', savedTheme);
    expect(savedTheme).toBe('dark');
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check if theme persisted
    const html = page.locator('html');
    const themeAfterReload = await html.getAttribute('data-theme');
    console.log('Theme after reload:', themeAfterReload);
    expect(themeAfterReload).toBe('dark');
  });

  test('localStorage persists language preference', async ({ page }) => {
    const langToggle = page.locator('#langToggle');
    const html = page.locator('html');
    
    // Get current lang
    const initialLang = await html.getAttribute('lang');
    
    // Toggle language
    await langToggle.click();
    await page.waitForTimeout(500);
    
    const newLang = await html.getAttribute('lang');
    
    // Check localStorage
    const savedLang = await page.evaluate(() => localStorage.getItem('lang'));
    console.log('Saved language in localStorage:', savedLang);
    expect(savedLang).toBe(newLang);
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check if language persisted
    const langAfterReload = await html.getAttribute('lang');
    console.log('Language after reload:', langAfterReload);
    expect(langAfterReload).toBe(newLang);
  });
});
