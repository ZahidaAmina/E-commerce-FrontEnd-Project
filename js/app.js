/* =====================================================================
   NEXAMART — Shared application logic
   ---------------------------------------------------------------------
   Loaded on every page. Provides:
     • Cart state + localStorage persistence
     • Navbar & footer injection (single source of truth)
     • Product card rendering, rating stars, currency formatting
     • Toast notifications
     • Home page sections (hero, featured, popular, sale, categories)
     • Shop page search / filter / sort
   ===================================================================== */

/* ------------------------------ Cart --------------------------------- */

const CART_KEY = "nova_cart_v1";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/**
 * Add a product to the cart. Options may include `color` and `size`.
 * If the same product + variant already exists, its quantity is bumped.
 */
function addToCart(id, qty = 1, opts = {}) {
  const product = getProductById(id);
  if (!product) return;

  const cart = getCart();
  const color = opts.color || null;
  const size = opts.size || null;

  const existing = cart.find(
    (i) => i.id === id && i.color === color && i.size === size
  );

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty, color, size });
  }

  saveCart(cart);
  refreshCartBadge();
  showToast(`${product.name} added to cart`);
}

function removeFromCart(id, color, size) {
  let cart = getCart();
  cart = cart.filter(
    (i) => !(i.id === id && i.color === color && i.size === size)
  );
  saveCart(cart);
  refreshCartBadge();
}

/** Change quantity by a delta (+1 / -1). Removes the item at 0. */
function changeQuantity(id, color, size, delta) {
  let cart = getCart();
  const item = cart.find(
    (i) => i.id === id && i.color === color && i.size === size
  );
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i !== item);
  }
  saveCart(cart);
  refreshCartBadge();
}

function clearCart() {
  saveCart([]);
  refreshCartBadge();
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

/** Total value of all line items (before shipping). */
function cartSubtotal() {
  return getCart().reduce((sum, i) => {
    const p = getProductById(i.id);
    return p ? sum + p.price * i.qty : sum;
  }, 0);
}

/* --------------------------- Formatting ------------------------------ */

function formatPrice(n) {
  return "$" + Number(n).toFixed(2);
}

/** Render 5 stars with a partial fill based on `rating` (0–5). */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = "";
  for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
  if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
  for (let i = 0; i < empty; i++) html += '<i class="fa-regular fa-star"></i>';
  return html;
}

/* ------------------------- Product imagery --------------------------- */

/** Return an <img> for a product, or a gradient+emoji placeholder. */
function productImageHTML(product, extraClass = "") {
  if (product.img) {
    return `<img class="product-img ${extraClass}" src="${product.img}" alt="${product.name}" loading="lazy" />`;
  }
  const tint = product.tint || "#EEF1F6";
  return (
    `<div class="product-img product-img-placeholder ${extraClass}" ` +
    `style="background:${tint}" role="img" aria-label="${product.name}">` +
    `<span class="product-emoji">${product.emoji || "🛍️"}</span></div>`
  );
}

/* ------------------------- Category imagery --------------------------- */

/** Return an <img> for a category, or the emoji fallback. */
function categoryImageHTML(c) {
  if (c.img) {
    return `<img class="category-img" src="${c.img}" alt="${c.name}" loading="lazy" />`;
  }
  return `<span class="category-emoji" style="background:${c.tint}">${c.emoji}</span>`;
}

/** Small inline icon for filter chips — image when available, else emoji. */
function categoryChipIconHTML(c) {
  if (c.img) {
    return `<img class="category-chip-img" src="${c.img}" alt="" aria-hidden="true" />`;
  }
  return `<span>${c.emoji}</span>`;
}

/* --------------------------- Product card ---------------------------- */

function productCardHTML(product) {
  const discount = discountOf(product);
  const badges = [];
  if (discount > 0) badges.push(`<span class="badge badge-sale">-${discount}%</span>`);
  if (product.popular) badges.push(`<span class="badge badge-hot">Popular</span>`);
  if (product.stock <= 0) badges.push(`<span class="badge badge-out">Out of stock</span>`);

  return `
  <article class="product-card" data-id="${product.id}">
    <a class="product-card-link" href="product.html?id=${product.id}" aria-label="View ${product.name}">
      <div class="product-card-media">
        ${badges.join("")}
        ${productImageHTML(product)}
        <span class="product-card-actions">
          <button class="icon-btn add-to-cart-btn" data-id="${product.id}"
                  aria-label="Add to cart" ${product.stock <= 0 ? "disabled" : ""}>
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </span>
      </div>
    </a>
    <div class="product-card-body">
      <span class="product-card-cat">${(categoryMeta(product.category) || {}).name || product.category}</span>
      <h3 class="product-card-name">
        <a href="product.html?id=${product.id}">${product.name}</a>
      </h3>
      <div class="product-card-rating">
        <span class="stars">${renderStars(product.rating)}</span>
        <span class="rating-num">${product.rating}</span>
        <span class="rating-count">(${product.ratingCount})</span>
      </div>
      <div class="product-card-price">
        <span class="price">${formatPrice(product.price)}</span>
        ${discount > 0 ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ""}
      </div>
      <div class="product-card-btns">
        <button class="btn btn-accent add-to-cart-btn" data-id="${product.id}"
                ${product.stock <= 0 ? "disabled" : ""}>
          <i class="fa-solid fa-cart-plus"></i> Add to Cart
        </button>
        <a class="btn btn-outline" href="product.html?id=${product.id}">View Details</a>
      </div>
    </div>
  </article>`;
}

