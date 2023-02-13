import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "lib/prisma";

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
    take: 16,
  });
};

export type IngredientProps = Prisma.PromiseReturnType<typeof getIngredients>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;
  if (typeof name !== "string")
    return res.status(400).send({ message: "name must be a string." });

  const searchResults = await getIngredients(name);
  res.status(200).send(searchResults);
};

export default handler;
