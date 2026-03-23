---
type: bmad-distillate
sources:
  - "../../../../../Users/fix/Downloads/BMAD_NotebookLM_Agent_Kernel_ru_v3.md"
downstream_consumer: "BMAD agents generating visual sales materials via NotebookLM for regulated B2B contexts"
created: "2026-03-23"
version: "4.2"
upgrades_from: "v4.1 → v4.2: added STORY-FIRST CHECK (hero/antagonist/transformation/tilt/slide manifest) to PRE-TASK CONTRACT; production-tested on Technical Deck rebuild"
token_estimate: 580
parts: 1
---

# BMAD NotebookLM Agent Kernel v4

## Mission
- Goal: build premium visual storytelling that earns attention in 5 seconds, holds it through proof, and converts through a clear next step
- Standard: every artifact must look and feel like it comes from a company the reader wants to work with — never a template, never a draft, never generic
- Default mode: if no speaker → self-read / leave-behind / pre-read; think slidedoc, not stage deck

---

## PRE-TASK CONTRACT (fix before any work begins)

Answer all six before touching sources or notes:

1. **ARTIFACT TYPE** — which NotebookLM artifact to generate?
   - `Infographic` → always 1 page (use for: one-pager, quick-forward asset, vendor-selection sheet, visual summary)
   - `Slide Deck` → always multi-slide (use for: executive deck, technical deck, decision deck, explainer)
   - `Report` → text-first (use for: memo, briefing, appendix)
   - Do not try to control page count — choose the right artifact type. Infographic = one page. Slide Deck = multi-slide. Always.

2. **LANGUAGE** — what language governs ALL visible copy?
   - Every headline, body block, diagram label, parenthetical, UI chrome, metadata, stamp
   - Approved exceptions only: brand names such as `genu.mark`, `Domino`, `ERP`
   - Mixed-language output = QA fail. English labels in diagrams = QA fail.

3. **TONE** — what is the primary communication intent?
   - `sell` → warm, outcome-focused, reader-benefit takeaways — reader feels "this is what I need"
   - `reassure` → calm, proof-led, risk-reducing — reader feels "this is safe"
   - `inform` → neutral, factual, architectural — reader understands the structure
   - `convert` → specific, low-friction, action-clear — reader knows the exact next step
   - For regulated sales-kit: primary = `sell`, secondary = `reassure`

4. **MODE** — self-read (no speaker) or speaker-support?
   - Self-read requires: summary-layer + appendix-layer + takeaway titles + more context
   - Speaker-support: less text, faster rhythm

5. **PREMIUM CHECK** — will this artifact pass the premium standard?
   - 5-sec impression: reader instantly feels "this is a serious company"
   - 30-sec value: reader understands their benefit, not our architecture
   - Zero resistance: nothing looks like a template, a draft, or generic output
   - Forwarding impulse: reader wants to send this to a colleague
   - If you cannot answer YES to all four → do not generate yet, refine the brief

