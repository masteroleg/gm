# GENU.IM Project Contract

_Permanent implementation and review rules for all future BMAD dev-story and code-review workflows._

## 1. Delivery Discipline

- Implement strictly within the active story scope.
- Do not pull in behavior from future stories.
- Prefer narrow, low-risk changes over broad rewrites.
- Avoid unnecessary formatting churn and unrelated cleanup.
- If story scope is ambiguous, stop and report ambiguity before coding.

## 2. Contract-First Rule

For every dev-story, use contract first, patch second.

Before writing code, always state:

- story scope
- what is explicitly out of scope
- files to change
- protected files and areas not to change
- user-visible behavior that will change
- behavior that must remain unchanged
- tests to add or update
- commands to run for validation

If this contract cannot be stated clearly in 8-12 lines, stop and report ambiguity before implementation.

## 3. Architecture Rule

- Preserve the current static-site architecture unless a story explicitly requires otherwise.
- No backend, server submission, cookies, SSR, or framework migration unless explicitly required by an approved story.
- Preserve existing controller contracts unless the active story explicitly changes them.

## 4. HTML Implementation Rules

Use clean, semantic, maintainable HTML.

Always prefer semantic HTML over generic wrapper markup.

Required practices:

- use appropriate semantic elements where possible
- maintain correct heading hierarchy
- use links for navigation and buttons for actions
- avoid unnecessary nested div wrappers
- preserve accessibility labels and meaningful names
- keep visible text, aria-labels, and translation keys aligned
- preserve responsive integrity, including 360px baseline

Allowed improvements:

- low-risk semantic HTML improvements
- low-risk accessibility improvements
- low-risk maintainability improvements

Not allowed:

- broad structural rewrites outside story scope
- framework or component migration
- markup churn without product value

## 5. Accessibility Rules

Accessibility must remain aligned across:

- visible labels
- aria-labels
- translation strings
- fallback HTML

Never allow conflicting wording between visible UI text and accessibility labels.

## 6. Copy and Product Language Rules

Tone of voice must remain:

- clear
- calm
- factual
- confident

Avoid:

- hype
- exaggerated marketing language
- bureaucratic tone
- unnecessary technical jargon in user-facing copy

## 7. Product Positioning Rule

The site must preserve the following model in all user-facing copy:

- Brand publishes product proof -> `genu.mark`
- Official state verification -> `Diia`

Never imply that the site itself performs official state verification.

## 8. Translation Rule (EN / UK)

Translations must preserve semantic meaning, UX role, and product positioning.

Target parity is semantic, not word-for-word.

EN and UK should communicate:

- the same meaning
- the same confidence level
- the same product intent

They do not need literal structural parity.

## 9. Ukrainian Copy Rule

Ukrainian must be idiomatic and natural.

Avoid:

- calques from English
- mixed-language compounds
- wording that sounds machine-translated
- wording that sounds like a government service or technical platform unless required

Prefer natural Ukrainian interface language.

## 10. Misleading Claims Rule

Do not imply:

- live lookup
- real-time verification
- official verification
- backend submission
- stored request confirmation

unless explicitly required by an approved story.

## 11. Hero / Landing Copy Rule

Hero sections should follow:

- eyebrow: what this surface is
- title: core thesis
- description: how it works
- CTA: next step

Signal elements must remain secondary and must not carry critical product meaning.

## 12. CTA Rule

CTA text must describe the next action clearly.

Avoid vague or hype-based CTA language.

Prefer action labels that match actual navigation or proof-view behavior.

## 13. Code Review Rules

All code reviews must check:

- story scope adherence
- semantic HTML quality
- accessibility consistency
- translation consistency
- absence of misleading product claims
- regression risk
- adequacy of tests for critical behavior

Classify findings as:

- blocking
- should-fix
- non-blocking

## 14. Test Coverage Rule

Critical UI behavior must be covered by tests.

Examples:

- primary CTA destination
- presence of key product entities (`genu.mark`, `Diia`)
- hero messaging intent
- responsive behavior
- accessibility-sensitive label consistency where practical

Add smoke coverage for critical flows when practical.

## 15. Story Execution Rule

Preferred sequence:

- contract first
- implement
- run validation
- update story record
- update file list
- update sprint status
- only then move to the next story

Do not start the next story before the current one has passed dev validation and review discipline.
