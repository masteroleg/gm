#!/usr/bin/env node
import fs from "fs";
import path from "path";

function readJson(p) {
	return JSON.parse(fs.readFileSync(p, "utf8"));
}

function ensureDir(p) {
	fs.mkdirSync(p, { recursive: true });
}

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

function applyArtifact(repoRoot, key, obj) {
	if (!obj || !obj.mode || obj.mode === "skip") return;

	const map = {
		project_context_md: "_bmad-output/project-context.md",
		knowledge_index_md: "_bmad-output/knowledge/index.md",
		prd_md: "_bmad-output/planning-artifacts/PRD.md",
		architecture_md: "_bmad-output/solutioning/architecture.md"
	};

	const rel = map[key];
	if (!rel) return;
	writeFileSafe(path.join(repoRoot, rel), obj.content || "");
}

function applyAdrs(repoRoot, adrs) {
	if (!Array.isArray(adrs)) return;
	for (const a of adrs) {
		if (!a || a.mode === "skip") continue;
		const file = a.file || "ADR-UNKNOWN.md";
		const p = path.join(repoRoot, "_bmad-output/solutioning/adrs", file);
		writeFileSafe(p, a.content || "");
	}
}

function applyFragments(repoRoot, fragments) {
	if (!Array.isArray(fragments)) return;
	for (const f of fragments) {
		if (!f || f.mode === "skip") continue;
		const rel = (f.file || "").startsWith("fragments/") ? f.file : `fragments/${f.file || "unknown.md"}`;
		const p = path.join(repoRoot, "_bmad-output/knowledge", rel);
		writeFileSafe(p, f.content || "");
	}
}

// ---- CLI ----
const args = process.argv.slice(2);
const deltaPath = args[args.indexOf("--delta") + 1];
const repoRoot = args.includes("--repo") ? args[args.indexOf("--repo") + 1] : ".";

if (!deltaPath) {
	console.error("Usage: node tools/apply_delta.mjs --delta migration/deltas/xxx.delta.json --repo .");
	process.exit(1);
}

const delta = readJson(deltaPath);
const artifacts = delta.artifacts || {};

for (const [k, v] of Object.entries(artifacts)) {
	if (k === "adrs") continue;
	applyArtifact(repoRoot, k, v);
}

applyAdrs(repoRoot, artifacts.adrs);
applyFragments(repoRoot, delta.fragments);

console.log("Applied:", deltaPath);