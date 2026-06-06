import { expect, test } from "@playwright/test";
import { VerificationPage } from "./pages/verification.page";

test.describe("genu.im - /v/ input edge cases", () => {
	test("[P0] whitespace-only input stays on /v/ with no error", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoInput();
		await app.inputField.fill("   ");
		await app.submitBtn.click();
		await page.waitForLoadState("domcontentloaded");
		expect(page.url()).toMatch(/\/v\/$/);
		const text = await page.locator("main").innerText();
		expect(text).not.toMatch(/not found/i);
		expect(text).not.toMatch(/invalid code/i);
		expect(text).not.toMatch(/error/i);
	});

	test("[P0] code with leading whitespace navigates correctly", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoInput();
		await app.inputField.fill("  GM-GENUIM-2026");
		await app.submitBtn.click();
		await page.waitForLoadState("domcontentloaded");
		expect(page.url()).toContain("/v/genuim/");
		await expect(app.demoBanner).toBeVisible();
	});

	test("[P0] code with trailing whitespace navigates correctly", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoInput();
		await app.inputField.fill("GM-GENUIM-2026  ");
		await app.submitBtn.click();
		await page.waitForLoadState("domcontentloaded");
		expect(page.url()).toContain("/v/genuim/");
		await expect(app.demoBanner).toBeVisible();
	});

	test("[P0] special characters input stays on /v/ with no error", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoInput();
		await app.inputField.fill("<script>alert('xss')</script>");
		await app.submitBtn.click();
		await page.waitForLoadState("domcontentloaded");
		expect(page.url()).toMatch(/\/v\/$/);
	});

	test("[P0] very long code input stays on /v/ with no error", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoInput();
		await app.inputField.fill("A".repeat(500));
		await app.submitBtn.click();
		await page.waitForLoadState("domcontentloaded");
		expect(page.url()).toMatch(/\/v\/$/);
	});

	test("[P0] SQL-like input stays on /v/ with no error", async ({ page }) => {
		const app = new VerificationPage(page);
		await app.gotoInput();
		await app.inputField.fill("'; DROP TABLE codes; --");
		await app.submitBtn.click();
		await page.waitForLoadState("domcontentloaded");
		expect(page.url()).toMatch(/\/v\/$/);
	});

	test("[P1] unicode code input stays on /v/ with no error", async ({
		page,
	}) => {
		const app = new VerificationPage(page);
		await app.gotoInput();
		await app.inputField.fill("代码验证-测试-123");
		await app.submitBtn.click();
		await page.waitForLoadState("domcontentloaded");
		expect(page.url()).toMatch(/\/v\/$/);
	});
});
