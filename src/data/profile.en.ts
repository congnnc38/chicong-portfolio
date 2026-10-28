// Bản tiếng Anh của nội dung website (trang /en). Cấu trúc giống hệt profile.ts.
// Sửa nội dung tiếng Việt ở profile.ts thì nhớ sửa phần tương ứng ở đây.

import type { Job, Project } from './profile';

export const profile = {
  name: 'Ngô Nguyễn Chí Công',
  shortName: 'Chí Công',
  title: 'Fullstack Developer, Frontend First',
  intro:
    'With 5 years of experience, I build web products and mobile apps for newsrooms, businesses and content platforms: from the interface and editors to APIs, queues and deployment infrastructure.',
  about: [
    'I started out as a UI/UX Designer before moving into code. That design background makes me careful with every detail of an interface, and in recent years I have also worked on the backend: NestJS, Prisma, BullMQ queues, realtime with Socket.IO.',
    'Since 2025 I have been at NetSpace, building the AntCMS ecosystem for newsrooms (VietPress, Góc Nhìn Mới, phobienphapluat.vn), a shared E-magazine template library, the kol.gov.vn portal, an AI video moderation system and React Native mobile apps for Thien Khoi Group.',
  ],
  cv: { href: '/CV-Ngo-Nguyen-Chi-Cong-EN.pdf', fileName: 'CV-Ngo-Nguyen-Chi-Cong-EN.pdf' },
  contact: {
    email: 'congnnc38@gmail.com',
    phone: '+84 33 224 9402',
    phoneHref: 'tel:+84332249402',
    linkedin: 'https://www.linkedin.com/in/chicongzz',
    linkedinLabel: 'in/chicongzz',
  },
  education: {
    school: 'Hanoi University of Industry',
    major: 'Information Technology',
  },
  languages: [
    { name: 'Vietnamese', level: 'Native' },
    { name: 'English', level: 'Intermediate' },
  ],
};

