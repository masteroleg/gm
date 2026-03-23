---
type: bmad-distillate-section
section: 05 of 05
coverage: "Parts XII-XIV — 5 tactical NLM recipes, 4 machine control YAML blocks, 9 prompt packs"
---

This section covers NLM Tactical Recipes and Prompt Packs. Part 5 of 5 from BMAD Visual Storytelling Bible v4.

## Tactical Recipes

### Recipe 1. Self-read Decision Deck (15 steps)
1. Create notebook for one project
2. Collect only relevant sources
3. Create Reader Brief note
4. Create Big Idea + Logic Strip note
5. Create Style/Mood/Anti-cliche note
6. Convert notes to source
7. Generate Mind Map (check topic structure)
8. Generate Report as briefing document
9. Generate Data Table if alternatives exist
10. Generate Infographic as story-test
11. Generate Detailed Deck
12. Verify claims via chat with citations
13. Batch revise local defects only
14. Export to PDF/PPTX
15. Post-export QA (Stop Gate 3)
- Rationale: Mind Map = architecture; Report = prose logic; Data Table = comparison logic; Infographic = story compression; Detailed Deck = final self-read deliverable

### Recipe 2. Technical Explainer (7 steps)
1. Sources with diagrams/specs/screenshots
2. Architecture note → convert to source
3. Mind Map
4. Report
5. Annotated visual strategy note
6. Detailed Deck: architecture + process + evidence screens
7. Appendix for definitions and edge cases

### Recipe 3. Training / SOP Packet (6 steps)
1. Process sources
2. Exception note
3. Data Table for steps/roles/exceptions
4. Infographic with process skeleton
5. Detailed Deck or Report-backed deck
6. Appendix for edge conditions

### Recipe 4. Executive Pre-read (6 steps)
1. Reader model focused on time scarcity
2. Big Idea
3. 5-title logic strip max for main route
4. Briefing report
5. Summary-first Detailed Deck
6. Appendix with drill-down

### Recipe 5. Reverse Engineering a Good Artifact (5 steps)
1. Open strong artifact
2. Use "View custom prompt"
3. Record: artifact type / prompt structure / visual move used / active source subset
4. Turn into reusable prompt pattern
5. Store in local recipe library

---

## Machine Control Layer (4 YAML blocks — load directly into agents)

### Artifact type selection (added v4.1)
```yaml
artifact_type_map:
  one_pager: Infographic        # always 1 page
  vendor_sheet: Infographic     # always 1 page
  quick_forward: Infographic    # always 1 page
  visual_summary: Infographic   # always 1 page
  executive_deck: Slide Deck    # always multi-slide
  technical_deck: Slide Deck    # always multi-slide
  decision_deck: Slide Deck     # always multi-slide
  explainer: Slide Deck         # always multi-slide
  briefing: Report              # text-first
  memo: Report                  # text-first

quota_management:
  slide_deck_limit_per_account: 3
  infographic_limit_per_account: 3
  rotation_method: share notebook with next profile → switch via nlm login switch <profile> → generate → download → switch back
  tracking: record profile used in run-ledger
```

### Core control block
```yaml
mode: self-read
objective: decision_support
audience:
  who: "..."
  prior_knowledge: "..."
  time_budget: "..."
  device_context: "..."
big_idea: "..."
constraints:
  no_decorative_imagery: true
  takeaway_titles_only: true
  evidence_required: true
  summary_plus_appendix: true
  rebuild_if_logic_changes: true
  revise_only_for_local_execution: true
  language_gate: "Ukrainian only; allowed exceptions: genu.mark, Domino, ERP"
  format_contract: "deck | one-pager | infographic"
```

### Slide manifest block
```yaml
pages:
  - id: 1
    purpose: executive_summary
    takeaway: "..."
    proof: ["..."]
    visual_function: orient
    visual_form: summary_strip
    density: medium
    appendix: false
  - id: 2
    purpose: problem
    takeaway: "..."
    proof: ["..."]
    visual_function: contrast
    visual_form: before_after
    density: medium
    appendix: false
```

