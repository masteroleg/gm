// Manual test for language toggle functionality  
// Run this in browser console to test language toggle

console.log('=== Language Toggle Test ===');

// Test 1: Check if button exists
const langToggle = document.getElementById('langToggle');
const langLabel = document.getElementById('langLabel');
console.log('1. Language toggle button exists:', !!langToggle);
console.log('2. Language label exists:', !!langLabel);

// Test 2: Check initial state
const html = document.documentElement;
const initialLang = html.lang;
console.log('3. Initial language:', initialLang);

// Test 3: Check if translations are applied
const i18nElements = document.querySelectorAll('[data-i18n]');
console.log('4. Elements with data-i18n:', i18nElements.length);

// Test 4: Simulate click and check toggle
if (langToggle) {
    console.log('5. Simulating click...');
    const titleBefore = document.querySelector('[data-i18n="hero.title"]')?.textContent;
    langToggle.click();
    const afterClickLang = html.lang;
    const titleAfter = document.querySelector('[data-i18n="hero.title"]')?.textContent;
    console.log('   Language after click:', afterClickLang);
    console.log('   Title before:', titleBefore);
    console.log('   Title after:', titleAfter);
    
    // Test 5: Check localStorage
    const savedLang = localStorage.getItem('lang');
    console.log('6. Saved language in localStorage:', savedLang);
    
    console.log('\n=== Test Results ===');
    console.log('Language toggle is', (afterClickLang !== initialLang) ? 'WORKING ✓' : 'BROKEN ✗');
    console.log('Translations are', (titleBefore !== titleAfter) ? 'WORKING ✓' : 'BROKEN ✗');
} else {
    console.log('✗ Language toggle button not found!');
}
