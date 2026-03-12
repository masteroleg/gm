import { expect, test } from "@playwright/test";

test("GM landing page loads and shows hero heading", async ({
	page,
	baseURL,
}) => {
	await page.goto(new URL("/", baseURL ?? "http://localhost:3000").toString());
	await page.waitForLoadState("domcontentloaded");
	await expect(page).toHaveTitle(/genu\.im/i);
	await expect(page.locator(".hero-title")).toBeVisible();
});

test("GM landing page hero explains proof-first surface for marked products", async ({
	page,
	baseURL,
}) => {
	await page.goto(new URL("/", baseURL ?? "http://localhost:3000").toString());
	await page.waitForLoadState("domcontentloaded");

	// Hero description must name the category and both role-separated entities (AC: 1, 2)
	const description = page.locator(".hero-description");
	await expect(description).toBeVisible();
	await expect(description).toContainText(/proof/i);
	await expect(description).toContainText(/genu\.mark/i);
	await expect(description).toContainText(/diia/i);
});

test("@smoke GM landing page primary CTA links to /v/genuim", async ({
	page,
	baseURL,
}) => {
	await page.goto(new URL("/", baseURL ?? "http://localhost:3000").toString());
	await page.waitForLoadState("domcontentloaded");

	// Primary CTA in hero must navigate to canonical proof path (AC: 3)
	const primaryCta = page.locator(".hero-actions .cta-button").first();
	await expect(primaryCta).toBeVisible();
	await expect(primaryCta).toHaveAttribute("href", "/v/genuim");
});

test("GM landing page first screen is usable at 360px width", async ({
	page,
	baseURL,
}) => {
	await page.setViewportSize({ width: 360, height: 640 });
	await page.goto(new URL("/", baseURL ?? "http://localhost:3000").toString());
	await page.waitForLoadState("domcontentloaded");

	// Key message and CTA visible at narrow viewport, no horizontal overflow (AC: 4)
	await expect(page.locator(".hero-title")).toBeVisible();
	await expect(page.locator(".hero-actions .cta-button").first()).toBeVisible();

	const scrollWidth = await page.evaluate(
		() => document.documentElement.scrollWidth,
	);
	const clientWidth = await page.evaluate(
		() => document.documentElement.clientWidth,
	);
	expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});