export const projects: Project[] = [
  {
    id: 'kolhub',
    name: 'KOL Hub',
    summary: 'Campaign marketplace connecting brands with KOLs and MCNs',
    role: 'Fullstack',
    period: '10/2026 – present',
    link: { href: 'https://kolhub-dev.netspace.vn/', label: 'kolhub-dev.netspace.vn', note: 'dev build' },
    description:
      'Brands post briefs; KOLs and MCNs apply, submit drafts, submit post links and confirm payments. A Super Admin reviews profiles, channels, campaigns, tickets and violation complaints. The database is shared with older systems, so every new table has its own prefix and is tagged with its data source.',
    stack: ['TanStack Start', 'React 19', 'oRPC', 'Drizzle', 'PostgreSQL', 'Better-Auth', 'Tailwind 4', 'Turborepo', 'Bun'],
    contributions: [
      'Integrated KOL Hub with KOL Safety for channel verification: a TikTok/YouTube channel must pass content moderation before it enters the review queue.',
      'Account linking via SSO, scan results received through webhooks; wrote the API contract documentation between the two systems.',
      'Worked on fullstack flows for the KOL, MCN, Brand and Super Admin roles.',
    ],
  },
  {
    id: 'multi-client',
    name: 'AntCMS Multi-client',
    summary: 'Monorepo of news sites sharing one CMS',
    role: 'Frontend',
    period: '10/2026 – present',
    link: { href: 'https://phobienphapluat-web-dev.antcms.vn/', label: 'phobienphapluat.vn', note: 'dev build' },
    description:
      'Each news site has its own design but shares AntCMS and a server-side API service layer. Includes a script to generate a new site from a starter site and a CMS configuration script. The first site is phobienphapluat.vn.',
    stack: ['Next.js 16', 'React 19', 'TypeScript 6', 'Tailwind 4', 'Turborepo', 'pnpm', 'Vitest', 'Docker'],
    contributions: [
      'Set up the monorepo architecture, the @antcms/api-client package and shared config packages.',
      'Rebuilt the entire phobienphapluat.vn interface and wired it to the AntCMS API.',
      'Full-screen flipbook view for the print magazine; added Video, Longform, Podcast and MGID ad blocks.',
      'One Dockerfile shared by every site, CMS configuration script for production.',
    ],
  },
  {
    id: 'kol-safety',
    name: 'KOL Safety',
    summary: 'AI moderation for Vietnamese video content',
    role: 'Fullstack',
    period: '07/2026 – present',
    link: { href: 'https://safety.netspace.vn/', label: 'safety.netspace.vn' },
    description:
      'Gives every video a 0–100 Safety Score and labels it Safe / Grey area / Violation, with reasons, second-by-second evidence and suggested fixes. Checks videos before they are posted and audits TikTok/YouTube channels in bulk. Architecture: Next.js → NestJS + BullMQ workers → Python ML service (ASR, NSFW) → Gemini.',
    stack: ['Next.js 15', 'NestJS 10', 'Prisma', 'PostgreSQL', 'BullMQ', 'Redis', 'FastAPI', 'faster-whisper', 'Gemini'],
    contributions: [
      'YouTube channel audit in 3 stages: connect the channel, bulk-scan short videos, scan long videos with progress.',
      'A YouTube Studio–style workspace for TikTok/YouTube channels: filters, video selection, scan queue, pagination.',
      'Integrated the Titan crawler, including scanning TikTok photo-slide posts.',
      'Applied the Digital Culture Code of Conduct (Decision 423/QĐ-BVHTTDL) to scoring.',
    ],
  },
  {
    id: 'netevent',
    name: 'NetEvent',
    summary: 'SaaS platform for creating and running events',
    role: 'Fullstack',
    period: '07/2026',
    link: { href: 'https://event.netspace.vn/', label: 'event.netspace.vn' },
    description:
      'Replaces stitching together Google Forms, Excel, landing-page builders, QR scanners and manual emails. Each subscription plan limits the number of events, tickets and duration. Made up of a public registration site, an admin CMS and an API, each on its own subdomain.',
    stack: ['Next.js 16 × 3 apps', 'Prisma 7', 'PostgreSQL', 'JWT', 'Mailjet', 'Radix UI', 'Docker', 'GitLab CI'],
    contributions: [
      'Set up the monorepo foundation and moved from Multi-Zones to subdomain-based routing.',
      'Configurable role groups, member invitations, owner transfer, realtime notifications.',
      'Landing editor, registration forms, ticket inventory; camera check-in; OTP, ticket, reminder and daily summary emails.',
      'Dockerfile, migrations, CI; fixed real deployment issues such as timezone drift and exhausted DB connections.',
    ],
  },
  {
    id: 'tkg-mobile',
    name: 'TKG Proptech & Thien Khoi HRM',
    summary: 'Two mobile apps for Thien Khoi Group’s brokers and staff',
    role: 'Frontend',
    period: '06 – 07/2026',
    linkNote: 'iOS and Android apps for the Thien Khoi Group team',
    description:
      'TKG Proptech helps consultants and brokers manage property inventory, consignments, transactions and disputes. Thien Khoi HRM manages staff across the Region, Capital, branch, division and department structure: recruitment, training, events and permissions. Thien Khoi Group was named a Top 5 Proptech 2026 for the ecosystem that includes these two apps.',
    stack: ['React Native 0.78', 'TypeScript', 'React Navigation', 'TanStack Query', 'Zustand', 'MMKV', 'React Hook Form', 'Firebase', 'Fastlane'],
    contributions: [
      'TKG Proptech: rebuilt the property inventory screen from Figma, including listing cards, search bar, quick filters and sorting, filters by source type and signing date, and the “Million-dollar” and “Steady cash flow” tags.',
      'Thien Khoi HRM: quick event filter tabs with counts, shown or hidden by permission; participant scoping by Region, Capital, Division and Department matching each role’s permissions; attendance lists with search, filters and Excel export.',
      'Unsaved-changes warnings for 28 create and edit screens across both apps; dispute forms pre-filled from the data just entered.',
      'A “Thien Khoi ecosystem” menu section with deep links between the two apps; fixed the image slideshow viewer.',
    ],
  },
  {
    id: 'thienviet-id',
    name: 'Thien Viet ID',
    summary: 'Shared account and utilities app for the Thien Viet system',
    role: 'Fullstack',
    period: '06/2026',
    linkNote: 'iOS and Android mobile app',
    description:
      'One account for the whole system: single sign-on, top-ups and transaction history, chat and voice calls, ordering at restaurants and cafés, training, news. Lives in a Turborepo monorepo with the Expo app, an ElysiaJS backend and Next.js web apps.',
    stack: ['Expo 55', 'React Native', 'Expo Router', 'ElysiaJS', 'Bun', 'Drizzle', 'PostgreSQL', 'Better Auth', 'TanStack Query', 'Zustand'],
    contributions: [
      'Built the full in-app coffee ordering flow: menu by category, items with multi-select option groups and extra charges, cart, checkout, voucher redemption.',
      'On the backend: the orders, menu and user voucher modules (ElysiaJS), Drizzle schema and migrations, seed data scripts.',
    ],
  },
  {
    id: 'hien-mau',
    name: 'Thien Khoi Blood Donation',
    summary: 'Realtime management for blood donation events',
    role: 'Fullstack',
    period: '05 – 06/2026',
    link: { href: 'https://hienmau.netspace.vn/', label: 'hienmau.netspace.vn' },
    description:
      'Registration on a landing page, QR check-in, queue coordination and a TV call screen with text-to-speech. Check-in desks, coordinators and the TV screen stay in sync in realtime.',
    stack: ['Next.js 16', 'Payload CMS 3', 'Socket.IO', 'Redis', 'PostgreSQL', 'TanStack Table', 'Playwright'],
    contributions: [
      'Check-in flow: lookup, avatar updates, data-conflict handling, waiting list, certificates.',
      'Queue management and the TV call screen (TTS, seat numbers, recall).',
      'Moved realtime from SSE to Socket.IO + Redis pub/sub to run on multiple pods, configured for 1,000+ connections.',
      'Admin pages with filters, audit log, Excel export and per-round statistics.',
    ],
  },
  {
    id: 'kol-portal',
    name: 'kol.gov.vn',
    summary: 'Official portal and rankings for KOLs and MCNs',
    role: 'Fullstack',
    period: '03 – 07/2026',
    link: { href: 'https://kol.gov.vn/', label: 'kol.gov.vn' },
    description:
      'KOL and MCN rankings based on real engagement growth, Top 100, detailed profiles, profile registration for KOLs and MCNs, violation reports, news. Comes with a campaign platform for KOLs and brands and a background social media data crawler.',
    stack: ['Next.js 15', 'Prisma', 'PostgreSQL', 'BullMQ', 'Redis', 'Better-Auth', 'Turborepo', 'Kubernetes', 'Laravel Filament'],
    contributions: [
      'Home page, search, Top 100, KOL and MCN detail pages, rankings ticker.',
      'KOL/MCN registration forms: media upload, platform auto-detected from the channel link, business validation.',
      'Violation report form; profile page and campaign sign-up on the KOLs Platform.',
      'Laravel Filament admin: a per-period moderation summary widget on the reports dashboard, post filtering by source, activity categories on the Influencer page.',
    ],
  },
  {
    id: 'antcms-templates',
    name: 'AntCMS Templates',
    summary: 'One UI codebase for many newsrooms on AntCMS',
    role: 'Frontend',
    period: '03 – 05/2026',
    linkNote: 'Front ends for Reatimes, Thế giới Điện ảnh and Góc Nhìn Mới',
    description:
      'A monorepo for news sites running on AntCMS: each newsroom (tenant) picks its own template, colors and fonts while sharing sections, components and the API layer. Includes a tenant-driven app and dedicated apps for Reatimes, Thế giới Điện ảnh and Góc Nhìn Mới.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind', 'pnpm', 'Turborepo', 'Docker'],
    contributions: [
      'Tenant-based home page with per-site widths; separated tenants from templates so one template can serve many newsrooms.',
      'Colors and fonts switch with each site’s configuration, detail pages included.',
      'The Cinematic template, the Reatimes home page, rebuilt Thế giới Điện ảnh pages; category, special-section, tag, search, video and help-center pages plus a floating action panel for the Góc Nhìn Mới template.',
    ],
  },
  {
    id: 'emagazine',
    name: 'AntCMS E-magazine',
    summary: 'E-magazine template library and editor',
    role: 'Frontend',
    period: '01 – 09/2026',
    linkNote: 'Live on VietPress and Góc Nhìn Mới',
    description:
      'E-magazine and Photo story article templates reused across every news site on AntCMS, packaged as an npm package using Dependency Injection: type-safe, tree-shakeable, SSR-ready. Editors adjust each section directly on the page and preview by device.',
    stack: ['React 19', 'TypeScript', 'tsup', 'React Hook Form', 'Swiper', 'Next.js 15'],
    contributions: [
      'Extracted the templates into a shared package and documented the integration contract with the host app.',
      'The E-magazine 1–4, Business, Sport, Basic and Photo 1–2 sets.',
      'Image replacement, desktop/mobile image sync and captions for 19 sections, custom text colors.',
      'Spell-checking content right inside the editor.',
    ],
  },
  {
    id: 'thienkhoi-cdc',
    name: 'Thien Khoi CDC',
    summary: 'Corporate website for an interior design and build company',
    role: 'Frontend',
    period: '11/2025 – 09/2026',
    link: { href: 'https://thienkhoicdc.com/', label: 'thienkhoicdc.com' },
    description: 'About, services, projects, news, careers, search and contact pages. Bilingual Vietnamese – English, SEO-optimised.',
    stack: ['Next.js 15', 'TanStack Query', 'Zustand', 'next-intl', 'Framer Motion', 'Tailwind'],
    contributions: [
      'Built almost the entire interface, API integration and internationalisation.',
      'Technical SEO: per-language canonicals, sitemaps by content type, structured data, heading structure.',
      'Video banner, marquee text, animations and skeleton loading.',
    ],
  },
  {
    id: 'vietpress',
    name: 'VietPress',
    summary: '24/7 online newspaper',
    role: 'Frontend',
    period: '10/2025 – 03/2026',
    link: { href: 'https://vietpress.vn/', label: 'vietpress.vn' },
    description:
      'An online newspaper on AntCMS: section-based home page layout, categories, topics, tags, search, E-magazine and video articles, with light and dark themes.',
    stack: ['Next.js 15', 'TanStack Query', 'Zustand', 'Swiper', 'React Player', 'Tailwind'],
    contributions: [
      'Header, mega menu, search bar, breadcrumbs, weather top bar.',
      'Home page sections and 7 new section themes.',
      'Integrated E-magazine, then extracted it into its own package.',
      'Dynamic sitemaps, including the Google News sitemap.',
    ],
  },
  {
    id: 'gocnhinmoi',
    name: 'Góc Nhìn Mới',
    summary: 'In-depth news with a community of reader-writers',
    role: 'Frontend',
    period: '08/2025 – present',
    link: { href: 'https://gocnhinmoi.com.vn/', label: 'gocnhinmoi.com.vn' },
    description:
      'Readers sign up, write articles, submit location photos, follow authors, save articles, comment, listen to podcasts and build playlists. Includes E-magazine, Photo story, short videos and an author leaderboard.',
    stack: ['Next.js 15', 'BlockNote', 'TanStack Query', 'Zustand', 'IndexedDB', 'Tailwind'],
    contributions: [
      'Profile pages, author and reader pages, following, the Featured Authors leaderboard.',
      'Listen & Watch: podcasts with a progress waveform, queue-based playlists, listening history.',
      'Reader notifications, article writing with BlockNote, article review flow.',
      'Rebuilt the home, category and Explore pages; responsive at 3 breakpoints: mobile, tablet, desktop.',
    ],
  },
  {
    id: 'antcms',
    name: 'AntCMS',
    summary: 'Admin CMS for multiple newsrooms',
    role: 'Frontend',
    period: '07 – 10/2025',
    linkNote: 'Internal system',
    description:
      'Each newsroom is its own tenant. Manages articles, E-magazine, Photo, Video, Podcast, categories, authors, royalties, page builder, menus, banners, SEO, subscription plans and permissions.',
    stack: ['Laravel 12', 'Filament 4', 'Inertia.js', 'React', 'BlockNote', 'Ant Design', 'Tailwind'],
    contributions: [
      'Article editor built on BlockNote: video upload, character count, saved as JSON/HTML.',
      'Media library, image upload and picker, thumbnail editing.',
      'SEO scoring for articles; author-change popup, tree-style category picker, royalties.',
    ],
  },
  {
    id: 'buddhaworlds',
    name: 'BuddhaWorlds',
    summary: 'Multilingual Buddhist library and portal',
    role: 'Frontend',
    period: '06 – 07/2025',
    link: { href: 'https://buddhaworlds.com/', label: 'buddhaworlds.com' },
    description:
      'Digital library, dharma talks, short videos, news and a pagoda directory with a map, in Vietnamese, English and Chinese. Each pagoda has its own landing page driven by its pagoda code.',
    stack: ['Next.js 15', 'MUI / Joy UI', 'next-intl', 'Leaflet', 'Zustand', 'shadcn/ui'],
    contributions: [
      'Short-video page supporting YouTube, TikTok and Facebook, playing one video at a time.',
      'Donations, events and featured news on the pagoda detail page.',
      'Built almost all of the pagoda landing page: home, about, photo gallery, events, news, contact.',
    ],
  },
];

