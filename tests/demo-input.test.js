describe("demo-input controller", () => {
	const loadModule = () => {
		jest.resetModules();
		return require("../site/assets/js/demo-input");
	};

	beforeEach(() => {
		document.body.innerHTML = "";
	});

	// ── Fail-soft init ──────────────────────────────────────────────

	test("fails soft when form markup is absent", () => {
		expect(() => {
			loadModule();
		}).not.toThrow();
	});

	test("fails soft when input field is absent inside the form", () => {
		document.body.innerHTML = `<form id="demoInputForm"></form>`;
		expect(() => {
			loadModule();
		}).not.toThrow();
	});

	// ── resolveDestination ──────────────────────────────────────────

	test("resolveDestination returns /v/genuim/ for approved example code (exact)", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination("GM-GENUIM-2026")).toBe(
			DEMO_DESTINATIONS.example,
		);
	});

	test("resolveDestination is case-insensitive for approved code", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination("gm-genuim-2026")).toBe(
			DEMO_DESTINATIONS.example,
		);
		expect(resolveDestination("Gm-Genuim-2026")).toBe(
			DEMO_DESTINATIONS.example,
		);
	});

	test("resolveDestination trims whitespace before comparing", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination("  GM-GENUIM-2026  ")).toBe(
			DEMO_DESTINATIONS.example,
		);
	});

	test("resolveDestination returns /v/ for an unknown code", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination("UNKNOWN-CODE-999")).toBe(
			DEMO_DESTINATIONS.fallback,
		);
	});

	test("resolveDestination returns /v/ for empty string", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination("")).toBe(DEMO_DESTINATIONS.fallback);
	});

	test("resolveDestination returns /v/ for whitespace-only input", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination("   ")).toBe(DEMO_DESTINATIONS.fallback);
	});

	test("resolveDestination returns /v/ for null/undefined input", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination(null)).toBe(DEMO_DESTINATIONS.fallback);
		expect(resolveDestination(undefined)).toBe(DEMO_DESTINATIONS.fallback);
	});

	// ── Edge cases: invalid and non-string input ────────────────────

	test("resolveDestination returns /v/ for numeric input", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination(0)).toBe(DEMO_DESTINATIONS.fallback);
		expect(resolveDestination(2026)).toBe(DEMO_DESTINATIONS.fallback);
	});

	test("resolveDestination returns /v/ for boolean input", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination(true)).toBe(DEMO_DESTINATIONS.fallback);
		expect(resolveDestination(false)).toBe(DEMO_DESTINATIONS.fallback);
	});

	test("resolveDestination returns /v/ for object/array input", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination({})).toBe(DEMO_DESTINATIONS.fallback);
		expect(resolveDestination([])).toBe(DEMO_DESTINATIONS.fallback);
	});

	test("resolveDestination returns /v/ for special characters", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination("<script>alert(1)</script>")).toBe(
			DEMO_DESTINATIONS.fallback,
		);
		expect(resolveDestination("'; DROP TABLE--")).toBe(
			DEMO_DESTINATIONS.fallback,
		);
		expect(resolveDestination("../../etc/passwd")).toBe(
			DEMO_DESTINATIONS.fallback,
		);
	});

	test("resolveDestination returns /v/ for very long input", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		const longInput = "A".repeat(10000);
		expect(resolveDestination(longInput)).toBe(DEMO_DESTINATIONS.fallback);
	});

	test("resolveDestination matches approved code with embedded newline (whitespace is stripped)", () => {
		// Newline is whitespace — stripped by normalization — so result matches approved code.
		// This is deliberate: /\s+/g covers \n, \t, \r, spaces. Documented behavior.
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination("GM-GENUIM\n-2026")).toBe(
			DEMO_DESTINATIONS.example,
		);
	});

	test("resolveDestination does not match partial approved code", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination("GM-GENUIM")).toBe(DEMO_DESTINATIONS.fallback);
		expect(resolveDestination("GENUIM-2026")).toBe(DEMO_DESTINATIONS.fallback);
		expect(resolveDestination("GM-GENUIM-2026-EXTRA")).toBe(
			DEMO_DESTINATIONS.fallback,
		);
	});

	test("resolveDestination returns /v/ for dashes-only input", () => {
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination("---")).toBe(DEMO_DESTINATIONS.fallback);
	});

	test("resolveDestination returns /v/ for unicode lookalike input", () => {
		// Cyrillic 'с' (U+0441) instead of Latin 'c' — visually similar
		const { resolveDestination, DEMO_DESTINATIONS } = loadModule();
		expect(resolveDestination("GM-GENUIM-2О26")).toBe(
			DEMO_DESTINATIONS.fallback,
		); // Cyrillic О instead of 0
	});

	// ── DEMO_EXAMPLE_CODE constant ──────────────────────────────────

	test("DEMO_EXAMPLE_CODE is defined as a single named constant", () => {
		const { DEMO_EXAMPLE_CODE } = loadModule();
		expect(typeof DEMO_EXAMPLE_CODE).toBe("string");
		expect(DEMO_EXAMPLE_CODE.length).toBeGreaterThan(0);
	});

	// ── Form submit navigation (via injected navFn) ─────────────────

	test("form submit with approved code calls navFn with /v/genuim/", () => {
		document.body.innerHTML = `
			<form id="demoInputForm">
				<input class="demo-input__field" type="text" id="demoCode" value="GM-GENUIM-2026" />
				<button class="demo-input__submit" type="submit">See result</button>
			</form>
		`;

		const { initDemoInput } = loadModule();
		const mockNav = jest.fn();
		initDemoInput(mockNav);

		const form = document.getElementById("demoInputForm");
		form.dispatchEvent(
			new Event("submit", { bubbles: true, cancelable: true }),
		);

		expect(mockNav).toHaveBeenCalledWith("/v/genuim/");
	});

	test("form submit with unknown code calls navFn with /v/", () => {
		document.body.innerHTML = `
			<form id="demoInputForm">
				<input class="demo-input__field" type="text" id="demoCode" value="RANDOM-CODE-XYZ" />
				<button class="demo-input__submit" type="submit">See result</button>
			</form>
		`;

		const { initDemoInput } = loadModule();
		const mockNav = jest.fn();
		initDemoInput(mockNav);

		const form = document.getElementById("demoInputForm");
		form.dispatchEvent(
			new Event("submit", { bubbles: true, cancelable: true }),
		);

		expect(mockNav).toHaveBeenCalledWith("/v/");
	});

	test("form submit with empty value calls navFn with /v/", () => {
		document.body.innerHTML = `
			<form id="demoInputForm">
				<input class="demo-input__field" type="text" id="demoCode" value="" />
				<button class="demo-input__submit" type="submit">See result</button>
			</form>
		`;

		const { initDemoInput } = loadModule();
		const mockNav = jest.fn();
		initDemoInput(mockNav);

		const form = document.getElementById("demoInputForm");
		form.dispatchEvent(
			new Event("submit", { bubbles: true, cancelable: true }),
		);

		expect(mockNav).toHaveBeenCalledWith("/v/");
	});

	test("form submit with case-variant approved code calls navFn with /v/genuim/", () => {
		document.body.innerHTML = `
			<form id="demoInputForm">
				<input class="demo-input__field" type="text" id="demoCode" value="gm-genuim-2026" />
				<button class="demo-input__submit" type="submit">See result</button>
			</form>
		`;

		const { initDemoInput } = loadModule();
		const mockNav = jest.fn();
		initDemoInput(mockNav);

		const form = document.getElementById("demoInputForm");
		form.dispatchEvent(
			new Event("submit", { bubbles: true, cancelable: true }),
		);

		expect(mockNav).toHaveBeenCalledWith("/v/genuim/");
	});

	// ── Non-live constraint guard ───────────────────────────────────

	test("controller source has no fetch, XMLHttpRequest, or async lookup", () => {
		const fs = require("node:fs");
		const path = require("node:path");
		const src = fs.readFileSync(
			path.join(__dirname, "../site/assets/js/demo-input.js"),
			"utf-8",
		);
		expect(src).not.toMatch(/fetch\s*\(/);
		expect(src).not.toMatch(/XMLHttpRequest/);
		expect(src).not.toMatch(/async\s+/);
		expect(src).not.toMatch(/await\s+/);
		expect(src).not.toMatch(/history\.pushState/);
		expect(src).not.toMatch(/history\.replaceState/);
	});
});
