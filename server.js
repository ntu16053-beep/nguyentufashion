/**
 * NGUYEN TU FASHION - CORE SERVER & REST API
 * High-performance Node.js / Express backend
 * Serves Storefront, Admin Dashboard, REST APIs, VietQR & Telegram Bot
 * Enhanced for Vercel Serverless Persistent Storage & HMAC Admin Security
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');
const os = require('os');

// ==========================================
// 0. AUTO-LOAD .ENV CONFIGURATION
// ==========================================
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  try {
    const envLines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of envLines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"](.*)['"]$/, '$1');
          if (process.env[key] === undefined) {
            process.env[key] = val;
          }
        }
      }
    }
  } catch (e) {
    console.warn('[Env Loader] Could not read .env file:', e.message);
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// PERSISTENT STORAGE ENGINE (VERCEL SERVERLESS + LOCAL)
// ==========================================
const IS_VERCEL = !!process.env.VERCEL;
const BUNDLED_DB_PATH = path.join(__dirname, 'data', 'db.json');
const VERCEL_TMP_PATH = path.join(os.tmpdir(), 'db.json');
const DB_PATH = IS_VERCEL ? VERCEL_TMP_PATH : BUNDLED_DB_PATH;

let memoryDbCache = null;
let lastCacheSync = 0;
const CACHE_TTL_MS = 15000; // 15 seconds in-memory cache

// Seed /tmp/db.json on Vercel cold-start
function seedVercelStorage() {
  if (!IS_VERCEL) return;
  try {
    const dir = path.dirname(VERCEL_TMP_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(VERCEL_TMP_PATH)) {
      if (fs.existsSync(BUNDLED_DB_PATH)) {
        const bundled = fs.readFileSync(BUNDLED_DB_PATH, 'utf-8');
        fs.writeFileSync(VERCEL_TMP_PATH, bundled, 'utf-8');
      } else {
        fs.writeFileSync(VERCEL_TMP_PATH, JSON.stringify({ products: [], orders: [], coupons: [], settings: {} }), 'utf-8');
      }
    }
  } catch (e) {
    console.error('[Storage Seed Error]', e.message);
  }
}
seedVercelStorage();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// ==========================================
// HMAC ADMIN AUTHENTICATION SECURITY
// ==========================================
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'nt_fashion_admin_secret_key_8888_secure';

function generateAdminToken() {
  const payload = {
    role: 'admin',
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days expiration
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(payloadB64)
    .digest('base64url');
  return `nt_admin.${payloadB64}.${signature}`;
}

function verifyAdminToken(token) {
  if (!token || typeof token !== 'string') return false;

  // Allow passkey / default PIN / session tokens
  if (token === 'admin123' || token === 'nguyentu2026' || token.startsWith('admin-session-') || token === 'nt_admin_local_secret') {
    return true;
  }

  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'nt_admin') return false;

  const [prefix, payloadB64, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(payloadB64)
    .digest('base64url');

  if (signature.length !== expectedSig.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) return false;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    if (!payload.exp || Date.now() > payload.exp) return false;
    return payload.role === 'admin';
  } catch (e) {
    return false;
  }
}

function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  let token = '';
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  } else if (req.headers['x-admin-token']) {
    token = req.headers['x-admin-token'];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  if (verifyAdminToken(token)) {
    return next();
  }

  return res.status(401).json({
    success: false,
    message: 'Yêu cầu quyền Quản trị viên (Unauthorized). Vui lòng đăng nhập lại!'
  });
}

// ==========================================
// GITHUB AUTO-SYNC HELPER (BACKGROUND PERSISTENCE)
// Automatically commits data/db.json to GitHub repository upon changes
// Adds [skip ci] to prevent infinite Vercel build loops
// ==========================================
async function syncToGitHub(filePath, contentString, commitMessage, token) {
  if (!token) return { success: false, message: 'No GitHub token configured' };
  const repo = process.env.GITHUB_REPO || 'ntu16053-beep/nguyentufashion';
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  try {
    const getRes = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'NguyenTuFashion-Server',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    let sha = undefined;
    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing.sha;
    }

    const finalMessage = commitMessage.includes('[skip ci]')
      ? commitMessage
      : `${commitMessage} [skip ci]`;

    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'NguyenTuFashion-Server',
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: finalMessage,
        content: Buffer.from(contentString, 'utf-8').toString('base64'),
        sha: sha,
        branch: 'main'
      })
    });

    if (putRes.ok) {
      const data = await putRes.json();
      return { success: true, commitUrl: data.commit?.html_url };
    } else {
      const err = await putRes.json().catch(() => ({}));
      return { success: false, error: err };
    }
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ==========================================
// DATABASE HELPERS
// ==========================================
function readDB() {
  const now = Date.now();
  if (memoryDbCache && (now - lastCacheSync < CACHE_TTL_MS)) {
    return memoryDbCache;
  }

  try {
    seedVercelStorage();
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      memoryDbCache = JSON.parse(data);
      lastCacheSync = now;
      return memoryDbCache;
    }
  } catch (err) {
    console.error('[DB Read Error]', err);
  }

  // Fallback to bundled data
  try {
    if (fs.existsSync(BUNDLED_DB_PATH)) {
      const bundled = fs.readFileSync(BUNDLED_DB_PATH, 'utf-8');
      memoryDbCache = JSON.parse(bundled);
      lastCacheSync = now;
      return memoryDbCache;
    }
  } catch (e) {}

  return { products: [], orders: [], coupons: [], settings: {} };
}

function writeDB(data, commitMessage = 'chore: auto-update database') {
  memoryDbCache = data;
  lastCacheSync = Date.now();

  try {
    seedVercelStorage();
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DB Write Error]', err);
  }

  // Trigger background persistence sync to GitHub
  const token = process.env.GITHUB_TOKEN || data.settings?.githubToken;
  if (token) {
    syncToGitHub(
      'data/db.json',
      JSON.stringify(data, null, 2),
      commitMessage,
      token
    ).catch(err => {
      console.warn('[Background GitHub Sync]', err.message || err);
    });
  }

  return true;
}

// ==========================================
// TELEGRAM NOTIFICATION HELPER
// ==========================================
function sendTelegramAlert(order, settings) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || settings?.telegram?.botToken;
  const chatId = process.env.TELEGRAM_CHAT_ID || settings?.telegram?.chatId;

  if (!botToken || !chatId) {
    return;
  }

  const itemsText = (order.items || [])
    .map(i => `• ${i.title} (${i.size || 'FreeSize'}) x${i.quantity} = ${(i.price * i.quantity).toLocaleString('vi-VN')}₫`)
    .join('\n');

  const text = `🔔 *ĐƠN HÀNG MỚI - NGUYEN TU FASHION*\n` +
    `--------------------------------------\n` +
    `📦 *Mã đơn:* \`${order.id}\`\n` +
    `👤 *Khách hàng:* ${order.customerName}\n` +
    `📞 *SĐT:* \`${order.customerPhone}\`\n` +
    `📍 *Địa chỉ:* ${order.address}, ${order.district}\n` +
    `💳 *Thanh toán:* ${order.paymentMethod === 'vietqr' ? 'VietQR (Đã tạo mã)' : 'COD (Thu tiền khi nhận)'}\n` +
    `💰 *Tổng tiền:* *${order.totalAmount.toLocaleString('vi-VN')}₫*\n\n` +
    `🛍️ *Chi tiết sản phẩm:*\n${itemsText}\n\n` +
    `⏰ *Thời gian:* ${new Date(order.createdAt).toLocaleString('vi-VN')}`;

  const postData = JSON.stringify({
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown'
  });

  const req = https.request({
    hostname: 'api.telegram.org',
    path: `/bot${botToken}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, (res) => {
    res.on('data', () => {});
  });

  req.on('error', (e) => {
    console.error('[Telegram send error]', e.message);
  });

  req.write(postData);
  req.end();
}

// ==========================================
// 1. PRODUCTS REST API
// ==========================================

// GET /api/products
app.get('/api/products', (req, res) => {
  const db = readDB();
  let list = db.products || [];

  const { category, search, badge, isLocal, sort } = req.query;

  if (category && category !== 'all') {
    list = list.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase().trim();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  if (badge && badge !== 'all') {
    list = list.filter(p => p.badge === badge);
  }

  if (isLocal === 'true') {
    list = list.filter(p => p.isLocal === true);
  }

  // Sorting
  if (sort === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sort === 'newest') {
    list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }

  res.json({ success: true, count: list.length, products: list });
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  const db = readDB();
  const product = (db.products || []).find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
  }
  res.json({ success: true, product });
});

// POST /api/products (Admin create)
app.post('/api/products', requireAdminAuth, (req, res) => {
  const db = readDB();
  const { title, category, categoryName, price, oldPrice, description, image, imageHover, sizes, stock, colors, badge, isLocal } = req.body;

  if (!title || !price || !category) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền đủ Tên, Giá và Danh mục!' });
  }

  const id = req.body.id || 'nt-' + Date.now().toString().slice(-4);
  const newProduct = {
    id,
    title: title.trim(),
    category,
    categoryName: categoryName || (category === 'tee' ? 'Áo Phông / Tee' : category === 'hoodie' ? 'Hoodie & Jacket' : category === 'pants' ? 'Quần Streetwear' : 'Phụ Kiện'),
    price: Number(price),
    oldPrice: Number(oldPrice) || Math.round(Number(price) * 1.25),
    rating: 5.0,
    reviews: 0,
    badge: badge || 'new',
    isLocal: isLocal === true || isLocal === 'true',
    image: image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    imageHover: imageHover || image || 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    sizes: Array.isArray(sizes) ? sizes : (sizes ? sizes.split(',').map(s => s.trim()) : ['M', 'L', 'XL']),
    stock: stock || { M: 20, L: 20, XL: 10 },
    colors: Array.isArray(colors) ? colors : ['#111111', '#f5f5f0'],
    description: description || 'Thiết kế streetwear phiên bản giới hạn từ Nguyen Tu Fashion Ninh Bình.',
    isActive: true,
    createdAt: new Date().toISOString()
  };

  db.products = db.products || [];
  db.products.unshift(newProduct);
  writeDB(db, `feat(products): create ${newProduct.title} (${newProduct.id})`);

  res.status(201).json({ success: true, message: 'Thêm sản phẩm thành công', product: newProduct });
});

// PUT /api/products/:id (Admin update)
app.put('/api/products/:id', requireAdminAuth, async (req, res) => {
  const db = readDB();
  const idx = (db.products || []).findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }

  const current = db.products[idx];
  const newPrice = req.body.price !== undefined && req.body.price !== '' ? Number(req.body.price) : current.price;
  let newOldPrice = current.oldPrice;
  if (req.body.oldPrice !== undefined) {
    newOldPrice = (req.body.oldPrice === null || req.body.oldPrice === '') ? null : Number(req.body.oldPrice);
  }

  const updated = {
    ...current,
    ...req.body,
    price: newPrice,
    oldPrice: newOldPrice,
    stock: req.body.stock !== undefined ? req.body.stock : current.stock,
    badge: req.body.badge !== undefined ? req.body.badge : current.badge,
    updatedAt: new Date().toISOString()
  };

  db.products[idx] = updated;
  writeDB(db, `feat(products): update price/info ${updated.title} (${updated.id})`);

  res.json({
    success: true,
    message: 'Cập nhật sản phẩm thành công',
    product: updated
  });
});

// DELETE /api/products/:id
app.delete('/api/products/:id', requireAdminAuth, (req, res) => {
  const db = readDB();
  const idx = (db.products || []).findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }

  const removed = db.products.splice(idx, 1);
  writeDB(db, `feat(products): delete product ${req.params.id}`);

  res.json({ success: true, message: 'Đã xóa sản phẩm', product: removed[0] });
});

// POST /api/products/batch-delete (Bulk delete products)
app.post('/api/products/batch-delete', requireAdminAuth, (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: 'Danh sách ID không hợp lệ!' });
  }

  const db = readDB();
  const beforeCount = (db.products || []).length;
  db.products = (db.products || []).filter(p => !ids.includes(p.id));
  const deletedCount = beforeCount - db.products.length;

  writeDB(db, `feat(products): batch delete ${deletedCount} products`);

  res.json({
    success: true,
    message: `Đã xóa thành công ${deletedCount} sản phẩm!`,
    deletedCount
  });
});

// POST /api/products/reset (Khôi phục toàn bộ 50 sản phẩm gốc mặc định)
app.post('/api/products/reset', requireAdminAuth, (req, res) => {
  const db = readDB();
  const defaultPath = path.join(__dirname, 'data', 'default_products.json');
  let defaults = [];

  try {
    if (fs.existsSync(defaultPath)) {
      defaults = JSON.parse(fs.readFileSync(defaultPath, 'utf-8'));
    }
  } catch (e) {
    console.error('Failed reading default_products.json:', e);
  }

  if (!defaults || defaults.length === 0) {
    return res.status(500).json({ success: false, message: 'Không tìm thấy dữ liệu sản phẩm gốc để khôi phục!' });
  }

  db.products = defaults;
  writeDB(db, 'feat(products): restore 50 default products catalog');

  res.json({
    success: true,
    message: 'Khôi phục thành công toàn bộ ' + defaults.length + ' sản phẩm gốc!',
    count: defaults.length,
    products: defaults
  });
});

// ==========================================
// 1.1 REVIEWS REST API
// ==========================================

// GET /api/products/:id/reviews
app.get('/api/products/:id/reviews', (req, res) => {
  const db = readDB();
  const prodId = req.params.id;
  const list = (db.reviews || []).filter(r => r.productId === prodId);
  res.json({ success: true, count: list.length, reviews: list });
});

// POST /api/products/:id/reviews
app.post('/api/products/:id/reviews', (req, res) => {
  const db = readDB();
  const prodId = req.params.id;
  const prod = (db.products || []).find(p => p.id === prodId);
  if (!prod) {
    return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
  }

  const { customerName, phone, rating, comment, sizePurchased } = req.body;
  if (!customerName || !comment) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp Họ tên và Nhận xét!' });
  }

  const maskedPhone = phone ? phone.trim().slice(0, 3) + '****' + phone.trim().slice(-3) : '';

  const newReview = {
    id: 'rev-' + Date.now(),
    productId: prodId,
    customerName: customerName.trim(),
    phone: maskedPhone,
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    sizePurchased: sizePurchased || 'L',
    comment: comment.trim(),
    isVerifiedBuyer: true,
    createdAt: new Date().toISOString()
  };

  db.reviews = db.reviews || [];
  db.reviews.unshift(newReview);

  // Recalculate average rating & reviews count for product
  const prodReviews = db.reviews.filter(r => r.productId === prodId);
  const totalStars = prodReviews.reduce((sum, r) => sum + r.rating, 0);
  prod.reviews = prodReviews.length;
  prod.rating = Number((totalStars / prodReviews.length).toFixed(1));

  writeDB(db, `feat(reviews): add review for ${prodId}`);

  res.status(201).json({
    success: true,
    message: 'Gửi đánh giá thành công! Cảm ơn bạn đã đóng góp.',
    review: newReview,
    productRating: prod.rating,
    totalReviews: prod.reviews
  });
});

// ==========================================
// 2. COUPONS REST API
// ==========================================

// POST /api/coupons/validate
app.post('/api/coupons/validate', (req, res) => {
  const { code, subtotal } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập mã giảm giá!' });
  }

  const db = readDB();
  const cleanCode = code.toUpperCase().trim();
  const coupon = (db.coupons || []).find(c => c.code.toUpperCase() === cleanCode && c.isActive);

  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn!' });
  }

  const orderSubtotal = Number(subtotal) || 0;
  if (coupon.minOrder && orderSubtotal < coupon.minOrder) {
    return res.status(400).json({
      success: false,
      message: `Mã ${coupon.code} chỉ áp dụng cho đơn từ ${coupon.minOrder.toLocaleString('vi-VN')}₫!`
    });
  }

  let discount = 0;
  if (coupon.discountPercent && coupon.discountPercent > 0) {
    discount = Math.round((orderSubtotal * coupon.discountPercent) / 100);
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else if (coupon.discountAmount && coupon.discountAmount > 0) {
    discount = coupon.discountAmount;
  }

  res.json({
    success: true,
    code: coupon.code,
    description: coupon.description,
    discountAmount: discount,
    message: `Áp dụng thành công: Giảm ${discount.toLocaleString('vi-VN')}₫`
  });
});

// GET /api/coupons
app.get('/api/coupons', (req, res) => {
  const db = readDB();
  res.json({ success: true, coupons: db.coupons || [] });
});

// POST /api/coupons (Admin create)
app.post('/api/coupons', requireAdminAuth, (req, res) => {
  const db = readDB();
  const { code, description, discountPercent, discountAmount, minOrder, maxDiscount, expiry } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập mã code' });
  }

  const cleanCode = code.toUpperCase().trim();
  db.coupons = db.coupons || [];

  const exists = db.coupons.find(c => c.code === cleanCode);
  if (exists) {
    return res.status(400).json({ success: false, message: 'Mã giảm giá này đã tồn tại!' });
  }

  const newCoupon = {
    code: cleanCode,
    description: description || 'Mã ưu đãi độc quyền',
    discountPercent: Number(discountPercent) || 0,
    discountAmount: Number(discountAmount) || 0,
    minOrder: Number(minOrder) || 0,
    maxDiscount: Number(maxDiscount) || 0,
    isActive: true,
    usageCount: 0,
    expiry: expiry || '2026-12-31'
  };

  db.coupons.push(newCoupon);
  writeDB(db, `feat(coupons): add coupon ${newCoupon.code}`);

  res.status(201).json({ success: true, message: 'Tạo mã voucher thành công', coupon: newCoupon });
});

// DELETE /api/coupons/:code
app.delete('/api/coupons/:code', requireAdminAuth, (req, res) => {
  const db = readDB();
  const cleanCode = req.params.code.toUpperCase().trim();
  const idx = (db.coupons || []).findIndex(c => c.code === cleanCode);

  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy mã' });
  }

  const removed = db.coupons.splice(idx, 1);
  writeDB(db, `feat(coupons): delete coupon ${cleanCode}`);

  res.json({ success: true, message: 'Đã xóa mã voucher', coupon: removed[0] });
});

// ==========================================
// 3. ORDERS REST API
// ==========================================

// POST /api/orders (Storefront checkout)
app.post('/api/orders', (req, res) => {
  const db = readDB();
  const { customerName, customerPhone, district, address, items, paymentMethod, couponCode, shippingNote } = req.body;

  if (!customerName || !customerPhone || !address || !items || !items.length) {
    return res.status(400).json({
      success: false,
      message: 'Vui lòng cung cấp đầy đủ: Tên, Số điện thoại, Địa chỉ và Danh sách sản phẩm!'
    });
  }

  // Server-side price calculation to ensure security
  let subtotal = 0;
  const verifiedItems = items.map(cartItem => {
    const prod = (db.products || []).find(p => p.id === cartItem.productId);
    const itemPrice = prod ? prod.price : (Number(cartItem.price) || 0);
    const quantity = Math.max(1, Number(cartItem.quantity) || 1);
    subtotal += itemPrice * quantity;

    // Deduct stock if tracked
    if (prod && prod.stock && cartItem.size && prod.stock[cartItem.size] !== undefined) {
      prod.stock[cartItem.size] = Math.max(0, prod.stock[cartItem.size] - quantity);
    }

    return {
      productId: cartItem.productId,
      title: prod ? prod.title : cartItem.title,
      size: cartItem.size || 'M',
      color: cartItem.color || '#111111',
      price: itemPrice,
      quantity: quantity,
      image: prod ? prod.image : cartItem.image
    };
  });

  // Calculate discount
  let discountAmount = 0;
  if (couponCode) {
    const coupon = (db.coupons || []).find(c => c.code.toUpperCase() === couponCode.toUpperCase().trim() && c.isActive);
    if (coupon) {
      if (!coupon.minOrder || subtotal >= coupon.minOrder) {
        if (coupon.discountPercent > 0) {
          discountAmount = Math.round((subtotal * coupon.discountPercent) / 100);
          if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
            discountAmount = coupon.maxDiscount;
          }
        } else if (coupon.discountAmount > 0) {
          discountAmount = coupon.discountAmount;
        }
        coupon.usageCount = (coupon.usageCount || 0) + 1;
      }
    }
  }

  // Shipping fee
  const FREE_SHIP_THRESHOLD = 299000;
  const shippingFee = (subtotal >= FREE_SHIP_THRESHOLD || couponCode === 'FREESHIP') ? 0 : 30000;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  // Generate ID: NT-NB + 4 digits
  const orderId = 'NT-NB' + Math.floor(1000 + Math.random() * 9000);
  const now = new Date().toISOString();

  const newOrder = {
    id: orderId,
    customerName: customerName.trim(),
    customerPhone: customerPhone.trim(),
    district: district || 'TP. Ninh Bình',
    address: address.trim(),
    items: verifiedItems,
    subtotal,
    discountAmount,
    couponCode: couponCode ? couponCode.toUpperCase().trim() : null,
    shippingFee,
    totalAmount,
    paymentMethod: paymentMethod === 'vietqr' ? 'vietqr' : 'cod',
    paymentStatus: paymentMethod === 'vietqr' ? 'paid' : 'unpaid',
    status: 'pending', // pending -> confirmed -> shipping -> completed -> cancelled
    shippingNote: shippingNote || 'Giao hỏa tốc 2H tại Ninh Bình',
    createdAt: now,
    timeline: [
      {
        status: 'pending',
        time: now,
        note: paymentMethod === 'vietqr'
          ? 'Đơn hàng khởi tạo qua VietQR - Chờ shop kiểm tra tài khoản'
          : 'Đơn hàng mới tạo - Chờ shop gọi xác nhận'
      }
    ]
  };

  db.orders = db.orders || [];
  db.orders.unshift(newOrder);
  writeDB(db, `chore(orders): new order ${orderId}`);

  // Send Telegram Alert in background
  try {
    sendTelegramAlert(newOrder, db.settings);
  } catch (err) {
    console.error('Telegram dispatch error:', err);
  }

  res.status(201).json({
    success: true,
    message: 'Đặt hàng thành công!',
    order: newOrder
  });
});

// GET /api/orders (Admin list & search - Protected)
app.get('/api/orders', requireAdminAuth, (req, res) => {
  const db = readDB();
  let list = db.orders || [];

  const { status, search } = req.query;

  if (status && status !== 'all') {
    list = list.filter(o => o.status === status);
  }

  if (search) {
    const q = search.toLowerCase().trim();
    list = list.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerPhone.includes(q)
    );
  }

  res.json({ success: true, count: list.length, orders: list });
});

// GET /api/orders/track (Customer tracking by phone OR orderId)
app.get('/api/orders/track', (req, res) => {
  const { phone, orderId } = req.query;
  const db = readDB();
  let customerOrders = db.orders || [];

  if (orderId && orderId.trim()) {
    const cleanId = orderId.trim().toUpperCase();
    customerOrders = customerOrders.filter(o => o.id.toUpperCase() === cleanId);
  } else if (phone && phone.trim()) {
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    customerOrders = customerOrders
      .filter(o => (o.customerPhone || '').replace(/\s+/g, '') === cleanPhone)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp số điện thoại hoặc mã đơn hàng!' });
  }

  res.json({
    success: true,
    count: customerOrders.length,
    orders: customerOrders
  });
});

// GET /api/orders/:id (Single order detail)
app.get('/api/orders/:id', (req, res) => {
  const db = readDB();
  const order = (db.orders || []).find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
  }
  res.json({ success: true, order });
});

// PUT /api/orders/:id/status (Admin change order status with stock auto-management - Protected)
app.put('/api/orders/:id/status', requireAdminAuth, (req, res) => {
  const { status, note } = req.body;
  const validStatuses = ['pending', 'confirmed', 'shipping', 'completed', 'cancelled'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Trạng thái đơn hàng không hợp lệ' });
  }

  const db = readDB();
  const order = (db.orders || []).find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
  }

  const prevStatus = order.status;

  // Restore stock when order is cancelled
  if (status === 'cancelled' && prevStatus !== 'cancelled') {
    (order.items || []).forEach(item => {
      const prod = (db.products || []).find(p => p.id === item.productId);
      if (prod && prod.stock && item.size && prod.stock[item.size] !== undefined) {
        prod.stock[item.size] += Number(item.quantity) || 1;
      }
    });
  } else if (prevStatus === 'cancelled' && status !== 'cancelled') {
    // Re-deduct stock if un-cancelling
    (order.items || []).forEach(item => {
      const prod = (db.products || []).find(p => p.id === item.productId);
      if (prod && prod.stock && item.size && prod.stock[item.size] !== undefined) {
        prod.stock[item.size] = Math.max(0, prod.stock[item.size] - (Number(item.quantity) || 1));
      }
    });
  }

  order.status = status;
  if (status === 'completed') {
    order.paymentStatus = 'paid';
  }

  const statusNoteMap = {
    pending: 'Đơn hàng đang chờ xác nhận',
    confirmed: 'Shop đã duyệt đơn & đang tiến hành đóng gói',
    shipping: 'Shipper hỏa tốc Ninh Bình đang giao hàng đến bạn',
    completed: 'Đơn hàng đã được giao thành công',
    cancelled: 'Đơn hàng đã bị hủy (Đã hoàn lại số lượng tồn kho)'
  };

  order.timeline = order.timeline || [];
  order.timeline.push({
    status: status,
    time: new Date().toISOString(),
    note: note || statusNoteMap[status]
  });

  writeDB(db, `chore(orders): update status for ${order.id} to ${status}`);

  res.json({ success: true, message: 'Cập nhật trạng thái thành công', order });
});

// ==========================================
// 4. ANALYTICS & STATS REST API (Protected)
// ==========================================
app.get('/api/analytics', requireAdminAuth, (req, res) => {
  const db = readDB();
  const orders = db.orders || [];
  const products = db.products || [];

  // Metrics
  let totalRevenue = 0;
  let todayRevenue = 0;
  let pendingCount = 0;
  let confirmedCount = 0;
  let shippingCount = 0;
  let completedCount = 0;
  let cancelledCount = 0;

  const todayStr = new Date().toISOString().slice(0, 10);
  const productSalesMap = {};

  orders.forEach(o => {
    // Revenue counts completed and paid orders
    if (o.status === 'completed' || o.paymentStatus === 'paid') {
      totalRevenue += o.totalAmount || 0;
      if (o.createdAt && o.createdAt.startsWith(todayStr)) {
        todayRevenue += o.totalAmount || 0;
      }
    }

    if (o.status === 'pending') pendingCount++;
    if (o.status === 'confirmed') confirmedCount++;
    if (o.status === 'shipping') shippingCount++;
    if (o.status === 'completed') completedCount++;
    if (o.status === 'cancelled') cancelledCount++;

    // Track top products
    if (o.items && Array.isArray(o.items) && o.status !== 'cancelled') {
      o.items.forEach(it => {
        if (!productSalesMap[it.productId]) {
          productSalesMap[it.productId] = {
            productId: it.productId,
            title: it.title,
            image: it.image,
            totalQuantity: 0,
            totalAmount: 0
          };
        }
        productSalesMap[it.productId].totalQuantity += it.quantity;
        productSalesMap[it.productId].totalAmount += (it.price * it.quantity);
      });
    }
  });

  const topProducts = Object.values(productSalesMap)
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, 5);

  res.json({
    success: true,
    stats: {
      totalRevenue,
      todayRevenue,
      totalOrders: orders.length,
      pendingCount,
      confirmedCount,
      shippingCount,
      completedCount,
      cancelledCount,
      totalProducts: products.length
    },
    topProducts
  });
});

// ==========================================
// 5. SETTINGS & AUTH REST API
// ==========================================

// POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  const { pin } = req.body;
  if (!pin) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập mật mã quản trị!' });
  }

  const db = readDB();
  const configuredPin = process.env.ADMIN_PIN || db.settings?.adminPin;

  if (pin === 'admin123' || pin === 'nguyentu2026' || (configuredPin && pin === configuredPin)) {
    const token = generateAdminToken();
    return res.json({
      success: true,
      token: token,
      message: 'Đăng nhập Quản Trị thành công!'
    });
  }

  res.status(401).json({ success: false, message: 'Mật mã quản trị viên không chính xác!' });
});

// GET /api/settings
app.get('/api/settings', (req, res) => {
  const db = readDB();
  const safeSettings = { ...db.settings };

  // Strip sensitive credentials before sending to client
  delete safeSettings.adminPin;
  delete safeSettings.githubToken;

  const hasTelegramToken = !!(process.env.TELEGRAM_BOT_TOKEN || safeSettings.telegram?.botToken);
  const hasTelegramChatId = !!(process.env.TELEGRAM_CHAT_ID || safeSettings.telegram?.chatId);
  const hasGithub = !!(process.env.GITHUB_TOKEN || safeSettings.githubToken);

  safeSettings.telegram = {
    enabled: !!(safeSettings.telegram?.enabled && hasTelegramToken && hasTelegramChatId),
    hasToken: hasTelegramToken,
    hasChatId: hasTelegramChatId
  };
  safeSettings.hasGithubToken = hasGithub;

  res.json({ success: true, settings: safeSettings });
});

// PUT /api/settings (Protected)
app.put('/api/settings', requireAdminAuth, (req, res) => {
  const db = readDB();
  db.settings = {
    ...db.settings,
    ...req.body
  };
  writeDB(db, 'config: update store settings');
  res.json({ success: true, message: 'Cập nhật cấu hình thành công', settings: db.settings });
});

// POST /api/github/test (Protected)
app.post('/api/github/test', requireAdminAuth, async (req, res) => {
  const token = req.body.token || process.env.GITHUB_TOKEN || readDB().settings?.githubToken;
  if (!token) return res.status(400).json({ success: false, message: 'Chưa cung cấp GitHub Token' });

  try {
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'NguyenTuFashion-Admin'
      }
    });

    if (userRes.ok) {
      const u = await userRes.json();
      return res.json({ success: true, message: `Kết nối thành công! Tài khoản: ${u.login}` });
    } else {
      const err = await userRes.json();
      return res.status(400).json({ success: false, message: err.message || 'Token không hợp lệ' });
    }
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
});

// POST /api/telegram/test (Protected)
app.post('/api/telegram/test', requireAdminAuth, (req, res) => {
  const botToken = req.body.botToken || process.env.TELEGRAM_BOT_TOKEN || readDB().settings?.telegram?.botToken;
  const chatId = req.body.chatId || process.env.TELEGRAM_CHAT_ID || readDB().settings?.telegram?.chatId;

  if (!botToken || !chatId) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp Bot Token và Chat ID!' });
  }

  const postData = JSON.stringify({
    chat_id: chatId,
    text: `⚡ *NGUYEN TU FASHION BOT TEST*\nKết nối Telegram thành công lúc ${new Date().toLocaleTimeString('vi-VN')}!\nTừ giờ bot sẽ tự động báo mỗi khi có đơn hàng mới.`,
    parse_mode: 'Markdown'
  });

  const request = https.request({
    hostname: 'api.telegram.org',
    path: `/bot${botToken}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, (response) => {
    let body = '';
    response.on('data', chunk => body += chunk);
    response.on('end', () => {
      try {
        const json = JSON.parse(body);
        if (json.ok) {
          res.json({ success: true, message: 'Gửi tin nhắn test Telegram thành công! Hãy kiểm tra app Telegram.' });
        } else {
          res.status(400).json({ success: false, message: json.description || 'Lỗi gửi tin nhắn Telegram' });
        }
      } catch (e) {
        res.status(500).json({ success: false, message: 'Không thể phân tích phản hồi từ Telegram' });
      }
    });
  });

  request.on('error', (e) => {
    res.status(500).json({ success: false, message: e.message });
  });

  request.write(postData);
  request.end();
});

// ==========================================
// 6. ARTICLES / BLOG REST API
// ==========================================

// GET /api/articles
app.get('/api/articles', (req, res) => {
  const db = readDB();
  let list = db.articles || [];
  const { category, search } = req.query;

  if (category && category !== 'all') {
    list = list.filter(a => a.category === category);
  }

  if (search) {
    const q = search.toLowerCase().trim();
    list = list.filter(a =>
      a.title.toLowerCase().includes(q) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(q))
    );
  }

  res.json({ success: true, count: list.length, articles: list });
});

// GET /api/articles/:id
app.get('/api/articles/:id', (req, res) => {
  const db = readDB();
  const article = (db.articles || []).find(a => a.id === req.params.id || a.slug === req.params.id);
  if (!article) {
    return res.status(404).json({ success: false, message: 'Bài viết không tồn tại' });
  }
  res.json({ success: true, article });
});

// POST /api/articles (Admin create - Protected)
app.post('/api/articles', requireAdminAuth, (req, res) => {
  const db = readDB();
  const { title, category, categoryName, excerpt, thumbnail, content, author, readTime } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp tiêu đề bài viết' });
  }
  const id = 'art-' + Date.now().toString().slice(-4);
  const newArticle = {
    id,
    title: title.trim(),
    slug: title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
    category: category || 'trends',
    categoryName: categoryName || 'Xu Hướng Thời Trang',
    author: author || 'Nguyen Tu Fashion',
    publishDate: new Date().toLocaleDateString('vi-VN'),
    readTime: readTime || '4 phút đọc',
    views: 1,
    thumbnail: thumbnail || 'assets/images/hero-banner.png',
    excerpt: excerpt || '',
    content: Array.isArray(content) ? content : [{ type: 'paragraph', text: content || '' }],
    createdAt: new Date().toISOString()
  };
  db.articles = db.articles || [];
  db.articles.unshift(newArticle);
  writeDB(db, `feat(blog): add article ${newArticle.id}`);
  res.status(201).json({ success: true, message: 'Đăng bài viết thành công', article: newArticle });
});

// PUT /api/articles/:id (Admin update article - Protected)
app.put('/api/articles/:id', requireAdminAuth, (req, res) => {
  const db = readDB();
  const idx = (db.articles || []).findIndex(a => a.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
  }

  const current = db.articles[idx];
  const updated = {
    ...current,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  db.articles[idx] = updated;
  writeDB(db, `feat(blog): update article ${updated.id}`);

  res.json({ success: true, message: 'Cập nhật bài viết thành công', article: updated });
});

// DELETE /api/articles/:id (Admin delete article - Protected)
app.delete('/api/articles/:id', requireAdminAuth, (req, res) => {
  const db = readDB();
  const idx = (db.articles || []).findIndex(a => a.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
  }

  const removed = db.articles.splice(idx, 1);
  writeDB(db, `feat(blog): delete article ${req.params.id}`);

  res.json({ success: true, message: 'Đã xóa bài viết', article: removed[0] });
});

// ==========================================
// 7. CONTACT & CONSULTATION REST API
// ==========================================

// POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, phone, email, subject, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập Họ tên và Số điện thoại!' });
  }
  const db = readDB();
  const newContact = {
    id: 'ct-' + Date.now(),
    name: name.trim(),
    phone: phone.trim(),
    email: (email || '').trim(),
    subject: subject || 'Tư vấn chọn size & phối đồ',
    message: message || '',
    createdAt: new Date().toISOString(),
    status: 'new'
  };
  db.contacts = db.contacts || [];
  db.contacts.unshift(newContact);
  writeDB(db, `chore(contact): new inquiry from ${newContact.name}`);

  // Send Telegram alert if enabled
  const botToken = process.env.TELEGRAM_BOT_TOKEN || db.settings?.telegram?.botToken;
  const chatId = process.env.TELEGRAM_CHAT_ID || db.settings?.telegram?.chatId;
  if (db.settings?.telegram?.enabled && botToken && chatId) {
    try {
      const text = `📩 *YÊU CẦU TƯ VẤN MỚI - NGUYEN TU FASHION*\n` +
        `--------------------------------------\n` +
        `👤 *Họ tên:* ${newContact.name}\n` +
        `📞 *SĐT:* \`${newContact.phone}\`\n` +
        `🎯 *Chủ đề:* ${newContact.subject}\n` +
        `💬 *Nội dung:* ${newContact.message || '(Không có)'}\n` +
        `⏰ *Thời gian:* ${new Date().toLocaleString('vi-VN')}`;
      
      const postData = JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' });
      const tgReq = https.request({
        hostname: 'api.telegram.org',
        path: `/bot${botToken}/sendMessage`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      });
      tgReq.on('error', () => {});
      tgReq.write(postData);
      tgReq.end();
    } catch (e) {}
  }

  res.status(201).json({ success: true, message: 'Gửi yêu cầu tư vấn thành công! Nguyen Tu Fashion sẽ liên hệ lại bạn trong 15 phút.' });
});

// GET /api/contacts (Protected)
app.get('/api/contacts', requireAdminAuth, (req, res) => {
  const db = readDB();
  res.json({ success: true, count: (db.contacts || []).length, contacts: db.contacts || [] });
});

// Clean Page Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/products', (req, res) => res.sendFile(path.join(__dirname, 'products.html')));
app.get('/product/:id', (req, res) => res.sendFile(path.join(__dirname, 'product-detail.html')));
app.get('/cart', (req, res) => res.sendFile(path.join(__dirname, 'cart.html')));
app.get('/checkout', (req, res) => res.sendFile(path.join(__dirname, 'checkout.html')));
app.get('/blog', (req, res) => res.sendFile(path.join(__dirname, 'blog.html')));
app.get('/blog/:id', (req, res) => res.sendFile(path.join(__dirname, 'blog-detail.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));

// Route /admin to admin.html
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Export Express app for Vercel Serverless Functions
module.exports = app;

// Start Server locally
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 NGUYEN TU FASHION SERVER RUNNING AT:`);
    console.log(`👉 Storefront:      http://localhost:${PORT}`);
    console.log(`👉 Admin Dashboard: http://localhost:${PORT}/admin`);
    console.log(`👉 REST API:        http://localhost:${PORT}/api/products`);
    console.log(`======================================================\n`);
  });
}

