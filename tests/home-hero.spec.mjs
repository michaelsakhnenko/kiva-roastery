import { expect, test } from '@playwright/test';

const homeUrl = process.env.HOME_TEST_URL || 'http://127.0.0.1:4322/';

async function getAvailableHeroHeight(page) {
  return page.evaluate(() => window.innerHeight);
}

async function getHeaderHeight(page) {
  return page.evaluate(() => {
    const header = document.querySelector('.site-header');

    return header?.getBoundingClientRect().height || 0;
  });
}

test('homepage hero uses rotating coffee descriptors as the headline without a subtitle', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(homeUrl, { waitUntil: 'domcontentloaded' });

  const headline = page.locator('[data-hero-descriptor-headline]');
  const hero = page.locator('[data-hero]');
  const featuredProduct = page.locator('[data-hero-product-card]');
  const productImage = featuredProduct.locator('img');
  const cta = page.locator('[data-hero-cta-button]');
  const heroCopy = page.locator('.hero-copy');
  const heroEyebrow = heroCopy.locator('.eyebrow');
  const productPanel = page.locator('.hero-product-panel');
  const cartBox = page.locator('.nav-cta');
  const brand = page.locator('.brand');
  const mainNavLink = page.locator('.main-nav a').first();

  await expect(page.locator('.hero-message .lede')).toHaveCount(0);
  await expect(page.locator('.hero-pack')).toHaveCount(0);
  await expect(featuredProduct).toHaveCount(1);
  await expect(hero).toHaveClass(/hero-theme--yellow/);
  await expect(heroCopy).toHaveCSS('background-color', 'rgb(245, 199, 47)');
  await expect(productPanel).toHaveCSS('background-color', 'rgb(255, 242, 163)');
  await expect(cartBox).toHaveCSS('background-color', 'rgb(244, 239, 230)');
  await expect(cartBox).toHaveText('KOSZYK: (0)');
  await expect(brand).toHaveAttribute('aria-label', 'KIVA strona główna');
  await expect(brand.locator('.brand-roll-line')).toHaveCount(2);
  await expect(brand.locator('.brand-roll-char')).toHaveCount(8);
  await expect(mainNavLink).toHaveCSS('font-weight', '500');
  await expect(cartBox).toHaveCSS('font-weight', '500');
  await expect(headline).toContainText('Bergamotka');
  await expect(headline).toContainText('biała herbata');
  await expect(featuredProduct).toHaveAttribute('href', '/produkty/etiopia-guji/');
  await expect(productImage).toHaveAttribute('src', '/products/etiopia-guji.webp');

  const initialImageBox = await productImage.boundingBox();
  const initialCtaBox = await cta.boundingBox();
  const initialHeadlineBox = await headline.boundingBox();
  const initialHeroBox = await hero.boundingBox();
  const initialEyebrowBox = await heroEyebrow.boundingBox();
  const expectedHeroHeight = await getAvailableHeroHeight(page);
  const headerHeight = await getHeaderHeight(page);
  const heroContentCenterY = (initialHeroBox?.y || 0) + headerHeight + ((initialHeroBox?.height || 0) - headerHeight) / 2;

  expect(initialHeroBox?.height || 0).toBeCloseTo(expectedHeroHeight, 0);
  expect(initialHeroBox?.y || 0).toBeCloseTo(0, 0);
  expect(initialEyebrowBox?.y || 0).toBeGreaterThan(headerHeight + 36);
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
  expect((initialHeadlineBox?.y || 0) + (initialHeadlineBox?.height || 0) / 2).toBeCloseTo(heroContentCenterY, -1);
  expect(initialCtaBox).not.toBeNull();
  expect((initialCtaBox?.x || 0) + (initialCtaBox?.width || 0)).toBeGreaterThan((initialHeroBox?.width || 0) - 120);
  expect((initialCtaBox?.y || 0) + (initialCtaBox?.height || 0)).toBeGreaterThan((initialHeroBox?.y || 0) + (initialHeroBox?.height || 0) - 120);
  const firstBrandChar = brand.locator('.brand-roll-line').first().locator('.brand-roll-char').first();
  const secondBrandChar = brand.locator('.brand-roll-line').nth(1).locator('.brand-roll-char').first();
  const initialBrandCharTransform = await firstBrandChar.evaluate((element) => getComputedStyle(element).transform);
  const initialSecondBrandCharTransform = await secondBrandChar.evaluate((element) => getComputedStyle(element).transform);

  await brand.hover();
  await expect
    .poll(() => firstBrandChar.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(initialBrandCharTransform);
  await expect
    .poll(() => secondBrandChar.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(initialSecondBrandCharTransform);
  await cta.hover();
  await expect(cta).toHaveCSS('color', 'rgb(22, 23, 19)');
  await expect(cta.evaluate((button) => getComputedStyle(button, '::before').backgroundColor)).resolves.toBe('rgb(255, 255, 255)');

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
  expect((rotatedHeadlineBox?.y || 0) + (rotatedHeadlineBox?.height || 0) / 2).toBeCloseTo(heroContentCenterY, -1);
  expect(rotatedCtaBox?.y).toBeCloseTo(initialCtaBox?.y || 0, 0);
  expect(rotatedCtaBox?.x).toBeCloseTo(initialCtaBox?.x || 0, 0);
});

test('homepage espresso hero theme uses the regenerated package colors', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(homeUrl);

  const hero = page.locator('[data-hero]');
  const heroCopy = page.locator('.hero-copy');
  const productPanel = page.locator('.hero-product-panel');
  const headline = page.locator('[data-hero-descriptor-headline]');
  const featuredProduct = page.locator('[data-hero-product-card]');

  await featuredProduct.hover();
  await hero.evaluate((element) => {
    const themeClass = Array.from(element.classList).find((className) => className.startsWith('hero-theme--'));
    if (themeClass) element.classList.remove(themeClass);
    element.classList.add('hero-theme--black');
  });

  await expect(heroCopy).toHaveCSS('background-color', 'rgb(183, 36, 53)');
  await expect(productPanel).toHaveCSS('background-color', 'rgb(243, 194, 200)');
  await expect(headline).toHaveCSS('color', 'rgb(244, 239, 230)');
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
  expect(heroBox?.y || 0).toBeCloseTo(0, 0);
  expect(headerBox?.height || 0).toBeCloseTo(72, 0);
  expect(productPanelBox?.y || 0).toBeLessThan(copyBox?.y || 0);
  await expect(heroCopy).toHaveCSS('text-align', 'center');
  await expect(headline).toHaveCSS('font-size', '30px');
  await expect(heroEyebrow).toBeHidden();
  await expect(mobileBrandStrap).toBeVisible();
  await expect(mobileBrandStrap).toHaveText('Specialty coffee roastery');
  expect(mobileBrandStrapBox?.y || 0).toBeGreaterThanOrEqual(heroBox?.y || 0);
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

test('site header keeps sticky reveal behavior while the homepage hero fills behind it', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(homeUrl);

  const header = page.locator('.site-header');
  const hero = page.locator('[data-hero]');

  await expect(header).toBeVisible();
  await expect(header).toHaveCSS('position', 'sticky');
  await expect(hero).toBeVisible();

  const initialHeroBox = await hero.boundingBox();
  expect(initialHeroBox?.y || 0).toBeCloseTo(0, 0);
  expect(initialHeroBox?.height || 0).toBeCloseTo(900, 0);

  await page.evaluate(() => window.scrollTo(0, 120));
  await page.waitForFunction(() => {
    const header = document.querySelector('.site-header');
    const styles = header ? getComputedStyle(header) : null;

    return Boolean(
      header &&
        header.classList.contains('is-header-hidden') &&
        styles?.position === 'sticky' &&
        styles.transform !== 'none' &&
        header.getBoundingClientRect().bottom <= 4
    );
  });
  await expect(
    page.locator('body').evaluate(() => {
      const element = document.elementFromPoint(10, 10);

      return Boolean(element?.closest('[data-hero]'));
    })
  ).resolves.toBe(true);

  await page.evaluate(() => window.scrollTo(0, 80));
  await page.waitForFunction(() => {
    const header = document.querySelector('.site-header');
    const styles = header ? getComputedStyle(header) : null;

    return Boolean(
      header &&
        !header.classList.contains('is-header-hidden') &&
        styles?.position === 'sticky' &&
        styles.transform === 'none' &&
        Math.abs(header.getBoundingClientRect().top) <= 1
    );
  });

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForFunction(() => {
    const header = document.querySelector('.site-header');
    const styles = header ? getComputedStyle(header) : null;

    return Boolean(
      header &&
        !header.classList.contains('is-header-hidden') &&
        styles?.position === 'sticky' &&
        styles.transform === 'none' &&
        Math.abs(header.getBoundingClientRect().top) <= 1
    );
  });
});

test('homepage product add control appears inside the bottom of the product image', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(homeUrl);

  const card = page.locator('.product-line-section [data-product-card]').first();
  const imageZone = card.locator('.product-image-zone');
  const overlayChips = card.locator('.product-overlay-chips');
  const productName = card.locator('h3 a');
  const productNotes = card.locator('.product-notes');
  const productPrice = card.locator('.product-price');
  const addButton = card.locator('[data-product-cart-button]');
  const addButtonFill = addButton.locator('.product-cart-button-fill');
  const cardBody = card.locator('.product-card-body');

  await expect(overlayChips).toBeVisible();
  await expect(overlayChips.locator('.product-chip')).toHaveCount(2);
  await expect(overlayChips.locator('.product-chip').first()).toHaveCSS('font-weight', '500');
  await expect(card.locator('.product-weight-inline')).toHaveCount(0);
  await expect(productName).toHaveCSS('font-weight', '400');
  await expect(productName).toHaveCSS('font-size', '19px');
  await expect(productNotes).toHaveCSS('font-weight', '400');
  await expect(productPrice).toHaveText('59,00 zł');
  await expect(productPrice).toHaveCSS('font-size', '18px');
  await expect(productPrice).toHaveCSS('font-weight', '500');
  await expect(card.evaluate((element) => getComputedStyle(element, '::after').boxShadow)).resolves.toBe('none');
  await expect(imageZone).toHaveCSS('border-bottom-width', '0px');
  await expect(cardBody).toHaveCSS('border-top-width', '0px');
  await expect(imageZone.evaluate((element) => getComputedStyle(element, '::after').opacity)).resolves.toBe('1');
  await expect(imageZone.evaluate((element) => getComputedStyle(element, '::before').height)).resolves.toBe('8px');
  await expect(imageZone.evaluate((element) => getComputedStyle(element, '::before').filter)).resolves.toBe('blur(8px)');
  await expect(imageZone.evaluate((element) => getComputedStyle(element, '::before').backgroundColor)).resolves.toBe('rgba(22, 23, 19, 0.12)');
  await expect(card.locator('.product-art').evaluate((element) => getComputedStyle(element).filter)).resolves.toContain(
    'drop-shadow(rgba(0, 0, 0, 0.13) 0px 10px 10px)'
  );
  await expect(addButton).toHaveCSS('opacity', '0');
  await expect(addButton).toHaveCSS('pointer-events', 'none');

  await card.hover();
  await expect(imageZone.evaluate((element) => getComputedStyle(element, '::after').boxShadow)).resolves.toContain('rgb(22, 23, 19)');
  await expect(addButton).toBeVisible();
  await expect(addButton).toHaveText('Dodaj do koszyka');
  await expect(addButton).toHaveCSS('font-weight', '500');
  await expect(addButton).toHaveCSS('border-top-width', '0px');
  await expect(addButtonFill).toHaveCount(1);
  await expect(addButtonFill).toHaveCSS('inset', '2px');
  await expect(addButtonFill).toHaveCSS('overflow', 'hidden');
  await expect(addButton.evaluate((button) => getComputedStyle(button, '::after').borderTopWidth)).resolves.toBe('2px');
  await expect(addButton.evaluate((button) => getComputedStyle(button, '::after').borderTopColor)).resolves.toBe('rgb(22, 23, 19)');
  const buttonBoxBeforeHover = await addButton.boundingBox();
  await addButton.hover();
  await expect(addButton).toHaveCSS('color', 'rgb(22, 23, 19)');
  await expect(addButton.evaluate((button) => getComputedStyle(button, '::before').content)).resolves.toBe('none');
  await expect(addButtonFill.evaluate((fill) => getComputedStyle(fill, '::before').backgroundColor)).resolves.toBe(
    'rgb(255, 255, 255)'
  );
  await expect(addButton.evaluate((button) => getComputedStyle(button, '::after').borderBottomWidth)).resolves.toBe('2px');
  await expect(addButton.evaluate((button) => getComputedStyle(button, '::after').borderBottomColor)).resolves.toBe('rgb(22, 23, 19)');
  const buttonBoxAfterHover = await addButton.boundingBox();

  expect(buttonBoxAfterHover?.x).toBeCloseTo(buttonBoxBeforeHover?.x || 0, 0);
  expect(buttonBoxAfterHover?.y).toBeCloseTo(buttonBoxBeforeHover?.y || 0, 0);
  expect(buttonBoxAfterHover?.width).toBeCloseTo(buttonBoxBeforeHover?.width || 0, 0);
  expect(buttonBoxAfterHover?.height).toBeCloseTo(buttonBoxBeforeHover?.height || 0, 0);

  const darkShelfCard = page.locator('.product-line-section [data-product-card][data-cart-slug="espresso-blend"]').first();
  const darkShelfImageZone = darkShelfCard.locator('.product-image-zone');
  const darkShelfButton = darkShelfCard.locator('[data-product-cart-button]');
  const darkShelfButtonFill = darkShelfButton.locator('.product-cart-button-fill');

  await expect(darkShelfImageZone.evaluate((element) => getComputedStyle(element).getPropertyValue('--strip').trim())).resolves.toBe(
    '#b72435'
  );
  await darkShelfCard.hover();
  await expect(darkShelfButton).toBeVisible();
  await expect(darkShelfButton).toHaveCSS('background-color', 'rgb(22, 23, 19)');
  await expect(darkShelfButton).toHaveCSS('color', 'rgb(255, 255, 255)');
  await darkShelfButton.hover();
  await expect(darkShelfButton).toHaveCSS('color', 'rgb(22, 23, 19)');
  await expect(darkShelfButtonFill.evaluate((fill) => getComputedStyle(fill, '::before').backgroundColor)).resolves.toBe(
    'rgb(255, 255, 255)'
  );

  const imageBox = await imageZone.boundingBox();
  const chipsBox = await overlayChips.boundingBox();
  const buttonBox = await addButton.boundingBox();

  expect(imageBox).not.toBeNull();
  expect(chipsBox).not.toBeNull();
  expect(buttonBox).not.toBeNull();
  expect(chipsBox?.x || 0).toBeGreaterThanOrEqual((imageBox?.x || 0) + 8);
  expect(chipsBox?.x || 0).toBeLessThan((imageBox?.x || 0) + 32);
  expect(chipsBox?.y || 0).toBeGreaterThanOrEqual((imageBox?.y || 0) + 8);
  expect(chipsBox?.y || 0).toBeLessThan((imageBox?.y || 0) + 32);
  expect(buttonBox?.width || 0).toBeGreaterThanOrEqual(150);
  expect(buttonBox?.width || 0).toBeLessThanOrEqual(176);
  expect(buttonBox?.y || 0).toBeGreaterThan((imageBox?.y || 0) + (imageBox?.height || 0) * 0.72);
  expect((buttonBox?.y || 0) + (buttonBox?.height || 0)).toBeLessThan((imageBox?.y || 0) + (imageBox?.height || 0) - 8);
});

