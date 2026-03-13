import { expect, type Locator, type Page } from "@playwright/test";

export class VerificationPage {
	readonly page: Page;
	readonly html: Locator;
	readonly title: Locator;
	readonly demoBanner: Locator;
	readonly statusBadge: Locator;
	readonly factList: Locator;
	readonly guidanceList: Locator;
	readonly supportPanel: Locator;
	readonly supportLinks: Locator;
	readonly unsupportedPanels: Locator;
	readonly primaryCta: Locator;
	readonly officialCta: Locator;
	readonly businessCta: Locator;
	readonly langToggle: Locator;
	readonly langLabel: Locator;
	readonly themeToggle: Locator;
	// Demo-input surface locators (Story 2.3)
	readonly inputField: Locator;
	readonly submitBtn: Locator;
	readonly exampleCodeLink: Locator;

	constructor(page: Page) {
		this.page = page;
		this.html = page.locator("html");
		this.title = page.locator("h1.verification-page__title");
		this.demoBanner = page.locator(".proof-demo-banner");
		this.statusBadge = page.locator(".proof-status-badge");
		this.factList = page.locator(".proof-facts-list");
		this.guidanceList = page.locator(".proof-guidance-list");
		this.supportPanel = page.locator(".proof-support-panel");
		this.supportLinks = page.locator(".proof-evidence-link:visible");
		this.unsupportedPanels = page.locator(
			".proof-support-panel[hidden], .proof-support-item[hidden]",
		);
		this.primaryCta = page.locator(".proof-next-step .cta-button");
		this.officialCta = page.locator(".proof-action-card--external");
		this.businessCta = page.locator(".proof-action-card--business");
		this.langToggle = page.locator("#langToggle");
		this.langLabel = page.locator("#langLabel");
		this.themeToggle = page.locator("#themeToggle");
		// Demo-input surface
		this.inputField = page.locator(".demo-input__field");
		this.submitBtn = page.locator(".demo-input__submit");
		this.exampleCodeLink = page.locator(".demo-input__example");
	}

	async gotoProof() {
		await this.page.goto("/v/genuim/");
		await this.page.waitForLoadState("domcontentloaded");
	}

	async gotoNoData() {
		await this.page.goto("/v/");
		await this.page.waitForLoadState("domcontentloaded");
	}

	async gotoInput() {
		await this.page.goto("/v/");
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
