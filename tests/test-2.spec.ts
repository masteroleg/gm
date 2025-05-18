import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://genu.im/');
  await page.locator('div').first().click();
  await page.getByRole('link', { name: 'Перевір продукт' }).click();
  await expect(page.getByRole('textbox', { name: 'Вікно вводу повідомлень' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Вікно вводу повідомлень' }).click();
  await page.getByRole('textbox', { name: 'Вікно вводу повідомлень' }).fill('aghttedj');
  await page.getByRole('textbox', { name: 'Вікно вводу повідомлень' }).press('Enter');
});