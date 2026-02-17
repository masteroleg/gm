import { defineConfig } from '@playwright/test';

const isCI = process.env.CI === 'true';

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: './test-results',
  timeout: 30_000,
  retries: isCI ? 2 : 0,
  fullyParallel: true,
  reporter: isCI
    ? [['github'], ['html', { open: 'never', outputFolder: 'playwright-report' }]]
    : 'list',
  use: {
    headless: true,
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    viewport: { width: 1280, height: 800 },
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: isCI
    ? [
        { name: 'Chromium', use: { browserName: 'chromium' } },
      ]
    : [
        { name: 'Chromium', use: { browserName: 'chromium' } },
        { name: 'Firefox',  use: { browserName: 'firefox' } },
        { name: 'WebKit',   use: { browserName: 'webkit' } },
        {
          name: 'Mobile Chrome',
          use: { browserName: 'chromium', viewport: { width: 375, height: 667 } },
        },
      ],
});
