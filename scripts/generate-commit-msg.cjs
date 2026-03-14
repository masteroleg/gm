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

const EXCLUDED_MESSAGE_FILES = new Set([
	"commit-msg-test.txt",
	"COMMIT_EDITMSG",
	".git/COMMIT_EDITMSG",
]);

const filterMessageFiles = (files) =>
	files.filter((file) => !EXCLUDED_MESSAGE_FILES.has(file));

const getStagedFiles = () => {
	const output = runGit(["diff", "--cached", "--name-only"]);
	const files = output ? output.split(/\r?\n/).filter(Boolean) : [];
	return filterMessageFiles(files);
};

const getWorkingTreeFiles = () => {
	const changed = runGit(["diff", "--name-only"]);
	const untracked = runGit(["ls-files", "--others", "--exclude-standard"]);
	const files = [
		...new Set(
			[...changed.split(/\r?\n/), ...untracked.split(/\r?\n/)].filter(Boolean),
		),
	];
	return filterMessageFiles(files);
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

const buildPromptWithOptions = (files, stat, diff, options) => {
	const examples = options.includeExamples
		? `Example 1 - BMAD changes:\n\n` +
			`docs(bmad): align Phase 1 proof scope and request metadata\n\n` +
			`Synchronize planning artifacts for Phase 1 to clarify proof scope boundaries, metadata request flow, and validation rules across BMAD documents.\n\n` +
			`RUSSIAN SUMMARY:\n` +
			`Синхронизированы planning artifacts для Phase 1: уточнены границы proof scope, metadata request flow и validation rules. Теперь acceptance criteria в PRD точно соответствуют архитектуре и не противоречат друг другу.\n\n` +
			`- \`_bmad-output/planning-artifacts/prd.md\` — clarify acceptance criteria and moderation rules for proof validation boundaries\n` +
			`  RU: Конкретизированы acceptance criteria для proof validation, указаны случаи, когда модерация требуется или может быть пропущена\n\n` +
			`- \`_bmad-output/planning-artifacts/epics.md\` — remove future-phase items from active backlog to avoid scope creep\n` +
			`  RU: Убраны планы для Phase 2+ из текущего backlog, чтобы не путать с Phase 1 delivery\n\n` +
			`- \`_bmad-output/planning-artifacts/architecture.md\` — align proof routes and request metadata structures\n` +
			`  RU: Выровнены proof-flow routes и data structures в request/metadata, удалены противоречия\n\n` +
			`Example 2 - Site feature:\n\n` +
			`fix(epic-3): address code review findings and improve UX\n\n` +
			`Refine page naming, remove duplicate CTAs, add accessibility attributes, and sync documentation after code review. Improves user clarity and accessibility compliance.\n\n` +
			`RUSSIAN SUMMARY:\n` +
			`Исправлены замечания code review для Epic 3: переименована страница маршрутизации для ясности, удалён дублирующий CTA, добавлены атрибуты доступности, синхронизирована документация. Пользователям теперь понятнее, куда нужно идти, а доступность соответствует WCAG.\n\n` +
			`- \`site/perevir-product/index.html\` — rename from "Official Checking" to "Choose Your Path" for clarity\n` +
			`  RU: Переименована в "Choose Your Path" вместо "Official Checking" — пользователи теперь понимают, что это выбор сценария, а не готовый ответ\n\n` +
			`- \`site/request/index.html\` — fix fallback messages and add ARIA accessibility attributes\n` +
			`  RU: Обновлены fallback сообщения (убрано "visible below"), добавлены role, aria-live, aria-label для скрин-ридеров\n\n` +
			`- \`site/assets/js/lang-toggle.js\` — update translations for clarity\n` +
			`  RU: Уточнены переводы fallback на EN и UK, добавлен fallback.edit ключ\n\n`
		: "";

	const diffSnippet =
		options.diffBudget > 0 ? compactDiff(diff, options.diffBudget) : "";

	return (
		`Generate a bilingual commit message.\n\n` +
		`Format (STRICT - follow exactly):\n\n` +
		`<subject>\n\n` +
		`<English summary (1-2 sentences about overall intent)>\n\n` +
		`RUSSIAN SUMMARY:\n` +
		`<Russian detailed explanation>\n\n` +
		`- \`<file-1>\` — <English note about what changed>\n` +
		`  RU: <Russian explanation of why this change matters>\n\n` +
		`- \`<file-2>\` — <English note>\n` +
		`  RU: <Russian explanation>\n\n` +
		`RULES FOR ENGLISH SECTION:\n` +
		`- Subject: Conventional Commit format (type(scope): brief description)\n` +
		`- English summary: Clear, concise, explains overall purpose\n` +
		`- English bullets: What changed in each file and its impact\n` +
		`- Use active voice, precise technical terms\n\n` +
		`RULES FOR RUSSIAN SECTION:\n` +
		`- Summary: Detailed explanation of WHY changes were made, how they affect workflow\n` +
		`- Each RU bullet: Explain significance, context, and user/developer benefit\n` +
		`- Avoid filler: NOT "обновлен файл" but "уточнены acceptance criteria, чтобы..."\n` +
		`- Explain the business/technical reason for each change\n\n` +
		`QUALITY RULES (both languages):\n` +
		`- Each file needs meaningful explanation - no generic "update" or "modify" alone\n` +
		`- If a file is documentation: say what was clarified or added\n` +
		`- If a file is code: say what behavior changed and why\n` +
		`- If a file is config: say what was tightened or adjusted\n` +
		`- Russian section provides CONTEXT and REASONING, not just translation\n` +
		`- Avoid repetition between English and Russian - Russian adds depth\n\n` +
		`${examples}` +
		`Bad examples (DO NOT OUTPUT):\n` +
		`- Subject: "chore: update files"\n` +
		`- English: "Updated prd.md"\n` +
		`- RU: "Обновлены файлы" (this is just translation, not explanation)\n\n` +
		`Filename-only bullets like "- \`prd.md\` — обновлен файл" are NOT acceptable.\n` +
		`Filler like "Несколько обновлений" or "Обновлены файлы" is NOT acceptable.\n\n` +
		`Files:\n${files.join("\n")}\n\n` +
		`Stat:\n${stat}\n\n` +
		`Diff:\n${diffSnippet}`
	);
};

const buildPrompt = (files, stat, diff, maxChars) => {
	const baseWithExamples = buildPromptWithOptions(files, stat, "", {
		includeExamples: true,
		diffBudget: 0,
	});
	let diffBudget = Math.max(800, maxChars - baseWithExamples.length - 50);
	let prompt = buildPromptWithOptions(files, stat, diff, {
		includeExamples: true,
		diffBudget,
	});
	if (prompt.length <= maxChars) return prompt;

	const baseNoExamples = buildPromptWithOptions(files, stat, "", {
		includeExamples: false,
		diffBudget: 0,
	});
	diffBudget = Math.max(500, maxChars - baseNoExamples.length - 50);
	prompt = buildPromptWithOptions(files, stat, diff, {
		includeExamples: false,
		diffBudget,
	});
	if (prompt.length <= maxChars) return prompt;

	return buildPromptWithOptions(files, stat, "", {
		includeExamples: false,
		diffBudget: 0,
	});
};

const buildRepairPrompt = (
	files,
	stat,
	diff,
	previous,
) => `Rewrite this commit message to be more specific and useful. Keep the bilingual format:

<subject>

<English summary>

RUSSIAN SUMMARY:
<Russian explanation>

- \`<file>\` — <English note>
  RU: <Russian explanation>

Fix these problems:
- Remove filler like "Несколько обновлений", "Обновлены файлы", "обновлен файл"
- Make English summary explain the overall intent (why this change matters)
- Make Russian summary provide context and reasoning (not just translation)
- Make every bullet describe WHAT changed and WHY (not just filename)
- Each RU bullet should explain business/technical significance
- Use precise wording: "clarify", "fix", "remove", "add", "sync", not generic "update"
- If there's a milestone, alignment, or scope clarification, state it explicitly

Current message to improve:
${previous}

Files:
${files.join("\n")}

Stat:
${stat}

Diff:
${compactDiff(diff)}`;

const isWeakMessage = (message) => {
	const clean = String(message || "").trim();
	if (!clean) return true;
	const lines = clean
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean);
	if (lines.length < 3) return true;

	const subject = lines[0] || "";
	const summary = lines[1] || "";
	const bullets = lines.filter((line) => line.startsWith("- `"));

	if (/update BMAD artifacts/i.test(subject)) return true;
	if (
		/update [\w.-]+\.(md|txt|json|ya?ml|js|cjs|mjs|ts|tsx|css|html)/i.test(
			subject,
		)
	)
		return true;
	if (/^Несколько обновлений[:.]?/i.test(summary)) return true;
	if (/^Обновлен[аоы]? /i.test(summary)) return true;
	if (/^Updated[: ]/i.test(summary)) return true;
	if (bullets.length === 0) return true;
	if (bullets.some((line) => /—\s*(BMAD|Docs|Tests|Site|Config):/i.test(line)))
		return true;
	if (
		bullets.some((line) =>
			/—\s*(обновлен|updated|изменен файл|добавлены изменения)\b/i.test(line),
		)
	)
		return true;
	if (
		bullets.some((line) =>
			/—\s*[^—]*\b[\w.-]+\.(md|txt|json|ya?ml|js|cjs|mjs|ts|tsx|css|html)\b\.?$/i.test(
				line,
			),
		)
	)
		return true;

	return false;
};

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
	const sessions = getSessionList(binary);

	if (cached && sessions.some((session) => session.id === cached))
		return cached;

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

