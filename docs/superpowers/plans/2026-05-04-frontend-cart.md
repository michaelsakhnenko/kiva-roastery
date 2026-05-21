# Frontend Cart Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a frontend-only session cart with add-to-cart animation, product-card quantity controls, nav count updates, and a dedicated `/koszyk/` page.

**Architecture:** The cart is owned by one shared browser script mounted from `BaseLayout`, with quantities stored in `sessionStorage` under product slug keys. Product cards and the cart page expose declarative data attributes; the shared script reads those attributes, updates DOM state, and dispatches cart-change updates across the current page.

**Tech Stack:** Astro, TypeScript data files, vanilla browser JavaScript, CSS, existing `scripts/validate-shop-refresh.mjs`, `npm run build`.

---

### Task 1: Validation Guard

**Files:**
- Modify: `scripts/validate-shop-refresh.mjs`

- [ ] **Step 1: Add failing validation checks**

Add checks that require:
- `public/scripts/cart.js` exists;
- cart script uses `sessionStorage` and not `localStorage`;
- product cards expose slug/name/price/weight/image data;
- header cart links point to `/koszyk/` and expose count targets;
- `/koszyk/` page exists;
- CSS includes add-to-cart flyer, quantity control, nav bump, cart page, and reduced-motion rules.

- [ ] **Step 2: Run validation and verify failure**

Run: `npm run test:shop-refresh`

Expected: FAIL because the cart script, cart page, and new data attributes do not exist yet.

### Task 2: Cart Hooks in Layout, Header, and Product Cards

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/ProductCard.astro`

- [ ] **Step 1: Add shared script mount**

Add `<script src="/scripts/cart.js" defer></script>` near the end of `BaseLayout` body so every page gets cart behavior from the public browser script.

- [ ] **Step 2: Update header cart links**

Change desktop and mobile cart links to `href="/koszyk/"`, add `data-cart-link`, and wrap the count in `data-cart-count`.

- [ ] **Step 3: Add product card cart data**

Add data attributes to each product card:
- `data-cart-product`
- `data-cart-slug`
- `data-cart-name`
- `data-cart-price`
- `data-cart-price-value`
- `data-cart-weight`
- `data-cart-image`

Keep the existing `data-product-card` attributes for filters.

### Task 3: Shared Cart Script

**Files:**
- Create: `public/scripts/cart.js`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create cart script**

Create `public/scripts/cart.js` with functions to:
- read normalized cart quantities from `sessionStorage`;
- write cart quantities back to `sessionStorage`;
- increment, decrement, and remove by slug;
- update all `data-cart-count` nodes;
- switch matching product cards between `Dodaj` and equal-width quantity controls;
- animate a lime circle from the clicked `Dodaj` button to the first visible nav cart link;
- render the `/koszyk/` page from embedded product JSON.

- [ ] **Step 2: Mount public script**

Use `<script src="/scripts/cart.js" defer></script>` from `BaseLayout`.

- [ ] **Step 3: Verify validation still fails only for incomplete page/style requirements**

Run: `npm run test:shop-refresh`

Expected: FAIL until cart page and styles are added.

### Task 4: Dedicated Cart Page

**Files:**
- Create: `src/pages/koszyk.astro`

- [ ] **Step 1: Create static cart page shell**

Create `/koszyk/` with:
- page title and lede;
- `data-cart-page`;
- `data-cart-empty`;
- `data-cart-items`;
- `data-cart-summary`;
- embedded JSON catalog in `<script type="application/json" data-cart-catalog>`.

- [ ] **Step 2: Ensure cart page has no checkout button**

Render status copy: `Checkout zostanie dodany później.`

### Task 5: Cart Styles and Motion

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add quantity control styles**

Style `product-quantity-control` as three equal-width cells. `-` and `+` are black buttons; the center quantity cell uses the light card background.

- [ ] **Step 2: Add flying circle and nav bump styles**

Style `.cart-flyer` with fixed positioning, lime fill, black border, and transform/opacity animation. Style `.cart-count-bump` for a brief cart-count scale.

- [ ] **Step 3: Add cart page styles**

Style empty state, item list, item rows, quantity controls, line totals, and subtotal for desktop and mobile.

- [ ] **Step 4: Add reduced-motion fallback**

In `@media (prefers-reduced-motion: reduce)`, disable flyer and nav bump animations.

### Task 6: Verification

**Files:**
- All changed files

- [ ] **Step 1: Run shop validation**

Run: `npm run test:shop-refresh`

Expected: PASS.

- [ ] **Step 2: Run full build**

Run: `npm run build`

Expected: PASS and SEO validation passes for generated HTML.

- [ ] **Step 3: Inspect git diff**

Run: `git diff -- src/components/Header.astro src/components/ProductCard.astro src/layouts/BaseLayout.astro src/pages/koszyk.astro src/styles/global.css public/scripts/cart.js scripts/validate-shop-refresh.mjs`

Expected: Diff only contains frontend-cart implementation changes.
