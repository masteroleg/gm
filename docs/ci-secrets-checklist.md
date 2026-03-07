# CI Secrets Checklist

## Required Now

- No custom repository secrets are required for the current Pages pipeline

## GitHub Settings To Verify

1. `Settings -> Pages -> Source` is set to `GitHub Actions`
2. `Settings -> Branches -> Branch protection rules` includes required check `required-checks`
3. `Settings -> Environments -> github-pages` exists

## Optional Later

- Slack or other notification webhook if failure alerts should leave GitHub
- Pact Broker credentials if contract testing is added later:
  - `PACT_BROKER_BASE_URL`
  - `PACT_BROKER_TOKEN`
