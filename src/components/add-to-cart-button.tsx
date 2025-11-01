/**
 * AddToCartButton Component
 *
 * Renders a button for adding products to the shopping cart.
 * Integrates with CartContext for state management and localStorage persistence.
 *
 * Features:
 * - Cart state management via CartContext
 * - Toast notifications on add (via Sonner)
 * - Stock validation before enabling
 * - Feature flag integration (optional shoppingCart)
 * - Accessible button states with ARIA attributes
 * - Visual feedback for disabled states
 * - WCAG 2.1 AA compliant
 *
 * States:
 * - Disabled: When disabled prop is true or stock === 0
 * - Active: When enabled and stock available
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <AddToCartButton productId="123" />
 *
 * // With product name (for toast notification)
 * <AddToCartButton productId="123" productName="Wasabi Kit Kat" />
 *
 * // With custom label
 * <AddToCartButton productId="123" label="Buy Now" />
 *
 * // Disabled (out of stock)
 * <AddToCartButton productId="123" disabled />
 * ```
 */

'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

/**
 * Props for AddToCartButton component
 */
interface AddToCartButtonProps {
  /** Unique product identifier */
  productId: string;
  /** Product name for toast notifications and accessibility */
  productName?: string;
  /** Custom button label (defaults to "Add to Cart") */
  label?: string;
  /** Disabled state (out of stock, etc.) */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * AddToCartButton Component
 *
 * Renders an add-to-cart button with cart integration.
 * Button is disabled when:
 * 1. disabled prop is true (out of stock, etc.)
 *
 * Accessibility:
 * - Uses aria-label with product name
 * - Includes aria-disabled attribute when disabled
 * - Visual and text cues for disabled states
 * - Focus ring for keyboard navigation
 * - Keyboard accessible (Enter/Space)
 *
 * @param props - Component props
 * @param props.productId - Product identifier
 * @param props.productName - Product name (optional, for toast)
 * @param props.label - Custom button label (optional)
 * @param props.disabled - Disabled state (optional)
 * @param props.className - Additional CSS classes (optional)
 * @returns Rendered button element
 */
export function AddToCartButton({
  productId,
  productName,
  label = 'Add to Cart',
  disabled = false,
  className = '',
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  /**
   * Handles adding product to cart
   * Shows success toast notification
   */
  const handleAddToCart = () => {
    if (disabled) return;

    addItem(productId);

    const toastMessage = productName ? `Added ${productName} to cart` : 'Added to cart';

    toast.success(toastMessage);
  };

  /**
   * Generates accessible aria-label with product name
   * @returns Aria-label string for screen readers
   */
  const getAriaLabel = (): string => {
    if (productName) {
      return disabled ? `Add ${productName} to cart - out of stock` : `Add ${productName} to cart`;
    }
    return label;
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled}
      aria-label={getAriaLabel()}
      aria-disabled={disabled}
      className={`bg-primary hover:bg-primary/90 focus:ring-primary inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      } ${className}`}
    >
      <ShoppingCart className="h-5 w-5" aria-hidden="true" />
      {label}
    </button>
  );
}
