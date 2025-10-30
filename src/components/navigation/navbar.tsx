'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

/**
 * Navigation Bar Component
 *
 * Provides site-wide navigation with mobile responsive menu.
 * Highlights active link and displays cart item count.
 *
 * @example
 * ```tsx
 * <Navbar cartItemCount={3} />
 * ```
 */

export interface NavbarProps {
  /** Number of items in shopping cart (placeholder for US-004) */
  cartItemCount?: number;
}

export function Navbar({ cartItemCount = 0 }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Check if a route is currently active
   */
  const isActive = (path: string) => pathname === path;

  /**
   * Format cart count for badge display
   * @returns Empty string for 0, "99+" for 100+, otherwise the count
   */
  const formatCartCount = (count: number): string => {
    if (count === 0) return '';
    if (count > 99) return '99+';
    return count.toString();
  };

  /**
   * Generate accessible label for cart link
   */
  const getCartAriaLabel = (count: number): string => {
    return count > 0 ? `Cart with ${count} items` : 'Cart';
  };

  /**
   * Close mobile menu when navigation link is clicked
   */
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`text-xl font-bold text-gray-900 transition-colors hover:text-gray-600 ${
              isActive('/') ? 'border-b-2 border-gray-900' : ''
            }`}
          >
            WeirdBites
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/products"
              className={`px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 ${
                isActive('/products') ? 'border-b-2 border-gray-900' : ''
              }`}
            >
              Products
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
              aria-label={getCartAriaLabel(cartItemCount)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {cartItemCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
                  aria-hidden="true"
                >
                  {formatCartCount(cartItemCount)}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className={`px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 ${
                isActive('/account') ? 'border-b-2 border-gray-900' : ''
              }`}
            >
              Account
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="block p-3 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div
            role="dialog"
            aria-label="Mobile navigation"
            className="border-t border-gray-200 py-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              <Link
                href="/products"
                onClick={handleMobileLinkClick}
                className="rounded px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Products
              </Link>
              <Link
                href="/cart"
                onClick={handleMobileLinkClick}
                className="rounded px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100"
                aria-label={getCartAriaLabel(cartItemCount)}
              >
                Cart{' '}
                {cartItemCount > 0 && (
                  <span aria-hidden="true">({formatCartCount(cartItemCount)})</span>
                )}
              </Link>
              <Link
                href="/account"
                onClick={handleMobileLinkClick}
                className="rounded px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
