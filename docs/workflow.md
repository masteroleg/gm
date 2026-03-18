# Development Workflow Guide

## Overview

This project uses a **linear, main-branch-only workflow** with automatic commit message generation and selective CI/CD. The goal is minimal friction: **Commit → Sync** in VS Code, no branch juggling.

## Git Workflow

### Configuration

The repository is configured for a rebase-based workflow to maintain linear history:

```bash
git config pull.rebase true       # Use rebase instead of merge
git config rebase.autoStash true  # Auto-stash/pop around rebase
```

VS Code is configured to use rebase on sync:
- `git.rebaseWhenSync: true` — Rebase instead of merge when syncing
- `git.autofetch: true` — Auto-fetch to keep tracking up-to-date

### Daily Workflow

#### 1. **Make changes locally**
```bash
# Edit files, save, verify locally
npm test          # Run tests
npm run lint      # Check linting
npm run build:css # Build CSS if needed
```

#### 2. **Commit in VS Code**
- Open **Source Control** (Ctrl+Shift+G)
- Stage changes (click `+` or `Stage All`)
- Enter a commit message (or leave blank for auto-generation)
- Press **Commit**

The `.husky/prepare-commit-msg` hook automatically:
- Analyzes changed files by category (BMAD, tests, CI, docs, site, config)
- Generates a detailed commit message if one wasn't provided
- Examples:
  - **Small single-file change**: `fix: resolve path bug in tests/index_docs_test.py`
  - **Multi-file update**: `refactor(hooks): improve commit message generation with category analysis`
  - **Multiple categories**: Lists each category with file count

#### 3. **Sync to origin/main**
- Click **Sync** in VS Code (or `git pull --rebase && git push`)
- The `.husky/pre-push` hook runs:
  - **Site impact check**: Only runs site CI if site files changed
  - **Smoke tests** (if site changed): Quick Chromium E2E checks
  - **Lint & typecheck**: Verifies code quality

#### 4. **GitHub CI runs automatically**
On push to `main`:
- **Site CI** (`.github/workflows/ci.yml`): Runs only if site files changed
  - Smoke tests, full E2E, Lighthouse audits
  - Only blocks push if failures occur
- **Infra Checks** (`.github/workflows/infra.yml`): Checks workflow files, hooks, scripts
- **Index Docs** (auto-generated): Updates directory indexes in `_bmad-output/knowledge/`
- **Deploy to GitHub Pages**: Runs after all checks pass

### Why No Feature Branches?

This is a **solo development workflow** on a static site with:
- Small, frequent commits
- No external dependencies or breaking changes
- Quick feedback loops (CI runs in <2 min)
- Single developer (you)

Feature branches add overhead without benefit here. If collaboration or large refactors come later, the workflow can evolve.

## Commit Message Format

Automatic commit messages follow **Conventional Commits** style:

```
<type>(<scope>): <description>

[optional body]
```

### Types
- **feat**: New feature or capability
- **fix**: Bug fix
- **docs**: Documentation changes only
- **refactor**: Code restructuring without feature/fix
- **ci**: CI/CD workflow, hooks, automation
- **chore**: Dependencies, build config (rare)

### Scopes (optional)
- `site` — Site-specific changes
- `tests` — Test infrastructure or specs
- `hooks` — Git hooks (prepare-commit-msg, pre-push, etc.)
- `scripts` — Automation or helper scripts
- `docs` — Project documentation

### Auto-Generation Logic

The hook (`scripts/generate-commit-msg.cjs`) analyzes file paths and generates:
1. **Category tags**: BMAD, tests, CI, docs, site, config
2. **Detailed bullets for small commits**: For smaller commits (<=10 files), explains each file change and why it matters
3. **Grouped bullets for large commits**: For larger commits, groups files by theme but keeps file-level detail inside each group
4. **Type inference**: Detects feat/fix/docs/refactor/ci based on patterns
5. **Commit-only output**: Generates engineering commit messages, not changelog/release-note sections

