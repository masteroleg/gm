const { chromium, devices } = require('playwright');

const deviceDistribution = [
	{ name: 'iPhone 11', percent: 7 },
	{ name: 'iPhone 13', percent: 6 },
	{ name: 'iPhone 14 Pro Max', percent: 5 },
	{ name: 'iPhone 15 Pro', percent: 4 },
	{ name: 'iPhone 15 Pro Max', percent: 4 },
	{ name: 'iPhone XR', percent: 4 },
	{ name: 'Pixel 7', percent: 32.4 }, // Xiaomi + Google + Motorola 
	{ name: 'Galaxy S8', percent: 10.6 },
	{ name: 'Galaxy S9+', percent: 10.59 },
	{ name: 'Desktop Chrome', percent: 16.42 } // Changed from Generic Android
];

function pickDevice() {
	const totalPercent = deviceDistribution.reduce((sum, device) => sum + device.percent, 0);
	if (Math.abs(totalPercent - 100) > 0.1) { // Increased tolerance for floating-point inaccuracies
		throw new Error(`Device distribution percentages do not sum to 100. Current total: ${totalPercent}`);
	}

	const rand = Math.random() * 100;
	let acc = 0;
	for (const device of deviceDistribution) {
		acc += device.percent;
		if (rand < acc) return device.name;
	}
	return 'Desktop Chrome'; // Default to desktop
}

const randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

async function runTest(i) {
	const deviceName = pickDevice();
	const device = devices[deviceName];

	// Configure browser context based on device type
	const contextOptions = device ? {
		...device,
		viewport: device.viewport,
		userAgent: device.userAgent
	} : {
		viewport: { width: 1920, height: 1080 },
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
	};

	try {
		const browser = await chromium.launch({ headless: true });
		const context = await browser.newContext(contextOptions);
		const page = await context.newPage();

		await page.goto('https://genu.im/', { waitUntil: 'networkidle' });
		await randomDelay();

		// Scroll with random values
		// Simulate user behavior by scrolling a random distance between 200 and 500 pixels
		const scrollY = Math.floor(Math.random() * 300) + 200;
		// await page.mouse.wheel( deltaX: 0, deltaY: scrollY );
		await randomDelay();

		await page.goto('https://genu.im/perevir-produkt/', { waitUntil: 'networkidle' });
		await randomDelay();

		// Optional: Take screenshots with device name and timestamp
		// const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
		// await page.screenshot({ path: `screenshots/${deviceName}_${timestamp}_${i}.png` });

		await browser.close();
		console.log(`Test ${i} completed for ${deviceName}`);
	} catch (error) {
		console.error(`Error in test ${i} for ${deviceName}:`, error.message);
	}
}

// Run tests in batches to avoid overwhelming the system
async function runTestBatch(start, count, batchSize = 5) {
	for (let i = start; i < start + count; i += batchSize) {
		const batch = Array.from({ length: Math.min(batchSize, start + count - i) }, (_, j) => runTest(i + j));
		await Promise.all(batch);
		await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between batches
	}
}

// Main execution
const totalTests = 100; // Define number of tests to run
(async () => {
		const batchSize = parseInt(process.env.BATCH_SIZE, 10) || 5; // Allow dynamic batch size via environment variable
		await runTestBatch(0, totalTests, batchSize);
	try {
		console.log(`Starting ${totalTests} tests...`);
		const startTime = Date.now();

		await runTestBatch(0, totalTests);

		const duration = (Date.now() - startTime) / 1000;
		console.log(`All tests completed in ${duration.toFixed(2)} seconds`);
	} catch (error) {
		console.error('Test execution failed:', error);
		return;
	}
})();
