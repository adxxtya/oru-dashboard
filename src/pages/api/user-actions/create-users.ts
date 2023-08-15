import { PrismaClient } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const usersData = req.body;

      const createdUsers = await prisma.user.createMany({
        data: usersData,
      });

      res
        .status(201)
        .json({ message: "Users created successfully", createdUsers });
    } catch (error) {
      console.error("Error creating users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
