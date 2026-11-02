import Image from 'next/image';
import { getContent, type Lang } from '@/i18n';
import { Download, LinkedIn, Mail, Phone } from './Icons';
import { CountUp, Drift, Float, Magnetic, Spotlight, Tilt, Words } from './fx';
import { Eyebrow, Reveal } from './ui';

export function About({ lang }: { lang: Lang }) {
  const { profile, projects, t } = getContent(lang);
  const liveCount = projects.filter((p) => p.link && !p.link.note).length;
  const stats = [
    { n: 5, label: t.about.stats[0] },
    { n: projects.length, label: t.about.stats[1] },
    { n: liveCount, label: t.about.stats[2] },
  ];
  return (
    <section id="ve-toi" aria-labelledby="t-about" className="mx-auto grid max-w-[76rem] gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
      <Reveal className="relative mx-auto w-full max-w-[22rem]">
        <Tilt className="rounded-[1.75rem]" max={7}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#37546a]">
            <Image src="/avatar.jpg" alt={`${t.hero.portraitAlt} ${profile.name}`} fill sizes="(min-width: 1024px) 22rem, 92vw" className="object-cover object-top" />
          </div>
        </Tilt>
        <Float className="absolute -right-3 bottom-8 sm:-right-6" duration={5} distance={8}>
          <span className="block rounded-2xl bg-card px-4 py-3 text-sm font-semibold shadow-xl ring-1 ring-line">
            {t.about.badge[0]}
            <span className="text-accent-ink">{t.about.badge[1]}</span>
          </span>
        </Float>
      </Reveal>
      <div>
        <Reveal>
          <Eyebrow>{t.about.eyebrow}</Eyebrow>
          <h2 id="t-about" className="heading mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
            <Words text={t.about.title(profile.shortName)} />
          </h2>
          <div className="mt-6 max-w-[62ch] space-y-4 text-[1.08rem] text-ink-soft">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
        <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-line py-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-[clamp(2rem,4.5vw,3rem)] leading-none font-extrabold tracking-tight text-accent-ink">
                <CountUp to={s.n} />
              </dd>
              <dd className="mt-2 text-sm text-ink-soft">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Skills({ lang }: { lang: Lang }) {
  const { profile, skills, t } = getContent(lang);
  // Kỹ năng và Liên hệ là hai khối bo góc, cách mép màn hình và cách nhau cùng một khoảng (12px, từ màn hình vừa 20px)
  return (
    <section id="ky-nang" aria-labelledby="t-skills" className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-night text-snow ring-1 ring-white/[0.06]">
        <Drift className="absolute -top-40 -left-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,91,46,0.18),transparent)]" x={80} y={60} duration={18} />
        <div className="mx-auto max-w-[76rem] px-5 py-20 sm:px-8 md:py-28">
          <Reveal className="grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
            <div>
              <Eyebrow light>{t.skills.eyebrow}</Eyebrow>
              <h2 id="t-skills" className="heading mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
                <Words text={t.skills.title} />
              </h2>
            </div>
            <p className="text-snow/70">{t.skills.intro}</p>
          </Reveal>

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((g, i) => (
              <li key={g.group}>
                <Reveal delay={(i % 4) * 0.08} className="h-full">
                  <Spotlight className="group h-full overflow-hidden rounded-[1.5rem] bg-white/[0.04] ring-1 ring-white/10 transition-[background-color,box-shadow] duration-500 hover:bg-white/[0.07] hover:ring-accent/50">
                    <div className="relative flex h-full flex-col p-7">
                      <span className="text-[2.6rem] leading-none font-extrabold tracking-tight text-white/15 transition-colors duration-500 group-hover:text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-5 text-[1.25rem] leading-snug font-extrabold tracking-tight">{g.group}</h3>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {g.items.map((s) => (
                          <li key={s} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[0.85rem] text-snow/80 ring-1 ring-white/10 transition-colors hover:bg-white/15 hover:text-white">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Spotlight>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Reveal className="h-full">
              <div className="h-full rounded-[1.5rem] bg-white/[0.04] p-7 ring-1 ring-white/10">
                <h3 className="text-sm font-bold tracking-wide text-snow/60 uppercase">{t.skills.education}</h3>
                <p className="mt-3 text-[1.15rem] font-extrabold tracking-tight">{profile.education.school}</p>
                <p className="text-snow/70">
                  {t.skills.major} {profile.education.major}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="h-full">
              <div className="h-full rounded-[1.5rem] bg-white/[0.04] p-7 ring-1 ring-white/10">
                <h3 className="text-sm font-bold tracking-wide text-snow/60 uppercase">{t.skills.languages}</h3>
                <ul className="mt-3 space-y-1">
                  {profile.languages.map((l) => (
                    <li key={l.name}>
                      <span className="text-[1.15rem] font-extrabold tracking-tight">{l.name}</span>{' '}
                      <span className="text-snow/70">({l.level.toLowerCase()})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact({ lang }: { lang: Lang }) {
  const { profile, t } = getContent(lang);
  const { email, phone, phoneHref, linkedin, linkedinLabel } = profile.contact;
  const L = t.contact.labels;
  const items = [
    { Icon: Mail, label: L.email, value: email, href: `mailto:${email}`, ext: false },
    { Icon: LinkedIn, label: L.linkedin, value: linkedinLabel, href: linkedin, ext: true },
    { Icon: Phone, label: L.phone, value: phone, href: phoneHref, ext: false },
  ];
  return (
    <section id="lien-he" aria-labelledby="t-contact" className="p-3 sm:p-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-accent text-white">
        <Drift className="absolute -top-40 -right-32 -z-10 h-[34rem] w-[34rem] rounded-full bg-white/10" x={-60} y={40} duration={15} />
        <Drift className="absolute -bottom-52 -left-24 -z-10 h-[30rem] w-[30rem] rounded-full bg-black/10" x={70} y={-30} duration={18} delay={2} />
        <Drift className="absolute top-[30%] right-[18%] -z-10 hidden h-24 w-24 rounded-3xl bg-white/15 md:block" x={-30} y={50} duration={11} delay={1} />
        <div className="mx-auto max-w-[76rem] px-5 py-20 sm:px-8 md:py-28">
          <h2 id="t-contact" className="heading max-w-[16ch] text-[clamp(2.4rem,6vw,4.4rem)]">
            <Words text={t.contact.title} stagger={0.06} />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-[52ch] text-[1.12rem] text-white/85">{t.contact.intro}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a href={profile.cv.href} download={profile.cv.fileName} className="shine inline-flex h-14 items-center gap-2.5 rounded-full bg-[#17140f] px-7 text-[1.05rem] font-semibold text-white transition-colors hover:bg-black">
                  <Download size={18} />
                  {t.contact.cv}
                </a>
              </Magnetic>
              <p className="text-sm text-white/75">{t.contact.cvNote}</p>
            </div>
          </Reveal>
          <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            {items.map(({ Icon, label, value, href, ext }, i) => (
              <li key={label}>
                <Reveal delay={0.1 + i * 0.08} className="h-full">
                  <a
                    href={href}
                    {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex h-full items-center gap-4 rounded-2xl bg-white/12 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/22"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#d23f12] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-8deg]">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-white/75">{label}</span>
                      <span className="block font-bold [overflow-wrap:anywhere]">{value}</span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const { profile } = getContent(lang);
  return (
    <footer className="mx-auto flex max-w-[76rem] flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-ink-soft sm:px-8">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p>{profile.title}</p>
    </footer>
  );
}
