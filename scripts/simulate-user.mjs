import { chromium } from "playwright";

const BASE = "https://genu.im";

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick(arr) {
	return arr[rand(0, arr.length - 1)];
}

async function humanDelay(min, max) {
	const ms = rand(min, max);
	return new Promise((r) => setTimeout(r, ms));
}

async function humanScroll(page) {
	await page.evaluate(() => {
		const total = document.body.scrollHeight;
		const steps = 3 + Math.floor(Math.random() * 3);
		const step = total / steps;
		let pos = 0;
		const scroll = () => {
			pos += step;
			if (pos < total - 100) {
				window.scrollTo({ top: pos, behavior: "smooth" });
				setTimeout(scroll, 300 + Math.random() * 700);
			}
		};
		scroll();
	});
	await humanDelay(800, 2000);
}

async function randomHover(page) {
	const interactive = page.locator("button, a, input, select, textarea");
	const iCount = await interactive.count();
	const n = Math.min(iCount, rand(1, 5));
	for (let i = 0; i < n; i++) {
		const el = interactive.nth(rand(0, Math.max(0, iCount - 1)));
		if (await el.isVisible()) {
			try { await el.hover(); } catch {}
			await humanDelay(100, 400);
		}
	}
}

async function applyLang(page, lang) {
	await humanDelay(500, 1500);
	const current = await page.evaluate(() => document.documentElement.lang);
	if (current === lang) return;
	const toggle = page.locator("#langToggle");
	if (await toggle.isVisible()) {
		await toggle.click();
		await humanDelay(2000, 3500);
	}
}

async function applyTheme(page, theme) {
	await humanDelay(500, 1500);
	if (theme === "light") return;
	const btn = page.locator("#themeToggle");
	if (await btn.isVisible() && await btn.getAttribute("aria-pressed") !== "true") {
		await btn.click();
		await humanDelay(1000, 2000);
	}
}

// --- Interaction behaviors ---

async function actNormal(page) {
	await humanScroll(page);
	await randomHover(page);
}

async function actFormFill(page) {
	const fields = [
		{ sel: "#contactName", val: "Oleksandr Kovalenko" },
		{ sel: "#contactEmail", val: "oleksandr@example.com" },
		{ sel: "#companyName", val: "Tech Innovations Ltd" },
	];
	for (const f of fields) {
		const el = page.locator(f.sel);
		if (await el.isVisible()) {
			await el.click();
			await humanDelay(200, 500);
			await el.fill(f.val);
			await humanDelay(300, 800);
		}
	}
	const sel = page.locator("#scenario");
	if (await sel.isVisible()) {
		await sel.selectOption(pick(["brand-proof", "eaktsyz"]));
		await humanDelay(300, 700);
	}
	// don't submit, human reader might just browse
	if (Math.random() < 0.4) {
		const submit = page.locator('button[type="submit"]');
		if (await submit.isVisible()) {
			await humanDelay(2000, 4000);
			await submit.click();
			await humanDelay(3000, 5000);
		}
	}
}

async function actVerify(page) {
	const input = page.locator("#proofCode");
	if (await input.isVisible()) {
		await input.click();
		await humanDelay(400, 900);
		await input.fill("GM-GENUIM-2026");
		await humanDelay(2000, 4000);
		if (Math.random() < 0.6) {
			const submit = page.locator('button[type="submit"]');
			if (await submit.isVisible()) {
				await submit.click();
				await humanDelay(3000, 6000);
			}
		}
		const example = page.locator('a[href*="/v/genuim/"]');
		if (await example.isVisible() && Math.random() < 0.5) {
			await example.click();
			await humanDelay(3000, 5000);
		}
	}
}

async function actStudyFacts(page) {
	const facts = page.locator(".fact-panel, [class*='fact'], .proof-card, main li, main dd, main dt, section > div > p");
	const count = await facts.count();
	for (let i = 0; i < Math.min(count, rand(3, 7)); i++) {
		if (await facts.nth(i).isVisible()) {
			await facts.nth(i).hover();
			await humanDelay(600, 1500);
		}
	}
	await humanScroll(page);
}

async function actStudyKnowledge(page) {
	const headings = page.locator("h2, h3, h4");
	const hCount = await headings.count();
	for (let i = 0; i < hCount; i++) {
		const h = headings.nth(i);
		if (await h.isVisible()) {
			await h.hover();
			await humanDelay(500, 1200);
		}
	}
	await humanScroll(page);
}

// --- User profiles ---

