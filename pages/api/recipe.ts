import { prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const getRecipe = async (param: string) => {
  return await prisma.recipe.findUnique({
    where: {
      id: parseInt(param),
    },
    include: {
      user: true,
      sections: {
        include: {
          ingredients: {
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const parsedId = Array.isArray(id) ? id[0] : id || "";

  const recipe = await getRecipe(parsedId);

  res.status(200).send(recipe);
};

export default handler;
