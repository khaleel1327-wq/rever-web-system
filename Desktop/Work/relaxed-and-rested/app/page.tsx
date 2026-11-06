'use client';

import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';

type IconProps = { className?: string; strokeWidth?: number };

function CalendarCheck({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4m8-4v4M3 10h18" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function Gift({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8v13M3 12h18M12 8H7.5a2.5 2.5 0 1 1 2.5-2.5V8Zm0 0h4.5a2.5 2.5 0 1 0-2.5-2.5V8Z" />
    </svg>
  );
}

function Users({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m16 0v-2a4 4 0 0 0-3-3.87M14 3.13a4 4 0 0 1 0 7.75" />
      <circle cx="10" cy="7" r="4" />
    </svg>
  );
}

// Exact Price List from Relaxed & Rested Menus
const PRICE_LIST = [
  {
    category: 'Pedicure Menu',
    items: [
      { name: 'Regular Priced Pedicure', description: 'Soak, Callus Removal, Scrub, Regular Polish', price: '$150 TTD' },
      { name: 'Spa Pedicure', description: 'Soak, Cut Nails, Cuticle Care, Remove Callus, Scrub, Gel Polish, Massage', price: '$250 TTD' },
      { name: 'Deluxe Pedicure', description: 'Soak, Cut & Shape Nails, Cuticle Care, Callus Removal, Scrub, Mask, Gel Polish, Feet & Calf Massage', price: '$400 TTD' },
    ],
  },
  {
    category: 'Massage Menu',
    items: [
      { name: 'Feet Massage (30 Mins)', description: 'Targeted foot relaxation massage', price: '$150 TTD' },
      { name: 'Neck & Shoulder Massage (30 Mins)', description: 'Relaxing or Deep Tissue focus', price: '$150 TTD' },
      { name: 'Back Massage (30 Mins)', description: 'Focused back tension relief', price: '$250 TTD' },
      { name: 'Full Body Massage Swedish (45 Mins)', description: 'Full body Swedish relaxation technique', price: '$350 TTD' },
      { name: 'Lymphatic Drainage Massage (45 Mins)', description: 'Specialized drainage technique', price: '$450 TTD' },
      { name: 'Deep Tissue Massage (45-60 Mins)', description: 'Intense muscle group therapy', price: '$500 TTD' },
    ],
  },
  {
    category: 'Service Providers Special',
    items: [
      { name: 'Back Therapy & Stretch (In House - 45 Mins)', description: 'For Hairdressers, Nail Techs, Lash Techs, Estheticians', price: '$350 TTD' },
      { name: 'Back Therapy & Stretch (On Call)', description: 'Mobile service delivery', price: '$450 TTD' },
      { name: 'Back Therapy & Stretch (After Hours)', description: 'Late evening slot availability', price: '$550 TTD' },
      { name: 'Hand Relaxation (In House - 30 Mins)', description: 'Therapeutic hand and wrist massage', price: '$250 TTD' },
      { name: 'Hand Relaxation (On Call)', description: 'Mobile service delivery', price: '$350 TTD' },
      { name: 'Hand Relaxation (After Hours)', description: 'Late evening slot availability', price: '$450 TTD' },
    ],
  },
];

// Booking Options derived from menu
const BOOKING_SERVICES = [
  'Regular Priced Pedicure ($150)',
  'Spa Pedicure ($250)',
  'Deluxe Pedicure ($400)',
  'Feet Massage ($150)',
  'Neck & Shoulder Massage ($150)',
  'Back Massage ($250)',
  'Full Body Massage Swedish ($350)',
  'Lymphatic Drainage Massage ($450)',
  'Deep Tissue Massage ($500)',
  'Service Providers Back Therapy & Stretch',
  'Service Providers Hand Relaxation',
];

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Menu & Prices', href: '#prices' },
  { label: 'Book Appointment', href: '#booking' },
  { label: 'Contact', href: '#contact' },
];

