#!/usr/bin/env node
const { execFileSync } = require("node:child_process");
const { existsSync, readFileSync, writeFileSync } = require("node:fs");
const path = require("node:path");

const CONFIG_PATH = path.join(process.cwd(), "commit-message.config.json");
const ANSI_PATTERN = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, "g");

const runGit = (args) => {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    }).trim();
  } catch {
    return "";
  }
};

const readConfig = () => {
  if (!existsSync(CONFIG_PATH)) {
    return {
      opencodeModels: [],
      opencodeAttachUrl: "http://127.0.0.1:4096",
      maxPromptChars: 12000,
      fallbackToHeuristicGenerator: true,
    };
  }

  try {
    const parsed = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
    return {
      opencodeModels: Array.isArray(parsed.opencodeModels) ? parsed.opencodeModels.filter(Boolean) : [],
      opencodeAttachUrl: typeof parsed.opencodeAttachUrl === "string" ? parsed.opencodeAttachUrl.trim() : "http://127.0.0.1:4096",
      maxPromptChars: typeof parsed.maxPromptChars === "number" && parsed.maxPromptChars > 0 ? parsed.maxPromptChars : 12000,
      fallbackToHeuristicGenerator: parsed.fallbackToHeuristicGenerator !== false,
    };
  } catch {
    return {
      opencodeModels: [],
      opencodeAttachUrl: "http://127.0.0.1:4096",
      maxPromptChars: 12000,
      fallbackToHeuristicGenerator: true,
    };
  }
};

const stripAnsi = (value) => String(value || "").replace(ANSI_PATTERN, "").replace(/\r/g, "").trim();

const getStagedFiles = () => {
  const output = runGit(["diff", "--cached", "--name-only"]);
  return output ? output.split(/\r?\n/).filter(Boolean) : [];
};

const getStat = () => runGit(["diff", "--cached", "--stat"]);
const getDiff = () =>
  runGit([
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

const compact = (value, maxChars) => {
  const text = String(value || "").trim();
  if (!text) return "";
  return text.length <= maxChars ? text : `${text.slice(0, maxChars)}\n...[truncated]`;
};

const buildPrompt = (files, stat, diff, maxChars) => {
  const prompt = `Generate a bilingual git commit message for the currently staged changes.\n\nFormat exactly:\n<subject>\n\n<English summary>\n\nRUSSIAN SUMMARY:\n<Russian summary>\n\n- \`<file>\` — <English note>\n  RU: <Russian explanation>\n\nRules:\n- Subject must use Conventional Commit format.\n- English section must explain intent, not just list files.\n- Russian section must add reasoning and significance, not just translate.\n- Every staged file should be covered, either directly or in concise grouped bullets if there are many files.\n- Do not add markdown fences.\n- Do not add labels like Changelog or Release Notes.\n\nFiles:\n${files.join("\n")}\n\nStat:\n${stat}\n\nDiff:\n${diff}`;
  return compact(prompt, maxChars);
};

const looksUseful = (value) => {
  const text = stripAnsi(value);
  if (!text) return false;
  if (/session not found/i.test(text)) return false;
  if (/error:/i.test(text) && !/RUSSIAN SUMMARY:/i.test(text)) return false;
  if (!/^\w+(\([^)]*\))?:\s+.+/m.test(text)) return false;
  return /RUSSIAN SUMMARY:/i.test(text);
};

const runOpencode = (prompt, config) => {
  const models = config.opencodeModels.length ? config.opencodeModels : [""];

  for (const model of models) {
    try {
      const args = ["run", "--attach", config.opencodeAttachUrl];
      if (model) args.push("--model", model);
      args.push(prompt);

      const output = execFileSync("opencode", args, {
        encoding: "utf8",
        maxBuffer: 10 * 1024 * 1024,
      });
      const clean = stripAnsi(output);
      if (looksUseful(clean)) return clean;
    } catch {
      continue;
    }
  }

  return "";
};

const messageFile = process.argv[2];
if (!messageFile) process.exit(0);

const current = readFileSync(messageFile, "utf8");
if (/^[\t ]*[^#\s].+/m.test(current || "")) process.exit(0);

const files = getStagedFiles();
if (!files.length) process.exit(0);

const config = readConfig();
const prompt = buildPrompt(files, getStat(), getDiff(), config.maxPromptChars);
const message = runOpencode(prompt, config);

if (message) {
  writeFileSync(messageFile, `${message.trim()}\n`, "utf8");
  process.exit(0);
}

if (config.fallbackToHeuristicGenerator) {
  try {
    execFileSync("node", [path.join(process.cwd(), "scripts/generate-commit-msg.cjs"), messageFile], {
      stdio: "ignore",
      maxBuffer: 10 * 1024 * 1024,
    });
  } catch {
  }
}

process.exit(0);