test('homepage mobile product add controls are always visible and finger-sized', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(homeUrl);

  const card = page.locator('.product-line-section [data-product-card]').first();
  const imageZone = card.locator('.product-image-zone');
  const addButton = card.locator('[data-product-cart-button]');

  await expect(addButton).toHaveCSS('opacity', '1');
  await expect(addButton).toHaveCSS('pointer-events', 'auto');

  const imageBox = await imageZone.boundingBox();
  const buttonBox = await addButton.boundingBox();

  expect(imageBox).not.toBeNull();
  expect(buttonBox).not.toBeNull();
  expect(buttonBox?.width || 0).toBeGreaterThanOrEqual(240);
  expect(buttonBox?.height || 0).toBeGreaterThanOrEqual(48);
  expect(buttonBox?.y || 0).toBeGreaterThan((imageBox?.y || 0) + (imageBox?.height || 0) * 0.7);
  expect((buttonBox?.y || 0) + (buttonBox?.height || 0)).toBeLessThan((imageBox?.y || 0) + (imageBox?.height || 0) - 8);
  const buttonLeftInset = (buttonBox?.x || 0) - (imageBox?.x || 0);
  const buttonRightInset = (imageBox?.x || 0) + (imageBox?.width || 0) - ((buttonBox?.x || 0) + (buttonBox?.width || 0));
  const buttonBottomInset = (imageBox?.y || 0) + (imageBox?.height || 0) - ((buttonBox?.y || 0) + (buttonBox?.height || 0));

  expect(buttonLeftInset).toBeCloseTo(buttonBottomInset, 0);
  expect(buttonRightInset).toBeCloseTo(buttonBottomInset, 0);

  await addButton.click();

  const quantityControl = card.locator('.product-quantity-control');
  await expect(quantityControl).toHaveCount(0);
  await expect(addButton).toBeVisible();
  await expect(page.locator('[data-cart-drawer]')).toHaveAttribute('aria-hidden', 'false');
});

