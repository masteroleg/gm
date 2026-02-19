# UX Design Document Extraction Index

## Task Completion Summary

**Objective:** Extract ALL complete discussions about genu.im landing page design from Claude CLI JSONL sessions to reconstruct full conversation flow and create comprehensive UX Design Document.

**Status:** ✅ COMPLETE - 15 major design decisions documented with full reasoning

---

## Source Files Analyzed

### Primary Sources (Largest, Most Relevant)
1. **d0cd1940-c774-432a-9f3f-d27724b57e60.jsonl** (1,244 lines)
   - **Type:** Creative/Party Mode session
   - **Content:** Multi-agent creative workshop with 20+ expert personas
   - **Key Discussions:** Three emotional design concepts (Proof/Moment/Signal), visual branding, animation specs, vertical-specific passport design
   - **Participants:** Caravaggio (Art Director), Sophia (Storyteller), Sally (UX Designer), Victor (Strategy), Winston (Architect), Carson (Brainstorming), Mary (Business Analyst), and 13+ other agents

2. **c35eadbf-3b34-4ab1-b9c8-8bf7341a04b6.jsonl** (406 lines)
   - **Type:** PRD/Planning session  
   - **Content:** Strategic product architecture, three-tier epic framework, stakeholder alignment
   - **Key Discussions:** "Single flow, three resonances" model, "Тиха сила" principle, Epic 1-3 definitions, vertical passport strategy
   - **Participants:** PM John, architects, business analysts

3. **23dabb41-704e-4689-abcc-d2d41e432f90.jsonl** (104 lines)
   - **Type:** Supporting context
   - **Content:** Confirmation, refinement of earlier decisions

---

## 15 Major Design Decisions Documented

### Group 1: Emotional & Visual Approach (3 decisions)

#### Decision 1: Three Emotional Design Concepts
**Discussed in:** d0cd1940 (Party Mode, Creative workshop)
**Key Agent:** Caravaggio (Art Director)
**Decision Outcome:** Use different concepts for different contexts
- **Concept A "The Proof"** (Documentary) → Landing page
- **Concept B "The Moment"** (Cinematic) → Verification badge animation  
- **Concept C "The Signal"** (Technical) → Loading state
**Reasoning:** Each moment needs different emotional resonance. Landing needs trust (institutional), verification needs emotion (relief), loading needs assurance (working).
**Rejected:** Using single concept across all pages (reduced emotional impact)
**Metrics:** User perception testing on trustworthiness vs. memorability

#### Decision 2: "Тиха Сила" (Quiet Strength) as Core Principle
**Discussed in:** c35eadbf (PRD session), d0cd1940 (Architecture round)
**Key Agent:** Winston (Architect), influenced by Mary (Business Analyst context)
**Decision Outcome:** Function = Trust. Not "wow-design" but "works as it should"
**Reasoning:** Riffing with Diya.gov.ua (Ukrainian gov digital service) transfers subconscious trust. Ukraine context demands reliability over novelty.
**Implementation Details:**
- < 1 second load time
- Service worker offline support (Ukraine 2026 blackouts)
- Minimal unnecessary animation
- No continuous loops (signals "system struggling")
**Rejected:** Cinematic/dramatic branding (reads as "marketing" not "document")
**Metrics:** Lighthouse performance score ≥ 95, load time < 2.5s

