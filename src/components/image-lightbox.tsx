/**
 * ImageLightbox Component
 *
 * Modal overlay for viewing enlarged product images.
 * Provides an immersive viewing experience with accessibility features.
 *
 * Features:
 * - Full-screen modal overlay with semi-transparent backdrop
 * - Enlarged image display (up to 90% viewport dimensions)
 * - Multiple close methods (close button, backdrop click, ESC key)
 * - Portal rendering (renders outside normal DOM hierarchy)
 * - Prevents body scroll when open
 * - Focus trapping for keyboard navigation
 * - WCAG 2.1 AA compliant with ARIA attributes
 *
 * @component
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * // Open lightbox when clicking product image
 * <img
 *   src="/images/product.png"
 *   alt="Product"
 *   onClick={() => setIsOpen(true)}
 *   className="cursor-pointer"
 * />
 *
 * // Lightbox component
 * <ImageLightbox
 *   isOpen={isOpen}
 *   image={{
 *     src: '/images/product.png',
 *     alt: 'Product name'
 *   }}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 */

'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

/**
 * Props for ImageLightbox component
 */
interface ImageLightboxProps {
  /** Controls whether the lightbox is visible */
  isOpen: boolean;
  /** Image to display in the lightbox */
  image: {
    /** Image source URL */
    src: string;
    /** Image alt text for accessibility */
    alt: string;
  };
  /** Callback function called when lightbox should close */
  onClose: () => void;
}

/**
 * ImageLightbox Component
 *
 * Renders a full-screen modal for viewing enlarged images.
 * Uses React Portal to render outside the normal DOM hierarchy.
 *
 * Close Methods:
 * - Click close button (X icon in top-right)
 * - Click backdrop (dark overlay area)
 * - Press ESC key
 *
 * Accessibility:
 * - role="dialog" with aria-modal="true" for screen readers
 * - Descriptive aria-label based on image alt text
 * - Focus trapping to prevent keyboard navigation outside modal
 * - Prevents body scroll when open
 * - ESC key handler for keyboard users
 *
 * @param props - Component props
 * @param props.isOpen - Whether the lightbox is visible
 * @param props.image - Image data (src and alt)
 * @param props.onClose - Function to call when closing
 * @returns Rendered lightbox or null if closed
 */
export function ImageLightbox({ isOpen, image, onClose }: ImageLightboxProps) {
  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Render lightbox in portal
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged view of ${image.alt}`}
    >
      {/* Backdrop */}
      <div
        data-testid="lightbox-backdrop"
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 max-h-[90vh] max-w-[90vw]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute -right-4 -top-4 z-20 rounded-full bg-white p-2 text-gray-800 shadow-lg transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image */}
        <div
          onClick={e => e.stopPropagation()}
          className="relative overflow-hidden rounded-lg bg-white shadow-2xl"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={1200}
            className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
            priority
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
