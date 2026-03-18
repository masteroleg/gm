# Spec: Token & Component Vars Refactor

## Scope

- Edit `site/assets/css/input.css`.
- Update governance and BMAD output documents needed to make the rule durable.
- Do not manually edit `site/assets/css/output.css`.

## Objectives

- Remove risky custom-property usage from shorthand `background`, `border`, `transition`, and `animation` declarations.
- Convert repeated state and theme visuals to component variable stacks.
- Standardize focus styling through outline-size and outline-offset fallbacks.

## MUST

- `site/assets/css/input.css` must not contain custom-property-backed shorthand declarations for `background`, `border`, `transition`, or `animation`.
- Border tokens must resolve through explicit width/style/color tokens rather than shorthand tokens.
- Components with repeated hover or dark-hover visual changes must read rendered values from private `--_` variables and override only public component variables in state selectors.
- `a, button` must expose a focus API through `--outline-size` and `--outline-offset` fallbacks.
- Component-specific focus overrides may introduce local private variables, but must preserve `--color-focus-ring` as the default token.
- Diff in application code must stay confined to `site/assets/css/input.css`.

## MUST NOT

- No design refresh.
- No palette changes.
- No markup changes.
- No file moves or CSS file splitting.
- No toolchain, build, or lint configuration changes.
- No manual edits to generated `site/assets/css/output.css`.

## Exact Replacements

- Replace shorthand `background` token usage with `background-color` or `background-image`, depending on whether the resolved value is a flat color or layered image.
- Replace shorthand border token usage with `border-width`, `border-style`, and `border-color` declarations sourced from explicit border tokens.
- Replace transition shorthand declarations with `transition-property`, `transition-duration`, and `transition-timing-function`.
- Replace `animation: var(--animate-float)` with explicit `animation-name`, `animation-duration`, `animation-timing-function`, and `animation-iteration-count`.
- Refactor cards, CTA buttons, evidence links, nav links, and demo input actions to component variable stacks using private `--_` variables.
- Refactor explicit focus outlines to variable-driven outline width and offset, with component overrides only where necessary.

## Acceptance Criteria

- `site/assets/css/input.css` has no custom-property-backed shorthand `background`, `border`, `transition`, or `animation` declarations.
- Dark hover duplication for `.content-card__cta`, `.demo-input__submit`, and `.demo-input__example` is implemented through variable overrides instead of repeated rendered properties.
- Focus outlines are parameterized with `--outline-size` and `--outline-offset` fallbacks.
- `npm run build:css` passes.
- `npm run lint` passes.

## Verification

- Search `site/assets/css/input.css` for forbidden shorthand patterns before validation.
- Review diff for scope discipline and absence of unrelated visual cleanup.
- Run `npm run build:css` and `npm run lint` after the refactor.
