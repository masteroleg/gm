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
const ANSI_PATTERN = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, "g");

const runGit = (args) => execFileSync("git", args, { encoding: "utf8" }).trim();

const getStagedFiles = () => {
	const output = runGit(["diff", "--cached", "--name-only"]);
	return output ? output.split(/\r?\n/).filter(Boolean) : [];
};

const getStat = () => runGit(["diff", "--cached", "--stat"]);
const getDiff = () => runGit(["diff", "--cached"]);

const readConfig = () => {
	if (!existsSync(CONFIG_PATH)) {
		return {
			opencodeModels: [],
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
			maxPromptChars: 12000,
			fallbackToHeuristicGenerator: true,
		};
	}
};

const stripAnsi = (value) => value.replace(ANSI_PATTERN, "").replace(/\r/g, "");

const buildPrompt = (
	files,
	stat,
	diff,
) => `You are a git commit message assistant.

Rules:
- Output plain text only.
- Return exactly: subject line, blank line, short Russian body.
- Subject must be an English Conventional Commit.
- Body must be 1-4 short Russian lines.
- Do not add markdown, code fences, bullets, analysis, or commentary.
- Do not run tools or inspect the repository. Use only the context below.

Staged files:
${files.join("\n")}

Staged stat:
${stat}

Staged diff:
${diff}`;

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
			.filter((line, lineIndex) => lineIndex === 0 || !line.startsWith("$ "))
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

const runOpencodeWindows = (binary, model, prompt) => {
	const promptFile = path.join(
		os.tmpdir(),
		`opencode-commit-${process.pid}-${Date.now()}.txt`,
	);
	writeFileSync(promptFile, prompt, "utf8");

	const result = runWindowsPowerShell(
		binary,
		"& '__BINARY__' run (Get-Content -Raw $env:OPENCODE_PROMPT_FILE) -m $env:OPENCODE_MODEL",
		{
			...process.env,
			OPENCODE_PROMPT_FILE: promptFile,
			OPENCODE_MODEL: model,
		},
	);

	try {
		unlinkSync(promptFile);
	} catch {
		// ignore temp cleanup failures
	}

	return result.ok ? extractMessage(`${result.stdout}\n${result.stderr}`) : "";
};

const runOpencodePosix = (binary, model, prompt) => {
	const result = runCommand(binary, ["run", prompt, "-m", model]);
	return result.ok ? extractMessage(`${result.stdout}\n${result.stderr}`) : "";
};

const runOpencode = (prompt) => {
	const config = readConfig();
	if (prompt.length > config.maxPromptChars) return "";

	const binary = resolveOpencode();
	if (!binary) return "";

	const availableModels = getAvailableModels(binary);
	const candidates = resolveModelCandidates(config);
	const selectedModel = selectModel(availableModels, candidates);

	if (!selectedModel) return "";

	if (process.platform === "win32")
		return runOpencodeWindows(binary, selectedModel, prompt);
	return runOpencodePosix(binary, selectedModel, prompt);
};

const detectType = (files) => {
	if (!files.length) return "chore";
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
	if (files.some((file) => file.startsWith(".husky/"))) return "hooks";
	if (files.some((file) => /^README/i.test(file) || file.includes("/README")))
		return "readme";
	if (files.some((file) => file.startsWith(".github/workflows/"))) return "ci";
	if (files.some((file) => file.startsWith("tests/"))) return "tests";
	if (files.some((file) => file.startsWith("site/"))) return "site";
	return "";
};

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

	const scope = detectScope(files);
	const prefix = scope ? `${type}(${scope})` : type;
	const target = fileCount === 1 ? files[0] : `${fileCount} files`;
	return {
		subject: `${prefix}: update project files`,
		body: `Обновлены ${target} и зафиксированы связанные изменения по текущей задаче.`,
	};
};

const buildMessage = (files, stat) => {
	const type = detectType(files);
	const { subject, body } = summarize(files, stat, type);
	return `${subject}\n\n${body}\n`;
};

if (process.argv.includes("--self-test")) {
	const message = buildMessage(
		["README.md"],
		" README.md | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)",
	);
	process.stdout.write(message);
	process.exit(0);
}

const messageFile = process.argv[2];
if (!messageFile) process.exit(0);

const current = readFileSync(messageFile, "utf8");
if (/^[\t ]*[^#\s].+/m.test(current)) process.exit(0);

const files = getStagedFiles();
if (!files.length) process.exit(0);

const stat = getStat();
const diff = getDiff();
const config = readConfig();
const aiMessage = runOpencode(buildPrompt(files, stat, diff));
const nextMessage =
	aiMessage ||
	(config.fallbackToHeuristicGenerator ? buildMessage(files, stat) : "");

if (!nextMessage) process.exit(0);

writeFileSync(messageFile, nextMessage, "utf8");
