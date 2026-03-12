describe("language toggle controller", () => {
	let originalGetItem;
	let originalSetItem;
	let warnSpy;

	const loadModule = () => {
		jest.resetModules();
		return require("../site/assets/js/lang-toggle");
	};

	beforeEach(() => {
		document.documentElement.lang = "en";
		delete window.gmSiteI18n;
		localStorage.clear();
		warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
		originalGetItem = localStorage.getItem;
		originalSetItem = localStorage.setItem;
	});

	afterEach(() => {
		localStorage.getItem = originalGetItem;
		localStorage.setItem = originalSetItem;
		warnSpy.mockRestore();
	});

	test("applies the default document language without persisting it", () => {
		document.body.innerHTML = `
			<button id="langToggle"><span id="langLabel"></span></button>
			<p data-i18n="hero.eyebrow"></p>
			<p data-i18n-aria-label="hero.proofNoteAria"></p>
		`;

		loadModule();

		expect(document.documentElement.lang).toBe("en");
		expect(document.querySelector("[data-i18n]").textContent).toBe(
			"Public proof for marked products",
		);
		expect(
			document
				.querySelector("[data-i18n-aria-label]")
				.getAttribute("aria-label"),
		).toBe("NDA case. Scale in plain sight.");
		expect(document.getElementById("langLabel").textContent).toBe("EN");
		expect(localStorage.getItem("lang")).toBeNull();
	});

	test("uses the saved language preference when available", () => {
		localStorage.setItem("lang", "uk");
		document.body.innerHTML = `
			<button id="langToggle"><span id="langLabel"></span></button>
			<p data-i18n="hero.eyebrow"></p>
		`;

		loadModule();

		expect(document.documentElement.lang).toBe("uk");
		expect(document.querySelector("[data-i18n]").textContent).toContain(
			"доказ",
		);
		expect(
			document.getElementById("langToggle").getAttribute("aria-label"),
		).toBe("Мова: UA. Натисніть, щоб перемкнути.");
	});

	test("toggles language and persists the explicit user choice", () => {
		document.body.innerHTML = `
			<button id="langToggle"><span id="langLabel"></span></button>
			<p data-i18n="hero.eyebrow"></p>
		`;

		loadModule();

		document.getElementById("langToggle").click();

		expect(document.documentElement.lang).toBe("uk");
		expect(localStorage.getItem("lang")).toBe("uk");
		expect(document.getElementById("langLabel").textContent).toBe("UA");
		expect(document.querySelector("[data-i18n]").textContent).toContain(
			"доказ",
		);
	});

	test("exposes translation helpers for other controllers", () => {
		document.body.innerHTML = `
			<button id="langToggle"><span id="langLabel"></span></button>
		`;

		loadModule();

		expect(typeof window.gmSiteI18n.t).toBe("function");
		expect(window.gmSiteI18n.t("controls.menu.open", "uk")).toBe(
			"Відкрити меню",
		);
	});

	test("fails soft when storage access throws", () => {
		document.body.innerHTML = `
			<button id="langToggle"><span id="langLabel"></span></button>
		`;
		localStorage.getItem = jest.fn(() => {
			throw new Error("blocked");
		});
		localStorage.setItem = jest.fn(() => {
			throw new Error("blocked");
		});

		expect(() => {
			loadModule();
			document.getElementById("langToggle").click();
		}).not.toThrow();

		expect(document.documentElement.lang).toBe("uk");
	});

	test("fails soft when toggle markup is absent", () => {
		document.body.innerHTML = `<p data-i18n="hero.eyebrow"></p>`;

		expect(() => {
			loadModule();
		}).not.toThrow();

		expect(document.querySelector("[data-i18n]").textContent).toBe(
			"Public proof for marked products",
		);
	});
});
