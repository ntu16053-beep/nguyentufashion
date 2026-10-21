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
  let PRODUCTS = (window.ALL_PRODUCTS && window.ALL_PRODUCTS.length > 0)
    ? window.ALL_PRODUCTS.slice()
    : (window.getStoredProducts ? window.getStoredProducts() : [
    {
      id: 'nt-01',
      title: 'Áo Khoác Gió Adidas Argentina 2024/25 "AFA 3 Sao" Trắng',
      category: 'jacket',
      categoryName: 'Áo Khoác Gió Thể Thao',
      price: 480000,
      oldPrice: 580000,
      rating: 5.0,
      reviews: 186,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/ao-khoac-argentina-trang.png',
      imageHover: 'assets/images/products/ao-khoac-argentina-trang.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#ffffff', '#75aadb', '#111111'],
      description: 'Chất liệu vải dù gió 2 lớp cao cấp cản gió và chống nước nhẹ. Logo Adidas mạ vàng thêu nổi cùng huy hiệu AFA 3 sao World Cup danh giá. Phối sọc xanh lượn sóng biểu tượng hai bên tay áo.'
    },
    {
      id: 'nt-02',
      title: 'Bộ Quần Áo Thể Thao Tracksuit Adidas Argentina "AFA 3 Sao" Đen',
      category: 'tracksuit',
      categoryName: 'Bộ Nỉ Thể Thao',
      price: 650000,
      oldPrice: 790000,
      rating: 4.9,
      reviews: 214,
      badge: 'sale',
      isLocal: true,
      image: 'assets/images/products/bo-the-thao-argentina-den.png',
      imageHover: 'assets/images/products/bo-the-thao-argentina-den.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#111111', '#ffffff'],
      description: 'Nguyên bộ tracksuit thể thao gồm áo khoác kéo khóa cổ cao và quần dài thể thao bo gấu. Chất vải thun nỉ Poly dệt kim co giãn 4 chiều, giữ ấm tốt và tôn dáng cực đỉnh.'
    },
    {
      id: 'nt-03',
      title: 'Áo Khoác Gió FC Barcelona Retro Heritage Kem Phối Sọc Blaugrana',
      category: 'jacket',
      categoryName: 'Áo Khoác Gió Retro',
      price: 490000,
      oldPrice: 590000,
      rating: 4.9,
      reviews: 142,
      badge: 'new',
      isLocal: false,
      image: 'assets/images/products/ao-khoac-barca-retro.png',
      imageHover: 'assets/images/products/ao-khoac-barca-retro.png',
      sizes: ['M', 'L', 'XL'],
      colors: ['#f4f1ea', '#a50044', '#004d98'],
      description: 'Phiên bản retro huyền thoại của FC Barcelona với sắc trắng kem vintage. Bo cổ và gấu dệt sọc Senyera đỏ vàng cùng phối màu Blaugrana biểu tượng. Phom suông rộng phóng khoáng.'
    },
    {
      id: 'nt-04',
      title: 'Áo Khoác Adidas Originals Kung Fu Tang Suit "Khuy Tàu" Xám Khói',
      category: 'jacket',
      categoryName: 'Áo Khoác Khuy Tàu',
      price: 520000,
      oldPrice: 650000,
      rating: 5.0,
      reviews: 168,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/ao-khoac-adidas-khuy-tau.jpg',
      imageHover: 'assets/images/products/ao-khoac-adidas-khuy-tau.jpg',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#4b4f58', '#e5e5e5'],
      description: 'Thiết kế độc bản giao thoa giữa võ thuật truyền thống Á Đông và phong cách đường phố đương đại. Điểm nhấn hàng nút khuy thắt sườn xám cài tàu thủ công trên nền nỉ da lộn wash xám khói.'
    },
    {
      id: 'nt-05',
      title: 'Áo Khoác Nỉ Adidas Originals Beckenbauer Retro Cổ Cao Kem Cacao',
      category: 'jacket',
      categoryName: 'Áo Khoác Nỉ Retro',
      price: 470000,
      oldPrice: 560000,
      rating: 4.8,
      reviews: 129,
      badge: 'new',
      isLocal: true,
      image: 'assets/images/products/ao-khoac-adidas-beckenbauer-kem.png',
      imageHover: 'assets/images/products/ao-khoac-adidas-beckenbauer-kem.png',
      sizes: ['M', 'L', 'XL'],
      colors: ['#f7f4ec', '#826656'],
      description: 'Kiểu dáng Beckenbauer bất hủ với cổ bẻ cao dựng trụ, gam màu kem vintage kết hợp bo viền màu nâu Cacao Mocha ấm áp. Chất nỉ dệt dày dặn, sang trọng và chuẩn phom.'
    },
    {
      id: 'nt-06',
      title: 'Quần Short Dsquared2 "D2 Lettering" Phối Lá Phong Đỏ',
      category: 'short',
      categoryName: 'Quần Short Nam',
      price: 350000,
      oldPrice: 450000,
      rating: 4.9,
      reviews: 115,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/quan-short-dsquared2-la-phong.png',
      imageHover: 'assets/images/products/quan-short-dsquared2-la-phong.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#111111', '#ffffff', '#dc2626'],
      description: 'Quần short Dsquared2 chất thun da cá dày dặn, in tràn chữ D2 all-over cá tính điểm xuyết lá phong đỏ Canada đặc trưng. Lưng thun co giãn dây rút thoải mái khi đi chơi, dạo phố.'
    },
    {
      id: 'nt-07',
      title: 'Áo Sơ Mi Denim Louis Vuitton Damier Caro Xanh Nhạt',
      category: 'shirt',
      categoryName: 'Áo Sơ Mi Denim',
      price: 420000,
      oldPrice: 520000,
      rating: 5.0,
      reviews: 148,
      badge: 'new',
      isLocal: true,
      image: 'assets/images/products/ao-so-mi-lv-damier-denim.png',
      imageHover: 'assets/images/products/ao-so-mi-lv-damier-denim.png',
      sizes: ['M', 'L', 'XL'],
      colors: ['#7ba7cc', '#f5f5f5'],
      description: 'Áo sơ mi cộc tay chất liệu denim dệt họa tiết ô cờ Damier Louis Vuitton kinh điển. Vải mềm mịn wash màu xanh khói nhẹ nhàng, cúc kim loại dập khắc tinh xảo.'
    },
    {
      id: 'nt-08',
      title: 'Quần Short Louis Vuitton Monogram Watercolor Loang Nước',
      category: 'short',
      categoryName: 'Quần Short Hè',
      price: 360000,
      oldPrice: 460000,
      rating: 4.8,
      reviews: 96,
      badge: 'new',
      isLocal: false,
      image: 'assets/images/products/quan-short-lv-monogram-nuoc.png',
      imageHover: 'assets/images/products/quan-short-lv-monogram-nuoc.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#2563eb', '#ffffff'],
      description: 'Họa tiết hoa Monogram phong cách màu nước (Watercolor) nghệ thuật trên nền vải dù poly cao cấp mát lạnh, nhanh khô. Rất hợp đi biển, du lịch hoặc dạo hè.'
    },
    {
      id: 'nt-09',
      title: 'Quần Short Dù Louis Vuitton Đỏ Mận Khóa Kéo Sau',
      category: 'short',
      categoryName: 'Quần Short Cao Cấp',
      price: 380000,
      oldPrice: 490000,
      rating: 4.9,
      reviews: 132,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/quan-short-lv-do-man.png',
      imageHover: 'assets/images/products/quan-short-lv-do-man.png',
      sizes: ['M', 'L', 'XL'],
      colors: ['#5a0d1d', '#ffffff'],
      description: 'Tone màu đỏ mận (burgundy) sang trọng đồng điệu với thương hiệu NGUYEN TU FASHION. Túi sau viền khóa zip mạ bạc, chất dù vi dệt bóng mờ sang trọng, tặng kèm túi bọc đồ thời trang.'
    },
    {
      id: 'nt-10',
      title: 'Quần Short Thể Thao Louis Vuitton Đen Thêu Chữ Ký Cursive',
      category: 'short',
      categoryName: 'Quần Short Thể Thao',
      price: 340000,
      oldPrice: 430000,
      rating: 4.9,
      reviews: 165,
      badge: 'sale',
      isLocal: true,
      image: 'assets/images/products/quan-short-lv-den-theu.png',
      imageHover: 'assets/images/products/quan-short-lv-den-theu.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#111111', '#38bdf8'],
      description: 'Quần short màu đen basic cực dễ phối đồ với thêu chữ ký Louis Vuitton uốn lượn sau túi và trước ống quần. Dây rút kim loại cao cấp dập nổi logo.'
    },
    {
      id: 'nt-11',
      title: 'Áo Khoác Denim Louis Vuitton Đen Thêu Logo LV Ngực',
      category: 'jacket',
      categoryName: 'Áo Khoác Denim',
      price: 490000,
      oldPrice: 590000,
      rating: 5.0,
      reviews: 175,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/ao-khoac-denim-lv-den.png',
      imageHover: 'assets/images/products/ao-khoac-denim-lv-den.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#1e1e1e', '#b45309'],
      description: 'Chất liệu denim cotton dày dặn xử lý wash đen khói bụi bặm, form trucker jacket tôn dáng. Điểm nhấn logo LV thêu chỉ vàng đồng tinh tế trên túi ngực trái, khuy kim loại dập nổi sang trọng.'
    },
    {
      id: 'nt-12',
      title: 'Quần Âu Nam NGUYEN TU Slimfit Đen Co Giãn Cao Cấp',
      category: 'pants',
      categoryName: 'Quần Âu Nam',
      price: 320000,
      oldPrice: 420000,
      rating: 4.9,
      reviews: 198,
      badge: 'best',
      isLocal: true,
      image: 'assets/images/products/quan-au-nam-den-slimfit.png',
      imageHover: 'assets/images/products/quan-au-nam-den-slimfit.png',
      sizes: ['29', '30', '31', '32', '34'],
      colors: ['#111111'],
      description: 'Dáng slimfit đứng ống trẻ trung, chất vải tuyết mưa nhập khẩu mềm mịn, co giãn 4 chiều chống nhăn nhàu tối đa. Hoàn hảo khi phối cùng sơ mi, blazer hoặc áo polo công sở.'
    },
    {
      id: 'nt-13',
      title: 'Quần Jean Louis Vuitton Monogram Denim Đen Trắng',
      category: 'pants',
      categoryName: 'Quần Jean Nam',
      price: 450000,
      oldPrice: 560000,
      rating: 5.0,
      reviews: 142,
      badge: 'new',
      isLocal: false,
      image: 'assets/images/products/quan-jean-lv-monogram-den.png',
      imageHover: 'assets/images/products/quan-jean-lv-monogram-den.png',
      sizes: ['29', '30', '31', '32', '34'],
      colors: ['#18181b', '#f4f4f5'],
      description: 'Quần jean ống suông thời thượng dệt họa tiết Monogram LV trắng tương phản trên nền denim đen. Kỹ thuật in laser chuẩn sắc nét, cúc đồng dập chìm, phong cách streetwear sang chảnh.'
    },
    {
      id: 'nt-14',
      title: 'Quần Jean Louis Vuitton Xanh Khói Đắp Túi Monogram',
      category: 'pants',
      categoryName: 'Quần Jean Nam',
      price: 430000,
      oldPrice: 540000,
      rating: 4.9,
      reviews: 126,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/quan-jean-lv-xanh-monogram-dui.png',
      imageHover: 'assets/images/products/quan-jean-lv-xanh-monogram-dui.png',
      sizes: ['29', '30', '31', '32', '34'],
      colors: ['#60a5fa', '#e2e8f0'],
      description: 'Chất bò denim cao cấp wash xanh khói cổ điển, điểm nhấn 2 mảng đắp túi đùi họa tiết LV Monogram dập vân nổi cực chất. Form regular ôm nhẹ tôn dáng chân, đường may chỉ vàng chắc chắn.'
    },
    {
      id: 'nt-15',
      title: 'Quần Jean Louis Vuitton Graffiti Họa Tiết Chữ All-Over',
      category: 'pants',
      categoryName: 'Quần Jean Nam',
      price: 460000,
      oldPrice: 580000,
      rating: 4.9,
      reviews: 153,
      badge: 'new',
      isLocal: false,
      image: 'assets/images/products/quan-jean-lv-graffiti-chu.png',
      imageHover: 'assets/images/products/quan-jean-lv-graffiti-chu.png',
      sizes: ['29', '30', '31', '32', '34'],
      colors: ['#0f172a', '#ffffff'],
      description: 'Thiết kế đột phá với họa tiết chữ graffiti uốn lượn phong cách đường phố Paris kết hợp chữ thư pháp Nhật Bản Katakana trắng trên nền denim đen chàm. Cá tính, nổi bật giữa đám đông.'
    },
    {
      id: 'nt-16',
      title: 'Quần Short Louis Vuitton Trắng Kem Túi Dập Monogram',
      category: 'short',
      categoryName: 'Quần Short Hè',
      price: 370000,
      oldPrice: 480000,
      rating: 4.9,
      reviews: 112,
      badge: 'new',
      isLocal: true,
      image: 'assets/images/products/quan-short-lv-trang-tui-monogram.png',
      imageHover: 'assets/images/products/quan-short-lv-trang-tui-monogram.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#f8fafc', '#e2e8f0'],
      description: 'Chất thun nỉ da cá dệt mịn màu trắng kem thanh lịch, phối 2 túi ốp nổi bật với hoa văn Monogram dập vân tinh xảo. Lưng thun dây rút bọc đầu kim loại cao cấp dập logo Louis Vuitton.'
    },
    {
      id: 'nt-17',
      title: 'Quần Short Dù Louis Vuitton Đen Lưng Monogram Thêu Chim',
      category: 'short',
      categoryName: 'Quần Short Thể Thao',
      price: 390000,
      oldPrice: 510000,
      rating: 5.0,
      reviews: 184,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/quan-short-lv-den-lung-monogram-theu-chim.png',
      imageHover: 'assets/images/products/quan-short-lv-den-lung-monogram-theu-chim.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#111111', '#d97706'],
      description: 'Thiết kế độc đáo với bản lưng thun dệt hoa văn Louis Vuitton Monogram chìm sang trọng, túi sau thêu đàn chim vàng bay lượn kết hợp chữ ký Vuitton nghệ thuật. Vải dù poly 2 lớp chống nước nhẹ.'
    },
    {
      id: 'nt-18',
      title: 'Quần Short Dolce & Gabbana Pig King Bo Chun Cạp Sọc',
      category: 'short',
      categoryName: 'Quần Short Cao Cấp',
      price: 360000,
      oldPrice: 470000,
      rating: 4.8,
      reviews: 98,
      badge: 'hot',
      isLocal: false,
      image: 'assets/images/products/quan-short-dg-chu-heo-king.png',
      imageHover: 'assets/images/products/quan-short-dg-chu-heo-king.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#111111', '#5a0d1d', '#ffffff'],
      description: 'Set quần short D&G họa tiết chú heo vương miện hoàng gia Pig King trên túi sau phong cách hoạt hình sang chảnh. Cạp chun thể thao phối 3 sọc thể thao co giãn thoải mái, tag logo kim loại D&G.'
    },
    {
      id: 'nt-19',
      title: 'Quần Short Louis Vuitton Trắng Cạp Thun Đen Thêu Chữ Xanh',
      category: 'short',
      categoryName: 'Quần Short Hè',
      price: 350000,
      oldPrice: 450000,
      rating: 4.9,
      reviews: 139,
      badge: 'new',
      isLocal: true,
      image: 'assets/images/products/quan-short-lv-trang-cap-den-theu-chu-xanh.png',
      imageHover: 'assets/images/products/quan-short-lv-trang-cap-den-theu-chu-xanh.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#ffffff', '#111111', '#059669'],
      description: 'Tone trắng tương phản cạp chun đen co giãn thể thao, dây luồn in logo Louis Vuitton chạy dọc. Ống quần thêu chữ nổi Louis Vuitton xanh ngọc lục bảo trẻ trung, năng động khi đi dạo hoặc tập gym.'
    },
    {
      id: 'nt-20',
      title: 'Quần Short Gió Menfashion Đen Thêu Chữ Vàng Hoàng Gia',
      category: 'short',
      categoryName: 'Quần Short Gió',
      price: 290000,
      oldPrice: 380000,
      rating: 4.8,
      reviews: 156,
      badge: 'sale',
      isLocal: true,
      image: 'assets/images/products/quan-short-gio-menfashion-den.png',
      imageHover: 'assets/images/products/quan-short-gio-menfashion-den.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#111111', '#eab308'],
      description: 'Vải gió vi sợi siêu nhẹ, mát lạnh và nhanh khô. Form ống rộng ngang gối thoải mái vận động mùa hè. Điểm nhấn thêu chữ MENFASHION vàng kim sắc sảo, túi sâu có khóa kéo tiện lợi.'
    },
    {
      id: 'nt-21',
      title: 'Áo Thun Berluti Paris Trắng Chữ Ký Thêu Nổi Đen',
      category: 'tee',
      categoryName: 'Áo Thun Nam',
      price: 320000,
      oldPrice: 420000,
      rating: 4.9,
      reviews: 145,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/ao-thun-berluti-trang-chu-den.png',
      imageHover: 'assets/images/products/ao-thun-berluti-trang-chu-den.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#ffffff', '#111111'],
      description: 'Chất liệu cotton 100% 2 chiều 250gsm dày dặn, đứng phom và thấm hút mồ hôi cực tốt. Điểm nhấn chữ ký thương hiệu Berluti Paris thêu nổi sắc sảo trước ngực, phong cách tối giản thanh lịch.'
    },
    {
      id: 'nt-22',
      title: 'Áo Thun Louis Vuitton Trắng Classic Dập Vân Chìm Minimal',
      category: 'tee',
      categoryName: 'Áo Thun Nam',
      price: 340000,
      oldPrice: 450000,
      rating: 5.0,
      reviews: 178,
      badge: 'best',
      isLocal: true,
      image: 'assets/images/products/ao-thun-lv-trang-classic-minimal.png',
      imageHover: 'assets/images/products/ao-thun-lv-trang-classic-minimal.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#ffffff'],
      description: 'Thiết kế chuẩn mực quiet luxury của Louis Vuitton với tone trắng tinh khôi, cổ bo gân dày dặn chống dão. Vải cotton compact dệt họa tiết vân chìm cao cấp, cực kỳ dễ phối cùng mọi loại quần.'
    },
    {
      id: 'nt-23',
      title: 'Áo Thun Louis Vuitton Monogram All-Over Nâu Cà Phê',
      category: 'tee',
      categoryName: 'Áo Thun Cao Cấp',
      price: 380000,
      oldPrice: 490000,
      rating: 4.9,
      reviews: 162,
      badge: 'new',
      isLocal: false,
      image: 'assets/images/products/ao-thun-lv-monogram-nau-coffee.png',
      imageHover: 'assets/images/products/ao-thun-lv-monogram-nau-coffee.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#451a03', '#78350f'],
      description: 'Tone màu nâu mocha / cà phê trầm ấm sang trọng phủ trọn họa tiết hoa Monogram kinh điển của nhà mốt Louis Vuitton. Phom drop-shoulder vai trễ phóng khoáng theo xu hướng streetwear quốc tế.'
    },
    {
      id: 'nt-24',
      title: 'Áo Thun Louis Vuitton Xanh Navy Thêu Chữ Ký Vuitton & Logo Lưng',
      category: 'tee',
      categoryName: 'Áo Thun Nam',
      price: 360000,
      oldPrice: 470000,
      rating: 5.0,
      reviews: 195,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/ao-thun-lv-xanh-navy-theu-vuitton.png',
      imageHover: 'assets/images/products/ao-thun-lv-xanh-navy-theu-vuitton.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#1e3a5f', '#ffffff', '#eab308'],
      description: 'Sắc xanh navy tôn da, ngực áo thêu chữ ký cursive Vuitton trắng tinh tế, lưng áo in logo LV viền trắng cỡ lớn nổi bật kèm tab da vàng ở gáy áo chuẩn xịn. Cotton 100% co giãn thoáng khí.'
    },
    {
      id: 'nt-25',
      title: 'Áo Thun Louis Vuitton Đỏ Mận Thêu Hoa Floral NGUYEN TU Edition',
      category: 'tee',
      categoryName: 'Áo Thun Limited',
      price: 390000,
      oldPrice: 520000,
      rating: 5.0,
      reviews: 210,
      badge: 'new',
      isLocal: true,
      image: 'assets/images/products/ao-thun-lv-do-man-theu-hoa-floral.png',
      imageHover: 'assets/images/products/ao-thun-lv-do-man-theu-hoa-floral.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#4e0d19', '#ffffff'],
      description: 'Tone đỏ mận burgundy đồng điệu tuyệt đối với màu nhận diện của NGUYEN TU FASHION. Lưng áo thêu nổi 3D chữ thư pháp Louis Vuitton bao quanh hoa văn Floral sắc màu tinh xảo kèm tab da vàng signature.'
    },
    {
      id: 'nt-26',
      title: 'Áo Sơ Mi Cộc Tay Louis Vuitton Monogram Hoa Ren Khói Hawaii',
      category: 'shirt',
      categoryName: 'Áo Sơ Mi Hawaii',
      price: 420000,
      oldPrice: 540000,
      rating: 5.0,
      reviews: 168,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/ao-so-mi-lv-monogram-hoa-ren-hawaii.png',
      imageHover: 'assets/images/products/ao-so-mi-lv-monogram-hoa-ren-hawaii.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#1e3a5f', '#f1f5f9'],
      description: 'Chất lụa modal mềm rũ mát lạnh, dệt in họa tiết ren Monogram hoa lá trừu tượng tone xanh khói cổ điển phong cách resort Hawaii. Cổ bẻ mở phóng khoáng, cúc xà cừ sang trọng.'
    },
    {
      id: 'nt-27',
      title: 'Áo Sơ Mi Trắng Dài Tay Louis Vuitton Logo Glitch Pixel',
      category: 'shirt',
      categoryName: 'Áo Sơ Mi Công Sở',
      price: 390000,
      oldPrice: 490000,
      rating: 4.9,
      reviews: 142,
      badge: 'new',
      isLocal: true,
      image: 'assets/images/products/ao-so-mi-lv-trang-dai-tay-logo-pixel.png',
      imageHover: 'assets/images/products/ao-so-mi-lv-trang-dai-tay-logo-pixel.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#ffffff', '#1e3a8a'],
      description: 'Chất vải bamboo sợi tre kháng khuẩn, chống nhăn tự nhiên và thấm hút mồ hôi. Điểm nhấn logo LV thêu hiệu ứng glitch pixel màu xanh navy trước ngực tạo nét phá cách hiện đại cho áo sơ mi công sở.'
    },
    {
      id: 'nt-28',
      title: 'Áo Sơ Mi Trắng NGUYEN TU Cổ Đính Hoa Đá Ngọc Trai Dạ Tiệc',
      category: 'shirt',
      categoryName: 'Áo Sơ Mi Dạ Tiệc',
      price: 450000,
      oldPrice: 580000,
      rating: 5.0,
      reviews: 215,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/ao-so-mi-trang-co-dinh-hoa-ngoc-trai.png',
      imageHover: 'assets/images/products/ao-so-mi-trang-co-dinh-hoa-ngoc-trai.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#ffffff'],
      description: 'Tuyệt phẩm áo sơ mi tiệc cao cấp với hàng cúc giấu nẹp tinh tế, hai ve cổ được đính kết thủ công hoa đá và ngọc trai trắng lấp lánh sang trọng. Chuẩn phong thái lịch lãm cho các sự kiện, dạ tiệc đẳng cấp.'
    },
    {
      id: 'nt-29',
      title: 'Áo Sơ Mi Denim Louis Vuitton Cúc Ngọc Trai Thêu Cameo',
      category: 'shirt',
      categoryName: 'Áo Sơ Mi Denim',
      price: 480000,
      oldPrice: 590000,
      rating: 5.0,
      reviews: 186,
      badge: 'best',
      isLocal: false,
      image: 'assets/images/products/ao-so-mi-denim-lv-cuc-ngoc-trai-theu-cameo.png',
      imageHover: 'assets/images/products/ao-so-mi-denim-lv-cuc-ngoc-trai-theu-cameo.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#1e293b', '#d97706', '#f8fafc'],
      description: 'Chất liệu denim thô wash xanh chàm vintage dày dặn, có thể mặc riêng hoặc khoác ngoài (overshirt). Nổi bật với hàng cúc ngọc trai tròn viền bạc và các chi tiết thêu logo LV chỉ vàng kết hợp hình chân dung Cameo quý phái.'
    },
    {
      id: 'nt-30',
      title: 'Áo Sơ Mi Safari Louis Vuitton Kẻ Sọc Xanh Dây Rút Eo',
      category: 'shirt',
      categoryName: 'Áo Sơ Mi Safari',
      price: 430000,
      oldPrice: 550000,
      rating: 4.9,
      reviews: 154,
      badge: 'new',
      isLocal: true,
      image: 'assets/images/products/ao-so-mi-lv-ke-soc-safari-day-rut-eo.png',
      imageHover: 'assets/images/products/ao-so-mi-lv-ke-soc-safari-day-rut-eo.png',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['#ffffff', '#2563eb'],
      description: 'Form safari jacket/shirt độc đáo với 2 túi hộp ngực có nắp, kẻ sọc pinstripe thanh mảnh tôn chiều cao. Thiết kế dây rút eo thể thao tùy chỉnh độ ôm dáng, cúc kim loại dập nổi thương hiệu.'
    },
    {
      id: 'nt-31',
      title: 'Giày Sneaker Nike Air Jordan 1 Low Midnight Navy',
      category: 'shoes',
      categoryName: 'Giày Sneaker',
      price: 850000,
      oldPrice: 1100000,
      rating: 5.0,
      reviews: 248,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/giay-nike-air-jordan-1-low-navy.png',
      imageHover: 'assets/images/products/giay-nike-air-jordan-1-low-navy.png',
      sizes: ['39', '40', '41', '42', '43'],
      colors: ['#1e3a5f', '#ffffff', '#eab308'],
      description: 'Phối màu Midnight Navy kinh điển với da hạt nhăn cao cấp kết hợp da trơn trắng tinh tế. Điểm nhấn logo thêu Jumpman vàng nổi bật trên lưỡi gà và logo Wings dập thêu sau gót. Đế đệm Air êm ái.'
    },
    {
      id: 'nt-32',
      title: 'Giày Sneaker Nike Air Jordan 1 Low Đỏ Mận Bordeaux NGUYEN TU Edition',
      category: 'shoes',
      categoryName: 'Giày Sneaker Limited',
      price: 890000,
      oldPrice: 1150000,
      rating: 5.0,
      reviews: 285,
      badge: 'best',
      isLocal: true,
      image: 'assets/images/products/giay-nike-air-jordan-1-low-do-man-bordeaux.png',
      imageHover: 'assets/images/products/giay-nike-air-jordan-1-low-do-man-bordeaux.png',
      sizes: ['39', '40', '41', '42', '43'],
      colors: ['#581c2b', '#ffffff', '#111111'],
      description: 'Tone màu đỏ mận Bordeaux quý tộc đồng điệu tuyệt đối cùng nhận diện thương hiệu NGUYEN TU FASHION. Dấu Swoosh đen tương phản trên nền da trắng cao cấp, chuẩn phong cách quý ông đường phố.'
    },
    {
      id: 'nt-33',
      title: 'Giày Sneaker Nike Air Force 1 Low x Louis Vuitton Denim Monogram',
      category: 'shoes',
      categoryName: 'Giày Sneaker Luxury',
      price: 980000,
      oldPrice: 1350000,
      rating: 5.0,
      reviews: 320,
      badge: 'hot',
      isLocal: false,
      image: 'assets/images/products/giay-nike-air-force-1-louis-vuitton-denim.png',
      imageHover: 'assets/images/products/giay-nike-air-force-1-louis-vuitton-denim.png',
      sizes: ['39', '40', '41', '42', '43'],
      colors: ['#ffffff', '#1e3a8a'],
      description: 'Siêu phẩm hợp tác huyền thoại giữa Nike và Louis Vuitton phong cách Virgil Abloh. Thân giày dập vân hoa Monogram trắng sữa kết hợp dấu Swoosh bằng vải denim dệt họa tiết LV xanh chàm độc bản.'
    },
    {
      id: 'nt-34',
      title: 'Giày Sneaker Nike Air Jordan 1 Low Vintage Navy Sail Đế Ngà',
      category: 'shoes',
      categoryName: 'Giày Sneaker',
      price: 860000,
      oldPrice: 1120000,
      rating: 4.9,
      reviews: 196,
      badge: 'new',
      isLocal: true,
      image: 'assets/images/products/giay-nike-air-jordan-1-low-vintage-navy-sail.png',
      imageHover: 'assets/images/products/giay-nike-air-jordan-1-low-vintage-navy-sail.png',
      sizes: ['39', '40', '41', '42', '43'],
      colors: ['#1e293b', '#fef3c7', '#d97706'],
      description: 'Vibe vintage retro cổ điển với đế giữa màu vàng ngà (Aged Sail), thân giày da lộn phối da trơn màu kem vani và xanh navy đậm. Dây buộc dệt xơ cổ điển, logo Jumpman thêu chỉ vàng đồng sang trọng.'
    },
    {
      id: 'nt-35',
      title: 'Giày Sneaker Adidas Originals Samba OG Trắng Sọc Đen Đế Gum',
      category: 'shoes',
      categoryName: 'Giày Sneaker Retro',
      price: 790000,
      oldPrice: 990000,
      rating: 4.9,
      reviews: 340,
      badge: 'hot',
      isLocal: false,
      image: 'assets/images/products/giay-adidas-samba-og-trang-soc-den.png',
      imageHover: 'assets/images/products/giay-adidas-samba-og-trang-soc-den.png',
      sizes: ['39', '40', '41', '42', '43'],
      colors: ['#ffffff', '#111111', '#78350f'],
      description: 'Đôi giày quốc dân đang làm mưa làm gió trong giới thời trang thế giới. Chất liệu da mềm cao cấp phối mũi da lộn chữ T màu xám tro, 3 sọc da đen răng cưa và đế cao su nâu gum bám đường cực tốt.'
    },
    {
      id: 'nt-36',
      title: 'Mũ Lưỡi Trai Louis Vuitton Monogram Hoa Ren Xanh Khói',
      category: 'hat',
      categoryName: 'Mũ & Nón Nam',
      price: 280000,
      oldPrice: 360000,
      rating: 4.9,
      reviews: 172,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/mu-luoi-trai-lv-monogram-hoa-ren-denim.png',
      imageHover: 'assets/images/products/mu-luoi-trai-lv-monogram-hoa-ren-denim.png',
      sizes: ['Freesize'],
      colors: ['#1e3a5f', '#f1f5f9'],
      description: 'Chất liệu vải denim dệt họa tiết Monogram kết hợp hoa lá ren phong cách Hawaii, tone xoẹt tone hoàn hảo cùng áo sơ mi nt-26. Khóa kim loại dập nổi logo phía sau tùy chỉnh vòng đầu êm ái.'
    },
    {
      id: 'nt-37',
      title: 'Mũ Bucket Tai Bèo Louis Vuitton Denim Monogram Thêu Hoa',
      category: 'hat',
      categoryName: 'Mũ Bucket Nam',
      price: 320000,
      oldPrice: 420000,
      rating: 5.0,
      reviews: 198,
      badge: 'best',
      isLocal: true,
      image: 'assets/images/products/mu-bucket-lv-denim-monogram-theu-hoa.png',
      imageHover: 'assets/images/products/mu-bucket-lv-denim-monogram-theu-hoa.png',
      sizes: ['Freesize'],
      colors: ['#1e293b', '#f8fafc'],
      description: 'Dáng mũ bucket vành tròn trẻ trung, chất vải jean denim xanh wash phủ kín logo LV Monogram kèm các bông hoa nổi 3D đa sắc màu. Vành nón may dập 4 đường chỉ chắc chắn, che nắng cực tốt khi du lịch, dạo phố.'
    },
    {
      id: 'nt-38',
      title: 'Mũ Lưỡi Trai Nike Heritage 86 Trắng Thêu Swoosh Đen',
      category: 'hat',
      categoryName: 'Mũ Thể Thao',
      price: 220000,
      oldPrice: 290000,
      rating: 4.9,
      reviews: 260,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/mu-luoi-trai-nike-heritage-trang-swoosh-den.png',
      imageHover: 'assets/images/products/mu-luoi-trai-nike-heritage-trang-swoosh-den.png',
      sizes: ['Freesize'],
      colors: ['#ffffff', '#111111'],
      description: 'Mẫu nón kết quốc dân form mềm Heritage 86, chất vải 100% cotton twill thoáng mát, thấm hút mồ hôi. Logo Nike Swoosh thêu 3D nổi bật trước trán, quai cài kim loại mạ bạc chống rỉ sét.'
    },
    {
      id: 'nt-39',
      title: 'Mũ Lưỡi Trai Adidas Họa Tiết Hoa Cỏ Dại Sketch Màu Kem',
      category: 'hat',
      categoryName: 'Mũ Thể Thao',
      price: 240000,
      oldPrice: 320000,
      rating: 4.8,
      reviews: 135,
      badge: 'new',
      isLocal: false,
      image: 'assets/images/products/mu-luoi-trai-adidas-hoa-co-sketch-kem.png',
      imageHover: 'assets/images/products/mu-luoi-trai-adidas-hoa-co-sketch-kem.png',
      sizes: ['Freesize'],
      colors: ['#fef3c7', '#78350f'],
      description: 'Tone màu kem vintage ấm áp điểm xuyết họa tiết hoa cỏ dại vẽ nét phác thảo (sketch) nghệ thuật. Logo Adidas 3 thanh dập nổi silicone màu trắng tinh tế, phù hợp cho cả đi chơi và thể thao golf.'
    },
    {
      id: 'nt-40',
      title: 'Mũ Lưỡi Trai Adidas Đồ Họa Zig-Zag Xanh Trắng Thể Thao',
      category: 'hat',
      categoryName: 'Mũ Thể Thao',
      price: 250000,
      oldPrice: 330000,
      rating: 4.9,
      reviews: 148,
      badge: 'new',
      isLocal: true,
      image: 'assets/images/products/mu-luoi-trai-adidas-do-hoa-zig-zag-xanh-trang.png',
      imageHover: 'assets/images/products/mu-luoi-trai-adidas-do-hoa-zig-zag-xanh-trang.png',
      sizes: ['Freesize'],
      colors: ['#1e3a8a', '#ffffff'],
      description: 'Họa tiết ziczac hình khối đồ họa năng động xanh navy và trắng tương phản, chất vải poly tái chế nhẹ tênh chống tia UV. Khóa dán điều chỉnh nhanh phía sau cùng logo thêu chữ ký thể thao bên hông.'
    },
    {
      id: 'nt-41',
      title: 'Áo Thun Louis Vuitton Hộp Chữ Đồ Chơi Xếp Hình Trắng',
      category: 'tee',
      categoryName: 'Áo Thun Nam',
      price: 380000,
      oldPrice: 480000,
      rating: 4.9,
      reviews: 184,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/ao-thun-lv-xep-hinh-building-blocks-trang.png',
      imageHover: 'assets/images/products/ao-thun-lv-xep-hinh-building-blocks-trang.png',
      sizes: ['M', 'L', 'XL', '2XL'],
      colors: ['#ffffff', '#ec4899', '#3b82f6'],
      description: 'Chất liệu 100% cotton 2 chiều 250gsm dày dặn, đứng phom. Điểm nhấn là họa tiết in đồ họa hộp chữ xếp hình Louis Vuitton đa sắc màu sáng tạo, phối cùng con súc sắc monogram rơi phía dưới trẻ trung, cá tính.'
    },
    {
      id: 'nt-42',
      title: 'Áo Thun Nike x Louis Vuitton Drip Swoosh Monogram',
      category: 'tee',
      categoryName: 'Áo Thun Nam',
      price: 390000,
      oldPrice: 490000,
      rating: 5.0,
      reviews: 245,
      badge: 'best',
      isLocal: true,
      image: 'assets/images/products/ao-thun-nike-lv-drip-swoosh-monogram.png',
      imageHover: 'assets/images/products/ao-thun-nike-lv-drip-swoosh-monogram.png',
      sizes: ['M', 'L', 'XL', '2XL'],
      colors: ['#111111', '#ffffff', '#78350f'],
      description: 'Sự kết hợp bùng nổ giữa tinh thần thể thao Nike và sự xa xỉ của Louis Vuitton. Biểu tượng dấu Swoosh dệt họa tiết LV Monogram da nâu hiệu ứng sơn tan chảy (drip) độc đáo trên nền áo đen & trắng, tag cam sang trọng.'
    },
    {
      id: 'nt-43',
      title: 'Áo Thun Louis Vuitton Họa Tiết Phác Thảo Chim & Ruy Băng Kem',
      category: 'tee',
      categoryName: 'Áo Thun Nam',
      price: 420000,
      oldPrice: 520000,
      rating: 4.9,
      reviews: 167,
      badge: 'new',
      isLocal: true,
      image: 'assets/images/products/ao-thun-lv-chim-va-ruy-bang-kem.png',
      imageHover: 'assets/images/products/ao-thun-lv-chim-va-ruy-bang-kem.png',
      sizes: ['M', 'L', 'XL', '2XL'],
      colors: ['#fef3c7', '#1c1917'],
      description: 'Thiết kế hội họa nghệ thuật đỉnh cao với dải ruy băng uốn lượn tạo hình logo LV lồng ghép đôi chim bồ câu tung cánh theo phong cách phác thảo nét chì than (charcoal sketch). Gam màu trắng kem vintage trang nhã.'
    },
    {
      id: 'nt-44',
      title: 'Áo Thun Polo Louis Vuitton Cổ Bẻ Xanh Navy Thêu Logo Ngực',
      category: 'tee',
      categoryName: 'Áo Polo Nam',
      price: 450000,
      oldPrice: 580000,
      rating: 4.9,
      reviews: 192,
      badge: 'hot',
      isLocal: false,
      image: 'assets/images/products/ao-polo-lv-navy-theu-logo-nguc.png',
      imageHover: 'assets/images/products/ao-polo-lv-navy-theu-logo-nguc.png',
      sizes: ['M', 'L', 'XL', '2XL'],
      colors: ['#1e293b', '#f1f5f9'],
      description: 'Dáng áo polo cổ bẻ lịch lãm chuẩn quý ông streetwear, chất vải thun cá sấu pique cao cấp co giãn 4 chiều thoáng khí. Ngực áo thêu vi tính logo LV màu trắng bạc cách điệu cùng các đốm hoa monogram thanh lịch.'
    },
    {
      id: 'nt-45',
      title: 'Áo Thun Louis Vuitton Thêu Lưng Phong Cảnh Chùa & Núi Phú Sĩ',
      category: 'tee',
      categoryName: 'Áo Thun Nam',
      price: 450000,
      oldPrice: 590000,
      rating: 5.0,
      reviews: 215,
      badge: 'best',
      isLocal: true,
      image: 'assets/images/products/ao-thun-lv-theu-lung-chua-nhat-ban-navy.png',
      imageHover: 'assets/images/products/ao-thun-lv-theu-lung-chua-nhat-ban-navy.png',
      sizes: ['M', 'L', 'XL', '2XL'],
      colors: ['#1e293b', '#ffffff'],
      description: 'Kiệt tác thời trang với bức tranh thêu chỉ nổi toàn bộ sau lưng mô phỏng phong cảnh chùa cổ 5 tầng và núi Phú Sĩ Nhật Bản phối cùng logo Paris LV. Form áo oversize rộng rủ phóng khoáng trên nền xanh navy đậm.'
    },
    {
      id: 'nt-46',
      title: 'Túi Trống Du Lịch Louis Vuitton Keepall Bandoulière 55 Monogram',
      category: 'bag',
      categoryName: 'Túi Du Lịch Nam',
      price: 1250000,
      oldPrice: 1650000,
      rating: 5.0,
      reviews: 142,
      badge: 'best',
      isLocal: true,
      image: 'assets/images/products/tui-trong-lv-keepall-55-monogram-nau.png',
      imageHover: 'assets/images/products/tui-trong-lv-keepall-55-monogram-nau.png',
      sizes: ['55cm'],
      colors: ['#78350f', '#d97706'],
      description: 'Biểu tượng du lịch xa xỉ vượt thời gian kể từ năm 1930. Chất liệu Canvas Monogram phủ lớp chống thấm nước bền bỉ, quai xách đôi bằng da bò tự nhiên Vachetta may chỉ vàng nổi bật, phụ kiện khóa mạ vàng đồng sang trọng và dây đeo vai tháo rời linh hoạt.'
    },
    {
      id: 'nt-47',
      title: 'Túi Cầm Tay Clutch Louis Vuitton Toiletry Pouch 26 Monogram',
      category: 'bag',
      categoryName: 'Túi Clutch Cầm Tay',
      price: 680000,
      oldPrice: 890000,
      rating: 4.9,
      reviews: 188,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/tui-clutch-lv-toiletry-pouch-monogram.png',
      imageHover: 'assets/images/products/tui-clutch-lv-toiletry-pouch-monogram.png',
      sizes: ['26cm'],
      colors: ['#78350f', '#fef3c7'],
      description: 'Mẫu clutch cầm tay dáng hộp rộng rãi size 26 đựng vừa iPad mini, điện thoại, ví tiền và mỹ phẩm tiện lợi. Họa tiết hoa monogram nâu huyền thoại, lót trong bằng da hạt cao cấp dễ dàng lau chùi, khóa kéo mạ vàng mượt mà.'
    },
    {
      id: 'nt-48',
      title: 'Balo Phượt Nam Louis Vuitton Christopher PM Monogram Eclipse Đen',
      category: 'bag',
      categoryName: 'Balo Nam Cao Cấp',
      price: 1450000,
      oldPrice: 1950000,
      rating: 5.0,
      reviews: 164,
      badge: 'best',
      isLocal: true,
      image: 'assets/images/products/balo-lv-christopher-backpack-monogram-eclipse-den.png',
      imageHover: 'assets/images/products/balo-lv-christopher-backpack-monogram-eclipse-den.png',
      sizes: ['PM'],
      colors: ['#1e293b', '#111111'],
      description: 'Chiếc balo quân đội tái hiện phong cách dã ngoại sành điệu trong chất liệu Monogram Eclipse xám đen nam tính. Thiết kế nắp gập khóa bấm cài da thật, hai ngăn phụ tiện dụng bên hông và khoang chứa rộng có ngăn riêng cho laptop 15.6 inch.'
    },
    {
      id: 'nt-49',
      title: 'Balo Nam Louis Vuitton Discovery Monogram Denim Xanh Wash',
      category: 'bag',
      categoryName: 'Balo Nam Cao Cấp',
      price: 1350000,
      oldPrice: 1750000,
      rating: 4.9,
      reviews: 129,
      badge: 'new',
      isLocal: false,
      image: 'assets/images/products/balo-lv-discovery-denim-monogram-xanh-wash.png',
      imageHover: 'assets/images/products/balo-lv-discovery-denim-monogram-xanh-wash.png',
      sizes: ['Standard'],
      colors: ['#1e3a8a', '#ffffff'],
      description: 'Chất vải Jean Denim xanh wash loang phủ kín hoa văn Monogram màu trắng bụi bặm, đậm chất streetwear giới trẻ. Form balo hình vòm ôm lưng êm ái với đệm mút lưới thoáng khí, phối quai da và khóa kéo khắc logo LV tinh xảo.'
    },
    {
      id: 'nt-50',
      title: 'Túi Đeo Chéo Nam Louis Vuitton S-Lock Messenger Da Taurillon Đen Nhám',
      category: 'bag',
      categoryName: 'Túi Đeo Chéo Nam',
      price: 950000,
      oldPrice: 1250000,
      rating: 4.9,
      reviews: 175,
      badge: 'hot',
      isLocal: true,
      image: 'assets/images/products/tui-deo-cheo-lv-s-lock-messenger-da-taurillon-den.png',
      imageHover: 'assets/images/products/tui-deo-cheo-lv-s-lock-messenger-da-taurillon-den.png',
      sizes: ['Freesize'],
      colors: ['#111111', '#1f2937'],
      description: 'Kiểu dáng messenger hình hộp vuông vức thời thượng chế tác từ da bò Taurillon dập nổi vân Monogram sâu sắc nét. Điểm nhấn là khóa bấm S-Lock đen nhám lấy cảm hứng từ khóa rương cổ điển năm 1886 của hãng, quai đeo bản to dệt chữ Louis Vuitton nổi.'
    }
  ]);

  // ==========================================
  // 2. STATE MANAGEMENT
  // ==========================================
  const normalizeCart = (rawCart) => {
    if (!Array.isArray(rawCart)) return [];
    return rawCart.map(item => {
      const q = Math.max(1, Number(item.qty || item.quantity || 1));
      let p = Number(item.price);
      if (isNaN(p) || p <= 0) p = 450000;
      return {
        ...item,
        id: item.id || item.productId || 'item-' + Date.now(),
        productId: item.productId || item.id || 'item-' + Date.now(),
        qty: q,
        quantity: q,
        price: p
      };
    });
  };

  let cart = (typeof window.getCart === 'function') ? window.getCart() : normalizeCart(JSON.parse(localStorage.getItem('nguyentu_cart') || '[]'));
  let wishlist = JSON.parse(localStorage.getItem('nguyentu_wishlist') || '[]');
  let currentFilter = 'all';
  let currentSort = 'default';
  let appliedDiscount = 0; // % or fixed
  let discountType = null;
  const FREE_SHIP_THRESHOLD = 299000;

  // Format Currency VND
  const formatVND = (num) => {
    const val = Number(num);
    if (isNaN(val) || !isFinite(val)) return '0₫';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
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
    cart = normalizeCart(cart);
    localStorage.setItem('nguyentu_cart', JSON.stringify(cart));
    localStorage.setItem('nguyentu_wishlist', JSON.stringify(wishlist));
    if (window.updateCartCounters) window.updateCartCounters();
    updateCartUI();
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
  };

  // ==========================================
  // 3. RENDER PRODUCTS
  // ==========================================
  const syncDynamicProducts = () => {
    // 1. Lấy danh sách sản phẩm thực tế từ window.ALL_PRODUCTS hoặc getStoredProducts
    let currentList = (window.ALL_PRODUCTS && window.ALL_PRODUCTS.length > 0)
      ? window.ALL_PRODUCTS.slice()
      : (window.getStoredProducts ? window.getStoredProducts() : (window.DEFAULT_PRODUCTS || []).slice());

        try {
      localStorage.removeItem('nguyentu_deleted_product_ids');
    } catch (e) {}
    if (!currentList || currentList.length < 50) {
      currentList = (window.DEFAULT_PRODUCTS || []).slice();
    }

    // 3. Áp dụng các thay đổi giá ghi đè mới nhất
    try {
      const overrides = JSON.parse(localStorage.getItem('nguyentu_price_overrides') || '{}');
      if (overrides && Object.keys(overrides).length > 0) {
        currentList.forEach(p => {
          if (overrides[p.id]) {
            Object.assign(p, overrides[p.id]);
          }
        });
      }
    } catch (e) {}

    PRODUCTS = currentList;
    window.ALL_PRODUCTS = currentList;

    // 4. Cập nhật giá trên các thẻ Lookbook trang chủ
    try {
      document.querySelectorAll('.lookbook-card-item').forEach(card => {
        const onClickAttr = card.getAttribute('onclick') || '';
        const match = onClickAttr.match(/['"](nt-\d+)['"]/);
        if (match) {
          const id = match[1];
          const p = PRODUCTS.find(x => x.id === id);
          if (p) {
            card.style.display = '';
            const priceEl = card.querySelector('.lookbook-card-price');
            if (priceEl) {
              priceEl.innerHTML = `${formatVND(p.price)} ${p.oldPrice ? `<span style="font-size:0.75rem; color:var(--text-muted); text-decoration:line-through;">${formatVND(p.oldPrice)}</span>` : ''}`;
            }
          } else {
            // Ẩn lookbook nếu sản phẩm đó đã bị xóa
            card.style.display = 'none';
          }
        }
      });
    } catch (e) {}
  };

  const renderProductGrid = () => {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    syncDynamicProducts();

    let filtered = PRODUCTS.filter(p => {
      if (currentFilter === 'all') return true;
      if (currentFilter === 'local') return p.isLocal;
      if (currentFilter === 'jacket' || currentFilter === 'hoodie') return p.category === 'jacket' || p.category === 'tracksuit';
      if (currentFilter === 'shirt') return p.category === 'shirt';
      if (currentFilter === 'tee') return p.category === 'tee';
      if (currentFilter === 'pants' || currentFilter === 'jeans') return p.category === 'pants';
      if (currentFilter === 'short') return p.category === 'short';
      if (currentFilter === 'shoes' || currentFilter === 'sneaker') return p.category === 'shoes';
      if (currentFilter === 'hat' || currentFilter === 'accessories') return p.category === 'hat';
      if (currentFilter === 'bag' || currentFilter === 'backpack') return p.category === 'bag';
      if (currentFilter === 'tracksuit') return p.category === 'tracksuit';
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

      return `
        <article class="product-card" data-id="${p.id}">
          <div class="product-thumb-wrap">
            
            <button class="btn-wishlist ${isWishlisted ? 'active' : ''}" 
                    aria-label="Thêm vào yêu thích" 
                    onclick="window.toggleWishlist('${p.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <a href="product-detail.html?id=${p.id}" class="product-thumb-link">
              <img class="product-img" src="${p.image}" alt="${p.title}" loading="lazy">
              <img class="product-img-hover" src="${p.imageHover}" alt="${p.title}" loading="lazy">
            </a>

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
            <h3 class="product-title" title="${p.title}">
              <a href="product-detail.html?id=${p.id}" style="color:inherit; text-decoration:none;">${p.title}</a>
            </h3>
            
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

    if (window.updateCatalogArrows) {
      setTimeout(window.updateCatalogArrows, 100);
    }
  };

  // Lắng nghe cập nhật giá mới từ API hoặc localStorage để lập tức làm mới trang chủ
  window.addEventListener('productsUpdated', () => {
    syncDynamicProducts();
    renderProductGrid();
  });

  if (window.loadAllProducts) {
    window.loadAllProducts().then(() => {
      syncDynamicProducts();
      renderProductGrid();
    });
  }

  // ==========================================
  // 4. CART LOGIC & DRAWER
  // ==========================================
  window.fastAddToCart = (productId) => {
    syncDynamicProducts();
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
    const curQty = Math.max(1, Number(cart[index].qty || cart[index].quantity || 1));
    const newQty = curQty + delta;
    if (newQty <= 0) {
      cart.splice(index, 1);
      showToast('Đã xóa sản phẩm khỏi giỏ hàng', '🗑️');
    } else {
      cart[index].qty = newQty;
      cart[index].quantity = newQty;
    }
    saveState();
  };

  window.removeCartItem = (index) => {
    cart.splice(index, 1);
    saveState();
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', '🗑️');
  };

  const updateCartUI = () => {
    if (typeof window.getCart === 'function') {
      cart = normalizeCart(window.getCart());
    } else {
      cart = normalizeCart(JSON.parse(localStorage.getItem('nguyentu_cart') || '[]'));
    }
    const badgeElements = document.querySelectorAll('.cart-count-badge');
    const totalItems = cart.reduce((sum, item) => sum + Math.max(1, Number(item.qty || item.quantity || 1)), 0);
    badgeElements.forEach(el => {
      el.textContent = totalItems;
      el.style.display = totalItems > 0 ? 'inline-flex' : 'none';
    });

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

    const subtotal = cart.reduce((sum, item) => {
      const q = Math.max(1, Number(item.qty || item.quantity || 1));
      const p = Number(item.price) || 0;
      return sum + (p * q);
    }, 0);
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

    drawerBody.innerHTML = cart.map((item, idx) => {
      const itemQty = Math.max(1, Number(item.qty || item.quantity || 1));
      const itemPrice = Number(item.price) || 0;
      return `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.image || 'assets/images/products/ao-khoac-argentina-trang.png'}" alt="${item.title}">
        <div class="cart-item-details">
          <div>
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-attr">Size: <strong>${item.size || 'M'}</strong> | Màu: <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${item.color || '#111'};vertical-align:middle;border:1px solid #ccc;"></span></div>
          </div>
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button class="qty-btn" onclick="window.updateCartQty(${idx}, -1)">-</button>
              <span class="qty-num">${itemQty}</span>
              <button class="qty-btn" onclick="window.updateCartQty(${idx}, 1)">+</button>
            </div>
            <div class="cart-item-price">${formatVND(itemPrice * itemQty)}</div>
          </div>
          <span class="cart-item-remove" onclick="window.removeCartItem(${idx})">Xóa</span>
        </div>
      </div>
    `;}).join('');
  };

  // Open & Close Drawer
  const openCartDrawer = () => {
    if (typeof window.getCart === 'function') {
      cart = normalizeCart(window.getCart());
    } else {
      cart = normalizeCart(JSON.parse(localStorage.getItem('nguyentu_cart') || '[]'));
    }
    updateCartUI();
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
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
    syncDynamicProducts();
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
          ${product.imageHover && product.imageHover !== product.image ? `
          <div style="display:flex; gap:10px; margin-top:12px;">
            <img src="${product.image}" style="width:60px; height:60px; object-fit:cover; border-radius:6px; cursor:pointer; border:2px solid #ffffff;" onclick="document.getElementById('quick-main-img').src='${product.image}'">
            <img src="${product.imageHover}" style="width:60px; height:60px; object-fit:cover; border-radius:6px; cursor:pointer; border:1px solid rgba(255,255,255,0.3);" onclick="document.getElementById('quick-main-img').src='${product.imageHover}'">
          </div>
          ` : ''}
        </div>

        <div>
          <span style="font-size:0.75rem; font-weight:800; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.08em;">${product.categoryName}</span>
          <h2 style="font-family:var(--font-heading); font-size:1.4rem; font-weight:800; margin:6px 0 12px; text-transform:uppercase; color:#ffffff;">${product.title}</h2>
          
          <div style="display:flex; align-items:baseline; gap:12px; margin-bottom:16px;">
            <span style="font-size:1.5rem; font-weight:900; color:#ffffff;">${formatVND(product.price)}</span>
            ${product.oldPrice ? `<span style="font-size:1rem; color:var(--text-muted); text-decoration:line-through;">${formatVND(product.oldPrice)}</span>` : ''}
          </div>

          <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:20px; line-height:1.6;">${product.description}</p>
          
          <div style="margin-bottom:16px;">
            <div style="font-size:0.8125rem; font-weight:700; text-transform:uppercase; margin-bottom:8px; color:#ffffff;">Chọn Size:</div>
            <div class="size-selector">
              ${product.sizes.map((s, idx) => `
                <button class="size-option-btn ${idx === 0 ? 'active' : ''}" onclick="window.selectQuickSize(this, '${s}')">${s}</button>
              `).join('')}
            </div>
          </div>

          <div style="margin-bottom:24px;">
            <div style="font-size:0.8125rem; font-weight:700; text-transform:uppercase; margin-bottom:8px; color:#ffffff;">Màu sắc:</div>
            <div style="display:flex; gap:10px;">
              ${product.colors.map((c, idx) => `
                <button style="width:30px; height:30px; border-radius:50%; background:${c}; border:${idx === 0 ? '3px solid #ffffff' : '1px solid rgba(255,255,255,0.3)'}; cursor:pointer;" onclick="window.selectQuickColor(this, '${c}')"></button>
              `).join('')}
            </div>
          </div>

          <div style="display:flex; gap:12px;">
            <button class="btn btn-primary" style="flex:1;" onclick="window.submitQuickAddToCart('${product.id}')">
              🛍️ Thêm Vào Giỏ Hàng
            </button>
            <button class="btn btn-outline-white" onclick="window.toggleWishlist('${product.id}')">
              ❤️ Yêu Thích
            </button>
          </div>

          <a href="product-detail.html?id=${product.id}" class="btn btn-outline-white" style="display:block; text-align:center; margin-top:10px; font-size:0.8125rem;">
            Xem Chi Tiết Đầy Đủ & Đánh Giá →
          </a>

          <div style="margin-top:20px; padding:12px; background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.12); border-radius:8px; font-size:0.75rem; color:var(--text-secondary);">
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
    btn.parentElement.querySelectorAll('button').forEach(b => b.style.border = '1px solid rgba(255,255,255,0.3)');
    btn.style.border = '3px solid #ffffff';
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
  const updateCircleActiveState = (category) => {
    document.querySelectorAll('.category-circle-item').forEach(item => {
      const onclickAttr = item.getAttribute('onclick') || '';
      if (onclickAttr.includes(`'${category}'`)) {
        item.classList.add('active');
      } else if (!onclickAttr.includes('flash-sale')) {
        item.classList.remove('active');
      }
    });
  };

  const filterButtons = document.querySelectorAll('.tab-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      updateCircleActiveState(currentFilter);
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
    updateCircleActiveState(category);
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
          Gợi ý tìm kiếm phổ biến tại Ninh Bình: <strong>Mũ bucket LV</strong>, <strong>Jordan 1 Low</strong>, <strong>Adidas Samba</strong>, <strong>Áo thun LV đỏ mận</strong>, <strong>Sơ mi Hawaii</strong>
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



  // ==========================================
  // CATALOG HORIZONTAL SCROLL (Lướt sang trái / phải khoảng tầm 7cm để nhìn rõ sản phẩm)
  // ==========================================
  const initCatalogScroll = () => {
    const viewport = document.getElementById('catalog-scroll-viewport');
    const prevBtn = document.getElementById('catalog-scroll-prev');
    const nextBtn = document.getElementById('catalog-scroll-next');
    if (!viewport) return;

    const scrollStep = 280; // Bước lướt khoảng tầm 7cm (~280px)

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        viewport.scrollBy({ left: -scrollStep, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        viewport.scrollBy({ left: scrollStep, behavior: 'smooth' });
      });
    }

    // Kéo thả chuột để lướt trái / phải tự nhiên trên desktop
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasMoved = false;

    viewport.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, a, input, select')) return;
      isDown = true;
      hasMoved = false;
      viewport.classList.add('is-dragging');
      startX = e.pageX - viewport.offsetLeft;
      scrollLeft = viewport.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      viewport.classList.remove('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      hasMoved = true;
      const x = e.pageX - viewport.offsetLeft;
      const walk = (x - startX) * 1.5;
      viewport.scrollLeft = scrollLeft - walk;
    });

    viewport.addEventListener('click', (e) => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
        hasMoved = false;
      }
    }, true);

    const updateArrows = () => {
      if (!prevBtn || !nextBtn) return;
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      if (maxScroll <= 15) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        prevBtn.style.opacity = viewport.scrollLeft <= 10 ? '0.2' : '1';
        prevBtn.style.pointerEvents = viewport.scrollLeft <= 10 ? 'none' : 'auto';
        nextBtn.style.opacity = viewport.scrollLeft >= maxScroll - 10 ? '0.2' : '1';
        nextBtn.style.pointerEvents = viewport.scrollLeft >= maxScroll - 10 ? 'none' : 'auto';
      }
    };

    viewport.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    window.updateCatalogArrows = updateArrows;
    setTimeout(updateArrows, 150);
  };

  // Mobile drawer trigger
  window.toggleMobileMenu = () => {
    if (typeof window.openMobileMenu === 'function' && typeof window.closeMobileMenu === 'function') {
      const drawer = document.getElementById('mobile-nav-drawer');
      if (drawer && drawer.classList.contains('active')) {
        window.closeMobileMenu();
      } else {
        window.openMobileMenu();
      }
    } else {
      document.getElementById('mobile-nav-drawer')?.classList.toggle('active');
      document.getElementById('mobile-drawer-backdrop')?.classList.toggle('active');
    }
  };

  // ==========================================
  // INITIALIZE
  // ==========================================
  // Reactive cart updates across tabs and bfcache
  window.addEventListener('storage', (e) => {
    if (!e || e.key === 'nguyentu_cart' || e.key === 'nguyentu_wishlist') {
      if (typeof window.getCart === 'function') {
        cart = normalizeCart(window.getCart());
      }
      updateCartUI();
    }
  });

  window.addEventListener('pageshow', () => {
    if (typeof window.getCart === 'function') {
      cart = normalizeCart(window.getCart());
    }
    updateCartUI();
  });

  window.addEventListener('cartUpdated', (e) => {
    if (e.detail && e.detail.cart) {
      cart = normalizeCart(e.detail.cart);
    } else if (typeof window.getCart === 'function') {
      cart = normalizeCart(window.getCart());
    }
    updateCartUI();
  });

  renderProductGrid();
  initCatalogScroll();
  updateCartUI();
  updateWishlistUI();
  computeSmartSize();
  startCountdown();
});
