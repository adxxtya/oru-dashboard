import { prisma } from "@/server/db";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { myEmail, userEmail } = req.body;

  if (!userEmail || !myEmail) {
    return res.status(400).json({ error: "Invalid data provided." });
  }

  try {
    const myUser = await prisma.user.findUnique({
      where: {
        email: myEmail,
      },
    });

    const otherUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!myUser || !otherUser) {
      return res.status(404).json({ error: "User not found." });
    }

    const updatedMyConnections = myUser.connections.includes(userEmail)
      ? myUser.connections
      : [...myUser.connections, userEmail];

    const updatedOtherConnections = otherUser.connections.includes(myEmail)
      ? otherUser.connections
      : [...otherUser.connections, myEmail];

    await prisma.user.update({
      where: {
        email: myEmail,
      },
      data: {
        connections: updatedMyConnections,
      },
    });

    await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        connections: updatedOtherConnections,
      },
    });

    return res.status(200).json({ message: "Connection added successfully." });
  } catch (error) {
    console.error("Error adding connection:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
