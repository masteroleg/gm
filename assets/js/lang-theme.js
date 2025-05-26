// Fault-tolerant theme and language toggle
(function() {
  const html = document.documentElement;
  
  // ========== THEME TOGGLE ==========
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    function setAriaChecked(state) {
      try {
        themeToggle.setAttribute('aria-checked', state ? 'true' : 'false');
      } catch (e) {
        console.warn('Failed to set aria-checked:', e);
      }
    }

    let savedTheme, prefersDark;
    try {
      savedTheme = localStorage.getItem("theme");
    } catch (e) { 
      console.warn('Failed to get theme from localStorage:', e);
      savedTheme = null; 
    }
    
    try {
      prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) { 
      console.warn('Failed to detect system preference:', e);
      prefersDark = false; 
    }

    function applyTheme(isDark) {
      try {
        if (isDark) {
          html.classList.add("dark");
          try { localStorage.setItem("theme", "dark"); } catch {}
          themeToggle.checked = true;
          setAriaChecked(true);
        } else {
          html.classList.remove("dark");
          try { localStorage.setItem("theme", "light"); } catch {}
          themeToggle.checked = false;
          setAriaChecked(false);
        }
      } catch (e) {
        console.warn('Failed to apply theme:', e);
      }
    }

    // Initial state
    let isDark = false;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      isDark = true;
    }
    applyTheme(isDark);

    themeToggle.addEventListener("change", function() {
      applyTheme(themeToggle.checked);
    });

    // Accessibility: Keyboard support
    themeToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.checked = !themeToggle.checked;
        themeToggle.dispatchEvent(new Event('change'));
      }
    });

    // Listen to system preference changes
    try {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', (e) => {
        if (!localStorage.getItem("theme")) applyTheme(e.matches);
      });
    } catch (e) {
      console.warn('Failed to add media query listener:', e);
    }
  }

  // ========== LANGUAGE TOGGLE ==========
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  
  if (langToggle && langLabel) {
    const translations = {
      en: {
        heroText: 'Trust built through transparency.',
        heroSub: 'Consumer loyalty through enhanced transparency',
        qrLabel: 'SCAN TO VERIFY',
        tagline: 'Not fake. Not "maybe". Just genu.im.',
        navPerevirProdukt: 'Check product',
        footerPerevirProdukt: 'Check product',
      },
      uk: {
        heroText: 'Довіра, створена через прозорість.',
        heroSub: 'Лояльність споживачів через підвищену прозорість',
        qrLabel: 'СКАНУВАТИ ДЛЯ ПЕРЕВІРКИ',
        tagline: 'Не фейк. Не «можливо». Просто genu.im.',
        navPerevirProdukt: 'Перевір продукт',
        footerPerevirProdukt: 'Перевір продукт',
      }
    };

    function getSavedLang() {
      try {
        const saved = localStorage.getItem('lang');
        if (saved && translations[saved]) return saved;
      } catch (e) {
        console.warn('Failed to get language from localStorage:', e);
      }
      return 'en';
    }
    
    function setSavedLang(lang) {
      try { 
        localStorage.setItem('lang', lang); 
      } catch (e) {
        console.warn('Failed to save language to localStorage:', e);
      }
    }

    function applyLang(lang) {
      try {
        // Ensure we have a valid language or fall back to English
        const validLang = translations[lang] ? lang : 'en';
        const texts = translations[validLang];
        
        // Apply translations to all elements
        for (const id in texts) {
          const el = document.getElementById(id);
          if (el) {
            el.textContent = texts[id];
          } else {
            console.warn(`Element not found for translation key: ${id}`);
          }
        }
        
        // Update document language
        document.documentElement.lang = validLang;
        
        // Update language toggle label
        updateLangLabel(validLang);
      } catch (e) {
        console.error('Failed to apply language:', e);
        // Last resort fallback - try to set English
        try {
          document.documentElement.lang = 'en';
          langLabel.textContent = 'EN';
        } catch {}
      }
    }

    function updateLangLabel(lang) {
      try {
        langLabel.textContent = lang.toUpperCase();
      } catch (e) {
        console.warn('Failed to update language label:', e);
      }
    }

    // Toggle language on click
    langToggle.addEventListener('click', function() {
      try {
        const current = getSavedLang();
        const newLang = current === 'en' ? 'uk' : 'en';
        setSavedLang(newLang);
        applyLang(newLang);
      } catch (e) {
        console.error('Language toggle failed:', e);
      }
    });

    // Accessibility: Keyboard support
    langToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        langToggle.click();
      }
    });

    // Initialize language on page load
    let initialLang = getSavedLang();
    applyLang(initialLang);
  }
})();
