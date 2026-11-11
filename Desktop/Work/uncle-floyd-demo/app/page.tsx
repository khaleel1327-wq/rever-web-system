"use client";

import { useEffect, useState } from "react";
import { Bricolage_Grotesque, Figtree } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });

/* ---------- Demo data: edit these ---------- */
const WHATSAPP_NUMBER = "18683501206"; // +1 (868) 350-1206, digits only for wa.me
const WHATSAPP_DISPLAY = "868-350-1206";

const packages = [
  { id: "A", name: "Basic Check", price: "TT$250", blurb: "A quick health check for your hybrid.",
    items: ["Visual inspection", "Battery status scan", "Fluid top-up"] },
  { id: "B", name: "Battery Care", price: "TT$600", blurb: "Keep the hybrid battery performing at its best.",
    items: ["Everything in Package A", "Cell balance test", "Cooling fan and vent clean"] },
  { id: "C", name: "Full Hybrid Service", price: "TT$1,100", blurb: "The complete service for your hybrid.",
    items: ["Everything in Package B", "Brake and regen check", "Road test and written report"] },
];

const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

/* Images live in your project's /public/images folder. */
const media = {
  hero: "/images/image-1.webp",
  gallery: [
    { src: "/images/image-2.webp", alt: "Hybrid vehicle being serviced" },
    { src: "/images/image-3.jpg", alt: "Hybrid service at the workshop" },
  ],
};

type Booking = { pkg: string; name: string; phone: string; vehicle: string; date: string; time: string; notes: string };
const empty: Booking = { pkg: "B", name: "", phone: "", vehicle: "", date: "", time: "", notes: "" };

/* Shows a placeholder instead of a broken image if the file isn't there yet. */
function Photo({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="ph">Add photo: public{src}</div>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} onError={() => setFailed(true)} />;
}

