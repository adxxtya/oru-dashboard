import { prisma } from "@/server/db";
import { redis } from "@/server/redis";
import { type NextApiRequest, type NextApiResponse } from "next";
import { set } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    name,
    phone,
    emailID,
    about,
    skills,
    professionalDetails,
    certifications,
    experience,
    education,
    connections,
  } = await req.body;

  console.log(" ~!*&!~ ", emailID);

  if (emailID) {
    const user = await prisma.user.findUnique({
      where: {
        email: emailID,
      },
      include: {
        certifications,
      },
    });

    if (user) {
      const updateData: any = {};
      const updatedFields: any = {};

      if (name) {
        updateData.name = name;
        updatedFields.name = name;
      }

      if (phone) {
        updateData.phone = phone;
        updatedFields.phone = phone;
      }

      if (about) {
        updateData.about = about;
        updatedFields.about = about;
      }

      if (skills.length > 0) {
        const userSkills = user.skills || [];

        const mergedSkills = [...userSkills, ...skills];

        updateData.skills = mergedSkills;
        updatedFields.skills = mergedSkills;
      }

      if (professionalDetails) {
        updateData.professionalDetails = professionalDetails;
        updatedFields.professionalDetails = professionalDetails;
      }

      if (certifications.length > 0) {
        const userCertifications = user.certifications || [];
        const mergedCertifications = [...userCertifications, ...certifications];

        updateData.certifications = mergedCertifications;
        updatedFields.certifications = mergedCertifications;
      }

      if (experience.length > 0) {
        updateData.experience = experience;
        updatedFields.experience = experience;
      }

      if (education.length > 0) {
        updateData.education = education;
        updatedFields.education = education;
      }

      if (connections.length > 0) {
        updateData.connections = connections;
        updatedFields.connections = connections;
      }

      if (Object.keys(updateData).length > 0) {
        await prisma.user.update({
          where: {
            email: emailID,
          },
          data: updateData,
        });
        res.status(200).json(updatedFields);
        const userCache = await prisma.user.findUnique({
          where: {
            email: emailID,
          },
          include: {
            certifications,
          },
        });
        await redis.set(emailID, JSON.stringify(userCache));
      } else {
        console.log("No fields to update.");
        res.status(400).json({ error: "No fields to update." });
      }
    } else {
      throw new Error("User was not found in the Database.");
    }
  } else {
    throw new Error("No Email ID by user provided.");
  }
}
