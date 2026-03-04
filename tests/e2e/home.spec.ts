// biome-ignore assist/source/organizeImports: <explanation>
import { test, expect } from '@playwright/test';

test('GM landing page loads and shows hero CTA', async ({ page }) => {
	await page.goto('/');
	await page.waitForLoadState('domcontentloaded');
	await expect(page).toHaveTitle(/genu\.im/i);

	// Prefer stable, user-facing selectors over internal i18n attributes.
	// CTA text on genu.im is "Verify Product" (button in hero area).
	const cta = page.getByRole('button', { name: /verify product/i });

	// If the CTA is a link instead of a button, fall back to role=link.
	if (await cta.count()) {
		await expect(cta.first()).toBeVisible();
	} else {
		await expect(page.getByRole('link', { name: /verify product/i }).first()).toBeVisible();
	}

	await expect(page.locator('[data-i18n="hero.title"]')).toBeVisible();
});