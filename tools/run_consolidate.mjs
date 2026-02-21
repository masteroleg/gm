#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";

function readText(p) {
	return fs.readFileSync(p, "utf8");
}
function writeText(p, s) {
	fs.mkdirSync(require("path").dirname(p), { recursive: true });
	fs.writeFileSync(p, s, "utf8");
}
function isJson(s) {
	try {
		JSON.parse(s);
		return true;
	} catch {
		return false;
	}
}

function runOpenCode({ model, attach, files, message }) {
	const args = ["run", "--model", model, "--format", "default"];
	if (attach) args.push("--attach", attach);
	for (const f of files) args.push("--file", f); // --file/-f documented
	args.push(message);

	const res = spawnSync("opencode", args, {
		encoding: "utf8",
		maxBuffer: 50 * 1024 * 1024,
	});
	return {
		code: res.status ?? 1,
		stdout: res.stdout || "",
		stderr: res.stderr || "",
	};
}

function main() {
	const model = process.env.OPENCODE_MODEL || "opencode/trinity-large-preview";
	const attach = process.env.OPENCODE_ATTACH || "http://localhost:4096";

	const prompt = readText("tools/prompt_consolidate.txt");
	const bundle = "migration/consolidate/bundle.md";
	const out = "migration/consolidate/result.json";

	// 1) build bundle
	const b = spawnSync("node", ["tools/build_bundle.mjs", "--out", bundle], {
		encoding: "utf8",
	});
	if ((b.status ?? 1) !== 0) {
		console.error(b.stderr);
		process.exit(1);
	}

	// 2) run consolidate
	let r = runOpenCode({ model, attach, files: [bundle], message: prompt });
	let txt = r.stdout.trim();

	// retry once if not JSON
	if (!isJson(txt)) {
		const retry =
			prompt +
			"\n\nВАЖНО: предыдущий ответ был НЕвалидным JSON. Верни ТОЛЬКО валидный JSON.\n";
		r = runOpenCode({ model, attach, files: [bundle], message: retry });
		txt = r.stdout.trim();
	}

	if (!isJson(txt)) {
		writeText(
			out.replace(/\.json$/, ".bad.txt"),
			txt + "\n\nSTDERR:\n" + r.stderr,
		);
		console.error("Not JSON. Saved .bad.txt");
		process.exit(2);
	}

	writeText(out, txt);

	// 3) apply
	const a = spawnSync(
		"node",
		["tools/apply_consolidate.mjs", "--in", out, "--repo", "."],
		{ encoding: "utf8" },
	);
	if ((a.status ?? 1) !== 0) {
		console.error(a.stderr);
		process.exit(1);
	}

	console.log("Done. Now run /bmad-index-docs on knowledge/ and adrs/.");
}

main();
