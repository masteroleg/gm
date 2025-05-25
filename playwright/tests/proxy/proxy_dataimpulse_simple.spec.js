import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { applyStealth } from '../../utils/stealth';
import { scrollToBottom } from '../../utils/helpers';

dotenv.config();

test('Proxy test', async ({ browser }) => {
	let context;
	let page;
	try {
		context = await browser.newContext();
		await applyStealth(context); // ✅ вызывается ДО создания страницы
		page = await context.newPage();

		// Загружаем тестовый сайт
		// await page.goto('http://bot.sannysoft.com/', { waitUntil: 'networkidle' });
		// await page.goto('http://genu.im', { waitUntil: 'networkidle' });
		// await page.goto('http://genu.im/perevir-produkt/', { waitUntil: 'networkidle' });

		// Прокручиваем страницу до конца
		await scrollToBottom(page);

		// Выводим user-agent для отладки
		console.log('User-Agent:', await page.evaluate(() => navigator.userAgent));

		// Делаем скриншот всей страницы
		const time = new Date().toISOString().replace(/[:.]/g, '-');
		await page.screenshot({ path: `${time}.png`, fullPage: true });
	} catch (error) {
		console.error('Error during navigation or screenshot:', error);
		throw error;
	} finally {
		if (context) await context.close();
	}
});
