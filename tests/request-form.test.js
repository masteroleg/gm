/**
 * @jest-environment jsdom
 */

/**
 * Tests for Story 3.3: Send a Qualified Request
 *
 * Covers:
 * - AC #1: Form has exactly 5 user-entered fields
 * - AC #2: mailto: handoff with entered details
 * - AC #3: Handoff confirms initiation only (not server submission)
 * - AC #4: Validation prevents submission with missing/invalid fields
 * - AC #5: Responsive at 360px (E2E)
 * - AC #6: Fallback when mailto: cannot open
 */

// ── helpers ────────────────────────────────────────────────────────────────

const buildFormDOM = () => {
	document.body.innerHTML = `
		<main class="info-page request-page">
			<form id="requestForm" class="request-form" data-request-form novalidate>
				<div class="request-form__group">
					<label for="contactName" class="request-form__label" data-i18n="request.field.name">
						Contact name
					</label>
					<input
						type="text"
						id="contactName"
						name="contactName"
						class="request-form__input"
						data-i18n-placeholder="request.field.namePlaceholder"
						placeholder="Your name"
						required
						autocomplete="name"
					/>
					<span class="request-form__error" id="contactNameError" role="alert" aria-live="polite"></span>
				</div>

				<div class="request-form__group">
					<label for="contactEmail" class="request-form__label" data-i18n="request.field.email">
						Business email or phone
					</label>
					<input
						type="text"
						id="contactEmail"
						name="contactEmail"
						class="request-form__input"
						data-i18n-placeholder="request.field.emailPlaceholder"
						placeholder="email@company.com or +38..."
						required
						autocomplete="email"
					/>
					<span class="request-form__error" id="contactEmailError" role="alert" aria-live="polite"></span>
				</div>

				<div class="request-form__group">
					<label for="companyName" class="request-form__label" data-i18n="request.field.company">
						Company name
					</label>
					<input
						type="text"
						id="companyName"
						name="companyName"
						class="request-form__input"
						data-i18n-placeholder="request.field.companyPlaceholder"
						placeholder="Company Ltd."
						required
						autocomplete="organization"
					/>
					<span class="request-form__error" id="companyNameError" role="alert" aria-live="polite"></span>
				</div>

				<div class="request-form__group">
					<label for="scenario" class="request-form__label" data-i18n="request.field.scenario">
						Scenario
					</label>
					<select
						id="scenario"
						name="scenario"
						class="request-form__select"
						required
					>
						<option value="" data-i18n="request.field.scenarioPlaceholder">Select a scenario</option>
						<option value="brand-proof" data-i18n="request.scenario.brandProof">Brand proof rollout</option>
						<option value="eaktsyz" data-i18n="request.scenario.eaktsyz">eAktsyz readiness</option>
					</select>
					<span class="request-form__error" id="scenarioError" role="alert" aria-live="polite"></span>
				</div>

				<div class="request-form__group">
					<label for="context" class="request-form__label" data-i18n="request.field.context">
						Short context
					</label>
					<textarea
						id="context"
						name="context"
						class="request-form__textarea"
						rows="4"
						data-i18n-placeholder="request.field.contextPlaceholder"
						placeholder="Brief description of your situation"
						required
					></textarea>
					<span class="request-form__error" id="contextError" role="alert" aria-live="polite"></span>
				</div>

				<button type="submit" class="cta-button request-form__submit" data-i18n="request.submit">
					Send request
				</button>
			</form>

			<div class="request-form__confirmation" id="requestConfirmation" hidden data-request-confirmation>
				<p class="request-form__confirmation-text" data-i18n="request.confirmation.text">
					Your mail client should now open with the details filled in.
					This is a handoff — not a stored submission.
				</p>
			</div>

			<div class="request-form__fallback" id="requestFallback" hidden data-request-fallback>
				<p class="request-form__fallback-text" data-i18n="request.fallback.text">
					Your mail client did not open. Your details are still visible below.
					To send your request, email us directly at
					<a href="mailto:hello@genu.im" class="info-link">hello@genu.im</a>.
				</p>
			</div>
		</main>
	`;
};

