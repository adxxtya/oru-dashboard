import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

interface UserCardProps {
  className?: string;
  name?: string;
  email?: string;
  position?: string;
  company?: string;
  connection?: Boolean;
  userImage?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  className,
  name,
  position,
  company,
  connection,
  userImage,
  email,
}) => {
  let myEmail: string;
  const { data: session } = useSession();
  if (session?.user.email) {
    myEmail = session?.user.email;
  }
  const addConnection = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-actions/add-connection`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            myEmail: myEmail,
            userEmail: email,
          }),
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Error adding connection:", error);
    }
  };

  const removeConnection = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-actions/remove-connection`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            myEmail: myEmail,
            userEmail: email,
          }),
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error removing connection:", error);
    }
  };

  return (
    <div
      className={twMerge(
        "h-auto w-[400px] rounded-xl border-2 border-[#00000040] p-4 shadow-sm",
        className
      )}
    >
      <div className="flex h-full w-full ">
        <div className="flex w-full flex-col items-center justify-center space-y-2 p-2">
          <div className="w-full text-left text-xl">{name}</div>
          <div className="w-full text-left text-lg text-[#49454F] opacity-80">
            {position} <br />@ {company}
          </div>
          {connection ? (
            <div className="w-full">
              <Button
                className="mt-2 bg-[#BAB6EB] text-xs text-black"
                onClick={removeConnection}
              >
                Remove Connection
              </Button>
            </div>
          ) : (
            <div className="w-full">
              <Button
                className="mt-2 bg-[#BAB6EB] text-xs text-black"
                onClick={addConnection}
              >
                Connect
              </Button>
            </div>
          )}
        </div>
        <div className="w-[80%]">
          <Image
            src={userImage || "/user.png"}
            width={1000}
            height={1000}
            className="h-36 w-36 rounded-full object-contain"
            alt="User Image"
          />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
