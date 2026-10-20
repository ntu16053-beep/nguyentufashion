/**
 * ==============================================================================
 * NGUYEN TU FASHION - CINEMATIC LIVING HERO BACKGROUND (V4 - MULTI-FLOCK SYSTEM)
 * ==============================================================================
 * Các chuyển động điện ảnh tinh tế & chuẩn nét:
 *  1. CÁNH HOA ĐÀO 3D: Rơi mềm mại, xoay 3 chiều, bay lượn theo làn gió chiều
 *  2. ÁNH SÁNG LỒNG ĐÈN: Ánh nến ấm áp chao nhẹ, thở dịu êm bên trong lồng đèn giấy
 *  3. ĐÀN CHIM THIÊN DI (2 - 3 ĐÀN BAY QUA LẠI):
 *     - Đàn 1: Bay tầng trung từ trái sang phải qua đỉnh núi Phú Sĩ
 *     - Đàn 2: Bay tầng cao từ phải sang trái ngược chiều xa xăm
 *     - Đàn 3: Nhóm chim liệng cánh ngang sườn núi và tháp chùa
 *
 * Tối ưu hóa:
 *  - 60 FPS siêu mượt bằng HTML5 Canvas 2D
 *  - Tự động đồng bộ chuẩn xác với object-fit: cover trên mọi kích thước màn hình
 *  - Hỗ trợ Retina / HiDPI (devicePixelRatio)
 *  - Tự động tạm dừng khi cuộn khỏi màn hình (IntersectionObserver)
 * ==============================================================================
 */

