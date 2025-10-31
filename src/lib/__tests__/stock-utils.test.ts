/**
 * Unit Tests for Stock Utilities
 *
 * TDD RED Phase: Writing failing tests first
 * Tests stock validation and status determination logic
 */

import { getStockStatus, isStockAvailable, getStockMessage } from '../stock-utils';

describe('Stock Utilities', () => {
  describe('getStockStatus', () => {
    it('should return "inStock" when stock is greater than low stock threshold', () => {
      expect(getStockStatus(15)).toBe('inStock');
      expect(getStockStatus(100)).toBe('inStock');
    });

    it('should return "lowStock" when stock is between 1 and low stock threshold', () => {
      expect(getStockStatus(3)).toBe('lowStock');
      expect(getStockStatus(5)).toBe('lowStock');
      expect(getStockStatus(1)).toBe('lowStock');
    });

    it('should return "outOfStock" when stock is 0', () => {
      expect(getStockStatus(0)).toBe('outOfStock');
    });

    it('should handle negative stock as out of stock', () => {
      expect(getStockStatus(-1)).toBe('outOfStock');
      expect(getStockStatus(-100)).toBe('outOfStock');
    });
  });

  describe('isStockAvailable', () => {
    it('should return true when stock is greater than 0', () => {
      expect(isStockAvailable(1)).toBe(true);
      expect(isStockAvailable(100)).toBe(true);
    });

    it('should return false when stock is 0', () => {
      expect(isStockAvailable(0)).toBe(false);
    });

    it('should return false when stock is negative', () => {
      expect(isStockAvailable(-1)).toBe(false);
      expect(isStockAvailable(-100)).toBe(false);
    });
  });

  describe('getStockMessage', () => {
    it('should return appropriate message for in-stock items', () => {
      expect(getStockMessage(15)).toBe('15 in stock');
      expect(getStockMessage(100)).toBe('100 in stock');
    });

    it('should return appropriate message for low-stock items', () => {
      expect(getStockMessage(3)).toBe('Only 3 left');
      expect(getStockMessage(1)).toBe('Only 1 left');
    });

    it('should return appropriate message for out-of-stock items', () => {
      expect(getStockMessage(0)).toBe('Out of stock');
    });

    it('should handle negative stock as out of stock', () => {
      expect(getStockMessage(-1)).toBe('Out of stock');
    });
  });
});
