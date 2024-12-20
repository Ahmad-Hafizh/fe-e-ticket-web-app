"use client";

import { useEffect, useState } from "react";
import { basicGetApi } from "@/app/config/axios";
import React from "react";
import Navbar from "../../../components/global-components/Navbar";

interface IEventDetailPage {
  slug: Promise<string>;
}

const Content: React.FC<IEventDetailPage> = ({ slug }) => {
  const [eventData, setEventData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        console.log("getting data");
        const response = await basicGetApi.get(`event/${slug}`);
        console.log(response);
        setEventData(response.data.result);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    console.log("getting data");
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-white w-full h-full px-10 md:px-32 lg:px-48 py-10 flex flex-col gap-20">
        {eventData.title}
      </div>
    </>
  );
};

export default Content;
