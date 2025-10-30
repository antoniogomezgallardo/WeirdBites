import { PrismaClient } from '@prisma/client';
import { Product, PaginationInfo } from '@/components/product-grid';
import { calculatePaginationOffset, calculatePaginationMeta } from '@/lib/pagination';

const prisma = new PrismaClient();

/**
 * Fetches paginated products from the database
 *
 * @param page - Current page number (1-indexed)
 * @param pageSize - Number of items per page
 * @returns Object containing products array, pagination info, and optional error message
 *
 * @example
 * ```ts
 * const { products, pagination, error } = await getProducts(1, 12);
 * if (error) {
 *   console.error('Failed to fetch products:', error);
 * } else {
 *   console.log(`Found ${products.length} products`);
 * }
 * ```
 */
export async function getProducts(
  page: number,
  pageSize: number
): Promise<{ products: Product[]; pagination: PaginationInfo; error?: string }> {
  try {
    // Calculate offset
    const { skip, take } = calculatePaginationOffset(page, pageSize);

    // Get total count
    const totalItems = await prisma.product.count();

    // Fetch paginated products
    const products = await prisma.product.findMany({
      skip,
      take,
      orderBy: {
        name: 'asc',
      },
    });

    // Convert Prisma Decimal to number for serialization
    const serializedProducts: Product[] = products.map(product => ({
      ...product,
      price: Number(product.price),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    // Calculate pagination metadata
    const pagination = calculatePaginationMeta(page, pageSize, totalItems);

    return {
      products: serializedProducts,
      pagination,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      products: [],
      pagination: {
        currentPage: page,
        pageSize,
        totalItems: 0,
        totalPages: 0,
      },
      error: 'Failed to load products',
    };
  }
}
