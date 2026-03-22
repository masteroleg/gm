# Sales-Kit Usage Guide

## Safe operating order

For the mandatory regulated motion, use this exact order:
1. `regulated-final-bundle/01-control-packet.md`
2. `regulated-final-bundle/02-approved-regulated-source-packet.md`
3. matching approved buyer-facing regulated asset
4. matching brief
5. matching prompt
6. matching QA gate
7. matching runbook

## One notebook = one asset

Never mix in one notebook:
- more than one mandatory regulated artifact;
- voluntary assets;
- optional shared assets unless the brief explicitly requires them;
- website or product-strategy docs.

## Common upload formula

Upload only:
1. the control packet;
2. the approved regulated source packet;
3. one approved buyer-facing regulated source asset;
4. one matching brief.

Paste the matching prompt separately.

## Common review formula

Every generated output must pass:
- its dedicated `notebooklm-qa/1x-...` file;
- `regulated-final-bundle/04-acceptance-gate.md`.

## Fail routing

- strategic drift -> fix `regulated-final-bundle/01-control-packet.md` or `regulated-final-bundle/02-approved-regulated-source-packet.md`;
- wrong asset structure -> fix the brief;
- weak output format or tone -> fix the prompt;
- reviewer disagreement -> fix the QA gate.

## Mandatory regulated sequence

Recommended usage order in a real deal:
1. executive deck;
2. why us;
3. one job;
4. edge cases;
5. evidence pack;
6. technical deck.

## Optional later materials

Use only after the regulated core is already accepted:
- `buyer-facing/shared/01-product-map.md`
- `buyer-facing/shared/02-packages.md`
- `buyer-facing/shared/03-roi.md`
- `buyer-facing/voluntary-later/...`
