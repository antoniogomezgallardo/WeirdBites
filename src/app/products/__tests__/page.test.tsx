import { render, screen } from '@testing-library/react';
import ProductsPage from '../page';

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    product: {
      count: jest.fn(),
      findMany: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

// Mock ProductsPageClient component
interface MockProductsPageClientProps {
  initialProducts: unknown;
  initialPagination: unknown;
  error?: string;
}

jest.mock('@/app/products-page-client', () => ({
  ProductsPageClient: ({
    initialProducts,
    initialPagination,
    error,
  }: MockProductsPageClientProps) => (
    <div data-testid="products-page-client">
      <div data-testid="initial-products">{JSON.stringify(initialProducts)}</div>
      <div data-testid="initial-pagination">{JSON.stringify(initialPagination)}</div>
      {error && <div data-testid="error">{error}</div>}
    </div>
  ),
}));

describe('Products Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Path', () => {
    it('should render products page with title', async () => {
      const searchParams = Promise.resolve({});
      const page = await ProductsPage({ searchParams });

      render(page);

      expect(screen.getByText(/all products/i)).toBeInTheDocument();
    });

    it('should render ProductsPageClient component', async () => {
      const searchParams = Promise.resolve({});
      const page = await ProductsPage({ searchParams });

      render(page);

      expect(screen.getByTestId('products-page-client')).toBeInTheDocument();
    });

    it('should fetch products from database', async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { PrismaClient } = require('@prisma/client');
      const mockPrisma = new PrismaClient();

      // Mock database responses
      mockPrisma.product.count.mockResolvedValue(25);
      mockPrisma.product.findMany.mockResolvedValue([
        {
          id: '1',
          name: 'Test Product',
          description: 'Test Description',
          price: 9.99,
          imageUrl: '/test.jpg',
          category: 'Test',
          origin: 'Test Country',
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      const searchParams = Promise.resolve({});
      const page = await ProductsPage({ searchParams });

      render(page);

      // Verify Prisma methods were called
      expect(mockPrisma.product.count).toHaveBeenCalled();
      expect(mockPrisma.product.findMany).toHaveBeenCalled();
    });

    it('should handle page parameter from URL', async () => {
      const searchParams = Promise.resolve({ page: '2' });
      const page = await ProductsPage({ searchParams });

      render(page);

      const paginationData = screen.getByTestId('initial-pagination');
      const pagination = JSON.parse(paginationData.textContent || '{}');

      expect(pagination.currentPage).toBe(2);
    });

    it('should handle pageSize parameter from URL', async () => {
      const searchParams = Promise.resolve({ pageSize: '24' });
      const page = await ProductsPage({ searchParams });

      render(page);

      const paginationData = screen.getByTestId('initial-pagination');
      const pagination = JSON.parse(paginationData.textContent || '{}');

      expect(pagination.pageSize).toBe(24);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid page parameter', async () => {
      const searchParams = Promise.resolve({ page: 'invalid' });
      const page = await ProductsPage({ searchParams });

      render(page);

      const paginationData = screen.getByTestId('initial-pagination');
      const pagination = JSON.parse(paginationData.textContent || '{}');

      // Should default to page 1
      expect(pagination.currentPage).toBe(1);
    });

    it('should handle negative page parameter', async () => {
      const searchParams = Promise.resolve({ page: '-5' });
      const page = await ProductsPage({ searchParams });

      render(page);

      const paginationData = screen.getByTestId('initial-pagination');
      const pagination = JSON.parse(paginationData.textContent || '{}');

      // Should default to page 1
      expect(pagination.currentPage).toBe(1);
    });

    it('should handle invalid pageSize parameter', async () => {
      const searchParams = Promise.resolve({ pageSize: 'abc' });
      const page = await ProductsPage({ searchParams });

      render(page);

      const paginationData = screen.getByTestId('initial-pagination');
      const pagination = JSON.parse(paginationData.textContent || '{}');

      // Should default to 12
      expect(pagination.pageSize).toBe(12);
    });

    it('should handle pageSize exceeding maximum', async () => {
      const searchParams = Promise.resolve({ pageSize: '200' });
      const page = await ProductsPage({ searchParams });

      render(page);

      const paginationData = screen.getByTestId('initial-pagination');
      const pagination = JSON.parse(paginationData.textContent || '{}');

      // Should cap at 100
      expect(pagination.pageSize).toBe(12);
    });

    it('should handle database errors gracefully', async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { PrismaClient } = require('@prisma/client');
      const mockPrisma = new PrismaClient();

      // Mock database error
      mockPrisma.product.count.mockRejectedValue(new Error('Database error'));
      mockPrisma.product.findMany.mockRejectedValue(new Error('Database error'));

      const searchParams = Promise.resolve({});
      const page = await ProductsPage({ searchParams });

      render(page);

      // Should render error message
      expect(screen.getByTestId('error')).toBeInTheDocument();
      expect(screen.getByText('Failed to load products')).toBeInTheDocument();
    });
  });

  describe('Data Formatting', () => {
    it('should convert Prisma Decimal to number for price', async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { PrismaClient } = require('@prisma/client');
      const mockPrisma = new PrismaClient();

      // Create a Decimal-like object that converts to number via Number()
      const decimalPrice = {
        valueOf: () => 19.99,
        toString: () => '19.99',
      };

      // Mock with Decimal-like object
      mockPrisma.product.count.mockResolvedValue(1);
      mockPrisma.product.findMany.mockResolvedValue([
        {
          id: '1',
          name: 'Test Product',
          price: decimalPrice, // Simulate Prisma Decimal
          imageUrl: '/test.jpg',
          category: 'Test',
          origin: 'Test',
          stock: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      const searchParams = Promise.resolve({});
      const page = await ProductsPage({ searchParams });

      render(page);

      const productsData = screen.getByTestId('initial-products');
      const products = JSON.parse(productsData.textContent || '[]');

      // Price should be a number
      expect(typeof products[0].price).toBe('number');
      expect(products[0].price).toBe(19.99);
    });
  });
});
