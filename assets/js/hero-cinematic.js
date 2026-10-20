/**
 * ==============================================================================
 * NGUYEN TU FASHION - CINEMATIC LIVING HERO BACKGROUND
 * ==============================================================================
 * 5 Chuyển động chân thực & chuyên nghiệp chuẩn điện ảnh Á Đông:
 *  1. Cành cây & hoa anh đào đu đưa nhẹ nhàng theo từng đợt gió
 *  2. Cánh hoa anh đào 3D rơi chao lượn, xoay đa chiều trên nền trời
 *  3. Lá cờ vải / rèm Noren (in logo NT) vẫy nhẹ theo làn gió chiều
 *  4. Lồng đèn giấy phát sáng ấm áp, ngọn lửa/ánh đèn di chuyển lung linh bên trong
 *  5. Đàn chim thiên di sải cánh bay qua xa xa phía đỉnh núi Phú Sĩ & ngôi chùa
 *
 * Tối ưu hóa:
 *  - 60 FPS siêu mượt bằng HTML5 Canvas 2D
 *  - Tự động đồng bộ chuẩn xác với object-fit: cover trên mọi kích thước màn hình
 *  - Hỗ trợ Retina / HiDPI (devicePixelRatio)
 *  - Tự động tạm dừng khi cuộn khỏi màn hình (IntersectionObserver) tiết kiệm pin/CPU 100%
 * ==============================================================================
 */

