const { test, expect } = require('@playwright/test');

test('theme toggle works on production', async ({ page }) => {
  // Clear browser cache
  await page.goto('https://genu.im/?nocache=' + Date.now());
  await page.waitForLoadState('networkidle');
  
  console.log('=== Testing Theme on Production ===');
  
  // Get initial CSS variables
  const initialVars = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return {
      bg: styles.getPropertyValue('--color-bg-body').trim(),
      text: styles.getPropertyValue('--color-text-body').trim(),
      theme: document.documentElement.getAttribute('data-theme')
    };
  });
  console.log('Initial:', initialVars);
  
  // Click theme toggle
  await page.click('#themeToggle');
  await page.waitForTimeout(1000);
  
  // Check after click
  const afterVars = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return {
      bg: styles.getPropertyValue('--color-bg-body').trim(),
      text: styles.getPropertyValue('--color-text-body').trim(),
      theme: document.documentElement.getAttribute('data-theme')
    };
  });
  console.log('After click:', afterVars);
  
  // Verify the fix
  expect(afterVars.theme).toBe('dark');
  expect(afterVars.bg.toLowerCase()).toBe('#0e0e0f'); // Dark background
  expect(['#ffffff', '#fff']).toContain(afterVars.text.toLowerCase()); // White text (can be #fff or #ffffff)
  
  console.log('✅ THEME IS WORKING!');
});
