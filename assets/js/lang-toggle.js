const translations = {
	en: {
		"hero.title": 'Trust built through transparency.',
		"hero.subtitle": 'Consumer loyalty through enhanced transparency',
		"hero.qr": 'SCAN TO VERIFY',
		"hero.tagline": 'Not fake. Not “maybe”. Just genu.im.',
		"footer.tagline": 'Building trust through clarity',
		"nav.perevirProduct": 'Check product',
		"footer.perevirProduct": 'Check product',
	},
	uk: {
		"hero.title": 'Довіра, створена через прозорість.',
		"hero.subtitle": 'Лояльність споживачів через підвищену прозорість',
		"hero.qr": 'СКАНУВАТИ ДЛЯ ПЕРЕВІРКИ',
		"hero.tagline": 'Не фейк. Не «можливо». Просто genu.im.',
		"footer.tagline": 'Створення довіри через прозорість',
		"nav.perevirProduct": 'Перевір продукт',
		"footer.perevirProduct": 'Перевір продукт',
	}
};

function setLang(lang) {
	document.documentElement.lang = lang;
	localStorage.setItem("lang", lang);

	document.querySelectorAll("[data-i18n]").forEach(el => {
		const key = el.getAttribute("data-i18n");
		if (translations[lang] && translations[lang][key]) {
			el.textContent = translations[lang][key];
		}
	});

	const label = document.getElementById("langLabel");
	if (label) label.textContent = lang.toUpperCase();
}

// При загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
	const savedLang = localStorage.getItem("lang") || "uk";
	setLang(savedLang);

	const toggle = document.getElementById("langToggle");
	if (toggle) {
		toggle.addEventListener("click", () => {
			const current = document.documentElement.lang;
			const next = current === "uk" ? "en" : "uk";
			setLang(next);
		});
	}
});