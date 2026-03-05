#!/usr/bin/env node
"use strict";
// Verifies consistency between manifest.json and generated Markdown pages.
// Outputs a report at docs/delivr/reports/consistency-report.json

const fs = require("fs");
const path = require("path");

function readJson(p) {
	if (!fs.existsSync(p)) return null;
	try {
		return JSON.parse(fs.readFileSync(p, "utf8"));
	} catch (_) {
		return null;
	}
}

function parseFrontMatter(md) {
	const s = md.indexOf("---");
	if (s !== 0) return { ok: false, front: null, body: md };
	const end = md.indexOf("\n---", 3);
	if (end < 0) return { ok: false, front: null, body: md };
	const front = md.substring(0, end + 4);
	const body = md.substring(end + 4);
	// Parse key: value simple parser
	const data = {};
	front.split("\n").forEach((line) => {
		const m = line.match(/^([a-zA-Z0-9_\-]+)\s*:\s*(.*)$/);
		if (m) {
			let val = m[2].trim();
			if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
			data[m[1]] = val;
		}
	});
	return { ok: true, front: data, body };
}

function slugFromPath(docPath) {
	// e.g. page/809/xxx.md -> slug from filename
	const base = path.basename(docPath, ".md");
	return base ? base : "";
}

function ensureArray(a) {
	return Array.isArray(a) ? a : [];
}

function main() {
	const manifestPath = path.resolve(
		process.cwd(),
		"docs",
		"delivr",
		"manifest.json",
	);
	const pagesDir = path.resolve(process.cwd(), "docs", "delivr", "pages");
	const mdFiles = fs.existsSync(pagesDir)
		? fs.readdirSync(pagesDir).filter((f) => f.endsWith(".md"))
		: [];
	const manifest = readJson(manifestPath) || [];

	const missing = [];
	const issues = [];
	const skeletons = [];
	let okCount = 0,
		total = manifest.length;

	manifest.forEach((m) => {
		const relPath = m.prepared_path || "";
		// Resolve path
		const mdPath = relPath.startsWith("./")
			? path.resolve(process.cwd(), relPath.substring(2))
			: path.resolve(process.cwd(), relPath);
		if (!fs.existsSync(mdPath)) {
			missing.push({ id: m.id, path: mdPath, url: m.url });
			return;
		}
		const md = fs.readFileSync(mdPath, "utf8");
		const { front, body } = parseFrontMatter(md);
		if (!front) {
			issues.push({ id: m.id, reason: "no_front_matter", path: mdPath });
			return;
		}
		const slugFront = (front.slug || "").toString();
		const slugExpected = slugFromPath(m.doc_path || "");
		const slugOK =
			slugFront === slugExpected ||
			slugFront === m.slug ||
			slugFront === path.basename(m.prepared_path || "").replace(".md", "");
		if (!slugOK) {
			issues.push({
				id: m.id,
				reason: "slug_mismatch",
				front: slugFront,
				expected: slugExpected,
				path: mdPath,
			});
		}
		// url consistency
		const frontUrl = (front.url || "").toString();
		if (frontUrl && frontUrl !== m.url) {
			issues.push({
				id: m.id,
				reason: "url_mismatch",
				frontUrl,
				manifestUrl: m.url,
			});
		}
		// prepared_path consistency
		const preparedPath = m.prepared_path
			? m.prepared_path.replace(/^\./, "")
			: null;
		const expectedRel = "/docs/delivr/pages/" + path.basename(mdPath);
		// We'll just log if the relation doesn't align in a best-effort way
		if (preparedPath && !preparedPath.includes(path.basename(mdPath))) {
			// rough check
			issues.push({
				id: m.id,
				reason: "prepared_path_mismatch",
				preparedPath: m.prepared_path,
				mdPath,
			});
		}
		// origin_doc_path presence and sanity check (compare against current MD filename and prepared_path basename)
		const originDocPath = front.origin_doc_path || "";
		if (originDocPath) {
			const mdName = path.basename(mdPath);
			const preparedBase = m.prepared_path
				? path.basename(m.prepared_path)
				: "";
			const originOk =
				originDocPath.includes(mdName) || originDocPath.includes(preparedBase);
			if (!originOk) {
				issues.push({
					id: m.id,
					reason: "origin_doc_path_mismatch",
					originDocPath,
					doc_path: m.doc_path,
				});
			}
		}
		// skeleton check
		if (body && /Content not retrieved|Skeleton generated/.test(body)) {
			skeletons.push({ id: m.id, path: mdPath });
		} else {
			okCount++;
		}
	});

	const report = {
		generated_at: new Date().toISOString(),
		total_documents: total,
		ok_documents: okCount,
		missing_pages: missing,
		frontmatter_issues: issues,
		skeleton_pages: skeletons,
	};
	const reportDir = path.resolve(process.cwd(), "docs", "delivr", "reports");
	if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
	const reportPath = path.join(reportDir, "consistency-report.json");
	fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
	console.log("Consistency report written to", reportPath);
}

main();
