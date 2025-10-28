/**
 * @jest-environment node
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const hasDatabase = !!process.env.DATABASE_URL;

// Skip all tests if no database configured
const describeIfDatabase = hasDatabase ? describe : describe.skip;

describeIfDatabase('Seed Data (Integration Tests)', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should seed at least 12 products', async () => {
    const productCount = await prisma.product.count();
    expect(productCount).toBeGreaterThanOrEqual(12);
  });

  it('should have all required fields for each product', async () => {
    const products = await prisma.product.findMany();

    expect(products.length).toBeGreaterThan(0);

    products.forEach(product => {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.description).toBeTruthy();
      expect(product.price).toBeTruthy();
      expect(product.imageUrl).toBeTruthy();
      expect(product.category).toBeTruthy();
      expect(product.origin).toBeTruthy();
      expect(product.stock).toBeGreaterThanOrEqual(0);
      expect(product.createdAt).toBeInstanceOf(Date);
      expect(product.updatedAt).toBeInstanceOf(Date);
    });
  });

  it('should have valid prices as positive decimals', async () => {
    const products = await prisma.product.findMany();

    products.forEach(product => {
      const price = Number(product.price);
      expect(price).toBeGreaterThan(0);
      expect(price).toBeLessThan(1000); // Reasonable upper bound
    });
  });

  // Error scenarios
  it('should have unique product names', async () => {
    const products = await prisma.product.findMany();
    const names = products.map(p => p.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(products.length);
  });

  it('should validate all prices are positive', async () => {
    const products = await prisma.product.findMany();

    // All seeded products should have positive prices
    products.forEach(product => {
      expect(Number(product.price)).toBeGreaterThan(0);
    });
  });
});
