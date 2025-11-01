/**
 * EmptyCart Component
 *
 * Displays a user-friendly message when the shopping cart is empty.
 * Includes a CTA to browse products.
 *
 * @component
 * @example
 * ```tsx
 * <EmptyCart />
 * ```
 */

import Link from 'next/link';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Shopping bag icon */}
      <svg
        data-testid="empty-cart-icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="mb-4 h-24 w-24 text-gray-400"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>

      {/* Empty message */}
      <h2 className="mb-2 text-2xl font-bold text-gray-900">Your cart is empty</h2>
      <p className="mb-6 text-gray-600">Looks like you haven&apos;t added any weird bites yet!</p>

      {/* CTA to products page */}
      <Link
        href="/products"
        className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700"
      >
        Browse Products
      </Link>
    </div>
  );
}
