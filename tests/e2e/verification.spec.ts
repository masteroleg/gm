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
		expect(text).not.toMatch(/request submitted/i);
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
});
