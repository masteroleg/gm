This section covers findings register v3, open/fixed defects, Epic 5 remediation stories, anti-drift corrections, open drift items, and document authority. Part 3 of 4.

## Audit Summary
- 3-sprint proper audit completed 2026-03-17; 38/44 states covered (86%)
- Findings register v3 = authoritative truth source for defect status; wins all conflicts with any other document
- Not testable: Lighthouse CLI, axe-core runtime, keyboard/focus-visible, Safari (Windows env), screen reader
- Coverage gap: ~6 remaining states = dark modes for secondary pages EN/UA desktop
- Evidence hierarchy: DOM measurement (High) > CSS class inspection (High) > oklch conversion (Medium) > visual screenshot estimate (Low)

## Fixed Defects (2026-03-17) — All Verified
- IA-001 CRITICAL: Nav missing on ALL secondary pages ALL viewports → Fixed: #mainNav + #burgerBtn + #closeMenu inserted into 9 secondary pages; menu.js added; absolute-path anchors (/#use-cases, /#how-it-works, /knowledge/); CSS bumped to ?v=20 sitewide
- TRUST-002 HIGH: Source pills visually undifferentiated → Fixed: data-source-type="primary" on genu.mark pill; CSS rule .proof-source-pill[data-source-type="primary"] added; output.css rebuilt
- TRUST-003 HIGH: "Phase 1" language on proof example → Fixed: stripped from verification.fact3Body EN+UK in lang-toggle.js
- TRUST-004 HIGH: Knowledge page Phase 1 placeholder → Fixed: replaced knowledge.section2.body EN+UK with neutral stage descriptions
- TRUST-005 HIGH: Privacy "Phase 1 starter" language → Fixed: stripped prefix from privacy.lead EN+UK
- TRUST-006 HIGH: Terms "Phase 1 starter" language → Fixed: stripped prefix from terms.lead EN+UK

## Open Defects (Active — 6 items)
- VIS-002 HIGH: ~30% empty hero right panel at desktop/tablet (all states); effort M
- TRUST-001 HIGH: Proof example disclaimer overload (4 disclaimers → consolidate to 1 info banner); effort S; UA rewrite Option B ready: «ℹ️ Демонстраційний перегляд...»
- CONV-002 HIGH: Request flows use mailto: handoff; recommended fix: Formspree or Netlify Forms (no backend needed)
- COPY-001 MEDIUM: Token-like homepage pills; needs PO decision
- COPY-002 MEDIUM: "NDA case" jargon; UA rewrite Option C ready: «Працює на виробництві. Понад 25 мільйонів промаркованих одиниць.»
- A11Y-001 LOW: Theme toggle 26.4px × 26.4px; passes WCAG 2.2 minimum (24px), below 44px internal best practice

## Closed by Evidence
- L10N-001, A11Y-002, A11Y-003, A11Y-004 — closed by evidence

## Strategic/Founder Track (not defect)
- STRAT-001: Domino/Omron equipment disclosure; do not act without founder approval

## Epic 5 — Site Remediation Stories (all completed 2026-03-21)
- 5-1: Deleted site/perevir-produkt/ (noindex redirect) and site/perevir-product/ (orphaned); deleted orphaned E2E specs; smoke tests 3/3 pass
- 5-2: Verified CTA routing — /request?from=/, /request?scenario=eaktsyz, /request?scenario=brand-proof; no mailto: as primary CTA
- 5-3: Reworded why.point2.title and proof.point1.title EN+UK to remove deprecated live-lookup terms; sequencing constraint: stories 5-3 and 5-4 must share same lang-toggle.js editing pass
- 5-4: Replaced faq.q4.answer "real-time scan resolution" → "fast scan response"/"швидка обробка сканування"; HTML fallback updated
- 5-5: Softened contact.section3.body EN+UK to remove SLA-implying language

## Anti-Drift Corrections (Applied)
- Patch 1: p1-remediation-plan.md line 5 now reads "COMPLETED — 2026-03-17/18"
- Patch 2: project-context.md tech stack placeholder replaced with actual stack facts
- Patch 3: remediation-brief.md §4 annotated with superseded notice; current state: 6 open, 6 fixed
- Audit support files 03/04/06/10 in docs/audits/genu.im-1/: contain 12 active/4 closed counts — correct at snapshot time; protected historical records; DO NOT edit

## Open Drift Items (Manual Decisions Required)
- M1 D6: site/perevir-product/ and site/v/index.html — no #mainNav/#burgerBtn, CSS at v=17/v=19; decision: add to findings register or explicitly exempt
- M2 D5: ADR-001/002/003 are 7-line stubs — fill with real content or delete
- M3 D7: CHANGELOG.md and RETROSPECTIVE.md are identical narrative documents — pick one purpose per file
- M4 D8/D9: design-artifacts/A–G/ empty scaffold + root leftover files (find, debug.log, commit-msg-test.txt) — confirm safe to delete
- M5 D3: package.json "version": "1.0.0" vs CHANGELOG/RETROSPECTIVE claiming v2.0.2 — requires founder decision before any edit

## Migration Pipeline State
- Migration ran 2026-02-22; processed 9 JSONL sessions, 1,814 lines, 0 parse errors; created/updated 9 knowledge fragments
- CRITICAL: delta application pipeline broken — 96 chunks processed, 0 delta files generated, 0 ADRs created; 9.4% success rate
- Root cause: run_migration.mjs:112-113 delta write logic unreachable; apply_delta.mjs:82 applyAdrs() never called with populated array
- Data loss: 87 of 96 chunks have no knowledge artifacts; migration/deltas/ empty

## Recommended Next Actions (Priority Order)
1. M1: decide and document perevir-product/ + v/index.html nav gap
2. M5: founder decision on version policy
3. M2: fill or delete ADR stubs
4. Fix open defects: TRUST-001, VIS-002, CONV-002
5. M3/M4: CHANGELOG/RETROSPECTIVE purpose + design-artifacts scaffold + leftover files cleanup
