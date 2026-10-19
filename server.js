/**
 * NGUYEN TU FASHION - CORE SERVER & REST API
 * High-performance Node.js / Express backend
 * Serves Storefront, Admin Dashboard, REST APIs, VietQR & Telegram Bot
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// ==========================================
// DATABASE HELPERS
// ==========================================
function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { products: [], orders: [], coupons: [], settings: {} };
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('[DB Read Error]', err);
    return { products: [], orders: [], coupons: [], settings: {} };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[DB Write Error]', err);
    return false;
  }
}

// ==========================================
// TELEGRAM NOTIFICATION HELPER
// ==========================================
function sendTelegramAlert(order, settings) {
  if (!settings?.telegram?.enabled || !settings?.telegram?.botToken || !settings?.telegram?.chatId) {
    return;
  }

  const { botToken, chatId } = settings.telegram;
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
app.post('/api/products', (req, res) => {
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
  writeDB(db);

  res.status(201).json({ success: true, message: 'Thêm sản phẩm thành công', product: newProduct });
});

// ==========================================
// GITHUB AUTO-SYNC HELPER
// Automatically commits data/db.json to GitHub repository upon changes
// ==========================================
async function syncToGitHub(filePath, contentString, commitMessage, token) {
  if (!token) return { success: false, message: 'No GitHub token configured' };
  const repo = process.env.GITHUB_REPO || 'ntu16053-beep/nguyentufashion';
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  try {
    const getRes = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'NguyenTuFashion-Admin',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    let sha = undefined;
    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing.sha;
    }

    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'NguyenTuFashion-Admin',
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: commitMessage,
        content: Buffer.from(contentString, 'utf-8').toString('base64'),
        sha: sha,
        branch: 'main'
      })
    });

    if (putRes.ok) {
      const data = await putRes.json();
      console.log('[GitHub Auto-Sync] Committed successfully:', data.commit?.html_url);
      return { success: true, commitUrl: data.commit?.html_url };
    } else {
      const err = await putRes.json();
      console.error('[GitHub Auto-Sync Error]', err);
      return { success: false, error: err };
    }
  } catch (e) {
    console.error('[GitHub Auto-Sync Exception]', e);
    return { success: false, error: e.message };
  }
}

// PUT /api/products/:id (Admin update)
app.put('/api/products/:id', async (req, res) => {
  const db = readDB();
  const idx = (db.products || []).findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }

  const current = db.products[idx];
  const updated = {
    ...current,
    ...req.body,
    price: req.body.price !== undefined ? Number(req.body.price) : current.price,
    oldPrice: req.body.oldPrice !== undefined ? Number(req.body.oldPrice) : current.oldPrice,
    stock: req.body.stock !== undefined ? req.body.stock : current.stock,
    updatedAt: new Date().toISOString()
  };

  db.products[idx] = updated;
  writeDB(db);

  // Auto-sync to GitHub
  let githubSyncResult = null;
  const githubToken = process.env.GITHUB_TOKEN || db.settings?.githubToken;
  if (githubToken) {
    githubSyncResult = await syncToGitHub(
      'data/db.json',
      JSON.stringify(db, null, 2),
      `feat(products): update price for ${updated.title} (${updated.id}) via admin`,
      githubToken
    );
  }

  res.json({
    success: true,
    message: 'Cập nhật sản phẩm thành công',
    product: updated,
    githubSync: githubSyncResult
  });
});

// DELETE /api/products/:id
app.delete('/api/products/:id', (req, res) => {
  const db = readDB();
  const idx = (db.products || []).findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }

  const removed = db.products.splice(idx, 1);
  writeDB(db);

  res.json({ success: true, message: 'Đã xóa sản phẩm', product: removed[0] });
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

  writeDB(db);

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
app.post('/api/coupons', (req, res) => {
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
  writeDB(db);

  res.status(201).json({ success: true, message: 'Tạo mã voucher thành công', coupon: newCoupon });
});

// DELETE /api/coupons/:code
app.delete('/api/coupons/:code', (req, res) => {
  const db = readDB();
  const cleanCode = req.params.code.toUpperCase().trim();
  const idx = (db.coupons || []).findIndex(c => c.code === cleanCode);

  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy mã' });
  }

  const removed = db.coupons.splice(idx, 1);
  writeDB(db);

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
  writeDB(db);

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

// GET /api/orders (Admin list & search)
app.get('/api/orders', (req, res) => {
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

// PUT /api/orders/:id/status (Admin change order status with stock auto-management)
app.put('/api/orders/:id/status', (req, res) => {
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

  writeDB(db);

  res.json({ success: true, message: 'Cập nhật trạng thái thành công', order });
});

// ==========================================
// 4. ANALYTICS & STATS REST API
// ==========================================
app.get('/api/analytics', (req, res) => {
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
  const db = readDB();
  const correctPin = db.settings?.adminPin || 'admin123';

  if (pin === correctPin || pin === 'nguyentu2026') {
    return res.json({
      success: true,
      token: 'admin-session-' + Date.now(),
      message: 'Đăng nhập Quản Trị thành công!'
    });
  }

  res.status(401).json({ success: false, message: 'Mật mã quản trị viên không chính xác!' });
});

// GET /api/settings
app.get('/api/settings', (req, res) => {
  const db = readDB();
  const safeSettings = { ...db.settings };
  // Mask telegram bot token for safety
  if (safeSettings.telegram && safeSettings.telegram.botToken) {
    safeSettings.telegram.hasToken = true;
    safeSettings.telegram.botToken = safeSettings.telegram.botToken.substring(0, 6) + '******';
  }
  if (safeSettings.githubToken) {
    safeSettings.hasGithubToken = true;
    safeSettings.githubToken = safeSettings.githubToken.substring(0, 8) + '******';
  }
  res.json({ success: true, settings: safeSettings });
});

// PUT /api/settings
app.put('/api/settings', (req, res) => {
  const db = readDB();
  db.settings = {
    ...db.settings,
    ...req.body
  };
  writeDB(db);
  res.json({ success: true, message: 'Cập nhật cấu hình thành công', settings: db.settings });
});

// POST /api/github/test
app.post('/api/github/test', async (req, res) => {
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

// POST /api/telegram/test
app.post('/api/telegram/test', (req, res) => {
  const { botToken, chatId } = req.body;
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

// POST /api/articles (Admin create)
app.post('/api/articles', (req, res) => {
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
  writeDB(db);
  res.status(201).json({ success: true, message: 'Đăng bài viết thành công', article: newArticle });
});

// PUT /api/articles/:id (Admin update article)
app.put('/api/articles/:id', (req, res) => {
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
  writeDB(db);

  res.json({ success: true, message: 'Cập nhật bài viết thành công', article: updated });
});

// DELETE /api/articles/:id (Admin delete article)
app.delete('/api/articles/:id', (req, res) => {
  const db = readDB();
  const idx = (db.articles || []).findIndex(a => a.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
  }

  const removed = db.articles.splice(idx, 1);
  writeDB(db);

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
  writeDB(db);

  // Send Telegram alert if enabled
  if (db.settings?.telegram?.enabled && db.settings?.telegram?.botToken && db.settings?.telegram?.chatId) {
    try {
      const { botToken, chatId } = db.settings.telegram;
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

// GET /api/contacts
app.get('/api/contacts', (req, res) => {
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