// ── AC #1: Form fields ────────────────────────────────────────────────────

describe("Request form — 5 required user-entered fields (AC #1)", () => {
	beforeEach(() => {
		buildFormDOM();
	});

	test("form element is present with data-request-form attribute", () => {
		const form = document.querySelector("[data-request-form]");
		expect(form).not.toBeNull();
		expect(form.tagName.toLowerCase()).toBe("form");
	});

	test("form has exactly 5 user-entered fields (inputs + select + textarea)", () => {
		const form = document.querySelector("[data-request-form]");
		const inputs = form.querySelectorAll("input, select, textarea");
		// Exclude any hidden / submit inputs
		const userFields = Array.from(inputs).filter(
			(el) => el.type !== "submit" && el.type !== "hidden",
		);
		expect(userFields).toHaveLength(5);
	});

	test("contactName field is present and required", () => {
		const field = document.getElementById("contactName");
		expect(field).not.toBeNull();
		expect(field.required).toBe(true);
	});

	test("contactEmail field is present and required", () => {
		const field = document.getElementById("contactEmail");
		expect(field).not.toBeNull();
		expect(field.required).toBe(true);
	});

	test("companyName field is present and required", () => {
		const field = document.getElementById("companyName");
		expect(field).not.toBeNull();
		expect(field.required).toBe(true);
	});

	test("scenario field is present and required", () => {
		const field = document.getElementById("scenario");
		expect(field).not.toBeNull();
		expect(field.required).toBe(true);
	});

	test("context field is present and required", () => {
		const field = document.getElementById("context");
		expect(field).not.toBeNull();
		expect(field.required).toBe(true);
	});

	test("each field has a visible label associated via id/for", () => {
		const fieldIds = [
			"contactName",
			"contactEmail",
			"companyName",
			"scenario",
			"context",
		];
		for (const id of fieldIds) {
			const label = document.querySelector(`label[for="${id}"]`);
			expect(label).not.toBeNull();
		}
	});

	test("no additional required user-entered fields exist beyond the 5", () => {
		const form = document.querySelector("[data-request-form]");
		const allRequired = form.querySelectorAll(
			"input[required], select[required], textarea[required]",
		);
		expect(allRequired).toHaveLength(5);
	});

	test("submit button is present", () => {
		const submit = document.querySelector(
			"[data-request-form] button[type='submit']",
		);
		expect(submit).not.toBeNull();
	});
});

// ── AC #4: Validation logic ───────────────────────────────────────────────

