import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Product Detail Page
 *
 * Server Component that displays detailed information about a single product.
 * Fetches product data from the database and renders product details.
 *
 * @param params - Route parameters containing product ID
 * @returns Product detail page JSX
 */
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  // Fetch product from database
  const product = await prisma.product.findUnique({
    where: { id },
  });

  // Return 404 page if product not found
  if (!product) {
    notFound();
  }

  // Format price for display
  const formattedPrice = `$${Number(product.price).toFixed(2)}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Products
        </Link>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col space-y-6">
            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

            {/* Price */}
            <div className="text-3xl font-semibold text-green-600">{formattedPrice}</div>

            {/* Category and Origin */}
            <div className="flex gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Category:</span>
                <span className="rounded-full bg-gray-100 px-3 py-1">{product.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Origin:</span>
                <span className="rounded-full bg-gray-100 px-3 py-1">{product.origin}</span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="mb-3 text-xl font-semibold text-gray-900">Description</h2>
              <p className="leading-relaxed text-gray-700">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Generate metadata for the product detail page
 */
export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - WeirdBites`,
    description: product.description,
  };
}
