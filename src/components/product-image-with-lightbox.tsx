/**
 * ProductImageWithLightbox Component
 *
 * Wrapper component that combines product image display with lightbox functionality.
 * Allows users to click the product image to view it in an enlarged modal.
 *
 * Features:
 * - Clickable product image with visual hover effect
 * - Opens image in full-screen lightbox on click
 * - Cursor pointer to indicate interactivity
 * - Server-side rendering friendly (client component)
 *
 * @component
 * @example
 * ```tsx
 * <ProductImageWithLightbox
 *   imageUrl="/images/products/wasabi-peas.png"
 *   productName="Wasabi Peas"
 * />
 * ```
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageLightbox } from './image-lightbox';

/**
 * Props for ProductImageWithLightbox component
 */
interface ProductImageWithLightboxProps {
  /** URL of the product image */
  imageUrl: string;
  /** Product name for alt text and accessibility */
  productName: string;
}

/**
 * ProductImageWithLightbox Component
 *
 * Displays a product image that opens in a lightbox when clicked.
 * Combines Next.js Image optimization with modal viewing experience.
 *
 * Interaction:
 * - Click image to open lightbox
 * - Hover for visual feedback (opacity change)
 * - Cursor indicates clickability
 *
 * @param props - Component props
 * @param props.imageUrl - Product image URL
 * @param props.productName - Product name
 * @returns Rendered image with lightbox functionality
 */
export function ProductImageWithLightbox({ imageUrl, productName }: ProductImageWithLightboxProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      {/* Product Image - Clickable */}
      <div
        className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100 transition-opacity hover:opacity-90"
        onClick={() => setIsLightboxOpen(true)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsLightboxOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View ${productName} in full size`}
      >
        <Image src={imageUrl} alt={productName} fill className="object-cover" priority />

        {/* Zoom Icon Hint */}
        <div className="absolute bottom-2 right-2 rounded-full bg-black bg-opacity-50 p-2 text-white opacity-0 transition-opacity hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
            />
          </svg>
        </div>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        image={{
          src: imageUrl,
          alt: productName,
        }}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}
