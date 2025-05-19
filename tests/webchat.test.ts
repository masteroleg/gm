import { test, expect } from '@playwright/test';
// --- config 
const BASE_URL = 'https://genu.im';
const PRODUCT_CHECK_PATH = '/perevir-produkt/';
const DEFAULT_TIMEOUT = 10000;
const TEST_ECODE = '123456';

// --- HUMAN-LIKE BEHAVIOR CONSTANTS ---
const MOUSE_IDLE_BASE_DELAY = 250; // ms
const MOUSE_IDLE_RANDOM_EXTRA = 400; // ms
const HUMAN_MOVE_STEPS_MIN = 2;
const HUMAN_MOVE_STEPS_MAX = 8;
const HUMAN_TYPING_DELAY_MIN = 80; // ms
const HUMAN_TYPING_DELAY_MAX = 180; // ms
const HUMAN_WAIT_TIMEOUTS = [8000, 9000, 10000, 11000, 12000];

/**
 * Main Playwright test:
 * Simulates a real user navigating to the product check chat,
 * with idle wandering or touch idling depending on device type (desktop/mobile).
 */
test('Enter 6-digit E-CODE into Azure BotFramework WebChat widget after human-like navigation (adaptive)', async ({ page, browserName }) => {
	// 1. Go to the homepage
	await page.goto(BASE_URL);

	// 1.1. Device-adaptive idle wandering
	const area = await getHumanMouseArea(page);
	const isMobile = await detectMobile(page);
	const supportsTouch = page.context()._options.hasTouch === true;

	if (isMobile) {
		await randomIdleTouchWander(page, area);
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

	// 3.1. Handle visibility for both mobile and desktop
	try {
		if (isMobile) {
			// For mobile, first try to find and click the menu button
			const menuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="navigation" i]');
			if (await menuButton.count() > 0) {
				await menuButton.first().click({ timeout: 5000 });
				await page.waitForTimeout(1000); // Wait for menu animation
			}

			// Then try to find the link directly
			await navLink.waitFor({ state: 'attached', timeout: 5000 });

			// Evaluate if element is in viewport
			const isInViewport = await navLink.evaluate((el) => {
				const rect = el.getBoundingClientRect();
				return (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <= window.innerHeight &&
					rect.right <= window.innerWidth
				);
			});

			if (!isInViewport) {
				// If not in viewport, try scrolling
				await page.evaluate((selector) => {
					const element = document.querySelector(selector);
					element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
				}, 'nav a:has-text("Перевір продукт")');
				await page.waitForTimeout(1000);
			}
		} else {
			// Desktop handling remains the same
			await navLink.scrollIntoViewIfNeeded();
			await page.waitForTimeout(1000);
		}

		// Final visibility check
		const isVisible = await navLink.isVisible();
		if (!isVisible) {
			throw new Error('Navigation link still not visible after all attempts');
		}

	} catch (e) {
		console.log('Navigation visibility handling failed:', e.message);
		// Continue anyway - we'll try to interact with force: true
	}

	// 4. Move/click as a human (touch for mobile if supported, mouse for desktop)
	if (isMobile && supportsTouch) {
		try {
			// For mobile, try direct click with force first
			await navLink.click({ force: true, timeout: 5000 });
		} catch (e) {
			console.log('Mobile click failed:', e.message);
			// Try alternative mobile click strategy
			await page.evaluate((selector) => {
				const element = document.querySelector(selector);
				if (element) {
					element.click();
				}
			}, 'nav a:has-text("Перевір продукт")');
		}
	} else {
		await humanWanderAndClick(page, navLink);
	}

	// 5. Wait for navigation and correct URL
	await page.waitForLoadState('domcontentloaded');
	await page.waitForURL(`**${PRODUCT_CHECK_PATH}*`, { timeout: DEFAULT_TIMEOUT });

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
	// Check for touch support and a small viewport width
	const hasTouch = page.context()._options.hasTouch === true;
	const isSmallViewport = await page.evaluate(() => window.innerWidth <= 650);
	return hasTouch || isSmallViewport;
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
	if (!page.context()._options.hasTouch || typeof page.touchscreen?.tap !== 'function') return;

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

function randomTimeout() {
	return HUMAN_WAIT_TIMEOUTS[Math.floor(Math.random() * HUMAN_WAIT_TIMEOUTS.length)];
}

