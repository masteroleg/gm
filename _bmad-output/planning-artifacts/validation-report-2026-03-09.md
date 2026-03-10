---
validationTarget: '_bmad-output/planning-artifacts/prd.md'
validationDate: '2026-03-09'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-gm-2026-02-23.md
  - _bmad-output/project-context.md
  - _bmad-output/design-thinking-2026-02-23.md
  - _bmad-output/problem-solution-2026-02-23.md
  - AGENTS.md
  - CLAUDE.md
  - docs/genu-im-homepage-master-plan.md
validationStepsCompleted:
  - step-v-01-discovery
  - step-v-02-format-detection
  - step-v-03-density-validation
  - step-v-04-brief-coverage-validation
  - step-v-05-measurability-validation
  - step-v-06-traceability-validation
  - step-v-07-implementation-leakage-validation
  - step-v-08-domain-compliance-validation
  - step-v-09-project-type-validation
  - step-v-10-smart-validation
  - step-v-11-holistic-quality-validation
  - step-v-12-completeness-validation
validationStatus: COMPLETE
holisticQualityRating: '4/5 - Good'
overallStatus: 'Critical'
---

# PRD Validation Report

**PRD Being Validated:** `_bmad-output/planning-artifacts/prd.md`
**Validation Date:** 2026-03-09

## Input Documents

- `_bmad-output/planning-artifacts/prd.md`
- `_bmad-output/planning-artifacts/product-brief-gm-2026-02-23.md`
- `_bmad-output/project-context.md`
- `_bmad-output/design-thinking-2026-02-23.md`
- `_bmad-output/problem-solution-2026-02-23.md`
- `AGENTS.md`
- `CLAUDE.md`
- `docs/genu-im-homepage-master-plan.md`

## Validation Findings

[Findings will be appended as validation progresses]

## Format Detection

**PRD Structure:**
- `Executive Summary`
- `Project Classification`
- `Success Criteria`
- `Product Scope & Phased Development`
- `User Journeys`
- `Domain-Specific Requirements`
- `Innovation & Novel Patterns`
- `web_app Specific Requirements`
- `Functional Requirements`
- `Non-Functional Requirements`

**BMAD Core Sections Present:**
- Executive Summary: Present
- Success Criteria: Present
- Product Scope: Present
- User Journeys: Present
- Functional Requirements: Present
- Non-Functional Requirements: Present

**Format Classification:** BMAD Standard
**Core Sections Present:** 6/6

## Information Density Validation

**Anti-Pattern Violations:**

**Conversational Filler:** 0 occurrences

**Wordy Phrases:** 0 occurrences

**Redundant Phrases:** 0 occurrences

**Total Violations:** 0

**Severity Assessment:** Pass

**Recommendation:**
PRD demonstrates good information density with minimal violations.

## Product Brief Coverage

**Product Brief:** `product-brief-gm-2026-02-23.md`

### Coverage Map

**Vision Statement:** Fully Covered
- Resilient marking + code-based verification platform for manufacturers is covered in `prd.md:119-125`.
- Trust via proof artifact `/v/genuim`, not promises, is covered in `prd.md:119-121` and `prd.md:131-134`.
- `еАкциз`-ready plus voluntary brand-protection path is covered in `prd.md:123` and `prd.md:189-190`.

**Target Users:** Fully Covered
- COO/Compliance preparing for `еАкциз` is covered in `prd.md:147-150` and `prd.md:250-258`.
- Automation engineer / IT integrator is covered in `prd.md:161` and `prd.md:258`.
- Brand/marketing owner is covered in `prd.md:147` and `prd.md:260-268`.
- Procurement/audit skeptic is covered in `prd.md:270-289`.

**Problem Statement:** Fully Covered
- Failures and data chaos in current marking approaches are covered in `prd.md:119`, `prd.md:123`, and `prd.md:252-258`.
- Line stoppages, loss of control/proof, and `еАкциз` fine risk are covered in `prd.md:123` and `prd.md:252-258`.
- Existing-solution pain is Partially Covered: contour responsibility and partner-use framing appear, but vendor-lock / contractor instability are not stated directly. Severity: Moderate.

