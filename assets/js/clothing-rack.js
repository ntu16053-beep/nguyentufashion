/**
 * NGUYEN TU FASHION — 3D INTERACTIVE CLOTHING RACK (2026 VIRTUAL SHOWROOM)
 * Smooth trackpad/drag physics, 3D hanger rotation, hanging color tags & front/back flip
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
      backCode: 'NT • LV DENIM 26',
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
      backCode: 'BECKENBAUER • 05',
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
      backCode: 'DAMIER • LV 07',
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
      backCode: 'LV • STUDIO 43',
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
      backCode: 'CAMEO • EDITION 29',
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
      backCode: 'AFA • 3 STARS 26',
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
      backCode: 'MONOGRAM • 23',
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
      backCode: 'HAWAII • LV 26',
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
      backCode: 'BLOCKS • NT 41',
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
      backCode: 'SAFARI • LV 30',
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
      backCode: 'PIXEL • LV 27',
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
      backCode: 'MINIMAL • LV 22',
      tags: [
        { name: 'WHITE', bg: '#ffffff', text: '#18181b', filter: 'none' },
        { name: 'WARM', bg: '#f5f5f4', text: '#292524', filter: 'sepia(0.22)' }
      ]
    }
  ];

  function formatVND(amount) {
    return Number(amount || 0).toLocaleString('vi-VN') + '₫';
  }

  function createHangerSVG() {
    return `
      <svg class="nt-hanger-svg" viewBox="0 0 180 95" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ntHookMetal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f4f4f5"/>
            <stop offset="45%" stop-color="#a1a1aa"/>
            <stop offset="75%" stop-color="#52525b"/>
            <stop offset="100%" stop-color="#e4e4e7"/>
          </linearGradient>
          <linearGradient id="ntWoodBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#451a03"/>
            <stop offset="45%" stop-color="#290f02"/>
            <stop offset="100%" stop-color="#140701"/>
          </linearGradient>
          <linearGradient id="ntGoldTrim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#d97706"/>
            <stop offset="50%" stop-color="#fde68a"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
        </defs>
        <!-- Metallic Hook wrapping over the bar at y=22 -->
        <path d="M90 45 L90 29 C90 21 82 15 88 9 C93 4 102 6 103 14 C104 19 99 23 95 24"
              stroke="url(#ntHookMetal)" stroke-width="4.2" stroke-linecap="round" fill="none"/>
        <!-- Gold Collar Ring -->
        <rect x="84" y="42" width="12" height="7" rx="2" fill="url(#ntGoldTrim)"/>
        <!-- Luxury Walnut Wooden Shoulders -->
        <path d="M12 78 C28 58 64 47 90 47 C116 47 152 58 168 78 C171 82 167 87 161 85 C138 72 112 61 90 61 C68 61 42 72 19 85 C13 87 9 82 12 78 Z"
              fill="url(#ntWoodBody)" stroke="rgba(251,191,36,0.35)" stroke-width="1.2"/>
        <!-- Brand plaque on hanger center -->
        <rect x="77" y="50" width="26" height="7" rx="2" fill="#180408" stroke="url(#ntGoldTrim)" stroke-width="0.9"/>
      </svg>
    `;
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
    let targetIndex = 2; // Start near middle of rack
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
          <div class="nt-hanger-wrap">${createHangerSVG()}</div>
          <div class="nt-hanging-tags">${tagsHtml}</div>
          <div class="nt-garment-body">
            <img class="nt-garment-img" src="${item.cutout}" alt="${item.title}" draggable="false" />
            <div class="nt-garment-back-badge">
              <strong>${item.backCode}</strong>
              <span>NGUYEN TU AUTHENTIC • BACK VIEW</span>
            </div>
          </div>
        `;

        // Tag click handler (switches garment color filter like in video 00:07-00:09)
        const tagEls = el.querySelectorAll('.nt-color-tag');
        const imgEl = el.querySelector('.nt-garment-img');
        tagEls.forEach(tagEl => {
          tagEl.addEventListener('click', (e) => {
            e.stopPropagation();
            const tIdx = Number(tagEl.dataset.tagIdx);
            const tagObj = item.tags[tIdx];
            if (!tagObj) return;
            tagEls.forEach(x => x.classList.remove('active'));
            tagEl.classList.add('active');
            imgEl.style.filter = `${tagObj.filter !== 'none' ? tagObj.filter : ''} drop-shadow(0 22px 28px rgba(0,0,0,0.78))`;
          });
        });

        // Clicking an item on the rack
        el.addEventListener('click', (e) => {
          if (Math.abs(dragDistance) > 8) return;
          const clickedIdx = Number(el.dataset.index);
          if (Math.round(targetIndex) !== clickedIdx) {
            exitInspectMode();
            targetIndex = clickedIdx;
          } else {
            // Clicking the center garment toggles Inspect Mode (blurring background + showing color tags)
            toggleInspectMode();
          }
        });

        itemsLayer.appendChild(el);
        return el;
      });

      lastActiveDiscrete = -1;
      updateActiveInfo(Math.round(targetIndex));
    }

    function updateActiveInfo(discreteIdx) {
      const clamped = Math.max(0, Math.min(activeItems.length - 1, discreteIdx));
      const item = activeItems[clamped];
      if (!item) return;

      if (titleEl) titleEl.textContent = item.title;
      if (priceCurrentEl) priceCurrentEl.textContent = formatVND(item.price);
      if (priceOldEl) priceOldEl.textContent = item.oldPrice ? formatVND(item.oldPrice) : '';
      if (counterEl) counterEl.textContent = `${clamped + 1} / ${activeItems.length}`;
      if (categoryLabelEl) categoryLabelEl.textContent = item.categoryLabel;

      domNodes.forEach((node, idx) => {
        if (idx === clamped) {
          node.classList.add('is-center');
        } else {
          node.classList.remove('is-center');
          node.classList.remove('is-flipped');
        }
      });
    }

    function setFlipSide(back) {
      isFlippedBack = back;
      const centerIdx = Math.round(targetIndex);
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

    // Physics & 3D Transform Loop
    function animate() {
      const diff = targetIndex - currentIndex;
      if (!isDragging) {
        currentIndex += diff * 0.13;
        velocity = diff * 0.13;
      }

      // Pendulum sway based on horizontal slide velocity
      const targetSway = Math.max(-14, Math.min(14, -velocity * 38));
      swayAngle += (targetSway - swayAngle) * 0.22;

      const isMobile = window.innerWidth <= 768;
      const baseSpacing = isMobile ? 112 : 158;

      const discreteCenter = Math.max(0, Math.min(activeItems.length - 1, Math.round(currentIndex)));
      if (discreteCenter !== lastActiveDiscrete) {
        lastActiveDiscrete = discreteCenter;
        updateActiveInfo(discreteCenter);
      }

      for (let i = 0; i < domNodes.length; i++) {
        const node = domNodes[i];
        const offset = i - currentIndex;
        const absOff = Math.abs(offset);

        // Non-linear horizontal spacing: center item has breathing room, side items pack closely like a real rack
        const sign = offset < 0 ? -1 : 1;
        const spread = absOff < 1
          ? offset * (baseSpacing * 1.18)
          : sign * (baseSpacing * 1.18 + (absOff - 1) * (baseSpacing * 0.72));

        // Smooth 3D Y-axis rotation: 0 deg at center, up to +-56 deg when hanging on the sides
        const rotY = Math.max(-58, Math.min(58, offset * -48));

        // Scale & Z-depth: center pops forward under spotlight
        const scale = isInspectMode && i === discreteCenter
          ? 1.14
          : Math.max(0.74, 1.07 - absOff * 0.11);

        const translateZ = isInspectMode && i === discreteCenter
          ? 90
          : Math.max(-180, 40 - absOff * 55);

        // Sway pendulum angle slightly damped for outer items
        const itemSway = swayAngle * Math.max(0.35, 1 - absOff * 0.15);

        node.style.zIndex = String(100 - Math.round(absOff * 15));
        node.style.transform = `translate3d(${spread.toFixed(1)}px, 0px, ${translateZ.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) rotateZ(${itemSway.toFixed(2)}deg) scale(${scale.toFixed(3)})`;

        if (!isInspectMode) {
          const bright = Math.max(0.48, 1.04 - absOff * 0.16);
          const blurPx = absOff > 2.6 ? Math.min(3.5, (absOff - 2.6) * 1.4) : 0;
          node.style.filter = blurPx > 0
            ? `brightness(${bright.toFixed(2)}) blur(${blurPx.toFixed(1)}px)`
            : `brightness(${bright.toFixed(2)})`;
          node.style.opacity = absOff > 4.5 ? '0' : '1';
        } else {
          node.style.filter = '';
          node.style.opacity = '';
        }
      }

      requestAnimationFrame(animate);
    }

    // Pointer / Touch Dragging
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
      const nextTarget = dragStartIndex - dx / sensitivity;
      targetIndex = Math.max(0, Math.min(activeItems.length - 1, nextTarget));
      currentIndex = targetIndex;
      velocity = -stepDx / sensitivity;
    });

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      targetIndex = Math.max(0, Math.min(activeItems.length - 1, Math.round(targetIndex - velocity * 1.6)));
    }

    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);

    // Trackpad Horizontal Two-Finger Scroll & Mouse Wheel
    stage.addEventListener('wheel', (e) => {
      // Allow normal vertical page scroll unless scrolling horizontally on trackpad or holding Shift, or hovering directly over garments
      const isHorizontalSwipe = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.75;
      const isOverGarment = !!e.target.closest('.nt-rack-item');
      if (!isHorizontalSwipe && !isOverGarment) return;

      e.preventDefault();
      exitInspectMode();

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const step = Math.max(-0.65, Math.min(0.65, delta * 0.0045));
      targetIndex = Math.max(0, Math.min(activeItems.length - 1, targetIndex + step));

      clearTimeout(wheelSnapTimer);
      wheelSnapTimer = setTimeout(() => {
        targetIndex = Math.max(0, Math.min(activeItems.length - 1, Math.round(targetIndex)));
      }, 160);
    }, { passive: false });

    // Prev / Next Buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        exitInspectMode();
        targetIndex = Math.max(0, Math.round(targetIndex) - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        exitInspectMode();
        targetIndex = Math.min(activeItems.length - 1, Math.round(targetIndex) + 1);
      });
    }

    // Front / Back Flip Buttons
    if (frontBtn) {
      frontBtn.addEventListener('click', () => setFlipSide(false));
    }
    if (backBtn) {
      backBtn.addEventListener('click', () => setFlipSide(true));
    }

    // Inspect Mode Button
    if (inspectBtn) {
      inspectBtn.addEventListener('click', () => toggleInspectMode());
    }

    // Quick View / Add to Cart Integration with existing website
    if (quickBuyBtn) {
      quickBuyBtn.addEventListener('click', () => {
        const activeItem = activeItems[Math.round(targetIndex)];
        if (!activeItem) return;
        if (typeof window.openQuickView === 'function') {
          window.openQuickView(activeItem.id);
        } else {
          window.location.href = `product-detail.html?id=${encodeURIComponent(activeItem.id)}`;
        }
      });
    }

    // Category Filter Pills on Top of Rack
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
        targetIndex = Math.min(1, Math.max(0, Math.floor((activeItems.length - 1) / 2)));
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
