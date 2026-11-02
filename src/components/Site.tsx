import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { getContent, home, type Lang } from '@/i18n';
import Providers from './Providers';
import Nav from './Nav';
import Cursor from './Cursor';
import Hero from './Hero';
import Projects from './Projects';
import Experience from './Experience';
import { About, Contact, Footer, Skills } from './Sections';

// Địa chỉ trang dùng để tạo link tuyệt đối cho ảnh xem trước khi chia sẻ (Facebook, Zalo, LinkedIn...).
// Ưu tiên biến NEXT_PUBLIC_SITE_URL, sau đó tên miền chính Vercel tự cung cấp lúc build, cuối cùng là tên miền hiện tại.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://chicong.vercel.app');

export function siteMetadata(lang: Lang): Metadata {
  const { profile } = getContent(lang);
  const title = `${profile.name} — ${profile.title}`;
  const og = `/og/og-${lang}.jpg`;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description: profile.intro,
    alternates: { canonical: home[lang], languages: { vi: home.vi, en: home.en } },
    openGraph: {
      title,
      description: profile.intro,
      type: 'profile',
      locale: lang === 'en' ? 'en_US' : 'vi_VN',
      url: home[lang],
      siteName: profile.name,
      // Ảnh JPG 1200x630: đúng khổ Facebook, Zalo, Messenger, LinkedIn
      images: [{ url: og, width: 1200, height: 630, alt: title, type: 'image/jpeg' }],
    },
    twitter: { card: 'summary_large_image', title, description: profile.intro, images: [og] },
    icons: { icon: '/icon.svg' },
  };
}

export const siteViewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f4ef' },
    { media: '(prefers-color-scheme: dark)', color: '#12100d' },
  ],
};

// Chọn giao diện trước khi trang hiện ra để không bị nháy màu:
// dùng lựa chọn đã lưu (nút mặt trăng/mặt trời), chưa chọn thì mặc định giao diện sáng.
const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}`;

export function RootDocument({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// Toàn bộ trang chủ, dùng chung cho bản tiếng Việt và tiếng Anh
export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <Nav lang={lang} />
      <main>
        <Hero lang={lang} />
        <Projects lang={lang} />
        <About lang={lang} />
        <Experience lang={lang} />
        <Skills lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <Cursor />
    </>
  );
}
