/**
 * StockBadge Component
 *
 * Displays product stock status with color-coded visual indicators.
 * Provides accessible, real-time stock level information to users.
 *
 * Features:
 * - Color-coded badges (green = in stock, yellow = low stock, red = out of stock)
 * - WCAG 2.1 AA compliant with ARIA attributes
 * - Screen reader announcements via aria-live
 * - Semantic HTML with role="status"
 *
 * @component
 * @example
 * ```tsx
 * // In stock product (green badge)
 * <StockBadge stock={100} />
 *
 * // Low stock product (yellow badge)
 * <StockBadge stock={3} />
 *
 * // Out of stock product (red badge)
 * <StockBadge stock={0} />
 * ```
 */

import { getStockStatus, getStockMessage } from '@/lib/stock-utils';
import type { StockStatus } from '@/lib/stock-utils';

/**
 * Props for StockBadge component
 */
interface StockBadgeProps {
  /** Current stock quantity for the product */
  stock: number;
}

/**
 * Tailwind CSS classes for each stock status
 * Maps stock status to appropriate background and text colors
 */
const STOCK_BADGE_STYLES: Record<StockStatus, string> = {
  inStock: 'bg-green-100 text-green-800',
  lowStock: 'bg-yellow-100 text-yellow-800',
  outOfStock: 'bg-red-100 text-red-800',
};

/**
 * StockBadge Component
 *
 * Renders a color-coded badge displaying current stock status.
 * Automatically determines status and message based on stock quantity.
 *
 * Accessibility:
 * - Uses role="status" for semantic meaning
 * - Includes aria-live="polite" for screen reader updates
 * - Color + text ensures information isn't conveyed by color alone
 *
 * @param props - Component props
 * @param props.stock - Current stock quantity
 * @returns Rendered stock badge element
 */
export function StockBadge({ stock }: StockBadgeProps) {
  const status = getStockStatus(stock);
  const message = getStockMessage(stock);

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${STOCK_BADGE_STYLES[status]}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </span>
  );
}
