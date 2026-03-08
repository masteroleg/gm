import { expect, test } from "@playwright/test";

test("GM landing page loads and shows hero CTA", async ({ page, baseURL }) => {
	// await page.goto("/");
	await page.goto(new URL("/", baseURL ?? "http://localhost:3000").toString());
	await page.waitForLoadState("domcontentloaded");
	await expect(page).toHaveTitle(/genu\.im/i);

	// CTA лучше проверять по роли/тексту, а не по внутренним i18n-атрибутам
	const ctaButton = page.getByRole("button", { name: /talk to us/i });
	const ctaLink = page.getByRole("link", { name: /talk to us/i });

	if (await ctaButton.count()) {
		await expect(ctaButton.first()).toBeVisible();
	} else {
		await expect(ctaLink.first()).toBeVisible();
	}

	await expect(page.locator(".hero-title")).toBeVisible();
});
