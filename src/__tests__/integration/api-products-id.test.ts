/**
 * @jest-environment node
 */
import { GET } from '@/app/api/products/[id]/route';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();
const hasDatabase = !!process.env.DATABASE_URL;

// Skip all tests if no database configured
const describeIfDatabase = hasDatabase ? describe : describe.skip;

describeIfDatabase('GET /api/products/[id] (Integration Tests)', () => {
  let testProductId: string;

  beforeAll(async () => {
    // Get a real product ID from the database for testing
    const product = await prisma.product.findFirst();
    if (product) {
      testProductId = product.id;
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Happy Path', () => {
    it('should return 200 with product object for valid ID', async () => {
      const request = new NextRequest(`http://localhost:3000/api/products/${testProductId}`);
      const response = await GET(request, { params: { id: testProductId } });

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty('id', testProductId);
    });

    it('should return product matching Product schema with all fields', async () => {
      const request = new NextRequest(`http://localhost:3000/api/products/${testProductId}`);
      const response = await GET(request, { params: { id: testProductId } });

      const data = await response.json();

      // Verify all required fields exist
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

      // Verify field types (price is Decimal, serialized as string in JSON)
      expect(typeof data.id).toBe('string');
      expect(typeof data.name).toBe('string');
      expect(typeof data.description).toBe('string');
      expect(typeof data.imageUrl).toBe('string');
      expect(typeof data.category).toBe('string');
      expect(typeof data.origin).toBe('string');
      expect(typeof data.stock).toBe('number');
    });

    it('should return correct product data for given ID', async () => {
      const request = new NextRequest(`http://localhost:3000/api/products/${testProductId}`);
      const response = await GET(request, { params: { id: testProductId } });

      const data = await response.json();

      // Verify it returns the specific product requested
      expect(data.id).toBe(testProductId);
      expect(data.name).toBeTruthy();
      expect(parseFloat(data.price)).toBeGreaterThan(0); // Price is Decimal, serialized as string
      expect(data.stock).toBeGreaterThanOrEqual(0);
    });

    it('should return valid image URL', async () => {
      const request = new NextRequest(`http://localhost:3000/api/products/${testProductId}`);
      const response = await GET(request, { params: { id: testProductId } });

      const data = await response.json();

      expect(data.imageUrl).toMatch(/^\/images\/products\/.+\.(png|jpg|jpeg)$/);
    });
  });

  describe('Error Scenarios', () => {
    it('should return 404 if product ID not found', async () => {
      const nonExistentId = 'non-existent-product-id-12345';
      const request = new NextRequest(`http://localhost:3000/api/products/${nonExistentId}`);
      const response = await GET(request, { params: { id: nonExistentId } });

      expect(response.status).toBe(404);

      const data = await response.json();
      expect(data).toHaveProperty('error', 'Product not found');
      expect(data).toHaveProperty('productId', nonExistentId);
    });

    it('should return 404 for empty ID', async () => {
      const emptyId = '';
      const request = new NextRequest(`http://localhost:3000/api/products/${emptyId}`);
      const response = await GET(request, { params: { id: emptyId } });

      expect(response.status).toBe(404);

      const data = await response.json();
      expect(data).toHaveProperty('error', 'Product not found');
    });

    it('should return 404 for malformed ID', async () => {
      const malformedId = 'invalid-id-!@#$%^&*()';
      const request = new NextRequest(`http://localhost:3000/api/products/${malformedId}`);
      const response = await GET(request, { params: { id: malformedId } });

      expect(response.status).toBe(404);

      const data = await response.json();
      expect(data).toHaveProperty('error', 'Product not found');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long product ID gracefully', async () => {
      const longId = 'a'.repeat(1000);
      const request = new NextRequest(`http://localhost:3000/api/products/${longId}`);
      const response = await GET(request, { params: { id: longId } });

      // Should return 404, not crash
      expect(response.status).toBe(404);
    });

    it('should return consistent data on multiple requests', async () => {
      const request1 = new NextRequest(`http://localhost:3000/api/products/${testProductId}`);
      const response1 = await GET(request1, { params: { id: testProductId } });
      const data1 = await response1.json();

      const request2 = new NextRequest(`http://localhost:3000/api/products/${testProductId}`);
      const response2 = await GET(request2, { params: { id: testProductId } });
      const data2 = await response2.json();

      // Same product should return identical data
      expect(data1.id).toBe(data2.id);
      expect(data1.name).toBe(data2.name);
      expect(data1.price).toBe(data2.price);
    });
  });
});