const PROFILES = [
	{
		name: "Прямий візит (direct)",
		referrer: null,
		entry: "/",
		depth: "deep", // visits many pages
	},
	{
		name: "Пошуковий (organic)",
		referrer: "https://www.google.com/search?q=verify+documents+ukraine",
		entry: pick(["/", "/v/", "/about/"]),
		depth: "medium",
	},
	{
		name: "Реферал від партнера",
		referrer: "https://partner-site.com/resources/verification",
		entry: pick(["/", "/knowledge/"]),
		depth: "medium",
	},
	{
		name: "Соцмережі (LinkedIn)",
		referrer: "https://www.linkedin.com/posts/genuim_document-verification",
		entry: pick(["/about/", "/knowledge/", "/"]),
		depth: "shallow",
	},
	{
		name: "Стурбований користувач (concerned user)",
		referrer: pick(["https://www.google.com/search?q=check+document+authenticity", null]),
		entry: "/v/",
		depth: "focused", // verification-focused
	},
	{
		name: "Бізнес-клієнт (business inquiry)",
		referrer: pick(["https://www.google.com/search?q=document+verification+API", null]),
		entry: "/request/",
		depth: "shallow",
	},
	{
		name: "Повторний візит (returning)",
		referrer: null,
		entry: pick(["/", "/v/genuim/"]),
		depth: "quick",
	},
	{
		name: "Згадка в новинах (news referral)",
		referrer: "https://news-site.com/ukraine-tech-genuim",
		entry: pick(["/", "/about/"]),
		depth: "deep",
	},
];

const ALL_PAGES = [
	{ path: "/", name: "homepage" },
	{ path: "/about/", name: "about" },
	{ path: "/contact/", name: "contact" },
	{ path: "/faq/", name: "faq" },
	{ path: "/knowledge/", name: "knowledge" },
	{ path: "/privacy/", name: "privacy" },
	{ path: "/proof-cases/", name: "proof-cases" },
	{ path: "/request/", name: "request" },
	{ path: "/terms/", name: "terms" },
	{ path: "/v/", name: "verification-input" },
	{ path: "/v/genuim/", name: "verification-proof" },
];

async function runProfile(browser, profile) {
	const context = await browser.newContext({
		viewport: { width: rand(1024, 1920), height: rand(700, 1080) },
		colorScheme: pick(["light", "dark"]),
	});

	const page = await context.newPage();

	if (profile.referrer) {
		await page.goto(profile.referrer, { waitUntil: "domcontentloaded" }).catch(() => {});
		await humanDelay(500, 1500);
	}

	console.log(`  [${profile.name}] Entry: ${profile.entry}`);
	await page.goto(`${BASE}${profile.entry}`, { waitUntil: "networkidle" });
	await humanDelay(2000, 5000);
	await humanScroll(page);

	const visited = new Set();
	const queue = [profile.entry];

		while (queue.length > 0) {
		const current = queue.shift();
		if (visited.has(current)) continue;
		visited.add(current);
		console.log(`  [${profile.name}] ON: ${current}`);

		const pageInfo = ALL_PAGES.find((p) => p.path === current);

		if (pageInfo) {
			if (pageInfo.name === "verification-input") {
				await actVerify(page);
			} else if (pageInfo.name === "request") {
				await actFormFill(page);
			} else if (pageInfo.name === "verification-proof") {
				await actStudyFacts(page);
			} else if (pageInfo.name === "knowledge") {
				await actStudyKnowledge(page);
			} else {
				await actNormal(page);
			}
		} else {
			await actNormal(page);
		}

		// determine next pages based on depth
		const enqueue = (path) => {
			if (!visited.has(path) && !queue.includes(path)) queue.push(path);
		};
		if (profile.depth === "deep") {
			const unvisited = ALL_PAGES.filter((p) => !visited.has(p.path));
			const next = unvisited.slice(0, rand(1, 3));
			for (const n of next) enqueue(n.path);
		} else if (profile.depth === "medium") {
			const unvisited = ALL_PAGES.filter((p) => !visited.has(p.path) && p.path !== profile.entry);
			const next = unvisited.slice(0, rand(0, 2));
			for (const n of next) enqueue(n.path);
		} else if (profile.depth === "focused") {
			for (const np of ["/v/genuim/", "/", "/about/"]) enqueue(np);
		} else if (profile.depth === "shallow") {
			const unvisited = ALL_PAGES.filter((p) => !visited.has(p.path));
			const next = unvisited.slice(0, rand(0, 1));
			for (const n of next) enqueue(n.path);
		}

		if (queue.length > 0) {
			const next = queue[0];
			console.log(`  [${profile.name}] → ${next}`);
			await page.goto(`${BASE}${next}`, { waitUntil: "networkidle" });
			await humanDelay(1500, 4000);
		}
	}

	await humanDelay(1000, 3000);
	await context.close();
}

const browser = await chromium.launch({ headless: false });

for (let cycle = 1; cycle <= 10; cycle++) {
	console.log(`\n========== CYCLE ${cycle}/10 ==========`);

	const cycleProfiles = cycle <= 2
		? PROFILES.slice(0, 4)    // first cycles: mostly direct + search
		: PROFILES.sort(() => Math.random() - 0.5).slice(0, rand(4, 8));

	for (const profile of cycleProfiles) {
		console.log(`\n--- ${profile.name} ---`);
		await runProfile(browser, profile);
	}

	const breakSec = rand(8, 20);
	console.log(`\n  --- Break ${breakSec}s ---`);
	await humanDelay(breakSec * 1000, (breakSec + 5) * 1000);
}

console.log("\n✅ All 10 cycles complete!");
await browser.close();
