import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-[90vh] flex-col items-center justify-center bg-gradient-to-b from-[#3A4488] to-[#1E2875] pt-10 font-outfit text-black">
        <button className="bg-red-400 p-4" onClick={() => signIn()}>
          Log in
        </button>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Welcome to{" "}
            <span className="text-[hsl(280,100%,70%)]">ORUPHONES</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/profile"
            >
              <h3 className="text-2xl font-bold">Checkout Profile →</h3>
              <div className="text-lg">
                Update and Share your achievements to the whole world!
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/connections"
            >
              <h3 className="text-2xl font-bold">Checkout Others →</h3>
              <div className="text-lg">
                Checkout people with similar interests and get to know them!
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
