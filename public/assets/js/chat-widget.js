/**
 * NGUYEN TU FASHION - FLOATING LIVE CHAT & SMART CONSULTATION WIDGET
 * Provides AI styling advice, size calculation, live order tracking, and fast consultation
 */

(function () {
  'use strict';

  function initChatWidget() {
    if (document.getElementById('floating-chat-container')) return;

    // Create container
    const container = document.createElement('div');
    container.id = 'floating-chat-container';
    container.className = 'floating-chat-container';

    container.innerHTML = `
      <div class="chat-callout-pill" id="chat-callout-pill">
        ⚡ Tư Vấn Size & Outfit 24/7
      </div>

      <button class="floating-chat-btn" id="floating-chat-toggle" title="Chat & Tư Vấn">
        <span class="chat-online-badge"></span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      <div class="chat-popup-window" id="chat-popup-window">
        <div class="chat-header">
          <div class="chat-header-user">
            <div class="chat-avatar-mini">NT</div>
            <div class="chat-title-group">
              <h4>Nguyen Tu Fashion</h4>
              <span><span style="width:7px; height:7px; background:var(--accent-green); border-radius:50%; display:inline-block;"></span> Stylist & CSKH Trực Tuyến</span>
            </div>
          </div>
          <button class="chat-close-btn" id="chat-close-btn" title="Đóng">&times;</button>
        </div>

        <div class="chat-body-stream" id="chat-body-stream">
          <div class="chat-bubble bot">
            👋 Chào bạn! Mình là Trợ lý Phong Cách của <strong>Nguyen Tu Fashion Ninh Bình</strong>. Bạn cần mình tư vấn chọn size, gợi ý outfit hay hỗ trợ gì hôm nay?
          </div>
          <div class="chat-quick-replies" id="chat-initial-replies">
            <button class="quick-reply-pill" onclick="window.sendChatBotQuick('size')">📏 Tư vấn chọn size áo & quần</button>
            <button class="quick-reply-pill" onclick="window.sendChatBotQuick('track')">📦 Tra cứu trạng thái đơn hàng</button>
            <button class="quick-reply-pill" onclick="window.sendChatBotQuick('shipping')">⚡ Giao hàng hỏa tốc Ninh Bình</button>
            <button class="quick-reply-pill" onclick="window.sendChatBotQuick('hot')">🔥 Xem sản phẩm bán chạy nhất</button>
            <button class="quick-reply-pill" onclick="window.sendChatBotQuick('human')">📞 Kết nối Stylist qua Zalo/Hotline</button>
          </div>
        </div>

        <div class="chat-footer-input">
          <input type="text" id="chat-input-text" class="chat-input-field" placeholder="Nhập câu hỏi (VD: cao 1m72 nặng 64kg mặc size gì?)..." onkeydown="if(event.key==='Enter') window.sendChatMessage();">
          <button class="chat-send-action-btn" onclick="window.sendChatMessage()" title="Gửi">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    const toggleBtn = document.getElementById('floating-chat-toggle');
    const closeBtn = document.getElementById('chat-close-btn');
    const popup = document.getElementById('chat-popup-window');
    const pill = document.getElementById('chat-callout-pill');

    toggleBtn.addEventListener('click', () => {
      popup.classList.toggle('active');
      if (pill) pill.style.display = 'none';
      if (popup.classList.contains('active')) {
        document.getElementById('chat-input-text').focus();
      }
    });

    closeBtn.addEventListener('click', () => {
      popup.classList.remove('active');
    });
  }

  // Add Message to Stream
  function appendChatBubble(text, sender = 'bot') {
    const stream = document.getElementById('chat-body-stream');
    if (!stream) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    stream.appendChild(bubble);
    stream.scrollTop = stream.scrollHeight;
  }

  // Handle Quick Buttons
  window.sendChatBotQuick = function (action) {
    if (action === 'size') {
      appendChatBubble('Tôi muốn tư vấn chọn size áo quần phù hợp', 'user');
      setTimeout(() => {
        appendChatBubble(`
          ✨ <strong>Tư vấn chọn size chuẩn Streetwear:</strong><br><br>
          Bạn hãy nhập Chiều cao (cm) và Cân nặng (kg) vào ô chat (VD: <em>1m70 62kg</em>), mình sẽ tính size vừa vặn và dáng oversize chuẩn nhất cho bạn ngay nhé!
        `, 'bot');
      }, 500);
    } else if (action === 'track') {
      appendChatBubble('Tôi muốn kiểm tra tình trạng đơn hàng', 'user');
      setTimeout(() => {
        appendChatBubble(`
          📦 Để tra cứu đơn hàng, bạn vui lòng nhập <strong>Số điện thoại</strong> đã dùng khi đặt hàng vào ô chat nhé!
        `, 'bot');
      }, 500);
    } else if (action === 'shipping') {
      appendChatBubble('Chính sách giao hàng tại Ninh Bình thế nào?', 'user');
      setTimeout(() => {
        appendChatBubble(`
          ⚡ <strong>Chính sách giao hàng độc quyền Nguyen Tu Fashion:</strong><br>
          • <strong>Hỏa tốc 2H</strong>: Giao liền tay khu vực TP. Ninh Bình, Yên Khánh, Hoa Lư.<br>
          • <strong>Freeship toàn tỉnh</strong> cho đơn từ <strong>299.000₫</strong> (hoặc áp mã voucher <code>FREESHIP</code>).<br>
          • Đồng kiểm xem hàng trước khi thanh toán COD!
        `, 'bot');
      }, 500);
    } else if (action === 'hot') {
      appendChatBubble('Shop có mẫu nào đang hot nhất?', 'user');
      setTimeout(() => {
        appendChatBubble(`
          🔥 <strong>Top Hot Drop tuần này:</strong><br>
          1. <a href="product-detail.html?id=nt-01" style="color:var(--accent-red); font-weight:700;">Áo Khoác Gió Adidas Argentina 2024 Trắng</a> (480.000đ)<br>
          2. <a href="product-detail.html?id=nt-02" style="color:var(--accent-red); font-weight:700;">Bộ Tracksuit Thể Thao Argentina Đen</a> (650.000đ)<br>
          3. <a href="product-detail.html?id=nt-04" style="color:var(--accent-red); font-weight:700;">Áo Khoác Khuy Tàu Kung Fu Xám Khói</a> (520.000đ)<br><br>
          👉 <a href="products.html" style="text-decoration:underline; font-weight:800; color:#fff;">Xem tất cả 50+ sản phẩm tại đây</a>
        `, 'bot');
      }, 500);
    } else if (action === 'human') {
      appendChatBubble('Tôi muốn gặp trực tiếp nhân viên tư vấn', 'user');
      setTimeout(() => {
        appendChatBubble(`
          📞 <strong>Hỗ trợ tư vấn trực tiếp 24/7:</strong><br>
          • Hotline / Zalo: <a href="tel:0342767002" style="color:var(--accent-gold); font-weight:800;">0342.767.002</a><br>
          • Showroom: Khánh Nhạc, Yên Khánh, Ninh Bình (08:30 - 22:00)<br>
          • <a href="contact.html" style="color:var(--accent-red); text-decoration:underline;">Mở trang liên hệ & bản đồ chỉ đường →</a>
        `, 'bot');
      }, 500);
    }
  };

  // Handle Free-text Message
  window.sendChatMessage = async function () {
    const input = document.getElementById('chat-input-text');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    appendChatBubble(text, 'user');

    const lower = text.toLowerCase();

    // Show typing...
    setTimeout(async () => {
      // 1. Check if user typed a phone number for tracking
      const phoneMatch = text.replace(/[^0-9]/g, '');
      if (phoneMatch.length >= 10 && phoneMatch.length <= 11) {
        try {
          const res = await fetch(`/api/orders/track?phone=${phoneMatch}`);
          if (res.ok) {
            const data = await res.json();
            if (data.orders && data.orders.length > 0) {
              const latest = data.orders[0];
              const statusMap = {
                pending: '⏳ Đang chờ xác nhận',
                confirmed: '📦 Shop đã duyệt - Đang đóng gói',
                shipping: '🚚 Đang giao hỏa tốc Ninh Bình',
                completed: '✅ Đã giao thành công',
                cancelled: '❌ Đã hủy'
              };
              appendChatBubble(`
                📦 <strong>Tìm thấy ${data.orders.length} đơn hàng cho SĐT ${phoneMatch}:</strong><br><br>
                • <strong>Mã đơn:</strong> <code>${latest.id}</code><br>
                • <strong>Trạng thái:</strong> ${statusMap[latest.status] || latest.status}<br>
                • <strong>Tổng tiền:</strong> <strong>${window.formatVND(latest.totalAmount)}</strong> (${latest.paymentMethod === 'vietqr' ? 'VietQR' : 'COD'})<br>
                • <strong>Sản phẩm:</strong> ${(latest.items || []).map(i => `${i.title} (${i.size}) x${i.quantity}`).join(', ')}<br>
                • <strong>Địa chỉ:</strong> ${latest.address}, ${latest.district}<br><br>
                Cần giao gấp hoặc đổi địa chỉ, bạn gọi hotline <strong>0342.767.002</strong> nhé!
              `, 'bot');
              return;
            } else {
              appendChatBubble(`Không tìm thấy đơn hàng nào với số điện thoại <strong>${phoneMatch}</strong>. Bạn kiểm tra lại SĐT hoặc gọi hotline 0342.767.002 nhé!`, 'bot');
              return;
            }
          }
        } catch (e) {}
      }

      // 2. Check if user typed height/weight (e.g. 1m70, 65kg, 175cm)
      const heightMatch = lower.match(/(1m\d{2}|\d{3}\s*cm|\d{3})/);
      const weightMatch = lower.match(/(\d{2,3}\s*kg|\d{2,3})/);

      if ((lower.includes('size') || lower.includes('cao') || lower.includes('nặng') || lower.includes('kg')) && (heightMatch || weightMatch)) {
        let h = 170;
        let w = 60;
        if (heightMatch) {
          let raw = heightMatch[0].replace('cm', '').replace('1m', '1');
          if (raw.length === 3) h = Number(raw);
          else if (raw.length === 4) h = Number(raw.replace('.', ''));
        }
        if (weightMatch) {
          let raw = weightMatch[0].replace('kg', '').trim();
          w = Number(raw);
        }

        let recommended = 'L';
        let fitText = 'vừa vặn, thoải mái phong cách streetwear';
        if (w < 55) { recommended = 'M'; fitText = 'chuẩn form, không bị rộng'; }
        else if (w <= 68) { recommended = 'L'; fitText = 'form suông rộng rãi, vai trễ chuẩn vibe streetwear'; }
        else if (w <= 80) { recommended = 'XL'; fitText = 'form oversize thụng chất lừ'; }
        else { recommended = 'XXL'; fitText = 'form rộng rãi thoải mái tối đa'; }

        appendChatBubble(`
          📏 <strong>Tư Vấn Size Chuẩn Dành Cho Bạn:</strong><br><br>
          Với thông số khoảng <strong>${h}cm - ${w}kg</strong>, bạn nên chọn <strong>SIZE ${recommended}</strong> (${fitText}).<br><br>
          Shop hỗ trợ <strong>đổi size 7 ngày miễn phí tận nơi</strong> tại Ninh Bình nếu mặc không ưng ý nên bạn hoàn toàn an tâm nhé!
        `, 'bot');
        return;
      }

      // 3. Keyword matches
      if (lower.includes('ship') || lower.includes('vận chuyển') || lower.includes('bao lâu')) {
        appendChatBubble(`
          ⚡ Nguyen Tu Fashion giao <strong>hỏa tốc 2H</strong> trong TP. Ninh Bình & Yên Khánh. Các huyện khác nhận hàng trong ngày. Toàn quốc giao 2-3 ngày. Đơn từ 299K được <strong>FREESHIP</strong>!
        `, 'bot');
      } else if (lower.includes('đổi') || lower.includes('trả') || lower.includes('bảo hành')) {
        appendChatBubble(`
          🔄 Chính sách <strong>Đổi Hàng Trong 7 Ngày</strong>: Giữ nguyên tem mác, shop hỗ trợ shipper mang size mới đến tận nhà đổi cho bạn không mất phí đổi size!
        `, 'bot');
      } else if (lower.includes('địa chỉ') || lower.includes('ở đâu') || lower.includes('showroom') || lower.includes('cửa hàng')) {
        appendChatBubble(`
          📍 Showroom Nguyen Tu Fashion tọa lạc tại: <strong>Khánh Nhạc, Yên Khánh, Ninh Bình</strong>.<br>
          Mở cửa: 08:30 - 22:00 mỗi ngày. Mời bạn ghé showroom trải nghiệm không gian và thử đồ miễn phí!
        `, 'bot');
      } else if (lower.includes('giá') || lower.includes('khuyến mãi') || lower.includes('voucher') || lower.includes('mã')) {
        appendChatBubble(`
          🎁 Hiện shop đang có mã <code>NINHBINH</code> giảm 15% cho đơn đầu tiên và <code>FREESHIP</code> miễn phí giao hàng! Bạn nhập mã tại bước Giỏ Hàng/Thanh Toán nhé.
        `, 'bot');
      } else {
        appendChatBubble(`
          Cảm ơn bạn đã nhắn tin! Để được hỗ trợ nhanh nhất về mẫu này hoặc yêu cầu nhân viên tư vấn riêng, bạn có thể gọi ngay hotline <a href="tel:0342767002" style="color:var(--accent-gold); font-weight:800;">0342.767.002</a> hoặc nhắn qua Zalo nhé. Shop luôn sẵn sàng phục vụ!
        `, 'bot');
      }
    }, 400);
  };

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatWidget);
  } else {
    initChatWidget();
  }
})();
