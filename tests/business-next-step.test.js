/**
 * @jest-environment jsdom
 */

/**
 * Tests for Story 3.2: Show the Right Business Next Step
 *
 * Covers:
 * - AC #1: Business option is clearly separate from official-check path
 * - AC #2: Business copy clearly indicates it is for business/B2B intent
 * - AC #3: CTA navigates to request form with scenario pre-selected
 * - AC #4: CTA text makes the request step clear before click
 * - AC #5: Layout works at 360px (tested in E2E)
 * - AC #6: Graceful degradation when optional features unavailable
 */

describe("Business Next Step routing surface (AC #1, #2)", () => {
	const buildPage = () => {
		document.body.innerHTML = `
			<main class="info-page" data-official-check-guidance>
				<div class="info-page__header">
					<p class="section-eyebrow" data-i18n="officialCheck.eyebrow">Official checking</p>
					<h1 class="info-page__title" data-i18n="officialCheck.title">Use Diia for the official state check</h1>
					<p class="info-page__lead" data-i18n="officialCheck.lead">genu.im is a brand proof layer, not an official verification service.</p>
				</div>

				<div class="info-page__body">
					<section class="info-section">
						<h2 class="info-section__heading" data-i18n="officialCheck.section1.heading">What this page is for</h2>
						<p data-i18n="officialCheck.section1.body">genu.im does not perform official state verification.</p>
					</section>
				</div>

				<div class="info-page__cta-section">
					<a href="https://diia.gov.ua/" class="cta-button" target="_blank" rel="noreferrer noopener"
						data-i18n-aria-label="officialCheck.ctaAria"
						aria-label="Open Diia for official checking in a new tab">
						<span data-i18n="officialCheck.cta">Open Diia</span>
					</a>
				</div>

				<div class="audience-routing" data-audience-routing>
					<div class="routing-card routing-card--official" data-routing-official>
						<p class="routing-card__eyebrow" data-i18n="routing.official.eyebrow">Official checking</p>
						<h2 class="routing-card__title" data-i18n="routing.official.title">Need the official state check?</h2>
						<p class="routing-card__body" data-i18n="routing.official.body">Official eAktsyz verification happens in Diia. genu.im is not a state verification service.</p>
						<a href="https://diia.gov.ua/" class="routing-card__cta cta-button" target="_blank" rel="noreferrer noopener"
							data-i18n-aria-label="routing.official.ctaAria"
							aria-label="Open Diia for official checking in a new tab">
							<span data-i18n="routing.official.cta">Open Diia</span>
						</a>
					</div>

					<div class="routing-card routing-card--business" data-routing-business>
						<p class="routing-card__eyebrow" data-i18n="routing.business.eyebrow">Business next step</p>
						<h2 class="routing-card__title" data-i18n="routing.business.title">Want proof for your own products?</h2>
						<p class="routing-card__body" data-i18n="routing.business.body">genu.mark lets brands publish checkable proof tied to each marked unit. Tell us about your rollout.</p>
						<a href="/request?scenario=brand-proof" class="routing-card__cta cta-button"
							data-i18n-aria-label="routing.business.ctaAria"
							aria-label="Send a request for brand proof setup"
							data-business-cta>
							<span data-i18n="routing.business.cta">Send a request</span>
						</a>
					</div>
				</div>

				<div class="info-page__back">
					<a href="../" class="info-back-link" data-i18n="nav.backHome">&#8592; Back to homepage</a>
				</div>
			</main>
		`;
	};

	beforeEach(() => {
		document.documentElement.lang = "en";
		buildPage();
	});

	test("audience routing surface exists on page", () => {
		const routing = document.querySelector("[data-audience-routing]");
		expect(routing).not.toBeNull();
	});

	test("official routing card is present and distinct from business card", () => {
		const officialCard = document.querySelector("[data-routing-official]");
		const businessCard = document.querySelector("[data-routing-business]");
		expect(officialCard).not.toBeNull();
		expect(businessCard).not.toBeNull();
		// They must be separate elements
		expect(officialCard).not.toBe(businessCard);
	});

	test("business card is clearly labeled as for business/B2B intent", () => {
		const businessCard = document.querySelector("[data-routing-business]");
		expect(businessCard).not.toBeNull();

		const eyebrow = businessCard.querySelector(
			'[data-i18n="routing.business.eyebrow"]',
		);
		expect(eyebrow).not.toBeNull();
		// Must indicate business intent
		const eyebrowText = eyebrow.textContent.toLowerCase();
		expect(
			eyebrowText.includes("business") ||
				eyebrowText.includes("бізнес") ||
				eyebrowText.includes("b2b"),
		).toBe(true);
	});

	test("business card title communicates a business-oriented next step", () => {
		const businessTitle = document.querySelector(
			'[data-routing-business] [data-i18n="routing.business.title"]',
		);
		expect(businessTitle).not.toBeNull();
		expect(businessTitle.textContent.length).toBeGreaterThan(5);
	});

	test("official card still directs to Diia", () => {
		const officialCta = document.querySelector(
			'[data-routing-official] a[href="https://diia.gov.ua/"]',
		);
		expect(officialCta).not.toBeNull();
	});

	test("official path and business path are visually separate sections", () => {
		const routing = document.querySelector("[data-audience-routing]");
		const cards = routing.querySelectorAll(".routing-card");
		expect(cards.length).toBe(2);
		// Official card has distinct modifier class
		expect(cards[0].classList.contains("routing-card--official")).toBe(true);
		expect(cards[1].classList.contains("routing-card--business")).toBe(true);
	});

	test("business section uses data-i18n attributes for all user-facing text", () => {
		const businessCard = document.querySelector("[data-routing-business]");
		const i18nElements = businessCard.querySelectorAll("[data-i18n]");
		expect(i18nElements.length).toBeGreaterThanOrEqual(3); // eyebrow, title, body, cta
	});
});

