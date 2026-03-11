const { execFileSync, spawnSync } = require("node:child_process");
const {
	existsSync,
	readFileSync,
	unlinkSync,
	writeFileSync,
} = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const CONFIG_PATH = path.join(process.cwd(), "commit-message.config.json");
const SESSION_CACHE_PATH = path.join(
	process.cwd(),
	".git",
	"opencode-commit-session",
);
const ANSI_PATTERN = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, "g");
const SESSION_ID_PATTERN = /^ses_[A-Za-z0-9]+$/;
const COMMIT_SESSION_TITLE_PATTERN = /^Git commit message/i;

const runGit = (args) => execFileSync("git", args, { encoding: "utf8" }).trim();

const getStagedFiles = () => {
	const output = runGit(["diff", "--cached", "--name-only"]);
	return output ? output.split(/\r?\n/).filter(Boolean) : [];
};

const getWorkingTreeFiles = () => {
	const changed = runGit(["diff", "--name-only"]);
	const untracked = runGit(["ls-files", "--others", "--exclude-standard"]);
	return [
		...new Set(
			[...changed.split(/\r?\n/), ...untracked.split(/\r?\n/)].filter(Boolean),
		),
	];
};

const getStat = () => runGit(["diff", "--cached", "--stat"]);
const getDiff = () => runGit(["diff", "--cached"]);
const getWorkingTreeStat = () => runGit(["diff", "--stat"]);
const getWorkingTreeDiff = () => runGit(["diff"]);

const readConfig = () => {
	if (!existsSync(CONFIG_PATH)) {
		return {
			opencodeModels: [],
			opencodeAttachUrl: "",
			maxPromptChars: 12000,
			fallbackToHeuristicGenerator: true,
		};
	}

	try {
		const parsed = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
		return {
			opencodeModels:
				Array.isArray(parsed.opencodeModels) && parsed.opencodeModels.length
					? parsed.opencodeModels.filter(Boolean)
					: [],
			opencodeAttachUrl:
				typeof parsed.opencodeAttachUrl === "string"
					? parsed.opencodeAttachUrl.trim()
					: "",
			maxPromptChars:
				typeof parsed.maxPromptChars === "number" && parsed.maxPromptChars > 0
					? parsed.maxPromptChars
					: 12000,
			fallbackToHeuristicGenerator:
				parsed.fallbackToHeuristicGenerator !== false,
		};
	} catch {
		return {
			opencodeModels: [],
			opencodeAttachUrl: "",
			maxPromptChars: 12000,
			fallbackToHeuristicGenerator: true,
		};
	}
};

const stripAnsi = (value) => value.replace(ANSI_PATTERN, "").replace(/\r/g, "");

const compactDiff = (diff, maxChars = 6000) => {
	if (!diff) return "";

	const sections = diff.split(/^diff --git /m).filter(Boolean);
	const snippets = [];
	let total = 0;

	for (const section of sections) {
		const lines = section.split(/\r?\n/);
		const picked = [];
		let changeLines = 0;

		for (const line of lines) {
			if (
				line.startsWith("a/") ||
				line.startsWith("index ") ||
				line.startsWith("--- ") ||
				line.startsWith("+++ ") ||
				line.startsWith("@@") ||
				(line.startsWith("+") && !line.startsWith("+++")) ||
				(line.startsWith("-") && !line.startsWith("---"))
			) {
				picked.push(line);
				if (
					(line.startsWith("+") && !line.startsWith("+++")) ||
					(line.startsWith("-") && !line.startsWith("---"))
				) {
					changeLines += 1;
				}
			}

			if (changeLines >= 12) break;
		}

		const snippet = `diff --git ${picked.join("\n")}`.trim();
		if (!snippet) continue;

		if (total + snippet.length > maxChars) break;
		snippets.push(snippet);
		total += snippet.length + 2;
	}

	return snippets.join("\n\n");
};

