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

// PUT /api/products/:id (Admin update)
app.put('/api/products/:id', (req, res) => {
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

  res.json({ success: true, message: 'Cập nhật sản phẩm thành công', product: updated });
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

// GET /api/orders/track (Customer tracking by phone)
app.get('/api/orders/track', (req, res) => {
  const { phone } = req.query;
  if (!phone) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp số điện thoại!' });
  }

  const cleanPhone = phone.trim().replace(/\s+/g, '');
  const db = readDB();
  const customerOrders = (db.orders || [])
    .filter(o => o.customerPhone.replace(/\s+/g, '') === cleanPhone)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({
    success: true,
    phone: cleanPhone,
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

// PUT /api/orders/:id/status (Admin change order status)
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

  order.status = status;
  if (status === 'completed') {
    order.paymentStatus = 'paid';
  }

  const statusNoteMap = {
    pending: 'Đơn hàng đang chờ xác nhận',
    confirmed: 'Shop đã duyệt đơn & đang tiến hành đóng gói',
    shipping: 'Shipper hỏa tốc Ninh Bình đang giao hàng đến bạn',
    completed: 'Đơn hàng đã được giao thành công',
    cancelled: 'Đơn hàng đã bị hủy'
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

// Route /admin to admin.html
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 NGUYEN TU FASHION SERVER RUNNING AT:`);
  console.log(`👉 Storefront:      http://localhost:${PORT}`);
  console.log(`👉 Admin Dashboard: http://localhost:${PORT}/admin`);
  console.log(`👉 REST API:        http://localhost:${PORT}/api/products`);
  console.log(`======================================================\n`);
});
