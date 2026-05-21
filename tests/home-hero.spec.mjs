import { expect, test } from '@playwright/test';

const homeUrl = process.env.HOME_TEST_URL || 'http://127.0.0.1:4322/';

async function getAvailableHeroHeight(page) {
  return page.evaluate(() => {
    const header = document.querySelector('.site-header');

    return window.innerHeight - (header?.getBoundingClientRect().height || 0);
  });
}

test('homepage hero uses rotating coffee descriptors as the headline without a subtitle', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(homeUrl);

  const headline = page.locator('[data-hero-descriptor-headline]');
  const hero = page.locator('[data-hero]');
  const featuredProduct = page.locator('[data-hero-product-card]');
  const productImage = featuredProduct.locator('img');
  const cta = page.locator('[data-hero-cta-button]');
  const heroCopy = page.locator('.hero-copy');
  const productPanel = page.locator('.hero-product-panel');

  await expect(page.locator('.hero-message .lede')).toHaveCount(0);
  await expect(page.locator('.hero-pack')).toHaveCount(0);
  await expect(featuredProduct).toHaveCount(1);
  await expect(hero).toHaveClass(/hero-theme--yellow/);
  await expect(heroCopy).toHaveCSS('background-color', 'rgb(245, 199, 47)');
  await expect(productPanel).toHaveCSS('background-color', 'rgb(255, 242, 163)');
  await expect(headline).toContainText('Bergamotka');
  await expect(headline).toContainText('biała herbata');
  await expect(featuredProduct).toHaveAttribute('href', '/produkty/etiopia-guji/');
  await expect(productImage).toHaveAttribute('src', '/products/etiopia-guji.webp');

  const initialImageBox = await productImage.boundingBox();
  const initialCtaBox = await cta.boundingBox();
  const initialHeadlineBox = await headline.boundingBox();
  const initialHeroBox = await hero.boundingBox();
  const expectedHeroHeight = await getAvailableHeroHeight(page);

  expect(initialHeroBox?.height || 0).toBeCloseTo(expectedHeroHeight, 0);
  expect(initialImageBox?.width).toBeLessThanOrEqual(350);
  expect((initialImageBox?.x || 0) + (initialImageBox?.width || 0) / 2).toBeCloseTo((initialHeroBox?.x || 0) + (initialHeroBox?.width || 0) / 2, 0);
  await expect(
    page.locator('body').evaluate(
      (_, { x, y }) => {
        const element = document.elementFromPoint(x, y);

        return Boolean(element?.closest('[data-hero-product-card]'));
      },
      {
        x: (initialImageBox?.x || 0) + 12,
        y: (initialImageBox?.y || 0) + (initialImageBox?.height || 0) / 2
      }
    )
  ).resolves.toBe(true);
  expect(initialHeadlineBox?.height).toBeLessThan(320);
  expect((initialHeadlineBox?.y || 0) + (initialHeadlineBox?.height || 0) / 2).toBeCloseTo((initialHeroBox?.y || 0) + (initialHeroBox?.height || 0) / 2, -1);
  expect(initialCtaBox).not.toBeNull();
  expect((initialCtaBox?.x || 0) + (initialCtaBox?.width || 0)).toBeGreaterThan((initialHeroBox?.width || 0) - 120);
  expect((initialCtaBox?.y || 0) + (initialCtaBox?.height || 0)).toBeGreaterThan((initialHeroBox?.y || 0) + (initialHeroBox?.height || 0) - 120);

  await page.waitForTimeout(3300);

  await expect(hero).toHaveClass(/hero-theme--coral/);
  await expect(heroCopy).toHaveCSS('background-color', 'rgb(242, 103, 83)');
  await expect(productPanel).toHaveCSS('background-color', 'rgb(255, 208, 200)');
  await expect(headline).toHaveClass(/is-rotating/);
  await expect(headline).toContainText('Czarna porzeczka');
  await expect(headline).toContainText('cukier trzcinowy');
  await expect(featuredProduct).toHaveAttribute('href', '/produkty/kenia-nyeri/');
  await expect(productImage).toHaveAttribute('src', '/products/kenia-nyeri.webp');

  const rotatedImageBox = await productImage.boundingBox();
  const rotatedCtaBox = await cta.boundingBox();
  const rotatedHeadlineBox = await headline.boundingBox();

  expect(rotatedImageBox?.width).toBeLessThanOrEqual(350);
  expect((rotatedImageBox?.x || 0) + (rotatedImageBox?.width || 0) / 2).toBeCloseTo((initialHeroBox?.x || 0) + (initialHeroBox?.width || 0) / 2, 0);
  expect(rotatedHeadlineBox?.height).toBeLessThan(400);
  expect((rotatedHeadlineBox?.y || 0) + (rotatedHeadlineBox?.height || 0) / 2).toBeCloseTo((initialHeroBox?.y || 0) + (initialHeroBox?.height || 0) / 2, -1);
  expect(rotatedCtaBox?.y).toBeCloseTo(initialCtaBox?.y || 0, 0);
  expect(rotatedCtaBox?.x).toBeCloseTo(initialCtaBox?.x || 0, 0);
});