const buildPrompt = (files, stat, diff) => `Generate commit message.

Format (STRICT - follow exactly):

<subject>

<Russian summary>

- \`<file-1>\` — <note>
- \`<file-2>\` — <note>

Subject: English, Conventional Commit, MEANING not filename.
Body: Russian summary, then bullet list with actual notes per file.

Example good output:

docs(bmad): align Phase 1 proof scope and request metadata

Синхронизированы planning artifacts для Phase 1.

- \`_bmad-output/planning-artifacts/prd.md\` — уточнены acceptance criteria и SC moderation rules
- \`_bmad-output/planning-artifacts/epics.md\` — убраны future-phase элементы из active backlog
- \`_bmad-output/planning-artifacts/architecture.md\` — выровнены proof routes и request metadata

Bad (DO NOT OUTPUT):
chore: update prd.md, validation-report.md

BMAD: prd.md, validation-report.md

Files:
${files.join("\n")}

Stat:
${stat}

Diff:
${compactDiff(diff)}`;

const hasMeaningfulMessageContent = (value) =>
	/^[\t ]*[^#\s].+/m.test(value || "");

const extractMessage = (raw) => {
	const clean = stripAnsi(raw).trim();
	if (!clean) return "";

	const lines = clean.split(/\n/);
	const subjectRegex =
		/^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([^)]+\))?!?: .+/i;

	for (let index = lines.length - 1; index >= 0; index -= 1) {
		if (!subjectRegex.test(lines[index].trim())) continue;

		const candidate = lines
			.slice(index)
			.filter(
				(line, lineIndex) =>
					lineIndex === 0 || (!line.startsWith("$ ") && !line.startsWith("> ")),
			)
			.join("\n")
			.trim();

		if (candidate) return `${candidate}\n`;
	}

	return "";
};

const parseModelList = (raw) =>
	raw
		.split(/\r?\n/)
		.map((line) => stripAnsi(line).trim())
		.filter(Boolean)
		.filter((line) => line.includes("/"));

const resolveOpencode = () => {
	const preferredWindowsPath = "D:\\app\\opencode\\opencode.exe";
	if (process.platform === "win32" && existsSync(preferredWindowsPath)) {
		return preferredWindowsPath;
	}

	try {
		const locator = process.platform === "win32" ? "where.exe" : "which";
		const result = execFileSync(locator, ["opencode"], {
			encoding: "utf8",
		}).trim();
		return result.split(/\r?\n/).find(Boolean) || "";
	} catch {
		return "";
	}
};

const runCommand = (command, args, env = process.env) => {
	const result = spawnSync(command, args, {
		encoding: "utf8",
		env,
	});

	if (result.error) {
		return { ok: false, stdout: "", stderr: result.error.message };
	}

	return {
		ok: result.status === 0,
		stdout: result.stdout || "",
		stderr: result.stderr || "",
	};
};

const readCachedSessionId = () => {
	if (!existsSync(SESSION_CACHE_PATH)) return "";

	try {
		const value = readFileSync(SESSION_CACHE_PATH, "utf8").trim();
		return SESSION_ID_PATTERN.test(value) ? value : "";
	} catch {
		return "";
	}
};

const writeCachedSessionId = (sessionID) => {
	if (!SESSION_ID_PATTERN.test(sessionID)) return;

	try {
		writeFileSync(SESSION_CACHE_PATH, `${sessionID}\n`, "utf8");
	} catch {
		// ignore cache write failures
	}
};

