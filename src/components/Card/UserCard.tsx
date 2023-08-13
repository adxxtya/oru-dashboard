import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";

interface UserCardProps {
  className?: string;
  name?: string;
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
  // connection,
  userImage,
}) => {
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
          {/* Update Later */}
          {true ? (
            <div className="w-full">
              <Button className="mt-2 bg-[#BAB6EB] text-xs text-black">
                Remove Connection
              </Button>
            </div>
          ) : (
            <div className="w-full">
              <Button className="mt-2 bg-[#BAB6EB] text-xs text-black">
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
