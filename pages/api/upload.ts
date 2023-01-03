import { FormStateProps } from "hooks/useUpload";
import { prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "./auth/[...nextauth]";

const creatRecipe = async (email: string, data: FormStateProps) => {
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
    data: {
      user: {
        connect: { email },
      },
      title,
      servings,
      prepTime: prepTime * prepTimeUnit,
      cookTime: cookTime * cookTimeUnit,
      sections: {
        create: sections.map(({ title, ingredients, directions }, id) => {
          return {
            id,
            title,
            sectionIngredients: {
              create: ingredients.map(({ amount, unit, name }) => {
                if (!unit)
                  return {
                    amount,
                    ingredient: {
                      connectOrCreate: {
                        where: { name },
                        create: { name },
                      },
                    },
                  };

                return {
                  amount,
                  unit: {
                    connect: { name: unit },
                  },
                  ingredient: {
                    connectOrCreate: {
                      where: { name },
                      create: { name },
                    },
                  },
                };
              }),
            },
            directions: {
              create: directions.map((direction) => {
                return direction;
              }),
            },
          };
        }),
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
    creatRecipe(session.user.email, req.body);

    res.status(200).send({ status: "success" });
  }

  res.end();
}
