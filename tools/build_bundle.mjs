#!/usr/bin/env node
import fs from "fs";
import path from "path";

function read(p) { return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : ""; }
function listFiles(dir) {
	if (!fs.existsSync(dir)) return [];
	const out = [];
	for (const name of fs.readdirSync(dir)) {
		const p = path.join(dir, name);
		const st = fs.statSync(p);
		if (st.isDirectory()) out.push(...listFiles(p));
		else if (name.toLowerCase().endsWith(".md")) out.push(p);
	}
	return out.sort();
}

function main() {
	const outPath = process.argv[process.argv.indexOf("--out") + 1] || "migration/consolidate/bundle.md";
	const pc = "_bmad-output/project-context.md";
	const ki = "_bmad-output/knowledge/index.md";
	const fragmentsDir = "_bmad-output/knowledge/fragments";
	const adrsDir = "_bmad-output/solutioning/adrs";

	const fragments = listFiles(fragmentsDir);
	const adrs = listFiles(adrsDir);

	let buf = "";
	buf += "# BMAD CONSOLIDATION BUNDLE\n\n";

	buf += "## FILE: _bmad-output/project-context.md\n\n";
	buf += read(pc) + "\n\n";

	buf += "## FILE: _bmad-output/knowledge/index.md\n\n";
	buf += read(ki) + "\n\n";

	buf += `# FRAGMENTS (${fragments.length})\n\n`;
	for (const f of fragments) {
		const rel = f.replace(/\\/g, "/");
		buf += `## FILE: ${rel}\n\n`;
		buf += read(f) + "\n\n";
	}

	buf += `# ADRS (${adrs.length})\n\n`;
	for (const a of adrs) {
		const rel = a.replace(/\\/g, "/");
		buf += `## FILE: ${rel}\n\n`;
		buf += read(a) + "\n\n";
	}

	fs.mkdirSync(path.dirname(outPath), { recursive: true });
	fs.writeFileSync(outPath, buf, "utf8");
	console.log("Wrote bundle:", outPath);
}

main();