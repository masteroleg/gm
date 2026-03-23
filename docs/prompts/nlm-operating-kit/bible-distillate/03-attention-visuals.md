---
type: bmad-distillate-section
section: 03 of 05
coverage: "Parts VIII-X — 3 attention thresholds, 5 retention laws, 10 attention moves, 16 visual moves, dataviz micro-rules"
---

This section covers Attention, Visual Moves, and Dataviz. Part 3 of 5 from BMAD Visual Storytelling Bible v4.

## Attention: Managed Function (not cosmetics)
- Attention has 4 managed functions: (1) establish first interpretation in 5 sec; (2) prove material is not a template in 30 sec; (3) sustain energy after screen 3; (4) pay off intrigue with proof

## 3 Attention Thresholds
- **Threshold 1 (5-sec hook)**: viewer must understand at least one of — what conflict is / what is main / why not generic / what metaphor explains subject. If viewer can only describe style but not meaning → screen failed
- **Threshold 2 (30-sec grip)**: material must prove relevance + professionalism + attention management + meaningful resolution promise. Key: strong first frame + clear heading hierarchy + readable takeaway + one dominant visual move
- **Threshold 3 (post-screen-3 retention)**: style novelty stops working alone after screen 3; only these retain: frame type variation / increasing proof / growing clarity / controlled rhythm: tension → proof → release → action. If slides 4-6 repeat same visual pattern → attention drops even if material looks expensive

## 5 Retention Laws
1. **Contrast law**: attention held where difference exists — before/after; chaos/control; risk/safe; patchwork/single-core; false path/correct path
2. **Increasing specificity law**: after first strong image → more concrete screen must follow (diagram / evidence panel / comparison table / role map / next step); otherwise viewer senses packaging without content
3. **Frame alternation law**: no 6 screens in same mode; strong sequence alternates: hero/statement → process/structure → evidence/proof → comparison/decision → next step/CTA
4. **Metaphor-with-proof-payment law**: visual metaphor valid only if: (1) simplifies real thought; (2) does not distort subject; (3) followed by proof slide — metaphor without proof slide = theater
5. **Diminishing theater law**: closer to decision → less pure show; more: subject matter / roles / stages / constraints / evidence fragments

## Anti-patterns (forbidden)
- Relying on style alone to hold attention
- Repeating same visual pattern 5 screens in a row
- Using metaphor without subsequent proof slide
- Making first screen beautiful but semantically empty
- Leaving comparison screen without visually highlighted preferred path
- Assembling CTA as if reader already agreed

## 10 Attention Moves (Atlas)
1. **Hero object** — instant focal center; use: first screen / new chapter / core materialization; form: one object + one thesis + minimal secondary; breaks when: 5 equal sub-points stuffed inside
2. **Dangerous gap** — shows gap/friction/bottleneck/risk; use: exception/integration-risk/failure-point slides; form: two sides + gap/friction-zone/break-line; breaks when: drama stronger than meaning of gap
3. **Controlled path** — converts chaos to clear route; use: onboarding/implementation/process/one-job decks; form: linear path/conveyor/sequence/flow; breaks when: path too long or no responsibility assignment
4. **Diagnostic lens** — reveals hidden problem location; use: when market talks about X but real issue is elsewhere; form: magnifier/spotlight/highlighted zone/zoom-in window; breaks when: lens leads to no concrete conclusion
5. **Before/After** — shows difference without long explanation; use: redesign/migration/risk-reduction/operational-simplification; breaks when: both states look visually similar
6. **False choice → true choice** — breaks surface decision, moves to correct frame; use: sales/strategy/architecture/buy-vs-build/patchwork-vs-core; form: two choice layers (apparent + real); breaks when: false choice looks unattractive/unrealistic
7. **Reveal sequence** — holds attention through controlled unveiling; form: screen 1 = conflict, screen 2 = where problem lives, screen 3 = solution logic; breaks when: reveal not paid off with clarity
8. **Evidence window** — places claim next to small readable proof fragment; use: after emotional/metaphorical frame; form: assertion + mini-table/callout/annotation/metric/quote; breaks when: proof fragment small/unreadable/secondary to chrome
9. **Reassurance map** — reduces anxiety by showing boundaries/roles/ownership/next steps; use: architecture/operating model/service scope/shared responsibility; breaks when: map becomes abstract tech diagram without human payoff
10. **Low-friction CTA frame** — converts interest to next safe action; use: final screen + executive/self-read sendouts; form: one small next step with low risk and clear deliverable; breaks when: CTA too generic ("зв'язатися", "обговорити")

## Attention Mini-Rubric (6 questions, fail 2+ = reject)
1. Viewer understands conflict in 5 seconds?
2. One explicit focal point on first screen?
3. Energy sustained after screen 3?
4. Proof slide appears after strong metaphor/emotional frame?
5. Frame types alternate across sequence?
6. Ends with low-friction CTA, not abstract call?

## NLM Tactics for Attention
- Before high-commitment deck: create 2-3 notes with different frames (metaphor frame / evidence-first frame / decision frame) → convert each to source → activate one at a time + core evidence sources → generate cheap artifact (Infographic or Report) → compare 5-sec clarity → only then generate Detailed Deck
- Hook testing pipeline: Reader Brief note → Big Idea note → 2-3 Attention Concept notes → convert to source → generate Infographic per concept → compare → then Detailed Deck
- "View custom prompt" on a working artifact → extract working phrases → reusable attention library
- Rhythm problem after screen 3 → rebuild sequence, NOT micro-revise individual slides

