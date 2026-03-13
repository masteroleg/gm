const hasMeaningfulContent = (element) => {
	if (!element || element.hidden) {
		return false;
	}

	return (element.textContent || "").trim().length > 0;
};

const hasApprovedEvidence = (element) => {
	if (!element) {
		return false;
	}

	const href = element.getAttribute("href") || "";
	return href.trim().length > 0 && hasMeaningfulContent(element);
};

const syncEvidenceLinks = (root = document) => {
	root.querySelectorAll("[data-proof-evidence]").forEach((element) => {
		element.hidden = !hasApprovedEvidence(element);
	});
};

const hasRequiredEvidence = (element) => {
	return Array.from(element.querySelectorAll("[data-proof-evidence]")).some(
		(candidate) => hasApprovedEvidence(candidate),
	);
};

const syncSupportedProofBlocks = (root = document) => {
	root.querySelectorAll("[data-proof-requires-evidence]").forEach((element) => {
		element.hidden = !hasRequiredEvidence(element);
	});
};

const hasHiddenAncestorWithinSection = (section, element) => {
	let current = element.parentElement;

	while (current && current !== section) {
		if (current.hidden) {
			return true;
		}

		current = current.parentElement;
	}

	return false;
};

const sectionHasVisibleContent = (section) => {
	const contentNodes = Array.from(
		section.querySelectorAll("[data-proof-content], [data-proof-evidence]"),
	).filter(
		(element) =>
			!element.hidden && !hasHiddenAncestorWithinSection(section, element),
	);

	if (contentNodes.length === 0) {
		return false;
	}

	return contentNodes.some((element) => {
		if (element.hasAttribute("data-proof-evidence")) {
			return hasApprovedEvidence(element);
		}

		return hasMeaningfulContent(element);
	});
};

const syncProofSections = (root = document) => {
	syncEvidenceLinks(root);
	syncSupportedProofBlocks(root);

	root.querySelectorAll("[data-proof-section]").forEach((section) => {
		if (section.getAttribute("data-proof-required") === "always") {
			section.hidden = false;
			return;
		}

		section.hidden = !sectionHasVisibleContent(section);
	});
};

const initVerificationPage = () => {
	const root = document.querySelector("[data-proof-page]");
	if (!root) {
		return;
	}

	syncProofSections(root);
};

initVerificationPage();

if (typeof module !== "undefined") {
	module.exports = {
		hasApprovedEvidence,
		hasHiddenAncestorWithinSection,
		hasRequiredEvidence,
		hasMeaningfulContent,
		initVerificationPage,
		sectionHasVisibleContent,
		syncEvidenceLinks,
		syncSupportedProofBlocks,
		syncProofSections,
	};
}
