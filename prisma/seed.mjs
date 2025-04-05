import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Generate 5 users
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        image: faker.image.avatar(),
        loyaltyPoints: faker.number.int({ min: 0, max: 1000 }),
        addresses: {
          create: [
            {
              street: faker.location.streetAddress(),
              city: faker.location.city(),
              state: faker.location.state(),
              country: faker.location.country(),
              zipCode: faker.location.zipCode(),
            },
          ],
        },
      },
    });
    users.push(user);
  }

  console.log("Created users:", users);

  // Generate 10 products
  const products = [];
  for (let i = 0; i < 10; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        collection: faker.commerce.department(),
        images: [faker.image.url()],
        description: faker.commerce.productDescription(),
        material: faker.commerce.productMaterial(),
        washcare: faker.lorem.sentence(),
        shipping: faker.lorem.sentence(),
        tags: [
          faker.commerce.productAdjective(),
          faker.commerce.productMaterial(),
        ],
        stock: faker.number.int({ min: 0, max: 100 }),
        sizes: ["S", "M", "L", "XL"],
        keyFeatures: [faker.lorem.words(3), faker.lorem.words(5)],
      },
    });
    products.push(product);
  }

  console.log("Created products:", products);

  // Add products to wishlists for each user
  for (const user of users) {
    await prisma.wishlist.create({
      data: {
        user: { connect: { id: user.id } },
        products: {
          connect: products.map((product) => ({ id: product.id })),
        },
      },
    });
  }

  console.log("Populated wishlists with products.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
