import { expect, test } from "@playwright/test";

test.describe("genu.im - routing", () => {
	test("[P1] non-existent page shows no JS error and returns proper response", async ({
		page,
	}) => {
		const response = await page.goto("/this-page-does-not-exist/");
		expect(response?.status()).toBe(404);
		await page.waitForLoadState("domcontentloaded");
		const text = await page.locator("main").innerText();
		expect(text).not.toMatch(/error occurred/i);
		expect(text).not.toMatch(/stack trace/i);
		expect(text).not.toMatch(/internal server error/i);
	});

	test("[P1] non-existent nested path returns 404 gracefully", async ({
		page,
	}) => {
		const response = await page.goto("/v/nonexistent-code/");
		expect(response?.status()).toBe(404);
		await page.waitForLoadState("domcontentloaded");
		const text = await page.locator("main").innerText();
		expect(text).not.toMatch(/error occurred/i);
	});

	test("[P1] root path returns 200", async ({ page }) => {
		const response = await page.goto("/");
		expect(response?.status()).toBe(200);
	});

	test("[P1] all known pages return 200", async ({ page }) => {
		const knownPages = [
			"/about/",
			"/contact/",
			"/faq/",
			"/knowledge/",
			"/privacy/",
			"/proof-cases/",
			"/request/",
			"/terms/",
			"/v/",
			"/v/genuim/",
		];
		for (const path of knownPages) {
			const response = await page.goto(path);
			expect(response?.status(), `Expected ${path} to return 200`).toBe(200);
		}
	});
});
