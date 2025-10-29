'use client';

/**
 * LoadingSkeleton Component
 *
 * Displays animated skeleton placeholders while product data is loading.
 * Provides visual feedback to users during data fetching.
 *
 * @example
 * ```tsx
 * <LoadingSkeleton count={12} />
 * ```
 */

interface LoadingSkeletonProps {
  /**
   * Number of skeleton cards to display
   * @default 12
   */
  count?: number;
}

export function LoadingSkeleton({ count = 12 }: LoadingSkeletonProps) {
  return (
    <div role="status" aria-live="polite" aria-label="Loading products" className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            data-testid="skeleton-card"
            className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            {/* Image placeholder */}
            <div className="mb-4 aspect-square w-full rounded-md bg-gray-200" />

            {/* Title placeholder */}
            <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />

            {/* Description placeholder (2 lines) */}
            <div className="mb-2 h-4 w-full rounded bg-gray-200" />
            <div className="mb-4 h-4 w-5/6 rounded bg-gray-200" />

            {/* Price placeholder */}
            <div className="h-6 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading products...</span>
    </div>
  );
}
