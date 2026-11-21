import type { Metadata, Viewport } from 'next';
import { Playfair_Display } from 'next/font/google';
import { siteConfig } from '../site.config';
import './globals.css';

const display = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });

const title = `${siteConfig.name} | ${siteConfig.headline}`;

export const metadata: Metadata = {
  title,
  description: siteConfig.description,
  openGraph: { title, description: siteConfig.description, type: 'website' },
};

export const viewport: Viewport = { themeColor: '#0d0d0d' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <body className="antialiased bg-[#0d0d0d]">{children}</body>
    </html>
  );
}
