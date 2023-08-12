import { useSession } from "next-auth/react";
import Image from "next/image";
import { LuBell } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { CgMenuLeft } from "react-icons/cg";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

const Navbar: React.FC = ({}) => {
  const [mobileResponsive, setMobileResponsive] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 450) setMobileResponsive(true);
  }, []);

  const { data: session } = useSession();

  return (
    <div
      className={twMerge(
        "font-outline flex w-full  items-center border-b-2 border-[#CECECE] bg-[#FAFBFF] shadow-lg",
        mobileResponsive ? "h-16" : " h-[6.5rem]"
      )}
    >
      {mobileResponsive ? (
        <Sheet>
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
                    <div className="pl-4 text-2xl text-white">Connections</div>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </div>
        </Sheet>
      ) : (
        <div className="flex h-full w-full justify-end">
          <div className="block p-2 md:hidden">
            Reload while maintaining mobile width to check responsiveness
          </div>
          <div className="mx-3 flex h-full w-[50%] items-center justify-center space-x-4">
            <div className="">
              <LuBell color="#1E2875" size={35} />
            </div>
            <div className="flex h-[70%] w-[40%] min-w-[39%] items-center justify-between rounded-lg border border-[#E8EFF7] ">
              <div className="flex h-full  w-full items-center justify-between ">
                <div className="flex h-full w-full items-center justify-center gap-2  pl-2 pr-6">
                  <Image
                    src={session?.user.image || ""}
                    width={1000}
                    height={1000}
                    alt="User Avatar"
                    className="h-12 w-12 rounded-xl"
                  />
                  <div className="flex flex-col text-[#373B5C]">
                    <div className="whitespace-nowrap text-sm">
                      Welcome back,
                    </div>
                    <div className="whitespace-nowrap text-xl">
                      {session?.user.name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex h-full w-[20%] items-center justify-center">
                <FiChevronDown size={20} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

//   /* eslint-disable @next/next/no-html-link-for-pages */
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import { LuBell } from "react-icons/lu";
// import { cn } from "@/lib/utils";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import { FiChevronDown } from "react-icons/fi";

// const Navbar: React.FC = ({}) => {
//   const { data: session } = useSession();
//   return (
//     <div className="h-28 w-full border-b-2 border-[#CECECE] bg-[#FAFBFF] shadow-lg">
//       <div className="h-full w-full bg-green-600">
//         <div className="flex h-full w-full justify-end bg-blue-800">
//           <div className="flex h-full w-[50%] items-center justify-center bg-red-600">
//             <NavigationMenu className="flex h-full w-full items-center justify-center bg-yellow-800">
//               <NavigationMenuList className="flex h-full w-full bg-teal-500 px-3">
//                 <NavigationMenuItem>
//                   <div className="w-full">
//                     <NavigationMenuTrigger>
//                       <LuBell color="#1E2875" size={35} />
//                     </NavigationMenuTrigger>
//                     <NavigationMenuContent>
//                       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                       Molestias sequi quam earum nemo esse necessitatibus unde
//                       nostrum aliquid porro molestiae saepe, iusto sapiente
//                       laborum consequatur praesentium fuga cupiditate id
//                       architecto.
//                     </NavigationMenuContent>
//                   </div>
//                 </NavigationMenuItem>
//                 <NavigationMenuItem className="h-full w-full">
//                   <NavigationMenuTrigger className="h-full w-full bg-cyan-700">
//                     <div className="h-full w-full gap-2 rounded-lg border border-[#E8EFF7] bg-yellow-400 p-2">
//                       <div className="flex h-full w-full items-center justify-center gap-4 px-3">
//                         <Image
//                           src={session?.user.image || ""}
//                           width={1000}
//                           height={1000}
//                           alt="User Avatar"
//                           className="h-11 w-11 rounded-xl"
//                         />
//                         <div className="flex flex-col text-[#373B5C]">
//                           <div className="text-start text-sm">
//                             Welcome back,
//                           </div>
//                           <div className="text-start text-lg font-bold">
//                             {session?.user.name}
//                           </div>
//                         </div>
//                         <div className="">
//                           <FiChevronDown size={25} />
//                         </div>
//                       </div>
//                     </div>
//                   </NavigationMenuTrigger>
//                   <NavigationMenuContent className="h-full w-full">
//                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab
//                     ullam, eveniet provident corporis delectus maxime mollitia
//                     sunt temporibus. Est ratione iusto eos hic quisquam soluta
//                     animi vero tempora nulla perspiciatis.
//                   </NavigationMenuContent>
//                 </NavigationMenuItem>
//               </NavigationMenuList>
//             </NavigationMenu>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
