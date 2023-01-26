import { prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const getUserName = async (recipeId: string) =>
  await prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
    select: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

const getSavedRecipe = async (recipeId: string, email: string) => {
  const userId = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (!userId) return null;

  const savedRecipe = await prisma.savedRecipe.findUnique({
    where: {
      userId_recipeId: {
        recipeId,
        userId: userId.id,
      },
    },
  });

  return savedRecipe;
};

const saveRecipe = async (recipeId: string, email: string) => {
  return await prisma.savedRecipe.create({
    data: {
      user: { connect: { email } },
      recipe: { connect: { id: recipeId } },
    },
  });
};

const removeRecipe = async (recipeId: string, email: string) => {
  const userId = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (!userId) return null;

  return await prisma.savedRecipe.delete({
    where: {
      userId_recipeId: {
        recipeId,
        userId: userId.id,
      },
    },
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { id } = req.query;

  if (typeof id !== "string")
    return res.status(400).send({ message: "id must be a string." });

  if (!session || !session.user?.name || !session.user?.email) return res.end();
  // return res.status(401).send({ message: "You must be logged in." });

  if (req.method === "GET") {
    const savedRecipe = await getSavedRecipe(id, session.user.email);
    const userName = await getUserName(id);

    if (!savedRecipe)
      return res.status(200).send({ savedRecipe: {}, userName });

    return res.status(200).send({ savedRecipe, userName });
  }

  if (req.method === "PUT") {
    const save = await saveRecipe(id, session.user.email);
    return res.status(201).send({ status: "success" });
  }

  if (req.method === "DELETE") {
    const save = await removeRecipe(id, session.user.email);
    return res.status(201).send({ status: "success" });
  }

  res.end();
};

export default handler;
