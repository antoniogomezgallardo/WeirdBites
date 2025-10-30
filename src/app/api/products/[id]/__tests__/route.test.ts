/**
 * @jest-environment node
 */
import { GET } from '../route';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    product: {
      findUnique: jest.fn(),
    },
  },
}));

describe('GET /api/products/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with product object for valid ID', async () => {
    // Arrange
    const mockProduct = {
      id: 'test-product-id',
      name: 'Test Product',
      description: 'Test description',
      price: 9.99,
      imageUrl: '/images/products/test.png',
      category: 'Test',
      origin: 'Test Origin',
      stock: 10,
      createdAt: new Date('2025-10-30'),
      updatedAt: new Date('2025-10-30'),
    };

    (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

    const request = new NextRequest('http://localhost:3000/api/products/test-product-id');
    const params = { id: 'test-product-id' };

    // Act
    const response = await GET(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data).toEqual({
      ...mockProduct,
      createdAt: '2025-10-30T00:00:00.000Z',
      updatedAt: '2025-10-30T00:00:00.000Z',
    });
    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { id: 'test-product-id' },
    });
  });

  it('should return product matching expected schema with all fields present', async () => {
    // Arrange
    const mockProduct = {
      id: 'schema-test-id',
      name: 'Schema Test Product',
      description: 'Testing schema fields',
      price: 15.99,
      imageUrl: '/images/products/schema-test.png',
      category: 'Snacks',
      origin: 'USA',
      stock: 25,
      createdAt: new Date('2025-10-30'),
      updatedAt: new Date('2025-10-30'),
    };

    (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

    const request = new NextRequest('http://localhost:3000/api/products/schema-test-id');
    const params = { id: 'schema-test-id' };

    // Act
    const response = await GET(request, { params });
    const data = await response.json();

    // Assert - Verify all required fields exist
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('description');
    expect(data).toHaveProperty('price');
    expect(data).toHaveProperty('imageUrl');
    expect(data).toHaveProperty('category');
    expect(data).toHaveProperty('origin');
    expect(data).toHaveProperty('stock');
    expect(data).toHaveProperty('createdAt');
    expect(data).toHaveProperty('updatedAt');
  });

  it('should return correct product for given ID', async () => {
    // Arrange
    const productId = 'unique-product-123';
    const mockProduct = {
      id: productId,
      name: 'Unique Product',
      description: 'Unique description',
      price: 19.99,
      imageUrl: '/images/products/unique.png',
      category: 'Unique',
      origin: 'Unique Origin',
      stock: 5,
      createdAt: new Date('2025-10-30'),
      updatedAt: new Date('2025-10-30'),
    };

    (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

    const request = new NextRequest(`http://localhost:3000/api/products/${productId}`);
    const params = { id: productId };

    // Act
    const response = await GET(request, { params });
    const data = await response.json();

    // Assert - Verify it returns the specific product requested
    expect(data.id).toBe(productId);
    expect(data.name).toBe('Unique Product');
    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { id: productId },
    });
  });

  it('should return 404 if product ID not found', async () => {
    // Arrange
    const nonExistentId = 'non-existent-id';
    (prisma.product.findUnique as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest(`http://localhost:3000/api/products/${nonExistentId}`);
    const params = { id: nonExistentId };

    // Act
    const response = await GET(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(404);
    expect(data).toEqual({
      error: 'Product not found',
      productId: nonExistentId,
    });
    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { id: nonExistentId },
    });
  });
});