/* ------------------------------------------------------------------ */
/* Motion + glass styles                                               */
/* ------------------------------------------------------------------ */
const STYLES = `
  html { scroll-behavior: smooth; scroll-padding-top: 72px; }

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
    opacity: 0;
    transform: translateY(20px);
    transition: opacity .8s cubic-bezier(.22,.61,.36,1), transform .8s cubic-bezier(.22,.61,.36,1);
  }
  .reveal.is-visible { opacity: 1; transform: none; }

  /* Hero load-in */
  @keyframes rr-fade-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: none; }
  }
  .hero-in { animation: rr-fade-up .9s cubic-bezier(.22,.61,.36,1) both; }

  /* Nav links */
  .nav-link { position: relative; }
  .nav-link::after {
    content: ""; position: absolute; left: 0; right: 0; bottom: -6px; height: 1px;
    background: #F4C2C2; transform: scaleX(0); transform-origin: left;
    transition: transform .3s ease;
  }
  .nav-link:hover::after { transform: scaleX(1); }

  /* Buttons */
  .btn { transition: transform .25s ease, background-color .25s ease, box-shadow .25s ease; }
  .btn:hover { transform: translateY(-2px); }
  .btn:active { transform: translateY(0); }

  /* Heading underline draws in */
  .title-bar { width: 0; transition: width .8s ease-out .25s; }
  .is-visible .title-bar { width: 3rem; }

  /* Soft badges float very slightly */
  @keyframes rr-float {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }
  .badge-float { animation: rr-float 5s ease-in-out infinite; }

  /* Drifting colour orbs behind the glass */
  @keyframes rr-drift-a {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(60px, 40px) scale(1.15); }
  }
  @keyframes rr-drift-b {
    from { transform: translate(0, 0) scale(1.1); }
    to   { transform: translate(-50px, -30px) scale(.95); }
  }
  .orb { position: absolute; border-radius: 9999px; filter: blur(70px); pointer-events: none; }
  .orb-a { animation: rr-drift-a 16s ease-in-out infinite alternate; }
  .orb-b { animation: rr-drift-b 20s ease-in-out infinite alternate; }

  /* Liquid glass container */
  .liquid-glass {
    position: relative;
    overflow: hidden;
    background:
      linear-gradient(135deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,.04) 45%, rgba(244,194,194,.08) 100%);
    -webkit-backdrop-filter: blur(24px) saturate(170%);
    backdrop-filter: blur(24px) saturate(170%);
    border: 1px solid rgba(255,255,255,.18);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.38),
      inset 0 -1px 0 rgba(255,255,255,.06),
      inset 0 0 40px rgba(255,255,255,.04),
      0 24px 60px rgba(0,0,0,.45);
  }
  /* specular highlight */
  .liquid-glass::before {
    content: ""; position: absolute; top: -45%; left: -20%; width: 75%; height: 85%;
    background: radial-gradient(ellipse at center, rgba(255,255,255,.18), transparent 70%);
    pointer-events: none;
  }
  /* slow sheen sweeping across */
  @keyframes rr-sheen {
    0%, 55%  { background-position: 160% 0; }
    100%     { background-position: -60% 0; }
  }
  .liquid-glass::after {
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background: linear-gradient(115deg, transparent 38%, rgba(255,255,255,.07) 50%, transparent 62%);
    background-size: 250% 100%;
    animation: rr-sheen 10s ease-in-out infinite;
  }

  /* Menu rows: alternating colour bands */
  .menu-row {
    position: relative;
    border-left: 3px solid transparent;
    transition: background-color .3s ease, transform .3s ease, border-color .3s ease;
  }
  .menu-row.row-a {
    background: linear-gradient(90deg, rgba(244,194,194,.13), rgba(244,194,194,.03));
    border-left-color: rgba(244,194,194,.65);
  }
  .menu-row.row-b {
    background: linear-gradient(90deg, rgba(193,154,107,.15), rgba(193,154,107,.03));
    border-left-color: rgba(193,154,107,.7);
  }
  .menu-row:hover { transform: translateX(4px); }
  .menu-row.row-a:hover { background: linear-gradient(90deg, rgba(244,194,194,.22), rgba(244,194,194,.06)); }
  .menu-row.row-b:hover { background: linear-gradient(90deg, rgba(193,154,107,.25), rgba(193,154,107,.06)); }

  /* Time picker */
  .wheel { scrollbar-width: none; -ms-overflow-style: none; overscroll-behavior: contain; touch-action: pan-y; }
  .wheel::-webkit-scrollbar { display: none; }
  .wheel-item { transition: opacity .18s ease, transform .18s ease; }

  .time-chip {
    background: rgba(0,0,0,.28);
    border: 1px solid rgba(255,255,255,.16);
    color: rgba(255,255,255,.85);
    transition: transform .2s ease, background-color .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease;
  }
  .time-chip:hover { transform: translateY(-2px); border-color: rgba(244,194,194,.55); background: rgba(244,194,194,.1); }
  .time-chip.selected {
    background: #F4C2C2; color: #0d0d0d; border-color: #F4C2C2; font-weight: 700;
    box-shadow: 0 6px 18px rgba(244,194,194,.22);
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
  .field:focus {
    background: rgba(0,0,0,.4);
    box-shadow: inset 0 1px 2px rgba(0,0,0,.35), 0 0 0 3px rgba(193,154,107,.18);
  }
  .field::placeholder { color: rgba(255,255,255,.35); }
  .field option { background: #1a1a1a; color: #fff; }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .reveal { opacity: 1; transform: none; transition: none; }
    .hero-in, .badge-float, .orb-a, .orb-b, .liquid-glass::after { animation: none; }
    .title-bar { width: 3rem; transition: none; }
    .btn, .menu-row, .field, .burger span, .mobile-item, .wheel-item, .time-chip { transition: none; }
    .mobile-menu, .mobile-menu.open { transition: none; }
  }
`;

