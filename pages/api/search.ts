import { prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const getSearchResults = async (params: string) => {
  return await prisma.recipe.findMany({
    where: {
      title: {
        contains: params,
      },
    },
    select: {
      id: true,
      title: true,
    },
    take: 10,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO find a better way tohandle exception
  const { title } = req.query;
  const searchQuerry = Array.isArray(title) ? title[0] : title || "";

  const searchResults = await getSearchResults(searchQuerry);
  res.status(200).send(searchResults);
}
