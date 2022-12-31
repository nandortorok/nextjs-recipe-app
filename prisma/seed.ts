import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const units = await prisma.unit.createMany({
    skipDuplicates: true,
    data: [
      { id: 1, name: "gram", short: "g" },
      { id: 2, name: "kilogram", short: "kg" },
      { id: 3, name: "ounce", short: "oz" },
      { id: 4, name: "pound", short: "lb" },
      { id: 5, name: "liter", short: "l" },
      { id: 6, name: "milliliter", short: "ml" },
      { id: 7, name: "gallon", short: "gal" },
      { id: 8, name: "quart", short: "qt" },
      { id: 9, name: "pint", short: "pt" },
      { id: 10, name: "cup" },
      { id: 11, name: "tablespoon", short: "tbsp" },
      { id: 12, name: "teaspoon", short: "tsp" },
    ],
  });

  const conversions = await prisma.conversion.createMany({
    skipDuplicates: true,
    data: [
      {
        imperialUnitId: 3,
        imperialAmount: 1,
        metricUnitId: 1,
        metricAmount: 28.35,
      },
      {
        imperialUnitId: 4,
        imperialAmount: 1,
        metricUnitId: 1,
        metricAmount: 453.6,
      },
      {
        imperialUnitId: 7,
        imperialAmount: 1,
        metricUnitId: 5,
        metricAmount: 3.785,
      },
      {
        imperialUnitId: 8,
        imperialAmount: 1,
        metricUnitId: 5,
        metricAmount: 0.95,
      },
      {
        imperialUnitId: 9,
        imperialAmount: 1,
        metricUnitId: 6,
        metricAmount: 480,
      },
      {
        imperialUnitId: 10,
        imperialAmount: 1,
        metricUnitId: 6,
        metricAmount: 240,
      },
      {
        imperialUnitId: 11,
        imperialAmount: 1,
        metricUnitId: 6,
        metricAmount: 15,
      },
      {
        imperialUnitId: 12,
        imperialAmount: 1,
        metricUnitId: 6,
        metricAmount: 5,
      },
    ],
  });

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
          sections: {
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
