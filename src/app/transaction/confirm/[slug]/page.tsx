"use client";
import Link from "next/link";
import { useAppSelector } from "@/lib/redux/hooks";
import { useEffect } from "react";
import { basicGetApi } from "@/app/config/axios";
import { useRouter } from "next/navigation";

const confirmationPage = () => {
  const data = JSON.parse(sessionStorage.getItem("transaction-data")!);
  const user = useAppSelector((state) => state.userReducer);
  const transactionId = JSON.parse(sessionStorage.getItem("transaction-data")!);
  const route = useRouter();

  //ambil data
  const update = async () => {
    const response = await basicGetApi.patch(
      `/transaction/${transactionId.transaction_id}`,
      {
        eventId: data.event.event_id,
        session: data,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0NCwiZW1haWwiOiJyYWhldzQ2MjMzQGdob2xhci5jb20iLCJyb2xlIjoidXNlciIsImlzVmVyaWZpZWQiOmZhbHNlLCJpYXQiOjE3MzYxNTc2NDd9.Qm8VEUswlL3Izwh6NaURgFVSqyLZvVkHtl0oAZUP6og`,
        },
      }
    );

    console.log("ini response: ", response);
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <div className="bg-white w-full h-full lg:px-48 py-10 flex flex-col gap-20 px-10">
      <h1 className="text-xl font-bold">PAYMENT CONFIRMED</h1>
      <h1 className="text-xl font-bold">THANK YOU</h1>
      <Link href="/">Click here to go back to home.</Link>
    </div>
  );
};

export default confirmationPage;
