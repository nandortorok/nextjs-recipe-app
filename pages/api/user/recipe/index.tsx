import { Prisma, prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

const getRecipes = async (userName: string) => {
  return await prisma.recipe.findMany({
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
    where: {
      user: {
        name: {
          equals: userName,
        },
      },
    },
    take: 12,
  });
};

export type RecipeProps = Prisma.PromiseReturnType<typeof getRecipes>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method !== "GET")
    return res.status(405).send({ message: "Only GET requests allowed" });

  if (!session || !session?.user?.email)
    return res.status(401).send({ message: "You must be logged in." });

  const recipe = await getRecipes(session.user.name!);
  res.status(200).send(recipe);

  res.end();
};

export default handler;
