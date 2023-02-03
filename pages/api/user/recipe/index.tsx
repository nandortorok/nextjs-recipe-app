import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

import { prisma } from "lib/prisma";
import { authOptions } from "pages/api/auth/[...nextauth]";

const getRecipes = async (email: string) => {
  return await prisma.recipe.findMany({
    where: {
      user: { email },
    },
    select: {
      id: true,
      title: true,
      imagePath: true,
      prepTime: true,
      cookTime: true,
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
    orderBy: {
      createdAt: "desc",
    },
    take: 12,
  });
};

export type RecipeProps = Prisma.PromiseReturnType<typeof getRecipes>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method !== "GET")
    return res.status(405).send({ message: "Only GET requests allowed" });

  if (!session || !session?.user?.email) return res.end();

  const recipe = await getRecipes(session.user.email);
  res.status(200).send(recipe);

  res.end();
};

export default handler;
