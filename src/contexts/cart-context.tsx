'use client';

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loadCart, saveCart, clearCartStorage } from '@/lib/cart-storage';

/**
 * Represents a single item in the shopping cart
 */
export interface CartItem {
  /** Unique identifier of the product */
  productId: string;
  /** Number of units of this product */
  quantity: number;
  /** Timestamp when the item was added to cart */
  addedAt: Date;
}

/**
 * Cart context value shape
 */
export interface CartContextType {
  /** All items currently in the cart */
  items: CartItem[];
  /** Add a product to the cart (or increment quantity if already exists) */
  addItem: (productId: string) => void;
  /** Update the quantity of a specific product */
  updateQuantity: (productId: string, quantity: number) => void;
  /** Remove a product from the cart */
  removeItem: (productId: string) => void;
  /** Clear all items from the cart */
  clearCart: () => void;
  /** Total quantity of all items in cart */
  totalQuantity: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Provides cart state and operations to the component tree
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  /**
   * Load cart from localStorage on mount (client-side only)
   */
  useEffect(() => {
    const savedItems = loadCart();
    if (savedItems.length > 0) {
      setItems(savedItems);
    }
    setIsHydrated(true);
  }, []);

  /**
   * Save cart to localStorage whenever items change
   */
  useEffect(() => {
    // Skip saving during initial hydration
    if (!isHydrated) {
      return;
    }
    saveCart(items);
  }, [items, isHydrated]);

  /**
   * Adds a product to the cart
   * If product already exists, increments quantity by 1
   */
  const addItem = useCallback((productId: string) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.productId === productId);

      if (existingItem) {
        // Increment quantity for existing item
        return currentItems.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      // Add new item
      return [
        ...currentItems,
        {
          productId,
          quantity: 1,
          addedAt: new Date(),
        },
      ];
    });
  }, []);

  /**
   * Updates the quantity of a product in the cart
   * Does nothing if the product doesn't exist
   */
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems(currentItems => {
      const exists = currentItems.some(item => item.productId === productId);

      if (!exists) {
        return currentItems;
      }

      return currentItems.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  /**
   * Removes a product from the cart
   */
  const removeItem = useCallback((productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.productId !== productId));
  }, []);

  /**
   * Clears all items from the cart
   */
  const clearCart = useCallback(() => {
    setItems([]);
    clearCartStorage();
  }, []);

  /**
   * Calculate total quantity of all items
   * Memoized to prevent unnecessary recalculations
   */
  const totalQuantity = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const value: CartContextType = useMemo(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      totalQuantity,
    }),
    [items, addItem, updateQuantity, removeItem, clearCart, totalQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Hook to access cart context
 * @throws Error if used outside of CartProvider
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}
