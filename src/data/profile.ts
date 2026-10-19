// Toàn bộ nội dung của website nằm ở file này.
// Muốn sửa chữ, thêm dự án hay đổi link: chỉ cần sửa ở đây.

export type Role = 'Frontend' | 'Fullstack';

export type Project = {
  id: string;
  name: string;
  summary: string;
  role: Role;
  period: string;
  link?: { href: string; label: string; note?: string };
  linkNote?: string;
  description: string;
  stack: string[];
  contributions: string[];
};

export type Job = {
  company: string;
  period: string;
  positions: { title: string; period: string }[];
  note?: string;
  projects?: { name: string; period: string; stack: string; description: string }[];
};

export const profile = {
  name: 'Ngô Nguyễn Chí Công',
  shortName: 'Chí Công',
  title: 'Fullstack Developer, Frontend First',
  intro:
    'Tôi xây sản phẩm web và app di động cho toà soạn, doanh nghiệp và các nền tảng nội dung: từ giao diện, trình soạn thảo đến API, hàng đợi và hạ tầng triển khai.',
  about: [
    'Tôi khởi đầu với vai trò UI/UX Designer rồi chuyển sang viết code. Nền tảng thiết kế giúp tôi làm giao diện kỹ ở từng chi tiết, còn những năm gần đây tôi làm cả backend: NestJS, Prisma, hàng đợi BullMQ, realtime với Socket.IO.',
    'Từ 2025 tôi làm ở NetSpace, phát triển hệ sinh thái AntCMS cho các toà soạn (VietPress, Góc Nhìn Mới, phobienphapluat.vn), thư viện template E-magazine dùng chung, cổng thông tin kol.gov.vn, hệ thống kiểm duyệt video bằng AI và các app di động React Native cho Thiên Khôi Group.',
  ],
  // File CV đặt trong thư mục public/. Thay file mới thì giữ nguyên tên, hoặc sửa đường dẫn ở đây.
  cv: { href: '/CV-Ngo-Nguyen-Chi-Cong.pdf', fileName: 'CV-Ngo-Nguyen-Chi-Cong.pdf' },
  contact: {
    email: 'congnnc38@gmail.com',
    phone: '+84 33 224 9402',
    phoneHref: 'tel:+84332249402',
    linkedin: 'https://www.linkedin.com/in/chicongzz',
    linkedinLabel: 'in/chicongzz',
  },
  education: {
    school: 'Đại học Công nghiệp Hà Nội',
    major: 'Công nghệ thông tin',
  },
  languages: [
    { name: 'Tiếng Việt', level: 'Bản ngữ' },
    { name: 'Tiếng Anh', level: 'Trung cấp' },
  ],
};

