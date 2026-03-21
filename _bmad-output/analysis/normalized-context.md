# Normalized Context — genu.im

**Purpose:** Compact starter context for any new prompt or agent session.
Load this first. For details, follow the distillate pointers below.
**As of:** 2026-03-21

---

## System in One Paragraph

genu.im is the public proof surface for genu.mark — a B2B manufacturing marking platform.
Phase 1 is a static GitHub Pages site (no backend, no real-time API, no live public lookup).
It shows proof that products were manufactured and marked through genu.mark. It is NOT an
official state verification system — that is Дія. The site converts two B2B audiences:
(1) compliance-mandatory eАкциз manufacturers, (2) voluntary brand-protection clients.
Primary Phase 1 deliverable: homepage transformation + `/v/genuim` canonical proof example.

---

## Canonical Terms

| Term | One-line definition |
|---|---|
| **genu.mark** | Manufacturer/brand marking platform. genu.im is its public proof surface. |
| **Дія** | Ukrainian state app for official excise verification. Separate trust layer from genu.mark. |
| **Trust boundary** | Explicit separation: genu.mark = brand proof; Дія = state verification. Never conflate. |
| **Phase 1** | Static site, mailto: handoff, no backend. `/v/genuim` only approved proof page. |
| **Proof Hub** | `/v/` surface. Entry: `/v/genuim`. Shows demo/verified/no-data states. |
| **Branch split** | Homepage scroll-section split: eАкциз (cold, compliance) vs Brand (warm, voluntary). |

---

## Non-Negotiable Rules

**Trust boundary (absolute):**
- Never imply genu.im performs official state verification
- Forbidden copy: "live verification", "real-time verification", "official verification", "any scan", "backend submission", "guaranteed delivery", "Phase 1 placeholder"

**output.css (absolute):**
- `site/assets/css/output.css` MUST stay git-tracked — GitHub Pages deploys it directly
- Never `git rm --cached` this file; never add to .gitignore

**Phase 1 scope:**
- Only `/v/genuim` is approved; `/v/genu.alko`, `/v/genu.cosm` require separate approval
- 25M+ proof claim requires founder approval before publishing
- Request form = mailto: handoff only (no guaranteed delivery)

---

## Current State (2026-03-21)

- Epic 5 remediation: **COMPLETE** (5 stories, all verified)
- Release 2.1 epics (1–4): **NOT YET STARTED**
- Open defects: **6** (VIS-002 HIGH, TRUST-001 HIGH, CONV-002 HIGH, COPY-001 MED, COPY-002 MED, A11Y-001 LOW)
- project-context.md refresh: **PENDING** (defect register re-check still needed)

---

## Load More (distillate pointers)

| Topic | File |
|---|---|
| Product model, personas, 29 FRs, 16 NFRs, epic structure | `gm-distillate/01-product-strategy-requirements.md` |
| Tech stack, ADRs, design system, 10 components, implementation patterns | `gm-distillate/02-architecture-tech-implementation.md` |
| Audit findings, open/fixed defects, Epic 5 stories, anti-drift | `gm-distillate/03-audit-remediation-current-state.md` |
| CI/CD, project contract, docs authority map, homepage master plan | `gm-distillate/04-cicd-docs-governance-contracts.md` |
| All open items consolidated | `analysis/missing-pieces.md` |
| Canonical terms (full glossary) | `docs/governance/glossary.md` |
