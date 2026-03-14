// Request form controller — Story 3.3 / 3.4
// Phase 1 mailto: handoff mechanism. No server-side submission.
// Metadata (scenario, source_path, proof_path) is best-effort; no guarantees on transport.

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

// ── Metadata capture (Story 3.4 AC #1, #2) ────────────────────────────────
// Reads scenario and source routing details from page context.
// Best-effort: returns empty strings when data is unavailable.
// Accepts optional _loc parameter for testability (defaults to window.location).
const captureMetadata = (_loc) => {
	let scenario = "";
	let source_path = "";
	let proof_path = "";

	try {
		const loc = _loc || window.location;
		const params = new URLSearchParams(loc.search || "");

		// Scenario from URL param (set by Story 3.2 routing)
		scenario = params.get("scenario") || "";

		// source_path: prefer explicit ?from= param; fall back to current pathname
		source_path = params.get("from") || loc.pathname || "";

		// proof_path: read from data-proof-path attribute when request originates from proof surface
		const proofEl = document.querySelector("[data-proof-path]");
		proof_path = proofEl ? proofEl.getAttribute("data-proof-path") || "" : "";
	} catch (_e) {
		/* noop — degrade gracefully; all fields remain empty strings */
	}

	return { scenario, source_path, proof_path };
};

// ── Build mailto: URL ──────────────────────────────────────────────────────
// source_path and proof_path are optional metadata fields (best-effort).
const buildMailtoUrl = ({
	contactName,
	contactEmail,
	companyName,
	scenario,
	context,
	source_path,
	proof_path,
}) => {
	const subject = `genu.im request: ${companyName} — ${scenario}`;

	const bodyLines = [
		`Contact: ${contactName}`,
		`Email / Phone: ${contactEmail}`,
		`Company: ${companyName}`,
		`Scenario: ${scenario}`,
		``,
		`Context:`,
		context,
	];

	// Attach metadata lines when available (best-effort, not guaranteed)
	if (source_path) {
		bodyLines.push(``, `Source: ${source_path}`);
	}
	if (proof_path) {
		bodyLines.push(`Proof page: ${proof_path}`);
	}

	bodyLines.push(
		``,
		`---`,
		`Sent via genu.im request form (mailto: handoff — not server submission)`,
	);

	const body = bodyLines.join("\n");

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

// ── Show fallback with captured metadata (Story 3.4 AC #5) ────────────────
// Keeps scenario/source context visible on page if mailto: cannot open.
// Does NOT claim submission succeeded or metadata was transported.
const showFallbackWithMeta = ({ scenario, source_path, proof_path } = {}) => {
	// Show fallback panel
	const fallback = document.getElementById("requestFallback");
	if (fallback) {
		fallback.hidden = false;
	}

	// Populate metadata section if the element exists
	const metaEl = document.getElementById("requestFallbackMeta");
	if (!metaEl) return;

	const lines = [];
	if (scenario) lines.push(`Scenario: ${scenario}`);
	if (source_path) lines.push(`Source: ${source_path}`);
	if (proof_path) lines.push(`Proof page: ${proof_path}`);

	metaEl.textContent = lines.join(" | ");
	metaEl.hidden = false;
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
const triggerMailtoWithFallback = (mailtoUrl, metadata) => {
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
			showFallbackWithMeta(metadata || {});
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

		// Capture routing metadata (best-effort, AC #1, #2)
		const metadata = captureMetadata();

		const data = {
			contactName: (document.getElementById("contactName")?.value || "").trim(),
			contactEmail: (
				document.getElementById("contactEmail")?.value || ""
			).trim(),
			companyName: (document.getElementById("companyName")?.value || "").trim(),
			scenario: (document.getElementById("scenario")?.value || "").trim(),
			context: (document.getElementById("context")?.value || "").trim(),
			source_path: metadata.source_path,
			proof_path: metadata.proof_path,
		};

		const mailtoUrl = buildMailtoUrl(data);
		triggerMailtoWithFallback(mailtoUrl, metadata);
	});
};

initRequestForm();

if (typeof module !== "undefined") {
	module.exports = {
		buildMailtoUrl,
		captureMetadata,
		initRequestForm,
		isValidContact,
		showConfirmation,
		showFallback,
		showFallbackWithMeta,
		validateForm,
	};
}
