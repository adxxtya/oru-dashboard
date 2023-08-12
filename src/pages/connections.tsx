import UserCard from "@/components/Card/UserCard";

interface ConnectionsProps {}

const Connections: React.FC<ConnectionsProps> = ({}) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-[#FAFBFF]">
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
            <UserCard
              name="Aditya Maurya"
              company="Google"
              connection={true}
              position="Full Stack"
              // userImage={decodeURIComponent(
              //   "https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTtdOCskmKOYzVrT7NS3on5mZ331_7a0gxsgkE5Qjch3H%3Ds96-c&w=1080&q=100"
              // )}
            />
            <UserCard
              name="Aditya Maurya"
              company="Google"
              connection={true}
              position="Full Stack"
              // userImage={decodeURIComponent(
              //   "https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTtdOCskmKOYzVrT7NS3on5mZ331_7a0gxsgkE5Qjch3H%3Ds96-c&w=1080&q=100"
              // )}
            />
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
      </div>
    </div>
  );
};

export default Connections;
