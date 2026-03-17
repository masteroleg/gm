# Priority Matrices — Sprint 3 Final

## Matrix 1: Severity × Effort (Verified Defects)

| ID | Finding | Severity | Effort | Owner | Priority |
|---|---|---|---|---|---|
| IA-001 | Navigation missing on ALL secondary pages (**all viewports**, not just mobile) | Critical | S | FE | **P1 — Fix immediately** |
| TRUST-004 | Knowledge page: Phase 1 placeholder language | High | XS | Product + Content | **P1 — Fix immediately** |
| TRUST-005 | Privacy page: "starter / Phase 1" language | High | XS | Legal + Content | **P1 — Fix immediately** |
| TRUST-006 | Terms page: "starter / Phase 1" language | High | XS | Legal + Content | **P1 — Fix immediately** |
| TRUST-003 | Proof Example: "Phase 1" language | High | XS | Content | **P1 — Fix immediately** |
| TRUST-002 | Source types visually undifferentiated | High | XS | Design | **P1 — Fix immediately** |
| TRUST-001 | Proof Example disclaimer overload (4 → 1) | High | S | Content + Design | **P2 — Next** |
| VIS-002 | Empty hero right panel | High | M | Design + FE | **P2 — Next** |
| CONV-002 | Request flows use `mailto:` handoff | High | S-M | Product + FE | **P2 — Next** |
| COPY-002 | "NDA case" jargon | Medium | XS | Content | **P2 — Quick win** |
| COPY-001 | Token-like homepage pills | Medium | XS | Product (PO) | **P3 — PO decision** |
| A11Y-001 | Theme toggle 26.4px (passes WCAG, below 44px) | Low | XS | FE | **P3 — Nice to have** |

## Matrix 2: Closed Items (No Action Needed)

| ID | Finding | Resolution | Method |
|---|---|---|---|
| L10N-001 | EN/UA parity on Proof Example | Not reproduced | DOM comparison |
| A11Y-002 | Footer touch targets | Not an issue | CSS: 44px min-height |
| A11Y-003 | Green contrast on light | Not an issue | ~7.2:1 ratio |
| A11Y-004 | Green contrast on dark | Not an issue | ~11.5:1 ratio |

## Matrix 3: Strategic / Founder Track (NOT defects)

| ID | Initiative | Status | Owner |
|---|---|---|---|
| STRAT-001 | Domino/Omron disclosure | Needs founder approval | Founder + Legal |

## Operating Rule
Verified defects drive the engineering/content queue first.
No founder-track items in defect queue.
No item closed by opinion — only by evidence.
Named owners only.