**Key Features:** Partially Covered
- Proof-first landing with `/v/genuim` and proof scale is Fully Covered.
- Dual `еАкциз` / voluntary branches are Fully Covered.
- Demo request + “view verification result” CTA loop is Fully Covered.
- About as self-verification page is Not Found. Severity: Moderate.
- Compact “how it works” explainer is Partially Covered. Severity: Informational.
- Procurement FAQ block is Partially Covered and deferred toward Epic 2a. Severity: Moderate.

**Goals/Objectives:** Fully Covered
- First-screen comprehension, conversion improvement, `/v/genuim` CTR and return-to-CTA flow, and `еАкциз` pilot requests are all covered.

**Differentiators:** Partially Covered
- Production-grade industrial-line experience is Partially Covered; implied but not foregrounded explicitly. Severity: Moderate.
- Proof artifact as public trust mechanism is Fully Covered.
- `25M+` scale proof is Fully Covered.
- Named Ukravit reference is Intentionally Excluded. Severity: Informational.
- `еАкциз` timing window is Fully Covered.

### Coverage Summary

**Overall Coverage:** Strong with a few moderate gaps and several intentional or informational omissions.
**Critical Gaps:** 0
**Moderate Gaps:** 4
- Existing-solution pain framing is softened.
- About/self-verification page is missing.
- Procurement FAQ is deferred rather than explicit in MVP.
- Production-grade industrial-line experience is under-emphasized.
**Informational Gaps:** 4
- Compact “how it works” explainer is not explicit in MVP requirements.
- BI/dashboard exclusion is phased but not explicit.
- Vendor/integration catalog exclusion is not explicit.
- Industry-specific `/v/*` template exclusion is not explicit.

**Recommendation:**
PRD provides good coverage of Product Brief content, but should address moderate gaps where they materially affect homepage trust, proof framing, and scoped support surfaces.

## Measurability Validation

### Functional Requirements

**Total FRs Analyzed:** 32

**Format Violations:** 32
- All FRs use an actor-plus-capability style, but none follow the strict literal `[Actor] can [capability]` template.
- Examples: `FR1` at `prd.md:492`, `FR23` at `prd.md:532`.

**Subjective Adjectives Found:** 6
- `FR6` `prd.md:500` — `явное разделение ролей`
- `FR11` `prd.md:508` — `явно сообщить`
- `FR13` `prd.md:513` — `нейтральное "нет данных"`
- `FR22` `prd.md:528` — `без имитации гос-сервиса`
- `FR23` `prd.md:532` — `минимально достаточной квалификацией`
- `FR25` `prd.md:534` — `пресейл-артефакт`

**Vague Quantifiers Found:** 7
- `FR1` `prd.md:492` — `на ключевых страницах витрины`
- `FR3` `prd.md:494` — `на ключевых страницах витрины`
- `FR14` `prd.md:514` — `что могло бы быть`
- `FR20` `prd.md:523` — `расширяемые поля прозрачности`
- `FR23` `prd.md:532` — `минимально достаточной`
- `FR26` `prd.md:538` — `приоритетным кластерам`
- `FR32` `prd.md:550` — `аномальная активность`

**Implementation Leakage:** 14
- Examples include hardcoded routes, state names, analytics event taxonomy, API/mock details, payload-field internals, and anti-enumeration/rate-limiting language in FRs.
- Representative examples: `FR7` `prd.md:501`, `FR8` `prd.md:505`, `FR12` `prd.md:512`, `FR20` `prd.md:523`, `FR29` `prd.md:544`, `FR32` `prd.md:550`.

**FR Violations Total:** 59

### Non-Functional Requirements

**Total NFRs Analyzed:** 16

