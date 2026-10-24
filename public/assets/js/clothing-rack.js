/**
 * NGUYEN TU FASHION — 3D INTERACTIVE CLOTHING RACK (ATELIER SHOWROOM 2026)
 * Photorealistic Walnut/Chrome Hanger + True 2-Sided Front/Back 3D Garments
 */
(function () {
  'use strict';

  const RACK_ITEMS = [
    {
      id: 'nt-11',
      title: 'Áo Khoác Denim Louis Vuitton Đen Thêu Logo LV',
      category: 'jacket',
      categoryLabel: 'Áo Khoác Denim',
      price: 490000,
      oldPrice: 620000,
      cutout: 'assets/images/rack/ao-khoac-denim-lv-den.png',
      backCutout: 'assets/images/rack/ao-khoac-denim-lv-den-back.png',
      fallbackSrc: 'assets/images/products/ao-khoac-denim-lv-den.png',
      tol: 22,
      tags: [
        { name: 'BLACK', bg: '#18181b', text: '#ffffff', filter: 'none' },
        { name: 'INDIGO', bg: '#1e3a5f', text: '#e0f2fe', filter: 'hue-rotate(195deg) saturate(1.6) brightness(1.08)' },
        { name: 'ASH', bg: '#52525b', text: '#f4f4f5', filter: 'brightness(1.22) contrast(0.92)' }
      ]
    },
    {
      id: 'nt-05',
      title: 'Áo Khoác Nỉ Adidas Beckenbauer Retro Kem Cacao',
      category: 'jacket',
      categoryLabel: 'Áo Khoác Retro',
      price: 470000,
      oldPrice: 580000,
      cutout: 'assets/images/rack/ao-khoac-adidas-beckenbauer-kem.png',
      backCutout: 'assets/images/rack/ao-khoac-adidas-beckenbauer-kem-back.png',
      fallbackSrc: 'assets/images/products/ao-khoac-adidas-beckenbauer-kem.png',
      tol: 7,
      tags: [
        { name: 'CREAM', bg: '#f5f0e6', text: '#27272a', filter: 'none' },
        { name: 'SAND', bg: '#d6c7b2', text: '#1c1917', filter: 'sepia(0.28) brightness(0.95)' },
        { name: 'ROSE', bg: '#881337', text: '#ffe4e6', filter: 'sepia(0.35) hue-rotate(315deg) saturate(1.4)' }
      ]
    },
    {
      id: 'nt-07',
      title: 'Áo Sơ Mi Denim Louis Vuitton Damier Caro Xanh',
      category: 'shirt',
      categoryLabel: 'Sơ Mi Denim',
      price: 420000,
      oldPrice: 520000,
      cutout: 'assets/images/rack/ao-so-mi-lv-damier-denim.png',
      backCutout: 'assets/images/rack/ao-so-mi-lv-damier-denim-back.png',
      fallbackSrc: 'assets/images/products/ao-so-mi-lv-damier-denim.png',
      tol: 22,
      tags: [
        { name: 'DENIM', bg: '#476a8a', text: '#ffffff', filter: 'none' },
        { name: 'SLATE', bg: '#334155', text: '#f8fafc', filter: 'saturate(0.45) brightness(0.9)' },
        { name: 'TEAL', bg: '#0f766e', text: '#ccfbf1', filter: 'hue-rotate(320deg) saturate(1.2)' }
      ]
    },
    {
      id: 'nt-43',
      title: 'Áo Thun Louis Vuitton Phác Thảo Chim & Ruy Băng Kem',
      category: 'tee',
      categoryLabel: 'Áo Thun Luxury',
      price: 420000,
      oldPrice: 510000,
      cutout: 'assets/images/rack/ao-thun-lv-chim-va-ruy-bang-kem.png',
      backCutout: 'assets/images/rack/ao-thun-lv-chim-va-ruy-bang-kem-back.png',
      fallbackSrc: 'assets/images/products/ao-thun-lv-chim-va-ruy-bang-kem.png',
      tol: 14,
      tags: [
        { name: 'IVORY', bg: '#f5f5f0', text: '#18181b', filter: 'none' },
        { name: 'BEIGE', bg: '#d6cba8', text: '#1c1917', filter: 'sepia(0.35) brightness(0.94)' },
        { name: 'ICE', bg: '#e0f2fe', text: '#0c4a6e', filter: 'hue-rotate(180deg) brightness(0.98)' }
      ]
    },
    {
      id: 'nt-29',
      title: 'Áo Sơ Mi Denim LV Cúc Ngọc Trai Thêu Cameo',
      category: 'shirt',
      categoryLabel: 'Sơ Mi Cao Cấp',
      price: 480000,
      oldPrice: 590000,
      cutout: 'assets/images/rack/ao-so-mi-denim-lv-cuc-ngoc-trai-theu-cameo.png',
      backCutout: 'assets/images/rack/ao-so-mi-denim-lv-cuc-ngoc-trai-theu-cameo-back.png',
      fallbackSrc: 'assets/images/products/ao-so-mi-denim-lv-cuc-ngoc-trai-theu-cameo.png',
      tol: 22,
      tags: [
        { name: 'NAVY', bg: '#1e293b', text: '#ffffff', filter: 'none' },
        { name: 'CHARCOAL', bg: '#27272a', text: '#f4f4f5', filter: 'saturate(0.25) brightness(0.92)' },
        { name: 'COBALT', bg: '#1d4ed8', text: '#eff6ff', filter: 'saturate(1.45) brightness(1.06)' }
      ]
    },
    {
      id: 'nt-01',
      title: 'Áo Khoác Gió Adidas Argentina "AFA 3 Sao" Trắng',
      category: 'jacket',
      categoryLabel: 'Áo Khoác Thể Thao',
      price: 480000,
      oldPrice: 580000,
      cutout: 'assets/images/rack/ao-khoac-argentina-trang.png',
      backCutout: 'assets/images/rack/ao-khoac-argentina-trang-back.png',
      fallbackSrc: 'assets/images/products/ao-khoac-argentina-trang.png',
      tol: 4,
      tags: [
        { name: 'WHITE', bg: '#ffffff', text: '#0f172a', filter: 'none' },
        { name: 'SKY', bg: '#bae6fd', text: '#0369a1', filter: 'sepia(0.18) hue-rotate(165deg) saturate(1.5)' },
        { name: 'SILVER', bg: '#d4d4d8', text: '#18181b', filter: 'brightness(0.92) contrast(1.06)' }
      ]
    },
    {
      id: 'nt-23',
      title: 'Áo Thun Louis Vuitton Monogram All-Over Nâu Cà Phê',
      category: 'tee',
      categoryLabel: 'Áo Thun Monogram',
      price: 380000,
      oldPrice: 460000,
      cutout: 'assets/images/rack/ao-thun-lv-monogram-nau-coffee.png',
      backCutout: 'assets/images/rack/ao-thun-lv-monogram-nau-coffee-back.png',
      fallbackSrc: 'assets/images/products/ao-thun-lv-monogram-nau-coffee.png',
      tol: 22,
      tags: [
        { name: 'COFFEE', bg: '#451a03', text: '#fef3c7', filter: 'none' },
        { name: 'ONYX', bg: '#18181b', text: '#f4f4f5', filter: 'saturate(0.15) brightness(0.85)' },
        { name: 'BORDEAUX', bg: '#4c0519', text: '#ffe4e6', filter: 'hue-rotate(325deg) saturate(1.35)' }
      ]
    },
    {
      id: 'nt-26',
      title: 'Áo Sơ Mi Louis Vuitton Monogram Hoa Ren Hawaii',
      category: 'shirt',
      categoryLabel: 'Sơ Mi Resort',
      price: 420000,
      oldPrice: 520000,
      cutout: 'assets/images/rack/ao-so-mi-lv-monogram-hoa-ren-hawaii.png',
      backCutout: 'assets/images/rack/ao-so-mi-lv-monogram-hoa-ren-hawaii-back.png',
      fallbackSrc: 'assets/images/products/ao-so-mi-lv-monogram-hoa-ren-hawaii.png',
      tol: 22,
      tags: [
        { name: 'OCEAN', bg: '#1e3a5f', text: '#ffffff', filter: 'none' },
        { name: 'OLIVE', bg: '#365314', text: '#ecfccb', filter: 'hue-rotate(260deg) saturate(1.1)' },
        { name: 'MONO', bg: '#27272a', text: '#f4f4f5', filter: 'grayscale(0.85) contrast(1.08)' }
      ]
    },
    {
      id: 'nt-41',
      title: 'Áo Thun Louis Vuitton Hộp Chữ Xếp Hình Building Blocks',
      category: 'tee',
      categoryLabel: 'Áo Thun Streetwear',
      price: 380000,
      oldPrice: 460000,
      cutout: 'assets/images/rack/ao-thun-lv-xep-hinh-building-blocks-trang.png',
      backCutout: 'assets/images/rack/ao-thun-lv-xep-hinh-building-blocks-trang-back.png',
      fallbackSrc: 'assets/images/products/ao-thun-lv-xep-hinh-building-blocks-trang.png',
      tol: 22,
      tags: [
        { name: 'WHITE', bg: '#ffffff', text: '#18181b', filter: 'none' },
        { name: 'CREAM', bg: '#fef3c7', text: '#451a03', filter: 'sepia(0.24) brightness(0.97)' }
      ]
    },
    {
      id: 'nt-30',
      title: 'Áo Sơ Mi Safari Louis Vuitton Kẻ Sọc Dây Rút Eo',
      category: 'shirt',
      categoryLabel: 'Sơ Mi Dài Tay',
      price: 430000,
      oldPrice: 530000,
      cutout: 'assets/images/rack/ao-so-mi-lv-ke-soc-safari-day-rut-eo.png',
      backCutout: 'assets/images/rack/ao-so-mi-lv-ke-soc-safari-day-rut-eo-back.png',
      fallbackSrc: 'assets/images/products/ao-so-mi-lv-ke-soc-safari-day-rut-eo.png',
      tol: 22,
      tags: [
        { name: 'STRIPE', bg: '#e2e8f0', text: '#1e293b', filter: 'none' },
        { name: 'SAND', bg: '#e7e5e4', text: '#292524', filter: 'sepia(0.25)' }
      ]
    },
    {
      id: 'nt-27',
      title: 'Áo Sơ Mi Trắng Dài Tay Louis Vuitton Logo Glitch Pixel',
      category: 'shirt',
      categoryLabel: 'Sơ Mi Công Sở',
      price: 390000,
      oldPrice: 490000,
      cutout: 'assets/images/rack/ao-so-mi-lv-trang-dai-tay-logo-pixel.png',
      backCutout: 'assets/images/rack/ao-so-mi-lv-trang-dai-tay-logo-pixel-back.png',
      fallbackSrc: 'assets/images/products/ao-so-mi-lv-trang-dai-tay-logo-pixel.png',
      tol: 6,
      tags: [
        { name: 'PURE', bg: '#ffffff', text: '#0f172a', filter: 'none' },
        { name: 'PEARL', bg: '#f1f5f9', text: '#334155', filter: 'sepia(0.12) brightness(0.96)' }
      ]
    },
    {
      id: 'nt-22',
      title: 'Áo Thun Louis Vuitton Trắng Classic Dập Vân Chìm',
      category: 'tee',
      categoryLabel: 'Áo Thun Minimal',
      price: 340000,
      oldPrice: 420000,
      cutout: 'assets/images/rack/ao-thun-lv-trang-classic-minimal.png',
      backCutout: 'assets/images/rack/ao-thun-lv-trang-classic-minimal-back.png',
      fallbackSrc: 'assets/images/products/ao-thun-lv-trang-classic-minimal.png',
      tol: 22,
      tags: [
        { name: 'WHITE', bg: '#ffffff', text: '#18181b', filter: 'none' },
        { name: 'WARM', bg: '#f5f5f4', text: '#292524', filter: 'sepia(0.22)' }
      ]
    }
  ];

  const HANGER_SRC = 'assets/images/rack/studio-hanger.png';

  function formatVND(amount) {
    return Number(amount || 0).toLocaleString('vi-VN') + '₫';
  }

  function wrapOffset(diff, length) {
    if (length <= 0) return 0;
    let d = ((diff % length) + length) % length;
    if (d > length / 2) d -= length;
    return d;
  }

  function modIndex(idx, length) {
    if (length <= 0) return 0;
    return ((Math.round(idx) % length) + length) % length;
  }

  function initClothingRack() {
    const stage = document.getElementById('nt-rack-stage');
    const itemsLayer = document.getElementById('nt-rack-items-layer');
    const titleEl = document.getElementById('nt-rack-title');
    const priceCurrentEl = document.getElementById('nt-rack-price-current');
    const priceOldEl = document.getElementById('nt-rack-price-old');
    const counterEl = document.getElementById('nt-rack-counter');
    const categoryLabelEl = document.getElementById('nt-rack-cat-label');
    const inspectBtn = document.getElementById('nt-rack-inspect-btn');
    const quickBuyBtn = document.getElementById('nt-rack-buy-btn');
    const frontBtn = document.getElementById('nt-view-front-btn');
    const backBtn = document.getElementById('nt-view-back-btn');
    const prevBtn = document.getElementById('nt-rack-prev');
    const nextBtn = document.getElementById('nt-rack-next');

    if (!stage || !itemsLayer) return;

    let activeItems = RACK_ITEMS.slice();
    let targetIndex = 2;
    let currentIndex = 2;
    let velocity = 0;
    let swayAngle = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartIndex = 0;
    let lastPointerX = 0;
    let isInspectMode = false;
    let isFlippedBack = false;
    let lastActiveDiscrete = -1;
    let wheelSnapTimer = null;

    let domNodes = [];

    function renderItems() {
      itemsLayer.innerHTML = '';
      domNodes = activeItems.map((item, idx) => {
        const el = document.createElement('div');
        el.className = 'nt-rack-item';
        el.dataset.index = idx;

        const tagsHtml = (item.tags || []).map((t, tIdx) => `
          <div class="nt-color-tag ${tIdx === 0 ? 'active' : ''}"
               data-tag-idx="${tIdx}"
               style="background:${t.bg}; color:${t.text};"
               title="Đổi màu: ${t.name}">
            <span class="nt-color-tag-hole"></span>
            <span class="nt-color-tag-label">${t.name}</span>
          </div>
        `).join('');

        el.innerHTML = `
          <div class="nt-hanger-wrap">
            <img class="nt-hanger-img" src="${HANGER_SRC}" alt="" draggable="false" />
          </div>
          <div class="nt-hanging-tags">${tagsHtml}</div>
          <div class="nt-garment-body">
            <div class="nt-garment-face front">
              <img class="nt-garment-img front-img" src="${item.cutout}" alt="${item.title}" draggable="false" />
            </div>
            <div class="nt-garment-face back">
              <img class="nt-garment-img back-img" src="${item.backCutout}" alt="${item.title} - Mặt sau" draggable="false" />
            </div>
          </div>
        `;

        const frontImg = el.querySelector('.front-img');
        const backImg = el.querySelector('.back-img');

        // Tag click handler updates both front & back faces simultaneously
        const tagEls = el.querySelectorAll('.nt-color-tag');
        tagEls.forEach(tagEl => {
          tagEl.addEventListener('click', (e) => {
            e.stopPropagation();
            const tIdx = Number(tagEl.dataset.tagIdx);
            const tagObj = item.tags[tIdx];
            if (!tagObj) return;
            tagEls.forEach(x => x.classList.remove('active'));
            tagEl.classList.add('active');
            const filterVal = `${tagObj.filter !== 'none' ? tagObj.filter : ''} drop-shadow(0 22px 28px rgba(0,0,0,0.85))`;
            if (frontImg) frontImg.style.filter = filterVal;
            if (backImg) backImg.style.filter = filterVal;
          });
        });

        // Clicking an item on the rack moves it along the shortest circular path to the center
        el.addEventListener('click', () => {
          if (Math.abs(dragDistance) > 8) return;
          const clickedIdx = Number(el.dataset.index);
          const stepDiff = wrapOffset(clickedIdx - targetIndex, activeItems.length);
          if (Math.abs(stepDiff) > 0.15) {
            exitInspectMode();
            targetIndex = Math.round(targetIndex + stepDiff);
          } else {
            toggleInspectMode();
          }
        });

        itemsLayer.appendChild(el);
        return el;
      });

      lastActiveDiscrete = -1;
      updateActiveInfo(modIndex(targetIndex, activeItems.length));
    }

    function updateActiveInfo(discreteIdx) {
      const len = activeItems.length;
      if (!len) return;
      const clamped = ((discreteIdx % len) + len) % len;
      const item = activeItems[clamped];
      if (!item) return;

      if (titleEl) titleEl.textContent = item.title;
      if (priceCurrentEl) priceCurrentEl.textContent = formatVND(item.price);
      if (priceOldEl) priceOldEl.textContent = item.oldPrice ? formatVND(item.oldPrice) : '';
      if (counterEl) counterEl.textContent = `${clamped + 1} / ${len}`;
      if (categoryLabelEl) categoryLabelEl.textContent = item.categoryLabel;

      domNodes.forEach((node, idx) => {
        if (idx === clamped) {
          node.classList.add('is-center');
          node.classList.toggle('is-flipped', isFlippedBack);
        } else {
          node.classList.remove('is-center');
          node.classList.remove('is-flipped');
        }
      });
    }

    function setFlipSide(back) {
      isFlippedBack = back;
      const centerIdx = modIndex(targetIndex, activeItems.length);
      const centerNode = domNodes[centerIdx];
      if (centerNode) {
        centerNode.classList.toggle('is-flipped', isFlippedBack);
      }
      if (frontBtn && backBtn) {
        frontBtn.classList.toggle('active', !isFlippedBack);
        backBtn.classList.toggle('active', isFlippedBack);
      }
    }

    function toggleInspectMode(forceState) {
      isInspectMode = typeof forceState === 'boolean' ? forceState : !isInspectMode;
      stage.classList.toggle('inspect-mode', isInspectMode);
      if (!isInspectMode) {
        setFlipSide(false);
      }
      if (inspectBtn) {
        inspectBtn.innerHTML = isInspectMode
          ? '<span>✕ Thu Nhỏ Về Giá Treo</span>'
          : '<span>🔍 Xem Chi Tiết Trên Móc (Đổi Màu / Xoay)</span>';
      }
    }

    function exitInspectMode() {
      if (isInspectMode) toggleInspectMode(false);
      else if (isFlippedBack) setFlipSide(false);
    }

    function animate() {
      const len = activeItems.length;
      if (len > 0) {
        const diff = targetIndex - currentIndex;
        if (!isDragging) {
          currentIndex += diff * 0.13;
          velocity = diff * 0.13;
        }

        const targetSway = Math.max(-12, Math.min(12, -velocity * 34));
        swayAngle += (targetSway - swayAngle) * 0.22;

        const isMobile = window.innerWidth <= 768;
        const baseSpacing = isMobile ? 114 : 164;

        const discreteCenter = modIndex(currentIndex, len);
        if (discreteCenter !== lastActiveDiscrete) {
          lastActiveDiscrete = discreteCenter;
          updateActiveInfo(discreteCenter);
        }

        for (let i = 0; i < domNodes.length; i++) {
          const node = domNodes[i];
          const offset = wrapOffset(i - currentIndex, len);
          const absOff = Math.abs(offset);

          const sign = offset < 0 ? -1 : 1;
          const spread = absOff < 1
            ? offset * (baseSpacing * 1.16)
            : sign * (baseSpacing * 1.16 + (absOff - 1) * (baseSpacing * 0.72));

          const rotY = Math.max(-56, Math.min(56, offset * -46));

          const scale = isInspectMode && i === discreteCenter
            ? 1.12
            : Math.max(0.74, 1.06 - absOff * 0.1);

          const translateZ = isInspectMode && i === discreteCenter
            ? 85
            : Math.max(-180, 36 - absOff * 52);

          const itemSway = swayAngle * Math.max(0.35, 1 - absOff * 0.15);

          node.style.zIndex = String(100 - Math.round(absOff * 16));
          node.style.transform = `translate3d(${spread.toFixed(1)}px, 0px, ${translateZ.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) rotateZ(${itemSway.toFixed(2)}deg) scale(${scale.toFixed(3)})`;

          if (!isInspectMode) {
            const bright = Math.max(0.46, 1.04 - absOff * 0.16);
            const blurPx = absOff > 2.5 ? Math.min(3.5, (absOff - 2.5) * 1.4) : 0;
            node.style.filter = blurPx > 0
              ? `brightness(${bright.toFixed(2)}) blur(${blurPx.toFixed(1)}px)`
              : `brightness(${bright.toFixed(2)})`;
            node.style.opacity = absOff > 4.2 ? '0' : '1';
            node.style.pointerEvents = absOff > 4.2 ? 'none' : 'auto';
          } else {
            node.style.filter = '';
            node.style.opacity = '';
            node.style.pointerEvents = i === discreteCenter ? 'auto' : 'none';
          }
        }
      }

      requestAnimationFrame(animate);
    }

    let dragDistance = 0;
    stage.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.nt-rack-nav-btn') || e.target.closest('.nt-color-tag')) return;
      isDragging = true;
      dragDistance = 0;
      dragStartX = e.clientX;
      lastPointerX = e.clientX;
      dragStartIndex = targetIndex;
      stage.setPointerCapture(e.pointerId);
    });

    stage.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      dragDistance = dx;
      const stepDx = e.clientX - lastPointerX;
      lastPointerX = e.clientX;

      const sensitivity = window.innerWidth <= 768 ? 115 : 155;
      targetIndex = dragStartIndex - dx / sensitivity;
      currentIndex = targetIndex;
      velocity = -stepDx / sensitivity;
    });

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      targetIndex = Math.round(targetIndex - velocity * 1.5);
    }

    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);

    stage.addEventListener('wheel', (e) => {
      const isHorizontalSwipe = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.75;
      const isOverGarment = !!e.target.closest('.nt-rack-item');
      if (!isHorizontalSwipe && !isOverGarment) return;

      e.preventDefault();
      exitInspectMode();

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const step = Math.max(-0.65, Math.min(0.65, delta * 0.0045));
      targetIndex += step;

      clearTimeout(wheelSnapTimer);
      wheelSnapTimer = setTimeout(() => {
        targetIndex = Math.round(targetIndex);
      }, 150);
    }, { passive: false });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        exitInspectMode();
        targetIndex = Math.round(targetIndex) - 1;
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        exitInspectMode();
        targetIndex = Math.round(targetIndex) + 1;
      });
    }

    if (frontBtn) {
      frontBtn.addEventListener('click', () => setFlipSide(false));
    }
    if (backBtn) {
      backBtn.addEventListener('click', () => setFlipSide(true));
    }

    if (inspectBtn) {
      inspectBtn.addEventListener('click', () => toggleInspectMode());
    }

    if (quickBuyBtn) {
      quickBuyBtn.addEventListener('click', () => {
        const activeItem = activeItems[modIndex(targetIndex, activeItems.length)];
        if (!activeItem) return;
        if (typeof window.openQuickView === 'function') {
          window.openQuickView(activeItem.id);
        } else {
          window.location.href = `product-detail.html?id=${encodeURIComponent(activeItem.id)}`;
        }
      });
    }

    const filterBtns = document.querySelectorAll('.nt-rack-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        exitInspectMode();

        const cat = btn.dataset.rackCat;
        if (!cat || cat === 'all') {
          activeItems = RACK_ITEMS.slice();
        } else {
          activeItems = RACK_ITEMS.filter(item => item.category === cat);
        }
        targetIndex = Math.floor(activeItems.length / 2);
        currentIndex = targetIndex;
        renderItems();
      });
    });

    renderItems();
    requestAnimationFrame(animate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClothingRack);
  } else {
    initClothingRack();
  }
})();
