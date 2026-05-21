import { expect, test } from '@playwright/test';

const catalogUrl = process.env.CATALOG_TEST_URL || 'http://127.0.0.1:4322/produkty/';

test('catalog filters remove nonmatching cards from the visible product grid', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(catalogUrl);

  await page.locator('details.filter-group').filter({ hasText: 'Proces' }).locator('summary').click();
  await page.locator('input[name="process"][value="sugarcane decaf"]').check();

  await expect(page.locator('[data-catalog-count]')).toHaveText('1 produkt');
  await expect(page.locator('[data-product-card]:visible')).toHaveCount(1);
  await expect(page.locator('[data-product-card]:visible')).toContainText('Kolumbia Decaf');
});
