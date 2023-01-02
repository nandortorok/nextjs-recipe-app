import { FormStateProps } from "hooks/useUpload";
import { prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const getUserId = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
};

const creatRecipe = async (userId: string, data: FormStateProps) => {
  const {
    title,
    servings,
    cookTime,
    cookTimeUnit,
    prepTime,
    prepTimeUnit,
    sections,
  } = data;

  return await prisma.recipe.create({
    include: {
      sections: {
        include: {
          sectionIngredients: {
            include: {
              ingredient: true,
              unit: true,
            },
          },
          directions: true,
        },
      },
    },
    data: {
      userId,
      title,
      servings,
      prepTime: prepTime * prepTimeUnit,
      cookTime: cookTime * cookTimeUnit,
      sections: {
        create: {
          id: 0,
          title: "Main",
          directions: { create: { direction: "1st test direction" } },
          sectionIngredients: {
            create: {
              ingredient: {
                connectOrCreate: {
                  where: { name: "TestIng" },
                  create: { name: "TestIng" },
                },
              },
              unit: {
                connect: { name: "gram" },
              },
              amount: 250,
            },
          },
        },
      },
    },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  if (!session) {
    res.status(401).send({ message: "You must be logged in." });
    return;
  }

  if (session && session.user?.email) {
    const userId = await getUserId(session.user?.email);
    userId?.id && creatRecipe(userId.id, req.body);

    res.status(200).send({ status: "success" });
  }

  res.end();
}
