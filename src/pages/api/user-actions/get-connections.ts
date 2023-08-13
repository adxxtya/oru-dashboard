import { prisma } from "@/server/db";
import { redis } from "@/server/redis";
import { type User } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { emailID } = req.body;

  if (emailID) {
    const user = await prisma.user.findUnique({
      where: {
        email: emailID,
      },
    });

    if (user) {
      return res.status(200).json(user);
    }
  } else {
    throw new Error("No Email ID by user provided.");
  }
}