**Missing Metrics:** 11
- Examples: `NFR3` `prd.md:558`, `NFR4` `prd.md:559`, `NFR5` `prd.md:563`, `NFR10` `prd.md:574`, `NFR14` `prd.md:584`.

**Incomplete Template:** 16
- All NFRs are missing at least one required element such as explicit measurement method, context, or complete acceptance framing.

**Missing Context:** 11
- Examples: `NFR1` `prd.md:556`, `NFR2` `prd.md:557`, `NFR5`-`NFR9` `prd.md:563-570`, `NFR10`-`NFR14` `prd.md:574-584`.

**NFR Violations Total:** 42

### Overall Assessment

**Total Requirements:** 48
**Total Violations:** 101

**Severity:** Critical

**Recommendation:**
Many requirements are not measurable or testable enough for clean downstream work. FRs should reduce implementation leakage and ambiguity; NFRs need explicit metrics, measurement methods, and stakeholder context.

## Traceability Validation

### Chain Validation

**Executive Summary -> Success Criteria:** Gaps Identified
- Core one-screen clarity, trust-through-proof, honest boundary, and role split are reflected well.
- Gap: Phase 1 mock-path effectiveness for `/v/` and `/v/{code}` is implied in scope, but lacks direct success criteria for usefulness or demo-label honesty.

**Success Criteria -> User Journeys:** Gaps Identified
- Business and proof-first outcomes are supported well.
- Weak or missing journey support exists for first-screen comprehension testing, performance/accessibility/i18n platform outcomes, analytics instrumentation, and knowledge-base IA readiness.

**User Journeys -> Functional Requirements:** Intact with Gaps Identified
- All 4 journeys have supporting FRs.
- Core proof-first flows are well covered.
- Several platform, analytics, SEO-intercept, and future-growth FRs are not tied to explicit journeys.

**Scope -> FR Alignment:** Misaligned
- Most P1 FRs align with Phase 1 scope.
- Additional platform/usability requirements exist in FRs without explicit MVP scope bullets, especially preferences, analytics, SEO intercept, and abuse protection.

### Orphan Elements

**Orphan Functional Requirements:** 15
- `FR1`-`FR4` language/theme preferences
- `FR11` demo-mode labeling
- `FR21`-`FR22` consumer-intent intercept
- `FR24` lead classification
- `FR26`-`FR28` knowledge base
- `FR29`-`FR31` analytics/reporting
- `FR32` abuse protection

**Unsupported Success Criteria:** 7
- `SC1`, `SC9`, `SC10`, `SC11`, `SC12`, `SC13`, `SC14`

**User Journeys Without FRs:** 0

### Traceability Matrix

- `E1` one-screen clarity -> `SC1`, `SC14` -> `J1`, `J2`, `J3` -> `FR5`-`FR7`
- `E2` proof-first trust -> `SC3`, `SC7`, `SC15`, `SC16` -> `J1`, `J3` -> `FR7`, `FR10`, `FR23`, `FR25`, `FR29`-`FR31`
- `E3` honest boundary -> `SC2` -> `J2`, `J4` -> `FR11`-`FR19`
- `E4` role split -> `SC4`, `SC6` -> `J1`-`J4` -> `FR5`-`FR6`, `FR13`-`FR15`, `FR21`-`FR22`
- `E5` Phase 1 mock paths and KB readiness -> `SC12`, `SC13` -> weak journey linkage -> `FR8`-`FR11`, `FR26`-`FR31`

**Total Traceability Issues:** 23

**Severity:** Critical

**Recommendation:**
Core homepage proof flows trace well, but platform, analytics, SEO-intercept, and knowledge-base requirements need clearer classification as business/platform-enablement items or stronger linkage to explicit journeys and success criteria.

## Implementation Leakage Validation

### Leakage by Category

**Frontend Frameworks:** 0 violations

**Backend Frameworks:** 0 violations

**Databases:** 0 violations

