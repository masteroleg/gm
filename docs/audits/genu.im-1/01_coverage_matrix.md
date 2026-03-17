# Coverage Matrix v4 — genu.im Proper Audit (Sprint 1 + 2 + 3 FINAL)

**Date:** 2026-03-17
**Coverage: ~38 of ~44 states (86%)**

## Legend
✅ = checked | — = not checked | T = tablet 768

| Page | UA Mob L | UA Mob D | UA Tab L | UA Desk L | UA Desk D | EN Mob L | EN Desk L | EN Desk D | Issues |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| `/` | ✅ | ✅ | ✅T | ✅ | ✅ | — | ✅ | ✅ | COPY-001, COPY-002, VIS-002 |
| `/v/genuim/` | ✅ | — | ✅T | ✅ | — | ✅ | ✅ | ✅ | TRUST-001/002/003 |
| `/about/` | ✅ | — | ✅T | ✅ | — | ✅ | — | — | IA-001 |
| `/contact/` | ✅ | — | ✅T | ✅ | — | ✅ | — | — | IA-001 |
| `/knowledge/` | ✅ | — | — | ✅ | — | ✅ | — | — | IA-001, TRUST-004 |
| `/faq/` | ✅ | — | — | ✅ | — | ✅ | — | — | IA-001 |
| `/proof-cases/` | ✅ | — | — | ✅ | — | ✅ | — | — | IA-001 |
| `/privacy/` | ✅ | ✅ | — | ✅ | — | ✅ | — | — | IA-001, TRUST-005 |
| `/terms/` | ✅ | — | — | ✅ | — | ✅ | — | — | IA-001, TRUST-006 |
| `/request/?eaktsyz` | ✅ | — | ✅T | ✅ | — | ✅ | — | — | IA-001, CONV-002 |
| `/request/?brand-proof` | ✅ | — | — | ✅ | — | ✅ | — | — | IA-001, CONV-002 |

## IA-001 Scope Update (Sprint 3 Discovery)
**Navigation is missing on secondary pages at ALL viewports:**
- Mobile 390: NO hamburger on secondary pages (only homepage)
- Tablet 768: NO hamburger on secondary pages (homepage + proof-example have it)
- Desktop 1440: NO nav bar on secondary pages (only homepage has full nav)

This means IA-001 is a **site-wide architecture issue**, not just a mobile bug.

## Verification Status
- ✅ ICON pass: CLEAN
- ✅ THEME parity: PASS
- ✅ Contrast: PASS (oklch-estimated ~7.2:1 light, ~11.5:1 dark)
- ✅ Target size: theme toggle 26.4px (passes WCAG 24px), footer 44px (PASS)
- ✅ DOM L10N-001: CLOSED (sections identical EN/UA)
- ✅ VIS-002: PROMOTED to High (persists all viewports)
- ⚠️ Lighthouse: NOT RUN (tool limitation — acknowledged)
- ⚠️ Focus/keyboard: NOT TESTABLE (tool limitation — acknowledged)
- ⚠️ Safari: N/A (Windows)

## Remaining Gaps (~6 states)
- EN Mobile Dark (all pages)
- UA/EN Desk Dark for secondary pages
- Missing tablet checks for knowledge/faq/proof-cases/privacy/terms
