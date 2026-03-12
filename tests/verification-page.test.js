describe("verification page controller", () => {
	const loadModule = () => {
		jest.resetModules();
		return require("../site/assets/js/verification-page");
	};

	beforeEach(() => {
		document.body.innerHTML = "";
	});

	test("fails soft when proof page markup is absent", () => {
		expect(() => {
			loadModule();
		}).not.toThrow();
	});

	test("keeps required proof sections visible", () => {
		document.body.innerHTML = `
			<main data-proof-page>
				<section data-proof-section data-proof-required="always">
					<p data-proof-content>Proof available</p>
				</section>
			</main>
		`;

		loadModule();

		expect(document.querySelector("[data-proof-section]").hidden).toBe(false);
	});

	test("hides optional proof sections when content is empty", () => {
		document.body.innerHTML = `
			<main data-proof-page>
				<section data-proof-section>
					<p data-proof-content>   </p>
				</section>
			</main>
		`;

		loadModule();

		expect(document.querySelector("[data-proof-section]").hidden).toBe(true);
	});

	test("shows an optional section when approved evidence exists", () => {
		document.body.innerHTML = `
			<main data-proof-page>
				<section data-proof-section>
					<a data-proof-evidence href="/proof-cases/">Public case note</a>
				</section>
			</main>
		`;

		loadModule();

		expect(document.querySelector("[data-proof-evidence]").hidden).toBe(false);
		expect(document.querySelector("[data-proof-section]").hidden).toBe(false);
	});

	test("hides invalid evidence links and the empty parent section", () => {
		document.body.innerHTML = `
			<main data-proof-page>
				<section data-proof-section>
					<a data-proof-evidence href="">   </a>
				</section>
			</main>
		`;

		loadModule();

		expect(document.querySelector("[data-proof-evidence]").hidden).toBe(true);
		expect(document.querySelector("[data-proof-section]").hidden).toBe(true);
	});
});
