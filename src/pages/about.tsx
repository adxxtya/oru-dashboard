import AboutComponent from "@/components/About/About";
import React from "react";

const About = () => {
  return (
    <div className="relative flex w-full items-center justify-center bg-[#FAFBFF]">
      <div className="mt-12 h-48 w-[98%] rounded-lg bg-[#1E2875] p-6 text-white">
        <div className="mb-10 mt-4 w-full text-center text-4xl">About</div>
        <div className="container z-[9999] mb-6 h-auto rounded-xl bg-white pb-10 text-black shadow-xl">
          <AboutComponent />
        </div>
      </div>
    </div>
  );
};

export default About;