describe("Request form — validation logic (AC #4)", () => {
	let validateForm;

	beforeEach(() => {
		jest.resetModules();
		buildFormDOM();
		({ validateForm } = require("../site/assets/js/request-form.js"));
	});

	test("validateForm returns false when all fields are empty", () => {
		const isValid = validateForm();
		expect(isValid).toBe(false);
	});

	test("validateForm returns false when contactName is empty", () => {
		document.getElementById("contactEmail").value = "test@example.com";
		document.getElementById("companyName").value = "ACME";
		document.getElementById("scenario").value = "brand-proof";
		document.getElementById("context").value = "Some context";
		const isValid = validateForm();
		expect(isValid).toBe(false);
	});

	test("validateForm returns false when contactEmail is empty", () => {
		document.getElementById("contactName").value = "Alice";
		document.getElementById("companyName").value = "ACME";
		document.getElementById("scenario").value = "brand-proof";
		document.getElementById("context").value = "Some context";
		const isValid = validateForm();
		expect(isValid).toBe(false);
	});

	test("validateForm returns false when companyName is empty", () => {
		document.getElementById("contactName").value = "Alice";
		document.getElementById("contactEmail").value = "test@example.com";
		document.getElementById("scenario").value = "brand-proof";
		document.getElementById("context").value = "Some context";
		const isValid = validateForm();
		expect(isValid).toBe(false);
	});

	test("validateForm returns false when scenario is not selected", () => {
		document.getElementById("contactName").value = "Alice";
		document.getElementById("contactEmail").value = "test@example.com";
		document.getElementById("companyName").value = "ACME";
		document.getElementById("context").value = "Some context";
		const isValid = validateForm();
		expect(isValid).toBe(false);
	});

	test("validateForm returns false when context is empty", () => {
		document.getElementById("contactName").value = "Alice";
		document.getElementById("contactEmail").value = "test@example.com";
		document.getElementById("companyName").value = "ACME";
		document.getElementById("scenario").value = "brand-proof";
		const isValid = validateForm();
		expect(isValid).toBe(false);
	});

	test("validateForm returns true when all fields are filled correctly", () => {
		document.getElementById("contactName").value = "Alice";
		document.getElementById("contactEmail").value = "alice@example.com";
		document.getElementById("companyName").value = "ACME";
		document.getElementById("scenario").value = "brand-proof";
		document.getElementById("context").value =
			"Need brand proof for eAktsyz rollout";
		const isValid = validateForm();
		expect(isValid).toBe(true);
	});

	test("validateForm accepts phone number as contactEmail", () => {
		document.getElementById("contactName").value = "Bob";
		document.getElementById("contactEmail").value = "+380441234567";
		document.getElementById("companyName").value = "Corp";
		document.getElementById("scenario").value = "eaktsyz";
		document.getElementById("context").value = "Phone contact preferred";
		const isValid = validateForm();
		expect(isValid).toBe(true);
	});

	test("validateForm rejects invalid email format when @ is present but malformed", () => {
		document.getElementById("contactName").value = "Bob";
		document.getElementById("contactEmail").value = "notanemail@";
		document.getElementById("companyName").value = "Corp";
		document.getElementById("scenario").value = "eaktsyz";
		document.getElementById("context").value = "Some context";
		const isValid = validateForm();
		expect(isValid).toBe(false);
	});

	test("error messages are shown for empty fields after validateForm call", () => {
		validateForm();
		const nameError = document.getElementById("contactNameError");
		expect(nameError.textContent.trim().length).toBeGreaterThan(0);
	});

	test("error messages are cleared for valid fields", () => {
		document.getElementById("contactName").value = "Alice";
		document.getElementById("contactEmail").value = "alice@example.com";
		document.getElementById("companyName").value = "ACME";
		document.getElementById("scenario").value = "brand-proof";
		document.getElementById("context").value = "Some context";
		validateForm();
		const nameError = document.getElementById("contactNameError");
		expect(nameError.textContent.trim()).toBe("");
	});
});

// ── AC #2 & #3: mailto: handoff generation ────────────────────────────────

describe("Request form — mailto: URL generation (AC #2, #3)", () => {
	let buildMailtoUrl;

	beforeEach(() => {
		jest.resetModules();
		({ buildMailtoUrl } = require("../site/assets/js/request-form.js"));
	});

	test("buildMailtoUrl returns a mailto: URL", () => {
		const url = buildMailtoUrl({
			contactName: "Alice",
			contactEmail: "alice@example.com",
			companyName: "ACME",
			scenario: "brand-proof",
			context: "Need proof rollout",
		});
		expect(url).toMatch(/^mailto:/);
	});

	test("mailto: URL contains recipient address", () => {
		const url = buildMailtoUrl({
			contactName: "Alice",
			contactEmail: "alice@example.com",
			companyName: "ACME",
			scenario: "brand-proof",
			context: "Need proof rollout",
		});
		expect(url).toContain("hello@genu.im");
	});

	test("mailto: URL includes company name in body", () => {
		const url = buildMailtoUrl({
			contactName: "Alice",
			contactEmail: "alice@example.com",
			companyName: "ACME Corp",
			scenario: "brand-proof",
			context: "Need proof rollout",
		});
		const decoded = decodeURIComponent(url);
		expect(decoded).toContain("ACME Corp");
	});

	test("mailto: URL includes contact name in body", () => {
		const url = buildMailtoUrl({
			contactName: "Alice Smith",
			contactEmail: "alice@example.com",
			companyName: "ACME",
			scenario: "brand-proof",
			context: "Some context",
		});
		const decoded = decodeURIComponent(url);
		expect(decoded).toContain("Alice Smith");
	});

	test("mailto: URL includes contact email/phone in body", () => {
		const url = buildMailtoUrl({
			contactName: "Alice",
			contactEmail: "alice@example.com",
			companyName: "ACME",
			scenario: "brand-proof",
			context: "Some context",
		});
		const decoded = decodeURIComponent(url);
		expect(decoded).toContain("alice@example.com");
	});

	test("mailto: URL includes scenario in body", () => {
		const url = buildMailtoUrl({
			contactName: "Alice",
			contactEmail: "alice@example.com",
			companyName: "ACME",
			scenario: "eaktsyz",
			context: "Need eaktsyz compliance",
		});
		const decoded = decodeURIComponent(url);
		expect(decoded).toContain("eaktsyz");
	});

	test("mailto: URL includes context in body", () => {
		const url = buildMailtoUrl({
			contactName: "Alice",
			contactEmail: "alice@example.com",
			companyName: "ACME",
			scenario: "brand-proof",
			context: "Specific rollout context here",
		});
		const decoded = decodeURIComponent(url);
		expect(decoded).toContain("Specific rollout context here");
	});

	test("mailto: URL includes a subject line", () => {
		const url = buildMailtoUrl({
			contactName: "Alice",
			contactEmail: "alice@example.com",
			companyName: "ACME",
			scenario: "brand-proof",
			context: "Some context",
		});
		expect(url).toContain("subject=");
	});
});

