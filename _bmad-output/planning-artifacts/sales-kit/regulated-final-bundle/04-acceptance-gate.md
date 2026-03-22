---
title: Final Regulated Acceptance Gate
status: Locked acceptance gate
owner: Sales-kit QA layer
last_updated: 2026-03-22
---

# Final Regulated Acceptance Gate

## Universal pass conditions

Release a generated regulated asset only if all of the following are true:
- it clearly sells `genu.mark`;
- it keeps `genu.mark` as core;
- it shows both ERP roles explicitly;
- it keeps `еАкциз` external;
- it reduces buyer anxiety around rollout;
- it sounds buyer-facing and modern Ukrainian;
- it ends in audit / architecture session / pilot;
- it does not introduce new unsourced entities or platform explanations;
- it avoids weak superiority claims without proof;
- a buyer could quickly retell what is sold, what is core, what is external, why this is safer, and what to do next.

## Universal instant fail conditions

Do not release if any of the following appear:
- platform-first or ecosystem-first selling;
- `ERP` treated as core;
- `еАкциз` treated as core;
- early `genu.code`;
- regulated / voluntary mixing;
- operator wording, bridge notes, or draft scaffolding;
- a missing or weak CTA;
- a new product, layer, or platform explanation not present in approved sources;
- weak claims such as `best equipment`, `turnkey`, `single responsibility`, or `full package` without proof.

## Asset release rule

Each mandatory asset must pass:
- the matching dedicated QA file in `notebooklm-qa/11-16`;
- `notebooklm-qa/01-output-checklist.md`;
- this gate.

## Status rule

Mark an asset as ready only when it is:
- approved;
- buyer-facing;
- generation-ready;
- QA-locked.

## Fix routing

- Strategic drift -> fix `regulated-final-bundle/01-control-packet.md` or `regulated-final-bundle/02-approved-regulated-source-packet.md`.
- Wrong structure -> fix the matching brief.
- Wrong formatting or delivery style -> fix the matching prompt.
- Failed review questions -> fix the matching QA file and rerun.
