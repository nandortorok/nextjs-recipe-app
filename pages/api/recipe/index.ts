import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

const getRecipe = async (param: string) => {
  return await prisma.recipe.findUnique({
    where: {
      id: param,
    },
    include: {
      user: true,
      sections: {
        include: {
          sectionIngredients: {
            include: {
              ingredient: true,
              unit: true,
            },
          },
          directions: true,
        },
      },
    },
  });
};

export type RecipeProps = Prisma.PromiseReturnType<typeof getRecipe>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (typeof id !== "string")
    return res.status(400).send({ message: "id must be a string." });

  const recipe = await getRecipe(id);
  res.status(200).send(recipe);
};

export default handler;
