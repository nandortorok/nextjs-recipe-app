import { Prisma, prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const getIngredients = async (params: string) => {
  return await prisma.ingredient.findMany({
    where: {
      name: {
        contains: params,
        mode: "insensitive",
      },
    },
    include: {
      sectionIngredients: {
        distinct: ["sectionRecipeId"],
        include: {
          section: {
            include: {
              recipe: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      },
    },
    take: 32,
  });
};

export type IngredientProps = Prisma.PromiseReturnType<typeof getIngredients>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query;
  const searchQuery = Array.isArray(name) ? name[0] : name || "";

  const searchResults = await getIngredients(searchQuery);
  res.status(200).send(searchResults);
}
