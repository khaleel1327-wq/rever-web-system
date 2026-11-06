import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'RÊVER | Luxury Nail Studio San Fernando',
  description: 'Book luxury BIAB, Gel-X, and Press-On Nail appointments in Duncan Village, San Fernando.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="bg-[#0b0c10] text-[#e8e6e3] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}