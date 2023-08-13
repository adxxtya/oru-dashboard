import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";

interface EditTabProps {
  tabValue: string;
}

const EditTab: React.FC<EditTabProps> = ({ tabValue }) => {
  let emailID;
  const { data: session } = useSession();
  if (session?.user) {
    emailID = session?.user.email;
  }
  const [userDetails, setUserDetails] = useState<any>({
    name: "",
    phone: "",
    emailID: emailID,
    email: "",
    about: "",
    skills: [],
    professionalDetails: "",
    certifications: [],
    experience: [],
    education: [],
    connections: [],
    imageUrl: "",
  });
  const [newSkill, setNewSkill] = useState<any>("");
  const { toast } = useToast();

  const handleUserData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-actions/update-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      }
    );

    if (response.ok) {
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
  };

  return (
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
            setUserDetails({ ...userDetails, imageUrl: event.target.value })
          }
        />
        <Button variant="destructive" className="mt-2" onClick={handleUserData}>
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
        <Button variant="destructive" className="mt-2" onClick={handleUserData}>
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
        <Button variant="destructive" className="mt-2" onClick={handleUserData}>
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
        <Button variant="destructive" className="mt-2" onClick={handleUserData}>
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
        <Button variant="destructive" className="mt-2" onClick={handleUserData}>
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
                  maxWidth: "150px", // Set a maximum width for the skill item
                }}
              >
                <div className="ml-2 rounded-lg bg-muted p-1">{skill}</div>
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
        <Button variant="destructive" className="mt-2" onClick={handleUserData}>
          Update All Skills
        </Button>
      </TabsContent>
      <TabsContent
        value="edit-professional-details"
        className="flex w-full flex-col items-center justify-center"
      >
        Change your password here.
      </TabsContent>
      <TabsContent value="edit-certifications">
        Change your password here.
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
  );
};

export default EditTab;
