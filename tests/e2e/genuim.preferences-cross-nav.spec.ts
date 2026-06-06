import { expect, test } from "@playwright/test";
import { GenuimPage } from "./pages/genuim.page";

test.describe("genu.im — preferences cross-navigation", () => {
	test.describe.configure({ mode: "serial" });

	test("[P1] theme persists when navigating from homepage to another page", async ({
		page,
	}) => {
		const app = new GenuimPage(page);
		await app.gotoHome();

		if (!(await app.isDark())) {
			await app.toggleThemeAndWait(true);
		}

		await page.goto("/about/");
		await page.waitForLoadState("domcontentloaded");

		const app2 = new GenuimPage(page);
		await expect.poll(() => app2.isDark(), { timeout: 15000 }).toBe(true);
	});

	test("[P1] theme persists when navigating from about to homepage", async ({
		page,
	}) => {
		const app = new GenuimPage(page);
		await page.goto("/about/");
		await page.waitForLoadState("domcontentloaded");

		if (!(await app.isDark())) {
			await app.toggleThemeAndWait(true);
		}

		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");

		const app2 = new GenuimPage(page);
		await expect.poll(() => app2.isDark(), { timeout: 15000 }).toBe(true);
	});

	test("[P1] language persists when navigating from homepage to another page", async ({
		page,
	}) => {
		const app = new GenuimPage(page);
		await app.gotoHome();

		const initial = await app.currentLang();
		if (initial !== "uk") {
			await app.toggleLanguageAndWait();
		}

		await page.goto("/contact/");
		await page.waitForLoadState("domcontentloaded");

		const app2 = new GenuimPage(page);
		await expect(app2.html).toHaveAttribute("lang", "uk");
	});

	test("[P1] language persists when navigating from about to homepage", async ({
		page,
	}) => {
		const app = new GenuimPage(page);
		await page.goto("/about/");
		await page.waitForLoadState("domcontentloaded");

		const initial = await app.currentLang();
		if (initial !== "uk") {
			await app.toggleLanguageAndWait();
		}

		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");

		const app2 = new GenuimPage(page);
		await expect(app2.html).toHaveAttribute("lang", "uk");
	});
});
