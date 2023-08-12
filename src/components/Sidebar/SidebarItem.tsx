import Link from "next/link";
import React from "react";
import { type IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemsProps {
  icon: IconType;
  label: string;
  active?: boolean;
  onClick?: () => void;
  href: string;
}

const SidebarItem: React.FC<SidebarItemsProps> = ({
  icon: Icon,
  label,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <>
      <Link
        onClick={handleClick}
        href={href}
        className={twMerge(
          "relative flex w-full cursor-pointer items-center justify-around  transition"
        )}
      >
        <Icon
          size={30}
          className={twMerge("", active ? "text-[#413B89]" : "text-[#9197B3]")}
        />
        <div
          className={twMerge(
            "flex h-full w-[70%] items-center justify-center whitespace-nowrap p-3 text-2xl",
            active ? "rounded-lg border border-[#413B89]" : ""
          )}
        >
          {label}
        </div>
      </Link>
    </>
  );
};

export default SidebarItem;
