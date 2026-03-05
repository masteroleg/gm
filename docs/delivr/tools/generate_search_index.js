#!/usr/bin/env node
"use strict";
// Generate a search index JSON tailored for a doc-site search from docs/delivr/manifest.json
// This is the single canonical search index (metadata + content).
const fs = require("fs");
const path = require("path");

function frontMatterOf(md) {
	const lines = md.split(/\n/);
	if (lines[0].trim() !== "---" && lines[0].trim() !== "------") return null;
	for (let i = 1; i < lines.length; i++) {
		const t = lines[i].trim();
		if (t === "---" || t === "------") {
			const fm = lines.slice(0, i + 1).join("\n");
			const body = lines.slice(i + 1).join("\n");
			return { fm, body };
		}
	}
	return null;
}

function stripQuotes(s) {
	if (typeof s !== "string") return s;
	const t = s.trim();
	if (
		(t.startsWith('"') && t.endsWith('"')) ||
		(t.startsWith("'") && t.endsWith("'"))
	)
		return t.slice(1, -1);
	return t;
}

function parseFrontMatterFields(fm) {
	const out = {};
	const lines = fm.split("\n");
	let currentListKey = null;
	for (const rawLine of lines) {
		const line = rawLine.replace(/\r$/, "");
		const t = line.trim();
		if (t === "---" || t === "------" || t === "") continue;

		const listItem = line.match(/^\s*-\s+(.*)$/);
		if (listItem && currentListKey) {
			if (!Array.isArray(out[currentListKey])) out[currentListKey] = [];
			out[currentListKey].push(stripQuotes(listItem[1]));
			continue;
		}

		const listKey = line.match(/^([A-Za-z0-9_\-]+)\s*:\s*$/);
		if (listKey) {
			currentListKey = listKey[1];
			if (!(currentListKey in out)) out[currentListKey] = [];
			continue;
		}

		const kv = line.match(/^([A-Za-z0-9_\-]+)\s*:\s*(.*)$/);
		if (kv) {
			currentListKey = null;
			const k = kv[1];
			const v = stripQuotes(kv[2]);
			if (v === "true") out[k] = true;
			else if (v === "false") out[k] = false;
			else out[k] = v;
		}
	}
	return out;
}

function markdownToText(md) {
	if (!md) return "";
	let s = md;
	// remove fenced code blocks
	s = s.replace(/```[\s\S]*?```/g, " ");
	// remove inline code backticks
	s = s.replace(/`[^`]*`/g, " ");
	// images: keep alt text
	s = s.replace(/!\[([^\]]*)\]\([^\)]*\)/g, "$1");
	// links: keep label
	s = s.replace(/\[([^\]]+)\]\([^\)]*\)/g, "$1");
	// strip HTML tags
	s = s.replace(/<[^>]+>/g, " ");
	// strip headings and blockquote markers
	s = s.replace(/^\s{0,3}#+\s+/gm, "");
	s = s.replace(/^\s{0,3}>\s+/gm, "");
	// strip common markdown punctuation
	s = s.replace(/[\*\_\~\=\|]/g, " ");
	// normalize whitespace
	s = s.replace(/\s+/g, " ").trim();
	return s;
}

function tokensFromText(text, limit) {
	if (!text) return [];
	const max = typeof limit === "number" && limit > 0 ? limit : 600;
	const out = [];
	const seen = new Set();
	const lower = text.toLowerCase();
	const re = /[a-z0-9]{2,}/g;
	for (;;) {
		const match = re.exec(lower);
		if (!match) break;
		const tok = match[0];
		if (seen.has(tok)) continue;
		seen.add(tok);
		out.push(tok);
		if (out.length >= max) break;
	}
	return out;
}

function main() {
	const manifestPath = path.resolve(
		process.cwd(),
		"docs",
		"delivr",
		"manifest.json",
	);
	if (!fs.existsSync(manifestPath)) {
		console.error("Manifest not found at", manifestPath);
		process.exit(1);
	}
	const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
	const total_documents = manifest.length;
	const categories = [...new Set(manifest.map((m) => m.category))];
	const by_category = {};
	categories.forEach((cat) => {
		by_category[cat] = manifest
			.filter((m) => m.category === cat)
			.map((m) => m.id);
	});
	const by_id = {};
	const search = [];
	manifest.forEach((m) => {
		// Load page body text for full-text search
		let content = "";
		let skeleton = false;
		try {
			const abs = path.resolve(
				process.cwd(),
				m.prepared_path.replace(/^\.\//, ""),
			);
			const raw = fs.readFileSync(abs, "utf8");
			const fmParsed = frontMatterOf(raw);
			if (fmParsed) {
				const fields = parseFrontMatterFields(fmParsed.fm);
				skeleton = fields.skeleton === true;
				content = markdownToText(fmParsed.body);
			} else {
				content = markdownToText(raw);
			}
		} catch (e) {
			content = "";
		}

		by_id[m.id] = {
			id: m.id,
			slug: m.slug,
			title: m.title,
			description: m.description,
			url: m.url,
			prepared_path: m.prepared_path,
			word_count: m.word_count,
			skeleton,
			content,
		};

		const text = [m.title, m.description, m.url, content]
			.filter(Boolean)
			.join(" ");
		const tokens = tokensFromText(text, 800);
		search.push({ id: m.id, tokens });
	});
	const index = { total_documents, categories, by_category, by_id, search };
	const outPath = path.resolve(process.cwd(), "docs", "delivr", "index.json");
	fs.writeFileSync(outPath, JSON.stringify(index, null, 2), "utf8");
	console.log("Search index generated at", outPath);
}

main();
