# CSS Variable Refactor Implementation Notes

## Files Changed

- `site/assets/css/input.css`
- `docs/project-contract.md`
- `_bmad-output/project-context.md`
- `_bmad-output/css-var-refactor-analysis.md`
- `_bmad-output/spec-token-component-vars-refactor.md`

## Implemented Changes

- Replaced custom-property-backed shorthand `background`, `border`, `transition`, and `animation` declarations in `site/assets/css/input.css` with longhand equivalents.
- Replaced shorthand border tokens with explicit border width, style, and color tokens.
- Refactored repeated hover and dark-hover component visuals to private `--_` component variables with fallback stacks.
- Standardized link and button focus styles through `--outline-size` and `--outline-offset` fallback variables.
- Added durable project rules to `docs/project-contract.md` and `_bmad-output/project-context.md`.

## Scope Discipline

- No markup changes.
- No palette changes.
- No toolchain changes.
- `site/assets/css/output.css` was regenerated through the project build command, not edited manually.
