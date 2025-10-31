'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ProductGrid, Product, PaginationInfo } from '@/components/product-grid';
import { useFeature } from '@/hooks/useFeature';

interface ProductsPageClientProps {
  initialProducts: Product[];
  initialPagination: PaginationInfo;
  error?: string;
}

/**
 * Client-side wrapper for products page with pagination
 *
 * Handles pagination state and URL updates using Next.js App Router.
 * Falls back to non-paginated view if feature flag is disabled.
 */
export function ProductsPageClient({
  initialProducts,
  initialPagination,
  error,
}: ProductsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paginationEnabled = useFeature('productPagination');

  const handlePageChange = (newPage: number) => {
    // Update URL with new page parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/products?${params.toString()}`);
  };

  // If pagination is disabled, show products without pagination
  if (!paginationEnabled) {
    return (
      <ProductGrid
        products={initialProducts}
        loading={false}
        error={error}
        pagination={{ ...initialPagination, totalPages: 1 }} // Force single page
        onPageChange={() => {}} // No-op
      />
    );
  }

  // Show paginated products
  return (
    <ProductGrid
      products={initialProducts}
      loading={false}
      error={error}
      pagination={initialPagination}
      onPageChange={handlePageChange}
    />
  );
}
