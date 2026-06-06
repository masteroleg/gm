import { expect, test } from "@playwright/test";

test.describe("Trust floor — depth", () => {
	test("[P2] proof-cases page content renders", async ({ page }) => {
		await page.goto("/proof-cases/");
		await expect(page.locator("main")).toBeVisible();
		const heading = page.locator("h1, h2").first();
		await expect(heading).toBeVisible();
		const text = await page.locator("main").textContent();
		expect(text?.trim().length).toBeGreaterThan(0);
	});

	test("[P2] desktop main nav links to /knowledge/", async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 720 });
		await page.goto("/");
		const nav = page.locator("nav#mainNav");
		const knowledgeLink = nav.locator('a[href="/knowledge/"]');
		await expect(knowledgeLink).toBeVisible();
	});
});

test.describe("Structured data — JSON-LD on all page types", () => {
	const pages = [
		{ path: "/", label: "home" },
		{ path: "/about/", label: "about" },
		{ path: "/contact/", label: "contact" },
		{ path: "/faq/", label: "faq" },
		{ path: "/knowledge/", label: "knowledge" },
		{ path: "/privacy/", label: "privacy" },
		{ path: "/proof-cases/", label: "proof-cases" },
		{ path: "/request/", label: "request" },
		{ path: "/terms/", label: "terms" },
		{ path: "/v/", label: "verification-input" },
		{ path: "/v/genuim/", label: "verification-proof" },
	];

	for (const { path, label } of pages) {
		test(`[P2] ${label} contains JSON-LD structured data`, async ({ page }) => {
			await page.goto(path);
			const scripts = page.locator('script[type="application/ld+json"]');
			const text = await scripts.first().textContent();
			expect(text).toBeTruthy();
			expect(text?.trim().length).toBeGreaterThan(0);
			const parsed = JSON.parse(text ?? "");
			expect(parsed["@context"]).toBe("https://schema.org");
		});
	}
});
