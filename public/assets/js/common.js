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

  // Pre-load all products from REST API
  window.loadAllProducts = async function () {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          window.ALL_PRODUCTS = data.products;
          return data.products;
        }
      }
    } catch (e) {
      console.warn('Could not fetch from /api/products, using cache/fallback');
    }
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

})();
