/* =====================================================================
   NEXAMART — Product catalog
   ---------------------------------------------------------------------
   All product data lives here. Since v1 has no backend, this file acts
   as the "database". Each product may optionally define an `img` path
   (e.g. "images/products/headphones.jpg"); when missing we render a
   branded gradient placeholder using the `emoji` + `tint` fields.
   ===================================================================== */

const CATEGORIES = [
  {
    id: "electronics",
    name: "Electronics",
    emoji: "💻",
    tint: "#EAF3FF",
    img: "images/categories/electronics.jpg",
  },
  {
    id: "clothing",
    name: "Clothing",
    emoji: "👕",
    tint: "#FFF0EA",
    img: "images/categories/clothing.jpg",
  },
  {
    id: "shoes",
    name: "Shoes",
    emoji: "👟",
    tint: "#EAFBF0",
    img: "images/categories/shoes.jpg",
  },
  {
    id: "beauty",
    name: "Beauty",
    emoji: "💄",
    tint: "#FDECF3",
    img: "images/categories/beauty.jpg",
  },
  {
    id: "accessories",
    name: "Accessories",
    emoji: "👜",
    tint: "#F3EFFF",
    img: "images/categories/accessories.jpg",
  },
];

const PRODUCTS = [
  /* ---------------------------- Electronics --------------------------- */
  {
    id: "wireless-headphones",
    name: "Wireless Headphones",
    img: "images/products/headphones.jpg",
    category: "electronics",
    price: 49.99,
    oldPrice: 69.99,
    rating: 4.8,
    ratingCount: 342,
    description:
      "Over-ear wireless headphones with active noise cancellation, plush memory-foam cushions and 30-hour battery life. Rich, balanced sound for music, calls and gaming.",
    emoji: "🎧",
    tint: "#EAF3FF",
    colors: ["Black", "White", "Navy"],
    stock: 24,
    featured: true,
    popular: true,
    tags: ["Noise Cancelling", "Wireless"],
  },
  {
    id: "smart-watch",
    name: "Smart Watch Series 5",
    img: "images/products/smart-watch.jpg",
    category: "electronics",
    price: 89.99,
    oldPrice: 129.99,
    rating: 4.7,
    ratingCount: 218,
    description:
      "Track workouts, heart rate and sleep with a bright AMOLED display. Water resistant, GPS-enabled and compatible with iOS and Android.",
    emoji: "⌚",
    tint: "#EAF3FF",
    colors: ["Black", "Silver", "Rose Gold"],
    stock: 18,
    popular: true,
    tags: ["GPS", "Water Resistant"],
  },
  {
    id: "bluetooth-speaker",
    name: "Portable Bluetooth Speaker",
    img: "images/products/bluetooth-speaker.jpg",
    category: "electronics",
    price: 34.99,
    oldPrice: 49.99,
    rating: 4.6,
    ratingCount: 164,
    description:
      "Compact, rugged speaker with 360° sound, deep bass and 20-hour playtime. Pairs instantly and is splash-proof for the pool or the trail.",
    emoji: "🔊",
    tint: "#EAF3FF",
    colors: ["Black", "Blue", "Red"],
    stock: 40,
    featured: true,
    tags: ["Splash-proof", "20h Battery"],
  },
  {
    id: "gaming-headphones",
    name: "Gaming Headphones",
    img: "images/products/gaming-headphones.jpg",
    category: "electronics",
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.5,
    ratingCount: 187,
    description:
      "Surround-sound gaming headset with a detachable boom mic, RGB lighting and ultra-comfortable ear cups built for marathon sessions.",
    emoji: "🎮",
    tint: "#EAF3FF",
    colors: ["Black", "Green"],
    stock: 22,
    tags: ["7.1 Surround", "RGB"],
  },
  {
    id: "wireless-earbuds",
    name: "Wireless Earbuds",
    img: "images/products/earbuds.jpg",
    category: "electronics",
    price: 39.99,
    oldPrice: 59.99,
    rating: 4.4,
    ratingCount: 276,
    description:
      "True wireless earbuds with crisp audio, touch controls and a pocket-sized charging case delivering up to 24 hours of total playtime.",
    emoji: "🎧",
    tint: "#EAF3FF",
    colors: ["White", "Black"],
    stock: 35,
    featured: true,
    tags: ["True Wireless"],
  },
  {
    id: "action-camera",
    name: "4K Action Camera",
    img: "images/products/action-camera.jpg",
    category: "electronics",
    price: 129.99,
    oldPrice: 179.99,
    rating: 4.9,
    ratingCount: 96,
    description:
      "Capture crisp 4K footage with image stabilization. Waterproof housing, wide-angle lens and built-in touchscreen for every adventure.",
    emoji: "📷",
    tint: "#EAF3FF",
    colors: ["Black"],
    stock: 12,
    popular: true,
    tags: ["4K", "Waterproof"],
  },

  /* ------------------------------ Clothing ---------------------------- */
  {
    id: "classic-tshirt",
    name: "Classic Cotton T-Shirt",
    img: "images/products/classic-tshirt.jpg",
    category: "clothing",
    price: 25.0,
    oldPrice: 35.0,
    rating: 4.6,
    ratingCount: 402,
    description:
      "Soft 100% organic cotton tee with a relaxed fit. Pre-shrunk and garment-dyed so it keeps its shape and color wash after wash.",
    emoji: "👕",
    tint: "#FFF0EA",
    colors: ["Black", "White", "Sand", "Olive"],
    sizes: ["S", "M", "L", "XL"],
    stock: 60,
    featured: true,
    popular: true,
    tags: ["Organic Cotton"],
  },
  {
    id: "denim-jacket",
    name: "Classic Denim Jacket",
    img: "images/products/denim-jacket.jpg",
    category: "clothing",
    price: 59.99,
    oldPrice: 89.99,
    rating: 4.8,
    ratingCount: 154,
    description:
      "Timeless denim jacket with a modern slim cut. Durable mid-weight denim, two chest pockets and antique brass hardware.",
    emoji: "🧥",
    tint: "#FFF0EA",
    colors: ["Blue", "Black"],
    sizes: ["S", "M", "L", "XL"],
    stock: 15,
    featured: true,
    tags: ["Denim", "Unisex"],
  },
  {
    id: "premium-hoodie",
    name: "Premium Fleece Hoodie",
    img: "images/products/premium-hoodie.jpg",
    category: "clothing",
    price: 44.99,
    oldPrice: 64.99,
    rating: 4.5,
    ratingCount: 231,
    description:
      "Heavyweight brushed-fleece hoodie with a kangaroo pocket and adjustable drawstring hood. Warm, soft and made to last.",
    emoji: "🧥",
    tint: "#FFF0EA",
    colors: ["Grey", "Black", "Cream"],
    sizes: ["S", "M", "L", "XL"],
    stock: 30,
    popular: true,
    tags: ["Brushed Fleece"],
  },
  {
    id: "summer-dress",
    name: "Flowy Summer Dress",
    img: "images/products/summer-dress.jpg",
    category: "clothing",
    price: 39.99,
    oldPrice: 59.99,
    rating: 4.7,
    ratingCount: 118,
    description:
      "Lightweight, breezy midi dress with a flattering A-line silhouette. Perfect for warm days, weekends and everything in between.",
    emoji: "👗",
    tint: "#FFF0EA",
    colors: ["Blush", "Sage", "White"],
    sizes: ["XS", "S", "M", "L"],
    stock: 20,
    featured: true,
    tags: ["Midi", "Lightweight"],
  },
  {
    id: "casual-shirt",
    name: "Linen Casual Shirt",
    img: "images/products/casual-shirt.jpg",
    category: "clothing",
    price: 29.99,
    oldPrice: 44.99,
    rating: 4.4,
    ratingCount: 143,
    description:
      "Breathable linen-blend button-up with a relaxed collar. Effortlessly smart, from the office to a night out.",
    emoji: "👔",
    tint: "#FFF0EA",
    colors: ["White", "Beige", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    stock: 26,
    tags: ["Linen Blend"],
  },
  {
    id: "slim-jeans",
    name: "Slim Fit Jeans",
    img: "images/products/slim-jeans.jpg",
    category: "clothing",
    price: 49.99,
    oldPrice: 69.99,
    rating: 4.6,
    ratingCount: 205,
    description:
      "Stretch-denim jeans with a tailored slim fit and subtle fade. All-day comfort with a sharp, modern line.",
    emoji: "👖",
    tint: "#FFF0EA",
    colors: ["Indigo", "Black", "Light Wash"],
    sizes: ["28", "30", "32", "34", "36"],
    stock: 38,
    tags: ["Stretch Denim"],
  },

  /* -------------------------------- Shoes ----------------------------- */
  {
    id: "nike-air-max",
    name: "Nike Air Max",
    img: "images/products/nike-air-max.jpg",
    category: "shoes",
    price: 120.0,
    oldPrice: 150.0,
    rating: 4.9,
    ratingCount: 312,
    description:
      "The icon, reimagined. Visible Air cushioning, breathable mesh upper and a bold silhouette that pairs with anything.",
    emoji: "👟",
    tint: "#EAFBF0",
    colors: ["White", "Black", "Grey"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 25,
    featured: true,
    popular: true,
    tags: ["Air Cushioning"],
  },
  {
    id: "nike-running-shoes",
    name: "Nike Running Shoes",
    img: "images/products/nike-running-shoes.jpg",
    category: "shoes",
    price: 95.0,
    oldPrice: 130.0,
    rating: 4.7,
    ratingCount: 198,
    description:
      "Lightweight, responsive daily trainers with a springy foam midsole. Built to log miles comfortably, mile after mile.",
    emoji: "👟",
    tint: "#EAFBF0",
    colors: ["Volt", "Black", "White"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 32,
    popular: true,
    tags: ["Responsive Foam"],
  },
  {
    id: "nike-casual-shoes",
    name: "Nike Casual Shoes",
    img: "images/products/nike-casual-shoes.jpg",
    category: "shoes",
    price: 85.0,
    oldPrice: 110.0,
    rating: 4.5,
    ratingCount: 167,
    description:
      "Clean, versatile sneakers for everyday wear. Soft cushioning, durable outsole and a look that goes with everything.",
    emoji: "👟",
    tint: "#EAFBF0",
    colors: ["White", "Black", "Sand"],
    sizes: ["7", "8", "9", "10", "11"],
    stock: 28,
    tags: ["Everyday"],
  },
  {
    id: "classic-sneakers",
    name: "Classic Court Sneakers",
    img: "images/products/classic-sneakers.jpg",
    category: "shoes",
    price: 65.0,
    oldPrice: 90.0,
    rating: 4.6,
    ratingCount: 221,
    description:
      "Minimal low-top sneakers in premium leather. A timeless court silhouette that never goes out of style.",
    emoji: "👟",
    tint: "#EAFBF0",
    colors: ["White", "Navy"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 40,
    featured: true,
    tags: ["Leather"],
  },
  {
    id: "leather-boots",
    name: "Leather Ankle Boots",
    img: "images/products/leather-boots.jpg",
    category: "shoes",
    price: 99.99,
    oldPrice: 139.99,
    rating: 4.7,
    ratingCount: 89,
    description:
      "Hand-finished leather boots with a rugged lug sole and cushioned insole. Built for the city and beyond.",
    emoji: "👢",
    tint: "#EAFBF0",
    colors: ["Brown", "Black"],
    sizes: ["8", "9", "10", "11", "12"],
    stock: 14,
    tags: ["Leather", "Lug Sole"],
  },

  /* ------------------------------- Beauty ----------------------------- */
  {
    id: "vitamin-c-serum",
    name: "Vitamin C Serum",
    img: "images/products/vitamin-c-serum.jpg",
    category: "beauty",
    price: 29.99,
    oldPrice: 39.99,
    rating: 4.8,
    ratingCount: 254,
    description:
      "Brightening face serum with 15% vitamin C and hyaluronic acid. Evens tone, boosts radiance and deeply hydrates.",
    emoji: "🧴",
    tint: "#FDECF3",
    colors: ["30ml"],
    stock: 45,
    featured: true,
    popular: true,
    tags: ["Brightening"],
  },
  {
    id: "lipstick-set",
    name: "Velvet Lipstick Set",
    img: "images/products/lipstick-set.jpg",
    category: "beauty",
    price: 24.99,
    oldPrice: 34.99,
    rating: 4.5,
    ratingCount: 176,
    description:
      "A trio of rich, long-wear matte lipsticks in wearable everyday shades. Creamy, weightless and never drying.",
    emoji: "💄",
    tint: "#FDECF3",
    colors: ["Set of 3"],
    stock: 33,
    tags: ["Matte", "Long-wear"],
  },
  {
    id: "eau-de-parfum",
    name: "Eau de Parfum",
    img: "images/products/eau-de-parfum.jpg",
    category: "beauty",
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.9,
    ratingCount: 142,
    description:
      "An elegant, long-lasting fragrance with notes of bergamot, jasmine and warm amber. One spray lasts all day.",
    emoji: "🌸",
    tint: "#FDECF3",
    colors: ["50ml"],
    stock: 19,
    popular: true,
    tags: ["Long-lasting"],
  },
  {
    id: "moisturizer-cream",
    name: "Hydrating Moisturizer",
    img: "images/products/moisturizer-cream.jpg",
    category: "beauty",
    price: 34.99,
    oldPrice: 44.99,
    rating: 4.6,
    ratingCount: 189,
    description:
      "Rich daily moisturizer with ceramides and squalane. Restores the skin barrier and locks in 24-hour hydration.",
    emoji: "🧴",
    tint: "#FDECF3",
    colors: ["50ml"],
    stock: 27,
    featured: true,
    tags: ["24h Hydration"],
  },

  /* ----------------------------- Accessories -------------------------- */
  {
    id: "leather-tote-bag",
    name: "Leather Tote Bag",
    img: "images/products/leather-tote-bag.jpg",
    category: "accessories",
    price: 79.99,
    oldPrice: 109.99,
    rating: 4.8,
    ratingCount: 133,
    description:
      "A roomy, structured tote in full-grain leather with an interior zip pocket and magnetic closure. Fits a 13\" laptop.",
    emoji: "👜",
    tint: "#F3EFFF",
    colors: ["Tan", "Black", "Burgundy"],
    stock: 16,
    featured: true,
    popular: true,
    tags: ["Full-grain Leather"],
  },
  {
    id: "polarized-sunglasses",
    name: "Polarized Sunglasses",
    img: "images/products/polarized-sunglasses.jpg",
    category: "accessories",
    price: 45.0,
    oldPrice: 60.0,
    rating: 4.5,
    ratingCount: 158,
    description:
      "Classic frames with polarized, UV400 lenses that cut glare and protect your eyes in style.",
    emoji: "🕶️",
    tint: "#F3EFFF",
    colors: ["Black", "Tortoise"],
    stock: 30,
    tags: ["UV400", "Polarized"],
  },
  {
    id: "minimalist-watch",
    name: "Minimalist Watch",
    img: "images/products/minimalist-watch.jpg",
    category: "accessories",
    price: 99.99,
    oldPrice: 139.99,
    rating: 4.7,
    ratingCount: 97,
    description:
      "A slim, minimalist timepiece with a Japanese quartz movement and quick-release leather strap.",
    emoji: "⌚",
    tint: "#F3EFFF",
    colors: ["Silver", "Gold", "Black"],
    stock: 11,
    popular: true,
    tags: ["Quartz", "Slim"],
  },
  {
    id: "canvas-backpack",
    name: "Canvas Backpack",
    img: "images/products/canvas-backpack.jpg",
    category: "accessories",
    price: 54.99,
    oldPrice: 74.99,
    rating: 4.6,
    ratingCount: 201,
    description:
      "Durable waxed-canvas backpack with a padded laptop sleeve, water-resistant finish and roomy main compartment.",
    emoji: "🎒",
    tint: "#F3EFFF",
    colors: ["Olive", "Navy", "Black"],
    stock: 23,
    featured: true,
    tags: ["Laptop Sleeve"],
  },
  {
    id: "leather-belt",
    name: "Genuine Leather Belt",
    img: "images/products/leather-belt.jpg",
    category: "accessories",
    price: 29.99,
    oldPrice: 39.99,
    rating: 4.4,
    ratingCount: 112,
    description:
      "A versatile everyday belt in smooth genuine leather with a brushed-metal buckle.",
    emoji: "🧵",
    tint: "#F3EFFF",
    colors: ["Black", "Brown"],
    sizes: ["32", "34", "36", "38"],
    stock: 29,
    tags: ["Genuine Leather"],
  },
];

/* ------------------------------ Helpers ------------------------------ */

/** Look up a single product by its id (slug). */
function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

/** All products whose name includes `q` (case-insensitive). */
function searchProducts(q) {
  const needle = String(q || "").trim().toLowerCase();
  if (!needle) return PRODUCTS;
  return PRODUCTS.filter((p) => p.name.toLowerCase().includes(needle));
}

/** Filter products by category id ("all" returns everything). */
function filterByCategory(catId) {
  if (!catId || catId === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === catId);
}

/** Combined search + category + sort. */
function getProducts({ query = "", category = "all", sort = "featured" } = {}) {
  let list = PRODUCTS.slice();

  const q = String(query).trim().toLowerCase();
  if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
  if (category && category !== "all") {
    list = list.filter((p) => p.category === category);
  }

  const sorters = {
    featured: () => 0,
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
    discount: (a, b) => discountOf(b) - discountOf(a),
  };
  if (sorters[sort]) list.sort(sorters[sort]);

  return list;
}

/** Percent discount derived from price vs oldPrice (0 if none). */
function discountOf(p) {
  if (!p.oldPrice || p.oldPrice <= p.price) return 0;
  return Math.round((1 - p.price / p.oldPrice) * 100);
}

/** Category metadata (name/emoji/tint) for a category id. */
function categoryMeta(id) {
  return CATEGORIES.find((c) => c.id === id) || null;
}
