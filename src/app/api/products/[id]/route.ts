import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/products/[id]
 *
 * Retrieves a single product by ID
 *
 * @param request - Next.js request object
 * @param params - Route parameters containing product ID
 * @returns JSON response with product data or error
 *
 * @example
 * ```
 * GET /api/products/abc123
 * Response: { id: "abc123", name: "Durian Chips", ... }
 * ```
 */
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Fetch product from database
    const product = await prisma.product.findUnique({
      where: { id },
    });

    // Return 404 if product not found
    if (!product) {
      return NextResponse.json(
        {
          error: 'Product not found',
          productId: id,
        },
        { status: 404 }
      );
    }

    // Return product data
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching product:', error);

    // Return 500 for server errors
    return NextResponse.json(
      {
        error: 'Failed to fetch product',
      },
      { status: 500 }
    );
  }
}
