import { prisma } from "@/server/db";
import { redis } from "@/server/redis";
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
      include: {
        certifications: true,
        experience: true,
        education: true,
      },
    });

    if (user) {
      await redis.set(emailID, JSON.stringify(user), "EX", 60);
      return res.status(200).json(user);
    } else {
      throw new Error("User does not exists in the database.");
    }
  } else {
    throw new Error("No Email ID by user provided.");
  }
}