**Cloud Platforms:** 8 violations
- Representative examples: `prd.md:408` (`GitHub Pages`, `SSR`), `prd.md:588` (`HTTP/3`, `Cloudflare Free`), `prd.md:589` (`Cloudflare Pages Free`).

**Infrastructure:** 2 violations
- `prd.md:187` — `static MPA + mocks`
- `prd.md:225` — `auth + audit/RBAC`

**Libraries:** 0 violations

**Other Implementation Details:** 6 violations
- `prd.md:125`, `prd.md:224`, `prd.md:293`, `prd.md:310`, `prd.md:313`, `prd.md:314` — `API` and public/private interface wording used as design prescription
- `prd.md:199`, `prd.md:569` — `JSON-LD`
- `prd.md:357` — `json` payload schema detail
- `prd.md:413` — explicit stack `static HTML + JS (defer) + Tailwind v4`

### Summary

**Total Implementation Leakage Violations:** 16

**Severity:** Critical

**Recommendation:**
Extensive implementation leakage found. Requirements frequently specify HOW instead of WHAT. Move stack, hosting, protocol, schema, and interface design decisions into architecture/technical design artifacts and keep PRD language at capability and constraint level.

**Note:** Browser compatibility, HTTPS-only security posture, and deep-link behavior remain capability-relevant when tied to user outcomes.

## Domain Compliance Validation

**Domain:** general
**Complexity:** Low (general/standard)
**Assessment:** N/A - No special domain compliance requirements

**Note:** This PRD is classified as a standard domain without regulated-industry special sections under the BMAD domain-complexity model.

## Project-Type Compliance Validation

**Project Type:** web_app

### Required Sections

**browser_matrix:** Present
- Documented in `prd.md:418` with supported browsers, deferred Safari/iOS Safari scope, and fallback risk.

**responsive_design:** Missing
- No dedicated responsive design section or viewport/layout strategy was found.

**performance_targets:** Present
- Documented in `prd.md:423` and reinforced in NFRs.

**seo_strategy:** Present
- Documented in `prd.md:429` with target intent, exclusions, keyword clusters, and Epic 2a mapping.

**accessibility_level:** Missing
- Accessibility requirements exist in NFRs at `prd.md:561`, but not as the required named project-type section.

### Excluded Sections (Should Not Be Present)

**native_features:** Absent ✓

**cli_commands:** Absent ✓

### Compliance Summary

**Required Sections:** 3/5 present
**Excluded Sections Present:** 0
**Compliance Score:** 60%

**Severity:** Critical

**Recommendation:**
PRD is missing required web-app project-type sections for responsive design and explicit accessibility-level framing. Add named sections or clearly structured equivalents so the project-type contract is complete.

## SMART Requirements Validation

**Total Functional Requirements:** 32

### Scoring Summary

**All scores >= 3:** 87.5% (28/32)
**All scores >= 4:** 0% (strict all-4+ threshold not met across every criterion for most FRs)
**Overall Average Score:** 4.2/5.0

### Scoring Table

