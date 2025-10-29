/**
 * @jest-environment node
 */
import { GET } from '@/app/api/products/route';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();
const hasDatabase = !!process.env.DATABASE_URL;

// Skip all tests if no database configured
const describeIfDatabase = hasDatabase ? describe : describe.skip;

describeIfDatabase('GET /api/products (Integration Tests)', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Happy Path', () => {
    it('should return 200 with array of products', async () => {
      const request = new NextRequest('http://localhost:3000/api/products');
      const response = await GET(request);

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('should return max 12 products by default', async () => {
      const request = new NextRequest('http://localhost:3000/api/products');
      const response = await GET(request);

      const data = await response.json();
      expect(data.length).toBeLessThanOrEqual(12);
    });

    it('should return products matching Product schema', async () => {
      const request = new NextRequest('http://localhost:3000/api/products');
      const response = await GET(request);

      const data = await response.json();
      const product = data[0];

      // Verify all required fields exist
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('imageUrl');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('origin');
      expect(product).toHaveProperty('stock');
      expect(product).toHaveProperty('createdAt');
      expect(product).toHaveProperty('updatedAt');
    });
  });

  describe('Error Scenarios', () => {
    it('should return 400 for invalid limit parameter (negative)', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?limit=-1');
      const response = await GET(request);

      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toHaveProperty('error');
      expect(data.error).toContain('Invalid limit parameter');
    });

    it('should return 400 for invalid limit parameter (too high)', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?limit=101');
      const response = await GET(request);

      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toHaveProperty('error');
      expect(data.error).toContain('Invalid limit parameter');
    });

    it('should return 400 for malformed query parameters (NaN)', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?limit=invalid');
      const response = await GET(request);

      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toHaveProperty('error');
    });
  });

  describe('Pagination', () => {
    it('should return paginated response with metadata', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?page=1&pageSize=6');
      const response = await GET(request);

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty('data');
      expect(data).toHaveProperty('pagination');
      expect(data.pagination).toHaveProperty('currentPage');
      expect(data.pagination).toHaveProperty('totalPages');
      expect(data.pagination).toHaveProperty('totalItems');
      expect(data.pagination).toHaveProperty('pageSize');
    });

    it('should return first page products correctly', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?page=1&pageSize=6');
      const response = await GET(request);

      const data = await response.json();
      expect(data.data.length).toBeLessThanOrEqual(6);
      expect(data.pagination.currentPage).toBe(1);
    });

    it('should return second page products correctly', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?page=2&pageSize=6');
      const response = await GET(request);

      const data = await response.json();
      expect(data.pagination.currentPage).toBe(2);
    });

    it('should respect custom pageSize parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?page=1&pageSize=3');
      const response = await GET(request);

      const data = await response.json();
      expect(data.data.length).toBeLessThanOrEqual(3);
      expect(data.pagination.pageSize).toBe(3);
    });

    it('should return 400 for invalid page number (less than 1)', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?page=0&pageSize=12');
      const response = await GET(request);

      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toHaveProperty('error');
      expect(data.error).toContain('Page must be');
    });

    it('should return 400 for invalid pageSize (too high)', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?page=1&pageSize=101');
      const response = await GET(request);

      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data).toHaveProperty('error');
      expect(data.error).toContain('Page size must be');
    });

    it('should return empty data for page beyond total pages', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?page=999&pageSize=12');
      const response = await GET(request);

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.data).toEqual([]);
      expect(data.pagination.currentPage).toBe(999);
    });
  });
});
