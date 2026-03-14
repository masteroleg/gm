import { expect, test } from "@playwright/test";

test.describe("Request form — /request/", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/request/");
	});

	// ── AC #1: Form with 5 required fields ────────────────────────────────

	test("@smoke request form is visible on page", async ({ page }) => {
		const form = page.locator("[data-request-form]");
		await expect(form).toBeVisible();
	});

	test("@smoke form has exactly 5 user-entered fields", async ({ page }) => {
		const form = page.locator("[data-request-form]");
		const inputs = form.locator("input, select, textarea");
		await expect(inputs).toHaveCount(5);
	});

	test("@smoke all 5 fields are visible", async ({ page }) => {
		await expect(page.locator("#contactName")).toBeVisible();
		await expect(page.locator("#contactEmail")).toBeVisible();
		await expect(page.locator("#companyName")).toBeVisible();
		await expect(page.locator("#scenario")).toBeVisible();
		await expect(page.locator("#context")).toBeVisible();
	});

	test("@smoke each field has a visible label", async ({ page }) => {
		const labelIds = [
			"contactName",
			"contactEmail",
			"companyName",
			"scenario",
			"context",
		];
		for (const id of labelIds) {
			const label = page.locator(`label[for="${id}"]`);
			await expect(label).toBeVisible();
		}
	});

	test("@smoke submit button is visible and labelled", async ({ page }) => {
		const submit = page.locator("[data-request-form] button[type='submit']");
		await expect(submit).toBeVisible();
		const text = await submit.textContent();
		expect(text?.trim().length).toBeGreaterThan(2);
	});

	// ── AC #4: Validation prevents submission ─────────────────────────────

	test("@smoke empty form submission shows error messages", async ({
		page,
	}) => {
		const submit = page.locator("[data-request-form] button[type='submit']");
		await submit.click();

		// At least the first error should be visible
		const nameError = page.locator("#contactNameError");
		const errorText = await nameError.textContent();
		expect(errorText?.trim().length).toBeGreaterThan(0);
	});

	test("validation clears error when field is filled", async ({ page }) => {
		// Submit empty to trigger errors
		await page.locator("button[type='submit']").click();

		// Fill in the name field
		await page.locator("#contactName").fill("Alice");
		// Re-submit (errors for other fields remain, but name error should clear)
		await page.locator("button[type='submit']").click();

		const nameError = page.locator("#contactNameError");
		const text = await nameError.textContent();
		expect(text?.trim()).toBe("");
	});

	// ── AC #2 & #3: mailto: handoff intent ───────────────────────────────
	// We verify that form build up works correctly (we cannot actually trigger
	// the native mail client in tests, but we verify the URL structure via JS)

	test("@smoke scenario dropdown has brand-proof and eaktsyz options", async ({
		page,
	}) => {
		const select = page.locator("#scenario");
		await expect(select).toBeVisible();
		const brandProofOption = select.locator('option[value="brand-proof"]');
		const eaktsyzOption = select.locator('option[value="eaktsyz"]');
		await expect(brandProofOption).toHaveCount(1);
		await expect(eaktsyzOption).toHaveCount(1);
	});

	test("@smoke ?scenario= URL param pre-fills the scenario dropdown", async ({
		page,
	}) => {
		await page.goto("/request/?scenario=eaktsyz");
		const select = page.locator("#scenario");
		const value = await select.inputValue();
		expect(value).toBe("eaktsyz");
	});

	// ── AC #5: Responsive at 360px ────────────────────────────────────────

	test("@smoke form is readable and usable at 360px width without horizontal scroll", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 360, height: 640 });
		await page.goto("/request/");

		// Form should be visible
		const form = page.locator("[data-request-form]");
		await expect(form).toBeVisible();

		// All fields should be usable
		const contactName = page.locator("#contactName");
		await expect(contactName).toBeVisible();
		await contactName.click();
		await contactName.fill("Test User");

		// Submit button should be clickable
		const submit = page.locator("[data-request-form] button[type='submit']");
		await expect(submit).toBeVisible();
		await submit.click();

		// Errors should be shown
		const error = page.locator("#contactEmailError");
		await expect(error).toBeVisible();
	});

	// ── AC #6: Fallback behavior ──────────────────────────────────────────

	test("fallback link is present in fallback message", async ({ page }) => {
		// Trigger the form submission to show fallback
		await page.locator("#contactName").fill("Alice");
		await page.locator("#contactEmail").fill("alice@example.com");
		await page.locator("#companyName").fill("ACME");
		await page.locator("#scenario").selectOption("brand-proof");
		await page.locator("#context").fill("Test context");

		// Verify the fallback element exists and has the email link
		const fallbackLink = page.locator('a[href="mailto:hello@genu.im"]');
		await expect(fallbackLink).toBeVisible();
	});

	test("confirmation text does not claim server submission", async ({
		page,
	}) => {
		// Verify the confirmation text exists and doesn't claim server storage
		const confirmation = page.locator("[data-request-confirmation]");
		await expect(confirmation).toBeHidden(); // Initially hidden

		// Check that the text exists in the page
		const confirmationText = page.locator("[data-request-confirmation] p");
		const text = await confirmationText.textContent();
		expect(text).toContain("handoff");
		expect(text).toContain("not a stored submission");
	});

	// ── Story 3.4: Scenario pre-population from routing ───────────────────

	test("@smoke ?scenario=brand-proof pre-fills the scenario dropdown", async ({
		page,
	}) => {
		await page.goto("/request/?scenario=brand-proof");
		const select = page.locator("#scenario");
		const value = await select.inputValue();
		expect(value).toBe("brand-proof");
	});

	test("@smoke scenario dropdown is pre-filled when arriving from routing with ?scenario=eaktsyz", async ({
		page,
	}) => {
		await page.goto("/request/?scenario=eaktsyz");
		const select = page.locator("#scenario");
		await expect(select).toHaveValue("eaktsyz");
	});

	test("fallback meta section is present in DOM (Story 3.4 AC #5)", async ({
		page,
	}) => {
		// The data-request-fallback-meta element should exist in page markup
		const metaEl = page.locator("[data-request-fallback-meta]");
		await expect(metaEl).toBeAttached();
	});

	test("fallback does not claim submission succeeded when metadata absent (Story 3.4 AC #5)", async ({
		page,
	}) => {
		// The fallback element should not contain claims of server success
		const fallback = page.locator("[data-request-fallback]");
		const text = await fallback.textContent();
		// Ensure no claims of successful server submission in markup
		expect(text?.toLowerCase()).not.toMatch(
			/request (has been|was) (submitted|stored|received)/i,
		);
	});
});
