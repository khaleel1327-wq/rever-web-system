'use client';

import { useState } from 'react';
import Image from 'next/image';

type Category = 'Auto' | 'Interior' | 'Home & Office';

interface ServiceSection {
  id: string;
  category: Category;
  title: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaSrc: string;
  highlights: string[];
}

const serviceData: ServiceSection[] = [
  {
id: 'auto',
    category: 'Auto',
    title: 'Auto Detailing',
    description: 'Exterior foam wash, hand wax, decontamination, and rim detailing to bring out a high-gloss showroom finish.',
    mediaType: 'video',
    mediaSrc: '/videos/tropikleen_auto1.mp4',
    highlights: ['Exterior Foam Wash', 'Paint Protection & Sealant', 'Rim & Tire Shine'],
  },

  {
    id: 'interior',
    category: 'Interior',
    title: 'Car Interior Detailing',
    description: 'Deep steam extraction, upholstery stain removal, leather conditioning, and interior cabin sanitization.',
    mediaType: 'video',
    mediaSrc: '/videos/tropikleen_int1.mp4',
    highlights: ['Steam Cleaning & Extraction', 'Odor Neutralization', 'Dashboard & Trim UV Care'],
  },
  {
    id: 'home-office',
    category: 'Home & Office',
    title: 'Home & Office Cleaning',
    description: 'Specialized deep cleaning services for living rooms, carpets, couches, and commercial office spaces.',
    mediaType: 'video',
    mediaSrc: '/videos/tropikleen_ho1.mp4',
    highlights: ['Sofa & Upholstery Deep Clean', 'Carpet Sanitization', 'Flexible Schedules'],
  },
];

const faqData = [
  {
    q: 'How long does a vehicle interior detail take?',
    a: 'Usually between 2.5 to 4 hours depending on the size and interior condition.',
  },
  {
    q: 'Do I need to supply water or power?',
    a: 'We confirm access requirements upon booking. Contact us directly to discuss site requirements.',
  },
];

const reviewData = [
  {
    name: 'M. Khan',
    rating: 5,
    comment: 'Top quality interior steam cleaning! Removed stubborn stains from my seats easily.',
  },
  {
    name: 'S. Rampersad',
    rating: 5,
    comment: 'Very professional detailing service. The exterior shine lasted for weeks.',
  },
];

export default function TropiKleenHome() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#0B2545] font-sans">
      
      {/* 1. NAVBAR (TOP ROW) */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <nav className="flex items-center space-x-8 text-sm font-bold text-[#0B2545]">
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center space-x-1 hover:text-[#0072CE] transition-colors py-2">
                <span>Services</span>
                <svg className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesOpen && (
                <div className="absolute left-0 top-full w-48 rounded-xl border border-zinc-200 bg-white p-2 shadow-xl">
                  <a href="#auto" className="block rounded-lg px-4 py-2 hover:bg-[#F4F5F7] hover:text-[#0072CE]">
                    🚗 Auto
                  </a>
                  <a href="#interior" className="block rounded-lg px-4 py-2 hover:bg-[#F4F5F7] hover:text-[#0072CE]">
                    🪑 Interior
                  </a>
                  <a href="#home-office" className="block rounded-lg px-4 py-2 hover:bg-[#F4F5F7] hover:text-[#0072CE]">
                    🏢 Home & Office
                  </a>
                </div>
              )}
            </div>

            <a href="#about" className="hover:text-[#0072CE] transition-colors">About</a>
            <a href="#reviews" className="hover:text-[#0072CE] transition-colors">Reviews</a>
            <a href="#faqs" className="hover:text-[#0072CE] transition-colors">FAQs</a>
            <a href="#contact" className="hover:text-[#0072CE] transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* 2. LARGE CENTER LOGO SECTION */}
    <section className="bg-white py-8 text-center border-b border-zinc-200">
  <div className="mx-auto flex max-w-5xl items-center justify-center px-4 sm:px-6">
    {/* Wide rectangular container */}
    <div className="relative w-full h-48 sm:h-64 md:h-80 max-w-3xl">
      <Image
        src="/images/tropikleen_tt.jpg"
        alt="TropiKleen TT Ltd. Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  </div>
</section>

      {/* 3. MAIN CONTENT STACK */}
      <main className="mx-auto max-w-6xl px-6 py-16 space-y-24">

        {/* SERVICES LIST */}
        {serviceData.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className="scroll-mt-24 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
              
              {/* Media Container */}
              <div className={`relative h-72 w-full overflow-hidden rounded-2xl bg-zinc-900 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                {service.mediaType === 'video' ? (
                  <video
                    src={service.mediaSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover pointer-events-none"
                  />
                ) : (
                  <Image
                    src={service.mediaSrc}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Text Container */}
              <div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
                <span className="rounded-md bg-[#0072CE]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0072CE]">
                  Service 0{index + 1}
                </span>
                <h2 className="mt-2 text-3xl font-extrabold text-[#0B2545]">{service.title}</h2>
                <p className="mt-3 text-zinc-600 leading-relaxed">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.highlights.map((h, i) => (
                    <li key={i} className="flex items-center text-sm font-semibold text-[#0B2545]">
                      <span className="mr-2 text-[#60B246]">✓</span> {h}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </section>
        ))}

        {/* ABOUT SECTION */}
        <section id="about" className="scroll-mt-24 text-center rounded-3xl border border-zinc-200 bg-white p-12 shadow-sm">
          <h2 className="text-3xl font-extrabold text-[#0B2545]">About TropiKleen TT Ltd.</h2>
          <p className="mt-4 text-zinc-600 leading-relaxed max-w-3xl mx-auto">
            Dedicated to high-grade auto detailing, upholstery steam extraction, and property care across Trinidad & Tobago.
            We focus on precision, quality products, and restoring freshness to your vehicle and home.
          </p>
        </section>

        {/* REVIEWS SECTION */}
        <section id="reviews" className="scroll-mt-24">
          <h2 className="text-center text-3xl font-extrabold text-[#0B2545]">Client Reviews</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {reviewData.map((r, idx) => (
              <div key={idx} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="text-yellow-400 font-bold">{"★".repeat(r.rating)}</div>
                <p className="mt-3 text-zinc-600 text-sm">"{r.comment}"</p>
                <p className="mt-4 text-xs font-bold text-[#0B2545]">— {r.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQS SECTION */}
        <section id="faqs" className="scroll-mt-24">
          <h2 className="text-center text-3xl font-extrabold text-[#0B2545]">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4 max-w-3xl mx-auto">
            {faqData.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-bold text-[#0B2545]"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#0072CE]">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-zinc-600 border-t border-zinc-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-mt-24 text-center rounded-3xl border border-zinc-200 bg-white p-12 shadow-sm">
          <h2 className="text-3xl font-extrabold text-[#0B2545]">Contact Us</h2>
          <p className="mt-2 text-zinc-600">Reach out to us directly for bookings and availability.</p>
          <div className="mt-8 inline-flex items-center space-x-6 rounded-2xl bg-[#F4F5F7] px-8 py-4 font-semibold text-[#0B2545]">
            <span>📍 Trinidad & Tobago</span>
            <span className="text-zinc-300">|</span>
            <span>💬 Direct Message / WhatsApp</span>
          </div>
        </section>

      </main>

    </div>
  );
}