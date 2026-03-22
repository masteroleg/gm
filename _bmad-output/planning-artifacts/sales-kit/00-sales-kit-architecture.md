# Sales-Kit Architecture - regulated / еАкциз

## Purpose

This document defines the current architecture of the regulated sales kit after the final strategy lock.

## Governing Rule

In regulated motion, we sell `genu.mark`.

We do not organize the kit around:
- platform-first explanation;
- mixed regulated plus voluntary motion;
- `genu.im` as opening sell;
- early `genu.code`;
- blurred core vs contour logic.

## Core Model

- `genu.mark` = line core;
- `ERP` = external contour in two roles:
  - `ERP -> source of production job`;
  - `ERP / internal systems <- exchange of results and statuses`;
- `еАкциз` = separate external state contour.

## Execution Stack

### Layer 0 - final execution bundle

The single execution root is `regulated-final-bundle/`.

It gives the next agent four things in one place:
- control packet;
- approved regulated source packet;
- exact run path;
- exact acceptance gate.

### Layer 1 - approved upstream truth

Use these as source-control documents:
- `source-of-truth/01-platform-core.md`
- `source-of-truth/04-regulated-buyer-model.md`
- `source-of-truth/05-message-house.md`
- `source-of-truth/06-claims-register.md`

### Layer 2 - approved buyer-facing regulated assets

Use these as approved generation-ready regulated sources:
- `buyer-facing/regulated/01-executive-deck-regulated.md`
- `buyer-facing/regulated/02-why-us-regulated.md`
- `buyer-facing/regulated/03-one-job-unified-line.md`
- `buyer-facing/regulated/04-edge-cases-exceptions.md`
- `buyer-facing/regulated/05-evidence-pack-audit-ready.md`
- `buyer-facing/regulated/06-technical-presale-deck.md`

### Layer 3 - per-asset generation path

These hold the exact execution path for each mandatory asset:
- `notebooklm-briefs/11-16`
- `notebooklm-prompts/11-16`
- `notebooklm-runs/11-16`
- `notebooklm-qa/11-16`

### Layer 4 - optional later assets

These are explicitly outside the opening regulated motion:
- `buyer-facing/shared/...`
- `buyer-facing/voluntary-later/...`
- old Dominanta starter-only experiment flows in `notebooklm-briefs/01-04`, `notebooklm-prompts/01-05`, `notebooklm-runs/01-03`.

## Success Criteria

The architecture is healthy only if:
- every mandatory regulated artifact clearly sells `genu.mark`;
- every mandatory regulated artifact shows the same ERP split;
- every mandatory regulated artifact keeps `еАкциз` external;
- every mandatory regulated artifact ends in audit / architecture session / pilot;
- the next agent can run the motion from `regulated-final-bundle/` without archaeology.