const runOpencodeCommand = (binary, model, prompt, options) => {
	const args = ["run", prompt, "--model", model];

	if (options.sessionID) args.push("--session", options.sessionID);
	if (options.useContinue) args.push("--continue");
	if (options.attachUrl) args.push("--attach", options.attachUrl);

	const result = runCommand(binary, args);
	if (!result.ok) return "";

	const output = `${result.stdout}\n${result.stderr}`;
	return extractMessage(output);
};

const runOpencodeWindows = (binary, model, prompt, options) => {
	if (options.attachUrl) {
		return runOpencodeCommand(binary, model, prompt, options);
	}

	const promptFile = path.join(
		os.tmpdir(),
		`opencode-commit-${process.pid}-${Date.now()}.txt`,
	);
	writeFileSync(promptFile, prompt, "utf8");

	const command = options.useContinue
		? "& '__BINARY__' run (Get-Content -Raw $env:OPENCODE_PROMPT_FILE) --model $env:OPENCODE_MODEL --continue"
		: "& '__BINARY__' run (Get-Content -Raw $env:OPENCODE_PROMPT_FILE) --model $env:OPENCODE_MODEL --session $env:OPENCODE_SESSION_ID";

	const result = runWindowsPowerShell(binary, command, {
		...process.env,
		OPENCODE_PROMPT_FILE: promptFile,
		OPENCODE_MODEL: model,
		OPENCODE_SESSION_ID: options.sessionID || "",
	});

	try {
		unlinkSync(promptFile);
	} catch {
		// ignore temp cleanup failures
	}

	return result.ok ? extractMessage(`${result.stdout}\n${result.stderr}`) : "";
};

