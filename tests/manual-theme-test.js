// Manual test for theme toggle functionality
// Run this in browser console to test theme toggle

console.log('=== Theme Toggle Test ===');

// Test 1: Check if button exists
const themeToggle = document.getElementById('themeToggle');
console.log('1. Theme toggle button exists:', !!themeToggle);

// Test 2: Check initial state
const html = document.documentElement;
const initialTheme = html.getAttribute('data-theme');
console.log('2. Initial theme:', initialTheme || 'not set');

// Test 3: Simulate click and check toggle
if (themeToggle) {
    console.log('3. Simulating click...');
    themeToggle.click();
    const afterClickTheme = html.getAttribute('data-theme');
    console.log('   Theme after click:', afterClickTheme);
    
    // Test 4: Click again to toggle back
    themeToggle.click();
    const afterSecondClick = html.getAttribute('data-theme');
    console.log('   Theme after second click:', afterSecondClick);
    
    // Test 5: Check localStorage
    const savedTheme = localStorage.getItem('theme');
    console.log('4. Saved theme in localStorage:', savedTheme);
    
    console.log('\n=== Test Results ===');
    console.log('Theme toggle is', (afterClickTheme !== initialTheme) ? 'WORKING ✓' : 'BROKEN ✗');
} else {
    console.log('✗ Theme toggle button not found!');
}
