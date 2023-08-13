import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { Button } from "../ui/button";
import { GiStarsStack } from "react-icons/gi";
import { IoIosMedal } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "../ui/use-toast";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { Input } from "../ui/input";

const UserProfile = () => {
  let emailID;
  const { data: session } = useSession();
  console.log("Session", session);
  const { toast } = useToast();
  const [tabValue, setTabValue] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [emailId, setEmailId] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [userUpdated, setUserUpdated] = useState(true);
  const [userDataFetched, setUserDataFetched] = useState(false);
  const [newSkill, setNewSkill] = useState<any>("");
  if (session?.user.email) {
    emailID = session.user.email;
  }
  const [userDetails, setUserDetails] = useState<any>({
    name: "",
    phone: "",
    emailID: emailID,
    about: "",
    skills: [],
    professionalDetails: "",
    certifications: [],
    experience: [],
    education: [],
    connections: [],
    imageUrl: "",
  });

  async function updateUserData() {
    if (session?.user.email) {
      setLoading(true);
      const updatedUserDetails = {
        ...userDetails,
        emailID: session?.user.email,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-actions/update-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserDetails),
        }
      );

      if (response.ok) {
        setUserUpdated(!userUpdated);
        const data = await response.json();
        const updatedField: any = Object.keys(data)[0];
        const updatedValue = data[updatedField];
        toast({
          title: `Updated ${updatedField} Successfully!`,
          description: `Your ${updatedField} was changed to "${updatedValue}".`,
        });
      } else {
        console.log("Response status:", response.status);
      }
      setLoading(false);
    }
  }

  async function getUserData() {
    setLoading(true);
    if (session?.user.email) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-actions/get-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailID: session?.user.email,
          }),
        }
      );

      const data = await response.json();
      if (typeof data === "string") {
        const userData = JSON.parse(data);
        setUserData(userData);
      } else {
        setUserData(data);
      }

      setUserUpdated(true);
      setLoading(false);
      setUserDataFetched(true);
    } else {
      setUserDataFetched(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserData();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user) {
      getUserData();
    }
  }, [isMounted, session?.user]);

  if (loading && !userDataFetched) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="loader h-24 w-24 rounded-full border-8 border-t-8 border-gray-200 ease-linear"></div>
      </div>
    );
  }

  if (!isMounted || !userDataFetched) {
    return null;
  }

  return (
    <div className="flex w-full flex-col font-outfit md:flex-row">
      <Dialog onOpenChange={getUserData}>
        {/* Left Side */}
        <div className="flex w-full flex-col p-0 md:w-[50%] md:p-8">
          {/* User Photo and Upload */}
          <div className="mt-6 flex justify-between">
            <div>
              <Image
                src={
                  userData
                    ? userData.imageUrl || session?.user.image
                    : "/user.png"
                }
                width={1000}
                height={1000}
                className="h-16 w-16 rounded-full md:h-36 md:w-36"
                alt="User Image"
              />
            </div>
            <div className="flex items-center justify-center">
              <DialogTrigger onClick={() => setTabValue("upload-photo")}>
                <Button className="py-2">Upload Photo</Button>
              </DialogTrigger>
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
                      {userData && userData.name ? userData.name : "User"}
                    </div>
                    <div className="flex items-center justify-center">
                      <DialogTrigger onClick={() => setTabValue("edit-name")}>
                        <Button onClick={() => {}}>Edit</Button>
                      </DialogTrigger>
                    </div>
                  </div>
                </div>
                {/* Email */}
                <div className="flex w-full flex-col text-black">
                  <div className="w-full text-[#1F1F1F] opacity-70">Email</div>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex  items-center justify-center text-lg text-[#000]">
                      {userData && userData.email
                        ? userData.email
                        : "Login to update your E-mail!"}
                    </div>
                    <div className="flex items-center justify-center">
                      <DialogTrigger>
                        <Button onClick={() => {}}>Edit</Button>
                      </DialogTrigger>
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
                      {userData && userData.phone
                        ? userData.phone
                        : "Update after logging."}
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
                    <DialogTrigger onClick={() => setTabValue("edit-about")}>
                      <Button onClick={() => {}}>Edit</Button>
                    </DialogTrigger>
                  </div>
                </div>
                <div className="mt-4 text-[#49454F] opacity-80">
                  {userData?.about || "Update your bio!"}
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
                  <DialogTrigger onClick={() => setTabValue("edit-skills")}>
                    <Button onClick={() => {}}>Edit</Button>
                  </DialogTrigger>
                </div>
                <div className="mt-4 flex flex-col">
                  {/* Update Later */}
                  {userData && userData.skills
                    ? userData?.skills?.map((skill: string) => (
                        <div key={skill} className="text-md opacity-90">
                          {skill}
                        </div>
                      ))
                    : "Update your skills by clicking Edit!"}
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
                    <DialogTrigger
                      onClick={() => setTabValue("edit-professional-details")}
                    >
                      <Button onClick={() => {}}>Edit</Button>
                    </DialogTrigger>
                  </div>
                  <div className="mt-2 text-xl text-[#49454F] opacity-80">
                    {userData?.professionalDetails ||
                      "Add your professional details here!"}
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
                  <DialogTrigger
                    onClick={() => setTabValue("edit-certifications")}
                  >
                    <Button onClick={() => {}}>Edit</Button>
                  </DialogTrigger>
                </div>
                <div className="mt-4">
                  <Card className="rounded-full p-1">
                    <div className="flex">
                      {/* {userData && userData.certifications.length > 0 ? (
                        userData.certifications.map((certificate: any) => (
                          <>
                            <div className="ml-10 flex w-[10%] items-center justify-center">
                              <IoIosMedal color="#FFCE10" size={50} />
                            </div>
                            <div className="flex w-[90%] flex-col items-center justify-center text-[#49454F] opacity-80">
                              <div className="text-3xl ">{certificate}</div>
                              <div className="text-xl">OruPhones</div>
                            </div>
                          </>
                        ))
                      ) : (
                        <>
                          <div className="ml-10 flex w-[10%] items-center justify-center">
                            <IoIosMedal color="#FFCE10" size={50} />
                          </div>
                          <div className="flex w-[90%] flex-col items-center justify-center text-[#49454F] opacity-80">
                            <div className="text-xl ">
                              Not certificates at the time.
                            </div>
                          </div>
                        </>
                      )} */}
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
                  <DialogTrigger onClick={() => setTabValue("edit-experience")}>
                    <Button onClick={() => {}}>Edit</Button>
                  </DialogTrigger>
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
                      <div className="text-3xl text-[#413B89]">
                        IIT Hyderabad
                      </div>
                      <div className="flex justify-between p-2 pr-4 text-xl text-black opacity-90">
                        <div className="">(2010-2014)</div>
                        <div className="">Btech</div>
                      </div>
                      <div className="text-[#49454F] opacity-80">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Obcaecati quis sequi, voluptates vitae ipsa nam
                        voluptatibus deserunt ab? Suscipit sit tempore nihil{" "}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update your details</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue={tabValue} className="w-full">
            <TabsContent
              value="upload-photo"
              className="flex w-full flex-col items-center justify-center"
            >
              <Input
                type="text"
                value={userDetails.imageUrl}
                placeholder="Your Name"
                onChange={(event) =>
                  setUserDetails({
                    ...userDetails,
                    imageUrl: event.target.value,
                  })
                }
              />
              <Button
                variant="destructive"
                className="mt-2"
                onClick={updateUserData}
              >
                Upload Image
              </Button>
            </TabsContent>
            <TabsContent
              value="edit-name"
              className="flex w-full flex-col items-center justify-center"
            >
              <Input
                type="text"
                value={userDetails.name}
                placeholder="Your Name"
                onChange={(event) =>
                  setUserDetails({ ...userDetails, name: event.target.value })
                }
              />
              <Button
                variant="destructive"
                className="mt-2"
                onClick={updateUserData}
              >
                Update Name
              </Button>
            </TabsContent>
            <TabsContent
              value="edit-email"
              className="flex w-full flex-col items-center justify-center"
            >
              <Input
                type="text"
                value={userDetails.email}
                placeholder="Your Name"
                onChange={(event) =>
                  setUserDetails({ ...userDetails, email: event.target.value })
                }
              />
              <Button
                variant="destructive"
                className="mt-2"
                onClick={updateUserData}
              >
                Update Email
              </Button>
            </TabsContent>
            <TabsContent
              value="edit-phone"
              className="flex w-full flex-col items-center justify-center"
            >
              <Input
                type="text"
                value={userDetails.phone}
                placeholder="Your Name"
                onChange={(event) =>
                  setUserDetails({ ...userDetails, phone: event.target.value })
                }
              />
              <Button
                variant="destructive"
                className="mt-2"
                onClick={updateUserData}
              >
                Update Name
              </Button>
            </TabsContent>
            <TabsContent
              value="edit-about"
              className="flex w-full flex-col items-center justify-center"
            >
              <Input
                type="text"
                value={userDetails.about}
                placeholder="Your Name"
                onChange={(event) =>
                  setUserDetails({ ...userDetails, about: event.target.value })
                }
              />
              <Button
                variant="destructive"
                className="mt-2"
                onClick={updateUserData}
              >
                Update About Section
              </Button>
            </TabsContent>
            <TabsContent
              value="edit-skills"
              className="flex w-full flex-col items-center justify-center"
            >
              <div className="flex flex-wrap items-center justify-center">
                Your Skills:
                {userDetails.skills &&
                  userDetails.skills.map((skill: any, index: any) => (
                    <div
                      key={index}
                      className="mb-2 flex items-center justify-center"
                      style={{
                        maxWidth: "150px",
                      }}
                    >
                      <div className="ml-2 rounded-lg bg-muted p-1">
                        {skill}
                      </div>
                    </div>
                  ))}
              </div>
              <Input
                type="text"
                value={newSkill}
                placeholder="Add a new skill"
                onChange={(event) => setNewSkill(event.target.value)}
              />
              <Button
                variant="ghost"
                className="mt-2 bg-[#f1f5f9]"
                onClick={() => {
                  if (newSkill) {
                    setUserDetails({
                      ...userDetails,
                      skills: [...userDetails.skills, newSkill],
                    });
                    setNewSkill("");
                  }
                }}
              >
                Add Skill
              </Button>
              <Button
                variant="destructive"
                className="mt-2"
                onClick={updateUserData}
              >
                Update All Skills
              </Button>
            </TabsContent>
            <TabsContent
              value="edit-professional-details"
              className="flex w-full flex-col items-center justify-center"
            >
              <Input
                type="text"
                value={userDetails.professionalDetails}
                placeholder="Your Name"
                onChange={(event) =>
                  setUserDetails({
                    ...userDetails,
                    professionalDetails: event.target.value,
                  })
                }
              />
              <Button
                variant="destructive"
                className="mt-2"
                onClick={updateUserData}
              >
                Update Professional Details
              </Button>
            </TabsContent>
            <TabsContent
              value="edit-certifications"
              className="flex w-full flex-col items-center justify-center"
            >
              {/* {userDetails.certifications &&
                userDetails.certifications.map(
                  (certification: any, index: any) => (
                    <div key={index} className="mb-2">
                      <Input
                        type="text"
                        value={certification.course}
                        placeholder="Course"
                        onChange={(event) =>
                          setUserDetails((prevUserDetails: any) => {
                            const updatedCertifications = [
                              ...prevUserDetails.certifications,
                            ];
                            updatedCertifications[index].course =
                              event.target.value;
                            return {
                              ...prevUserDetails,
                              certifications: updatedCertifications,
                            };
                          })
                        }
                      />
                      <Input
                        type="text"
                        value={certification.source}
                        placeholder="Source"
                        onChange={(event) =>
                          setUserDetails((prevUserDetails: any) => {
                            const updatedCertifications = [
                              ...prevUserDetails.certifications,
                            ];
                            updatedCertifications[index].source =
                              event.target.value;
                            return {
                              ...prevUserDetails,
                              certifications: updatedCertifications,
                            };
                          })
                        }
                      />
                    </div>
                  )
                )} */}
              <Button
                variant="ghost"
                className="mt-2"
                onClick={() =>
                  setUserDetails((prevUserDetails: any) => ({
                    ...prevUserDetails,
                    certifications: [
                      ...(prevUserDetails.certifications || []),
                      { course: "", source: "" },
                    ],
                  }))
                }
              >
                Click to start adding
              </Button>
              <Button
                variant="destructive"
                className="mt-2"
                onClick={updateUserData}
              >
                Update Your Certificates
              </Button>
            </TabsContent>
            <TabsContent
              value="edit-experience"
              className="flex w-full flex-col items-center justify-center"
            >
              Change your password here.
            </TabsContent>
            <TabsContent
              value="edit-education"
              className="flex w-full flex-col items-center justify-center"
            >
              Change your password here.
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
