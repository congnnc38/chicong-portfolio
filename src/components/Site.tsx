import type { Metadata } from 'next';
import Nav from './Nav';
import Hero from './Hero';
import Projects from './Projects';
import Experience from './Experience';
import Skills from './Skills';
import Contact from './Contact';
import { getContent, home, type Lang } from '@/i18n';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chicong.vercel.app';

export function siteMetadata(lang: Lang): Metadata {
  const { profile } = getContent(lang);
  const title = `${profile.name} — ${profile.title}`;
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
      images: [{ url: '/avatar.jpg', width: 1100, height: 1100, alt: profile.name }],
    },
    twitter: { card: 'summary', title: profile.name, description: profile.intro, images: ['/avatar.jpg'] },
    icons: { icon: '/icon.svg' },
  };
}

// Toàn bộ trang chủ, dùng chung cho cả bản tiếng Việt và tiếng Anh
export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <Nav lang={lang} />
      <main>
        <Hero lang={lang} />
        <Projects lang={lang} />
        <Experience lang={lang} />
        <Skills lang={lang} />
        <Contact lang={lang} />
      </main>
    </>
  );
}
