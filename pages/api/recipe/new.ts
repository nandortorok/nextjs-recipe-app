import { Prisma, prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

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
    orderBy: {
      createdAt: "desc",
    },
    take: 9,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchResults = await getFeatured();
  res.status(200).send(searchResults);
}
