import { defineConfig, devices } from '@playwright/test';

const isCI = process.env.CI === 'true';
const mobileSpec = /genuim\.mobile\.spec\.ts/;


export default defineConfig({
	testDir: './tests/e2e',
	outputDir: './test-results',

	// В CI лучше меньше параллельности (уменьшает flaky)
	workers: isCI ? 2 : undefined,
	retries: isCI ? 2 : 0,

	timeout: 30_000,
	fullyParallel: true,

	reporter: isCI
		? [['github'], ['html', { open: 'never', outputFolder: 'playwright-report' }]]
		: 'list',

	// ✅ Playwright сам стартует сервер и ждёт готовности без “тупых 60 секунд”
	webServer: {
		command: 'npm run start:e2e',
		url: 'http://localhost:3000',
		reuseExistingServer: false,
		timeout: 120_000,
	},

	use: {
		baseURL: 'http://localhost:3000',
		headless: process.env.HEADED ? false : true,  // в CI headless, локально headed (UI дружит)

		// ✅ фиксируем тему, чтобы тесты не зависели от “prefers-color-scheme” CI/ОС
		colorScheme: 'light',

		viewport: { width: 1280, height: 800 },
		actionTimeout: 10_000,
		navigationTimeout: 30_000,

		screenshot: 'only-on-failure',
		trace: isCI ? 'on-first-retry' : 'retain-on-failure',
		video: isCI ? 'retain-on-failure' : 'off',
	},

	// ✅ Ровно то, что объясняет твою разницу: CI = 1 проект, локально = много
	projects: isCI
		? [
			{ name: 'Chromium', use: { browserName: 'chromium' }, testIgnore: mobileSpec },
		]
		: [
			{ name: 'Chromium', use: { browserName: 'chromium' }, },
			{ name: 'Firefox', use: { browserName: 'firefox' }, },
			{ name: 'WebKit', use: { browserName: 'webkit' }, },

			{ name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } }, // mobile spec тут будет выполняться
			{ name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },

		],
});