| FR # | Specific | Measurable | Attainable | Relevant | Traceable | Average | Flag |
|------|----------|------------|------------|----------|-----------|--------|------|
| FR1 | 4 | 4 | 5 | 4 | 4 | 4.2 | |
| FR2 | 4 | 4 | 5 | 4 | 4 | 4.2 | |
| FR3 | 4 | 4 | 5 | 4 | 4 | 4.2 | |
| FR4 | 4 | 4 | 5 | 4 | 4 | 4.2 | |
| FR5 | 4 | 3 | 5 | 5 | 5 | 4.4 | |
| FR6 | 4 | 3 | 5 | 5 | 5 | 4.4 | |
| FR7 | 5 | 5 | 5 | 5 | 5 | 5.0 | |
| FR8 | 5 | 5 | 5 | 5 | 5 | 5.0 | |
| FR9 | 4 | 5 | 5 | 4 | 4 | 4.4 | |
| FR10 | 4 | 4 | 5 | 5 | 5 | 4.6 | |
| FR11 | 3 | 2 | 5 | 5 | 4 | 3.8 | X |
| FR12 | 4 | 4 | 5 | 5 | 5 | 4.6 | |
| FR13 | 4 | 3 | 5 | 5 | 5 | 4.4 | |
| FR14 | 4 | 3 | 5 | 5 | 4 | 4.2 | |
| FR15 | 4 | 4 | 5 | 5 | 5 | 4.6 | |
| FR16 | 4 | 3 | 4 | 5 | 5 | 4.2 | |
| FR17 | 4 | 4 | 5 | 5 | 5 | 4.6 | |
| FR18 | 4 | 4 | 5 | 5 | 4 | 4.4 | |
| FR19 | 5 | 5 | 5 | 4 | 4 | 4.6 | |
| FR20 | 3 | 2 | 3 | 4 | 3 | 3.0 | X |
| FR21 | 4 | 4 | 5 | 5 | 5 | 4.6 | |
| FR22 | 4 | 3 | 5 | 5 | 5 | 4.4 | |
| FR23 | 4 | 4 | 5 | 5 | 5 | 4.6 | |
| FR24 | 4 | 4 | 5 | 5 | 4 | 4.4 | |
| FR25 | 3 | 2 | 4 | 4 | 4 | 3.4 | X |
| FR26 | 4 | 3 | 4 | 4 | 5 | 4.0 | |
| FR27 | 4 | 4 | 5 | 4 | 4 | 4.2 | |
| FR28 | 4 | 4 | 4 | 4 | 4 | 4.0 | |
| FR29 | 4 | 4 | 5 | 5 | 5 | 4.6 | |
| FR30 | 4 | 4 | 5 | 5 | 5 | 4.6 | |
| FR31 | 4 | 4 | 4 | 5 | 5 | 4.4 | |
| FR32 | 3 | 2 | 3 | 5 | 5 | 3.6 | X |

**Legend:** 1=Poor, 3=Acceptable, 5=Excellent
**Flag:** X = Score < 3 in one or more categories

### Improvement Suggestions

**Low-Scoring FRs:**

**FR11:** Define exactly where the demo notice appears and how success is verified.

**FR20:** Specify the minimum payload schema, supported field types, and rendering rules at requirement level without leaking engineering internals.

**FR25:** Convert “can use” into observable product behavior, such as stable public deep-link sharing without authentication.

**FR32:** Add measurable abuse thresholds and expected controls instead of broad anti-abuse wording.

### Overall Assessment

**Severity:** Warning

**Recommendation:**
Functional Requirements are mostly strong, but a small set need SMART refinement - especially where measurability is weak or the requirement is framed as a business hope rather than a testable capability.

## Holistic Quality Assessment

### Document Flow & Coherence

**Assessment:** Good

**Strengths:**
- Clear strategic spine: trust through proof, explicit non-certification boundary, and phased path from static mock to real lookup.
- Strong handling of role separation between `genu.im` and `Дія`.
- Good alignment with the master plan on dual-audience capture, proof importance, and trust cleanup intent.

**Areas for Improvement:**
- Ordering drift: strategy, governance, innovation payload design, and implementation detail mix together too early.
- Future-facing detail for later phases weakens scannability of the MVP story.
- The main decision path could be more compact for executive and builder readers.

### Dual Audience Effectiveness

**For Humans:**
- Executive-friendly: Good
- Developer clarity: Good
- Designer clarity: Good
- Stakeholder decision-making: Good

**For LLMs:**
- Machine-readable structure: Excellent
- UX readiness: Strong
- Architecture readiness: Strong
- Epic/Story readiness: Strong

**Dual Audience Score:** 4/5

### BMAD PRD Principles Compliance

