---
title: Notebook LM QA - Acceptance Criteria by Mandatory Artifact
asset_type: QA gate
audience: Reviewer / sales enablement / designer
funnel_stage: Review
decision_to_unlock: Approve a mandatory regulated artifact for design or sending
one_sentence_purpose: Summarize the pass/fail logic for each mandatory regulated asset and point reviewers to the exact detailed QA file
single_key_message: Every mandatory asset has its own acceptance file, but all share the same `genu.mark`-first, ERP-split, buyer-facing, CTA-locked standard
primary_cta: Approve or reject by artifact type
secondary_cta: Open the matching detailed QA file
owner: Sales enablement / reviewer
status: Locked fail gate
last_updated: 2026-03-21
source_inputs:
  - notebooklm-qa/01-output-checklist.md
  - regulated-final-bundle/04-acceptance-gate.md
---

# Notebook LM QA - Acceptance Criteria by Mandatory Artifact

| Artifact | Detailed QA file | Pass if | Reject if |
|---------|------------------|---------|-----------|
| Executive deck | `notebooklm-qa/11-regulated-executive-deck-qa.md` | the deck sells `genu.mark`, explains safe rollout, shows the ERP split, keeps `еАкциз` external, and ends in audit / architecture session / pilot | it becomes a platform deck, hides contour logic, or sounds like internal notes |
| Why us | `notebooklm-qa/12-regulated-why-us-qa.md` | the one-pager explains why `Dominanta + Logictime` is safer around the `genu.mark` core and keeps the contour split visible | it turns into generic company branding or hides the core vs contour logic |
| One job | `notebooklm-qa/13-regulated-one-job-qa.md` | the visual makes one controlled line around `genu.mark` obvious and contrasts it with patchwork | it reads like a memo or fails to show the strong-core path |
| Edge cases | `notebooklm-qa/14-regulated-edge-cases-qa.md` | the asset proves maturity in real exceptions across the line and external contours | it stays on happy path or ignores interface risk |
| Evidence pack | `notebooklm-qa/15-regulated-evidence-pack-qa.md` | the asset shows reviewable evidence, boundaries, and calm diligence language | it promises compliance, overclaims proof, or hides the contour boundaries |
| Technical deck | `notebooklm-qa/16-regulated-technical-deck-qa.md` | the deck follows the approved technical order and keeps core vs external contours explicit | it becomes ecosystem or proof-layer language or collapses ERP and `еАкциз` into the core |
