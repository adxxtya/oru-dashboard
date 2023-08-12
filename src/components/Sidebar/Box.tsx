import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: React.ReactNode;
  classname?: string;
}

const Box: React.FC<BoxProps> = ({ children, classname }) => {
  return (
    <div className={twMerge("flex  w-full flex-col items-end p-2", classname)}>
      <div className="mx-4 my-8 flex h-[60px] items-center justify-center rounded-lg border border-gray-300 px-9 py-9 text-4xl shadow-lg">
        <Link href="/">Dashboard</Link>
      </div>
      {children}
    </div>
  );
};

export default Box;
