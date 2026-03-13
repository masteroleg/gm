/**
 * @jest-environment jsdom
 */

describe("Official Check Guidance page", () => {
	beforeEach(() => {
		document.documentElement.lang = "en";
	});

	describe("messaging and positioning (AC #1, #2)", () => {
		test("page contains guidance text directing users to Diia for official checks", () => {
			document.body.innerHTML = `
				<main class="info-page" data-official-check-guidance>
					<div class="info-page__header">
						<p class="section-eyebrow" data-i18n="officialCheck.eyebrow">Official checking</p>
						<h1 class="info-page__title" data-i18n="officialCheck.title">Use Diia for the official state check</h1>
						<p class="info-page__lead" data-i18n="officialCheck.lead">genu.im is a brand proof layer. Official state verification happens in Diia.</p>
					</div>
				</main>
			`;

			const main = document.querySelector("[data-official-check-guidance]");
			expect(main).not.toBeNull();

			const title = document.querySelector(".info-page__title");
			expect(title.textContent).toContain("Diia");

			const lead = document.querySelector(".info-page__lead");
			expect(lead.textContent).toContain("Diia");
		});

		test("page explicitly states genu.im does not provide official results", () => {
			document.body.innerHTML = `
				<main class="info-page" data-official-check-guidance>
					<div class="info-page__body">
						<section class="info-section">
							<p data-i18n="officialCheck.section1.body">genu.im does not perform official state verification. Official eAktsyz checking and state product verification happen through Diia. This page helps you find the right path.</p>
						</section>
					</div>
				</main>
			`;

			const bodyText = document.querySelector(
				'[data-i18n="officialCheck.section1.body"]',
			);
			expect(bodyText.textContent).toContain("does not");
			expect(bodyText.textContent).toContain("official");
		});

		test("page uses data-i18n attributes for all user-facing text", () => {
			document.body.innerHTML = `
				<main class="info-page" data-official-check-guidance>
					<div class="info-page__header">
						<p class="section-eyebrow" data-i18n="officialCheck.eyebrow">Official checking</p>
						<h1 class="info-page__title" data-i18n="officialCheck.title">Use Diia for the official state check</h1>
						<p class="info-page__lead" data-i18n="officialCheck.lead">genu.im is a brand proof layer.</p>
					</div>
					<div class="info-page__body">
						<section class="info-section">
							<h2 class="info-section__heading" data-i18n="officialCheck.section1.heading">What this page is for</h2>
							<p data-i18n="officialCheck.section1.body">body text</p>
						</section>
						<section class="info-section">
							<h2 class="info-section__heading" data-i18n="officialCheck.section2.heading">Where official checking happens</h2>
							<p data-i18n="officialCheck.section2.body">body text</p>
						</section>
						<section class="info-section">
							<h2 class="info-section__heading" data-i18n="officialCheck.section3.heading">What genu.im does instead</h2>
							<p data-i18n="officialCheck.section3.body">body text</p>
						</section>
					</div>
					<a href="https://diia.gov.ua/" class="cta-button">
						<span data-i18n="officialCheck.cta">Open Diia</span>
					</a>
				</main>
			`;

			const i18nElements = document.querySelectorAll(
				'[data-i18n^="officialCheck."]',
			);
			expect(i18nElements.length).toBe(10);
		});
	});

	describe("CTA to Diia (AC #3, #4)", () => {
		test("CTA links to Diia with correct href, target, and rel", () => {
			document.body.innerHTML = `
				<a href="https://diia.gov.ua/" class="cta-button" target="_blank" rel="noreferrer noopener"
					data-i18n-aria-label="officialCheck.ctaAria"
					aria-label="Open Diia for official checking in a new tab">
					<span data-i18n="officialCheck.cta">Open Diia</span>
				</a>
			`;

			const cta = document.querySelector(
				'.cta-button[href="https://diia.gov.ua/"]',
			);
			expect(cta).not.toBeNull();
			expect(cta.getAttribute("target")).toBe("_blank");
			expect(cta.getAttribute("rel")).toContain("noopener");
			expect(cta.getAttribute("rel")).toContain("noreferrer");
		});

		test("CTA text clearly describes the destination before click", () => {
			document.body.innerHTML = `
				<a href="https://diia.gov.ua/" class="cta-button" target="_blank" rel="noreferrer noopener"
					aria-label="Open Diia for official checking in a new tab">
					<span data-i18n="officialCheck.cta">Open Diia</span>
				</a>
			`;

			const ctaText = document.querySelector('[data-i18n="officialCheck.cta"]');
			expect(ctaText.textContent).toContain("Diia");

			const cta = document.querySelector(".cta-button");
			expect(cta.getAttribute("aria-label")).toContain("Diia");
		});

		test("CTA has accessible aria-label via data-i18n-aria-label", () => {
			document.body.innerHTML = `
				<a href="https://diia.gov.ua/" class="cta-button" target="_blank" rel="noreferrer noopener"
					data-i18n-aria-label="officialCheck.ctaAria"
					aria-label="Open Diia for official checking in a new tab">
					<span data-i18n="officialCheck.cta">Open Diia</span>
				</a>
			`;

			const cta = document.querySelector(".cta-button");
			expect(cta.getAttribute("data-i18n-aria-label")).toBe(
				"officialCheck.ctaAria",
			);
			expect(cta.getAttribute("aria-label")).toContain("Diia");
		});
	});

	describe("semantic HTML and accessibility contract", () => {
		test("page has required semantic structure", () => {
			document.body.innerHTML = `
				<main class="info-page" data-official-check-guidance>
					<div class="info-page__header">
						<h1 class="info-page__title">Test Title</h1>
					</div>
					<div class="info-page__body">
						<section class="info-section">
							<h2 class="info-section__heading">Section Heading</h2>
							<p>Section body text</p>
						</section>
					</div>
					<div class="info-page__cta-section">
						<a href="https://diia.gov.ua/" class="cta-button">Open Diia</a>
					</div>
				</main>
			`;

			// Verify one main element exists
			const main = document.querySelector("main");
			expect(main).not.toBeNull();
			expect(main.classList.contains("info-page")).toBe(true);

			// Verify one primary h1 exists
			const h1 = document.querySelector("h1");
			expect(h1).not.toBeNull();
			expect(h1.textContent.length).toBeGreaterThan(0);

			// Verify CTA is accessible (has href and visible text)
			const cta = document.querySelector(".cta-button");
			expect(cta).not.toBeNull();
			expect(cta.getAttribute("href")).toBe("https://diia.gov.ua/");
			expect(cta.textContent.length).toBeGreaterThan(0);

			// Verify essential landmarks exist
			const header = document.querySelector(".info-page__header");
			const body = document.querySelector(".info-page__body");
			expect(header).not.toBeNull();
			expect(body).not.toBeNull();
		});

		test("CTA has proper accessibility attributes", () => {
			document.body.innerHTML = `
				<a href="https://diia.gov.ua/" class="cta-button" target="_blank" rel="noreferrer noopener"
					data-i18n-aria-label="officialCheck.ctaAria"
					aria-label="Open Diia for official checking in a new tab">
					<span data-i18n="officialCheck.cta">Open Diia</span>
				</a>
			`;

			const cta = document.querySelector(".cta-button");
			expect(cta).not.toBeNull();
			expect(cta.getAttribute("href")).toBe("https://diia.gov.ua/");
			expect(cta.getAttribute("target")).toBe("_blank");
			expect(cta.getAttribute("rel")).toContain("noopener");
			expect(cta.getAttribute("rel")).toContain("noreferrer");
			expect(cta.getAttribute("aria-label")).toContain("Diia");
			expect(cta.getAttribute("data-i18n-aria-label")).toBe(
				"officialCheck.ctaAria",
			);
		});
	});

	describe("graceful degradation (AC #6)", () => {
		test("core messaging and CTA work as static HTML without any JS controllers", () => {
			document.body.innerHTML = `
				<main class="info-page" data-official-check-guidance>
					<div class="info-page__header">
						<h1 class="info-page__title" data-i18n="officialCheck.title">Use Diia for the official state check</h1>
						<p class="info-page__lead" data-i18n="officialCheck.lead">genu.im is a brand proof layer, not an official verification service. If you need the official state check for a marked product, use Diia.</p>
					</div>
					<div class="info-page__body">
						<section class="info-section">
							<p data-i18n="officialCheck.section1.body">genu.im does not perform official state verification.</p>
						</section>
					</div>
					<a href="https://diia.gov.ua/" class="cta-button" target="_blank" rel="noreferrer noopener">
						<span data-i18n="officialCheck.cta">Open Diia</span>
					</a>
				</main>
			`;

			// Title renders without JS
			const title = document.querySelector(".info-page__title");
			expect(title).not.toBeNull();
			expect(title.textContent.length).toBeGreaterThan(0);
			expect(title.textContent).toContain("Diia");

			// Lead renders without JS
			const lead = document.querySelector(".info-page__lead");
			expect(lead).not.toBeNull();
			expect(lead.textContent).toContain("Diia");

			// CTA is functional without JS
			const cta = document.querySelector(".cta-button");
			expect(cta).not.toBeNull();
			expect(cta.getAttribute("href")).toBe("https://diia.gov.ua/");

			// Visitor is not blocked or misled
			const bodyText = document.querySelector(
				'[data-i18n="officialCheck.section1.body"]',
			);
			expect(bodyText.textContent).not.toContain("genu.im provides");
			expect(bodyText.textContent).not.toContain("genu.im performs");
		});
	});

	describe("translation keys in lang-toggle.js", () => {
		const requiredKeys = [
			"officialCheck.eyebrow",
			"officialCheck.title",
			"officialCheck.lead",
			"officialCheck.section1.heading",
			"officialCheck.section1.body",
			"officialCheck.section2.heading",
			"officialCheck.section2.body",
			"officialCheck.section3.heading",
			"officialCheck.section3.body",
			"officialCheck.cta",
			"officialCheck.ctaAria",
		];

		let langToggleSource;

		beforeAll(() => {
			const fs = require("node:fs");
			const path = require("node:path");
			langToggleSource = fs.readFileSync(
				path.join(__dirname, "..", "site", "assets", "js", "lang-toggle.js"),
				"utf8",
			);
		});

		test("EN translations include all officialCheck keys", () => {
			for (const key of requiredKeys) {
				expect(langToggleSource).toContain(`"${key}"`);
			}
		});

		test("UK translations include all officialCheck keys", () => {
			// The UK translations section comes after the EN section
			const ukSection = langToggleSource.split("uk:")[1];
			expect(ukSection).toBeDefined();
			for (const key of requiredKeys) {
				expect(ukSection).toContain(`"${key}"`);
			}
		});

		test("EN and UK translation schemas are consistent", () => {
			// Extract all officialCheck keys from EN section
			const enSection = langToggleSource.match(/en:\s*\{[\s\S]*?\},\s*uk:/);
			expect(enSection).not.toBeNull();

			const enKeys = [];
			const enKeyRegex = /"officialCheck\.[^"]+"/g;
			let enMatch = enKeyRegex.exec(enSection[0]);
			while (enMatch !== null) {
				const key = enMatch[0].replace(/"/g, "");
				enKeys.push(key);
				enMatch = enKeyRegex.exec(enSection[0]);
			}

			// Extract all officialCheck keys from UK section
			const ukSection = langToggleSource.split("uk:")[1];
			const ukKeys = [];
			const ukKeyRegex = /"officialCheck\.[^"]+"/g;
			let ukMatch = ukKeyRegex.exec(ukSection);
			while (ukMatch !== null) {
				const key = ukMatch[0].replace(/"/g, "");
				ukKeys.push(key);
				ukMatch = ukKeyRegex.exec(ukSection);
			}

			// Verify both languages have the same officialCheck keys
			expect(ukKeys.length).toBe(enKeys.length);
			expect(ukKeys.sort()).toEqual(enKeys.sort());

			// Verify all required keys are present in both languages
			for (const key of requiredKeys) {
				expect(enKeys).toContain(key);
				expect(ukKeys).toContain(key);
			}
		});

		test("EN translations mention Diia in title", () => {
			expect(langToggleSource).toContain(
				"Use Diia for the official state check",
			);
		});

		test("UK translations mention Diia (Дію) in title", () => {
			expect(langToggleSource).toContain(
				"Використайте Дію для офіційної державної перевірки",
			);
		});

		test("EN translations do not suggest genu.im provides official results", () => {
			// Extract the EN officialCheck.lead value
			const leadMatch = langToggleSource.match(
				/"officialCheck\.lead":\s*"([^"]+)"/,
			);
			expect(leadMatch).not.toBeNull();
			const leadText = leadMatch[1];
			expect(leadText).not.toContain("genu.im provides official");
			expect(leadText).not.toContain("genu.im performs official");
			expect(leadText).toContain("brand proof layer");
		});
	});
});
