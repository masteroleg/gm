describe("menu controller", () => {
	const loadScripts = () => {
		jest.resetModules();
		const langModule = require("../site/assets/js/lang-toggle");
		const menuModule = require("../site/assets/js/menu");
		return { langModule, menuModule };
	};

	beforeEach(() => {
		document.documentElement.lang = "en";
		localStorage.clear();
	});

	test("opens and closes the mobile menu while syncing aria-expanded", () => {
		document.body.innerHTML = `
			<nav id="mainNav" class="hidden"></nav>
			<button id="burgerBtn" aria-expanded="false"></button>
			<button id="closeMenu"></button>
		`;

		loadScripts();

		const mainNav = document.getElementById("mainNav");
		const burgerBtn = document.getElementById("burgerBtn");
		const closeMenu = document.getElementById("closeMenu");

		expect(mainNav.classList.contains("hidden")).toBe(true);
		expect(burgerBtn.getAttribute("aria-expanded")).toBe("false");

		burgerBtn.click();

		expect(mainNav.classList.contains("hidden")).toBe(false);
		expect(burgerBtn.getAttribute("aria-expanded")).toBe("true");
		expect(burgerBtn.getAttribute("aria-label")).toBe("Close menu");
		expect(closeMenu.getAttribute("aria-label")).toBe("Close menu");

		closeMenu.click();

		expect(mainNav.classList.contains("hidden")).toBe(true);
		expect(burgerBtn.getAttribute("aria-expanded")).toBe("false");
		expect(burgerBtn.getAttribute("aria-label")).toBe("Open menu");
	});

	test("updates menu labels when language changes", () => {
		document.body.innerHTML = `
			<nav id="mainNav" class="hidden"></nav>
			<button id="burgerBtn" aria-expanded="false"></button>
			<button id="closeMenu"></button>
		`;

		const { langModule, menuModule } = loadScripts();

		langModule.setLang("uk", { persist: false });

		const burgerBtn = document.getElementById("burgerBtn");
		const closeMenu = document.getElementById("closeMenu");

		expect(burgerBtn.getAttribute("aria-label")).toBe("Відкрити меню");
		expect(closeMenu.getAttribute("aria-label")).toBe("Закрити меню");

		menuModule.syncMenuState(
			{
				burgerBtn,
				closeMenu,
				mainNav: document.getElementById("mainNav"),
			},
			true,
		);

		expect(burgerBtn.getAttribute("aria-label")).toBe("Закрити меню");
	});

	test("fails soft when required nodes are absent", () => {
		document.body.innerHTML = `<button id="burgerBtn"></button>`;

		expect(() => {
			loadScripts();
		}).not.toThrow();
	});
});
