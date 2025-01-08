"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectPage = () => {
  const route = useRouter();
  const delay = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  useEffect(() => {
    delay(10000);
    route.push("/");
  }, []);

  return (
    <div className="bg-white w-full h-full lg:px-48 py-10 px-10 flex flex-col gap-5 justify-center items-center">
      <h1 className="text-center">
        THANK YOU FOR YOUR PAYMENT. ORGANIZER WILL CONFIRMED THE PAYMENT.
      </h1>
      <h1>Redirecting....</h1>
    </div>
  );
};

export default RedirectPage;
