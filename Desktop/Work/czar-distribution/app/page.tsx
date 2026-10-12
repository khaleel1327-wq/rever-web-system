'use client';

import { useState, useEffect } from 'react';

// ==========================================
// 1. TYPESCRIPT INTERFACES
// ==========================================
interface Slide {
  id: number;
  title?: string;
  subtitle?: string;
  badge?: string;
  bg: string;
  isLogoSlide?: boolean;
  logoUrl?: string;
}

interface CarItem {
  id: number;
  title: string;
  category: string;
  condition: string;
  make: string;
  price: string;
  specs: string;
  image: string;
}

// ==========================================
// 2. DATA ARRAYS
// ==========================================
const SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Certified Pre-Owned & Brand New Inventory',
    subtitle: 'Rigorous inspection, transparent duty valuation, and seamless logistics',
    badge: 'Inventory',
    bg: 'from-black via-[#0B192C] to-slate-900',
    isLogoSlide: true,
    logoUrl: '/czar_logo.png',
  },
  {
    id: 2,
    title: 'Direct Vehicle Imports & Fleet Supply',
    subtitle: 'Delivering top-grade Japanese and European imports across Trinidad & Tobago',
    badge: 'Imports',
    bg: 'from-slate-950 via-blue-950 to-black',
  },
  {
    id: 3,
    title: 'Commercial & Dealership Wholesale',
    subtitle: 'Specialized bulk vehicle sourcing for businesses and local auto dealers',
    badge: 'Wholesale Fleet',
    bg: 'from-[#0B192C] to-black',
  },
];

