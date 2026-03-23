---
type: bmad-distillate-section
section: 04 of 05
coverage: "Parts XI, XV-XIX, Appendices A-C — accessibility gate, before/after gallery, export/handoff, QA rubric 100/100, role kernels, checklists"
---

This section covers QA, Export, and Accessibility. Part 4 of 5 from BMAD Visual Storytelling Bible v4.

## Accessibility Gate (mandatory, not nice-to-have)
- Text contrast: WCAG AA minimum 4.5:1 for normal text; 3:1 for large text
- Text on image: dangerous by default; allowed ONLY if: sufficient contrast + solid/semi-solid backing + no busy texture under text
- Minimum readable density forbidden: summary page as wall of micro-text / long paragraph on busy background / screenshot so small callout is meaningless
- Self-read documents must be: chunked + sectioned + skimmable + navigable
- WCAG 2.2 applicable as legibility/accessibility guide for non-web documents

## Before/After Gallery (key patterns)
- BAD title: "Ризики" → GOOD: "Два операційних ризики залишаються критичними навіть після автоматизації"
- BAD comparison: three cards with equal weight despite one recommended → GOOD: one recommendation card highlighted, two alternatives pushed back and explained as weaker
- BAD evidence page: chart without takeaway title and annotations → GOOD: takeaway title + direct labels + annotation at inflection point + footnote with assumptions
- BAD source use: site added as URL, agent assumes NLM sees full visual design → GOOD: site as text source + screenshots/diagrams added separately
- BAD revise: agent tries to rebuild entire deck logic via revise → GOOD: rebuild with new source subset because argument changed

## Export / Handoff / Governance
- Export law: after export, artifact lives independently; changes to exported file do NOT return to notebook; permissions NOT auto-inherited; final handoff requires separate review of exported artifact
- Handoff protocol (5 checks before delivery):
  1. Exported file matches latest approved artifact
  2. Citations/tables/layout not lost in export
  3. Additional spreadsheet export needed for tables?
  4. Who gets access and how?
  5. Full notebook / chat view / public link / file — which sharing mode?
- Sharing caution: Chat View does NOT guarantee full hiding of underlying materials; use least-permissive sharing strategy for sensitive content

## QA Rubric 100/100 (11 dimensions)
| # | Dimension | Points | Criterion |
|---|---|---|---|
| 1 | Logic strip | 12 | Titles alone tell the story |
| 2 | Self-read sufficiency | 12 | Document works without author present |
| 3 | Hook + attention retention | 12 | 5-sec hook + clear focal point + energy holds after screen 3 |
| 4 | Visual fit | 12 | Each screen form matches cognitive task |
| 5 | Evidence integrity | 12 | Key claims grounded, readable, not masked by style |
| 6 | Summary + appendix architecture | 8 | Fast route + deep route both present |
| 7 | Readability / chunking | 8 | Easy to scan, no walls of text without structure |
| 8 | Dataviz quality | 8 | Charts annotated, not noisy |
| 9 | Accessibility + legibility | 6 | Contrast, text-on-image, text size passed |
| 10 | NLM hygiene | 5 | Correct notes/sources/artifact chain/revise-rebuild choice |
| 11 | Export/handoff readiness | 5 | Final deliverable genuinely transferable without verbal explanation |

- 90-100: production-ready
- 75-89: usable, revise before important send
- 60-74: partial rebuild recommended
- <60: reject

### Additional gates (from 2026-03-23 team review — add to rubric)
| # | Dimension | Criterion |
|---|---|---|
| 12 | Language gate | All visible copy in target language including diagram labels, parentheticals, stamps, metadata |
| 13 | Format gate | Output format matches pre-task contract (deck is a deck, one-pager is one page, etc.) |

## Role-specific Mini-Kernels
- **Research agent**: job = build source-grounded structure supporting visual storytelling; prefer Mind Maps / Reports / source curation / logic strips / evidence notes BEFORE deck generation; NOT to summarize everything
- **Strategy agent**: job = turn complexity into decision architecture; highlight trade-offs / criteria / preferred option / recommendation path; use Data Tables before final deck
- **Design/packaging agent**: job = visual fit / hook / reading order / emphasis / hierarchy / cognitive noise reduction; create attention through contrast + metaphor + rhythm → pay off with proof; delete anything not carrying information
- **QA agent**: audit horizontal logic / vertical logic / hook strength / post-slide-3 retention / evidence integrity / accessibility / revise-rebuild correctness / export readiness; reject: vague titles / decorative visuals / unsupported claims / repetitive frame rhythm / mode mismatch

## Ultra-short Law (Part XIX — all BMAD agents)
```
Do not start with slides.
Start with reader, outcome, logic strip, page jobs, source integrity, visual function.
Use NotebookLM as a multi-artifact system.
Generate cheap understanding artifacts first, then high-commitment artifacts.
Rebuild when thought changes. Revise when execution changes.
No decorative visuals. No vague titles. No unsupported claims.
```

## Production Checklists

### A1. Pre-generation
- [ ] Communication mode correct (deck / one-pager / infographic / report)
- [ ] Reader model fixed (who, prior knowledge, decision, time, device)
- [ ] Big Idea formulated as judgment not topic
- [ ] Titles-only logic strip exists and tells the story alone
- [ ] Slide/Page Manifest exists
- [ ] Style/Anti-cliche Note created
- [ ] Attention Concept Note created in 2+ variants
- [ ] Critical assumptions raised from comments/footnotes to explicit content
- [ ] Visual references added as separate sources
- [ ] Source freshness checked
- [ ] Active source subset cleaned

### A2. Attention and sequence
- [ ] First screen understood in 5 sec
- [ ] One focal point on first screen
- [ ] Energy holds after screen 3
- [ ] Proof slide after strong metaphor
- [ ] Frame types alternate
- [ ] CTA is low-threshold and specific

### A3. Pre-export (Stop Gate 3)
- [ ] Evidence claims spot-checked via chat citations
- [ ] Summary page present
- [ ] Appendix path present
- [ ] No decorative clutter
- [ ] Charts annotated
- [ ] Accessibility gate passed
- [ ] Revise/rebuild choice was correct
- [ ] Exported file reviewed independently
- [ ] All visible copy in target language (including diagram labels, parentheticals, stamps)
- [ ] No placeholder text artifacts (font names, template labels, UI chrome)
- [ ] Format matches pre-task contract

### A4. Red flags (reject if present)
- [ ] Titles sound like topics not conclusions
- [ ] Visuals generic not specific
- [ ] Deck starts from production not reader problem
- [ ] Website URLs treated as full visual references
- [ ] Comments/footnotes contain critical info NLM will not carry
- [ ] Every option looks visually equal despite recommendation
- [ ] Charts have no direct verbal takeaway
- [ ] Hook lives only on slide 1 and dies by slide 3
- [ ] Metaphor not paid off with proof
- [ ] Appendix missing
- [ ] English visible copy in diagram labels or diagram UI chrome
- [ ] Format does not match pre-task contract