// ── AC #6: Fallback handling ──────────────────────────────────────────────

describe("Request form — fallback handling (AC #6)", () => {
	let showFallback, showConfirmation;

	beforeEach(() => {
		jest.resetModules();
		buildFormDOM();
		({
			showFallback,
			showConfirmation,
		} = require("../site/assets/js/request-form.js"));
	});

	test("showFallback shows the fallback element", () => {
		const fallback = document.getElementById("requestFallback");
		expect(fallback.hidden).toBe(true);
		showFallback();
		expect(fallback.hidden).toBe(false);
	});

	test("showFallback does not hide the form values", () => {
		document.getElementById("contactName").value = "Alice";
		document.getElementById("contactEmail").value = "alice@example.com";
		document.getElementById("companyName").value = "ACME";
		document.getElementById("scenario").value = "brand-proof";
		document.getElementById("context").value = "Some context";

		showFallback();

		// Form should still be accessible (not hidden)
		const form = document.querySelector("[data-request-form]");
		expect(form.hidden).toBe(false);
		// Values should remain intact
		expect(document.getElementById("contactName").value).toBe("Alice");
	});

	test("showFallback contains a direct email contact link", () => {
		showFallback();
		const fallback = document.getElementById("requestFallback");
		const emailLink = fallback.querySelector('a[href="mailto:hello@genu.im"]');
		expect(emailLink).not.toBeNull();
	});

	test("showConfirmation shows the confirmation element", () => {
		const confirmation = document.getElementById("requestConfirmation");
		expect(confirmation.hidden).toBe(true);
		showConfirmation();
		expect(confirmation.hidden).toBe(false);
	});

	test("showConfirmation does NOT claim request was submitted to a server", () => {
		showConfirmation();
		const confirmation = document.getElementById("requestConfirmation");
		const text = confirmation.textContent.toLowerCase();
		// Must NOT positively claim server-side storage or submission
		// Phrases like "not a stored submission" are fine; "your request has been stored" is not
		expect(text).not.toMatch(
			/your request (has been|was) (stored|submitted|received)/i,
		);
		expect(text).not.toContain("received by server");
	});

	test("fallback is hidden initially", () => {
		const fallback = document.getElementById("requestFallback");
		expect(fallback.hidden).toBe(true);
	});

	test("confirmation is hidden initially", () => {
		const confirmation = document.getElementById("requestConfirmation");
		expect(confirmation.hidden).toBe(true);
	});
});

// ── Missing DOM guard ─────────────────────────────────────────────────────

describe("Request form — missing DOM guard", () => {
	test("controller does not throw when form is absent from DOM", () => {
		document.body.innerHTML = "<p>No form here</p>";
		jest.resetModules();
		expect(() => {
			require("../site/assets/js/request-form.js");
		}).not.toThrow();
	});
});

// ── Translation keys in lang-toggle.js ────────────────────────────────────

