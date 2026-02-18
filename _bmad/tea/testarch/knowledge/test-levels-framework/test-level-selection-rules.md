# Test Level Selection Rules

### Favor Unit Tests When:

- Logic can be isolated
- No side effects involved
- Fast feedback needed
- High cyclomatic complexity

### Favor Integration Tests When:

- Testing persistence layer
- Validating service contracts
- Testing middleware/interceptors
- Component boundaries critical

### Favor E2E Tests When:

- User-facing critical paths
- Multi-system interactions
- Regulatory compliance scenarios
- Visual regression important
