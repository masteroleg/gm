---
type: bmad-distillate-section
section: "06 of 06"
source: "serenakeyitan/awesome-notebookLM-prompts (github.com)"
coverage: "18 community prompts distilled — 4 applicable to regulated B2B, 14 filtered out; key tactical extractions + visual style recipes"
added: "2026-03-23"
---

# Community Prompt Atlas — NLM Visual Styles

Distillation of field-tested NLM/Kael.im prompts from the creative underground.
**Filter applied:** regulated B2B context, Ukrainian-market, "тиха сила" register.
**Result:** 4 of 18 prompts applicable. Full rejections listed at bottom.

---

## Applied Styles (4)

### Style A — Anti-Gravity / Living Artifact ⭐ PRIMARY for genu.im

**Source:** unlisted/bonus prompt in repo
**Register:** Apple-level clarity / Google DeepMind research decks / calm AI infrastructure
**Fit for genu.im:** PERFECT — aligns with "тиха сила", proof-first, regulated B2B

**Core philosophy:**
> "This system already works. We are just showing you."
> "If it feels 'fun', it's wrong. If it feels 'inevitable', it's right."

**Visual recipe:**
```yaml
background: pure white (#FFFFFF)
gradient_accents:
  colors: "blue → cyan → violet"
  opacity: very low
  placement: corners/edges only — NEVER behind text
  feel: "light / motion / energy / anti-gravity fields"
typography:
  style: "clean modern sans-serif, slightly rounded geometry, medium-bold"
  tone: "calm authority — not aggressive"
  hierarchy:
    h1: "large headline block"
    h2: "one concise explanatory sentence"
    body: "short bullet or paragraph blocks — no long paragraphs"
layout:
  default: left-aligned
  margins: wide
  whitespace: extensive
  structures:
    - "text left, visual right"
    - "three-column feature cards"
    - "one idea per slide"
  feel: "product docs turned into visuals"
icons: thin-line outline, consistent stroke, calm, no pixel art, no emojis
motion_implied: arrows / directional flow / sequential layouts — "systems in operation, not static diagrams"
```

**What to avoid (strict):**
- Thick borders, bright color blocks, collage, stickers, loud contrasts
- Pixel art, heavy shadows, corporate templates
- Anything that feels "fun" — this register is "inevitable"

**When to use:** Technical Deck, Architecture Deck, Evidence Pack, any self-read leave-behind where trust is the primary mechanism

---

### Style B — Swiss Style / Modern Newspaper (tactical extractions)

**Source:** Prompt 1 (mmmiyama_D, @x.com)
**Register:** Smart business media, intellectual + editorial
**Fit for genu.im:** TACTICAL — use specific rules, not full aesthetic

**Key tactics applicable to any deck:**

```
JUMP RATIO RULE
Headlines must occupy 30–50% of slide area.
Size ratio headline : body = 10:1 minimum.
"No half-hearted size differences allowed."

PUNCHLINE POSITIONING
Place the conclusion (key takeaway) with a "bam!" in the center,
or position it spilling off the edge for visual impact.
Never bury the punchline in body copy.

COVER SLIDE RULES
Ban "centered alignment" — use asymmetrical placement.
Title extremely off to top-left OR bottom-left.
OR: bold negative space for refinement.
Main title: 2–5 word visual anchor (e.g., "Liberation", "Collapse and Rebirth")
Subtitle: stabs at pain point and hints at resolution.
Composition: "Punch the eyes with the main title, stab the brain with the subtitle."

NEGATIVE SPACE AS LAYOUT ELEMENT
Layout = binary choice: negative space OR text.
Draw the eye through contrast: text-packed areas ↔ vast empty voids.
Empty space is not wasted space — it creates hierarchy.

SINGLE-MESSAGE RULE
"1 slide = 1 message" — explicit rule.
If you need to say two things → use two slides.
```

---

### Style C — Sharp-Edged Minimalism (Layout Catalog)

**Source:** Prompt 2 (yoshifujidesign, @x.com)
**Register:** Architectural, portfolio, restrained professional
**Fit for genu.im:** USE THE LAYOUT CATALOG — the named types map directly to our Slide Manifest

**Named layout types → mapping to our frames:**

