/* =====================================================================
   NEXAMART — Shopping cart page
   ---------------------------------------------------------------------
   Renders cart line items from localStorage, handles quantity changes,
   removal, subtotal / shipping / total, empty state and checkout.
   ===================================================================== */

const SHIPPING_FLAT = 5.0;
const FREE_SHIPPING_THRESHOLD = 75.0;

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("cartRoot");
  if (!root) return;

  function renderCart() {
    const cart = getCart();
    const items = cart
      .map((item) => {
        const product = getProductById(item.id);
        return product ? { ...item, product } : null;
      })
      .filter(Boolean);

    if (items.length === 0) {
      root.innerHTML = `
        <div class="empty-state cart-empty">
          <span class="empty-emoji">🛒</span>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet. Let's fix that.</p>
          <a class="btn btn-accent" href="shop.html">Start Shopping</a>
        </div>`;
      return;
    }

    const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
    const total = subtotal + shipping;

    const rows = items
      .map((i) => {
        const p = i.product;
        const lineTotal = p.price * i.qty;
        return `
        <div class="cart-item" data-id="${p.id}" data-color="${i.color || ""}" data-size="${i.size || ""}">
          ${productImageHTML(p, "cart-item-img")}
          <div class="cart-item-info">
            <a class="cart-item-name" href="product.html?id=${p.id}">${p.name}</a>
            <div class="cart-item-meta">
              ${i.color ? `<span>Color: ${i.color}</span>` : ""}
              ${i.size ? `<span>Size: ${i.size}</span>` : ""}
            </div>
            <span class="cart-item-unit">${formatPrice(p.price)} each</span>
          </div>
          <div class="cart-item-qty">
            <div class="qty-stepper qty-stepper-sm">
              <button class="qty-btn cart-minus" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
              <span class="qty-value">${i.qty}</span>
              <button class="qty-btn cart-plus" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>
          <div class="cart-item-line">${formatPrice(lineTotal)}</div>
          <button class="cart-remove" aria-label="Remove ${p.name}">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>`;
      })
      .join("");

    root.innerHTML = `
      <div class="cart-layout">
        <div class="cart-items">
          <div class="cart-items-head">
            <span>Shopping Cart (${items.length})</span>
            <button class="link-btn" id="clearCart"><i class="fa-solid fa-trash-can"></i> Clear cart</button>
          </div>
          ${rows}
        </div>

        <aside class="cart-summary">
          <h3>Order Summary</h3>
          <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
          <div class="summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? `<span class="free">FREE</span>` : formatPrice(shipping)}</span>
          </div>
          ${
            subtotal < FREE_SHIPPING_THRESHOLD && shipping > 0
              ? `<p class="shipping-hint">Add ${formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping</p>`
              : `<p class="shipping-hint free">🎉 You've unlocked free shipping!</p>`
          }
          <div class="summary-row summary-total"><span>Total</span><span>${formatPrice(total)}</span></div>
          <button class="btn btn-accent btn-block btn-lg" id="checkoutBtn">
            <i class="fa-solid fa-lock"></i> Checkout
          </button>
          <a class="btn btn-outline btn-block" href="shop.html">Continue shopping</a>
        </aside>
      </div>`;

    // Quantity controls
    root.querySelectorAll(".cart-item").forEach((row) => {
      const id = row.getAttribute("data-id");
      const color = row.getAttribute("data-color") || null;
      const size = row.getAttribute("data-size") || null;
      row.querySelector(".cart-plus").addEventListener("click", () => {
        changeQuantity(id, color, size, +1);
        renderCart();
      });
      row.querySelector(".cart-minus").addEventListener("click", () => {
        changeQuantity(id, color, size, -1);
        renderCart();
      });
      row.querySelector(".cart-remove").addEventListener("click", () => {
        removeFromCart(id, color, size);
        showToast("Item removed from cart");
        renderCart();
      });
    });

    document.getElementById("clearCart").addEventListener("click", () => {
      clearCart();
      renderCart();
    });

    document.getElementById("checkoutBtn").addEventListener("click", () => {
      showToast("Checkout is a demo — no payment processed 🎉");
    });
  }

  renderCart();
});