## Story-First Rebuild Protocol (added from production experience 2026-03-23)
- Problem: NLM generates "professional template" by default — correct content but zero emotional hook, zero visual variety, zero forwarding impulse
- Root cause: prompts describe WHAT to show but not WHO the reader is, what they FEAR, or what TRANSFORMATION they undergo
- Fix: rebuild Reader Brief as a story, not a spec:
  1. Define HERO (not "audience") — who they are, what they've been through, why they're skeptical
  2. Define ANTAGONIST — the false promise or illusion they've already seen through (e.g., "turnkey" illusion)
  3. Define TRANSFORMATION ARC — emotional journey from anxiety → recognition → clarity → confidence → safe action
  4. Formulate Big Idea as READER OUTCOME: "Ваш запуск не зупинить лінію" (not "genu.mark ізолює лінію")
  5. Define TILT — what makes this deck different from every other vendor deck in the stack
- Result: NLM treats the story elements as generation constraints and produces materially different output

## Slide Manifest with Visual Moves (added from production experience 2026-03-23)
- Problem: without explicit frame types, NLM repeats the same layout (card grid / bullet list) across all slides → attention dies at slide 3
- Fix: include a slide manifest in generation prompt that specifies EXACT visual move per slide
- Format:
  ```
  Slide N — FRAME_TYPE
  Purpose: [one sentence]
  Takeaway: "[Ukrainian outcome-focused title]"
  Visual move: [specific visual instruction]
  ```
- Must alternate frame types: hero_object → layered_system → before_after → process_flow → evidence_window → risk_stack → reassurance_map → comparison_table → cta
- Rule: NEVER three consecutive slides with the same frame type
- Visual move names map to the 16 Visual Moves Atlas above

## 16 Visual Moves (Atlas)
| # | Move | Cognitive Work | Form | Defect |
|---|---|---|---|---|
| 1 | Hero Fact | focus, emotionally mark, set stakes | one large number/fact + 1 supporting line + minimal secondary | 5 equal numbers nearby; no explanation why fact matters |
| 2 | Before/After Contrast | compare, make change legible | two symmetric zones + explicit contrast point | different lists without shared grid; no comparison criterion |
| 3 | Recommendation Stack | direct to decision | recommendation card + 2-4 reasons + short risk note | all options visually equal; recommendation buried |
| 4 | Comparison Table for Decision | reduce memory load, support choice | columns=options, rows=criteria, preferred cells highlighted | too many rows without grouping; equal formatting; no implied judgment |
| 5 | Process Flow | make process legible | steps + arrows + handoff labels + optional bottleneck marks | steps not in sequence; no handoff logic; looks like category list |
| 6 | Layered System View | structure complexity | vertical/horizontal layers with function labels | layers not distinguished by role; labels too long; no sense of stack |
| 7 | Evidence Panel | build trust via compact proof assembly | 2-4 mini evidence blocks under one takeaway + 1-line synthesis | evidence blocks unrelated; no synthesis line; too small/noisy |
| 8 | Annotated Screenshot | materialize problem, accelerate understanding | real screenshot + 2-5 callouts | screenshot without explanation; callouts competing; screenshot too small |
| 9 | Road to Decision | build reasoning path | 3-5 reasoning chain steps | logic leap; recommendation appears without path |
| 10 | Trade-off Matrix | make trade-offs visible | criteria vs options / quadrant | hidden cost of choice; looks like neutral catalog |
| 11 | Risk Stack | translate fear into manageability | risk → impact → mitigation | only risk list without mitigation; mitigation generic |
| 12 | Myth vs Reality | break old frame, replace with new | left column = misconception, right = grounded reality | right column too abstract; does not show why old model wrong |
| 13 | Summary Strip | orient and chunk | 3-5 compact takeaways in one summary band | summary looks like contents, not conclusions |
| 14 | Callout Ladder | step-decode complex visual | numbered callouts with short captions | callouts do not set order; text too long; too many callouts |
| 15 | Visual Metaphor | translate abstraction to image | use sparingly; must explain not decorate | clichéd icon instead of real metaphor; emotionally vivid but cognitively useless |
| 16 | Appendix Drill-down Table | move detail down, keep accessible | build via Data Table/Report; export to Sheets if needed | appendix table instead of summary in main body; no link back to main decision |

## Dataviz Micro-Rules
- Non-negotiable text on charts: descriptive title + explicit axis labels + annotations at key points + footnotes/methodology when needed; never assume "data speaks for itself"
- Decision-first routing: ask what reader must understand → what to compare → time period → what must stand out → whether decision signal needed → THEN choose chart type
- Quick routing: one dominant gap → bar/column; change over time → line; compare options on many attributes → comparison table; steps/delays → process flow; evidence summary → evidence panel; dense factual appendix → table
- Kill first when chart is noisy: unnecessary gridlines → duplicate legends → secondary colors → decorative borders → chartjunk
- Must remain: reading order / scale clarity / labels / source context / one obvious message
- Self-read chart ≠ live deck chart: self-read requires more words + annotations + context
- Evidence page law: reader must know — what we claim / where it is visible / why it matters / what interpretation limitations exist
