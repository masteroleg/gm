// theme-toggle.js for site published assets
document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  if (!themeToggle) return;

  function setTheme(isDark) {
    try {
      const theme = isDark ? 'dark' : 'light';
      if (isDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      html.setAttribute('data-theme', theme);
      themeToggle.setAttribute('aria-pressed', isDark);
      themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode (currently ${theme} mode)`);
      themeToggle.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} mode`);
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.error('Error setting theme:', e);
    }
  }

  function getThemePreference() {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark;
    } catch (e) {
      console.warn('Error getting theme preference:', e);
      return false;
    }
  }

  const isDark = getThemePreference();
  setTheme(isDark);

  themeToggle.addEventListener('click', function () {
    const isCurrentlyDark = html.classList.contains('dark');
    setTheme(!isCurrentlyDark);
  });
});
