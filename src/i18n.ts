// Hai ngôn ngữ của website: tiếng Việt ở "/", tiếng Anh ở "/en".
// Nội dung (dự án, kinh nghiệm...) nằm ở data/profile.ts và data/profile.en.ts;
// chữ trên giao diện (nút, tiêu đề mục) nằm ở bảng `ui` bên dưới.

import * as vi from './data/profile';
import * as en from './data/profile.en';

export type Lang = 'vi' | 'en';

export const home: Record<Lang, string> = { vi: '/', en: '/en' };

const ui = {
  vi: {
    nav: { label: 'Điều hướng chính', projects: 'Dự án', experience: 'Kinh nghiệm', skills: 'Kỹ năng', cv: 'Tải CV', contact: 'Liên hệ', switchTo: 'Xem bản tiếng Anh' },
    hero: {
      portraitAlt: 'Ảnh chân dung',
      seeProjects: 'Xem các dự án',
      email: 'Gửi email cho tôi',
      cv: 'Tải CV (PDF)',
      footnote: 'Đang làm ở NetSpace. Khởi đầu là UI/UX Designer, rồi chuyển sang viết code.',
    },
    projects: {
      title: 'Dự án',
      intro: (n: number) => `${n} sản phẩm tôi làm từ 2025 đến nay, mới nhất ở trên. Chọn một dự án để xem tôi đã làm những phần nào.`,
      all: 'Tất cả',
      filterLabel: 'Lọc theo vai trò',
      myPart: 'Phần tôi làm',
      stack: 'Công nghệ',
      open: 'Mở trang web',
    },
    experience: {
      title: 'Kinh nghiệm',
      intro: '5 năm kinh nghiệm qua bốn công ty, từ thiết kế giao diện sang frontend rồi fullstack.',
      hide: 'Ẩn dự án',
      show: (n: number) => `Xem ${n} dự án`,
    },
    skills: {
      title: 'Kỹ năng',
      intro: 'Những công cụ tôi dùng hằng ngày trong các dự án ở trên.',
      education: 'Học vấn',
      major: 'Ngành',
      languages: 'Ngôn ngữ',
    },
    contact: {
      title: 'Cùng làm việc nhé',
      intro: 'Tôi sẵn sàng trao đổi về vị trí Fullstack (thế mạnh frontend), hay một sản phẩm web bạn đang muốn làm.',
      cv: 'Tải CV bản PDF',
      cvNote: 'Khổ A4, 2 trang, in được ngay.',
      phone: 'Điện thoại',
    },
  },
  en: {
    nav: { label: 'Main navigation', projects: 'Projects', experience: 'Experience', skills: 'Skills', cv: 'Download CV', contact: 'Contact', switchTo: 'Xem bản tiếng Việt' },
    hero: {
      portraitAlt: 'Portrait of',
      seeProjects: 'See my projects',
      email: 'Email me',
      cv: 'Download CV (PDF)',
      footnote: 'Currently at NetSpace. Started as a UI/UX Designer, then moved into code.',
    },
    projects: {
      title: 'Projects',
      intro: (n: number) => `${n} products I have worked on since 2025, newest first. Open a project to see which parts I built.`,
      all: 'All',
      filterLabel: 'Filter by role',
      myPart: 'What I did',
      stack: 'Tech stack',
      open: 'Visit website',
    },
    experience: {
      title: 'Experience',
      intro: '5 years across four companies, from interface design to frontend and then fullstack.',
      hide: 'Hide projects',
      show: (n: number) => `See ${n} project${n > 1 ? 's' : ''}`,
    },
    skills: {
      title: 'Skills',
      intro: 'The tools I use every day in the projects above.',
      education: 'Education',
      major: 'Major in',
      languages: 'Languages',
    },
    contact: {
      title: 'Let’s work together',
      intro: 'I’m open to talking about a Fullstack role (frontend-leaning), or a web product you want to build.',
      cv: 'Download CV (PDF)',
      cvNote: 'A4, 2 pages, ready to print.',
      phone: 'Phone',
    },
  },
};

export function getContent(lang: Lang) {
  const data = lang === 'en' ? en : vi;
  return { ...data, t: ui[lang], lang };
}
