import { expect, test } from '@playwright/test';

const homeUrl = process.env.HOME_TEST_URL || 'http://127.0.0.1:4322/';

test('desktop navigation exposes category dropdown links', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(homeUrl);

  const categories = page.getByRole('button', { name: 'Kategorie' });
  await categories.hover();

  const menu = page.getByLabel('Kategorie w menu głównym');
  await expect(menu.getByRole('link', { name: 'Filter' })).toHaveAttribute('href', '/kategorie/filter/');
  await expect(menu.getByRole('link', { name: 'Espresso' })).toHaveAttribute('href', '/kategorie/espresso/');
  await expect(menu.getByRole('link', { name: 'Omniroast' })).toHaveAttribute('href', '/kategorie/omniroast/');
});

test('mobile navigation includes category links', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(homeUrl);

  await page.locator('summary[aria-label="Otwórz menu"]').click();

  const mobileMenu = page.getByLabel('Menu mobilne');
  await expect(mobileMenu.getByRole('link', { name: 'Filter' })).toHaveAttribute('href', '/kategorie/filter/');
  await expect(mobileMenu.getByRole('link', { name: 'Espresso' })).toHaveAttribute('href', '/kategorie/espresso/');
  await expect(mobileMenu.getByRole('link', { name: 'Omniroast' })).toHaveAttribute('href', '/kategorie/omniroast/');
});
