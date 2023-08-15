import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { LuBell } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { CgMenuLeft } from "react-icons/cg";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import AuthModal from "../Modal/AuthModal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

const Navbar: React.FC = () => {
  const [mobileResponsive, setMobileResponsive] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 450) setMobileResponsive(true);
  }, []);

  const { data: session } = useSession();

  const [userData, setUserData] = useState<any>(null);

  async function getUserData() {
    console.log("userData1");

    if (session?.user.email) {
      console.log("userData2");
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
      console.log("userData3");

      const data = await response.json();
      if (typeof data === "string") {
        const userData = JSON.parse(data);
        setUserData(userData);
      } else {
        setUserData(data);
      }
    }
  }

  useEffect(() => {
    if (session?.user) {
      getUserData();
    }
  }, [session]);

  return (
    <div
      className={twMerge(
        "font-outline flex w-full  items-center border-b-2 border-[#CECECE] bg-[#FAFBFF] shadow-lg",
        mobileResponsive ? "h-16" : " h-[6.5rem]"
      )}
    >
      {mobileResponsive ? (
        <Sheet>
          <DropdownMenu>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center justify-center gap-x-2 px-2">
                <SheetTrigger>
                  <CgMenuLeft size={35} />
                </SheetTrigger>

                <Image
                  src="/image 13.png"
                  width={1000}
                  height={1000}
                  alt="Company Logo"
                  className="h-10 w-auto"
                />
              </div>
              <DropdownMenuTrigger>
                <div className="flex items-center justify-center gap-x-2 px-2">
                  <LuBell color="#1E2875" size={35} />
                  <Image
                    src={session?.user.image || ""}
                    width={1000}
                    height={1000}
                    alt="User Avatar"
                    className="h-12 w-12 rounded-full"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Ssup {session?.user.name || "User"}!
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Link href="/profile">Go to Profiles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/connections">Go to Connections</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="https://github.com/adxxtya/oru-dashboard">
                    Checkout Code
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {session?.user ? (
                    <div onClick={() => signOut()}>Sign Out</div>
                  ) : (
                    <div onClick={() => signIn()}>Log In</div>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
              <SheetContent side="left" className="bg-[#1E2875]">
                <SheetHeader>
                  <SheetTitle>
                    <div className="mx-4 my-8 flex h-[60px] items-center justify-center rounded-lg border border-gray-300 px-9 py-9 text-4xl text-white shadow-md shadow-white">
                      <Link href="/">Dashboard</Link>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex w-full flex-col space-y-4">
                  <div className="flex w-full">
                    <Link href="/profile" className="flex w-full">
                      <ChevronRightIcon size={30} color="#fff" />
                      <div className="pl-4 text-2xl text-white">Profile</div>
                    </Link>
                  </div>
                  <div className="flex w-full">
                    <Link href="/connections" className="flex w-full">
                      <ChevronRightIcon size={30} color="#fff" />
                      <div className="pl-4 text-2xl text-white">
                        Connections
                      </div>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </div>
          </DropdownMenu>
        </Sheet>
      ) : (
        <DropdownMenu>
          <div className="flex h-full w-full justify-end">
            <div className="block p-2 md:hidden">
              Reload while maintaining mobile width to check responsiveness
            </div>
            <div className="mx-3 flex h-full w-[50%] items-center justify-center space-x-4">
              <div className="">
                <LuBell color="#1E2875" size={35} />
              </div>
              <div className="flex h-[70%] w-[40%] min-w-[39%] items-center justify-between ">
                <DropdownMenuTrigger className="order flex items-center justify-center rounded-lg border-2 border-[#E8EFF7] p-2 px-8">
                  <div className="flex h-full  w-full items-center justify-between ">
                    <div className="flex h-full w-full items-center justify-center gap-2  pl-2 pr-6">
                      <Image
                        src={
                          userData
                            ? userData.imageUrl || session?.user.image
                            : "/user.png"
                        }
                        width={1000}
                        height={1000}
                        alt="User Avatar"
                        className="h-12 w-12 rounded-xl"
                      />
                      {session?.user.name ? (
                        <div className="flex flex-col text-[#373B5C]">
                          <div className="whitespace-nowrap text-sm">
                            Welcome back,
                          </div>
                          <div className="whitespace-nowrap text-xl">
                            {session?.user.name}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col text-[#373B5C]">
                          <div className="whitespace-nowrap text-sm">
                            Hello,
                          </div>
                          <div className="whitespace-nowrap text-xl">User</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex h-full w-[20%] items-center justify-center">
                    <FiChevronDown size={20} />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    Ssup {session?.user.name || "User"}!
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link href="/profile">Go to Profiles</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/connections">Go to Connections</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="https://github.com/adxxtya/oru-dashboard">
                      Checkout Code
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    {session?.user ? (
                      <div onClick={() => signOut()}>Sign Out</div>
                    ) : (
                      <div onClick={() => signIn()}>Log In</div>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </div>
            </div>
          </div>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Navbar;
