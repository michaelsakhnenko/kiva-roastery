import { expect, test } from '@playwright/test';

const catalogUrl = process.env.CATALOG_TEST_URL || 'http://127.0.0.1:4322/produkty/';

test('catalog filters remove nonmatching cards from the visible product grid', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(catalogUrl);

  await page.locator('[data-catalog-sort]').selectOption('price-asc');
  await expect(page.locator('[data-catalog-sort]')).toHaveValue('price-asc');
  await expect(page.locator('[data-product-card]:visible').first()).toHaveAttribute('data-price', '49');
  await page.locator('[data-catalog-sort]').selectOption('latest');

  await page.locator('[data-filter-drawer-toggle]').click();
  await expect(page.locator('[data-filter-drawer-toggle]')).toHaveAttribute('aria-expanded', 'true');
  await page.locator('[data-catalog-count]').click();
  await expect(page.locator('[data-filter-drawer-toggle]')).toHaveAttribute('aria-expanded', 'false');
  await page.locator('[data-filter-drawer-toggle]').click();

  await page.locator('input[name="process"][value="sugarcane decaf"]').check();

  await expect(page.locator('[data-catalog-count]')).toHaveText('1 z 9 produktów');
  await expect(page.locator('[data-product-card]:visible')).toHaveCount(1);
  await expect(page.locator('[data-product-card]:visible')).toContainText('Kolumbia Decaf');

  await page.locator('.filter-reset').click();
  await page.locator('input[name="sensory"][value="herbaciany"]').check();

  await expect(page.locator('details.filter-group')).toHaveCount(0);
  await expect(page.locator('.filter-group-chevron')).toHaveCount(0);
  await expect(page.locator('[data-catalog-count]')).toHaveText('2 z 9 produktów');
  await expect(page.locator('[data-product-card]:visible')).toHaveCount(2);
  await expect(page.locator('[data-product-card]:visible')).toContainText(['Etiopia Guji', 'Rwanda Musasa']);

  await page.locator('.filter-reset').click();
  await page.locator('[data-filter-price-min]').fill('60');

  await expect(page.locator('[data-catalog-count]')).toHaveText('1 z 9 produktów');
  await expect(page.locator('[data-product-card]:visible')).toHaveCount(1);
  await expect(page.locator('[data-product-card]:visible')).toContainText('Kenia Nyeri');
});
