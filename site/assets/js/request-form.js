// Request form controller — Story 3.3: Send a Qualified Request
// Phase 1 mailto: handoff mechanism. No server-side submission.

const RECIPIENT = "hello@genu.im";

// ── Email validation helper ────────────────────────────────────────────────
// Accepts valid email OR non-empty phone-like string (starts with + or digit).
// Rejects strings containing @ but malformed (e.g. "foo@").
const isValidContact = (value) => {
	const trimmed = value.trim();
	if (!trimmed) return false;

	if (trimmed.includes("@")) {
		// Treat as email: must have chars before @ and a domain with at least one dot after @
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
	}
	// Otherwise treat as phone: non-empty string of digits / + / spaces / dashes is fine
	return trimmed.length > 0;
};

// ── Build mailto: URL ──────────────────────────────────────────────────────
const buildMailtoUrl = ({
	contactName,
	contactEmail,
	companyName,
	scenario,
	context,
}) => {
	const subject = `genu.im request: ${companyName} — ${scenario}`;

	const body = [
		`Contact: ${contactName}`,
		`Email / Phone: ${contactEmail}`,
		`Company: ${companyName}`,
		`Scenario: ${scenario}`,
		``,
		`Context:`,
		context,
		``,
		`---`,
		`Sent via genu.im request form (mailto: handoff — not server submission)`,
	].join("\n");

	return `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// ── Show / hide UI states ─────────────────────────────────────────────────
const showConfirmation = () => {
	const el = document.getElementById("requestConfirmation");
	if (el) {
		el.hidden = false;
	}
};

const showFallback = () => {
	const el = document.getElementById("requestFallback");
	if (el) {
		el.hidden = false;
	}
};

// ── Validation ────────────────────────────────────────────────────────────
// Returns true if all fields pass; false otherwise.
// Side-effect: sets/clears error span textContent for each field.
const validateForm = () => {
	const getI18n = (key) => {
		try {
			const lang = document.documentElement.lang || "en";
			if (window.gmSiteI18n) {
				return window.gmSiteI18n.t(key, lang) || key;
			}
		} catch (_e) {
			/* noop */
		}
		// Minimal fallback strings
		const fallback = {
			"request.error.required": "This field is required.",
			"request.error.emailInvalid":
				"Enter a valid email address or phone number.",
		};
		return fallback[key] || key;
	};

	const setError = (id, msg) => {
		const el = document.getElementById(id);
		if (el) el.textContent = msg;
	};

	const clearError = (id) => {
		const el = document.getElementById(id);
		if (el) el.textContent = "";
	};

	let valid = true;

	const contactName = (
		document.getElementById("contactName")?.value || ""
	).trim();
	if (!contactName) {
		setError("contactNameError", getI18n("request.error.required"));
		valid = false;
	} else {
		clearError("contactNameError");
	}

	const contactEmail = (
		document.getElementById("contactEmail")?.value || ""
	).trim();
	if (!contactEmail) {
		setError("contactEmailError", getI18n("request.error.required"));
		valid = false;
	} else if (!isValidContact(contactEmail)) {
		setError("contactEmailError", getI18n("request.error.emailInvalid"));
		valid = false;
	} else {
		clearError("contactEmailError");
	}

	const companyName = (
		document.getElementById("companyName")?.value || ""
	).trim();
	if (!companyName) {
		setError("companyNameError", getI18n("request.error.required"));
		valid = false;
	} else {
		clearError("companyNameError");
	}

	const scenario = (document.getElementById("scenario")?.value || "").trim();
	if (!scenario) {
		setError("scenarioError", getI18n("request.error.required"));
		valid = false;
	} else {
		clearError("scenarioError");
	}

	const context = (document.getElementById("context")?.value || "").trim();
	if (!context) {
		setError("contextError", getI18n("request.error.required"));
		valid = false;
	} else {
		clearError("contextError");
	}

	return valid;
};

// ── Pre-fill from URL param (?scenario=...) ────────────────────────────────
const applyUrlParams = () => {
	try {
		const params = new URLSearchParams(window.location.search);
		const scenario = params.get("scenario");
		if (scenario) {
			const select = document.getElementById("scenario");
			if (select) {
				const option = select.querySelector(
					`option[value="${CSS.escape(scenario)}"]`,
				);
				if (option) {
					select.value = scenario;
				}
			}
		}
	} catch (_e) {
		/* noop */
	}
};

// ── Fallback detection ─────────────────────────────────────────────────────
// After triggering mailto:, we wait briefly and check if the window stayed
// visible / focused. If the user is still here, mailto: likely didn't open.
const triggerMailtoWithFallback = (mailtoUrl) => {
	let fallbackTimer;

	const onVisibilityChange = () => {
		// Page became hidden → mail client likely opened
		if (document.visibilityState === "hidden") {
			clearTimeout(fallbackTimer);
			document.removeEventListener("visibilitychange", onVisibilityChange);
			showConfirmation();
		}
	};

	document.addEventListener("visibilitychange", onVisibilityChange);

	// Fallback: if page is still visible after 1.8s, mail client did not open
	fallbackTimer = setTimeout(() => {
		document.removeEventListener("visibilitychange", onVisibilityChange);
		if (document.visibilityState !== "hidden") {
			showFallback();
		} else {
			showConfirmation();
		}
	}, 1800);

	window.location.href = mailtoUrl;
};

// ── Controller init ────────────────────────────────────────────────────────
const initRequestForm = () => {
	const form = document.querySelector("[data-request-form]");
	if (!form) return;

	applyUrlParams();

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		const data = {
			contactName: (document.getElementById("contactName")?.value || "").trim(),
			contactEmail: (
				document.getElementById("contactEmail")?.value || ""
			).trim(),
			companyName: (document.getElementById("companyName")?.value || "").trim(),
			scenario: (document.getElementById("scenario")?.value || "").trim(),
			context: (document.getElementById("context")?.value || "").trim(),
		};

		const mailtoUrl = buildMailtoUrl(data);
		triggerMailtoWithFallback(mailtoUrl);
	});
};

initRequestForm();

if (typeof module !== "undefined") {
	module.exports = {
		buildMailtoUrl,
		initRequestForm,
		isValidContact,
		showConfirmation,
		showFallback,
		validateForm,
	};
}
