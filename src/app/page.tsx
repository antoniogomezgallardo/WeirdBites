import { PrismaClient } from '@prisma/client';
import { ProductCard } from '@/components/product-card';

const prisma = new PrismaClient();

// Force dynamic rendering (no caching) for now
// TODO: Add proper revalidation strategy when we add CMS
export const dynamic = 'force-dynamic';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  origin: string;
  stock: number;
}

async function getProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      take: 12,
      orderBy: {
        name: 'asc',
      },
    });

    // Convert Prisma Decimal to number for serialization
    return products.map(product => ({
      ...product,
      price: Number(product.price),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-red-600">Failed to load products</h1>
          <p className="text-gray-600">Unable to fetch products. Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Welcome to <span className="text-orange-600">WeirdBites</span>
          </h1>
          <p className="text-xl text-gray-600">Unusual snacks from around the world</p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <div key={product.id} data-testid="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
