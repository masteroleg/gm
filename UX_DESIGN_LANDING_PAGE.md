# UX Design Document — genu.im Landing Page

**Status:** Extracted from Claude CLI sessions (d0cd1940, c35eadbf, 23dabb41)  
**Date:** 2026-02-19  
**Owner:** Sally (UX Designer) & Creative Team  
**Version:** 1.0 - Complete

---

## PART I: DESIGN PHILOSOPHY & PRINCIPLES

### "Тиха сила" (Quiet Strength) — Core Principle

**Definition:** Not wow-design. **Works like it should.**

**Context:** Ukraine 2026, fourth year of war. Drama is exhausting. People need **reliability, not spectacle**.

**Reference:** Riff with Diya.gov.ua aesthetic (Ukrainian government digital services) — transfers subconscious trust through familiarity. But **genu.im is NOT mimicking government** (unlike competitor Sytecs). It's **independent, own brand, transparent**.

**Implementation Rules:**
- Page load < 2.5s (no slow fade-ins)
- Service worker offline cache (Ukraine blackouts reality)
- Minimal unnecessary animation (continuous loops signal "system struggling")
- No cinematic reveals or delays
- Function trumps novelty

**Success Metric:** Lighthouse Performance ≥95, LCP <2.5s, CLS <0.1

---

## PART II: EMOTIONAL FRAMEWORK

### Three Audiences, One Narrative

**NOT** three separate content tracks. **ONE flow that hits three emotional triggers simultaneously.**

| Audience | Emotion | Context | What They Need |
|----------|---------|---------|-----------------|
| **CEO / Owner** | **Fear** | Compliance fines (eАкциз), counterfeits on market | Assurance that system is built by people who understand their risk |
| **Marketing / Brand Manager** | **Opportunity** | No data on where/when products sell | Proof that analytics will give them competitive insight |
| **Consumer** | **Safety** | "Will I get poisoned? Did I overpay for a fake?" | Crystal-clear, 2-second verdict they can trust |

**Key Insight:** Each narrative section naturally resonates with all three without explicit segmentation ("For CEOs:" / "For Marketers:"). The product itself is the proof.

---

## PART III: NARRATIVE ARC & SECTIONS

### Landing Page Flow (Emotional Arc)

```
┌─────────────────────────────────────────────────────────┐
│  HERO: "Справжнє" (The Real Thing)                      │
│  Emotion: Calm authority. Q: "Ви впевнені?" A: "Ми — так." │
│  → Opens with doubt (all audiences feel it)             │
│  → Answers with confidence (relief)                     │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  "ЯК ЦЕ ПРАЦЮЄ" (How It Works)                           │
│  3 steps showing all perspectives:                       │
│  1. Виробник маркує (Manufacturer marks)                │
│  2. Покупець сканує (Buyer scans)                       │
│  3. Отримує підтвердження (Gets confirmation)          │
│  Emotion: Understanding. "I can see myself in this."    │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  "ТРИ ТРЕКИ" (Three Tracks) — Card Section              │
│  For every role:                                        │
│  • 🔒 Захист бренду (Brand Protection)                 │
│  • 📊 Аналітика (Analytics)                            │
│  • ✅ Довіра споживача (Consumer Trust)                │
│  Emotion: "This is about me." Resonance moment.        │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  📡 "СИГНАЛИ" (Signals)                                  │
│  Operational updates. Real-time proof it's alive:       │
│  • 3-4 recent operational lines (hardcoded MVP)         │
│  • Dynamic JSON — Phase 2                               │
│  Emotion: "This platform is current and working now."   │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  📋 "РОЗСЛІДУВАННЯ" (Investigations)                     │
│  2 long-form case studies:                              │
│  • "Як розпізнати контрафакт коньяку" (How to spot…)   │
│  • "eАкциз: що змінюється для виробників" (What's new)│
│  Emotion: "They know the topic deeply." Credibility.    │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  "ПЕРЕВІРТЕ СВІЙ БРЕНД" (Check Your Brand) — FORM       │
│  Only AFTER all the warmup above.                       │
│  3 fields: Company name, Phone, Vertical (dropdown)    │
│  → Goes to Telegram Bot (MVP) + Formspree fallback      │
│  Emotion: "I'm ready to join this." Conversion.         │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  FOOTER: Контакти (Contacts)                            │
│  Phone (clickable tel:) + Telegram link                 │
│  Principle: "You know how to reach us right away."     │
└─────────────────────────────────────────────────────────┘
```

