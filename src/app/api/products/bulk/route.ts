/**
 * Bulk Products API Route
 *
 * GET /api/products/bulk?ids=id1,id2,id3
 *
 * Purpose: Fetch multiple products by IDs for cart display
 * This endpoint is used to get current product details (price, name, image, stock)
 * for items in the shopping cart.
 *
 * Query Parameters:
 * - ids: Comma-separated list of product IDs (max 100)
 *
 * Response:
 * - 200: { products: Product[] }
 * - 400: { error: string } - Missing/invalid parameters
 * - 500: { error: string } - Server error
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const MAX_PRODUCTS = 100; // Prevent abuse

export async function GET(request: NextRequest) {
  try {
    // Extract and validate IDs from query parameters
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get('ids');

    // Validation: IDs parameter required
    if (!idsParam || idsParam.trim() === '') {
      return NextResponse.json({ error: "Missing 'ids' query parameter" }, { status: 400 });
    }

    // Parse and deduplicate IDs
    const ids = [
      ...new Set(
        idsParam
          .split(',')
          .map(id => id.trim())
          .filter(Boolean)
      ),
    ];

    // Validation: Maximum 100 products
    if (ids.length > MAX_PRODUCTS) {
      return NextResponse.json(
        { error: `Maximum ${MAX_PRODUCTS} products can be fetched at once` },
        { status: 400 }
      );
    }

    // Fetch products from database
    // Only select fields needed for cart display (security + performance)
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
        stock: true,
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bulk products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
