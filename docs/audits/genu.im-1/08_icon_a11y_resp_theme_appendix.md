# ICON / A11Y / RESP / THEME Specialty Pass Appendix

**Date:** 2026-03-17
**Scope:** All 11 pages, UA Mobile 390px primary

---

## ICON PASS

### Methodology
Visual inspection of all icon instances across mobile and desktop views. Checked: stroke weight, optical size, alignment with adjacent text, family consistency.

### Findings

| # | Location | Observation | Severity | Confidence |
|---|----------|-------------|----------|------------|
| 1 | Header (all pages) | Language icon (globe/text) and theme icon (sun/moon) are consistent in stroke weight (~2px) and style. | ✅ Pass | High |
| 2 | Hero "Verification Flow" card | Icons for Record (⊕), Scan (🔍), Proof (✓) are consistent stroke, same optical size, properly aligned with text. | ✅ Pass | High |
| 3 | Homepage scenario cards | Icons for eAktsyz and Brand Proof scenarios are consistent in weight and alignment. | ✅ Pass | High |
| 4 | Footer | No icons in footer — text-only links. | N/A | — |
| 5 | Request forms | Mail icon on CTA button is appropriately sized and aligned. | ✅ Pass | High |

**ICON PASS VERDICT: PASS.** No icon family mismatches, stroke inconsistencies, or alignment issues detected. The icon set appears to be from a single family with consistent parameters.

---

## A11Y PASS

### Methodology
Visual estimation of touch targets, contrast evaluation, semantic structure assessment.

### Findings

| ID | Location | Issue | Severity | Evidence |
|---|----------|-------|----------|----------|
| A11Y-001 | Header toggles (all pages, mobile) | Lang/theme toggles ~32px, below 44px min | Medium | Screenshot estimate |
| A11Y-002 | Footer links (all pages, mobile) | Text links ~24px height, closely spaced | High (compounded by IA-001) | Screenshot estimate |
| A11Y-003 | Homepage hero text | Green accent text (#00A86B-ish) on light background — likely passes AA for large text but needs instrumental verification | Suspected | Visual — needs contrast tool |
| A11Y-004 | Dark theme — green on dark | Green accent on dark background — likely passes but needs measurement | Suspected | Visual — needs contrast tool |

**LIMITATIONS:** No instrumental contrast measurement (Lighthouse/axe-core) was run. Touch target sizes are visual estimates. Focus-visible states not testable with current browser tool (requires Tab key navigation).

**A11Y PASS VERDICT: 2 VERIFIED ISSUES + 2 SUSPECTED.** Header and footer touch targets are undersized. Contrast needs instrumental verification.

---

## RESP PASS

### Methodology
Comparison of layout, content, and functionality between Mobile 390px and Desktop 1440px across all pages.

### Findings

| # | Aspect | Observation | Severity |
|---|--------|-------------|----------|
| 1 | Layout stacking | All sections properly stack from multi-column (desktop) to single-column (mobile). No horizontal overflow. | ✅ Pass |
| 2 | Text sizing | Font sizes appropriately scaled for mobile reading. No truncation observed. | ✅ Pass |
| 3 | Spacing/density | Consistent 16-24px side padding on mobile. Adequate breathing room. | ✅ Pass |
| 4 | Navigation | **CRITICAL:** Hamburger menu present only on homepage. See IA-001. | Critical |
| 5 | Verification Flow card | Card scales from side panel (desktop) to inline card (mobile) correctly. No QR code overlap or text collision. | ✅ Pass |
| 6 | Footer | Footer links are in horizontal inline wrap on mobile. Functional but touch targets too small (A11Y-002). | Medium |
| 7 | Request form | Form fields stack properly on mobile. CTA button is full-width and prominent. | ✅ Pass |

**RESP PASS VERDICT: 1 CRITICAL ISSUE (IA-001) + 1 MEDIUM (footer targets).** Layout responsive behavior is otherwise solid.

---

## THEME PARITY PASS

### Methodology
Comparison of Light and Dark themes on the same page, checking for visual consistency, readability, and missing elements.

### Findings

| # | Page | Light vs Dark | Observation | Severity |
|---|------|--------------|-------------|----------|
| 1 | Homepage hero | Parity ✅ | Text, icons, CTA, Verification card all render correctly in both themes. | Pass |
| 2 | Homepage scenarios | Parity ✅ | Card backgrounds appropriately adapt. | Pass |
| 3 | Privacy (mobile) | Parity ✅ | Text remains readable. Background/text contrast maintained. | Pass |
| 4 | Proof Example | Parity ✅ | Cards, disclaimer styling, source pills all consistent. | Pass |
| 5 | All pages — green accent | Needs verification | Green (#00A86B-ish) on dark background vs light background — visual appearance acceptable but contrast ratio not measured. | Suspected |

**THEME PARITY PASS VERDICT: PASS (with one contrast caveat).** No missing elements, no broken layouts, no readability failures between themes. Green accent contrast needs instrumental measurement.
