import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import formidable from "formidable";

import { authOptions } from "./auth/[...nextauth]";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method !== "POST")
    return res.status(405).send({ message: "Only POST requests allowed" });

  if (!session)
    return res.status(401).send({ message: "You must be logged in." });

  const form = formidable({
    uploadDir: "public/img",
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).send({ status: "failed", error: err });

    res.status(200).send({ status: "success", data: files.file });
    res.end();
  });
};

export default handler;
