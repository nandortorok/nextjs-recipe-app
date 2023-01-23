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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title } = req.query;
  const searchQuery = Array.isArray(title) ? title[0] : title || "";

  const searchResults = await getSearchResults(searchQuery);
  res.status(200).send(searchResults);
}
