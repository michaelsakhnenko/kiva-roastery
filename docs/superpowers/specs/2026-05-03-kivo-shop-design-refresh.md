# KIVA Shop Design Refresh Spec

Date: 2026-05-03
Project: KIVA specialty coffee roastery website
Scope: Homepage product sections, product card system, all-products page, navigation CTA, and filter behavior.

## Goal

Refine the KIVA site into a clearer coffee shop experience without losing the bold visual identity already built around bright packaging, strong borders, and direct Polish copy.

The current site has a strong hero and product imagery, but the structure below the hero and the existing `Katalog` page should feel more like a real specialty coffee storefront. The next implementation should make product discovery clearer while avoiding a visually overwhelming wall of color.

## Current Baseline

- Framework: Astro static site.
- Product data: `src/data/products.ts`.
- Main page: `src/pages/index.astro`.
- Current catalog page: `src/pages/katalog.astro`.
- Product cards: `src/components/ProductCard.astro`.
- Header/nav: `src/components/Header.astro`.
- Main styling: `src/styles/global.css`.
- Hosting target remains Cloudflare Pages/static output.

## Approved Design Direction

Use a calmer commerce structure with controlled use of color:

- Keep the expressive hero shelf and package artwork.
- Use neutral product cards with a colored image zone behind the package.
- Move product browsing into clear sections and a functional filtered product grid.
- Keep cart behavior visual/static for this school-project version.

## Homepage

### Hero

The hero should stay close to the current design:

- Keep the viewport-defined hero section.
- Keep the animated/clickable product shelf.
- Keep package links pointing to product pages.
- Remove the large hero CTA buttons.
- Keep only one understated text link: `Jak wybrać kawę?`

The hero shelf itself should act as the primary product CTA. The text link is only for beginner guidance and should not compete visually with the packages.

### Sections Below Hero

Replace the current generic `Kategorie` and `Wybrane kawy` structure with a clean product-line storefront.

Homepage product sections must appear in this order:

1. `Bestsellery`
2. `Filter`
3. `Espresso`
4. `Omniroast`

Each section should:

- use the same product-card system described below;
- show a small curated set of products;
- use strong KIVA borders and clean horizontal section headers;
- include a direct link to `Wszystkie produkty`, pre-filtered or anchored to the relevant profile;
- avoid adding extra explanatory text unless it helps scanning.

`Bestsellery` is only a homepage section. It should not become a separate hierarchy on the `Wszystkie produkty` page.

## Product Card System

Use the approved Variant B:

- neutral/clear card background;
- colored image zone behind the package;
- strong black borders;
- bold but readable typography;
- consistent black add-to-cart action.

Each product card should show only:

- product image;
- product name;
- coffee descriptors/flavor notes;
- price;
- weight;
- `Dodaj do koszyka` CTA.

Do not show these controls on product cards:

- roast selector;
- weight selector;
- grind selector.

For this version, display a fixed weight of `250 g` on every product card.

## Wszystkie Produkty Page

The current `Katalog` concept should be renamed/reframed as `Wszystkie produkty`.

This page should not use the homepage hierarchy of `Bestsellery`, `Filter`, `Espresso`, and `Omniroast` as separate product-line sections. Instead, it should be one full product grid controlled by filters.

### Desktop Layout

Desktop layout should include:

- same top navigation style as the homepage;
- page heading: `Wszystkie produkty`;
- left sidebar with filters;
- main product grid using the Variant B product cards;
- sort control with `Najnowsze`, `Cena rosnąco`, and `Cena malejąco`.

The sidebar should feel inspired by the referenced coffee-shop screenshot, but it must keep the KIVA visual language: strong borders, simple labels, no overly generic e-commerce styling.

### Mobile Layout

Mobile layout should include:

- same burger navigation behavior as the current site;
- a compact filter drawer or accordion;
- product cards stacked or in a responsive grid depending on viewport width;
- no permanent sidebar.

### Filters

Filters should be functional with client-side JavaScript. No backend is required.

Recommended filters:

- profile/category: `Filter`, `Espresso`, `Omniroast`;
- country;
- process;
- flavor descriptors/notes;
- price sorting: low to high / high to low.

Filtering should update visible products without reloading the page. It should be implemented from the existing static product data rendered into the page.

The page must support direct links from homepage sections by reading query parameters such as `?profil=filter`, `?profil=espresso`, and `?profil=omniroast`.

## Navigation And Cart

Keep the same top navigation structure and visual behavior as the current homepage.

Change the top-right navigation CTA:

- remove `Newsletter`;
- replace it with `Koszyk (0)` or a cart-style action.

Cart behavior is visual/static only for this version:

- no checkout;
- no local storage cart state;
- no real cart count updates required;
- `Dodaj do koszyka` buttons can be static/non-functional.

Newsletter can remain lower on the site, but it should not be the main top-right nav action.

## Content And Language

The website remains Polish-first.

Use Polish diacritics consistently in visible text:

- `Wszystkie produkty`;
- `Jak wybrać kawę?`;
- `Dodaj do koszyka`;
- `Bestsellery`;
- `Świeżo palona kawa`;
- `Koszyk`.

The tone should stay direct and specialty-coffee focused, not generic marketing copy.

## Out Of Scope

Do not build these in this pass:

- real checkout;
- real cart state;
- payment flow;
- account system;
- inventory management;
- roast, grind, or weight selectors on cards;
- backend filtering/search.

## Implementation Notes

Likely files to update:

- `src/components/Header.astro`
- `src/components/ProductCard.astro`
- `src/pages/index.astro`
- create `src/pages/produkty/index.astro` for `Wszystkie produkty`
- keep `src/pages/katalog.astro` as a compatibility redirect or simple forwarding page to `/produkty/`
- `src/data/products.ts` to add explicit `weight` and `isBestseller` fields
- `src/styles/global.css`

Update internal links from `/katalog/` to `/produkty/`.

The filtered products page should remain compatible with static deployment on Cloudflare Pages.

## Acceptance Criteria

- Homepage hero has no large CTA buttons.
- Hero keeps clickable package shelf and one subtle `Jak wybrać kawę?` text link.
- Homepage below hero shows product-line sections in this order: `Bestsellery`, `Filter`, `Espresso`, `Omniroast`.
- Product cards use neutral backgrounds with colored image zones.
- Product cards show image, name, descriptors, price, weight, and `Dodaj do koszyka`.
- Product cards do not show roast, grind, or weight selectors.
- Top-right nav action is `Koszyk (0)` or equivalent cart action, not `Newsletter`.
- `Wszystkie produkty` page has one filterable product grid.
- Desktop `Wszystkie produkty` has a permanent filter sidebar.
- Mobile `Wszystkie produkty` has a filter drawer or accordion.
- Filters work client-side.
- Cart remains visual/static only.
- Polish diacritics are used correctly in visible text.
