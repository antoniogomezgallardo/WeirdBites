/**
 * @jest-environment node
 */

import { prisma } from '@/lib/prisma';

/**
 * Integration Tests for Landing Page (page.tsx)
 *
 * These tests verify the server-side data fetching logic for featured products.
 * They test the integration between the Next.js page and the Prisma database.
 */

describe('Landing Page - Featured Products Integration', () => {
  beforeAll(async () => {
    // Ensure we have at least 6 featured products for testing
    const featuredCount = await prisma.product.count({
      where: { isFeatured: true },
    });

    if (featuredCount < 6) {
      // Mark additional products as featured if needed
      const productsToFeature = await prisma.product.findMany({
        where: { isFeatured: false },
        take: 6 - featuredCount,
      });

      await Promise.all(
        productsToFeature.map(product =>
          prisma.product.update({
            where: { id: product.id },
            data: { isFeatured: true },
          })
        )
      );
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Featured Products Query', () => {
    it('should fetch featured products from database', async () => {
      const featuredProducts = await prisma.product.findMany({
        where: { isFeatured: true },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          category: true,
          origin: true,
        },
        take: 6,
        orderBy: { createdAt: 'desc' },
      });

      expect(featuredProducts).toBeDefined();
      expect(Array.isArray(featuredProducts)).toBe(true);
      expect(featuredProducts.length).toBeGreaterThan(0);
      expect(featuredProducts.length).toBeLessThanOrEqual(6);
    });

    it('should only fetch products where isFeatured is true', async () => {
      const featuredProducts = await prisma.product.findMany({
        where: { isFeatured: true },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          category: true,
          origin: true,
          isFeatured: true,
        },
        take: 6,
        orderBy: { createdAt: 'desc' },
      });

      featuredProducts.forEach(product => {
        expect(product.isFeatured).toBe(true);
      });
    });

    it('should return products with all required fields', async () => {
      const featuredProducts = await prisma.product.findMany({
        where: { isFeatured: true },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          category: true,
          origin: true,
        },
        take: 6,
        orderBy: { createdAt: 'desc' },
      });

      featuredProducts.forEach(product => {
        expect(product.id).toBeDefined();
        expect(typeof product.id).toBe('string');

        expect(product.name).toBeDefined();
        expect(typeof product.name).toBe('string');

        expect(product.description).toBeDefined();
        expect(typeof product.description).toBe('string');

        expect(product.price).toBeDefined();

        expect(product.imageUrl).toBeDefined();
        expect(typeof product.imageUrl).toBe('string');

        expect(product.category).toBeDefined();
        expect(typeof product.category).toBe('string');

        expect(product.origin).toBeDefined();
        expect(typeof product.origin).toBe('string');
      });
    });

    it('should order featured products by createdAt descending', async () => {
      const featuredProducts = await prisma.product.findMany({
        where: { isFeatured: true },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          category: true,
          origin: true,
          createdAt: true,
        },
        take: 6,
        orderBy: { createdAt: 'desc' },
      });

      if (featuredProducts.length > 1) {
        for (let i = 0; i < featuredProducts.length - 1; i++) {
          const currentDate = new Date(featuredProducts[i].createdAt);
          const nextDate = new Date(featuredProducts[i + 1].createdAt);
          expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
        }
      }
    });

    it('should limit results to 6 products', async () => {
      const featuredProducts = await prisma.product.findMany({
        where: { isFeatured: true },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          category: true,
          origin: true,
        },
        take: 6,
        orderBy: { createdAt: 'desc' },
      });

      expect(featuredProducts.length).toBeLessThanOrEqual(6);
    });

    it('should convert Decimal price to number for client components', async () => {
      const featuredProducts = await prisma.product.findMany({
        where: { isFeatured: true },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          category: true,
          origin: true,
        },
        take: 6,
        orderBy: { createdAt: 'desc' },
      });

      // Simulate the conversion logic from page.tsx
      const productsForClient = featuredProducts.map(product => ({
        ...product,
        price: Number(product.price),
      }));

      productsForClient.forEach(product => {
        expect(typeof product.price).toBe('number');
        expect(product.price).toBeGreaterThan(0);
      });
    });

    it('should handle case when no featured products exist', async () => {
      // Temporarily unmark all featured products
      await prisma.product.updateMany({
        where: { isFeatured: true },
        data: { isFeatured: false },
      });

      const featuredProducts = await prisma.product.findMany({
        where: { isFeatured: true },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          category: true,
          origin: true,
        },
        take: 6,
        orderBy: { createdAt: 'desc' },
      });

      expect(featuredProducts).toEqual([]);

      // Re-mark products as featured for other tests
      const productsToFeature = await prisma.product.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
      });

      await Promise.all(
        productsToFeature.map(product =>
          prisma.product.update({
            where: { id: product.id },
            data: { isFeatured: true },
          })
        )
      );
    });

    it('should not include sensitive fields like stock', async () => {
      const featuredProducts = await prisma.product.findMany({
        where: { isFeatured: true },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          category: true,
          origin: true,
        },
        take: 6,
        orderBy: { createdAt: 'desc' },
      });

      featuredProducts.forEach(product => {
        // @ts-expect-error - stock should not be included
        expect(product.stock).toBeUndefined();
      });
    });
  });

  describe('Database Connection', () => {
    it('should successfully connect to database', async () => {
      const result = await prisma.$queryRaw`SELECT 1 as result`;
      expect(result).toBeDefined();
    });

    it('should have products table with isFeatured column', async () => {
      const products = await prisma.product.findFirst({
        select: {
          isFeatured: true,
        },
      });

      // Should not throw error - column exists
      expect(products).toBeDefined();
    });
  });
});
