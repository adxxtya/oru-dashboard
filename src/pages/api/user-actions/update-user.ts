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
    imageUrl,
    professionalDetails,
    certificationsArray,
    experienceArray,
    educationArray,
    connections,
  } = await req.body;

  if (emailID) {
    const user = await prisma.user.findUnique({
      where: {
        email: emailID,
      },
      include: {
        experience: true,
        certifications: true,
        education: true,
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

      if (imageUrl) {
        updateData.imageUrl = imageUrl;
        updatedFields.imageUrl = imageUrl;
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

      if (connections.length > 0) {
        updateData.connections = connections;
        updatedFields.connections = connections;
      }

      if (educationArray) {
        const userEducation = user.education || [];
        const sanitizedEducationArray = educationArray.map(
          ({ ...rest }) => rest
        );
        const mergedEducation = [...userEducation, ...sanitizedEducationArray];

        updateData.education = {
          create: sanitizedEducationArray,
        };

        updatedFields.education = mergedEducation;
      }

      if (experienceArray) {
        const userExperience = user.experience || [];
        const sanitizedExperienceArray = experienceArray.map(
          ({ ...rest }) => rest
        );
        const mergedExperience = [
          ...userExperience,
          ...sanitizedExperienceArray,
        ];

        updateData.experience = {
          create: sanitizedExperienceArray,
        };

        updatedFields.experience = mergedExperience;
      }

      if (certificationsArray) {
        const userCertifications = user.certifications || [];
        const sanitizedCertificationsArray = certificationsArray.map(
          ({ ...rest }) => rest
        );
        const mergedCertifications = [
          ...userCertifications,
          ...sanitizedCertificationsArray,
        ];

        updateData.certifications = {
          create: sanitizedCertificationsArray,
        };

        updatedFields.certifications = mergedCertifications;
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
            certifications: true,
            education: true,
            experience: true,
          },
        });
        await redis.set(emailID, JSON.stringify(userCache), "EX", 60);
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
