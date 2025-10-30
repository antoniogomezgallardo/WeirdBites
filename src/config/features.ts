/**
 * Feature Flags Configuration
 *
 * Controls which features are enabled/disabled.
 * Supports Trunk-Based Development by allowing safe deployment of incomplete features.
 *
 * Usage:
 * - Set flag to `false` while feature is in development
 * - Deploy to production safely (feature hidden)
 * - Set flag to `true` when feature is complete and tested
 *
 * @example
 * // In a component:
 * import { useFeature } from '@/hooks/useFeature'
 *
 * export function ProductPage() {
 *   const showFilters = useFeature('productFiltering')
 *   return <div>{showFilters && <ProductFilters />}</div>
 * }
 */

export const features = {
  // ==========================================
  // Deployment Increment 1: Browse Products Features
  // ==========================================
  productListing: true, // US-001: View product listings ✅ ENABLED
  productDetail: true, // US-002: View product details ✅ ENABLED
  productFiltering: false, // US-003: Filter products by category
  productPagination: true, // US-001: Paginate product listing ✅ ENABLED
  productSearch: false, // US-006: Search products

  // ==========================================
  // Shopping Cart User Stories
  // ==========================================
  shoppingCart: false, // US-004: Add to cart functionality
  cartPersistence: false, // US-005: Cart persists in localStorage

  // ==========================================
  // Guest Checkout User Stories
  // ==========================================
  guestCheckout: false, // US-007: Guest checkout flow
  stripePayment: false, // US-008: Stripe payment integration

  // ==========================================
  // User Accounts User Stories
  // ==========================================
  userRegistration: false, // US-010: User registration
  userLogin: false, // US-011: User login

  // ==========================================
  // Registered User User Stories
  // ==========================================
  orderHistory: false, // US-013: View order history
  savedAddresses: false, // US-014: Save delivery addresses

  // ==========================================
  // Search & Reviews User Stories
  // ==========================================
  productReviews: false, // US-016: Product reviews
  advancedSearch: false, // US-015: Advanced search filters

  // ==========================================
  // Admin Panel User Stories
  // ==========================================
  adminPanel: false, // US-018+: Admin dashboard
  productManagement: false, // US-019: Manage products
  inventoryManagement: false, // US-020: Inventory tracking

  // ==========================================
  // Experimental/Beta Features
  // ==========================================
  darkMode: false, // Optional: Dark mode UI
  a11yEnhancements: false, // Optional: Enhanced accessibility
} as const;

/**
 * Type-safe feature flag names
 * Auto-generated from features object keys
 */
export type FeatureFlag = keyof typeof features;

/**
 * Get feature flag value
 * @param flag - Feature flag name
 * @returns boolean - Whether feature is enabled
 */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return features[flag];
}

/**
 * Get all enabled features
 * @returns Array of enabled feature names
 */
export function getEnabledFeatures(): FeatureFlag[] {
  return (Object.keys(features) as FeatureFlag[]).filter(key => features[key]);
}

/**
 * Get all disabled features
 * @returns Array of disabled feature names
 */
export function getDisabledFeatures(): FeatureFlag[] {
  return (Object.keys(features) as FeatureFlag[]).filter(key => !features[key]);
}
