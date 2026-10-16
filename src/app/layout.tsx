import type { Metadata, Viewport } from 'next';
import './globals.css';
import { profile } from '@/data/profile';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chicong.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — ${profile.title}`,
  description: profile.intro,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.intro,
    type: 'profile',
    locale: 'vi_VN',
    images: [{ url: '/avatar.jpg', width: 1100, height: 1100, alt: profile.name }],
  },
  twitter: { card: 'summary', title: profile.name, description: profile.intro, images: ['/avatar.jpg'] },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#375164',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
