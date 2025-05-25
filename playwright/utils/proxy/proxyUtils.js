import fs from 'fs';

export function parseProxyLine(line) {
	const parts = line.split(':');
	if (parts.length === 2) return { server: `http://${line}` };
	if (parts.length === 4) {
		const [ip, port, username, password] = parts;
		return { server: `http://${ip}:${port}`, username, password };
	}
	throw new Error(`Invalid proxy format: ${line}`);
}

export function getProxyConfig(mode, env = process.env, proxiesFile = '../proxies.txt') {
	if (mode === 'single') {
		if (!env.PW_PROXY_SERVER) return undefined;
		return {
			server: env.PW_PROXY_SERVER,
			username: env.PW_PROXY_USERNAME,
			password: env.PW_PROXY_PASSWORD,
		};
	}
	if (mode === 'list') {
		const proxyLines = fs.readFileSync(proxiesFile, 'utf-8')
			.split('\n')
			.map(l => l.trim())
			.filter(Boolean);
		if (proxyLines.length === 0) throw new Error('Proxy list is empty');
		const randomLine = proxyLines[Math.floor(Math.random() * proxyLines.length)];
		return parseProxyLine(randomLine);
	}
	return undefined;
}

export function weightedRandomChoice(distribution) {
	const total = distribution.reduce((acc, d) => acc + d.percent, 0);
	let r = Math.random() * total;
	for (const d of distribution) {
		if ((r -= d.percent) <= 0) return d.name;
	}
	return distribution[0].name;
}