test('homepage product sections use bottom separators, secondary CTAs, and Geist Mono UI', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(homeUrl);

  const section = page.locator('.product-line-section').first();
  const heading = section.locator('.section-heading-row');
  const title = heading.locator('h2');
  const sectionLink = heading.locator('.section-link');

  await expect(heading).toHaveCSS('border-top-width', '0px');
  await expect(heading).toHaveCSS('border-bottom-width', '2px');
  await expect(heading).toHaveCSS('padding-bottom', '24px');
  await expect(heading).toHaveCSS('grid-template-columns', /.+px .+px/);
  await expect(title).toHaveCSS('font-family', /Geist Mono/);
  await expect(title).toHaveCSS('font-weight', '500');
  await expect(sectionLink).toHaveText('Wszystkie produkty');
  await expect(sectionLink).toHaveCSS('border-top-width', '2px');
  await expect(sectionLink).toHaveCSS('border-right-width', '2px');
  await expect(sectionLink).toHaveCSS('border-bottom-width', '2px');
  await expect(sectionLink).toHaveCSS('border-left-width', '2px');
  await expect(sectionLink).toHaveCSS('text-decoration-line', 'none');
  await expect(page.locator('.brand')).toHaveCSS('font-family', /Arial/);

  const headingBox = await heading.boundingBox();
  const productGridBox = await section.locator('.product-grid').boundingBox();

  expect(productGridBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect((productGridBox?.y || 0) - ((headingBox?.y || 0) + (headingBox?.height || 0))).toBeGreaterThanOrEqual(30);
});