export const projects: Project[] = [
  {
    id: 'kolhub',
    name: 'KOL Hub',
    summary: 'Sàn kết nối chiến dịch giữa Nhãn hàng và KOL/MCN',
    role: 'Fullstack',
    period: '10/2026 – nay',
    link: { href: 'https://kolhub-dev.netspace.vn/', label: 'kolhub-dev.netspace.vn', note: 'bản dev' },
    description:
      'Nhãn hàng đăng brief, KOL và MCN ứng tuyển, nộp bản nháp, nộp link bài đăng và xác nhận thanh toán. Super Admin duyệt hồ sơ, kênh, chiến dịch, ticket và khiếu nại vi phạm. Database dùng chung với các hệ thống cũ nên mọi bảng mới đều tách tiền tố riêng và đánh dấu nguồn dữ liệu.',
    stack: ['TanStack Start', 'React 19', 'oRPC', 'Drizzle', 'PostgreSQL', 'Better-Auth', 'Tailwind 4', 'Turborepo', 'Bun'],
    contributions: [
      'Tích hợp KOL Hub với KOL Safety để xác thực kênh: kênh TikTok/YouTube phải đạt kiểm duyệt nội dung thì mới vào hàng chờ duyệt.',
      'Liên kết tài khoản bằng SSO, nhận kết quả quét qua webhook; viết tài liệu hợp đồng API giữa hai hệ thống.',
      'Tham gia các luồng fullstack theo vai trò KOL, MCN, Nhãn hàng và Super Admin.',
    ],
  },
  {
    id: 'multi-client',
    name: 'AntCMS Multi-client',
    summary: 'Monorepo nhiều trang tin dùng chung một CMS',
    role: 'Frontend',
    period: '10/2026 – nay',
    link: { href: 'https://phobienphapluat-web-dev.antcms.vn/', label: 'phobienphapluat.vn', note: 'bản dev' },
    description:
      'Mỗi trang tin có giao diện riêng nhưng dùng chung AntCMS và một lớp service gọi API chạy phía server. Có script sinh site mới từ site mẫu và script cấu hình CMS. Site đầu tiên là phobienphapluat.vn.',
    stack: ['Next.js 16', 'React 19', 'TypeScript 6', 'Tailwind 4', 'Turborepo', 'pnpm', 'Vitest', 'Docker'],
    contributions: [
      'Dựng kiến trúc monorepo và package @antcms/api-client cùng các package config dùng chung.',
      'Dựng lại toàn bộ giao diện phobienphapluat.vn và ghép API AntCMS.',
      'Hiển thị Tạp chí in dạng sách lật toàn màn hình; thêm khối Video, Longform, Podcast và quảng cáo MGID.',
      'Dockerfile dùng chung cho mọi site, script cấu hình CMS cho production.',
    ],
  },
  {
    id: 'kol-safety',
    name: 'KOL Safety',
    summary: 'Kiểm duyệt nội dung video tiếng Việt bằng AI',
    role: 'Fullstack',
    period: '07/2026 – nay',
    link: { href: 'https://safety.netspace.vn/', label: 'safety.netspace.vn' },
    description:
      'Chấm Điểm An toàn 0–100 cho từng video, gắn nhãn An toàn / Vùng xám / Vi phạm kèm lý do, bằng chứng theo từng giây và gợi ý sửa. Kiểm tra video trước khi đăng, khám kênh TikTok/YouTube hàng loạt. Kiến trúc: Next.js → NestJS + BullMQ worker → ML service Python (ASR, NSFW) → Gemini.',
    stack: ['Next.js 15', 'NestJS 10', 'Prisma', 'PostgreSQL', 'BullMQ', 'Redis', 'FastAPI', 'faster-whisper', 'Gemini'],
    contributions: [
      'Khám kênh YouTube qua 3 giai đoạn: kết nối kênh, quét hàng loạt video ngắn, quét video dài có tiến độ.',
      'Khung làm việc kênh TikTok/YouTube theo kiểu YouTube Studio: lọc, chọn video, xếp hàng quét, phân trang.',
      'Tích hợp crawler Titan, quét được cả bài đăng dạng slide ảnh TikTok.',
      'Áp Bộ Quy tắc Ứng xử Văn hóa số (QĐ 423/QĐ-BVHTTDL) vào chấm điểm.',
    ],
  },
  {
    id: 'netevent',
    name: 'NetEvent',
    summary: 'Nền tảng SaaS tạo và vận hành sự kiện',
    role: 'Fullstack',
    period: '07/2026',
    link: { href: 'https://event.netspace.vn/', label: 'event.netspace.vn' },
    description:
      'Thay cho việc ghép Google Form, Excel, landing builder, máy quét QR và email thủ công. Mỗi gói thuê bao giới hạn số sự kiện, số vé và thời hạn. Gồm trang đăng ký công khai, CMS quản trị và API chạy trên các subdomain riêng.',
    stack: ['Next.js 16 × 3 app', 'Prisma 7', 'PostgreSQL', 'JWT', 'Mailjet', 'Radix UI', 'Docker', 'GitLab CI'],
    contributions: [
      'Dựng nền tảng monorepo, chuyển từ Multi-Zones sang routing theo subdomain.',
      'Hệ thống nhóm quyền cấu hình được, mời thành viên, chuyển quyền owner, thông báo realtime.',
      'Landing editor, form đăng ký, kho vé; check-in bằng camera; email OTP, vé, nhắc lịch, tổng kết ngày.',
      'Dockerfile, migration, CI; xử lý lỗi deploy thực tế như lệch múi giờ và cạn kết nối DB.',
    ],
  },
  {
    id: 'tkg-mobile',
    name: 'TKG Proptech & Thiên Khôi HRM',
    summary: 'Hai app di động cho đội ngũ môi giới và nhân sự Thiên Khôi Group',
    role: 'Frontend',
    period: '06 – 07/2026',
    linkNote: 'Ứng dụng iOS và Android cho đội ngũ Thiên Khôi Group',
    description:
      'TKG Proptech giúp tư vấn viên và môi giới quản lý kho nguồn hàng bất động sản, ký gửi, giao dịch và tranh chấp. Thiên Khôi HRM quản lý nhân sự theo cơ cấu Miền, Kinh đô, chi nhánh, khối, phòng: tuyển dụng, đào tạo, sự kiện và phân quyền. Thiên Khôi Group được vinh danh Top 5 Proptech 2026 với hệ sinh thái gồm hai app này.',
    stack: ['React Native 0.78', 'TypeScript', 'React Navigation', 'TanStack Query', 'Zustand', 'MMKV', 'React Hook Form', 'Firebase', 'Fastlane'],
    contributions: [
      'TKG Proptech: làm lại màn kho nguồn hàng theo Figma, gồm thẻ nguồn hàng, thanh tìm kiếm, bộ lọc nhanh và sắp xếp, lọc theo loại nguồn và thời gian ký, tag “Triệu đô” và “Dòng tiền ổn định”.',
      'Thiên Khôi HRM: tab lọc nhanh sự kiện có đếm số và ẩn hiện theo quyền; chọn phạm vi người tham gia theo Miền, Kinh đô, Khối, Phòng đúng quyền của từng vai trò; danh sách điểm danh có tìm kiếm, lọc và xuất Excel.',
      'Cảnh báo khi rời màn đang nhập dở cho 28 màn tạo và sửa ở cả hai app; tự điền sẵn form tranh chấp từ dữ liệu vừa nhập.',
      'Mục “Hệ sinh thái Thiên Khôi” trong menu với deep link qua lại giữa hai app; sửa lỗi xem ảnh dạng slide.',
    ],
  },
  {
    id: 'thienviet-id',
    name: 'Thiên Việt ID',
    summary: 'App tài khoản và tiện ích dùng chung cho hệ thống Thiên Việt',
    role: 'Fullstack',
    period: '06/2026',
    linkNote: 'Ứng dụng di động iOS và Android',
    description:
      'Một tài khoản cho cả hệ thống: đăng nhập một lần, nạp tiền và lịch sử giao dịch, chat và gọi thoại, đặt món ở nhà hàng và quán cà phê, đào tạo, tin tức. Nằm trong monorepo Turborepo gồm app Expo, backend ElysiaJS và các web Next.js.',
    stack: ['Expo 55', 'React Native', 'Expo Router', 'ElysiaJS', 'Bun', 'Drizzle', 'PostgreSQL', 'Better Auth', 'TanStack Query', 'Zustand'],
    contributions: [
      'Làm trọn luồng đặt cà phê trên app: menu theo danh mục, món có nhóm tuỳ chọn chọn nhiều và tính thêm tiền, giỏ hàng, thanh toán, nhận voucher.',
      'Phía backend: module đơn hàng, menu và voucher của người dùng (ElysiaJS), schema và migration Drizzle, script tạo dữ liệu mẫu.',
    ],
  },
  {
    id: 'hien-mau',
    name: 'Hiến máu Thiên Khôi',
    summary: 'Quản lý sự kiện hiến máu theo thời gian thực',
    role: 'Fullstack',
    period: '05 – 06/2026',
    link: { href: 'https://hienmau.netspace.vn/', label: 'hienmau.netspace.vn' },
    description:
      'Đăng ký trên landing page, check-in bằng mã QR, điều phối hàng chờ và màn hình TV gọi số có đọc giọng nói. Quầy check-in, người điều phối và màn hình TV đồng bộ realtime.',
    stack: ['Next.js 16', 'Payload CMS 3', 'Socket.IO', 'Redis', 'PostgreSQL', 'TanStack Table', 'Playwright'],
    contributions: [
      'Luồng check-in: tra cứu, cập nhật avatar, xử lý xung đột dữ liệu, danh sách chờ, chứng nhận.',
      'Quản lý hàng chờ và màn hình TV gọi số (TTS, số ghế, gọi lại).',
      'Chuyển realtime từ SSE sang Socket.IO + Redis pub/sub để chạy nhiều pod, cấu hình cho 1.000+ kết nối.',
      'Trang admin với bộ lọc, audit log, xuất Excel và thống kê theo đợt.',
    ],
  },
  {
    id: 'kol-portal',
    name: 'kol.gov.vn',
    summary: 'Cổng thông tin và bảng xếp hạng KOL, MCN',
    role: 'Fullstack',
    period: '03 – 07/2026',
    link: { href: 'https://kol.gov.vn/', label: 'kol.gov.vn' },
    description:
      'Bảng xếp hạng KOL và MCN theo tăng trưởng tương tác thực, Top 100, hồ sơ chi tiết, khai báo hồ sơ cho KOL và MCN, báo cáo vi phạm, tin tức. Kèm nền tảng chiến dịch cho KOL và Nhãn hàng, crawler dữ liệu mạng xã hội chạy nền.',
    stack: ['Next.js 15', 'Prisma', 'PostgreSQL', 'BullMQ', 'Redis', 'Better-Auth', 'Turborepo', 'Kubernetes', 'Laravel Filament'],
    contributions: [
      'Trang chủ, tìm kiếm, Top 100, trang chi tiết KOL và MCN, ticker bảng xếp hạng.',
      'Form khai báo KOL/MCN: upload media, tự nhận diện nền tảng từ link kênh, xác thực nghiệp vụ.',
      'Form báo cáo vi phạm; trang profile và đăng ký chiến dịch trên KOLs Platform.',
      'Trang quản trị Laravel Filament: widget tổng hợp kiểm duyệt theo kỳ trên dashboard báo cáo, lọc bài viết theo nguồn, danh mục hoạt động ở trang Influencer.',
    ],
  },
  {
    id: 'antcms-templates',
    name: 'AntCMS Templates',
    summary: 'Một bộ mã giao diện cho nhiều toà soạn trên AntCMS',
    role: 'Frontend',
    period: '03 – 05/2026',
    linkNote: 'Giao diện cho Reatimes, Thế giới Điện ảnh và Góc Nhìn Mới',
    description:
      'Monorepo cho các trang tin chạy trên AntCMS: mỗi toà soạn (tenant) chọn template, màu và font riêng, dùng chung section, component và lớp gọi API. Gồm app chạy theo tenant và các app riêng cho Reatimes, Thế giới Điện ảnh, Góc Nhìn Mới.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind', 'pnpm', 'Turborepo', 'Docker'],
    contributions: [
      'Trang chủ theo tenant, độ rộng riêng cho từng site; tách tenant khỏi template để một template dùng được cho nhiều toà soạn.',
      'Đổi màu và font theo cấu hình của từng site, áp cả cho trang chi tiết.',
      'Template Cinematic, trang chủ Reatimes, làm lại các trang Thế giới Điện ảnh; trang chuyên mục, chuyên trang, tag, tìm kiếm, video, trung tâm hỗ trợ và bảng thao tác nổi cho template Góc Nhìn Mới.',
    ],
  },
  {
    id: 'emagazine',
    name: 'AntCMS E-magazine',
    summary: 'Thư viện template và trình soạn E-magazine',
    role: 'Frontend',
    period: '01 – 09/2026',
    linkNote: 'Đang chạy trên VietPress và Góc Nhìn Mới',
    description:
      'Template bài E-magazine và Photo story dùng lại cho mọi trang tin trên AntCMS, đóng gói thành npm package theo mô hình Dependency Injection: type-safe, tree-shakeable, chạy với SSR. Biên tập viên chỉnh từng section ngay trên trang và xem trước theo thiết bị.',
    stack: ['React 19', 'TypeScript', 'tsup', 'React Hook Form', 'Swiper', 'Next.js 15'],
    contributions: [
      'Tách template thành package dùng chung, viết tài liệu hợp đồng tích hợp với host.',
      'Các bộ E-magazine 1–4, Business, Sport, Basic, Photo 1–2.',
      'Đổi ảnh, đồng bộ ảnh desktop và mobile, chú thích ảnh cho 19 section, tuỳ chỉnh màu chữ.',
      'Soát chính tả nội dung ngay trong editor.',
    ],
  },
  {
    id: 'thienkhoi-cdc',
    name: 'Thiên Khôi CDC',
    summary: 'Website doanh nghiệp thiết kế và thi công nội thất',
    role: 'Frontend',
    period: '11/2025 – 09/2026',
    link: { href: 'https://thienkhoicdc.com/', label: 'thienkhoicdc.com' },
    description:
      'Trang giới thiệu, dịch vụ, dự án, tin tức, tuyển dụng, tìm kiếm và liên hệ. Song ngữ Việt – Anh, tối ưu SEO.',
    stack: ['Next.js 15', 'TanStack Query', 'Zustand', 'next-intl', 'Framer Motion', 'Tailwind'],
    contributions: [
      'Dựng gần như toàn bộ giao diện, ghép API và đa ngôn ngữ.',
      'SEO kỹ thuật: canonical theo ngôn ngữ, sitemap theo loại nội dung, structured data, cấu trúc heading.',
      'Banner video, chữ chạy, animation và skeleton loading.',
    ],
  },
  {
    id: 'vietpress',
    name: 'VietPress',
    summary: 'Báo điện tử tin tức 24h',
    role: 'Frontend',
    period: '10/2025 – 03/2026',
    link: { href: 'https://vietpress.vn/', label: 'vietpress.vn' },
    description:
      'Báo điện tử chạy trên AntCMS: trang chủ dàn trang theo section, chuyên mục, chủ đề, tag, tìm kiếm, bài E-magazine và video, có giao diện sáng và tối.',
    stack: ['Next.js 15', 'TanStack Query', 'Zustand', 'Swiper', 'React Player', 'Tailwind'],
    contributions: [
      'Header, megamenu, thanh tìm kiếm, breadcrumb, topbar thời tiết.',
      'Các section trang chủ và 7 theme section mới.',
      'Tích hợp E-magazine rồi tách thành package riêng.',
      'Sitemap động, gồm cả Google News sitemap.',
    ],
  },
  {
    id: 'gocnhinmoi',
    name: 'Góc Nhìn Mới',
    summary: 'Tin tức chuyên sâu và cộng đồng độc giả viết bài',
    role: 'Frontend',
    period: '08/2025 – nay',
    link: { href: 'https://gocnhinmoi.com.vn/', label: 'gocnhinmoi.com.vn' },
    description:
      'Độc giả đăng ký, viết bài, gửi ảnh địa điểm, theo dõi tác giả, lưu bài, bình luận, nghe podcast và tạo playlist. Có E-magazine, Photo story, video ngắn và bảng xếp hạng tác giả.',
    stack: ['Next.js 15', 'BlockNote', 'TanStack Query', 'Zustand', 'IndexedDB', 'Tailwind'],
    contributions: [
      'Trang cá nhân, trang tác giả và độc giả, theo dõi, bảng xếp hạng Tác giả nổi bật.',
      'Nghe & Xem: podcast có sóng âm theo tiến trình, playlist phát theo hàng đợi, lịch sử nghe.',
      'Thông báo cho độc giả, viết bài bằng BlockNote, luồng duyệt bài.',
      'Dựng lại trang chủ, chuyên mục, Khám phá; responsive 3 mốc mobile, tablet, desktop.',
    ],
  },
  {
    id: 'antcms',
    name: 'AntCMS',
    summary: 'CMS quản trị cho nhiều toà soạn',
    role: 'Frontend',
    period: '07 – 10/2025',
    linkNote: 'Hệ thống nội bộ',
    description:
      'Mỗi toà soạn là một tenant riêng. Quản lý bài viết, E-magazine, Photo, Video, Podcast, chuyên mục, tác giả, nhuận bút, page builder, menu, banner, SEO, gói thuê bao và phân quyền.',
    stack: ['Laravel 12', 'Filament 4', 'Inertia.js', 'React', 'BlockNote', 'Ant Design', 'Tailwind'],
    contributions: [
      'Trình soạn bài viết bằng BlockNote: upload video, đếm ký tự, lưu dạng JSON/HTML.',
      'Thư viện media, upload và chọn ảnh, sửa thumbnail.',
      'Chấm điểm SEO cho bài viết; popup đổi tác giả, chọn chuyên mục dạng cây, nhuận bút.',
    ],
  },
  {
    id: 'buddhaworlds',
    name: 'BuddhaWorlds',
    summary: 'Thư viện và cổng thông tin Phật giáo đa ngôn ngữ',
    role: 'Frontend',
    period: '06 – 07/2025',
    link: { href: 'https://buddhaworlds.com/', label: 'buddhaworlds.com' },
    description:
      'Thư viện số, bài giảng, video ngắn, tin tức, danh bạ chùa có bản đồ bằng ba thứ tiếng Việt, Anh, Trung. Mỗi chùa có landing page riêng lấy dữ liệu theo mã chùa.',
    stack: ['Next.js 15', 'MUI / Joy UI', 'next-intl', 'Leaflet', 'Zustand', 'shadcn/ui'],
    contributions: [
      'Trang video ngắn hỗ trợ YouTube, TikTok, Facebook, chỉ phát một video mỗi lúc.',
      'Tính năng đóng góp, sự kiện và tin nổi bật trong trang chi tiết chùa.',
      'Landing chùa gần như làm trọn: trang chủ, giới thiệu, thư viện ảnh, sự kiện, tin tức, liên hệ.',
    ],
  },
];

