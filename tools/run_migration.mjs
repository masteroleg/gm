#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

function readText(p) {
	return fs.readFileSync(p, "utf8");
}
function writeText(p, s) {
	fs.mkdirSync(path.dirname(p), { recursive: true });
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
	for (const f of files) args.push("--file", f);
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
	const repoRoot = ".";
	const chunksDir = "migration/chunks";
	const deltasDir = "migration/deltas";
	const promptFile = "tools/prompt_extract_delta.txt";

	// меняй при необходимости
	const model = process.env.OPENCODE_MODEL || "opencode/glm-5-free";
	const attach = process.env.OPENCODE_ATTACH || "http://localhost:4096";

	if (!fs.existsSync(chunksDir)) throw new Error(`No chunks dir: ${chunksDir}`);
	if (!fs.existsSync(promptFile))
		throw new Error(`No prompt file: ${promptFile}`);

	fs.mkdirSync(deltasDir, { recursive: true });

	const prompt = readText(promptFile);

	// файлы контекста (создадим если нет)
	const pc = "_bmad-output/project-context.md";
	const ki = "_bmad-output/knowledge/index.md";
	if (!fs.existsSync(pc)) writeText(pc, "");
	if (!fs.existsSync(ki)) writeText(ki, "");

	const chunks = fs
		.readdirSync(chunksDir)
		.filter((f) => f.endsWith(".json"))
		.sort();
	console.log(`Chunks: ${chunks.length}`);

	for (const file of chunks) {
		const chunkPath = path.join(chunksDir, file);
		const base = path.basename(file, ".json");
		const outPath = path.join(deltasDir, `${base}.delta.json`);

		console.log(`\n==> ${chunkPath}`);

		// 1) первый прогон
		let r = runOpenCode({
			model,
			attach,
			files: [chunkPath, pc, ki],
			message: prompt,
		});

		let out = r.stdout.trim();

		// 2) если не JSON — 1 retry с жёсткой инструкцией “почини JSON”
		if (!isJson(out)) {
			const retryMsg =
				prompt +
				"\n\nВАЖНО: Твой предыдущий ответ был НЕвалидным JSON. Верни ТОЛЬКО валидный JSON без markdown/комментариев.\n";

			r = runOpenCode({
				model,
				attach,
				files: [chunkPath, pc, ki],
				message: retryMsg,
			});
			out = r.stdout.trim();
		}

		if (!isJson(out)) {
			// сохраняем как "bad" для разборов и продолжаем дальше
			writeText(
				outPath.replace(/\.delta\.json$/, ".bad.txt"),
				out + "\n\nSTDERR:\n" + r.stderr,
			);
			console.error("!! Not JSON. Saved bad output, continuing.");
			continue;
		}

		writeText(outPath, out);

		// 3) применить дельту
		const apply = spawnSync(
			"node",
			["tools/apply_delta.mjs", "--delta", outPath, "--repo", repoRoot],
			{ encoding: "utf8" },
		);
		if ((apply.status ?? 1) !== 0) {
			console.error("!! apply_delta failed:", apply.stderr);
		}
	}

	console.log("\nDone. Now run /bmad-index-docs on knowledge/ and adrs/ once.");
}

main();