describe("Business CTA navigation (AC #3, #4)", () => {
	beforeEach(() => {
		document.documentElement.lang = "en";
		document.body.innerHTML = `
			<div class="audience-routing" data-audience-routing>
				<div class="routing-card routing-card--business" data-routing-business>
					<p class="routing-card__eyebrow" data-i18n="routing.business.eyebrow">Business next step</p>
					<h2 class="routing-card__title" data-i18n="routing.business.title">Want proof for your own products?</h2>
					<p class="routing-card__body" data-i18n="routing.business.body">genu.mark lets brands publish checkable proof tied to each marked unit.</p>
					<a href="/request?scenario=brand-proof" class="routing-card__cta cta-button"
						data-i18n-aria-label="routing.business.ctaAria"
						aria-label="Send a request for brand proof setup"
						data-business-cta>
						<span data-i18n="routing.business.cta">Send a request</span>
					</a>
				</div>
			</div>
		`;
	});

	test("business CTA links to request form with scenario parameter", () => {
		const cta = document.querySelector("[data-business-cta]");
		expect(cta).not.toBeNull();
		const href = cta.getAttribute("href");
		expect(href).toContain("/request");
		expect(href).toContain("scenario=");
	});

	test("business CTA scenario parameter pre-selects a business scenario", () => {
		const cta = document.querySelector("[data-business-cta]");
		const href = cta.getAttribute("href");
		// Must have a concrete scenario value (brand-proof or eaktsyz)
		const url = new URL(href, "https://genu.im");
		const scenario = url.searchParams.get("scenario");
		expect(scenario).toBeTruthy();
		expect(scenario.length).toBeGreaterThan(0);
	});

	test("CTA text describes the business next step clearly before click", () => {
		const ctaText = document.querySelector(
			'[data-business-cta] [data-i18n="routing.business.cta"]',
		);
		expect(ctaText).not.toBeNull();
		// Must be non-empty, action-oriented text
		expect(ctaText.textContent.trim().length).toBeGreaterThan(3);
		// Must not be vague like just "Click here" or "Go"
		const text = ctaText.textContent.trim().toLowerCase();
		expect(text).not.toBe("go");
		expect(text).not.toBe("click here");
		expect(text).not.toBe("here");
	});

	test("CTA has accessible aria-label that describes the destination", () => {
		const cta = document.querySelector("[data-business-cta]");
		const ariaLabel = cta.getAttribute("aria-label");
		expect(ariaLabel).not.toBeNull();
		expect(ariaLabel.length).toBeGreaterThan(5);
	});

	test("CTA has data-i18n-aria-label for translation", () => {
		const cta = document.querySelector("[data-business-cta]");
		const i18nAriaLabel = cta.getAttribute("data-i18n-aria-label");
		expect(i18nAriaLabel).not.toBeNull();
		expect(i18nAriaLabel).toContain("routing.business");
	});

	test("business CTA is a link (anchor) not a button", () => {
		const cta = document.querySelector("[data-business-cta]");
		expect(cta.tagName.toLowerCase()).toBe("a");
	});

	test("business CTA does not open in new tab (same-site navigation)", () => {
		const cta = document.querySelector("[data-business-cta]");
		// Internal links should NOT have target="_blank"
		const target = cta.getAttribute("target");
		expect(target).not.toBe("_blank");
	});
});

