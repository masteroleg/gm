# Epic 1 Dev Handoff

- Sequence: implement strictly in order `1.1 -> 1.2 -> 1.3 -> 1.4 -> 1.5`.
- Scope split: `1.1` first-screen clarity; `1.2` two branch cards + branch CTA; `1.3` language/theme persistence; `1.4` trust-floor pages; `1.5` knowledge placeholder.
- Do not mix scopes: no request submit/mailto semantics in `1.1`/`1.2`; no trust-floor rollout in `1.5`; no knowledge/library behavior in `1.4`; no Epic 2 proof-page implementation in Epic 1.
- Architecture: stay static-site only under `site/`; preserve DOM-first controllers, current IDs/contracts, Tailwind v4 CSS-first flow, and committed `site/assets/css/output.css`.
- i18n/prefs: keep text aligned between HTML fallback and `site/assets/js/lang-toggle.js`; keep theme/lang storage fail-soft with `try/catch`; do not introduce SSR, cookies, backend prefs, or SPA routing.
- Quality: follow story tasks exactly, use TDD, keep mobile-safe at `360px`, preserve accessibility/focus/touch targets, and update Jest/Playwright coverage where each story requires it.
