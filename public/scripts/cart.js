(() => {
  const CART_KEY = 'kiva-session-cart';
  const CART_EVENT = 'kiva:cart-change';

  const readCart = () => {
    try {
      const parsed = JSON.parse(sessionStorage.getItem(CART_KEY) || '{}');
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};

      return Object.fromEntries(
        Object.entries(parsed)
          .map(([slug, quantity]) => [slug, Math.floor(Number(quantity))])
          .filter(([slug, quantity]) => slug && Number.isFinite(quantity) && quantity > 0)
      );
    } catch {
      return {};
    }
  };

  const writeCart = (cart) => {
    const normalized = Object.fromEntries(
      Object.entries(cart)
        .map(([slug, quantity]) => [slug, Math.floor(Number(quantity))])
        .filter(([slug, quantity]) => slug && Number.isFinite(quantity) && quantity > 0)
    );

    sessionStorage.setItem(CART_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: normalized }));
    return normalized;
  };

  const cartTotal = (cart) => Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  const announce = (message) => {
    let liveRegion = document.querySelector('[data-cart-live-region]');

    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.className = 'sr-only';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('data-cart-live-region', '');
      document.body.append(liveRegion);
    }

    liveRegion.textContent = message;
  };

  const updateCartLinks = (cart) => {
    const total = cartTotal(cart);

    document.querySelectorAll('[data-cart-count]').forEach((countNode) => {
      countNode.textContent = String(total);
    });

    document.querySelectorAll('[data-cart-link]').forEach((link) => {
      link.setAttribute('aria-label', total === 0 ? 'Koszyk, obecnie pusty' : `Koszyk, ${total} produktów`);
    });
  };

  const productFromCard = (card) => ({
    slug: card.dataset.cartSlug || '',
    name: card.dataset.cartName || '',
    price: card.dataset.cartPrice || '',
    priceValue: Number(card.dataset.cartPriceValue || 0),
    weight: card.dataset.cartWeight || '',
    image: card.dataset.cartImage || ''
  });

  const createQuantityControl = (product, quantity) => {
    const control = document.createElement('div');
    control.className = 'product-quantity-control';
    control.dataset.cartQuantityControl = product.slug;
    control.setAttribute('aria-label', `Ilość w koszyku: ${product.name}`);

    const decrement = document.createElement('button');
    decrement.type = 'button';
    decrement.className = 'product-quantity-button';
    decrement.dataset.cartDecrement = product.slug;
    decrement.setAttribute('aria-label', `Zmniejsz ilość: ${product.name}`);
    decrement.innerHTML = '<span class="product-quantity-button-label">-</span>';

    const value = document.createElement('span');
    value.className = 'product-quantity-value';
    value.dataset.cartQuantity = product.slug;
    value.textContent = String(quantity);

    const increment = document.createElement('button');
    increment.type = 'button';
    increment.className = 'product-quantity-button';
    increment.dataset.cartIncrement = product.slug;
    increment.setAttribute('aria-label', `Zwiększ ilość: ${product.name}`);
    increment.innerHTML = '<span class="product-quantity-button-label">+</span>';

    control.append(decrement, value, increment);
    return control;
  };

  const renderProductCards = (cart) => {
    document.querySelectorAll('[data-cart-product]').forEach((card) => {
      if (!(card instanceof HTMLElement)) return;

      const product = productFromCard(card);
      const quantity = cart[product.slug] || 0;
      const addButton = card.querySelector('[data-product-cart-button]');
      let control = card.querySelector('[data-cart-quantity-control]');

      if (!(addButton instanceof HTMLElement)) return;

      if (quantity > 0) {
        if (!control) {
          control = createQuantityControl(product, quantity);
          addButton.after(control);
        }

        const value = control.querySelector('[data-cart-quantity]');
        if (value) value.textContent = String(quantity);
        addButton.hidden = true;
        addButton.classList.add('is-cart-replaced');
        addButton.setAttribute('aria-hidden', 'true');
        addButton.tabIndex = -1;
      } else {
        addButton.hidden = false;
        addButton.classList.remove('is-cart-replaced');
        addButton.removeAttribute('aria-hidden');
        addButton.removeAttribute('tabindex');
        control?.remove();
      }
    });
  };

  const parseCatalog = () => {
    const catalogNode = document.querySelector('[data-cart-catalog]');
    if (!catalogNode) return new Map();

    try {
      const products = JSON.parse(catalogNode.textContent || '[]');
      return new Map(products.map((product) => [product.slug, product]));
    } catch {
      return new Map();
    }
  };

  const formatPrice = (priceValue) => `${priceValue} zł`;

  const createCartPageItem = (product, quantity) => {
    const item = document.createElement('article');
    item.className = 'cart-item';

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.imageAlt || product.name;
    image.width = 960;
    image.height = 1200;
    image.loading = 'lazy';

    const imageWrap = document.createElement('a');
    imageWrap.className = 'cart-item-image';
    imageWrap.href = `/produkty/${product.slug}/`;
    imageWrap.append(image);

    const body = document.createElement('div');
    body.className = 'cart-item-body';

    const name = document.createElement('h2');
    const link = document.createElement('a');
    link.href = `/produkty/${product.slug}/`;
    link.textContent = product.name;
    name.append(link);

    const meta = document.createElement('p');
    meta.textContent = `${product.weight} / ${product.price}`;

    body.append(name, meta);

    const control = createQuantityControl(product, quantity);
    control.classList.add('cart-item-quantity');

    const total = document.createElement('p');
    total.className = 'cart-item-total';
    total.textContent = formatPrice(product.priceValue * quantity);

    item.append(imageWrap, body, control, total);
    return item;
  };

  const renderCartPage = (cart) => {
    const page = document.querySelector('[data-cart-page]');
    if (!(page instanceof HTMLElement)) return;

    const catalog = parseCatalog();
    const items = page.querySelector('[data-cart-items]');
    const empty = page.querySelector('[data-cart-empty]');
    const summary = page.querySelector('[data-cart-summary]');
    const subtotalNode = page.querySelector('[data-cart-subtotal]');

    if (!(items instanceof HTMLElement) || !(empty instanceof HTMLElement) || !(summary instanceof HTMLElement)) return;

    items.textContent = '';

    const entries = Object.entries(cart)
      .map(([slug, quantity]) => ({ product: catalog.get(slug), quantity }))
      .filter(({ product }) => product);
    const subtotal = entries.reduce((sum, { product, quantity }) => sum + product.priceValue * quantity, 0);

    empty.hidden = entries.length > 0;
    summary.hidden = entries.length === 0;

    entries.forEach(({ product, quantity }) => {
      items.append(createCartPageItem(product, quantity));
    });

    if (subtotalNode) subtotalNode.textContent = formatPrice(subtotal);
  };

  const updateUi = (cart = readCart()) => {
    updateCartLinks(cart);
    renderProductCards(cart);
    renderCartPage(cart);
  };

  const increment = (slug) => {
    const cart = readCart();
    cart[slug] = (cart[slug] || 0) + 1;
    return writeCart(cart);
  };

  const decrement = (slug) => {
    const cart = readCart();
    const nextQuantity = (cart[slug] || 0) - 1;

    if (nextQuantity > 0) {
      cart[slug] = nextQuantity;
    } else {
      delete cart[slug];
    }

    return writeCart(cart);
  };

  const bindEvents = () => {
    document.addEventListener('click', async (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const addButton = target.closest('[data-product-cart-button]');
      const incrementButton = target.closest('[data-cart-increment]');
      const decrementButton = target.closest('[data-cart-decrement]');

      if (addButton instanceof HTMLElement) {
        const card = addButton.closest('[data-cart-product]');
        if (!(card instanceof HTMLElement)) return;

        const product = productFromCard(card);
        const cart = readCart();
        cart[product.slug] = (cart[product.slug] || 0) + 1;

        const nextCart = writeCart(cart);
        updateUi(nextCart);
        announce(`${product.name} dodano do koszyka.`);
        return;
      }

      if (incrementButton instanceof HTMLElement) {
        const slug = incrementButton.dataset.cartIncrement;
        if (!slug) return;

        const nextCart = increment(slug);
        updateUi(nextCart);
        announce('Zmieniono ilość w koszyku.');
        return;
      }

      if (decrementButton instanceof HTMLElement) {
        const slug = decrementButton.dataset.cartDecrement;
        if (!slug) return;

        const nextCart = decrement(slug);
        updateUi(nextCart);
        announce('Zmieniono ilość w koszyku.');
      }
    });

    window.addEventListener(CART_EVENT, (event) => {
      updateUi(event.detail || readCart());
    });
  };

  const init = () => {
    bindEvents();
    updateUi();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
