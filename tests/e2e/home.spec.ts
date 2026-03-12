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

// ── Trust-floor pages (Story 1.4) ──

test("@smoke GM homepage footer has trust-floor nav links", async ({
	page,
	baseURL,
}) => {
	await page.goto(new URL("/", baseURL ?? "http://localhost:3000").toString());
	await page.waitForLoadState("domcontentloaded");

	// All six trust-floor links must be present in footer nav (AC: 1, 4)
	const footerNav = page.locator(".footer-nav");
	await expect(footerNav).toBeVisible();
	await expect(footerNav.locator('a[href="about/"]')).toBeVisible();
	await expect(footerNav.locator('a[href="contact/"]')).toBeVisible();
	await expect(footerNav.locator('a[href="proof-cases/"]')).toBeVisible();
	await expect(footerNav.locator('a[href="faq/"]')).toBeVisible();
	await expect(footerNav.locator('a[href="privacy/"]')).toBeVisible();
	await expect(footerNav.locator('a[href="terms/"]')).toBeVisible();
});

const trustFloorPages = [
	{
		path: "/about/",
		heading: /genu\.im/i,
		title: /About\s+[-—]\s+genu\.im/i,
		canonical: "https://genu.im/about/",
	},
	{
		path: "/contact/",
		heading: /get in touch|contact/i,
		title: /Contact\s+[-—]\s+genu\.im/i,
		canonical: "https://genu.im/contact/",
	},
	{
		path: "/proof-cases/",
		heading: /proof/i,
		title: /Proof\s*&\s*Cases\s+[-—]\s+genu\.im/i,
		canonical: "https://genu.im/proof-cases/",
	},
	{
		path: "/faq/",
		heading: /questions|faq/i,
		title: /FAQ\s+[-—]\s+genu\.im/i,
		canonical: "https://genu.im/faq/",
	},
	{
		path: "/privacy/",
		heading: /privacy/i,
		title: /Privacy Policy\s+[-—]\s+genu\.im/i,
		canonical: "https://genu.im/privacy/",
	},
	{
		path: "/terms/",
		heading: /terms/i,
		title: /Terms of Use\s+[-—]\s+genu\.im/i,
		canonical: "https://genu.im/terms/",
	},
];

for (const { path, heading, title } of trustFloorPages) {
	test(`@smoke GM trust-floor page ${path} resolves with visible heading and back link`, async ({
		page,
		baseURL,
	}) => {
		await page.goto(
			new URL(path, baseURL ?? "http://localhost:3000").toString(),
		);
		await page.waitForLoadState("domcontentloaded");

		// Page title in browser tab must be page-specific (AC: 2, 3)
		await expect(page).toHaveTitle(title);

		// h1 must be visible and match expected content (AC: 2)
		const h1 = page.locator("h1.info-page__title");
		await expect(h1).toBeVisible();
		await expect(h1).toContainText(heading);

		// Back link to homepage must be present (AC: 4)
		const backLink = page.locator(".info-back-link");
		await expect(backLink).toBeVisible();
		await expect(backLink).toHaveAttribute("href", "../");
	});
}

test("@smoke GM trust-floor pages have page-specific SEO metadata", async ({
	page,
	baseURL,
}) => {
	const descriptions: string[] = [];
	for (const { path, canonical, title } of trustFloorPages) {
		await page.goto(
			new URL(path, baseURL ?? "http://localhost:3000").toString(),
		);
		await page.waitForLoadState("domcontentloaded");
		await expect(page).toHaveTitle(title);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			"href",
			canonical,
		);
		const desc = await page
			.locator('meta[name="description"]')
			.getAttribute("content");
		// Each page must have a non-empty description (AC: 3)
		expect(desc).toBeTruthy();
		expect(desc?.length).toBeGreaterThan(20);
		descriptions.push(desc ?? "");
	}
	// All descriptions must be unique (AC: 3)
	const unique = new Set(descriptions);
	expect(unique.size).toBe(trustFloorPages.length);
});

test("GM trust-floor accessibility labels switch with language", async ({
	page,
	baseURL,
}) => {
	for (const { path } of trustFloorPages) {
		await page.goto(
			new URL("/", baseURL ?? "http://localhost:3000").toString(),
		);
		await page.evaluate(() => {
			window.localStorage.removeItem("lang");
		});
		await page.goto(
			new URL(path, baseURL ?? "http://localhost:3000").toString(),
		);
		await page.waitForLoadState("domcontentloaded");

		await expect(page.locator(".logo-lockup")).toHaveAttribute(
			"aria-label",
			"genu.im home",
		);
		await expect(page.locator(".footer-nav")).toHaveAttribute(
			"aria-label",
			"Site pages",
		);

		await page.locator("#langToggle").click();

		await expect(page.locator(".logo-lockup")).toHaveAttribute(
			"aria-label",
			"Головна genu.im",
		);
		await expect(page.locator(".footer-nav")).toHaveAttribute(
			"aria-label",
			"Сторінки сайту",
		);
	}
});

test("GM homepage trust-floor nav label switches with language", async ({
	page,
	baseURL,
}) => {
	await page.goto(new URL("/", baseURL ?? "http://localhost:3000").toString());
	await page.evaluate(() => {
		window.localStorage.removeItem("lang");
	});
	await page.goto(new URL("/", baseURL ?? "http://localhost:3000").toString());
	await page.waitForLoadState("domcontentloaded");
	await expect(page.locator(".footer-nav")).toHaveAttribute(
		"aria-label",
		"Site pages",
	);
	await page.locator("#langToggle").click();
	await expect(page.locator(".footer-nav")).toHaveAttribute(
		"aria-label",
		"Сторінки сайту",
	);
});

