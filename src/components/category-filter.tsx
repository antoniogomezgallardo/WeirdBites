/**
 * CategoryFilter Component
 *
 * Filter products by category with visual category buttons.
 * Updates URL query params for shareable links.
 *
 * Features:
 * - Display category buttons with product counts
 * - "All Products" button to clear filters
 * - Active category highlighting
 * - URL query param navigation (/?category=spicy)
 * - Keyboard accessible with ARIA attributes
 * - WCAG 2.1 AA compliant
 *
 * @component
 * @example
 * ```tsx
 * // Get categories with counts from database
 * const categories = [
 *   { name: 'Spicy', count: 12 },
 *   { name: 'Sweet', count: 8 },
 * ];
 *
 * <CategoryFilter
 *   categories={categories}
 *   selectedCategory="Spicy"
 * />
 * ```
 */

'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

/**
 * Category data with product count
 */
export interface Category {
  /** Category name (e.g., "Spicy", "Sweet") */
  name: string;
  /** Number of products in this category */
  count: number;
}

/**
 * Props for CategoryFilter component
 */
interface CategoryFilterProps {
  /** Array of categories with product counts */
  categories: Category[];
  /** Currently selected category name (null if showing all) */
  selectedCategory: string | null;
}

/**
 * CategoryFilter Component
 *
 * Renders filter buttons for product categories.
 * Updates URL with ?category=name query param on selection.
 *
 * Accessibility:
 * - aria-pressed indicates active/selected state
 * - Keyboard navigable with Enter/Space
 * - Descriptive aria-label with product counts
 * - Role="button" for all interactive elements
 *
 * @param props - Component props
 * @param props.categories - Available categories with counts
 * @param props.selectedCategory - Currently active category (null = all)
 * @returns Rendered category filter buttons
 */
export function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Handle category selection
   * Updates URL with category query param
   * @param categoryName - Selected category name (null for "All Products")
   */
  const handleCategoryClick = (categoryName: string | null) => {
    if (categoryName === null) {
      // Clear filter - navigate to root path
      router.push(pathname);
    } else {
      // Set category filter - add query param and reset to page 1
      const params = new URLSearchParams(searchParams);
      params.set('category', categoryName);
      params.delete('page'); // Reset to page 1 when filtering
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const isAllSelected = selectedCategory === null;

  return (
    <div
      className="mb-8 flex flex-wrap gap-2"
      role="group"
      aria-label="Filter products by category"
    >
      {/* "All Products" button */}
      <button
        type="button"
        onClick={() => handleCategoryClick(null)}
        aria-pressed={isAllSelected}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
          isAllSelected
            ? 'bg-green-700 text-white hover:bg-green-800'
            : 'border border-gray-400 bg-white text-gray-900 hover:bg-gray-100'
        }`}
      >
        All Products
      </button>

      {/* Category buttons */}
      {categories.map(category => {
        const isSelected = selectedCategory === category.name;

        return (
          <button
            key={category.name}
            type="button"
            onClick={() => handleCategoryClick(category.name)}
            aria-pressed={isSelected}
            aria-label={`${category.name} - ${category.count} products`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              isSelected
                ? 'bg-green-700 text-white hover:bg-green-800'
                : 'border border-gray-400 bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            {category.name} ({category.count})
          </button>
        );
      })}
    </div>
  );
}