(function () {
  'use strict';

  // Khởi động khi DOM đã tải xong
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCinematicHero);
  } else {
    initCinematicHero();
  }

  function initCinematicHero() {
    const heroSection = document.getElementById('hero');
    const heroBgContainer = heroSection ? heroSection.querySelector('.hero-background') : null;
    const heroBgImg = heroBgContainer ? heroBgContainer.querySelector('.hero-bg-img') : null;

    if (!heroSection || !heroBgContainer) {
      console.warn('[HeroCinematic] Không tìm thấy #hero hoặc .hero-background');
      return;
    }

    // 1. Tạo Canvas đè lên nền hero
    const canvas = document.createElement('canvas');
    canvas.id = 'hero-cinematic-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2'; // Nằm giữa ảnh nền và hero-overlay hoặc trên overlay nhẹ
    canvas.style.display = 'block';

    // Chèn canvas vào trong hero-background (nằm trên hero-overlay để màu sắc rực rỡ, dưới hero-content z-index 3)
    const heroOverlay = heroBgContainer.querySelector('.hero-overlay');
    if (heroOverlay && heroOverlay.nextSibling) {
      heroBgContainer.insertBefore(canvas, heroOverlay.nextSibling);
    } else {
      heroBgContainer.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Kích thước tự nhiên của ảnh hero banner gốc (1024 x 384 hoặc 2048 x 768)
    const NATIVE_IMG_W = 1024;
    const NATIVE_IMG_H = 384;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;
    let animationFrameId = null;
    let lastTime = performance.now();

    // Toạ độ thực tế của ảnh khi scale object-fit: cover trên màn hình
    let coverRect = { x: 0, y: 0, w: 0, h: 0, scale: 1 };

    // Tải ảnh nền vào bộ nhớ để cắt cờ & cành cây phục vụ hiệu ứng sóng vải
    const sourceImage = new Image();
    sourceImage.src = heroBgImg ? heroBgImg.currentSrc || heroBgImg.src : 'assets/images/hero-banner.png';
    let isSourceLoaded = false;
    if (sourceImage.complete && sourceImage.naturalWidth > 0) {
      isSourceLoaded = true;
    } else {
      sourceImage.onload = () => {
        isSourceLoaded = true;
      };
    }

    // ==========================================================================
    // TÍNH TOÁN OBJECT-FIT: COVER CHUẨN XÁC
    // ==========================================================================
    function updateDimensions() {
      const rect = heroBgContainer.getBoundingClientRect();
      width = Math.max(10, Math.floor(rect.width));
      height = Math.max(10, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2); // Giới hạn max dpr 2 để giữ 60fps mượt mà

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Tính cover rect
      const containerAspect = width / height;
      const imgAspect = NATIVE_IMG_W / NATIVE_IMG_H;

      if (containerAspect > imgAspect) {
        coverRect.w = width;
        coverRect.h = width / imgAspect;
        coverRect.x = 0;
        coverRect.y = (height - coverRect.h) / 2;
      } else {
        coverRect.h = height;
        coverRect.w = height * imgAspect;
        coverRect.x = (width - coverRect.w) / 2;
        coverRect.y = 0;
      }
      coverRect.scale = coverRect.w / NATIVE_IMG_W;
    }

    window.addEventListener('resize', updateDimensions, { passive: true });
    updateDimensions();

    // ==========================================================================
    // 1 & 2. HỆ THỐNG CÁNH HOA ANH ĐÀO 3D (LÁ RƠI & GIÓ THỔI)
    // ==========================================================================
    const PETAL_COUNT = 36;
    const petals = [];

    class SakuraPetal {
      constructor(initial = false) {
        this.reset(initial);
      }

      reset(initial = false) {
        // Tỷ lệ độ sâu: 0 (xa xa, mờ ảo) -> 1 (gần mắt, rõ nét)
        this.depth = 0.2 + Math.random() * 0.8;
        this.size = (7 + Math.random() * 9) * (0.6 + this.depth * 0.6); // 6px - 18px

        // Vị trí xuất phát: thổi từ góc trái / trên sang phải
        if (initial) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
        } else {
          // Xuất hiện từ ngoài mép trái hoặc mép trên
          if (Math.random() < 0.65) {
            this.x = -this.size * 2 - Math.random() * 80;
            this.y = Math.random() * (height * 0.85);
          } else {
            this.x = Math.random() * (width * 0.75);
            this.y = -this.size * 2 - Math.random() * 30;
          }
        }

        // Tốc độ rơi và trôi theo gió
        this.baseSpeedY = (0.5 + Math.random() * 0.9) * (0.7 + this.depth * 0.5);
        this.baseSpeedX = (1.2 + Math.random() * 1.6) * (0.8 + this.depth * 0.6);

        // Góc xoay 3D (pitch, yaw, roll) để tạo hiệu ứng lật nhào 3D trong không gian
        this.pitch = Math.random() * Math.PI * 2;
        this.pitchSpeed = 0.02 + Math.random() * 0.04;
        this.yaw = Math.random() * Math.PI * 2;
        this.yawSpeed = 0.015 + Math.random() * 0.035;
        this.roll = Math.random() * Math.PI * 2;
        this.rollSpeed = 0.01 + Math.random() * 0.025;

        // Biến thiên dao động (turbulence)
        this.swayPhase = Math.random() * Math.PI * 2;
        this.swayFreq = 0.015 + Math.random() * 0.02;
        this.swayAmp = 0.8 + Math.random() * 1.4;

        // Màu sắc: cánh hoa anh đào phấn hồng nhẹ, mờ nhẹ theo độ sâu
        const pinkR = 255;
        const pinkG = 175 + Math.floor(Math.random() * 35);
        const pinkB = 190 + Math.floor(Math.random() * 35);
        this.colorMain = `rgba(${pinkR}, ${pinkG}, ${pinkB}, ${(0.45 + this.depth * 0.45).toFixed(2)})`;
        this.colorShadow = `rgba(${pinkR - 25}, ${pinkG - 30}, ${pinkB - 25}, ${(0.5 + this.depth * 0.45).toFixed(2)})`;
      }

      update(time, globalWind) {
        this.pitch += this.pitchSpeed;
        this.yaw += this.yawSpeed;
        this.roll += this.rollSpeed;

        this.swayPhase += this.swayFreq;
        const localSway = Math.sin(this.swayPhase) * this.swayAmp;

        this.x += this.baseSpeedX + globalWind * (0.6 + this.depth * 0.8) + localSway * 0.5;
        this.y += this.baseSpeedY + Math.cos(this.swayPhase * 0.8) * 0.3;

        // Nếu bay quá mép phải hoặc mép dưới -> reset về mép trái
        if (this.x > width + 50 || this.y > height + 40) {
          this.reset(false);
        }
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Biến dạng 3D qua phép xoay và co giãn trục X, Y
        ctx.rotate(this.roll);
        const scaleX = Math.cos(this.yaw);
        const scaleY = Math.cos(this.pitch);
        ctx.scale(scaleX, scaleY);

        // Vẽ hình dáng cánh hoa anh đào (có khía rãnh mềm mại ở đầu cánh)
        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.5); // cuống cánh

        // Cạnh trái uốn cong
        ctx.bezierCurveTo(-s * 0.6, s * 0.2, -s * 0.65, -s * 0.35, -s * 0.25, -s * 0.55);
        // Khía nhỏ đặc trưng của cánh hoa đào
        ctx.lineTo(0, -s * 0.4);
        // Cạnh phải uốn cong
        ctx.lineTo(s * 0.25, -s * 0.55);
        ctx.bezierCurveTo(s * 0.65, -s * 0.35, s * 0.6, s * 0.2, 0, s * 0.5);
        ctx.closePath();

        // Gradient màu cho cánh hoa có độ bóng chiều sâu
        const grad = ctx.createLinearGradient(-s * 0.3, -s * 0.5, s * 0.3, s * 0.5);
        grad.addColorStop(0, this.colorMain);
        grad.addColorStop(1, this.colorShadow);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.restore();
      }
    }

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push(new SakuraPetal(true));
    }

    // ==========================================================================
    // 3. ĐÀN CHIM XA XA BAY QUA PHÍA NÚI PHÚ SĨ & CHÙA
    // ==========================================================================
    class DistantBirdFlock {
      constructor() {
        this.birds = [];
        this.active = false;
        this.spawnTimer = 2.0; // Xuất hiện lần đầu sau 2 giây
        this.leaderX = 0;
        this.leaderY = 0;
        this.speedX = 1.35;
        this.speedY = -0.15;
      }

      spawn() {
        this.active = true;
        this.leaderX = -60;
        // Bay ở khoảng 1/4 - 1/3 góc trên của bầu trời
        this.leaderY = height * (0.16 + Math.random() * 0.14);
        this.speedX = 1.3 + Math.random() * 0.5;
        this.speedY = -0.05 + (Math.random() - 0.5) * 0.15;

        // Đàn chim 6 - 8 con theo hình chữ V bất đối xứng tự nhiên
        const birdCount = 6 + Math.floor(Math.random() * 3);
        this.birds = [];

        for (let i = 0; i < birdCount; i++) {
          // Tạo vị trí hình chữ V
          let offsetX, offsetY;
          if (i === 0) {
            offsetX = 0;
            offsetY = 0;
          } else {
            const side = i % 2 === 0 ? 1 : -1;
            const rank = Math.ceil(i / 2);
            offsetX = -rank * (18 + Math.random() * 6);
            offsetY = side * rank * (10 + Math.random() * 5) + (Math.random() - 0.5) * 4;
          }

          this.birds.push({
            relX: offsetX,
            relY: offsetY,
            wingSpan: 7 + Math.random() * 4, // Cỡ nhỏ tạo cảm giác xa xăm
            wingPhase: Math.random() * Math.PI * 2,
            wingSpeed: 0.12 + Math.random() * 0.04,
            glideTimer: 0,
            isGliding: false
          });
        }
      }

      update(timeDelta) {
        if (!this.active) {
          this.spawnTimer -= timeDelta;
          if (this.spawnTimer <= 0) {
            this.spawn();
          }
          return;
        }

        this.leaderX += this.speedX;
        this.leaderY += this.speedY;

        // Cập nhật từng chú chim
        for (const bird of this.birds) {
          // Thỉnh thoảng chim lượn (glide) không vỗ cánh
          bird.glideTimer += timeDelta;
          if (bird.glideTimer > 2.5 + Math.random() * 3) {
            bird.isGliding = Math.random() < 0.4;
            bird.glideTimer = 0;
          }

          if (!bird.isGliding) {
            bird.wingPhase += bird.wingSpeed;
          }
        }

        // Khi cả đàn bay hết qua mép phải màn hình -> Chờ đợt tiếp theo
        if (this.leaderX > width + 180) {
          this.active = false;
          this.spawnTimer = 14 + Math.random() * 12; // 14 - 26 giây sau lại có 1 đàn bay qua
        }
      }

      draw(ctx) {
        if (!this.active) return;

        ctx.save();
        ctx.fillStyle = 'rgba(28, 18, 32, 0.72)'; // Silhouette màu tím sẫm hòa vào hoàng hôn

        for (const bird of this.birds) {
          const bx = this.leaderX + bird.relX;
          const by = this.leaderY + bird.relY;

          // Nếu nằm ngoài khung nhìn thì bỏ qua
          if (bx < -30 || bx > width + 30) continue;

          // Góc vỗ cánh
          const wingDeflect = bird.isGliding ? 0.15 : Math.sin(bird.wingPhase);
          const w = bird.wingSpan;
          const wingY = wingDeflect * (w * 0.45);

          ctx.beginPath();
          // Thân chim nhỏ
          ctx.ellipse(bx, by, 1.8, 1.0, 0.1, 0, Math.PI * 2);
          ctx.fill();

          // Cánh chim dạng uốn lượn mềm mại
          ctx.beginPath();
          ctx.moveTo(bx, by);
          // Cánh trái
          ctx.quadraticCurveTo(bx - w * 0.45, by - wingY - 1, bx - w, by - wingY * 0.7);
          ctx.quadraticCurveTo(bx - w * 0.4, by - wingY * 0.3, bx, by);
          // Cánh phải
          ctx.quadraticCurveTo(bx + w * 0.45, by - wingY - 1, bx + w, by - wingY * 0.7);
          ctx.quadraticCurveTo(bx + w * 0.4, by - wingY * 0.3, bx, by);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    const birdFlock = new DistantBirdFlock();

    // ==========================================================================
    // 4. LỒNG ĐÈN PHÁT SÁNG & ÁNH SÁNG DI CHUYỂN BÊN TRONG (LANTERN GLOW & FLICKER)
    // ==========================================================================
    // Toạ độ lồng đèn chuẩn hoá theo ảnh gốc (1024 x 384)
    const lanterns = [
      {
        name: 'Left Hanging Lantern',
        nx: 128 / 1024,  // ~12.5%
        ny: 178 / 384,   // ~46.4%
        rx: 34 / 1024,
        ry: 52 / 384,
        baseIntensity: 0.85
      },
      {
        name: 'Right Hanging Lantern',
        nx: 982 / 1024,  // ~95.9%
        ny: 270 / 384,   // ~70.3%
        rx: 28 / 1024,
        ry: 42 / 384,
        baseIntensity: 0.75
      },
      {
        name: 'Shop Interior Warm Spill',
        nx: 195 / 1024,  // Hắt sáng nhẹ từ trong quán ra
        ny: 215 / 384,
        rx: 50 / 1024,
        ry: 60 / 384,
        baseIntensity: 0.45
      }
    ];

    function drawLanternGlow(ctx, time) {
      ctx.save();
      // Dùng blend mode 'screen' hoặc 'lighter' để ánh sáng tỏa rực tự nhiên
      ctx.globalCompositeOperation = 'screen';

      lanterns.forEach((l, idx) => {
        // Chuyển sang toạ độ hiển thị thực tế
        const lx = coverRect.x + l.nx * coverRect.w;
        const ly = coverRect.y + l.ny * coverRect.h;
        const radX = l.rx * coverRect.w;
        const radY = l.ry * coverRect.h;
        const maxRad = Math.max(radX, radY);

        // Hiệu ứng ngọn lửa lung linh / chao đảo bên trong lồng đèn:
        // Đèn chao nhẹ quanh tâm như ngọn nến hoặc bóng đèn đung đưa
        const driftX = Math.sin(time * 1.4 + idx * 2.1) * (radX * 0.12);
        const driftY = Math.cos(time * 1.8 + idx * 1.7) * (radY * 0.10);

        // Đèn thở (breathing) + chớp nháy vi mô (candle micro-flicker)
        const flicker =
          0.88 +
          Math.sin(time * 2.4 + idx * 1.5) * 0.06 +
          Math.sin(time * 6.8 + idx * 3.1) * 0.035 +
          Math.sin(time * 14.2 + idx * 4.7) * 0.025;

        const currentIntensity = l.baseIntensity * flicker;

        // Vùng sáng ấm bên trong lồng đèn
        const grad = ctx.createRadialGradient(
          lx + driftX,
          ly + driftY,
          maxRad * 0.1,
          lx,
          ly,
          maxRad * 1.6
        );

        grad.addColorStop(0, `rgba(255, 240, 180, ${(0.82 * currentIntensity).toFixed(3)})`);
        grad.addColorStop(0.25, `rgba(255, 175, 45, ${(0.65 * currentIntensity).toFixed(3)})`);
        grad.addColorStop(0.6, `rgba(245, 95, 20, ${(0.32 * currentIntensity).toFixed(3)})`);
        grad.addColorStop(1, 'rgba(230, 60, 10, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(lx + driftX * 0.5, ly + driftY * 0.5, radX * 1.5, radY * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tâm sáng rực nhỏ bên trong (nguồn sáng ngọn lửa/bóng đèn)
        const coreGrad = ctx.createRadialGradient(
          lx + driftX,
          ly + driftY,
          0,
          lx + driftX,
          ly + driftY,
          maxRad * 0.4
        );
        coreGrad.addColorStop(0, `rgba(255, 255, 230, ${(0.95 * currentIntensity).toFixed(3)})`);
        coreGrad.addColorStop(0.5, `rgba(255, 210, 120, ${(0.55 * currentIntensity).toFixed(3)})`);
        coreGrad.addColorStop(1, 'rgba(255, 160, 40, 0)');

        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(lx + driftX, ly + driftY, maxRad * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    }

    // ==========================================================================
    // 5. LÁ CỜ VẢI (NOREN) VẪY NHẸ & CÀNH CÂY ĐU ĐƯA
    // ==========================================================================
    // Vị trí cờ NT Noren trên ảnh gốc: x: ~180..245, y: ~135..248
    const FLAG_SRC = {
      x: 180,
      y: 136,
      w: 68,
      h: 115
    };

    // Vị trí cành hoa đào trước mái hiên bên trái: x: 0..170, y: 225..384
    const TREE_SRC = {
      x: 0,
      y: 225,
      w: 175,
      h: 159
    };

    function drawWavingFlagAndTrees(ctx, time, globalWind) {
      if (!isSourceLoaded || !sourceImage.complete || sourceImage.naturalWidth === 0) return;

      const imgScale = sourceImage.naturalWidth / NATIVE_IMG_W;

      // ------------------------------------------------------------------------
      // A. LÁ CỜ NOREN VẢI VẪY THEO GIÓ
      // ------------------------------------------------------------------------
      const fx = coverRect.x + (FLAG_SRC.x / NATIVE_IMG_W) * coverRect.w;
      const fy = coverRect.y + (FLAG_SRC.y / NATIVE_IMG_H) * coverRect.h;
      const fw = (FLAG_SRC.w / NATIVE_IMG_W) * coverRect.w;
      const fh = (FLAG_SRC.h / NATIVE_IMG_H) * coverRect.h;

      // Chia lá cờ thành 24 dải ngang để tạo đường gợn sóng vải uốn lượn mượt mà
      const SLICES = 24;
      const sliceH = fh / SLICES;
      const srcSliceH = (FLAG_SRC.h * imgScale) / SLICES;

      ctx.save();
      for (let i = 0; i < SLICES; i++) {
        const progressY = i / SLICES; // 0 ở đỉnh cờ (gắn cố định), 1 ở gấu cờ (vẫy mạnh nhất)
        
        // Sóng gió: đỉnh cờ giữ chặt, càng xuống dưới càng bay bổng
        const waveAmp = (progressY * progressY) * (3.8 + globalWind * 2.2);
        const waveX = Math.sin(time * 3.2 - progressY * 5.5) * waveAmp;
        const waveY = Math.cos(time * 2.6 - progressY * 4.2) * (waveAmp * 0.35);

        // Cắt từng dải từ ảnh gốc và vẽ lại với độ lệch sóng gió
        ctx.drawImage(
          sourceImage,
          FLAG_SRC.x * imgScale,
          FLAG_SRC.y * imgScale + i * srcSliceH,
          FLAG_SRC.w * imgScale,
          srcSliceH,
          fx + waveX,
          fy + i * sliceH + waveY,
          fw,
          sliceH + 0.6 // +0.6 để chống hở viền giữa các dải
        );

        // Hiệu ứng ánh sáng & bóng đổ 3D trên nếp gấp vải
        const foldSlope = Math.cos(time * 3.2 - progressY * 5.5);
        if (progressY > 0.15) {
          if (foldSlope > 0.1) {
            // Nếp lồi đón sáng
            ctx.fillStyle = `rgba(255, 235, 210, ${(foldSlope * 0.12 * progressY).toFixed(3)})`;
            ctx.fillRect(fx + waveX, fy + i * sliceH + waveY, fw, sliceH + 0.6);
          } else if (foldSlope < -0.1) {
            // Nếp lõm khuất sáng tạo bóng đổ sâu
            ctx.fillStyle = `rgba(0, 0, 0, ${(-foldSlope * 0.22 * progressY).toFixed(3)})`;
            ctx.fillRect(fx + waveX, fy + i * sliceH + waveY, fw, sliceH + 0.6);
          }
        }
      }
      ctx.restore();

      // ------------------------------------------------------------------------
      // B. CÀNH CÂY VÀ HOA ANH ĐÀO ĐU ĐƯA NHẸ NHÀNG
      // ------------------------------------------------------------------------
      const tx = coverRect.x + (TREE_SRC.x / NATIVE_IMG_W) * coverRect.w;
      const ty = coverRect.y + (TREE_SRC.y / NATIVE_IMG_H) * coverRect.h;
      const tw = (TREE_SRC.w / NATIVE_IMG_W) * coverRect.w;
      const th = (TREE_SRC.h / NATIVE_IMG_H) * coverRect.h;

      // Cành cây đu đưa với tần số gió tự nhiên chậm hơn cờ
      const treeSwayX = Math.sin(time * 1.5) * 2.5 + Math.sin(time * 3.1) * 1.0;
      const treeSwayY = Math.cos(time * 1.2) * 1.2;

      ctx.save();
      // Vẽ bóng/độ rung nhẹ cho cành cây tiền cảnh để tạo cảm giác rung rinh sống động
      ctx.globalAlpha = 0.85;
      ctx.drawImage(
        sourceImage,
        TREE_SRC.x * imgScale,
        TREE_SRC.y * imgScale,
        TREE_SRC.w * imgScale,
        TREE_SRC.h * imgScale,
        tx + treeSwayX,
        ty + treeSwayY,
        tw,
        th
      );
      ctx.restore();
    }

    // ==========================================================================
    // 6. VÒNG LẶP RENDER CHÍNH (60 FPS CINEMATIC LOOP)
    // ==========================================================================
    function render(currentTime) {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      const timeInSeconds = currentTime * 0.001;
      const delta = Math.min((currentTime - lastTime) * 0.001, 0.1);
      lastTime = currentTime;

      // Xoá khung hình
      ctx.clearRect(0, 0, width, height);

      // Gió toàn cảnh (nhịp điệu thở của thiên nhiên: lúc êm dịu, lúc có làn gió thoảng)
      const globalWind = Math.sin(timeInSeconds * 0.6) * 0.6 + Math.sin(timeInSeconds * 1.7) * 0.3;

      // 1. Cờ vẫy & Cành cây đu đưa
      drawWavingFlagAndTrees(ctx, timeInSeconds, globalWind);

      // 2. Lồng đèn tỏa sáng lung linh
      drawLanternGlow(ctx, timeInSeconds);

      // 3. Đàn chim xa xa sải cánh bay
      birdFlock.update(delta);
      birdFlock.draw(ctx);

      // 4. Cánh hoa anh đào 3D rơi chao lượn
      for (let i = 0; i < petals.length; i++) {
        petals[i].update(timeInSeconds, globalWind);
        petals[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    }

    // ==========================================================================
    // 7. INTERSECTION OBSERVER - TỰ ĐỘNG TẠM DỪNG TIẾT KIỆM PIN & CPU
    // ==========================================================================
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
            if (isVisible && !animationFrameId) {
              lastTime = performance.now();
              animationFrameId = requestAnimationFrame(render);
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(heroSection);
    } else {
      // Trình duyệt cũ không hỗ trợ Observer -> chạy liên tục
      animationFrameId = requestAnimationFrame(render);
    }
  }
})();
