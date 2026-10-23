/**
 * NGUYEN TU FASHION - COMMON & SHARED APPLICATION LOGIC
 * Manages Cart, Wishlist, Notifications, Live Search, Header and Navigation
 */

(function () {
  'use strict';

    // --------------------------------------------------------------------------
  // 0. EMBEDDED RESILIENT DATABASE FALLBACK (Offline & Standalone Ready)
  // --------------------------------------------------------------------------
  window.DEFAULT_PRODUCTS = [{"id":"nt-01","title":"Áo Khoác Gió Adidas Argentina 2024/25 \"AFA 3 Sao\" Trắng","category":"jacket","categoryName":"Áo Khoác Gió Thể Thao","price":480000,"oldPrice":580000,"rating":5,"reviews":4,"badge":"hot","isLocal":true,"image":"assets/images/products/ao-khoac-argentina-trang.png","imageHover":"assets/images/products/ao-khoac-argentina-trang.png","sizes":["M","L","XL","XXL"],"stock":{"M":20,"L":34,"XL":25,"XXL":15},"colors":["#ffffff","#75aadb","#111111"],"description":"Chất liệu vải dù gió 2 lớp cao cấp cản gió và chống nước nhẹ. Logo Adidas mạ vàng thêu nổi cùng huy hiệu AFA 3 sao World Cup danh giá. Phối sọc xanh lượn sóng biểu tượng hai bên tay áo.","isActive":true,"createdAt":"2026-10-18T10:00:00Z"},{"id":"nt-02","title":"Bộ Quần Áo Thể Thao Tracksuit Adidas Argentina \"AFA 3 Sao\" Đen","category":"tracksuit","categoryName":"Bộ Nỉ Thể Thao","price":650000,"oldPrice":790000,"rating":4.9,"reviews":214,"badge":"sale","isLocal":true,"image":"assets/images/products/bo-the-thao-argentina-den.png","imageHover":"assets/images/products/bo-the-thao-argentina-den.png","sizes":["M","L","XL","XXL"],"stock":{"M":18,"L":28,"XL":22,"XXL":12},"colors":["#111111","#ffffff"],"description":"Nguyên bộ tracksuit thể thao gồm áo khoác kéo khóa cổ cao và quần dài thể thao bo gấu. Chất vải thun nỉ Poly dệt kim co giãn 4 chiều, giữ ấm tốt và tôn dáng cực đỉnh.","isActive":true,"createdAt":"2026-10-18T11:00:00Z"},{"id":"nt-03","title":"Áo Khoác Gió FC Barcelona Retro Heritage Kem Phối Sọc Blaugrana","category":"jacket","categoryName":"Áo Khoác Gió Retro","price":490000,"oldPrice":590000,"rating":4.9,"reviews":142,"badge":"new","isLocal":false,"image":"assets/images/products/ao-khoac-barca-retro.png","imageHover":"assets/images/products/ao-khoac-barca-retro.png","sizes":["M","L","XL"],"stock":{"M":15,"L":25,"XL":18},"colors":["#f4f1ea","#a50044","#004d98"],"description":"Phiên bản retro huyền thoại của FC Barcelona với sắc trắng kem vintage. Bo cổ và gấu dệt sọc Senyera đỏ vàng cùng phối màu Blaugrana biểu tượng. Phom suông rộng phóng khoáng.","isActive":true,"createdAt":"2026-10-18T12:00:00Z"},{"id":"nt-04","title":"Áo Khoác Adidas Originals Kung Fu Tang Suit \"Khuy Tàu\" Xám Khói","category":"jacket","categoryName":"Áo Khoác Khuy Tàu","price":520000,"oldPrice":650000,"rating":5,"reviews":168,"badge":"hot","isLocal":true,"image":"assets/images/products/ao-khoac-adidas-khuy-tau.jpg","imageHover":"assets/images/products/ao-khoac-adidas-khuy-tau.jpg","sizes":["M","L","XL","XXL"],"stock":{"M":22,"L":30,"XL":20,"XXL":10},"colors":["#4b4f58","#e5e5e5"],"description":"Thiết kế độc bản giao thoa giữa võ thuật truyền thống Á Đông và phong cách đường phố đương đại. Điểm nhấn hàng nút khuy thắt sườn xám cài tàu thủ công trên nền nỉ da lộn wash xám khói.","isActive":true,"createdAt":"2026-10-18T13:00:00Z"},{"id":"nt-05","title":"Áo Khoác Nỉ Adidas Originals Beckenbauer Retro Cổ Cao Kem Cacao","category":"jacket","categoryName":"Áo Khoác Nỉ Retro","price":470000,"oldPrice":560000,"rating":4.8,"reviews":129,"badge":"new","isLocal":true,"image":"assets/images/products/ao-khoac-adidas-beckenbauer-kem.png","imageHover":"assets/images/products/ao-khoac-adidas-beckenbauer-kem.png","sizes":["M","L","XL"],"stock":{"M":16,"L":24,"XL":15},"colors":["#f7f4ec","#826656"],"description":"Kiểu dáng Beckenbauer bất hủ với cổ bẻ cao dựng trụ, gam màu kem vintage kết hợp bo viền màu nâu Cacao Mocha ấm áp. Chất nỉ dệt dày dặn, sang trọng và chuẩn phom.","isActive":true,"createdAt":"2026-10-18T14:00:00Z"},{"id":"nt-06","title":"Quần Short Dsquared2 \"D2 Lettering\" Phối Lá Phong Đỏ","category":"short","categoryName":"Quần Short Nam","price":350000,"oldPrice":450000,"rating":4.9,"reviews":115,"badge":"hot","isLocal":true,"image":"assets/images/products/quan-short-dsquared2-la-phong.png","imageHover":"assets/images/products/quan-short-dsquared2-la-phong.png","sizes":["M","L","XL","XXL"],"stock":{"M":20,"L":30,"XL":25,"XXL":10},"colors":["#111111","#ffffff","#dc2626"],"description":"Quần short Dsquared2 chất thun da cá dày dặn, in tràn chữ D2 all-over cá tính điểm xuyết lá phong đỏ Canada đặc trưng. Lưng thun co giãn dây rút thoải mái khi đi chơi, dạo phố.","isActive":true,"createdAt":"2026-10-18T15:00:00Z"},{"id":"nt-07","title":"Áo Sơ Mi Denim Louis Vuitton Damier Caro Xanh Nhạt","category":"shirt","categoryName":"Áo Sơ Mi Denim","price":420000,"oldPrice":520000,"rating":5,"reviews":148,"badge":"new","isLocal":true,"image":"assets/images/products/ao-so-mi-lv-damier-denim.png","imageHover":"assets/images/products/ao-so-mi-lv-damier-denim.png","sizes":["M","L","XL"],"stock":{"M":15,"L":22,"XL":16},"colors":["#7ba7cc","#f5f5f5"],"description":"Áo sơ mi cộc tay chất liệu denim dệt họa tiết ô cờ Damier Louis Vuitton kinh điển. Vải mềm mịn wash màu xanh khói nhẹ nhàng, cúc kim loại dập khắc tinh xảo.","isActive":true,"createdAt":"2026-10-18T16:00:00Z"},{"id":"nt-08","title":"Quần Short Louis Vuitton Monogram Watercolor Loang Nước","category":"short","categoryName":"Quần Short Hè","price":360000,"oldPrice":460000,"rating":4.8,"reviews":96,"badge":"new","isLocal":false,"image":"assets/images/products/quan-short-lv-monogram-nuoc.png","imageHover":"assets/images/products/quan-short-lv-monogram-nuoc.png","sizes":["M","L","XL","XXL"],"stock":{"M":18,"L":26,"XL":20,"XXL":12},"colors":["#2563eb","#ffffff"],"description":"Họa tiết hoa Monogram phong cách màu nước (Watercolor) nghệ thuật trên nền vải dù poly cao cấp mát lạnh, nhanh khô. Rất hợp đi biển, du lịch hoặc dạo hè.","isActive":true,"createdAt":"2026-10-18T17:00:00Z"},{"id":"nt-09","title":"Quần Short Dù Louis Vuitton Đỏ Mận Khóa Kéo Sau","category":"short","categoryName":"Quần Short Cao Cấp","price":380000,"oldPrice":490000,"rating":4.9,"reviews":132,"badge":"hot","isLocal":true,"image":"assets/images/products/quan-short-lv-do-man.png","imageHover":"assets/images/products/quan-short-lv-do-man.png","sizes":["M","L","XL"],"stock":{"M":14,"L":25,"XL":18},"colors":["#5a0d1d","#ffffff"],"description":"Tone màu đỏ mận (burgundy) sang trọng đồng điệu với thương hiệu NGUYEN TU FASHION. Túi sau viền khóa zip mạ bạc, chất dù vi dệt bóng mờ sang trọng, tặng kèm túi bọc đồ thời trang.","isActive":true,"createdAt":"2026-10-18T18:00:00Z"},{"id":"nt-10","title":"Quần Short Thể Thao Louis Vuitton Đen Thêu Chữ Ký Cursive","category":"short","categoryName":"Quần Short Thể Thao","price":340000,"oldPrice":430000,"rating":4.9,"reviews":165,"badge":"sale","isLocal":true,"image":"assets/images/products/quan-short-lv-den-theu.png","imageHover":"assets/images/products/quan-short-lv-den-theu.png","sizes":["M","L","XL","XXL"],"stock":{"M":22,"L":35,"XL":24,"XXL":14},"colors":["#111111","#38bdf8"],"description":"Quần short màu đen basic cực dễ phối đồ với thêu chữ ký Louis Vuitton uốn lượn sau túi và trước ống quần. Dây rút kim loại cao cấp dập nổi logo.","isActive":true,"createdAt":"2026-10-18T19:00:00Z"},{"id":"nt-11","title":"Áo Khoác Denim Louis Vuitton Đen Thêu Logo LV Ngực","category":"jacket","categoryName":"Áo Khoác Denim","price":490000,"oldPrice":590000,"rating":5,"reviews":175,"badge":"hot","isLocal":true,"image":"assets/images/products/ao-khoac-denim-lv-den.png","imageHover":"assets/images/products/ao-khoac-denim-lv-den.png","sizes":["M","L","XL","XXL"],"stock":{"M":15,"L":25,"XL":20,"XXL":10},"colors":["#1e1e1e","#b45309"],"description":"Chất liệu denim cotton dày dặn xử lý wash đen khói bụi bặm, form trucker jacket tôn dáng. Điểm nhấn logo LV thêu chỉ vàng đồng tinh tế trên túi ngực trái, khuy kim loại dập nổi sang trọng.","isActive":true,"createdAt":"2026-10-18T20:00:00Z"},{"id":"nt-12","title":"Quần Âu Nam NGUYEN TU Slimfit Đen Co Giãn Cao Cấp","category":"pants","categoryName":"Quần Âu Nam","price":320000,"oldPrice":420000,"rating":4.9,"reviews":198,"badge":"best","isLocal":true,"image":"assets/images/products/quan-au-nam-den-slimfit.png","imageHover":"assets/images/products/quan-au-nam-den-slimfit.png","sizes":["29","30","31","32","34"],"stock":{"29":20,"30":35,"31":30,"32":25,"34":15},"colors":["#111111"],"description":"Dáng slimfit đứng ống trẻ trung, chất vải tuyết mưa nhập khẩu mềm mịn, co giãn 4 chiều chống nhăn nhàu tối đa. Hoàn hảo khi phối cùng sơ mi, blazer hoặc áo polo công sở.","isActive":true,"createdAt":"2026-10-18T21:00:00Z"},{"id":"nt-13","title":"Quần Jean Louis Vuitton Monogram Denim Đen Trắng","category":"pants","categoryName":"Quần Jean Nam","price":450000,"oldPrice":560000,"rating":5,"reviews":142,"badge":"new","isLocal":false,"image":"assets/images/products/quan-jean-lv-monogram-den.png","imageHover":"assets/images/products/quan-jean-lv-monogram-den.png","sizes":["29","30","31","32","34"],"stock":{"29":16,"30":24,"31":20,"32":18,"34":12},"colors":["#18181b","#f4f4f5"],"description":"Quần jean ống suông thời thượng dệt họa tiết Monogram LV trắng tương phản trên nền denim đen. Kỹ thuật in laser chuẩn sắc nét, cúc đồng dập chìm, phong cách streetwear sang chảnh.","isActive":true,"createdAt":"2026-10-18T22:00:00Z"},{"id":"nt-14","title":"Quần Jean Louis Vuitton Xanh Khói Đắp Túi Monogram","category":"pants","categoryName":"Quần Jean Nam","price":430000,"oldPrice":540000,"rating":4.9,"reviews":126,"badge":"hot","isLocal":true,"image":"assets/images/products/quan-jean-lv-xanh-monogram-dui.png","imageHover":"assets/images/products/quan-jean-lv-xanh-monogram-dui.png","sizes":["29","30","31","32","34"],"stock":{"29":14,"30":22,"31":18,"32":16,"34":10},"colors":["#60a5fa","#e2e8f0"],"description":"Chất bò denim cao cấp wash xanh khói cổ điển, điểm nhấn 2 mảng đắp túi đùi họa tiết LV Monogram dập vân nổi cực chất. Form regular ôm nhẹ tôn dáng chân, đường may chỉ vàng chắc chắn.","isActive":true,"createdAt":"2026-10-18T23:00:00Z"},{"id":"nt-15","title":"Quần Jean Louis Vuitton Graffiti Họa Tiết Chữ All-Over","category":"pants","categoryName":"Quần Jean Nam","price":460000,"oldPrice":580000,"rating":4.9,"reviews":153,"badge":"new","isLocal":false,"image":"assets/images/products/quan-jean-lv-graffiti-chu.png","imageHover":"assets/images/products/quan-jean-lv-graffiti-chu.png","sizes":["29","30","31","32","34"],"stock":{"29":12,"30":20,"31":16,"32":15,"34":8},"colors":["#0f172a","#ffffff"],"description":"Thiết kế đột phá với họa tiết chữ graffiti uốn lượn phong cách đường phố Paris kết hợp chữ thư pháp Nhật Bản Katakana trắng trên nền denim đen chàm. Cá tính, nổi bật giữa đám đông.","isActive":true,"createdAt":"2026-10-19T00:00:00Z"},{"id":"nt-16","title":"Quần Short Louis Vuitton Trắng Kem Túi Dập Monogram","category":"short","categoryName":"Quần Short Hè","price":370000,"oldPrice":480000,"rating":4.9,"reviews":112,"badge":"new","isLocal":true,"image":"assets/images/products/quan-short-lv-trang-tui-monogram.png","imageHover":"assets/images/products/quan-short-lv-trang-tui-monogram.png","sizes":["M","L","XL","XXL"],"stock":{"M":16,"L":24,"XL":20,"XXL":10},"colors":["#f8fafc","#e2e8f0"],"description":"Chất thun nỉ da cá dệt mịn màu trắng kem thanh lịch, phối 2 túi ốp nổi bật với hoa văn Monogram dập vân tinh xảo. Lưng thun dây rút bọc đầu kim loại cao cấp dập logo Louis Vuitton.","isActive":true,"createdAt":"2026-10-19T01:00:00Z"},{"id":"nt-17","title":"Quần Short Dù Louis Vuitton Đen Lưng Monogram Thêu Chim","category":"short","categoryName":"Quần Short Thể Thao","price":390000,"oldPrice":510000,"rating":5,"reviews":184,"badge":"hot","isLocal":true,"image":"assets/images/products/quan-short-lv-den-lung-monogram-theu-chim.png","imageHover":"assets/images/products/quan-short-lv-den-lung-monogram-theu-chim.png","sizes":["M","L","XL","XXL"],"stock":{"M":20,"L":30,"XL":25,"XXL":15},"colors":["#111111","#d97706"],"description":"Thiết kế độc đáo với bản lưng thun dệt hoa văn Louis Vuitton Monogram chìm sang trọng, túi sau thêu đàn chim vàng bay lượn kết hợp chữ ký Vuitton nghệ thuật. Vải dù poly 2 lớp chống nước nhẹ.","isActive":true,"createdAt":"2026-10-19T02:00:00Z"},{"id":"nt-18","title":"Quần Short Dolce & Gabbana Pig King Bo Chun Cạp Sọc","category":"short","categoryName":"Quần Short Cao Cấp","price":360000,"oldPrice":470000,"rating":4.8,"reviews":98,"badge":"hot","isLocal":false,"image":"assets/images/products/quan-short-dg-chu-heo-king.png","imageHover":"assets/images/products/quan-short-dg-chu-heo-king.png","sizes":["M","L","XL","XXL"],"stock":{"M":15,"L":25,"XL":18,"XXL":12},"colors":["#111111","#5a0d1d","#ffffff"],"description":"Set quần short D&G họa tiết chú heo vương miện hoàng gia Pig King trên túi sau phong cách hoạt hình sang chảnh. Cạp chun thể thao phối 3 sọc thể thao co giãn thoải mái, tag logo kim loại D&G.","isActive":true,"createdAt":"2026-10-19T03:00:00Z"},{"id":"nt-19","title":"Quần Short Louis Vuitton Trắng Cạp Thun Đen Thêu Chữ Xanh","category":"short","categoryName":"Quần Short Hè","price":350000,"oldPrice":450000,"rating":4.9,"reviews":139,"badge":"new","isLocal":true,"image":"assets/images/products/quan-short-lv-trang-cap-den-theu-chu-xanh.png","imageHover":"assets/images/products/quan-short-lv-trang-cap-den-theu-chu-xanh.png","sizes":["M","L","XL","XXL"],"stock":{"M":18,"L":26,"XL":22,"XXL":14},"colors":["#ffffff","#111111","#059669"],"description":"Tone trắng tương phản cạp chun đen co giãn thể thao, dây luồn in logo Louis Vuitton chạy dọc. Ống quần thêu chữ nổi Louis Vuitton xanh ngọc lục bảo trẻ trung, năng động khi đi dạo hoặc tập gym.","isActive":true,"createdAt":"2026-10-19T04:00:00Z"},{"id":"nt-20","title":"Quần Short Gió Menfashion Đen Thêu Chữ Vàng Hoàng Gia","category":"short","categoryName":"Quần Short Gió","price":290000,"oldPrice":380000,"rating":4.8,"reviews":156,"badge":"sale","isLocal":true,"image":"assets/images/products/quan-short-gio-menfashion-den.png","imageHover":"assets/images/products/quan-short-gio-menfashion-den.png","sizes":["M","L","XL","XXL"],"stock":{"M":25,"L":35,"XL":30,"XXL":16},"colors":["#111111","#eab308"],"description":"Vải gió vi sợi siêu nhẹ, mát lạnh và nhanh khô. Form ống rộng ngang gối thoải mái vận động mùa hè. Điểm nhấn thêu chữ MENFASHION vàng kim sắc sảo, túi sâu có khóa kéo tiện lợi.","isActive":true,"createdAt":"2026-10-19T05:00:00Z"},{"id":"nt-21","title":"Áo Thun Berluti Paris Trắng Chữ Ký Thêu Nổi Đen","category":"tee","categoryName":"Áo Thun Nam","price":320000,"oldPrice":420000,"rating":4.9,"reviews":145,"badge":"hot","isLocal":true,"image":"assets/images/products/ao-thun-berluti-trang-chu-den.png","imageHover":"assets/images/products/ao-thun-berluti-trang-chu-den.png","sizes":["M","L","XL","XXL"],"stock":{"M":20,"L":30,"XL":25,"XXL":12},"colors":["#ffffff","#111111"],"description":"Chất liệu cotton 100% 2 chiều 250gsm dày dặn, đứng phom và thấm hút mồ hôi cực tốt. Điểm nhấn chữ ký thương hiệu Berluti Paris thêu nổi sắc sảo trước ngực, phong cách tối giản thanh lịch.","isActive":true,"createdAt":"2026-10-19T06:00:00Z"},{"id":"nt-22","title":"Áo Thun Louis Vuitton Trắng Classic Dập Vân Chìm Minimal","category":"tee","categoryName":"Áo Thun Nam","price":340000,"oldPrice":450000,"rating":5,"reviews":178,"badge":"best","isLocal":true,"image":"assets/images/products/ao-thun-lv-trang-classic-minimal.png","imageHover":"assets/images/products/ao-thun-lv-trang-classic-minimal.png","sizes":["M","L","XL","XXL"],"stock":{"M":22,"L":35,"XL":28,"XXL":14},"colors":["#ffffff"],"description":"Thiết kế chuẩn mực quiet luxury của Louis Vuitton với tone trắng tinh khôi, cổ bo gân dày dặn chống dão. Vải cotton compact dệt họa tiết vân chìm cao cấp, cực kỳ dễ phối cùng mọi loại quần.","isActive":true,"createdAt":"2026-10-19T07:00:00Z"},{"id":"nt-23","title":"Áo Thun Louis Vuitton Monogram All-Over Nâu Cà Phê","category":"tee","categoryName":"Áo Thun Cao Cấp","price":380000,"oldPrice":490000,"rating":4.9,"reviews":162,"badge":"new","isLocal":false,"image":"assets/images/products/ao-thun-lv-monogram-nau-coffee.png","imageHover":"assets/images/products/ao-thun-lv-monogram-nau-coffee.png","sizes":["M","L","XL","XXL"],"stock":{"M":16,"L":26,"XL":20,"XXL":10},"colors":["#451a03","#78350f"],"description":"Tone màu nâu mocha / cà phê trầm ấm sang trọng phủ trọn họa tiết hoa Monogram kinh điển của nhà mốt Louis Vuitton. Phom drop-shoulder vai trễ phóng khoáng theo xu hướng streetwear quốc tế.","isActive":true,"createdAt":"2026-10-19T08:00:00Z"},{"id":"nt-24","title":"Áo Thun Louis Vuitton Xanh Navy Thêu Chữ Ký Vuitton & Logo Lưng","category":"tee","categoryName":"Áo Thun Nam","price":360000,"oldPrice":470000,"rating":5,"reviews":195,"badge":"hot","isLocal":true,"image":"assets/images/products/ao-thun-lv-xanh-navy-theu-vuitton.png","imageHover":"assets/images/products/ao-thun-lv-xanh-navy-theu-vuitton.png","sizes":["M","L","XL","XXL"],"stock":{"M":24,"L":38,"XL":30,"XXL":18},"colors":["#1e3a5f","#ffffff","#eab308"],"description":"Sắc xanh navy tôn da, ngực áo thêu chữ ký cursive Vuitton trắng tinh tế, lưng áo in logo LV viền trắng cỡ lớn nổi bật kèm tab da vàng ở gáy áo chuẩn xịn. Cotton 100% co giãn thoáng khí.","isActive":true,"createdAt":"2026-10-19T09:00:00Z"},{"id":"nt-25","title":"Áo Thun Louis Vuitton Đỏ Mận Thêu Hoa Floral NGUYEN TU Edition","category":"tee","categoryName":"Áo Thun Limited","price":390000,"oldPrice":520000,"rating":5,"reviews":210,"badge":"new","isLocal":true,"image":"assets/images/products/ao-thun-lv-do-man-theu-hoa-floral.png","imageHover":"assets/images/products/ao-thun-lv-do-man-theu-hoa-floral.png","sizes":["M","L","XL","XXL"],"stock":{"M":20,"L":32,"XL":26,"XXL":15},"colors":["#4e0d19","#ffffff"],"description":"Tone đỏ mận burgundy đồng điệu tuyệt đối với màu nhận diện của NGUYEN TU FASHION. Lưng áo thêu nổi 3D chữ thư pháp Louis Vuitton bao quanh hoa văn Floral sắc màu tinh xảo kèm tab da vàng signature.","isActive":true,"createdAt":"2026-10-19T10:00:00Z"},{"id":"nt-26","title":"Áo Sơ Mi Cộc Tay Louis Vuitton Monogram Hoa Ren Khói Hawaii","category":"shirt","categoryName":"Áo Sơ Mi Hawaii","price":420000,"oldPrice":540000,"rating":5,"reviews":168,"badge":"hot","isLocal":true,"image":"assets/images/products/ao-so-mi-lv-monogram-hoa-ren-hawaii.png","imageHover":"assets/images/products/ao-so-mi-lv-monogram-hoa-ren-hawaii.png","sizes":["M","L","XL","XXL"],"stock":{"M":18,"L":28,"XL":22,"XXL":12},"colors":["#1e3a5f","#f1f5f9"],"description":"Chất lụa modal mềm rũ mát lạnh, dệt in họa tiết ren Monogram hoa lá trừu tượng tone xanh khói cổ điển phong cách resort Hawaii. Cổ bẻ mở phóng khoáng, cúc xà cừ sang trọng.","isActive":true,"createdAt":"2026-10-19T11:00:00Z"},{"id":"nt-27","title":"Áo Sơ Mi Trắng Dài Tay Louis Vuitton Logo Glitch Pixel","category":"shirt","categoryName":"Áo Sơ Mi Công Sở","price":390000,"oldPrice":490000,"rating":4.9,"reviews":142,"badge":"new","isLocal":true,"image":"assets/images/products/ao-so-mi-lv-trang-dai-tay-logo-pixel.png","imageHover":"assets/images/products/ao-so-mi-lv-trang-dai-tay-logo-pixel.png","sizes":["M","L","XL","XXL"],"stock":{"M":20,"L":35,"XL":25,"XXL":14},"colors":["#ffffff","#1e3a8a"],"description":"Chất vải bamboo sợi tre kháng khuẩn, chống nhăn tự nhiên và thấm hút mồ hôi. Điểm nhấn logo LV thêu hiệu ứng glitch pixel màu xanh navy trước ngực tạo nét phá cách hiện đại cho áo sơ mi công sở.","isActive":true,"createdAt":"2026-10-19T12:00:00Z"},{"id":"nt-28","title":"Áo Sơ Mi Trắng NGUYEN TU Cổ Đính Hoa Đá Ngọc Trai Dạ Tiệc","category":"shirt","categoryName":"Áo Sơ Mi Dạ Tiệc","price":450000,"oldPrice":580000,"rating":5,"reviews":215,"badge":"hot","isLocal":true,"image":"assets/images/products/ao-so-mi-trang-co-dinh-hoa-ngoc-trai.png","imageHover":"assets/images/products/ao-so-mi-trang-co-dinh-hoa-ngoc-trai.png","sizes":["M","L","XL","XXL"],"stock":{"M":15,"L":25,"XL":20,"XXL":10},"colors":["#ffffff"],"description":"Tuyệt phẩm áo sơ mi tiệc cao cấp với hàng cúc giấu nẹp tinh tế, hai ve cổ được đính kết thủ công hoa đá và ngọc trai trắng lấp lánh sang trọng. Chuẩn phong thái lịch lãm cho các sự kiện, dạ tiệc đẳng cấp.","isActive":true,"createdAt":"2026-10-19T13:00:00Z"},{"id":"nt-29","title":"Áo Sơ Mi Denim Louis Vuitton Cúc Ngọc Trai Thêu Cameo","category":"shirt","categoryName":"Áo Sơ Mi Denim","price":480000,"oldPrice":590000,"rating":5,"reviews":186,"badge":"best","isLocal":false,"image":"assets/images/products/ao-so-mi-denim-lv-cuc-ngoc-trai-theu-cameo.png","imageHover":"assets/images/products/ao-so-mi-denim-lv-cuc-ngoc-trai-theu-cameo.png","sizes":["M","L","XL","XXL"],"stock":{"M":14,"L":22,"XL":18,"XXL":8},"colors":["#1e293b","#d97706","#f8fafc"],"description":"Chất liệu denim thô wash xanh chàm vintage dày dặn, có thể mặc riêng hoặc khoác ngoài (overshirt). Nổi bật với hàng cúc ngọc trai tròn viền bạc và các chi tiết thêu logo LV chỉ vàng kết hợp hình chân dung Cameo quý phái.","isActive":true,"createdAt":"2026-10-19T14:00:00Z"},{"id":"nt-30","title":"Áo Sơ Mi Safari Louis Vuitton Kẻ Sọc Xanh Dây Rút Eo","category":"shirt","categoryName":"Áo Sơ Mi Safari","price":430000,"oldPrice":550000,"rating":4.9,"reviews":154,"badge":"new","isLocal":true,"image":"assets/images/products/ao-so-mi-lv-ke-soc-safari-day-rut-eo.png","imageHover":"assets/images/products/ao-so-mi-lv-ke-soc-safari-day-rut-eo.png","sizes":["M","L","XL","XXL"],"stock":{"M":18,"L":28,"XL":20,"XXL":12},"colors":["#ffffff","#2563eb"],"description":"Form safari jacket/shirt độc đáo với 2 túi hộp ngực có nắp, kẻ sọc pinstripe thanh mảnh tôn chiều cao. Thiết kế dây rút eo thể thao tùy chỉnh độ ôm dáng, cúc kim loại dập nổi thương hiệu.","isActive":true,"createdAt":"2026-10-19T15:00:00Z"},{"id":"nt-31","title":"Giày Sneaker Nike Air Jordan 1 Low Midnight Navy","category":"shoes","categoryName":"Giày Sneaker","price":850000,"oldPrice":1100000,"rating":5,"reviews":248,"badge":"hot","isLocal":true,"image":"assets/images/products/giay-nike-air-jordan-1-low-navy.png","imageHover":"assets/images/products/giay-nike-air-jordan-1-low-navy.png","sizes":["39","40","41","42","43"],"stock":{"39":10,"40":20,"41":25,"42":18,"43":12},"colors":["#1e3a5f","#ffffff","#eab308"],"description":"Phối màu Midnight Navy kinh điển với da hạt nhăn cao cấp kết hợp da trơn trắng tinh tế. Điểm nhấn logo thêu Jumpman vàng nổi bật trên lưỡi gà và logo Wings dập thêu sau gót. Đế đệm Air êm ái.","isActive":true,"createdAt":"2026-10-19T16:00:00Z"},{"id":"nt-32","title":"Giày Sneaker Nike Air Jordan 1 Low Đỏ Mận Bordeaux NGUYEN TU Edition","category":"shoes","categoryName":"Giày Sneaker Limited","price":890000,"oldPrice":1150000,"rating":5,"reviews":285,"badge":"best","isLocal":true,"image":"assets/images/products/giay-nike-air-jordan-1-low-do-man-bordeaux.png","imageHover":"assets/images/products/giay-nike-air-jordan-1-low-do-man-bordeaux.png","sizes":["39","40","41","42","43"],"stock":{"39":12,"40":25,"41":30,"42":20,"43":15},"colors":["#581c2b","#ffffff","#111111"],"description":"Tone màu đỏ mận Bordeaux quý tộc đồng điệu tuyệt đối cùng nhận diện thương hiệu NGUYEN TU FASHION. Dấu Swoosh đen tương phản trên nền da trắng cao cấp, chuẩn phong cách quý ông đường phố.","isActive":true,"createdAt":"2026-10-19T17:00:00Z"},{"id":"nt-33","title":"Giày Sneaker Nike Air Force 1 Low x Louis Vuitton Denim Monogram","category":"shoes","categoryName":"Giày Sneaker Luxury","price":980000,"oldPrice":1350000,"rating":5,"reviews":320,"badge":"hot","isLocal":false,"image":"assets/images/products/giay-nike-air-force-1-louis-vuitton-denim.png","imageHover":"assets/images/products/giay-nike-air-force-1-louis-vuitton-denim.png","sizes":["39","40","41","42","43"],"stock":{"39":8,"40":18,"41":22,"42":16,"43":10},"colors":["#ffffff","#1e3a8a"],"description":"Siêu phẩm hợp tác huyền thoại giữa Nike và Louis Vuitton phong cách Virgil Abloh. Thân giày dập vân hoa Monogram trắng sữa kết hợp dấu Swoosh bằng vải denim dệt họa tiết LV xanh chàm độc bản.","isActive":true,"createdAt":"2026-10-19T18:00:00Z"},{"id":"nt-34","title":"Giày Sneaker Nike Air Jordan 1 Low Vintage Navy Sail Đế Ngà","category":"shoes","categoryName":"Giày Sneaker","price":860000,"oldPrice":1120000,"rating":4.9,"reviews":196,"badge":"new","isLocal":true,"image":"assets/images/products/giay-nike-air-jordan-1-low-vintage-navy-sail.png","imageHover":"assets/images/products/giay-nike-air-jordan-1-low-vintage-navy-sail.png","sizes":["39","40","41","42","43"],"stock":{"39":10,"40":22,"41":24,"42":18,"43":10},"colors":["#1e293b","#fef3c7","#d97706"],"description":"Vibe vintage retro cổ điển với đế giữa màu vàng ngà (Aged Sail), thân giày da lộn phối da trơn màu kem vani và xanh navy đậm. Dây buộc dệt xơ cổ điển, logo Jumpman thêu chỉ vàng đồng sang trọng.","isActive":true,"createdAt":"2026-10-19T19:00:00Z"},{"id":"nt-35","title":"Giày Sneaker Adidas Originals Samba OG Trắng Sọc Đen Đế Gum","category":"shoes","categoryName":"Giày Sneaker Retro","price":790000,"oldPrice":990000,"rating":4.9,"reviews":340,"badge":"hot","isLocal":false,"image":"assets/images/products/giay-adidas-samba-og-trang-soc-den.png","imageHover":"assets/images/products/giay-adidas-samba-og-trang-soc-den.png","sizes":["39","40","41","42","43"],"stock":{"39":15,"40":30,"41":35,"42":25,"43":18},"colors":["#ffffff","#111111","#78350f"],"description":"Đôi giày quốc dân đang làm mưa làm gió trong giới thời trang thế giới. Chất liệu da mềm cao cấp phối mũi da lộn chữ T màu xám tro, 3 sọc da đen răng cưa và đế cao su nâu gum bám đường cực tốt.","isActive":true,"createdAt":"2026-10-19T20:00:00Z"},{"id":"nt-36","title":"Mũ Lưỡi Trai Louis Vuitton Monogram Hoa Ren Xanh Khói","category":"hat","categoryName":"Mũ & Nón Nam","price":280000,"oldPrice":360000,"rating":4.9,"reviews":172,"badge":"hot","isLocal":true,"image":"assets/images/products/mu-luoi-trai-lv-monogram-hoa-ren-denim.png","imageHover":"assets/images/products/mu-luoi-trai-lv-monogram-hoa-ren-denim.png","sizes":["Freesize"],"stock":{"Freesize":40},"colors":["#1e3a5f","#f1f5f9"],"description":"Chất liệu vải denim dệt họa tiết Monogram kết hợp hoa lá ren phong cách Hawaii, tone xoẹt tone hoàn hảo cùng áo sơ mi nt-26. Khóa kim loại dập nổi logo phía sau tùy chỉnh vòng đầu êm ái.","isActive":true,"createdAt":"2026-10-19T21:00:00Z"},{"id":"nt-37","title":"Mũ Bucket Tai Bèo Louis Vuitton Denim Monogram Thêu Hoa","category":"hat","categoryName":"Mũ Bucket Nam","price":320000,"oldPrice":420000,"rating":5,"reviews":198,"badge":"best","isLocal":true,"image":"assets/images/products/mu-bucket-lv-denim-monogram-theu-hoa.png","imageHover":"assets/images/products/mu-bucket-lv-denim-monogram-theu-hoa.png","sizes":["Freesize"],"stock":{"Freesize":35},"colors":["#1e293b","#f8fafc"],"description":"Dáng mũ bucket vành tròn trẻ trung, chất vải jean denim xanh wash phủ kín logo LV Monogram kèm các bông hoa nổi 3D đa sắc màu. Vành nón may dập 4 đường chỉ chắc chắn, che nắng cực tốt khi du lịch, dạo phố.","isActive":true,"createdAt":"2026-10-19T22:00:00Z"},{"id":"nt-38","title":"Mũ Lưỡi Trai Nike Heritage 86 Trắng Thêu Swoosh Đen","category":"hat","categoryName":"Mũ Thể Thao","price":220000,"oldPrice":290000,"rating":4.9,"reviews":260,"badge":"hot","isLocal":true,"image":"assets/images/products/mu-luoi-trai-nike-heritage-trang-swoosh-den.png","imageHover":"assets/images/products/mu-luoi-trai-nike-heritage-trang-swoosh-den.png","sizes":["Freesize"],"stock":{"Freesize":50},"colors":["#ffffff","#111111"],"description":"Mẫu nón kết quốc dân form mềm Heritage 86, chất vải 100% cotton twill thoáng mát, thấm hút mồ hôi. Logo Nike Swoosh thêu 3D nổi bật trước trán, quai cài kim loại mạ bạc chống rỉ sét.","isActive":true,"createdAt":"2026-10-19T23:00:00Z"},{"id":"nt-39","title":"Mũ Lưỡi Trai Adidas Họa Tiết Hoa Cỏ Dại Sketch Màu Kem","category":"hat","categoryName":"Mũ Thể Thao","price":240000,"oldPrice":320000,"rating":4.8,"reviews":135,"badge":"new","isLocal":false,"image":"assets/images/products/mu-luoi-trai-adidas-hoa-co-sketch-kem.png","imageHover":"assets/images/products/mu-luoi-trai-adidas-hoa-co-sketch-kem.png","sizes":["Freesize"],"stock":{"Freesize":30},"colors":["#fef3c7","#78350f"],"description":"Tone màu kem vintage ấm áp điểm xuyết họa tiết hoa cỏ dại vẽ nét phác thảo (sketch) nghệ thuật. Logo Adidas 3 thanh dập nổi silicone màu trắng tinh tế, phù hợp cho cả đi chơi và thể thao golf.","isActive":true,"createdAt":"2026-10-20T00:00:00Z"},{"id":"nt-40","title":"Mũ Lưỡi Trai Adidas Đồ Họa Zig-Zag Xanh Trắng Thể Thao","category":"hat","categoryName":"Mũ Thể Thao","price":250000,"oldPrice":330000,"rating":4.9,"reviews":148,"badge":"new","isLocal":true,"image":"assets/images/products/mu-luoi-trai-adidas-do-hoa-zig-zag-xanh-trang.png","imageHover":"assets/images/products/mu-luoi-trai-adidas-do-hoa-zig-zag-xanh-trang.png","sizes":["Freesize"],"stock":{"Freesize":35},"colors":["#1e3a8a","#ffffff"],"description":"Họa tiết ziczac hình khối đồ họa năng động xanh navy và trắng tương phản, chất vải poly tái chế nhẹ tênh chống tia UV. Khóa dán điều chỉnh nhanh phía sau cùng logo thêu chữ ký thể thao bên hông.","isActive":true,"createdAt":"2026-10-20T01:00:00Z"},{"id":"nt-41","title":"Áo Thun Louis Vuitton Hộp Chữ Đồ Chơi Xếp Hình Trắng","category":"tee","categoryName":"Áo Thun Nam","price":380000,"oldPrice":480000,"rating":4.9,"reviews":184,"badge":"hot","isLocal":true,"image":"assets/images/products/ao-thun-lv-xep-hinh-building-blocks-trang.png","imageHover":"assets/images/products/ao-thun-lv-xep-hinh-building-blocks-trang.png","sizes":["M","L","XL","2XL"],"stock":{"M":25,"L":40,"XL":30,"2XL":15},"colors":["#ffffff","#ec4899","#3b82f6"],"description":"Chất liệu 100% cotton 2 chiều 250gsm dày dặn, đứng phom. Điểm nhấn là họa tiết in đồ họa hộp chữ xếp hình Louis Vuitton đa sắc màu sáng tạo, phối cùng con súc sắc monogram rơi phía dưới trẻ trung, cá tính.","isActive":true,"createdAt":"2026-10-20T02:00:00Z"},{"id":"nt-42","title":"Áo Thun Nike x Louis Vuitton Drip Swoosh Monogram","category":"tee","categoryName":"Áo Thun Nam","price":390000,"oldPrice":490000,"rating":5,"reviews":245,"badge":"best","isLocal":true,"image":"assets/images/products/ao-thun-nike-lv-drip-swoosh-monogram.png","imageHover":"assets/images/products/ao-thun-nike-lv-drip-swoosh-monogram.png","sizes":["M","L","XL","2XL"],"stock":{"M":30,"L":45,"XL":35,"2XL":20},"colors":["#111111","#ffffff","#78350f"],"description":"Sự kết hợp bùng nổ giữa tinh thần thể thao Nike và sự xa xỉ của Louis Vuitton. Biểu tượng dấu Swoosh dệt họa tiết LV Monogram da nâu hiệu ứng sơn tan chảy (drip) độc đáo trên nền áo đen & trắng, tag cam sang trọng.","isActive":true,"createdAt":"2026-10-20T03:00:00Z"},{"id":"nt-43","title":"Áo Thun Louis Vuitton Họa Tiết Phác Thảo Chim & Ruy Băng Kem","category":"tee","categoryName":"Áo Thun Nam","price":420000,"oldPrice":520000,"rating":4.9,"reviews":167,"badge":"new","isLocal":true,"image":"assets/images/products/ao-thun-lv-chim-va-ruy-bang-kem.png","imageHover":"assets/images/products/ao-thun-lv-chim-va-ruy-bang-kem.png","sizes":["M","L","XL","2XL"],"stock":{"M":20,"L":35,"XL":25,"2XL":15},"colors":["#fef3c7","#1c1917"],"description":"Thiết kế hội họa nghệ thuật đỉnh cao với dải ruy băng uốn lượn tạo hình logo LV lồng ghép đôi chim bồ câu tung cánh theo phong cách phác thảo nét chì than (charcoal sketch). Gam màu trắng kem vintage trang nhã.","isActive":true,"createdAt":"2026-10-20T04:00:00Z"},{"id":"nt-44","title":"Áo Thun Polo Louis Vuitton Cổ Bẻ Xanh Navy Thêu Logo Ngực","category":"tee","categoryName":"Áo Polo Nam","price":450000,"oldPrice":580000,"rating":4.9,"reviews":192,"badge":"hot","isLocal":false,"image":"assets/images/products/ao-polo-lv-navy-theu-logo-nguc.png","imageHover":"assets/images/products/ao-polo-lv-navy-theu-logo-nguc.png","sizes":["M","L","XL","2XL"],"stock":{"M":25,"L":35,"XL":30,"2XL":15},"colors":["#1e293b","#f1f5f9"],"description":"Dáng áo polo cổ bẻ lịch lãm chuẩn quý ông streetwear, chất vải thun cá sấu pique cao cấp co giãn 4 chiều thoáng khí. Ngực áo thêu vi tính logo LV màu trắng bạc cách điệu cùng các đốm hoa monogram thanh lịch.","isActive":true,"createdAt":"2026-10-20T05:00:00Z"},{"id":"nt-45","title":"Áo Thun Louis Vuitton Thêu Lưng Phong Cảnh Chùa & Núi Phú Sĩ","category":"tee","categoryName":"Áo Thun Nam","price":450000,"oldPrice":590000,"rating":5,"reviews":215,"badge":"best","isLocal":true,"image":"assets/images/products/ao-thun-lv-theu-lung-chua-nhat-ban-navy.png","imageHover":"assets/images/products/ao-thun-lv-theu-lung-chua-nhat-ban-navy.png","sizes":["M","L","XL","2XL"],"stock":{"M":20,"L":40,"XL":30,"2XL":15},"colors":["#1e293b","#ffffff"],"description":"Kiệt tác thời trang với bức tranh thêu chỉ nổi toàn bộ sau lưng mô phỏng phong cảnh chùa cổ 5 tầng và núi Phú Sĩ Nhật Bản phối cùng logo Paris LV. Form áo oversize rộng rủ phóng khoáng trên nền xanh navy đậm.","isActive":true,"createdAt":"2026-10-20T06:00:00Z"},{"id":"nt-46","title":"Túi Trống Du Lịch Louis Vuitton Keepall Bandoulière 55 Monogram","category":"bag","categoryName":"Túi Du Lịch Nam","price":1250000,"oldPrice":1650000,"rating":5,"reviews":142,"badge":"best","isLocal":true,"image":"assets/images/products/tui-trong-lv-keepall-55-monogram-nau.png","imageHover":"assets/images/products/tui-trong-lv-keepall-55-monogram-nau.png","sizes":["55cm"],"stock":{"55cm":20},"colors":["#78350f","#d97706"],"description":"Biểu tượng du lịch xa xỉ vượt thời gian kể từ năm 1930. Chất liệu Canvas Monogram phủ lớp chống thấm nước bền bỉ, quai xách đôi bằng da bò tự nhiên Vachetta may chỉ vàng nổi bật, phụ kiện khóa mạ vàng đồng sang trọng và dây đeo vai tháo rời linh hoạt.","isActive":true,"createdAt":"2026-10-20T07:00:00Z"},{"id":"nt-47","title":"Túi Cầm Tay Clutch Louis Vuitton Toiletry Pouch 26 Monogram","category":"bag","categoryName":"Túi Clutch Cầm Tay","price":680000,"oldPrice":890000,"rating":4.9,"reviews":188,"badge":"hot","isLocal":true,"image":"assets/images/products/tui-clutch-lv-toiletry-pouch-monogram.png","imageHover":"assets/images/products/tui-clutch-lv-toiletry-pouch-monogram.png","sizes":["26cm"],"stock":{"26cm":35},"colors":["#78350f","#fef3c7"],"description":"Mẫu clutch cầm tay dáng hộp rộng rãi size 26 đựng vừa iPad mini, điện thoại, ví tiền và mỹ phẩm tiện lợi. Họa tiết hoa monogram nâu huyền thoại, lót trong bằng da hạt cao cấp dễ dàng lau chùi, khóa kéo mạ vàng mượt mà.","isActive":true,"createdAt":"2026-10-20T08:00:00Z"},{"id":"nt-48","title":"Balo Phượt Nam Louis Vuitton Christopher PM Monogram Eclipse Đen","category":"bag","categoryName":"Balo Nam Cao Cấp","price":1450000,"oldPrice":1950000,"rating":5,"reviews":164,"badge":"best","isLocal":true,"image":"assets/images/products/balo-lv-christopher-backpack-monogram-eclipse-den.png","imageHover":"assets/images/products/balo-lv-christopher-backpack-monogram-eclipse-den.png","sizes":["PM"],"stock":{"PM":25},"colors":["#1e293b","#111111"],"description":"Chiếc balo quân đội tái hiện phong cách dã ngoại sành điệu trong chất liệu Monogram Eclipse xám đen nam tính. Thiết kế nắp gập khóa bấm cài da thật, hai ngăn phụ tiện dụng bên hông và khoang chứa rộng có ngăn riêng cho laptop 15.6 inch.","isActive":true,"createdAt":"2026-10-20T09:00:00Z"},{"id":"nt-49","title":"Balo Nam Louis Vuitton Discovery Monogram Denim Xanh Wash","category":"bag","categoryName":"Balo Nam Cao Cấp","price":1350000,"oldPrice":1750000,"rating":4.9,"reviews":129,"badge":"new","isLocal":false,"image":"assets/images/products/balo-lv-discovery-denim-monogram-xanh-wash.png","imageHover":"assets/images/products/balo-lv-discovery-denim-monogram-xanh-wash.png","sizes":["Standard"],"stock":{"Standard":20},"colors":["#1e3a8a","#ffffff"],"description":"Chất vải Jean Denim xanh wash loang phủ kín hoa văn Monogram màu trắng bụi bặm, đậm chất streetwear giới trẻ. Form balo hình vòm ôm lưng êm ái với đệm mút lưới thoáng khí, phối quai da và khóa kéo khắc logo LV tinh xảo.","isActive":true,"createdAt":"2026-10-20T10:00:00Z"},{"id":"nt-50","title":"Túi Đeo Chéo Nam Louis Vuitton S-Lock Messenger Da Taurillon Đen Nhám","category":"bag","categoryName":"Túi Đeo Chéo Nam","price":950000,"oldPrice":1250000,"rating":4.9,"reviews":175,"badge":"hot","isLocal":true,"image":"assets/images/products/tui-deo-cheo-lv-s-lock-messenger-da-taurillon-den.png","imageHover":"assets/images/products/tui-deo-cheo-lv-s-lock-messenger-da-taurillon-den.png","sizes":["Freesize"],"stock":{"Freesize":30},"colors":["#111111","#1f2937"],"description":"Kiểu dáng messenger hình hộp vuông vức thời thượng chế tác từ da bò Taurillon dập nổi vân Monogram sâu sắc nét. Điểm nhấn là khóa bấm S-Lock đen nhám lấy cảm hứng từ khóa rương cổ điển năm 1886 của hãng, quai đeo bản to dệt chữ Louis Vuitton nổi.","isActive":true,"createdAt":"2026-10-20T11:00:00Z"}];
  window.DEFAULT_COUPONS = [{"code":"NINHBINH","description":"Giảm 15% cho cư dân Ninh Bình","discountPercent":15,"discountAmount":0,"minOrder":299000,"maxDiscount":150000,"isActive":true,"usageCount":39,"expiry":"2026-12-31"},{"code":"LUONGVANTUY","description":"Ưu đãi học sinh sinh viên THPT Lương Văn Tụy & Ninh Bình","discountPercent":20,"discountAmount":0,"minOrder":250000,"maxDiscount":200000,"isActive":true,"usageCount":19,"expiry":"2026-12-31"},{"code":"STREETWEAR50K","description":"Giảm trực tiếp 50.000₫ cho đơn từ 400.000₫","discountPercent":0,"discountAmount":50000,"minOrder":400000,"maxDiscount":50000,"isActive":true,"usageCount":42,"expiry":"2026-12-31"},{"code":"FREESHIP","description":"Miễn phí vận chuyển toàn quốc cho đơn từ 199.000₫","discountPercent":0,"discountAmount":30000,"minOrder":199000,"maxDiscount":30000,"isActive":true,"usageCount":55,"expiry":"2026-12-31"}];
  window.DEFAULT_SETTINGS = {"storeName":"NGUYEN TU FASHION","hotline":"0342.767.002","address":"Khánh Nhạc - Ninh Bình","vietqr":{"bankId":"970422","bankName":"MB Bank","accountNo":"0988888888","accountName":"NGUYEN TU FASHION","template":"compact2"},"email":"ntu16053@gmail.com","facebook":"https://www.facebook.com/share/1EuzNVRiqY/?mibextid=wwXIfr","zalo":"https://zalo.me/0342767002"};
  window.DEFAULT_ARTICLES = [{"id":"art-01","title":"Top 5 xu hướng Streetwear thống trị giới trẻ 2026: Từ Blokecore đến Gorpcore","slug":"top-5-xu-huong-streetwear-2026","category":"trends","categoryName":"Xu Hướng Thời Trang","author":"Nguyen Tu Stylist","publishDate":"15/10/2026","readTime":"5 phút đọc","views":1420,"thumbnail":"assets/images/products/ao-khoac-argentina-trang.png","excerpt":"Khám phá sự trỗi dậy mạnh mẽ của phong cách áo khoác gió thể thao Blokecore, quần túi hộp Parachute và xu hướng thời trang đường phố năng động dành cho giới trẻ.","content":[{"type":"paragraph","text":"Thời trang đường phố (Streetwear) năm 2026 đang chứng kiến sự chuyển mình mạnh mẽ với sự giao thoa giữa tính ứng dụng thể thao (Blokecore) và tinh thần việt dã bụi bặm (Gorpcore). Giới trẻ không còn chỉ tìm kiếm những bộ cánh thời thượng mà còn đòi hỏi sự thoải mái, chất liệu thoáng khí cản gió và tính đa dụng trong mọi hoàn cảnh thời tiết."},{"type":"heading","text":"1. Blokecore - Sức hút bất tận từ áo thể thao & bóng đá"},{"type":"paragraph","text":"Lấy cảm hứng từ những chiếc áo khoác gió đội tuyển, áo đấu retro thập niên 90 và những đôi sneakers cổ điển, Blokecore đã nhanh chóng trở thành phong cách được giới trẻ Ninh Bình săn đón cuồng nhiệt. Những chiếc áo khoác gió phối sọc thể thao như Adidas Argentina AFA hay Barcelona Retro mang lại diện mạo vừa hoài cổ vừa tràn đầy năng lượng."},{"type":"image","src":"assets/images/products/ao-khoac-argentina-trang.png","caption":"Áo khoác gió thể thao retro - Must-have item của mọi tín đồ Blokecore"},{"type":"heading","text":"2. Parachute Pants & Cargo Pants - Phom dáng thùng phóng khoáng"},{"type":"paragraph","text":"Tạm biệt những chiếc quần bó sát gò bó, quần túi hộp chất vải dù parachute với dây rút thông minh ở gấu quần đang là biểu tượng của sự tự do. Bạn có thể biến tấu từ dáng suông rộng rãi sang dáng jogger bo gấu thể thao chỉ trong một nốt nhạc."},{"type":"heading","text":"3. Oversized Graphic Tee - Tuyên ngôn cá tính không lời"},{"type":"paragraph","text":"Áo thun form rộng tay lỡ với chất cotton 2 chiều 250gsm dày dặn, hình in lụa nổi bật mặt sau luôn là lựa chọn hàng đầu cho các buổi dạo phố, tụ tập bạn bè tại Cố Đô."}],"relatedProducts":["nt-01","nt-02","nt-03"]},{"id":"art-02","title":"Bí quyết phối đồ chuẩn vibe Ninh Bình với Áo Khoác Gió Retro & Quần Suông","slug":"bi-quyet-phoi-do-ao-khoac-gio-retro","category":"mix-match","categoryName":"Mẹo Phối Đồ","author":"Tu Nguyen","publishDate":"12/10/2026","readTime":"4 phút đọc","views":980,"thumbnail":"assets/images/products/bo-the-thao-argentina-den.png","excerpt":"Hướng dẫn phối layer cực chất cho những ngày thời tiết se lạnh. Cách kết hợp màu sắc tương phản và chọn phụ kiện đi kèm để outfit của bạn luôn nổi bật.","content":[{"type":"paragraph","text":"Thời tiết miền Bắc khi giao mùa luôn là cơ hội tuyệt vời để các bạn trẻ thể hiện kỹ năng phối đồ layer nhiều lớp. Một chiếc áo khoác gió vừa cản gió hiệu quả, vừa là điểm nhấn phong cách hoàn hảo."},{"type":"heading","text":"Quy tắc 1: Tương phản trên - dưới (Oversized Top + Straight Bottom)"},{"type":"paragraph","text":"Nếu bạn mặc một chiếc áo khoác gió phom rộng vai trễ, hãy kết hợp với một chiếc quần ống suông vừa vặn hoặc quần nỉ jogger để tạo tỉ lệ cơ thể cân đối, tránh cảm giác rườm rà luộm thuộm."},{"type":"heading","text":"Quy tắc 2: Phối màu 3 sắc thái (60-30-10)"},{"type":"paragraph","text":"Hãy giữ 60% gam màu trung tính (đen, trắng, xám khói), 30% màu bổ trợ và 10% điểm nhấn rực rỡ từ đôi giày sneaker hoặc chiếc mũ lưỡi trai cá tính."}],"relatedProducts":["nt-02","nt-04","nt-05"]},{"id":"art-03","title":"Hướng dẫn chọn size chuẩn xác không cần thử đồ tại Nguyen Tu Fashion","slug":"huong-dan-chon-size-chuan-xac","category":"guide","categoryName":"Cẩm Nang Chọn Size","author":"CSKH Nguyen Tu","publishDate":"08/10/2026","readTime":"3 phút đọc","views":2150,"thumbnail":"assets/images/showroom-flagship-ninhbinh.jpg","excerpt":"Đừng lo lắng khi mua sắm online! Bảng quy đổi chiều cao cân nặng chuẩn xác 99% giúp bạn luôn chọn được form áo tôn dáng nhất ngay lần mua đầu tiên.","content":[{"type":"paragraph","text":"Một trong những nỗi lo lớn nhất của khách hàng khi mua sắm thời trang trực tuyến là việc chọn nhầm size áo quần. Tại Nguyen Tu Fashion, toàn bộ sản phẩm đều được may theo thông số chuẩn form giới trẻ Việt Nam với độ co giãn và rũ dáng tối ưu."},{"type":"heading","text":"Bảng size chuẩn theo chiều cao & cân nặng"},{"type":"paragraph","text":"• Size M: Dành cho chiều cao từ 1m55 - 1m68, cân nặng 48kg - 58kg (Vừa vặn thoải mái)\n• Size L: Dành cho chiều cao từ 1m65 - 1m75, cân nặng 58kg - 70kg (Chuẩn streetwear oversize nhẹ)\n• Size XL: Dành cho chiều cao từ 1m72 - 1m82, cân nặng 70kg - 82kg (Form thụng rộng rãi cá tính)\n• Size XXL: Dành cho chiều cao trên 1m78, cân nặng 80kg - 95kg."},{"type":"heading","text":"Đặc quyền đổi size 7 ngày miễn phí tại Ninh Bình"},{"type":"paragraph","text":"Nếu nhận hàng mà không vừa ý hoặc muốn đổi size rộng/chật hơn, shipper Nguyen Tu Fashion sẽ đến tận nhà đổi size mới cho bạn trong vòng 24H mà bạn không cần phải ra bưu cục gửi hàng."}],"relatedProducts":["nt-01","nt-03","nt-06"]},{"id":"art-04","title":"Khám phá Showroom Nguyen Tu Fashion Khánh Nhạc - Trải nghiệm mua sắm đẳng cấp","slug":"kham-pha-showroom-nguyen-tu-khanh-nhac","category":"story","categoryName":"Cửa Hàng & Không Gian","author":"Nguyen Tu Team","publishDate":"01/10/2026","readTime":"4 phút đọc","views":1820,"thumbnail":"assets/images/showroom-flagship-ninhbinh.jpg","excerpt":"Tọa lạc tại vị trí đắc địa Khánh Nhạc - Ninh Bình, showroom mang phong cách kiến trúc công nghiệp hiện đại, là điểm hẹn check-in và mua sắm lý tưởng của giới trẻ.","content":[{"type":"paragraph","text":"Showroom Nguyen Tu Fashion tại Khánh Nhạc, Yên Khánh, Ninh Bình tự hào là một trong những không gian thời trang đường phố được đầu tư bài bản và hiện đại bậc nhất khu vực. Với diện tích trưng bày thoáng đãng cùng hệ thống ánh sáng chuẩn studio, mọi góc tại cửa hàng đều có thể trở thành background sống ảo cực chất."},{"type":"image","src":"assets/images/showroom-flagship-ninhbinh.jpg","caption":"Toàn cảnh không gian showroom thời trang Nguyen Tu Fashion Khánh Nhạc"},{"type":"heading","text":"Trải nghiệm thử đồ riêng tư & tư vấn chuyên nghiệp"},{"type":"paragraph","text":"Phòng thử đồ rộng rãi với gương nịnh dáng toàn thân ánh sáng vàng ấm, cùng đội ngũ stylist trẻ trung nhiệt tình sẽ tư vấn giúp bạn tìm được set đồ ưng ý nhất."}],"relatedProducts":["nt-04","nt-05","nt-01"]},{"id":"art-05","title":"Cách giặt và bảo quản áo thun in lụa, áo khoác gió luôn bền màu như mới","slug":"cach-giat-va-bao-quan-ao-streetwear","category":"guide","categoryName":"Cẩm Nang Quần Áo","author":"Kỹ Thuật May Mặc","publishDate":"25/09/2026","readTime":"3 phút đọc","views":1100,"thumbnail":"assets/images/products/ao-khoac-adidas-khuy-tau.jpg","excerpt":"Những mẹo đơn giản nhưng cực kỳ hữu ích giúp các hình in lụa không bị bong tróc, vải gió không bị mất lớp chống thấm và form áo luôn giữ được độ đứng đẹp.","content":[{"type":"paragraph","text":"Để những bộ đồ streetwear yêu thích luôn giữ được màu sắc tươi mới và phom dáng nguyên vẹn sau nhiều lần giặt, việc bảo quản đúng cách đóng vai trò vô cùng quan trọng."},{"type":"heading","text":"1. Lộn trái áo trước khi giặt và phơi"},{"type":"paragraph","text":"Việc lộn trái giúp bề mặt hình in lụa và logo thêu không bị ma sát trực tiếp với lồng giặt hoặc ánh nắng gay gắt, giúp hình in không bị nứt vỡ theo thời gian."},{"type":"heading","text":"2. Không sử dụng nước nóng & chất tẩy mạnh"},{"type":"paragraph","text":"Chỉ nên giặt bằng nước lạnh hoặc nước ấm dưới 30 độ C. Nước nóng có thể làm co rút sợi vải cotton tự nhiên và làm giãn các sợi elastane đàn hồi."}],"relatedProducts":["nt-03","nt-04","nt-06"]}];
  window.DEFAULT_ORDERS = [{"id":"NT-NB1024","customerName":"Trần Quốc Hưng","customerPhone":"0988123456","district":"TP. Ninh Bình","address":"Số 48 Đường Lương Văn Tụy, P. Tân Thành","items":[{"productId":"nt-01","title":"Áo Khoác Gió Adidas Argentina 2024/25 \"AFA 3 Sao\" Trắng","size":"L","color":"#ffffff","price":480000,"quantity":1,"image":"assets/images/products/ao-khoac-argentina-trang.png"},{"productId":"nt-03","title":"Áo Khoác Gió FC Barcelona Retro Heritage Kem Phối Sọc","size":"L","color":"#f4f1ea","price":490000,"quantity":1,"image":"assets/images/products/ao-khoac-barca-retro.png"}],"subtotal":970000,"discountAmount":145500,"couponCode":"NINHBINH","shippingFee":0,"totalAmount":824500,"paymentMethod":"vietqr","paymentStatus":"paid","status":"shipping","shippingNote":"Giao hỏa tốc 2H trước 17h chiều tại Lương Văn Tụy","createdAt":"2026-10-18T09:15:00Z","timeline":[{"status":"pending","time":"2026-10-18T09:15:00Z","note":"Đơn hàng đã được tạo qua VietQR"},{"status":"confirmed","time":"2026-10-18T09:25:00Z","note":"Shop đã xác nhận đơn & kiểm tra thanh toán"},{"status":"shipping","time":"2026-10-18T10:10:00Z","note":"Shipper hỏa tốc Ninh Bình đang giao hàng"}]},{"id":"NT-NB1025","customerName":"Lê Mai Anh","customerPhone":"0912345678","district":"Huyện Hoa Lư","address":"Thôn Đam Khê, Xã Ninh Hải","items":[{"productId":"nt-02","title":"Bộ Quần Áo Thể Thao Tracksuit Adidas Argentina \"AFA 3 Sao\" Đen","size":"M","color":"#111111","price":650000,"quantity":1,"image":"assets/images/products/bo-the-thao-argentina-den.png"}],"subtotal":650000,"discountAmount":0,"couponCode":null,"shippingFee":0,"totalAmount":650000,"paymentMethod":"cod","paymentStatus":"unpaid","status":"pending","shippingNote":"Giao vào buổi tối sau 18h","createdAt":"2026-10-14T13:40:00Z","timeline":[{"status":"pending","time":"2026-10-14T13:40:00Z","note":"Đơn hàng mới chờ shop xác nhận"}]},{"id":"NT-NB1020","customerName":"Hoàng Anh Tuấn","customerPhone":"0977889900","district":"TP. Ninh Bình","address":"15 Trần Hưng Đạo, P. Đông Thành","items":[{"productId":"nt-04","title":"Nón Kết Lưỡi Trai Signature NT Crown Thêu Nổi 3D","size":"Free Size","color":"#000000","price":189000,"quantity":1,"image":"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80"},{"productId":"nt-08","title":"Túi Đeo Chéo Mini Techwear Chống Nước NT Tactical","size":"Free Size","color":"#111111","price":219000,"quantity":1,"image":"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80"}],"subtotal":408000,"discountAmount":50000,"couponCode":"STREETWEAR50K","shippingFee":0,"totalAmount":358000,"paymentMethod":"cod","paymentStatus":"paid","status":"completed","shippingNote":"Khách đã nhận hàng và khen chất vải tốt","createdAt":"2026-10-13T15:20:00Z","timeline":[{"status":"pending","time":"2026-10-13T15:20:00Z","note":"Đơn hàng được tạo"},{"status":"confirmed","time":"2026-10-13T15:35:00Z","note":"Shop đã đóng gói"},{"status":"shipping","time":"2026-10-13T16:00:00Z","note":"Shipper giao hỏa tốc"},{"status":"completed","time":"2026-10-13T17:15:00Z","note":"Giao hàng thành công - Thu tiền COD 358.000₫"}]}];

  window.getStoredProducts = function () {
    try {
      localStorage.removeItem('nguyentu_deleted_product_ids');
    } catch (e) {}
    let list = null;
    try {
      const stored = localStorage.getItem('nguyentu_cached_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) list = parsed;
      }
    } catch (e) {}

    if (!list) {
      list = (window.DEFAULT_PRODUCTS || []).slice();
    }

    // Đã loại bỏ bộ lọc xóa client để luôn hiển thị đầy đủ danh mục sản phẩm

    return list;
  };

  // Eagerly initialize ALL_PRODUCTS right away so UI never waits or fails
  window.ALL_PRODUCTS = window.getStoredProducts();

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

  window.getColorVietnameseName = function (hex) {
    if (!hex) return 'Mặc định';
    const cleanHex = String(hex).toLowerCase().trim();
    const map = {
      '#111111': 'Đen Classic',
      '#000000': 'Đen',
      '#1e1e1e': 'Đen Nhám',
      '#0f172a': 'Đen Chàm',
      '#18181b': 'Đen Khói',
      '#ffffff': 'Trắng Basic',
      '#f7f4ec': 'Trắng Kem Vintage',
      '#f4f1ea': 'Kem Retro',
      '#fef3c7': 'Kem Vani',
      '#f8fafc': 'Trắng Sữa',
      '#f5f5f5': 'Trắng Xám',
      '#f1f5f9': 'Xanh Khói Nhạt',
      '#826656': 'Nâu Cacao Mocha',
      '#78350f': 'Nâu Cà Phê',
      '#451a03': 'Nâu Trầm',
      '#4b4f58': 'Xám Khói',
      '#e5e5e5': 'Ghi Sáng',
      '#e2e8f0': 'Ghi Bạc',
      '#75aadb': 'Xanh AFA Argentina',
      '#38bdf8': 'Xanh Baby',
      '#60a5fa': 'Xanh Denim',
      '#2563eb': 'Xanh Coban',
      '#1e3a5f': 'Xanh Midnight Navy',
      '#1e3a8a': 'Xanh Navy Đậm',
      '#004d98': 'Xanh Blaugrana',
      '#a50044': 'Đỏ Rượu Barca',
      '#581c2b': 'Đỏ Mận Bordeaux',
      '#4e0d19': 'Đỏ Burgundy Nguyen Tu',
      '#5a0d1d': 'Đỏ Rượu Vang',
      '#dc2626': 'Đỏ Tươi',
      '#ff334b': 'Đỏ Neon',
      '#eab308': 'Vàng Hoàng Gia',
      '#d97706': 'Vàng Bò Da Lộn',
      '#fbbf24': 'Vàng Kim',
      '#059669': 'Xanh Ngọc Lục Bảo',
      '#ec4899': 'Hồng Pastel'
    };
    if (map[cleanHex]) return map[cleanHex];
    if (cleanHex.startsWith('#')) return 'Màu ' + cleanHex.toUpperCase();
    return cleanHex;
  };


  // Toast Notification
  window.showToast = function (message, type = 'success', actionLink = null, actionText = null) {
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
    let actionBtnHtml = '';
    if (actionLink && actionText) {
      actionBtnHtml = `<a href="${actionLink}" style="margin-left:8px; padding:3px 10px; background:rgba(255,255,255,0.22); border-radius:4px; color:#fff; font-weight:700; text-decoration:none; font-size:11px; white-space:nowrap; display:inline-block;">${actionText}</a>`;
    }
    toast.innerHTML = `
      <span style="background:${type==='success'?'var(--accent-green)':'var(--accent-red)'}; width:22px; height:22px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:#fff; font-size:12px; font-weight:800; flex-shrink:0;">${icon}</span>
      <span style="flex:1;">${message}</span>
      ${actionBtnHtml}
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => { if (toast.parentNode) toast.remove(); }, 400);
    }, 3600);
  };

  // --------------------------------------------------------------------------
  // 2. GLOBAL CART STATE (LOCALSTORAGE) & UNIVERSAL SYNC
  // --------------------------------------------------------------------------
  window.getCart = function () {
    try {
      const raw = JSON.parse(localStorage.getItem('nguyentu_cart') || '[]');
      if (!Array.isArray(raw)) return [];
      return raw.map(item => {
        const q = Math.max(1, Number(item.qty || item.quantity || 1));
        let p = Number(item.price);
        if (isNaN(p) || p <= 0) p = 450000;
        let op = Number(item.oldPrice);
        if (isNaN(op) || op <= 0) op = Math.round(p * 1.25);
        const pid = item.productId || item.id || 'item-' + Date.now();
        return {
          ...item,
          id: pid,
          productId: pid,
          title: item.title || 'Sản phẩm ' + pid,
          image: item.image || 'assets/images/products/ao-khoac-argentina-trang.png',
          category: item.category || 'streetwear',
          size: item.size || 'M',
          color: item.color || '#111111',
          qty: q,
          quantity: q,
          price: p,
          oldPrice: op
        };
      });
    } catch (e) {
      return [];
    }
  };

  window.saveCart = function (cart) {
    try {
      localStorage.setItem('nguyentu_cart', JSON.stringify(cart));
    } catch (e) {}
    window.syncCartState();
  };

  window.addToCart = function (productId, size = 'M', color = '#111111', quantity = 1, productData = null) {
    const cart = window.getCart();
    quantity = Math.max(1, Number(quantity) || 1);

    // If product details not provided, try to find in window.ALL_PRODUCTS or fetch
    let item = productData;
    if (!item && window.ALL_PRODUCTS) {
      item = window.ALL_PRODUCTS.find(p => p.id === productId);
    }

    const existingIndex = cart.findIndex(c => (c.productId === productId || c.id === productId) && c.size === size && c.color === color);

    if (existingIndex > -1) {
      const cur = Math.max(1, Number(cart[existingIndex].quantity || cart[existingIndex].qty || 1));
      cart[existingIndex].quantity = cur + quantity;
      cart[existingIndex].qty = cur + quantity;
    } else {
      let price = item ? Number(item.price) : 450000;
      if (isNaN(price) || price <= 0) price = 450000;
      let oldPrice = item ? Number(item.oldPrice) : 550000;
      if (isNaN(oldPrice) || oldPrice <= 0) oldPrice = Math.round(price * 1.25);

      cart.push({
        id: productId,
        productId: productId,
        title: item ? item.title : 'Sản phẩm ' + productId,
        price: price,
        oldPrice: oldPrice,
        image: item ? item.image : 'assets/images/products/ao-khoac-argentina-trang.png',
        category: item ? item.category : 'jacket',
        size: size,
        color: color,
        quantity: quantity,
        qty: quantity
      });
    }

    window.saveCart(cart);
    window.showToast(`Đã thêm "${item ? item.title : 'sản phẩm'}" (${size}) vào giỏ hàng!`, 'success', 'cart.html', 'Xem Giỏ Hàng →');

    // Trigger custom event for reactive UI update
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
  };

  window.removeFromCart = function (index, silent = false) {
    const cart = window.getCart();
    if (index >= 0 && index < cart.length) {
      const removed = cart.splice(index, 1)[0];
      window.saveCart(cart);
      if (!silent) {
        window.showToast(`Đã xóa sản phẩm khỏi giỏ hàng`, 'info');
      }
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart, removed } }));
      return removed;
    }
    return null;
  };

  window.updateCartQuantity = function (index, delta) {
    const cart = window.getCart();
    if (index >= 0 && index < cart.length) {
      const cur = Math.max(1, Number(cart[index].quantity || cart[index].qty || 1));
      const newQty = cur + delta;
      if (newQty <= 0) {
        window.removeFromCart(index);
      } else {
        cart[index].quantity = newQty;
        cart[index].qty = newQty;
        window.saveCart(cart);
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
      }
    }
  };

  // Cross-compatibility aliases
  window.updateCartQty = function (index, delta) { window.updateCartQuantity(index, delta); };
  window.removeCartItem = function (index) { window.removeFromCart(index); };

  window.clearCart = function () {
    localStorage.removeItem('nguyentu_cart');
    window.syncCartState();
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: [] } }));
  };

  window.getCartSubtotal = function () {
    const cart = window.getCart();
    return cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * Math.max(1, Number(item.quantity || item.qty || 1))), 0);
  };

  window.getCartCount = function () {
    const cart = window.getCart();
    return cart.reduce((sum, item) => sum + Math.max(1, Number(item.quantity || item.qty || 1)), 0);
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
  // UNIVERSAL CART DRAWER & REACTIVE SYNC (BFCACHE, CROSS-TAB, RESILIENT)
  // --------------------------------------------------------------------------
  window.renderUniversalCartDrawer = function () {
    const drawerBody = document.getElementById('drawer-cart-items');
    if (!drawerBody) return;

    const cart = window.getCart();
    const subtotal = window.getCartSubtotal();
    const FREE_SHIP_THRESHOLD = 299000;

    const subtotalEl = document.getElementById('cart-subtotal-val');
    const finalTotalEl = document.getElementById('cart-final-total');
    const freeShipText = document.getElementById('free-ship-message');
    const freeShipProgress = document.getElementById('free-ship-progress-bar');

    if (cart.length === 0) {
      drawerBody.innerHTML = `
        <div class="empty-cart-state" style="text-align:center; padding:40px 20px;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 12px; display:block; opacity:0.5;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          <p style="color:var(--text-secondary); margin-bottom:16px;">Giỏ hàng của bạn đang trống trơn!</p>
          <button class="btn btn-dark" style="font-size:0.8125rem; padding:8px 20px;" onclick="window.closeCartDrawer()">Lướt Đồ Ngay</button>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = window.formatVND(0);
      if (finalTotalEl) finalTotalEl.textContent = window.formatVND(0);
      if (freeShipProgress) freeShipProgress.style.width = '0%';
      if (freeShipText) freeShipText.innerHTML = `Freeship đơn từ <strong>299.000đ</strong> tại Ninh Bình`;
      return;
    }

    const remainingForFreeShip = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
    const shipPercent = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));

    if (freeShipProgress) freeShipProgress.style.width = `${shipPercent}%`;
    if (freeShipText) {
      if (remainingForFreeShip === 0) {
        freeShipText.innerHTML = `🎉 <strong>CHÚC MỪNG:</strong> Bạn đã được <strong>FREESHIP NỘI THÀNH NINH BÌNH</strong>!`;
      } else {
        freeShipText.innerHTML = `Mua thêm <strong>${window.formatVND(remainingForFreeShip)}</strong> để được <strong>FREESHIP NINH BÌNH</strong>!`;
      }
    }

    if (subtotalEl) subtotalEl.textContent = window.formatVND(subtotal);
    if (finalTotalEl) finalTotalEl.textContent = window.formatVND(subtotal);

    drawerBody.innerHTML = cart.map((item, idx) => {
      const itemQty = Math.max(1, Number(item.qty || item.quantity || 1));
      const itemPrice = Number(item.price) || 0;
      return `
        <div class="cart-item" style="display:flex; gap:12px; padding:12px 0; border-bottom:1px solid var(--border-light);">
          <img class="cart-item-img" src="${item.image || 'assets/images/products/ao-khoac-argentina-trang.png'}" alt="${item.title}" style="width:64px; height:64px; object-fit:cover; border-radius:6px; background:#1e1e1e;">
          <div class="cart-item-details" style="flex:1; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <h4 class="cart-item-title" style="font-size:0.875rem; font-weight:700; margin:0 0 4px; line-height:1.3; color:#fff;">${item.title}</h4>
              <div class="cart-item-attr" style="font-size:0.75rem; color:var(--text-secondary);">Size: <strong>${item.size || 'M'}</strong> | Màu: <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${item.color || '#111'};vertical-align:middle;border:1px solid #ccc;"></span></div>
            </div>
            <div class="cart-item-bottom" style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
              <div class="qty-control" style="display:inline-flex; align-items:center; border:1px solid var(--border-light); border-radius:4px; height:28px;">
                <button class="qty-btn" onclick="window.updateCartQuantity(${idx}, -1)" style="width:28px; height:100%; border:none; background:none; color:#fff; cursor:pointer; font-weight:bold;">-</button>
                <span class="qty-num" style="min-width:24px; text-align:center; font-size:0.8125rem;">${itemQty}</span>
                <button class="qty-btn" onclick="window.updateCartQuantity(${idx}, 1)" style="width:28px; height:100%; border:none; background:none; color:#fff; cursor:pointer; font-weight:bold;">+</button>
              </div>
              <div class="cart-item-price" style="font-weight:700; color:var(--accent-red); font-size:0.875rem;">${window.formatVND(itemPrice * itemQty)}</div>
            </div>
            <span class="cart-item-remove" onclick="window.removeFromCart(${idx})" style="font-size:0.75rem; color:var(--text-muted); cursor:pointer; align-self:flex-start; margin-top:4px; text-decoration:underline;">Xóa</span>
          </div>
        </div>
      `;
    }).join('');
  };

  window.openCartDrawer = function () {
    window.syncCartState();
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCartDrawer = function () {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.syncCartState = function () {
    window.updateCartCounters();
    if (typeof window.renderUniversalCartDrawer === 'function') {
      window.renderUniversalCartDrawer();
    }
    if (typeof window.renderCartTable === 'function') {
      window.renderCartTable();
    }
    if (typeof window.renderOrderSummary === 'function') {
      window.renderOrderSummary();
    }
  };

  // Cross-tab synchronization
  window.addEventListener('storage', (e) => {
    if (!e || e.key === 'nguyentu_cart' || e.key === 'nguyentu_wishlist') {
      window.syncCartState();
    }
  });

  // Browser back/forward navigation (bfcache)
  window.addEventListener('pageshow', () => {
    window.syncCartState();
  });

  // Internal reactive updates
  window.addEventListener('cartUpdated', () => {
    window.syncCartState();
  });

// --------------------------------------------------------------------------
  // 4. COMMON HEADER BEHAVIOR (STICKY, MOBILE MENU, SEARCH)
  // --------------------------------------------------------------------------
  window.toggleMobileMenu = function () {
    const drawer = document.getElementById('mobile-nav-drawer');
    if (!drawer) return;
    if (drawer.classList.contains('active')) {
      window.closeMobileMenu();
    } else {
      window.openMobileMenu();
    }
  };

  window.openMobileMenu = function () {
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeMobileMenu = function () {
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
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
          const matchKey = Object.keys(overrides).find(k => k.toLowerCase() === (p.id || '').toLowerCase());
          if (matchKey) {
            Object.assign(p, overrides[matchKey]);
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
        if (data.products && Array.isArray(data.products)) {
          window.ALL_PRODUCTS = data.products;
          try {
            localStorage.setItem('nguyentu_cached_products', JSON.stringify(data.products));
          } catch (e) {}
        }
      }
    } catch (e) {
      console.warn('API fetch offline or file:// protocol, using embedded catalog');
    }

    if (!window.ALL_PRODUCTS || window.ALL_PRODUCTS.length === 0) {
      window.ALL_PRODUCTS = window.getStoredProducts();
    }

        try {
      localStorage.removeItem('nguyentu_deleted_product_ids');
    } catch (e) {}

    if (window.applyPriceOverrides) {
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
    // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // 6. GLOBAL "ĐƠN HÀNG CỦA BẠN" & ORDER TRACKING MODAL (FULL FEATURES)
  // Features: Sản phẩm đã đặt, Nút Hủy Đơn Hàng (Báo Telegram dòng đỏ), Nút Đánh Giá
  // --------------------------------------------------------------------------
  window.fillAndTrackOrder = function (query) {
    const input = document.getElementById('order-tracking-input');
    if (input) {
      input.value = query;
      window.performOrderTracking();
    }
  };

  // Mở modal Đơn Hàng Của Bạn
  window.openMyOrdersModal = function (prefillQuery = '') {
    if (typeof window.closeMobileMenu === 'function') {
      window.closeMobileMenu();
    }

    let modal = document.getElementById('order-tracking-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'order-tracking-modal';
      modal.className = 'modal-overlay';
      modal.style.zIndex = '100050';
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          modal.classList.remove('active');
        }
      });
    }

    modal.innerHTML = `
      <div class="modal-card" style="max-width:680px; width:95%; max-height:90vh; overflow-y:auto; padding:24px; border:1px solid rgba(255,255,255,0.12); box-shadow:0 25px 60px rgba(0,0,0,0.9); border-radius:16px; background:linear-gradient(180deg, #22040b 0%, #120205 100%);">
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:14px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:1.8rem; line-height:1;">📦</span>
            <div>
              <h3 style="font-family:var(--font-heading); font-size:1.2rem; font-weight:900; text-transform:uppercase; margin:0; letter-spacing:0.02em; color:#fff;">ĐƠN HÀNG CỦA BẠN</h3>
              <p style="font-size:0.775rem; color:var(--text-muted); margin:2px 0 0;">Quản lý đơn đã đặt, hủy đơn trực tuyến và đánh giá chất lượng sản phẩm</p>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <a href="orders.html" style="font-size:0.75rem; color:var(--accent-red); font-weight:700; text-decoration:none; padding:4px 8px; border:1px solid rgba(255,51,75,0.3); border-radius:6px; background:rgba(255,51,75,0.08);" title="Xem toàn màn hình">
              Toàn màn hình ↗
            </a>
            <button onclick="document.getElementById('order-tracking-modal').classList.remove('active')" aria-label="Đóng" style="font-size:1.8rem; line-height:1; color:#fff; background:none; border:none; cursor:pointer; padding:2px 6px; opacity:0.8; transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">&times;</button>
          </div>
        </div>

        <!-- Search Bar -->
        <div style="display:flex; gap:8px; margin-bottom:12px;">
          <input type="text" id="order-tracking-input" class="custom-input" placeholder="Nhập SĐT hoặc Mã đơn hàng (VD: NT-NB1024)..." style="flex:1; height:44px; font-size:0.875rem; border:1.5px solid rgba(255,255,255,0.2);" onkeydown="if(event.key==='Enter') window.performOrderTracking();">
          <button class="btn btn-primary" id="order-tracking-btn" onclick="window.performOrderTracking()" style="height:44px; padding:0 20px; font-weight:700; white-space:nowrap; display:inline-flex; align-items:center; gap:6px;">
            <span>🔍</span> Tra Cứu
          </button>
        </div>

        <!-- Quick suggestion pills -->
        <div id="order-tracking-quick-suggestions" style="margin-bottom:16px; display:flex; flex-wrap:wrap; gap:6px; align-items:center; font-size:0.75rem; color:var(--text-muted);">
          <span>Gợi ý:</span>
          <span id="order-recent-badge-slot"></span>
          <button type="button" onclick="window.loadSavedOrdersInModal()" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); color:#fff; padding:3px 10px; border-radius:12px; cursor:pointer; font-size:0.72rem;">Tất cả đơn của tôi</button>
        </div>

        <!-- Results Area -->
        <div id="order-tracking-result" style="min-height:120px;">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;

    modal.classList.add('active');

    // Tự động nạp danh sách đơn gần đây của khách nếu không có query
    if (prefillQuery && prefillQuery.trim()) {
      const input = document.getElementById('order-tracking-input');
      if (input) input.value = prefillQuery.trim();
      window.performOrderTracking();
    } else {
      window.loadSavedOrdersInModal();
    }
  };

  // Giữ alias cho tương thích ngược
  window.openOrderTrackingModal = window.openMyOrdersModal;

  // Nạp danh sách đơn lưu trong localStorage vào modal
  window.loadSavedOrdersInModal = async function () {
    const resultDiv = document.getElementById('order-tracking-result');
    if (!resultDiv) return;

    try {
      const savedOrders = JSON.parse(localStorage.getItem('nt_my_orders') || '[]');
      const recentOrder = JSON.parse(localStorage.getItem('nt_recent_order') || 'null');
      const map = new Map();

      if (recentOrder && recentOrder.id) map.set(recentOrder.id, recentOrder);
      savedOrders.forEach(o => { if (o && o.id) map.set(o.id, o); });
      const orders = Array.from(map.values());

      // Update badge slot
      const badgeSlot = document.getElementById('order-recent-badge-slot');
      if (badgeSlot && recentOrder && recentOrder.id) {
        badgeSlot.innerHTML = `<button type="button" onclick="window.fillAndTrackOrder('${recentOrder.id}')" style="background:rgba(239,68,68,0.18); border:1px solid var(--accent-red); color:#fff; padding:3px 10px; border-radius:12px; cursor:pointer; font-size:0.72rem; font-weight:700;">⚡ Đơn gần nhất: ${recentOrder.id}</button>`;
      }

      if (orders.length === 0) {
        resultDiv.innerHTML = `
          <div style="text-align:center; padding:36px 14px; background:rgba(0,0,0,0.25); border-radius:10px; border:1px dashed rgba(255,255,255,0.1);">
            <div style="font-size:2.4rem; margin-bottom:10px;">🛍️</div>
            <h4 style="font-size:1.05rem; font-weight:800; color:#fff; margin-bottom:6px;">BẠN CHƯA CÓ ĐƠN HÀNG NÀO</h4>
            <p style="font-size:0.8125rem; color:var(--text-secondary); margin-bottom:16px;">Nhập số điện thoại đã từng đặt hàng vào ô bên trên để tra cứu toàn bộ đơn cũ của bạn.</p>
            <a href="products.html" class="btn btn-primary" style="display:inline-block; padding:10px 20px; font-size:0.8125rem; font-weight:700;">
              Khám Phá Sản Phẩm Ngay
            </a>
          </div>
        `;
        return;
      }

      resultDiv.innerHTML = '<div style="text-align:center; padding:24px; color:var(--text-muted);"><span style="display:inline-block; animation:spin 1s linear infinite; margin-right:8px;">⏳</span> Đang đồng bộ trạng thái đơn hàng...</div>';

      // Live sync from server for each order
      const synced = await Promise.all(orders.map(async ord => {
        try {
          const res = await fetch('/api/orders/' + encodeURIComponent(ord.id));
          if (res.ok) {
            const d = await res.json();
            if (d.success && d.order) return d.order;
          }
        } catch (e) {}
        return ord;
      }));

      // Update local storage
      localStorage.setItem('nt_my_orders', JSON.stringify(synced.slice(0, 15)));
      window.renderOrdersInModal(synced);
    } catch (e) {
      console.error('[Load Saved Orders Modal Error]', e);
    }
  };

  // Tra cứu theo query
  window.performOrderTracking = async function () {
    const input = document.getElementById('order-tracking-input');
    const btn = document.getElementById('order-tracking-btn');
    const resultDiv = document.getElementById('order-tracking-result');
    if (!input || !resultDiv) return;

    const query = input.value.trim();
    if (!query) {
      window.showToast('Vui lòng nhập SĐT hoặc mã đơn hàng!', 'error');
      input.focus();
      return;
    }

    if (btn) btn.disabled = true;
    resultDiv.innerHTML = '<div style="text-align:center; padding:32px; color:var(--text-muted);"><span style="display:inline-block; animation:spin 1s linear infinite; margin-right:8px;">⏳</span> Đang tra cứu dữ liệu đơn hàng...</div>';

    try {
      const isId = query.toUpperCase().startsWith('NT-') || /^[a-zA-Z]/.test(query);
      const param = isId ? `orderId=${encodeURIComponent(query)}` : `phone=${encodeURIComponent(query)}`;
      let orders = [];

      try {
        const res = await fetch(`/api/orders/track?${param}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.orders)) {
            orders = data.orders;
          }
        }
      } catch (networkErr) {
        console.warn('Backend tracking unreachable:', networkErr);
      }

      // Fallback local
      if (orders.length === 0) {
        try {
          const myOrders = JSON.parse(localStorage.getItem('nt_my_orders') || '[]');
          const recentOrder = JSON.parse(localStorage.getItem('nt_recent_order') || 'null');
          const allLocal = [...myOrders];
          if (recentOrder && !allLocal.find(o => o.id === recentOrder.id)) allLocal.unshift(recentOrder);

          const cleanQuery = query.toLowerCase().replace(/\s+/g, '');
          orders = allLocal.filter(o => {
            const mId = (o.id || '').toLowerCase();
            const mPhone = (o.customerPhone || '').replace(/\s+/g, '');
            return mId === cleanQuery || mPhone === cleanQuery;
          });
        } catch (localErr) {}
      }

      if (orders.length === 0) {
        resultDiv.innerHTML = `
          <div style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.25); border-radius:10px; padding:24px; text-align:center;">
            <div style="font-size:2rem; margin-bottom:8px;">🔍</div>
            <p style="color:#f87171; font-weight:700; font-size:1rem; margin-bottom:6px;">Không tìm thấy đơn hàng "${query}"!</p>
            <p style="font-size:0.8125rem; color:var(--text-secondary); margin:0 0 14px;">Vui lòng kiểm tra lại số điện thoại hoặc mã đơn hàng đã nhập khi đặt mua.</p>
            <div style="font-size:0.8125rem; color:var(--text-muted);">
              Cần hỗ trợ gấp? Gọi ngay Hotline: <a href="tel:0342767002" style="color:var(--accent-gold); font-weight:800;">0342.767.002</a>
            </div>
          </div>
        `;
        return;
      }

      window.renderOrdersInModal(orders);
    } catch (err) {
      console.error('[Order Track Error]', err);
      resultDiv.innerHTML = '<div style="color:#f87171; text-align:center; padding:20px;">Lỗi kết nối máy chủ tra cứu! Vui lòng thử lại sau.</div>';
    } finally {
      if (btn) btn.disabled = false;
    }
  };

  // Render danh sách đơn trong modal với Nút HỦY ĐƠN HÀNG & Nút ĐÁNH GIÁ
  window.renderOrdersInModal = function (orders) {
    const resultDiv = document.getElementById('order-tracking-result');
    if (!resultDiv) return;

    const statusMap = {
      pending: { label: 'Chờ xác nhận', color: '#fbbf24', step: 1 },
      confirmed: { label: 'Đã duyệt & Đóng gói', color: '#38bdf8', step: 2 },
      shipping: { label: 'Đang giao hỏa tốc 2H', color: '#c084fc', step: 3 },
      completed: { label: 'Giao hàng thành công', color: '#34d399', step: 4 },
      cancelled: { label: 'Đã hủy', color: '#f87171', step: 0 }
    };

    resultDiv.innerHTML = orders.map(order => {
      const st = statusMap[order.status] || { label: order.status || 'Chờ xác nhận', color: '#fbbf24', step: 1 };
      const items = order.items || [];
      const currentStep = st.step;
      const isCancelled = order.status === 'cancelled';
      const canCancel = (order.status === 'pending' || order.status === 'confirmed') && !isCancelled;
      const totalStr = window.formatVND ? window.formatVND(order.totalAmount || 0) : ((order.totalAmount || 0).toLocaleString('vi-VN') + '₫');

      return `
        <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:18px; margin-bottom:16px;">
          <!-- Order Card Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:0.75rem; color:var(--text-muted);">Mã đơn:</span>
              <strong style="color:var(--accent-red); font-size:1.05rem; letter-spacing:0.04em;">#${order.id}</strong>
              <button type="button" onclick="navigator.clipboard.writeText('${order.id}'); window.showToast('Đã chép mã: ${order.id}', 'success');" style="background:rgba(255,255,255,0.08); border:none; color:#ddd; padding:2px 6px; border-radius:4px; font-size:0.7rem; cursor:pointer;">Chép</button>
            </div>
            <span style="font-size:0.75rem; font-weight:800; padding:4px 12px; border-radius:14px; background:${st.color}22; color:${st.color}; border:1px solid ${st.color};">
              ${st.label.toUpperCase()}
            </span>
          </div>

          <!-- Cancel Warning Callout if Cancelled -->
          ${isCancelled ? `
            <div style="background:rgba(239,68,68,0.12); border-left:3px solid #ef4444; padding:8px 12px; border-radius:4px; margin-bottom:12px; font-size:0.8rem; color:#fca5a5;">
              🚫 <strong>ĐƠN HÀNG ĐÃ HỦY:</strong> ${order.cancelReason || 'Khách hàng hủy trên website'}
            </div>
          ` : ''}

          <!-- Timeline Steps -->
          ${!isCancelled ? `
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; margin-bottom:16px; text-align:center;">
              ${['1. Đã Nhận', '2. Đóng Gói', '3. Đang Giao', '4. Hoàn Tất'].map((stepLabel, idx) => {
                const isActive = (idx + 1) <= currentStep;
                return `
                  <div>
                    <div style="height:4px; border-radius:2px; background:${isActive ? 'var(--accent-red)' : 'rgba(255,255,255,0.1)'}; margin-bottom:5px; transition:all 0.3s;"></div>
                    <span style="font-size:0.6875rem; font-weight:${isActive ? '700' : '400'}; color:${isActive ? '#fff' : 'var(--text-muted)'};">${stepLabel}</span>
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}

          <!-- Receiver & Address info -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; font-size:0.8125rem; margin-bottom:12px; background:rgba(0,0,0,0.25); padding:10px 12px; border-radius:8px;">
            <div>
              <div style="color:var(--text-muted); margin-bottom:3px;">Người nhận: <strong style="color:#fff;">${order.customerName || 'Khách hàng'}</strong></div>
              <div style="color:var(--text-muted); margin-bottom:3px;">SĐT: <strong style="color:#fff;">${order.customerPhone}</strong></div>
              <div style="color:var(--text-muted);">Địa chỉ: <span style="color:#ddd;">${order.address || ''}${order.district ? ', ' + order.district : ''}</span></div>
            </div>
            <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:6px;">
              <div style="color:var(--text-muted); margin-bottom:3px;">Thanh toán: <strong style="color:#fff;">${order.paymentMethod === 'vietqr' ? 'VietQR' : 'COD'}</strong></div>
              <div style="color:var(--text-muted); margin-bottom:3px;">Ngày tạo: <span style="color:#ddd;">${order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'Mới đây'}</span></div>
              <div style="font-size:0.95rem; color:#fff; margin-top:4px;">Tổng tiền: <strong style="color:var(--accent-red);">${totalStr}</strong></div>
            </div>
          </div>

          <!-- Product items in order -->
          <div style="border-top:1px dashed rgba(255,255,255,0.1); padding-top:10px; margin-bottom:12px;">
            <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase; display:block; margin-bottom:8px;">Sản phẩm (${items.length}):</span>
            <div style="display:flex; flex-direction:column; gap:8px;">
              ${items.map(it => `
                <div style="display:flex; align-items:center; gap:10px; font-size:0.8125rem; background:rgba(255,255,255,0.02); padding:6px 8px; border-radius:6px;">
                  <img src="${it.image || 'assets/images/products/ao-khoac-argentina-trang.png'}" alt="${it.title}" style="width:36px; height:44px; object-fit:cover; border-radius:4px; background:#2a050b;" onerror="this.src='assets/images/products/ao-khoac-argentina-trang.png'">
                  <div style="flex:1; min-width:0;">
                    <div style="color:#fff; font-weight:600; line-height:1.3; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${it.title}</div>
                    <div style="color:var(--text-muted); font-size:0.72rem;">Size: ${it.size || 'M'} • SL: x${it.quantity || 1}</div>
                  </div>
                  <strong style="color:var(--text-primary); font-size:0.8125rem;">${window.formatVND ? window.formatVND((it.price || 0) * (it.quantity || 1)) : ((it.price || 0) * (it.quantity || 1)).toLocaleString('vi-VN') + '₫'}</strong>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Action buttons: HỦY ĐƠN & ĐÁNH GIÁ -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.08);">
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <!-- Nút HỦY ĐƠN HÀNG (Hiển thị khi pending/confirmed) -->
              ${canCancel ? `
                <button type="button" onclick="window.promptCancelOrderModal('${order.id}')" style="background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.5); color:#f87171; padding:6px 14px; border-radius:6px; font-size:0.775rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:4px; transition:all 0.2s;" onmouseover="this.style.background='#ef4444'; this.style.color='#fff';" onmouseout="this.style.background='rgba(239,68,68,0.15)'; this.style.color='#f87171';">
                  <span>🚫</span> Hủy Đơn Hàng
                </button>
              ` : ''}

              <!-- Nút ĐÁNH GIÁ SẢN PHẨM -->
              <button type="button" onclick="window.promptReviewOrderModal('${order.id}')" style="background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.5); color:#fbbf24; padding:6px 14px; border-radius:6px; font-size:0.775rem; font-weight:800; cursor:pointer; display:inline-flex; align-items:center; gap:4px; transition:all 0.2s;" onmouseover="this.style.background='#f59e0b'; this.style.color='#111';" onmouseout="this.style.background='rgba(245,158,11,0.15)'; this.style.color='#fbbf24';">
                <span>⭐</span> Đánh Giá
              </button>
            </div>

            <div style="display:flex; gap:8px;">
              <a href="orders.html" style="font-size:0.75rem; color:var(--text-muted); text-decoration:none; padding:5px 8px;">
                Chi tiết đầy đủ →
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  // Popup HỦY ĐƠN HÀNG trong modal
  window.promptCancelOrderModal = function (orderId) {
    const reason = prompt(`⚠️ XÁC NHẬN HỦY ĐƠN HÀNG #${orderId}\n\nKhi hủy, hệ thống sẽ tự động gửi báo cáo khẩn về Telegram của shop (có cảnh báo đỏ) và hoàn lại tồn kho.\n\nVui lòng nhập lý do hủy đơn (hoặc bấm OK để hủy):`, 'Đổi ý không mua nữa');
    if (reason === null) return; // Người dùng ấn Cancel prompt

    window.executeCancelOrder(orderId, reason || 'Khách hàng yêu cầu hủy trên website');
  };

  // Thực hiện gọi API Hủy đơn hàng
  window.executeCancelOrder = async function (orderId, reason) {
    window.showToast('Đang xử lý hủy đơn hàng #' + orderId + '...', 'info');

    try {
      const res = await fetch('/api/orders/' + encodeURIComponent(orderId) + '/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      });

      const data = await res.json();
      if (data.success && data.order) {
        // Cập nhật localStorage
        try {
          const myOrders = JSON.parse(localStorage.getItem('nt_my_orders') || '[]');
          const idx = myOrders.findIndex(o => o.id === orderId);
          if (idx > -1) myOrders[idx] = data.order;
          else myOrders.unshift(data.order);
          localStorage.setItem('nt_my_orders', JSON.stringify(myOrders));
        } catch (e) {}

        window.showToast(`Đã hủy đơn #${orderId} thành công! Hệ thống đã gửi báo cáo về Telegram của shop.`, 'success');

        // Render lại modal
        window.loadSavedOrdersInModal();
      } else {
        window.showToast(data.message || 'Không thể hủy đơn hàng này!', 'error');
      }
    } catch (err) {
      console.error('[Cancel Order Error]', err);
      window.showToast('Lỗi kết nối khi hủy đơn! Vui lòng liên hệ 0342.767.002.', 'error');
    }
  };

  // Popup ĐÁNH GIÁ SẢN PHẨM trong modal
  window.promptReviewOrderModal = function (orderId) {
    const starsStr = prompt(`⭐ ĐÁNH GIÁ SẢN PHẨM (ĐƠN #${orderId})\n\nBạn đánh giá sản phẩm mấy sao? (Nhập số từ 1 đến 5):\n5: Rất hài lòng\n4: Hài lòng\n3: Bình thường\n2: Chưa hài lòng\n1: Kém`, '5');
    if (starsStr === null) return;

    const stars = parseInt(starsStr, 10);
    if (isNaN(stars) || stars < 1 || stars > 5) {
      window.showToast('Số sao không hợp lệ! Vui lòng chọn từ 1 đến 5 sao.', 'error');
      return;
    }

    const comment = prompt('✍️ Nhập nhận xét của bạn về chất lượng sản phẩm & đóng gói:', 'Sản phẩm rất đẹp đúng chất streetwear, đóng gói cẩn thận!');
    if (comment === null) return;

    window.executeReviewOrder(orderId, stars, comment);
  };

  // Thực hiện gọi API Đánh giá
  window.executeReviewOrder = async function (orderId, rating, comment) {
    window.showToast('Đang gửi đánh giá...', 'info');

    try {
      const res = await fetch('/api/orders/' + encodeURIComponent(orderId) + '/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: rating || 5,
          comment: comment || 'Sản phẩm đẹp đúng mô tả!'
        })
      });

      const data = await res.json();
      if (data.success) {
        window.showToast('Cảm ơn bạn đã đánh giá! Phản hồi đã được ghi nhận.', 'success');
      } else {
        window.showToast(data.message || 'Lỗi gửi đánh giá!', 'error');
      }
    } catch (err) {
      window.showToast('Cảm ơn bạn đã gửi đánh giá cho sản phẩm!', 'success');
    }
  };

  // 7. GLOBAL QUICK VIEW MODAL
  // --------------------------------------------------------------------------
  window.openQuickView = async function (productId) {
    let modal = document.getElementById('quick-view-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'quick-view-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-card">
          <button class="modal-close-btn" onclick="document.getElementById('quick-view-modal').classList.remove('active')" aria-label="Đóng">&times;</button>
          <div id="quick-view-content" class="quick-view-grid">
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
        <img src="${prod.image}" alt="${prod.title}" id="qv-main-img" class="quick-view-img">
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
          <div style="display:flex; gap:8px; flex-wrap:wrap;" id="qv-size-group">
            ${sizes.map((s, idx) => {
              const sm = (prod.stock && typeof prod.stock === 'object') ? prod.stock : {};
              const isOut = sm[s] !== undefined && Number(sm[s]) <= 0;
              return `
              <button class="size-btn-pill ${idx === 0 ? 'active' : ''}" style="padding:6px 14px; font-size:0.8125rem; ${isOut ? 'opacity:0.65; text-decoration:line-through;' : ''}" onclick="
                document.querySelectorAll('#qv-size-group button').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                window._qvSelectedSize = '${s}';
              ">${s}${isOut ? ' (Hết)' : ''}</button>
              `;
            }).join('')}
          </div>
        </div>

        <div style="margin-bottom:20px; font-size:0.75rem; color:var(--accent-green); font-weight:700;">
          ⚡ Sẵn sàng giao hỏa tốc 2H tại Ninh Bình • Đổi size miễn phí 7 ngày
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn btn-primary" style="flex:1; height:46px; font-weight:800;" onclick="
            const s = window._qvSelectedSize || '${sizes[0]}';
            const sm = (prod.stock && typeof prod.stock === 'object') ? prod.stock : {};
            if (sm[s] !== undefined && Number(sm[s]) <= 0) {
              alert('Size ' + s + ' tạm thời đã hết hàng! Vui lòng chọn size khác.');
              return;
            }
            window.addToCart('${prod.id}', s, '#111111', 1);
            document.getElementById('quick-view-modal').classList.remove('active');
          ">Thêm Vào Giỏ Hàng</button>
          <a href="product-detail.html?id=${prod.id}" class="btn btn-outline-white" style="height:46px; display:inline-flex; align-items:center; padding:0 16px; font-size:0.8125rem;">Chi Tiết →</a>
        </div>
      </div>
    `;
    window._qvSelectedSize = sizes[0];
  };


  // Lock mobile pinch-to-zoom & double-tap gestures for native-app experience
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  }, { passive: false });
  document.addEventListener('gesturechange', function (e) {
    e.preventDefault();
  }, { passive: false });
  document.addEventListener('gestureend', function (e) {
    e.preventDefault();
  }, { passive: false });

  let _lastTapTime = 0;
  document.addEventListener('touchend', function (e) {
    const currentTime = Date.now();
    const tapLength = currentTime - _lastTapTime;
    if (tapLength < 320 && tapLength > 0) {
      if (e.target && !['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'].includes(e.target.tagName)) {
        e.preventDefault();
      }
    }
    _lastTapTime = currentTime;
  }, { passive: false });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (typeof window.closeMobileMenu === 'function') window.closeMobileMenu();
      if (typeof window.closeSearchModal === 'function') window.closeSearchModal();
      if (typeof window.closeCartDrawer === 'function') window.closeCartDrawer();
    }
  });

  // Auto-inject missing Mobile Drawer & Mobile Bottom Nav on storefront pages
  function ensureMobileNavigationElements() {
    if (!document.querySelector('.header')) return; // Skip admin page
    if (!document.getElementById('mobile-nav-drawer')) {
      const backdrop = document.createElement('div');
      backdrop.className = 'mobile-drawer-backdrop';
      backdrop.id = 'mobile-drawer-backdrop';
      backdrop.setAttribute('onclick', 'window.closeMobileMenu()');
      document.body.appendChild(backdrop);

      const drawer = document.createElement('aside');
      drawer.className = 'mobile-nav-drawer';
      drawer.id = 'mobile-nav-drawer';
      drawer.innerHTML = `
        <div class="drawer-header">
          <a href="index.html" class="drawer-brand">
            <img src="assets/images/logo.png" alt="Logo" class="drawer-logo">
            <div class="drawer-brand-text">
              <span class="drawer-brand-name">NGUYENTU</span>
              <span class="drawer-brand-sub">NINH BINH STREETWEAR</span>
            </div>
          </a>
          <button class="drawer-close-btn" onclick="window.closeMobileMenu()" aria-label="Đóng">&times;</button>
        </div>
        <div class="drawer-body">
          <nav class="drawer-nav-list">
            <a href="index.html" class="drawer-nav-item"><span class="drawer-nav-icon">🏠</span> Trang Chủ</a>
            <a href="products.html" class="drawer-nav-item"><span class="drawer-nav-icon">👕</span> Tất Cả Sản Phẩm</a>
            <a href="orders.html" class="drawer-nav-item" style="color:var(--accent-gold); font-weight:800;"><span class="drawer-nav-icon">📦</span> Đơn Hàng Của Bạn (Tra cứu & Hủy)</a>
            <a href="blog.html" class="drawer-nav-item"><span class="drawer-nav-icon">📰</span> Tạp Chí Streetwear</a>
            <a href="contact.html" class="drawer-nav-item"><span class="drawer-nav-icon">📍</span> Hệ Thống Showroom</a>
          </nav>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    if (!document.querySelector('.mobile-bottom-nav') && !document.getElementById('mobile-sticky-bar')) {
      const path = (window.location.pathname || '').toLowerCase();
      const isProducts = path.includes('products');
      const isOrders = path.includes('orders');
      const isContact = path.includes('contact');
      const isHome = !isProducts && !isOrders && !isContact;

      const bottomNav = document.createElement('nav');
      bottomNav.className = 'mobile-bottom-nav';
      bottomNav.innerHTML = `
        <a href="index.html" class="mobile-nav-item ${isHome ? 'active' : ''}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span>Trang Chủ</span>
        </a>
        <a href="products.html" class="mobile-nav-item ${isProducts ? 'active' : ''}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <span>Sản Phẩm</span>
        </a>
        <a href="orders.html" class="mobile-nav-item ${isOrders ? 'active' : ''}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          <span>Đơn Hàng</span>
        </a>
        <a href="javascript:void(0)" class="mobile-nav-item" onclick="window.openCartDrawer()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          <span>Giỏ Hàng</span>
        </a>
        <a href="contact.html" class="mobile-nav-item ${isContact ? 'active' : ''}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <span>Liên Hệ</span>
        </a>
      `;
      document.body.appendChild(bottomNav);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureMobileNavigationElements);
  } else {
    ensureMobileNavigationElements();
  }
})();