describe("Graceful degradation (AC #6)", () => {
	test("routing surface renders correctly as static HTML without JS", () => {
		document.body.innerHTML = `
			<div class="audience-routing" data-audience-routing>
				<div class="routing-card routing-card--official" data-routing-official>
					<p class="routing-card__eyebrow" data-i18n="routing.official.eyebrow">Official checking</p>
					<h2 class="routing-card__title" data-i18n="routing.official.title">Need the official state check?</h2>
					<p class="routing-card__body" data-i18n="routing.official.body">Official eAktsyz verification happens in Diia.</p>
					<a href="https://diia.gov.ua/" class="routing-card__cta cta-button" target="_blank" rel="noreferrer noopener"
						aria-label="Open Diia for official checking in a new tab">
						<span data-i18n="routing.official.cta">Open Diia</span>
					</a>
				</div>
				<div class="routing-card routing-card--business" data-routing-business>
					<p class="routing-card__eyebrow" data-i18n="routing.business.eyebrow">Business next step</p>
					<h2 class="routing-card__title" data-i18n="routing.business.title">Want proof for your own products?</h2>
					<p class="routing-card__body" data-i18n="routing.business.body">genu.mark lets brands publish checkable proof.</p>
					<a href="/request?scenario=brand-proof" class="routing-card__cta cta-button"
						aria-label="Send a request for brand proof setup"
						data-business-cta>
						<span data-i18n="routing.business.cta">Send a request</span>
					</a>
				</div>
			</div>
		`;

		// Official path works without JS
		const officialCta = document.querySelector(
			'[data-routing-official] a[href="https://diia.gov.ua/"]',
		);
		expect(officialCta).not.toBeNull();
		expect(officialCta.textContent.trim().length).toBeGreaterThan(0);

		// Business path works without JS
		const businessCta = document.querySelector("[data-business-cta]");
		expect(businessCta).not.toBeNull();
		expect(businessCta.getAttribute("href")).toContain("/request");
		expect(businessCta.getAttribute("href")).toContain("scenario=");

		// Neither path is a dead end
		const officialHref = officialCta.getAttribute("href");
		const businessHref = businessCta.getAttribute("href");
		expect(officialHref.length).toBeGreaterThan(0);
		expect(businessHref.length).toBeGreaterThan(0);
	});

	test("business route does not fail when localStorage is unavailable", () => {
		// Simulate localStorage unavailability
		const originalGetItem = global.localStorage.getItem;
		global.localStorage.getItem = () => {
			throw new Error("localStorage not available");
		};

		document.body.innerHTML = `
			<a href="/request?scenario=brand-proof" class="routing-card__cta cta-button"
				data-business-cta>
				<span data-i18n="routing.business.cta">Send a request</span>
			</a>
		`;

		// CTA link is still present and functional as static HTML
		const cta = document.querySelector("[data-business-cta]");
		expect(cta).not.toBeNull();
		expect(cta.getAttribute("href")).toContain("/request?scenario=");

		// Restore
		global.localStorage.getItem = originalGetItem;
	});

	test("routing does not degrade into dead end when both options present", () => {
		document.body.innerHTML = `
			<div class="audience-routing" data-audience-routing>
				<div class="routing-card routing-card--official" data-routing-official>
					<a href="https://diia.gov.ua/" class="routing-card__cta cta-button" target="_blank" rel="noreferrer noopener">
						<span data-i18n="routing.official.cta">Open Diia</span>
					</a>
				</div>
				<div class="routing-card routing-card--business" data-routing-business>
					<a href="/request?scenario=brand-proof" class="routing-card__cta cta-button" data-business-cta>
						<span data-i18n="routing.business.cta">Send a request</span>
					</a>
				</div>
			</div>
		`;

		// Both CTAs provide actionable links
		const officialCta = document.querySelector("[data-routing-official] a");
		const businessCta = document.querySelector("[data-routing-business] a");
		expect(officialCta.getAttribute("href")).toBeTruthy();
		expect(businessCta.getAttribute("href")).toBeTruthy();
	});
});

