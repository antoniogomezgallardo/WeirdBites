/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEnabled, withFeature, filterByFeature } from '../features';

// Mock the features config
jest.mock('@/config/features', () => ({
  features: {
    productPagination: true,
    productFiltering: false,
    shoppingCart: false,
    darkMode: true,
  },
  FeatureFlag: {} as any,
}));

describe('Feature Flag Utilities', () => {
  describe('isEnabled', () => {
    describe('Happy Path', () => {
      it('should return true for enabled feature', () => {
        expect(isEnabled('productPagination' as any)).toBe(true);
      });

      it('should return false for disabled feature', () => {
        expect(isEnabled('productFiltering' as any)).toBe(false);
      });

      it('should return true for another enabled feature', () => {
        expect(isEnabled('darkMode' as any)).toBe(true);
      });

      it('should return false for another disabled feature', () => {
        expect(isEnabled('shoppingCart' as any)).toBe(false);
      });
    });
  });

  describe('withFeature', () => {
    describe('Happy Path', () => {
      it('should execute onEnabled callback when feature is enabled', () => {
        const result = withFeature(
          'productPagination' as any,
          () => 'enabled',
          () => 'disabled'
        );
        expect(result).toBe('enabled');
      });

      it('should execute onDisabled callback when feature is disabled', () => {
        const result = withFeature(
          'productFiltering' as any,
          () => 'enabled',
          () => 'disabled'
        );
        expect(result).toBe('disabled');
      });

      it('should return undefined when feature is disabled and no onDisabled callback', () => {
        const result = withFeature('productFiltering' as any, () => 'enabled');
        expect(result).toBeUndefined();
      });

      it('should handle complex return types', () => {
        const result = withFeature(
          'productPagination' as any,
          () => ({ success: true, data: [1, 2, 3] }),
          () => ({ success: false, data: [] })
        );
        expect(result).toEqual({ success: true, data: [1, 2, 3] });
      });

      it('should only call the appropriate callback', () => {
        const onEnabled = jest.fn(() => 'enabled');
        const onDisabled = jest.fn(() => 'disabled');

        withFeature('productPagination' as any, onEnabled, onDisabled);

        expect(onEnabled).toHaveBeenCalled();
        expect(onDisabled).not.toHaveBeenCalled();
      });

      it('should call onDisabled when feature is off', () => {
        const onEnabled = jest.fn(() => 'enabled');
        const onDisabled = jest.fn(() => 'disabled');

        withFeature('productFiltering' as any, onEnabled, onDisabled);

        expect(onEnabled).not.toHaveBeenCalled();
        expect(onDisabled).toHaveBeenCalled();
      });
    });
  });

  describe('filterByFeature', () => {
    describe('Happy Path', () => {
      it('should keep items without feature flag', () => {
        const items: Array<{ name: string; feature?: any }> = [
          { name: 'Item 1' },
          { name: 'Item 2' },
        ];

        const result = filterByFeature(items);
        expect(result).toEqual(items);
      });

      it('should keep items with enabled features', () => {
        const items = [
          { name: 'Item 1', feature: 'productPagination' as any },
          { name: 'Item 2', feature: 'darkMode' as any },
        ];

        const result = filterByFeature(items);
        expect(result).toHaveLength(2);
        expect(result).toEqual(items);
      });

      it('should filter out items with disabled features', () => {
        const items = [
          { name: 'Item 1', feature: 'productPagination' as any },
          { name: 'Item 2', feature: 'productFiltering' as any },
          { name: 'Item 3', feature: 'shoppingCart' as any },
        ];

        const result = filterByFeature(items);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Item 1');
      });

      it('should handle mixed items (with and without feature flags)', () => {
        const items = [
          { name: 'Item 1' },
          { name: 'Item 2', feature: 'productPagination' as any },
          { name: 'Item 3', feature: 'productFiltering' as any },
          { name: 'Item 4' },
        ];

        const result = filterByFeature(items);
        expect(result).toHaveLength(3);
        expect(result.map(i => i.name)).toEqual(['Item 1', 'Item 2', 'Item 4']);
      });

      it('should handle empty array', () => {
        const result = filterByFeature([]);
        expect(result).toEqual([]);
      });

      it('should not mutate original array', () => {
        const items = [
          { name: 'Item 1', feature: 'productPagination' as any },
          { name: 'Item 2', feature: 'productFiltering' as any },
        ];
        const originalLength = items.length;

        filterByFeature(items);

        expect(items).toHaveLength(originalLength);
      });

      it('should handle complex objects', () => {
        const items = [
          {
            id: 1,
            name: 'Product 1',
            price: 19.99,
            feature: 'productPagination' as any,
          },
          {
            id: 2,
            name: 'Product 2',
            price: 29.99,
            feature: 'shoppingCart' as any,
          },
        ];

        const result = filterByFeature(items);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(1);
      });
    });

    describe('Error Scenarios', () => {
      it('should filter out all items if all features are disabled', () => {
        const items = [
          { name: 'Item 1', feature: 'productFiltering' as any },
          { name: 'Item 2', feature: 'shoppingCart' as any },
        ];

        const result = filterByFeature(items);
        expect(result).toHaveLength(0);
      });
    });
  });
});
