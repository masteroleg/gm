import { expect, test } from "@playwright/test";

test("@smoke proof-first funnel path is navigable end-to-end", async ({
	page,
	baseURL,
}) => {
	const base = baseURL ?? "http://localhost:3000";

	// Step 1: Homepage loads and hero CTA has proof_entry UTM params
	await page.goto(new URL("/", base).toString());
	await page.waitForLoadState("domcontentloaded");

	const heroCta = page.locator(".hero-actions .cta-button").first();
	await expect(heroCta).toBeVisible();

	const href = await heroCta.getAttribute("href");
	expect(href).toContain("/v/genuim/");
	expect(href).toContain("utm_campaign=proof_entry");

	// Step 2: Proof page loads
	await page.goto(new URL("/v/genuim/", base).toString());
	await page.waitForLoadState("domcontentloaded");

	await expect(page).toHaveTitle(/genu\.im/i);
	await expect(page.locator("main")).toBeVisible();

	// Step 3: Request form is reachable
	await page.goto(new URL("/request/", base).toString());
	await page.waitForLoadState("domcontentloaded");

	await expect(page.locator("form")).toBeVisible();
	await expect(page.locator("#scenario")).toBeVisible();
});
