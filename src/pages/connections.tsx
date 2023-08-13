import UserCard from "@/components/Card/UserCard";
import { type User } from "@prisma/client";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ConnectionsProps {}

const Connections: React.FC<ConnectionsProps> = ({}) => {
  const { data: session } = useSession();
  const [myData, setMyData] = useState<User | any>(null);
  const [sessionState, setSessionState] = useState<Session | undefined | null>(
    undefined
  );

  const [userConnections, setUserConnections] = useState<any>([]);
  const [allUsers, setAllUsers] = useState<any>();

  useEffect(() => {
    setSessionState(session);
  }, [session]);

  async function getAllUsers() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-actions/get-all-users`
    );
    const data = await response.json();
    console.log(data);

    setAllUsers(data);
    if (session?.user.email) {
      const sessionEmail = session?.user.email;
      const myUser = data.find((user: any) => user.email === sessionEmail);
      setMyData(myUser);
    }
  }

  console.log("all", allUsers);

  async function getUserConnections() {
    if (session?.user.email) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-actions/get-connections`,
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
      setUserConnections(data.connections);
      console.log("data.connections", data.connections);
    }
  }

  useEffect(() => {
    getAllUsers();
    getUserConnections();
  }, []);

  if (sessionState === undefined) {
    getUserConnections();
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="loader h-24 w-24 rounded-full border-8 border-t-8 border-gray-200 ease-linear"></div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-[#FAFBFF] pb-16">
      <div className="mt-12 h-24 w-[98%] rounded-lg bg-[#1E2875] p-6 text-white">
        <div className="mb-14 w-full text-xl">MY CONNECTIONS</div>
      </div>

      <div className="mt-12 flex w-full flex-col">
        {/* Current Connections */}
        <div className="ml-4 flex flex-col">
          <div className="text-3xl text-black">Your Current Connections</div>
          <div className="mt-6 flex flex-wrap gap-4">
            <UserCard
              name="Aditya Maurya"
              company="Google"
              connection={true}
              position="Full Stack"
              // userImage={decodeURIComponent(
              //   "https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTtdOCskmKOYzVrT7NS3on5mZ331_7a0gxsgkE5Qjch3H%3Ds96-c&w=1080&q=100"
              // )}
            />
          </div>
        </div>

        {/* New Connections */}
        <div className="ml-4 mt-12 flex flex-col">
          <div className="text-3xl text-black">People You Can Also Connect</div>
          <div className="mt-6 flex flex-wrap gap-4">
            {allUsers && allUsers.length > 0 ? (
              <>
                {allUsers.map((user: any) => {
                  const isUserConnected = userConnections.includes(user.email); // Check if the user's email is in userConnections

                  if (!isUserConnected) {
                    return (
                      <UserCard
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        company={user.company}
                        position={user.position}
                        userImage={user.image}
                        connection={isUserConnected}
                      />
                    );
                  }

                  return null;
                })}
              </>
            ) : (
              <div>No users on the platform</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
