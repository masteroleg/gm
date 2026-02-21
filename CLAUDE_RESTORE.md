Claude sessions restore: only .claude-sessions

This pull request documents the restoration of Claude session logs to a pristine state (only the .claude-sessions directory). The restoration was performed from commit ec765fa2de3b96017347767c968f40d356218242, and touched the following files:

- .claude-sessions/1b1ba56f-7597-4525-a7fa-1cda6a9c2d2b.jsonl
- .claude-sessions/23dabb41-704e-4689-abcc-d2d41e432f90.jsonl
- .claude-sessions/36cb2137-ac04-42d6-ae12-db5b04fd5928.jsonl
- .claude-sessions/6f11c211-41c9-4d73-b607-62c0f0cb86be.jsonl
- .claude-sessions/8273f5f2-f1ed-4c05-a90f-e7fd7c63736c.jsonl
- .claude-sessions/bf9bbefa-aeb5-46aa-856e-2b24c02a80b3.jsonl
- .claude-sessions/c35eadbf-3b34-4ab1-b9c8-8bf7341a04b6.jsonl
- .claude-sessions/d0cd1940-c774-432a-9f3f-d27724b57e60.jsonl
- .claude-sessions/d89ff034-23b8-4c62-8f21-536cfd3011cb.jsonl

Rationale: enable reproducibility, auditing, and safe management of Claude memory while restricting changes to the Claude sessions directory only. No other repository areas were modified.

Verification:
- git ls-tree -r HEAD --name-only -- .claude-sessions
- git log -1 --stat

Security: The files contain session data; no content is printed here. If necessary, we can redact sensitive fields in a follow-up patch.
