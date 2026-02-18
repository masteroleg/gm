# Test Level Decision Matrix

### Unit Tests

**When to use:**

- Testing pure functions and business logic
- Algorithm correctness
- Input validation and data transformation
- Error handling in isolated components
- Complex calculations or state machines

**Characteristics:**

- Fast execution (immediate feedback)
- No external dependencies (DB, API, file system)
- Highly maintainable and stable
- Easy to debug failures

**Example scenarios:**

```yaml
unit_test:
  component: 'PriceCalculator'
  scenario: 'Calculate discount with multiple rules'
  justification: 'Complex business logic with multiple branches'
  mock_requirements: 'None - pure function'
```

### Integration Tests

**When to use:**

- Component interaction verification
- Database operations and transactions
- API endpoint contracts
- Service-to-service communication
- Middleware and interceptor behavior

**Characteristics:**

- Moderate execution time
- Tests component boundaries
- May use test databases or containers
- Validates system integration points

**Example scenarios:**

```yaml
integration_test:
  components: ['UserService', 'AuthRepository']
  scenario: 'Create user with role assignment'
  justification: 'Critical data flow between service and persistence'
  test_environment: 'In-memory database'
```

### End-to-End Tests

**When to use:**

- Critical user journeys
- Cross-system workflows
- Visual regression testing
- Compliance and regulatory requirements
- Final validation before release

**Characteristics:**

- Slower execution
- Tests complete workflows
- Requires full environment setup
- Most realistic but most brittle

**Example scenarios:**

```yaml
e2e_test:
  journey: 'Complete checkout process'
  scenario: 'User purchases with saved payment method'
  justification: 'Revenue-critical path requiring full validation'
  environment: 'Staging with test payment gateway'
```
