# Glossary — genu.im

> **Active glossary.** Promoted 2026-03-21.
> Source: `prd.md`, `architecture.md`, `epics.md`, `ux-design-specification.md`, `docs/project-contract.md`, `docs/governance/doc-governance.md`, `_bmad-output/project-context.md`.
> Terms marked `[needs review]` require explicit confirmation against a canonical source before use.

---

## Product Terms

| Term | Definition | Source |
|---|---|---|
| **genu.im** | The public proof surface for genu.mark. Phase 1 = proof/demo landing page and verification experience. Not an official state verification system. | prd.md |
| **genu.mark** | The manufacturer/brand marking and proof platform. `genu.im` is its public proof surface. Separate from official state systems. | prd.md |
| **eАкциз** (eAkcyz) | Ukrainian electronic excise marking system. Regulatory mandate for manufacturers. Primary driver of the compliance audience (`Олег/COO` persona). | prd.md |
| **Дія** (Diia) | Ukrainian state digital services app. The authoritative channel for official state verification of excise marks. Not the same as genu.mark verification. | prd.md, architecture.md |
| **Trust boundary** | The explicit separation between brand-layer proof (`genu.mark`) and official state verification (`Дія`). Must be preserved in all copy, UI, and implementation. | architecture.md, project-contract.md |
| **Phase 1** | Current scoped delivery. Static site. Proof/demo surface. `mailto:` handoff for requests. No backend, no real-time API, no live public lookup. | prd.md |
| **Qualified request** | Lead capture form at `/request/`. B2B contact gated through a scenario-aware form. Phase 1 mechanism for converting interest. | prd.md, epics.md |
| **mailto: handoff** | Phase 1 request submission mechanism. Opens a pre-filled email draft in the user's client. Does not guarantee delivery or server-side receipt. | architecture.md |
| **Proof Hub** | The `/v/` verification page surface. Shows product proof state: verified, no-data, or demo example. Entry point is `/v/genuim`. | prd.md, ux-design-specification.md |
| **Demo surface** | Proof/verification example shown at `/v/genuim`. Pre-seeded static example — not a live lookup system. | architecture.md |
| **No-data state** | UI state when product proof is absent. Must be honest and non-alarming. Not an error — missing proof is a feature, not a failure. | prd.md, ux-design-specification.md |
| **Branch split** | Page section where eАкциз and Brand audiences diverge. Each branch has distinct visual DNA and CTA. Implemented as scroll-narrative sections, not separate nav items. | epics.md, ux-design-specification.md |

---

## Trust / Copy Terms

| Term | Definition | Source |
|---|---|---|
| **Proof** | Evidence that a product has been manufactured and marked through `genu.mark`. Distinct from official state verification. | prd.md |
| **Verification** | In context of `genu.im`: showing proof state of a product via the proof hub. Not "official state verification" (that is `Дія`). | prd.md, project-contract.md |
| **Proof-first** | Design principle: demonstrate proof directly rather than making claims about it. The site proves rather than promises. | prd.md |
| **Honest no-data** | Copy and UX pattern: when proof is absent, state absence plainly without implying failure, fraud, or error. | ux-design-specification.md |
| **Disclaimer** | Trust boundary notice on proof pages. Must not be removed entirely — only simplified or consolidated per approved remediation brief. | project-contract.md |

---

## UX / Design Terms

| Term | Definition | Source |
|---|---|---|
| **data-i18n** | HTML attribute marking a translatable string. The contract between markup and the `lang-toggle.js` translation map. Hardcoded user-facing text in JS is not allowed. | architecture.md, project-context.md |
| **FOUC** | Flash of unstyled content. Prevented by applying theme/lang state in `<head>` before CSS renders. | architecture.md |
| **output.css** | Committed Tailwind CSS build artifact at `site/assets/css/output.css`. Must remain git-tracked — GitHub Pages deploys it directly. Never gitignore. | ADR-001 |
| **Static site** | Current architecture. No server-side code, no backend, no runtime API in Phase 1. GitHub Pages. | architecture.md |
| **DOM controller** | Vanilla JS module that directly manipulates the DOM. No framework hydration. `lang-toggle.js`, `theme-toggle.js`, `menu.js` are examples. | architecture.md |
| **Brownfield** | Project has existing code and patterns. Do not restart from scratch. Prefer narrow, low-risk changes. | project-contract.md |

---

## Document / BMAD Terms

| Term | Definition | Source |
|---|---|---|
| **Active canonical** | Current source of truth. Future agents may rely on it by default. Cannot be overridden by derived docs. | docs/governance/doc-governance.md |
| **Active derived** | Summary or rollup that depends on canonical docs. Authoritative only within its stated scope. | docs/governance/doc-governance.md |
| **Historical BMAD artifact** | Completed planning doc. Kept for traceability only. Must not be loaded by default. | docs/governance/doc-governance.md |
| **FR** | Functional requirement. Numbered FR01–FR29 in `prd.md`. All 29 active FRs are covered in `epics.md`. | prd.md |
| **NFR** | Non-functional requirement. Covers performance, accessibility, reliability, security thresholds. | prd.md |

---

## Deprecated / Risky Synonyms

These terms must not appear in user-facing copy. They may appear in internal docs only with explicit caveat.

| Term | Risk | Preferred alternative |
|---|---|---|
| "live verification" | Implies real-time API or state-verified lookup. Forbidden per `project-contract.md` Rule 10. | "proof example", "demo verification" |
| "real-time verification" | Same risk. Explicitly forbidden. | "product proof" |
| "official verification" | Implies state authority. Only `Дія` performs this. | "brand-layer proof" or "genu.mark proof" |
| "backend submission" | Phase 1 has no server submission — only `mailto:` handoff. | "qualified request", "email handoff" |
| "Phase 1 placeholder" | Internal language. Must not appear in public copy (TRUST-004 finding). | Remove entirely or rephrase as informational |
| "any scan" | Overstates verification reach. FAQ must not imply arbitrary live public proof. | "verified genu.mark code" |
| "guaranteed delivery" | `mailto:` handoff only initiates email draft; delivery not guaranteed. | "email handoff", "request initiated" |
