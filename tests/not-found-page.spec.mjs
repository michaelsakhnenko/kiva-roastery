import { expect, test } from '@playwright/test';

const notFoundUrl = process.env.NOT_FOUND_TEST_URL || 'http://127.0.0.1:4322/404.html';

test('404 page has a distinctive KIVA recovery layout', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(notFoundUrl);

  await expect(page.locator('h1')).toHaveText('Nie ma takiej strony.');
  await expect(page.locator('[data-error-code]')).toHaveText('404');
  await expect(page.locator('[data-error-card]')).toBeVisible();
  const recoveryLinks = page.getByLabel('Co dalej');
  await expect(recoveryLinks.getByRole('link', { name: 'Zobacz kawy' })).toHaveAttribute('href', '/produkty/');
  await expect(recoveryLinks.getByRole('link', { name: 'Czytaj blog' })).toHaveAttribute('href', '/blog/');
  await expect(recoveryLinks.getByRole('link', { name: 'Kontakt' })).toHaveAttribute('href', '/kontakt/');
});
