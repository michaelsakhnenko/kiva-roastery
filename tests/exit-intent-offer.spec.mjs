import { expect, test } from '@playwright/test';

const homeUrl = process.env.HOME_TEST_URL || 'http://127.0.0.1:4322/';

test('exit intent shows again after reload but stays dismissed on the same page view', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(homeUrl);

  const offer = page.locator('[data-exit-offer]');
  await expect(offer).toHaveAttribute('aria-hidden', 'true');
  await expect(offer).not.toHaveClass(/is-exit-offer-open/);

  await page.mouse.move(640, 320);
  await page.mouse.move(640, 4);

  await expect(offer).toHaveAttribute('aria-hidden', 'false');
  await expect(offer).toHaveClass(/is-exit-offer-open/);
  await expect(offer).toContainText('10% rabatu');
  await expect(offer).toContainText('KIVA10');

  await page.locator('[data-exit-offer-copy]').click();
  await expect(page.locator('[data-exit-offer-copy]')).toContainText('Skopiowano');

  await page.reload();
  await expect(offer).toHaveAttribute('aria-hidden', 'true');
  await page.mouse.move(640, 320);
  await page.mouse.move(640, 4);
  await expect(offer).toHaveAttribute('aria-hidden', 'false');

  await page.locator('[data-exit-offer-dismiss]').first().click();
  await expect(offer).toHaveAttribute('aria-hidden', 'true');
  await expect(offer).not.toHaveClass(/is-exit-offer-open/);

  await page.mouse.move(640, 320);
  await page.mouse.move(640, 4);
  await expect(offer).toHaveAttribute('aria-hidden', 'true');
  await expect(offer).not.toHaveClass(/is-exit-offer-open/);
});
