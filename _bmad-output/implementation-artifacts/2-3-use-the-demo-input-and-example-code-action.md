## Change Log

- 2026-03-13: Story `2.3` created. Proof-layer slice (Stories 2.1, 2.2, 2.4) cleared. Demo-input package scoped strictly to `/v/` input surface with three explicit contracts: input mapping (static two-state lookup, `GM-GENUIM-2026` → `/v/genuim/`, fallback → `/v/`), navigation (standard full-page browser navigation only, no SPA patterns), and demo-label persistence (guaranteed by static HTML on destination pages, not by JS).
- 2026-03-13: Story `2.3` implemented. All 5 tasks complete. Validation: lint ✅ typecheck ✅ jest 40/40 ✅ playwright 49/49 (chromium) ✅ playwright 17/17 (mobile-chrome) ✅. Status → review.
- 2026-03-13: Story `2.3` code review completed. Fixed case-insensitive input handling in `site/assets/js/demo-input.js` to properly handle all case variations and whitespace scenarios. Changed `resolveDestination()` to normalize both input and constant by removing all whitespace and converting to lowercase before comparison.
- 2026-03-13: Story `2.3` marked as done following code review. All acceptance criteria implemented, all tests passing, and architectural constraints preserved:
  * Navigation results in full page load (no client-side routing)
  * No in-page result rendering exists
  * `/v/` launches only pre-approved static destinations (`/v/genuim/` or `/v/`)
  * Demo/example labeling remains visible on `/v/` input surface from initial render
  * Demo/example labeling remains visible on destination states after navigation (static guarantee)
  * The `/v/` surface remains a deterministic static-state launcher and does not perform product-level verification, lookup, classification, or simulation of checking
  * Normalization (removing whitespace, case-insensitive comparison) is acceptable for Story 2.3 because:
    - It uses a single approved demo code
    - It has a tightly bounded mapping table
    - It does not introduce lookup behavior
    - It does not constitute product-level code validation
    - It does not introduce dynamic routing logic
    - Story status updated to done
    - Sprint status synchronized
    - Review findings logged
    - No open blockers remain