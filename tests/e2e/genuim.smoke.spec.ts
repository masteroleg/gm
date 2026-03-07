import { expect, test } from "@playwright/test";
import { GenuimPage } from "./pages/genuim.page";

test.describe("genu.im — smoke", () => {
	test("@smoke page loads with correct title", async ({ page }) => {
		const app = new GenuimPage(page);
		await app.gotoHome();
		await expect(page).toHaveTitle(/genu\.im/i);
	});

	test("@smoke page has all required elements", async ({ page }) => {
		const app = new GenuimPage(page);
		await app.gotoHome();

		await app.expectLogosPresent();
		await app.expectExactlyOneLogoVisible();

		await expect(app.themeToggle).toBeVisible();
		await expect(app.langToggle).toBeVisible();

		await expect(app.mainNav).toBeAttached();
		await expect(page.locator("h1")).toBeVisible();
		await expect(app.heroTitle).toBeVisible();

		await expect(app.qrImage).toBeVisible();
		await expect(app.footer).toBeVisible();
	});

	test("@smoke CSS is loaded and applied", async ({ page }) => {
		const app = new GenuimPage(page);
		await app.gotoHome();

		await app.expectCssLoaded();
		await app.expectLogosPresent();
		await app.expectExactlyOneLogoVisible();
	});
});
