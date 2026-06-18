import { test } from "@playwright/test";

const PAGES = [
	{ path: "/", name: "homepage" },
	{ path: "/about/", name: "about" },
	{ path: "/contact/", name: "contact" },
	{ path: "/faq/", name: "faq" },
	{ path: "/knowledge/", name: "knowledge" },
	{ path: "/privacy/", name: "privacy" },
	{ path: "/proof-cases/", name: "proof-cases" },
	{ path: "/request/", name: "request" },
	{ path: "/terms/", name: "terms" },
	{ path: "/v/", name: "verification-input" },
	{ path: "/v/genuim/", name: "verification-proof" },
];

test("@smoke-user real user sim — visits all pages and interacts", async ({
	page,
}) => {
	for (const { path, name } of PAGES) {
		await page.goto(path);
		await page.waitForTimeout(2000);

		if (name === "homepage") {
			const ctas = page.locator('a[href*="/v/genuim"], a[href*="/request?"]');
			const ctaCount = await ctas.count();
			if (ctaCount > 0) {
				for (let i = 0; i < ctaCount; i++) {
					const cta = ctas.nth(i);
					if (await cta.isVisible()) {
						await cta.hover();
						await page.waitForTimeout(500);
					}
				}
			}
		}

		if (name === "verification-input") {
			const input = page.locator("#proofCode");
			if (await input.isVisible()) {
				await input.fill("GM-GENUIM-2026");
				await page.waitForTimeout(1000);
				const submit = page.locator('button[type="submit"]');
				if (await submit.isVisible()) {
					await submit.click();
					await page.waitForTimeout(2000);
				}
			}
			const exampleLink = page.locator('a[href*="/v/genuim/"]');
			if (await exampleLink.isVisible()) {
				await exampleLink.click();
				await page.waitForTimeout(3000);
			}
			continue;
		}

		if (name === "verification-proof") {
			const facts = page.locator(".fact-panel, [class*='fact'], .proof-card");
			const factCount = await facts.count();
			for (let i = 0; i < Math.min(factCount, 3); i++) {
				await facts.nth(i).hover();
				await page.waitForTimeout(400);
			}
			continue;
		}

		if (name === "request") {
			const nameField = page.locator("#contactName");
			const emailField = page.locator("#contactEmail");
			const companyField = page.locator("#companyName");
			const scenario = page.locator("#scenario");
			const context = page.locator("#context");
			if (await nameField.isVisible()) {
				await nameField.fill("Test User");
				await page.waitForTimeout(300);
				await emailField.fill("test@example.com");
				await page.waitForTimeout(300);
				await companyField.fill("Test Company");
				await page.waitForTimeout(300);
				await scenario.selectOption("brand-proof");
				await page.waitForTimeout(300);
				await context.fill(
					"Testing the platform for potential brand verification needs",
				);
				await page.waitForTimeout(500);
			}
			continue;
		}

		const links = page.locator(
			'a[href]:not([href*="#"]):not([href^="mailto"]):not([href^="tel"])',
		);
		const linkCount = await links.count();
		for (let i = 0; i < Math.min(linkCount, 2); i++) {
			const link = links.nth(i);
			if (await link.isVisible()) {
				await link.hover();
				await page.waitForTimeout(300);
			}
		}
	}
});

test("@smoke-user real user sim — theme and lang toggles", async ({ page }) => {
	await page.goto("/");
	await page.waitForTimeout(1500);

	const themeBtn = page.locator("#themeToggle");
	if (await themeBtn.isVisible()) {
		await themeBtn.click();
		await page.waitForTimeout(1000);
		await themeBtn.click();
		await page.waitForTimeout(1000);
	}

	const langBtn = page.locator("#langToggle");
	if (await langBtn.isVisible()) {
		await langBtn.click();
		await page.waitForTimeout(2000);
		await langBtn.click();
		await page.waitForTimeout(2000);
	}
});

test("@smoke-user real user sim — navigation flow", async ({ page }) => {
	await page.goto("/");
	await page.waitForTimeout(1000);

	const navLinks = page.locator("nav#mainNav a");
	const count = await navLinks.count();
	for (let i = 0; i < count; i++) {
		const link = navLinks.nth(i);
		if (await link.isVisible()) {
			await link.click();
			await page.waitForTimeout(2000);
			await page.goBack();
			await page.waitForTimeout(1000);
		}
	}
});
