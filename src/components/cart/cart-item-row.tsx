/**
 * CartItemRow Component
 *
 * Displays a single product in the shopping cart with image, name, price, quantity, and subtotal.
 *
 * @component
 * @example
 * ```tsx
 * <CartItemRow
 *   product={{ id: '1', name: 'Product', price: 9.99, imageUrl: '/img.jpg', stock: 10 }}
 *   quantity={2}
 * />
 * ```
 */

import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}

interface CartItemRowProps {
  product: Product;
  quantity: number;
}

export function CartItemRow({ product, quantity }: CartItemRowProps) {
  // Calculate subtotal (price × quantity)
  const subtotal = product.price * quantity;

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 py-4">
      {/* Product Image */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col">
        <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-600">${product.price.toFixed(2)}</p>
        <p className="mt-1 text-sm text-gray-500">Quantity: {quantity}</p>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="text-base font-medium text-gray-900">${subtotal.toFixed(2)}</p>
      </div>
    </div>
  );
}
