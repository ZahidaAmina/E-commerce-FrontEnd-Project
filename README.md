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