/* ------------------------------ Toast -------------------------------- */

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ----------------------------- Navbar -------------------------------- */

const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "shop.html", label: "Shop" },
  { href: "index.html#categories", label: "Categories" },
  { href: "index.html#about", label: "About" },
];

function navbarHTML() {
  return `
  <header class="site-header">
    <div class="wrapper header-inner">
      <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
        <i class="fa-solid fa-bars"></i>
      </button>

      <a href="index.html" class="logo">
        <span class="logo-mark"><img src="images/logo.png" alt="NEXAMART Logo" /></span>
        <span class="logo-text">NEXA<em>MART</em></span>
      </a>

      <nav class="main-nav" id="mainNav">
        <ul class="nav-list">
          ${NAV_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}
        </ul>
      </nav>

      <form class="search-form" id="navSearch" role="search">
        <input type="search" id="navSearchInput" class="search-input"
               placeholder="Search products..." aria-label="Search products" />
        <button type="submit" class="search-btn" aria-label="Search">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      <a href="cart.html" class="cart-link" aria-label="Shopping cart">
        <i class="fa-solid fa-cart-shopping"></i>
        <span class="cart-badge" id="cartBadge" hidden>0</span>
      </a>
    </div>
  </header>`;
}

function footerHTML() {
  return `
  <footer class="site-footer" id="about">
    <div class="wrapper footer-grid">
      <div class="footer-col footer-brand">
        <a href="index.html" class="logo logo-light">
          <span class="logo-mark"><img src="images/logo.png" alt="NEXAMART Logo" /></span>
          <span class="logo-text">NEXA<em>MART</em></span>
        </a>
        <p>Modern essentials. Simple shopping. Curated products for everyday life, delivered with care.</p>
        <div class="social-links">
          <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Shop</h4>
        <ul>
          <li><a href="shop.html">All Products</a></li>
          <li><a href="shop.html?cat=electronics">Electronics</a></li>
          <li><a href="shop.html?cat=clothing">Clothing</a></li>
          <li><a href="shop.html?cat=shoes">Shoes</a></li>
          <li><a href="shop.html?cat=beauty">Beauty</a></li>
          <li><a href="shop.html?cat=accessories">Accessories</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Support</h4>
        <ul>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Shipping &amp; Returns</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="wrapper">
        <p>&copy; ${new Date().getFullYear()} NEXAMART. All rights reserved.</p>
      </div>
    </div>
  </footer>`;
}

function refreshCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;
  const count = cartCount();
  badge.textContent = count;
  badge.hidden = count === 0;
}

/* --------------------------- Global wiring --------------------------- */

function wireGlobalEvents() {
  // Nav search → shop page
  const navSearch = document.getElementById("navSearch");
  if (navSearch) {
    navSearch.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = document.getElementById("navSearchInput").value.trim();
      window.location.href = "shop.html?q=" + encodeURIComponent(q);
    });
  }

  // Mobile nav toggle
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Delegate "add to cart" clicks on any card/button with .add-to-cart-btn
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart-btn");
    if (!btn) return;
    const id = btn.getAttribute("data-id");
    if (id) addToCart(id);
  });
}

function injectChrome() {
  const header = document.querySelector(".site-header");
  const footer = document.querySelector(".site-footer");
  if (header) header.outerHTML = navbarHTML();
  else document.body.insertAdjacentHTML("afterbegin", navbarHTML());
  if (footer) footer.outerHTML = footerHTML();
  else document.body.insertAdjacentHTML("beforeend", footerHTML());
  wireGlobalEvents();
  refreshCartBadge();
}

/* ---------------------------- Home page ------------------------------ */

