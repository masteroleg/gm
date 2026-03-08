import {
	defineConfig,
	devices,
	type ReporterDescription,
} from "@playwright/test";

const isCI = process.env.CI === "true";
const mobileSpec = /genuim\.mobile\.spec\.ts/;
const selectedProject = process.env.PW_PROJECT;
const ciReporter: ReporterDescription[] = [
	["dot", {}],
	["html", { open: "never", outputFolder: "playwright-report" }],
	["junit", { outputFile: "test-results/results.xml" }],
] as ReporterDescription[];
const desktopProjects = [
	{
		name: "chromium",
		use: { browserName: "chromium" as const },
		testIgnore: mobileSpec,
	},
	{
		name: "firefox",
		use: { browserName: "firefox" as const },
		testIgnore: mobileSpec,
	},
	{
		name: "webkit",
		use: { browserName: "webkit" as const },
		testIgnore: mobileSpec,
	},
];
const mobileProjects = [
	{ name: "mobile-chrome", use: { ...devices["Pixel 5"] } },
	{ name: "mobile-safari", use: { ...devices["iPhone 13"] } },
];

export default defineConfig({
	testDir: "./tests/e2e",
	outputDir: "./test-results",

	// В CI лучше меньше параллельности (уменьшает flaky)
	workers: isCI ? 2 : undefined,
	retries: isCI ? 2 : 0,

	timeout: 30_000,
	fullyParallel: true,
	forbidOnly: isCI,

	reporter: isCI ? ciReporter : "list",

	// ✅ Playwright сам стартует сервер и ждёт готовности без “тупых 60 секунд”
	webServer: {
		command: "npm run start:e2e",
		url: "http://localhost:3000",
		reuseExistingServer: !isCI,
		timeout: 120_000,
	},

	use: {
		baseURL: "http://localhost:3000",
		headless: !process.env.HEADED, // в CI headless, локально headed (UI дружит)

		// ✅ фиксируем тему, чтобы тесты не зависели от “prefers-color-scheme” CI/ОС
		colorScheme: "light",

		viewport: { width: 1280, height: 800 },
		actionTimeout: 10_000,
		navigationTimeout: 30_000,

		screenshot: "only-on-failure",
		trace: isCI ? "on-first-retry" : "retain-on-failure",
		video: isCI ? "retain-on-failure" : "off",
	},

	// ✅ Ровно то, что объясняет твою разницу: CI = 1 проект, локально = много
	projects: [...desktopProjects, ...mobileProjects].filter(
		(project) => !selectedProject || project.name === selectedProject,
	),
});
