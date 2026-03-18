# CSS Variable Refactor Analysis

## Rules

1. Do not use custom properties in shorthand declarations where an invalid variable can invalidate the whole declaration.
2. Use component variable stacks so components read resolved values from `var(--component, var(--global))` style chains.
3. Drive state changes by overriding variables instead of repeating resolved visual properties.
4. Standardize focus styles through variable-driven outline size and offset fallbacks.

## Violations Inventory

### Shorthand declarations using custom properties

- `site/assets/css/input.css:523` `.hero-card` used `border: var(--border-strong)` and `background: var(--gradient-hero)`.
- `site/assets/css/input.css:698` `.cta-button` used transition shorthand with duration and easing vars.
- `site/assets/css/input.css:707` `.content-card__cta` used `background: var(--color-brand)` and `transition: background ...`.
- `site/assets/css/input.css:799` `.vcard` used `border: var(--border-proof)` and `animation: var(--animate-float)`.
- `site/assets/css/input.css:1338` card components used `border: var(--border-subtle)` and transition shorthand with vars.
- `site/assets/css/input.css:3560` `.demo-input__field` and `site/assets/css/input.css:3593` `.demo-input__submit` used shorthand declarations with custom-property-backed values.

### State and theme duplication

- `site/assets/css/input.css:1364` card hover state repeated resolved `box-shadow` and `border-color` values.
- `site/assets/css/input.css:1707` `.content-card__cta`, `site/assets/css/input.css:3610` `.demo-input__submit`, and `site/assets/css/input.css:3631` `.demo-input__example` repeated resolved visual values across base, hover, and dark hover selectors.
- `site/assets/css/input.css:3389` `.proof-evidence-link`, `site/assets/css/input.css:2962` `.info-back-link`, `site/assets/css/input.css:3689` `.footer-nav__link`, and control/navigation links repeated hover opacity or background values instead of overriding component vars.

### Focus API gaps

- `site/assets/css/input.css:253` only set `outline-color` for `a, button` without standardized size and offset fallbacks.
- `site/assets/css/input.css:1719`, `site/assets/css/input.css:3582`, `site/assets/css/input.css:3614`, and `site/assets/css/input.css:3635` hardcoded outline width and offset values instead of variable-driven focus API.

## Exact Replacement Map

- Shorthand `background` declarations with custom properties -> `background-color` or `background-image` longhands.
- Tokenized border shorthands -> `border-width`, `border-style`, `border-color` with dedicated border tokens.
- Transition shorthands -> `transition-property`, `transition-duration`, `transition-timing-function`.
- `animation: var(--animate-float)` -> explicit animation longhands.
- Repeated hover/dark visual properties -> component private vars with `--_` fallback stacks.
- Hardcoded focus outlines -> `--outline-size` / `--outline-offset` fallbacks plus component override vars where needed.
