'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getContent, type Lang } from '@/i18n';
import { LangSwitch, ThemeToggle } from './Controls';
import { Magnetic, ScrollProgress } from './fx';
import { Download } from './Icons';

export default function Nav({ lang }: { lang: Lang }) {
  const { profile, t } = getContent(lang);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const links = [
    { href: '#du-an', label: t.nav.projects },
    { href: '#ve-toi', label: t.nav.about },
    { href: '#kinh-nghiem', label: t.nav.experience },
    { href: '#ky-nang', label: t.nav.skills },
    { href: '#lien-he', label: t.nav.contact },
  ];

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? 'bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : ''
        }`}
      >
        <nav aria-label={t.nav.label} className="mx-auto flex h-16 max-w-[76rem] items-center justify-between gap-3 px-5 sm:gap-6 sm:px-8">
          <a href="#top" aria-label={profile.name} className="group flex items-center gap-2.5 font-extrabold tracking-tight">
            <Image
              src="/avatar.jpg"
              alt=""
              width={72}
              height={72}
              priority
              className="h-9 w-9 rounded-full object-cover object-top ring-2 ring-line transition-[box-shadow] duration-300 group-hover:ring-accent"
            />
            <span aria-hidden="true" className="hidden sm:inline">{profile.shortName}</span>
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav-link rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <LangSwitch lang={lang} />
            <ThemeToggle lang={lang} />
            <Magnetic strength={0.2}>
              <a
                href={profile.cv.href}
                download={profile.cv.fileName}
                aria-label={t.nav.cv}
                className="shine inline-flex h-10 items-center gap-2 rounded-full bg-ink px-3 text-[0.92rem] font-semibold text-paper transition-colors hover:bg-accent-deep hover:text-white sm:px-4"
              >
                <Download />
                <span className="hidden sm:inline">{t.nav.cv}</span>
              </a>
            </Magnetic>
          </div>
        </nav>
      </header>
    </>
  );
}