// 30-minute slots from 10:00 AM to 5:00 PM
const TIME_SLOTS = Array.from({ length: 15 }, (_, i) => {
  const mins = 10 * 60 + i * 30;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
});

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

const WHEEL_ITEM_H = 40;

/* Mobile: iOS-style scroll wheel */
function TimeWheel({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState(Math.max(0, TIME_SLOTS.indexOf(value)));

  // Keep the wheel in sync with the selected value (also after resizing from desktop)
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

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

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
      {/* centre selection band */}
      <div
        className="pointer-events-none absolute left-3 right-3 top-1/2 -translate-y-1/2 rounded-xl border border-[#C19A6B]/60 bg-white/10 z-0"
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

/* Desktop: click-to-select grid */
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

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
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

export default function RelaxedAndRestedPage() {
  const [selectedService, setSelectedService] = useState(BOOKING_SERVICES[0]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !clientName) {
      alert('Please select a date, time, and enter your name.');
      return;
    }

    // Replace with Relaxed & Rested contact phone number
    const phone = '18681234567';
    const message =
      `Hi Relaxed & Rested! I'd like to book an appointment:\n\n` +
      `• *Client Name:* ${clientName}\n` +
      `• *Phone:* ${clientPhone}\n` +
      `• *Service:* ${selectedService}\n` +
      `• *Date:* ${selectedDate}\n` +
      `• *Time:* ${formatTime(selectedTime)}`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5]">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#262626]">
        <div className="px-6 py-3 flex items-center justify-between">
          <a href="#about" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-[#C19A6B]/50 shadow-md">
              <Image
                src="/images/relaxed and rested logo.png"
                alt="Relaxed & Rested Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-serif tracking-widest text-base sm:text-lg font-bold text-white">RELAXED & RESTED</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-gray-400 font-medium">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link hover:text-[#F4C2C2] transition-colors">
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
            className={`burger md:hidden flex flex-col items-center justify-center w-11 h-11 -mr-2 rounded-full active:bg-white/10 transition-colors ${menuOpen ? 'open' : ''}`}
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
                className="mobile-item py-4 text-sm uppercase tracking-widest text-gray-300 border-b border-white/10 active:bg-white/5 hover:text-[#F4C2C2]"
                style={{ transitionDelay: menuOpen ? `${80 + i * 60}ms` : '0ms' }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setMenuOpen(false)}
              className="mobile-item btn mt-5 text-center bg-[#F4C2C2] text-[#0d0d0d] py-3.5 rounded-full font-bold tracking-wider text-xs uppercase"
              style={{ transitionDelay: menuOpen ? `${80 + NAV_LINKS.length * 60}ms` : '0ms' }}
            >
              Book Your Session
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="py-20 px-6 text-center max-w-4xl mx-auto">
        <span
          className="hero-in inline-block bg-[#C19A6B]/15 text-[#C19A6B] text-xs tracking-widest uppercase py-1.5 px-4 rounded-full mb-4 border border-[#C19A6B]/30"
          style={{ animationDelay: '.1s' }}
        >
          By Thrices Beauty Essentials
        </span>
        <h1
          className="hero-in font-serif text-4xl md:text-6xl font-normal tracking-wide text-white mb-6"
          style={{ animationDelay: '.25s' }}
        >
          Premium Pedicure & Body Therapy Spa
        </h1>
        <p
          className="hero-in text-gray-400 max-w-xl mx-auto text-sm md:text-base mb-6 leading-relaxed"
          style={{ animationDelay: '.45s' }}
        >
          Specializing in therapeutic massages, luxury spa pedicures, and dedicated relief sessions for beauty service providers.
        </p>

        {/* Special Offer Badges */}
        <div
          className="hero-in flex flex-wrap justify-center gap-3 mb-8"
          style={{ animationDelay: '.6s' }}
        >
          <span className="badge-float text-xs bg-[#F4C2C2]/10 text-[#F4C2C2] border border-[#F4C2C2]/30 py-1 px-3 rounded-full">
            ✨ Book 4 Services & Get 1 FREE
          </span>
          <span
            className="badge-float text-xs bg-[#C19A6B]/10 text-[#C19A6B] border border-[#C19A6B]/30 py-1 px-3 rounded-full"
            style={{ animationDelay: '1.2s' }}
          >
            🏷️ Refer a Client for 10% OFF
          </span>
        </div>

        <a
          href="#booking"
          className="btn hero-in inline-block bg-[#F4C2C2] text-[#0d0d0d] px-8 py-3.5 rounded-full font-bold tracking-wider text-xs uppercase hover:bg-white shadow-lg shadow-[#F4C2C2]/10"
          style={{ animationDelay: '.8s' }}
        >
          Book Your Session
        </a>
      </section>

      {/* 1. MENU & PRICE LIST SECTION */}
      <section
        id="prices"
        className="relative overflow-hidden py-16 px-6 bg-[#141414] border-t border-b border-[#262626]"
      >
        {/* Colour orbs so the glass has something to refract */}
        <div className="orb orb-a w-80 h-80 bg-[#F4C2C2]/25 -top-16 -left-20" aria-hidden="true" />
        <div className="orb orb-b w-96 h-96 bg-[#C19A6B]/25 top-1/3 -right-28" aria-hidden="true" />
        <div className="orb orb-a w-72 h-72 bg-[#F4C2C2]/20 bottom-0 left-1/4" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-[#F4C2C2] text-xs uppercase tracking-widest font-semibold">Self-Care Investment</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mt-1">Service Menu</h2>
            <div className="title-bar h-0.5 bg-[#C19A6B] mx-auto mt-3"></div>
          </Reveal>

          <div className="space-y-10">
            {PRICE_LIST.map((cat, ci) => (
              <Reveal key={cat.category} delay={ci * 80}>
                <div className="liquid-glass p-6 md:p-8 rounded-3xl">
                  <div className="relative z-10">
                    <h3 className="font-serif text-2xl text-[#C19A6B] border-b border-white/15 pb-3 mb-5">
                      {cat.category}
                    </h3>
                    <div className="space-y-3">
                      {cat.items.map((item, i) => (
                        <div
                          key={item.name}
                          className={`menu-row ${i % 2 === 0 ? 'row-a' : 'row-b'} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 rounded-xl px-4 py-4`}
                        >
                          <div>
                            <h4 className="text-white font-medium text-base">{item.name}</h4>
                            <p className="text-gray-300/80 text-xs mt-0.5">{item.description}</p>
                          </div>
                          <span className="text-[#F4C2C2] font-mono text-sm font-semibold whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2. APPOINTMENT BOOKING ENGINE */}
      <section id="booking" className="relative overflow-hidden py-20 px-6">
        {/* Colour orbs so the glass has something to refract */}
        <div className="orb orb-b w-80 h-80 bg-[#C19A6B]/25 top-10 -left-24" aria-hidden="true" />
        <div className="orb orb-a w-96 h-96 bg-[#F4C2C2]/25 bottom-0 -right-28" aria-hidden="true" />

        <Reveal className="relative">
          <div className="liquid-glass max-w-2xl mx-auto p-8 md:p-10 rounded-3xl">
            <div className="relative z-10">
            <div className="text-center mb-8">
              <span className="text-[#F4C2C2] text-xs uppercase tracking-widest font-semibold">Reserve Your Appointment</span>
              <h2 className="font-serif text-3xl text-white mt-1">Book A Session</h2>
              <p className="text-gray-400 text-xs mt-2">Appointments available between 10:00 AM – 5:00 PM • Deposit required</p>
            </div>

            <form onSubmit={handleBooking} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-300 mb-2 font-medium">
                  Select Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="field w-full rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-[#C19A6B]"
                >
                  {BOOKING_SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-300 mb-2 font-medium">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="field w-full rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-[#C19A6B]"
                />
              </div>

              {/* Time: scroll wheel on mobile, click grid on desktop */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-300 mb-2 font-medium">
                  Select Preferred Time (10:00 AM - 5:00 PM)
                </label>
                <div className="md:hidden">
                  <TimeWheel value={selectedTime} onChange={setSelectedTime} />
                  <p className="text-center text-[11px] text-gray-400 mt-2">
                    Scroll to choose • Selected: <span className="text-[#F4C2C2] font-semibold">{formatTime(selectedTime)}</span>
                  </p>
                </div>
                <div className="hidden md:block">
                  <TimeGrid value={selectedTime} onChange={setSelectedTime} />
                </div>
              </div>

              {/* Client Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-300 mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="field w-full rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-[#C19A6B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-300 mb-2 font-medium">
                    WhatsApp Contact
                  </label>
                  <input
                    type="tel"
                    placeholder="868-XXX-XXXX"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="field w-full rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-[#C19A6B]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn w-full bg-[#F4C2C2] text-[#0d0d0d] font-bold py-4 rounded-xl hover:bg-white tracking-widest uppercase text-xs shadow-lg shadow-[#F4C2C2]/10 mt-4"
              >
                Request Appointment via WhatsApp
              </button>
            </form>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 3. FOOTER / CONTACT SECTION */}
      <footer id="contact" className="bg-[#080808] border-t border-[#262626] py-16 px-6">
        <Reveal>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            {/* Brand Col */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">RELAXED & RESTED</h3>
              <p className="text-xs text-[#C19A6B] tracking-widest uppercase mb-4">By Thrices Beauty Essentials</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Providing premier pedicure treatments, full body massage therapy, and specialized provider recovery sessions.
              </p>
            </div>

            {/* Policy Details */}
            <div className="space-y-3">
  <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-3">Booking Policies</h4>
  {[
    { icon: CalendarCheck, text: 'Deposit required to secure all appointments' },
    { icon: Gift, text: 'Book 4 sessions & get 1 free' },
    { icon: Users, text: 'Refer a client for 10% off your next service' },
  ].map(({ icon: Icon, text }) => (
    <p key={text} className="flex items-start gap-2.5 text-xs text-gray-400 text-left justify-center md:justify-start">
      <Icon className="w-4 h-4 text-[#C19A6B] shrink-0 mt-px" strokeWidth={1.75} />
      <span>{text}</span>
    </p>
  ))}
</div>

            {/* Social Links */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-3">Connect</h4>
              <p className="text-xs text-gray-400">
                📸 Instagram: <a href="https://www.instagram.com/_relaxedandrested" target="_blank" rel="noopener noreferrer" className="text-[#F4C2C2] hover:underline">@_relaxedandrested</a>
              </p>
            </div>
          </div>
        </Reveal>

        <div className="max-w-5xl mx-auto border-t border-[#1a1a1a] mt-12 pt-6 text-center text-[10px] text-gray-500 uppercase tracking-widest">
          © 2026 Relaxed & Rested • Engineered by Vanguard Systems
        </div>
      </footer>
    </main>
  );
}