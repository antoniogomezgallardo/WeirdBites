import Link from 'next/link';
import Image from 'next/image';

/**
 * Hero Section Component
 *
 * Eye-catching hero section for the landing page with:
 * - Main headline
 * - Subheading
 * - CTA button to browse products
 * - Hero image
 *
 * Fully responsive and accessible.
 */
export function Hero() {
  return (
    <section
      role="region"
      aria-label="Hero section"
      className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Discover <span className="text-orange-600">Weird Snacks</span> from Around the World
            </h1>

            <p className="mb-8 text-lg text-gray-600 sm:text-xl">
              Unusual snacks from around the world delivered to your door. Explore exotic flavors
              and unique treats you won&apos;t find anywhere else.
            </p>

            <div>
              <Link
                href="/products"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-orange-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Browse Products
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-square lg:aspect-auto lg:h-full lg:min-h-[400px]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-200 to-orange-300 opacity-20"></div>
            <div className="relative flex h-full items-center justify-center p-8">
              <Image
                src="/images/hero-snacks.png"
                alt="Colorful assortment of weird and unusual snacks from around the world, including exotic chips, candies, and treats"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-full opacity-30"
        aria-hidden="true"
      >
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-orange-300 mix-blend-multiply blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-yellow-300 mix-blend-multiply blur-3xl"></div>
      </div>
    </section>
  );
}
