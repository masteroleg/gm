const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const https = require("node:https");

const DEFAULT_URL = process.env.LIGHTHOUSE_URL || "http://localhost:3000";
const OUTPUT_DIR = path.resolve(process.cwd(), "lighthouse-report");
const TEMP_DIR = path.resolve(process.cwd(), ".lighthouse-tmp");
const DEFAULT_CATEGORIES = [
	"performance",
	"accessibility",
	"best-practices",
	"seo",
];
const DEFAULT_THRESHOLDS = {
	performance: Number(process.env.LIGHTHOUSE_MIN_PERFORMANCE || 95),
	accessibility: Number(process.env.LIGHTHOUSE_MIN_ACCESSIBILITY || 95),
	"best-practices": Number(process.env.LIGHTHOUSE_MIN_BEST_PRACTICES || 95),
	seo: Number(process.env.LIGHTHOUSE_MIN_SEO || 95),
};

const args = process.argv.slice(2);
const runDesktop = args.includes("--desktop");
const runMobile = args.includes("--mobile");
const skipServer = args.includes("--no-server");
const enforceThresholds = args.includes("--enforce-thresholds");
const targetUrlArg = args.find((arg) => arg.startsWith("--url="));
const targetUrl = targetUrlArg ? targetUrlArg.slice(6) : DEFAULT_URL;
const requestedPresets = runDesktop || runMobile ? [] : ["mobile", "desktop"];

if (runMobile) {
	requestedPresets.push("mobile");
}

if (runDesktop) {
	requestedPresets.push("desktop");
}

const getHttpModule = (url) => (url.startsWith("https:") ? https : http);

const spawnProcess = (command, commandArgs, options = {}) => {
	if (process.platform === "win32") {
		return spawn("cmd.exe", ["/d", "/s", "/c", command, ...commandArgs], {
			cwd: process.cwd(),
			env: options.env || process.env,
			stdio: options.stdio || "inherit",
		});
	}

	return spawn(command, commandArgs, {
		cwd: process.cwd(),
		env: options.env || process.env,
		stdio: options.stdio || "inherit",
	});
};

const waitForUrl = (url, timeoutMs = 30_000) =>
	new Promise((resolve, reject) => {
		const startedAt = Date.now();

		const tryRequest = () => {
			const request = getHttpModule(url).get(url, (response) => {
				response.resume();
				if (response.statusCode && response.statusCode < 500) {
					resolve();
					return;
				}

				if (Date.now() - startedAt >= timeoutMs) {
					reject(new Error(`Timed out waiting for ${url}`));
					return;
				}

				setTimeout(tryRequest, 500);
			});

			request.on("error", () => {
				if (Date.now() - startedAt >= timeoutMs) {
					reject(new Error(`Timed out waiting for ${url}`));
					return;
				}

				setTimeout(tryRequest, 500);
			});
		};

		tryRequest();
	});

const loadLighthouseModules = async () => {
	const lighthouseModule = await import("lighthouse");
	const chromeLauncherModule = await import("chrome-launcher");

	return {
		lighthouse: lighthouseModule.default,
		launch: chromeLauncherModule.launch,
	};
};

const runLighthousePreset = async (preset, modules) => {
	const { lighthouse, launch } = modules;
	const reportPath = path.join(OUTPUT_DIR, `lighthouse-${preset}.json`);
	const chromeProfileDir = path.join(TEMP_DIR, `chrome-profile-${preset}`);

	fs.mkdirSync(chromeProfileDir, { recursive: true });

	const chrome = await launch({
		chromeFlags: ["--headless=new", `--user-data-dir=${chromeProfileDir}`],
		logLevel: "error",
	});

	try {
		const runnerResult = await lighthouse(targetUrl, {
			port: chrome.port,
			output: "json",
			logLevel: "error",
			onlyCategories: DEFAULT_CATEGORIES,
			emulatedFormFactor: preset === "desktop" ? "desktop" : "mobile",
			screenEmulation:
				preset === "desktop"
					? {
							disabled: false,
							mobile: false,
							width: 1350,
							height: 940,
							deviceScaleFactor: 1,
						}
					: undefined,
		});

		fs.writeFileSync(reportPath, runnerResult.report, "utf8");

		const lhr = runnerResult.lhr;
		const summary = Object.fromEntries(
			Object.entries(lhr.categories)
				.filter(([key]) => DEFAULT_CATEGORIES.includes(key))
				.map(([key, value]) => [key, Math.round((value.score || 0) * 100)]),
		);

		const failures = Object.entries(summary).filter(
			([key, score]) => score < DEFAULT_THRESHOLDS[key],
		);

		return { failures, preset, reportPath, summary };
	} finally {
		try {
			await chrome.kill();
		} catch (error) {
			if (!String(error.message).includes("EPERM")) {
				console.warn(
					`Lighthouse cleanup warning for ${preset}: ${error.message}`,
				);
			}
		}
	}
};

const main = async () => {
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	fs.mkdirSync(TEMP_DIR, { recursive: true });

	let serverProcess = null;

	try {
		if (!skipServer) {
			serverProcess = spawnProcess("npm", ["run", "start:e2e"], {
				stdio: "ignore",
			});
			await waitForUrl(targetUrl);
		}

		const modules = await loadLighthouseModules();
		const results = [];

		for (const preset of requestedPresets) {
			results.push(await runLighthousePreset(preset, modules));
		}

		let hasFailures = false;
		for (const result of results) {
			const scores = DEFAULT_CATEGORIES.map(
				(category) => `${category}=${result.summary[category]}`,
			).join(" ");
			console.log(
				`[lighthouse:${result.preset}] ${scores} -> ${path.relative(process.cwd(), result.reportPath)}`,
			);

			if (result.failures.length > 0) {
				hasFailures = true;
				console.error(
					`[lighthouse:${result.preset}] thresholds failed: ${result.failures
						.map(
							([key, score]) => `${key}=${score} < ${DEFAULT_THRESHOLDS[key]}`,
						)
						.join(", ")}`,
				);
			}
		}

		if (hasFailures && enforceThresholds) {
			process.exitCode = 1;
		}
	} finally {
		if (serverProcess && !serverProcess.killed) {
			serverProcess.kill();
		}
	}
};

main().catch((error) => {
	console.error("Lighthouse automation failed.");
	console.error(error.message);
	process.exitCode = 1;
});
