#!/usr/bin/env node
/*
  Generate Markdown pages from a Delivr documents.index.json, skipping certain pages and
  writing skeleton Markdown files with front matter suitable for automated imports.
  - Excludes: terms of use / contact pages and any pages with 'business-ideas' in path
  - Outputs: docs/delivr/pages/<slug>.md for each generated page
*/
const fs = require("fs");
const path = require("path");
const os = require("os");

function slugifyName(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

function ensureDir(p) {
	fs.mkdirSync(p, { recursive: true });
}

function toFrontMatter(doc) {
	const slug = doc.slug || slugifyName(doc.title || doc.path || "doc");
	const tags = doc.tags && doc.tags.length ? doc.tags : ["delivr"];
	return `---
slug: "${slug}"
category: "Delivr"
tags:
${tags.map((t) => `  - ${t}`).join("\n")}
title: "${doc.title?.replace(/"/g, '\"') || slug}"
url: "${doc.url_base || ""}"
source: "Documents index"
date: 2026-03-04
description: "Markdown export from documents.index.json"
---
\n`;
}

function main() {
	const indexPath =
		process.env.DOCUMENTS_INDEX_PATH ||
		path.resolve(process.cwd(), "delivr.com", "documents.index.json");
	const outDir = path.resolve(process.cwd(), "docs", "delivr", "pages");
	const fileExists = fs.existsSync(indexPath);
	if (!fileExists) {
		console.error("Documents index not found at", indexPath);
		process.exit(1);
	}
	const raw = fs.readFileSync(indexPath, "utf8");
	// Normalize by removing any line-number prefixes like '123: '
	const content = raw
		.split(/\r?\n/)
		.map((line) => line.replace(/^\d+:\s*/, ""))
		.join("\n");
	// Try to parse as JSON array
	let json;
	try {
		json = JSON.parse(content);
	} catch (e) {
		console.error("Unable to parse documents index JSON after normalization.");
		process.exit(1);
	}
	if (!Array.isArray(json)) {
		console.error("Documents index JSON is not an array.");
		process.exit(1);
	}

	// Exclude terms (of use), and contact pages from content generation. Business ideas pages will be created as placeholders (empty body).
	const excludedPaths = [
		/terms-of-service/i,
		/terms-of-use/i,
		/contact-delivr/i,
	];

	ensureDir(outDir);
	let generated = 0;
	json.forEach((item) => {
		const docPath = item.doc_path || "";
		// Determine if this is a business ideas placeholder page
		const isBusinessIdeas = /business-ideas/i.test(docPath);
		// Skip unwanted unless it's a business-ideas placeholder
		if (excludedPaths.some((r) => r.test(docPath))) {
			// skip if it's not a business-ideas placeholder
			if (!isBusinessIdeas) return;
		}
		// Build slug from file name
		const base = path.basename(docPath, ".md");
		if (!base) return;
		const slug = slugifyName(base);
		const mdPath = path.join(outDir, slug + ".md");
		if (fs.existsSync(mdPath)) {
			// Skip to avoid overwriting existing content
			return;
		}
		const front = toFrontMatter({
			slug,
			title: item.title,
			url_base: item.url_base,
			path: item.doc_path,
			tags: [],
		});
		// For business-ideas placeholders, emit minimal body (empty)
		const body = isBusinessIdeas
			? `\n`
			: `# ${item.title || slug}\n\nURL: ${item.url_base || ""}\n\nContent not retrieved from source. Skeleton generated from documents.index.json.\n`;
		fs.writeFileSync(mdPath, front + body, "utf8");
		generated++;
	});
	console.log(
		`Generated ${generated} Markdown page(s) under docs/delivr/pages/`,
	);
}

main();
