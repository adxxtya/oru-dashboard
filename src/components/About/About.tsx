/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  SiTypescript,
  SiRedis,
  SiReact,
  SiServerless,
  SiAuth0,
  SiPrisma,
  SiTailwindcss,
} from "react-icons/si";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdPhonelink } from "react-icons/md";
import { BsImageFill } from "react-icons/bs";
import Image from "next/image";

const AboutComponent = () => {
  return (
    <div className="h-full w-full">
      <div className="pt-16">
        <h1 className="text-5xl text-sky-600"> # Tech Stack</h1>
        <div>
          <div className="flex items-center justify-around">
            <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
              <Image
                src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg"
                alt="nextjs"
                width="200"
                height="200"
              />
            </a>
            <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
              <Image
                src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
                alt="tailwind"
                width="150"
                height="150"
              />
            </a>

            <a href="https://nodejs.org" target="_blank" rel="noreferrer">
              <Image
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg"
                alt="nodejs"
                width="200"
                height="200"
              />
            </a>

            <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">
              <Image
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg"
                alt="mongodb"
                width="150"
                height="150"
              />
            </a>
            <a href="https://redis.io/" target="_blank" rel="noreferrer">
              <Image
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg"
                alt="nodejs"
                width="150"
                height="150"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="pt-16">
        <h1 className="text-5xl text-sky-600"> # Features</h1>
        <Accordion
          type="single"
          className="mt-4"
          collapsible
          defaultValue="item-2"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex gap-x-4 pl-4">
                <SiTypescript color="#007ACC" />
                Typescript Safety
              </div>
            </AccordionTrigger>
            <AccordionContent>
              - I have extensively used Typescript all over the project which
              provides static type checking to help keep the bugs and other
              issues to a minimum.
              <br />- I am also using typescript to check for types and
              environment variables for both the client-side and server.
              <br />- Also modified a little to throw meaningful errors.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex gap-x-4 pl-4">
                <SiRedis color="#D82C20" />
                Redis Caching
              </div>
            </AccordionTrigger>
            <AccordionContent>
              - Redis is being used as the caching layer between the client and
              database for fast data retrieval which in-turn improves user
              experience as a whole. <br />- Data is being updated in the Redis
              Cache everytime the user updates thier information. <br />-
              Currently, I have set-up the expiration of the Redis Cache to
              expire just after 150 seconds, for ease of testing by the
              moderators.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex gap-x-4 pl-4">
                <AiOutlineDashboard color="#00C853" />
                Real-Time Data Update
              </div>
            </AccordionTrigger>
            <AccordionContent>
              - I have implemented logic such that whenever user performs any
              action, the data will be updated to the latest version.
              <br />- Also the UI is only being updated for the region where the
              update was performed, which sustains low memory usage and better
              performance ratio.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex gap-x-4 pl-4">
                <SiReact color="#61DAFB" />
                Single Page Application
              </div>
            </AccordionTrigger>
            <AccordionContent>
              - The whole code follows the Single Page Application Architecture
              inspired by React, but with Next.js we take it to the next level
              by enhancing performance and also maintaining SEO.
              <br />- The page never refreshes even when navigating to other
              links (due to the virtual DOM) providing a better UX to users.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              <div className="flex gap-x-4 pl-4">
                <SiAuth0 color="#EB5424" />
                Strong Authentication
              </div>
            </AccordionTrigger>
            <AccordionContent>
              - The Authentication and Sessions in the project is being
              maintained by the library called Auth.js (formerly NextAuth).
              <br />- NextAuth makes it very easy to integrate Robust
              Authentication Mechanism without any hassle and yet provides
              modification and integration of several different Adapters for
              syncing up the session with the desired database.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              <div className="flex gap-x-4 pl-4">
                <SiServerless color="#8CC84B" />
                Node.js Serverless Functions
              </div>
            </AccordionTrigger>
            <AccordionContent>
              - This Next.js code uses the API Routes provided by Next.js (which
              is just Node.js under the hood). <br /> - Although, I could have
              very well created a stand-alone Node.js server and hosted it
              separately,
              <br /> - I took the liberty to use the backend in the Next.js
              itself because when deploying it to vercel, vercel automatically
              converts the API Routes to Serverless Node.js Functions which is
              great.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>
              <div className="flex gap-x-4 pl-4">
                <SiReact color="#61DAFB" />
                Reusable Components
              </div>
            </AccordionTrigger>
            <AccordionContent>
              - Instead of creating components again and again, I have used
              Reusable Components like Buttons and Modals that stay the same
              throughout the application and one doesn't need to style it every
              time they use the component.
              <br />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>
              <div className="flex gap-x-4 pl-4">
                <BsImageFill color="#12f" />
                Image Hosting & Optimization
              </div>
            </AccordionTrigger>
            <AccordionContent>
              - For hosting images, I am using Supabase which uses Amazon S3
              Buckets under the hood for saving the images.
              <br /> - For Optimizing the Images, I am using the integrated
              Image from the next/image which prefixes a lot of optimization to
              the image coponent.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger>
              <div className="flex gap-x-4 pl-4">
                <MdPhonelink color="#82f" />
                Mobile Responsiveness
              </div>
            </AccordionTrigger>
            <AccordionContent>
              - This is somewhat mobile responsive.
              <br />
              - I have mainly focused on the Accessibility of the code first and
              then the Designing and UI.
              <br />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-10">
            <AccordionTrigger>
              <div className="flex gap-x-4 pl-4">
                <SiTailwindcss color="#38BDF8" />
                Tailiwnd Styling
              </div>
            </AccordionTrigger>
            <AccordionContent>
              - The whole project was styles using TailwindCSS
              <br />
              - The UI is clean and consistent, but I could do a lot better.
              <br />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-11">
            <AccordionTrigger>
              <div className="flex gap-x-4 pl-4">
                <SiPrisma color="#1A202C" />
                Prisma Adapter & Schema
              </div>
            </AccordionTrigger>
            <AccordionContent>
              - In this project, I am using the Prisma Adapter to handle the
              queries to the database.
              <br />
              - I have familiarity with both Mongo Client and Prisma Client, and
              to showcase my skill across various technologies and at the same
              time showing the simplicity of database management, I used prisma
              in this code.
              <br />- You can just check one file i.e. the{" "}
              <a
                href="https://github.com/adxxtya/oru-dashboard/blob/main/prisma/schema.prisma"
                className="text-underline text-red-600"
              >
                schema.prisma
              </a>{" "}
              file in the root of the project and completely understand the
              whole database.{" "}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="pt-16">
        <h1 className="text-5xl text-sky-600"> # Difficulties Faced</h1>
        <div className="mt-4 text-xl text-slate-700">
          <h2>
            - Due to the Robust Authentication, creating several accounts is
            very difficult, as every account will need providers, sessions, etc.
          </h2>
          <h2>
            - Initially, persisting the Redis cache was a difficulty but I
            worked around it and learned a lot in the process.
          </h2>
        </div>
      </div>
      <div className="pt-16">
        <h1 className="text-5xl text-sky-600"> # Additional Images</h1>
        <div className="flex flex-col">
          <div>
            <Image
              src="/mongo.png"
              width={1000}
              height={1000}
              alt="MongoDB"
              className="w-full object-cover"
            />
            <h1 className="p-2 text-center text-lg text-gray-600">
              MongoDB Database
            </h1>
          </div>
          <div>
            <Image
              src="/supabase.png"
              width={1000}
              height={1000}
              alt="Supabase"
              className="w-full object-cover"
            />
            <h1 className="p-2 text-center text-lg text-gray-600">
              Supabase Host
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
