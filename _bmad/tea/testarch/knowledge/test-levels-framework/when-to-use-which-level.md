# When to Use Which Level

| Scenario               | Unit          | Integration       | E2E           |
| ---------------------- | ------------- | ----------------- | ------------- |
| Pure business logic    | ✅ Primary    | ❌ Overkill       | ❌ Overkill   |
| Database operations    | ❌ Can't test | ✅ Primary        | ❌ Overkill   |
| API contracts          | ❌ Can't test | ✅ Primary        | ⚠️ Supplement |
| User journeys          | ❌ Can't test | ❌ Can't test     | ✅ Primary    |
| Component props/events | ✅ Partial    | ⚠️ Component test | ❌ Overkill   |
| Visual regression      | ❌ Can't test | ⚠️ Component test | ✅ Primary    |
| Error handling (logic) | ✅ Primary    | ⚠️ Integration    | ❌ Overkill   |
| Error handling (UI)    | ❌ Partial    | ⚠️ Component test | ✅ Primary    |