describe("Translation keys for request form in lang-toggle.js", () => {
	const requiredKeys = [
		"request.eyebrow",
		"request.title",
		"request.lead",
		"request.field.name",
		"request.field.email",
		"request.field.company",
		"request.field.scenario",
		"request.field.context",
		"request.submit",
		"request.confirmation.text",
		"request.fallback.text",
		"request.error.required",
		"request.error.emailInvalid",
		"request.scenario.brandProof",
		"request.scenario.eaktsyz",
	];

	let langToggleSource;

	beforeAll(() => {
		const fs = require("node:fs");
		const path = require("node:path");
		langToggleSource = fs.readFileSync(
			path.join(__dirname, "..", "site", "assets", "js", "lang-toggle.js"),
			"utf8",
		);
	});

	test("EN translations include all request form keys", () => {
		for (const key of requiredKeys) {
			expect(langToggleSource).toContain(`"${key}"`);
		}
	});

	test("UK translations include all request form keys", () => {
		const ukSection = langToggleSource.split("uk:")[1];
		expect(ukSection).toBeDefined();
		for (const key of requiredKeys) {
			expect(ukSection).toContain(`"${key}"`);
		}
	});

	test("confirmation text does not positively claim server submission", () => {
		const enConfirmMatch = langToggleSource.match(
			/"request\.confirmation\.text":\s*"([^"]+)"/,
		);
		expect(enConfirmMatch).not.toBeNull();
		const confirmText = enConfirmMatch[1].toLowerCase();
		// Must NOT make a positive claim of server-side storage
		// Phrases like "not a stored submission" are explicitly correct
		expect(confirmText).not.toMatch(
			/your request (has been|was) (stored|submitted|received)/i,
		);
		expect(confirmText).not.toContain("submitted to server");
	});
});

// ── Story 3.4: Metadata capture ───────────────────────────────────────────

describe("Request form — metadata capture: captureMetadata (Story 3.4 AC #1, #2)", () => {
	let captureMetadata;

	beforeEach(() => {
		jest.resetModules();
		({ captureMetadata } = require("../site/assets/js/request-form.js"));
	});

	test("captureMetadata returns an object with scenario, source_path, proof_path", () => {
		// Pass a fake location object directly (avoids window.location mock issues in JSDOM)
		const meta = captureMetadata({ search: "", pathname: "/request/" });
		expect(meta).toHaveProperty("scenario");
		expect(meta).toHaveProperty("source_path");
		expect(meta).toHaveProperty("proof_path");
	});

	test("captureMetadata reads scenario from ?scenario= URL param", () => {
		const meta = captureMetadata({
			search: "?scenario=eaktsyz",
			pathname: "/request/",
		});
		expect(meta.scenario).toBe("eaktsyz");
	});

	test("captureMetadata reads source_path from current pathname", () => {
		const meta = captureMetadata({
			search: "?scenario=brand-proof",
			pathname: "/request/",
		});
		expect(meta.source_path).toBe("/request/");
	});

	test("captureMetadata reads source_path from ?from= URL param when present", () => {
		const meta = captureMetadata({
			search: "?scenario=brand-proof&from=/proof/",
			pathname: "/request/",
		});
		expect(meta.source_path).toBe("/proof/");
	});

	test("captureMetadata sets proof_path when data-proof-path attribute exists on page", () => {
		document.body.innerHTML = `
			<div data-proof-path="/proof/acme-corp/unit-123"></div>
			<form data-request-form></form>
		`;
		const meta = captureMetadata({ search: "", pathname: "/request/" });
		expect(meta.proof_path).toBe("/proof/acme-corp/unit-123");
	});

	test("captureMetadata returns empty proof_path when no data-proof-path exists", () => {
		document.body.innerHTML = `<form data-request-form></form>`;
		const meta = captureMetadata({ search: "", pathname: "/request/" });
		expect(meta.proof_path).toBe("");
	});

	test("captureMetadata returns empty strings gracefully when called without arguments", () => {
		// Should not throw even without explicit location param (falls back to window.location)
		expect(() => captureMetadata()).not.toThrow();
		const meta = captureMetadata();
		expect(typeof meta).toBe("object");
		expect(meta).not.toBeNull();
	});

	test("captureMetadata returns empty scenario when no param present", () => {
		const meta = captureMetadata({ search: "", pathname: "/request/" });
		expect(meta.scenario).toBe("");
	});
});

