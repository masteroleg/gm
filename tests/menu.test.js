describe('Menu Toggle', () => {
  beforeEach(() => {
    // Set up the DOM structure before requiring the script
    document.body.innerHTML = `
      <div id="mainNav" class="hidden"></div>
      <button id="burgerBtn"></button>
      <button id="closeMenu"></button>
    `;
    // Since the script runs immediately, we require it here after DOM setup
    // We use jest.resetModules() to ensure a fresh load of the module for each test
    jest.resetModules();
    require('../site/assets/js/menu');
  });

  test('should open the menu when the burger button is clicked', () => {
    const mainNav = document.getElementById('mainNav');
    const burgerBtn = document.getElementById('burgerBtn');

    // Initially, the menu should be hidden
    expect(mainNav.classList.contains('hidden')).toBe(true);

    // Simulate a click on the burger button
    burgerBtn.click();

    // After the click, the menu should be visible (class 'hidden' removed)
    expect(mainNav.classList.contains('hidden')).toBe(false);
  });

  test('should close the menu when the close button is clicked', () => {
    const mainNav = document.getElementById('mainNav');
    const closeBtn = document.getElementById('closeMenu'); // Corrected ID

    // First, open the menu
    mainNav.classList.remove('hidden');
    expect(mainNav.classList.contains('hidden')).toBe(false);

    // Simulate a click on the close button
    closeBtn.click();

    // After the click, the menu should be hidden (class 'hidden' added)
    expect(mainNav.classList.contains('hidden')).toBe(true);
  });
});

