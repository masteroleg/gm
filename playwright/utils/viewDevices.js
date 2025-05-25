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
	{ name: 'Generic Android', percent: 16.42 }
];

function pickDevice() {
	const rand = Math.random() * 100;
	let acc = 0;
	for (const device of deviceDistribution) {
		acc += device.percent;
		if (rand < acc) return device.name;
	}
	return 'Generic Android';
}

// Подсчёт реального распределения по 10000 выборок:
const counts = {};
const total = 10000;
for (let i = 0; i < total; i++) {
	const picked = pickDevice();
	counts[picked] = (counts[picked] || 0) + 1;
}

console.log('Распределение по 10000 выборок:');
for (const device of deviceDistribution) {
	const count = counts[device.name] || 0;
	const percent = ((count / total) * 100).toFixed(2);
	console.log(`${device.name}: ${count} (${percent}%)`);
}

// Запуск одного теста для демонстрации:
// const { chromium, devices } = require('playwright');
// async function runTest() {
//   const deviceName = pickDevice();
//   const profile = devices[deviceName] || {};
//   const browser = await chromium.launch();
//   const context = await browser.newContext({ ...profile });
//   const page = await context.newPage();
//   await page.goto('https://www.whatsmyua.info/');
//   await page.screenshot({ path: `screen_${deviceName}.png` });
//   await browser.close();
// }
// runTest();
