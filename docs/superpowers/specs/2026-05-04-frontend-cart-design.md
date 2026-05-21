# Frontend Cart Design

## Summary

Add a frontend-only cart to the KIVA Astro site. The cart is session-scoped, updates product cards and the navigation count, and provides a dedicated `/koszyk/` page for reviewing items. There is no payment, checkout, stock, shipping, tax, or order submission in this phase.

## Goals

- Let users add products from existing product cards.
- Animate the add action so the `Dodaj` button compresses into a lime circle, flies toward the navigation cart button, and bumps the cart count.
- Replace the added product card CTA with quantity controls.
- Let users review and edit the cart on a dedicated cart page.
- Reset the cart after the browser session ends.

## Non-Goals

- Real checkout or payment processing.
- Backend order storage.
- Inventory validation.
- Shipping, taxes, discount codes, or delivery forms.
- Persistent cart across browser sessions.

## Cart State

Cart state is frontend-only and stored in `sessionStorage` so it can survive page reloads in the same browser session but reset when the session ends.

State is keyed by product slug:

```json
{
  "etiopia-guji": 2,
  "kenia-nyeri": 1
}
```

Product metadata continues to come from `src/data/products.ts`; the cart stores quantities only. Invalid slugs or zero/negative quantities are ignored when state is read.

## Product Card Behavior

Each product card starts in the normal `Dodaj` state.

When `Dodaj` is clicked:

1. Add or increment the product quantity in cart state.
2. Run the approved animation:
   - the button visually compresses into a lime circle;
   - the circle travels from the card CTA area toward the nav cart button;
   - the nav cart count bumps when the circle lands.
3. Replace the card CTA with quantity controls.

Added card state:

- The price panel remains unchanged on the left.
- The right CTA area becomes three equal-width cells: `-`, quantity, `+`.
- The `-` and `+` cells are black button cells.
- The middle quantity cell is light/transparent and reads as status, not a button.
- Pressing `+` increments the product quantity.
- Pressing `-` decrements the product quantity.
- Pressing `-` at quantity `1` removes the product and returns the card to `Dodaj`.

## Navigation Cart

The top navigation cart becomes the source of truth for total item count.

- Desktop nav shows `Koszyk (0)`, `Koszyk (1)`, etc.
- Mobile nav uses the same count.
- The nav cart links to `/koszyk/`.
- Adding a product updates all cart count instances on the page.
- The count bump animation runs after the add-to-cart circle reaches the nav cart target.

## Cart Page

Create `/koszyk/` as a dedicated cart review page.

When cart is empty:

- Show a clear empty-cart state.
- Provide a link back to `/produkty/`.

When cart has items:

- Show each cart item with product image, name, weight, unit price, quantity controls, and line total.
- Use the same equal-width `- / quantity / +` control pattern.
- Show subtotal.
- Do not render a checkout button in this phase. Show a short status line under the subtotal: `Checkout zostanie dodany później.`

The cart page must work cleanly on mobile without overlays or drawers.

## Motion and Accessibility

- Use transform and opacity for the flying circle animation to avoid layout reflow.
- Respect `prefers-reduced-motion`: skip the flying animation, immediately update the card and nav count, and keep the count bump subtle or disabled.
- Quantity controls are real buttons with accessible names.
- Cart count changes should be announced with a polite live region or equivalent accessible text.
- Keyboard users can add, increment, decrement, and navigate to the cart page.

## Implementation Boundaries

Expected implementation units:

- A small cart state module/script for reading, writing, normalizing, and broadcasting cart changes.
- Product card data attributes for slug, name, price, weight, and image.
- Header cart links/count targets.
- A dedicated cart page that reads session cart state and renders from known product data.
- CSS for the flying add animation, quantity control state, nav count bump, and cart page layout.

## Validation

Update the existing shop refresh validation to check:

- product cards expose cart data attributes;
- cart buttons can switch to quantity controls;
- header cart links point to `/koszyk/` and expose count targets;
- `/koszyk/` page exists;
- the cart script uses `sessionStorage`, not `localStorage`;
- reduced-motion rules exist for the add-to-cart animation.

Run `npm run test:shop-refresh` and `npm run build` before completion.
