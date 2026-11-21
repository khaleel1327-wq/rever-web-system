'use client';

import Image from 'next/image';
import { CSSProperties, FormEvent, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from 'react';
import { siteConfig as C, themes, type IconName } from '../site.config';

const ICON_PATHS: Record<IconName, ReactNode> = {
  sparkles: (
    <>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4M22 5h-4M4 17v2M5 18H3" />
    </>
  ),
  tag: (
    <>
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </>
  ),
  calendar: (
    <>
      <path d="M8 2v4m8-4v4M3 10h18" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="m9 16 2 2 4-4" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8v13M3 12h18M12 8H7.5a2.5 2.5 0 1 1 2.5-2.5V8Zm0 0h4.5a2.5 2.5 0 1 0-2.5-2.5V8Z" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m16 0v-2a4 4 0 0 0-3-3.87M14 3.13a4 4 0 0 1 0 7.75" />
      <circle cx="10" cy="7" r="4" />
    </>
  ),
  instagram: (
    <>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  image: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  star: (
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  ),
  plus: <path d="M5 12h14M12 5v14" />,
};

function Icon({
  name,
  className = 'w-4 h-4',
  strokeWidth = 1.75,
  filled = false,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  filled?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'About', href: '#about', on: Boolean(C.sections?.about) },
  { label: 'Menu', href: '#prices', on: true },
  { label: 'Gallery', href: '#gallery', on: Boolean(C.sections?.gallery) },
  { label: 'Book', href: '#booking', on: true },
  { label: 'Contact', href: '#contact', on: true },
].filter((l) => l.on);

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

function buildSlots(open: string, close: string, step: number) {
  const slots: string[] = [];
  const safeStep = Math.max(5, step);
  for (let m = toMinutes(open); m <= toMinutes(close); m += safeStep) {
    slots.push(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`);
  }
  return slots;
}

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

function formatPrice(price: number) {
  const base = `${C.currency.symbol}${price}`;
  return C.currency.code ? `${base} ${C.currency.code}` : base;
}

const TIME_SLOTS = buildSlots(C.booking.open, C.booking.close, C.booking.slotMinutes);
const WHATSAPP_NUMBER = C.whatsapp.replace(/\D/g, '');
const WHEEL_ITEM_H = 40;

function Placeholder() {
  return (
    <div className="placeholder w-full h-full flex flex-col items-center justify-center gap-2 text-white/40">
      <Icon name="image" className="w-7 h-7" />
      <span className="text-[10px] uppercase tracking-widest">Your photo here</span>
    </div>
  );
}

function SafeImage({
  src,
  alt,
  className = '',
  fallback,
  eager = false,
  onFail,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback?: ReactNode;
  eager?: boolean;
  onFail?: () => void;
}) {
  const [failed, setFailed] = useState(!src);
  const ref = useRef<HTMLImageElement>(null);

  const fail = () => {
    setFailed(true);
    onFail?.();
  };

  useEffect(() => {
    setFailed(!src);
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) fail();
  }, [src]);

  if (failed) return <>{fallback !== undefined ? fallback : <Placeholder />}</>;

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={fail}
      className={className}
    />
  );
}

function GalleryTile({
  src,
  alt,
  onOpen,
}: {
  src: string;
  alt: string;
  onOpen: (src: string, alt: string) => void;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <button
      type="button"
      disabled={failed}
      onClick={() => onOpen(src, alt)}
      aria-label={`View photo: ${alt}`}
      className="gallery-tile group relative block w-full h-full rounded-2xl overflow-hidden border border-white/10 disabled:cursor-default"
    >
      <SafeImage src={src} alt={alt} onFail={() => setFailed(true)} className="w-full h-full object-cover" />
      {!failed && (
        <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      )}
    </button>
  );
}

const STYLES = `
  html { scroll-behavior: smooth; scroll-padding-top: 72px; }
  .font-display { font-family: var(--font-display, Georgia, 'Times New Roman', serif); }

  /* Theme helpers */
  .t-accent { color: var(--accent); }
  .t-gold { color: var(--gold); }
  .gold-bar { background: var(--gold); }
  .logo-ring { border: 1px solid color-mix(in srgb, var(--gold) 50%, transparent); }
  .badge-accent {
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    color: var(--accent);
    border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  }
  .badge-gold {
    background: color-mix(in srgb, var(--gold) 12%, transparent);
    color: var(--gold);
    border: 1px solid color-mix(in srgb, var(--gold) 30%, transparent);
  }
  .btn-primary {
    background: var(--accent);
    color: #0d0d0d;
    box-shadow: 0 10px 25px color-mix(in srgb, var(--accent) 15%, transparent);
  }
  .btn-primary:hover { background: #fff; }
  .link-accent { color: var(--accent); }
  .link-accent:hover { text-decoration: underline; }

  /* Accessibility */
  main :focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
  .skip-link {
    position: absolute; left: -9999px; top: 8px; z-index: 100;
    background: var(--accent); color: #0d0d0d; padding: 8px 14px; border-radius: 9999px; font-size: 12px; font-weight: 700;
  }
  .skip-link:focus { left: 8px; }

  /* Hamburger -> X */
  .burger span {
    display: block; width: 22px; height: 2px; border-radius: 2px; background: #fff;
    transition: transform .35s cubic-bezier(.22,.61,.36,1), opacity .2s ease;
  }
  .burger span + span { margin-top: 5px; }
  .burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Mobile dropdown */
  .mobile-menu {
    max-height: 0; opacity: 0; overflow: hidden; visibility: hidden;
    transition: max-height .45s cubic-bezier(.22,.61,.36,1), opacity .3s ease, visibility 0s linear .45s;
  }
  .mobile-menu.open {
    max-height: 420px; opacity: 1; visibility: visible;
    transition: max-height .45s cubic-bezier(.22,.61,.36,1), opacity .3s ease, visibility 0s;
  }
  .mobile-item {
    opacity: 0; transform: translateY(-8px);
    transition: opacity .35s ease, transform .35s ease, background-color .2s ease;
  }
  .mobile-menu.open .mobile-item { opacity: 1; transform: none; }

  /* Scroll reveal */
  .reveal {
    opacity: 0; transform: translateY(20px);
    transition: opacity .8s cubic-bezier(.22,.61,.36,1), transform .8s cubic-bezier(.22,.61,.36,1);
  }
  .reveal.is-visible { opacity: 1; transform: none; }

  /* Hero load-in */
  @keyframes tpl-fade-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: none; }
  }
  .hero-in { animation: tpl-fade-up .9s cubic-bezier(.22,.61,.36,1) both; }

  /* Nav links */
  .nav-link { position: relative; transition: color .2s ease; }
  .nav-link:hover { color: var(--accent); }
  .nav-link::after {
    content: ""; position: absolute; left: 0; right: 0; bottom: -6px; height: 1px;
    background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform .3s ease;
  }
  .nav-link:hover::after { transform: scaleX(1); }

  /* Buttons */
  .btn { transition: transform .25s ease, background-color .25s ease, box-shadow .25s ease; }
  .btn:hover { transform: translateY(-2px); }
  .btn:active { transform: translateY(0); }

  /* Heading underline draws in */
  .title-bar { width: 0; transition: width .8s ease-out .25s; }
  .is-visible .title-bar { width: 3rem; }

  /* Offer pills float very slightly */
  @keyframes tpl-float {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }
  .badge-float { animation: tpl-float 5s ease-in-out infinite; }

  /* Drifting colour orbs behind the glass */
  @keyframes tpl-drift-a {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(60px, 40px) scale(1.15); }
  }
  @keyframes tpl-drift-b {
    from { transform: translate(0, 0) scale(1.1); }
    to   { transform: translate(-50px, -30px) scale(.95); }
  }
  .orb { position: absolute; border-radius: 9999px; filter: blur(70px); pointer-events: none; }
  .orb-a { animation: tpl-drift-a 16s ease-in-out infinite alternate; }
  .orb-b { animation: tpl-drift-b 20s ease-in-out infinite alternate; }
  .orb-accent { background: color-mix(in srgb, var(--accent) 25%, transparent); }
  .orb-gold { background: color-mix(in srgb, var(--gold) 25%, transparent); }

  /* Liquid glass container */
  .liquid-glass {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,.04) 45%, color-mix(in srgb, var(--accent) 9%, transparent) 100%);
    -webkit-backdrop-filter: blur(24px) saturate(170%);
    backdrop-filter: blur(24px) saturate(170%);
    border: 1px solid rgba(255,255,255,.18);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.38),
      inset 0 -1px 0 rgba(255,255,255,.06),
      inset 0 0 40px rgba(255,255,255,.04),
      0 24px 60px rgba(0,0,0,.45);
  }
  .liquid-glass::before {
    content: ""; position: absolute; top: -45%; left: -20%; width: 75%; height: 85%;
    background: radial-gradient(ellipse at center, rgba(255,255,255,.18), transparent 70%);
    pointer-events: none;
  }
  @keyframes tpl-sheen {
    0%, 55%  { background-position: 160% 0; }
    100%     { background-position: -60% 0; }
  }
  .liquid-glass::after {
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background: linear-gradient(115deg, transparent 38%, rgba(255,255,255,.07) 50%, transparent 62%);
    background-size: 250% 100%;
    animation: tpl-sheen 10s ease-in-out infinite;
  }

  /* Menu rows: alternating colour bands */
  .menu-row {
    position: relative; border-left: 3px solid transparent;
    transition: background-color .3s ease, transform .3s ease, border-color .3s ease;
  }
  .menu-row.row-a {
    background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 13%, transparent), color-mix(in srgb, var(--accent) 3%, transparent));
    border-left-color: color-mix(in srgb, var(--accent) 65%, transparent);
  }
  .menu-row.row-b {
    background: linear-gradient(90deg, color-mix(in srgb, var(--gold) 15%, transparent), color-mix(in srgb, var(--gold) 3%, transparent));
    border-left-color: color-mix(in srgb, var(--gold) 70%, transparent);
  }
  .menu-row:hover { transform: translateX(4px); }
  .menu-row.row-a:hover { background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 22%, transparent), color-mix(in srgb, var(--accent) 6%, transparent)); }
  .menu-row.row-b:hover { background: linear-gradient(90deg, color-mix(in srgb, var(--gold) 25%, transparent), color-mix(in srgb, var(--gold) 6%, transparent)); }

  /* Time picker */
  .wheel { scrollbar-width: none; -ms-overflow-style: none; overscroll-behavior: contain; touch-action: pan-y; }
  .wheel::-webkit-scrollbar { display: none; }
  .wheel-item { transition: opacity .18s ease, transform .18s ease; }
  .wheel-band { border: 1px solid color-mix(in srgb, var(--gold) 60%, transparent); background: rgba(255,255,255,.1); }

  .time-chip {
    background: rgba(0,0,0,.28);
    border: 1px solid rgba(255,255,255,.16);
    color: rgba(255,255,255,.85);
    transition: transform .2s ease, background-color .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease;
  }
  .time-chip:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);
    background: color-mix(in srgb, var(--accent) 10%, transparent);
  }
  .time-chip.selected {
    background: var(--accent); color: #0d0d0d; border-color: var(--accent); font-weight: 700;
    box-shadow: 0 6px 18px color-mix(in srgb, var(--accent) 22%, transparent);
  }

  /* Form fields (glass inset) */
  .field {
    background: rgba(0,0,0,.28);
    border: 1px solid rgba(255,255,255,.16);
    box-shadow: inset 0 1px 2px rgba(0,0,0,.35);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    transition: border-color .25s ease, box-shadow .25s ease, background-color .25s ease;
  }
  .field:focus, .field:focus-visible {
    outline: none;
    border-color: var(--gold);
    background: rgba(0,0,0,.4);
    box-shadow: inset 0 1px 2px rgba(0,0,0,.35), 0 0 0 3px color-mix(in srgb, var(--gold) 20%, transparent);
  }
  .field::placeholder { color: rgba(255,255,255,.35); }
  .field option, .field optgroup { background: #1a1a1a; color: #fff; }
  .field[type="date"] { color-scheme: dark; }

  /* Outline button */
  .btn-outline { border: 1px solid rgba(255,255,255,.25); color: #fff; background: transparent; }
  .btn-outline:hover { background: rgba(255,255,255,.08); border-color: color-mix(in srgb, var(--accent) 60%, transparent); }

  /* Hero background photo: slow settle */
  @keyframes tpl-zoom { from { transform: scale(1.08); } to { transform: scale(1); } }
  .hero-bg { animation: tpl-zoom 9s ease-out both; }

  /* Image placeholder (shown when a photo file is missing) */
  .placeholder {
    background:
      linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, #141414), color-mix(in srgb, var(--gold) 12%, #141414));
  }

  /* Gallery */
  .gallery-tile img { transition: transform .7s ease; }
  .gallery-tile:hover img { transform: scale(1.06); }
  @keyframes tpl-fade { from { opacity: 0; } to { opacity: 1; } }
  .lightbox-in { animation: tpl-fade .25s ease both; }

  /* FAQ accordion */
  .faq-item {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.12);
    transition: border-color .3s ease, background-color .3s ease;
  }
  .faq-item.open {
    background: rgba(255,255,255,.06);
    border-color: color-mix(in srgb, var(--accent) 45%, transparent);
  }
  .faq-icon { transition: transform .3s ease; }
  .faq-icon.open { transform: rotate(45deg); }
  .faq-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s ease; }
  .faq-panel.open { grid-template-rows: 1fr; }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .hero-bg, .lightbox-in { animation: none; }
    .faq-panel, .faq-icon, .faq-item, .gallery-tile img { transition: none; }
    .reveal { opacity: 1; transform: none; transition: none; }
    .hero-in, .badge-float, .orb-a, .orb-b, .liquid-glass::after { animation: none; }
    .title-bar { width: 3rem; transition: none; }
    .btn, .menu-row, .field, .burger span, .mobile-item, .wheel-item, .time-chip, .nav-link::after { transition: none; }
    .mobile-menu, .mobile-menu.open { transition: none; }
  }