const CAR_INVENTORY: CarItem[] = [
  {
    id: 1,
    title: 'Toyota Hyryder',
    category: 'SUVs & Crossovers',
    condition: 'Foreign Used (RORO)',
    make: 'Toyota',
    price: '$165,000 TTD',
    specs: 'Fuel Tank: 45L|Fuel Efficiency: 20km/L|Fuel Type: Petrol/Mild Hybrid | Manual/Automatic | 4WD',
    image: '/vehicle_images/toyota_hyryder.png'
  },
  {
    id: 2,
    title: '2023 Honda CR-V',
    category: 'Sedans & Executive Saloons',
    condition: 'RORO',
    make: 'Honda',
    price: '$400,000 TTD',
    specs: 'Mileage : 10km | Fuel Type: Hybrid | Engine: 1490',
    image: '/vehicle_images/2023_Honda_CRV.png', 
  },
  {
    id: 3,
    title: '2025 Toyota Travo',
    category: 'Commercial Pickups & Vans',
    condition: 'Foreign Used (RORO)',
    make: 'Hilux',
    price: '$485,000 TTD',
    specs: 'Mileage: 22km  | Fuel Type: Diesel | Engine: 2800',
    image: '/vehicle_images/2025_Toyota_travo.png'
  },
  {
    id: 4,
    title: '2025 Mercedes-Benz GLB 180',
    category: 'SUVs & Crossovers',
    condition: 'RORO',
    make: 'Mercedes-Benz',   
    price: '$435,000 TTD',
    specs: 'Mileage: 10km | Fuel Type: Hybrid | Engine: 1400',
    image: '/vehicle_images/2025_Benz.png',
  },
  {
    id: 5,
    title: 'BMW i4',
    category: 'EV',
    condition: 'RORO',
    make: 'BMW',
    price: '$495,000 TTD',
    specs: 'Mileage: 5km | Fuel Type: Electric | Engine: -',
    image: '/vehicle_images/BMW_I.png',
  },
  {
    id: 6,
    title: '2026 Nissan X-Trail G',
    category: 'SUVs & Crossovers',
    condition: 'RORO',
    make: 'Nissan',
    price: '$420,000 TTD',
    specs: 'Mileage: -km | Fuel Type: Hybrid | Engine: 1500',
    image: '/vehicle_images/2026_Nissan_Xtrail.png',
  },
];

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-wider text-white uppercase">
            Czar <span className="text-orange-500">Distributions</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#inventory" className="hover:text-orange-500 transition">Inventory</a>
            <a href="#featured" className="hover:text-orange-500 transition">Featured</a>
            <a href="#contact" className="hover:text-orange-500 transition">Contact</a>
          </div>

          <button className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shadow-lg shadow-black/40">
            Inquire Fleet / Stock
          </button>
        </div>
      </nav>

      {/* FEATURED SLIDESHOW */}
      <section id="featured" className="py-10 px-4 max-w-7xl mx-auto mt-6">
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 h-72 md:h-80 flex items-center justify-center text-center p-6 text-white shadow-2xl shadow-black">
          <div className={`absolute inset-0 bg-gradient-to-r ${SLIDES[currentSlide].bg} transition-all duration-700 ease-in-out`} />

          <div className="relative z-10 max-w-2xl px-4 flex flex-col items-center justify-center w-full h-full">
            {SLIDES[currentSlide].isLogoSlide ? (
              /* LOGO-ONLY SLIDE */
              <div className="flex flex-col items-center justify-center space-y-4">
                <img 
                  src={SLIDES[currentSlide].logoUrl || '/czar_logo.png'} 
                  alt="Czar Distributions Logo" 
                  className="max-h-56 md:max-h-64 w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <h2 className="text-xl md:text-2xl font-black tracking-widest text-white uppercase">
                  Czar Distributions Ltd.
                </h2>
              </div>
            ) : (
              /* STANDARD TEXT SLIDE */
              <>
                {SLIDES[currentSlide].badge && (
                  <span className="text-xs font-bold tracking-widest text-orange-200 uppercase bg-orange-950/90 border border-orange-800/40 px-3 py-1 rounded-full shadow shadow-black/50">
                    {SLIDES[currentSlide].badge}
                  </span>
                )}
                <h2 className="text-2xl md:text-4xl font-black text-white mt-3">
                  {SLIDES[currentSlide].title}
                </h2>
                <p className="text-slate-300 mt-2 text-sm md:text-base">
                  {SLIDES[currentSlide].subtitle}
                </p>
              </>
            )}
          </div>

          {/* CAROUSEL INDICATOR DOTS */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-orange-500 w-8' : 'bg-slate-700 w-2.5'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MAIN INVENTORY + SIDEBAR FILTERS */}
      <section id="inventory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <aside className="lg:col-span-1 bg-[#090D16] border border-slate-800 rounded-xl p-6 h-fit space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 uppercase tracking-wider">
              Filter Vehicles
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Category
              </label>
              <select className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg p-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
                <option>All Categories</option>
                <option>Sedans & Saloons</option>
                <option>SUVs & Crossovers</option>
                <option>Commercial Pickups</option>
                <option>EV & Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Condition
              </label>
              <select className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg p-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
                <option>All Conditions</option>
                <option>Brand New</option>
                <option>Foreign Used (RORO)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Make
              </label>
              <select className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg p-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
                <option>All Makes</option>
                <option>Toyota</option>
                <option>Nissan</option>
                <option>Honda</option>
                <option>Hyundai</option>
                <option>BMW</option>
              </select>
            </div>

            <button className="w-full bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold py-2.5 rounded-lg transition mt-4 shadow-md">
              Apply Filters
            </button>
          </aside>

          <main className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                Current Vehicle Inventory
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {CAR_INVENTORY.length} Units Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAR_INVENTORY.map((car: CarItem) => (
                <div
                  key={car.id}
                  className="group bg-[#090D16] border border-slate-800 rounded-xl overflow-hidden hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-950/20 transition duration-300 flex flex-col justify-between"
                >
                  
                  {/* Updated Image Container */}
                  <div className="relative h-44 bg-gradient-to-br from-slate-950 to-black border-b border-slate-800 flex items-center justify-center p-0 overflow-hidden group-hover:from-slate-900 transition duration-300">
                    <img 
                      src={car.image} 
                      alt={car.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    
                    {/* Brand Badge with Orange Accent */}
                    <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-orange-600/90 px-3 py-1 rounded-full border border-orange-500/30 shadow-sm shadow-orange-950">
                      {car.make}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {car.category}
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition mt-1">
                        {car.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-3">{car.specs}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{car.price}</span>
                      <span className="text-[11px] text-slate-300 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                        {car.condition}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>

        </div>
      </section>

      {/* FOOTER & CONTACT SECTION */}
      <footer id="contact" className="bg-[#090D16] text-white border-t border-slate-800 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">

          {/* Brand Info */}
          <div className="space-y-3">
            <div className="text-lg font-bold tracking-wider text-white uppercase">
              Czar <span className="text-orange-500">Distributions</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Premier Automotive Imports & Vehicle Distribution Network across Trinidad & Tobago. Specializing in Japanese & European imports.
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Connect With Us</h4>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs text-slate-400 hover:text-orange-400 transition bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 hover:border-orange-500/40"
              >
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>

              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs text-slate-400 hover:text-orange-400 transition bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 hover:border-orange-500/40"
              >
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
                <span>Facebook</span>
              </a>

            </div>
          </div>

          {/* Physical Address Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Showroom & Distribution</h4>
            <div className="flex items-start justify-center md:justify-start space-x-2 text-xs text-slate-400">
              <svg className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <address className="not-italic leading-relaxed">
                Trinidad & Tobago<br />
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:underline inline-block mt-1"
                >
                  Open in Google Maps &rarr;
                </a>
              </address>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Czar Distributions Ltd. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Developer Tag */}
      <div className="mt-6 flex items-center justify-center">
        <div className="inline-flex items-center space-x-2 bg-slate-950 border border-slate-800 px-4 py-1.5 rounded-full text-xs text-slate-400 shadow-inner">
          <span>Developed by</span>
          <span className="font-bold text-orange-500 uppercase tracking-wider">
            Vanguard Systems
          </span>
        </div>
      </div>
    </div>

  );
}