import { expect, test } from "@playwright/test";

test("GM landing page loads and shows hero CTA", async ({ page }) => {
	await page.goto("/");
	await page.waitForLoadState("domcontentloaded");
	await expect(page).toHaveTitle(/genu\.im/i);

	// CTA лучше проверять по роли/тексту, а не по внутренним i18n-атрибутам
	const ctaButton = page.getByRole("button", { name: /verify product/i });
	const ctaLink = page.getByRole("link", { name: /verify product/i });

	if (await ctaButton.count()) {
		await expect(ctaButton.first()).toBeVisible();
	} else {
		await expect(ctaLink.first()).toBeVisible();
	}

	await expect(page.locator('[data-i18n="hero.title"]')).toBeVisible();
});
