#!/usr/bin/env node
"use strict";
// Update front matter on existing Delivr page markdowns to include additional automated-import fields
// - author
// - last_updated
// - language
// - topics
// - reading_time
// - origin_doc_path

const fs = require("fs");
const path = require("path");

function slugify(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

function parseFrontMatter(md) {
	const lines = md.split(/\n/);
	if (lines[0].trim() !== "---") return { front: "", body: md };
	let i = 1;
	while (i < lines.length && lines[i].trim() !== "---") i++;
	if (i >= lines.length) return { front: "", body: md };
	const front = lines.slice(0, i + 1).join("\n");
	const body = lines.slice(i + 1).join("\n");
	return { front, body };
}

function update(mdPath) {
	const raw = fs.readFileSync(mdPath, "utf8");
	const { front, body } = parseFrontMatter(raw);
	if (!front) {
		// nothing to do
		return;
	}
	// Try to extract fields from existing front matter
	const fmBody = front.split("\n");
	const fields = {};
	for (const line of fmBody) {
		const m = line.match(/^([a-zA-Z0-9_\-]+):\s*(.*)$/);
		if (m) fields[m[1]] = m[2];
	}
	// Build additions
	// We'll unify by deriving doc_path slug based on mdPath
	const slugFromPath = path.basename(mdPath, ".md");
	const today = new Date().toISOString().slice(0, 10);
	const extra = [];
	if (!("author" in fields)) extra.push('author: "Delivr"');
	if (!("last_updated" in fields)) extra.push(`last_updated: "${today}"`);
	if (!("language" in fields)) extra.push('language: "en"');
	// topics - reuse existing tags if any, else placeholder
	if (!("topics" in fields)) {
		extra.push("topics: []");
	}
	// reading_time estimate based on content words
	const contentWords = body
		? body.split(/\s+/).filter((w) => w.trim().length > 0).length
		: 0;
	const readingTime = Math.max(1, Math.ceil(contentWords / 200));
	if (!("reading_time" in fields))
		extra.push(`reading_time: "${readingTime} min"`);
	// Always set origin_doc_path to the local Markdown path for consistency
	extra.push(`origin_doc_path: "docs/delivr/pages/${path.basename(mdPath)}"`);
	if (extra.length === 0) return; // nothing to update
	// Append extras before the trailing '---' end in front matter block
	const newFront = front.replace(
		/^-{3}\n$/,
		"-" /* dummy to ensure we can patch; we'll rebuild whole front matter instead */,
	);
	// Simpler: reconstruct front matter by inserting extras just before the final '---' line
	const fmLines = front.split("\n");
	// Find the end of front matter (last line before closing '---')
	let endIndex = fmLines.findIndex(
		(l) => l.trim() === "---" && fmLines.indexOf(l) !== 0,
	);
	// If not found, push at end of front
	if (endIndex === -1) endIndex = fmLines.length - 1;
	const extrasBlock =
		extra
			.map((e) => (e.split(":")[0] ? e : ""))
			.filter(Boolean)
			.join("\n") + "\n";
	const updatedFront =
		fmLines.slice(0, endIndex).join("\n") +
		"\n" +
		extra.join("\n") +
		"\n" +
		fmLines.slice(endIndex).join("\n");
	// Reassemble
	const updated =
		"---\n" + updatedFront.replace(/^---\n/m, "") + "---\n" + body;
	fs.writeFileSync(mdPath, updated, "utf8");
}

function main() {
	const dir = path.resolve(process.cwd(), "docs", "delivr", "pages");
	const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
	files.forEach((f) => {
		const mdPath = path.join(dir, f);
		try {
			update(mdPath);
		} catch (e) {
			console.error("Failed to update", mdPath, e);
		}
	});
	console.log("Front matter update complete.");
}

main();