---

## PART IV: VISUAL DESIGN SYSTEM

### 4.1 Color Palette

**Light Theme:**
- **Primary:** Champagne `#f5f2ed` (warm, not cold tech-white)
- **Brand:** Green `#0d8a4f` (all-ok signal, not startup blue)
- **Neutral:** White, light grays

**Dark Theme:**
- **Primary:** Slate `#1e293b`
- **Brand:** Muted green `#059669`

**Reasoning:** Champagne feels Ukrainian, accessible. Green = calm authority ("all is well"), not tech disruption.

**Four-State Verdict System (for `/v/` pages):**
| State | Color | Use |
|-------|-------|-----|
| AUTHENTIC | `#0d8a4f` (green) | Code verified |
| SUSPICIOUS | `#b45309` (amber) | Scanned 3+ times before |
| NOT FOUND | `#b91c1c` (red) | Code not in registry |
| OFFLINE | `#475569` (slate) | No connection |

**Note on SUSPICIOUS:** Not "alert, fake detected!" but "code previously checked by system." For manufacturers, internal QA rescans are normal. **Configurable threshold** (default: 5 checks) to balance consumer caution with B2B operations.

---

### 4.2 Typography

- **Body:** Inter (grotesque, professional)
- **Codes/Timestamps:** IBM Plex Mono or JetBrains Mono (monospace for legal weight)
- **Fallback:** System fonts (San Francisco, Segoe)

**Mobile-First Scale:**
- Display (Hero): 32px
- Heading (Section): 20px
- Body: 16px
- Caption/Meta: 12px

**Principle:** Readable on iPhone SE (375×667) without zoom.

---

### 4.3 Three Visual Concepts (Hybrid Usage)

**Concept A — "The Proof" (Documentary Rigor)**
- White background, monospaced elements
- Surgical precision, institutional trust feel
- Used for: Landing page, hero, card layouts
- Emotion: Authority, thoroughness

**Concept B — "The Moment" (Cinematic)**
- Dark background, spotlight reveal
- Spring easing animations (630ms badge reveal)
- Used for: Verification page badge animation
- Emotion: Relief, impact

**Concept C — "The Signal" (Tech)**
- Animated radar pulses (two only, then stop)
- Green waveform on dark
- Used for: Loading state only
- Emotion: "System is working"

**Hybrid Resolution:** Use A for stability + micro-element from C for assurance. Document that "breathes" without gasping.

---

## PART V: THE VERIFICATION PAGE (`/v/{code}`)

### 5.1 Concept: "Case File → Verdict"

**Metaphor:** Not a certification badge. An **investigation protocol**.

**Page Structure:**
1. **Mini-header** with Case ID: `GENU-2026-02-18-A4X7` (date-stamped, legal weight)
2. **Verdict badge** (animated reveal with spring easing)
3. **Scan history** (evidence timeline showing previous checks)
4. **What was checked** (evidence summary: batch, line, date, etc.)
5. **Actions** (share result, verify another code)

**Below the fold:**
- Trust explanation: "Code stored by manufacturer, not us. Real-time check. SLA 99.9%"
- Link back to landing: "Що таке genu.im?" + CTA "Підключити бренд"

---

### 5.2 Animation Spec

