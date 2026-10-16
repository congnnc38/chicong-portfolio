'use client';

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { projects, type Role } from '@/data/profile';

type Filter = 'Tất cả' | Role;
const filters: Filter[] = ['Tất cả', 'Frontend', 'Fullstack'];
const ease = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('Tất cả');
  const [open, setOpen] = useState<string | null>(projects[0].id);
  const reduce = useReducedMotion();

  const list = filter === 'Tất cả' ? projects : projects.filter((p) => p.role === filter);
  const count = (f: Filter) => (f === 'Tất cả' ? projects.length : projects.filter((p) => p.role === f).length);

  return (
    <section id="du-an" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="display text-[clamp(2.8rem,7vw,5rem)] font-[650]">Dự án</h2>
          <p className="mt-4 max-w-[46ch] text-ink-soft">
            {projects.length} sản phẩm tôi làm từ 2025 đến nay, mới nhất ở trên. Chọn một dự án để xem tôi đã làm những phần nào.
          </p>
        </div>

        <LayoutGroup>
          <div role="group" aria-label="Lọc theo vai trò" className="flex w-fit rounded-full bg-paper-2 p-1">
            {filters.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className="relative rounded-full px-4 py-2 text-[0.95rem] font-medium"
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ duration: reduce ? 0 : 0.35, ease }}
                    />
                  )}
                  <span className={`relative ${active ? 'text-paper' : 'text-ink-soft'}`}>
                    {f} <span className="tabular-nums opacity-70">{count(f)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <ul className="mt-14 border-t border-ink/15">
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((p) => {
            const isOpen = open === p.id;
            return (
              <motion.li
                key={p.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3, ease }}
                className="border-b border-ink/15"
              >
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : p.id)}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${p.id}`}
                    className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-6 text-left md:grid-cols-[9.5rem_1fr_auto_auto]"
                  >
                    <span className="order-3 col-span-2 text-sm tabular-nums text-ink-soft md:order-none md:col-span-1">
                      {p.period}
                    </span>
                    <span className="min-w-0">
                      <span className="display-wide block text-[1.6rem] font-semibold leading-tight transition-colors group-hover:text-sea md:text-[1.85rem]">
                        {p.name}
                      </span>
                      <span className="mt-1 block text-ink-soft">{p.summary}</span>
                    </span>
                    <span
                      className={`hidden rounded-full px-3 py-1 text-sm font-medium md:inline-block ${
                        p.role === 'Fullstack' ? 'bg-slate text-paper' : 'bg-paper-2 text-ink'
                      }`}
                    >
                      {p.role}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid h-9 w-9 place-items-center self-center rounded-full border border-ink/20 transition-transform duration-300 ${
                        isOpen ? 'rotate-45 bg-ink text-paper' : 'group-hover:border-ink'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`panel-${p.id}`}
                      key="panel"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 md:grid-cols-[9.5rem_1fr_17rem] md:gap-x-6">
                        <div className="hidden md:block" />
                        <div>
                          <p className="max-w-[62ch]">{p.description}</p>
                          <h4 className="mt-7 font-semibold">Phần tôi làm</h4>
                          <ul className="mt-3 max-w-[62ch] space-y-2.5">
                            {p.contributions.map((c) => (
                              <li key={c} className="relative pl-5 text-ink-soft">
                                <span className="absolute top-[0.7em] left-0 h-1.5 w-1.5 rounded-full bg-amber" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:border-l md:border-ink/15 md:pl-6">
                          <span className="text-sm text-ink-soft md:hidden">{p.role}</span>
                          <h4 className="mt-1 font-semibold md:mt-0">Công nghệ</h4>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {p.stack.map((s) => (
                              <li key={s} className="rounded-md border border-ink/15 bg-white/50 px-2.5 py-1 text-sm">
                                {s}
                              </li>
                            ))}
                          </ul>
                          {p.link ? (
                            <a
                              href={p.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-medium text-paper transition-colors hover:bg-sea"
                            >
                              Mở trang web
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                <path d="M3 9L9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </a>
                          ) : null}
                          {p.link && (
                            <p className="mt-2 text-sm text-ink-soft">
                              {p.link.label}
                              {p.link.note ? ` (${p.link.note})` : ''}
                            </p>
                          )}
                          {p.linkNote && <p className="mt-7 text-sm text-ink-soft">{p.linkNote}.</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </section>
  );
}
