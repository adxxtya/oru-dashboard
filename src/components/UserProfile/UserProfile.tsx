import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { type ChangeEvent, useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { Input } from "../ui/input";
import { type Session } from "next-auth/core/types";
import AuthModal from "../Modal/AuthModal";
import { supabase } from "@/server/supabase";

interface FilePreview {
  url: string;
  file: File;
}

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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);

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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [experienceArray, setExperienceArray] = useState<any>([]);
  const [certificationsArray, setCertificationsArray] = useState<any>([]);
  const [educationArray, setEducationArray] = useState<any>([]);
  const [imageLink, setImageLink] = useState<any>("");
  const [sessionState, setSessionState] = useState<Session | undefined | null>(
    undefined
  );

  useEffect(() => {
    setSessionState(session);
  }, [session]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log("files", files);

    if (files && files.length > 0) {
      const newPreviews: FilePreview[] = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setFilePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...Array.from(files),
      ]);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) {
      console.log("No files selected.");
      return;
    }

    for (const file of selectedFiles) {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("user-uploaded-files")
        .upload(`${session?.user?.email ?? ""}/` + file.name, file);

      if (data) {
        const { data } = await supabase.storage
          .from("user-uploaded-files")
          .getPublicUrl(`${session?.user?.email ?? ""}/` + file.name);
        console.log("image", data.publicUrl);
        setImageLink(data.publicUrl);
        setLoading(false);
      } else if (error) {
        console.log("Error uploading file:", error);
      }
      setLoading(false);
    }
    updateUserData();
    updateRedisUser();
    setLoading(false);
  };

  async function updateUserData() {
    if (session?.user.email) {
      console.log("Updating...");
      setLoading(true);

      const updatedUserDetails = {
        ...userDetails,
        emailID: session?.user.email,
        experienceArray: experienceArray,
        certificationsArray: certificationsArray,
        educationArray: educationArray,
      };

      if (experienceArray && experienceArray.length > 0) {
        const updatedExperienceArray = experienceArray.map((exp: any) => ({
          where: { id: exp.id },
          data: {
            company: exp.company,
            position: exp.position,
            duration: exp.duration,
            employmentType: exp.employmentType,
          },
        }));

        updatedUserDetails.experience = {
          upsert: updatedExperienceArray,
        };
      }

      if (certificationsArray && certificationsArray.length > 0) {
        const updatedCertificationsArray = certificationsArray.map(
          (cert: any) => ({
            where: { id: cert.id },
            data: {
              course: cert.course,
              source: cert.source,
            },
          })
        );

        updatedUserDetails.certifications = {
          upsert: updatedCertificationsArray,
        };
      }

      if (educationArray && educationArray.length > 0) {
        const updatedEducationArray = educationArray.map((edu: any) => ({
          where: { id: edu.id }, // You might need to adjust this depending on your schema
          data: {
            institute: edu.institute,
            course: edu.course,
            description: edu.description,
          },
        }));

        updatedUserDetails.education = {
          upsert: updatedEducationArray,
        };
      }

      console.log("imageLink", imageLink);

      if (imageLink) {
        updatedUserDetails.imageUrl = imageLink;
      }

      console.log(updatedUserDetails);

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
        await updateRedisUser();
        setUserUpdated(!userUpdated);
        const data = await response.json();
        const updatedField: any = Object.keys(data)[0];
        const updatedValue = data[updatedField];
        toast({
          title: `Updated ${updatedField} Successfully!`,
          description: `Your ${updatedField} was changed to "${updatedValue}".`,
        });
      } else {
        toast({
          title: `Error Occured! :(`,
        });
      }
      setLoading(false);
    }
  }

  async function getUserData() {
    setLoading(true);
    if (session?.user.email) {
      await updateRedisUser();
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

  async function updateRedisUser() {
    setLoading(true);
    if (session?.user.email) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/redis/get-user`,
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
    if (imageLink) {
      updateUserData();
      updateRedisUser();
      getUserData();
    }
  }, [imageLink]);

  useEffect(() => {
    getUserData();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user) {
      getUserData();
    }
  }, [isMounted, session?.user]);

  if (loading && sessionState === undefined) {
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
    <>
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
                {session?.user ? (
                  <DialogTrigger onClick={() => setTabValue("upload-photo")}>
                    <Button onClick={() => {}}>Edit</Button>
                  </DialogTrigger>
                ) : (
                  <Button onClick={() => setShowAuthModal(true)}>Edit</Button>
                )}
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
                        {session?.user ? (
                          <DialogTrigger
                            onClick={() => setTabValue("edit-name")}
                          >
                            <Button onClick={() => {}}>Edit</Button>
                          </DialogTrigger>
                        ) : (
                          <Button onClick={() => setShowAuthModal(true)}>
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="flex w-full flex-col text-black">
                    <div className="w-full text-[#1F1F1F] opacity-70">
                      Email
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex  items-center justify-center text-lg text-[#000]">
                        {userData && userData.email
                          ? userData.email
                          : "Login to update your E-mail!"}
                      </div>
                      <div className="flex items-center justify-center">
                        {session?.user ? (
                          <DialogTrigger
                            onClick={() => setTabValue("edit-email")}
                          >
                            <Button onClick={() => {}}>Edit</Button>
                          </DialogTrigger>
                        ) : (
                          <Button onClick={() => setShowAuthModal(true)}>
                            Edit
                          </Button>
                        )}
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
                        {session?.user ? (
                          <DialogTrigger
                            onClick={() => setTabValue("edit-phone")}
                          >
                            <Button onClick={() => {}}>Edit</Button>
                          </DialogTrigger>
                        ) : (
                          <Button onClick={() => setShowAuthModal(true)}>
                            Edit
                          </Button>
                        )}
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
                      {session?.user ? (
                        <DialogTrigger
                          onClick={() => setTabValue("edit-about")}
                        >
                          <Button onClick={() => {}}>Edit</Button>
                        </DialogTrigger>
                      ) : (
                        <Button onClick={() => setShowAuthModal(true)}>
                          Edit
                        </Button>
                      )}
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
                    {session?.user ? (
                      <DialogTrigger onClick={() => setTabValue("edit-skills")}>
                        <Button onClick={() => {}}>Edit</Button>
                      </DialogTrigger>
                    ) : (
                      <Button onClick={() => setShowAuthModal(true)}>
                        Edit
                      </Button>
                    )}
                  </div>
                  <div className="mt-4 flex flex-col">
                    {userData && userData.skills ? (
                      userData?.skills?.map((skill: string) => (
                        <div key={skill} className="text-md opacity-90">
                          {skill}
                        </div>
                      ))
                    ) : (
                      <div className="text-[#49454F] opacity-80">
                        Update your skills by clicking Edit!
                      </div>
                    )}
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
                      {session?.user ? (
                        <DialogTrigger
                          onClick={() =>
                            setTabValue("edit-professional-details")
                          }
                        >
                          <Button onClick={() => {}}>Edit</Button>
                        </DialogTrigger>
                      ) : (
                        <Button onClick={() => setShowAuthModal(true)}>
                          Edit
                        </Button>
                      )}
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
                    {session?.user ? (
                      <DialogTrigger
                        onClick={() => setTabValue("edit-certifications")}
                      >
                        <Button>Edit</Button>
                      </DialogTrigger>
                    ) : (
                      <Button onClick={() => setShowAuthModal(true)}>
                        Edit
                      </Button>
                    )}
                  </div>
                  <div className="mt-4">
                    <Card className="rounded-full">
                      <div className="flex">
                        {userData &&
                        userData.certifications &&
                        userData.certifications.length > 0 ? (
                          userData.certifications.map((certificate: any) => (
                            <div
                              key={certificate.id}
                              className="flex w-full items-center"
                            >
                              <div className="flex w-1/5 items-center justify-center">
                                <IoIosMedal color="#FFCE10" size={50} />
                              </div>
                              <div className="flex w-4/5 flex-col items-center justify-center text-[#49454F] opacity-80">
                                <div className="text-3xl ">
                                  {certificate.course}
                                </div>
                                <div className="text-xl">
                                  {certificate.source}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex w-full items-center justify-center p-4">
                            <div className="w-4/5 text-xl text-[#49454F] opacity-80">
                              No certificates at the moment.
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </div>

            {/* Experience */}
            <div className="mt-6">
              <Card className="border-none pt-0 shadow-none">
                <div className="flex w-full flex-col">
                  <div className="flex justify-between">
                    <div className="text-2xl text-black">Experience</div>
                    {session?.user ? (
                      <DialogTrigger
                        onClick={() => setTabValue("edit-experience")}
                      >
                        <Button onClick={() => {}}>Edit</Button>
                      </DialogTrigger>
                    ) : (
                      <Button onClick={() => setShowAuthModal(true)}>
                        Edit
                      </Button>
                    )}
                  </div>
                  <div className="mt-4">
                    {userData && userData.experience ? (
                      userData?.experience?.map((experience: any) => (
                        <Card key={experience.id} className="mb-4">
                          <div className="flex w-full items-center">
                            <div className="flex w-[80%] flex-col pr-3">
                              <div className="flex justify-between text-xl text-[#222222] opacity-90">
                                <div>{experience.duration}</div>
                                <div>{experience.employmentType}</div>
                              </div>
                              <div className="flex justify-between text-lg text-[#49454F] opacity-80">
                                <div>{experience.company}</div>
                                <div>{experience.position}</div>
                              </div>
                            </div>
                            <div className="w-[20%]">
                              <Image
                                src="/image 13.png"
                                width={100}
                                height={100}
                                className="h-full w-full"
                                alt="Company Logo"
                              />
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="text-[#49454F] opacity-80">
                        You do not possess any Experience.
                      </div>
                    )}
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
                    {session?.user ? (
                      <DialogTrigger
                        onClick={() => setTabValue("edit-education")}
                      >
                        <Button onClick={() => {}}>Edit</Button>
                      </DialogTrigger>
                    ) : (
                      <Button onClick={() => setShowAuthModal(true)}>
                        Edit
                      </Button>
                    )}
                  </div>
                  <div className="mt-4">
                    {userData && userData.education ? (
                      userData?.education?.map((education: any) => (
                        <Card key={education.id} className="mb-4">
                          <div className="flex flex-col">
                            <div className="flex items-end justify-between p-1 pr-4 text-xl text-black opacity-90">
                              <div className="text-3xl text-[#413B89]">
                                {education.institute}
                              </div>
                              <div className="">{education.course}</div>
                            </div>
                            <div className="text-[#49454F] opacity-80">
                              {education.description}
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="text-[#49454F] opacity-80">
                        Login to update your education data.
                      </div>
                    )}
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
                {filePreviews.length > 0 ? (
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    {filePreviews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview.url}
                        alt={`Uploaded File ${index}`}
                        className="mb-4 max-h-64"
                      />
                    ))}
                  </div>
                ) : (
                  <label
                    htmlFor="dropzone-file"
                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG, GIF, MP4, etc.
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                )}
                <Button
                  variant="destructive"
                  className="mt-2"
                  onClick={handleFileUpload}
                  isLoading={loading}
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
                  isLoading={loading}
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
                  placeholder="Your Email"
                  onChange={(event) =>
                    setUserDetails({
                      ...userDetails,
                      email: event.target.value,
                    })
                  }
                />
                <Button
                  variant="destructive"
                  className="mt-2"
                  onClick={updateUserData}
                  isLoading={loading}
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
                  placeholder="Your Phone"
                  onChange={(event) =>
                    setUserDetails({
                      ...userDetails,
                      phone: event.target.value,
                    })
                  }
                />
                <Button
                  variant="destructive"
                  className="mt-2"
                  onClick={updateUserData}
                  isLoading={loading}
                >
                  Update Phone Number
                </Button>
              </TabsContent>
              <TabsContent
                value="edit-about"
                className="flex w-full flex-col items-center justify-center"
              >
                <Input
                  type="text"
                  value={userDetails.about}
                  placeholder="Tell everyone about you!"
                  onChange={(event) =>
                    setUserDetails({
                      ...userDetails,
                      about: event.target.value,
                    })
                  }
                />
                <Button
                  variant="destructive"
                  className="mt-2"
                  onClick={updateUserData}
                  isLoading={loading}
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
                  isLoading={loading}
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
                  isLoading={loading}
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
                  placeholder="Your Professional Details"
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
                  isLoading={loading}
                >
                  Update Professional Details
                </Button>
              </TabsContent>
              <TabsContent
                value="edit-certifications"
                className="flex w-full flex-col items-center justify-center"
              >
                <div className="flex w-full flex-col space-y-4">
                  {certificationsArray.map((cert: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center gap-2"
                    >
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="Course"
                          value={cert.course}
                          onChange={(event) => {
                            const updatedCertificationsArray = [
                              ...certificationsArray,
                            ];
                            updatedCertificationsArray[index].course =
                              event.target.value;
                            setCertificationsArray(updatedCertificationsArray);
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="Source"
                          value={cert.source}
                          onChange={(event) => {
                            const updatedCertificationsArray = [
                              ...certificationsArray,
                            ];
                            updatedCertificationsArray[index].source =
                              event.target.value;
                            setCertificationsArray(updatedCertificationsArray);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    isLoading={loading}
                    onClick={() =>
                      setCertificationsArray([
                        ...certificationsArray,
                        { course: "", source: "" },
                      ])
                    }
                  >
                    Add Certification
                  </Button>
                  <Button
                    variant="destructive"
                    className="mt-2"
                    onClick={updateUserData}
                    isLoading={loading}
                  >
                    Update Certifications
                  </Button>
                </div>
              </TabsContent>

              <TabsContent
                value="edit-experience"
                className="flex w-full flex-col items-center justify-center"
              >
                <div className="flex w-full flex-col space-y-4">
                  {experienceArray.map((exp: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center gap-2"
                    >
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(event) => {
                            const updatedExperienceArray = [...experienceArray];
                            updatedExperienceArray[index].company =
                              event.target.value;
                            setExperienceArray(updatedExperienceArray);
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="Position"
                          value={exp.position}
                          onChange={(event) => {
                            const updatedExperienceArray = [...experienceArray];
                            updatedExperienceArray[index].position =
                              event.target.value;
                            setExperienceArray(updatedExperienceArray);
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="Duration"
                          value={exp.duration}
                          onChange={(event) => {
                            const updatedExperienceArray = [...experienceArray];
                            updatedExperienceArray[index].duration =
                              event.target.value;
                            setExperienceArray(updatedExperienceArray);
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <select
                          value={exp.employmentType}
                          onChange={(event) => {
                            const updatedExperienceArray = [...experienceArray];
                            updatedExperienceArray[index].employmentType =
                              event.target.value;
                            setExperienceArray(updatedExperienceArray);
                          }}
                          className="rounded-lg border-2 bg-none p-1"
                        >
                          <option value="">Select Employment Type</option>
                          <option value="internship">Internship</option>
                          <option value="job">Job</option>
                          <option value="contract">Contract</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  <Button
                    isLoading={loading}
                    onClick={() =>
                      setExperienceArray([
                        ...experienceArray,
                        { company: "", position: "" },
                      ])
                    }
                  >
                    Add Experience
                  </Button>
                  <Button
                    variant="destructive"
                    className="mt-2"
                    onClick={updateUserData}
                    isLoading={loading}
                  >
                    Update Experience
                  </Button>
                </div>
              </TabsContent>
              <TabsContent
                value="edit-education"
                className="flex w-full flex-col items-center justify-center"
              >
                <div className="flex w-full flex-col space-y-4">
                  {educationArray.map((edu: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center gap-2"
                    >
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="Institute"
                          value={edu.institute}
                          onChange={(event) => {
                            const updatedEducationArray = [...educationArray];
                            updatedEducationArray[index].institute =
                              event.target.value;
                            setEducationArray(updatedEducationArray);
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="Course"
                          value={edu.course}
                          onChange={(event) => {
                            const updatedEducationArray = [...educationArray];
                            updatedEducationArray[index].course =
                              event.target.value;
                            setEducationArray(updatedEducationArray);
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="Description"
                          value={edu.description}
                          onChange={(event) => {
                            const updatedEducationArray = [...educationArray];
                            updatedEducationArray[index].description =
                              event.target.value;
                            setEducationArray(updatedEducationArray);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    isLoading={loading}
                    onClick={() =>
                      setEducationArray([
                        ...educationArray,
                        { institute: "", course: "", description: "" },
                      ])
                    }
                  >
                    Add Education
                  </Button>
                  <Button
                    variant="destructive"
                    className="mt-2"
                    onClick={updateUserData}
                    isLoading={loading}
                  >
                    Update Education
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default UserProfile;
