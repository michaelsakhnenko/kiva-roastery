import { expect, test } from '@playwright/test';

const catalogUrl = process.env.CATALOG_TEST_URL || 'http://127.0.0.1:4322/produkty/';
const baseUrl = new URL(catalogUrl).origin;

test('catalog profile filters work as checkboxes on all products', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(catalogUrl);

  await page.locator('[data-filter-drawer-toggle]').click();

  await expect(page.locator('[data-filter-profile-link]')).toHaveCount(0);
  await expect(page.locator('input[name="profile"]')).toHaveCount(3);
  await expect(page.locator('input[name="profile"][value="filter"]')).toBeVisible();
  await expect(page.locator('input[name="profile"][value="espresso"]')).toBeVisible();
  await expect(page.locator('input[name="profile"][value="omniroast"]')).toBeVisible();

  await page.locator('input[name="profile"][value="espresso"]').check();
  await expect(page.locator('[data-catalog-count]')).toHaveText('3 z 9 produktów');
  await expect(page.locator('[data-product-card]:visible')).toHaveCount(3);
  await expect(page.locator('[data-product-card]:visible').first()).toHaveAttribute('data-profile', 'espresso');
});

test('category subpages hide profile filters', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseUrl}/kategorie/filter/`);
  await page.locator('[data-filter-drawer-toggle]').click();

  await expect(page.locator('[data-filter-profile-link]')).toHaveCount(0);
  await expect(page.locator('input[name="profile"]')).toHaveCount(0);
});

test('category subpages use the full product catalog filters scoped to the category', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseUrl}/kategorie/filter/`);

  await expect(page.locator('[data-catalog-count]')).toHaveText('3 z 3 produktów');
  await expect(page.locator('[data-product-card]:visible')).toHaveCount(3);

  await page.locator('[data-catalog-sort]').selectOption('price-asc');
  await expect(page.locator('[data-product-card]:visible').first()).toHaveAttribute('data-price', '57');

  await page.locator('[data-filter-drawer-toggle]').click();
  await expect(page.locator('[data-filter-drawer-toggle]')).toHaveAttribute('aria-expanded', 'true');

  await expect(page.locator('input[name="profile"]')).toHaveCount(0);

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

test('category subpages include compact shop descriptions with at least three h2 sections', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  for (const slug of ['filter', 'espresso', 'omniroast']) {
    await page.goto(`${baseUrl}/kategorie/${slug}/`);

    const description = page.locator('[data-category-description]');
    await expect(description).toBeVisible();
    await expect(description.getByRole('heading', { level: 2 })).toHaveCount(3);
    await expect(description.locator('img')).toHaveCount(0);
  }

  await page.goto(`${baseUrl}/kategorie/espresso/`);
  await expect(page.locator('[data-category-description]').getByRole('heading', { level: 2 }).nth(0)).toContainText('Do ekspresu i mleka');
  await expect(page.locator('[data-category-description]').getByRole('heading', { level: 2 }).nth(1)).toContainText('Profil smakowy');
  await expect(page.locator('[data-category-description]').getByRole('heading', { level: 2 }).nth(2)).toContainText('Którą kawę kupić');
  await expect(page.locator('[data-category-description]')).toContainText('Brazylia Cerrado');
  await expect(page.locator('[data-category-description]')).toContainText('Espresso Blend');
});
