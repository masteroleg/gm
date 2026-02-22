Главная идея (обновлено):

- Канонический пайплайн для перманентной памяти BMAD = **детерминированная миграция JSONL → фрагменты** + **каноническая команда BMAD `/index-docs` для индексов**.
- Мы НЕ полагаемся на LLM в миграции (воспроизводимость/безопасность перезапуска).

## Канонично (Shipping-ready)

1) Миграция JSONL → fragments (детерминированно):

```bash
python scripts/migrate_sessions.py --dry-run
python scripts/migrate_sessions.py --force --report --archive-inputs
```

2) Индексация (только BMAD):

- `/index-docs _bmad-output/knowledge/`
- `/index-docs _bmad-output/knowledge/fragments/`
- `/index-docs _bmad-output/planning-artifacts/`
- `/index-docs _bmad-output/solutioning/adrs/`

## Legacy (не рекомендуется)

Ниже оставлены старые инструкции, которые опираются на OpenCode CLI + LLM-дельты.
Они не являются источником истины и сейчас в этом репозитории показали 100% провалов на чанках.

---

Главная идея (legacy):

- чанки уже готовы (`migration/chunks/*.json`)
- мы запускаем **один скрипт** , который:
  1. вызывает `opencode run` для каждого чанка (non-interactive режим подходит для автоматизации) ([OpenCode](https://opencode.ai/docs/cli/ "CLI | OpenCode"))
  2. проверяет, что ответ — **валидный JSON** , при ошибке делает 1 retry
  3. применяет дельту в `_bmad-output/...` через `apply_delta.mjs` (который ты сейчас создашь)

---

## Почему я НЕ предлагаю “custom command” как основу

В OpenCode действительно есть custom commands (`.opencode/commands/*.md`). ([OpenCode](https://opencode.ai/docs/commands/ "Commands | OpenCode"))
Но есть задокументированный баг/репорт, что **через CLI `opencode run` шаблон команды может не подмешиваться** , в то время как в GUI — подмешивается. ([GitHub](https://github.com/sst/opencode/issues/5276 "Commands Not Recieving Context · Issue #5276 · anomalyco/opencode · GitHub"))
Чтобы не упереться в эту проблему, мы идём самым надёжным путём: **передаём промпт текстом прямо в `opencode run`** .

---

# Чёткая инструкция: “один раз настроил → один раз запустил”

## Шаг 1) Подготовь директории (если ещё не сделал)

```bash
mkdir -p _bmad-output/knowledge/fragments
mkdir -p _bmad-output/solutioning/adrs
mkdir -p _bmad-output/planning-artifacts
mkdir -p migration/deltas
touch _bmad-output/project-context.md
touch _bmad-output/knowledge/index.md
```

## Шаг 2) Создай PROMPT #1 как файл (чтобы не держать в голове)

Создай `tools/prompt_extract_delta.txt`:

```text
Ты — BMAD Memory Migrator (Knowledge Curator + BA + Solution Architect).

ВХОД (прикреплённые файлы):
1) один chunk JSON с ключом "SESSIONS_CHUNK" (migration/chunks/*.json)
2) _bmad-output/project-context.md
3) _bmad-output/knowledge/index.md

ЗАДАЧА:
- Извлеки атомарные инсайты из SESSIONS_CHUNK и оформи "память проекта" для BMAD.
- Ничего не выдумывай. Если сомневаешься — status = NEEDS_VALIDATION.
- Каждое утверждение должно иметь sources: session_id + uuid + timestamp.
- Не пересказывай диалог — только выжимка.

НУЖНЫЕ АРТЕФАКТЫ:
A) _bmad-output/project-context.md (коротко: инварианты/правила/запреты/соглашения)
B) _bmad-output/solutioning/adrs/ADR-XXXX-*.md (почему так решили)
C) _bmad-output/knowledge/fragments/*.md (паттерны/стандарты/определения)

ВЫХОД:
Верни СТРОГО валидный JSON (и ничего кроме JSON!) в формате:

{
  "artifacts": {
    "project_context_md": {"mode":"create|update|skip", "content":"..."},
    "knowledge_index_md": {"mode":"create|update|skip", "content":"..."},
    "adrs": [
      {"file":"ADR-0001-....md","mode":"create|update|skip","content":"..."}
    ]
  },
  "fragments": [
    {
      "file":"fragments/<slug>.md",
      "mode":"create|update|skip",
      "content":"# <Title>\n...\n",
      "sources":[{"session_id":"...","uuid":"...","timestamp":"..."}]
    }
  ],
  "insights": [
    {
      "type":"decision|requirement.functional|requirement.nonfunctional|constraint|assumption|risk|open_question|definition|standard|todo",
      "statement":"...",
      "status":"current|superseded|NEEDS_VALIDATION",
      "tags":["..."],
      "sources":[{"session_id":"...","uuid":"...","timestamp":"..."}]
    }
  ],
  "conflicts":[...],
  "open_questions":[...]
}
```

## Шаг 3) Создай `tools/apply_delta.mjs` (вот его у тебя НЕ было)

Этот скрипт **применяет** JSON-дельту в `_bmad-output/...` и делает бэкап изменяемых файлов.

Создай `tools/apply_delta.mjs`:

```js
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
    architecture_md: "_bmad-output/solutioning/architecture.md",
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
    const rel = (f.file || "").startsWith("fragments/")
      ? f.file
      : `fragments/${f.file || "unknown.md"}`;
    const p = path.join(repoRoot, "_bmad-output/knowledge", rel);
    writeFileSafe(p, f.content || "");
  }
}

// ---- CLI ----
const args = process.argv.slice(2);
const deltaPath = args[args.indexOf("--delta") + 1];
const repoRoot = args.includes("--repo")
  ? args[args.indexOf("--repo") + 1]
  : ".";

if (!deltaPath) {
  console.error(
    "Usage: node tools/apply_delta.mjs --delta migration/deltas/xxx.delta.json --repo .",
  );
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
```

## Шаг 4) Создай “однокнопочный” прогон всех 96 chunks: `tools/run_migration.mjs`

Он будет вызывать `opencode run` **для каждого чанка** и сразу применять дельту.

Важно: `opencode run` официально поддерживает non-interactive режим, `--file/-f`, `--model`, `--attach`, `--format`. ([OpenCode](https://opencode.ai/docs/cli/ "CLI | OpenCode"))
А чтобы ускорить 96 прогонов — можно поднять `opencode serve` и подключаться через `--attach` (порт по умолчанию 4096). ([OpenCode](https://opencode.ai/docs/server/ "Server | OpenCode"))

Создай `tools/run_migration.mjs`:

```js
#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

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
      continue;
    }
  }

  console.log("\nDone. Now run /bmad-index-docs on knowledge/ and adrs/ once.");
}

main();
```

## Шаг 5) Запуск (один раз)

1. В одном терминале:

```bash
opencode serve
```

`opencode serve` поднимает сервер (по умолчанию `127.0.0.1:4096`). ([OpenCode](https://opencode.ai/docs/server/ "Server | OpenCode"))

2. В другом терминале:

```bash
node tools/run_migration.mjs
```

Это прогонит **все 96 чанков** без ручных действий.

---

# После прогона: индекс (не 96 раз, а 1–2 раза)

В OpenCode IDE/GUI выполни:

- `/bmad-index-docs` → `_bmad-output/knowledge/`
- `/bmad-index-docs` → `_bmad-output/solutioning/adrs/`

Индекс-таск официально “генерирует/обновляет index.md по папке”. ([BMAD Method](https://docs.bmad-method.org/reference/configuration/core-tasks/?utm_source=chatgpt.com "Core Tasks | BMAD Method"))

---

# Что ты получаешь по итогу

- `_bmad-output/project-context.md` — инварианты (коротко)
- `_bmad-output/knowledge/fragments/*.md` — атомарные “логические юниты”
- `_bmad-output/solutioning/adrs/*.md` — “почему так решили”
- индексы от `/bmad-index-docs` для навигации

---

## Контроль консистентности (чтобы дальше не было “загадок”)

Если в процессе что-то “не сходится”, проверяй факты:

- `opencode run` поддерживает `--file`, `--model`, `--attach` и предназначен для автоматизации. ([OpenCode](https://opencode.ai/docs/cli/ "CLI | OpenCode"))
- `opencode serve` даёт сервер на 4096 и нужен, чтобы ускорить многократные вызовы. ([OpenCode](https://opencode.ai/docs/server/ "Server | OpenCode"))
- `/bmad-index-docs` — это core task “Index Docs”. ([BMAD Method](https://docs.bmad-method.org/reference/configuration/core-tasks/?utm_source=chatgpt.com "Core Tasks | BMAD Method"))

---

Если хочешь, следующим шагом я дам **PROMPT #2 (Consolidate & Dedup)** в таком же “файловом” виде (`tools/prompt_consolidate.txt`) + “однокнопочный” запуск для консолидации (обычно 1 запуск после миграции).

---

**PROMPT #2 + “однокнопочный” Consolidate** так, чтобы **ничего не было “магией”** и чтобы оно запускалось **после** обработки чанков.

Ниже — **точные файлы, которые ты создаёшь копипастом** , и **одна команда запуска** .

---

## Что важно заранее

- Consolidate запускается **после того** , как ты уже прогнал чанки и у тебя появились:
  - `_bmad-output/knowledge/fragments/*.md`
  - `_bmad-output/solutioning/adrs/*.md`
  - обновлённый `_bmad-output/project-context.md`
- Для автоматизации мы используем **OpenCode CLI** :
  - `opencode run` поддерживает `--model/-m`, `--attach`, `--file/-f`, `--format` ([OpenCode](https://opencode.ai/docs/cli/?utm_source=chatgpt.com "CLI"))
  - `opencode serve` поднимает backend на **4096 по умолчанию** ([OpenCode](https://opencode.ai/docs/server/?utm_source=chatgpt.com "Server"))

---

# Шаг 1 — создай PROMPT #2 как файл

Создай файл `tools/prompt_consolidate.txt`:

```text
Ты — BMAD Memory Consolidator.

ВХОД (прикреплённые файлы):
- bundle.md (в нём будут: project-context, knowledge index, все fragments, все ADR)

ЗАДАЧА:
1) Дедупликация: объединяй повторы, а не плодись.
2) Project Context: оставь только инварианты (стек/версии/правила/запреты/соглашения).
3) Knowledge fragments: если несколько фрагментов про одно и то же — оставь один, остальные отметь как superseded (в виде заметки в conflicts).
4) ADR: убери дубли ADR, оставь только решения “почему так”.
5) Ничего не выдумывай. Если данных не хватает — добавь в open_questions.
6) Верни СТРОГО валидный JSON и ничего кроме JSON.

ФОРМАТ ВЫХОДА (строго JSON):
{
  "final_artifacts": {
    "project_context_md": {"mode":"update", "content":"..."},
    "knowledge_index_md": {"mode":"update", "content":"..."},
    "adrs": [{"file":"ADR-....md","mode":"create|update|skip","content":"..."}],
    "fragments": [{"file":"fragments/....md","mode":"create|update|skip","content":"..."}]
  },
  "conflicts":[
    {"topic":"...", "variants":[{"claim":"..."},{"claim":"..."}], "resolution_hint":"..."}
  ],
  "open_questions":[
    {"question":"...", "why_it_matters":"..."}
  ]
}
```

---

# Шаг 2 — скрипт сборки “bundle” (чтобы не прикладывать 200 файлов руками)

Создай `tools/build_bundle.mjs`:

```js
#!/usr/bin/env node
import fs from "fs";
import path from "path";

function read(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
}
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
  const outPath =
    process.argv[process.argv.indexOf("--out") + 1] ||
    "migration/consolidate/bundle.md";
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
```

---

# Шаг 3 — скрипт применения результата consolidate (пишет файлы + бэкапы)

Создай `tools/apply_consolidate.mjs`:

```js
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

function applyList(baseDir, items) {
  if (!Array.isArray(items)) return;
  for (const it of items) {
    if (!it || it.mode === "skip") continue;
    const p = path.join(baseDir, it.file);
    writeFileSafe(p, it.content || "");
  }
}

const args = process.argv.slice(2);
const inPath = args[args.indexOf("--in") + 1];
const repo = args.includes("--repo") ? args[args.indexOf("--repo") + 1] : ".";

if (!inPath) {
  console.error(
    "Usage: node tools/apply_consolidate.mjs --in migration/consolidate/result.json --repo .",
  );
  process.exit(1);
}

const data = readJson(inPath);
const fa = data.final_artifacts || {};

if (fa.project_context_md?.mode === "update") {
  writeFileSafe(
    path.join(repo, "_bmad-output/project-context.md"),
    fa.project_context_md.content || "",
  );
}
if (fa.knowledge_index_md?.mode === "update") {
  writeFileSafe(
    path.join(repo, "_bmad-output/knowledge/index.md"),
    fa.knowledge_index_md.content || "",
  );
}

applyList(path.join(repo, "_bmad-output/solutioning/adrs"), fa.adrs);
applyList(path.join(repo, "_bmad-output/knowledge"), fa.fragments);

console.log("Applied consolidate:", inPath);
```

---

# Шаг 4 — “однокнопочный” запуск consolidate через OpenCode CLI

Создай `tools/run_consolidate.mjs`:

```js
#!/usr/bin/env node
import fs from "fs";
import { spawnSync } from "child_process";

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
```

Почему это корректно:

- `opencode run` умеет `--file/-f` и `--attach` ([OpenCode](https://opencode.ai/docs/cli/?utm_source=chatgpt.com "CLI"))
- `opencode serve` слушает 4096 по умолчанию ([OpenCode](https://opencode.ai/docs/server/?utm_source=chatgpt.com "Server"))

---

# Шаг 5 — запуск (две команды)

1. В одном терминале:

```bash
opencode serve
```

(порт 4096 по умолчанию) ([OpenCode](https://opencode.ai/docs/server/?utm_source=chatgpt.com "Server"))

2. Во втором:

```bash
node tools/run_consolidate.mjs
```

Если у тебя **нет** `trinity-large-preview`, просто запусти с другой моделью:

```bash
OPENCODE_MODEL=opencode/glm-5-free node tools/run_consolidate.mjs
```

(формат `provider/model` — это как в docs про модели/CLI) ([OpenCode](https://opencode.ai/docs/models/?utm_source=chatgpt.com "Models"))

---

# Шаг 6 — индекс (делает BMAD, один раз после консолидации)

В OpenCode (IDE/GUI) запускаешь:

- `/bmad-index-docs` → `_bmad-output/knowledge/`
- `/bmad-index-docs` → `_bmad-output/solutioning/adrs/`

Это “Index Docs”: генерирует/обновляет `index.md` по папке. ([BMAD Method](https://docs.bmad-method.org/reference/configuration/core-tasks/?utm_source=chatgpt.com "Core Tasks | BMAD Method"))

---

## Микро-напоминание про project-context (чтобы BMAD реально “помнил”)

`project-context.md` должен быть в `_bmad-output/project-context.md` (BMAD это прямо указывает для established projects и manage project context). ([BMAD Method](https://docs.bmad-method.org/how-to/established-projects/?utm_source=chatgpt.com "Established Projects | BMAD Method"))

---

Если хочешь, следующим шагом я дам **такой же one-click скрипт для PROMPT #1 (прогон всех 96 чанков)** , но уже строго привязанный к тем файлам, которые у тебя реально есть (chunks + пустой project-context/index на старте), чтобы вообще не было “у тебя нет такого файла”.