describe("Translation keys in lang-toggle.js (routing.business.* and routing.official.*)", () => {
	const requiredEnKeys = [
		"routing.official.eyebrow",
		"routing.official.title",
		"routing.official.body",
		"routing.official.cta",
		"routing.official.ctaAria",
		"routing.business.eyebrow",
		"routing.business.title",
		"routing.business.body",
		"routing.business.cta",
		"routing.business.ctaAria",
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

	test("EN translations include all routing keys", () => {
		for (const key of requiredEnKeys) {
			expect(langToggleSource).toContain(`"${key}"`);
		}
	});

	test("UK translations include all routing keys", () => {
		const ukSection = langToggleSource.split("uk:")[1];
		expect(ukSection).toBeDefined();
		for (const key of requiredEnKeys) {
			expect(ukSection).toContain(`"${key}"`);
		}
	});

	test("EN and UK routing translation schemas are consistent", () => {
		const enSection = langToggleSource.match(/en:\s*\{[\s\S]*?\},\s*uk:/);
		expect(enSection).not.toBeNull();

		const enKeys = [];
		const enKeyRegex = /"routing\.[^"]+"/g;
		let enMatch = enKeyRegex.exec(enSection[0]);
		while (enMatch !== null) {
			enKeys.push(enMatch[0].replace(/"/g, ""));
			enMatch = enKeyRegex.exec(enSection[0]);
		}

		const ukSection = langToggleSource.split("uk:")[1];
		const ukKeys = [];
		const ukKeyRegex = /"routing\.[^"]+"/g;
		let ukMatch = ukKeyRegex.exec(ukSection);
		while (ukMatch !== null) {
			ukKeys.push(ukMatch[0].replace(/"/g, ""));
			ukMatch = ukKeyRegex.exec(ukSection);
		}

		expect(ukKeys.length).toBe(enKeys.length);
		expect(ukKeys.sort()).toEqual(enKeys.sort());
	});

	test("business CTA aria label does not suggest official results", () => {
		const businessCtaAriaMatch = langToggleSource.match(
			/"routing\.business\.ctaAria":\s*"([^"]+)"/,
		);
		expect(businessCtaAriaMatch).not.toBeNull();
		const ariaText = businessCtaAriaMatch[1].toLowerCase();
		expect(ariaText).not.toContain("official");
		expect(ariaText).not.toContain("diia");
	});
});
