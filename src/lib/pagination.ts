/**
 * Pagination Utilities
 *
 * Helper functions for calculating pagination offsets and metadata.
 */

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Calculate database skip/take values from page and pageSize
 *
 * @param page - Current page number (1-indexed)
 * @param pageSize - Number of items per page
 * @returns Object with skip (offset) and take (limit) values for Prisma
 *
 * @example
 * ```ts
 * const { skip, take } = calculatePaginationOffset(2, 12);
 * // Returns: { skip: 12, take: 12 }
 * ```
 */
export function calculatePaginationOffset(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return { skip, take };
}

/**
 * Calculate pagination metadata for API responses
 *
 * @param page - Current page number (1-indexed)
 * @param pageSize - Number of items per page
 * @param totalItems - Total number of items in database
 * @returns Pagination metadata object
 *
 * @example
 * ```ts
 * const meta = calculatePaginationMeta(2, 12, 50);
 * // Returns: { currentPage: 2, pageSize: 12, totalItems: 50, totalPages: 5 }
 * ```
 */
export function calculatePaginationMeta(
  page: number,
  pageSize: number,
  totalItems: number
): PaginationMeta {
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    currentPage: page,
    pageSize,
    totalItems,
    totalPages,
  };
}

/**
 * Validate pagination parameters
 *
 * @param page - Page number to validate
 * @param pageSize - Page size to validate
 * @returns Error message if invalid, null if valid
 *
 * @example
 * ```ts
 * const error = validatePaginationParams(0, 12);
 * // Returns: "Page must be greater than 0"
 * ```
 */
export function validatePaginationParams(page: number, pageSize: number): string | null {
  if (isNaN(page) || page < 1) {
    return 'Page must be a number greater than 0';
  }

  if (isNaN(pageSize) || pageSize < 1 || pageSize > 100) {
    return 'Page size must be between 1 and 100';
  }

  return null;
}