| NLM Layout Name | Maps to our frame | Use case |
|---|---|---|
| Technical Drawing | layered_system_view | architecture diagrams (Slide 3, 4) |
| Dark Mode Diagram | evidence_window | constellation/network of events (Slide 8) |
| Two Columns (Problem vs Solution) | before_after | ERP roles comparison (Slide 4) |
| Arrow Steps | process_flow | line flow, aggregation (Slide 5) |
| Chart | evidence_window | metrics/data (Slide 8) |
| Vertical Timeline | road_to_decision | pilot → launch path (Slide 10) |
| Bubble Chart / Venn | layered_system_view | overlapping responsibility zones |
| Formula / Flow Diagram | process_flow | "A × B = C" for aggregation logic |

**Navigation system to reuse:**
```
Place "01. SECTION TITLE" (small, in caps) in top-left of every slide.
Provides structure without corporate feel.
```

**Tone:** "Professional, architectural, sharp-edged minimalism"
**Colors:** Base = light gray / white; Text = jet black; Accent = black lines; Optional dark mode for emphasis slides

---

### Style D — Neo-Retro Dev Deck (Content Patterns only — not aesthetic)

**Source:** Prompt 7
**Register:** Developer-centric, builder, confident
**Fit for genu.im:** USE CONTENT PATTERNS ONLY — not pixel art, not retro aesthetic

**Useful content patterns:**

```
ARCHITECTURE LAYER SLIDES (map to our Slide 2 hero_object, Slide 3 layered_system)
Each layer:
  - one color block
  - one icon
  - one bold title
  - one short explanatory line (max)
Stack feels like: Core → Integration → External

EVOLUTION / BEFORE-AFTER SLIDES (map to our Slide 4 before_after)
Left → right progression
Each step in its own box
Final state: visually larger and more prominent

MANIFESTO / THESIS SLIDES (map to our Slide 1 dangerous_gap, Slide 2 hero_object)
One huge headline in a boxed/framed layout
Minimal text
Surrounded by minimal supporting icons
"Feels like a statement, not documentation"

COPY TONE RULES (directly applicable):
  Good: "Agents execute tasks autonomously"
  Bad: "Empowering users with cutting-edge solutions"
  = Short / declarative / slightly opinionated / no marketing fluff
```

---

## Technique Extractions (style-independent)

### Technique 1: YAML Spec Format for Style Notes
- Source: Prompts 2, 12, 13, 14, 15, 16 — all use structured YAML for visual specs
- Benefit: NLM reads structured YAML as design constraints more reliably than prose
- Pattern:
```yaml
Global Design Settings:
  Tone: "..."
  Color Palette:
    Base: "..."
    Accent: "..."
  Typography:
    Headings: "..."
    Body: "..."
  Common Layout Rules:
    - "rule 1"
    - "rule 2"
Layout Variations:
  - Type: "name"
    Design: "one paragraph description"
```
- Recommendation: Rewrite our Style Note in NLM using YAML spec format for next generation

### Technique 2: Slide = Manifesto Frame
- Source: Prompt 7, Prompt 1
- Use when: hook slide, thesis slide, BIG IDEA slide
- Pattern: one huge headline in framed box + zero supporting copy + small accent icons
- Contrast: manifesto slides → evidence slides (never two manifesto slides in a row)

### Technique 3: Annotation / Blueprint Style for Technical Diagrams
- Source: Prompt 15 (Constructivism/Tech-Art)
- Pattern: fine grid background (graph paper feel) + architectural draft lines (0.5pt) + numbered callouts (Fig.1, Fig.2) + leader lines
- Use for: ERP boundary diagrams, line flow architecture, aggregation pipeline
- Colors: warm gray/beige background + neon accent for active elements + monochrome for static

### Technique 4: Screen-as-Hero for Evidence Slides
- Source: Prompt 12 (Studio/Premium)
- Pattern: real screenshot/UI occupies 70–80% of slide area; allow device to crop/overflow slide boundary
- Use for: Slide 8 (Reassurance Map — evidence trail, observability) — show the actual system
- Benefit: materializes the abstract "evidence trail" claim with real product UI

### Technique 5: Progressive Color Signaling
- Source: Prompt 7 (Neo-Retro Dev Deck)
- Pattern: each layer/zone in architecture gets ONE dominant color block with thick black borders
- Mapping: Core (one color) / ERP zone (another) / External/eАкциз (third)
- Benefit: reader instantly recognizes which contour they're looking at on any slide

---

## Style Break Technique (important correction)

**These styles are NOT "rejected" — they are situational.**

