import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://temidayo.xyz'),
  title: 'Temidayo XYZ | Software Development & Technical Research',
  description: 'I build robust software solutions and conduct deep technical research that turn complex ideas into clear, high-leverage decisions driving real-world growth.',
  keywords: ['Software Engineer', 'Technical Research', 'Full-Stack Web Development', 'AI-Native Development', 'MVP Development', 'Technical Writer'],
  authors: [{ name: 'Temidayo XYZ' }],
  creator: 'Temidayo XYZ',
  openGraph: {
    title: 'Temidayo XYZ | Software Development & Technical Research Consultant',
    description: 'Problem-solving for absolutely any forward-thinking business.',
    url: 'https://temidayo.xyz',
    siteName: 'Temidayo XYZ',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temidayo XYZ | Software Development & Technical Research',
    description: 'I build robust software solutions and conduct deep technical research.',
    creator: '@temidayoxyz',
    images: ['/og.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
