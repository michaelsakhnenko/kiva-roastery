import { expect, test } from '@playwright/test';

const catalogUrl = process.env.CATALOG_TEST_URL || 'http://127.0.0.1:4322/produkty/';

test('catalog profile filters link to category subpages', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(catalogUrl);

  await page.locator('[data-filter-drawer-toggle]').click();

  const profileFilters = page.getByLabel('Profil');
  await expect(profileFilters.getByRole('link', { name: 'Wszystkie' })).toHaveAttribute('href', '/produkty/');
  await expect(profileFilters.getByRole('link', { name: 'Filter' })).toHaveAttribute('href', '/kategorie/filter/');
  await expect(profileFilters.getByRole('link', { name: 'Espresso' })).toHaveAttribute('href', '/kategorie/espresso/');
  await expect(profileFilters.getByRole('link', { name: 'Omniroast' })).toHaveAttribute('href', '/kategorie/omniroast/');
});

test('category subpages keep category navigation visible', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://127.0.0.1:4322/kategorie/filter/');

  const categoryNav = page.getByLabel('Kategorie produktów');
  await expect(categoryNav.getByRole('link', { name: 'Wszystkie' })).toHaveAttribute('href', '/produkty/');
  await expect(categoryNav.getByRole('link', { name: 'Filter' })).toHaveAttribute('aria-current', 'page');
  await expect(categoryNav.getByRole('link', { name: 'Espresso' })).toHaveAttribute('href', '/kategorie/espresso/');
  await expect(categoryNav.getByRole('link', { name: 'Omniroast' })).toHaveAttribute('href', '/kategorie/omniroast/');
});
