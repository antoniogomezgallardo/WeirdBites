/**
 * Stock Utilities
 *
 * Utility functions for stock validation and status determination.
 * Used to determine product availability and display appropriate messaging to users.
 *
 * @module stock-utils
 */

/**
 * Stock status type representing the current availability state
 * - inStock: Product has sufficient quantity (> LOW_STOCK_THRESHOLD)
 * - lowStock: Product quantity is low but still available (1-LOW_STOCK_THRESHOLD)
 * - outOfStock: Product is not available (≤ 0)
 */
export type StockStatus = 'inStock' | 'lowStock' | 'outOfStock';

/**
 * Threshold for low stock warning
 * Products with stock quantity at or below this value will be marked as low stock
 */
export const LOW_STOCK_THRESHOLD = 5;

/**
 * Messages for out of stock products
 */
const OUT_OF_STOCK_MESSAGE = 'Out of stock';

/**
 * Determines the stock status based on current quantity
 *
 * @param stock - Current stock quantity
 * @returns Stock status indicator (inStock | lowStock | outOfStock)
 *
 * @example
 * ```ts
 * getStockStatus(100) // returns 'inStock'
 * getStockStatus(3)   // returns 'lowStock'
 * getStockStatus(0)   // returns 'outOfStock'
 * getStockStatus(-5)  // returns 'outOfStock'
 * ```
 */
export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) return 'outOfStock';
  if (stock <= LOW_STOCK_THRESHOLD) return 'lowStock';
  return 'inStock';
}

/**
 * Checks if product is available for purchase
 *
 * @param stock - Current stock quantity
 * @returns true if stock is available (> 0), false otherwise
 *
 * @example
 * ```ts
 * isStockAvailable(10)  // returns true
 * isStockAvailable(0)   // returns false
 * isStockAvailable(-1)  // returns false
 * ```
 */
export function isStockAvailable(stock: number): boolean {
  return stock > 0;
}

/**
 * Generates a human-readable stock message for display
 *
 * @param stock - Current stock quantity
 * @returns Formatted stock message appropriate for the current stock level
 *
 * @example
 * ```ts
 * getStockMessage(100) // returns '100 in stock'
 * getStockMessage(3)   // returns 'Only 3 left'
 * getStockMessage(0)   // returns 'Out of stock'
 * getStockMessage(-1)  // returns 'Out of stock'
 * ```
 */
export function getStockMessage(stock: number): string {
  if (stock <= 0) return OUT_OF_STOCK_MESSAGE;
  if (stock <= LOW_STOCK_THRESHOLD) return `Only ${stock} left`;
  return `${stock} in stock`;
}
