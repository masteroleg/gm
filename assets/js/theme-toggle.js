// theme-toggle.js
document.addEventListener('DOMContentLoaded', function () {
	const themeToggle = document.getElementById('themeToggle');
	const html = document.documentElement;

	if (!themeToggle) return;

	// Function to set the theme and update UI
	function setTheme(isDark) {
		try {
			// Update the data-theme attribute
			const theme = isDark ? 'dark' : 'light';
			html.setAttribute('data-theme', theme);

			// Update the button state
			themeToggle.setAttribute('aria-pressed', isDark);
			themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode (currently ${theme} mode)`);
			themeToggle.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} mode`);

			// Save preference to localStorage
			localStorage.setItem('theme', theme);

			console.log(`Theme set to ${theme}`);
		} catch (e) {
			console.error('Error setting theme:', e);
		}
	}

	// Function to get the current theme preference
	function getThemePreference() {
		try {
			// Check for saved preference
			const savedTheme = localStorage.getItem('theme');
			if (savedTheme) {
				return savedTheme === 'dark';
			}

			// Check system preference
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			return prefersDark;
		} catch (e) {
			console.warn('Error getting theme preference:', e);
			return false; // Default to light theme
		}
	}

	// Initialize theme
	const isDark = getThemePreference();
	setTheme(isDark);

	// Toggle theme on click
	themeToggle.addEventListener('click', function () {
		const currentTheme = html.getAttribute('data-theme');
		setTheme(currentTheme !== 'dark');
	});

	// Listen for system preference changes
	try {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
		const handleSystemThemeChange = (e) => {
			// Only update if user hasn't set a preference
			if (!localStorage.getItem('theme')) {
				setTheme(e.matches);
			}
		};

		prefersDark.addEventListener('change', handleSystemThemeChange);

	} catch (e) {
		console.warn('Could not set up system theme listener:', e);
	}
});