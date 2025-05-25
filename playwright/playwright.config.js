import fs from 'fs';
import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';
import deviceDistribution from './config/deviceDistribution.js';

dotenv.config();

const PROXY_MODE = process.env.PROXY_MODE || 'none';

let proxyConfig = undefined;

if (PROXY_MODE === 'single') {
	// Прокси из .env
	if (process.env.PW_PROXY_SERVER) {
		proxyConfig = {
			server: process.env.PW_PROXY_SERVER,
			username: process.env.PW_PROXY_USERNAME,
			password: process.env.PW_PROXY_PASSWORD,
		};
	}
} else if (PROXY_MODE === 'list') {
	// Прокси из файла — пример: берем случайный прокси из списка
	const proxyLines = fs.readFileSync('./proxies.txt', 'utf-8')
		.split('\n')
		.map(l => l.trim())
		.filter(Boolean);

	if (proxyLines.length === 0) {
		throw new Error('Proxy list is empty');
	}

	// Варианты выбора прокси: случайный, по очереди, рандом с запоминанием и т.п.
	// Для примера — случайный:
	const randomProxy = proxyLines[Math.floor(Math.random() * proxyLines.length)];

	// Формат прокси может быть ip:port или ip:port:username:password
	const parts = randomProxy.split(':');
	if (parts.length === 2) {
		proxyConfig = { server: `http://${randomProxy}` };
	} else if (parts.length === 4) {
		const [ip, port, username, password] = parts;
		proxyConfig = {
			server: `http://${ip}:${port}`,
			username,
			password,
		};
	} else {
		throw new Error(`Invalid proxy format in proxies.txt: ${randomProxy}`);
	}
}

// Ваш существующий выбор девайса
function weightedRandomChoice(distribution) {
	const total = distribution.reduce((sum, d) => sum + d.percent, 0);
	const r = Math.random() * total;
	let acc = 0;
	for (const d of distribution) {
		acc += d.percent;
		if (r <= acc) return d.name;
	}
	return distribution[0].name;
}
const validDistribution = deviceDistribution.filter(d => devices[d.name]);
if (validDistribution.length === 0) throw new Error('No valid devices found in deviceDistribution');
const selectedDeviceName = weightedRandomChoice(validDistribution);
const selectedDevice = devices[selectedDeviceName];

// Итоговый конфиг
export default defineConfig({
	use: {
		...selectedDevice,
		...(proxyConfig ? { proxy: proxyConfig } : {}),
	}
});
