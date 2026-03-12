import { expect, type Locator, type Page } from "@playwright/test";

export class VerificationPage {
	readonly page: Page;
	readonly html: Locator;
	readonly title: Locator;
	readonly demoBanner: Locator;
	readonly statusBadge: Locator;
	readonly factList: Locator;
	readonly primaryCta: Locator;
	readonly langToggle: Locator;
	readonly langLabel: Locator;
	readonly themeToggle: Locator;

	constructor(page: Page) {
		this.page = page;
		this.html = page.locator("html");
		this.title = page.locator("h1.verification-page__title");
		this.demoBanner = page.locator(".proof-demo-banner");
		this.statusBadge = page.locator(".proof-status-badge");
		this.factList = page.locator(".proof-facts-list");
		this.primaryCta = page.locator(".proof-next-step .cta-button");
		this.langToggle = page.locator("#langToggle");
		this.langLabel = page.locator("#langLabel");
		this.themeToggle = page.locator("#themeToggle");
	}

	async gotoProof() {
		await this.page.goto("/v/genuim/");
		await this.page.waitForLoadState("domcontentloaded");
	}

	async currentLang(): Promise<"en" | "uk"> {
		const lang = (await this.html.getAttribute("lang")) ?? "en";
		if (lang !== "en" && lang !== "uk") {
			throw new Error(`Unexpected lang="${lang}"`);
		}
		return lang;
	}

	async expectNoOverflow() {
		const scrollWidth = await this.page.evaluate(
			() => document.documentElement.scrollWidth,
		);
		const clientWidth = await this.page.evaluate(
			() => document.documentElement.clientWidth,
		);
		expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
	}
}
