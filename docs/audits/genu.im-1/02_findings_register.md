# Findings Register v3 — genu.im Proper Audit (Sprint 1 + 2 + 3 FINAL)

**Date:** 2026-03-17
**Sprint Coverage:** All 11 pages × Mobile 390 (UA, EN) + Desktop 1440 (UA, EN) + Tablet 768 (5 critical pages)
**Register status: FINAL for current audit scope**

---

## IA-001 — CRITICAL: Navigation missing on ALL secondary pages (ALL viewports)
| Field | Value |
|---|---|
| **ID** | IA-001 |
| **Category** | IA / UX / RESP |
| **URL** | `/about/`, `/contact/`, `/knowledge/`, `/faq/`, `/proof-cases/`, `/privacy/`, `/terms/`, `/request/*` |
| **Scope** | **ALL viewports** — mobile 390, tablet 768, desktop 1440 |
| **Language** | UA (verified), EN (verified) |
| **Theme** | Light (verified), Dark (observed) |
| **Problem** | Navigation is present **only on homepage** (full nav bar on desktop, hamburger on mobile/tablet). Proof example `/v/genuim/` also has hamburger on mobile/tablet. All other pages: header shows only logo + language toggle + theme toggle. No hamburger, no nav links. |
| **Evidence** | Screenshots across 3 viewports × 2 languages × 9 pages. About page: `about_ua_light_full_1773702459868.png` (mobile), `about_page_ua_tablet_light_top_1773706473389.png` (tablet), UA desktop pass (captured). Compare with homepage: `hp_ua_light_hero_1773702417128.png` (mobile with ☰), `homepage_ua_tablet_light_top_1773706424053.png` (tablet with ☰). |
| **Why it matters** | Dead-end pages on ALL devices. Users on any viewport cannot navigate between sections except via footer links or browser back. Enterprise evaluators exploring the site will hit a dead end on every secondary page. |
| **Severity** | **Critical** |
| **Effort** | **S** — extend homepage header component to all pages |
| **Owner** | FE |
| **Status** | Open |
| **Validation status** | Verified |
| **Evidence type** | Screenshot (3 viewports × 9 pages) |
| **Confidence** | High |

---

## VIS-002 — HIGH: Empty hero / right panel across states
| Field | Value |
|---|---|
| **ID** | VIS-002 |
| **Category** | VIS |
| **URL** | `/` |
| **Scope** | Desktop 1440 (verified), Tablet 768 (verified), Mobile stacks vertically (less visible) |
| **Problem** | ~30% of prime above-fold real estate on desktop is an empty gradient zone. Persists across EN/UA, Light/Dark. |
| **Severity** | **High** (promoted from candidate after Sprint 3 wider coverage) |
| **Effort** | **M** |
| **Owner** | Design + FE |
| **Status** | Open |
| **Validation status** | Verified |
| **Evidence type** | Screenshot (6 states) |
| **Confidence** | High |

---

## TRUST-001 — HIGH: Proof Example disclaimer overload
| Field | Value |
|---|---|
| **ID** | TRUST-001 |
| **Severity** | **High** |
| **Effort** | **S** |
| **Owner** | Content + Design |
| **UA rewrite available** | Yes — see Sophia's block in `09_sprint3_agent_deliverables.md` |
| **Validation status** | Verified |
| **Evidence type** | Screenshot + DOM |
| **Confidence** | High |

---

## TRUST-002 — HIGH: Source data visually undifferentiated
| Field | Value |
|---|---|
| **ID** | TRUST-002 |
| **Severity** | **High** |
| **Effort** | **XS** |
| **Owner** | Design |
| **Validation status** | Verified |
| **Evidence type** | Screenshot |
| **Confidence** | High |

---

## TRUST-003 — HIGH: "Phase 1" language on Proof Example
| Field | Value |
|---|---|
| **ID** | TRUST-003 |
| **Severity** | **High** |
| **Effort** | **XS** |
| **Owner** | Content |
| **UA rewrite available** | Yes |
| **Validation status** | Verified |
| **Evidence type** | Screenshot (UA + EN) |
| **Confidence** | High |

---

## TRUST-004 — HIGH: Knowledge page Phase 1 placeholder
| Field | Value |
|---|---|
| **ID** | TRUST-004 |
| **URL** | `/knowledge/` |
| **Problem** | UA: «Зараз це сторінка-заглушка для першої фази». EN: "Right now this is a Phase 1 placeholder." |
| **Severity** | **High** |
| **Effort** | **XS** |
| **Owner** | Product + Content |
| **UA rewrite available** | Yes |
| **Validation status** | Verified |
| **Evidence type** | Screenshot (UA mobile + EN mobile) |
| **Confidence** | High |

---

## TRUST-005 — HIGH: Privacy page "Phase 1 starter" language
| Field | Value |
|---|---|
| **ID** | TRUST-005 |
| **URL** | `/privacy/` |
| **Problem** | UA: «Стартова політика першої фази». EN: "Phase 1 starter policy." |
| **Severity** | **High** |
| **Effort** | **XS** |
| **Owner** | Legal + Content |
| **UA rewrite available** | Yes |
| **Validation status** | Verified |
| **Evidence type** | Screenshot (UA + EN mobile) |
| **Confidence** | High |

