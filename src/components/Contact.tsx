import Contours from './Contours';
import { profile } from '@/data/profile';

export default function Contact() {
  const { email, phone, phoneHref, linkedin, linkedinLabel } = profile.contact;
  return (
    <section id="lien-he" className="relative isolate overflow-hidden bg-slate-deep text-paper">
      <Contours count={14} animate={false} className="absolute inset-0 -z-10 h-full w-full opacity-70" />
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-36">
        <h2 className="display text-[clamp(2.8rem,7vw,5rem)] font-[650]">Cùng làm việc nhé</h2>
        <p className="mt-5 max-w-[48ch] text-paper/80">
          Tôi sẵn sàng trao đổi về vị trí Frontend hoặc Fullstack, hay một sản phẩm web bạn đang muốn làm.
        </p>

        <a
          href={`mailto:${email}`}
          className="display-wide mt-12 inline-block break-all text-[clamp(1.6rem,5vw,3.25rem)] font-semibold text-amber underline decoration-amber/40 decoration-2 underline-offset-[0.2em] transition-colors hover:decoration-amber"
        >
          {email}
        </a>

        <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-lg">
          <li>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-paper/85 hover:text-paper">
              LinkedIn: <span className="underline underline-offset-4">{linkedinLabel}</span>
            </a>
          </li>
          <li>
            <a href={phoneHref} className="text-paper/85 hover:text-paper">
              Điện thoại: <span className="underline underline-offset-4">{phone}</span>
            </a>
          </li>
        </ul>
      </div>
      <footer className="mx-auto max-w-6xl px-5 pb-10 text-sm text-paper/50 sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </section>
  );
}
