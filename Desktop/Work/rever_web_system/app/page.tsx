'use client';

import Image from 'next/image';
import { useState } from 'react';

// Exact Price List from RÊVER Image
const PRICE_LIST = [
  {
    category: 'BIAB',
    items: [
      { name: 'Builder Gel Overlay', price: 'from $150 TTD' },
      { name: 'Builder Gel Extensions', price: 'from $200 TTD' },
      { name: 'Builder Gel Toes', price: 'from $100 TTD' },
    ],
  },
  {
    category: 'Gel',
    items: [
      { name: 'Gel Manicure', price: 'from $100 TTD' },
      { name: 'Gel Toes', price: 'from $80 TTD' },
    ],
  },
  {
    category: 'Gel-X',
    items: [
      { name: 'Gel-X Extensions', price: 'from $200 TTD' },
    ],
  },
];

// All services available for booking selection (Prices removed)
const BOOKING_SERVICES = [
  'Builder Gel Overlay',
  'Builder Gel Extensions',
  'Builder Gel Toes',
  'Gel Manicure',
  'Gel Toes',
  'Gel-X Extensions',
  'Custom Press-On Nails',
];

const TIME_SLOTS = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

export default function ReverStudioPage() {
  const [selectedService, setSelectedService] = useState(BOOKING_SERVICES[0]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot || !clientName) {
      alert('Please select a date, time slot, and enter your name.');
      return;
    }

    const phone = '18683825900'; // RÊVER Studio WhatsApp
    const message = `Hi RÊVER Studio! I'd like to book an appointment:%0A%0A• *Client Name:* ${clientName}%0A• *Phone:* ${clientPhone}%0A• *Service:* ${selectedService}%0A• *Date:* ${selectedDate}%0A• *Time Slot:* ${selectedSlot}`;

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#0b0c10] text-[#e8e6e3]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0b0c10]/90 backdrop-blur-md border-b border-[#2d2436] px-6 py-3 flex items-center justify-between">
  <div className="flex items-center gap-3">
    {/* RÊVER Studio Logo */}
    <div className="relative w-10 h-10 overflow-hidden rounded-full border border-[#e1c4ff]/30 shadow-md">
      <Image
        src="/images/rever_logo.jpg"
        alt="RÊVER Luxury Nail Studio Logo"
        fill
        className="object-cover"
        priority
      />
    </div>
    <span className="font-serif tracking-widest text-lg font-bold text-white">RÊVER</span>
  </div>
  
  <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-gray-400 font-medium">
    <a href="#about" className="hover:text-[#e1c4ff] transition">About</a>
    <a href="#prices" className="hover:text-[#e1c4ff] transition">Price List</a>
    <a href="#booking" className="hover:text-[#e1c4ff] transition">Book Appointment</a>
    <a href="#gallery" className="hover:text-[#e1c4ff] transition">Gallery</a>
    <a href="#contact" className="hover:text-[#e1c4ff] transition">Contact</a>
  </div>
</nav>

      {/* Hero Section */}
      <section id="about" className="py-20 px-6 text-center max-w-4xl mx-auto">
        <span className="inline-block bg-[#e1c4ff]/10 text-[#e1c4ff] text-xs tracking-widest uppercase py-1.5 px-4 rounded-full mb-4 border border-[#e1c4ff]/20">
          Duncan Village, San Fernando
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-normal tracking-wide text-white mb-6">
          Luxury Nail Studio & Artistry
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base mb-8 leading-relaxed">
          Specializing in BIAB overlays, premium Gel-X extensions, and custom handcrafted press-ons designed for elegance and durability.
        </p>
        <a
          href="#booking"
          className="inline-block bg-[#e1c4ff] text-[#110a18] px-8 py-3.5 rounded-full font-semibold tracking-wider text-xs uppercase hover:bg-white transition duration-300 shadow-lg shadow-[#e1c4ff]/10"
        >
          Book Your Appointment
        </a>
      </section>

      {/* 1. PRICE LIST SECTION */}
      <section id="prices" className="py-16 px-6 bg-[#121018] border-t border-b border-[#2d2436]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#e1c4ff] text-xs uppercase tracking-widest">Investment</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mt-1">Price List</h2>
            <div className="w-12 h-0.5 bg-[#e1c4ff]/40 mx-auto mt-3"></div>
          </div>

          <div className="space-y-10 bg-[#171421] p-8 md:p-12 rounded-3xl border border-[#2d2436] shadow-xl">
            {PRICE_LIST.map((cat) => (
              <div key={cat.category} className="space-y-4">
                <h3 className="font-serif text-2xl text-[#e1c4ff] border-b border-[#2d2436] pb-2">
                  {cat.category}
                </h3>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex justify-between items-baseline text-sm md:text-base">
                      <span className="text-gray-200 font-medium">{item.name}</span>
                      <span className="text-gray-400 font-mono">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. APPOINTMENT BOOKING ENGINE (Prices Removed) */}
      <section id="booking" className="py-20 px-6">
        <div className="max-w-2xl mx-auto bg-[#171421] p-8 md:p-10 rounded-3xl border border-[#2d2436] shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-[#e1c4ff] text-xs uppercase tracking-widest">Reserve Your Spot</span>
            <h2 className="font-serif text-3xl text-white mt-1">Book An Appointment</h2>
            <p className="text-gray-400 text-xs mt-2">Strictly 4 exclusive daily slots (8:00 AM - 5:00 PM Studio Hours)</p>
          </div>

          <form onSubmit={handleBooking} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                Select Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-[#0b0c10] border border-[#2d2436] rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-[#e1c4ff]"
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
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#0b0c10] border border-[#2d2436] rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-[#e1c4ff]"
              />
            </div>

            {/* 4 Exclusive Time Slots */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                Available Daily Slots
              </label>
              <div className="grid grid-cols-2 gap-3">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-3.5 rounded-xl border text-xs tracking-wider font-semibold transition ${
                      selectedSlot === slot
                        ? 'bg-[#e1c4ff] text-[#110a18] border-[#e1c4ff]'
                        : 'bg-[#0b0c10] text-gray-300 border-[#2d2436] hover:border-[#e1c4ff]/50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#0b0c10] border border-[#2d2436] rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-[#e1c4ff]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">
                  WhatsApp Contact
                </label>
                <input
                  type="tel"
                  placeholder="868-XXX-XXXX"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#0b0c10] border border-[#2d2436] rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-[#e1c4ff]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#e1c4ff] text-[#110a18] font-bold py-4 rounded-xl hover:bg-white transition tracking-widest uppercase text-xs shadow-lg shadow-[#e1c4ff]/10 mt-4"
            >
              Confirm Appointment via WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* 3. GALLERY SECTION (Images & Videos) */}
      <section id="gallery" className="py-20 px-6 bg-[#121018] border-t border-[#2d2436]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#e1c4ff] text-xs uppercase tracking-widest">Portfolio</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mt-1">Client Gallery</h2>
            <p className="text-gray-400 text-xs mt-2">Explore recent BIAB, Gel-X, and Press-On set transformations</p>
          </div>

          {/* Grid setup for 3 Images & 1 Video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
           <div className="aspect-square relative overflow-hidden rounded-2xl border border-[#2d2436] shadow-md group">
        <img 
          src="/images/BIAB_showcase.png" 
          alt="BIAB Overlay Nail Set" 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

            {/* Image Placeholder 2 */}
           <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#2d2436] bg-[#171421] shadow-lg group">
    <img 
      src="/images/gelx_showcase.png" 
      alt="Gel-X Extensions" 
      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
    />
    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-center">
      <span className="text-xs text-gray-200 font-medium">Gel-X Extensions</span>
    </div>
  </div>
<div className="relative aspect-square overflow-hidden rounded-2xl border border-[#2d2436] bg-[#171421] shadow-lg group">
        <video 
          src="/images/Showcase_vid.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover" 
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-center pointer-events-none">
          <span className="text-xs text-gray-200 font-medium">Video Reel</span>
        </div>
      </div>

    </div>
  </div>
    </section>



      {/* 4. FOOTER / CONTACT SECTION */}
      <footer id="contact" className="bg-[#08080c] border-t border-[#2d2436] py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand Col */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">RÊVER</h3>
            <p className="text-xs text-[#e1c4ff] tracking-widest uppercase mb-4">Luxury Nail Studio</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Delivering high-precision nail care and artistic designs in San Fernando, Trinidad.
            </p>
          </div>

          {/* Location & Hours */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-3">Studio Details</h4>
            <p className="text-xs text-gray-400">📍 Duncan Village, San Fernando</p>
            <p className="text-xs text-gray-400">🕒 8:00 AM – 5:00 PM (Mon – Sat)</p>
            <p className="text-xs text-gray-400">📌 By Appointments Only</p>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-3">Connect</h4>
            <p className="text-xs text-gray-400">
              💬 WhatsApp: <a href="https://wa.me/18683825900" target="_blank" className="text-[#e1c4ff] hover:underline">+1 (868) 382-5900</a>
            </p>
            <p className="text-xs text-gray-400">
              📸 Instagram: <a href="https://instagram.com/rever.tt" target="_blank" className="text-[#e1c4ff] hover:underline">@rever.tt</a>
            </p>
          </div>
        </div>
<div className="max-w-5xl mx-auto border-t border-[#1f1a26] mt-12 pt-6 text-center text-[10px] text-gray-500 uppercase tracking-widest">
  © 2026 RÊVER Luxury Nail Studio • Engineered by Vanguard Systems
</div>
        
      </footer>
    </main>
  );
}