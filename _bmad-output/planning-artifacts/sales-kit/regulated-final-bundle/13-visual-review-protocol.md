---
title: Visual Review Protocol - Regulated Sales Kit
status: Active
owner: Founder / next agent / QA
last_updated: 2026-03-23
---

# Visual Review Protocol / Regulated Sales Kit

## Purpose

This protocol exists because local PDF files are archival outputs for humans, but they are not a reliable primary review source for LLM agents when the toolchain cannot inspect PDF pages visually.

## Core rule

For agent-driven visual review, do **not** treat local PDF files as the primary source.

Use one of these instead:

1. NotebookLM artifact URL
2. page screenshots or preview images saved locally

Local PDF files remain:
- valid saved outputs
- useful for human review
- not the preferred first review source for LLM agents

## Visual review source priority

Use this order:

1. NotebookLM artifact URL
2. locally saved page screenshots / previews
3. local PDF file only for human/manual opening

## What must not happen

- do not read PDFs as text blobs
- do not batch-load multiple PDFs into a text-reading workflow
- do not assume a successful file read equals a visual review
- do not reopen the meaning layer because a PDF could not be read as text

## Current review targets

### Executive Deck

- local file: `run-results/visuals/regulated-executive-deck-genu-mark-yak-sylne-iadro.pdf`
- NotebookLM artifact URL:
  - `https://contribution.usercontent.google.com/download?c=Cgpub3RlYm9va2xtEkYSD2FydGlmYWN0c19tZWRpYRozCiRlNWM1NDI3Ni00YWVjLTRhNTgtOGUxMi05ODNhODM3ZGRjODcSCxIHEMf6uvDtGhgB&filename=genu.mark_eАкциз_Core.pdf&opi=96797242`

### Why Us

- local file: `run-results/visuals/regulated-why-us-bezpechnishe-vprovadzhennia.pdf`
- NotebookLM artifact URL:
  - `https://contribution.usercontent.google.com/download?c=Cgpub3RlYm9va2xtEkYSD2FydGlmYWN0c19tZWRpYRozCiQ0MTM1MDhiOS1jOWYxLTQ1ZWYtOWE1Zi1jOTA4OTNiMjkxODESCxIHEMf6uvDtGhgB&filename=Safe_e-Excise_Architecture.pdf&opi=96797242`

### One Job

- local file: `run-results/visuals/regulated-one-job-kerovana-liniia.pdf`
- NotebookLM artifact URL:
  - `https://contribution.usercontent.google.com/download?c=Cgpub3RlYm9va2xtEkYSD2FydGlmYWN0c19tZWRpYRozCiRhZTk0YmYxNS0yOTZjLTQ0MWUtODQ2NC0wMjg4NDUwMmU2Y2ESCxIHEMf6uvDtGhgB&filename=The_e-Excise_Schematic.pdf&opi=96797242`

## Review workflow

For each release-candidate deck:

1. open only one artifact at a time
2. inspect it visually, not as a text document
3. evaluate against:
   - `regulated-final-bundle/07-visual-release-status.md`
   - `notebooklm-source/04-visual-output-rules.md`
   - `regulated-final-bundle/11-claude-handoff-main.md`
4. record:
   - release-ready / revise
   - strongest parts
   - weak parts
   - visual-only issues
   - meaning-level issues, if any
   - exact next action

## If visual review is blocked

If the agent still cannot inspect the artifact visually:

- do not guess
- do not downgrade the meaning layer
- record `visual_review_blocked_by_tooling`
- request page screenshots or preview images as the next enabling step

---

## QA Results — Visual Review Completed 2026-03-23

**Method used:** PyMuPDF page-to-JPEG conversion (1.5× scale), reviewed image by image. Frames saved to `run-results/visuals/review-frames/`.

**Gate applied:** `04-visual-output-rules.md` language discipline — all visible buyer-facing copy must be Ukrainian. Allowed exceptions: `genu.mark`, `Domino`, `ERP`.

---

### Executive Deck — `regulated-executive-deck-genu-mark-yak-sylne-iadro.pdf`

**Verdict: REVISE**

**Strongest:**
- Pages 1, 2, 3: perfect narrative arc; chaos-vs-core visual on p1 is the strongest opener of the three decks
- Page 8: four benefit cards, fully Ukrainian, clean and usable as-is
- Page 10: clear CTA with 3 concrete options

