/**
 * Cart Page
 *
 * Displays user's shopping cart with product details, quantities, and order summary.
 * Fetches current product details from API and merges with cart state.
 *
 * Features:
 * - Empty state when cart is empty
 * - Product list with images, names, prices, quantities
 * - Order summary with subtotal and checkout button
 * - Responsive design
 *
 * @page
 */

'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/contexts/cart-context';
import { EmptyCart } from '@/components/cart/empty-cart';
import { CartItemRow } from '@/components/cart/cart-item-row';
import { CartSummary } from '@/components/cart/cart-summary';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}

interface CartProduct extends Product {
  quantity: number;
}

export default function CartPage() {
  const { items } = useCart();
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCartProducts() {
      // If cart is empty, don't fetch anything
      if (items.length === 0) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Extract product IDs from cart items
        const productIds = items.map(item => item.productId).join(',');

        // Fetch product details from bulk API
        const response = await fetch(`/api/products/bulk?ids=${productIds}`);

        if (!response.ok) {
          throw new Error('Failed to fetch cart products');
        }

        const data = await response.json();

        // Merge product details with cart quantities
        const cartProducts: CartProduct[] = data.products.map((product: Product) => {
          const cartItem = items.find(item => item.productId === product.id);
          return {
            ...product,
            quantity: cartItem?.quantity || 1,
          };
        });

        setProducts(cartProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching cart products:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCartProducts();
  }, [items]);

  // Calculate subtotal
  const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <EmptyCart />
      </div>
    );
  }

  // Cart with items
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            {products.map(product => (
              <CartItemRow key={product.id} product={product} quantity={product.quantity} />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CartSummary subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
