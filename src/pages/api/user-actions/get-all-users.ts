import { prisma } from "@/server/db";
import { redis } from "@/server/redis";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allUsersData = await redis.get("all-users");

  if (allUsersData) {
    const parsedData = await JSON.parse(allUsersData);
    return res.status(200).json(parsedData);
  }

  const users = await prisma.user.findMany();
  await redis.set("all-users", JSON.stringify(users));
  return res.status(200).json(users);
}
