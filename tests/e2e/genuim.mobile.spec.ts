import { test, expect } from '@playwright/test';
import { GenuimPage } from './pages/genuim.page';

test('genu.im — mobile menu opens and closes', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 667 });
	const app = new GenuimPage(page);
	await app.gotoHome();

	await expect(app.mainNav).toHaveClass(/hidden/);
	await app.burgerBtn.click();
	await expect(app.mainNav).not.toHaveClass(/hidden/);
	await app.closeMenu.click();
	await expect(app.mainNav).toHaveClass(/hidden/);
});