// ── Story 3.4: metadata in mailto: payload (AC #3) ────────────────────────

describe("Request form — metadata in mailto: URL (Story 3.4 AC #3)", () => {
	let buildMailtoUrl;

	beforeEach(() => {
		jest.resetModules();
		({ buildMailtoUrl } = require("../site/assets/js/request-form.js"));
	});

	test("buildMailtoUrl includes source_path in body when provided", () => {
		const url = buildMailtoUrl({
			contactName: "Alice",
			contactEmail: "alice@example.com",
			companyName: "ACME",
			scenario: "brand-proof",
			context: "Some context",
			source_path: "/proof/acme/",
		});
		const decoded = decodeURIComponent(url);
		expect(decoded).toContain("/proof/acme/");
	});

	test("buildMailtoUrl includes proof_path in body when provided", () => {
		const url = buildMailtoUrl({
			contactName: "Alice",
			contactEmail: "alice@example.com",
			companyName: "ACME",
			scenario: "brand-proof",
			context: "Some context",
			source_path: "/proof/acme/",
			proof_path: "/proof/acme/unit-456",
		});
		const decoded = decodeURIComponent(url);
		expect(decoded).toContain("/proof/acme/unit-456");
	});

	test("buildMailtoUrl omits proof_path line when proof_path is empty", () => {
		const url = buildMailtoUrl({
			contactName: "Alice",
			contactEmail: "alice@example.com",
			companyName: "ACME",
			scenario: "brand-proof",
			context: "Some context",
			source_path: "/request/",
			proof_path: "",
		});
		const decoded = decodeURIComponent(url);
		expect(decoded).not.toContain("Proof page:");
	});

	test("buildMailtoUrl still works when source_path and proof_path are absent", () => {
		const url = buildMailtoUrl({
			contactName: "Alice",
			contactEmail: "alice@example.com",
			companyName: "ACME",
			scenario: "brand-proof",
			context: "Some context",
		});
		expect(url).toMatch(/^mailto:/);
		expect(url).toContain("hello@genu.im");
	});

	test("buildMailtoUrl uses best-effort language — does not claim guaranteed transport", () => {
		const url = buildMailtoUrl({
			contactName: "Alice",
			contactEmail: "alice@example.com",
			companyName: "ACME",
			scenario: "brand-proof",
			context: "Some context",
			source_path: "/request/",
		});
		const decoded = decodeURIComponent(url).toLowerCase();
		// Must NOT claim guaranteed server capture
		expect(decoded).not.toContain("guaranteed");
		expect(decoded).not.toContain("stored on server");
		expect(decoded).not.toContain("captured server");
	});
});

// ── Story 3.4: fallback shows metadata (AC #5) ───────────────────────────

