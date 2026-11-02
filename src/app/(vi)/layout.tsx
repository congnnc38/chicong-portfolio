import '../globals.css';
import { RootDocument, siteMetadata, siteViewport } from '@/components/Site';

export const metadata = siteMetadata('vi');
export const viewport = siteViewport;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="vi">{children}</RootDocument>;
}
