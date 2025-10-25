import { features, FeatureFlag } from '@/config/features';

/**
 * React hook to check if a feature is enabled
 *
 * @param flag - Feature flag name (type-safe)
 * @returns boolean - Whether the feature is enabled
 *
 * @example
 * function ProductPage() {
 *   const showFilters = useFeature('productFiltering')
 *
 *   return (
 *     <div>
 *       <ProductList />
 *       {showFilters && <ProductFilters />}
 *     </div>
 *   )
 * }
 */
export function useFeature(flag: FeatureFlag): boolean {
  return features[flag];
}

/**
 * React hook to get multiple feature flags
 * Useful when checking multiple features at once
 *
 * @param flags - Array of feature flag names
 * @returns Object mapping flag names to their values
 *
 * @example
 * function ProductPage() {
 *   const { productFiltering, productPagination } = useFeatures([
 *     'productFiltering',
 *     'productPagination'
 *   ])
 *
 *   return (
 *     <div>
 *       <ProductList />
 *       {productFiltering && <ProductFilters />}
 *       {productPagination && <Pagination />}
 *     </div>
 *   )
 * }
 */
export function useFeatures<T extends FeatureFlag>(flags: T[]): Record<T, boolean> {
  return flags.reduce(
    (acc, flag) => ({
      ...acc,
      [flag]: features[flag],
    }),
    {} as Record<T, boolean>
  );
}
