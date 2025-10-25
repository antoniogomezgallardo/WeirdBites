'use client';

import { useFeature, useFeatures } from '@/hooks/useFeature';

/**
 * Example component demonstrating feature flag usage
 * This component shows how to conditionally render features based on flags
 */
export function ProductPageExample() {
  const showFilters = useFeature('productFiltering');
  const showPagination = useFeature('productPagination');

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Products</h1>

      {/* This only renders if productFiltering flag is ON */}
      {showFilters && (
        <div className="rounded border border-gray-300 p-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <p className="text-sm text-gray-600">Filter components would go here</p>
        </div>
      )}

      {/* Product list always renders */}
      <div className="rounded border border-gray-300 p-4">
        <p className="text-sm text-gray-600">Product cards would go here</p>
      </div>

      {/* This only renders if productPagination flag is ON */}
      {showPagination && (
        <div className="flex gap-2">
          <button className="rounded border border-gray-300 px-4 py-2">Previous</button>
          <button className="rounded border border-gray-300 px-4 py-2">Next</button>
        </div>
      )}
    </div>
  );
}

/**
 * Example component using multiple feature flags at once
 */
export function MultiFeatureExample() {
  const { productFiltering, productPagination, productSearch } = useFeatures([
    'productFiltering',
    'productPagination',
    'productSearch',
  ]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Product Features Status</h1>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${productFiltering ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span>Product Filtering: {productFiltering ? 'Enabled' : 'Disabled'}</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${productPagination ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span>Product Pagination: {productPagination ? 'Enabled' : 'Disabled'}</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${productSearch ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span>Product Search: {productSearch ? 'Enabled' : 'Disabled'}</span>
        </div>
      </div>
    </div>
  );
}