test('homepage hero uses a centered stacked mobile composition', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(homeUrl);

  const hero = page.locator('[data-hero]');
  const header = page.locator('.site-header');
  const heroCopy = page.locator('.hero-copy');
  const productPanel = page.locator('.hero-product-panel');
  const productImage = page.locator('[data-hero-product-card] img');
  const heroEyebrow = page.locator('.hero-copy .eyebrow');
  const mobileBrandStrap = page.locator('.mobile-brand-strap');
  const headline = page.locator('[data-hero-descriptor-headline]');
  const cta = page.locator('[data-hero-cta-button]');

  const heroBox = await hero.boundingBox();
  const headerBox = await header.boundingBox();
  const copyBox = await heroCopy.boundingBox();
  const productPanelBox = await productPanel.boundingBox();
  const productImageBox = await productImage.boundingBox();
  const mobileBrandStrapBox = await mobileBrandStrap.boundingBox();
  const headlineBox = await headline.boundingBox();
  const ctaBox = await cta.boundingBox();
  const expectedHeroHeight = await getAvailableHeroHeight(page);

  const heroCenterX = (heroBox?.x || 0) + (heroBox?.width || 0) / 2;

  expect(heroBox?.height || 0).toBeCloseTo(expectedHeroHeight, 0);
  expect(headerBox?.height || 0).toBeCloseTo(72, 0);
  expect(productPanelBox?.y || 0).toBeLessThan(copyBox?.y || 0);
  await expect(heroCopy).toHaveCSS('text-align', 'center');
  await expect(headline).toHaveCSS('font-size', '30.24px');
  await expect(heroEyebrow).toBeHidden();
  await expect(mobileBrandStrap).toBeVisible();
  await expect(mobileBrandStrap).toHaveText('Specialty coffee roastery');
  expect((mobileBrandStrapBox?.y || 0) + (mobileBrandStrapBox?.height || 0)).toBeLessThanOrEqual(heroBox?.y || 0);
  expect((mobileBrandStrapBox?.y || 0) + (mobileBrandStrapBox?.height || 0) / 2).toBeCloseTo((headerBox?.y || 0) + (headerBox?.height || 0) / 2, -1);
  expect((mobileBrandStrapBox?.x || 0) + (mobileBrandStrapBox?.width || 0) / 2).toBeCloseTo((headerBox?.x || 0) + (headerBox?.width || 0) / 2, -1);
  expect((productImageBox?.y || 0) + (productImageBox?.height || 0) / 2).toBeCloseTo(
    (productPanelBox?.y || 0) + (productPanelBox?.height || 0),
    -1
  );
  expect((productImageBox?.x || 0) + (productImageBox?.width || 0) / 2).toBeCloseTo(heroCenterX, -1);
  expect((headlineBox?.x || 0) + (headlineBox?.width || 0) / 2).toBeCloseTo(heroCenterX, -1);
  expect((ctaBox?.x || 0) + (ctaBox?.width || 0) / 2).toBeCloseTo(heroCenterX, -1);

  await page.waitForTimeout(3300);

  const rotatedCtaBox = await cta.boundingBox();

  expect(rotatedCtaBox?.x).toBeCloseTo(ctaBox?.x || 0, 0);
  expect(rotatedCtaBox?.y).toBeCloseTo(ctaBox?.y || 0, 0);
});
