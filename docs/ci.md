# CI and Deploy Guide

## Overview

- Local gate runs before `git push` via `.husky/pre-push`
- GitHub Actions runs quick checks, then full Playwright matrix, then deploys Pages only after success
- Stable required check to use in branch protection: `required-checks`

## Local Gate

`pre-push` runs these commands in order:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run build:css`
4. verify `site/assets/css/output.css` is committed
5. `npm run test:smoke`

Smoke uses Playwright tag filtering with `@smoke` and runs only `chromium` locally for speed.

## CI Workflow

Workflow path: `.github/workflows/ci.yml`

Jobs:

- `quick-checks` - install, lint, typecheck, Jest, build CSS, upload Pages artifact on `main`
- `e2e` - full Playwright matrix in official Playwright Docker image:
  - `chromium`
  - `firefox`
  - `webkit`
  - `mobile-chrome`
  - `mobile-safari`
- `deploy-pages` - runs only on push to `main` and only after `quick-checks` and `e2e`
- `required-checks` - aggregator job for GitHub branch protection

## Deploy Model

- Deploy uses the artifact produced earlier in the same workflow
- Deploy does not rerun `npm ci` or `npm run build:css`
- Pages concurrency is limited so a newer deploy cancels an older one

## Branch Protection

Recommended settings for `main`:

1. Enable `Require status checks to pass before merging`
2. Mark `required-checks` as required
3. Keep `Require a pull request before merging` disabled if you stay in solo no-PR mode
4. Enable `Require linear history`
5. Enable `Do not allow bypassing the above settings` if you want a hard gate

## Useful Commands

```bash
npm run lint
npm run typecheck
npm run test:smoke
npm run test:e2e -- --project=firefox
npm run test:ci
```
