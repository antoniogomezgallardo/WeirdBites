import { features, FeatureFlag } from '@/config/features';

/**
 * Feature flag utilities for server-side code
 */

/**
 * Check if feature is enabled (server-side)
 * @param flag - Feature flag name
 * @returns boolean
 */
export function isEnabled(flag: FeatureFlag): boolean {
  return features[flag];
}

/**
 * Execute code conditionally based on feature flag
 * @param flag - Feature flag name
 * @param onEnabled - Function to execute if enabled
 * @param onDisabled - Function to execute if disabled (optional)
 */
export function withFeature<T>(
  flag: FeatureFlag,
  onEnabled: () => T,
  onDisabled?: () => T
): T | undefined {
  if (features[flag]) {
    return onEnabled();
  }
  return onDisabled?.();
}

/**
 * Filter items based on feature flags
 * @param items - Array of items with feature flags
 * @returns Filtered array
 */
export function filterByFeature<T extends { feature?: FeatureFlag }>(items: T[]): T[] {
  return items.filter(item => {
    if (!item.feature) return true;
    return features[item.feature];
  });
}
