'use client';

/**
 * Pagination Component
 *
 * Provides navigation controls for paginated content with prev/next buttons.
 * Displays current page information and handles page navigation.
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={2}
 *   totalPages={10}
 *   onPageChange={(page) => router.push(`?page=${page}`)}
 * />
 * ```
 */

interface PaginationProps {
  /**
   * Current active page (1-indexed)
   */
  currentPage: number;

  /**
   * Total number of pages available
   */
  totalPages: number;

  /**
   * Callback function called when user navigates to a different page
   * @param page - The new page number (1-indexed)
   */
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav aria-label="Pagination navigation" className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={isFirstPage}
        aria-label="Go to previous page"
        className="min-h-[44px] min-w-[44px] rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      >
        Previous
      </button>

      <span className="text-sm text-gray-700" aria-current="page">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        onClick={handleNext}
        disabled={isLastPage}
        aria-label="Go to next page"
        className="min-h-[44px] min-w-[44px] rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      >
        Next
      </button>
    </nav>
  );
}