test("GM trust-floor pages are usable at 360px width", async ({
	page,
	baseURL,
}) => {
	await page.setViewportSize({ width: 360, height: 640 });
	for (const { path } of trustFloorPages) {
		await page.goto(
			new URL(path, baseURL ?? "http://localhost:3000").toString(),
		);
		await page.waitForLoadState("domcontentloaded");

		// No horizontal overflow at 360px (AC: 5)
		const scrollWidth = await page.evaluate(
			() => document.documentElement.scrollWidth,
		);
		const clientWidth = await page.evaluate(
			() => document.documentElement.clientWidth,
		);
		expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

		// h1 and back link must be visible (AC: 5)
		await expect(page.locator("h1.info-page__title")).toBeVisible();
		await expect(page.locator(".info-back-link")).toBeVisible();
	}
});

// ── Knowledge placeholder (Story 1.5) ──

test("@smoke GM homepage exposes knowledge link in public navigation and footer", async ({
	page,
	baseURL,
}) => {
	await page.goto(new URL("/", baseURL ?? "http://localhost:3000").toString());
	await page.waitForLoadState("domcontentloaded");

	await expect(page.locator('.footer-nav a[href="knowledge/"]')).toBeVisible();

	const burgerButton = page.locator("#burgerBtn");
	if (await burgerButton.isVisible()) {
		await burgerButton.click();
		await expect(page.locator('#mainNav a[href="/knowledge/"]')).toBeVisible();
	} else {
		await expect(page.locator('#mainNav a[href="/knowledge/"]')).toBeVisible();
	}
});

test("@smoke GM knowledge page resolves with purpose copy and way back", async ({
	page,
	baseURL,
}) => {
	await page.goto(
		new URL("/knowledge/", baseURL ?? "http://localhost:3000").toString(),
	);
	await page.waitForLoadState("domcontentloaded");

	await expect(page).toHaveTitle(/Knowledge\s+[-—]\s+genu\.im/i);
	await expect(page.locator("h1.info-page__title")).toBeVisible();
	await expect(page.locator("main")).toContainText(/guides|articles/i);
	await expect(page.locator("main")).toContainText(/early|phase 1|not yet/i);
	await expect(page.locator("main .info-section")).toHaveCount(3);
	await expect(page.locator("main a")).toHaveCount(1);
	await expect(page.locator("main form")).toHaveCount(0);
	await expect(page.locator("main input")).toHaveCount(0);
	await expect(page.locator("main")).not.toContainText(
		/sign in|log in|live lookup|verified|search/i,
	);
	await expect(page.locator(".info-back-link")).toHaveAttribute("href", "../");
});

test("@smoke GM knowledge page has page-specific SEO metadata", async ({
	page,
	baseURL,
}) => {
	await page.goto(
		new URL("/knowledge/", baseURL ?? "http://localhost:3000").toString(),
	);
	await page.waitForLoadState("domcontentloaded");

	await expect(page).toHaveTitle(/Knowledge\s+[-—]\s+genu\.im/i);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		"href",
		"https://genu.im/knowledge/",
	);
	await expect(
		page.locator('link[rel="alternate"][hreflang="uk"]'),
	).toHaveAttribute("href", "https://genu.im/knowledge/");
	await expect(
		page.locator('link[rel="alternate"][hreflang="en"]'),
	).toHaveAttribute("href", "https://genu.im/knowledge/");
	await expect(
		page.locator('link[rel="alternate"][hreflang="x-default"]'),
	).toHaveAttribute("href", "https://genu.im/knowledge/");
	await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
		"content",
		"Knowledge — genu.im",
	);
	await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
		"content",
		"website",
	);
	await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
		"content",
		"https://genu.im/knowledge/",
	);
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		"content",
		"https://genu.im/assets/favicon/android-chrome-512x512.png",
	);
	await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
		"content",
		"summary_large_image",
	);
	await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
		"content",
		"Knowledge — genu.im",
	);
	const desc = await page
		.locator('meta[name="description"]')
		.getAttribute("content");
	expect(desc).toBeTruthy();
	expect(desc?.length).toBeGreaterThan(20);
	await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
		"content",
		desc ?? "",
	);
	await expect(
		page.locator('meta[name="twitter:description"]'),
	).toHaveAttribute("content", desc ?? "");
	const structuredData = await page
		.locator('script[type="application/ld+json"]')
		.textContent();
	expect(structuredData).toContain('"@type":"WebPage"');
	expect(structuredData).toContain('"url":"https://genu.im/knowledge/"');
});

test("GM knowledge page is usable at 360px width", async ({
	page,
	baseURL,
}) => {
	await page.setViewportSize({ width: 360, height: 640 });
	await page.goto(
		new URL("/knowledge/", baseURL ?? "http://localhost:3000").toString(),
	);
	await page.waitForLoadState("domcontentloaded");

	const scrollWidth = await page.evaluate(
		() => document.documentElement.scrollWidth,
	);
	const clientWidth = await page.evaluate(
		() => document.documentElement.clientWidth,
	);
	expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
	await expect(page.locator("h1.info-page__title")).toBeVisible();
	await expect(page.locator(".info-back-link")).toBeVisible();
});
