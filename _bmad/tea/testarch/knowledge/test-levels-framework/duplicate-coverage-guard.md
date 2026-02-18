# Duplicate Coverage Guard

**Before adding any test, check:**

1. Is this already tested at a lower level?
2. Can a unit test cover this instead of integration?
3. Can an integration test cover this instead of E2E?

**Coverage overlap is only acceptable when:**

- Testing different aspects (unit: logic, integration: interaction, e2e: user experience)
- Critical paths requiring defense in depth
- Regression prevention for previously broken functionality
