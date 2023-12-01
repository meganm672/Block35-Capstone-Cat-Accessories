const prisma = require("./client");
const { faker } = require("@faker-js/faker");
const catProducts = require("./catProducts");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 5;

async function seed() {
  console.log("Seeding the database.");
  try {
    // Clear the database
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();

    const catProduct = await Promise.all(
      catProducts.map(catProd =>
        prisma.product.create({
          data: {
            name: catProd.name,
            detail: catProd.detail,
            price: catProd.price,
            imageUrl: catProd.imageUrl,
            category: catProd.category
          }
        })
      ));

    //create cart with users and cart items
    await Promise.all(
      [...Array(5)].map(async (_, i) => {
      const hashedPassword = await bcrypt.hash(faker.internet.password(), SALT_ROUNDS);
  
        return prisma.cart.create({
          data: {
            user: {
              create: {
                username: faker.internet.userName(),
                password: hashedPassword,
                name: faker.person.fullName(),
                admin: i % 2 !== 0,
              }
            },
            cartItems: {
              create: [
                { quantity: 5, product: { connect: { id: catProduct[0].id } } },
                { quantity: 4, product: { connect: { id: catProduct[1].id } } },
                { quantity: 3, product: { connect: { id: catProduct[2].id } } }
              ]
            }
          },
        })
      }
      )
    );

    //create cart without users so we can use it for guest checkout
    await Promise.all(
      [...Array(5)].map((_, i) =>
        prisma.cart.create({
          data: {
            cartItems: {
              create: [
                { quantity: 5, product: { connect: { id: catProduct[27].id } } },
                { quantity: 4, product: { connect: { id: catProduct[37].id } } },
                { quantity: 3, product: { connect: { id: catProduct[50].id } } }
              ]
            }
          },
        })
      )
    );

    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  }
}
seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

