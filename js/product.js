/* =====================================================================
   NEXAMART — Product details page
   ---------------------------------------------------------------------
   Reads ?id= from the URL, renders full product info, manages variant
   selection (color/size), quantity stepper and add-to-cart.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = getProductById(id);

  const root = document.getElementById("productDetail");
  if (!root) return;

  // Breadcrumb + "not found" fallback
  const crumb = document.getElementById("breadcrumb");
  if (crumb) {
    crumb.innerHTML = `<a href="index.html">Home</a> / <a href="shop.html">Shop</a> / <span>${product ? product.name : "Not found"}</span>`;
  }

  if (!product) {
    root.innerHTML = `
      <div class="empty-state">
        <span class="empty-emoji">😕</span>
        <h3>Product not found</h3>
        <p>The product you're looking for doesn't exist or was removed.</p>
        <a class="btn btn-accent" href="shop.html">Back to shop</a>
      </div>`;
    return;
  }

  document.title = `${product.name} — NEXAMART`;

  const discount = discountOf(product);
  const hasSizes = product.sizes && product.sizes.length;
  const hasColors = product.colors && product.colors.length;
  const inStock = product.stock > 0;

  let selectedColor = hasColors ? product.colors[0] : null;
  let selectedSize = hasSizes ? product.sizes[0] : null;
  let qty = 1;

  // Map color names → swatch colors for the visual dots.
  const swatchColors = {
    Black: "#1c1c1e", White: "#ffffff", Navy: "#1d2f5d", Blue: "#2f6fed",
    Grey: "#8a8f98", Red: "#d84a3a", Green: "#2f9e5f", Sand: "#d8c29a",
    Olive: "#6b7a4f", Cream: "#efe6d5", Beige: "#d8c8a8", Blush: "#f4c6cf",
    Sage: "#b7c9b1", Volt: "#d6f23a", Brown: "#6b4a33", Tan: "#c79a68",
    Burgundy: "#6e1f2b", Tortoise: "#8a5a2b", Silver: "#c9ced6", Gold: "#d4af37",
    Indigo: "#2f3f7a", "Light Wash": "#9fb6d8", "Rose Gold": "#e7b7a4",
    "Set of 3": "#e0567f", "30ml": "#e0567f", "50ml": "#e0567f",
  };

  root.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-detail-media">
        ${discount > 0 ? `<span class="badge badge-sale badge-lg">-${discount}%</span>` : ""}
        ${productImageHTML(product, "product-detail-img")}
      </div>

      <div class="product-detail-info">
        <span class="product-card-cat">${(categoryMeta(product.category) || {}).name || product.category}</span>
        <h1 class="product-detail-name">${product.name}</h1>

        <div class="product-detail-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-num">${product.rating}</span>
          <span class="rating-count">· ${product.ratingCount} reviews</span>
        </div>

        <div class="product-detail-price">
          <span class="price price-lg">${formatPrice(product.price)}</span>
          ${discount > 0 ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>
            <span class="save-badge">Save ${formatPrice(product.oldPrice - product.price)}</span>` : ""}
        </div>

        <p class="product-detail-desc">${product.description}</p>

        ${hasColors ? `
        <div class="variant-group">
          <span class="variant-label">Color: <strong id="colorLabel">${selectedColor}</strong></span>
          <div class="swatches" id="swatches">
            ${product.colors.map((c) => `
              <button class="swatch ${c === selectedColor ? "active" : ""}" data-color="${c}"
                      style="--swatch:${swatchColors[c] || "#ccc"}" title="${c}"
                      aria-label="Color ${c}"></button>`).join("")}
          </div>
        </div>` : ""}

        ${hasSizes ? `
        <div class="variant-group">
          <span class="variant-label">Size: <strong id="sizeLabel">${selectedSize}</strong></span>
          <div class="sizes" id="sizes">
            ${product.sizes.map((s) => `
              <button class="size-btn ${s === selectedSize ? "active" : ""}" data-size="${s}">${s}</button>`).join("")}
          </div>
        </div>` : ""}

        <div class="variant-group">
          <span class="variant-label">Stock:
            <strong class="${inStock ? "in-stock" : "out-stock"}">
              ${inStock ? "Available" : "Out of stock"}
            </strong>
          </span>
        </div>

        <div class="buy-row">
          <div class="qty-stepper">
            <button class="qty-btn" id="qtyMinus" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
            <input type="number" id="qtyInput" value="1" min="1" max="${product.stock || 99}" aria-label="Quantity" />
            <button class="qty-btn" id="qtyPlus" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
          </div>
          <button class="btn btn-accent btn-lg" id="addToCartBtn" ${inStock ? "" : "disabled"}>
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>

        ${product.tags && product.tags.length ? `
        <div class="product-tags">
          ${product.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>` : ""}
      </div>
    </div>`;

  // --- interactions ---
  const qtyInput = document.getElementById("qtyInput");
  const minusBtn = document.getElementById("qtyMinus");
  const plusBtn = document.getElementById("qtyPlus");

  function syncQty() {
    let v = parseInt(qtyInput.value, 10);
    if (isNaN(v) || v < 1) v = 1;
    if (product.stock && v > product.stock) v = product.stock;
    qtyInput.value = v;
    qty = v;
  }

  minusBtn.addEventListener("click", () => {
    qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
    syncQty();
  });
  plusBtn.addEventListener("click", () => {
    qtyInput.value = (parseInt(qtyInput.value, 10) || 1) + 1;
    syncQty();
  });
  qtyInput.addEventListener("change", syncQty);

  const swatches = document.getElementById("swatches");
  if (swatches) {
    swatches.addEventListener("click", (e) => {
      const btn = e.target.closest(".swatch");
      if (!btn) return;
      selectedColor = btn.getAttribute("data-color");
      swatches.querySelectorAll(".swatch").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("colorLabel").textContent = selectedColor;
    });
  }

  const sizes = document.getElementById("sizes");
  if (sizes) {
    sizes.addEventListener("click", (e) => {
      const btn = e.target.closest(".size-btn");
      if (!btn) return;
      selectedSize = btn.getAttribute("data-size");
      sizes.querySelectorAll(".size-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("sizeLabel").textContent = selectedSize;
    });
  }

  // Add to cart with selected variants + quantity
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    syncQty();
    addToCart(product.id, qty, { color: selectedColor, size: selectedSize });
  });

  // Related products (same category, excluding self)
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);
  const relatedEl = document.getElementById("relatedProducts");
  if (relatedEl && related.length) {
    relatedEl.innerHTML = related.map(productCardHTML).join("");
  } else if (relatedEl) {
    relatedEl.closest(".related-section").style.display = "none";
  }
});
