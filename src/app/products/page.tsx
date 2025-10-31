import { ProductsPageClient } from '../products-page-client';
import { getProducts, getCategories } from '@/lib/products';
import { CategoryFilter } from '@/components/category-filter';

// Force dynamic rendering (no caching) for now
// TODO: Add proper revalidation strategy when we add CMS
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ page?: string; pageSize?: string; category?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  // Await search params (Next.js 15 requirement)
  const params = await searchParams;

  // Parse pagination and filter parameters from URL
  const page = params.page ? parseInt(params.page, 10) : 1;
  const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 12;
  const category = params.category || null;

  // Validate parameters
  const validPage = isNaN(page) || page < 1 ? 1 : page;
  const validPageSize = isNaN(pageSize) || pageSize < 1 || pageSize > 100 ? 12 : pageSize;

  // Fetch categories for filter
  const categories = await getCategories();

  // Fetch products with pagination and category filter
  const { products, pagination, error } = await getProducts(validPage, validPageSize, category);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">All Products</h1>
          <p className="text-xl text-gray-700">
            Browse our collection of unusual snacks from around the world
          </p>
        </header>

        {/* Category Filter */}
        <CategoryFilter categories={categories} selectedCategory={category} />

        <ProductsPageClient
          initialProducts={products}
          initialPagination={pagination}
          error={error}
        />
      </div>
    </main>
  );
}
