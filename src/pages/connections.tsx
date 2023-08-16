import AuthModal from "@/components/Modal/AuthModal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { type User } from "@prisma/client";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ConnectionsProps {}

const Connections: React.FC<ConnectionsProps> = ({}) => {
  const { data: session } = useSession();
  const [myData, setMyData] = useState<User | any>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [sessionState, setSessionState] = useState<Session | undefined | null>(
    undefined
  );

  const [userConnections, setUserConnections] = useState<any>([]);
  const [allUsers, setAllUsers] = useState<any>();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    setSessionState(session);
  }, [session]);

  let myEmail: string;
  if (session?.user.email) {
    myEmail = session?.user.email;
  }

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

  const addConnection = async (email: any) => {
    setLoading(true);
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

      if (response.ok) {
        getAllUsers();
        setLoading(false);
        setUserConnections([...userConnections, email]);
        setAllUsers([...allUsers]);
        toast({
          title: `You both are now connected :)`,
          description: `You are added as friend in their connections too.`,
        });
      }
    } catch (error) {
      setLoading(false);

      toast({
        title: `Error!`,
        description: `${error}`,
      });
      console.error("Error adding connection:", error);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  const removeConnection = async (email: any) => {
    setLoading(true);
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
      if (response.ok) {
        getAllUsers();
        setLoading(false);
        toast({
          title: `You both got disconnected :(`,
          description: `You were removed from their connections too.`,
        });
        setUserConnections(
          userConnections.filter((connection: any) => connection !== email)
        );
        setAllUsers([...allUsers]);
      }
    } catch (error) {
      setLoading(false);

      console.error("Error removing connection:", error);
      toast({
        title: `Error!`,
        description: `${error}`,
      });
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

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
    <>
      <div className="relative flex w-full flex-col items-center justify-center bg-[#FAFBFF] pb-16">
        <div className="mt-12 h-24 w-[98%] rounded-lg bg-[#1E2875] p-6 text-white">
          <div className="mb-14 w-full text-xl">MY CONNECTIONS</div>
        </div>

        <div className="mt-12 flex w-full flex-col">
          {/* Current Connections */}
          <div className="ml-4 flex flex-col">
            <div className="text-3xl text-black">Your Current Connections</div>
            <div className="mt-6 flex flex-wrap gap-4">
              {allUsers && userConnections && userConnections.length > 0 ? (
                <>
                  {userConnections.map((connectedEmail: string) => {
                    const connectedUser = allUsers.find(
                      (user: any) => user.email === connectedEmail
                    );

                    if (connectedUser) {
                      return (
                        <>
                          <div
                            className={twMerge(
                              "h-auto w-[400px] rounded-xl border-2 border-[#00000040] p-4 shadow-sm"
                            )}
                          >
                            <div className="flex h-full w-full ">
                              <div className="flex w-full flex-col items-center justify-center space-y-2 p-2">
                                <div className="w-full text-left text-xl">
                                  {connectedUser.name}
                                </div>

                                <div className="w-full">
                                  {session?.user ? (
                                    <Button
                                      className="mt-2 bg-[#BAB6EB] text-xs text-black"
                                      isLoading={loading}
                                      onClick={() =>
                                        removeConnection(connectedUser.email)
                                      }
                                    >
                                      Disconnect
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() => setShowAuthModal(true)}
                                      isLoading={loading}
                                    >
                                      Disconnect
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <div className="w-[80%]">
                                <Image
                                  src={
                                    connectedUser.imageUrl ||
                                    connectedUser.image ||
                                    "/user.png"
                                  }
                                  width={1000}
                                  height={1000}
                                  className="h-36 w-36 rounded-full object-contain"
                                  alt="User Image"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }

                    return null;
                  })}
                </>
              ) : (
                <div className="flex h-52 w-full flex-col items-center justify-center bg-[##FFFFFF] text-center text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                  <p className="mt-2">You have no connections yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* New Connections */}
          <div className="ml-4 mt-12 flex flex-col">
            <div className="text-3xl text-black">
              People You Can Also Connect
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              {allUsers && allUsers.length > 0 ? (
                <>
                  {allUsers.map((user: any) => {
                    const isUserConnected = userConnections.includes(
                      user.email
                    );

                    if (
                      !isUserConnected &&
                      user.email !== session?.user.email
                    ) {
                      return (
                        <>
                          <div
                            className={twMerge(
                              "h-auto w-[400px] rounded-xl border-2 border-[#00000040] p-4 shadow-sm"
                            )}
                          >
                            <div className="flex h-full w-full ">
                              <div className="flex w-full flex-col items-center justify-center space-y-2 p-2">
                                <div className="w-full text-left text-xl">
                                  {user.name}
                                </div>

                                <div className="w-full">
                                  {session?.user ? (
                                    <Button
                                      className="mt-2 bg-[#BAB6EB] text-xs text-black"
                                      onClick={() => addConnection(user.email)}
                                      isLoading={loading}
                                    >
                                      Connect
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() => setShowAuthModal(true)}
                                      isLoading={loading}
                                    >
                                      Connect
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <div className="w-[80%]">
                                <Image
                                  src={
                                    user.imageUrl || user.image || "/user.png"
                                  }
                                  width={1000}
                                  height={1000}
                                  className="h-36 w-36 rounded-full object-contain"
                                  alt="User Image"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }

                    return null;
                  })}
                </>
              ) : (
                <div className="flex h-52 w-full flex-col items-center justify-center bg-[##FFFFFF] text-center text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                  <p className="mt-2">No users left on platform.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default Connections;
