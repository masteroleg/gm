#!/usr/bin/env node
import fs from "fs";
import path from "path";

function readJson(p) { return JSON.parse(fs.readFileSync(p, "utf8")); }
function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function backupIfExists(filePath) {
	if (!fs.existsSync(filePath)) return;
	const ts = new Date().toISOString().replace(/[:.]/g, "-");
	const backupRoot = path.join(".bmad-migration-backups", ts);
	const rel = filePath.replace(/^\.?[\/\\]?/, "");
	const dst = path.join(backupRoot, rel);
	ensureDir(path.dirname(dst));
	fs.copyFileSync(filePath, dst);
}

function writeFileSafe(filePath, content) {
	ensureDir(path.dirname(filePath));
	backupIfExists(filePath);
	fs.writeFileSync(filePath, content ?? "", "utf8");
}

function applyList(baseDir, items) {
	if (!Array.isArray(items)) return;
	for (const it of items) {
		if (!it || it.mode === "skip") continue;
		const p = path.join(baseDir, it.file);
		writeFileSafe(p, it.content || "");
	}
}

const args = process.argv.slice(2);
const inPath = args[args.indexOf("--in") + 1];
const repo = args.includes("--repo") ? args[args.indexOf("--repo") + 1] : ".";

if (!inPath) {
	console.error("Usage: node tools/apply_consolidate.mjs --in migration/consolidate/result.json --repo .");
	process.exit(1);
}

const data = readJson(inPath);
const fa = data.final_artifacts || {};

if (fa.project_context_md?.mode === "update") {
	writeFileSafe(path.join(repo, "_bmad-output/project-context.md"), fa.project_context_md.content || "");
}
if (fa.knowledge_index_md?.mode === "update") {
	writeFileSafe(path.join(repo, "_bmad-output/knowledge/index.md"), fa.knowledge_index_md.content || "");
}

applyList(path.join(repo, "_bmad-output/solutioning/adrs"), fa.adrs);
applyList(path.join(repo, "_bmad-output/knowledge"), fa.fragments);

console.log("Applied consolidate:", inPath);