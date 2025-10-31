import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function markFeaturedProducts() {
  try {
    // Get 6 random products
    const products = await prisma.product.findMany({
      take: 6,
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`Found ${products.length} products to mark as featured`);

    // Mark them as featured
    for (const product of products) {
      await prisma.product.update({
        where: { id: product.id },
        data: { isFeatured: true },
      });
      console.log(`✓ Marked "${product.name}" as featured`);
    }

    console.log('\n✅ Successfully marked 6 products as featured!');
  } catch (error) {
    console.error('Error marking products as featured:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

markFeaturedProducts();
