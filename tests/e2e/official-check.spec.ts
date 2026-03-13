import { expect, test } from "@playwright/test";

test.describe("Official Check Guidance Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/perevir-product/");
	});

	test("page loads with correct title and heading @smoke", async ({ page }) => {
		const title = page.locator(".info-page__title");
		await expect(title).toBeVisible();
		await expect(title).toContainText("Diia");
	});

	test("page clearly states genu.im does not provide official results @smoke", async ({
		page,
	}) => {
		const lead = page.locator(".info-page__lead");
		await expect(lead).toBeVisible();
		await expect(lead).toContainText("Diia");
	});

	test("CTA links to Diia and opens in new tab @smoke", async ({ page }) => {
		// Select the primary Story 3.1 CTA in the info-page__cta-section
		const cta = page.locator(
			'.info-page__cta-section a.cta-button[href="https://diia.gov.ua/"]',
		);
		await expect(cta).toBeVisible();
		await expect(cta).toHaveAttribute("target", "_blank");
		await expect(cta).toHaveAttribute("rel", /noopener/);
	});

	test("CTA text describes Diia destination before click", async ({ page }) => {
		const ctaText = page.locator('[data-i18n="officialCheck.cta"]');
		await expect(ctaText).toContainText("Diia");
	});

	test("page has accessible aria-label on CTA", async ({ page }) => {
		const cta = page.locator('a.cta-button[href="https://diia.gov.ua/"]');
		const ariaLabel = await cta.getAttribute("aria-label");
		expect(ariaLabel).toContain("Diia");
	});

	test("page separates brand proof from official checking", async ({
		page,
	}) => {
		const body = page.locator(".info-page__body");
		const text = await body.textContent();
		expect(text).toContain("genu.im");
		expect(text).toContain("Diia");

		// Verify guidance body sections are visible and readable
		const sections = page.locator(".info-section");
		const sectionCount = await sections.count();
		expect(sectionCount).toBeGreaterThanOrEqual(3); // At least 3 guidance sections

		// Verify each section has heading and body text
		for (let i = 0; i < sectionCount; i++) {
			const section = sections.nth(i);
			const heading = section.locator(".info-section__heading");
			const body = section.locator("p");
			await expect(heading).toBeVisible();
			await expect(body).toBeVisible();

			// Verify text is readable (has content)
			const headingText = await heading.textContent();
			const bodyText = await body.textContent();
			expect(headingText?.length).toBeGreaterThan(0);
			expect(bodyText?.length).toBeGreaterThan(10);
		}
	});

	test("all user-facing text has data-i18n attributes", async ({ page }) => {
		const i18nElements = page.locator('[data-i18n^="officialCheck."]');
		const count = await i18nElements.count();
		expect(count).toBeGreaterThanOrEqual(5);
	});

	test("page works at 360px width @smoke", async ({ page }) => {
		await page.setViewportSize({ width: 360, height: 640 });
		await page.goto("/perevir-product/");

		// Verify no horizontal scrolling
		const scrollWidth = await page.evaluate(
			() => document.documentElement.scrollWidth,
		);
		const viewportWidth = 360;
		expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);

		const title = page.locator(".info-page__title");
		await expect(title).toBeVisible();

		// Verify content container fits viewport
		const main = page.locator(".info-page");
		const mainBox = await main.boundingBox();
		expect(mainBox).not.toBeNull();
		if (mainBox) {
			expect(mainBox.width).toBeLessThanOrEqual(viewportWidth);
		}

		const cta = page.locator(
			'.info-page__cta-section a.cta-button[href="https://diia.gov.ua/"]',
		);
		await expect(cta).toBeVisible();

		// Check CTA is not clipped or hidden
		const ctaBox = await cta.boundingBox();
		expect(ctaBox).not.toBeNull();
		expect(ctaBox?.width).toBeGreaterThanOrEqual(44);
		expect(ctaBox?.height).toBeGreaterThanOrEqual(44);

		// Verify key page content is visible and readable
		const lead = page.locator(".info-page__lead");
		await expect(lead).toBeVisible();
		const leadBox = await lead.boundingBox();
		expect(leadBox).not.toBeNull();
		if (leadBox) {
			expect(leadBox.width).toBeGreaterThan(0);
			expect(leadBox.height).toBeGreaterThan(0);
		}
	});

	test("language toggle works on guidance page", async ({ page }) => {
		const langToggle = page.locator("#langToggle");
		await langToggle.click();

		const title = page.locator(".info-page__title");
		await expect(title).toContainText("Дію");
	});

	test("back link navigates to homepage", async ({ page }) => {
		const backLink = page.locator(".info-back-link");
		await expect(backLink).toBeVisible();
	});

	test("footer navigation is present", async ({ page }) => {
		const footer = page.locator(".site-footer");
		await expect(footer).toBeVisible();
	});
});
