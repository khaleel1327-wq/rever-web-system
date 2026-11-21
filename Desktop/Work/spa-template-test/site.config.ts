/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG  —  edit this file to make the template yours.
 *  You should not need to touch app/page.tsx for normal changes.
 * ─────────────────────────────────────────────────────────────
 */

export type IconName =
  | 'sparkles' | 'tag' | 'calendar' | 'gift' | 'users' | 'instagram'
  | 'image' | 'pin' | 'clock' | 'star' | 'plus';

// Colour presets. Pick one with `theme` below, or use 'custom'.
export const themes = {
  rose: { accent: '#F4C2C2', gold: '#C19A6B' }, //     rose gold (default)
  sage: { accent: '#B5D1AC', gold: '#C9B27C' }, //     soft green + champagne
  midnight: { accent: '#A8C0F2', gold: '#D8B98A' }, // icy blue + warm gold
  lavender: { accent: '#CDB9EE', gold: '#C7AA8C' }, // lilac + sand
};
export type ThemeName = keyof typeof themes | 'custom';

export const siteConfig = {
  // ── Brand ──────────────────────────────────────────────────
  name: 'Serenity Spa',
  badge: 'Pedicure • Massage • Body Therapy', // small pill above the headline ('' to hide)
  headline: 'Premium Pedicure & Body Therapy Spa',
  heroText:
    'Specializing in therapeutic massages, luxury spa pedicures, and dedicated relief sessions for beauty service providers.',
  description:
    'Therapeutic massages, luxury spa pedicures and dedicated relief sessions. Book your appointment online.', // SEO description

  // Path inside /public, e.g. '/images/logo.png'. Leave '' to show a letter monogram instead.
  logo: '',

  // ── Colours ────────────────────────────────────────────────
  // 'rose' | 'sage' | 'midnight' | 'lavender' | 'custom'
  theme: 'rose' as ThemeName,
  customColors: { accent: '#F4C2C2', gold: '#C19A6B' }, // only used when theme is 'custom'

  // ── Sections: turn any of these off with false ─────────────
  sections: {
    about: true,
    gallery: true,
    testimonials: true,
    faq: true,
    visit: true, // "Visit us": opening hours, address, map
  },

  // ── Images ─────────────────────────────────────────────────
  // Put photos in /public/images using the file names below and they appear automatically.
  // Any image that is missing shows a tidy placeholder instead of a broken picture.
  heroImage: '/images/hero.jpg', // wide photo behind the headline ('' for no background photo)

  // ── Contact & booking ──────────────────────────────────────
  // Bookings are sent to this WhatsApp number. Digits only, with country code, no + or spaces.
  // Example: 18681234567 (1 = country code, 868 = area code)
  whatsapp: '18680000000',

  contact: {
    instagram: '', // handle without @, e.g. 'serenityspa' ('' to hide)
    phone: '', // shown as a tap-to-call link ('' to hide)
    email: '', // ('' to hide)
    address: '', // ('' to hide)
  },

  booking: {
    open: '10:00', // 24-hour format
    close: '17:00', // last bookable time
    slotMinutes: 30, // 15, 30 or 60 work well
    closedDays: [] as number[], // days you are closed: 0 = Sunday, 1 = Monday ... 6 = Saturday
    note: 'Deposit required', // shown under the booking title ('' to hide)
  },

  // Shown as "$150 USD". Set code to '' to show just "$150".
  currency: { symbol: '$', code: 'USD' },

  // ── Offers (pills under the hero text, '[]' to hide) ───────
  // icon: sparkles | tag | calendar | gift | users      tone: accent | gold
  offers: [
    { icon: 'sparkles' as IconName, text: 'Book 4 Services & Get 1 FREE', tone: 'accent' as const },
    { icon: 'tag' as IconName, text: 'Refer a Client for 10% OFF', tone: 'gold' as const },
  ],

  // ── About ──────────────────────────────────────────────────
  about: {
  eyebrow: 'About Us',
  title: 'Calm & Care',
  paragraphs: [
    'We create a quiet, restorative space designed around unhurried treatments and personal attention.',
    'Every session is tailored to help you reset, recharge, and leave feeling your best.',
  ],
  stats: [
    { label: 'Treatments', value: '15+' },
    { label: 'Client Rating', value: '4.9★' },
  ],
  image: '/images/spa2.avif',
},
  // ── Gallery ────────────────────────────────────────────────
  // 6 photos fill the layout best. Add or remove entries freely.
  // Inside site.config.ts
heroImage: '/images/spa1.avif',
about: {
  // ...existing fields
  image: '/images/spa2.avif',
},
gallery: [
  { src: '/images/spa3.jpg', alt: 'Luxury spa treatment room' },
  { src: '/images/spa4.jpg', alt: 'Relaxing pedicure and body therapy' },
  { src: '/images/spa5.jpg', alt: 'Serene wellness lounge' },
  { src: '/images/spa6.jpeg', alt: 'Therapeutic session setup' },
  { src: '/images/spa7.jpg', alt: 'Calming spa details' },
],

  // ── Testimonials ───────────────────────────────────────────
  // These are PLACEHOLDERS. Replace them with real client reviews before going live.
  testimonials: {
    eyebrow: 'Kind Words',
    title: 'What Clients Say',
    items: [
      {
        name: 'Amara J.',
        role: 'Regular client',
        rating: 5,
        text: 'The most relaxing hour of my week. My feet have never felt this good and the whole space is spotless and calm.',
      },
      {
        name: 'Nicole R.',
        role: 'Massage client',
        rating: 5,
        text: 'Booking on WhatsApp was so easy, and the deep tissue session worked out knots I had carried for months.',
      },
      {
        name: 'Danielle P.',
        role: 'Hairstylist',
        rating: 5,
        text: 'The service provider back therapy is a lifesaver after long days behind the chair. I book it every month.',
      },
    ],
  },

  // ── FAQ ────────────────────────────────────────────────────
  faq: {
    eyebrow: 'Good To Know',
    title: 'Frequently Asked Questions',
    items: [
      {
        q: 'How do I book an appointment?',
        a: 'Choose your service, date and time in the booking form and tap the button. It opens WhatsApp with your details filled in, and we will confirm your slot there.',
      },
      {
        q: 'Do I need to pay a deposit?',
        a: 'Yes. A deposit secures your appointment and is deducted from your final total. We will send payment details when we confirm your booking.',
      },
      {
        q: 'What is your cancellation policy?',
        a: 'Please let us know at least 24 hours ahead if you need to reschedule. Late cancellations may forfeit the deposit.',
      },
      {
        q: 'Do you offer mobile or after-hours sessions?',
        a: 'Yes. On-call and after-hours options are listed under the Service Providers Special on our menu.',
      },
      {
        q: 'How long does each treatment take?',
        a: 'Massages run 30 to 60 minutes as shown on the menu. Pedicures take roughly 45 to 75 minutes depending on the package.',
      },
    ],
  },

  // ── Visit us ───────────────────────────────────────────────
  // The address comes from contact.address above.
  location: {
    eyebrow: 'Find Us',
    title: 'Visit The Studio',
    // Display only. Edit freely; booking times are set in `booking` above.
    hours: [
      { days: 'Monday – Friday', time: '10:00 AM – 5:00 PM' },
      { days: 'Saturday', time: 'By appointment' },
      { days: 'Sunday', time: 'Closed' },
    ],
    mapsUrl: '', // paste a Google Maps share link to show a "Get directions" button
    // Optional: in Google Maps choose Share → Embed a map, copy ONLY the src="..." link here
    mapEmbedUrl: '',
  },

  // ── Footer ─────────────────────────────────────────────────
  policies: [
    { icon: 'calendar' as IconName, text: 'Deposit required to secure all appointments' },
    { icon: 'gift' as IconName, text: 'Book 4 sessions & get 1 free' },
    { icon: 'users' as IconName, text: 'Refer a client for 10% off your next service' },
  ],
  footerText:
    'Providing premier pedicure treatments, full body massage therapy, and specialized provider recovery sessions.',
  footerCredit: '', // optional, e.g. 'Website by Your Name'




  // ── Menu ───────────────────────────────────────────────────
  // Add, remove or reorder anything. Every item automatically appears in the booking dropdown.
  // price is a number (no symbol).
  menuEyebrow: 'Self-Care Investment',
  menuTitle: 'Service Menu',
  menu: [
    {
      category: 'Pedicure Menu',
      items: [
        { name: 'Classic Pedicure', description: 'Soak, Callus Removal, Scrub, Regular Polish', price: 150 },
        { name: 'Spa Pedicure', description: 'Soak, Cut Nails, Cuticle Care, Remove Callus, Scrub, Gel Polish, Massage', price: 250 },
        { name: 'Deluxe Pedicure', description: 'Soak, Cut & Shape Nails, Cuticle Care, Callus Removal, Scrub, Mask, Gel Polish, Feet & Calf Massage', price: 400 },
      ],
    },
    {
      category: 'Massage Menu',
      items: [
        { name: 'Feet Massage (30 Mins)', description: 'Targeted foot relaxation massage', price: 150 },
        { name: 'Neck & Shoulder Massage (30 Mins)', description: 'Relaxing or Deep Tissue focus', price: 150 },
        { name: 'Back Massage (30 Mins)', description: 'Focused back tension relief', price: 250 },
        { name: 'Full Body Massage Swedish (45 Mins)', description: 'Full body Swedish relaxation technique', price: 350 },
        { name: 'Lymphatic Drainage Massage (45 Mins)', description: 'Specialized drainage technique', price: 450 },
        { name: 'Deep Tissue Massage (45-60 Mins)', description: 'Intense muscle group therapy', price: 500 },
      ],
    },
    {
      category: 'Service Providers Special',
      items: [
        { name: 'Back Therapy & Stretch (In House - 45 Mins)', description: 'For hairdressers, nail techs, lash techs and estheticians', price: 350 },
        { name: 'Back Therapy & Stretch (On Call)', description: 'Mobile service delivery', price: 450 },
        { name: 'Back Therapy & Stretch (After Hours)', description: 'Late evening slot availability', price: 550 },
        { name: 'Hand Relaxation (In House - 30 Mins)', description: 'Therapeutic hand and wrist massage', price: 250 },
        { name: 'Hand Relaxation (On Call)', description: 'Mobile service delivery', price: 350 },
        { name: 'Hand Relaxation (After Hours)', description: 'Late evening slot availability', price: 450 },
      ],
    },
  ],
};