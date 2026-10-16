'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import Contours from './Contours';
import { profile } from '@/data/profile';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const [first, ...rest] = profile.name.split(' ');
  const lines = [first + ' ' + rest[0], rest.slice(1).join(' ')];

  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { y: '105%' },
          animate: { y: '0%' },
          transition: { duration: 1, delay: 0.35 + i * 0.12, ease },
        };

  const fade = (d: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: d, ease },
        };

  return (
    <section id="top" className="relative isolate overflow-hidden bg-slate text-paper">
      <Contours className="absolute inset-0 -z-10 h-full w-full" />

      <motion.div
        className="pointer-events-none absolute right-1/2 top-14 aspect-square w-[min(78vw,360px)] translate-x-1/2 md:top-auto md:right-[3vw] md:bottom-0 md:w-auto md:h-[min(80svh,780px)] md:translate-x-0"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.15, ease }}
      >
        <Image
          src="/avatar.jpg"
          alt={`Ảnh chân dung ${profile.name}`}
          fill
          priority
          sizes="(min-width: 768px) 780px, 78vw"
          className="portrait-mask object-cover"
        />
      </motion.div>

      <div className="mx-auto relative flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pt-[calc(min(78vw,360px)+2.5rem)] pb-14 sm:px-8 md:pt-28 md:pb-20">
        <div className="relative z-10 md:max-w-[46rem]">
          <h1 className="display text-[clamp(3.6rem,11vw,8.75rem)] font-[650] text-paper">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" {...rise(i)}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...fade(0.75)} className="display-wide mt-6 text-xl font-medium text-line sm:text-2xl">
            {profile.title}
          </motion.p>

          <motion.p {...fade(0.9)} className="mt-5 max-w-[52ch] text-paper/85">
            {profile.intro}
          </motion.p>

          <motion.div {...fade(1.05)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#du-an"
              className="inline-flex h-12 items-center rounded-full bg-amber px-6 font-semibold text-ink transition-colors hover:bg-paper"
            >
              Xem các dự án
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="inline-flex h-12 items-center rounded-full border border-paper/40 px-6 font-medium text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              Gửi email cho tôi
            </a>
          </motion.div>

          <motion.p {...fade(1.2)} className="mt-12 text-sm text-paper/60">
            Đang làm ở NetSpace. Viết code từ 2019, trước đó là UI/UX Designer.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