### Source gate block
```yaml
source_policy:
  refresh_check: required
  use_subset_only: true
  add_visual_references_explicitly: true
  convert_notes_to_sources: true
  do_not_assume_website_visuals_transfer: true
  do_not_leave_critical_assumptions_in_comments_only: true
```

### QA gate block
```yaml
qa:
  horizontal_logic: required
  vertical_logic: required
  visual_fit: required
  evidence_integrity: required
  accessibility_gate: required
  export_handoff_check: required
  language_gate: required
  format_gate: required
```

---

## Prompt Packs (9 templates)

### Pack 1. Reader Brief Note
```
DOCUMENT TYPE
This is a self-read leave-behind document, not a live presentation.
AUDIENCE
[who reads it, what they know, what they need to decide]
GOAL
After reading, the audience should: 1. understand ... 2. agree that ... 3. act on ...
BIG IDEA
[one-sentence conclusion as judgment — formulated through READER OUTCOME, not product feature]
BAD: "genu.mark isolates the production line from external failures"
GOOD: "Your production launch stays calm because the core handles exceptions before they reach you"
TONE
[sell / reassure / inform / convert — pick primary + secondary]
For regulated sales-kit: primary = sell, secondary = reassure
PREMIUM STANDARD
- 5-sec impression: reader instantly feels "serious company"
- 30-sec value: reader understands their benefit
- Zero template feel: nothing looks generic or draft
- Forwarding impulse: reader wants to share this
```

### Pack 2. Style / Mood / Anti-cliche Note
Use YAML format — NLM reads structured specs more reliably than prose (from community prompt atlas):
```yaml
Global Design Settings:
  Tone: "Calm authority — confident, inevitable, not fun"
  Philosophy: "This system already works. We are just showing you."
  Register: "Apple-level clarity / DeepMind research decks / calm AI infrastructure"

Color Palette:
  Background: "#FFFFFF (pure white)"
  Text: "dark gray / near-black"
  Gradient Accents:
    Colors: "blue → cyan → violet, very low opacity"
    Placement: "corners/edges only — NEVER behind text"
    Feel: "light, motion, energy — not decoration"

Typography:
  Headlines: "clean modern sans-serif, slightly rounded, medium-bold, calm authority"
  Jump Ratio: "10:1 minimum — headline occupies 30-50% of slide area"
  Hierarchy: "large headline → one explanatory sentence → short bullets only"
  Rule: "no long paragraphs"

Layout Rules:
  - "1 slide = 1 message — non-negotiable"
  - "Default: left-aligned, wide margins, extensive whitespace"
  - "Punchline: place conclusion 'bam' in center OR spilling off edge — never bury in body"
  - "Cover: asymmetrical — title to top-left or bottom-left, NOT centered"
  - "Negative space is layout element: text-packed areas ↔ vast empty voids"
  - "Navigation: small '01. SECTION' in top-left of every slide"

Icons:
  Style: "thin-line outline, consistent stroke, calm, no pixel art, no emojis"
  Rule: "icons must carry cognitive function — no decoration"

Do Not Use:
  - "stock-photo clichés (gears, handshakes, puzzle pieces)"
  - "bright color blocks, thick borders, collage, stickers"
  - "decorative icons without cognitive function"
  - "vague section-title headings ('Проблема', 'Ринок') — every title must be a judgment"
  - "equal visual weight when one option is preferred"
  - "anything that feels 'fun' — this register is 'inevitable'"

Language Gate:
  All visible copy: "Ukrainian only"
  Diagram labels, parentheticals, stamps, metadata: "Ukrainian only"
  Allowed exceptions: "genu.mark, Domino, ERP"
```

