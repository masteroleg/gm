// Fault-tolerant language toggle
(function() {
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  if (!langToggle || !langLabel) return; // Elements not present

  const translations = {
    en: {
      heroText: 'Trust built through transparency.',
      heroSub: 'Consumer loyalty through enhanced transparency',
      qrLabel: 'SCAN TO VERIFY',
      tagline: 'Not fake. Not “maybe”. Just genu.im.',
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
    } catch {}
    return 'en';
  }
  function setSavedLang(lang) {
    try { localStorage.setItem('lang', lang); } catch {}
  }

  function applyLang(lang) {
    const texts = translations[lang] || translations.en;
    for (const id in texts) {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = texts[id];
      } else {
        if (lang !== 'en') console.warn(`Missing element for translation key: ${id}`);
      }
    }
    try {
      document.documentElement.lang = lang;
    } catch {}
    updateLangLabel(lang);
  }

  function updateLangLabel(lang) {
    try {
      langLabel.textContent = lang.toUpperCase();
    } catch {}
  }

  langToggle.addEventListener('click', function() {
    const current = getSavedLang();
    const newLang = current === 'en' ? 'uk' : 'en';
    setSavedLang(newLang);
    applyLang(newLang);
  });

  // Accessibility: Keyboard support
  langToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      langToggle.click();
    }
  });

  // Initial load
  let initialLang = getSavedLang();
  applyLang(initialLang);
})();
