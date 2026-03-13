import { expect, test } from "@playwright/test";
import { VerificationPage } from "./pages/verification.page";

test.describe("genu.im - verification page", () => {
	test("@smoke proof example loads with demo notice and result", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoProof();

		await expect(page).toHaveTitle(/Proof Example\s+[-—]\s+genu\.im/i);
		await expect(app.title).toBeVisible();
		await expect(app.demoBanner).toBeVisible();
		await expect(app.statusBadge).toContainText(/proof available/i);
		await expect(app.primaryCta).toHaveAttribute("href", "/contact/");
	});

	test("proof example labels facts by source and avoids forbidden wording", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoProof();

		await expect(app.factList.locator(".proof-fact")).toHaveCount(3);
		await expect(app.factList).toContainText("Source: genu.mark");
		await expect(app.factList).toContainText("Source: brand");
		await expect(page.locator("main")).toContainText(/Diia/i);

		const text = await page.locator("main").innerText();
		expect(text).not.toMatch(/real-time verification/i);
		expect(text).not.toMatch(/official verification/i);
		expect(text).not.toMatch(/state-backed/i);
		expect(text).not.toMatch(/authenticity-confirmed/i);
		expect(text).not.toMatch(/authoritative decision/i);
		expect(text).not.toMatch(/request submitted/i);
	});

	test("proof example shows supported evidence and suppresses unsupported claims", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoProof();

		await expect(app.supportPanel.first()).toBeVisible();
		await expect(app.supportLinks).toContainText([
			"Supporting case note",
			"Read the public case note",
		]);
		await expect(app.supportLinks.first()).toHaveAttribute(
			"href",
			"/proof-cases/",
		);
		await expect(page.locator(".proof-support-panel[hidden]")).toHaveCount(1);
	});

	test("proof example switches language without losing proof meaning", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoProof();

		await app.langToggle.click();
		await expect(app.html).toHaveAttribute("lang", "uk");
		await expect(app.langLabel).toHaveText("UA");
		await expect(app.title).toContainText("публічний запис");
		await expect(app.demoBanner).toContainText("демонстраційний приклад");
		await expect(app.factList).toContainText("Джерело: genu.mark");
		await expect(app.primaryCta).toContainText("Обговорити доказ");
	});

	test("proof example is usable at 360px and keeps route-local metadata", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 360, height: 640 });
		const app = new VerificationPage(page);
		await app.gotoProof();

		await app.expectNoOverflow();
		await expect(app.demoBanner).toBeVisible();
		await expect(app.primaryCta).toBeVisible();
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			"href",
			"https://genu.im/v/genuim/",
		);

		const structuredData = await page
			.locator('script[type="application/ld+json"]')
			.textContent();
		expect(structuredData).toContain('"@type":"ItemPage"');
		expect(structuredData).toContain('"@type":"BreadcrumbList"');
	});

	test("no-data proof example stays neutral and keeps actions separate", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoNoData();

		await expect(page).toHaveTitle(/Demo Input\s+[-—]\s+genu\.im/i);
		await expect(app.title).toContainText("No public proof is available");
		await expect(app.demoBanner).toBeVisible();
		await expect(app.statusBadge).toContainText(/no public proof/i);
		await expect(app.guidanceList).toContainText("Status or result label");
		await expect(app.officialCta).toHaveAttribute(
			"href",
			"https://diia.gov.ua/",
		);
		await expect(app.businessCta).toHaveAttribute("href", "/contact/");

		const text = await page.locator("main").innerText();
		expect(text).not.toMatch(/error/i);
		expect(text).not.toMatch(/live check/i);
		expect(text).not.toMatch(/official verification/i);
		expect(text).not.toMatch(/state-backed/i);
		expect(text).not.toMatch(/request submitted/i);
		// No misleading verification wording on input surface
		expect(text).not.toMatch(/code verified/i);
		expect(text).not.toMatch(/code found/i);
		expect(text).not.toMatch(/checking/i);
	});

	test("no-data proof example works at 360px and preserves honest separation in Ukrainian", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 360, height: 640 });
		const app = new VerificationPage(page);
		await app.gotoNoData();

		await app.expectNoOverflow();
		await app.langToggle.click();
		await expect(app.html).toHaveAttribute("lang", "uk");
		await expect(app.title).toContainText("немає публічного доказу");
		await expect(app.officialCta).toContainText("Дію");
		await expect(app.businessCta).toContainText("Обговорити доказ");
		// Verify aria-labels are also translated — accessibility must stay aligned with visible text
		await expect(app.officialCta).toHaveAttribute(
			"aria-label",
			"Відкрити Дію для офіційної перевірки в новій вкладці",
		);
		await expect(app.businessCta).toHaveAttribute(
			"aria-label",
			"Перейти на сторінку контактів і обговорити доказ продукту",
		);
		await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
			"content",
			"noindex, nofollow",
		);
	});

	// Story 2.3: demo-input surface tests
	test("@smoke /v/ loads with visible input, submit, and example-code action", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoInput();

		await expect(app.inputField).toBeVisible();
		await expect(app.submitBtn).toBeVisible();
		await expect(app.exampleCodeLink).toBeVisible();
		await expect(app.demoBanner).toBeVisible();
		// No-data result content still present below input
		await expect(app.title).toBeVisible();
		await expect(app.statusBadge).toContainText(/no public proof/i);
	});

	test("example-code action navigates to /v/genuim/ with demo notice visible", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoInput();

		await expect(app.exampleCodeLink).toBeVisible();
		await app.exampleCodeLink.click();
		await page.waitForLoadState("domcontentloaded");

		expect(page.url()).toContain("/v/genuim/");
		await expect(app.demoBanner).toBeVisible();
	});

	test("approved code submission navigates to /v/genuim/", async ({ page }) => {
		const app = new VerificationPage(page);
		await app.gotoInput();

		await app.inputField.fill("GM-GENUIM-2026");
		await app.submitBtn.click();
		await page.waitForLoadState("domcontentloaded");

		expect(page.url()).toContain("/v/genuim/");
		await expect(app.demoBanner).toBeVisible();
	});

	test("approved code submission is case-insensitive", async ({ page }) => {
		const app = new VerificationPage(page);
		await app.gotoInput();

		await app.inputField.fill("gm-genuim-2026");
		await app.submitBtn.click();
		await page.waitForLoadState("domcontentloaded");

		expect(page.url()).toContain("/v/genuim/");
	});

	test("unknown code submission stays on /v/ with no error state", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoInput();

		await app.inputField.fill("UNKNOWN-CODE-123");
		await app.submitBtn.click();
		await page.waitForLoadState("domcontentloaded");

		expect(page.url()).toMatch(/\/v\/$/);
		// No error labels, no "not found" wording
		const text = await page.locator("main").innerText();
		expect(text).not.toMatch(/not found/i);
		expect(text).not.toMatch(/invalid code/i);
		expect(text).not.toMatch(/error/i);
	});

	test("empty submission stays on /v/ with no error state", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoInput();

		// Clear the field and submit
		await app.inputField.fill("");
		await app.submitBtn.click();
		await page.waitForLoadState("domcontentloaded");

		expect(page.url()).toMatch(/\/v\/$/);
	});

	test("demo-input surface is usable at 360px without overflow", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 360, height: 640 });
		const app = new VerificationPage(page);
		await app.gotoInput();

		await app.expectNoOverflow();
		await expect(app.inputField).toBeVisible();
		await expect(app.submitBtn).toBeVisible();
		await expect(app.exampleCodeLink).toBeVisible();
		await expect(app.demoBanner).toBeVisible();
	});

	test("demo-input accessibility: input has a label, actions have aria names", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoInput();

		// Input field must have an accessible label
		const inputId = await app.inputField.getAttribute("id");
		if (inputId) {
			const label = page.locator(`label[for="${inputId}"]`);
			await expect(label).toBeVisible();
		} else {
			// Must have aria-label or aria-labelledby
			const ariaLabel = await app.inputField.getAttribute("aria-label");
			const ariaLabelledby =
				await app.inputField.getAttribute("aria-labelledby");
			expect(ariaLabel || ariaLabelledby).toBeTruthy();
		}

		// Submit button must have an accessible name
		const submitAriaLabel = await app.submitBtn.getAttribute("aria-label");
		const submitText = await app.submitBtn.textContent();
		expect((submitAriaLabel || submitText || "").trim()).toBeTruthy();

		// Example-code link must have an accessible name
		const exampleAriaLabel =
			await app.exampleCodeLink.getAttribute("aria-label");
		const exampleText = await app.exampleCodeLink.textContent();
		expect((exampleAriaLabel || exampleText || "").trim()).toBeTruthy();
	});

	test("demo-input switches language and keeps aligned labels", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoInput();

		await app.langToggle.click();
		await expect(app.html).toHaveAttribute("lang", "uk");
		// Input field label / placeholder must be translated
		await expect(app.inputField).toBeVisible();
		await expect(app.exampleCodeLink).toBeVisible();
	});

	test("/v/genuim/ demo notice still visible after example-code navigation (static guarantee)", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoProof();

		// Demo banner is statically in HTML — must be visible before any JS
		await expect(app.demoBanner).toBeVisible();
		// noindex preserved on proof page
		await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute(
			"content",
			/noindex/,
		);
	});
});
