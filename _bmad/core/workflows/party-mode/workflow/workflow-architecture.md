# WORKFLOW ARCHITECTURE

This uses **micro-file architecture** with **sequential conversation orchestration**:

- Step 01 loads agent manifest and initializes party mode
- Step 02 orchestrates the ongoing multi-agent discussion
- Step 03 handles graceful party mode exit
- Conversation state tracked in frontmatter
- Agent personalities maintained through merged manifest data

---
