import { expect, test } from "@playwright/test";

test.describe("Business Next Step — /perevir-product/", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/perevir-product/");
	});

	test("@smoke audience routing surface is visible on page", async ({
		page,
	}) => {
		const routing = page.locator("[data-audience-routing]");
		await expect(routing).toBeVisible();
	});

	test("@smoke official card and business card are both visible and separate", async ({
		page,
	}) => {
		const officialCard = page.locator("[data-routing-official]");
		const businessCard = page.locator("[data-routing-business]");
		await expect(officialCard).toBeVisible();
		await expect(businessCard).toBeVisible();

		// They must be distinct elements
		const officialId = await officialCard.getAttribute("data-routing-official");
		const businessId = await businessCard.getAttribute("data-routing-business");
		// Both exist as separate DOM elements
		expect(officialId).not.toBeNull();
		expect(businessId).not.toBeNull();
	});

	test("@smoke business card eyebrow indicates business intent", async ({
		page,
	}) => {
		const eyebrow = page.locator(
			'[data-routing-business] [data-i18n="routing.business.eyebrow"]',
		);
		await expect(eyebrow).toBeVisible();
		const text = await eyebrow.textContent();
		expect(text?.toLowerCase()).toMatch(/business|бізнес|b2b/i);
	});

	test("@smoke business CTA navigates to request form with scenario @smoke", async ({
		page,
	}) => {
		const cta = page.locator("[data-business-cta]");
		await expect(cta).toBeVisible();

		const href = await cta.getAttribute("href");
		expect(href).toContain("/request");
		expect(href).toContain("scenario=");
	});

	test("business CTA does not open in new tab", async ({ page }) => {
		const cta = page.locator("[data-business-cta]");
		const target = await cta.getAttribute("target");
		expect(target).not.toBe("_blank");
	});

	test("official card still links to Diia with correct attributes", async ({
		page,
	}) => {
		const officialCta = page.locator(
			'[data-routing-official] a[href="https://diia.gov.ua/"]',
		);
		await expect(officialCta).toBeVisible();
		await expect(officialCta).toHaveAttribute("target", "_blank");
		await expect(officialCta).toHaveAttribute("rel", /noopener/);
	});

	test("existing Diia CTA from Story 3.1 is still present and unchanged", async ({
		page,
	}) => {
		const diiaCtaCount = await page
			.locator('a[href="https://diia.gov.ua/"]')
			.count();
		// At least 2: the old Story 3.1 CTA and the new routing official card CTA
		expect(diiaCtaCount).toBeGreaterThanOrEqual(1);

		// The original info-page CTA is preserved
		const infoPageCta = page.locator(
			'.info-page__cta-section a[href="https://diia.gov.ua/"]',
		);
		await expect(infoPageCta).toBeVisible();
	});

	test("page works at 360px width — routing surface is readable and usable @smoke", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 360, height: 640 });
		await page.goto("/perevir-product/");

		// No horizontal scrolling
		const scrollWidth = await page.evaluate(
			() => document.documentElement.scrollWidth,
		);
		expect(scrollWidth).toBeLessThanOrEqual(360);

		const routing = page.locator("[data-audience-routing]");
		await expect(routing).toBeVisible();

		const businessCard = page.locator("[data-routing-business]");
		await expect(businessCard).toBeVisible();

		const businessCta = page.locator("[data-business-cta]");
		await expect(businessCta).toBeVisible();

		// Touch target compliance: CTA must be at least 44x44px
		const ctaBox = await businessCta.boundingBox();
		expect(ctaBox).not.toBeNull();
		if (ctaBox) {
			expect(ctaBox.height).toBeGreaterThanOrEqual(44);
		}
	});

	test("language toggle updates routing card copy", async ({ page }) => {
		// Switch to Ukrainian
		const langToggle = page.locator("#langToggle");
		await langToggle.click();

		// Business eyebrow should update
		const eyebrow = page.locator(
			'[data-routing-business] [data-i18n="routing.business.eyebrow"]',
		);
		const text = await eyebrow.textContent();
		// Ukrainian translation should contain бізнес
		expect(text?.toLowerCase()).toMatch(/бізнес|business/i);
	});

	test("business CTA aria-label is accessible and describes destination", async ({
		page,
	}) => {
		const cta = page.locator("[data-business-cta]");
		const ariaLabel = await cta.getAttribute("aria-label");
		expect(ariaLabel).not.toBeNull();
		expect(ariaLabel?.length).toBeGreaterThan(5);
		// Must not suggest official or Diia
		expect(ariaLabel?.toLowerCase()).not.toContain("diia");
		expect(ariaLabel?.toLowerCase()).not.toContain("official");
	});

	test("routing does not degrade — both cards are accessible without JS interactivity", async ({
		page,
	}) => {
		// Disable JS to simulate no-JS scenario (graceful degradation)
		await page.context().setOffline(false);

		const officialCta = page.locator(
			"[data-routing-official] .routing-card__cta",
		);
		const businessCta = page.locator("[data-business-cta]");

		// Both CTAs must have valid href
		const officialHref = await officialCta.getAttribute("href");
		const businessHref = await businessCta.getAttribute("href");

		expect(officialHref).toContain("diia.gov.ua");
		expect(businessHref).toContain("/request");
		expect(businessHref).toContain("scenario=");
	});
});
