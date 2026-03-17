# 30/60/90 Day Roadmap — genu.im Website (Post Sprint 3)

## Track A: P1 Verified Fixes (Day 0–14)

| Item | What | Effort | Owner |
|---|---|---|---|
| IA-001 | Extend homepage header/nav component to ALL secondary pages. Single shared template fix — confirmed by DOM inspection. | S | FE |
| TRUST-004 | Replace «сторінка-заглушка для першої фази» on Knowledge. UA rewrite ready (Option B recommended). | XS | Product + Content |
| TRUST-005 | Replace «стартова політика першої фази» on Privacy → «Політика конфіденційності genu.im». | XS | Legal + Content |
| TRUST-006 | Replace «стартові умови першої фази» on Terms → «Умови використання genu.im». | XS | Legal + Content |
| TRUST-003 | Replace "Phase 1" language on Proof Example. UA rewrite ready (Option B). | XS | Content |
| TRUST-002 | Color-code source pills (genu.mark vs brand). | XS | Design |

## Track B: P2 Fixes (Day 15–30)

| Item | What | Effort | Owner |
|---|---|---|---|
| TRUST-001 | Consolidate 4 disclaimers → 1 info banner. UA rewrite ready (Option B). | S | Content + Design |
| VIS-002 | Fill empty hero right panel (trust diagram / product visual / animation). | M | Design + FE |
| CONV-002 | Replace `mailto:` with structured lead capture. Site is static — use Formspree, Netlify Forms, or equivalent (no heavy backend needed). | S–M | Product + FE |
| COPY-002 | Replace «Кейс під NDA» → «Працює на виробництві. Понад 25 мільйонів промаркованих одиниць.» | XS | Content |
| COPY-001 | PO decision: keep token pills, clarify them, or remove. | XS | Product |
| A11Y-001 | Increase theme toggle touch target to 44px (nice-to-have, already passes WCAG). | XS | FE |

## Track C: Remaining Coverage & Instrumentation (Day 15–45)

- [ ] Close ~6 remaining dark-mode states for secondary pages
- [ ] Run Lighthouse CI baseline when tool is available
- [ ] Keyboard/focus-visible manual test (physical keyboard or Playwright)
- [ ] Re-run coverage matrix after P1 fixes
- [ ] Re-capture screenshots for changed pages
- [ ] Build regression checklist for critical flows

## Track D: Founder / Strategic Track (Day 30+)

- [ ] STRAT-001: Decide Domino/Omron disclosure policy
- [ ] Validate what can be said publicly
- [ ] If approved: add ecosystem authority signal
- [ ] Consider "Why LogicTime" / trust-boundary pages

> [!IMPORTANT]
> Track D does not begin until Track A (P1 fixes) is complete and verified.
> No authority-building content enters the site before founder approval and public-proof validation.

---

## Roadmap Rules
1. No new strategic content ahead of verified P1 defect fixes
2. No strategic claim on site before founder approval
3. Named owners only — no collective ownership
4. Items closed by evidence, not opinion