export const jobs: Job[] = [
  {
    company: 'NetSpace',
    period: '06/2025 – present',
    positions: [{ title: 'Fullstack Developer', period: '06/2025 – present' }],
    note: 'Projects are listed above.',
  },
  {
    company: 'MED-ON Digital Health Technology and Services JSC',
    period: '03/2023 – 06/2025',
    positions: [{ title: 'Frontend Developer', period: '03/2023 – 06/2025' }],
    projects: [
      {
        name: 'Medstation',
        period: '05/2024 – 06/2025',
        stack: 'Vite, Ant Design, TanStack Query, Recoil, TypeScript',
        description: 'Medical kiosk with video calls to doctors: the main CMS, a CMS for doctors and the kiosk interface.',
      },
      {
        name: 'Prodental',
        period: '09/2023 – 05/2024',
        stack: 'React, Ant Design, Redux Toolkit, TypeScript',
        description: 'Appointments, doctor schedules, patient records, supplies, revenue and payments for dental clinics.',
      },
      {
        name: 'Cus 360',
        period: '10 – 12/2023',
        stack: 'Next.js, Tailwind',
        description: 'Tracks customer information, visit history, vouchers, health metrics and costs.',
      },
      {
        name: 'Loyalty CMS',
        period: '07 – 10/2023',
        stack: 'Next.js, Ant Design, Redux Toolkit',
        description: 'Manages customers, promotional campaigns, membership tiers and loyalty points.',
      },
      {
        name: 'CCOMED',
        period: '03/2023 – 06/2025',
        stack: 'React, Ant Design, Redux, WebSocket',
        description: 'Patient and appointment CMS with a WebSocket call center: answer, call and navigate during calls.',
      },
      {
        name: 'MyMedlatec CMS',
        period: '05 – 07/2023',
        stack: 'React, Ant Design, Redux Toolkit',
        description: 'Accounts, permissions and MyMedlatec app install statistics by employee and unit.',
      },
      {
        name: '555 CMS',
        period: '08/2023',
        stack: 'React, Ant Design, Redux Toolkit',
        description: 'Manages 555 cards sold and the collaborators who sell them.',
      },
    ],
  },
  {
    company: 'Battech Technology Group JSC',
    period: '04/2022 – 03/2023',
    positions: [{ title: 'Frontend Developer', period: '04/2022 – 03/2023' }],
    projects: [
      {
        name: 'Battech ERP',
        period: '06/2022 – 03/2023',
        stack: 'React, MUI, Redux Toolkit, TypeScript, Tailwind',
        description: 'The company’s internal ERP system, built by a team of 4 FE and 2 BE.',
      },
    ],
  },
  {
    company: 'Capi Agency',
    period: '11/2018 – 02/2022',
    positions: [
      { title: 'Developer', period: '05/2019 – 02/2022' },
      { title: 'UI/UX Designer', period: '11/2018 – 04/2019' },
    ],
    projects: [
      {
        name: 'MetaDap',
        period: '11/2021 – 02/2022',
        stack: 'Next.js, Redux, TypeScript, Tailwind',
        description: 'Web app for managing users’ digital assets.',
      },
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Frontend',
    items: ['Next.js 15/16', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui · Radix', 'Ant Design', 'MUI', 'Framer Motion', 'TanStack Query', 'Zustand', 'React Hook Form · Zod', 'BlockNote', 'next-intl', 'React Native · Expo'],
  },
  {
    group: 'Backend',
    items: ['NestJS', 'ElysiaJS', 'Next.js API', 'oRPC', 'Payload CMS', 'Prisma', 'Drizzle', 'PostgreSQL', 'Redis', 'BullMQ', 'Socket.IO', 'JWT · Better-Auth', 'S3'],
  },
  {
    group: 'Deployment',
    items: ['Docker', 'Kubernetes', 'GitLab CI', 'Turborepo', 'pnpm · Bun', 'Caddy', 'Vitest', 'Playwright'],
  },
  {
    group: 'SEO & product',
    items: ['Technical SEO', 'Dynamic sitemaps · Google News', 'Structured data', 'Figma', 'Jira', 'Git'],
  },
];
