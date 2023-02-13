import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "lib/prisma";

const getFeatured = async () => {
  return await prisma.featured.findMany({
    include: {
      recipe: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
          sections: {
            select: {
              sectionIngredients: true,
            },
          },
        },
      },
    },
    take: 9,
  });
};

export type RecipeProps = Prisma.PromiseReturnType<typeof getFeatured>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const searchResults = await getFeatured();
  res.status(200).send(searchResults);
};

export default handler;