/* ---------- Page ---------- */
export default function Home() {
  const [form, setForm] = useState<Booking>(empty);
  const [minDate, setMinDate] = useState("");
  const [done, setDone] = useState<Booking | null>(null);

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  // Fade sections in as they scroll into view
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const set = (k: keyof Booking) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function whatsappLink(b: Booking) {
    const p = packages.find((x) => x.id === b.pkg)!;
    const day = new Date(b.date + "T00:00:00").toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
    const text = [
      "Hi Uncle Floyd's, I'd like to confirm a booking:",
      `Package ${p.id}: ${p.name} (${p.price})`,
      `Date: ${day}`,
      `Time: ${b.time}`,
      `Name: ${b.name}`,
      `Phone: ${b.phone}`,
      `Vehicle: ${b.vehicle}`,
      b.notes ? `Notes: ${b.notes}` : "",
    ].filter(Boolean).join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.open(whatsappLink(form), "_blank", "noopener,noreferrer"); // opens WhatsApp straight away
    setDone(form);
  }

  const selectedPkg = packages.find((x) => x.id === form.pkg)!;
  const confirmPkg = done ? packages.find((x) => x.id === done.pkg)! : null;

  return (
    <div className={`page ${display.variable} ${body.variable}`}>
      <style>{css}</style>
      <noscript><style>{`.reveal{opacity:1;transform:none}.rise{animation:none}`}</style></noscript>

      <header className="site-header">
        <div className="wrap bar">
          <span className="brand">Uncle Floyd&rsquo;s Hybrid Services</span>
          <a className="btn btn-small" href="#book">Book a service</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <h1 className="rise">Hybrid care you can trust, booked in a minute.</h1>
              <p className="lead rise" style={{ animationDelay: "120ms" }}>Choose a package, pick a time, and confirm on WhatsApp. No phone tag.</p>
              <a className="btn rise" style={{ animationDelay: "240ms" }} href="#book">Book a service</a>
            </div>

            <div className="frame hero-photo rise" style={{ animationDelay: "180ms" }}>
              <Photo src={media.hero} alt="Hybrid vehicle service at Uncle Floyd's" eager />
            </div>
          </div>
        </section>

        <section className="section" id="packages">
          <div className="wrap">
            <h2 className="reveal">Service packages</h2>
            <div className="pkg-grid">
              {packages.map((p, i) => (
                <article className="pkg reveal" key={p.id} style={{ transitionDelay: `${i * 100}ms` }}>
                  <h3>Package {p.id}: {p.name}</h3>
                  <p className="price">{p.price}</p>
                  <p>{p.blurb}</p>
                  <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section tint" id="work">
          <div className="wrap">
            <h2 className="reveal">In the workshop</h2>
            <div className="gallery">
              {media.gallery.map((g, i) => (
                <div className="frame reveal" key={g.src} style={{ transitionDelay: `${i * 120}ms` }}>
                  <Photo src={g.src} alt={g.alt} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="book">
          <div className="wrap narrow">
            <h2 className="reveal">Book your appointment</h2>

            {done && confirmPkg ? (
              <div className="card confirm" role="status">
                <h3>Almost done, {done.name.split(" ")[0]}.</h3>
                <p>WhatsApp should have opened with your booking ready to send. Tap send to confirm. If it didn&rsquo;t open, use the button below.</p>
                <dl>
                  <dt>Package</dt><dd>{confirmPkg.id}: {confirmPkg.name}</dd>
                  <dt>When</dt><dd>{done.date} at {done.time}</dd>
                  <dt>Vehicle</dt><dd>{done.vehicle}</dd>
                </dl>
                <div className="row">
                  <a className="btn btn-green" href={whatsappLink(done)} target="_blank" rel="noopener noreferrer">
                    Confirm booking via WhatsApp
                  </a>
                  <button className="btn btn-ghost" type="button" onClick={() => { setDone(null); setForm(empty); }}>
                    Make another booking
                  </button>
                </div>
              </div>
            ) : (
              <form className="card" onSubmit={onSubmit}>
                <div className="fields">
                  <label className="full">Package
                    <select required value={form.pkg} onChange={set("pkg")}>
                      {packages.map((p) => (
                        <option key={p.id} value={p.id}>Package {p.id}: {p.name} ({p.price})</option>
                      ))}
                    </select>
                    <span className="note">Includes: {selectedPkg.items.join(", ")}</span>
                  </label>
                  <label>Full name
                    <input required value={form.name} onChange={set("name")} autoComplete="name" />
                  </label>
                  <label>Phone number
                    <input required type="tel" inputMode="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="868-555-0123" />
                  </label>
                  <label className="full">Vehicle (make, model, year)
                    <input required value={form.vehicle} onChange={set("vehicle")} placeholder="Toyota Prius 2014" />
                  </label>
                  <label>Date
                    <input required type="date" min={minDate} value={form.date} onChange={set("date")} />
                  </label>
                  <label>Time
                    <select required value={form.time} onChange={set("time")}>
                      <option value="" disabled>Choose a time</option>
                      {timeSlots.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </label>
                  <label className="full">Notes (optional)
                    <textarea rows={3} value={form.notes} onChange={set("notes")} />
                  </label>
                </div>

                <button className="btn btn-green btn-wide" type="submit">Confirm booking via WhatsApp</button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <p>Uncle Floyd&rsquo;s Hybrid Services &middot; WhatsApp {WHATSAPP_DISPLAY}</p>
          <p className="muted">Demo site. Packages, prices and media are placeholders.</p>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Styles ---------- */
const css = `
:root {
  --bg: #f1f6fa; --surface: #fafcfe; --blue: #0b57b5; --blue-dark: #083f85; --green: #17a05d; --green-dark: #11804a;
  --ink: #12263a; --muted: #5b6b7b; --tint: #e6eff7; --line: #d3dfea; --radius: 10px;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 72px; -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--bg); }
.page { overflow-x: clip; color: var(--ink); font-family: var(--font-body), system-ui, sans-serif; line-height: 1.6; }
.page h1, .page h2, .page h3 { font-family: var(--font-display), system-ui, sans-serif; line-height: 1.15; margin: 0 0 .6rem; }
.page h1 { font-size: clamp(2.2rem, 5vw, 3.6rem); color: var(--blue-dark); }
.page h2 { font-size: clamp(1.6rem, 3vw, 2.2rem); color: var(--blue-dark); margin-bottom: 1.5rem; }
.page h3 { font-size: 1.2rem; }
.page p { margin: 0 0 1rem; }
.wrap { max-width: 1080px; margin: 0 auto; padding: 0 1.25rem; }
.narrow { max-width: 720px; }
.muted { color: var(--muted); font-size: .9rem; }
.page :focus-visible { outline: 3px solid var(--green); outline-offset: 2px; }

.site-header { border-bottom: 1px solid var(--line); position: sticky; top: 0; background: var(--surface); z-index: 5; }
.bar { display: flex; align-items: center; justify-content: space-between; min-height: 64px; gap: .75rem; }
.brand { line-height: 1.2; font-family: var(--font-display), sans-serif; font-weight: 700; color: var(--blue); font-size: 1.1rem; }

.btn { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; border: 0; cursor: pointer; text-decoration: none; background: var(--blue); color: #fff;
  font: inherit; font-weight: 600; padding: .8rem 1.4rem; border-radius: var(--radius); text-align: center; }
.btn:hover { background: var(--blue-dark); }
.btn-small { padding: .5rem 1rem; min-height: 44px; white-space: nowrap; }
.btn-wide { width: 100%; padding: 1rem; font-size: 1.05rem; }
.btn-green { background: var(--green); }
.btn-green:hover { background: var(--green-dark); }
.btn-ghost { background: transparent; color: var(--blue); border: 1px solid var(--line); }
.btn-ghost:hover { background: var(--tint); }

.hero { padding: 4.5rem 0 4rem; }
.hero-grid { display: grid; gap: 3rem; align-items: center; grid-template-columns: 1.1fr 1fr; }
.lead { font-size: 1.15rem; color: var(--muted); max-width: 34ch; margin-bottom: 1.6rem; }

/* Media frames: fixed ratio; the image fills the frame and is cropped to fit */
.frame { margin: 0; border-radius: 14px; overflow: hidden; border: 1px solid var(--line); background: var(--tint); aspect-ratio: 4 / 3; }
.frame img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center; }
.hero-photo { border: 3px solid var(--blue); }
.gallery { display: grid; gap: 1.25rem; grid-template-columns: repeat(2, 1fr); }
.ph { display: grid; place-items: center; width: 100%; height: 100%; padding: 1rem; text-align: center;
  color: var(--muted); font-size: .9rem; border: 2px dashed var(--line); }

.section { padding: 4rem 0; }
.tint { background: var(--tint); }

.pkg-grid { display: grid; gap: 1.25rem; grid-template-columns: repeat(3, 1fr); }
.pkg { border: 1px solid var(--line); border-top: 4px solid var(--blue); border-radius: var(--radius); padding: 1.5rem; background: var(--surface); }
.pkg:nth-child(2) { border-top-color: var(--green); }
.pkg:nth-child(3) { border-top-color: var(--blue-dark); }
.pkg ul { margin: 0; padding-left: 1.1rem; color: var(--muted); }
.price { font-weight: 700; color: var(--green-dark); font-size: 1.25rem; margin-bottom: .5rem; }

.card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 1.75rem; }
#book .card { box-shadow: 0 1px 0 var(--line); }
.fields { display: grid; gap: 1rem; grid-template-columns: 1fr 1fr; margin-bottom: 1.5rem; }
.fields label { display: flex; flex-direction: column; gap: .3rem; font-weight: 600; font-size: .95rem; }
.fields .full { grid-column: 1 / -1; }
.fields label { min-width: 0; }
.fields input, .fields select, .fields textarea { width: 100%; min-width: 0; min-height: 48px; font: inherit; font-size: 16px; font-weight: 400;
  padding: .65rem .75rem; border: 1px solid var(--line); border-radius: 8px; background: var(--surface); color: var(--ink); }
.note { font-weight: 400; font-size: .9rem; color: var(--muted); }

.confirm dl { display: grid; grid-template-columns: auto 1fr; gap: .35rem 1rem; margin: 1rem 0 1.5rem; }
.confirm dt { color: var(--muted); }
.confirm dd { margin: 0; font-weight: 600; }
.row { display: flex; gap: .75rem; flex-wrap: wrap; }

.site-footer { border-top: 1px solid var(--line); padding: 2rem 0; }
.site-footer p { margin: 0 0 .25rem; }

/* Polish: soft, cheap-to-render touches (no blur, no fixed backgrounds) */
.hero { background: radial-gradient(520px 260px at 92% 0%, rgba(23, 160, 93, .10), transparent 70%), linear-gradient(180deg, #e3eef9 0%, var(--bg) 100%); }
.site-header { box-shadow: 0 2px 14px rgba(18, 38, 58, .06); border-bottom-color: transparent; }
.brand::before { content: ""; display: inline-block; width: .65em; height: .65em; margin-right: .5rem; border-radius: 50%;
  background: linear-gradient(135deg, var(--blue), var(--green)); }
.page h2::after { content: ""; display: block; width: 48px; height: 4px; margin-top: .6rem; border-radius: 2px; background: var(--green); }
.btn { box-shadow: 0 4px 12px rgba(11, 87, 181, .22); }
.btn-green { box-shadow: 0 4px 12px rgba(23, 160, 93, .25); }
.btn-small, .btn-ghost { box-shadow: none; }
.hero-photo { border: 0; border-radius: 18px; box-shadow: 0 14px 32px rgba(11, 87, 181, .18); }
.gallery .frame { border: 0; box-shadow: 0 6px 18px rgba(18, 38, 58, .10); }
.pkg, .card { border-radius: 16px; box-shadow: 0 2px 10px rgba(18, 38, 58, .05); }
.pkg { padding: 1.6rem; }
.pkg ul { list-style: none; padding: 0; }
.pkg li { padding-left: 1.5rem; position: relative; margin-bottom: .3rem; }
.pkg li::before { content: "\\2713"; position: absolute; left: 0; color: var(--green); font-weight: 700; }
.price { font-size: 1.4rem; }
.site-footer { background: var(--tint); border-top: 0; }

/* Animations */
@keyframes rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes pop { from { opacity: 0; transform: translateY(8px) scale(.97); } to { opacity: 1; transform: none; } }
.rise { animation: rise .7s cubic-bezier(.2, .7, .2, 1) backwards; }
.reveal { opacity: 0; transform: translateY(22px); transition: opacity .6s ease, transform .6s cubic-bezier(.2, .7, .2, 1); }
.reveal.in { opacity: 1; transform: none; }
.btn { transition: background-color .2s ease, transform .2s ease; }
.pkg.reveal { transition: opacity .6s ease, transform .6s cubic-bezier(.2, .7, .2, 1), box-shadow .25s ease; }
.frame img { transition: transform .6s ease; }
.confirm { animation: pop .4s cubic-bezier(.2, .7, .2, 1) backwards; }
.fields input, .fields select, .fields textarea { transition: border-color .2s ease, box-shadow .2s ease; }
.fields input:focus, .fields select:focus, .fields textarea:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(11, 87, 181, .15); outline: none; }
@media (hover: hover) {
  .btn:hover { transform: translateY(-2px); }
  .btn:active { transform: none; }
  .pkg:hover { box-shadow: 0 10px 28px rgba(11, 87, 181, .12); }
  .frame:hover img { transform: scale(1.04); }
}

@media (max-width: 760px) {
  .hero-grid, .pkg-grid, .fields, .gallery { grid-template-columns: 1fr; }
  .hero { padding: 2.25rem 0 2.5rem; }
  .hero-grid { gap: 1.75rem; }
  .section { padding: 2.75rem 0; }
  .card { padding: 1.25rem; }
  .brand { font-size: 1rem; }
  .lead { max-width: none; }
  .hero .btn, .row .btn { width: 100%; }
}
@media (max-width: 380px) {
  .wrap { padding: 0 1rem; }
  .brand { font-size: .95rem; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .reveal { opacity: 1; transform: none; }
}
`;