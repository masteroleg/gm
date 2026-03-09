describe("theme toggle controller", () => {
	let mediaQuery;
	let changeHandler;
	let originalGetItem;
	let originalSetItem;
	let originalRemoveItem;
	let warnSpy;

	const loadModules = () => {
		jest.resetModules();
		const langModule = require("../site/assets/js/lang-toggle");
		const themeModule = require("../site/assets/js/theme-toggle");
		return { langModule, themeModule };
	};

	beforeEach(() => {
		document.documentElement.lang = "en";
		document.documentElement.className = "";
		document.documentElement.removeAttribute("data-theme");
		document.documentElement.removeAttribute("data-theme-preference");
		delete window.gmSiteI18n;
		localStorage.clear();

		changeHandler = null;
		mediaQuery = {
			matches: false,
			addEventListener: jest.fn((eventName, callback) => {
				if (eventName === "change") {
					changeHandler = callback;
				}
			}),
			removeEventListener: jest.fn(),
		};

		window.matchMedia = jest.fn().mockReturnValue(mediaQuery);

		warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
		originalGetItem = localStorage.getItem;
		originalSetItem = localStorage.setItem;
		originalRemoveItem = localStorage.removeItem;
	});

	afterEach(() => {
		localStorage.getItem = originalGetItem;
		localStorage.setItem = originalSetItem;
		localStorage.removeItem = originalRemoveItem;
		warnSpy.mockRestore();
	});

	test("uses system theme when no explicit preference exists", () => {
		mediaQuery.matches = true;
		document.body.innerHTML = `<button id="themeToggle"></button>`;

		loadModules();

		const themeToggle = document.getElementById("themeToggle");

		expect(document.documentElement.classList.contains("dark")).toBe(true);
		expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
		expect(document.documentElement.getAttribute("data-theme-preference")).toBe(
			"system",
		);
		expect(themeToggle.getAttribute("aria-pressed")).toBe("true");
		expect(themeToggle.getAttribute("aria-label")).toBe("Switch to light mode");
		expect(localStorage.getItem("theme")).toBeNull();
	});

	test("clicking the toggle stores an explicit preference", () => {
		document.body.innerHTML = `<button id="themeToggle"></button>`;

		loadModules();

		const themeToggle = document.getElementById("themeToggle");
		themeToggle.click();

		expect(localStorage.getItem("theme")).toBe("dark");
		expect(document.documentElement.classList.contains("dark")).toBe(true);
		expect(document.documentElement.getAttribute("data-theme-preference")).toBe(
			"dark",
		);
		expect(themeToggle.getAttribute("aria-pressed")).toBe("true");
	});

	test("follows system changes only while preference is implicit", () => {
		document.body.innerHTML = `<button id="themeToggle"></button>`;

		loadModules();

		mediaQuery.matches = true;
		changeHandler({ matches: true });

		expect(document.documentElement.classList.contains("dark")).toBe(true);
		expect(localStorage.getItem("theme")).toBeNull();

		document.getElementById("themeToggle").click();
		mediaQuery.matches = false;
		changeHandler({ matches: false });

		expect(localStorage.getItem("theme")).toBe("light");
		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});

	test("updates labels when language changes", () => {
		document.body.innerHTML = `
			<button id="langToggle"><span id="langLabel"></span></button>
			<button id="themeToggle"></button>
		`;

		const { langModule } = loadModules();
		langModule.setLang("uk", { persist: false });

		const themeToggle = document.getElementById("themeToggle");
		expect(themeToggle.getAttribute("aria-label")).toBe("Увімкнути темну тему");

		themeToggle.click();
		expect(themeToggle.getAttribute("aria-label")).toBe(
			"Увімкнути світлу тему",
		);
	});

	test("fails soft when storage access throws", () => {
		document.body.innerHTML = `<button id="themeToggle"></button>`;
		localStorage.getItem = jest.fn(() => {
			throw new Error("blocked");
		});
		localStorage.setItem = jest.fn(() => {
			throw new Error("blocked");
		});

		expect(() => {
			loadModules();
			document.getElementById("themeToggle").click();
		}).not.toThrow();

		expect(document.documentElement.getAttribute("data-theme")).toBeTruthy();
	});

	test("fails soft when the toggle is absent", () => {
		document.body.innerHTML = "";

		expect(() => {
			loadModules();
		}).not.toThrow();
	});
});
