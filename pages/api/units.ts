import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "lib/prisma";

const getUnits = async () => {
  return await prisma.unit.findMany();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const units = await getUnits();
  res.status(200).send(units);
};

export default handler;
