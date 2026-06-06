import { expect, test } from "@playwright/test";

test.describe("Request form — /request/ edge cases", () => {
	test("[P1] invalid email format shows validation", async ({ page }) => {
		await page.goto("/request/");
		await page.locator("#contactName").fill("Alice");
		await page.locator("#contactEmail").fill("not-an-email");
		await page.locator("#companyName").fill("ACME");
		await page.locator("#scenario").selectOption("brand-proof");
		await page.locator("#context").fill("Test");
		await page.locator("button[type='submit']").click();
		const emailError = page.locator("#contactEmailError");
		const text = await emailError.textContent();
		expect(text?.trim().length).toBeGreaterThan(0);
	});

	test("[P1] very long name input does not break form", async ({ page }) => {
		await page.goto("/request/");
		const longName = "A".repeat(500);
		await page.locator("#contactName").fill(longName);
		const value = await page.locator("#contactName").inputValue();
		expect(value.length).toBeGreaterThanOrEqual(500);
	});

	test("[P1] XSS attempt in name field does not execute", async ({ page }) => {
		await page.goto("/request/");
		await page.locator("#contactName").fill("<img src=x onerror=alert(1)>");
		await page.locator("#contactEmail").fill("test@test.com");
		await page.locator("#companyName").fill("ACME");
		await page.locator("#scenario").selectOption("brand-proof");
		await page.locator("#context").fill("Test context");
		await page.locator("button[type='submit']").click();

		page.on("dialog", () => {
			throw new Error("XSS alert triggered");
		});
		const fallbackLink = page.locator('a[href="mailto:hello@genu.im"]');
		await expect(fallbackLink).toBeVisible({ timeout: 10000 });
	});

	test("[P1] special characters in context field", async ({ page }) => {
		await page.goto("/request/");
		await page.locator("#contactName").fill("Alice");
		await page.locator("#contactEmail").fill("alice@test.com");
		await page.locator("#companyName").fill("ACME");
		await page.locator("#scenario").selectOption("brand-proof");
		await page
			.locator("#context")
			.fill("Hello! @#$% ^&*()_+-=[]{}|;':\",./<>?`~");
		await page.locator("button[type='submit']").click();
		const fallbackLink = page.locator('a[href="mailto:hello@genu.im"]');
		await expect(fallbackLink).toBeVisible({ timeout: 10000 });
	});
});
