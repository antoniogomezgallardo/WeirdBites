import { ProductsPageClient } from '../products-page-client';
import { getProducts } from '@/lib/products';

// Force dynamic rendering (no caching) for now
// TODO: Add proper revalidation strategy when we add CMS
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  // Await search params (Next.js 15 requirement)
  const params = await searchParams;

  // Parse pagination parameters from URL
  const page = params.page ? parseInt(params.page, 10) : 1;
  const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 12;

  // Validate parameters
  const validPage = isNaN(page) || page < 1 ? 1 : page;
  const validPageSize = isNaN(pageSize) || pageSize < 1 || pageSize > 100 ? 12 : pageSize;

  // Fetch products with pagination
  const { products, pagination, error } = await getProducts(validPage, validPageSize);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">All Products</h1>
          <p className="text-xl text-gray-600">
            Browse our collection of unusual snacks from around the world
          </p>
        </header>

        <ProductsPageClient
          initialProducts={products}
          initialPagination={pagination}
          error={error}
        />
      </div>
    </main>
  );
}
