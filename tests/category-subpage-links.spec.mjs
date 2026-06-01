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
  await page.locator('[data-filter-drawer-toggle]').click();

  const categoryNav = page.getByLabel('Profil');
  await expect(categoryNav.getByRole('link', { name: 'Wszystkie' })).toHaveAttribute('href', '/produkty/');
  await expect(categoryNav.getByRole('link', { name: 'Filter' })).toHaveAttribute('aria-current', 'page');
  await expect(categoryNav.getByRole('link', { name: 'Espresso' })).toHaveAttribute('href', '/kategorie/espresso/');
  await expect(categoryNav.getByRole('link', { name: 'Omniroast' })).toHaveAttribute('href', '/kategorie/omniroast/');
});

test('category subpages use the full product catalog filters scoped to the category', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://127.0.0.1:4322/kategorie/filter/');

  await expect(page.locator('[data-catalog-count]')).toHaveText('3 z 3 produktów');
  await expect(page.locator('[data-product-card]:visible')).toHaveCount(3);

  await page.locator('[data-catalog-sort]').selectOption('price-asc');
  await expect(page.locator('[data-product-card]:visible').first()).toHaveAttribute('data-price', '57');

  await page.locator('[data-filter-drawer-toggle]').click();
  await expect(page.locator('[data-filter-drawer-toggle]')).toHaveAttribute('aria-expanded', 'true');

  const profileFilters = page.getByLabel('Profil');
  await expect(profileFilters.getByRole('link', { name: 'Wszystkie' })).toHaveAttribute('href', '/produkty/');
  await expect(profileFilters.getByRole('link', { name: 'Filter' })).toHaveAttribute('aria-current', 'page');
  await expect(profileFilters.getByRole('link', { name: 'Espresso' })).toHaveAttribute('href', '/kategorie/espresso/');
  await expect(profileFilters.getByRole('link', { name: 'Omniroast' })).toHaveAttribute('href', '/kategorie/omniroast/');

  await expect(page.locator('input[name="process"]')).toHaveCount(1);
  await expect(page.locator('input[name="process"]').first()).toHaveValue('washed');

  await page.locator('input[name="sensory"][value="herbaciany"]').check();
  await expect(page.locator('[data-catalog-count]')).toHaveText('1 z 3 produktów');
  await expect(page.locator('[data-product-card]:visible')).toHaveCount(1);
  await expect(page.locator('[data-product-card]:visible')).toContainText('Etiopia Guji');

  await page.locator('.filter-reset').click();
  await page.locator('[data-filter-price-min]').fill('60');
  await expect(page.locator('[data-catalog-count]')).toHaveText('1 z 3 produktów');
  await expect(page.locator('[data-product-card]:visible')).toContainText('Kenia Nyeri');
});

test('category subpages include a compact shop description with generated WebP imagery', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://127.0.0.1:4322/kategorie/espresso/');

  const description = page.locator('[data-category-description]');
  await expect(description).toBeVisible();
  await expect(description.getByRole('heading', { level: 2 })).toContainText('Kawa ziarnista pod espresso');
  await expect(description).toContainText('Brazylia Cerrado');
  await expect(description).toContainText('Espresso Blend');

  const image = description.locator('img');
  await expect(image).toHaveAttribute('src', '/categories/kawa-ziarnista-pod-espresso-kiva.webp');
  await expect(image).toHaveAttribute('alt', /espresso/i);
});
