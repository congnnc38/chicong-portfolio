'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import type { Job } from '@/data/profile';
import { getContent, type Lang } from '@/i18n';
import { Pop, ScrollLine, Words } from './fx';
import { Plus } from './Icons';
import { Eyebrow, Reveal, ease } from './ui';

function JobItem({ job, current, lang, i }: { job: Job; current: boolean; lang: Lang; i: number }) {
  const { t } = getContent(lang);
  const [open, setOpen] = useState(false);
  const n = job.projects?.length ?? 0;
  return (
    <li className="relative pl-14 sm:pl-20">
      {/* mốc trên trục thời gian */}
      <Pop delay={0.05} className="absolute top-6 left-[0.6rem] z-10 sm:left-[1.6rem]">
        <span
          className={`block h-5 w-5 rounded-full shadow-[0_0_0_6px_var(--color-paper-2)] ${
            current ? 'bg-accent' : 'border-[3px] border-accent bg-paper'
          }`}
        >
          {current && <span className="block h-5 w-5 animate-ping rounded-full bg-accent opacity-40" />}
        </span>
      </Pop>
      <Reveal delay={i * 0.04}>
        <div className="rounded-[1.5rem] bg-card p-6 ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_24px_40px_-28px_rgba(23,20,15,0.45)] sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink-soft">
            <span className="tabular-nums">{job.period}</span>
            {current && <span className="rounded-full bg-accent px-2.5 py-0.5 text-[0.78rem] text-white">{t.experience.current}</span>}
          </div>
          <h3 className="mt-2 text-[clamp(1.35rem,2.6vw,1.75rem)] leading-snug font-extrabold tracking-tight">{job.company}</h3>
          <ul className="mt-2 space-y-0.5">
            {job.positions.map((pos) => (
              <li key={pos.title} className="text-ink-soft">
                <span className="font-semibold text-ink">{pos.title}</span>
                {job.positions.length > 1 && <span className="tabular-nums">, {pos.period}</span>}
              </li>
            ))}
          </ul>
          {job.note && <p className="mt-3 text-ink-soft">{job.note}</p>}
          {n > 0 && (
            <>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                className="group mt-5 inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 text-[0.95rem] font-semibold ring-1 ring-line transition-colors hover:ring-ink"
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full transition-all duration-300 ${
                    open ? 'rotate-45 bg-accent text-white' : 'bg-paper-2 group-hover:bg-ink group-hover:text-paper'
                  }`}
                >
                  <Plus size={14} />
                </span>
                {open ? t.experience.hide : t.experience.show(n)}
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="grid gap-3 overflow-hidden sm:grid-cols-2"
                  >
                    {job.projects!.map((p, k) => (
                      <motion.li
                        key={p.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease, delay: 0.08 + k * 0.05 }}
                        className="rounded-2xl bg-paper-2/70 p-4 first:mt-5 sm:[&:nth-child(2)]:mt-5"
                      >
                        <p className="flex items-baseline justify-between gap-4">
                          <span className="font-bold">{p.name}</span>
                          <span className="shrink-0 text-sm tabular-nums text-ink-soft">{p.period}</span>
                        </p>
                        <p className="mt-1.5 text-[0.95rem] text-ink-soft">{p.description}</p>
                        <p className="mt-2 text-sm font-semibold text-accent-ink">{p.stack}</p>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </Reveal>
    </li>
  );
}

export default function Experience({ lang }: { lang: Lang }) {
  const { jobs, t } = getContent(lang);
  return (
    <section id="kinh-nghiem" aria-labelledby="t-exp" className="bg-paper-2/70">
      <div className="mx-auto max-w-[76rem] px-5 py-24 sm:px-8 md:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
          <div>
            <Eyebrow>{t.experience.eyebrow}</Eyebrow>
            <h2 id="t-exp" className="heading mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
              <Words text={t.experience.title} />
            </h2>
          </div>
          <p className="text-ink-soft">{t.experience.intro}</p>
        </Reveal>
        <div className="relative mt-14">
          {/* trục thời gian, dài ra khi cuộn */}
          <ScrollLine vertical className="absolute top-8 bottom-8 left-[1.1rem] w-[3px] sm:left-[2.1rem]" />
          <ol className="relative space-y-6">
            {jobs.map((job, i) => (
              <JobItem key={job.company} job={job} current={i === 0} lang={lang} i={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
