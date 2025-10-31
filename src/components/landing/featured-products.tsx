import Link from 'next/link';
import Image from 'next/image';

interface FeaturedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  origin: string;
}

interface FeaturedProductsProps {
  products: FeaturedProduct[];
}

/**
 * Featured Products Section
 *
 * Displays a curated selection of featured products on the landing page.
 * Each product is clickable and links to its detail page.
 *
 * @param products - Array of featured products to display
 */
export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="bg-gray-50 py-16 sm:py-20" aria-labelledby="featured-heading">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 id="featured-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Featured Snacks
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Handpicked weird and wonderful snacks from around the world
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl"
              data-testid="featured-product-card"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Featured Badge */}
                <div className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-gray-900">
                  Featured
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">
                  {product.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500">{product.origin}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-green-700"
          >
            View All Products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