export const jobs: Job[] = [
  {
    company: 'NetSpace',
    period: '06/2025 – nay',
    positions: [{ title: 'Fullstack Developer', period: '06/2025 – nay' }],
    note: 'Các dự án ở phần trên.',
  },
  {
    company: 'Công ty Cổ phần Công nghệ và Dịch vụ Y tế số MED-ON',
    period: '03/2023 – 06/2025',
    positions: [{ title: 'Lập trình viên Frontend', period: '03/2023 – 06/2025' }],
    projects: [
      {
        name: 'Medstation',
        period: '05/2024 – 06/2025',
        stack: 'Vite, Ant Design, TanStack Query, Recoil, TypeScript',
        description: 'Ki-ốt khám bệnh qua video call với bác sĩ: CMS tổng, CMS cho bác sĩ và giao diện ki-ốt.',
      },
      {
        name: 'Prodental',
        period: '09/2023 – 05/2024',
        stack: 'React, Ant Design, Redux Toolkit, TypeScript',
        description: 'Quản lý lịch hẹn, lịch bác sĩ, hồ sơ bệnh nhân, kho vật tư, doanh thu và thanh toán cho phòng khám nha.',
      },
      {
        name: 'Cus 360',
        period: '10 – 12/2023',
        stack: 'Next.js, Tailwind',
        description: 'Theo dõi thông tin khách hàng, lịch sử khám, voucher, chỉ số sức khoẻ và chi phí.',
      },
      {
        name: 'Loyalty CMS',
        period: '07 – 10/2023',
        stack: 'Next.js, Ant Design, Redux Toolkit',
        description: 'Quản lý khách hàng, chiến dịch khuyến mãi, hạng thành viên và điểm trung thành.',
      },
      {
        name: 'CCOMED',
        period: '03/2023 – 06/2025',
        stack: 'React, Ant Design, Redux, WebSocket',
        description: 'CMS bệnh nhân và lịch hẹn, có trung tâm cuộc gọi qua WebSocket: nghe, gọi và điều hướng trong khi gọi.',
      },
      {
        name: 'MyMedlatec CMS',
        period: '05 – 07/2023',
        stack: 'React, Ant Design, Redux Toolkit',
        description: 'Quản lý tài khoản, phân quyền và thống kê cài đặt ứng dụng MyMedlatec theo nhân viên, đơn vị.',
      },
      {
        name: '555 CMS',
        period: '08/2023',
        stack: 'React, Ant Design, Redux Toolkit',
        description: 'Quản lý thẻ 555 bán ra và cộng tác viên bán thẻ.',
      },
    ],
  },
  {
    company: 'Công ty Cổ phần Tập đoàn Công nghệ Battech',
    period: '04/2022 – 03/2023',
    positions: [{ title: 'Lập trình viên Frontend', period: '04/2022 – 03/2023' }],
    projects: [
      {
        name: 'Battech ERP',
        period: '06/2022 – 03/2023',
        stack: 'React, MUI, Redux Toolkit, TypeScript, Tailwind',
        description: 'Hệ thống ERP nội bộ của công ty, team 4 FE và 2 BE.',
      },
    ],
  },
  {
    company: 'Capi Agency',
    period: '11/2018 – 02/2022',
    positions: [
      { title: 'Lập trình viên', period: '05/2019 – 02/2022' },
      { title: 'UI/UX Designer', period: '11/2018 – 04/2019' },
    ],
    projects: [
      {
        name: 'MetaDap',
        period: '11/2021 – 02/2022',
        stack: 'Next.js, Redux, TypeScript, Tailwind',
        description: 'Trang web quản lý tài sản số của người dùng.',
      },
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Giao diện',
    items: ['Next.js 15/16', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui · Radix', 'Ant Design', 'MUI', 'Framer Motion', 'TanStack Query', 'Zustand', 'React Hook Form · Zod', 'BlockNote', 'next-intl', 'React Native · Expo'],
  },
  {
    group: 'Backend',
    items: ['NestJS', 'ElysiaJS', 'Next.js API', 'oRPC', 'Payload CMS', 'Prisma', 'Drizzle', 'PostgreSQL', 'Redis', 'BullMQ', 'Socket.IO', 'JWT · Better-Auth', 'S3'],
  },
  {
    group: 'Triển khai',
    items: ['Docker', 'Kubernetes', 'GitLab CI', 'Turborepo', 'pnpm · Bun', 'Caddy', 'Vitest', 'Playwright'],
  },
  {
    group: 'SEO & sản phẩm',
    items: ['SEO kỹ thuật', 'Sitemap động · Google News', 'Structured data', 'Figma', 'Jira', 'Git'],
  },
];
