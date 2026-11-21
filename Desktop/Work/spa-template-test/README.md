# Serenity Spa — Booking Website Template

A dark, elegant one-page website for spas, nail studios, massage therapists and beauty
businesses. Built with **Next.js (App Router), TypeScript and Tailwind CSS**.

**What's inside**
- Hero with optional full-width photo
- About section with photo and stats
- Liquid-glass service menu with colour-banded rows
- Photo gallery with click-to-enlarge viewer
- Testimonials and an animated FAQ
- Online booking that sends the request straight to WhatsApp
- Time picker: scroll wheel on mobile, click-to-select grid on desktop
- "Visit us" block with opening hours, address and optional Google map
- 4 colour presets (rose, sage, midnight, lavender) plus a custom option
- Mobile hamburger menu, smooth scroll animations (respects "reduce motion")
- Missing photos show a neat placeholder, never a broken image
- No extra packages required

---

## First 10 minutes

1. **Create a project** (2 min). You need [Node.js 18+](https://nodejs.org).
   ```bash
   npx create-next-app@latest my-spa-site
   ```
   Choose: **TypeScript: Yes · Tailwind CSS: Yes · App Router: Yes**.
2. **Copy the files in** (1 min):

   | From the template | Copy to your project |
   | --- | --- |
   | `app/page.tsx` | `app/page.tsx` (replace), or `src/app/page.tsx` |
   | `app/layout.tsx` | `app/layout.tsx` (replace), or `src/app/layout.tsx` |
   | `site.config.ts` | project root, or `src/`: the **same folder that contains `app/`**, not inside `app/` |

   Keep the `globals.css` that `create-next-app` made.
3. **Run it** (1 min):
   ```bash
   cd my-spa-site
   npm run dev
   ```
   Open http://localhost:3000.
4. **Open `site.config.ts`** and change, in this order (3 min):
   - `name`, `headline`, `heroText`
   - `whatsapp`: **bookings will not reach you until you change this**
   - `theme`: try `'sage'`, `'midnight'` or `'lavender'`
   - `contact` details
5. **Add your photos** (2 min): see the table below.
6. **Replace the placeholder text**: menu, testimonials, FAQ, About stats, opening hours.
7. **Deploy** to [Vercel](https://vercel.com): push to GitHub, import the repo, click Deploy.

---

## Photos

Put images in your project's `public/images/` folder with these exact names and they appear
automatically. You can also change the paths in `site.config.ts`.

| File | Where it shows | Best size |
| --- | --- | --- |
| `hero.jpg` | Background of the top section | 1920×1080, landscape |
| `about.jpg` | About section | 1000×1250, portrait |
| `gallery-1.jpg` | Large tile in the gallery | 1600×1200, landscape |
| `gallery-2.jpg` to `gallery-6.jpg` | Gallery tiles | 1200×1200, square-ish |
| your logo (optional) | Navigation bar | 400×400 PNG; set `logo: '/images/your-logo.png'` |

Tips: use `.jpg` or `.webp` under about 400 KB each so the site loads fast. Compress with
[squoosh.app](https://squoosh.app). Any photo that is missing shows a placeholder.

---

## Customising

Everything lives in **`site.config.ts`**, with comments on every setting.

- **Colours:** `theme: 'rose' | 'sage' | 'midnight' | 'lavender' | 'custom'`.
  For custom colours set `theme: 'custom'` and edit `customColors`.
- **Sections:** turn About, Gallery, Testimonials, FAQ or Visit Us on or off in `sections`.
- **Menu:** add, remove or reorder categories and services. The booking dropdown updates automatically.
- **Hours:** `booking` controls the bookable time slots and closed days.
  `location.hours` is the text shown in the Visit Us block. Keep them consistent.
- **Map:** paste a Google Maps share link into `location.mapsUrl` for a "Get Directions"
  button. For an embedded map, use Google Maps → Share → Embed a map, and paste only the
  `src="..."` link into `location.mapEmbedUrl`.

You should not need to edit `app/page.tsx` for normal changes.

---

## Notes

- **Placeholder content:** the testimonials, About text and statistics are samples. Replace
  them with real information before launch.
- **How booking works:** the form builds a message and opens WhatsApp with it pre-filled.
  There is no database or server, and the client still has to tap Send. Payments and
  deposits are handled by you.
- **Browsers:** theme colours use CSS `color-mix()`, supported by all current browsers
  (Chrome/Edge 111+, Safari 16.2+, Firefox 113+).
- **Fonts:** headings use Playfair Display via `next/font/google` (needs internet the
  first time). To change, edit `app/layout.tsx`.
- **Compatibility:** Next.js 14 / 15 / 16, React 18 / 19, Tailwind CSS 3 or 4.

---

## License

Replace this section with your own terms before selling. For example: one end-product
licence per purchase, use for personal or client websites allowed, no resale or
redistribution of the template files themselves.