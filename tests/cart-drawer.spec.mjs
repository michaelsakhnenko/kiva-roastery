import { expect, test } from '@playwright/test';

const homeUrl = process.env.HOME_TEST_URL || 'http://127.0.0.1:4322/';

test('cart opens as a right drawer after adding and product cards keep add CTAs', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(homeUrl);

  const firstCard = page.locator('.product-line-section [data-product-card]').first();
  const addButton = firstCard.locator('[data-product-cart-button]');
  const drawer = page.locator('[data-cart-drawer]');
  const drawerPanel = page.locator('[data-cart-drawer-panel]');
  const navCart = page.locator('.nav-cta');

  await expect(navCart).toHaveAttribute('data-cart-drawer-trigger', '');
  await expect(navCart).toHaveJSProperty('tagName', 'BUTTON');
  await expect(drawer).toHaveAttribute('aria-hidden', 'true');

  await firstCard.hover();
  await addButton.click();

  await expect(drawer).toHaveAttribute('aria-hidden', 'false');
  await expect(drawer).toHaveClass(/is-cart-drawer-open/);
  await expect(drawerPanel).toBeVisible();
  await expect(page.locator('body')).toHaveClass(/is-cart-drawer-open/);
  await expect(page.locator('[data-cart-count]').first()).toHaveText('1');
  await expect(drawer.locator('[data-cart-title-count]')).toHaveCount(0);
  await expect(drawer.locator('.cart-drawer-count')).toHaveCount(0);
  await expect(drawer).not.toContainText('Ilość rzeczy w koszyku');
  await expect(drawer.locator('[data-cart-items]')).toContainText('Etiopia Guji');
  await expect(drawer.locator('[data-cart-subtotal]')).toHaveText('59,00 zł');
  await expect(addButton).toBeVisible();
  await expect(firstCard.locator('[data-cart-quantity-control]')).toHaveCount(0);

  await drawer.locator('[data-cart-increment="etiopia-guji"]').click();
  await expect(page.locator('[data-cart-count]').first()).toHaveText('2');
  await expect(drawer.locator('[data-cart-subtotal]')).toHaveText('118,00 zł');
  const cartItem = drawer.locator('.cart-item').first();
  const itemDetails = cartItem.locator('.cart-item-details');
  const itemActions = cartItem.locator('.cart-item-actions');
  const itemQuantity = cartItem.locator('.cart-item-quantity');
  const itemTotal = cartItem.locator('.cart-item-total');

  await expect(itemDetails).toContainText('Etiopia Guji');
  await expect(itemDetails).toContainText('250 g');
  await expect(cartItem.locator('.cart-item-unit-price')).toHaveCount(0);
  await expect(itemActions).toBeVisible();
  await expect(itemQuantity).toBeVisible();
  await expect(itemTotal).toHaveText('118,00 zł');
  await expect(cartItem.locator('[data-cart-remove="etiopia-guji"]')).toHaveText('Usuń');
  await expect(drawer.locator('.cart-delivery-label')).toHaveText('Koszt dostawy');
  await expect(drawer.locator('.cart-view-link')).toHaveText('Zobacz koszyk');
  await expect(drawer.locator('.cart-summary')).not.toContainText('Podatek wliczony');
  await expect(drawer.locator('.cart-summary')).not.toContainText('Dodaj notatkę do zamówienia');
  await expect(cartItem).toHaveCSS('border-left-width', '0px');
  await expect(cartItem).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(drawer.locator('.cart-summary')).not.toHaveCSS('background-color', 'rgb(22, 23, 19)');

  const itemBox = await cartItem.boundingBox();
  const quantityBox = await itemQuantity.boundingBox();
  const totalBox = await itemTotal.boundingBox();

  expect(itemBox).not.toBeNull();
  expect(quantityBox).not.toBeNull();
  expect(totalBox).not.toBeNull();
  expect(itemBox?.height || 0).toBeGreaterThan(255);
  expect(itemBox?.height || 0).toBeLessThan(275);
  expect(quantityBox?.width || 0).toBeGreaterThan(95);
  expect(quantityBox?.width || 0).toBeLessThan(110);
  expect(totalBox?.x || 0).toBeGreaterThan((quantityBox?.x || 0) + (quantityBox?.width || 0));
  await cartItem.locator('[data-cart-remove="etiopia-guji"]').click();
  await expect(drawer.locator('.cart-item')).toHaveCount(0);
  await drawer.locator('.cart-drawer-close').click();
  await expect(drawer).toHaveAttribute('aria-hidden', 'true');
  await firstCard.hover();
  await addButton.click();
  await expect(addButton).toBeVisible();
  await expect(firstCard.locator('[data-cart-quantity-control]')).toHaveCount(0);

  await page.keyboard.press('Escape');
  await expect(drawer).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('body')).not.toHaveClass(/is-cart-drawer-open/);

  await navCart.click();
  await expect(drawer).toHaveAttribute('aria-hidden', 'false');
  await drawer.locator('.cart-drawer-close').click();
  await expect(drawer).toHaveAttribute('aria-hidden', 'true');
});
