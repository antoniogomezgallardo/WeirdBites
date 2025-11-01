import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'sonner';
import { CartProvider } from '@/contexts/cart-context';
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
        <CartProvider>
          <Navbar />
          {children}
          <Toaster position="top-right" richColors />
          <Analytics />
          <SpeedInsights />
        </CartProvider>
      </body>
    </html>
  );
}