**Badge Reveal (630ms total):**
1. **0–200ms:** Darken background
2. **200–480ms:** Spring scale badge (`scale(1.8) → scale(1.0)`)
   - Easing: `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (bouncy spring)
   - Ring expand simultaneously
3. **480–630ms:** Lighten background
4. **630ms+:** Hold final state

**Effect:** Physical stamp landing on paper. Satisfying but quick.

**Loading State:**
- Two radar pulses (300ms gap)
- Then STOP (no third pulse)
- Reason: Third pulse = "still searching" → feels stuck → trust drops

---

### 5.3 Vertical-Specific Passports

**Architecture:** One HTML + JS, JSON data per vertical, CSS theme modifiers

```
Routes:
- /v/genuim         → Platform passport (showcase)
- /v/genuim-alco    → Alcohol vertical (warm, celebratory style)
- /v/genuim-tobacco → Tobacco vertical (strict, compliance tone)
- /v/genuim-food    → Food vertical (fresh, natural)
- /v/XXXXXX         → Real code API (Phase 2)
```

**Implementation:**
```javascript
// Single index.html + index.js
const verticals = {
  "alco": { accent: "#d97706", surface: "#fef3c7", message: "Святкування розпочинається..." },
  "tobacco": { accent: "#7c3aed", surface: "#ede9fe", message: "Дотримання спокійне..." },
  "food": { accent: "#10b981", surface: "#d1fae5", message: "Свіжість гарантована..." }
}
document.documentElement.style.setProperty('--accent', verticals[code].accent)
```

Each vertical tells a **different micro-story** but maintains brand DNA (champagne + green base).

---

## PART VI: LANDING PAGE SECTIONS (Detailed)

### 6.1 Hero Section

**Copy:**
```
Headline: "Ви впевнені?" (Are you sure?)
Subheading: "Ми — так." (We are.)
CTA: "Подивитись як це працює" → /v/genuim (demo verification)
```

**Visual:** Calm, no animation on load. Three badge icons below:
- ✅ СПРАВЖНЄ (Verified)
- ⚡ РЕАЛЬНИЙ ЧАС (Real-time)
- 👁️ ПРОЗОРО (Transparent)

**Requirement:** Hero + CTA visible without scroll on 375×667 (iPhone SE)

---

### 6.2 "How It Works" Section

**Three steps with icons:**
1. 📍 Виробник маркує → (Manufacturer adds unique code during production)
2. 📱 Покупець сканує → (Consumer scans QR from packaging)
3. ✅ Отримує підтвердження → (Gets instant verdict: authentic/not found/suspicious/offline)

**Tone:** Simple, process-focused. Each step is universal—works for all three audiences.

---

### 6.3 "Three Tracks" Card Section

**Three equal cards:**

| Card | Icon | Title | Copy |
|------|------|-------|------|
| 1 | 🔒 | Захист бренду | "Контрафакт вбиває. Ми знаємо, як його зупинити." |
| 2 | 📊 | Аналітика | "Де сканують? Хто? Як часто? Тобі важливо знати." |
| 3 | ✅ | Довіра | "Залік — це безпека. Покупець впевнений — повертається." |

**Each resonates:**
- CEO hears compliance + risk control
- Marketer hears data opportunity
- Consumer hears safety assurance

---

### 6.4 Сигнали (Signals) Section

**Header:** "Що відбувається на платформі" (What's happening on platform)

**MVP Implementation:** 3–4 hardcoded lines of recent operational updates
```
• 2026-02-19 14:30 — Нові правила еАкциз введені в дію
• 2026-02-18 09:15 — 1.2M кодів перевірено в алкогольній вертикалі
• 2026-02-17 16:45 — Твердження про найпопулярнішу регіональну марку
```

**Phase 2:** Dynamic JSON update, social proof ticker

**Emotion:** "Платформа жива. Реальний час. Справді працює."

---

### 6.5 Розслідування (Investigations) Section

**Two case study cards:**

**Card 1:** "Як розпізнати контрафакт коньяку" (How to spot counterfeit cognac)
- Long-form article link (`/cases/001.html`)
- Thumbnail image
- 1–2 line summary

**Card 2:** "eАкциз: Що змінюється для виробників" (eAktsyz changes)
- Link to `/cases/002.html`
- Thumbnail
- Summary

**Tone:** Journalistic, depth, credibility.

**Content Responsibility:** User commits to updating ≥1 signal per 2 weeks. Otherwise landing looks "dead."

---

### 6.6 Form: "Перевірте свій бренд" (Check Your Brand)

**Fields:**
1. Company name (text)
2. Phone (tel)
3. Vertical (dropdown: alcohol, tobacco, food, cosmetics, other)

**Submission:**
- Primary: Telegram Bot (MVP)
- Fallback: Formspree or mailto

**Confirmation:** "✅ ПЕРЕВІРЕНО. Справа #2026-02-47"
- Visual: Stamp animation (small version of verdict badge)
- Tone: Official but warm

**Placement:** Only AFTER all content sections. User has already been warmed up.

---

### 6.7 Footer: Контакти (Contacts)

- Phone (clickable `tel:` link)
- Telegram (direct link)
- Appears in header + footer + under form

**Principle:** "You know how to reach us right now."

---

## PART VII: SUCCESS CRITERIA

### User Success

**Consumer:**
- Scan QR → Page loads <1s → Verdict in ≤2s total → Clear state (AUTHENTIC/SUSPICIOUS/NOT FOUND/OFFLINE) → Micro-ritual feels official

**CEO/Owner:**
- Landing load <30s → Understands "what this is" and "why I need it" → Hero + CTA visible without scroll → Tries demo verification → Sees "Підключити бренд" CTA

**Marketer:**
- Sees analytics promise → Tries demo → Imagines competitive insight → Requests consultation

### Business Success

| Metric | Target | Type |
|--------|--------|------|
| Visitor → Lead conversion | ≥3% | Product KPI |
| Landing → Demo click | ≥30% | Product KPI |
| Demo → Form submit | ≥10% | Product KPI |
| Avg session duration | ≥45s | Product KPI |
| Lighthouse Performance | ≥95 | Technical KPI |
| LCP (Largest Contentful Paint) | <2.5s | Technical KPI |
| First B2B client (alcohol/tobacco) | 6 months | Business goal |

### Content Readiness at Launch

- ≥2 investigations published
- ≥8 signals ready
- Demo code texts ready (`genuim`, `genuim-alco`)

---

## PART VIII: TECHNICAL CONSTRAINTS & TRADE-OFFS

### Architecture Decision: Three Epics

| Epic | URL | Stack | When |
|------|-----|-------|------|
| 1. Landing | `/` | Static HTML + Tailwind CSS + JS | MVP (Now) |
| 2. Verification | `/v/{code}` | Static HTML + JSON + JS | MVP (Now) |
| 3. B2B Portal | `/portal/` | SPA, MSAL.js, Azure AD | Phase 2 (6+ months) |

**Critical Note:** Epic 2 is NOT "secondary." By traffic, it's #1. Every QR scan is a sales opportunity.

---

### Technical Constants

```javascript
const VERIFICATION_RITUAL_DURATION = 1000 // ms
const SUSPICIOUS_CHECK_THRESHOLD = 5 // nbChecks before amber state
const OFFLINE_RETRY_ATTEMPTS = 3
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000 // 7 days
```

---

### Performance Targets

- **Lighthouse:** ≥95 across all categories
- **LCP:** <2.5s
- **CLS:** <0.1
- **FID:** <100ms
- **Service Worker:** Offline cache for landing + passport templates

---

## PART IX: IMPLEMENTATION ROADMAP

### Phase 1 — Epic 1 & 2 (MVP, 4–6 weeks)

1. **Week 1–2:** HTML structure + Tailwind build
   - Hero section
   - How It Works
   - Three Tracks cards
   - Signals section (hardcoded)
   - Form + thank you confirmation

2. **Week 2–3:** Verification page (`/v/`)
   - Single HTML + JS architecture
   - JSON data for `genuim` + `genuim-alco`
   - Four-state verdict system
   - Badge animation (spring easing)

3. **Week 3–4:** Investigations section
   - 2 case study pages (`/cases/001.html`, `/cases/002.html`)
   - Link integration into landing

4. **Week 4–5:** Multilingual + Accessibility
   - EN/UK i18n using data-i18n attributes
   - WCAG 2.1 AA compliance check
   - Keyboard navigation
   - Screen reader testing

5. **Week 5–6:** Testing + Optimization
   - E2E Playwright tests (theme toggle, form submission, mobile menu)
   - Lighthouse optimization
   - Load testing
   - Production build & GitHub Pages deploy

---

### Phase 2 — Epic 3 (Portal, 3+ months)

- CTO leads detailed architecture doc (framework choice: Vue/Petite-Vue vs vanilla)
- MSAL.js Azure AD integration
- 10+ dashboard screens
- Migrate to Azure Static Web Apps

---

## PART X: RISKS & MITIGATION

### Pre-Mortem: 6 Key Risks

| # | Risk | Impact | Mitigation |
|---|------|--------|-----------|
| 1 | API onboarding complexity | B2B sales friction | Provide CSV upload + Pro upgrade path |
| 2 | SUSPICIOUS state blocks sales | Manufacturer resistance | Configurable threshold + education |
| 3 | Low consumer engagement | Weak analytics foundation | Brand push, viral og:image |
| 4 | Minimalist design feels cheap | Trust perception drops | Spring easing badge = impact without drama |
| 5 | Offline untested | Failure in blackout scenario | E2E + Playwright offline simulation tests |
| 6 | Portal 10+ screens in vanilla JS | Maintenance burden | Use Petite-Vue for Epic 3 |

---

## PART XI: DECISION RECORD

This document captures **15 major design decisions** with full reasoning:

1. **Three Emotional Concepts** (A/B/C, hybrid usage)
2. **"Тиха сила" Core Principle** (reliability over novelty)
3. **Color System** (champagne + green, four-state verdict)
4. **Three-Epic Architecture** (landing → verification → portal)
5. **Single Flow, Three Resonances** (one narrative, three audience hits)
6. **"Case File → Verdict" Metaphor** (investigation frame)
7. **Four-State Verdict System** (AUTHENTIC/SUSPICIOUS/NOT FOUND/OFFLINE)
8. **Vertical-Specific Passports** (one template, JSON+CSS themes)
9. **Animation Spec** (badge spring easing 630ms, loading pulses)
10. **Hero Copy Strategy** (Q/A emotional hit)
11. **Accessibility Requirements** (WCAG 2.1 AA, keyboard nav)
12. **Performance Targets** (Lighthouse ≥95, LCP <2.5s)
13. **PRE-MORTEM Risks** (6 identified + mitigations)
14. **Multilingual Strategy** (EN + UK, data-i18n pattern)
15. **Business Success Criteria** (conversions, engagement, launches)

**All reasoning preserved from:** Claude CLI sessions (d0cd1940, c35eadbf, 23dabb41)

---

## Appendix: Related Documents

- **PRD:** `_bmad-output/planning-artifacts/prd.md`
- **Product Brief:** `_bmad-output/planning-artifacts/product-brief-gm-2026-02-18.md`
- **CLAUDE.md:** Product vision, tech stack, competitor analysis
- **AGENTS.md:** Development guidelines
- **Session Records:** `.claude-sessions/` (JSONL files with full conversation history)

---

**Version History:**
- v1.0 (2026-02-19) — Extracted from 3 major Claude CLI design sessions, 15 decisions documented
