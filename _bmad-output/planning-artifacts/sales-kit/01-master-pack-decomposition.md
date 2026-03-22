# Master Pack Decomposition - current model

## Goal

Turn the regulated sales kit into one controlled execution system instead of a loose folder tree.

## Current Decomposition

### 1. Final execution bundle

`regulated-final-bundle/` is the operator layer.

It exists so the next agent sees:
- control packet;
- approved regulated sources;
- exact run path;
- exact acceptance gate.

### 2. Approved upstream truth

These files define what must stay stable across all downstream outputs:
- `source-of-truth/01-platform-core.md`
- `source-of-truth/04-regulated-buyer-model.md`
- `source-of-truth/05-message-house.md`
- `source-of-truth/06-claims-register.md`

### 3. Approved buyer-facing regulated assets

These are the approved generation-ready source scripts:
- executive deck;
- why us;
- one job;
- edge cases;
- evidence pack;
- technical deck.

### 4. Mandatory generation paths

Every mandatory asset now has four execution layers:
- dedicated brief;
- dedicated prompt;
- dedicated runbook;
- dedicated QA gate with acceptance criteria.

### 5. Optional later branch

These stay outside the mandatory regulated path:
- `buyer-facing/shared/...`
- `buyer-facing/voluntary-later/...`
- legacy starter experiments for Dominanta.

## Rule

If a document cannot be mapped cleanly to one of the five layers above, it is either draft noise or needs to be reclassified.