### Pack 3. Detailed Deck Generation Prompt
```
Create a Detailed Deck meant to be read independently and shared as a leave-behind.
Audience: [who] / Goal: [what they must understand/decide]
Main takeaway: [one sentence — what changes for the READER, not what the product does]
Tone: [sell/reassure/inform/convert] — if sell: takeaways must be warm, outcome-focused, reader-benefit
Format: multi-slide PDF deck [state exact number of slides if known]
Language: All visible copy must be in Ukrainian only. This includes headline copy, body copy,
diagram labels, parenthetical annotations, UI chrome, stamps, metadata, and all other
visible text. Allowed exceptions: genu.mark, Domino, ERP. Do not generate English
parentheticals such as (Hardware) or (Patchwork). Do not generate English stamps such as
APPROVED FOR AUDIT. Do not generate English diagram labels where Ukrainian is possible.
Use: strong takeaway titles / self-contained slides / summary-first / appendix for deeper evidence /
visuals support specific point of each slide / no decorative imagery / prefer information-carrying visuals /
make each slide readable without presenter
Structure: 1.Executive summary 2.Context/problem 3.Evidence 4.Options/comparison 5.Recommendation
6.Risks/considerations 7.Appendix
Tone: [formal/analytical/advisory/technical]
Visual direction: [editorial/restrained/product-native/minimal]
Avoid: stock-photo cliches / vague titles / decorative icons / crowded charts / English labels
```

### Pack 4. Infographic Generation Prompt (always 1 page)
```
Create an Infographic. NLM Infographics are always single-page — do not request multi-page.
Purpose: [story-test before deck / standalone one-pager / quick-forward asset / vendor-selection sheet]
Takeaway: [one sentence — reader outcome, not product feature]
Audience: [who] / Detail level: Detailed / Orientation: Portrait / Style: Professional/Editorial
Language: All visible copy in Ukrainian only. Allowed exceptions: genu.mark, Domino, ERP.
Highlight: 3 key points + main relationship between them + core metrics only
Avoid decorative elements and generic visuals.
```

### Pack 5. Local Revise Prompt
```
Revise only the existing slides below. Do not change overall narrative.
Slide 2: rewrite title as clear takeaway; reduce decorative elements; make evidence easier to scan.
Slide 4: comparison slide — use clearer comparison structure and highlight preferred option.
Slide 5: visual does not match message — use information-carrying visual + brief annotations.
Global: keep self-read friendly and more editorial than presentation-like.
Language check: ensure all visible copy including diagram labels is in Ukrainian only.
```

### Pack 6. Attention Concept Note
```
ATTENTION GOAL
First screen must establish conflict within 5 seconds.
Deck must still feel stronger on slide 4 than on slide 1.
PREFERRED ATTENTION MOVE
[hero object / dangerous gap / controlled path / diagnostic lens / false choice→true choice / reassurance map]
HOOK RULES
- do not start with generic section opener; use one dominant visual move
- after hook, pay off with proof; vary frame types; end with low-friction CTA
```

### Pack 7. Infographic Hook Test Prompt
```
Create Infographic testing first-impression strength of this story.
Format: one-page vertical (single screen)
Language: Ukrainian only. Allowed exceptions: genu.mark, Domino, ERP.
Audience: [who] / Purpose: test hook, not replace final evidence deck.
Requirements: conflict visible in 5 sec; one dominant visual move only; no decorative clutter;
include one tiny proof fragment if possible; make preferred interpretation obvious.
At bottom: short line stating intended takeaway explicitly.
```

### Pack 8. Sequence Rebuild Prompt
```
Rebuild the sequence, not just the wording.
Current deck loses energy after slide 3.
New sequence rhythm: 1.conflict 2.where real problem lives 3.controlled path/structure 4.proof
5.recommendation 6.low-friction next step
Requirements: vary frame type slide-to-slide; one visual metaphor only if followed by proof;
reduce decorative chrome; keep self-read friendly.
Language: all visible copy in Ukrainian only including diagram labels and annotations.
```

### Pack 9. Video Overview Prompt
```
Create short Video Overview introducing topic structure and preparing audience for deeper self-read document.
Audience: [who] / Goal: orient, not replace evidence document.
Use clear sequence, restrained visual style, emphasize 3-5 key ideas only.
```