#### Decision 3: Color System & Palette
**Discussed in:** d0cd1940 (Visual workshop)
**Key Agent:** Caravaggio (Art Director)
**Decision Outcome:**
- **Light Theme:** Champagne (#f5f2ed) + Green (#0d8a4f) + White
- **Dark Theme:** Slate + Muted green
- **Four-State Palette:** AUTHENTIC (green), SUSPICIOUS (amber), NOT FOUND (red), OFFLINE (slate)
**Reasoning:** Champagne = warm, not aggressive. Green = "all ok" (not tech-startup blue). Warm palette feels Ukrainian, accessible.
**Rejected:** Dark/dramatic modern colors (reduces trust perception)
**Typography:** Inter (body) + IBM Plex Mono (codes/legal) for hierarchy
**Metrics:** WCAG 2.1 AA contrast ratios (4.5:1 minimum)

---

### Group 2: Platform Architecture (2 decisions)

#### Decision 4: Three-Epic Platform Structure
**Discussed in:** c35eadbf (PRD session)
**Key Agents:** Winston (Architect), Victor (Strategy)
**Decision Outcome:**
- **Epic 1:** Landing Page (genu.im/) - vitrine, B2B pitch, SEO
- **Epic 2:** Verification Pages (genu.im/v/{code}) - THE PRODUCT, proof-of-concept
- **Epic 3:** B2B Portal (genu.im/portal/) - client dashboard, retention
**Reasoning:** 
> "Epic 2 — not 'second priority.' By business significance, it's Epic #1. Landing = showcase window. Portal = tool. But `/v/` = the actual product. Every QR code scan leads here." – Victor
**Strategic Value:** Most-visited page becomes the main sales channel
**Rejected:** Single-page approach (loses strategic differentiation)
**Metrics:** Verification volume 25M+ codes/year, Portal DAU tracking

#### Decision 5: Single Flow, Three Resonances (not three separate audiences)
**Discussed in:** c35eadbf (Sophia, Storyteller)
**Key Agent:** Sophia (Master Storyteller)
**Decision Outcome:** One unified narrative hits three emotional triggers simultaneously
- **CEO hears:** Compliance + risk mitigation
- **Marketer hears:** Data + analytics opportunity
- **Consumer hears:** Safety + authenticity
**Reasoning:** Each section naturally resonates without explicit "For you, X" segmentation
**Implementation:** 
- Hero (universal)
- How It Works (3 steps showing all perspectives)
- Three-Track Cards (Mark, Analytics, Verify—addressing pain points)
- Scale (25M+ products—trust through volume)
**Rejected:** Separate B2B and B2C sections (creates confusion, longer scroll)
**Metrics:** Conversion rates by persona (tracked via GA segments)

---

### Group 3: Verification Page Design (2 decisions)

#### Decision 6: "Case File → Verdict" Visual Metaphor for Verification Page
**Discussed in:** d0cd1940 (Caravaggio, Sophia multi-round workshop)
**Key Agents:** Caravaggio (Visual), Sophia (Narrative), Sally (UX)
**Decision Outcome:** Page is an investigation protocol, not just a result display
**Structure:**
1. Mini-header with Case ID: `GENU-2026-02-18-A4X7` (date-stamped, legal weight)
2. Verdict badge (animated reveal)
3. Scan history (evidence timeline)
4. What was checked (evidence summary)
5. Actions (share, verify another)
**Reasoning:** 
> "You don't 'certify.' You issue a verdict on code-to-code matching. The page is a case file protocol. Evidence. Verdict." – Caravaggio
**Rejected:** Simple checkbox approach (reduces trust perception)
**Metrics:** Time on page > 15 sec, share click-through

#### Decision 7: Four-State Verdict System with Specific Colors
**Discussed in:** d0cd1940 (Caravaggio + Mary workshop, pre-mortem analysis)
**Key Agents:** Caravaggio (Visual), Mary (Business risk analysis)
**Decision Outcome:**
| State | Color | Emotion | When |
|-------|-------|---------|------|
| AUTHENTIC | #0d8a4f (green) | Confidence | Code verified, first scan |
| SUSPICIOUS | #b45309 (amber) | Caution | Code scanned 3+ times previously |
| NOT FOUND | #b91c1c (red) | Alert | Code not in registry |
| OFFLINE | #475569 (slate) | Technical | No connection, try again |
**Reasoning:** 
- Amber not yellow (yellow = childish)
- Red not bright (stress without panic)
- Slate neutral (issue is technical, not verdict failure)
**Critical Insight (from Mary):**
> "SUSPICIOUS isn't 'alert buyer to fake.' It's 'this code has been checked N times before.' For brands, internal quality checks are normal. SUSPICIOUS needs configurable threshold." 
**Rejected:** Simple green/red binary (loses nuance)
**Metrics:** SUSPICIOUS adoption rate, legal team approval

---

### Group 4: Vertical-Specific Passports (1 decision)

#### Decision 8: One Template, Multiple Themes (JSON + CSS Modifiers)
**Discussed in:** c35eadbf (Winston, Victor architecture round)
**Key Agents:** Winston (Architecture), Victor (GTM strategy)
**Decision Outcome:**
```
/v/{code} routes:
- /v/genuim         → Platform showcase
- /v/genuim-alco    → Alcohol vertical (warm, celebratory)
- /v/genuim-tobacco → Tobacco vertical (strict, compliance)
- /v/genuim-food    → Food vertical (fresh, natural)
- /v/XXXXXX         → Real code (Phase 2)
```
**Implementation:**
```
Single index.html + index.js
JSON per vertical with:
- theme color
- emotion text
- pr
