const { test, expect } = require('@playwright/test');

test('visual theme toggle test with screenshots', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  console.log('=== Visual Theme Test ===');
  
  // Take screenshot of initial state
  await page.screenshot({ path: 'test-results/01-initial.png', fullPage: true });
  console.log('Screenshot 1: Initial state saved');
  
  // Get initial theme
  const initialTheme = await page.locator('html').getAttribute('data-theme');
  console.log('Initial theme:', initialTheme);
  
  // Click theme toggle
  const themeToggle = page.locator('#themeToggle');
  await themeToggle.click();
  await page.waitForTimeout(1000); // Wait for transition
  
  // Take screenshot after toggle
  await page.screenshot({ path: 'test-results/02-after-toggle.png', fullPage: true });
  console.log('Screenshot 2: After toggle saved');
  
  const newTheme = await page.locator('html').getAttribute('data-theme');
  console.log('Theme after click:', newTheme);
  
  // Check background color
  const bodyBg = await page.evaluate(() => {
    return getComputedStyle(document.body).backgroundColor;
  });
  console.log('Body background color:', bodyBg);
  
  // Check if dark mode class is applied
  const htmlClasses = await page.locator('html').getAttribute('class');
  console.log('HTML classes:', htmlClasses);
  
  // Get CSS variables
  const cssVars = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return {
      bgBody: styles.getPropertyValue('--color-bg-body').trim(),
      textBody: styles.getPropertyValue('--color-text-body').trim(),
      theme: document.documentElement.getAttribute('data-theme')
    };
  });
  console.log('CSS variables:', cssVars);
  
  // Toggle back
  await themeToggle.click();
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'test-results/03-after-second-toggle.png', fullPage: true });
  console.log('Screenshot 3: After second toggle saved');
  
  console.log('Test completed! Check test-results/ folder for screenshots.');
  
  // Verify theme changed
  expect(newTheme).not.toBe(initialTheme);
});

test('debug theme toggle click', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  console.log('=== Debug Theme Toggle ===');
  
  // Check if button exists and is visible
  const themeToggle = page.locator('#themeToggle');
  const isVisible = await themeToggle.isVisible();
  console.log('Theme toggle visible:', isVisible);
  
  // Get button attributes
  const attrs = await themeToggle.evaluate(el => ({
    ariaLabel: el.getAttribute('aria-label'),
    ariaPressed: el.getAttribute('aria-pressed'),
    dataTheme: el.getAttribute('data-theme')
  }));
  console.log('Button attributes:', attrs);
  
  // Check click event listener
  const hasClickListener = await themeToggle.evaluate(el => {
    return el.onclick !== null || el._eventListeners?.click?.length > 0;
  });
  console.log('Has click listener:', hasClickListener);
  
  // Try to click and observe
  console.log('Clicking theme toggle...');
  await themeToggle.click();
  await page.waitForTimeout(500);
  
  const afterClick = await page.locator('html').getAttribute('data-theme');
  console.log('Theme after click:', afterClick);
  
  // Check console logs
  const logs = [];
  page.on('console', msg => logs.push(msg.text()));
  console.log('Console logs:', logs);
});
