import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/contexts/cart-context';
import type { ReactNode } from 'react';

describe('CartContext', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  describe('addItem', () => {
    it('should add item to cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem('product-1');
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual({
        productId: 'product-1',
        quantity: 1,
        addedAt: expect.any(Date),
      });
    });

    it('should increase quantity when adding duplicate product', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem('product-1');
        result.current.addItem('product-1'); // Add same product again
      });

      expect(result.current.items).toHaveLength(1); // Not duplicated
      expect(result.current.items[0].quantity).toBe(2); // Quantity increased
    });

    it('should add multiple different products', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem('product-1');
        result.current.addItem('product-2');
        result.current.addItem('product-3');
      });

      expect(result.current.items).toHaveLength(3);
      expect(result.current.items[0].productId).toBe('product-1');
      expect(result.current.items[1].productId).toBe('product-2');
      expect(result.current.items[2].productId).toBe('product-3');
    });
  });

  describe('totalQuantity', () => {
    it('should return 0 for empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.totalQuantity).toBe(0);
    });

    it('should calculate total quantity correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem('product-1'); // qty: 1
        result.current.addItem('product-1'); // qty: 2
        result.current.addItem('product-2'); // qty: 1
      });

      expect(result.current.totalQuantity).toBe(3); // 2 + 1
    });
  });

  describe('updateQuantity', () => {
    it('should update quantity for existing item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem('product-1');
      });

      act(() => {
        result.current.updateQuantity('product-1', 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });

    it('should not update quantity for non-existent item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.updateQuantity('product-999', 5);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem('product-1');
        result.current.addItem('product-2');
      });

      act(() => {
        result.current.removeItem('product-1');
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].productId).toBe('product-2');
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem('product-1');
        result.current.addItem('product-2');
      });

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.totalQuantity).toBe(0);
    });
  });

  describe('useCart hook', () => {
    it('should throw error when used outside CartProvider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        renderHook(() => useCart());
      }).toThrow('useCart must be used within CartProvider');

      console.error = originalError;
    });
  });
});
