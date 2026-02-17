const { test, expect } = require('@playwright/test');

test('theme toggle works on production', async ({ page }) => {
  // Clear browser cache
  await page.goto('/?nocache=' + Date.now());
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
  // Dark mode uses a gradient, not a solid color - check for dark colors in the gradient
  expect(afterVars.bg.toLowerCase()).toContain('0f0f1a'); // Dark gradient start color
  // Dark mode text color is light (#f0f0e8), not white
  expect(afterVars.text.toLowerCase()).toBe('#f0f0e8');
  
  console.log('✅ THEME IS WORKING!');
});
