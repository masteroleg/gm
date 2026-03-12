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

test("@smoke GM use-cases section shows two distinct branch cards", async ({
	page,
	baseURL,
}) => {
	await page.goto(new URL("/", baseURL ?? "http://localhost:3000").toString());
	await page.waitForLoadState("domcontentloaded");

	// Both branch cards must exist with distinct headings (AC: 1, 2)
	const regulatedCard = page.locator(".content-card--regulated");
	const brandCard = page.locator(".content-card--brand");
	await expect(regulatedCard).toBeVisible();
	await expect(brandCard).toBeVisible();

	const regulatedTitle = await regulatedCard
		.locator(".content-card__title")
		.textContent();
	const brandTitle = await brandCard
		.locator(".content-card__title")
		.textContent();
	expect(regulatedTitle).not.toEqual(brandTitle);
});

test("@smoke GM use-cases regulated card CTA links to /request?scenario=eaktsyz", async ({
	page,
	baseURL,
}) => {
	await page.goto(new URL("/", baseURL ?? "http://localhost:3000").toString());
	await page.waitForLoadState("domcontentloaded");

	// Regulated branch CTA must navigate to request surface with correct scenario (AC: 3)
	const cta = page.locator(".content-card--regulated .content-card__cta");
	await expect(cta).toBeVisible();
	await expect(cta).toHaveAttribute("href", "/request?scenario=eaktsyz");
});

test("@smoke GM use-cases brand card CTA links to /request?scenario=brand-proof", async ({
	page,
	baseURL,
}) => {
	await page.goto(new URL("/", baseURL ?? "http://localhost:3000").toString());
	await page.waitForLoadState("domcontentloaded");

	// Brand branch CTA must navigate to request surface with correct scenario (AC: 3)
	const cta = page.locator(".content-card--brand .content-card__cta");
	await expect(cta).toBeVisible();
	await expect(cta).toHaveAttribute("href", "/request?scenario=brand-proof");
});

test("GM use-cases branch CTAs are visible and usable at 360px width", async ({
	page,
	baseURL,
}) => {
	await page.setViewportSize({ width: 360, height: 640 });
	await page.goto(new URL("/", baseURL ?? "http://localhost:3000").toString());
	await page.waitForLoadState("domcontentloaded");

	// Both branch CTAs visible at mobile width, no horizontal overflow (AC: 4)
	const regulatedCta = page.locator(
		".content-card--regulated .content-card__cta",
	);
	const brandCta = page.locator(".content-card--brand .content-card__cta");
	await expect(regulatedCta).toBeVisible();
	await expect(brandCta).toBeVisible();

	const scrollWidth = await page.evaluate(
		() => document.documentElement.scrollWidth,
	);
	const clientWidth = await page.evaluate(
		() => document.documentElement.clientWidth,
	);
	expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});
