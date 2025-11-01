import type { CartItem } from '@/contexts/cart-context';

/**
 * Local storage key for cart data
 */
const CART_STORAGE_KEY = 'weirdbites_cart';

/**
 * Cart expiration duration in milliseconds (24 hours)
 */
const CART_EXPIRATION_MS = 24 * 60 * 60 * 1000;

/**
 * Shape of cart data stored in localStorage
 */
interface StoredCartData {
  items: Array<{
    productId: string;
    quantity: number;
    addedAt: string; // ISO string
  }>;
  expiresAt: string; // ISO string
}

/**
 * Save cart items to localStorage with 24-hour expiration
 * @param items - Cart items to persist
 */
export function saveCart(items: CartItem[]): void {
  try {
    const cartData: StoredCartData = {
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        addedAt: item.addedAt.toISOString(),
      })),
      expiresAt: new Date(Date.now() + CART_EXPIRATION_MS).toISOString(),
    };

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  } catch (error) {
    // Fail silently - don't block cart operations if storage fails
    console.error('Failed to save cart to localStorage:', error);
  }
}

/**
 * Load cart items from localStorage
 * Returns empty array if cart doesn't exist, is expired, or is invalid
 * @returns Cart items or empty array
 */
export function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const cartData: StoredCartData = JSON.parse(stored);

    // Validate cart data structure
    if (!cartData.items || !Array.isArray(cartData.items) || !cartData.expiresAt) {
      clearCartStorage();
      return [];
    }

    // Check if cart is expired
    const expiresAt = new Date(cartData.expiresAt);
    if (isCartExpired(expiresAt)) {
      clearCartStorage();
      return [];
    }

    // Convert stored items back to CartItem format
    return cartData.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      addedAt: new Date(item.addedAt),
    }));
  } catch (error) {
    // Invalid JSON or other error - clear storage and return empty
    console.error('Failed to load cart from localStorage:', error);
    clearCartStorage();
    return [];
  }
}

/**
 * Remove cart data from localStorage
 */
export function clearCartStorage(): void {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear cart from localStorage:', error);
  }
}

/**
 * Check if cart expiration date has passed
 * @param expiresAt - Expiration date
 * @returns True if cart is expired
 */
export function isCartExpired(expiresAt: Date): boolean {
  return expiresAt.getTime() <= Date.now();
}
