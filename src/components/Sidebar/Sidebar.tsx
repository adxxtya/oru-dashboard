import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FiChevronRight } from "react-icons/fi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Navbar from "../Navbar/Navbar";
import React from "react";

interface SidebarProps {
  children: React.ReactNode;
  isLoading: Boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ children, isLoading }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: FiChevronRight,
        label: "My Profile",
        active: pathname === "/profile",
        href: "/profile",
      },
      {
        icon: FiChevronRight,
        label: "My Connections",
        active: pathname === "/connections",
        href: "/connections",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-[100dvh] w-full font-outfit ">
      <div className="z-[99] hidden h-screen w-[330px] bg-[#FFF] shadow-md md:flex">
        <Box>
          <div className="flex h-full w-full flex-col ">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} isLoading={isLoading} />
            ))}
          </div>
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