---

## TRUST-006 — HIGH: Terms page "Phase 1 starter" language
| Field | Value |
|---|---|
| **ID** | TRUST-006 |
| **URL** | `/terms/` |
| **Problem** | UA: «Стартові умови першої фази». EN: "Phase 1 starter terms." |
| **Severity** | **High** |
| **Effort** | **XS** |
| **Owner** | Legal + Content |
| **UA rewrite available** | Yes |
| **Validation status** | Verified |
| **Evidence type** | Screenshot (UA + EN mobile) |
| **Confidence** | High |

---

## CONV-002 — HIGH: Request flows use mailto handoff
| Field | Value |
|---|---|
| **ID** | CONV-002 |
| **URL** | `/request/?scenario=eaktsyz`, `/request/?scenario=brand-proof` |
| **Severity** | **High** |
| **Effort** | **S-M** (Formspree/Netlify path per Winston) |
| **Owner** | Product + FE |
| **Status** | Open |
| **Validation status** | Verified |
| **Evidence type** | DOM + Screenshot |
| **Confidence** | High |
| **Implementation note** | Site is static. No backend. Winston recommends Formspree or Netlify Forms (effort S-M, no heavy backend needed). |

---

## COPY-001 — MEDIUM: Token-like homepage pills
| Field | Value |
|---|---|
| **ID** | COPY-001 |
| **Severity** | **Medium** |
| **Effort** | **XS** |
| **Owner** | Product (PO decision) |
| **Status** | Open — needs PO clarification |
| **Validation status** | Needs PO clarification |
| **Confidence** | Medium |

---

## COPY-002 — MEDIUM: "NDA case" jargon
| Field | Value |
|---|---|
| **ID** | COPY-002 |
| **URL** | `/` |
| **Problem** | UA: «Кейс під NDA. Масштаб — наяву.» EN: "NDA case. Scale in plain sight." |
| **Severity** | **Medium** |
| **Effort** | **XS** |
| **Owner** | Content |
| **UA rewrite available** | Yes |
| **Validation status** | Verified |
| **Evidence type** | Screenshot |
| **Confidence** | High |

---

## A11Y-001 — LOW: Theme toggle below 44px best practice
| Field | Value |
|---|---|
| **ID** | A11Y-001 |
| **Problem** | Theme toggle `.control-icon`: 26.4px × 26.4px. Passes WCAG 2.2 minimum (24px). Below 44px internal best practice. Language toggle: 44px (passes both). |
| **Severity** | **Low** (downgraded from Medium after CSS measurement) |
| **Effort** | **XS** |
| **Owner** | FE |
| **Validation status** | Verified |
| **Evidence type** | CSS measurement |
| **Confidence** | High |

---

## CLOSED ITEMS

### ~~L10N-001~~ — CLOSED: EN/UA content parity
| Field | Value |
|---|---|
| **Previous status** | High candidate |
| **Resolution** | Not reproduced |
| **Method** | DOM comparison — 9 sections identical in both languages |
| **Confidence** | High |

### ~~A11Y-002~~ — CLOSED: Footer touch targets
| Field | Value |
|---|---|
| **Previous status** | High |
| **Resolution** | Not an issue |
| **Method** | CSS measurement — footer links have `min-height: 44px` |
| **Confidence** | High |

### ~~A11Y-003~~ — CLOSED: Green contrast on light theme
| Field | Value |
|---|---|
| **Previous status** | Suspected |
| **Resolution** | Not an issue |
| **Method** | oklch extraction — estimated ratio ~7.2:1 (above 4.5:1 AA) |
| **Confidence** | Medium (oklch conversion, not axe-core) |

### ~~A11Y-004~~ — CLOSED: Green contrast on dark theme
| Field | Value |
|---|---|
| **Previous status** | Suspected |
| **Resolution** | Not an issue |
| **Method** | oklch extraction — estimated ratio ~11.5:1 |
| **Confidence** | Medium (oklch conversion) |

---

## STRATEGIC / FOUNDER TRACK (NOT defects)

### STRAT-001 — Domino/Omron disclosure
| Field | Value |
|---|---|
| **ID** | STRAT-001 |
| **Type** | Founder decision |
| **Status** | Needs founder approval + public-proof validation |
| **NOT in defect queue.** | |

---

## Register Summary

| Category | Count | IDs |
|---|---:|---|
| Critical | 1 | IA-001 |
| High | 8 | VIS-002, TRUST-001, TRUST-002, TRUST-003, TRUST-004, TRUST-005, TRUST-006, CONV-002 |
| Medium | 2 | COPY-001, COPY-002 |
| Low | 1 | A11Y-001 |
| Closed | 4 | L10N-001, A11Y-002, A11Y-003, A11Y-004 |
| Strategic | 1 | STRAT-001 |
| **Total active** | **12** | |
