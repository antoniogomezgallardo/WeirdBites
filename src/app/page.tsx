import { Hero } from '@/components/landing/hero';
import { FeaturedProducts } from '@/components/landing/featured-products';
import { WhyWeirdBites } from '@/components/landing/why-weirdbites';
import { prisma } from '@/lib/prisma';

/**
 * Landing Page (Home)
 *
 * Marketing landing page to introduce WeirdBites and showcase products.
 *
 * IS-013 Slice 13.1: Hero + CTA
 * - Eye-catching hero section with headline and subheading
 * - Call-to-action button linking to /products
 * - Hero image showcasing weird snacks
 *
 * IS-013 Slice 13.2: Featured Products + About Sections
 * - Featured products carousel/grid
 * - "Why WeirdBites?" section explaining mission and value proposition
 * - Trust indicators (secure checkout, free shipping, returns)
 *
 * Note: Product listing moved to /products route (IS-012)
 */
export default async function Home() {
  // Fetch featured products from database
  const featuredProducts = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
      category: true,
      origin: true,
    },
    take: 6, // Limit to 6 featured products
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Convert Decimal price to number for client components
  const productsForClient = featuredProducts.map(product => ({
    ...product,
    price: Number(product.price),
  }));

  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts products={productsForClient} />
      <WhyWeirdBites />
    </main>
  );
}
