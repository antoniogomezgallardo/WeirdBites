import { render, screen } from '@testing-library/react';
import { ProductGrid } from '../product-grid';

// Mock child components
jest.mock('../loading-skeleton', () => ({
  LoadingSkeleton: ({ count }: { count: number }) => (
    <div data-testid="loading-skeleton">Loading {count} products...</div>
  ),
}));

jest.mock('../product-card', () => ({
  ProductCard: ({ product }: { product: { name: string } }) => (
    <div data-testid="product-card">{product.name}</div>
  ),
}));

jest.mock('../pagination', () => ({
  Pagination: ({ currentPage, totalPages }: { currentPage: number; totalPages: number }) => (
    <div data-testid="pagination">
      Page {currentPage} of {totalPages}
    </div>
  ),
}));

describe('ProductGrid', () => {
  const mockProducts = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 9.99,
      imageUrl: '/img1.jpg',
      category: 'Snacks',
      origin: 'Japan',
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      price: 14.99,
      imageUrl: '/img2.jpg',
      category: 'Candy',
      origin: 'USA',
      stock: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockPaginationInfo = {
    currentPage: 1,
    totalPages: 3,
    totalItems: 30,
    pageSize: 12,
  };

  describe('Happy Path', () => {
    it('shows LoadingSkeleton when loading is true', () => {
      render(
        <ProductGrid
          products={[]}
          loading={true}
          pagination={mockPaginationInfo}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
      expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
    });

    it('shows products when loading is false', () => {
      render(
        <ProductGrid
          products={mockProducts}
          loading={false}
          pagination={mockPaginationInfo}
          onPageChange={() => {}}
        />
      );

      expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
      expect(screen.getAllByTestId('product-card')).toHaveLength(2);
    });

    it('shows pagination controls when totalPages > 1', () => {
      render(
        <ProductGrid
          products={mockProducts}
          loading={false}
          pagination={mockPaginationInfo}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
  });

  describe('Error Scenarios', () => {
    it('shows error message when error prop is passed', () => {
      render(
        <ProductGrid
          products={[]}
          loading={false}
          error="Failed to load products"
          pagination={mockPaginationInfo}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText(/failed to load products/i)).toBeInTheDocument();
      expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
    });

    it('shows "No products found" when products array is empty', () => {
      render(
        <ProductGrid
          products={[]}
          loading={false}
          pagination={{ ...mockPaginationInfo, totalItems: 0 }}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText(/no products found/i)).toBeInTheDocument();
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });

    it('does not show pagination when totalPages is 1', () => {
      render(
        <ProductGrid
          products={mockProducts}
          loading={false}
          pagination={{ ...mockPaginationInfo, totalPages: 1 }}
          onPageChange={() => {}}
        />
      );

      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });

    it('shows error message with retry option', () => {
      render(
        <ProductGrid
          products={[]}
          loading={false}
          error="Network error"
          pagination={mockPaginationInfo}
          onPageChange={() => {}}
        />
      );

      expect(screen.getByText(/network error/i)).toBeInTheDocument();
      // Error message should provide helpful context
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
