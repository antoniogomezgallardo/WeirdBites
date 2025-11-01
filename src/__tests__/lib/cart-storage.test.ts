import { loadCart, saveCart, clearCartStorage, isCartExpired } from '@/lib/cart-storage';
import type { CartItem } from '@/contexts/cart-context';

describe('cart-storage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('saveCart', () => {
    it('should save cart items to localStorage', () => {
      const items: CartItem[] = [
        { productId: 'product-1', quantity: 2, addedAt: new Date() },
        { productId: 'product-2', quantity: 1, addedAt: new Date() },
      ];

      saveCart(items);

      const stored = localStorage.getItem('weirdbites_cart');
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored!);
      expect(parsed.items).toHaveLength(2);
      expect(parsed.items[0].productId).toBe('product-1');
      expect(parsed.expiresAt).toBeTruthy();
    });

    it('should set expiration to 24 hours from now', () => {
      const items: CartItem[] = [{ productId: 'product-1', quantity: 1, addedAt: new Date() }];

      const now = Date.now();
      saveCart(items);

      const stored = localStorage.getItem('weirdbites_cart');
      const parsed = JSON.parse(stored!);

      const expiresAt = new Date(parsed.expiresAt).getTime();
      const expectedExpiry = now + 24 * 60 * 60 * 1000; // 24 hours

      // Allow 1 second tolerance for test execution time
      expect(expiresAt).toBeGreaterThanOrEqual(expectedExpiry - 1000);
      expect(expiresAt).toBeLessThanOrEqual(expectedExpiry + 1000);
    });

    it('should handle empty cart', () => {
      saveCart([]);

      const stored = localStorage.getItem('weirdbites_cart');
      const parsed = JSON.parse(stored!);

      expect(parsed.items).toHaveLength(0);
      expect(parsed.expiresAt).toBeTruthy();
    });
  });

  describe('loadCart', () => {
    it('should load cart items from localStorage', () => {
      const items: CartItem[] = [
        { productId: 'product-1', quantity: 2, addedAt: new Date('2025-01-01') },
      ];

      const cartData = {
        items: items.map(item => ({
          ...item,
          addedAt: item.addedAt.toISOString(),
        })),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorage.setItem('weirdbites_cart', JSON.stringify(cartData));

      const loaded = loadCart();

      expect(loaded).toHaveLength(1);
      expect(loaded[0].productId).toBe('product-1');
      expect(loaded[0].quantity).toBe(2);
      expect(loaded[0].addedAt).toBeInstanceOf(Date);
    });

    it('should return empty array when no cart exists', () => {
      const loaded = loadCart();
      expect(loaded).toEqual([]);
    });

    it('should return empty array when cart is expired', () => {
      const items: CartItem[] = [{ productId: 'product-1', quantity: 1, addedAt: new Date() }];

      const cartData = {
        items: items.map(item => ({
          ...item,
          addedAt: item.addedAt.toISOString(),
        })),
        expiresAt: new Date(Date.now() - 1000).toISOString(), // Expired 1 second ago
      };

      localStorage.setItem('weirdbites_cart', JSON.stringify(cartData));

      const loaded = loadCart();
      expect(loaded).toEqual([]);
    });

    it('should clear expired cart from localStorage', () => {
      const items: CartItem[] = [{ productId: 'product-1', quantity: 1, addedAt: new Date() }];

      const cartData = {
        items: items.map(item => ({
          ...item,
          addedAt: item.addedAt.toISOString(),
        })),
        expiresAt: new Date(Date.now() - 1000).toISOString(),
      };

      localStorage.setItem('weirdbites_cart', JSON.stringify(cartData));

      loadCart();

      const stored = localStorage.getItem('weirdbites_cart');
      expect(stored).toBeNull();
    });

    it('should handle invalid JSON gracefully', () => {
      localStorage.setItem('weirdbites_cart', 'invalid json');

      const loaded = loadCart();
      expect(loaded).toEqual([]);
    });

    it('should handle missing expiresAt field', () => {
      const cartData = {
        items: [{ productId: 'product-1', quantity: 1, addedAt: new Date().toISOString() }],
      };

      localStorage.setItem('weirdbites_cart', JSON.stringify(cartData));

      const loaded = loadCart();
      expect(loaded).toEqual([]);
    });

    it('should handle missing items field', () => {
      const cartData = {
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorage.setItem('weirdbites_cart', JSON.stringify(cartData));

      const loaded = loadCart();
      expect(loaded).toEqual([]);
    });
  });

  describe('clearCartStorage', () => {
    it('should remove cart from localStorage', () => {
      const items: CartItem[] = [{ productId: 'product-1', quantity: 1, addedAt: new Date() }];

      saveCart(items);
      expect(localStorage.getItem('weirdbites_cart')).toBeTruthy();

      clearCartStorage();
      expect(localStorage.getItem('weirdbites_cart')).toBeNull();
    });

    it('should not throw error when no cart exists', () => {
      expect(() => clearCartStorage()).not.toThrow();
    });
  });

  describe('isCartExpired', () => {
    it('should return false for non-expired cart', () => {
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
      expect(isCartExpired(expiresAt)).toBe(false);
    });

    it('should return true for expired cart', () => {
      const expiresAt = new Date(Date.now() - 1000); // 1 second ago
      expect(isCartExpired(expiresAt)).toBe(true);
    });

    it('should return true for exactly expired cart', () => {
      const expiresAt = new Date(Date.now());
      expect(isCartExpired(expiresAt)).toBe(true);
    });
  });
});
