/**
 * NGUYEN TU FASHION — 3D INTERACTIVE CLOTHING RACK (2026 VIRTUAL SHOWROOM)
 * Smooth trackpad/drag physics, infinite circular rack loop, 3D hanger rotation,
 * hanging color tags, front/back flip, and automatic canvas cutout fallback.
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
      fallbackSrc: 'assets/images/products/ao-khoac-denim-lv-den.png',
      tol: 22,
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
      fallbackSrc: 'assets/images/products/ao-khoac-adidas-beckenbauer-kem.png',
      tol: 8,
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
      fallbackSrc: 'assets/images/products/ao-so-mi-lv-damier-denim.png',
      tol: 22,
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
      fallbackSrc: 'assets/images/products/ao-thun-lv-chim-va-ruy-bang-kem.png',
      tol: 15,
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
      fallbackSrc: 'assets/images/products/ao-so-mi-denim-lv-cuc-ngoc-trai-theu-cameo.png',
      tol: 22,
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
      fallbackSrc: 'assets/images/products/ao-khoac-argentina-trang.png',
      tol: 5,
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
      fallbackSrc: 'assets/images/products/ao-thun-lv-monogram-nau-coffee.png',
      tol: 22,
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
      fallbackSrc: 'assets/images/products/ao-so-mi-lv-monogram-hoa-ren-hawaii.png',
      tol: 22,
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
      fallbackSrc: 'assets/images/products/ao-thun-lv-xep-hinh-building-blocks-trang.png',
      tol: 22,
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
      fallbackSrc: 'assets/images/products/ao-so-mi-lv-ke-soc-safari-day-rut-eo.png',
      tol: 22,
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
      fallbackSrc: 'assets/images/products/ao-so-mi-lv-trang-dai-tay-logo-pixel.png',
      tol: 6,
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
      fallbackSrc: 'assets/images/products/ao-thun-lv-trang-classic-minimal.png',
      tol: 22,
      backCode: 'MINIMAL • LV 22',
      tags: [
        { name: 'WHITE', bg: '#ffffff', text: '#18181b', filter: 'none' },
        { name: 'WARM', bg: '#f5f5f4', text: '#292524', filter: 'sepia(0.22)' }
      ]
    }
  ];

  const cutoutCache = new Map();

  // Client-side Canvas Corner Flood-Fill Fallback (guarantees transparent shirt even if rack/ folder isn't deployed yet)
  function processFallbackCutout(src, tolerance, callback) {
    if (cutoutCache.has(src)) {
      callback(cutoutCache.get(src));
      return;
    }
    const tempImg = new Image();
    tempImg.crossOrigin = 'anonymous';
    tempImg.onload = function () {
      try {
        const w = tempImg.naturalWidth || tempImg.width;
        const h = tempImg.naturalHeight || tempImg.height;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempImg, 0, 0);
        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;

        const r0 = d[0], g0 = d[1], b0 = d[2], a0 = d[3];
        if (a0 === 0) {
          cutoutCache.set(src, src);
          callback(src);
          return;
        }

        const total = w * h;
        const visited = new Uint8Array(total);
        const isBg = new Uint8Array(total);
        const queue = new Int32Array(total);
        let head = 0, tail = 0;

        const seeds = [0, w - 1, (h - 1) * w, (h - 1) * w + w - 1, Math.floor(w / 2)];
        for (let s of seeds) {
          if (!visited[s]) {
            visited[s] = 1;
            queue[tail++] = s;
          }
        }

        const tolSq = (tolerance || 15) * (tolerance || 15) * 3;
        while (head < tail) {
          const idx = queue[head++];
          const p = idx * 4;
          const dr = d[p] - r0;
          const dg = d[p + 1] - g0;
          const db = d[p + 2] - b0;
          if (dr * dr + dg * dg + db * db <= tolSq) {
            isBg[idx] = 1;
            const x = idx % w;
            const y = (idx - x) / w;
            if (x > 0 && !visited[idx - 1]) { visited[idx - 1] = 1; queue[tail++] = idx - 1; }
            if (x < w - 1 && !visited[idx + 1]) { visited[idx + 1] = 1; queue[tail++] = idx + 1; }
            if (y > 0 && !visited[idx - w]) { visited[idx - w] = 1; queue[tail++] = idx - w; }
            if (y < h - 1 && !visited[idx + w]) { visited[idx + w] = 1; queue[tail++] = idx + w; }
          }
        }

        let minX = w, minY = h, maxX = 0, maxY = 0;
        for (let i = 0; i < total; i++) {
          const p = i * 4;
          if (isBg[i]) {
            d[p + 3] = 0;
          } else {
            const x = i % w;
            const y = (i - x) / w;
            let bgN = 0;
            if (x > 0 && isBg[i - 1]) bgN++;
            if (x < w - 1 && isBg[i + 1]) bgN++;
            if (y > 0 && isBg[i - w]) bgN++;
            if (y < h - 1 && isBg[i + w]) bgN++;
            if (bgN > 0) d[p + 3] = Math.max(0, 255 - bgN * 50);
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
        ctx.putImageData(imgData, 0, 0);

        if (maxX > minX && maxY > minY) {
          const cw = maxX - minX + 1;
          const ch = maxY - minY + 1;
          const outC = document.createElement('canvas');
          outC.width = 500;
          outC.height = 560;
          const outCtx = outC.getContext('2d');
          const scale = Math.min(460 / cw, 520 / ch);
          const dw = cw * scale;
          const dh = ch * scale;
          const dx = (500 - dw) / 2;
          const dy = 14;
          outCtx.drawImage(canvas, minX, minY, cw, ch, dx, dy, dw, dh);
          const dataUrl = outC.toDataURL('image/png');
          cutoutCache.set(src, dataUrl);
          callback(dataUrl);
        } else {
          const dataUrl = canvas.toDataURL('image/png');
          cutoutCache.set(src, dataUrl);
          callback(dataUrl);
        }
      } catch (err) {
        callback(src);
      }
    };
    tempImg.onerror = function () {
      callback(src);
    };
    tempImg.src = src;
  }

  function formatVND(amount) {
    return Number(amount || 0).toLocaleString('vi-VN') + '₫';
  }

  function createHangerSVG() {
    return `
      <svg class="nt-hanger-svg" viewBox="0 0 180 95" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ntHookMetal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="45%" stop-color="#d4d4d8"/>
            <stop offset="78%" stop-color="#52525b"/>
            <stop offset="100%" stop-color="#f4f4f5"/>
          </linearGradient>
          <linearGradient id="ntWoodBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#451a03"/>
            <stop offset="50%" stop-color="#290f02"/>
            <stop offset="100%" stop-color="#140701"/>
          </linearGradient>
          <linearGradient id="ntGoldTrim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#d97706"/>
            <stop offset="50%" stop-color="#fde68a"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
        </defs>
        <!-- Metallic Hook wrapping directly over the horizontal bar at y=19 -->
        <path d="M90 42 L90 28 C90 21 82 14 88 9 C93 5 102 7 103 15 C104 20 99 23 95 24"
              stroke="url(#ntHookMetal)" stroke-width="4.4" stroke-linecap="round" fill="none"/>
        <!-- Gold Collar Ring -->
        <rect x="84" y="40" width="12" height="7" rx="2" fill="url(#ntGoldTrim)"/>
        <!-- Luxury Walnut Wooden Shoulders -->
        <path d="M12 76 C28 56 64 45 90 45 C116 45 152 56 168 76 C171 80 167 85 161 83 C138 70 112 59 90 59 C68 59 42 70 19 83 C13 85 9 80 12 76 Z"
              fill="url(#ntWoodBody)" stroke="rgba(251,191,36,0.38)" stroke-width="1.2"/>
        <!-- Brand plaque on hanger center -->
        <rect x="77" y="48" width="26" height="7" rx="2" fill="#180408" stroke="url(#ntGoldTrim)" stroke-width="0.9"/>
      </svg>
    `;
  }

  // Compute shortest circular distance on an infinite loop rack
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

        const imgEl = el.querySelector('.nt-garment-img');
        // Automatic fallback if /assets/images/rack/... is missing on a static preview server
        imgEl.addEventListener('error', function onImgErr() {
          imgEl.removeEventListener('error', onImgErr);
          if (item.fallbackSrc) {
            processFallbackCutout(item.fallbackSrc, item.tol, (cleanDataUrl) => {
              imgEl.src = cleanDataUrl;
            });
          }
        });

        // Tag click handler
        const tagEls = el.querySelectorAll('.nt-color-tag');
        tagEls.forEach(tagEl => {
          tagEl.addEventListener('click', (e) => {
            e.stopPropagation();
            const tIdx = Number(tagEl.dataset.tagIdx);
            const tagObj = item.tags[tIdx];
            if (!tagObj) return;
            tagEls.forEach(x => x.classList.remove('active'));
            tagEl.classList.add('active');
            imgEl.style.filter = `${tagObj.filter !== 'none' ? tagObj.filter : ''} drop-shadow(0 20px 26px rgba(0,0,0,0.82))`;
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

    // Physics & 3D Transform Loop (Infinite Circular Rack)
    function animate() {
      const len = activeItems.length;
      if (len > 0) {
        const diff = targetIndex - currentIndex;
        if (!isDragging) {
          currentIndex += diff * 0.13;
          velocity = diff * 0.13;
        }

        const targetSway = Math.max(-13, Math.min(13, -velocity * 36));
        swayAngle += (targetSway - swayAngle) * 0.22;

        const isMobile = window.innerWidth <= 768;
        const baseSpacing = isMobile ? 114 : 162;

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

          // Center faces straight forward (0deg); side items hang angled on the rack
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

    // Trackpad Horizontal Two-Finger Scroll & Mouse Wheel
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

    // Prev / Next Buttons (infinite loop in both directions)
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

    // Quick View / Add to Cart Integration
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

    // Category Filter Pills
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