const runOpencodePosix = (binary, model, prompt, options) =>
	runOpencodeCommand(binary, model, prompt, options);

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

	if (!selectedModel) return "";

	const attempts = [
		{ sessionID, attachUrl, useContinue: false },
		{ sessionID: "", attachUrl, useContinue: true },
		{ sessionID, attachUrl: "", useContinue: false },
		{ sessionID: "", attachUrl: "", useContinue: true },
	];

	for (const attempt of attempts) {
		if (!attempt.sessionID && !attempt.useContinue) continue;
		const result =
			process.platform === "win32"
				? runOpencodeWindows(binary, selectedModel, prompt, attempt)
				: runOpencodePosix(binary, selectedModel, prompt, attempt);
		if (result) return result;
	}

	return "";
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
			body: "Clean up README for clarity without changing process.\n\nRUSSIAN:\nУточнено и слегка выровнено оформление README без изменения процесса работы.",
		};
	}

	if (hasReadme && hasHusky) {
		return {
			subject: "chore(hooks): update commit message automation",
			body: "Improve git hooks for commit message generation and align README docs with implementation.\n\nRUSSIAN:\nОбновлены git hooks для автогенерации commit message и синхронизировано описание процесса в README. Теперь процесс работает стабильнее и документация совпадает с кодом.",
		};
	}

	if (hasHusky) {
		return {
			subject: "chore(hooks): refine local git hook behavior",
			body: "Improve git hook logic for more stable commit and validation workflow.\n\nRUSSIAN:\nОбновлена логика локальных git hooks, чтобы сценарий коммита и проверок работал стабильнее. Добавлены checks для обнаружения corruption и graceful fallbacks.",
		};
	}

	if (hasCi) {
		return {
			subject: "ci: update pipeline checks and deployment flow",
			body: "Adjust CI/CD workflow to ensure checks and deployment execute in correct order.\n\nRUSSIAN:\nСкорректирован workflow CI/CD, чтобы проверки и деплой выполнялись в ожидаемом порядке. Improved error handling and rollback behavior.",
		};
	}

	if (hasReadme) {
		return {
			subject: "docs(readme): update workflow notes",
			body: "Update documentation to clarify process for future reference.\n\nRUSSIAN:\nОбновлено описание процесса работы, чтобы через время было проще восстановить контекст. Добавлены примеры и clarifications для новых разработчиков.",
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
		let englishBody = "";
		let russianBody = "";

		// Build informative body based on categories
		if (categories.bmad.length) {
			englishBody = `Update BMAD artifacts: ${categories.bmad.map((f) => f.split("/").pop()).join(", ")}`;
			russianBody = `Обновлены BMAD артефакты: ${categories.bmad.map((f) => f.split("/").pop()).join(", ")}`;
		} else if (categories.docs.length) {
			englishBody = `Update documentation: ${categories.docs.map((f) => f.split("/").pop()).join(", ")}`;
			russianBody = `Обновлена документация: ${categories.docs.map((f) => f.split("/").pop()).join(", ")}`;
		} else if (categories.tests.length) {
			englishBody = `Update tests: ${categories.tests.map((f) => f.split("/").pop()).join(", ")}`;
			russianBody = `Обновлены тесты: ${categories.tests.map((f) => f.split("/").pop()).join(", ")}`;
		} else if (categories.site.length) {
			englishBody = `Update site content: ${categories.site.map((f) => f.split("/").pop()).join(", ")}`;
			russianBody = `Обновлен контент сайта: ${categories.site.map((f) => f.split("/").pop()).join(", ")}`;
		} else if (categories.config.length) {
			englishBody = `Update configuration: ${categories.config.map((f) => f.split("/").pop()).join(", ")}`;
			russianBody = `Обновлены настройки: ${categories.config.map((f) => f.split("/").pop()).join(", ")}`;
		} else {
			englishBody = `Update: ${fileNames}`;
			russianBody = `Обновлено: ${fileNames}`;
		}

		return {
			subject: `${prefix}: update ${fileNames}`,
			body: `${englishBody}\n\nRUSSIAN:\n${russianBody}`,
		};
	}

	if (categories.bmad.length === fileCount) {
		const isPlanningArtifacts = allFilesInPath(
			files,
			"_bmad-output/planning-artifacts/",
		);
		return {
			subject: isPlanningArtifacts
				? "docs(bmad): update planning artifacts"
				: "docs(bmad): update BMAD artifacts",
			body: `Update BMAD documentation and artifacts: ${formatFileList(categories.bmad)}.\n\nRUSSIAN:\nОбновлены BMAD артефакты и документация: ${formatFileList(categories.bmad)}. Синхронизированы описания, уточнены требования и clarified constraints.`,
		};
	}

	if (categories.docs.length === fileCount) {
		return {
			subject: "docs: update project documentation",
			body: `Update documentation: ${formatFileList(categories.docs)}.\n\nRUSSIAN:\nОбновлена документация: ${formatFileList(categories.docs)}. Уточнены процессы и added missing clarifications.`,
		};
	}

	if (categories.site.length === fileCount) {
		return {
			subject: "feat(site): update site content and assets",
			body: `Update site content and assets: ${formatFileList(categories.site)}.\n\nRUSSIAN:\nОбновлен контент и assets сайта: ${formatFileList(categories.site)}. Улучшена UX и aligned with latest requirements.`,
		};
	}

	return {
		subject: `${prefix}: update ${fileCount} project files`,
		body: `Update multiple categories: ${categoryList}.\n\nRUSSIAN:\nОбновлены файлы в нескольких категориях: ${categoryList}. Синхронизирована логика, документация и конфигурация.`,
	};
};

