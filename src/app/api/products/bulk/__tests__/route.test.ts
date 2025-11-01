/**
 * Bulk Products API Route Tests
 *
 * Tests for GET /api/products/bulk endpoint
 * Purpose: Fetch multiple products by IDs for cart display
 *
 * TDD Phase: RED (tests written first, should fail)
 */

import { GET } from '../route';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    product: {
      findMany: jest.fn(),
    },
  },
}));

/**
 * Helper to create mock NextRequest for testing
 * Works around Jest's lack of Web API support
 * @param url - Full URL including query parameters
 */
function createMockRequest(url: string): NextRequest {
  return {
    url,
    method: 'GET',
    headers: new Map(),
  } as unknown as NextRequest;
}

describe('GET /api/products/bulk', () => {
  const mockProducts = [
    {
      id: 'product-1',
      name: 'Ghost Pepper Chocolate',
      description: 'Spicy dark chocolate',
      price: 8.99,
      imageUrl: '/images/products/ghost-pepper-chocolate.jpg',
      category: 'Chocolate',
      origin: 'Mexico',
      stock: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'product-2',
      name: 'Wasabi Kit Kat',
      description: 'Japanese wasabi flavored Kit Kat',
      price: 12.99,
      imageUrl: '/images/products/wasabi-kit-kat.jpg',
      category: 'Candy',
      origin: 'Japan',
      stock: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Path', () => {
    it('should return products for valid IDs', async () => {
      // Arrange
      (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

      const request = createMockRequest(
        'http://localhost:3000/api/products/bulk?ids=product-1,product-2'
      );

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.products).toHaveLength(2);
      expect(data.products[0]).toMatchObject({
        id: 'product-1',
        name: 'Ghost Pepper Chocolate',
        price: 8.99,
        stock: 15,
      });
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: ['product-1', 'product-2'],
          },
        },
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          stock: true,
        },
      });
    });

    it('should return empty array if no IDs match', async () => {
      // Arrange
      (prisma.product.findMany as jest.Mock).mockResolvedValue([]);

      const request = createMockRequest(
        'http://localhost:3000/api/products/bulk?ids=non-existent-id'
      );

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.products).toEqual([]);
    });

    it('should handle duplicate IDs (deduplicates automatically)', async () => {
      // Arrange
      (prisma.product.findMany as jest.Mock).mockResolvedValue([mockProducts[0]]);

      const request = createMockRequest(
        'http://localhost:3000/api/products/bulk?ids=product-1,product-1,product-1'
      );

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.products).toHaveLength(1);
      // Prisma should receive deduplicated IDs
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: ['product-1'], // Deduplicated
          },
        },
        select: expect.any(Object),
      });
    });

    it('should handle single ID', async () => {
      // Arrange
      (prisma.product.findMany as jest.Mock).mockResolvedValue([mockProducts[0]]);

      const request = createMockRequest('http://localhost:3000/api/products/bulk?ids=product-1');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.products).toHaveLength(1);
    });
  });

  describe('Error Scenarios', () => {
    it('should return 400 if ids param is missing', async () => {
      // Arrange
      const request = createMockRequest('http://localhost:3000/api/products/bulk');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBe("Missing 'ids' query parameter");
      expect(prisma.product.findMany).not.toHaveBeenCalled();
    });

    it('should return 400 if ids param is empty string', async () => {
      // Arrange
      const request = createMockRequest('http://localhost:3000/api/products/bulk?ids=');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBe("Missing 'ids' query parameter");
    });

    it('should return 500 on database error', async () => {
      // Arrange
      (prisma.product.findMany as jest.Mock).mockRejectedValue(
        new Error('Database connection failed')
      );

      const request = createMockRequest('http://localhost:3000/api/products/bulk?ids=product-1');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch products');
    });
  });

  describe('Performance & Security', () => {
    it('should limit maximum number of IDs to prevent abuse', async () => {
      // Arrange: Generate 101 IDs (exceeds limit of 100)
      const manyIds = Array.from({ length: 101 }, (_, i) => `product-${i}`).join(',');
      const request = createMockRequest(`http://localhost:3000/api/products/bulk?ids=${manyIds}`);

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toContain('Maximum 100 products');
    });

    it('should only return selected fields for security', async () => {
      // Arrange
      (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

      const request = createMockRequest('http://localhost:3000/api/products/bulk?ids=product-1');

      // Act
      await GET(request);

      // Assert: Verify we only select necessary fields
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: expect.any(Object),
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          stock: true,
          // NOT selecting: description, category, origin, createdAt, updatedAt
        },
      });
    });
  });
});
