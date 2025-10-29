'use client';

import { ProductCard } from './product-card';
import { LoadingSkeleton } from './loading-skeleton';
import { Pagination } from './pagination';

/**
 * ProductGrid Component
 *
 * Displays a grid of products with loading states, error handling, and pagination.
 * Orchestrates LoadingSkeleton, ProductCard, and Pagination components.
 *
 * @example
 * ```tsx
 * <ProductGrid
 *   products={products}
 *   loading={isLoading}
 *   error={error}
 *   pagination={{ currentPage: 1, totalPages: 5, totalItems: 60, pageSize: 12 }}
 *   onPageChange={(page) => setPage(page)}
 * />
 * ```
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  origin: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

interface ProductGridProps {
  /**
   * Array of products to display
   */
  products: Product[];

  /**
   * Whether products are currently being loaded
   */
  loading: boolean;

  /**
   * Error message if loading failed
   */
  error?: string;

  /**
   * Pagination information
   */
  pagination: PaginationInfo;

  /**
   * Callback when user navigates to a different page
   */
  onPageChange: (page: number) => void;
}

export function ProductGrid({
  products,
  loading,
  error,
  pagination,
  onPageChange,
}: ProductGridProps) {
  // Show loading skeleton
  if (loading) {
    return <LoadingSkeleton count={pagination.pageSize} />;
  }

  // Show error message
  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Something went wrong</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">
            We couldn&apos;t find any products matching your criteria.
          </p>
        </div>
      </div>
    );
  }

  // Show products grid with pagination
  const showPagination = pagination.totalPages > 1;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showPagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
