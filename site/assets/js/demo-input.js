// demo-input.js — deterministic static-state launcher for /v/ demo input surface.
// Maps approved demo input to pre-approved static destinations.
// Does NOT verify, validate, classify, score, or simulate checking of entered codes.

const DEMO_EXAMPLE_CODE = "GM-GENUIM-2026";

const DEMO_DESTINATIONS = {
	example: "/v/genuim/",
	fallback: "/v/",
};

const resolveDestination = (rawValue) => {
	// Remove all whitespace and convert to lowercase for comparison
	// This handles hidden characters, newlines, and other whitespace artifacts
	const normalized = String(rawValue || "")
		.replace(/\s+/g, "")
		.toLowerCase();

	const isMatch =
		normalized === DEMO_EXAMPLE_CODE.replace(/\s+/g, "").toLowerCase();

	if (isMatch) {
		return DEMO_DESTINATIONS.example;
	}
	return DEMO_DESTINATIONS.fallback;
};

const navigate = (destination) => {
	window.location.href = destination;
};

const initDemoInput = (navFn = navigate) => {
	const form = document.getElementById("demoInputForm");
	if (!form) {
		return;
	}

	const input = form.querySelector(".demo-input__field");
	if (!input) {
		return;
	}

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const destination = resolveDestination(input.value);
		navFn(destination);
	});
};

initDemoInput();

if (typeof module !== "undefined") {
	module.exports = {
		DEMO_EXAMPLE_CODE,
		DEMO_DESTINATIONS,
		initDemoInput,
		navigate,
		resolveDestination,
	};
}
