# Site publishing directory (site/)

This repository uses a conservative migration strategy: the static site content that is published to GitHub Pages lives under the site/ directory. The root of the repository contains BMAD configuration and artifacts (docs/). All CSS is built via Tailwind in CI and the resulting output.css is committed under site/assets/css/output.css.

- CI builds CSS for site/ and verifies output.css is up to date
- GitHub Pages publishes the content of site/ (gh-pages workflow publishes site/ root)
- Local development uses: npm ci, npm run build:css, npm run start (serve site/)
