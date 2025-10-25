import { renderHook } from '@testing-library/react';
import { useFeature, useFeatures } from '../useFeature';

// Mock the features config
jest.mock('@/config/features', () => ({
  features: {
    productFiltering: true,
    productPagination: false,
    shoppingCart: true,
    guestCheckout: false,
  },
  FeatureFlag: {} as unknown,
}));

describe('useFeature', () => {
  it('returns true for enabled features', () => {
    const { result } = renderHook(() => useFeature('productFiltering' as never));
    expect(result.current).toBe(true);
  });

  it('returns false for disabled features', () => {
    const { result } = renderHook(() => useFeature('productPagination' as never));
    expect(result.current).toBe(false);
  });

  it('returns true for another enabled feature', () => {
    const { result } = renderHook(() => useFeature('shoppingCart' as never));
    expect(result.current).toBe(true);
  });

  it('returns false for another disabled feature', () => {
    const { result } = renderHook(() => useFeature('guestCheckout' as never));
    expect(result.current).toBe(false);
  });
});

describe('useFeatures', () => {
  it('returns correct values for multiple features', () => {
    const { result } = renderHook(() =>
      useFeatures(['productFiltering', 'productPagination', 'shoppingCart'] as never[])
    );

    expect(result.current).toEqual({
      productFiltering: true,
      productPagination: false,
      shoppingCart: true,
    });
  });

  it('returns correct values for different feature combination', () => {
    const { result } = renderHook(() =>
      useFeatures(['productPagination', 'guestCheckout'] as never[])
    );

    expect(result.current).toEqual({
      productPagination: false,
      guestCheckout: false,
    });
  });

  it('handles single feature in array', () => {
    const { result } = renderHook(() => useFeatures(['productFiltering'] as never[]));

    expect(result.current).toEqual({
      productFiltering: true,
    });
  });

  it('handles empty array', () => {
    const { result } = renderHook(() => useFeatures([] as never[]));

    expect(result.current).toEqual({});
  });
});
