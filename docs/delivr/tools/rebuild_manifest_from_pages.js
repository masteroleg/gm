#!/usr/bin/env node
"use strict";
// Rebuild docs/delivr artifacts from existing Markdown pages in docs/delivr/pages
// Outputs (in-place):
// - docs/delivr/manifest.json (canonical machine manifest)
// - docs/delivr/index.md (human navigation; full list)
// - docs/delivr/frontmatter.yaml (aggregated per-page metadata)
// Notes:
// - Exclude nothing here; skeletons are included and marked if present in front matter.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function frontMatterOf(md) {
	const lines = md.split(/\n/);
	if (lines[0].trim() !== "---" && lines[0].trim() !== "------") return null;
	// find closing --- or ------
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
	// Minimal YAML parser for our front matter shape:
	// - key: value
	// - key: "value"
	// - key: (list) followed by indented "- item" lines
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
			const vRaw = kv[2];
			const v = stripQuotes(vRaw);
			if (v === "true") out[k] = true;
			else if (v === "false") out[k] = false;
			else out[k] = v;
		}
	}
	return out;
}

function sha256File(p) {
	const data = fs.readFileSync(p);
	return crypto.createHash("sha256").update(data).digest("hex");
}

function wordCount(text) {
	if (!text) return 0;
	return text.trim().split(/\s+/).length;
}

function escapeYamlString(value) {
	// Keep YAML safe and deterministic.
	const s = value == null ? "" : String(value);
	// If it has anything that could confuse YAML, quote it.
	if (
		s === "" ||
		/[:\n\r\t\"\'\[\]\{\},#&*!|>@%`]/.test(s) ||
		/^\s|\s$/.test(s)
	) {
		return '"' + s.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"';
	}
	return s;
}

function buildIndexMd(docs) {
	const today = new Date().toISOString().slice(0, 10);
	const lines = [
		"---",
		`title: ${escapeYamlString("Delivr Documentation Index")}`,
		`date: ${today}`,
		`layout: ${escapeYamlString("default")}`,
		`description: ${escapeYamlString("Index of Delivr Markdown pages for automated import")}`,
		"---",
		"",
		"# Delivr Documentation Index",
		"",
	];

	docs.forEach((d) => {
		const rel = `./pages/${d.file}`;
		const title = d.title || d.slug;
		lines.push(`- [${title}](${rel})`);
	});

	lines.push("");
	return lines.join("\n");
}

function buildFrontmatterYaml(docs) {
	const lines = ["pages:"];
	docs.forEach((d) => {
		lines.push(`- slug: ${escapeYamlString(d.slug)}`);
		if (d.title) lines.push(`  title: ${escapeYamlString(d.title)}`);
		if (d.url) lines.push(`  url: ${escapeYamlString(d.url)}`);
		if (d.category) lines.push(`  category: ${escapeYamlString(d.category)}`);
		if (d.description)
			lines.push(`  description: ${escapeYamlString(d.description)}`);
		lines.push(
			`  prepared_path: ${escapeYamlString(`./docs/delivr/pages/${d.file}`)}`,
		);
		if (d.skeleton === true) lines.push("  skeleton: true");
		if (Array.isArray(d.tags) && d.tags.length) {
			lines.push("  tags:");
			d.tags.forEach((tag) => {
				lines.push(`  - ${escapeYamlString(tag)}`);
			});
		}
	});
	lines.push("");
	return lines.join("\n");
}

function main() {
	const pagesDir = path.resolve(process.cwd(), "docs", "delivr", "pages");
	const manifestPath = path.resolve(
		process.cwd(),
		"docs",
		"delivr",
		"manifest.json",
	);
	const indexMdPath = path.resolve(process.cwd(), "docs", "delivr", "index.md");
	const frontmatterYamlPath = path.resolve(
		process.cwd(),
		"docs",
		"delivr",
		"frontmatter.yaml",
	);
	const files = fs.existsSync(pagesDir)
		? fs
				.readdirSync(pagesDir)
				.filter((f) => f.endsWith(".md"))
				.sort()
		: [];
	console.log(
		"DEBUG: scanning pagesDir",
		pagesDir,
		"found",
		files.length,
		"markdown files",
	);
	const manifest = [];
	const docs = [];
	let nextId = 0;
	files.forEach((fn) => {
		const full = path.join(pagesDir, fn);
		const md = fs.readFileSync(full, "utf8");
		const fmParsed = frontMatterOf(md);
		if (!fmParsed) {
			return;
		}
		const { fm, body } = fmParsed;
		const frontFields = parseFrontMatterFields(fm);
		const slug = frontFields.slug || path.basename(fn, ".md");
		const url = frontFields.url || `https://delivr.com/page/unknown/${slug}`;
		const title = frontFields.title || slug;
		const description = frontFields.description || "";
		const category = frontFields.category || "Delivr";
		const tags = Array.isArray(frontFields.tags) ? frontFields.tags : [];
		const skeleton = frontFields.skeleton === true;
		const wordCountVal = wordCount(body);
		const sha = sha256File(full);
		manifest.push({
			id: nextId++,
			slug,
			url,
			title,
			description,
			category,
			word_count: wordCountVal,
			sha256: sha,
			prepared_path: `./docs/delivr/pages/${fn}`,
		});

		docs.push({
			slug,
			url,
			title,
			description,
			category,
			tags,
			skeleton,
			file: fn,
		});
	});
	// Extend existing manifest or create new if none exists
	if (manifest.length) {
		fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
		console.log(
			`Rebuilt manifest.json with ${manifest.length} entries at ${manifestPath}`,
		);

		fs.writeFileSync(indexMdPath, buildIndexMd(docs), "utf8");
		console.log(
			`Rebuilt index.md with ${docs.length} entries at ${indexMdPath}`,
		);

		fs.writeFileSync(frontmatterYamlPath, buildFrontmatterYaml(docs), "utf8");
		console.log(
			`Rebuilt frontmatter.yaml with ${docs.length} entries at ${frontmatterYamlPath}`,
		);
	} else {
		console.log("No pages found to rebuild manifest.json");
	}
}

main();
