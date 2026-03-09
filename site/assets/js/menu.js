const MENU_OPEN_CLASS = "hidden";

const translateMenuLabel = (key, fallback) => {
	const i18n = window.gmSiteI18n;
	if (i18n && typeof i18n.t === "function") {
		return i18n.t(key) || fallback;
	}
	return fallback;
};

const syncMenuState = (elements, isOpen) => {
	const { burgerBtn, closeMenu, mainNav } = elements;
	const burgerFallbackLabel = burgerBtn.getAttribute("aria-label") || "";
	const closeFallbackLabel =
		closeMenu.getAttribute("aria-label") || burgerFallbackLabel;

	mainNav.classList.toggle(MENU_OPEN_CLASS, !isOpen);
	burgerBtn.setAttribute("aria-expanded", String(isOpen));
	burgerBtn.setAttribute(
		"aria-label",
		translateMenuLabel(
			isOpen ? "controls.menu.close" : "controls.menu.open",
			burgerFallbackLabel,
		),
	);
	closeMenu.setAttribute(
		"aria-label",
		translateMenuLabel("controls.menu.close", closeFallbackLabel),
	);
};

const initMenu = () => {
	const burgerBtn = document.getElementById("burgerBtn");
	const closeMenu = document.getElementById("closeMenu");
	const mainNav = document.getElementById("mainNav");

	if (!burgerBtn || !closeMenu || !mainNav) {
		return;
	}

	const elements = { burgerBtn, closeMenu, mainNav };

	syncMenuState(elements, !mainNav.classList.contains(MENU_OPEN_CLASS));

	burgerBtn.addEventListener("click", () => {
		syncMenuState(elements, mainNav.classList.contains(MENU_OPEN_CLASS));
	});

	closeMenu.addEventListener("click", () => {
		syncMenuState(elements, false);
	});

	document.addEventListener("gm:lang-change", () => {
		syncMenuState(elements, !mainNav.classList.contains(MENU_OPEN_CLASS));
	});
};

initMenu();

if (typeof module !== "undefined") {
	module.exports = {
		initMenu,
		syncMenuState,
	};
}
