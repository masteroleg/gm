#!/usr/bin/env node
"use strict";
// Second pass: fetch content for skeleton pages and fill bodies where possible
// Uses a content-extraction proxy (r.jina.ai) to convert HTML to Markdown.
const fs = require("fs");
const path = require("path");
const https = require("https");
function fetchMarkdownViaProxy(url) {
	const raw = url.replace(/^https?:\/\//, "");
	const proxy = "https://r.jina.ai/http://";
	const fetchUrl = proxy + raw;
	return new Promise((resolve, reject) => {
		https
			.get(fetchUrl, (res) => {
				if (res.statusCode < 200 || res.statusCode >= 300) {
					res.resume();
					return reject(new Error(`HTTP ${res.statusCode}`));
				}
				let data = "";
				res.setEncoding("utf8");
				res.on("data", (chunk) => (data += chunk));
				res.on("end", () => resolve(data));
			})
			.on("error", reject);
	});
}

function parseFrontMatter(text) {
	const fmStart = text.indexOf("---");
	if (fmStart !== 0) return { front: null, body: text };
	const fmEnd = text.indexOf("\n---", 3);
	if (fmEnd < 0) return { front: null, body: text };
	const front = text.substring(0, fmEnd + 5);
	const body = text.substring(fmEnd + 5);
	return { front, body };
}

async function main() {
	const pagesDir = path.resolve(process.cwd(), "docs", "delivr", "pages");
	if (!fs.existsSync(pagesDir)) {
		console.log("No pages directory found at", pagesDir);
		return;
	}
	const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".md"));
	for (const file of files) {
		const full = path.join(pagesDir, file);
		const content = fs.readFileSync(full, "utf8");
		// If body contains placeholder text, attempt fetch
		if (!/Content not retrieved|Skeleton generated/.test(content)) continue;
		// extract URL from front matter - simple guess by locating line starting with 'url:'
		const lines = content.split(/\r?\n/);
		let url = null;
		for (const line of lines) {
			const m = line.match(/^url:\s*(.*)$/i);
			if (m) {
				url = m[1].trim().replace(/^"|"$/g, "");
				break;
			}
		}
		if (!url) {
			// attempt to parse from content's first http link
			const m = content.match(/https?:\/\/[\w\.\-\/]+/);
			if (m) url = m[0];
		}
		if (!url) continue;
		try {
			const md = await fetchMarkdownViaProxy(url);
			// If fetched content looks markdown, replace placeholder sentence
			const updated = content.replace(
				/Content not retrieved from source. Skeleton generated from documents.index.json\./,
				md,
			);
			if (updated !== content) {
				fs.writeFileSync(full, updated, "utf8");
				console.log("Updated", file, "with content from", url);
			} else {
				console.log("No replacement performed for", file);
			}
		} catch (e) {
			console.log(
				"Could not fetch content for",
				file,
				"URL",
				url,
				"error:",
				e.message,
			);
		}
	}
}

main().catch((e) => {
	console.error("fill-delivr-second-pass error:", e);
	process.exit(1);
});
