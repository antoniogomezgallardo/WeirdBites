import { PrismaClient } from '@prisma/client';
import { ProductsPageClient } from './products-page-client';
import { Product, PaginationInfo } from '@/components/product-grid';
import { calculatePaginationOffset, calculatePaginationMeta } from '@/lib/pagination';

const prisma = new PrismaClient();

// Force dynamic rendering (no caching) for now
// TODO: Add proper revalidation strategy when we add CMS
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}

async function getProducts(
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

export default async function Home({ searchParams }: PageProps) {
  // Await search params (Next.js 15 requirement)
  const params = await searchParams;

  // Parse pagination parameters from URL
  const page = params.page ? parseInt(params.page, 10) : 1;
  const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 12;

  // Validate parameters
  const validPage = isNaN(page) || page < 1 ? 1 : page;
  const validPageSize = isNaN(pageSize) || pageSize < 1 || pageSize > 100 ? 12 : pageSize;

  // Fetch products with pagination
  const { products, pagination, error } = await getProducts(validPage, validPageSize);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Welcome to <span className="text-orange-600">WeirdBites</span>
          </h1>
          <p className="text-xl text-gray-600">Unusual snacks from around the world</p>
        </header>

        <ProductsPageClient
          initialProducts={products}
          initialPagination={pagination}
          error={error}
        />
      </div>
    </main>
  );
}
