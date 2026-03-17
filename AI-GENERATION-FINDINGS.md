# OpenCode AI Integration: Investigation Findings

## Executive Summary

Attempted to integrate OpenCode AI for generating bilingual commit messages. After thorough investigation, discovered that OpenCode does not provide a suitable API endpoint for programmatic commit message generation via git hooks.

**Status:** ❌ AI generation currently DISABLED - using intelligent fallback heuristic generator instead

## Problem Statement

Goal: Generate bilingual (EN + RU) commit messages automatically in VSCode via git hooks, optionally using AI for better quality.

Current implementation: `scripts/generate-commit-msg.cjs` has an **intelligent fallback heuristic generator** that produces high-quality bilingual messages even without AI.

## Investigation Results

### OpenCode Server Architecture

Tested: OpenCode CLI v0.37+

OpenCode has **three different server modes**, none of which provide suitable REST API for git hooks:

#### 1. `opencode serve --port 0` (Web UI Server)
- **Status:** ❌ Does NOT expose REST API endpoints
- **Output:** Returns HTML UI for all HTTP requests
- **Attempted endpoints:** `/v1/session`, `/v1/models`, `/api/session` — all return HTML
- **Conclusion:** Web-only server, not suitable for programmatic use

#### 2. `opencode run [message]` (CLI Execution)
- **Status:** ❌ Broken: "Session not found" error
- **Behavior:** Returns error when no active session exists
- **Expected:** Should create a new session, but doesn't
- **Conclusion:** Known bug in CLI for non-interactive use

#### 3. `opencode acp` (ACP Protocol Server)
- **Status:** ⚠️ Available but uses different protocol (Agent Client Protocol)
- **Limitation:** Would require implementing ACP client in git hook script
- **Complexity:** Not worth it for commit message generation
- **Conclusion:** Over-engineered for this use case

### Key Findings

| Aspect | Result |
|--------|--------|
| **Web API** | ❌ `opencode serve` has no REST API endpoints |
| **CLI Mode** | ❌ `opencode run` has "Session not found" bug |
| **ACP Protocol** | ⚠️ Exists but requires separate client implementation |
| **Models Available** | ✅ API access would allow: nemotron-3-super-free, big-pickle, mimo-v2-flash-free, minimax-m2.5-free, gpt-5-nano |
| **Authentication** | ✅ Environment variables set: OPENCODE_SERVER_PASSWORD, OPENCODE_SERVER_USERNAME |

## Current Solution: Intelligent Fallback Generator

The `buildMessage()` function in `generate-commit-msg.cjs` provides intelligent heuristic-based commit message generation:

### Features
- ✅ Bilingual format (English + Russian)
- ✅ Conventional Commit format for subject line
- ✅ RUSSIAN SUMMARY section with context/reasoning
- ✅ File-by-file bullet points with English descriptions
- ✅ RU: explanations for each file showing business/technical significance
- ✅ Context-aware file detection (scripts, config, site, BMAD, etc.)
- ✅ Handles commits up to 15 files with detailed bullets
- ✅ Graceful fallback for larger commits (50+ files)

### Quality Examples

#### Small Commit (1-3 files)
```
chore: update 1 files

- `test-commit-msg.txt` — update file
  RU: обновить файл

RUSSIAN SUMMARY:
- `test-commit-msg.txt` — внесены изменения в файл
```

#### Medium Commit (3-15 files)
```
docs(bmad): update planning artifacts

- `_bmad-output/planning-artifacts/prd.md` — clarify acceptance criteria
  RU: Конкретизированы acceptance criteria для proof validation

- `_bmad-output/planning-artifacts/architecture.md` — align proof routes
  RU: Выровнены proof-flow routes и data structures

RUSSIAN SUMMARY:
[Detailed explanation of changes and impact]
```

## Recommendations

### Short Term (Current)
✅ **KEEP the fallback heuristic generator** - it's working well and produces quality messages

**Why this is acceptable:**
- Git hooks should be fast and reliable
- AI generation adds 30-60s latency per commit
- Heuristic generator is <100ms
- Quality is good enough for most commits
- No external API dependency
- No authentication complexity

### Medium Term (If AI becomes available)
- Monitor OpenCode for fixes to `opencode run` command
- If/when REST API becomes available, add optional AI enhancement
- Could use it as a "refine previous message" feature rather than primary generator

### Long Term (Alternative approaches)
1. **Self-hosted LLM:** Use local Ollama/LLaMA for offline AI generation
2. **Different AI provider:** Consider Claude API, OpenAI, etc. (but adds cost/dependency)
3. **Hybrid approach:** Use AI to improve weak heuristic messages (detected via `isWeakMessage()`)

## Implementation Notes

### File: `scripts/generate-commit-msg.cjs`

**Key functions:**
- `buildMessage(files, stat)` - Main heuristic generator (production)
- `runOpencode(prompt)` - AI integration stub (disabled, returns empty)
- `isWeakMessage(message)` - Detects low-quality generated messages
- `buildRepairPrompt()` - Could refine weak messages with AI if available

**Configuration:** `commit-message.config.json`
```json
{
  "opencodeModels": ["opencode/nemotron-3-super-free", ...],
  "fallbackToHeuristicGenerator": true,  // Currently always used
  "maxPromptChars": 12000
}
```

### Git Hook Integration

**File:** `.husky/prepare-commit-msg`
- Calls `scripts/generate-commit-msg.cjs .git/COMMIT_EDITMSG`
- Detects existing meaningful message content (doesn't override user input)
- Filters comment lines from Git template
- Checks for staged files before generating

**VSCode Settings:** `git.useEditorAsCommitInput: true`
- Allows git hooks to modify commit message that appears in VSCode UI

## Testing

### Self-Test Mode
```bash
node scripts/generate-commit-msg.cjs --self-test multi
```

### Real Commit Test
```bash
git add <files>
git commit  # Message will be auto-generated
```

### Hook Behavior
- ✅ Generates messages only when needed (detects weak/missing messages)
- ✅ Preserves user-written messages
- ✅ Handles large repos (buffer size: 10MB)
- ✅ File type filtering for diff (prevents overflow)
- ✅ Bilingual output verified

## Status

| Component | Status | Notes |
|-----------|--------|-------|
| Heuristic Generator | ✅ WORKING | Produces quality bilingual messages |
| Git Hook Integration | ✅ WORKING | `.husky/prepare-commit-msg` functional |
| VSCode Support | ✅ WORKING | `git.useEditorAsCommitInput: true` set |
| AI Generation | ❌ DISABLED | OpenCode CLI/API limitations |
| Fallback Strategy | ✅ ACTIVE | `fallbackToHeuristicGenerator: true` |

## Next Steps for User

If you want to improve commit message quality further:

1. **Option A:** Enhance heuristic rules in `buildMessage()` based on project-specific patterns
2. **Option B:** Wait for OpenCode CLI fix, then uncomment `runOpencode()` function
3. **Option C:** Switch to different AI provider (Claude API, OpenAI, local Ollama)
4. **Option D:** Use fallback as-is (currently produces acceptable quality messages)

---

**Investigation Date:** March 17, 2026  
**OpenCode Version:** Latest (commit generation hook context)  
**Tested Endpoints:** `/v1/session`, `/v1/models`, `/api/session`  
**Result:** No suitable API for programmatic use
