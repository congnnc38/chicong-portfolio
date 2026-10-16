import { profile, skills } from '@/data/profile';

export default function Skills() {
  return (
    <section id="ky-nang" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <h2 className="display text-[clamp(2.8rem,7vw,5rem)] font-[650]">Kỹ năng</h2>
      <p className="mt-4 max-w-[46ch] text-ink-soft">Những công cụ tôi dùng hằng ngày trong các dự án ở trên.</p>

      <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g) => (
          <div key={g.group} className="border-t-2 border-ink pt-5">
            <h3 className="display-wide text-xl font-semibold">{g.group}</h3>
            <ul className="mt-4 space-y-1.5 text-ink-soft">
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-20 grid gap-10 sm:grid-cols-2">
        <div>
          <h3 className="display-wide text-xl font-semibold">Học vấn</h3>
          <p className="mt-3">{profile.education.school}</p>
          <p className="text-ink-soft">Ngành {profile.education.major}</p>
        </div>
        <div>
          <h3 className="display-wide text-xl font-semibold">Ngôn ngữ</h3>
          <ul className="mt-3">
            {profile.languages.map((l) => (
              <li key={l.name}>
                {l.name} <span className="text-ink-soft">({l.level.toLowerCase()})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
