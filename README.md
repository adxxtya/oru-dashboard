# Tech Stack

![nextjs](https://cdn.worldvectorlogo.com/logos/nextjs-2.svg)
![tailwind](https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg)
![nodejs](https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg)
![mongodb](https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg)
![redis](https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg)

# Features

<details>
  <summary>Typescript Safety</summary>
  
  - I have extensively used Typescript all over the project which provides static type checking to help keep the bugs and other issues to a minimum.
  - I am also using typescript to check for types and environment variables for both the client-side and server.
  - Also modified a little to throw meaningful errors.
</details>

<details>
  <summary>Redis Caching</summary>
  
  - Redis is being used as the caching layer between the client and database for fast data retrieval which in-turn improves user experience as a whole.
  - Data is being updated in the Redis Cache everytime the user updates thier information.
  - Currently, I have set-up the expiration of the Redis Cache to expire just after 150 seconds, for ease of testing by the moderators.
</details>

<details>
  <summary>Real-Time Data Update</summary>
  
  - I have implemented logic such that whenever user performs any action, the data will be updated to the latest version.
  - Also the UI is only being updated for the region where the update was performed, which sustains low memory usage and better performance ratio.
</details>

<details>
  <summary>Single Page Application</summary>
  
  - The whole code follows the Single Page Application Architecture inspired by React, but with Next.js we take it to the next level by enhancing performance and also maintaining SEO.
  - The page never refreshes even when navigating to other links (due to the virtual DOM) providing a better UX to users.
</details>

<details>
  <summary>Strong Authentication</summary>
  
  - The Authentication and Sessions in the project is being maintained by the library called Auth.js (formerly NextAuth).
  - NextAuth makes it very easy to integrate Robust Authentication Mechanism without any hassle and yet provides modification and integration of several different Adapters for syncing up the session with the desired database.
</details>

<details>
  <summary>Node.js Serverless Functions</summary>
  
  - This Next.js code uses the API Routes provided by Next.js (which is just Node.js under the hood).
  - Although, I could have very well created a stand-alone Node.js server and hosted it separately,
  - I took the liberty to use the backend in the Next.js itself because when deploying it to vercel, vercel automatically converts the API Routes to Serverless Node.js Functions which is great.
</details>

<details>
  <summary>Reusable Components</summary>
  
  - Instead of creating components again and again, I have used Reusable Components like Buttons and Modals that stay the same throughout the application and one doesn't need to style it every time they use the component.
</details>

<details>
  <summary>Image Hosting & Optimization</summary>
  
  - For hosting images, I am using Supabase which uses Amazon S3 Buckets under the hood for saving the images.
  - For Optimizing the Images, I am using the integrated Image from the next/image which prefixes a lot of optimization to the image component.
</details>

<details>
  <summary>Mobile Responsiveness</summary>
  
  - This is somewhat mobile responsive.
  - I have mainly focused on the Accessibility of the code first and then the Designing and UI.
</details>

<details>
  <summary>Tailwind Styling</summary>
  
  - The whole project was styled using TailwindCSS.
  - The UI is clean and consistent, but I could do a lot better.
</details>

<details>
  <summary>Prisma Adapter & Schema</summary>
  
  - In this project, I am using the Prisma Adapter to handle the queries to the database.
  - I have familiarity with both Mongo Client and Prisma Client, and to showcase my skill across various technologies and at the same time showing the simplicity of database management, I used prisma in this code.
  - You can just check one file i.e. the [schema.prisma](https://github.com/adxxtya/oru-dashboard/blob/main/prisma/schema.prisma) file in the root of the project and completely understand the whole database.
</details>

# Difficulties Faced

- Due to the Robust Authentication, creating several accounts is very difficult, as every account will need providers, sessions, etc.
- Initially, persisting the Redis cache was a difficulty but I worked around it and learned a lot in the process.

# Additional Images

![MongoDB Database](/mongo.png)
MongoDB Database

![Supabase Host](/supabase.png)
Supabase Host
