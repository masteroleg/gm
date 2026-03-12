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
			await expect(app.heroEyebrow).toContainText("доказ");
		} else {
			await expect(app.heroEyebrow).toContainText("proof");
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

	test("stored UK preference loads translated content without pending i18n state", async ({
		page,
	}) => {
		await page.addInitScript(() => {
			localStorage.setItem("lang", "uk");
		});

		const app = new GenuimPage(page);
		await app.gotoHome();

		await expect(app.html).toHaveAttribute("lang", "uk");
		await expect(app.html).not.toHaveAttribute("data-i18n-pending", "true");
		await expect(app.heroEyebrow).toContainText("доказ");
	});

	test("language and theme controls stay usable at 360px", async ({ page }) => {
		const app = new GenuimPage(page);

		await page.setViewportSize({ width: 360, height: 640 });
		await app.gotoHome();

		await expect(app.langToggle).toBeVisible();
		await expect(app.themeToggle).toBeVisible();

		const initialDark = await app.isDark();
		await app.toggleLanguageAndWait();
		await app.toggleThemeAndWait(!initialDark);

		const scrollWidth = await page.evaluate(
			() => document.documentElement.scrollWidth,
		);
		const clientWidth = await page.evaluate(
			() => document.documentElement.clientWidth,
		);
		expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
	});
});
