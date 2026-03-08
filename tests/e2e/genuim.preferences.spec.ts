import { expect, test } from "@playwright/test";
import { GenuimPage } from "./pages/genuim.page";

test.describe("genu.im — preferences", () => {
	test.describe.configure({ mode: "serial" });

	test.beforeEach(async ({ page }) => {
		const app = new GenuimPage(page);
		await app.gotoHome();
	});

	test("theme toggle switches between light and dark", async ({ page }) => {
		const app = new GenuimPage(page);

		const initial = await app.isDark();
		await app.toggleThemeAndWait(!initial);
		await app.toggleThemeAndWait(initial);
	});

	test("localStorage persists theme preference", async ({ page }) => {
		const app = new GenuimPage(page);

		// доведём до dark
		if (!(await app.isDark())) {
			await app.toggleThemeAndWait(true);
		}

		await expect
			.poll(() => page.evaluate(() => localStorage.getItem("theme")), {
				timeout: 5000,
			})
			.toBe("dark");

		await page.reload();
		await page.waitForLoadState("domcontentloaded");

		// иногда скрипт темы применяет класс чуть позже, чем domcontentloaded
		await expect.poll(() => app.isDark(), { timeout: 15000 }).toBe(true);
	});

	test("language toggle switches between EN and UK", async ({ page }) => {
		const app = new GenuimPage(page);

		await app.toggleLanguageAndWait();

		const lang = await app.currentLang();
		await expect(app.langLabel).toHaveText(lang === "uk" ? "UA" : "EN");
		await expect(app.heroEyebrow).toBeVisible();

		if (lang === "uk") {
			await expect(app.heroEyebrow).toContainText("Довіра");
		} else {
			await expect(app.heroEyebrow).toContainText("Trust");
		}
	});

	test("localStorage persists language preference", async ({ page }) => {
		const app = new GenuimPage(page);

		const initial = await app.currentLang();
		await app.toggleLanguageAndWait();

		const lang = await app.currentLang();
		expect(lang).not.toBe(initial);

		await expect
			.poll(() => page.evaluate(() => localStorage.getItem("lang")), {
				timeout: 5000,
			})
			.toBe(lang);

		await page.reload();
		await page.waitForLoadState("domcontentloaded");
		await expect(app.html).toHaveAttribute("lang", lang);
	});
});
