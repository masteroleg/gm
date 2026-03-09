const THEME_STORAGE_KEY = "theme";
const THEME_DARK_CLASS = "dark";

const getThemeToggleButton = () => document.getElementById("themeToggle");

const isThemePreference = (value) => value === "light" || value === "dark";

const readThemePreference = () => {
	try {
		const value = localStorage.getItem(THEME_STORAGE_KEY);
		return isThemePreference(value) ? value : null;
	} catch (error) {
		console.warn("Unable to read theme preference", error);
		return null;
	}
};

const writeThemePreference = (value) => {
	try {
		if (isThemePreference(value)) {
			localStorage.setItem(THEME_STORAGE_KEY, value);
		} else {
			localStorage.removeItem(THEME_STORAGE_KEY);
		}
	} catch (error) {
		console.warn("Unable to save theme preference", error);
	}
};

const getSystemPrefersDark = () => {
	try {
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	} catch (error) {
		console.warn("Unable to read system theme preference", error);
		return false;
	}
};

const resolveThemeState = (preference) => {
	const themePreference = isThemePreference(preference) ? preference : "system";
	const resolvedTheme =
		themePreference === "system"
			? getSystemPrefersDark()
				? "dark"
				: "light"
			: themePreference;

	return {
		themePreference,
		resolvedTheme,
		isDark: resolvedTheme === "dark",
	};
};

const translateThemeLabel = (key, fallback) => {
	const i18n = window.gmSiteI18n;
	if (i18n && typeof i18n.t === "function") {
		return i18n.t(key) || fallback;
	}
	return fallback;
};

const syncThemeToggleLabels = (themeToggle, isDark) => {
	if (!themeToggle) {
		return;
	}

	const currentLabel = themeToggle.getAttribute("aria-label") || "";
	const currentTitle = themeToggle.getAttribute("title") || currentLabel;
	const ariaLabel = translateThemeLabel(
		isDark ? "controls.theme.switchToLight" : "controls.theme.switchToDark",
		currentLabel,
	);
	const title = translateThemeLabel(
		isDark ? "controls.theme.titleToLight" : "controls.theme.titleToDark",
		currentTitle,
	);

	themeToggle.setAttribute("aria-pressed", String(isDark));
	themeToggle.setAttribute("aria-label", ariaLabel);
	themeToggle.setAttribute("title", title);
};

const applyThemeState = (state) => {
	const html = document.documentElement;
	const themeToggle = getThemeToggleButton();

	html.classList.toggle(THEME_DARK_CLASS, state.isDark);
	html.setAttribute("data-theme", state.resolvedTheme);
	html.setAttribute("data-theme-preference", state.themePreference);

	syncThemeToggleLabels(themeToggle, state.isDark);
};

const initThemeToggle = () => {
	const themeToggle = getThemeToggleButton();
	if (!themeToggle) {
		return;
	}

	const applyCurrentTheme = () => {
		applyThemeState(resolveThemeState(readThemePreference()));
	};

	applyCurrentTheme();

	themeToggle.addEventListener("click", () => {
		const nextPreference = document.documentElement.classList.contains(
			THEME_DARK_CLASS,
		)
			? "light"
			: "dark";

		writeThemePreference(nextPreference);
		applyCurrentTheme();
	});

	document.addEventListener("gm:lang-change", applyCurrentTheme);

	try {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", () => {
			if (!readThemePreference()) {
				applyCurrentTheme();
			}
		});
	} catch (error) {
		console.warn("Unable to subscribe to system theme changes", error);
	}
};

initThemeToggle();

if (typeof module !== "undefined") {
	module.exports = {
		applyThemeState,
		initThemeToggle,
		isThemePreference,
		readThemePreference,
		resolveThemeState,
		syncThemeToggleLabels,
		writeThemePreference,
	};
}
