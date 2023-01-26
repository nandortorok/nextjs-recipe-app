import { prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const deleteRecipe = async (recipeId: string) => {
  return await prisma.recipe.delete({
    where: {
      id: recipeId,
    },
    include: {
      featured: true,
    },
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { id } = req.query;

  if (typeof id !== "string")
    return res.status(400).send({ message: "id must be a string." });

  if (!session || !session.user?.name || !session.user?.email)
    return res.status(401).send({ message: "You must be logged in." });

  if (req.method === "DELETE") {
    const recipe = await deleteRecipe(id);
    return res.status(200).send({ status: "success" });
  }

  res.end();
};

export default handler;
