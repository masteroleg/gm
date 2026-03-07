# Site publishing directory (site/)

This repository uses a conservative migration strategy: the static site content that is published to GitHub Pages lives under the site/ directory. The root of the repository contains BMAD configuration and artifacts (docs/). All CSS is built via Tailwind in CI and the resulting output.css is committed under site/assets/css/output.css.

- CI builds CSS for site/ and verifies output.css is up to date
- GitHub Pages publishes the content of site/ (gh-pages workflow publishes site/ root)
- Local development uses: npm ci, npm run build:css, npm run start (serve site/)

## Safe delivery flow

- Local `git push` is blocked by `.husky/pre-push` if `npm run lint`, `npm run typecheck`, `npm run build:css`, committed CSS verification, or `npm run test:smoke` fails
- GitHub Actions runs `quick-checks` first, then full Playwright matrix: `chromium`, `firefox`, `webkit`, `mobile-chrome`, `mobile-safari`
- `deploy-pages` runs only after successful CI jobs and successful `required-checks`
- Branch protection on `main` requires `required-checks`

## Normal workflow

```bash
npm ci
npm run build:css
npm run start
```

Use one permanent working branch so VS Code Sync works normally while `main` stays protected:

```bash
git switch -C work
git push -u origin work
```

After that, day-to-day flow is:

```bash
git push
```

When CI on `work` is green, promote the exact same commit to production:

```bash
npm run promote:main
```

Expected behavior:

- If local checks fail, the push is rejected locally and GitHub deploy never starts
- If local checks pass but GitHub CI fails on `work`, `main` is unchanged and `deploy-pages` does not run
- Only a fully green CI run can move the same commit into `main` and deploy production content to GitHub Pages

## Failure handling

- `pre-push` failure: fix the local error and push `work` again
- `quick-checks` failure: fix lint, typecheck, Jest, or CSS drift
- `e2e` failure: inspect the failed matrix job and downloaded Playwright artifact if present
- `required-checks` failure: treat as deploy blocked; fix upstream failed jobs on `work` first
