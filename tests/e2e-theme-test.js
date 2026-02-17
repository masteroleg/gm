const puppeteer = require('puppeteer');

async function testThemeToggle() {
  console.log('Starting E2E theme toggle test...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set light mode preference
    await page.emulateMediaFeatures([
      { name: 'prefers-color-scheme', value: 'light' }
    ]);
    
    // Test 1: Load page with cleared storage (light theme)
    console.log('Test 1: Loading page in light mode...');
    await page.goto('https://genu.im', { waitUntil: 'networkidle0' });
    
    // Clear storage and reload
    await page.evaluate(() => {
      localStorage.removeItem('theme');
      document.documentElement.classList.remove('dark');
    });
    await page.reload({ waitUntil: 'networkidle0' });
    
    const htmlClass = await page.$eval('html', el => el.className);
    console.log(`  HTML class: "${htmlClass}"`);
    
    const hasDarkClassInit = htmlClass.includes('dark');
    console.log(`  Has dark class: ${hasDarkClassInit ? 'YES (BAD)' : 'NO (GOOD ✓)'}`);
    
    const bgColor = await page.$eval('body', el => 
      window.getComputedStyle(el).backgroundColor
    );
    console.log(`  Body background: ${bgColor}`);
    
    const textColor = await page.$eval('body', el => 
      window.getComputedStyle(el).color
    );
    console.log(`  Body text color: ${textColor}`);
    
    // Light theme should have dark text (around rgb(28, 28, 28) = #1c1c1c)
    const isLightText = textColor.includes('28') || textColor.includes('1c');
    console.log(`  Is light theme (dark text): ${isLightText ? 'YES ✓' : 'NO ✗'}`);
    
    // Test 2: Click theme toggle button
    console.log('\nTest 2: Clicking theme toggle to switch to DARK...');
    await page.click('#themeToggle');
    await new Promise(r => setTimeout(r, 500));
    
    const htmlClassAfter = await page.$eval('html', el => el.className);
    console.log(`  HTML class after toggle: "${htmlClassAfter}"`);
    
    const hasDarkClass = htmlClassAfter.includes('dark');
    console.log(`  Has dark class: ${hasDarkClass ? 'YES ✓' : 'NO ✗'}`);
    
    const textColorAfter = await page.$eval('body', el => 
      window.getComputedStyle(el).color
    );
    console.log(`  Body text color after: ${textColorAfter}`);
    
    // Dark theme should have light text (around rgb(240, 240, 232) = #f0f0e8)
    const isDarkText = textColorAfter.includes('240') || textColorAfter.includes('232');
    console.log(`  Is dark theme (light text): ${isDarkText ? 'YES ✓' : 'NO ✗'}`);
    
    // Test 3: Toggle back to light
    console.log('\nTest 3: Toggling back to LIGHT...');
    await page.click('#themeToggle');
    await new Promise(r => setTimeout(r, 500));
    
    const htmlClassFinal = await page.$eval('html', el => el.className);
    console.log(`  HTML class final: "${htmlClassFinal}"`);
    
    const noDarkClass = !htmlClassFinal.includes('dark');
    console.log(`  No dark class: ${noDarkClass ? 'YES ✓' : 'NO ✗'}`);
    
    const textColorFinal = await page.$eval('body', el => 
      window.getComputedStyle(el).color
    );
    console.log(`  Body text color final: ${textColorFinal}`);
    
    const isLightAgain = textColorFinal.includes('28') || textColorFinal.includes('1c');
    console.log(`  Is light theme again (dark text): ${isLightAgain ? 'YES ✓' : 'NO ✗'}`);
    
    // Summary
    console.log('\n========================================');
    console.log('E2E TEST SUMMARY');
    console.log('========================================');
    const allPassed = !hasDarkClassInit && isLightText && hasDarkClass && isDarkText && noDarkClass && isLightAgain;
    console.log(`All tests passed: ${allPassed ? '✅ YES' : '❌ NO'}`);
    
    if (!allPassed) {
      console.log('\nFailed checks:');
      if (hasDarkClassInit) console.log('  - Initial state had dark class');
      if (!isLightText) console.log('  - Light theme text color wrong');
      if (!hasDarkClass) console.log('  - Dark class not added after toggle');
      if (!isDarkText) console.log('  - Dark theme text color wrong');
      if (!noDarkClass) console.log('  - Dark class not removed after toggle back');
      if (!isLightAgain) console.log('  - Light theme text color wrong after toggle back');
    }
    console.log('========================================');
    
    return allPassed;
    
  } catch (error) {
    console.error('Test error:', error.message);
    return false;
  } finally {
    await browser.close();
  }
}

testThemeToggle().then(passed => {
  process.exit(passed ? 0 : 1);
});
