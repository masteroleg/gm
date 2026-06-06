import { expect, test } from "@playwright/test";

const GA_ID = "G-RBD0C4LE5V";

test.describe("GA4 Analytics — G-RBD0C4LE5V", () => {
	const pages = [
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

	for (const { path, name } of pages) {
		test(`@smoke GA4 script block exists on ${name} (${path})`, async ({
			page,
		}) => {
			await page.goto(path);
			const hasGa = await page.evaluate((id) => {
				const scripts = document.querySelectorAll("script");
				for (const s of scripts) {
					if (s.textContent?.includes(id)) {
						return true;
					}
				}
				return false;
			}, GA_ID);
			expect(hasGa).toBe(true);
		});
	}

	test("GA4 gtag initializes dataLayer and fires js+config on page load", async ({
		page,
	}) => {
		await page.goto("/");
		const result = await page.evaluate(() => {
			type Win = Window &
				typeof globalThis & {
					dataLayer?: unknown[][];
					gtag?: (...args: unknown[]) => unknown;
				};
			const w = window as unknown as Win;
			return {
				hasDataLayer: "dataLayer" in window,
				hasGtag: typeof w.gtag === "function",
				dlLength: w.dataLayer?.length ?? -1,
			};
		});
		expect(result.hasDataLayer).toBe(true);
		expect(result.hasGtag).toBe(true);
	});
});
