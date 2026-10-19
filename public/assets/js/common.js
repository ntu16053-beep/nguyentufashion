/**
 * NGUYEN TU FASHION - COMMON & SHARED APPLICATION LOGIC
 * Manages Cart, Wishlist, Notifications, Live Search, Header and Navigation
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. FORMATTING & UTILITIES
  // --------------------------------------------------------------------------
  window.formatVND = function (amount) {
    const num = Number(amount) || 0;
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(num).replace('₫', 'đ');
  };

  // Toast Notification
  window.showToast = function (message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    toast.innerHTML = `
      <span style="background:${type==='success'?'var(--accent-green)':'var(--accent-red)'}; width:22px; height:22px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:#fff; font-size:12px; font-weight:800;">${icon}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  };

  // --------------------------------------------------------------------------
  // 2. GLOBAL CART STATE (LOCALSTORAGE)
  // --------------------------------------------------------------------------
  window.getCart = function () {
    try {
      return JSON.parse(localStorage.getItem('nguyentu_cart') || '[]');
    } catch (e) {
      return [];
    }
  };

  window.saveCart = function (cart) {
    localStorage.setItem('nguyentu_cart', JSON.stringify(cart));
    window.updateCartCounters();
  };

  window.addToCart = function (productId, size = 'M', color = '#111111', quantity = 1, productData = null) {
    const cart = window.getCart();
    quantity = Math.max(1, Number(quantity) || 1);

    // If product details not provided, try to find in window.ALL_PRODUCTS or fetch
    let item = productData;
    if (!item && window.ALL_PRODUCTS) {
      item = window.ALL_PRODUCTS.find(p => p.id === productId);
    }

    const existingIndex = cart.findIndex(c => c.productId === productId && c.size === size && c.color === color);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        productId: productId,
        title: item ? item.title : 'Sản phẩm ' + productId,
        price: item ? item.price : 450000,
        oldPrice: item ? item.oldPrice : 550000,
        image: item ? item.image : 'assets/images/products/ao-khoac-argentina-trang.png',
        category: item ? item.category : 'jacket',
        size: size,
        color: color,
        quantity: quantity
      });
    }

    window.saveCart(cart);
    window.showToast(`Đã thêm "${item ? item.title : 'sản phẩm'}" (${size}) vào giỏ hàng!`, 'success');

    // Trigger custom event for reactive UI update
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
  };

  window.removeFromCart = function (index) {
    const cart = window.getCart();
    if (index >= 0 && index < cart.length) {
      const removed = cart.splice(index, 1);
      window.saveCart(cart);
      window.showToast(`Đã xóa sản phẩm khỏi giỏ hàng`, 'info');
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
    }
  };

  window.updateCartQuantity = function (index, delta) {
    const cart = window.getCart();
    if (index >= 0 && index < cart.length) {
      const newQty = cart[index].quantity + delta;
      if (newQty <= 0) {
        window.removeFromCart(index);
      } else {
        cart[index].quantity = newQty;
        window.saveCart(cart);
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
      }
    }
  };

  window.clearCart = function () {
    localStorage.removeItem('nguyentu_cart');
    window.updateCartCounters();
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: [] } }));
  };

  window.getCartSubtotal = function () {
    const cart = window.getCart();
    return cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
  };

  window.getCartCount = function () {
    const cart = window.getCart();
    return cart.reduce((sum, item) => sum + Number(item.quantity), 0);
  };

  // --------------------------------------------------------------------------
  // 3. GLOBAL WISHLIST STATE
  // --------------------------------------------------------------------------
  window.getWishlist = function () {
    try {
      return JSON.parse(localStorage.getItem('nguyentu_wishlist') || '[]');
    } catch (e) {
      return [];
    }
  };

  window.toggleWishlist = function (productId) {
    let wishlist = window.getWishlist();
    const idx = wishlist.indexOf(productId);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      window.showToast('Đã xóa khỏi danh sách yêu thích', 'info');
    } else {
      wishlist.push(productId);
      window.showToast('Đã lưu vào danh sách yêu thích! ❤️', 'success');
    }
    localStorage.setItem('nguyentu_wishlist', JSON.stringify(wishlist));
    window.updateCartCounters();
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { wishlist } }));
  };

  window.isInWishlist = function (productId) {
    const wishlist = window.getWishlist();
    return wishlist.includes(productId);
  };

  // Update Counters in Header
  window.updateCartCounters = function () {
    const cartCount = window.getCartCount();
    const wishlistCount = window.getWishlist().length;

    document.querySelectorAll('.cart-count-badge').forEach(el => {
      el.textContent = cartCount;
      el.style.display = cartCount > 0 ? 'inline-flex' : 'none';
    });

    document.querySelectorAll('.wishlist-count-badge').forEach(el => {
      el.textContent = wishlistCount;
      el.style.display = wishlistCount > 0 ? 'inline-flex' : 'none';
    });
  };

  // --------------------------------------------------------------------------
  // 4. COMMON HEADER BEHAVIOR (STICKY, MOBILE MENU, SEARCH)
  // --------------------------------------------------------------------------
  window.toggleMobileMenu = function () {
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    if (mobileDrawer) {
      mobileDrawer.classList.toggle('active');
    }
  };

  window.openSearchModal = function () {
    let modal = document.getElementById('search-modal');
    if (modal) {
      modal.classList.add('active');
      const input = document.getElementById('search-input');
      if (input) {
        input.value = '';
        input.focus();
        window.handleSearchInput({ target: { value: '' } });
      }
    }
  };

  window.closeSearchModal = function () {
    const modal = document.getElementById('search-modal');
    if (modal) modal.classList.remove('active');
  };

  window.handleSearchInput = function (e) {
    const query = (e.target.value || '').toLowerCase().trim();
    const list = document.getElementById('search-results-list');
    if (!list) return;

    if (!query) {
      list.innerHTML = `
        <div style="font-size:0.8125rem; color:#888; padding:12px 0;">
          Gợi ý tìm kiếm phổ biến tại Ninh Bình: <strong>Áo khoác gió Adidas</strong>, <strong>Áo thun LV đỏ mận</strong>, <strong>Bộ thể thao Argentina</strong>, <strong>Quần nỉ Cacao</strong>
        </div>
      `;
      return;
    }

    const items = window.ALL_PRODUCTS || [];
    const matches = items.filter(p =>
      p.title.toLowerCase().includes(query) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query))
    );

    if (matches.length === 0) {
      list.innerHTML = `<p style="padding:16px 0; text-align:center; color:#999;">Không tìm thấy sản phẩm khớp với "${query}"</p>`;
      return;
    }

    list.innerHTML = matches.slice(0, 6).map(p => `
      <a href="product-detail.html?id=${p.id}" style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.08); text-decoration:none; color:inherit;">
        <img src="${p.image}" alt="${p.title}" style="width:48px; height:58px; object-fit:cover; border-radius:4px; background:#2a050b;">
        <div style="flex:1;">
          <h4 style="font-size:0.875rem; font-weight:700; color:#fff; line-height:1.3;">${p.title}</h4>
          <span style="font-size:0.8125rem; font-weight:800; color:var(--accent-red);">${window.formatVND(p.price)}</span>
        </div>
        <span style="font-size:0.75rem; color:var(--text-muted);">Xem →</span>
      </a>
    `).join('');
  };

  window.applyPriceOverrides = function (productList) {
    try {
      const overrides = JSON.parse(localStorage.getItem('nguyentu_price_overrides') || '{}');
      if (productList && Object.keys(overrides).length > 0) {
        productList.forEach(p => {
          if (overrides[p.id]) {
            Object.assign(p, overrides[p.id]);
          }
        });
      }
    } catch (e) {}
    return productList;
  };

  // Pre-load all products from REST API
  window.loadAllProducts = async function () {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          window.ALL_PRODUCTS = data.products;
        }
      }
    } catch (e) {
      console.warn('Could not fetch from /api/products, using cache/fallback');
    }

    if (window.ALL_PRODUCTS) {
      window.applyPriceOverrides(window.ALL_PRODUCTS);
    }

    try {
      window.dispatchEvent(new CustomEvent('productsUpdated', { detail: window.ALL_PRODUCTS }));
    } catch (e) {}

    return window.ALL_PRODUCTS || [];
  };

  // DOMContentLoaded initialization
  document.addEventListener('DOMContentLoaded', () => {
    window.updateCartCounters();
    window.loadAllProducts();

    // Smart Auto-Hide Sticky Header (Hide on scroll down, show on scroll up)
    const header = document.querySelector('.header');
    if (header) {
      let lastScrollY = window.scrollY;
      let ticking = false;

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 70) {
              header.classList.remove('header-hidden');
              header.classList.remove('scrolled');
            } else {
              header.classList.add('scrolled');

              if (currentScrollY > lastScrollY + 10) {
                header.classList.add('header-hidden');
              } else if (currentScrollY < lastScrollY - 10) {
                header.classList.remove('header-hidden');
              }
            }

            lastScrollY = currentScrollY;
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }

    // Modal background click close
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. COUPON SESSION HELPERS
  // --------------------------------------------------------------------------
  window.getSavedCoupon = function () {
    try {
      return JSON.parse(sessionStorage.getItem('nguyentu_applied_coupon') || 'null');
    } catch (e) {
      return null;
    }
  };

  window.saveCoupon = function (code, discountAmount) {
    sessionStorage.setItem('nguyentu_applied_coupon', JSON.stringify({ code, discountAmount }));
  };

  window.clearSavedCoupon = function () {
    sessionStorage.removeItem('nguyentu_applied_coupon');
  };

  // --------------------------------------------------------------------------
  // 6. GLOBAL ORDER TRACKING MODAL
  // --------------------------------------------------------------------------
  window.openOrderTrackingModal = function (prefillQuery = '') {
    let modal = document.getElementById('order-tracking-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'order-tracking-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-card" style="max-width:640px; width:95%; max-height:90vh; overflow-y:auto; padding:26px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; border-bottom:1px solid var(--border-light); padding-bottom:12px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:1.5rem;">📦</span>
              <div>
                <h3 style="font-family:var(--font-heading); font-size:1.15rem; font-weight:800; text-transform:uppercase; margin:0;">TRA CỨU TIẾN TRÌNH ĐƠN HÀNG</h3>
                <p style="font-size:0.75rem; color:var(--text-muted); margin:0;">Nhập số điện thoại hoặc mã đơn hàng (VD: NT-NB1234)</p>
              </div>
            </div>
            <button onclick="document.getElementById('order-tracking-modal').classList.remove('active')" style="font-size:1.6rem; color:#fff; background:none; border:none; cursor:pointer;">&times;</button>
          </div>

          <div style="display:flex; gap:10px; margin-bottom:20px;">
            <input type="text" id="order-tracking-input" class="custom-input" placeholder="Nhập SĐT hoặc Mã đơn..." style="flex:1; height:46px; font-size:0.9375rem;" onkeydown="if(event.key==='Enter') window.performOrderTracking();">
            <button class="btn btn-primary" onclick="window.performOrderTracking()" style="height:46px; padding:0 22px; font-weight:700;">Tra Cứu</button>
          </div>

          <div id="order-tracking-result" style="min-height:100px;">
            <div style="text-align:center; padding:30px 10px; color:var(--text-muted); font-size:0.875rem;">
              🔍 Hãy nhập số điện thoại đặt hàng hoặc mã đơn để theo dõi hành trình giao nhận hỏa tốc tại Ninh Bình & Toàn quốc.
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }

    modal.classList.add('active');
    const input = document.getElementById('order-tracking-input');
    if (prefillQuery) {
      input.value = prefillQuery;
      window.performOrderTracking();
    } else {
      setTimeout(() => input.focus(), 100);
    }
  };

  window.performOrderTracking = async function () {
    const query = document.getElementById('order-tracking-input').value.trim();
    const resultDiv = document.getElementById('order-tracking-result');
    if (!query) {
      window.showToast('Vui lòng nhập SĐT hoặc mã đơn hàng!', 'error');
      return;
    }

    resultDiv.innerHTML = '<div style="text-align:center; padding:30px; color:var(--text-muted);">Đang tra cứu dữ liệu đơn hàng...</div>';

    try {
      const isId = query.toUpperCase().startsWith('NT-') || /^[a-zA-Z]/.test(query);
      const param = isId ? `orderId=${encodeURIComponent(query)}` : `phone=${encodeURIComponent(query)}`;
      const res = await fetch(`/api/orders/track?${param}`);
      const data = await res.json();

      if (!data.success || !data.orders || data.orders.length === 0) {
        resultDiv.innerHTML = `
          <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25); border-radius:8px; padding:20px; text-align:center;">
            <p style="color:#f87171; font-weight:700; margin-bottom:6px;">Không tìm thấy đơn hàng phù hợp!</p>
            <p style="font-size:0.8125rem; color:var(--text-secondary); margin:0;">Vui lòng kiểm tra lại số điện thoại hoặc mã đơn hàng đã nhập khi đặt mua.</p>
          </div>
        `;
        return;
      }

      const statusMap = {
        pending: { label: 'Chờ xác nhận', color: '#fbbf24', step: 1 },
        confirmed: { label: 'Đã duyệt & Đóng gói', color: '#38bdf8', step: 2 },
        shipping: { label: 'Đang giao hỏa tốc 2H', color: '#c084fc', step: 3 },
        completed: { label: 'Giao hàng thành công', color: '#34d399', step: 4 },
        cancelled: { label: 'Đã hủy', color: '#f87171', step: 0 }
      };

      resultDiv.innerHTML = data.orders.map(order => {
        const st = statusMap[order.status] || { label: order.status, color: '#fff', step: 1 };
        const items = order.items || [];
        const currentStep = st.step;

        return `
          <div style="background:rgba(255,255,255,0.04); border:1px solid var(--border-light); border-radius:10px; padding:18px; margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:14px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px;">
              <div>
                <span style="font-size:0.75rem; color:var(--text-muted);">Mã đơn hàng:</span>
                <strong style="color:var(--accent-red); font-size:1rem; margin-left:6px;">${order.id}</strong>
              </div>
              <span style="font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:12px; background:${st.color}22; color:${st.color}; border:1px solid ${st.color};">
                ${st.label.toUpperCase()}
              </span>
            </div>

            ${order.status !== 'cancelled' ? `
              <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; margin-bottom:18px; text-align:center;">
                ${['1. Đã Nhận', '2. Đóng Gói', '3. Đang Giao', '4. Hoàn Tất'].map((stepLabel, idx) => {
                  const isActive = (idx + 1) <= currentStep;
                  return `
                    <div>
                      <div style="height:5px; border-radius:3px; background:${isActive ? 'var(--accent-red)' : 'rgba(255,255,255,0.1)'}; margin-bottom:6px;"></div>
                      <span style="font-size:0.6875rem; font-weight:${isActive ? '700' : '400'}; color:${isActive ? '#fff' : 'var(--text-muted)'};">${stepLabel}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : ''}

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.8125rem; margin-bottom:14px; background:rgba(0,0,0,0.25); padding:12px; border-radius:6px;">
              <div>
                <div style="color:var(--text-muted); margin-bottom:3px;">Người nhận: <strong style="color:#fff;">${order.customerName}</strong></div>
                <div style="color:var(--text-muted);">SĐT: <strong style="color:#fff;">${order.customerPhone}</strong></div>
                <div style="color:var(--text-muted); margin-top:3px;">Địa chỉ: <span>${order.address}, ${order.district || ''}</span></div>
              </div>
              <div style="text-align:right;">
                <div style="color:var(--text-muted); margin-bottom:3px;">Thanh toán: <strong style="color:#fff;">${order.paymentMethod === 'vietqr' ? 'VietQR (Napas247)' : 'COD (Khi nhận)'}</strong></div>
                <div style="color:var(--text-muted); margin-bottom:3px;">Ngày tạo: <span>${new Date(order.createdAt).toLocaleDateString('vi-VN')}</span></div>
                <div style="font-size:0.9375rem; color:#fff; margin-top:4px;">Tổng tiền: <strong style="color:var(--accent-red);">${window.formatVND(order.totalAmount)}</strong></div>
              </div>
            </div>

            <div style="border-top:1px dashed rgba(255,255,255,0.1); padding-top:10px;">
              <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase; display:block; margin-bottom:8px;">Sản phẩm (${items.length}):</span>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${items.map(it => `
                  <div style="display:flex; align-items:center; gap:10px; font-size:0.8125rem;">
                    <img src="${it.image || 'assets/images/products/ao-khoac-argentina-trang.png'}" alt="${it.title}" style="width:36px; height:44px; object-fit:cover; border-radius:4px; background:#2a050b;">
                    <div style="flex:1;">
                      <div style="color:#fff; font-weight:600; line-height:1.3;">${it.title}</div>
                      <div style="color:var(--text-muted); font-size:0.75rem;">Size: ${it.size} • Số lượng: ${it.quantity}</div>
                    </div>
                    <strong style="color:var(--text-primary); font-size:0.8125rem;">${window.formatVND(it.price * it.quantity)}</strong>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('');
    } catch (err) {
      resultDiv.innerHTML = '<div style="color:#f87171; text-align:center; padding:20px;">Lỗi kết nối máy chủ tra cứu! Vui lòng thử lại sau.</div>';
    }
  };

  // --------------------------------------------------------------------------
  // 7. GLOBAL QUICK VIEW MODAL
  // --------------------------------------------------------------------------
  window.openQuickView = async function (productId) {
    let modal = document.getElementById('quick-view-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'quick-view-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-card" style="max-width:760px; width:95%; max-height:90vh; overflow-y:auto; padding:28px;">
          <div style="display:flex; justify-content:flex-end;">
            <button onclick="document.getElementById('quick-view-modal').classList.remove('active')" style="font-size:1.6rem; color:#fff; background:none; border:none; cursor:pointer;">&times;</button>
          </div>
          <div id="quick-view-content" style="display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:start;">
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }

    modal.classList.add('active');
    const content = document.getElementById('quick-view-content');
    content.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:#999;">Đang tải thông tin sản phẩm...</div>';

    let prod = (window.ALL_PRODUCTS || []).find(p => p.id === productId);
    if (!prod) {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (res.ok) {
          const d = await res.json();
          prod = d.product;
        }
      } catch (e) {}
    }

    if (!prod) {
      content.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:#f87171;">Không tìm thấy thông tin sản phẩm!</div>';
      return;
    }

    const sizes = prod.sizes || ['M', 'L', 'XL'];
    let curSize = sizes[0];

    content.innerHTML = `
      <div style="background:#2a050b; border-radius:8px; overflow:hidden; position:relative;">
        <img src="${prod.image}" alt="${prod.title}" id="qv-main-img" style="width:100%; height:380px; object-fit:cover;">
      </div>
      <div>
        <span style="font-size:0.75rem; color:var(--accent-red); font-weight:800; text-transform:uppercase;">${prod.categoryName || 'Streetwear'}</span>
        <h2 style="font-family:var(--font-heading); font-size:1.25rem; font-weight:800; line-height:1.3; margin:6px 0 10px; color:#fff;">${prod.title}</h2>
        
        <div style="display:flex; align-items:baseline; gap:10px; margin-bottom:14px;">
          <span style="font-size:1.35rem; font-weight:900; color:var(--accent-red);">${window.formatVND(prod.price)}</span>
          ${prod.oldPrice ? `<span style="font-size:0.9375rem; color:var(--text-muted); text-decoration:line-through;">${window.formatVND(prod.oldPrice)}</span>` : ''}
        </div>

        <p style="font-size:0.8125rem; color:var(--text-secondary); line-height:1.6; margin-bottom:16px;">
          ${prod.description || 'Sản phẩm Streetwear cao cấp từ Nguyen Tu Fashion Ninh Bình.'}
        </p>

        <div style="margin-bottom:14px;">
          <label style="display:block; font-size:0.8125rem; font-weight:700; margin-bottom:6px; color:#fff;">Chọn Kích Cỡ:</label>
          <div style="display:flex; gap:8px;" id="qv-size-group">
            ${sizes.map((s, idx) => `
              <button class="size-btn-pill ${idx === 0 ? 'active' : ''}" style="padding:6px 14px; font-size:0.8125rem;" onclick="
                document.querySelectorAll('#qv-size-group button').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                window._qvSelectedSize = '${s}';
              ">${s}</button>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom:20px; font-size:0.75rem; color:var(--accent-green); font-weight:700;">
          ⚡ Sẵn sàng giao hỏa tốc 2H tại Ninh Bình • Đổi size miễn phí 7 ngày
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn btn-primary" style="flex:1; height:46px; font-weight:800;" onclick="
            const s = window._qvSelectedSize || '${sizes[0]}';
            window.addToCart('${prod.id}', s, '#111111', 1);
            document.getElementById('quick-view-modal').classList.remove('active');
          ">Thêm Vào Giỏ Hàng</button>
          <a href="product-detail.html?id=${prod.id}" class="btn btn-outline-white" style="height:46px; display:inline-flex; align-items:center; padding:0 16px; font-size:0.8125rem;">Chi Tiết →</a>
        </div>
      </div>
    `;
    window._qvSelectedSize = sizes[0];
  };

})();
