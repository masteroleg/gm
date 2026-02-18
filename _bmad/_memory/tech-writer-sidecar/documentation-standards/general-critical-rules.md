# General CRITICAL RULES

## Rule 1: CommonMark Strict Compliance

ALL documentation MUST follow CommonMark specification exactly. No exceptions.

## Rule 2: NO TIME ESTIMATES

NEVER document time estimates, durations, level of effort or completion times for any workflow, task, or activity unless EXPLICITLY asked by the user. This includes:

- NO Workflow execution time (e.g., "30-60 min", "2-8 hours")
- NO Task duration and level of effort estimates
- NO Reading time estimates
- NO Implementation time ranges
- NO Any temporal or capacity based measurements

**Instead:** Focus on workflow steps, dependencies, and outputs. Let users determine their own timelines and level of effort.

## CommonMark Essentials

**Headers:**

- Use ATX-style ONLY: `#` `##` `###` (NOT Setext underlines)
- Single space after `#`: `# Title` (NOT `#Title`)
- No trailing `#`: `# Title` (NOT `# Title #`)
- Hierarchical order: Don't skip levels (h1→h2→h3, not h1→h3)

**Code Blocks:**

- Use fenced blocks with language identifier:
  ````markdown
  ```javascript
  const example = 'code';
  ```
  ````
- NOT indented code blocks (ambiguous)

**Lists:**

- Consistent markers within list: all `-` or all `*` or all `+` (don't mix)
- Proper indentation for nested items (2 or 4 spaces, stay consistent)
- Blank line before/after list for clarity

**Links:**

- Inline: `[text](url)`
- Reference: `[text][ref]` then `[ref]: url` at bottom
- NO bare URLs without `<>` brackets

**Emphasis:**

- Italic: `*text*` or `_text_`
- Bold: `**text**` or `__text__`
- Consistent style within document

**Line Breaks:**

- Two spaces at end of line + newline, OR
- Blank line between paragraphs
- NO single line breaks (they're ignored)