**Language fails (visual-only, meaning intact):**

| Page | Failing elements |
| --- | --- |
| 4 | `ERP → source of production job` / `ERP / internal systems ← exchange of results and statuses` — English contour labels |
| 5 | `Control Panel`, `High Risk`, `Low Risk / Safe`, `Robotics Menu` — English UI chrome leaked into diagram |
| 6 | `Interface Friction`, `ERP / State Systems`, `The Physical Line`, `Friction Zone`, `Robotics Menu` — the seam/risk slide is almost entirely English in diagram labels |
| 7 | `(Hardware)`, `(Core Software)`, `(Integration Discipline)` in English parentheticals; `25M+ industrial deployment in Ukraine.` — English claim |
| 9 | `Roboto Mono` × 4 — font name leaked as placeholder text in responsibility boxes |

**Meaning-level issues:** none

**Exact next action:** Rerun slide generation. Force Ukrainian-only visible copy. Required substitutions:
- p4: use approved Ukrainian contour wording (reference: Why Us deck p5)
- p5/p6: all diagram labels must be Ukrainian
- p7: remove English parentheticals; translate or remove English claim
- p9: remove `Roboto Mono` placeholder artifact

---

### Why Us — `regulated-why-us-bezpechnishe-vprovadzhennia.pdf`

**Verdict: REVISE** (closer to release than Executive Deck)

**Strongest:**
- Page 2: risk chart (chaos vs. controlled process) — clearest single-message slide across all three decks
- Page 4: orange pipeline, fully Ukrainian, visually consistent
- **Page 5: contour wording is CORRECTLY Ukrainian** — `ERP -> джерело виробничого завдання`, `ERP / внутрішні системи <- обмін результатами та статусами`, `еАкциз (окремий зовнішній державний контур)` — use this as the reference prompt template for all reruns
- Page 8: clean two-column Dominanta / Logictime responsibility split

**Language fails (visual-only, meaning intact):**

| Page | Failing elements |
| --- | --- |
| 5 | `The Contour Map` — English label on the diagram (contour wording itself is correctly Ukrainian) |
| 6 | `(Evidence by design)` — English in parentheses after Ukrainian term |
| 7 | `(Patchwork)` — English in parentheses after `Набір латок` |
| 9 | `«by design»` — English phrase embedded in Ukrainian comparison table cell |
| 10 | `APPROVED FOR AUDIT` — large English stamp on CTA slide, most visible single failure |

**Meaning-level issues:** none

**Exact next action:** Rerun slide generation. Force Ukrainian-only visible copy. Required substitutions:
- p5: `The Contour Map` → `Карта контурів` or remove label
- p6/p7: remove English parentheticals
- p9: `by design` → `за проєктом`
- p10: `APPROVED FOR AUDIT` → `ГОТОВО ДО АУДИТУ` or remove stamp

---

### One Job — `regulated-one-job-kerovana-liniia.pdf`

**Verdict: REVISE** (fewest issues, cleanest composition of the three)

**Strongest:**
- Pages 2, 3: tightest narrative focus of any deck — one message, one visual per slide
- Page 5: clean three-part Dominanta / genu.mark / Logictime architecture, all Ukrainian
- Page 6: focused CTA with no excess copy

**Language fails (visual-only, meaning intact):**

| Page | Failing elements |
| --- | --- |
| 1 | `DOC.REF : GENU.MARK // REGULATORY COMPLIANCE` — English metadata visible on cover slide |
| 4 | `ERP -> source of production job` / `ERP / internal systems <- exchange of results and statuses` — same English contour labels as Executive Deck p4 |

**Meaning-level issues:** none

**Exact next action:** Rerun slide generation. Force Ukrainian-only visible copy. Required substitutions:
- p1: remove doc-ref metadata or translate to Ukrainian
- p4: use approved Ukrainian contour wording (reference: Why Us deck p5)

---

## Cross-deck patterns identified

**Systematic failure — ERP contour labels:**
All three decks generated English ERP contour labels on the architecture slide. The correct Ukrainian form appeared only in Why Us p5 and should be the canonical reference for all reruns:

```
ERP -> джерело виробничого завдання
ERP / внутрішні системи <- обмін результатами та статусами
еАкциз (окремий зовнішній державний контур)
```

**Meaning layer:** intact across all three decks — no meaning-level rework required.

**Rerun scope:** visual generation only. Do not touch text outputs or source packets.
