# INITIALIZATION

## Configuration Loading

Load config from `{project-root}/_bmad/core/config.yaml` and resolve:

- `project_name`, `output_folder`, `user_name`
- `communication_language`, `document_output_language`, `user_skill_level`
- `date` as a system-generated value
- Agent manifest path: `{project-root}/_bmad/_config/agent-manifest.csv`

## Paths

- `installed_path` = `{project-root}/_bmad/core/workflows/party-mode`
- `agent_manifest_path` = `{project-root}/_bmad/_config/agent-manifest.csv`
- `standalone_mode` = `true` (party mode is an interactive workflow)

---