`;

function TimeWheel({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState(Math.max(0, TIME_SLOTS.indexOf(value)));

  useEffect(() => {
    const sync = () => {
      const el = ref.current;
      const target = TIME_SLOTS.indexOf(value);
      if (!el || target < 0) return;
      if (Math.round(el.scrollTop / WHEEL_ITEM_H) !== target) {
        el.scrollTo({ top: target * WHEEL_ITEM_H, behavior: 'auto' });
      }
      setActive(target);
    };
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [value]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;
    const i = Math.min(TIME_SLOTS.length - 1, Math.max(0, Math.round(el.scrollTop / WHEEL_ITEM_H)));
    setActive(i);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (TIME_SLOTS[i] !== value) onChange(TIME_SLOTS[i]);
    }, 120);
  };

  const pad = WHEEL_ITEM_H * 2;

  return (
    <div className="relative rounded-2xl field overflow-hidden" style={{ height: WHEEL_ITEM_H * 5 }}>
      <div
        className="wheel-band pointer-events-none absolute left-3 right-3 top-1/2 -translate-y-1/2 rounded-xl z-0"
        style={{ height: WHEEL_ITEM_H }}
      />
      <div
        ref={ref}
        onScroll={handleScroll}
        role="listbox"
        aria-label="Select preferred time"
        className="wheel relative z-10 h-full overflow-y-auto snap-y snap-mandatory"
        style={{
          paddingTop: pad,
          paddingBottom: pad,
          WebkitMaskImage: 'linear-gradient(transparent, #000 30%, #000 70%, transparent)',
          maskImage: 'linear-gradient(transparent, #000 30%, #000 70%, transparent)',
        }}
      >
        {TIME_SLOTS.map((t, i) => {
          const dist = Math.abs(i - active);
          return (
            <button
              key={t}
              type="button"
              role="option"
              aria-selected={i === active}
              onClick={() => ref.current?.scrollTo({ top: i * WHEEL_ITEM_H, behavior: 'smooth' })}
              className="wheel-item snap-center w-full flex items-center justify-center text-lg text-white"
              style={{
                height: WHEEL_ITEM_H,
                opacity: dist === 0 ? 1 : dist === 1 ? 0.55 : 0.25,
                transform: `scale(${dist === 0 ? 1 : dist === 1 ? 0.92 : 0.84})`,
                fontWeight: dist === 0 ? 600 : 400,
              }}
            >
              {formatTime(t)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimeGrid({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-5 gap-2.5" role="listbox" aria-label="Select preferred time">
      {TIME_SLOTS.map((t) => (
        <button
          key={t}
          type="button"
          role="option"
          aria-selected={t === value}
          onClick={() => onChange(t)}
          className={`time-chip rounded-xl py-3 text-sm ${t === value ? 'selected' : ''}`}
        >
          {formatTime(t)}
        </button>
      ))}
    </div>
  );
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function SpaTemplatePage() {
  const firstService = C.menu?.[0]?.items?.[0];
  const serviceLabel = (name: string, price: number) => `${name} (${C.currency.symbol}${price})`;

  const [selectedService, setSelectedService] = useState(
    firstService ? serviceLabel(firstService.name, firstService.price) : ''
  );
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [error, setError] = useState('');
  const [today, setToday] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    setToday(`${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 768 && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  const handleBooking = (e: FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !selectedDate) {
      setError('Please enter your name and choose a date.');
      return;
    }
    if (today && selectedDate < today) {
      setError('Please choose a date that is today or later.');
      return;
    }
    const day = new Date(`${selectedDate}T00:00:00`).getDay();
    if (C.booking.closedDays.includes(day)) {
      setError(
        `We are closed on ${C.booking.closedDays.map((d) => DAY_NAMES[d] + 's').join(' and ')}. Please pick another day.`
      );
      return;
    }

    setError('');
    const message =
      `Hi ${C.name}! I'd like to book an appointment:\n\n` +
      `• *Client Name:* ${clientName.trim()}\n` +
      (clientPhone.trim() ? `• *Phone:* ${clientPhone.trim()}\n` : '') +
      `• *Service:* ${selectedService}\n` +
      `• *Date:* ${selectedDate}\n` +
      `• *Time:* ${formatTime(selectedTime)}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const clear = () => error && setError('');
  const colors = C.theme === 'custom' ? C.customColors : themes[C.theme];
  const themeVars = { '--accent': colors.accent, '--gold': colors.gold } as CSSProperties;
  const offers = C.offers ?? [];
  const aboutParagraphs: string[] = (C.about as { paragraphs?: string[] })?.paragraphs ?? [];
const aboutStats: { label: string; value: string }[] =
  (C.about as { stats?: { label: string; value: string }[] })?.stats ?? [];
  const gallery = C.gallery ?? [];
  const faq = C.faq ?? [];
  const hasContact = C.contact.instagram || C.contact.phone || C.contact.email || C.contact.address;

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5]" style={themeVars}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <a href="#home" className="skip-link">
        Skip to content
      </a>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#262626]">
        <div className="px-6 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <div className="logo-ring relative w-10 h-10 overflow-hidden rounded-full shadow-md flex items-center justify-center bg-white/5">
              {C.logo ? (
                <Image src={C.logo} alt={`${C.name} logo`} fill className="object-cover" priority />
              ) : (
                <span className="font-display t-gold text-lg font-bold">{C.name.charAt(0)}</span>
              )}
            </div>
            <span className="font-display tracking-widest text-base sm:text-lg font-bold text-white uppercase">
              {C.name}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-gray-400 font-medium">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`burger md:hidden flex flex-col items-center justify-center w-11 h-11 -mr-2 rounded-full active:bg-white/10 transition-colors ${
              menuOpen ? 'open' : ''
            }`}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div id="mobile-menu" className={`mobile-menu md:hidden ${menuOpen ? 'open' : ''}`}>
          <div className="px-6 pb-6 pt-1 flex flex-col">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="mobile-item py-4 text-sm uppercase tracking-widest text-gray-300 border-b border-white/10 active:bg-white/5"
                style={{ transitionDelay: menuOpen ? `${80 + i * 60}ms` : '0ms' }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setMenuOpen(false)}
              className="mobile-item btn btn-primary mt-5 text-center py-3.5 rounded-full font-bold tracking-wider text-xs uppercase"
              style={{ transitionDelay: menuOpen ? `${80 + NAV_LINKS.length * 60}ms` : '0ms' }}
            >
              Book Your Session
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        {C.heroImage && (
          <div className="absolute inset-0" aria-hidden="true">
            <SafeImage
              src={C.heroImage}
              alt=""
              fallback={null}
              eager
              className="hero-bg absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/75 via-[#0d0d0d]/65 to-[#0d0d0d]" />
          </div>
        )}

        <div className="relative py-24 md:py-32 px-6 text-center max-w-4xl mx-auto">
          {C.badge && (
            <span
              className="hero-in badge-gold inline-block text-xs tracking-widest uppercase py-1.5 px-4 rounded-full mb-4"
              style={{ animationDelay: '.1s' }}
            >
              {C.badge}
            </span>
          )}
          <h1
            className="hero-in font-display text-4xl md:text-6xl font-normal tracking-wide text-white mb-6"
            style={{ animationDelay: '.25s' }}
          >
            {C.headline}
          </h1>
          <p
            className="hero-in text-gray-300 max-w-xl mx-auto text-sm md:text-base mb-6 leading-relaxed"
            style={{ animationDelay: '.45s' }}
          >
            {C.heroText}
          </p>

          {offers.length > 0 && (
            <div className="hero-in flex flex-wrap justify-center gap-3 mb-8" style={{ animationDelay: '.6s' }}>
              {offers.map((o, i) => (
                <span
                  key={o.text}
                  className={`badge-float ${
                    o.tone === 'gold' ? 'badge-gold' : 'badge-accent'
                  } inline-flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-full`}
                  style={{ animationDelay: `${i * 1.2}s` }}
                >
                  <Icon name={o.icon} className="w-3.5 h-3.5" />
                  {o.text}
                </span>
              ))}
            </div>
          )}

          <a
            href="#booking"
            className="btn btn-primary hero-in inline-block px-8 py-3.5 rounded-full font-bold tracking-wider text-xs uppercase"
            style={{ animationDelay: '.8s' }}
          >
            Book Your Session
          </a>
        </div>
      </section>

      {/* About */}
      {C.sections?.about && C.about && (
        <section id="about" className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <Reveal>
              <div className="relative aspect-[4/5] max-h-[560px] w-full mx-auto rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
                <SafeImage src={C.about.image} alt={`${C.name} interior`} className="w-full h-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="font-display text-3xl md:text-4xl text-white mt-1 mb-4">
                {'title' in C.about && typeof C.about.title === 'string' ? C.about.title : 'About Us'}
              </h2>
              <div className="title-bar gold-bar h-0.5 mb-6" />
              <div className="space-y-4">
                {aboutParagraphs.map((para) => (
                  <p key={para} className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              {aboutStats.length > 0 && (
                <div className="flex flex-wrap gap-x-10 gap-y-6 mt-8">
                  {aboutStats.map((st: { label: boolean | Key | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; value: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                    <div key={st.label}>
                      <p className="font-display t-gold text-3xl">{st.value}</p>
                      <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">{st.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {/* Menu & Price List */}
      <section id="prices" className="relative overflow-hidden py-16 px-6 bg-[#141414] border-t border-b border-[#262626]">
        <div className="orb orb-a orb-accent w-80 h-80 -top-16 -left-20" aria-hidden="true" />
        <div className="orb orb-b orb-gold w-96 h-96 -bottom-24 -right-24" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="t-accent text-xs uppercase tracking-widest font-semibold">Services</span>
            <h2 className="font-display text-3xl md:text-4xl text-white mt-1">Menu &amp; Pricing</h2>
            <div className="title-bar gold-bar h-0.5 mx-auto mt-3" />
          </Reveal>

          <div className="space-y-8">
            {(C.menu ?? []).map((group, gIdx) => (
              <Reveal key={group.category} delay={gIdx * 80} className="liquid-glass rounded-3xl p-6 md:p-8">
                <h3 className="font-display text-2xl t-gold mb-5">{group.category}</h3>
                <div className="space-y-3">
                  {(group.items ?? []).map((item, iIdx) => (
                    <div
                      key={item.name}
                      className={`menu-row ${iIdx % 2 === 0 ? 'row-a' : 'row-b'} rounded-2xl px-4 py-3.5 flex items-baseline justify-between gap-4`}
                    >
                      <div>
                        <p className="font-medium text-white text-sm md:text-base">{item.name}</p>
                        {item.note && <p className="text-gray-400 text-xs mt-0.5">{item.note}</p>}
                      </div>
                      <span className="font-semibold t-accent text-sm md:text-base shrink-0">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {C.sections?.gallery && gallery.length > 0 && (
        <section id="gallery" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-12">
              <span className="t-accent text-xs uppercase tracking-widest font-semibold">Atmosphere</span>
              <h2 className="font-display text-3xl md:text-4xl text-white mt-1">Gallery</h2>
              <div className="title-bar gold-bar h-0.5 mx-auto mt-3" />
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[210px] md:auto-rows-[250px]">
              {gallery.map((img, idx) => (
                <div
                  key={img.src}
                  className={idx === 0 ? 'col-span-2 md:col-span-2 row-span-1' : 'col-span-1'}
                >
                  <GalleryTile
                    src={img.src}
                    alt={img.alt}
                    onOpen={(src, alt) => setLightbox({ src, alt })}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking */}
      <section id="booking" className="py-20 px-6 bg-[#141414] border-t border-b border-[#262626]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <span className="t-accent text-xs uppercase tracking-widest font-semibold">Reservations</span>
            <h2 className="font-display text-3xl md:text-4xl text-white mt-1">Book Your Session</h2>
            <div className="title-bar gold-bar h-0.5 mx-auto mt-3" />
          </Reveal>

          <Reveal delay={100} className="liquid-glass rounded-3xl p-6 md:p-10">
            <form onSubmit={handleBooking} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="client-name" className="block text-xs uppercase tracking-wider text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      clear();
                    }}
                    placeholder="Full name"
                    className="field w-full rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>
                <div>
                  <label htmlFor="client-phone" className="block text-xs uppercase tracking-wider text-gray-300 mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Optional"
                    className="field w-full rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="service-select" className="block text-xs uppercase tracking-wider text-gray-300 mb-2">
                    Select Service
                  </label>
                  <select
                    id="service-select"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="field w-full rounded-xl px-4 py-3 text-sm text-white"
                  >
                    {(C.menu ?? []).map((group) => (
                      <optgroup key={group.category} label={group.category}>
                        {(group.items ?? []).map((item) => {
                          const label = serviceLabel(item.name, item.price);
                          return (
                            <option key={item.name} value={label}>
                              {label}
                            </option>
                          );
                        })}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="booking-date" className="block text-xs uppercase tracking-wider text-gray-300 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    required
                    min={today}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      clear();
                    }}
                    className="field w-full rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <p className="block text-xs uppercase tracking-wider text-gray-300 mb-2.5">Preferred Time</p>
                <div className="md:hidden">
                  <TimeWheel value={selectedTime} onChange={setSelectedTime} />
                </div>
                <div className="hidden md:block">
                  <TimeGrid value={selectedTime} onChange={setSelectedTime} />
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="text-xs text-red-400 bg-red-950/40 border border-red-500/30 rounded-xl px-4 py-3"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary w-full py-3.5 rounded-full font-bold tracking-wider text-xs uppercase"
              >
                Send Booking via WhatsApp
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      {C.sections?.faq && faq.length > 0 && (
        <section id="faq" className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center mb-10">
              <span className="t-accent text-xs uppercase tracking-widest font-semibold">Good to Know</span>
              <h2 className="font-display text-3xl md:text-4xl text-white mt-1">Frequently Asked Questions</h2>
              <div className="title-bar gold-bar h-0.5 mx-auto mt-3" />
            </Reveal>

            <div className="space-y-3">
              {faq.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={item.q} className={`faq-item rounded-2xl overflow-hidden ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
                    >
                      <span className="font-medium text-sm md:text-base text-white">{item.q}</span>
                      <Icon name="plus" className={`faq-icon w-4 h-4 t-gold shrink-0 ${isOpen ? 'open' : ''}`} />
                    </button>
                    <div className={`faq-panel ${isOpen ? 'open' : ''}`}>
                      <div className="overflow-hidden">
                        <p className="px-5 pb-4 text-gray-400 text-xs md:text-sm leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-[#141414] border-t border-[#262626]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="t-accent text-xs uppercase tracking-widest font-semibold">Get in Touch</span>
            <h2 className="font-display text-3xl md:text-4xl text-white mt-1">Visit &amp; Contact</h2>
            <div className="title-bar gold-bar h-0.5 mx-auto mt-3" />
          </Reveal>

          {hasContact && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {C.contact.address && (
                <div className="liquid-glass rounded-2xl p-6">
                  <Icon name="pin" className="w-5 h-5 t-gold mb-3" />
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Location</p>
                  <p className="text-sm text-white">{C.contact.address}</p>
                </div>
              )}
              {C.contact.phone && (
                <div className="liquid-glass rounded-2xl p-6">
                  <Icon name="clock" className="w-5 h-5 t-gold mb-3" />
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Phone</p>
                  <p className="text-sm text-white">{C.contact.phone}</p>
                </div>
              )}
              {C.contact.email && (
                <div className="liquid-glass rounded-2xl p-6">
                  <Icon name="sparkles" className="w-5 h-5 t-gold mb-3" />
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Email</p>
                  <a href={`mailto:${C.contact.email}`} className="text-sm link-accent break-all">
                    {C.contact.email}
                  </a>
                </div>
              )}
              {C.contact.instagram && (
                <div className="liquid-glass rounded-2xl p-6">
                  <Icon name="instagram" className="w-5 h-5 t-gold mb-3" />
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Instagram</p>
                  <a
                    href={`https://instagram.com/${C.contact.instagram.replace(/^@/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm link-accent"
                  >
                    @{C.contact.instagram.replace(/^@/, '')}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
          className="lightbox-in fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="btn btn-outline absolute top-5 right-5 px-4 py-2 rounded-full text-xs uppercase tracking-widest"
          >
            Close
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </main>
  );
}