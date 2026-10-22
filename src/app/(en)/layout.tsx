import type { Viewport } from 'next';
import '../globals.css';
import { siteMetadata } from '@/components/Site';

export const metadata = siteMetadata('en');

export const viewport: Viewport = {
  themeColor: '#375164',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
