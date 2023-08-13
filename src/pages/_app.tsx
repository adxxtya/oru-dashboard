import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Toaster } from "@/components/ui/toaster";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);
  return (
    <SessionProvider session={session}>
      <Sidebar isLoading={isLoading}>
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="loader h-24 w-24 rounded-full border-8 border-t-8 border-gray-200 ease-linear"></div>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </Sidebar>
      <Toaster />
    </SessionProvider>
  );
};

export default MyApp;
