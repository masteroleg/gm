const { test, expect } = require('@playwright/test');

test('test theme with cache busting', async ({ page }) => {
  // Go to site with cache busting
  await page.goto('https://genu.im/?v=' + Date.now());
  await page.waitForLoadState('networkidle');
  
  console.log('=== Testing with cache bust ===');
  
  // Clear cache
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  
  // Reload to get fresh CSS
  await page.reload({ waitUntil: 'networkidle' });
  
  // Check CSS file version
  const cssContent = await page.evaluate(async () => {
    const response = await fetch('assets/css/output.css');
    const text = await response.text();
    return text.substring(0, 500); // First 500 chars
  });
  
  console.log('CSS first 500 chars:', cssContent);
  
  // Check if dark theme CSS is present
  const hasDarkThemeCSS = cssContent.includes('[data-theme="dark"]');
  console.log('Has [data-theme="dark"] in CSS:', hasDarkThemeCSS);
  
  // Test theme toggle
  const themeToggle = page.locator('#themeToggle');
  await themeToggle.click();
  await page.waitForTimeout(1000);
  
  // Check variables
  const vars = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return {
      bg: styles.getPropertyValue('--color-bg-body').trim(),
      text: styles.getPropertyValue('--color-text-body').trim(),
      theme: document.documentElement.getAttribute('data-theme')
    };
  });
  
  console.log('After toggle:', vars);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/theme-after-fix.png', fullPage: true });
});
