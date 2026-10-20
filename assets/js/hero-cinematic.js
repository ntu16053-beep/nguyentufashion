/**
 * ==============================================================================
 * NGUYEN TU FASHION - CINEMATIC LIVING HERO BACKGROUND (V3 - REALISTIC CLOUDS)
 * ==============================================================================
 * Các chuyển động điện ảnh Á Đông chân thực & chuyên nghiệp:
 *  1. MÂY BAY CHÂN THỰC: Tầng mây sương hoàng hôn bồng bềnh lướt nhẹ qua đỉnh núi Phú Sĩ
 *  2. CÁNH HOA ĐÀO 3D: Rơi mềm mại, lật nhào 3 chiều, bay lượn theo luồng gió
 *  3. ÁNH SÁNG LỒNG ĐÈN: Ánh nến ấm áp chao nhẹ, thở dịu êm bên trong lồng đèn giấy
 *  4. ĐÀN CHIM THIÊN DI: Sải cánh thanh thoát bay qua khoảng trời xa xăm
 *
 * Tối ưu hóa:
 *  - 60 FPS siêu mượt nhờ kỹ thuật Sprite Caching (Offscreen Canvas)
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

    const NATIVE_IMG_W = 1024;
    const NATIVE_IMG_H = 384;

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
      const imgAspect = NATIVE_IMG_W / NATIVE_IMG_H;

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
    // 1. HỆ THỐNG MÂY HOÀNG HÔN CHUYỂN ĐỘNG CHÂN THỰC (VOLUMETRIC CLOUDS)
    // ==========================================================================
    // Tạo 3 mẫu texture đám mây tự nhiên bằng Offscreen Canvas
    function createCloudSprite(w, h, colorType) {
      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const octx = off.getContext('2d');
      if (!octx) return off;

      // Vẽ nhiều cụm sương mờ xếp chồng hữu cơ (Organic Cloud Puffs)
      const puffCount = 14 + Math.floor(Math.random() * 8);
      for (let i = 0; i < puffCount; i++) {
        const px = (w * 0.15) + Math.random() * (w * 0.7);
        const py = (h * 0.25) + Math.random() * (h * 0.5);
        const pr = (h * 0.25) + Math.random() * (h * 0.45);

        const g = octx.createRadialGradient(px, py, pr * 0.05, px, py, pr);
        if (colorType === 'sunset') {
          // Ánh mây hoàng hôn ửng hồng cam ấm
          g.addColorStop(0, 'rgba(255, 225, 210, 0.14)');
          g.addColorStop(0.4, 'rgba(255, 185, 175, 0.08)');
          g.addColorStop(0.8, 'rgba(235, 160, 180, 0.03)');
          g.addColorStop(1, 'rgba(235, 160, 180, 0)');
        } else if (colorType === 'twilight') {
          // Mây sương tím lam chiều tà
          g.addColorStop(0, 'rgba(240, 220, 245, 0.12)');
          g.addColorStop(0.4, 'rgba(215, 185, 230, 0.07)');
          g.addColorStop(0.8, 'rgba(180, 155, 205, 0.025)');
          g.addColorStop(1, 'rgba(180, 155, 205, 0)');
        } else {
          // Mây trắng bạc viền sương mờ
          g.addColorStop(0, 'rgba(255, 250, 245, 0.15)');
          g.addColorStop(0.4, 'rgba(250, 235, 225, 0.08)');
          g.addColorStop(0.8, 'rgba(240, 215, 205, 0.03)');
          g.addColorStop(1, 'rgba(240, 215, 205, 0)');
        }

        octx.fillStyle = g;
        octx.beginPath();
        octx.arc(px, py, pr, 0, Math.PI * 2);
        octx.fill();
      }

      return off;
    }

    const cloudSprites = [
      createCloudSprite(420, 120, 'sunset'),
      createCloudSprite(360, 110, 'twilight'),
      createCloudSprite(480, 130, 'mist')
    ];

    // Khởi tạo các dải mây trôi trên bầu trời quanh núi Phú Sĩ
    const cloudLayers = [
      {
        sprite: cloudSprites[0],
        xRel: 0.35,      // Vị trí ngang ban đầu
        yRel: 0.08,      // Độ cao tầng trên bầu trời
        wRel: 0.42,      // Chiều rộng tương đối
        hRel: 0.18,
        speed: 0.00018,  // Tốc độ trôi nhẹ nhàng, êm dịu
        phase: 0.0,
        opacity: 0.85
      },
      {
        sprite: cloudSprites[1],
        xRel: 0.62,
        yRel: 0.18,      // Mây lướt ngang sườn núi Phú Sĩ
        wRel: 0.38,
        hRel: 0.16,
        speed: 0.00025,
        phase: 1.8,
        opacity: 0.75
      },
      {
        sprite: cloudSprites[2],
        xRel: 0.15,
        yRel: 0.03,      // Tầng mây cao phía trên đỉnh núi
        wRel: 0.48,
        hRel: 0.20,
        speed: 0.00014,
        phase: 3.2,
        opacity: 0.65
      },
      {
        sprite: cloudSprites[0],
        xRel: 0.80,
        yRel: 0.12,      // Dải mây xa phía trên tháp chùa
        wRel: 0.36,
        hRel: 0.15,
        speed: 0.00022,
        phase: 4.5,
        opacity: 0.70
      }
    ];

    function drawCinematicClouds(ctx, time) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Giới hạn vùng bầu trời: Từ mép mái nhà bên trái (X ~ 30%) sang góc phải
      const skyStartX = coverRect.x + coverRect.w * 0.28;

      cloudLayers.forEach((c) => {
        // Cập nhật vị trí trôi ngang liên tục
        c.xRel += c.speed;
        if (c.xRel > 1.15) {
          c.xRel = 0.22 - c.wRel; // Vòng lại mép trái bầu trời (sau mái nhà)
        }

        const cx = coverRect.x + c.xRel * coverRect.w;
        const cy = coverRect.y + c.yRel * coverRect.h + Math.sin(time * 0.3 + c.phase) * 3;
        const cw = c.wRel * coverRect.w;
        const ch = c.hRel * coverRect.h;

        // Làm mờ êm dịu khi mây đến gần mái hiên cửa hàng bên trái để không che nhà
        let edgeFade = 1.0;
        if (cx < skyStartX + 80) {
          edgeFade = Math.max(0, (cx - skyStartX) / 80);
        }

        ctx.globalAlpha = c.opacity * edgeFade;
        ctx.drawImage(c.sprite, cx, cy, cw, ch);
      });

      ctx.restore();
    }

    // ==========================================================================
    // 2. HỆ THỐNG CÁNH HOA ANH ĐÀO 3D (MỀM MẠI, TRONG SUỐT, TỰ NHIÊN)
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
    // 3. LỒNG ĐÈN: ÁNH SÁNG ẤM ÁP, DỊU NHẸ, GỌN BÊN TRONG LỒNG ĐÈN
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
    // 4. ĐÀN CHIM XA XA BAY QUA PHÍA BẦU TRỜI NÚI PHÚ SĨ
    // ==========================================================================
    class DistantBirdFlock {
      constructor() {
        this.birds = [];
        this.active = false;
        this.spawnTimer = 1.5;
        this.leaderX = 0;
        this.leaderY = 0;
        this.speedX = 1.25;
        this.speedY = -0.08;
      }

      spawn() {
        this.active = true;
        this.leaderX = -50;
        this.leaderY = height * (0.16 + Math.random() * 0.12);
        this.speedX = 1.1 + Math.random() * 0.35;
        this.speedY = -0.04 + (Math.random() - 0.5) * 0.08;

        const count = 6;
        this.birds = [];
        for (let i = 0; i < count; i++) {
          const rank = Math.ceil(i / 2);
          const side = i % 2 === 0 ? 1 : -1;
          const offsetX = i === 0 ? 0 : -rank * 18;
          const offsetY = i === 0 ? 0 : side * rank * 9;

          this.birds.push({
            relX: offsetX,
            relY: offsetY,
            w: 8 + Math.random() * 3,
            phase: Math.random() * Math.PI * 2,
            speed: 0.11 + Math.random() * 0.02,
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
          if (bird.glideTimer > 3) {
            bird.isGliding = Math.random() < 0.35;
            bird.glideTimer = 0;
          }
          if (!bird.isGliding) {
            bird.phase += bird.speed;
          }
        }

        if (this.leaderX > width + 140) {
          this.active = false;
          this.spawnTimer = 14 + Math.random() * 10;
        }
      }

      draw(ctx) {
        if (!this.active) return;

        ctx.save();
        ctx.fillStyle = 'rgba(32, 22, 35, 0.72)';

        for (const bird of this.birds) {
          const bx = this.leaderX + bird.relX;
          const by = this.leaderY + bird.relY;
          if (bx < -20 || bx > width + 20) continue;

          const wingDeflect = bird.isGliding ? 0.12 : Math.sin(bird.phase);
          const w = bird.w;
          const wingY = wingDeflect * (w * 0.4);

          ctx.beginPath();
          ctx.ellipse(bx, by, 1.4, 0.9, 0.05, 0, Math.PI * 2);
          ctx.fill();

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

    const birdFlock = new DistantBirdFlock();

    // ==========================================================================
    // 5. VÒNG LẶP RENDER CHÍNH (60 FPS MƯỢT MÀ)
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

      // 1. MÂY HOÀNG HÔN TRÔI CHÂN THỰC TRÊN BẦU TRỜI & ĐỈNH NÚI PHÚ SĨ
      drawCinematicClouds(ctx, timeSec);

      // 2. Ánh sáng ấm dịu lồng đèn bên trái
      drawLanternSubtleGlow(ctx, timeSec);

      // 3. Đàn chim xa xa sải cánh bay
      birdFlock.update(dt);
      birdFlock.draw(ctx);

      // 4. Cánh hoa anh đào rơi 3D
      for (let i = 0; i < petals.length; i++) {
        petals[i].update(timeSec, windGust);
        petals[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    }

    // Tự động tạm dừng tiết kiệm CPU
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
