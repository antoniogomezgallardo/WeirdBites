'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  imageUrl: string;
  category: string;
  origin: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard component displays a single product with image, name, and price.
 *
 * Features:
 * - Displays product image with fallback for errors
 * - Formats price as currency
 * - Handles missing/invalid data gracefully
 */
export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = (price: number | null): string => {
    if (price === null || price === undefined || isNaN(price)) {
      return 'Price unavailable';
    }
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
        <img
          src={imageError ? '/images/placeholder.jpg' : product.imageUrl}
          alt={product.name}
          onError={handleImageError}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        {product.description && <p className="mt-1 text-sm text-gray-600">{product.description}</p>}
        <p className="mt-2 text-xl font-bold text-gray-900">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}
