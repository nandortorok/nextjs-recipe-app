import { Prisma, prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const getSearchResults = async (params: string) => {
  return await prisma.recipe.findMany({
    where: {
      title: {
        contains: params,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      title: true,
      user: {
        select: {
          name: true,
        },
      },
      sections: {
        select: {
          sectionIngredients: {
            select: {
              ingredient: true,
            },
          },
        },
      },
    },
    take: 32,
  });
};

export type RecipeProps = Prisma.PromiseReturnType<typeof getSearchResults>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.query;

  if (typeof title !== "string")
    return res.status(400).send({ message: "title must be a string." });

  const searchResults = await getSearchResults(title);
  res.status(200).send(searchResults);
};

export default handler;
