import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";

import { FormStateProps } from "hooks/useUpload";
import { prisma } from "lib/prisma";

import { authOptions } from "./auth/[...nextauth]";

const createRecipe = async (
  email: string,
  body: { data: FormStateProps; imageName: string }
) => {
  const { data, imageName } = body;

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
      imagePath: imageName,
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
              create: directions.map(({ direction }, idx) => {
                return { stepNumber: idx + 1, direction };
              }),
            },
          };
        }),
      },
    },
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method !== "POST")
    return res.status(405).send({ message: "Only POST requests allowed" });

  if (!session || !session.user?.email)
    return res.status(401).send({ message: "You must be logged in." });

  const recipe = await createRecipe(session.user.email, req.body);
  res.status(201).send({ status: "success", recipeId: recipe.id });

  res.end();
};

export default handler;
