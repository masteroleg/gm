## BMAD Agent Quick Start
Instructions and agent guidelines moved to site/ for publication isolation.

---

## Git Policy for AI Agents (PERMANENT — DO NOT OVERRIDE)

1. NEVER run `git commit`, `git push`, sync/publish, force-push, amend, squash, rebase, merge, cherry-pick, tag push, or any other action that modifies history or sends changes to remote, unless the user EXPLICITLY requests it in the current message.
2. Commits and pushes are the user's responsibility. Do not do them on their behalf.
3. Tags and releases: only if the user EXPLICITLY and SPECIFICALLY asks for them.
4. Any other git action that mutates local or remote state (`git add`, `git restore`, `git reset`, `git checkout`, `git switch`, `git pull`, `git merge`, `git rebase`, `git stash`, branch deletion, history rewriting, etc.) requires:
   - Explain WHY it is needed.
   - List the exact commands.
   - Wait for EXPLICIT user confirmation.
   - Only then execute.
5. Without separate explicit permission, only these read-only git commands are allowed for analysis:
   - `git status`
   - `git diff`
   - `git log`
   - `git show`
   - Other commands that change NOTHING.
6. Never propose commit/push as a default next step after dev or review. Default behavior after completing work:
   - Apply changes to files.
   - Show the list of changed files.
   - Show validation results.
   - Stop and wait for the user's decision.
7. Do not interfere with the user's own commit and sync actions in VSCode or other tooling.
8. When in doubt, treat the action as FORBIDDEN until the user gives explicit permission.
