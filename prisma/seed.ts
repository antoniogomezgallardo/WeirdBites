import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed database with exotic WeirdBites products
 */
async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing products
  await prisma.product.deleteMany();
  console.log('🗑️  Cleared existing products');

  // Seed 15 exotic products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Durian Chips',
        description: 'Crispy chips made from the king of fruits. Love it or hate it!',
        price: 12.99,
        imageUrl: '/images/products/durian-chips.jpg',
        category: 'Snacks',
        origin: 'Thailand',
        stock: 50,
      },
      {
        name: 'Black Garlic Chocolate',
        description:
          'Rich dark chocolate infused with aged black garlic. Surprisingly sweet and savory.',
        price: 15.5,
        imageUrl: '/images/products/black-garlic-chocolate.jpg',
        category: 'Chocolate',
        origin: 'Japan',
        stock: 30,
      },
      {
        name: 'Sriracha Popcorn',
        description: 'Spicy and addictive popcorn with authentic Sriracha seasoning.',
        price: 8.99,
        imageUrl: '/images/products/sriracha-popcorn.jpg',
        category: 'Snacks',
        origin: 'USA',
        stock: 100,
      },
      {
        name: 'Wasabi Peas',
        description: 'Crunchy roasted peas coated with real wasabi. A fiery treat!',
        price: 6.5,
        imageUrl: '/images/products/wasabi-peas.jpg',
        category: 'Snacks',
        origin: 'Japan',
        stock: 75,
      },
      {
        name: 'Salted Egg Yolk Chips',
        description: 'Crispy potato chips with rich salted egg yolk flavor. Umami bomb!',
        price: 9.99,
        imageUrl: '/images/products/salted-egg-chips.jpg',
        category: 'Snacks',
        origin: 'Singapore',
        stock: 60,
      },
      {
        name: 'Matcha Kit Kat',
        description: 'Japanese exclusive Kit Kat with premium matcha green tea flavor.',
        price: 18.0,
        imageUrl: '/images/products/matcha-kitkat.jpg',
        category: 'Chocolate',
        origin: 'Japan',
        stock: 40,
      },
      {
        name: 'Chili Mango Gummies',
        description: 'Sweet and spicy gummies with real mango and chili powder.',
        price: 7.25,
        imageUrl: '/images/products/chili-mango-gummies.jpg',
        category: 'Candy',
        origin: 'Mexico',
        stock: 80,
      },
      {
        name: 'Seaweed Crisps',
        description: 'Paper-thin roasted seaweed sheets. Light, crispy, and full of ocean flavor.',
        price: 5.5,
        imageUrl: '/images/products/seaweed-crisps.jpg',
        category: 'Snacks',
        origin: 'South Korea',
        stock: 90,
      },
      {
        name: 'Yuzu Gummies',
        description: 'Tangy Japanese citrus gummies. Refreshing and uniquely flavored.',
        price: 10.5,
        imageUrl: '/images/products/yuzu-gummies.jpg',
        category: 'Candy',
        origin: 'Japan',
        stock: 45,
      },
      {
        name: 'Tamarind Candy',
        description: 'Sweet, sour, and spicy tamarind candy. A tropical delight!',
        price: 6.99,
        imageUrl: '/images/products/tamarind-candy.jpg',
        category: 'Candy',
        origin: 'Thailand',
        stock: 70,
      },
      {
        name: 'Pocky Matcha',
        description: 'Classic Japanese biscuit sticks coated with matcha chocolate.',
        price: 4.5,
        imageUrl: '/images/products/pocky-matcha.jpg',
        category: 'Snacks',
        origin: 'Japan',
        stock: 120,
      },
      {
        name: 'Dragon Fruit Chips',
        description: 'Freeze-dried dragon fruit chips. Colorful, crunchy, and naturally sweet.',
        price: 11.99,
        imageUrl: '/images/products/dragon-fruit-chips.jpg',
        category: 'Snacks',
        origin: 'Vietnam',
        stock: 35,
      },
      {
        name: 'Lychee Jelly',
        description: 'Delicate lychee-flavored jelly cups. Refreshing dessert.',
        price: 8.5,
        imageUrl: '/images/products/lychee-jelly.jpg',
        category: 'Candy',
        origin: 'Taiwan',
        stock: 55,
      },
      {
        name: 'Kimchi Crackers',
        description: 'Savory crackers with authentic kimchi flavor. Tangy and addictive.',
        price: 7.99,
        imageUrl: '/images/products/kimchi-crackers.jpg',
        category: 'Snacks',
        origin: 'South Korea',
        stock: 65,
      },
      {
        name: 'Mochi Ice Cream Mix',
        description: 'Assorted mochi ice cream balls. Chewy rice cake meets creamy ice cream.',
        price: 19.99,
        imageUrl: '/images/products/mochi-ice-cream.jpg',
        category: 'Dessert',
        origin: 'Japan',
        stock: 25,
      },
    ],
  });

  console.log(`✅ Seeded ${products.count} products`);
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
