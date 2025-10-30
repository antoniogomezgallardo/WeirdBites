import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Navbar } from '@/components/navigation/navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'WeirdBites - Unusual Snacks from Around the World',
  description: 'Discover and purchase weird and unusual snacks from around the world',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar cartItemCount={0} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
