import React, { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={twMerge(
        "h-auto w-full rounded-xl border-[3px] border-[#00000015] p-2 shadow-sm md:p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