The current standard intentionally separates commit history from changelog generation:
- **Commit message**: engineering-focused, useful for `git log`, review, and local history
- **Changelog**: separate release artifact derived later from commit subjects and summaries
- The generator must **not** add sections like `Changelog:` or `Release Notes:` to commit messages

**Examples:**

```
fix: resolve path bug in tests/index_docs_test.py

refactor(hooks): improve commit message generation with category analysis

docs: update project documentation and add validation reports

ci: add GitHub Actions workflows and local CI setup
```

## Verification Checklist Before Push

Use this ladder based on change scope:

### For documentation-only changes:
```bash
git diff HEAD  # Verify content
# Push directly
```

### For project config / BMAD changes:
```bash
npm run lint   # Check YAML, JSON
npm run build:css  # Rebuild CSS if styles changed
# Push directly
```

### For test or script changes:
```bash
npm test       # Jest unit suite
npm run lint   # Biome checks
npm run typecheck  # TypeScript verification
# Push directly (pre-push hook will check impact)
```

### For site / frontend changes:
```bash
npm run build:css  # Build production CSS
npm test           # Unit tests
npm run test:smoke # Quick E2E smoke tests
npm run lint       # Linting
npm run typecheck  # Type checking
npm run lighthouse # Performance / accessibility audit
# Sync to push
```

**Note**: The `pre-push` hook runs smoke tests locally if site files changed. Let it finish before pushing.

## Handling Merge Conflicts

GitHub branch protection requires **no merge commits** on `main`. If a conflict occurs during `git pull --rebase`:

```bash
# 1. Resolve conflicts in your editor
# 2. Stage resolved files
git add .
# 3. Continue the rebase
git rebase --continue
# 4. Push
git push
```

If rebase gets messy:
```bash
git rebase --abort        # Undo rebase
git reset --hard origin/main  # Reset to remote
# Then resolve manually and re-commit
```

## Troubleshooting

### "Your branch is ahead of 'origin/main' by X commits"
- Run `git push` to sync
- If push fails due to CI, check GitHub Actions for errors

### "fatal: Not possible to fast-forward, aborting."
- Someone else pushed after you last pulled
- Run `git pull --rebase` to rebase your commits on top
- Then `git push`

### "CONFLICT: Your local changes would be overwritten by merge"
- Stash your changes: `git stash`
- Pull: `git pull --rebase`
- Reapply: `git stash pop`

### Pre-push hook rejected
- Check the error message (usually from smoke tests or lint)
- Fix the issue locally
- Stage and amend: `git add . && git commit --amend --no-edit`
- Push again

### Commit message didn't auto-generate
- The hook requires at least one staged file
- If you're editing an existing message, it won't override
- Delete the message and commit again to trigger generation

## One-Button Sync (Optional)

If you want a simple shell script for Commit + Sync:

```bash
#!/bin/bash
# scripts/sync.sh
set -e
git add .
git commit -m ""  # Empty message triggers hook generation
git pull --rebase
git push
echo "✅ Synced to origin/main"
```

Bind it in VS Code:
1. Open `.vscode/tasks.json`
2. Add task referencing `scripts/sync.sh`
3. Bind to keybinding (e.g., Ctrl+K Ctrl+S)

## Deployment

After a successful push to `main`:
1. GitHub CI runs (2-3 min)
2. All checks must pass
3. `deploy-pages` workflow runs automatically
4. Site is live in ~1 min

You can check deployment status in the GitHub Actions tab.

## References

- [CI/CD Documentation](./ci.md) — Detailed CI pipeline setup
- [Project Context Rules](../_bmad-output/project-context.md) — Architecture and coding rules
- [Conventional Commits](https://www.conventionalcommits.org/) — Commit message format spec
- Git rebase workflow: [Atlassian Guide](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)