function renderHome() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const popular = PRODUCTS.filter((p) => p.popular).slice(0, 8);
  const sale = PRODUCTS.filter((p) => discountOf(p) > 0)
    .sort((a, b) => discountOf(b) - discountOf(a))
    .slice(0, 4);

  const featuredEl = document.getElementById("featuredProducts");
  if (featuredEl) {
    featuredEl.innerHTML = featured.map(productCardHTML).join("");
  }
  const popularEl = document.getElementById("popularProducts");
  if (popularEl) {
    popularEl.innerHTML = popular.map(productCardHTML).join("");
  }
  const saleEl = document.getElementById("saleProducts");
  if (saleEl) {
    saleEl.innerHTML = sale.map(productCardHTML).join("");
  }
  const catEl = document.getElementById("categoryGrid");
  if (catEl) {
    catEl.innerHTML = CATEGORIES.map(
      (c) => `
      <a class="category-card" href="shop.html?cat=${c.id}">
        ${categoryImageHTML(c)}
        <span class="category-name">${c.name}</span>
        <span class="category-count">${PRODUCTS.filter((p) => p.category === c.id).length} items</span>
      </a>`
    ).join("");
  }
}

/* ---------------------------- Shop page ------------------------------ */

function initShop() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  let query = params.get("q") || "";
  let category = params.get("cat") || "all";
  let sort = params.get("sort") || "featured";

  const searchInput = document.getElementById("shopSearch");
  const sortSelect = document.getElementById("shopSort");
  const resultCount = document.getElementById("resultCount");
  const activeFilters = document.getElementById("activeFilters");

  if (searchInput) searchInput.value = query;

  // Category pills (or sidebar radio buttons) — we render pills dynamically
  const catContainer = document.getElementById("categoryFilters");
  if (catContainer) {
    catContainer.innerHTML =
      `<button class="filter-chip ${category === "all" ? "active" : ""}" data-cat="all">All</button>` +
      CATEGORIES.map(
        (c) =>
          `<button class="filter-chip ${category === c.id ? "active" : ""}" data-cat="${c.id}">` +
          `${categoryChipIconHTML(c)}${c.name}</button>`
      ).join("");
    catContainer.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (!chip) return;
      category = chip.getAttribute("data-cat");
      catContainer.querySelectorAll(".filter-chip").forEach((b) => b.classList.remove("active"));
      chip.classList.add("active");
      renderShopResults();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      query = searchInput.value;
      renderShopResults();
    });
  }

  if (sortSelect) {
    sortSelect.value = sort;
    sortSelect.addEventListener("change", () => {
      sort = sortSelect.value;
      renderShopResults();
    });
  }

  // Single delegated handler for the "clear" chips (attached once).
  if (activeFilters) {
    activeFilters.addEventListener("click", (e) => {
      const clear = e.target.closest("[data-clear]");
      if (!clear) return;
      if (clear.getAttribute("data-clear") === "cat") {
        category = "all";
        catContainer.querySelectorAll(".filter-chip").forEach((b) =>
          b.classList.toggle("active", b.getAttribute("data-cat") === "all")
        );
      } else {
        query = "";
        if (searchInput) searchInput.value = "";
      }
      renderShopResults();
    });
  }

  function renderShopResults() {
    const list = getProducts({ query, category, sort });

    if (resultCount) {
      resultCount.textContent = `${list.length} ${list.length === 1 ? "product" : "products"}`;
    }
    if (activeFilters) {
      activeFilters.innerHTML = "";
      if (category !== "all") {
        const cat = categoryMeta(category);
        activeFilters.insertAdjacentHTML(
          "beforeend",
          `<span class="active-chip">${cat ? categoryChipIconHTML(cat) + cat.name : category}
             <button data-clear="cat" aria-label="Clear category">&times;</button></span>`
        );
      }
      if (query.trim()) {
        activeFilters.insertAdjacentHTML(
          "beforeend",
          `<span class="active-chip">"${query.trim()}"
             <button data-clear="q" aria-label="Clear search">&times;</button></span>`
        );
      }
    }

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <span class="empty-emoji">🔍</span>
          <h3>No products found</h3>
          <p>Try a different search term or category.</p>
          <button class="btn btn-accent" id="resetShop">Clear all filters</button>
        </div>`;
      const reset = document.getElementById("resetShop");
      if (reset) {
        reset.addEventListener("click", () => {
          query = "";
          category = "all";
          if (searchInput) searchInput.value = "";
          catContainer.querySelectorAll(".filter-chip").forEach((b) =>
            b.classList.toggle("active", b.getAttribute("data-cat") === "all")
          );
          renderShopResults();
        });
      }
      return;
    }

    grid.innerHTML = list.map(productCardHTML).join("");
  }

  renderShopResults();
}

/* ----------------------------- Boot ---------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  injectChrome();
  renderHome();
  initShop();
});
