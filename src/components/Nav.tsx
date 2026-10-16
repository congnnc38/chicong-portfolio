'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/data/profile';

const links = [
  { href: '#du-an', label: 'Dự án' },
  { href: '#kinh-nghiem', label: 'Kinh nghiệm' },
  { href: '#ky-nang', label: 'Kỹ năng' },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-paper/85 text-ink shadow-[0_1px_0_var(--color-paper-2)] backdrop-blur-md' : 'text-paper'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Điều hướng chính">
        <a href="#top" className="display-wide text-lg font-semibold">
          {profile.shortName}
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden rounded-full px-3 py-2 text-[0.95rem] font-medium opacity-80 transition-opacity hover:opacity-100 sm:inline-block"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#lien-he"
            className={`rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors ${
              solid ? 'bg-ink text-paper hover:bg-slate' : 'bg-paper/15 hover:bg-paper/25'
            }`}
          >
            Liên hệ
          </a>
        </div>
      </nav>
    </header>
  );
}
