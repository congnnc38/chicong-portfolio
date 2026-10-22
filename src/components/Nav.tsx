'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getContent, home, type Lang } from '@/i18n';

export default function Nav({ lang }: { lang: Lang }) {
  const { profile, t } = getContent(lang);
  const links = [
    { href: '#du-an', label: t.nav.projects },
    { href: '#kinh-nghiem', label: t.nav.experience },
    { href: '#ky-nang', label: t.nav.skills },
  ];
  const other: Lang = lang === 'vi' ? 'en' : 'vi';
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
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label={t.nav.label}>
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
            href={profile.cv.href}
            download={profile.cv.fileName}
            className="rounded-full px-3 py-2 text-[0.95rem] font-medium opacity-80 transition-opacity hover:opacity-100"
          >
            {t.nav.cv}
          </a>
          <Link
            href={home[other]}
            hrefLang={other}
            lang={other}
            aria-label={t.nav.switchTo}
            className="rounded-full px-3 py-2 text-[0.95rem] font-semibold opacity-80 transition-opacity hover:opacity-100"
          >
            <span aria-hidden="true">{other.toUpperCase()}</span>
          </Link>
          <a
            href="#lien-he"
            className={`rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors ${
              solid ? 'bg-ink text-paper hover:bg-slate' : 'bg-paper/15 hover:bg-paper/25'
            }`}
          >
            {t.nav.contact}
          </a>
        </div>
      </nav>
    </header>
  );
}
