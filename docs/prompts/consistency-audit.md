# CONSISTENCY AUDIT + AI CONTEXT CREATION

Analyze all BMAD project artifacts in this repository (vision, requirements,
architecture, indexes, and related documents).

---

## STEP 0 — PRE-CHECK (run before anything else)

Scan the following locations and map what already exists:

```
_bmad-output/          ← planning artifacts, distillate, analysis/
docs/                  ← governance, glossary, audits
root                   ← CLAUDE.md, README, project-context.md
```

For each of the 5 output files below, identify the closest existing equivalent.
Report your findings as a table:

| Output file | Existing equivalent | Action |
|---|---|---|
| consistency-report.md | e.g. doc-inconsistency-report.md | reference / update / create |
| terminology.md | e.g. docs/governance/glossary.md | reference / update / create |
| system-summary.md | e.g. gm-distillate/ | reference / update / create |
| missing-pieces.md | none found | create |
| normalized-context.md | none found | create |

**Do not proceed to MODE DETECTION until this table is shown to the user.**

---

## MODE DETECTION

**Brownfield** (existing artifacts present in `_bmad-output/` or `docs/governance/`):
→ Reference existing files. Fill gaps only. Do NOT duplicate content.
→ For files that already exist: update in place or add a reference section.

**Greenfield** (no prior artifacts):
→ Create all 5 files from scratch.

Auto-detect: if `_bmad-output/` contains markdown files → Brownfield.

---

## SOURCE HIERARCHY

When artifacts conflict, the higher source wins:

```
PRD  >  Architecture  >  UX Spec  >  Epics  >  Stories
```

Flag every resolved conflict in `consistency-report.md` with:
- Which sources conflicted
- Which won (per hierarchy)
- Suggested long-term resolution

---

## BMAD SKILLS TO USE

Do not perform these manually — invoke the corresponding BMAD skill:

| Task | Skill |
|---|---|
| Navigate artifact folders | `/bmad-index-docs` → generates/updates `index.md` |
| Re-distill changed artifacts | `/bmad-distillator` → compressed distillate sections |
| Refresh AI rules | `/bmad-generate-project-context` → updates `project-context.md` |
| Run this audit | `/bmad-analyst` → you are already here |

---

## CONTEXT USAGE RULES

- If `index.md` exists in a folder → use it to navigate; do NOT read every file
- If `project-context.md` or a distillate exists → read it first as baseline
- Avoid re-reading files already in context
- Do NOT invent missing functionality — flag it in `missing-pieces.md`

---

## APPROVAL GATE

Before writing any file:

1. Show the proposed file tree with estimated sizes:
   ```
   _bmad-output/analysis/
     consistency-report.md   ~N lines
     terminology.md          ~N lines
     system-summary.md       ~N lines   [or: "→ references distillate, skip"]
     missing-pieces.md       ~N lines
     normalized-context.md   ~N lines   [hard limit: ≤600 tokens]
   ```
2. Wait for user confirmation.
3. Only then write the files.

---

## OUTPUTS

All files go to: `_bmad-output/analysis/`

### 1. `consistency-report.md`

```
## Aligned Areas
What is consistent across all docs

## Conflicts
| Description | Where found | Why it's a problem | Resolution (per hierarchy) |

## Ambiguities
Unclear definitions / missing constraints / vague requirements

## Duplications
Repeated or overlapping content across docs
```

### 2. `terminology.md`

```
| Term | Definition | Source | Notes |
```

Rules:
- Unify naming (e.g. "Order" vs "PurchaseOrder")
- Prefer most recent / most consistent usage
- Flag conflicts; do not silently resolve them

**Brownfield note:** If `docs/governance/glossary.md` exists → extend it
in place instead of creating a parallel file.

### 3. `system-summary.md`

```
## Purpose
1–2 sentences

## Core Capabilities
- bullet list

## Key Actors
Users / systems

## Core Workflows
High-level flows

## Main Components
Services / modules

## Data Concepts
Entities (one-line each)
```

**Brownfield note:** If a distillate (`gm-distillate/` or similar) already covers
this content → write only a 3-line summary + pointer to the distillate.
Do NOT copy distillate content into this file.

### 4. `missing-pieces.md`

```
## A — Open Defects
| ID | Severity | Description | Effort | Notes |

## B — Drift Items (decisions pending)
Items that exist but conflict or are unresolved

## C — Strategic Decisions (founder / PO track)
Do not act without explicit approval

## D — Technical Debt / Migration Issues
Broken pipelines, unreachable code, empty shell files

## E — Quick Wins
Small improvements that can be done immediately

## F — Refresh Conditions
Conditions that would make this file stale
```

Rules:
- Severity: HIGH / MEDIUM / LOW
- Do NOT put items here that are already tracked in the defect register
- Reference the authoritative source; do not copy content

### 5. `normalized-context.md` ← CRITICAL

**Hard limit: ≤600 tokens.** This file is loaded at the start of every future prompt.

```
## System in One Paragraph
Highly compressed. What the system is and is NOT.

## Canonical Terms
Use ONLY these going forward (6–10 terms max, one line each)

## Core Entities
Name + 1-line description

## Key Rules / Constraints
Business rules and technical constraints

## Architecture Snapshot
Short, structured

## Current State
Date + status of latest epic/sprint + count of open defects

## Load More (pointers only — no content duplication)
| Topic | File |
```

**Brownfield note:** If `normalized-context.md` already exists → update
`## Current State` only; preserve everything else unless a canonical term changed.

---

## VALIDATION (run before finishing)

```
✓ All major artifacts were considered (PRE-CHECK table completed)
✓ Mode was detected and applied correctly
✓ Conflicts are flagged with hierarchy-based resolutions
✓ No invented features (only flagged in missing-pieces.md)
✓ normalized-context.md word count × 0.75 ≤ 600 tokens
✓ system-summary.md has zero duplicated content from existing distillate
✓ All 5 output paths use _bmad-output/analysis/ (no path conflicts)
✓ Summaries are consistent with source material
```

---

*Reusable prompt — applies to any BMAD project.*
*For project-specific context, load `_bmad-output/analysis/normalized-context.md` first.*
