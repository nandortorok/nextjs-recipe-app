import { PrismaClient } from "@prisma/client";

import { units, unitConversions, users, recipes } from "./seedData.json";

const prisma = new PrismaClient();

async function main() {
  await prisma.unit.createMany({
    skipDuplicates: true,
    data: units,
  });

  await prisma.conversion.createMany({
    skipDuplicates: true,
    data: unitConversions,
  });

  await prisma.user.createMany({
    data: users,
  });

  for (const recipe of recipes) {
    await prisma.ingredient.createMany({
      data: recipe.ingredients,
    });

    await prisma.recipe.createMany({
      data: recipe.recipes,
    });

    await prisma.section.createMany({
      data: recipe.sections,
    });

    await prisma.sectionIngredient.createMany({
      data: recipe.sectionIngredients,
    });

    await prisma.direction.createMany({
      data: recipe.directions,
    });
  }
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