const runWindowsPowerShell = (binary, script, env = process.env) =>
	runCommand(
		"powershell.exe",
		[
			"-NoProfile",
			"-NonInteractive",
			"-ExecutionPolicy",
			"Bypass",
			"-Command",
			script.replace(/__BINARY__/g, binary.replace(/'/g, "''")),
		],
		env,
	);

const getSessionList = (binary) => {
	if (!binary) return [];

	const result =
		process.platform === "win32"
			? runWindowsPowerShell(binary, "& '__BINARY__' session list")
			: runCommand(binary, ["session", "list"]);

	if (!result.ok) return [];

	return stripAnsi(result.stdout)
		.split(/\r?\n/)
		.map((line) => line.trimEnd())
		.filter((line) => SESSION_ID_PATTERN.test(line.split(/\s+/)[0] || ""))
		.map((line) => {
			const match = line.match(/^(ses_[A-Za-z0-9]+)\s+(.+?)\s{2,}.+$/);
			if (!match) return null;
			return { id: match[1], title: match[2].trim() };
		})
		.filter(Boolean);
};

const resolveCommitSessionId = (binary) => {
	const cached = readCachedSessionId();
	if (cached) return cached;

	const sessions = getSessionList(binary);
	const existing = sessions.find((session) =>
		COMMIT_SESSION_TITLE_PATTERN.test(session.title),
	);

	if (!existing) return "";

	writeCachedSessionId(existing.id);
	return existing.id;
};

const getAvailableModels = (binary) => {
	if (!binary) return [];

	if (process.platform === "win32") {
		const result = runWindowsPowerShell(binary, "& '__BINARY__' models");
		return result.ok ? parseModelList(result.stdout) : [];
	}

	const result = runCommand(binary, ["models"]);
	return result.ok ? parseModelList(result.stdout) : [];
};

const resolveModelCandidates = (config) =>
	config.opencodeModels.filter(Boolean);

const selectModel = (availableModels, candidates) => {
	for (const candidate of candidates) {
		if (availableModels.includes(candidate)) return candidate;
	}

	return "";
};

const runOpencodeCommand = (
	binary,
	model,
	prompt,
	sessionID,
	attachUrl = "",
) => {
	const args = ["run", prompt, "--model", model, "--session", sessionID];

	if (attachUrl) args.push("--attach", attachUrl);

	const result = runCommand(binary, args);
	if (!result.ok) return "";

	const output = `${result.stdout}\n${result.stderr}`;
	return extractMessage(output);
};

const runOpencodeWindows = (
	binary,
	model,
	prompt,
	sessionID,
	attachUrl = "",
) => {
	if (attachUrl) {
		return runOpencodeCommand(binary, model, prompt, sessionID, attachUrl);
	}

	const promptFile = path.join(
		os.tmpdir(),
		`opencode-commit-${process.pid}-${Date.now()}.txt`,
	);
	writeFileSync(promptFile, prompt, "utf8");

	const result = runWindowsPowerShell(
		binary,
		"& '__BINARY__' run (Get-Content -Raw $env:OPENCODE_PROMPT_FILE) --model $env:OPENCODE_MODEL --session $env:OPENCODE_SESSION_ID",
		{
			...process.env,
			OPENCODE_PROMPT_FILE: promptFile,
			OPENCODE_MODEL: model,
			OPENCODE_SESSION_ID: sessionID,
		},
	);

	try {
		unlinkSync(promptFile);
	} catch {
		// ignore temp cleanup failures
	}

	return result.ok ? extractMessage(`${result.stdout}\n${result.stderr}`) : "";
};

const runOpencodePosix = (binary, model, prompt, sessionID, attachUrl = "") =>
	runOpencodeCommand(binary, model, prompt, sessionID, attachUrl);

const runOpencode = (prompt) => {
	const config = readConfig();
	if (prompt.length > config.maxPromptChars) return "";

	const binary = resolveOpencode();
	if (!binary) return "";

	const availableModels = getAvailableModels(binary);
	const candidates = resolveModelCandidates(config);
	const selectedModel = selectModel(availableModels, candidates);
	const sessionID = resolveCommitSessionId(binary);
	const attachUrl = config.opencodeAttachUrl;

	if (!selectedModel || !sessionID) return "";

	if (process.platform === "win32")
		return runOpencodeWindows(
			binary,
			selectedModel,
			prompt,
			sessionID,
			attachUrl,
		);
	return runOpencodePosix(binary, selectedModel, prompt, sessionID, attachUrl);
};

const detectType = (files) => {
	if (!files.length) return "chore";
	if (
		files.every(
			(file) => file.startsWith("_bmad/") || file.startsWith("_bmad-output/"),
		)
	)
		return "docs";
	if (
		files.every(
			(file) =>
				/^README/i.test(file) ||
				file.startsWith("docs/") ||
				file.includes("/README"),
		)
	)
		return "docs";
	if (files.some((file) => file.startsWith(".github/workflows/"))) return "ci";
	if (files.some((file) => file.startsWith("tests/"))) return "test";
	if (
		files.some(
			(file) =>
				file.startsWith(".husky/") ||
				file === ".gitignore" ||
				file.startsWith(".vscode/"),
		)
	)
		return "chore";
	if (files.some((file) => file.startsWith("site/assets/css/"))) return "style";
	if (files.some((file) => file.startsWith("site/"))) return "feat";
	return "chore";
};

const detectScope = (files) => {
	if (!files.length) return "";
	if (
		files.some(
			(file) => file.startsWith("_bmad/") || file.startsWith("_bmad-output/"),
		)
	)
		return "bmad";
	if (files.some((file) => file.startsWith(".husky/"))) return "hooks";
	if (files.some((file) => /^README/i.test(file) || file.includes("/README")))
		return "readme";
	if (files.some((file) => file.startsWith(".github/workflows/"))) return "ci";
	if (files.some((file) => file.startsWith("tests/"))) return "tests";
	if (files.some((file) => file.startsWith("site/"))) return "site";
	return "";
};

const categorizeFiles = (files) => {
	const categories = {
		bmad: [],
		tests: [],
		ci: [],
		docs: [],
		site: [],
		config: [],
		other: [],
	};

	for (const file of files) {
		if (file.startsWith("_bmad")) categories.bmad.push(file);
		else if (file.startsWith("tests/")) categories.tests.push(file);
		else if (file.startsWith(".github/workflows/")) categories.ci.push(file);
		else if (file.startsWith("docs/") || /^README/i.test(file))
			categories.docs.push(file);
		else if (file.startsWith("site/")) categories.site.push(file);
		else if (
			file.startsWith(".husky/") ||
			file.startsWith(".vscode/") ||
			[".gitignore", "tsconfig.json", "biome.json"].includes(file)
		)
			categories.config.push(file);
		else categories.other.push(file);
	}

	return categories;
};

const buildCategoryDescription = (categories) => {
	const descriptions = [];

	if (categories.bmad.length) {
		descriptions.push(
			`BMAD artifacts: ${categories.bmad.length} file${categories.bmad.length > 1 ? "s" : ""}`,
		);
	}
	if (categories.tests.length) {
		descriptions.push(
			`tests: ${categories.tests.length} file${categories.tests.length > 1 ? "s" : ""}`,
		);
	}
	if (categories.ci.length) {
		descriptions.push(
			`CI/CD workflows: ${categories.ci.length} file${categories.ci.length > 1 ? "s" : ""}`,
		);
	}
	if (categories.docs.length) {
		descriptions.push(
			`documentation: ${categories.docs.length} file${categories.docs.length > 1 ? "s" : ""}`,
		);
	}
	if (categories.site.length) {
		descriptions.push(
			`site: ${categories.site.length} file${categories.site.length > 1 ? "s" : ""}`,
		);
	}
	if (categories.config.length) {
		descriptions.push(
			`config: ${categories.config.length} file${categories.config.length > 1 ? "s" : ""}`,
		);
	}
	if (categories.other.length) {
		descriptions.push(
			`other: ${categories.other.length} file${categories.other.length > 1 ? "s" : ""}`,
		);
	}

	return descriptions;
};

const toBaseName = (file) => file.split("/").pop();

const formatFileList = (files, limit = 5) => {
	const names = files.map(toBaseName);
	if (names.length <= limit) return names.join(", ");
	return `${names.slice(0, limit).join(", ")} and ${names.length - limit} more`;
};

const allFilesInPath = (files, prefix) =>
	files.every((file) => file.startsWith(prefix));

const summarize = (files, stat, type) => {
	const fileCount = files.length;
	const hasReadme = files.some(
		(file) => /^README/i.test(file) || file.includes("/README"),
	);
	const hasHusky = files.some((file) => file.startsWith(".husky/"));
	const hasCi = files.some((file) => file.startsWith(".github/workflows/"));
	const smallDocEdit =
		fileCount === 1 &&
		hasReadme &&
		/1 file changed, 1 insertion\(\+\), 1 deletion\(-\)/.test(stat);

	if (smallDocEdit) {
		return {
			subject: "docs(readme): clean up wording and formatting",
			body: "Уточнено и слегка выровнено оформление README без изменения процесса работы.",
		};
	}

	if (hasReadme && hasHusky) {
		return {
			subject: "chore(hooks): update commit message automation",
			body: "Обновлены git hooks для автогенерации commit message и синхронизировано описание процесса в README.",
		};
	}

	if (hasHusky) {
		return {
			subject: "chore(hooks): refine local git hook behavior",
			body: "Обновлена логика локальных git hooks, чтобы сценарий коммита и проверок работал стабильнее.",
		};
	}

	if (hasCi) {
		return {
			subject: "ci: update pipeline checks and deployment flow",
			body: "Скорректирован workflow CI/CD, чтобы проверки и деплой выполнялись в ожидаемом порядке.",
		};
	}

	if (hasReadme) {
		return {
			subject: "docs(readme): update workflow notes",
			body: "Обновлено описание процесса работы, чтобы через время было проще восстановить контекст.",
		};
	}

	// Multi-file case: analyze and describe what was actually changed
	const categories = categorizeFiles(files);
	const descriptions = buildCategoryDescription(categories);
	const categoryList = descriptions.join(", ");

	const scope = detectScope(files);
	const prefix = scope ? `${type}(${scope})` : type;

	if (fileCount <= 3) {
		// For small commits, be more specific - show actual file names in body
		const fileNames = files.map((f) => f.split("/").pop()).join(", ");
		let bodyText = "";

		// Build informative body based on categories
		if (categories.bmad.length) {
			bodyText = `BMAD: ${categories.bmad.map((f) => f.split("/").pop()).join(", ")}`;
		} else if (categories.docs.length) {
			bodyText = `Docs: ${categories.docs.map((f) => f.split("/").pop()).join(", ")}`;
		} else if (categories.tests.length) {
			bodyText = `Tests: ${categories.tests.map((f) => f.split("/").pop()).join(", ")}`;
		} else if (categories.site.length) {
			bodyText = `Site: ${categories.site.map((f) => f.split("/").pop()).join(", ")}`;
		} else if (categories.config.length) {
			bodyText = `Config: ${categories.config.map((f) => f.split("/").pop()).join(", ")}`;
		} else {
			bodyText = `Updated: ${fileNames}`;
		}

		return {
			subject: `${prefix}: update ${fileNames}`,
			body: bodyText,
		};
	}

	if (categories.bmad.length === fileCount) {
		return {
			subject: allFilesInPath(files, "_bmad-output/planning-artifacts/")
				? "docs(bmad): update planning artifacts"
				: "docs(bmad): update BMAD artifacts",
			body: `BMAD: ${formatFileList(categories.bmad)}.`,
		};
	}

	if (categories.docs.length === fileCount) {
		return {
			subject: "docs: update project documentation",
			body: `Docs: ${formatFileList(categories.docs)}.`,
		};
	}

	if (categories.site.length === fileCount) {
		return {
			subject: "feat(site): update site content and assets",
			body: `Site: ${formatFileList(categories.site)}.`,
		};
	}

	return {
		subject: `${prefix}: update ${fileCount} project files`,
		body: `Категории изменений: ${categoryList}.`,
	};
};

const buildMessage = (files, stat) => {
	const type = detectType(files);
	const { subject, body } = summarize(files, stat, type);
	return `${subject}\n\n${body}\n`;
};

if (process.argv.includes("--self-test")) {
	const testName = process.argv[3] || "readme";

	const tests = {
		readme: {
			files: ["README.md"],
			stat: " README.md | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)",
		},
		multi: {
			files: [
				"_bmad-output/planning-artifacts/prd.md",
				"_bmad-output/planning-artifacts/architecture.md",
				"CLAUDE.md",
				"docs/genu-im-homepage-master-plan.md",
				"site/assets/css/output.css",
				"site/index.html",
				".vscode/settings.json",
				"playwright.config.ts",
				"package.json",
				"_bmad-output/index.md",
				"_bmad-output/planning-artifacts/validation-report-2026-03-10.md",
				"repo-index.md",
			],
			stat: " 12 files changed, 4433 insertions(+), 60 deletions(-)",
		},
		three: {
			files: [".husky/pre-commit", ".husky/prepare-commit-msg", "README.md"],
			stat: " 3 files changed, 5 insertions(+), 2 deletions(-)",
		},
	};

	const test = tests[testName] || tests.readme;
	const message = buildMessage(test.files, test.stat);
	process.stdout.write(message);
	process.exit(0);
}

const messageFile = process.argv[2];
if (!messageFile) process.exit(0);

const current = readFileSync(messageFile, "utf8");
if (hasMeaningfulMessageContent(current)) process.exit(0);

let files = getStagedFiles();
let stat = getStat();
let diff = getDiff();

if (!files.length) {
	files = getWorkingTreeFiles();
	stat = getWorkingTreeStat();
	diff = getWorkingTreeDiff();
}

if (!files.length) process.exit(0);

const config = readConfig();
const aiMessage = runOpencode(buildPrompt(files, stat, diff));

const nextMessage =
	aiMessage ||
	(config.fallbackToHeuristicGenerator ? buildMessage(files, stat) : "");

if (!nextMessage) process.exit(0);

writeFileSync(messageFile, nextMessage, "utf8");
