/**
 * AddToCartButton Component
 *
 * Renders a button for adding products to the shopping cart.
 * Handles multiple disabled states (out of stock, feature not enabled).
 *
 * Features:
 * - Stock validation before enabling
 * - Feature flag integration (shoppingCart)
 * - Accessible button states with ARIA attributes
 * - Visual feedback for disabled states
 * - WCAG 2.1 AA compliant
 *
 * States:
 * - Out of Stock: Disabled with "Out of stock" text
 * - Coming Soon: Disabled when cart feature not enabled
 * - Active: Enabled when stock available and cart feature enabled
 *
 * @component
 * @example
 * ```tsx
 * // Out of stock product (disabled)
 * <AddToCartButton stock={0} productId="123" productName="Wasabi Kit Kat" />
 *
 * // In stock, cart not enabled (disabled with "Coming Soon")
 * <AddToCartButton stock={10} productId="123" productName="Wasabi Kit Kat" />
 *
 * // In stock, cart enabled (active button)
 * <AddToCartButton stock={10} productId="123" productName="Wasabi Kit Kat" />
 * ```
 */

'use client';

import { isStockAvailable } from '@/lib/stock-utils';
import { isFeatureEnabled } from '@/config/features';

/**
 * Props for AddToCartButton component
 */
interface AddToCartButtonProps {
  /** Current stock quantity for the product */
  stock: number;
  /** Unique product identifier */
  productId: string;
  /** Product name for accessibility labels */
  productName: string;
}

/**
 * AddToCartButton Component
 *
 * Renders an add-to-cart button with intelligent disabled states.
 * Button is disabled when:
 * 1. Product is out of stock (stock <= 0)
 * 2. Shopping cart feature is not enabled (feature flag)
 *
 * Accessibility:
 * - Uses aria-label with product name and status
 * - Includes aria-disabled attribute
 * - Visual and text cues for disabled states
 * - Focus ring for keyboard navigation
 *
 * @param props - Component props
 * @param props.stock - Current stock quantity
 * @param props.productId - Product identifier (for future cart logic)
 * @param props.productName - Product name for accessibility
 * @returns Rendered button element
 */
export function AddToCartButton({
  stock,
  productId: _productId,
  productName,
}: AddToCartButtonProps) {
  const hasStock = isStockAvailable(stock);
  const cartEnabled = isFeatureEnabled('shoppingCart');
  const isDisabled = !hasStock || !cartEnabled;

  /**
   * Determines button text based on current state
   * @returns Button text string
   */
  const getButtonText = (): string => {
    if (!hasStock) return 'Out of stock';
    if (!cartEnabled) return 'Coming Soon';
    return 'Add to Cart';
  };

  /**
   * Generates accessible aria-label with product name and status
   * @returns Aria-label string for screen readers
   */
  const getAriaLabel = (): string => {
    if (!hasStock) return `Add ${productName} to cart - out of stock`;
    if (!cartEnabled) return `Add ${productName} to cart - coming soon`;
    return `Add ${productName} to cart`;
  };

  return (
    <button
      disabled={isDisabled}
      aria-label={getAriaLabel()}
      aria-disabled={isDisabled}
      className={`w-full rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
        isDisabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      {getButtonText()}
    </button>
  );
}