A style break is an intentional single-slide departure from the deck's primary visual register to create maximum emotional contrast at a specific moment. Used correctly, a style break:
- Stops scanning behavior — reader sees something unexpected, slows down
- Amplifies the contrast between "before" (problem/chaos) and "after" (solution/calm)
- Creates a memorable anchor — "the slide that looked like a newspaper" sticks in memory
- Works best: problem slides, urgency slides, chaos-before slides, dramatic transitions

**The rule:** one style break per deck maximum. The surrounding slides must return to the primary style (Anti-Gravity). The break earns its impact from the contrast.

---

## Situational Style Breaks — When to Use

### PANIC / CHAOS SLIDES

**Yellow × Black Editorial (Prompt 3 / Prompt 1 Swiss variant)**
When to use: Slide showing the problem state — manual code chaos, line stops, regulatory fine risk, "what happens without a system"
Effect: reader instantly reads "emergency / breaking news / crisis"
Technique:
```
Yellow background (#FFCC00 or hotter), black text, large bold headlines occupying 30–50% of area.
Layout like a newspaper front page: one giant crisis headline + small sub-headline stabbing at pain.
Optional: red accent (#FF3333) for the most alarming number (% of spoilage, fine size, line downtime hours).
"Punch the eyes with the panic. Stab the brain with the cost."
```
Example use for genu.im: Slide showing "що відбувається при ручному перенесенні кодів між системами" — a "panic publication" front page with the actual numbers (errors, rework, line stops).

**Black × Orange Agency (Prompt 4)**
When to use: Urgency slide, competitive pressure slide, "eАкциз deadline is real" hook
Effect: high-energy, urgent, action-demanding
Technique: white bg + black text + blood orange accent for the critical element (date, fine, risk)

---

### BEFORE / CONTRAST SLIDES

**Vitamin Pop / Digital Neo (Prompt 16)**
When to use: Showing the chaotic "before" state — manual process, multiple disconnected systems, no single source of truth
Effect: visual overload → SNS chaos → feels like the real experience of managing codes manually
Technique:
```
Overlapping amoeba shapes, multiple bright clashing colors, chat bubbles, competing arrows.
Use INTENTIONALLY as "chaos diagram" — the mess IS the message.
Contrast: this slide → next slide returns to calm Anti-Gravity order.
```
Example: "Як це виглядає без системи" — chaotic infographic of the current manual state.

**Magazine Style (Prompt 6)**
When to use: Customer perspective slide, "what the operator experiences" moment, testimonial-style
Effect: soft, human, relatable — shifts register to the person, not the system
Technique: cutout photo of operator at line, speech bubble with their pain point, asymmetric layout

---

### HIGH-ENERGY / COMPETITIVE SLIDES

**Sports / Athletic / Energy (Prompt 13)**
When to use: Competitive positioning slide, "we vs them" moment, speed/market pressure framing
Effect: fast, decisive, aggressive — reader feels competitive urgency
Technique:
```
Dark background, Bolt Lime (#CCFF00) accent, italic bold type, diagonal cuts.
VS layout: diagonal divide — "competitors" on one side, "genu.mark approach" on other.
```
Use sparingly — one slide max, only if competitive pressure is part of the narrative.

---

### ARTISTIC / MEMORABLE SLIDES

**Constructivism/Tech-Art — Neon (Prompt 15)**
When to use: Architecture overview slide, "intelligence of the system" moment
Effect: intellectual, avant-garde, memorable — feels like a research paper turned visual
Technique: warm beige background + neon yellow geometry + monochrome cutout photos + blueprint lines
Already partially captured in Technique 3 (Blueprint Annotation) above.

**Anti-Gravity variant — Dark Mode (from Prompt 2 layout)**
When to use: Final CTA slide, or a key thesis/manifesto moment mid-deck
Effect: cinematic, high-stakes, premium
Technique: jet black background + centered small visual + emotional tagline in white + maximum white space

---

### SITUATIONAL DECISION MAP

| Moment in deck | Style break to use | Primary style returns |
|---|---|---|
| Problem slide (chaos / manual process) | Yellow×Black Panic or Vitamin Pop chaos | Yes — immediately after |
| Regulatory urgency hook | Black×Orange (eАкциз deadline) | Yes |
| Human/operator perspective | Magazine Style (cutout + speech bubble) | Yes |
| Competitive positioning | Sports/Athletic VS layout | Yes |
| Architecture showpiece | Constructivism / Blueprint Art | Yes |
| Final CTA | Dark Mode (cinematic) | N/A — final slide |