| Principle | Status | Notes |
|-----------|--------|-------|
| Information Density | Met | Very little filler; strong signal density. |
| Measurability | Partial | Several FR/NFR issues remain around metrics and testability. |
| Traceability | Partial | Core homepage flows trace well; platform and enablement items are weaker. |
| Domain Awareness | Met | Honest boundaries and market-specific considerations are strong. |
| Zero Anti-Patterns | Partial | Main issue is over-specification and implementation leakage, not filler. |
| Dual Audience | Met | Highly usable for LLMs and good for human stakeholders. |
| Markdown Format | Met | Structure is clear and extractable. |

**Principles Met:** 5/7

### Overall Quality Rating

**Rating:** 4/5 - Good

**Scale:**
- 5/5 - Excellent: Exemplary, ready for production use
- 4/5 - Good: Strong with minor improvements needed
- 3/5 - Adequate: Acceptable but needs refinement
- 2/5 - Needs Work: Significant gaps or issues
- 1/5 - Problematic: Major flaws, needs substantial revision

### Top 3 Improvements

1. **Separate PRD core from implementation appendix**
   Move BMAD status notes, payload schema details, platform migration notes, and low-level technical constraints into appendices or linked technical specs.

2. **Tighten phase discipline**
   Add a short Phase 1 build-now checklist focused on MVP surfaces, required states, copy constraints, and proof interactions.

3. **Remove repetition and normalize terminology**
   Consolidate repeated rules around `Дія`, non-certification language, `25M+` contextualization, and `not_in_genu_mark` handling into canonical sections.

### Summary

**This PRD is:** a strong, strategically mature BMAD PRD that is highly actionable for AI-driven downstream work, but still needs refinement to reduce over-specification and sharpen the MVP narrative.

**To make it great:** Focus on the top 3 improvements above.

## Completeness Validation

### Template Completeness

**Template Variables Found:** 0 critical template placeholders
No unresolved template variables remain in the strict sense. Route params like `/v/{code}` and priority tags like `[P1]` are legitimate syntax, not template residue.

### Content Completeness by Section

**Executive Summary:** Complete

**Success Criteria:** Incomplete
- Several business metrics still depend on unresolved baseline placeholders and future target setting.

**Product Scope:** Complete

**User Journeys:** Complete

**Functional Requirements:** Complete

**Non-Functional Requirements:** Complete
- Present, but several are still weak in specificity and testability.

### Section-Specific Completeness

**Success Criteria Measurability:** Some measurable
- Gaps include `prd.md:154`, `prd.md:175`, and `prd.md:176`, where target values are still deferred.

**User Journeys Coverage:** Partial - covers all core user types
- Main B2B personas are covered, but the consumer-intent SEO visitor is handled in FR/NFR logic rather than as a full journey.

**FRs Cover MVP Scope:** Partial
- Core MVP coverage is strong, but some enablement/platform items sit outside explicit MVP scope bullets.

**NFRs Have Specific Criteria:** Some
- Several NFRs remain too broad or future-state oriented, especially `prd.md:558`, `prd.md:559`, `prd.md:580`, `prd.md:584`, `prd.md:588`, and `prd.md:589`.

### Frontmatter Completeness

**stepsCompleted:** Present
**classification:** Present
**inputDocuments:** Present
**date:** Present

**Frontmatter Completeness:** 4/4

### Completeness Summary

**Overall Completeness:** 83% (5/6 core sections complete, with partials in success criteria and section-specific gates)

**Critical Gaps:** 2
- Unresolved success-metric placeholders for baseline-driven targets.
- Open implementation decision for the DataMatrix lookup/deep-link approach at `prd.md:297`.

**Minor Gaps:** 4
- Out-of-scope section is thin.
- Consumer-intent visitor is not a full journey.
- Several NFRs are not fully testable.
- Hosting migration notes read more like future architecture notes than current acceptance gates.

**Severity:** Warning

**Recommendation:**
PRD is structurally complete, but should not be considered final-gate clean until deferred metric placeholders are resolved and the lookup-approach decision is explicitly locked.
