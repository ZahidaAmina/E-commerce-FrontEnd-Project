# NEXAMART 🛍️

A responsive, polished online shopping website built with **plain HTML, CSS and JavaScript** — no frameworks, no backend. Product data comes from a JavaScript array (`js/products.js`), and the cart persists via `localStorage`.

> **Brand:** NEXAMART — *Modern essentials. Simple shopping.*

---

## ✨ Features

| Feature | Description |
| --- | --- |
| 🏠 **Home page** | Hero banner, featured products, popular products, sale/deals, shop-by-category, value props, footer |
| 🛍️ **Product cards** | Image, name, category, rating, price, old price, discount badge, Add to Cart + View Details |
| 🔎 **Search** | Live search across the catalog (e.g. "headphones") |
| 🏷️ **Category filter** | All / Electronics / Clothing / Shoes / Beauty / Accessories |
| ↕️ **Sort** | Featured, price ↑↓, top rated, biggest discount |
| 🛒 **Shopping cart** | Add, remove, increase/decrease quantity, subtotal, shipping, total, item count, empty state |
| 💾 **LocalStorage** | Cart survives page refreshes |
| 📄 **Product details** | Large image, description, rating, color swatches, sizes, stock status, quantity, related products |
| 📱 **Responsive** | Desktop → tablet → mobile with a hamburger nav |

---

## 🗂️ Folder structure

```
ecommerce-frontend/
├── index.html          # Home page
├── shop.html           # Search / filter / sort grid
├── product.html        # Product details
├── cart.html           # Shopping cart
├── css/
│   └── tailwind.css    # Compiled Tailwind CSS (build output)
├── src/
│   └── tailwind.css    # Tailwind source — theme + components
├── js/
│   ├── products.js     # Product "database" + helpers
│   ├── app.js          # Cart, navbar/footer, cards, search/filter
│   ├── product.js      # Product details page logic
│   └── cart.js         # Cart page logic
├── package.json        # Tailwind CLI build scripts
├── images/             # Drop real product images here (optional)
└── README.md
```

---

## 🚀 How to run

The compiled `css/tailwind.css` is already generated, so just open `index.html` in a browser:

- **Double-click** `index.html`, or
- Serve it locally for the cleanest experience:
  ```bash
  # from the project folder
  python -m http.server 8000
  # then open http://localhost:8000
  ```

> A local server is recommended (but not required) so `localStorage` and relative paths behave identically to production.

### Rebuilding the CSS (only when editing styles)

Styling is authored in `src/tailwind.css` and compiled with the Tailwind CLI:

```bash
npm install          # first time only
npm run build:css    # compile src/tailwind.css -> css/tailwind.css
npm run watch:css    # recompile automatically while you edit
```

---

## 🖼️ Product images

By default, products render **branded gradient + emoji placeholders**, so the site works fully offline with zero image assets.

To use real photos:
1. Drop images into `images/products/` (e.g. `images/products/headphones.jpg`).
2. In `js/products.js`, add an `img` field to any product:
   ```js
   { id: "wireless-headphones", img: "images/products/headphones.jpg", ... }
   ```
3. The card and detail page will automatically use the image instead of the placeholder.

---

## 🎨 Design system

| Token | Value |
| --- | --- |
| Background | `#F8F8F8` |
| Primary | `#111111` |
| Secondary | `#666666` |
| Accent | `#E67E22` |
| Cards | `#FFFFFF` |

- **Fonts:** [Poppins](https://fonts.google.com/specimen/Poppins) (headings) + [Inter](https://fonts.google.com/specimen/Inter) (body)
- **Icons:** [Font Awesome 6](https://fontawesome.com/)

> Styling is **Tailwind CSS v4** loaded via the Play CDN (`@tailwindcss/browser`). The
> The design tokens above live in a `@theme` block in `src/tailwind.css`, and shared
> components are built with `@apply`. Run `npm run build:css` to regenerate `css/tailwind.css`.

---

## 🧰 Tech

HTML5 · Tailwind CSS v4 · Vanilla JavaScript · LocalStorage · Responsive Design

---

## 📝 Notes

- **No React** — this is intentionally vanilla JS for practice with the DOM, events and state.
- The checkout button is a **demo** (no payment is processed).
- All cart state lives in `localStorage` under the `nova_cart_v1` key.