**Important:** announce style break in the NLM prompt explicitly:
```
Slide 2 — STYLE BREAK: use Yellow × Black panic newspaper aesthetic for this slide only.
The surrounding slides use Anti-Gravity (white, calm, minimal).
This slide shows the PROBLEM — visual chaos = intentional.
Return to Anti-Gravity on Slide 3.
```

---

## Remaining Styles — Situational Use Cases

**No style is "wrong." Every style becomes a tool when applied to the right moment.**
The question is never "is this style appropriate for B2B?" — it's "which emotional moment in which document calls for this register?"

---

### Manga / Comic Strip (Prompt 5)
**Core idea:** "Understanding deepens with fun. Turn information into a comic with a story."
**When to use:**
- Operator training materials — showing a "day in the life" error scenario (code mismatch → line stop → inspector arrives)
- Onboarding deck for production staff, not buyers
- ONE style-break slide showing the chaos of manual process as a brief comic strip (3 panels: problem → escalation → cost)
**Condition:** consumer-facing or staff-facing documents only. NEVER in a primary B2B sales deck. Exception: one shock-humor slide in a "problem" chapter if the audience is operators, not CTOs.
**Prompt element to borrow:** "relate it to your own situation, easier to remember" — the memory anchor principle. Use the comic narrative even without the visual style (tell it as a story).

---

### Pink Street-Style (Prompt 8)
**Core idea:** Pop + flat + street + squishy shapes + thick outlines
**When to use:**
- Consumer-facing materials — genu.mark **verification passport** (the page consumers scan at a QR code)
- Retail / FMCG brand-facing content — showing what the consumer experience looks like
- "This is how your end-customer will interact with the mark" slide in a B2B pitch — shown as a mockup/screenshot context
**Condition:** never in technical or sales deck directly. Correct context: "here's what the consumer sees" framing — the pink style IS the consumer UI, shown inside a neutral Anti-Gravity frame.
**Note for genu.im:** the verification passport (`/v/genuim-alco`, `/v/genuim-food`) could legitimately use a softer, more vibrant consumer register — this style is the reference point.

---

### Mincho × Handwritten Mix (Prompt 9)
**Core idea:** Fashion editorial typography, dynamic serif + handwriting + stickers + scrapbook energy
**When to use:**
- Premium food / alcohol / cosmetics producer context — the traceability story told as a premium brand narrative
- "Provenance is a brand asset" slide — showing how traceability becomes marketing value
- Case study for premium FMCG client where brand aesthetics matter as much as compliance
**Condition:** only when the CLIENT'S brand register is artisanal / premium / editorial. A tobacco manufacturer → use Anti-Gravity. A craft spirits producer → this style may be the correct framing for how THEY think about provenance.
**Prompt element to borrow:** "pop and chic touches like handwriting or stickers" — handwritten annotations over a clean diagram can add personality to a case study or testimonial slide without compromising the overall deck register.

---

### Seminar Minimal (Prompt 10)
**Core idea:** White + black + red accent + sans-serif + fashion portrait photo + dynamic typography
**When to use:**
- Expert credibility slides — featuring a specialist, auditor, or partner
- Event/webinar announcement materials — inviting buyers to a technical session
- Speaker support deck for a seminar or conference presentation (different from leave-behind)
- Team slide — "who you'll work with" in a deck where human faces build trust
**Condition:** works for any document where a PERSON needs to be the focal point. The fashion-portrait treatment applied to an industrial expert creates an unexpected premium contrast that elevates trust.
**Prompt element to borrow:** "high-quality photo like a fashion portrait, dynamic typography" — applied to a real expert photo, this creates a memorable credibility moment.

---

### Royal Blue × Red Watercolor (Prompt 11)
**Core idea:** Wet watercolor texture, artistic, emotional, painterly
**When to use:**
- Brand story slide — "why traceability matters" emotional narrative, provenance as cultural value
- Intro slide for a premium producer client (wine, spirits, specialty food) where craftsmanship is identity
- The "human cost of counterfeiting" moment — when the story needs emotional weight, not just data
- Cover of a thought-leadership document, not a sales deck
**Condition:** never for technical content. Correct moment: pure emotional narrative before the proof begins. One slide, maximum. The watercolor says "this matters beyond compliance" — what follows must be proof.
**Alternative use:** background texture (very subtle) for a testimonial or case study pull-quote slide.

