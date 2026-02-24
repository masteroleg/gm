# Husky v9 Migration Notes

**Category:** tooling  
**Tags:** husky, git-hooks, migration  
**Created:** 2026-02-18

## Breaking Change from v8 to v9

Husky v9 changes the hook file format.

### v8 Format (OLD)

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Building CSS..."
npm run build:css
```

### v9 Format (NEW)

```bash
#!/bin/sh

echo "Building CSS..."
npm run build:css
```

**Key difference:** No `_/husky.sh` sourcing in v9.

## package.json Changes

```json
// v8
{
  "scripts": {
    "prepare": "husky install"
  }
}

// v9
{
  "scripts": {
    "prepare": "husky"
  }
}
```

## Windows Compatibility

On Windows, hook files MUST have proper shebang (`#!/bin/sh`) or git will fail with:
```
error: cannot spawn .husky/pre-push: No such file or directory
```

## Migration Steps

1. Update `package.json`: `"husky": "^9.1.7"`
2. Change prepare script: `"prepare": "husky"`
3. Update all hook files to v9 format (remove `_/husky.sh` line)
4. Ensure shebang present: `#!/bin/sh`
5. Run `npm install` to trigger prepare

---

**Sources:**
- Session: d0cd1940-c774-432a-9f3f-d27724b57e60
- Timestamps: 2026-02-18T19:29:52Z, 2026-02-18T19:32:36Z
