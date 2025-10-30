/**
 * Script to update image URLs from .jpg to .png in production database
 * Run with: pnpm tsx scripts/update-image-urls.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Updating image URLs from .jpg to .png...');

  // Update all products
  const result = await prisma.product.updateMany({
    where: {
      imageUrl: {
        contains: '.jpg',
      },
    },
    data: {
      // This will replace .jpg with .png using database string functions
      // Note: Prisma doesn't support REPLACE in updateMany, so we'll do it individually
    },
  });

  console.log(`📊 Found ${result.count} products with .jpg URLs`);

  // Get all products with .jpg URLs
  const products = await prisma.product.findMany({
    where: {
      imageUrl: {
        contains: '.jpg',
      },
    },
  });

  console.log(`🔧 Updating ${products.length} products individually...`);

  // Update each product
  for (const product of products) {
    const newImageUrl = product.imageUrl.replace('.jpg', '.png');
    await prisma.product.update({
      where: { id: product.id },
      data: { imageUrl: newImageUrl },
    });
    console.log(`  ✅ Updated: ${product.name}`);
  }

  console.log('✨ All image URLs updated successfully!');
}

main()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
