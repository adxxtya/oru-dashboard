import UserProfile from "@/components/UserProfile/UserProfile";
import React from "react";

const Profile = () => {
  return (
    <div className="relative flex w-full items-center justify-center bg-[#FAFBFF]">
      <div className=" mt-12 h-48 w-[98%] rounded-lg bg-[#1E2875] p-6 text-white">
        <div className="mb-14 w-full text-xl">MY PROFILE</div>
        <div className="container z-[9999] mb-6 rounded-xl bg-white shadow-xl">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
