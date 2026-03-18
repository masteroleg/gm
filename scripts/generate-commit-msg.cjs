const { execFileSync } = require("node:child_process");
const { existsSync, readFileSync, writeFileSync } = require("node:fs");
const path = require("node:path");

const CONFIG_PATH = path.join(process.cwd(), "commit-message.config.json");
const ANSI_PATTERN = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, "g");

const runGit = (args) => {
	try {
		const result = execFileSync("git", args, {
			encoding: "utf8",
			maxBuffer: 10 * 1024 * 1024, // 10MB buffer
		}).trim();
		return result;
	} catch (error) {
		// If command fails due to buffer, return empty
		if (error.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER") {
			return "";
		}
		throw error;
	}
};

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

const _getWorkingTreeFiles = () => {
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
const getDiff = () => {
	// Limit diff output to prevent buffer overflow with large repositories
	return runGit([
		"diff",
		"--cached",
		"--stat",
		"--",
		"*.js",
		"*.json",
		"*.md",
		"*.ts",
		"*.tsx",
		"*.html",
		"*.css",
		"*.yml",
		"*.yaml",
	]);
};
const _getWorkingTreeStat = () => runGit(["diff", "--stat"]);
const _getWorkingTreeDiff = () => runGit(["diff"]);

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
		`- English summary: Clear, concise, explains overall purpose for engineers and reviewers\n` +
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
		`- Avoid repetition between English and Russian - Russian adds depth\n` +
		`- This is a COMMIT message, not a changelog entry or release note\n` +
		`- Do NOT add sections like "Changelog:", "Release Notes:", or "User Impact:"\n` +
		`- Focus on engineering intent and implementation impact, not marketing copy\n\n` +
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
- Keep it as an engineering commit message, not a changelog or release note
- Do not add sections like "Changelog:" or "Release Notes:"

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
	const bullets = lines.filter((line) => line.startsWith("- "));

	if (/^(changelog|release notes?|user impact)\s*:/im.test(clean)) return true;
	if (/update BMAD artifacts/i.test(subject)) return true;
	if (/^\w+(?:\([^)]*\))?: update \d+ (?:files|project files)$/i.test(subject))
		return true;
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
	if (
		bullets.some(
			(line) =>
				line.startsWith("- `") &&
				/—\s*(BMAD|Docs|Tests|Site|Config):/i.test(line),
		)
	)
		return true;
	if (
		bullets.some(
			(line) =>
				line.startsWith("- `") &&
				/—\s*(обновлен|updated|изменен файл|добавлены изменения)\b/i.test(line),
		)
	)
		return true;
	if (
		bullets.some(
			(line) =>
				line.startsWith("- `") &&
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

const _extractMessage = (raw) => {
	const clean = stripAnsi(raw).trim();
	if (!clean) return "";

	// Extract the actual message content, ignoring any comments or metadata
	const lines = clean.split("\n");
	const messageLines = [];
	for (const line of lines) {
		// Skip comment lines (starting with #) and empty lines
		if (line.startsWith("#") || !line.trim()) continue;
		messageLines.push(line);
	}

	return messageLines.join("\n").trim();
};

// Run opencode via CLI: opencode run [message] --model <model>
// Status: DISABLED due to "Session not found" bug in opencode CLI
//
// Investigation findings:
// - opencode serve --port 0 starts WEB UI server only (no REST API endpoints like /v1/session)
// - opencode run [message] encounters "Session not found" error when no active session exists
// - opencode acp starts ACP protocol server (different protocol, not yet implemented)
// - No simple REST API available in current opencode version for commit message generation
//
// Fallback: Use intelligent heuristic generator (see buildMessage()) which produces
// quality bilingual messages with file-by-file bullets and Russian context explanations.
const runOpencode = () => {
	// Disabled pending opencode CLI fix
	// For now, always return empty to use fallback heuristic generator
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

const hasAny = (files, pattern) => files.some((file) => pattern.test(file));

const detectRefactorTheme = (files) => {
	if (
		hasAny(files, /site\/assets\/css\/(input|output)\.css$/i) &&
		hasAny(
			files,
			/(css-var-refactor|component-vars-refactor|token-component-vars-refactor)/i,
		)
	) {
		return "css-vars";
	}

	if (
		hasAny(files, /scripts\/generate-commit-msg\.cjs$/i) ||
		hasAny(files, /\.husky\//i)
	) {
		return "commit-msg";
	}

	return "";
};

const GROUPED_BULLETS_THRESHOLD = 10;

const getThemeLabel = (theme) => {
	if (theme === "bmad") return "BMAD docs";
	if (theme === "docs") return "Project docs";
	if (theme === "site") return "Site files";
	if (theme === "tests") return "Tests";
	if (theme === "ci") return "CI/CD";
	if (theme === "config") return "Tooling/config";
	return "Other files";
};

const getThemeRussianLabel = (theme) => {
	if (theme === "bmad") return "BMAD-артефакты (BMAD docs)";
	if (theme === "docs") return "проектная документация (Project docs)";
	if (theme === "site") return "файлы сайта (Site files)";
	if (theme === "tests") return "тесты (Tests)";
	if (theme === "ci") return "CI/CD";
	if (theme === "config") return "инструменты и конфигурация (Tooling/config)";
	return "прочие файлы (Other files)";
};

const inferSubject = (files, type) => {
	const scope = detectScope(files);
	const prefix = scope ? `${type}(${scope})` : type;
	const theme = detectRefactorTheme(files);
	const categories = categorizeFiles(files);

	if (theme === "css-vars") {
		return "refactor(css): align component variables with the token styling contract";
	}

	if (theme === "commit-msg") {
		return "refactor(hooks): improve commit message generation quality";
	}

	if (
		files.every(
			(file) =>
				file.startsWith("_bmad-output/") ||
				file.startsWith("docs/") ||
				file.startsWith("site/assets/css/"),
		)
	) {
		return `${prefix}: sync docs and site artifacts`;
	}

	if (files.every((file) => file.startsWith("site/assets/css/"))) {
		return "style(site): refresh stylesheet sources and compiled output";
	}

	if (
		categories.bmad.length &&
		(categories.docs.length ||
			categories.site.length ||
			categories.config.length)
	) {
		return "refactor(project): sync docs, styles, and supporting artifacts";
	}

	if (
		categories.site.length &&
		(categories.docs.length || categories.bmad.length)
	) {
		return "refactor(project): align site changes with supporting documentation";
	}

	return `${prefix}: update ${files.length} files`;
};

const inferEnglishSummary = (files, type) => {
	const theme = detectRefactorTheme(files);

	if (theme === "css-vars") {
		return "Synchronize the token/component variable refactor across the site stylesheet and related BMAD artifacts. This keeps the documented styling contract aligned with the shipped CSS output.";
	}

	if (theme === "commit-msg") {
		return "Tighten commit message generation so auto-created subjects and bullets describe intent instead of generic file updates. This keeps the VS Code commit flow useful without changing the main-branch workflow.";
	}

	if (files.length > GROUPED_BULLETS_THRESHOLD) {
		return "Group related files by theme and describe each change in full so large commits stay readable without losing important detail.";
	}

	if (type === "docs") {
		return "Refresh the affected documentation so the current rules, notes, and supporting artifacts stay aligned.";
	}

	if (type === "style") {
		return "Update the affected stylesheets and keep generated CSS in sync with the source changes.";
	}

	return "Update the affected files and keep related project artifacts aligned with the current implementation.";
};

const inferRussianSummary = (files, type) => {
	const theme = detectRefactorTheme(files);

	if (theme === "css-vars") {
		return "Синхронизирован рефакторинг переменных токенов и компонентов (token/component variable refactor) между исходным CSS и BMAD-артефактами. Теперь контракт стилизации (styling contract), заметки по реализации (implementation notes), QA и сгенерированный CSS описывают одну и ту же модель переменных без расхождений.";
	}

	if (theme === "commit-msg") {
		return 'Улучшена эвристика автогенерации commit message: вместо шаблонов вроде "update file" теперь формируется описание намерения изменения и его эффекта. Дополнительно CI проверяет генератор (generator), чтобы регресс не попадал в основной solo-flow через VS Code.';
	}

	if (files.length > GROUPED_BULLETS_THRESHOLD) {
		return "Связанные изменения сгруппированы по темам, но внутри каждой группы сохранена полная детализация по файлам. Это делает большие коммиты читаемыми без потери контекста по документации, стилям, конфигурации и сопутствующим артефактам.";
	}

	if (type === "docs") {
		return "Синхронизирована документация: уточнены правила, контекст и сопутствующие артефакты, чтобы они не расходились с текущей реализацией.";
	}

	if (type === "style") {
		return "Обновлены исходные стили (source styles) и сгенерированный CSS, чтобы production-артефакты совпадали с текущими изменениями в исходниках.";
	}

	return "Обновлены связанные файлы и выровнены сопутствующие артефакты, чтобы документация, конфигурация и реализация не расходились между собой.";
};

const buildGroupedBullets = (files) => {
	const grouped = [];
	const categories = categorizeFiles(files);
	const orderedThemes = [
		"bmad",
		"docs",
		"site",
		"tests",
		"ci",
		"config",
		"other",
	];

	for (const theme of orderedThemes) {
		const themeFiles = categories[theme];
		if (!themeFiles.length) continue;

		const englishParts = themeFiles.map((file) => {
			const note = describeFileChange(file);
			return `\`${file}\` - ${note.english}`;
		});
		const russianParts = themeFiles.map((file) => {
			const note = describeFileChange(file);
			return `\`${file}\` - ${note.russian}`;
		});

		grouped.push(
			`- ${getThemeLabel(theme)}: ${englishParts.join("; ")}\n  RU: ${getThemeRussianLabel(theme)}: ${russianParts.join("; ")}`,
		);
	}

	return grouped.join("\n");
};

const describeFileChange = (file) => {
	if (/scripts\/generate-commit-msg\.cjs$/i.test(file)) {
		return {
			english:
				"improve heuristic commit generation for mixed doc/style changes",
			russian:
				'усилена эвристика генератора (generator): смешанные коммиты (mixed commits) теперь получают описание смысла изменений, а не шаблоны вида "update file"',
		};
	}

	if (/\.github\/workflows\/infra\.ya?ml$/i.test(file)) {
		return {
			english: "verify commit-message generator behavior in Infra Checks",
			russian:
				"добавлена CI-проверка генератора (generator), чтобы регресс в описаниях коммитов ловился до использования в основном workflow",
		};
	}

	if (/css-var-refactor-analysis\.md$/i.test(file)) {
		return {
			english:
				"refresh the analysis for the CSS variable refactor scope and findings",
			russian:
				"обновлен анализ рефакторинга CSS-переменных (CSS variable refactor): зафиксированы актуальные выводы и границы изменений",
		};
	}

	if (/css-var-refactor-implementation-notes\.md$/i.test(file)) {
		return {
			english:
				"capture implementation decisions and migration notes for the variable refactor",
			russian:
				"уточнены заметки по реализации (implementation notes) и миграционные решения, чтобы рефакторинг (refactor) можно было поддерживать без догадок",
		};
	}

	if (/css-var-refactor-qa\.md$/i.test(file)) {
		return {
			english:
				"sync QA coverage with the current CSS variable refactor behavior",
			russian:
				"обновлен QA-документ: проверки теперь соответствуют текущему поведению после рефакторинга переменных (variable refactor)",
		};
	}

	if (/css-var-refactor-review\.md$/i.test(file)) {
		return {
			english:
				"update the review notes for the token/component variable refactor",
			russian:
				"синхронизированы заметки ревью (review notes) по рефакторингу переменных токенов и компонентов (token/component variable refactor), чтобы замечания не отставали от кода",
		};
	}

	if (/_bmad-output\/project-context\.md$/i.test(file)) {
		return {
			english: "align project context rules with the updated styling contract",
			russian:
				"обновлен контекст проекта (project context): правила контракта стилизации (styling contract) приведены в соответствие с новым подходом к переменным компонентов (component vars)",
		};
	}

	if (/spec-token-component-vars-refactor\.md$/i.test(file)) {
		return {
			english:
				"define the token/component variable refactor scope and expected outcomes",
			russian:
				"уточнена спецификация рефакторинга переменных токенов и компонентов (token/component vars refactor): зафиксированы границы (scope), цели и ожидаемый результат",
		};
	}

	if (/docs\/project-contract\.md$/i.test(file)) {
		return {
			english:
				"update the project contract to match token-driven component styling rules",
			russian:
				"синхронизирован проектный контракт (project contract): правила стилизации компонентов через токены (token-driven component styling) теперь совпадают с текущей реализацией",
		};
	}

	if (/site\/assets\/css\/input\.css$/i.test(file)) {
		return {
			english:
				"refactor source styles to use the updated token/component variable model",
			russian:
				"перестроен исходный CSS под обновленную модель переменных токенов и компонентов (token/component variable model), чтобы локальные переопределения состояний (state overrides) работали предсказуемо",
		};
	}

	if (/site\/assets\/css\/output\.css$/i.test(file)) {
		return {
			english:
				"rebuild the committed production CSS after the source stylesheet refactor",
			russian:
				"пересобран зафиксированный production CSS (committed production CSS), чтобы деплой (deploy) получал актуальный результат сборки (output) после рефакторинга исходных стилей (source styles refactor)",
		};
	}

	if (file.startsWith("site/assets/css/")) {
		return {
			english: "update stylesheet sources or generated CSS",
			russian:
				"обновлены исходные стили (source styles) или сгенерированный CSS, чтобы production-артефакты не расходились с исходниками",
		};
	}

	if (file.startsWith("site/")) {
		return {
			english: "update site behavior or content for the affected flow",
			russian:
				"обновлено поведение или контент сайта в затронутом пользовательском сценарии",
		};
	}

	if (/playwright\.config\.ts$/i.test(file)) {
		return {
			english: "adjust Playwright configuration for the updated test workflow",
			russian:
				"скорректирована конфигурация Playwright, чтобы тестовый workflow соответствовал текущим сценариям проверки",
		};
	}

	if (/package\.json$/i.test(file)) {
		return {
			english:
				"sync package scripts or dependency metadata with the current workflow",
			russian:
				"синхронизированы package scripts или метаданные зависимостей, чтобы локальный и CI workflow оставались согласованными",
		};
	}

	if (/\.vscode\/settings\.json$/i.test(file)) {
		return {
			english:
				"align VS Code workspace settings with the current development workflow",
			russian:
				"настройки рабочего пространства VS Code приведены в соответствие с текущим процессом разработки (development workflow)",
		};
	}

	if (/CLAUDE\.md$/i.test(file)) {
		return {
			english:
				"update local agent guidance to match the current repository workflow",
			russian:
				"обновлены локальные инструкции для агента (agent guidance), чтобы они соответствовали текущему workflow репозитория",
		};
	}

	if (/repo-index\.md$/i.test(file)) {
		return {
			english:
				"refresh the repository index so navigation matches the current file set",
			russian:
				"обновлен индекс репозитория (repository index), чтобы навигация соответствовала текущему набору файлов",
		};
	}

	if (file.startsWith("_bmad-output/")) {
		return {
			english: "sync the BMAD artifact with the current implementation state",
			russian:
				"синхронизирован BMAD-артефакт с текущим состоянием реализации, чтобы документация не устаревала",
		};
	}

	if (file.startsWith("docs/")) {
		return {
			english: "update the supporting documentation for the current workflow",
			russian:
				"обновлена сопутствующая документация, чтобы workflow и правила оставались актуальными",
		};
	}

	if (file.startsWith(".husky/")) {
		const hookName = file.split("/").pop();
		return {
			english: `adjust the ${hookName} git hook behavior`,
			russian: `скорректирована логика git hook ${hookName}, чтобы локальный workflow работал стабильнее`,
		};
	}

	if (file.startsWith(".github/workflows/")) {
		return {
			english: "adjust CI/CD workflow checks for the affected automation",
			russian:
				"скорректированы проверки CI/CD workflow для затронутой автоматизации",
		};
	}

	if (/^README/i.test(file)) {
		return {
			english: "refresh documentation for the current implementation",
			russian:
				"уточнена документация под текущее состояние реализации и рабочего процесса",
		};
	}

	return {
		english: "update the file to match the current implementation",
		russian:
			"обновлен файл, чтобы он соответствовал текущей реализации и связанным изменениям",
	};
};

const formatFileList = (files, limit = 5) => {
	const names = files.map(toBaseName);
	if (names.length <= limit) return names.join(", ");
	return `${names.slice(0, limit).join(", ")} and ${names.length - limit} more`;
};

const allFilesInPath = (files, prefix) =>
	files.every((file) => file.startsWith(prefix));

const summarize = (files, type) => {
	const fileCount = files.length;

	// ALWAYS produce file-by-file bullets for small commits (most useful)
	if (fileCount <= GROUPED_BULLETS_THRESHOLD && fileCount > 0) {
		const englishBullets = files
			.map((file) => {
				const note = describeFileChange(file);
				return `- \`${file}\` — ${note.english}\n  RU: ${note.russian}`;
			})
			.join("\n");

		const subject = inferSubject(files, type);
		const englishSummary = inferEnglishSummary(files, type);
		const russianSummary = inferRussianSummary(files, type);

		return {
			subject,
			body: `${englishSummary}

${englishBullets}

RUSSIAN SUMMARY:
${russianSummary}`,
		};
	}

	if (fileCount > GROUPED_BULLETS_THRESHOLD) {
		const subject = inferSubject(files, type);
		const englishSummary = inferEnglishSummary(files, type);
		const russianSummary = inferRussianSummary(files, type);
		const groupedBullets = buildGroupedBullets(files);

		return {
			subject,
			body: `${englishSummary}

${groupedBullets}

RUSSIAN SUMMARY:
${russianSummary}`,
		};
	}

	const hasReadme = files.some(
		(file) => /^README/i.test(file) || file.includes("/README"),
	);
	const hasHusky = files.some((file) => file.startsWith(".husky/"));
	const hasCi = files.some((file) => file.startsWith(".github/workflows/"));

	if (hasReadme && hasHusky) {
		return {
			subject: "chore(hooks): update commit message automation",
			body: "Improve git hooks for commit message generation and align README docs with implementation.\n\nRUSSIAN SUMMARY:\nОбновлены git hooks для автогенерации commit message и синхронизировано описание процесса в README. Теперь процесс работает стабильнее и документация совпадает с кодом.",
		};
	}

	if (hasHusky) {
		return {
			subject: "chore(hooks): refine local git hook behavior",
			body: "Improve git hook logic for more stable commit and validation workflow.\n\nRUSSIAN SUMMARY:\nОбновлена логика локальных git hooks, чтобы сценарий коммита и проверок работал стабильнее. Добавлены checks для обнаружения corruption и graceful fallbacks.",
		};
	}

	if (hasCi) {
		return {
			subject: "ci: update pipeline checks and deployment flow",
			body: "Adjust CI/CD workflow to ensure checks and deployment execute in correct order.\n\nRUSSIAN SUMMARY:\nСкорректирован workflow CI/CD, чтобы проверки и деплой выполнялись в ожидаемом порядке. Improved error handling and rollback behavior.",
		};
	}

	if (hasReadme) {
		return {
			subject: "docs(readme): update workflow notes",
			body: "Update documentation to clarify process for future reference.\n\nRUSSIAN SUMMARY:\nОбновлено описание процесса работы, чтобы через время было проще восстановить контекст. Добавлены примеры и clarifications для новых разработчиков.",
		};
	}

	// Multi-file case (15+ files): analyze and describe what was actually changed
	const categories = categorizeFiles(files);
	const descriptions = buildCategoryDescription(categories);
	const categoryList = descriptions.join(", ");

	const scope = detectScope(files);
	const prefix = scope ? `${type}(${scope})` : type;

	if (categories.bmad.length === fileCount) {
		const isPlanningArtifacts = allFilesInPath(
			files,
			"_bmad-output/planning-artifacts/",
		);
		return {
			subject: isPlanningArtifacts
				? "docs(bmad): update planning artifacts"
				: "docs(bmad): update BMAD artifacts",
			body: `Update BMAD documentation and artifacts: ${formatFileList(categories.bmad)}.\n\nRUSSIAN SUMMARY:\nОбновлены BMAD артефакты и документация: ${formatFileList(categories.bmad)}. Синхронизированы описания, уточнены требования и clarified constraints.`,
		};
	}

	if (categories.docs.length === fileCount) {
		return {
			subject: "docs: update project documentation",
			body: `Update documentation: ${formatFileList(categories.docs)}.\n\nRUSSIAN SUMMARY:\nОбновлена документация: ${formatFileList(categories.docs)}. Уточнены процессы и added missing clarifications.`,
		};
	}

	if (categories.site.length === fileCount) {
		return {
			subject: "feat(site): update site content and assets",
			body: `Update site content and assets: ${formatFileList(categories.site)}.\n\nRUSSIAN SUMMARY:\nОбновлен контент и assets сайта: ${formatFileList(categories.site)}. Улучшена UX и aligned with latest requirements.`,
		};
	}

	return {
		subject: `${prefix}: update ${fileCount} project files`,
		body: `Update multiple categories: ${categoryList}.\n\nRUSSIAN SUMMARY:\nОбновлены файлы в нескольких категориях: ${categoryList}. Синхронизирована логика, документация и конфигурация.`,
	};
};

const validateBilingualMessage = (message) => {
	// Check that message has both English and Russian sections
	const hasRussian = /[\u0400-\u04FF]/u.test(message);
	const hasRussianLabel = /RUSSIAN SUMMARY:|RUSSIAN:|RU:/i.test(message);

	if (!hasRussian) {
		console.warn("Warning: No Russian section in commit message.");
		return false;
	}
	if (!hasRussianLabel && hasRussian) {
		console.warn("Warning: Russian text exists but no RUSSIAN SUMMARY: label.");
		return true;
	}
	return true;
};

const buildMessage = (files) => {
	const type = detectType(files);
	const { subject, body } = summarize(files, type);
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
		cssRefactor: {
			files: [
				"_bmad-output/css-var-refactor-analysis.md",
				"_bmad-output/css-var-refactor-implementation-notes.md",
				"_bmad-output/css-var-refactor-qa.md",
				"_bmad-output/css-var-refactor-review.md",
				"_bmad-output/project-context.md",
				"_bmad-output/spec-token-component-vars-refactor.md",
				"docs/project-contract.md",
				"site/assets/css/input.css",
				"site/assets/css/output.css",
			],
			stat: " 9 files changed, 240 insertions(+), 112 deletions(-)",
		},
	};

	const test = tests[testName] || tests.readme;
	const message = buildMessage(test.files);
	if (isWeakMessage(message)) {
		process.stderr.write(
			`Self-test failed for ${testName}: generated weak message\n`,
		);
		process.stderr.write(message);
		process.exit(1);
	}
	process.stdout.write(message);
	process.exit(0);
}

const messageFile = process.argv[2];
if (!messageFile) process.exit(0);

const current = readFileSync(messageFile, "utf8");
if (hasMeaningfulMessageContent(current) && !isWeakMessage(current))
	process.exit(0);

// Analyze ONLY staged files (never fallback to working tree)
const files = getStagedFiles();
const stat = getStat();
const diff = getDiff();

// If no staged files, nothing to generate
if (!files.length) process.exit(0);

const config = readConfig();
const prompt = buildPrompt(files, stat, diff, config.maxPromptChars);
let aiMessage = runOpencode(prompt);

if (aiMessage && isWeakMessage(aiMessage)) {
	aiMessage = runOpencode(buildRepairPrompt(files, stat, diff, aiMessage));
}

const nextMessage =
	aiMessage || (config.fallbackToHeuristicGenerator ? buildMessage(files) : "");

if (!nextMessage) process.exit(0);

writeFileSync(messageFile, nextMessage, "utf8");
