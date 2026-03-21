---
type: bmad-distillate
sources:
  - "../planning-artifacts/prd.md"
  - "../planning-artifacts/architecture.md"
  - "../planning-artifacts/ux-design-specification.md"
  - "../planning-artifacts/epics.md"
  - "../planning-artifacts/implementation-readiness-report-2026-03-19.md"
  - "../planning-artifacts/consistency-alignment-plan-2026-03-19.md"
  - "../planning-artifacts/bmad-doc-inconsistency-report-2026-03-19.md"
  - "../planning-artifacts/sprint-change-proposal-2026-03-11.md"
  - "../planning-artifacts/validation-report-2026-03-09.md"
  - "../planning-artifacts/validation-report-2026-03-10.md"
  - "../planning-artifacts/validation-report-2026-03-11.md"
  - "../project-context.md"
  - "../design-thinking-2026-02-23.md"
  - "../problem-solution-2026-02-23.md"
  - "../knowledge/migration-converter-detailed-findings.md"
  - "../knowledge/migration-converter-final-review.md"
  - "../knowledge/migration-converter-findings.md"
  - "../knowledge/migration-converter-review.md"
  - "../knowledge/migration-converter-summary.md"
  - "../knowledge/migration-report.md"
  - "../knowledge/fragments/genuim-business-model.md"
  - "../knowledge/fragments/ci-value-static-sites.md"
  - "../knowledge/fragments/e2e-testing-visual-regression.md"
  - "../knowledge/fragments/husky-v9-migration.md"
  - "../solutioning/adrs/ADR-001-output-css-tracking.md"
  - "../solutioning/adrs/ADR-002-target-customer-criteria.md"
  - "../solutioning/adrs/ADR-003-architecture-decisions.md"
  - "../reviews/anti-drift-audit-2026-03-18.md"
  - "../reviews/anti-drift-handoff-2026-03-18.md"
  - "../specs/anti-drift-correction-spec-2026-03-18.md"
  - "../plans/adversarial-review-p1-remediation.md"
  - "../plans/p1-remediation-plan.md"
  - "../implementation-artifacts/5-1-remove-perevir-produkt-legacy-route.md"
  - "../implementation-artifacts/5-2-verify-homepage-cta-routes-to-request.md"
  - "../implementation-artifacts/5-3-reword-homepage-copy-trust-boundary.md"
  - "../implementation-artifacts/5-4-narrow-faq-verification-claims.md"
  - "../implementation-artifacts/5-5-soften-contact-response-time-language.md"
  - "../test-artifacts/ci-pipeline-progress.md"
  - "../../docs/audits/genu.im-1/01_coverage_matrix.md"
  - "../../docs/audits/genu.im-1/02_findings_register.md"
  - "../../docs/audits/genu.im-1/03_severity_summary.md"
  - "../../docs/audits/genu.im-1/04_priority_matrix.md"
  - "../../docs/audits/genu.im-1/06_executive_summary.md"
  - "../../docs/audits/genu.im-1/07_recommended_roadmap_30_60_90.md"
  - "../../docs/audits/genu.im-1/08_icon_a11y_resp_theme_appendix.md"
  - "../../docs/audits/genu.im-1/09_sprint3_agent_deliverables.md"
  - "../../docs/audits/genu.im-1/10_integrity_and_limitations.md"
  - "../../docs/css-var-refactor-analysis.md"
  - "../../docs/ci.md"
  - "../../docs/ci-secrets-checklist.md"
  - "../../docs/workflow.md"
  - "../../docs/project-contract.md"
  - "../../docs/genu-im-homepage-master-plan.md"
  - "../../docs/lighthouse.md"
  - "../../docs/remediation-brief.md"
  - "../../docs/review-guide-funnel.md"
  - "../../docs/review-guide-requests.md"
  - "../../docs/bmad-review-without-story.md"
  - "../../docs/governance/doc-governance.md"
  - "../../docs/governance/glossary.md"
downstream_consumer: "general LLM project context"
created: "2026-03-21"
token_estimate: 5800
parts: 4
---

Distillate of ~80 genu.im project documents (planning artifacts, project context, audit findings, CI/CD, CSS refactor, docs governance). Excludes docs/delivr/ competitor research. 4 semantic sections.

## Cross-Cutting Facts
- genu.im: public proof-first B2B surface for genu.mark manufacturing marking platform; not consumer service, not official state verification
- Trust boundary (non-negotiable): genu.mark = brand-layer proof; Дія = official state акциз check; NEVER imply as one chain or that genu.im performs official verification
- Phase 1 scope: static GitHub Pages, no backend, no real-time API, no live public lookup, no auth, no server-side ingestion
- output.css MUST remain committed to git — GitHub Pages has no build step; NEVER run git rm --cached site/assets/css/output.css; E2E test 'CSS is loaded and applied' guards this
- Forbidden in user-facing copy: "live verification", "real-time verification", "official verification", "backend submission", "Phase 1 placeholder", "guaranteed delivery", "any scan"
- Sequential persuasion model: Hook → Clarify → Bridge → Prove → Branch → Convert → Trust
- 10-second first-screen clarity is primary design constraint
- Release 2.1 = Epics 1–4; priority: Epic 1 → 2 → 3 → 4 (independently shippable, later depend on earlier)
- Global guardrail: "Does this story strengthen the trust-first journey, or is it merely convenient to implement?"

## Scope Summary
- Phase 1 IN: homepage transformation, /v/genuim canonical proof example, /v/ paste-first demo input, no-data state, request form (mailto handoff), trust-floor static pages, proof-path UTM attribution
- Phase 1 OUT: live production lookup, full B2B portal, arbitrary-code public deep-links, full knowledge-base, Safari/iOS support, backend request ingestion
- Phase 2: knowledge-base, deeper analytics, expanded proof content, client-side analytics, server-side form submission
- Phase 3: live lookup vs real product data, abuse controls, private B2B access, Azure migration
- Named sample pages /v/genu.alko and /v/genu.cosm: FUTURE PHASE only, require separate approval
- /v/genuim: Phase 1 implementation-ready; only approved named proof page
- 25M+ proof claim: unit unresolved; DO NOT use until counted unit and framing founder-approved

## Open Decisions (non-blocking)
- Growth uplift targets: establish baseline within 2 weeks post-release; not release gate
- Arbitrary-code public deep-links: deferred to Phase 2+
- Analytics depth: UTM + manual review sufficient Phase 1
- STRAT-001 (Domino/Omron disclosure): founder-track; do not use without approval
- Public proof facts (25M+, Ukravit): requires founder approval before publishing
- eАкциз messaging: direct vs diplomatic — A/B test planned
- Founder decision required: version policy (package.json 1.0.0 vs CHANGELOG/RETROSPECTIVE claiming v2.0.2)

## Section Index
- [01-product-strategy-requirements.md](./01-product-strategy-requirements.md) — product model, business model/pricing, personas, journeys, FRs 1–31, NFRs 1–16, epic structure, funnel/analytics, SEO architecture
- [02-architecture-tech-implementation.md](./02-architecture-tech-implementation.md) — stack, ADRs, file layout, design system tokens, 10 component specs, mandatory implementation patterns
- [03-audit-remediation-current-state.md](./03-audit-remediation-current-state.md) — findings register v3, open/fixed defects, Epic 5 stories, anti-drift corrections, open drift items
- [04-cicd-docs-governance-contracts.md](./04-cicd-docs-governance-contracts.md) — CI/CD pipeline, CSS safety rules, project contract, docs authority map, homepage master plan
