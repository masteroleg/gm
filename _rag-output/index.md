---
generated: 2026-02-20T01:22:28.560Z
total_sessions: 8
---

# Session Knowledge Base Index

This directory contains processed conversation sessions organized by topic for RAG (Retrieval-Augmented Generation).

## Topics

| Topic | Description | Sessions |
|-------|-------------|----------|
| [system](./system/) | System Operations | 8 |
| [bmad-help](./bmad-help/) | BMAD Workflow Guidance | 6 |
| [frontend-design](./frontend-design/) | Frontend Design & UI | 6 |
| [bmad-pm-agent](./bmad-pm-agent/) | BMAD Product Manager Agent | 5 |
| [bmad-architect](./bmad-architect/) | BMAD Architect Agent | 5 |
| [error-rate-limit](./error-rate-limit/) | Rate Limit Errors | 4 |
| [bmad-analyst](./bmad-analyst/) | BMAD Analyst Agent | 3 |
| [code-init](./code-init/) | Codebase Initialization | 2 |

## Usage for RAG

Each session file contains:
- YAML frontmatter with metadata (session_id, date, topics)
- Conversation turns between user and assistant
- Topic classification

## Update Command

To update this knowledge base:

```bash
node _rag-sessions/process-sessions.js
```

Or with custom paths:

```bash
node _rag-sessions/process-sessions.js --source-dir=../.claude-sessions --output-dir=./_rag-output
```

---

*Last updated: 20.02.2026, 03:22:28*
