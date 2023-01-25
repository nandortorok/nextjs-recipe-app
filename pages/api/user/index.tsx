import { FormStateProps } from "hooks/useUpload";
import { prisma } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";

const deleteRecipe = (id: string) => {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await unstable_getServerSession(req, res, authOptions);

  // if (req.method !== "DELETE")
  //   return res.status(405).send({ message: "Only DELETE requests allowed" });

  // if (!session || !session.user?.name)
  //   return res.status(401).send({ message: "You must be logged in." });

  // const recipe = await deleteRecipe(req.body);
  res.status(404).send({ status: "WIP" });

  res.end();
}
