'use client';

import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { Kind, Project } from '@/data/profile';
import { getContent, type Lang } from '@/i18n';
import { ArrowRight, ArrowUpRight, Check, Close } from './Icons';
import { Eyebrow, Reveal, Shot, btnDark, ease } from './ui';
import { Magnetic, Tilt, Words, useTouchLive } from './fx';

// Lọc theo loại sản phẩm (vai trò của tôi ở mọi dự án web đều là Fullstack nên không lọc theo vai trò nữa)
type Filter = 'all' | Kind;
const filters: Filter[] = ['all', 'platform', 'news', 'mobile'];

export default function Projects({ lang }: { lang: Lang }) {
  const { projects, t } = getContent(lang);
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<Project | null>(null);
  const list = filter === 'all' ? projects : projects.filter((p) => p.kind === filter);
  const count = (f: Filter) => (f === 'all' ? projects.length : projects.filter((p) => p.kind === f).length);

  // Điện thoại không rê chuột được: thẻ nào đi qua giữa màn hình thì trang trong thẻ tự cuộn
  useTouchLive('#du-an', [filter]);

  return (
    <section id="du-an" aria-labelledby="t-projects" className="mx-auto max-w-[76rem] px-5 py-24 sm:px-8 md:py-32">
      <Reveal className="grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
        <div>
          <Eyebrow>{t.projects.eyebrow}</Eyebrow>
          <h2 id="t-projects" className="heading mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
            <Words text={t.projects.title(projects.length)} />
          </h2>
        </div>
        <p className="text-ink-soft">{t.projects.intro}</p>
      </Reveal>

      <LayoutGroup>
        {/* overflow-x-auto cắt cả chiều dọc nên chừa khoảng đệm quanh nút để viền không bị cắt */}
        <div role="group" aria-label={t.projects.filterLabel} className="-mx-4 mt-7 flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] lg:overflow-visible">
          {filters.map((f) => {
            const on = filter === f;
            return (
              <Magnetic key={f} strength={0.18} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f)}
                  className={`relative shrink-0 rounded-full px-4 py-2.5 text-[0.95rem] font-semibold whitespace-nowrap transition-colors ${
                    on ? 'text-paper' : 'text-ink-soft ring-1 ring-line hover:text-ink'
                  }`}
                >
                  {on && <motion.span layoutId="tab" transition={{ duration: 0.35, ease }} className="absolute inset-0 rounded-full bg-ink" />}
                  <span className="relative">
                    {f === 'all' ? t.projects.all : t.projects.kinds[f]} <span className="opacity-60">{count(f)}</span>
                  </span>
                </button>
              </Magnetic>
            );
          })}
        </div>
      </LayoutGroup>

      <ul className="mt-7 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, y: 48, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
              transition={{ duration: 0.75, ease, delay: (i % 3) * 0.09 }}
            >
              <ProjectCard p={p} lang={lang} onOpen={() => setOpen(p)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <ProjectDialog p={open} lang={lang} onClose={() => setOpen(null)} />
    </section>
  );
}

