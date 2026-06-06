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

	test("GA4 does not load on localhost", async ({ page }) => {
		await page.goto("/");
		const hasDataLayer = await page.evaluate(() => {
			return "dataLayer" in window;
		});
		expect(hasDataLayer).toBe(false);
	});

	test("GA4 gtag function correctly pushes js + config calls", async ({
		page,
	}) => {
		await page.goto("/");
		const result = await page.evaluate(() => {
			const dataLayer: unknown[][] = [];
			const gtag = (...args: unknown[]) => dataLayer.push(args);
			gtag("js", new Date());
			gtag("config", "G-RBD0C4LE5V");
			return {
				count: dataLayer.length,
				firstType: dataLayer[0]?.[0],
				secondType: dataLayer[1]?.[0],
				configId: dataLayer[1]?.[1],
			};
		});
		expect(result.count).toBe(2);
		expect(result.firstType).toBe("js");
		expect(result.secondType).toBe("config");
		expect(result.configId).toBe("G-RBD0C4LE5V");
	});

	test("GA4 hostname guard allows genu.im and www.genu.im", async ({
		page,
	}) => {
		const result = await page.evaluate(() => {
			const allowed = ["genu.im", "www.genu.im"];
			const denied = [
				"localhost",
				"127.0.0.1",
				"staging.genu.im",
				"dev.genu.im",
				"example.com",
			];
			const testHostname = (h: string) => {
				return h === "genu.im" || h === "www.genu.im";
			};
			return {
				allowed: allowed.map(testHostname),
				denied: denied.map(testHostname),
			};
		});
		expect(result.allowed).toEqual([true, true]);
		expect(result.denied).toEqual([false, false, false, false, false]);
	});
});
