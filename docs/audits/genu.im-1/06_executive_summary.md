# Sprint 3 Final Summary — genu.im Proper Audit

**Date:** 2026-03-17
**Coverage:** 38 of ~44 required states (86%)
**Sprints completed:** Sprint 1, Sprint 2, Sprint 3
**Primary audit mode:** UA-first, mobile-priority, desktop-mandatory

---

## Diagnosis

genu.im has a clear product narrative and a functioning proof-layer product with 25M+ marked units in production. However, the public website contains one critical architectural defect, several trust-eroding copy issues, and a conversion path that relies on mail-client behavior rather than structured lead capture.

### What Sprint 3 changed

Sprint 3 expanded coverage from 41% to 86% and resolved all outstanding candidate items:
- **IA-001 scope expanded:** navigation is missing on ALL secondary pages at ALL viewports (mobile, tablet, desktop) — not just mobile as originally reported. W3C directly emphasizes that repeated navigation must be predictable and consistent between pages.
- **4 candidates closed** by evidence (DOM, CSS, contrast measurement) — not by opinion.
- **VIS-002 promoted** from candidate to verified High after wider coverage.
- **A11Y-001 downgraded** to Low after CSS measurement confirmed it passes WCAG 2.2 minimum.

---

## Active Verified Defects (12)

### Critical (1)
| ID | Finding | Effort | Owner |
|---|---|---|---|
| IA-001 | Navigation missing on ALL secondary pages — **all viewports** | S | FE |

### High (8)
| ID | Finding | Effort | Owner |
|---|---|---|---|
| TRUST-001 | Disclaimer overload on Proof Example (4 → 1) | S | Content + Design |
| TRUST-002 | Source types visually undifferentiated | XS | Design |
| TRUST-003 | "Phase 1" language on Proof Example | XS | Content |
| TRUST-004 | Knowledge page: Phase 1 placeholder | XS | Product + Content |
| TRUST-005 | Privacy: "starter / Phase 1" language | XS | Legal + Content |
| TRUST-006 | Terms: "starter / Phase 1" language | XS | Legal + Content |
| CONV-002 | Request flows use `mailto:` handoff | S–M | Product + FE |
| VIS-002 | Empty hero right panel (all states) | M | Design + FE |

### Medium (2)
| ID | Finding | Effort | Owner |
|---|---|---|---|
| COPY-001 | Token-like homepage pills | XS | Product (PO) |
| COPY-002 | "NDA case" jargon | XS | Content |

### Low (1)
| ID | Finding | Effort | Owner |
|---|---|---|---|
| A11Y-001 | Theme toggle 26.4px (passes WCAG 24px, below 44px best practice) | XS | FE |

---

## Closed Items (4) — Evidence-Based

| ID | Was | Resolution | Method |
|---|---|---|---|
| L10N-001 | High candidate | Not reproduced | DOM: 9 sections identical EN/UA |
| A11Y-002 | High | Not an issue | CSS: footer 44px min-height |
| A11Y-003 | Suspected | Not an issue | Contrast ~7.2:1 passes AA |
| A11Y-004 | Suspected | Not an issue | Contrast ~11.5:1 passes AA |

---

## Founder / Strategic Track (NOT a defect)
- **STRAT-001** — Domino/Omron disclosure. Remains separate. Needs founder approval.

---

## Effort Profile
- **6 items at XS:** TRUST-002/003/004/005/006, COPY-002, A11Y-001
- **3 items at S:** IA-001, TRUST-001, CONV-002 (low end)
- **2 items at M:** VIS-002, CONV-002 (high end)
- **1 item PO decision:** COPY-001

Most of the backlog is copy cleanup and one template fix. This is not a full site rebuild.

---

## Acknowledged Limitations
- Lighthouse CI baseline: not run (browser agent tool limitation)
- Focus/keyboard testing: not testable in current toolchain
- Safari: N/A (Windows environment)
- ~6 remaining states: Dark modes for secondary pages EN/UA desktop
- Contrast ratios estimated from oklch values, not axe-core measured

---

## What Happens Next
1. Fix IA-001 (single shared header template)
2. Fix trust-language: TRUST-003/004/005/006 (UA rewrites ready)
3. Fix disclaimer consolidation: TRUST-001
4. Fix source differentiation: TRUST-002
5. Clarify and implement CONV-002 path
6. Close remaining coverage gaps and limitations
7. Only then: founder-track / authority additions
