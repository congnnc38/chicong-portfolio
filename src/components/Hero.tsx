'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { getContent, type Lang } from '@/i18n';
import { Depth, Float, Magnetic, Tilt, Words, useParallaxPointer, useTouchLive } from './fx';
import { ArrowRight, Download, Mail } from './Icons';
import { Shot, btnLine, btnPrimary, ease } from './ui';

// Ba ảnh chụp toàn trang xếp hình quạt bên phải: sau trái, sau phải, phía trước.
// Rê chuột lên ảnh nào thì trang trong ảnh đó tự cuộn; trên điện thoại ảnh phía trước tự cuộn khi đi qua giữa màn hình.
const fanSpec = [
  { id: 'gocnhinmoi', cls: 'left-0 top-[8%] w-[62%] -rotate-[7deg]', d: 0.35, depth: -18, float: 7, front: false },
  { id: 'kol-portal', cls: 'right-0 top-[2%] w-[58%] rotate-[6deg]', d: 0.45, depth: -28, float: 8, front: false },
  { id: 'hien-mau', cls: 'left-[16%] bottom-0 w-[70%]', d: 0.55, depth: 34, float: 6, front: true },
];

const fade = (d: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: d, ease },
});

export default function Hero({ lang }: { lang: Lang }) {
  const { profile, projects, t } = getContent(lang);
  const fan = fanSpec.map((f) => ({ ...f, p: projects.find((p) => p.id === f.id)! }));
  // Trang đang chạy thật: có link và không phải bản dev
  const live = projects.filter((p) => p.link && !p.link.note);
  // "Fullstack Developer, Frontend First": phần sau dấu phẩy được tô màu và gạch chân
  const [titleLead, titleAccent] = profile.title.split(/,\s*/);
  const { x, y, bind } = useParallaxPointer();
  useTouchLive('#top');

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-16"
      onPointerMove={(e) => {
        bind.onPointerMove(e);
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
      }}
      onPointerLeave={bind.onPointerLeave}
    >
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-12%] -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,91,46,0.16),transparent)]"
        animate={{ x: [0, -60, 0], y: [0, 40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[40%] -left-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(236,63,92,0.10),transparent)]"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="mx-auto grid max-w-[76rem] items-center gap-14 px-5 pt-12 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 lg:pt-20 lg:pb-24">
        <div>
          <motion.p {...fade(0)} className="inline-flex items-center gap-2 rounded-full bg-card px-3.5 py-1.5 text-sm font-semibold shadow-[0_1px_0_var(--color-line)] ring-1 ring-line">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#2fb36d] opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-[#2fb36d]" />
            </span>
            {t.hero.badge}
          </motion.p>

          <h1 className="heading mt-7">
            <span className="block text-[clamp(2.7rem,6vw,4.9rem)]">
              <Words text={profile.name} onView={false} delay={0.1} />
            </span>
            <span className="mt-3 block text-[clamp(1.6rem,3.2vw,2.6rem)] tracking-[-0.025em]">
              <Words text={`${titleLead},`} onView={false} delay={0.3} />{' '}
              <span className="relative whitespace-nowrap text-accent-ink">
                <Words text={titleAccent} onView={false} delay={0.42} />
                <svg aria-hidden="true" viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-2.5 w-full text-accent">
                  <motion.path
                    d="M2 9 C 50 2, 150 2, 198 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.85, ease }}
                  />
                </svg>
              </span>
            </span>
          </h1>

          <motion.p {...fade(0.2)} className="mt-7 max-w-[54ch] text-[1.12rem] text-ink-soft">
            {profile.intro}
          </motion.p>

          <motion.div {...fade(0.3)} className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <a href="#du-an" className={`${btnPrimary} shine group`}>
                {t.hero.seeProjects}
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.cv.href} download={profile.cv.fileName} className={btnLine}>
                <Download />
                {t.hero.cv}
              </a>
            </Magnetic>
          </motion.div>

          <motion.div {...fade(0.4)} className="mt-10 flex items-center gap-3.5">
            <Image src="/avatar.jpg" alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover object-top" />
            <div className="text-[0.95rem] leading-snug">
              <a href={`mailto:${profile.contact.email}`} className="link-sweep inline-flex items-center gap-1.5 font-semibold">
                <Mail />
                {profile.contact.email}
              </a>
              <p className="text-ink-soft">{t.hero.footnote}</p>
            </div>
          </motion.div>
        </div>

        <div aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-[36rem]">
          {fan.map(({ p, cls, d, depth, float, front }) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: d, ease }}
              className={`absolute ${cls}`}
            >
              <Depth x={x} y={y} depth={depth}>
                <Float duration={float} delay={d} distance={10}>
                  <Tilt className="rounded-[1.1rem]">
                    <div
                      data-live={front ? '' : undefined}
                      className="group overflow-hidden rounded-[1.1rem] shadow-[0_30px_60px_-28px_rgba(23,20,15,0.55)] ring-1 ring-black/10"
                    >
                      <Shot id={p.id} alt={`${t.projects.shotAlt} ${p.name}`} sizes="(min-width: 1024px) 26rem, 70vw" bare priority={front} eager={!front} />
                    </div>
                  </Tilt>
                </Float>
              </Depth>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.1, ease }}
            className="absolute right-[4%] -bottom-3 z-10"
          >
            <Depth x={x} y={y} depth={48}>
              <Float duration={5} delay={1.2} distance={8}>
                <span className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper shadow-xl">
                  <span className="h-2 w-2 rounded-full bg-[#2fb36d]" />
                  {t.hero.live(live.length)}
                </span>
              </Float>
            </Depth>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.25, ease }}
            className="absolute top-[-4%] left-[6%] z-10"
          >
            <Depth x={x} y={y} depth={-40}>
              <Float duration={6.5} delay={0.4} distance={8}>
                <span className="rounded-full bg-card px-4 py-2.5 text-sm font-semibold shadow-xl ring-1 ring-line">{t.hero.tag}</span>
              </Float>
            </Depth>
          </motion.div>
        </div>
      </div>

      <div className="flex items-center gap-6 border-y border-line bg-paper-2/60 py-5">
        <p className="shrink-0 pl-5 text-sm font-semibold text-ink-soft sm:pl-8 lg:pl-[max(2rem,calc((100vw-76rem)/2+2rem))]">{t.hero.liveAt}</p>
        <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
          <div className="marquee flex w-max">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 items-center gap-10 pr-10">
                {live.map((p) => (
                  <li key={p.id} className="flex items-center gap-10">
                    <a
                      href={p.link!.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={copy === 1 ? -1 : undefined}
                      data-cursor="view"
                      data-cursor-label={t.hero.visit}
                      className="text-[1.1rem] font-bold tracking-tight whitespace-nowrap text-ink/80 transition-colors hover:text-accent-ink"
                    >
                      {p.link!.label}
                    </a>
                    <span aria-hidden="true" className="text-accent">✦</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