const validateBilingualMessage = (message) => {
	// Check that message has both English and Russian sections
	const hasEnglish = /^[a-z]+(\([a-z-]+\))?:/i.test(message);
	const hasRussian = /[\u0400-\u04FF]/u.test(message);
	const hasRussianLabel = /RUSSIAN:|RU:/i.test(message);

	// Message should have clear bilingual structure
	if (!hasRussian) {
		console.warn(
			"Warning: No Russian section in commit message. Adding structure...",
		);
		return false;
	}
	if (!hasRussianLabel && hasRussian) {
		console.warn(
			"Warning: Russian text exists but no RUSSIAN:/RU: label. Consider restructuring.",
		);
		return true; // Still acceptable if structure is clear
	}
	return true;
};

const buildMessage = (files, stat) => {
	const type = detectType(files);
	const { subject, body } = summarize(files, stat, type);
	const message = `${subject}\n\n${body}\n`;
	validateBilingualMessage(message);
	return message;
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
if (hasMeaningfulMessageContent(current) && !isWeakMessage(current))
	process.exit(0);

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
const prompt = buildPrompt(files, stat, diff, config.maxPromptChars);
let aiMessage = runOpencode(prompt);

if (aiMessage && isWeakMessage(aiMessage)) {
	aiMessage = runOpencode(buildRepairPrompt(files, stat, diff, aiMessage));
}

const nextMessage =
	aiMessage ||
	(config.fallbackToHeuristicGenerator ? buildMessage(files, stat) : "");

if (!nextMessage) process.exit(0);

writeFileSync(messageFile, nextMessage, "utf8");
