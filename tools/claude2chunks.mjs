#!/usr/bin/env node
import fs from "fs";
import path from "path";

function readJsonl(filePath) {
	const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/).filter(Boolean);
	const out = [];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		try { out.push(JSON.parse(line)); }
		catch { /* skip bad line */ }
	}
	return out;
}

function extractText(content) {
	if (!content) return "";
	if (typeof content === "string") return content;

	// list of blocks
	if (Array.isArray(content)) {
		const texts = [];
		for (const b of content) {
			if (!b) continue;

			// plain string in list
			if (typeof b === "string") { texts.push(b); continue; }

			if (typeof b === "object") {
				const t = String(b.type || "").toLowerCase();

				// drop thinking
				if (t === "thinking") continue;

				// normal text
				if (t === "text" && typeof b.text === "string") {
					texts.push(b.text);
					continue;
				}

				// tool_result can contain: string OR list of {type:"text", text:"..."}
				if (t === "tool_result") {
					texts.push(extractText(b.content));
					continue;
				}

				// generic fallbacks (sometimes nested)
				if (typeof b.text === "string") texts.push(b.text);
				else if (b.content) texts.push(extractText(b.content));
			}
		}
		return texts.filter(x => String(x).trim()).join("\n").trim();
	}

	// object wrapper
	if (typeof content === "object") {
		if (typeof content.text === "string") return content.text;
		if (content.content) return extractText(content.content);
	}

	return "";
}

function getRole(rec) {
	const t = (rec?.type || rec?.message?.role || "").toLowerCase();
	if (t === "user" || t === "assistant" || t === "system") return t;
	return "";
}

function getMeta(rec) {
	const msg = rec?.message ?? rec ?? {};
	const uuid = msg.uuid || rec.uuid || rec.message_id || rec.id || null;
	const ts = msg.timestamp || rec.timestamp || rec.created_at || rec.time || null;
	return { uuid, timestamp: ts };
}

function isNoise(rec) {
	const t = (rec?.type || "").toLowerCase();
	return t === "progress" || t === "file-history-snapshot" || t === "tool" || t === "trace";
}

function makeTurns(sessionId, records) {
	const turns = [];
	for (const r of records) {
		if (!r || isNoise(r)) continue;
		const role = getRole(r);
		if (!role) continue;

		const msg = r.message ?? r;
		const text = extractText(msg.content ?? msg.text ?? r.content ?? r.text).trim();
		if (!text) continue;

		const { uuid, timestamp } = getMeta(r);

		turns.push({ session_id: sessionId, uuid, timestamp, role, text });
	}
	return turns;
}

function writeFile(p, s) {
	fs.mkdirSync(path.dirname(p), { recursive: true });
	fs.writeFileSync(p, s, "utf8");
}

function splitIntoChunks(turns, maxChars) {
	const chunks = [];
	let cur = [];
	let curLen = 0;

	const boundaryRe = /\/bmad[-:][\w-]+|<command-name>\/bmad/i;

	for (const t of turns) {
		const addLen = t.text.length + 50;
		const isBoundary = t.role === "user" && boundaryRe.test(t.text);

		if (cur.length > 0 && (curLen + addLen > maxChars || isBoundary)) {
			chunks.push(cur);
			cur = [];
			curLen = 0;
		}

		cur.push(t);
		curLen += addLen;
	}
	if (cur.length) chunks.push(cur);
	return chunks;
}

function toTranscriptMd(turns) {
	return turns.map(t => {
		const ts = t.timestamp ? `[${t.timestamp}] ` : "";
		const role = t.role.toUpperCase();
		return `${ts}${role}:\n${t.text}\n`;
	}).join("\n");
}

// ---- CLI ----
const args = process.argv.slice(2);
function arg(name, def = null) {
	const i = args.indexOf(name);
	return i >= 0 ? args[i + 1] : def;
}

const inDir = arg("--in");
const outDir = arg("--out", "migration");
const maxChars = parseInt(arg("--max-chars", "12000"), 10);

if (!inDir) {
	console.error("Usage: node tools/claude2chunks.mjs --in migration/raw/.claude-sessions --out migration --max-chars 12000");
	process.exit(1);
}

const files = fs.readdirSync(inDir).filter(f => f.endsWith(".jsonl"));
if (!files.length) {
	console.error("No .jsonl files found in:", inDir);
	process.exit(1);
}

for (const f of files) {
	const sessionId = path.basename(f, ".jsonl");
	const records = readJsonl(path.join(inDir, f));
	const turns = makeTurns(sessionId, records);

	// transcripts for human reading
	writeFile(path.join(outDir, "transcripts", `${sessionId}.md`), toTranscriptMd(turns));

	// normalized turns
	writeFile(path.join(outDir, "normalized", `${sessionId}.turns.json`), JSON.stringify(turns, null, 2));

	// chunked JSON payloads for LLM
	const chunks = splitIntoChunks(turns, maxChars);
	chunks.forEach((c, idx) => {
		const payload = { SESSIONS_CHUNK: c };
		const name = `${sessionId}-chunk-${String(idx + 1).padStart(4, "0")}.json`;
		writeFile(path.join(outDir, "chunks", name), JSON.stringify(payload, null, 2));
	});
}

console.log("Done. See:", outDir);