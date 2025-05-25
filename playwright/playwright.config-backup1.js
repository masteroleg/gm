import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import deviceDistribution from './utils/deviceDistribution.js';

dotenv.config();

// Выбор устройства по весам
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

// Фильтрация на валидные устройства
const validDistribution = deviceDistribution.filter(d => devices[d.name]);
if (validDistribution.length === 0) throw new Error('No valid devices found in deviceDistribution');

const selectedDeviceName = weightedRandomChoice(validDistribution);
const selectedDevice = devices[selectedDeviceName];

export default defineConfig({
	use: {
		...selectedDevice,
		...(process.env.PW_PROXY_SERVER ? {
			proxy: {
				server: process.env.PW_PROXY_SERVER,
				username: process.env.PW_PROXY_USERNAME,
				password: process.env.PW_PROXY_PASSWORD,
			}
		} : {})
	}
});