(function () {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCinematicHero);
  } else {
    initCinematicHero();
  }

  function initCinematicHero() {
    const heroSection = document.getElementById('hero');
    const heroBgContainer = heroSection ? heroSection.querySelector('.hero-background') : null;
    const heroBgImg = heroBgContainer ? heroBgContainer.querySelector('.hero-bg-img') : null;
    const heroOverlay = heroBgContainer ? heroBgContainer.querySelector('.hero-overlay') : null;

    if (!heroSection || !heroBgContainer) return;

    // 1. Kiểm tra hoặc tái sử dụng Canvas
    let canvas = document.getElementById('hero-cinematic-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'hero-cinematic-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '2';
      canvas.style.display = 'block';

      if (heroOverlay && heroOverlay.nextSibling) {
        heroBgContainer.insertBefore(canvas, heroOverlay.nextSibling);
      } else {
        heroBgContainer.appendChild(canvas);
      }
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let nativeImgW = 1920;
    let nativeImgH = 1080;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;
    let animationFrameId = null;
    let lastTime = performance.now();
    let coverRect = { x: 0, y: 0, w: 0, h: 0 };

    // ==========================================================================
    // TÍNH TOÁN VỊ TRÍ ẢNH COVER CHUẨN XÁC
    // ==========================================================================
    function updateDimensions() {
      const rect = heroBgContainer.getBoundingClientRect();
      width = Math.max(10, Math.floor(rect.width));
      height = Math.max(10, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      let objPosX = 0.5;
      let objPosY = 0.5;
      if (heroBgImg) {
        const comp = window.getComputedStyle(heroBgImg);
        const pos = (comp.objectPosition || '50% 50%').trim().split(/\s+/);
        if (pos.length >= 1) {
          if (pos[0].endsWith('%')) objPosX = parseFloat(pos[0]) / 100;
          else if (pos[0] === 'left') objPosX = 0;
          else if (pos[0] === 'center') objPosX = 0.5;
          else if (pos[0] === 'right') objPosX = 1;
        }
        if (pos.length >= 2) {
          if (pos[1].endsWith('%')) objPosY = parseFloat(pos[1]) / 100;
          else if (pos[1] === 'top') objPosY = 0;
          else if (pos[1] === 'center') objPosY = 0.5;
          else if (pos[1] === 'bottom') objPosY = 1;
        }
      }

      const containerAspect = width / height;
      if (heroBgImg && heroBgImg.naturalWidth && heroBgImg.naturalHeight) {
        nativeImgW = heroBgImg.naturalWidth;
        nativeImgH = heroBgImg.naturalHeight;
      }
      const imgAspect = nativeImgW / nativeImgH;

      if (containerAspect > imgAspect) {
        coverRect.w = width;
        coverRect.h = width / imgAspect;
        coverRect.x = (width - coverRect.w) * objPosX;
        coverRect.y = (height - coverRect.h) * objPosY;
      } else {
        coverRect.h = height;
        coverRect.w = height * imgAspect;
        coverRect.x = (width - coverRect.w) * objPosX;
        coverRect.y = (height - coverRect.h) * objPosY;
      }
    }

    window.addEventListener('resize', updateDimensions, { passive: true });
    updateDimensions();

    // ==========================================================================
    // 1. HỆ THỐNG CÁNH HOA ANH ĐÀO 3D (MỀM MẠI, TRONG SUỐT, TỰ NHIÊN)
    // ==========================================================================
    const PETAL_COUNT = 28;
    const petals = [];

    class SakuraPetal {
      constructor(initial = false) {
        this.reset(initial);
      }

      reset(initial = false) {
        this.depth = 0.25 + Math.random() * 0.75;
        this.size = (7 + Math.random() * 7) * (0.6 + this.depth * 0.5);

        if (initial) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
        } else {
          if (Math.random() < 0.6) {
            this.x = -this.size - Math.random() * 60;
            this.y = Math.random() * (height * 0.75);
          } else {
            this.x = Math.random() * (width * 0.7);
            this.y = -this.size - Math.random() * 20;
          }
        }

        this.baseSpeedY = (0.45 + Math.random() * 0.65) * (0.6 + this.depth * 0.5);
        this.baseSpeedX = (0.9 + Math.random() * 1.3) * (0.7 + this.depth * 0.5);

        this.pitch = Math.random() * Math.PI * 2;
        this.pitchSpeed = 0.015 + Math.random() * 0.03;
        this.yaw = Math.random() * Math.PI * 2;
        this.yawSpeed = 0.01 + Math.random() * 0.025;
        this.roll = Math.random() * Math.PI * 2;
        this.rollSpeed = 0.008 + Math.random() * 0.018;

        this.swayPhase = Math.random() * Math.PI * 2;
        this.swayFreq = 0.012 + Math.random() * 0.018;
        this.swayAmp = 0.7 + Math.random() * 1.0;

        this.alpha = 0.35 + this.depth * 0.45;
      }

      update(time, windGust) {
        this.pitch += this.pitchSpeed;
        this.yaw += this.yawSpeed;
        this.roll += this.rollSpeed;

        this.swayPhase += this.swayFreq;
        const localSway = Math.sin(this.swayPhase) * this.swayAmp;

        this.x += this.baseSpeedX + windGust * (0.5 + this.depth * 0.6) + localSway * 0.4;
        this.y += this.baseSpeedY + Math.cos(this.swayPhase * 0.7) * 0.25;

        if (this.x > width + 40 || this.y > height + 30) {
          this.reset(false);
        }
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.rotate(this.roll);
        const scaleX = Math.cos(this.yaw) * 0.9;
        const scaleY = Math.cos(this.pitch);
        ctx.scale(scaleX, scaleY);

        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.45);
        ctx.bezierCurveTo(-s * 0.5, s * 0.15, -s * 0.55, -s * 0.3, -s * 0.2, -s * 0.5);
        ctx.lineTo(0, -s * 0.38);
        ctx.lineTo(s * 0.2, -s * 0.5);
        ctx.bezierCurveTo(s * 0.55, -s * 0.3, s * 0.5, s * 0.15, 0, s * 0.45);
        ctx.closePath();

        const grad = ctx.createLinearGradient(-s * 0.2, -s * 0.4, s * 0.2, s * 0.4);
        grad.addColorStop(0, `rgba(255, 218, 226, ${this.alpha.toFixed(2)})`);
        grad.addColorStop(0.6, `rgba(255, 182, 198, ${(this.alpha * 0.85).toFixed(2)})`);
        grad.addColorStop(1, `rgba(240, 145, 170, ${(this.alpha * 0.7).toFixed(2)})`);

        ctx.fillStyle = grad;
        ctx.fill();

        ctx.restore();
      }
    }

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push(new SakuraPetal(true));
    }

    // ==========================================================================
    // 2. LỒNG ĐÈN: ÁNH SÁNG ẤM ÁP, DỊU NHẸ, GỌN BÊN TRONG LỒNG ĐÈN
    // ==========================================================================
    const lanternLeft = {
      nx: 126 / 1024,
      ny: 180 / 384,
      rx: 26 / 1024,
      ry: 40 / 384
    };

    function drawLanternSubtleGlow(ctx, time) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const lx = coverRect.x + lanternLeft.nx * coverRect.w;
      const ly = coverRect.y + lanternLeft.ny * coverRect.h;
      const radX = lanternLeft.rx * coverRect.w;
      const radY = lanternLeft.ry * coverRect.h;

      const driftX = Math.sin(time * 1.6) * 1.8;
      const driftY = Math.cos(time * 2.1) * 1.4;
      const flicker = 0.88 + Math.sin(time * 2.8) * 0.07 + Math.sin(time * 7.4) * 0.03;

      const grad = ctx.createRadialGradient(
        lx + driftX,
        ly + driftY,
        2,
        lx,
        ly,
        radX * 0.95
      );

      grad.addColorStop(0, `rgba(255, 245, 205, ${(0.48 * flicker).toFixed(3)})`);
      grad.addColorStop(0.4, `rgba(255, 195, 90, ${(0.32 * flicker).toFixed(3)})`);
      grad.addColorStop(0.8, `rgba(255, 140, 45, ${(0.14 * flicker).toFixed(3)})`);
      grad.addColorStop(1, 'rgba(255, 100, 20, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(lx, ly, radX * 0.88, radY * 0.88, 0, 0, Math.PI * 2);
      ctx.fill();

      const coreGrad = ctx.createRadialGradient(
        lx + driftX,
        ly + driftY,
        0,
        lx + driftX,
        ly + driftY,
        radX * 0.35
      );
      coreGrad.addColorStop(0, `rgba(255, 255, 235, ${(0.6 * flicker).toFixed(3)})`);
      coreGrad.addColorStop(1, 'rgba(255, 200, 100, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(lx + driftX, ly + driftY, radX * 0.35, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // ==========================================================================
    // 3. HỆ THỐNG 2 - 3 ĐÀN CHIM BAY QUA LẠI TRÊN BẦU TRỜI
    // ==========================================================================
    class BirdFlock {
      constructor(config) {
        this.dir = config.dir || 1; // 1: Trái -> Phải, -1: Phải -> Trái
        this.count = config.count || 6;
        this.scale = config.scale || 1.0;
        this.yRatioMin = config.yRatioMin || 0.12;
        this.yRatioMax = config.yRatioMax || 0.24;
        this.baseSpeed = config.baseSpeed || 1.2;
        this.initialDelay = config.initialDelay || 1.0;

        this.birds = [];
        this.active = false;
        this.spawnTimer = this.initialDelay;
        this.leaderX = 0;
        this.leaderY = 0;
        this.speedX = 0;
        this.speedY = 0;
      }

      spawn() {
        this.active = true;

        if (this.dir === 1) {
          // Bay từ Trái sang Phải
          this.leaderX = -60;
          this.speedX = this.baseSpeed * (0.9 + Math.random() * 0.3);
        } else {
          // Bay từ Phải sang Trái (Bay qua lại)
          this.leaderX = width + 60;
          this.speedX = -this.baseSpeed * (0.9 + Math.random() * 0.3);
        }

        this.leaderY = height * (this.yRatioMin + Math.random() * (this.yRatioMax - this.yRatioMin));
        this.speedY = -0.04 + (Math.random() - 0.5) * 0.08;

        this.birds = [];
        for (let i = 0; i < this.count; i++) {
          const rank = Math.ceil(i / 2);
          const side = i % 2 === 0 ? 1 : -1;

          // Đội hình chữ V đuôi chim hướng về phía sau hướng bay
          const trailSign = -this.dir;
          const offsetX = i === 0 ? 0 : trailSign * rank * (16 * this.scale + Math.random() * 4);
          const offsetY = i === 0 ? 0 : side * rank * (8 * this.scale + Math.random() * 3);

          this.birds.push({
            relX: offsetX,
            relY: offsetY,
            w: (7.5 + Math.random() * 2.5) * this.scale,
            phase: Math.random() * Math.PI * 2,
            speed: 0.11 + Math.random() * 0.025,
            isGliding: false,
            glideTimer: 0
          });
        }
      }

      update(dt) {
        if (!this.active) {
          this.spawnTimer -= dt;
          if (this.spawnTimer <= 0) this.spawn();
          return;
        }

        this.leaderX += this.speedX;
        this.leaderY += this.speedY;

        for (const bird of this.birds) {
          bird.glideTimer += dt;
          if (bird.glideTimer > 2.8) {
            bird.isGliding = Math.random() < 0.35;
            bird.glideTimer = 0;
          }
          if (!bird.isGliding) {
            bird.phase += bird.speed;
          }
        }

        // Kiểm tra khi cả đàn đã bay ra khỏi màn hình
        const hasLeft = this.dir === 1 ? (this.leaderX > width + 150) : (this.leaderX < -150);
        if (hasLeft) {
          this.active = false;
          // Nghỉ 8 - 14 giây rồi lại bay tiếp
          this.spawnTimer = 8 + Math.random() * 8;
        }
      }

      draw(ctx) {
        if (!this.active) return;

        ctx.save();
        // Sắc màu hoàng hôn cho bóng chim (màu chiều sẫm thanh thoát)
        const alpha = Math.min(0.78, 0.55 + this.scale * 0.22);
        ctx.fillStyle = `rgba(32, 20, 36, ${alpha.toFixed(2)})`;

        for (const bird of this.birds) {
          const bx = this.leaderX + bird.relX;
          const by = this.leaderY + bird.relY;
          if (bx < -30 || bx > width + 30) continue;

          const wingDeflect = bird.isGliding ? 0.12 : Math.sin(bird.phase);
          const w = bird.w;
          const wingY = wingDeflect * (w * 0.42);

          // Thân chim nhỏ thanh thoát
          ctx.beginPath();
          ctx.ellipse(bx, by, 1.4 * this.scale, 0.9 * this.scale, this.dir * 0.08, 0, Math.PI * 2);
          ctx.fill();

          // Sải cánh uốn lượn hình chữ V mềm mại
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.quadraticCurveTo(bx - w * 0.45, by - wingY - 0.8, bx - w, by - wingY * 0.65);
          ctx.quadraticCurveTo(bx - w * 0.4, by - wingY * 0.25, bx, by);
          ctx.quadraticCurveTo(bx + w * 0.45, by - wingY - 0.8, bx + w, by - wingY * 0.65);
          ctx.quadraticCurveTo(bx + w * 0.4, by - wingY * 0.25, bx, by);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Khởi tạo 3 đàn chim bay qua lại đa tầng:
    const flocks = [
      // Đàn 1: Bay tầng trung từ Trái sang Phải qua đỉnh núi Phú Sĩ
      new BirdFlock({
        dir: 1,
        count: 7,
        scale: 1.05,
        yRatioMin: 0.15,
        yRatioMax: 0.23,
        baseSpeed: 1.25,
        initialDelay: 0.4 // Xuất hiện ngay khi mở web
      }),

      // Đàn 2: Bay tầng cao từ Phải sang Trái (Bay qua lại ngược chiều trên đỉnh trời)
      new BirdFlock({
        dir: -1,
        count: 5,
        scale: 0.85, // Nhỏ hơn, cảm giác bay xa xăm
        yRatioMin: 0.07,
        yRatioMax: 0.14,
        baseSpeed: 1.05,
        initialDelay: 3.5 // Xuất hiện sau 3.5 giây
      }),

      // Đàn 3: Nhóm chim liệng tầng sườn núi & tháp chùa (Trái sang Phải)
      new BirdFlock({
        dir: 1,
        count: 4,
        scale: 0.95,
        yRatioMin: 0.24,
        yRatioMax: 0.32,
        baseSpeed: 1.35,
        initialDelay: 7.2 // Xuất hiện sau 7.2 giây
      })
    ];

    // ==========================================================================
    // 4. VÒNG LẶP RENDER CHÍNH (60 FPS MƯỢT MÀ)
    // ==========================================================================
    function render(currentTime) {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      const timeSec = currentTime * 0.001;
      const dt = Math.min((currentTime - lastTime) * 0.001, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      const windGust = Math.sin(timeSec * 0.5) * 0.5 + Math.sin(timeSec * 1.4) * 0.25;

      // 1. Ánh sáng ấm dịu lồng đèn bên trái
      drawLanternSubtleGlow(ctx, timeSec);

      // 2. 2 - 3 ĐÀN CHIM BAY QUA LẠI TRÊN BẦU TRỜI
      for (let i = 0; i < flocks.length; i++) {
        flocks[i].update(dt);
        flocks[i].draw(ctx);
      }

      // 3. Cánh hoa anh đào rơi 3D
      for (let i = 0; i < petals.length; i++) {
        petals[i].update(timeSec, windGust);
        petals[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    }

    // Tự động tạm dừng tiết kiệm CPU khi cuộn qua
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
      animationFrameId = requestAnimationFrame(render);
    }
  }
})();