describe("Request form — fallback shows metadata (Story 3.4 AC #5)", () => {
	let showFallbackWithMeta;

	beforeEach(() => {
		jest.resetModules();
		document.body.innerHTML = `
			<form data-request-form novalidate>
				<input id="contactName" value="Alice" />
				<input id="contactEmail" value="alice@example.com" />
				<input id="companyName" value="ACME" />
				<select id="scenario"><option value="brand-proof" selected>Brand proof</option></select>
				<textarea id="context">Some context</textarea>
			</form>
			<div id="requestFallback" hidden data-request-fallback>
				<p><span data-i18n="request.fallback.text">Your mail client did not open.</span>
				<a href="mailto:hello@genu.im">hello@genu.im</a></p>
				<div id="requestFallbackMeta" hidden data-request-fallback-meta></div>
			</div>
		`;
		({ showFallbackWithMeta } = require("../site/assets/js/request-form.js"));
	});

	test("showFallbackWithMeta is exported", () => {
		expect(typeof showFallbackWithMeta).toBe("function");
	});

	test("showFallbackWithMeta shows the fallback element", () => {
		const fallback = document.getElementById("requestFallback");
		showFallbackWithMeta({
			scenario: "brand-proof",
			source_path: "/request/",
			proof_path: "",
		});
		expect(fallback.hidden).toBe(false);
	});

	test("showFallbackWithMeta reveals meta section when it exists", () => {
		showFallbackWithMeta({
			scenario: "brand-proof",
			source_path: "/request/",
			proof_path: "",
		});
		const meta = document.getElementById("requestFallbackMeta");
		expect(meta.hidden).toBe(false);
	});

	test("showFallbackWithMeta populates scenario in meta section", () => {
		showFallbackWithMeta({
			scenario: "eaktsyz",
			source_path: "/proof/",
			proof_path: "",
		});
		const meta = document.getElementById("requestFallbackMeta");
		expect(meta.textContent).toContain("eaktsyz");
	});

	test("showFallbackWithMeta populates source_path in meta section", () => {
		showFallbackWithMeta({
			scenario: "brand-proof",
			source_path: "/proof/acme/",
			proof_path: "",
		});
		const meta = document.getElementById("requestFallbackMeta");
		expect(meta.textContent).toContain("/proof/acme/");
	});

	test("showFallbackWithMeta populates proof_path in meta section when present", () => {
		showFallbackWithMeta({
			scenario: "brand-proof",
			source_path: "/proof/acme/",
			proof_path: "/proof/acme/unit-789",
		});
		const meta = document.getElementById("requestFallbackMeta");
		expect(meta.textContent).toContain("/proof/acme/unit-789");
	});

	test("showFallbackWithMeta does not crash when meta element is absent", () => {
		document.body.innerHTML = `
			<div id="requestFallback" hidden data-request-fallback>
				<p><a href="mailto:hello@genu.im">hello@genu.im</a></p>
			</div>
		`;
		jest.resetModules();
		({ showFallbackWithMeta } = require("../site/assets/js/request-form.js"));
		expect(() => {
			showFallbackWithMeta({
				scenario: "brand-proof",
				source_path: "/request/",
				proof_path: "",
			});
		}).not.toThrow();
	});

	test("showFallbackWithMeta works with empty/missing metadata fields", () => {
		expect(() => {
			showFallbackWithMeta({});
		}).not.toThrow();
	});

	test("showFallbackWithMeta does not claim submission was completed", () => {
		showFallbackWithMeta({
			scenario: "brand-proof",
			source_path: "/request/",
			proof_path: "",
		});
		const meta = document.getElementById("requestFallbackMeta");
		const text = meta.textContent.toLowerCase();
		expect(text).not.toMatch(
			/request (has been|was) (submitted|stored|received)/i,
		);
	});
});

// ── Story 3.4: graceful degradation (AC #4, #5) ──────────────────────────

describe("Request form — graceful degradation with missing metadata (Story 3.4 AC #4, #5)", () => {
	let buildMailtoUrl, captureMetadata;

	beforeEach(() => {
		jest.resetModules();
		({
			buildMailtoUrl,
			captureMetadata,
		} = require("../site/assets/js/request-form.js"));
	});

	test("form submission not blocked when metadata returns empty scenario", () => {
		// captureMetadata with empty search — buildMailtoUrl should not throw
		const meta = captureMetadata({ search: "", pathname: "/request/" });
		expect(() => {
			buildMailtoUrl({
				contactName: "Alice",
				contactEmail: "alice@example.com",
				companyName: "ACME",
				scenario: "brand-proof", // user-entered is still used
				context: "Context",
				source_path: meta.source_path,
				proof_path: meta.proof_path,
			});
		}).not.toThrow();
	});

	test("buildMailtoUrl is valid even with all metadata empty strings", () => {
		const url = buildMailtoUrl({
			contactName: "Bob",
			contactEmail: "bob@example.com",
			companyName: "Corp",
			scenario: "eaktsyz",
			context: "Some context",
			source_path: "",
			proof_path: "",
		});
		expect(url).toMatch(/^mailto:/);
	});

	test("captureMetadata does not throw when called with no arguments", () => {
		expect(() => captureMetadata()).not.toThrow();
	});
});
