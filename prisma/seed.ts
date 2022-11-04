import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const egg = await prisma.ingredient.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "egg",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@bobmail.me" },
    update: {},
    create: {
      email: "bob@bobmail.me",
      name: "Bob",
      password: "123",
      role: "USER",
      recipes: {
        create: {
          title: "Scrambled eggs",
          prepTime: 16,
          cookingTime: 4,
          servings: 2,
          recipeSections: {
            create: {
              id: 0,
              ingredients: {
                create: { ingredientId: 1, amount: 3 },
              },
              directions: {
                create: [
                  { stepNumber: 1, direction: "Prepare" },
                  { stepNumber: 2, direction: "Cook" },
                  { stepNumber: 3, direction: "Eat" },
                ],
              },
            },
          },
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
