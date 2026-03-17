
# genu.im — Remediation Brief

## 1. Purpose

This brief transfers the completed audit package into implementation work for the existing genu.im codebase.

This is **not** a new product planning effort.
This is **not** a redesign discovery cycle.
This is **brownfield remediation of verified defects** on a live public website.

Implementation must follow existing project patterns and the generated project context.

---

## 2. Project Type

- Existing brownfield website
- Static HTML/CSS/JS delivery target
- GitHub Pages deployment
- No server-side runtime
- No backend-managed persistence
- No authentication or protected flows

Primary audience and delivery priorities:

- **UA-first**
- **Mobile-priority**
- **Desktop-mandatory**

---

## 3. Source of Truth

Primary implementation source of truth:

- `docs/audits/genu.im-1/02_findings_register.md`

Supporting audit references:

- `docs/audits/genu.im-1/03_severity_summary.md`
- `docs/audits/genu.im-1/04_priority_matrix.md`
- `docs/audits/genu.im-1/06_executive_summary.md`
- `docs/audits/genu.im-1/07_recommended_roadmap_30_60_90.md`
- `docs/audits/genu.im-1/08_icon_a11y_resp_theme_appendix.md`
- `docs/audits/genu.im-1/10_integrity_and_limitations.md`

If any document conflicts with the findings register, **the findings register wins**.

---

## 4. Current Audit State

Audit status:

- Audit complete enough for implementation handoff
- Coverage is approximately **86%** of defined states
- The audit package is synchronized
- Integrity check passed

Current item counts:

- **12 active verified defects**
- **4 closed items**
- **1 strategic / founder-track item**

Important limitation:
This package is sufficient for implementation, but it is **not** a final full QA certification.Known limitations remain for:

- Lighthouse
- focus / keyboard testing
- Safari
- screen reader
- remaining dark-mode secondary states

These limitations should be handled after the first implementation cycle, not before it.

---

## 5. Scope Boundary

### In Scope

- Fix verified P1 defects
- Follow existing UI patterns and project conventions
- Keep changes minimal, controlled, and evidence-based
- Update audit artifacts after implementation and recheck

### Out of Scope

- New product strategy
- New authority/partner claims
- New architecture
- Server-side features
- Full redesign
- Large IA restructuring beyond the verified defect scope
- Founder-track / ecosystem messaging work

---

## 6. P1 Verified Fixes (Do First)

Implement these first and in this order:

1. **IA-001**Secondary-page navigation is missing across all viewports.Fix shared header/navigation behavior so secondary pages have consistent navigation with the homepage.
2. **TRUST-004**Remove “Phase 1 placeholder” language from Knowledge.
3. **TRUST-005**Remove “starter / Phase 1” wording from Privacy.
4. **TRUST-006**Remove “starter / Phase 1” wording from Terms.
5. **TRUST-003**Remove “Phase 1” wording from Proof Example.
6. **TRUST-002**
   Visually differentiate `genu.mark` and `brand` source types on the proof page.

These are the first implementation targets.
Do not move to broader improvements before these are completed and rechecked.

---

## 7. P2 Verified Fixes (After P1)

Only after P1 is complete:

7. **TRUST-001**Consolidate proof-page disclaimer overload into a clearer, calmer informational treatment.
8. **CONV-002**Replace `mailto:` as the primary request path with structured lead capture appropriate for a static site.
9. **VIS-002**Address the verified visual issue around the hero/empty visual balance.
10. **COPY-001 / COPY-002**
    Clean token-like and trust-eroding public wording where the findings register specifies it.

---

## 8. Strategic / Founder Track

The following item is **not** part of the defect-fix queue:

- **STRAT-001**

Rules:

- Do not pull founder-track work into implementation by default
- Do not introduce partner/ecosystem claims without founder approval
- Do not expand public authority messaging in this remediation cycle

Track A / verified fixes must complete before founder-track work is considered.

---

## 9. Implementation Rules

Implementation must follow:

- `_bmad-output/project-context.md`
- `docs/project-contract.md`
- existing brownfield project conventions
- the findings register as the remediation source of truth

Additional rules:

- Keep diffs lean
- Reuse existing components/patterns wherever possible
- Do not broaden scope without explicit approval
- Do not change architecture unless remediation proves it is necessary
- If scope expands materially, stop and escalate rather than improvising

---

## 10. Verification Rules

For each implemented fix:

- run the project’s normal lint/type/test flow
- recheck affected pages and states
- confirm no regression on already-audited states
- update the findings register
- attach before/after evidence where appropriate

Verification order:

1. lint
2. typecheck
3. unit/controller tests
4. browser verification
5. Lighthouse or deeper QA only where tooling permits

---

## 11. Definition of Done

A remediation item is done only when:

- the code change is implemented
- the intended state is visible in the live/local rendered UI
- the affected states are rechecked
- the findings register status is updated
- no regression is introduced on previously verified states

A remediation item is **not** done just because the code was edited.

---

## 12. Required Workflow

Use BMAD **Quick Flow** for this work.

Required sequence:

1. read `_bmad-output/project-context.md`
2. read this file
3. use `bmad-quick-spec`
4. review generated tech-spec against this brief
5. use `bmad-quick-dev` in a fresh session
6. implement only the approved remediation scope
7. recheck and update audit artifacts

Do **not** start with the full PRD / Architecture workflow for this remediation package.

---

## 13. Escalation Rule

If implementation reveals that the work is no longer a bounded remediation effort — for example:

- multiple system-level architectural changes are needed
- navigation remediation requires broader IA redesign
- conversion work requires new runtime/service decisions
- requirements become contested or unclear

then stop Quick Flow and escalate to the fuller BMAD planning path.

Do not silently convert remediation into redesign.

---

## 14. Immediate Objective

The immediate objective is simple:

**Use the completed audit package to fix verified defects in the existing genu.im codebase, starting with P1, without reopening discovery.**
