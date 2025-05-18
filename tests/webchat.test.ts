import { test, expect } from '@playwright/test';

// --- HUMAN-LIKE BEHAVIOR CONSTANTS ---
const MOUSE_IDLE_BASE_DELAY = 250; // ms
const MOUSE_IDLE_RANDOM_EXTRA = 400; // ms
const HUMAN_MOVE_STEPS_MIN = 2;
const HUMAN_MOVE_STEPS_MAX = 8;
const HUMAN_TYPING_DELAY_MIN = 80; // ms
const HUMAN_TYPING_DELAY_MAX = 180; // ms

/**
 * Main Playwright test:
 * Simulates a real user navigating to the product check chat,
 * with idle wandering or touch idling depending on device type (desktop/mobile).
 */
test('Enter 6-digit E-CODE into Azure BotFramework WebChat widget after human-like navigation (adaptive)', async ({ page, browserName }) => {
	// 1. Go to the homepage
	await page.goto('https://genu.im');

	// 1.1. Device-adaptive idle wandering
	const area = await getHumanMouseArea(page);
	const isMobile = await detectMobile(page);
	if (isMobile) {
		await randomIdleTouchWander(page, area); // эмулирует "задумчивый" пользователь мобильника
	} else {
		await randomIdleMouseWander(page, area);
	}

	// 2. Locate the "Перевір продукт" link
	const navLink = page.locator('nav a', { hasText: 'Перевір продукт' });

	// 3. Fail the test if the link is missing
	if (!(await navLink.count())) {
		console.log('⚠️  Navigation link "Перевір продукт" not found. Test marked as failed.');
		expect(await navLink.count(), '"Перевір продукт" link should exist on the page').toBeGreaterThan(0);
		return;
	}

	// 4. Move/click as a human (touch for mobile, mouse for desktop)
	await navLink.waitFor({ timeout: 10000 });
	if (isMobile) {
		await navLink.tap();
	} else {
		await humanWanderAndClick(page, navLink);
	}

	// 5. Wait for navigation and correct URL
	await page.waitForLoadState('domcontentloaded');
	await page.waitForURL('**/perevir-produkt*', { timeout: 10000 });

	// 6. Wait for the webchat widget and its input field
	await page.waitForSelector('#webchat', { timeout: 10000 });
	const webchatInputSelector = '#webchat input[type="text"], #webchat textarea';
	await page.waitForSelector(webchatInputSelector, { timeout: 15000 });

	// 7. Move mouse/tap input and click/focus
	const input = page.locator(webchatInputSelector);
	const inputBox = await input.boundingBox();
	if (isMobile) {
		await input.tap();
	} else if (inputBox) {
		await page.mouse.move(
			inputBox.x + inputBox.width / 2 + (Math.random() - 0.5) * 10,
			inputBox.y + inputBox.height / 2 + (Math.random() - 0.5) * 10,
			{ steps: Math.floor(Math.random() * 8) + 4 }
		);
		await input.click();
	}

	// 8. Type code with random delays, simulating a real user
	const code = 'A1B2C3';
	for (const char of code) {
		await page.keyboard.type(char, { delay: randomDelay() });
	}

	// 9. Press Enter to submit
	await page.keyboard.press('Enter');

	/*
	// Optionally: Check bot's response in chat
	const responseSelector = '#webchat [role="log"]';
	await page.waitForSelector(responseSelector);
	const responseText = await page.locator(responseSelector).innerText();
	expect(responseText).toMatch(/YES|NO|OOPS/i);
	console.log('Bot response:', responseText);
	*/
});

/**
 * Detects if page is mobile (viewport or Playwright context flag)
 */
async function detectMobile(page) {
	const isMobile = (await page.evaluate(() =>
		!!(window.matchMedia && window.matchMedia('(max-width: 650px), (hover: none)').matches)
	)) || (page.context()._options.isMobile === true); // Playwright context flag
	return !!isMobile;
}

/**
 * Returns UX-adaptive mouse/touch wandering area based on viewport
 */
async function getHumanMouseArea(page) {
	const viewport = page.viewportSize() || { width: 1024, height: 768 };
	return {
		left: Math.round(viewport.width * 0.1),
		top: Math.round(viewport.height * 0.2),
		width: Math.round(viewport.width * 0.6),
		height: Math.round(viewport.height * 0.4),
	};
}

/**
 * Moves the mouse in a human-like manner toward the target element and clicks it.
 */
async function humanWanderAndClick(page, targetLocator) {
	const box = await targetLocator.boundingBox();
	if (!box) throw new Error('Element not visible for mouse movement.');
	const points = [
		[box.x - 40 + Math.random() * 80, box.y - 40 + Math.random() * 70],
		[box.x + box.width / 2 + (Math.random() - 0.5) * 20, box.y + box.height / 2 + (Math.random() - 0.5) * 20],
		[box.x + box.width / 2, box.y + box.height / 2],
	];
	for (let i = 0; i < points.length - 1; i++) {
		const [toX, toY] = points[i + 1];
		const steps = Math.floor(Math.random() * (HUMAN_MOVE_STEPS_MAX - HUMAN_MOVE_STEPS_MIN + 1)) + HUMAN_MOVE_STEPS_MIN;
		await page.mouse.move(toX, toY, { steps });
	}
	await page.mouse.click(
		box.x + box.width / 2 + (Math.random() - 0.5) * 2,
		box.y + box.height / 2 + (Math.random() - 0.5) * 2
	);
}

/**
 * Moves the mouse randomly within a defined area, simulating a hesitant or thinking user.
 */
async function randomIdleMouseWander(page, area, iterations = 3) {
	for (let i = 0; i < iterations + Math.floor(Math.random() * 3); i++) {
		await page.mouse.move(
			area.left + Math.random() * area.width,
			area.top + Math.random() * area.height,
			{ steps: Math.floor(Math.random() * (HUMAN_MOVE_STEPS_MAX - HUMAN_MOVE_STEPS_MIN + 1)) + HUMAN_MOVE_STEPS_MIN }
		);
		await page.waitForTimeout(MOUSE_IDLE_BASE_DELAY + Math.random() * MOUSE_IDLE_RANDOM_EXTRA);
	}
}

/**
 * For mobile: randomly taps (idle) in central UX area, as if thinking
 */
async function randomIdleTouchWander(page, area, iterations = 2) {
	for (let i = 0; i < iterations + Math.floor(Math.random() * 2); i++) {
		const x = area.left + Math.random() * area.width;
		const y = area.top + Math.random() * area.height;
		await page.touchscreen.tap(x, y);
		await page.waitForTimeout(MOUSE_IDLE_BASE_DELAY + Math.random() * MOUSE_IDLE_RANDOM_EXTRA);
	}
}

/**
 * Returns a random delay to simulate human typing speed between keystrokes.
 */
function randomDelay(min = HUMAN_TYPING_DELAY_MIN, max = HUMAN_TYPING_DELAY_MAX) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
