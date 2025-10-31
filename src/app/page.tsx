import { Hero } from '@/components/landing/hero';

/**
 * Landing Page (Home)
 *
 * Marketing landing page with hero section to introduce WeirdBites
 * and encourage visitors to browse products.
 *
 * IS-013 Slice 13.1: Hero + CTA
 * - Eye-catching hero section with headline and subheading
 * - Call-to-action button linking to /products
 * - Hero image showcasing weird snacks
 *
 * Note: Product listing moved to /products route (IS-012)
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
    </main>
  );
}
