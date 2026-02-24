# CI/CD Value for Static Sites

**Category:** infrastructure  
**Tags:** github-actions, ci, testing  
**Created:** 2026-02-18

## Context

This project uses GitHub Pages without a build step. Files are served directly from the repository.

## Question

Is CI necessary if there's no build?

## Answer

**Yes, for one specific reason: dependabot PRs.**

### What CI Catches

| Risk | CI catches? | Alternative |
|------|-------------|-------------|
| Broken JS toggle | ✅ | Manual testing |
| Broken HTML | ✅ | Visible immediately |
| **Dependabot regression** | ✅ | **Nothing without CI** |
| Outdated `output.css` | ❌ | Pre-push hook handles |

### Real Example

Husky 9 and Jest 30 upgrades via dependabot — CI confirmed they don't break functionality. Without CI, you'd never know until production.

### What CI Doesn't Do

- Doesn't deploy (GitHub Pages auto-deploys from main)
- Doesn't build CSS (pre-commit hook handles)
- Doesn't test production URL (tests localhost)

## Recommendation

Keep CI as-is. It's free for public repos, runs in ~2 minutes, and provides safety net for dependency upgrades.

## Future

If adding Azure Static Web Apps (Epic 3), CI will need build step for SPA.

---

**Sources:**
- Session: d0cd1940-c774-432a-9f3f-d27724b57e60
- Timestamp: 2026-02-18T19:51:31Z