// Thẻ dự án: bấm ảnh hoặc tên để xem chi tiết; tên miền bên dưới mở trang thật ở thẻ mới
function ProjectCard({ p, lang, onOpen }: { p: Project; lang: Lang; onOpen: () => void }) {
  const { t } = getContent(lang);
  const shown = p.stack.slice(0, 3);
  const more = p.stack.length - shown.length;
  return (
    <div className="group" data-live="">
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        data-cursor="view"
        data-cursor-label={t.projects.cursor}
        className="block w-full text-left"
      >
        <Tilt className="block rounded-[1.5rem]" max={6}>
          <span className="block overflow-hidden rounded-[1.5rem] ring-1 ring-black/5 transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-30px_rgba(23,20,15,0.5)]">
            <Shot id={p.id} alt={`${t.projects.shotAlt} ${p.name}`} sizes="(min-width: 1024px) 21rem, (min-width: 768px) 40vw, 80vw" />
          </span>
        </Tilt>
        <span className="mt-5 flex flex-wrap items-center gap-2 text-sm font-semibold text-ink-soft">
          <span className={`rounded-full px-2.5 py-0.5 text-[0.78rem] ${p.role === 'Fullstack' ? 'bg-ink text-paper' : 'bg-paper-2 text-ink'}`}>{p.role}</span>
          <span className="tabular-nums">{p.period}</span>
        </span>
        <span className="mt-2 block text-[1.5rem] leading-tight font-extrabold tracking-tight transition-colors duration-300 group-hover:text-accent-ink">{p.name}</span>
        <span className="mt-2 block text-ink-soft">{p.summary}</span>
        <span className="mt-4 flex flex-wrap gap-1.5">
          {shown.map((s) => (
            <span key={s} className="rounded-md bg-card px-2 py-0.5 text-[0.8rem] font-medium text-ink-soft ring-1 ring-line">
              {s}
            </span>
          ))}
          {more > 0 && <span className="rounded-md px-1.5 py-0.5 text-[0.8rem] font-medium text-ink-soft">+{more}</span>}
        </span>
        <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-accent-ink">
          {t.projects.more}
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>
      {p.link ? (
        <a
          href={p.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-sweep mt-2 ml-0.5 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-ink-soft transition-colors hover:text-ink"
        >
          {p.link.label}
          {p.link.note && <span className="font-normal">({p.link.note})</span>}
          <ArrowUpRight />
          <span className="sr-only">{t.projects.newTab}</span>
        </a>
      ) : (
        <p className="mt-2 ml-0.5 text-[0.95rem] text-ink-soft">{p.linkNote ?? t.projects.noLink}</p>
      )}
    </div>
  );
}

function ProjectDialog({ p, lang, onClose }: { p: Project | null; lang: Lang; onClose: () => void }) {
  const { t } = getContent(lang);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (p && !d.open) d.showModal();
    if (!p && d.open) d.close();
  }, [p]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="dlg-title"
      className="m-auto max-h-[92dvh] w-[min(64rem,calc(100vw-1.5rem))] overflow-y-auto overscroll-contain rounded-[1.75rem] bg-paper p-0 text-ink shadow-2xl"
    >
      {p && (
        <div>
          <div className="relative">
            <Shot
              id={p.id}
              live="scroll"
              hint={t.projects.scrollHint}
              alt={`${t.projects.shotAlt} ${p.name}`}
              sizes="(min-width: 1024px) 58rem, 92vw"
              className="aspect-[16/9]! sm:aspect-[21/9]!"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={t.projects.close}
              autoFocus
              className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-paper/90 shadow-md backdrop-blur transition-colors hover:bg-card"
            >
              <Close />
            </button>
          </div>

          <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-[minmax(0,1fr)_17rem]">
            <div>
              <p className="text-sm font-semibold text-ink-soft">
                {p.role} · <span className="tabular-nums">{p.period}</span>
              </p>
              <h3 id="dlg-title" className="heading mt-2 text-[clamp(1.9rem,4vw,2.8rem)]">
                {p.name}
              </h3>
              <p className="mt-3 text-[1.1rem] font-semibold">{p.summary}</p>
              <p className="mt-4 leading-relaxed text-ink-soft">{p.description}</p>

              <h4 className="mt-8 text-sm font-bold tracking-wide text-ink-soft uppercase">{t.projects.myPart}</h4>
              <ul className="mt-3 space-y-2.5">
                {p.contributions.map((c, i) => (
                  <motion.li
                    key={`${p.id}-${i}`}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.07 }}
                    className="flex gap-3"
                  >
                    <Check className="mt-1 shrink-0 text-accent-ink" />
                    <span>{c}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <aside className="space-y-7 md:border-l md:border-line md:pl-8">
              <div>
                <h4 className="text-sm font-bold tracking-wide text-ink-soft uppercase">{t.projects.stack}</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-md bg-card px-2.5 py-1 text-sm ring-1 ring-line">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              {p.link ? (
                <div>
                  <a href={p.link.href} target="_blank" rel="noopener noreferrer" className={`${btnDark} shine h-11 px-5 text-[0.95rem]`}>
                    {t.projects.open}
                    <ArrowUpRight />
                    <span className="sr-only">{t.projects.newTab}</span>
                  </a>
                  <p className="mt-2 text-sm text-ink-soft">
                    {p.link.label}
                    {p.link.note ? ` (${p.link.note})` : ''}
                  </p>
                </div>
              ) : (
                p.linkNote && <p className="text-sm text-ink-soft">{p.linkNote}.</p>
              )}
            </aside>
          </div>
        </div>
      )}
    </dialog>
  );
}
