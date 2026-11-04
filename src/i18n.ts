// Hai ngôn ngữ của website: tiếng Việt ở "/", tiếng Anh ở "/en".
// Nội dung (dự án, kinh nghiệm...) nằm ở data/profile.ts và data/profile.en.ts;
// hình ảnh từng dự án nằm ở data/visuals.ts; chữ trên giao diện (nút, tiêu đề mục) nằm ở bảng `ui` bên dưới.

import * as vi from './data/profile';
import * as en from './data/profile.en';

export type Lang = 'vi' | 'en';

export const home: Record<Lang, string> = { vi: '/', en: '/en' };

const ui = {
  vi: {
    nav: {
      label: 'Điều hướng chính',
      projects: 'Dự án',
      about: 'Về tôi',
      experience: 'Kinh nghiệm',
      skills: 'Kỹ năng',
      contact: 'Liên hệ',
      cv: 'Tải CV',
      switchLang: 'Chọn ngôn ngữ',
      toLight: 'Chuyển sang giao diện sáng',
      toDark: 'Chuyển sang giao diện tối',
    },
    hero: {
      badge: 'Đang làm tại NetSpace',
      portraitAlt: 'Ảnh chân dung',
      seeProjects: 'Xem các dự án',
      email: 'Gửi email cho tôi',
      cv: 'Tải CV (PDF)',
      footnote: 'Khởi đầu là UI/UX Designer, rồi chuyển sang viết code.',
      tag: 'Frontend · Backend · App',
      live: (n: number) => `${n} sản phẩm đang chạy thật`,
      liveAt: 'Đang chạy tại',
      visit: 'Mở trang',
    },
    projects: {
      eyebrow: 'Dự án',
      title: (n: number) => `${n} sản phẩm tôi làm từ 2025 đến nay`,
      intro: 'Mới nhất ở trên. Bấm vào một dự án để xem tôi đã làm những phần nào và dùng công nghệ gì; bấm tên miền để mở trang thật.',
      all: 'Tất cả',
      filterLabel: 'Lọc theo loại sản phẩm',
      kinds: { platform: 'Nền tảng & CMS', news: 'Trang tin & website', mobile: 'App di động' },
      myPart: 'Phần tôi làm',
      stack: 'Công nghệ',
      open: 'Mở trang web',
      more: 'Xem chi tiết',
      cursor: 'Xem',
      close: 'Đóng',
      shotAlt: 'Hình ảnh dự án',
      scrollHint: 'Cuộn để xem cả trang',
      newTab: '(mở trong thẻ mới)',
      noLink: 'Chưa có trang công khai',
    },
    about: {
      eyebrow: 'Về tôi',
      title: (name: string) => `Xin chào, tôi là ${name}`,
      stats: ['năm kinh nghiệm', 'dự án từ 2025', 'sản phẩm đang chạy thật'] as const,
      badge: ['Từng là ', 'UI/UX Designer'] as const,
    },
    experience: {
      eyebrow: 'Kinh nghiệm',
      title: '5 năm kinh nghiệm',
      intro: 'Từ thiết kế giao diện sang lập trình fullstack.',
      current: 'Hiện tại',
      hide: 'Ẩn dự án',
      show: (n: number) => `Xem ${n} dự án`,
    },
    skills: {
      eyebrow: 'Kỹ năng',
      title: 'Công cụ tôi dùng hằng ngày',
      intro: 'Những công cụ tôi dùng trong các dự án ở trên.',
      education: 'Học vấn',
      major: 'Ngành',
      languages: 'Ngôn ngữ',
    },
    contact: {
      title: 'Cùng làm việc nhé',
      intro: 'Tôi sẵn sàng trao đổi về vị trí Fullstack Developer, hay một sản phẩm web bạn đang muốn làm.',
      cv: 'Tải CV bản PDF',
      cvNote: 'Khổ A4, 2 trang, in được ngay.',
      labels: { email: 'Email', phone: 'Điện thoại', linkedin: 'LinkedIn' },
    },
  },
  en: {
    nav: {
      label: 'Main navigation',
      projects: 'Projects',
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      contact: 'Contact',
      cv: 'Download CV',
      switchLang: 'Choose language',
      toLight: 'Switch to light mode',
      toDark: 'Switch to dark mode',
    },
    hero: {
      badge: 'Currently at NetSpace',
      portraitAlt: 'Portrait of',
      seeProjects: 'See my projects',
      email: 'Email me',
      cv: 'Download CV (PDF)',
      footnote: 'Started as a UI/UX Designer, then moved into code.',
      tag: 'Frontend · Backend · App',
      live: (n: number) => `${n} products live today`,
      liveAt: 'Live at',
      visit: 'Visit',
    },
    projects: {
      eyebrow: 'Projects',
      title: (n: number) => `${n} products I have worked on since 2025`,
      intro: 'Newest first. Open a project to see which parts I built and the tech behind it; click the domain to open the live site.',
      all: 'All',
      filterLabel: 'Filter by product type',
      kinds: { platform: 'Platforms & CMS', news: 'News & websites', mobile: 'Mobile apps' },
      myPart: 'What I did',
      stack: 'Tech stack',
      open: 'Visit website',
      more: 'View details',
      cursor: 'View',
      close: 'Close',
      shotAlt: 'Screenshot of',
      scrollHint: 'Scroll to see the full page',
      newTab: '(opens in a new tab)',
      noLink: 'No public site yet',
    },
    about: {
      eyebrow: 'About me',
      title: (name: string) => `Hi, I’m ${name}`,
      stats: ['years of experience', 'projects since 2025', 'products live today'] as const,
      badge: ['Former ', 'UI/UX Designer'] as const,
    },
    experience: {
      eyebrow: 'Experience',
      title: '5 years of experience',
      intro: 'From interface design to fullstack development.',
      current: 'Current',
      hide: 'Hide projects',
      show: (n: number) => `See ${n} project${n > 1 ? 's' : ''}`,
    },
    skills: {
      eyebrow: 'Skills',
      title: 'The tools I use every day',
      intro: 'The tools behind the projects above.',
      education: 'Education',
      major: 'Major in',
      languages: 'Languages',
    },
    contact: {
      title: 'Let’s work together',
      intro: 'I’m open to talking about a Fullstack Developer role, or a web product you want to build.',
      cv: 'Download CV (PDF)',
      cvNote: 'A4, 2 pages, ready to print.',
      labels: { email: 'Email', phone: 'Phone', linkedin: 'LinkedIn' },
    },
  },
};

export function getContent(lang: Lang) {
  const data = lang === 'en' ? en : vi;
  return { ...data, t: ui[lang], lang };
}
