import { Prisma, prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const getSavedRecipes = async (email: string) => {
  return await prisma.savedRecipe.findMany({
    where: {
      user: { email },
    },
    select: {
      recipe: {
        include: {
          sections: {
            include: {
              sectionIngredients: true,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};

export type RecipeProps = Prisma.PromiseReturnType<typeof getSavedRecipes>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user?.name || !session.user?.email)
    return res.status(401).send({ message: "You must be logged in." });

  if (req.method === "GET") {
    const recipes = await getSavedRecipes(session.user.email);

    if (!recipes) return res.status(200).send({});

    return res.status(200).send(recipes);
  }

  res.end();
};

export default handler;
