import { Prisma } from "@prisma/client";
import { prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const getSearchResults = async (params: string) => {
  return await prisma.recipe.findMany({
    where: {
      title: {
        contains: params,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      title: true,
      user: {
        select: {
          name: true,
        },
      },
      sections: {
        select: {
          sectionIngredients: {
            select: {
              ingredient: true,
            },
          },
        },
      },
    },
    take: 32,
  });
};

const getIngredients = async (params: string) => {
  return await prisma.ingredient.findMany({
    where: {
      name: {
        contains: params,
        mode: "insensitive",
      },
    },
    include: {
      sectionIngredients: {
        distinct: ["sectionRecipeId"],
        include: {
          section: {
            include: {
              recipe: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      },
    },
    take: 32,
  });
};

export type RecipeProps = Prisma.PromiseReturnType<typeof getSearchResults>;
export type IngredientProps = Prisma.PromiseReturnType<typeof getIngredients>;

export type SearchProps = {
  recipes: RecipeProps;
  ingredients: IngredientProps;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.query;

  if (typeof title !== "string")
    return res.status(400).send({ message: "title must be a string." });

  const recipes = await getSearchResults(title);
  const ingredients = await getIngredients(title);
  res.status(200).send({ recipes, ingredients });
};

export default handler;
