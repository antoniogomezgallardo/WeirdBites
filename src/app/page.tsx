import { Hero } from '@/components/landing/hero';
import { FeaturedProducts } from '@/components/landing/featured-products';
import { WhyWeirdBites } from '@/components/landing/why-weirdbites';
import { CategoryFilter } from '@/components/category-filter';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// Force dynamic rendering to fetch featured products at request time
// Prevents build-time errors when database is not available during CI/CD
export const dynamic = 'force-dynamic';

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
 * US-003: Category Filter
 * - Filter products by category (Snacks, Chocolate, Candy, Dessert)
 * - URL query param: ?category=Snacks
 * - Database-level filtering
 *
 * Note: Product listing moved to /products route (IS-012)
 */
interface HomePageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const selectedCategory = params.category || null;

  // Build WHERE clause for category filtering
  const where: Prisma.ProductWhereInput = {
    isFeatured: true,
  };

  if (selectedCategory) {
    where.category = selectedCategory;
  }

  // Fetch featured products from database with optional category filter
  const featuredProducts = await prisma.product.findMany({
    where,
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

  // Get category counts for filter buttons
  const categoryGroups = await prisma.product.groupBy({
    by: ['category'],
    where: {
      isFeatured: true,
    },
    _count: {
      category: true,
    },
    orderBy: {
      category: 'asc',
    },
  });

  const categories = categoryGroups.map(group => ({
    name: group.category,
    count: group._count.category,
  }));

  // Convert Decimal price to number for client components
  const productsForClient = featuredProducts.map(product => ({
    ...product,
    price: Number(product.price),
  }));

  return (
    <main className="min-h-screen">
      <Hero />

      {/* Category Filter Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <CategoryFilter categories={categories} selectedCategory={selectedCategory} />
        </div>
      </section>

      <FeaturedProducts products={productsForClient} />
      <WhyWeirdBites />
    </main>
  );
}
