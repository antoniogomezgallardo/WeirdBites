import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { apiSuccess, apiError } from '@/lib/api/response';
import {
  calculatePaginationOffset,
  calculatePaginationMeta,
  validatePaginationParams,
} from '@/lib/pagination';

const prisma = new PrismaClient();

/**
 * GET /api/products
 *
 * Returns a paginated list of products from the database.
 * Supports both legacy (limit) and modern (page/pageSize) pagination.
 *
 * Query Parameters:
 * - page: Page number (1-indexed, default: 1)
 * - pageSize: Number of products per page (default: 12, max: 100)
 * - limit: Legacy parameter for backward compatibility (default: 12, max: 100)
 *
 * @example
 * GET /api/products                        // Returns first 12 products (legacy)
 * GET /api/products?limit=20               // Returns first 20 products (legacy)
 * GET /api/products?page=1&pageSize=12     // Returns first page (modern)
 * GET /api/products?page=2&pageSize=12     // Returns second page (modern)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Check if using modern pagination (page/pageSize) or legacy (limit)
    const pageParam = searchParams.get('page');
    const pageSizeParam = searchParams.get('pageSize');
    const limitParam = searchParams.get('limit');

    // Modern pagination: ?page=N&pageSize=M
    if (pageParam || pageSizeParam) {
      const page = pageParam ? parseInt(pageParam, 10) : 1;
      const pageSize = pageSizeParam ? parseInt(pageSizeParam, 10) : 12;

      // Validate parameters
      const validationError = validatePaginationParams(page, pageSize);
      if (validationError) {
        return apiError(validationError, 400);
      }

      // Calculate offset and limit
      const { skip, take } = calculatePaginationOffset(page, pageSize);

      // Get total count for pagination metadata
      const totalItems = await prisma.product.count();

      // Fetch paginated products
      const products = await prisma.product.findMany({
        skip,
        take,
        orderBy: {
          name: 'asc',
        },
      });

      // Calculate pagination metadata
      const pagination = calculatePaginationMeta(page, pageSize, totalItems);

      // Return paginated response
      return apiSuccess(
        {
          data: products,
          pagination,
        },
        200
      );
    }

    // Legacy pagination: ?limit=N (for backward compatibility)
    let limit = 12; // default
    if (limitParam) {
      const parsedLimit = parseInt(limitParam, 10);
      if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
        return apiError('Invalid limit parameter. Must be between 1 and 100.', 400);
      }
      limit = parsedLimit;
    }

    // Fetch products from database (legacy response format)
    const products = await prisma.product.findMany({
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });

    return apiSuccess(products, 200);
  } catch (error) {
    console.error('Error fetching products:', error);
    return apiError('Failed to fetch products', 500);
  }
}