6. **STORY-FIRST CHECK** (added v4.2) — is the Reader Brief a story, not a spec?
   - HERO defined? (not just "audience" — who they are, what they fear, why they're skeptical)
   - ANTAGONIST defined? (the false promise or illusion they've seen through)
   - TRANSFORMATION ARC defined? (emotional journey: anxiety → recognition → clarity → confidence → action)
   - BIG IDEA as READER OUTCOME? (what changes for THEM, not what the product does)
   - TILT defined? (what makes this deck different from every other vendor deck in the stack)
   - SLIDE MANIFEST with explicit visual move per slide? (mandatory for Slide Deck artifacts)
   - If any NO → do not generate yet, rebuild the Reader Brief as a story

---

## Four Mandatory Questions
1. What must change in the reader?
2. What Big Idea drives that change?
3. What exactly does each visual do at each step?
4. How does the NotebookLM chain produce the needed artifact?

If Q3 is unanswered → work not started.

---

## Non-Negotiable Rules (12)
1. Start with reader and outcome
2. Big Idea = one sentence (judgment, not topic)
3. Titles = takeaways, not topics
4. One screen = one cognitive job
5. Visuals must carry information — not decorate
6. Self-read needs summary-layer + appendix-layer
7. Hook must work within 5 seconds
8. Attention must hold after slide 3
9. Metaphor must be paid off with proof slide
10. Rebuild when logic/audience/architecture changes; revise when only execution changes; partial rebuild when tone/framing changes but structure stays (rebuild narrative notes, reuse visual direction)
11. Check claims via NotebookLM citations
12. *(See STOP GATE 3 — exported files QA)*

> Rules 3, 4, 5, 10 are expanded in `bible-distillate/01-doctrine-laws.md`

---

## Mandatory Workflow (12 steps + 3 STOP GATES)

1. Define: reader, decision, time budget, device context
2. Write Big Idea

> **STOP GATE 1** — after Step 2:
> Is this a judgment or a topic?
> BAD: "Про платформу eАкциз" / GOOD: "genu.mark ізолює виробничу лінію від зовнішнього хаосу"
> If it is a topic → rewrite before proceeding.

3. Write titles-only logic strip
4. Build page manifest: purpose / takeaway / proof / visual form / appendix?

> **STOP GATE 2** — after Step 4:
> Does every page/screen do exactly one cognitive job?
> Are takeaways formulated through reader outcome (not product feature)?
> Does the tone match the PRE-TASK CONTRACT tone (sell/reassure/inform/convert)?
> If any NO → fix the manifest before generating.

5. Create: Reader Brief note, Style note, ≥2 Attention Concept notes
6. Convert notes to sources
7. Clean active source subset
8. Generate cheap understanding artifacts first: Mind Map → Report → Data Table → Infographic
9. Test first-impression strength: Infographic or fast screenshot review
10. Generate high-commitment artifact: Detailed Deck for self-read
11. QA: citations, hook, visual fit, readability, accessibility

> **STOP GATE 3** — after export, before delivery:
> - [ ] Exported file reviewed independently (not just the notebook artifact)
> - [ ] All visible copy in correct language — including diagram labels, parentheticals, stamps, metadata
> - [ ] No placeholder text artifacts (font names, template labels, "Roboto Mono", "Control Panel")
> - [ ] No UI chrome leaked into content (no "High Risk/Low Risk", "Robotics Menu" type labels)
> - [ ] Citations/tables/layout not lost in export
> - [ ] Premium check: 5-sec impression + 30-sec value + zero template feel + forwarding impulse
> Fail any → do not ship

12. Export and re-check *(Stop Gate 3 is the re-check)*

---

## NotebookLM Laws
- Sources are static copies — must check freshness
- Website sources are NOT full visual references — add screenshots separately
- Critical footnotes/comments must be moved to explicit content — NLM will not carry them
- Mobile is limited; desktop is the full environment
- View custom prompt is mandatory for reverse engineering good artifacts
- Revisions do not fix broken narrative architecture — rebuild when logic changes

---

## Attention Routing
- hook → hero object / dangerous gap / startling fact / diagnostic lens
- explain → controlled path / process / architecture map
- persuade → false choice → true choice / comparison / reassurance map
- prove → evidence panel / annotated chart / table
- convert → low-friction CTA frame

> Expanded with 10 attention moves + 5 retention laws in `bible-distillate/03-attention-visuals.md`

---

## Red Flags + Known NLM Failure Modes

### Classic red flags
- Vague titles (topic labels instead of takeaways)
- Decorative stock imagery without cognitive function
- Charts without verbal takeaway
- All options look visually equal despite a recommended one
- Website URL treated as visual source
- Revise used to fix changed argument (rebuild instead)
- Hook dies by slide 3
- Metaphor has no proof slide after it
- No appendix for drill-down

### Known NLM-specific failure modes (from production experience)

| Failure | Description | Prevention |
| --- | --- | --- |
| **English label drift** | NLM generates diagram labels in English even when body copy is in target language | Explicitly state in prompt: "All visible copy including diagram labels must be in Ukrainian only" |
| **Wrong artifact type** | Agent requested Slide Deck when Infographic was needed, or vice versa | Choose the correct NLM artifact type in PRE-TASK CONTRACT. Infographic = always 1 page. Slide Deck = always multi-slide. |
| **Placeholder text leak** | Font names, template markers ("Roboto Mono", "Control Panel") appear as slide content | Check at Stop Gate 3; treat any non-content text as a QA fail |
| **UI chrome drift** | Template UI labels ("High Risk", "Low Risk / Safe", "Robotics Menu") leak into diagram content | Inspect all diagram elements at Stop Gate 3; flag and re-prompt |
| **Parenthetical language mix** | English in parentheses after Ukrainian terms ("Набір латок (Patchwork)") | Prohibit parenthetical translations in prompt; check all parentheticals at Stop Gate 3 |
| **Stamp/badge English** | English stamps ("APPROVED FOR AUDIT") on otherwise Ukrainian slides | Explicitly prohibit English stamps in prompt |

---

## QA Mini-Rubric (fail any = do not ship)
- [ ] Horizontal logic (titles alone tell the story)
- [ ] Hook strength in 5 seconds
- [ ] Retention after slide 3
- [ ] Vertical logic (each slide earns its place)
- [ ] Visual fit (form matches cognitive task)
- [ ] Evidence integrity (claims grounded and readable)
- [ ] Accessibility (contrast, text-on-image, text size)
- [ ] Export readiness (Stop Gate 3 passed)
- [ ] **Language gate** (all visible copy in target language, including labels)
- [ ] **Premium gate** (5-sec impression, zero template feel, forwarding impulse)

> Full QA rubric 100/100 with scoring: `bible-distillate/04-qa-export.md`

---

## Outcome Framing (mandatory for sales-kit)

Takeaways must be formulated through **reader outcome**, not product feature.

```
BAD:  "genu.mark ізолює виробничу лінію від зовнішніх збоїв"  (feature)
GOOD: "Ваш запуск проходить без зупинки лінії, бо ядро обробляє винятки до того, як вони дістануться до вас"  (outcome)

BAD:  "Єдиний конвеєр контролю"  (architecture)
GOOD: "Менше ручного хаосу — більше спокою щоранку"  (outcome + emotion)
```

Rule: if the takeaway describes what the product does → rewrite through what changes for the reader.

---

## NLM Quota Management SOP

NotebookLM free tier limits per account:
- 3 Slide Deck generations
- 3 Infographic generations

### Profile rotation algorithm (when quota exhausted)

1. Share the notebook with next available Google profile (one at a time)
2. Switch active profile:
   ```bash
   nlm login switch <profile-name>
   ```
3. Generate from the shared notebook using the new profile's quota
4. After generation: download the artifact, then switch back to primary profile
5. Track which profile was used in the run ledger

### Rules
- Share with ONE profile at a time — do not mass-share
- Each profile gives a fresh set of 3 + 3 quotas
- Keep a roster of available profiles in `08-notebooklm-registry.md`
- After artifact is downloaded, the sharing can be revoked if needed
- Primary profile remains the owner of all notebooks
