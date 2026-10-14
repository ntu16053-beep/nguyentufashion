/**
 * NGUYEN TU FASHION - APPLICATION SCRIPT
 * Tailored for Gen Z / Ninh Binh Youth Fashion Store
 * Features: Product Database, Cart Drawer, VietQR & COD Checkout,
 * Smart Size Fit Calculator, Wishlist, Instant Filter & Search
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DATA: PRODUCTS CATALOG
  // ==========================================
  const PRODUCTS = [
    {
      id: 'nt-01',
      title: 'Áo Thun Oversize NT "Tràng An Soul" Heavyweight 260gsm',
      category: 'tee',
      categoryName: 'Áo Phông / Tee',
      price: 299000,
      oldPrice: 380000,
      rating: 4.9,
      reviews: 142,
      badge: 'sale',
      isLocal: true,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      imageHover: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['#111111', '#f5f5f0', '#7a7a7a'],
      description: 'Chất liệu 100% Cotton 2 chiều định lượng 260gsm dệt độc quyền. Họa tiết in tràm kỹ thuật số sắc nét cảm hứng từ di sản Ninh Bình kết hợp typography đường phố hiện đại.'
    },
    {
      id: 'nt-02',
      title: 'Hoodie Boxy Zipper NT Crown "Dark Concrete"',
      category: 'hoodie',
      categoryName: 'Hoodie & Jacket',
      price: 499000,
      oldPrice: 650000,
      rating: 5.0,
      reviews: 98,
      badge: 'hot',
      isLocal: false,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      imageHover: 'https://images.unsplash.com/photo-1578768079052-aa76e520036c?w=800&auto=format&fit=crop&q=80',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#1c1c1c', '#2c2e33'],
      description: 'Hoodie nỉ bông chân cua 380gsm dày dặn, giữ ấm cực tốt cho mùa thu đông Ninh Bình. Khóa kéo zip 2 chiều kim loại mạ chrome sáng bóng.'
    },
    {
      id: 'nt-03',
      title: 'Quần Parachute Cargo Pants Multi-Pocket Dây Rút',
      category: 'pants',
      categoryName: 'Quần Streetwear',
      price: 389000,
      oldPrice: 480000,
      rating: 4.8,
      reviews: 76,
      badge: 'new',
      isLocal: false,
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80',
      imageHover: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['#222222', '#3e4438', '#99958d'],
      description: 'Form dù ống suông rộng bồng bềnh chuẩn Y2K, có dây rút gấu quần tùy chỉnh baggy hoặc jogger. Thích hợp đi cafe phố cổ hoặc trượt ván.'
    },
    {
      id: 'nt-04',
      title: 'Nón Kết Lưỡi Trai Signature NT Crown Thêu Nổi 3D',
      category: 'accessories',
      categoryName: 'Phụ Kiện',
      price: 189000,
      oldPrice: 240000,
      rating: 4.9,
      reviews: 215,
      badge: 'hot',
      isLocal: true,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
      imageHover: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&auto=format&fit=crop&q=80',
      sizes: ['Free Size'],
      colors: ['#000000', '#eaeaea'],
      description: 'Mẫu mũ lưỡi trai iconic trong lookbook Nguyen Tu Fashion. Form mũ ôm đầu chuẩn vibe skater, logo vương miện và monogram NT thêu sắc nét.'
    },
    {
      id: 'nt-05',
      title: 'Áo Sơ Mi Tay Ngắn Boxy Linen "Hoa Lư Minimalist"',
      category: 'tee',
      categoryName: 'Áo Phông / Tee',
      price: 349000,
      oldPrice: 420000,
      rating: 4.8,
      reviews: 64,
      badge: 'new',
      isLocal: true,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
      imageHover: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['#eae7dc', '#1a1a1a', '#8d8741'],
      description: 'Vải đũi dệt cao cấp mềm mát tự nhiên, kiểu dáng boxy hiện đại. Outfit hoàn hảo để check-in sống ảo tại Phố cổ Hoa Lư hay Tam Cốc.'
    },
    {
      id: 'nt-06',
      title: 'Áo Khoác Gió Bomber Reversible 2 Mặt Streetwear',
      category: 'hoodie',
      categoryName: 'Hoodie & Jacket',
      price: 549000,
      oldPrice: 690000,
      rating: 4.9,
      reviews: 89,
      badge: 'sale',
      isLocal: false,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
      imageHover: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#1f2421', '#111111'],
      description: 'Chống thấm nước nhẹ cản gió cực tốt khi vi vu xe máy đêm Ninh Bình. Thiết kế lộn 2 mặt đổi màu phong cách linh hoạt.'
    },
    {
      id: 'nt-07',
      title: 'Quần Jean Ống Rộng Wide-Leg Rách Gối Cá Tính',
      category: 'pants',
      categoryName: 'Quần Streetwear',
      price: 429000,
      oldPrice: 520000,
      rating: 4.7,
      reviews: 110,
      badge: 'hot',
      isLocal: false,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80',
      imageHover: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&auto=format&fit=crop&q=80',
      sizes: ['29', '30', '31', '32'],
      colors: ['#4a5568', '#1a202c'],
      description: 'Chất liệu Denim 13oz bền chắc, xử lý wash bạc màu phong trần, ống rộng rủ tự nhiên hack dáng cực đỉnh.'
    },
    {
      id: 'nt-08',
      title: 'Túi Đeo Chéo Mini Techwear Chống Nước NT Tactical',
      category: 'accessories',
      categoryName: 'Phụ Kiện',
      price: 219000,
      oldPrice: 280000,
      rating: 4.9,
      reviews: 178,
      badge: 'new',
      isLocal: true,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      imageHover: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80',
      sizes: ['Free Size'],
      colors: ['#111111', '#283618'],
      description: 'Vải dù Cordura kháng nước, khóa bấm YKK chuẩn xịn. Đựng vừa điện thoại, ví tiền, chìa khóa, sạc dự phòng cho một ngày dạo phố.'
    }
  ];

  // ==========================================
  // 2. STATE MANAGEMENT
  // ==========================================
  let cart = JSON.parse(localStorage.getItem('nguyentu_cart') || '[]');
  let wishlist = JSON.parse(localStorage.getItem('nguyentu_wishlist') || '[]');
  let currentFilter = 'all';
  let currentSort = 'default';
  let appliedDiscount = 0; // % or fixed
  let discountType = null;
  const FREE_SHIP_THRESHOLD = 299000;

  // Format Currency VND
  const formatVND = (num) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  // Toast System
  const showToast = (message, icon = '🛍️') => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  // Save to LocalStorage
  const saveState = () => {
    localStorage.setItem('nguyentu_cart', JSON.stringify(cart));
    localStorage.setItem('nguyentu_wishlist', JSON.stringify(wishlist));
    updateCartUI();
    updateWishlistUI();
  };

  // ==========================================
  // 3. RENDER PRODUCTS
  // ==========================================
  const renderProductGrid = () => {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    let filtered = PRODUCTS.filter(p => {
      if (currentFilter === 'all') return true;
      if (currentFilter === 'local') return p.isLocal;
      return p.category === currentFilter;
    });

    if (currentSort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    grid.innerHTML = filtered.map(p => {
      const isWishlisted = wishlist.includes(p.id);
      const discountPercent = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
      
      let badgeHtml = '';
      if (p.badge === 'sale') badgeHtml = `<span class="p-badge badge-sale">-${discountPercent}%</span>`;
      else if (p.badge === 'hot') badgeHtml = `<span class="p-badge badge-hot">Bán Chạy</span>`;
      else if (p.badge === 'new') badgeHtml = `<span class="p-badge badge-new">Mới Về</span>`;
      
      if (p.isLocal) {
        badgeHtml += `<span class="p-badge badge-local">Ninh Bình Drop</span>`;
      }

      return `
        <article class="product-card" data-id="${p.id}">
          <div class="product-thumb-wrap">
            <div class="product-badges">
              ${badgeHtml}
            </div>
            
            <button class="btn-wishlist ${isWishlisted ? 'active' : ''}" 
                    aria-label="Thêm vào yêu thích" 
                    onclick="window.toggleWishlist('${p.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <img class="product-img" src="${p.image}" alt="${p.title}" loading="lazy">
            <img class="product-img-hover" src="${p.imageHover}" alt="${p.title}" loading="lazy">

            <div class="product-quick-actions">
              <button class="btn-quick-view" onclick="window.openQuickView('${p.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Xem Nhanh
              </button>
              <button class="btn-add-cart-fast" onclick="window.fastAddToCart('${p.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                + Thêm
              </button>
            </div>
          </div>

          <div class="product-info">
            <span class="product-category">${p.categoryName}</span>
            <h3 class="product-title" title="${p.title}">${p.title}</h3>
            
            <div class="product-meta">
              <div class="product-prices">
                <span class="price-current">${formatVND(p.price)}</span>
                ${p.oldPrice ? `<span class="price-old">${formatVND(p.oldPrice)}</span>` : ''}
              </div>
              <div class="product-rating">
                <span>★</span> ${p.rating} <span style="color:#a3a3a3; font-size:0.6875rem">(${p.reviews})</span>
              </div>
            </div>

            <div class="product-swatches">
              ${p.colors.map(c => `<span class="swatch" style="background-color: ${c}"></span>`).join('')}
            </div>
          </div>
        </article>
      `;
    }).join('');
  };

  // ==========================================
  // 4. CART LOGIC & DRAWER
  // ==========================================
  window.fastAddToCart = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];

    addToCart(product, defaultSize, defaultColor, 1);
  };

  const addToCart = (product, size, color, qty = 1) => {
    const existingIndex = cart.findIndex(item => item.id === product.id && item.size === size && item.color === color);
    if (existingIndex > -1) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: size,
        color: color,
        qty: qty
      });
    }

    saveState();
    openCartDrawer();
    showToast(`Đã thêm "${product.title}" vào giỏ hàng!`, '🔥');
  };

  window.updateCartQty = (index, delta) => {
    if (!cart[index]) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
      showToast('Đã xóa sản phẩm khỏi giỏ hàng', '🗑️');
    }
    saveState();
  };

  window.removeCartItem = (index) => {
    cart.splice(index, 1);
    saveState();
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', '🗑️');
  };

  const updateCartUI = () => {
    const badgeElements = document.querySelectorAll('.cart-count-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    badgeElements.forEach(el => el.textContent = totalItems);

    const drawerBody = document.getElementById('drawer-cart-items');
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const discountEl = document.getElementById('cart-discount-val');
    const finalTotalEl = document.getElementById('cart-final-total');
    const freeShipText = document.getElementById('free-ship-message');
    const freeShipProgress = document.getElementById('free-ship-progress-bar');

    if (!drawerBody) return;

    if (cart.length === 0) {
      drawerBody.innerHTML = `
        <div class="empty-cart-state">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          <p>Giỏ hàng của bạn đang trống trơn!</p>
          <button class="btn btn-dark" style="font-size:0.8125rem; padding:8px 20px;" onclick="window.closeCartDrawer()">Lướt Đồ Ngay</button>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = formatVND(0);
      if (finalTotalEl) finalTotalEl.textContent = formatVND(0);
      if (freeShipProgress) freeShipProgress.style.width = '0%';
      if (freeShipText) freeShipText.innerHTML = `Freeship đơn từ <strong>299.000đ</strong> tại Ninh Bình`;
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let discountAmount = 0;
    if (discountType === 'percent') {
      discountAmount = Math.round(subtotal * (appliedDiscount / 100));
    } else if (discountType === 'fixed') {
      discountAmount = appliedDiscount;
    }
    const finalTotal = Math.max(0, subtotal - discountAmount);

    // Free shipping calculation
    const remainingForFreeShip = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
    const shipPercent = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));

    if (freeShipProgress) freeShipProgress.style.width = `${shipPercent}%`;
    if (freeShipText) {
      if (remainingForFreeShip === 0) {
        freeShipText.innerHTML = `🎉 <strong>CHÚC MỪNG:</strong> Bạn đã được <strong>FREESHIP NỘI THÀNH NINH BÌNH</strong>!`;
      } else {
        freeShipText.innerHTML = `Mua thêm <strong>${formatVND(remainingForFreeShip)}</strong> để được <strong>FREESHIP NINH BÌNH</strong>!`;
      }
    }

    if (subtotalEl) subtotalEl.textContent = formatVND(subtotal);
    if (discountEl) discountEl.textContent = `-${formatVND(discountAmount)}`;
    if (finalTotalEl) finalTotalEl.textContent = formatVND(finalTotal);

    drawerBody.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <div>
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-attr">Size: <strong>${item.size}</strong> | Màu: <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${item.color};vertical-align:middle;border:1px solid #ccc;"></span></div>
          </div>
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button class="qty-btn" onclick="window.updateCartQty(${idx}, -1)">-</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" onclick="window.updateCartQty(${idx}, 1)">+</button>
            </div>
            <div class="cart-item-price">${formatVND(item.price * item.qty)}</div>
          </div>
          <span class="cart-item-remove" onclick="window.removeCartItem(${idx})">Xóa</span>
        </div>
      </div>
    `).join('');
  };

  // Open & Close Drawer
  const openCartDrawer = () => {
    document.getElementById('cart-drawer').classList.add('active');
    document.getElementById('drawer-backdrop').classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCartDrawer = () => {
    document.getElementById('cart-drawer').classList.remove('active');
    document.getElementById('drawer-backdrop').classList.remove('active');
    document.body.style.overflow = '';
  };

  window.openCartDrawer = openCartDrawer;
  window.closeCartDrawer = closeCartDrawer;

  // Coupon Voucher Code
  window.applyVoucher = () => {
    const input = document.getElementById('voucher-code-input');
    if (!input) return;
    const code = input.value.trim().toUpperCase();

    if (code === 'NINHBINH' || code === 'NINHBINH2026') {
      appliedDiscount = 15;
      discountType = 'percent';
      showToast('Áp dụng mã NINHBINH: Giảm 15% tổng đơn!', '🔥');
    } else if (code === 'GENZNT') {
      appliedDiscount = 50000;
      discountType = 'fixed';
      showToast('Áp dụng mã GENZNT: Giảm ngay 50.000đ!', '🎁');
    } else if (code === 'LUONGVANTUY') {
      appliedDiscount = 10;
      discountType = 'percent';
      showToast('Đặc quyền học sinh Lương Văn Tụy: Giảm 10%!', '🎓');
    } else {
      showToast('Mã khuyến mãi không hợp lệ hoặc đã hết hạn!', '⚠️');
      return;
    }
    updateCartUI();
  };

  // ==========================================
  // 5. WISHLIST
  // ==========================================
  window.toggleWishlist = (productId) => {
    const idx = wishlist.indexOf(productId);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      showToast('Đã xóa khỏi danh sách yêu thích', '🤍');
    } else {
      wishlist.push(productId);
      showToast('Đã lưu vào danh sách yêu thích!', '❤️');
    }
    saveState();
    renderProductGrid();
  };

  const updateWishlistUI = () => {
    const countBadges = document.querySelectorAll('.wishlist-count-badge');
    countBadges.forEach(el => el.textContent = wishlist.length);
  };

  // ==========================================
  // 6. QUICK VIEW MODAL
  // ==========================================
  let selectedModalSize = null;
  let selectedModalColor = null;

  window.openQuickView = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    selectedModalSize = product.sizes[0];
    selectedModalColor = product.colors[0];

    const modalContent = document.getElementById('quick-view-content');
    if (!modalContent) return;

    modalContent.innerHTML = `
      <div class="quick-view-grid">
        <div style="position:relative;">
          <img class="quick-view-img" id="quick-main-img" src="${product.image}" alt="${product.title}">
          <div style="display:flex; gap:10px; margin-top:12px;">
            <img src="${product.image}" style="width:60px; height:75px; object-fit:cover; border-radius:6px; cursor:pointer; border:2px solid #000;" onclick="document.getElementById('quick-main-img').src='${product.image}'">
            <img src="${product.imageHover}" style="width:60px; height:75px; object-fit:cover; border-radius:6px; cursor:pointer; border:1px solid #ddd;" onclick="document.getElementById('quick-main-img').src='${product.imageHover}'">
          </div>
        </div>

        <div>
          <span style="font-size:0.75rem; font-weight:800; text-transform:uppercase; color:#8c8c8c; letter-spacing:0.08em;">${product.categoryName}</span>
          <h2 style="font-family:var(--font-heading); font-size:1.4rem; font-weight:800; margin:6px 0 12px; text-transform:uppercase;">${product.title}</h2>
          
          <div style="display:flex; align-items:baseline; gap:12px; margin-bottom:16px;">
            <span style="font-size:1.5rem; font-weight:900; color:var(--text-primary);">${formatVND(product.price)}</span>
            ${product.oldPrice ? `<span style="font-size:1rem; color:#8c8c8c; text-decoration:line-through;">${formatVND(product.oldPrice)}</span>` : ''}
          </div>

          <p style="font-size:0.875rem; color:#555; margin-bottom:20px; line-height:1.6;">${product.description}</p>
          
          <div style="margin-bottom:16px;">
            <div style="font-size:0.8125rem; font-weight:700; text-transform:uppercase; margin-bottom:8px;">Chọn Size:</div>
            <div class="size-selector">
              ${product.sizes.map((s, idx) => `
                <button class="size-option-btn ${idx === 0 ? 'active' : ''}" onclick="window.selectQuickSize(this, '${s}')">${s}</button>
              `).join('')}
            </div>
          </div>

          <div style="margin-bottom:24px;">
            <div style="font-size:0.8125rem; font-weight:700; text-transform:uppercase; margin-bottom:8px;">Màu sắc:</div>
            <div style="display:flex; gap:10px;">
              ${product.colors.map((c, idx) => `
                <button style="width:30px; height:30px; border-radius:50%; background:${c}; border:${idx === 0 ? '3px solid #000' : '1px solid #ccc'}; cursor:pointer;" onclick="window.selectQuickColor(this, '${c}')"></button>
              `).join('')}
            </div>
          </div>

          <div style="display:flex; gap:12px;">
            <button class="btn btn-dark" style="flex:1;" onclick="window.submitQuickAddToCart('${product.id}')">
              🛍️ Thêm Vào Giỏ Hàng
            </button>
            <button class="btn btn-outline-white" style="border-color:#111; color:#111;" onclick="window.toggleWishlist('${product.id}')">
              ❤️ Yêu Thích
            </button>
          </div>

          <div style="margin-top:20px; padding:12px; background:var(--bg-secondary); border-radius:8px; font-size:0.75rem; color:#666;">
            🚀 <strong>Ninh Bình Express:</strong> Nhận hàng trong 2 giờ tại TP. Ninh Bình & Hoa Lư. Thử đồ tại chỗ trước khi thanh toán.
          </div>
        </div>
      </div>
    `;

    document.getElementById('quick-view-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeQuickView = () => {
    document.getElementById('quick-view-modal').classList.remove('active');
    document.body.style.overflow = '';
  };

  window.selectQuickSize = (btn, size) => {
    document.querySelectorAll('.size-option-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedModalSize = size;
  };

  window.selectQuickColor = (btn, color) => {
    btn.parentElement.querySelectorAll('button').forEach(b => b.style.border = '1px solid #ccc');
    btn.style.border = '3px solid #000';
    selectedModalColor = color;
  };

  window.submitQuickAddToCart = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    addToCart(product, selectedModalSize || product.sizes[0], selectedModalColor || product.colors[0], 1);
    window.closeQuickView();
  };

  // ==========================================
  // 7. CHECKOUT & PAYMENT MODAL (VIETQR / COD)
  // ==========================================
  window.openCheckoutModal = () => {
    if (cart.length === 0) {
      showToast('Giỏ hàng chưa có sản phẩm nào để thanh toán!', '⚠️');
      return;
    }
    closeCartDrawer();

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let discountAmount = 0;
    if (discountType === 'percent') discountAmount = Math.round(subtotal * (appliedDiscount / 100));
    else if (discountType === 'fixed') discountAmount = appliedDiscount;
    const finalTotal = Math.max(0, subtotal - discountAmount);

    document.getElementById('checkout-order-total').textContent = formatVND(finalTotal);
    document.getElementById('checkout-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    updateCheckoutQR(finalTotal);
  };

  window.closeCheckoutModal = () => {
    document.getElementById('checkout-modal').classList.remove('active');
    document.body.style.overflow = '';
  };

  // VietQR Dynamic Generator
  const updateCheckoutQR = (totalAmount) => {
    const qrContainer = document.getElementById('vietqr-display-box');
    if (!qrContainer) return;

    const bankId = 'MB'; // MB Bank
    const accountNo = '0388999888';
    const template = 'compact2';
    const accountName = 'NGUYEN TU FASHION';
    const orderCode = 'NT' + Math.floor(100000 + Math.random() * 900000);
    const memo = encodeURIComponent(`${orderCode} MUA HANG`);

    // VietQR Public API
    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${totalAmount}&addInfo=${memo}&accountName=${encodeURIComponent(accountName)}`;

    qrContainer.innerHTML = `
      <div style="text-align:center; padding:16px; background:#f9f9f9; border-radius:12px; border:1px solid #e0e0e0;">
        <p style="font-size:0.8125rem; font-weight:700; color:#111; margin-bottom:8px;">Quét mã VietQR bằng app ngân hàng / MoMo để chuyển khoản tức thì:</p>
        <img src="${qrUrl}" alt="VietQR Nguyen Tu Fashion" style="width:220px; height:auto; margin:0 auto; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size:0.75rem; color:#555; margin-top:10px;">
          Số tài khoản: <strong>${accountNo}</strong> (MB Bank)<br>
          Chủ tài khoản: <strong>${accountName}</strong><br>
          Nội dung CK: <strong style="color:var(--accent-red);">${orderCode} MUA HANG</strong>
        </div>
      </div>
    `;
  };

  window.handlePaymentMethodChange = (method) => {
    const qrSection = document.getElementById('vietqr-section');
    if (!qrSection) return;
    if (method === 'vietqr') {
      qrSection.style.display = 'block';
    } else {
      qrSection.style.display = 'none';
    }
  };

  window.submitOrder = (e) => {
    e.preventDefault();
    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const address = document.getElementById('checkout-address').value.trim();
    const district = document.getElementById('checkout-district').value;
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value || 'cod';

    if (!name || !phone || !address) {
      showToast('Vui lòng điền đầy đủ Tên, Số điện thoại và Địa chỉ!', '⚠️');
      return;
    }

    const orderId = 'NT-NB' + Math.floor(1000 + Math.random() * 9000);

    // Success Screen
    const modalContent = document.getElementById('checkout-form-container');
    modalContent.innerHTML = `
      <div style="text-align:center; padding:30px 10px;">
        <div style="width:70px; height:70px; background:#059669; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 20px;">✓</div>
        <h2 style="font-family:var(--font-heading); font-size:1.8rem; font-weight:900; margin-bottom:8px;">ĐẶT HÀNG THÀNH CÔNG!</h2>
        <p style="font-size:0.9375rem; color:#555; max-width:440px; margin:0 auto 20px;">Cảm ơn <strong>${name}</strong> đã ủng hộ NGUYEN TU FASHION. Đơn hàng của bạn sẽ được chuẩn bị và gửi ngay!</p>
        
        <div style="background:var(--bg-secondary); padding:20px; border-radius:12px; text-align:left; max-width:460px; margin:0 auto 24px; font-size:0.875rem;">
          <p>Mã đơn hàng: <strong style="color:var(--text-primary);">${orderId}</strong></p>
          <p>Số điện thoại: <strong>${phone}</strong></p>
          <p>Địa chỉ nhận: <strong>${address}, ${district}, Ninh Bình</strong></p>
          <p>Hình thức: <strong>${paymentMethod === 'vietqr' ? 'Chuyển khoản VietQR' : 'COD (Đồng kiểm khi nhận)'}</strong></p>
          <p style="margin-top:10px; color:#059669; font-weight:700;">🚀 Nhân viên CSKH tại Ninh Bình sẽ gọi xác nhận trong 10 phút!</p>
        </div>

        <button class="btn btn-dark" onclick="window.closeCheckoutModal(); location.reload();">Tiếp Tục Mua Sắm</button>
      </div>
    `;

    // Clear cart
    cart = [];
    saveState();
  };

  // ==========================================
  // 8. SMART SIZE CALCULATOR (GEN Z FIT)
  // ==========================================
  const heightSlider = document.getElementById('calc-height');
  const weightSlider = document.getElementById('calc-weight');
  const heightValText = document.getElementById('calc-height-val');
  const weightValText = document.getElementById('calc-weight-val');
  const sizeOutput = document.getElementById('calc-size-output');
  const feedbackOutput = document.getElementById('calc-feedback-text');
  let currentFit = 'oversized'; // 'slim', 'regular', 'oversized'

  const computeSmartSize = () => {
    if (!heightSlider || !weightSlider) return;
    const h = parseInt(heightSlider.value, 10);
    const w = parseInt(weightSlider.value, 10);

    if (heightValText) heightValText.textContent = `${h} cm`;
    if (weightValText) weightValText.textContent = `${w} kg`;

    let baseSize = 'M';

    if (h < 165) {
      if (w < 55) baseSize = 'M';
      else if (w <= 68) baseSize = 'L';
      else baseSize = 'XL';
    } else if (h <= 175) {
      if (w < 58) baseSize = 'M';
      else if (w <= 72) baseSize = 'L';
      else if (w <= 82) baseSize = 'XL';
      else baseSize = 'XXL';
    } else {
      if (w < 65) baseSize = 'L';
      else if (w <= 78) baseSize = 'XL';
      else baseSize = 'XXL';
    }

    // Adjust for fit preference
    if (currentFit === 'oversized') {
      if (baseSize === 'M' && (h >= 163 || w >= 52)) baseSize = 'L';
      else if (baseSize === 'L' && (h >= 172 || w >= 66)) baseSize = 'XL';
    } else if (currentFit === 'slim') {
      if (baseSize === 'XL' && w <= 75) baseSize = 'L';
      else if (baseSize === 'L' && w <= 60) baseSize = 'M';
    }

    if (sizeOutput) sizeOutput.textContent = `SIZE ${baseSize}`;
    if (feedbackOutput) {
      const fitDescriptions = {
        oversized: 'Form áo thả suông rộng rủ, vai trễ phóng khoáng chuẩn vibe streetwear sành điệu.',
        regular: 'Vừa vặn thoải mái với cơ thể, thanh lịch và linh hoạt cho mọi hoạt động.',
        slim: 'Gọn gàng, tôn dáng thể thao cá tính.'
      };
      feedbackOutput.textContent = fitDescriptions[currentFit];
    }
  };

  if (heightSlider) heightSlider.addEventListener('input', computeSmartSize);
  if (weightSlider) weightSlider.addEventListener('input', computeSmartSize);

  window.setFitPreference = (fit, btn) => {
    currentFit = fit;
    document.querySelectorAll('.fit-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    computeSmartSize();
  };

  // ==========================================
  // 9. FLASH SALE COUNTDOWN TIMER
  // ==========================================
  const startCountdown = () => {
    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-mins');
    const secsEl = document.getElementById('timer-secs');
    if (!hoursEl || !minsEl || !secsEl) return;

    let targetTime = new Date().getTime() + (14 * 3600 * 1000 + 42 * 60 * 1000);

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        targetTime = new Date().getTime() + 24 * 3600 * 1000;
        return;
      }

      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  };

  // ==========================================
  // 10. FILTER & SEARCH HANDLERS
  // ==========================================
  const filterButtons = document.querySelectorAll('.tab-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      renderProductGrid();
    });
  });

  const sortSelect = document.getElementById('product-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProductGrid();
    });
  }

  // Quick category circles click
  window.filterByCircle = (category) => {
    currentFilter = category;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      if (btn.getAttribute('data-filter') === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
    renderProductGrid();
  };

  // Live Instant Search Modal
  window.openSearchModal = () => {
    const searchModal = document.getElementById('search-modal');
    if (searchModal) {
      searchModal.classList.add('active');
      const input = document.getElementById('search-input');
      if (input) {
        input.focus();
        input.value = '';
        renderSearchResults('');
      }
    }
  };

  window.closeSearchModal = () => {
    const searchModal = document.getElementById('search-modal');
    if (searchModal) searchModal.classList.remove('active');
  };

  window.handleSearchInput = (e) => {
    const query = e.target.value.toLowerCase().trim();
    renderSearchResults(query);
  };

  const renderSearchResults = (query) => {
    const resultsContainer = document.getElementById('search-results-list');
    if (!resultsContainer) return;

    if (!query) {
      resultsContainer.innerHTML = `
        <div style="font-size:0.8125rem; color:#888; padding:12px 0;">
          Gợi ý tìm kiếm phổ biến tại Ninh Bình: <strong>Áo thun Tràng An</strong>, <strong>Hoodie Crown</strong>, <strong>Parachute</strong>, <strong>Nón kết NT</strong>
        </div>
      `;
      return;
    }

    const matches = PRODUCTS.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.categoryName.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<p style="padding:20px 0; text-align:center; color:#888;">Không tìm thấy sản phẩm nào khớp với "${query}"</p>`;
      return;
    }

    resultsContainer.innerHTML = matches.map(p => `
      <div style="display:flex; align-items:center; gap:14px; padding:10px 0; border-bottom:1px solid #eee; cursor:pointer;" onclick="window.closeSearchModal(); window.openQuickView('${p.id}');">
        <img src="${p.image}" style="width:50px; height:60px; object-fit:cover; border-radius:6px;">
        <div style="flex:1;">
          <h4 style="font-size:0.875rem; font-weight:700;">${p.title}</h4>
          <span style="font-size:0.8125rem; font-weight:800; color:var(--text-primary);">${formatVND(p.price)}</span>
        </div>
        <span style="font-size:0.75rem; color:var(--accent-red); font-weight:700;">Xem →</span>
      </div>
    `).join('');
  };

  // Sticky Header Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile drawer trigger
  window.toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-nav-drawer');
    mobileMenu?.classList.toggle('active');
  };

  // ==========================================
  // INITIALIZE
  // ==========================================
  renderProductGrid();
  updateCartUI();
  updateWishlistUI();
  computeSmartSize();
  startCountdown();
});
