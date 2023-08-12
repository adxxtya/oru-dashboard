import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import Card from "../Card/Card";
import { Button } from "../ui/button";
import { GiStarsStack } from "react-icons/gi";
import { IoIosMedal } from "react-icons/io";

const UserProfile = () => {
  const { data: session } = useSession();
  return (
    <div className="flex w-full flex-col font-outfit md:flex-row">
      {/* Left Side */}
      <div className="flex w-full flex-col p-0 md:w-[50%] md:p-8">
        {/* User Photo and Upload */}
        <div className="mt-6 flex justify-between">
          <div>
            <Image
              src={session?.user.image || ""}
              width={1000}
              height={1000}
              className="h-16 w-16 rounded-full md:h-36 md:w-36"
              alt="User Image"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button className="py-2">Upload Photo</Button>
          </div>
        </div>

        {/* User Information */}
        <div className="mt-6">
          <Card>
            <div className="flex w-full flex-col gap-y-8">
              {/* Your Name */}
              <div className="flex w-full flex-col text-black">
                <div className="w-full text-[#1F1F1F] opacity-70">
                  Your Name
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="flex  items-center justify-center text-lg text-[#000]">
                    {session?.user.name}
                  </div>
                  <div className="flex items-center justify-center">
                    <Button onClick={() => {}}>Edit</Button>
                  </div>
                </div>
              </div>
              {/* Email */}
              <div className="flex w-full flex-col text-black">
                <div className="w-full text-[#1F1F1F] opacity-70">Email</div>
                <div className="flex w-full items-center justify-between">
                  <div className="flex  items-center justify-center text-lg text-[#000]">
                    {session?.user.email}
                  </div>
                  <div className="flex items-center justify-center">
                    <Button onClick={() => {}}>Edit</Button>
                  </div>
                </div>
              </div>
              {/* Phone Number */}
              <div className="flex w-full flex-col text-black">
                <div className="w-full text-[#1F1F1F] opacity-70">
                  Phone Number
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="flex  items-center justify-center text-lg text-[#000]">
                    {/* Update Later */}
                    +91 12345789
                  </div>
                  <div className="flex items-center justify-center">
                    <Button onClick={() => {}}>Edit</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* About User */}
        <div className="mt-6">
          <Card>
            <div className="flex flex-col ">
              <div className="flex w-full justify-between">
                <div className="text-2xl text-black">
                  About{" "}
                  <span className="text-[#413B89]">
                    {session?.user.name && session?.user.name.split(" ")[0]}
                  </span>
                </div>
                <div className="">
                  <Button>Edit</Button>
                </div>
              </div>
              <div className="mt-4 text-[#49454F] opacity-80">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                quas commodi quisquam, veritatis perspiciatis consequuntur culpa
                doloribus aliquid obcaecati laudantium non excepturi
              </div>
            </div>
          </Card>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <Card>
            <div className="flex w-full flex-col text-black">
              <div className="flex justify-between">
                <div className="text-2xl ">Skills</div>
                <Button>Edit</Button>
              </div>
              <div className="mt-4 flex flex-col">
                {/* Update Later */}
                <div className="text-md opacity-90">Next JS</div>
                <div className="text-md opacity-90">Mongo DB</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full flex-col p-0 md:w-[50%] md:p-8">
        {/* Professional Details */}
        <div className="mt-6">
          <Card>
            <div className="flex w-full items-center justify-center">
              <div className="flex w-[70%] flex-col">
                <div className="flex justify-between text-2xl text-[#222222] opacity-90">
                  <div>Professional Details</div>
                  <Button>Edit</Button>
                </div>
                <div className="mt-2 text-xl text-[#49454F] opacity-80">
                  {/* Update Later */}
                  This are the professional details shown to users in the app.
                </div>
              </div>
              <div className="flex w-[30%] items-center justify-center">
                <GiStarsStack color="#2684FC" size={75} stroke="#413B89" />
              </div>
            </div>
          </Card>
        </div>

        {/* Certifications */}
        <div className="mt-6">
          <Card className="border-none pt-0  shadow-none ">
            <div className="flex w-full flex-col">
              <div className="flex justify-between">
                <div className="text-2xl text-black">Certifications</div>
                <Button>Edit</Button>
              </div>
              <div className="mt-4">
                <Card className="rounded-full p-1">
                  <div className="flex">
                    <div className="ml-10 flex w-[10%] items-center justify-center">
                      <IoIosMedal color="#FFCE10" size={50} />
                    </div>
                    <div className="flex w-[90%] flex-col items-center justify-center text-[#49454F] opacity-80">
                      <div className="text-3xl ">Python</div>
                      <div className="text-xl">Coding Ninjas</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>

        {/* Experience */}
        <div className="mt-6">
          <Card className="border-none pt-0  shadow-none ">
            <div className="flex w-full flex-col">
              <div className="flex justify-between">
                <div className="text-2xl text-black">Experience</div>
                <Button>Edit</Button>
              </div>
              <div className="mt-4">
                <Card>
                  <div className="flex w-full items-center">
                    <div className="flex w-[80%] flex-col pr-3">
                      <div className="flex justify-between text-xl text-[#222222] opacity-90">
                        <div>7 Years (2014-2021)</div>
                        <div>Full-Time</div>
                      </div>
                      <div className="flex justify-between text-lg text-[#49454F] opacity-80">
                        <div>OruPhones</div>
                        <div>-- Full Stack Dev</div>
                      </div>
                    </div>
                    <div className="w-[20%]">
                      <Image
                        src="/image 13.png"
                        width={100}
                        height={100}
                        className="h-full w-full"
                        alt="Compan Logo"
                      />
                    </div>
                  </div>
                </Card>
              </div>
              <div className="mt-4">
                <Card>
                  <div className="flex w-full items-center">
                    <div className="flex w-[80%] flex-col pr-3">
                      <div className="flex justify-between text-xl text-[#222222] opacity-90">
                        <div>6 Months</div>
                        <div>Intern</div>
                      </div>
                      <div className="flex justify-between text-lg text-[#49454F] opacity-80">
                        <div>OruPhones</div>
                        <div>-- Full Stack Developer</div>
                      </div>
                    </div>
                    <div className="w-[20%]">
                      <Image
                        src="/image 13.png"
                        width={100}
                        height={100}
                        className="h-full w-full"
                        alt="Compan Logo"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>

        {/* Education */}
        <div className="mt-6">
          <Card className="border-none pt-0 shadow-none">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="text-2xl text-black">Education</div>
                <Button>Edit</Button>
              </div>
              <div className="mt-4">
                <Card>
                  <div className="flex flex-col">
                    <div className="text-3xl text-[#413B89]">IIT Hyderabad</div>
                    <div className="flex justify-between p-2 pr-4 text-xl text-black opacity-90">
                      <div className="">(2010-2014)</div>
                      <div className="">Btech</div>
                    </div>
                    <div className="text-[#49454F] opacity-80">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Obcaecati quis sequi, voluptates vitae ipsa nam
                      voluptatibus deserunt ab? Suscipit sit tempore nihil{" "}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
