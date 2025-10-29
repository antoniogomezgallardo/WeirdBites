import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { apiSuccess, apiError } from '@/lib/api/response';

const prisma = new PrismaClient();

/**
 * GET /api/products
 *
 * Returns a list of products from the database.
 * Supports pagination via query parameters.
 *
 * Query Parameters:
 * - limit: Number of products to return (default: 12, max: 100)
 *
 * @example
 * GET /api/products
 * GET /api/products?limit=20
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');

    // Validate and parse limit
    let limit = 12; // default
    if (limitParam) {
      const parsedLimit = parseInt(limitParam, 10);
      if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
        return apiError('Invalid limit parameter. Must be between 1 and 100.', 400);
      }
      limit = parsedLimit;
    }

    // Fetch products from database
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
