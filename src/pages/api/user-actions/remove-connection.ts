import { prisma } from "@/server/db";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { myEmail, userEmail } = req.body;

  if (!userEmail) {
    return res.status(400).json({ error: "No userEmail provided." });
  }

  if (!myEmail) {
    return res.status(400).json({ error: "No userEmail provided." });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: myEmail,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const updatedConnections = user.connections.filter(
      (email) => email !== userEmail
    );

    await prisma.user.update({
      where: {
        email: myEmail,
      },
      data: {
        connections: updatedConnections,
      },
    });

    return res
      .status(200)
      .json({ message: "Connection removed successfully." });
  } catch (error) {
    console.error("Error removing connection:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
