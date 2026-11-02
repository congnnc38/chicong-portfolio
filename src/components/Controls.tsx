'use client';

import { useState } from 'react';
import { flushSync } from 'react-dom';
import { getContent, home, type Lang } from '@/i18n';

// Đổi giao diện sáng/tối. Trình duyệt hỗ trợ View Transitions thì giao diện mới loang ra thành vòng tròn từ chỗ bấm.
function applyTheme(next: 'light' | 'dark') {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {}
}

export function ThemeToggle({ lang }: { lang: Lang }) {
  const { t } = getContent(lang);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || reduce) {
      applyTheme(next);
      return;
    }
    const x = e.clientX || window.innerWidth - 40;
    const y = e.clientY || 32;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = doc.startViewTransition(() => flushSync(() => applyTheme(next)));
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="group grid h-10 w-10 place-items-center rounded-full ring-1 ring-line transition-colors hover:bg-card"
    >
      {/* Hai biểu tượng cùng có sẵn, CSS chọn cái nào hiện theo data-theme, nên không lệch khi tải trang */}
      <span className="sr-only in-data-[theme=dark]:hidden">{t.nav.toDark}</span>
      <span className="sr-only hidden in-data-[theme=dark]:inline">{t.nav.toLight}</span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-500 group-hover:-rotate-12 in-data-[theme=dark]:hidden"
      >
        <path d="M20.5 14.5A8.5 8.5 0 019.5 3.5a8.5 8.5 0 1011 11z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="hidden transition-transform duration-700 group-hover:rotate-90 in-data-[theme=dark]:block"
      >
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

// Nút chuyển ngôn ngữ dạng hai nấc VI | EN
export function LangSwitch({ lang }: { lang: Lang }) {
  const { t } = getContent(lang);
  const items: Lang[] = ['vi', 'en'];
  // Cho nấc trượt sang trước rồi mới chuyển trang, để thấy hiệu ứng
  const [pos, setPos] = useState<Lang>(lang);
  return (
    <div role="group" aria-label={t.nav.switchLang} className="relative flex h-10 items-center rounded-full p-1 ring-1 ring-line">
      <span
        aria-hidden="true"
        className={`absolute top-1 bottom-1 w-[2.4rem] rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          pos === 'en' ? 'translate-x-[2.4rem]' : 'translate-x-0'
        }`}
      />
      {items.map((l) => {
        const on = l === lang;
        return (
          <a
            key={l}
            href={home[l]}
            hrefLang={l}
            lang={l}
            aria-current={on ? 'true' : undefined}
            onClick={(e) => {
              if (on || e.metaKey || e.ctrlKey || e.shiftKey) return;
              e.preventDefault();
              setPos(l);
              setTimeout(() => window.location.assign(home[l]), 260);
            }}
            aria-label={l === 'vi' ? 'Tiếng Việt' : 'English'}
            className={`relative grid h-8 w-[2.4rem] place-items-center rounded-full text-[0.8rem] font-bold transition-colors duration-300 ${
              l === pos ? 'text-paper' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {l.toUpperCase()}
          </a>
        );
      })}
    </div>
  );
}
