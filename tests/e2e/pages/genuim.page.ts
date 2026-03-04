import { expect, type Locator, type Page } from '@playwright/test';

export class GenuimPage {
	readonly page: Page;

	// Locators (центр правды)
	readonly html: Locator;
	readonly themeToggle: Locator;
	readonly langToggle: Locator;
	readonly langLabel: Locator;

	readonly burgerBtn: Locator;
	readonly mainNav: Locator;
	readonly closeMenu: Locator;

	readonly heroTitle: Locator;
	readonly footer: Locator;

	readonly lightLogo: Locator;
	readonly darkLogo: Locator;
	readonly qrImage: Locator;

	constructor(page: Page) {
		this.page = page;

		this.html = page.locator('html');
		this.themeToggle = page.locator('#themeToggle');
		this.langToggle = page.locator('#langToggle');
		this.langLabel = page.locator('#langLabel');

		this.burgerBtn = page.locator('#burgerBtn');
		this.mainNav = page.locator('#mainNav');
		this.closeMenu = page.locator('#closeMenu');

		this.heroTitle = page.locator('[data-i18n="hero.title"]');
		this.footer = page.locator('footer');

		this.lightLogo = page.locator('img[alt="Genu.im Logo"]');
		this.darkLogo = page.locator('img[alt="genu.im logo dark"]');

		// устойчиво: по src из логов
		this.qrImage = page.locator('img[src*="QR-pitch"]').first();
	}

	async gotoHome() {
		// Идиоматично: baseURL берётся из playwright.config.ts
		await this.page.goto('/');
		await this.page.waitForLoadState('domcontentloaded');
	}

	async isDark(): Promise<boolean> {
		return this.html.evaluate((el) => el.classList.contains('dark'));
	}

	async expectLogosPresent() {
		await expect(this.lightLogo).toHaveCount(1);
		await expect(this.darkLogo).toHaveCount(1);
	}

	async expectExactlyOneLogoVisible() {
		const dark = await this.isDark();
		if (dark) {
			await expect(this.darkLogo).toBeVisible();
			await expect(this.lightLogo).toBeHidden();
		} else {
			await expect(this.lightLogo).toBeVisible();
			await expect(this.darkLogo).toBeHidden();
		}
	}

	async toggleThemeAndWait(expectedDark: boolean) {
		await expect(this.themeToggle).toBeVisible();
		await this.themeToggle.click();
		await expect.poll(() => this.isDark()).toBe(expectedDark);
	}

	async toggleLanguageAndWait() {
		await expect(this.langToggle).toBeVisible();

		const initial = await this.html.getAttribute('lang');
		await this.langToggle.click();
		await expect(this.html).not.toHaveAttribute('lang', initial ?? '');
	}

	async currentLang(): Promise<'en' | 'uk'> {
		const lang = (await this.html.getAttribute('lang')) ?? 'en';
		if (lang !== 'en' && lang !== 'uk') throw new Error(`Unexpected lang="${lang}"`);
		return lang;
	}

	async clearPrefsStorage() {
		await this.page.addInitScript(() => {
			localStorage.removeItem('theme');
			localStorage.removeItem('lang');
		});
	}

	async expectCssLoaded() {
		const bgVar = await this.page.evaluate(() =>
			getComputedStyle(document.documentElement)
				.getPropertyValue('--color-bg-body')
				.trim()
		);
		expect(bgVar).toBeTruthy();
	}
}