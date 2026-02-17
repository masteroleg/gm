import { defineConfig, devices } from '@playwright/test';

const isCI = process.env.CI === 'true';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  use: {
    headless: true,
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    viewport: { width: 1280, height: 800 },
  },
  projects: isCI 
    ? [{ name: 'Chromium', use: { browserName: 'chromium' } }]
    : [
        { name: 'Chromium', use: { browserName: 'chromium' } },
        { name: 'Firefox',  use: { browserName: 'firefox' } },
        { name: 'WebKit',   use: { browserName: 'webkit' } },
      ],
});
