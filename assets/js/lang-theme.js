// --- Theme toggle ---
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

// Сначала применяем сохранённую тему или системную
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
	html.classList.add("dark");
	themeToggle.checked = true;
} else {
	html.classList.remove("dark");
	themeToggle.checked = false;
}

// Обработчик переключателя
themeToggle.addEventListener("change", () => {
	const isDark = themeToggle.checked;
	if (isDark) {
		html.classList.add("dark");
		localStorage.setItem("theme", "dark");
	} else {
		html.classList.remove("dark");
		localStorage.setItem("theme", "light");
	}
});
