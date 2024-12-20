"use client";

import { useEffect, useState } from "react";
import { basicGetApi } from "@/app/config/axios";
import React from "react";

interface IEventDetailPage {
  params: Promise<{ slug: string }>;
}

const EventDetailPage: React.FC<IEventDetailPage> = async ({ params }) => {
  const [eventData, setEventData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const slug = (await params).slug;
  const getData = async () => {
    try {
      setLoading(true);
      const response = await basicGetApi.get(`event/${slug}`);
      console.log(response);
      setEventData(response.data.result);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getData();
  }, [slug]);

  return (
    <div className="bg-white w-full h-full px-10 md:px-32 lg:px-48 py-10 flex flex-col gap-20">
      {eventData.title}
    </div>
  );
};

export default EventDetailPage;
