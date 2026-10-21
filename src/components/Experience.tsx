'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { jobs, type Job } from '@/data/profile';

const ease = [0.22, 1, 0.36, 1] as const;

function JobItem({ job, current }: { job: Job; current: boolean }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const n = job.projects?.length ?? 0;

  return (
    <li className="relative pb-14 pl-10 last:pb-0 md:pl-0">
      {/* Mốc trên trục thời gian */}
      <span
        aria-hidden="true"
        className={`absolute top-2 left-0 h-3.5 w-3.5 rounded-full border-2 md:left-[calc(12rem-7px)] ${
          current ? 'border-amber bg-amber' : 'border-slate bg-paper'
        }`}
      />
      <div className="md:grid md:grid-cols-[12rem_1fr] md:gap-x-12">
        <p className="text-sm tabular-nums text-ink-soft md:pt-1 md:pr-8 md:text-right">{job.period}</p>
        <div className="md:pl-2">
          <h3 className="display-wide text-2xl font-semibold leading-snug md:text-[1.75rem]">{job.company}</h3>
          <ul className="mt-2 space-y-0.5">
            {job.positions.map((pos) => (
              <li key={pos.title} className="text-ink-soft">
                {pos.title}
                {job.positions.length > 1 && <span className="tabular-nums">, {pos.period}</span>}
              </li>
            ))}
          </ul>
          {job.note && <p className="mt-3 text-ink-soft">{job.note}</p>}

          {n > 0 && (
            <>
              <button
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-[0.95rem] font-medium transition-colors hover:border-ink"
              >
                {open ? 'Ẩn dự án' : `Xem ${n} dự án`}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                  className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                >
                  <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.ul
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="grid gap-x-10 overflow-hidden sm:grid-cols-2"
                  >
                    {job.projects!.map((p) => (
                      <li key={p.name} className="border-t border-ink/15 pt-4 pb-5 first:mt-6 sm:[&:nth-child(2)]:mt-6">
                        <p className="flex items-baseline justify-between gap-4">
                          <span className="font-semibold">{p.name}</span>
                          <span className="shrink-0 text-sm tabular-nums text-ink-soft">{p.period}</span>
                        </p>
                        <p className="mt-1.5 text-[0.97rem] text-ink-soft">{p.description}</p>
                        <p className="mt-2 text-sm text-sea">{p.stack}</p>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="kinh-nghiem" className="bg-[#e4eaee]">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <h2 className="display text-[clamp(2.8rem,7vw,5rem)] font-[650]">Kinh nghiệm</h2>
        <p className="mt-4 max-w-[46ch] text-ink-soft">
          Qua bốn công ty, từ thiết kế giao diện sang frontend rồi fullstack.
        </p>
        <ol className="relative mt-16">
          <span aria-hidden="true" className="absolute top-3 bottom-3 left-[6px] w-px bg-ink/20 md:left-[12rem]" />
          {jobs.map((job, i) => (
            <JobItem key={job.company} job={job} current={i === 0} />
          ))}
        </ol>
      </div>
    </section>
  );
}