---

### Vitamin Pop / SNS Chaos (Prompt 16) — extended use cases
*(already in Style Breaks above for chaos diagrams)*
**Additional use cases:**
- Consumer app mockup slides — showing what the end-user mobile experience looks like
- Startup / accelerator pitch context (if genu.im positions in that context)
- "How competitors' non-systems look" — the deliberately chaotic infographic showing what life without structure looks like
- Social media content / LinkedIn posts derived from deck content (different output format)
**Condition for B2B deck:** always frame as "this is THEIR world before / this is the consumer layer" — Vitamin Pop = the chaos or the consumer. Anti-Gravity = the solution layer that the CTO buys.

---

### Deformed Flat Persona (Prompt 18)
**Core idea:** Simple flat color human figures, thick outlines, 3 colors max, solid background
**When to use:**
- Responsibility mapping slides — showing ROLES as humans, not boxes. "Who does what" becomes visual when people are represented as figures, not org-chart nodes.
- Operator onboarding documents — step-by-step SOP where a person figure moves through the process
- "Journey map" slide — operator / QC inspector / audit inspector each shown as a distinct persona
- Any slide where HUMAN OWNERSHIP matters more than system architecture
**Condition:** works best in process/SOP context. For B2B sales deck: ONE slide showing "your team's journey during implementation" as flat personas can humanize the technical narrative. Must be flat, minimal — no detail.
**Prompt element to borrow:** "up to 3 colors, thick outline, solid flat background" — use the visual grammar of deformed flat persona even if generating in a different tool. Simple role figures = memorable responsibility maps.

---

## Complete Style × Moment Matrix

| Style | Sales Deck | Technical Deck | Training / SOP | Consumer-Facing | Premium Brand | Event / Seminar |
|---|---|---|---|---|---|---|
| Anti-Gravity (A) | ✅ PRIMARY | ✅ PRIMARY | ✅ | — | ✅ | ✅ |
| Swiss / Newspaper (B) | ✅ tactics | ✅ tactics | — | — | — | — |
| Sharp Minimalism (C) | ✅ layout | ✅ layout | — | — | ✅ | ✅ |
| Dev Deck patterns (D) | — | ✅ content | ✅ | — | — | — |
| Yellow×Black PANIC | 1 slide (problem) | 1 slide (chaos) | ✅ problem | — | — | — |
| Black×Orange URGENCY | 1 slide (deadline) | 1 slide (risk) | — | — | — | — |
| Magazine HUMAN | 1 slide (persona) | — | ✅ | — | ✅ | — |
| Sports COMPETITIVE | — | — | — | — | — | 1 slide |
| Constructivism ART | — | 1 slide (arch) | — | — | ✅ | ✅ |
| Dark Mode CTA | 1 slide (final) | 1 slide (final) | — | — | ✅ | ✅ |
| Manga / Comic | — | — | ✅ PRIMARY | — | — | — |
| Pink Street | — | — | — | ✅ PRIMARY | — | — |
| Mincho Editorial | — | — | — | — | ✅ PRIMARY | — |
| Seminar Minimal | — | — | — | — | — | ✅ PRIMARY |
| Watercolor | — | — | — | — | ✅ cover | — |
| Vitamin Pop | 1 slide (chaos) | — | — | ✅ | — | — |
| Flat Persona | 1 slide (roles) | 1 slide (resp.) | ✅ PRIMARY | — | — | — |
| Deformed Persona | — | — | ✅ | — | — | — |

---

## Quick Applicability Map

| Our Asset | Primary Style | Tactics to Apply |
|---|---|---|
| Technical Deck (P0 #1) | A (Anti-Gravity) | B jump-ratio, B punchline, D manifesto-frame, Technique 4 screen-as-hero |
| Why Us one-pager (P0 #2) | A (Anti-Gravity) | B asymmetric cover, B negative-space, D manifesto frame for headline |
| One Job infographic (P0 #3) | A (Anti-Gravity) | D manifesto frame, B punchline positioning |
| Evidence Pack (P1 #4) | A (Anti-Gravity) | Technique 4 screen-as-hero, Technique 3 blueprint annotation |
| Executive Deck (P2 #6) | A (Anti-Gravity) | B Swiss Style asymmetry, C navigation system |
