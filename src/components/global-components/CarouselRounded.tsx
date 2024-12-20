/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import EventCard from "@/components/global-components/EventCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { basicGetApi } from "../../app/config/axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import RoundedCard from "./RoundedCard";

interface IEventCollection {
  apicall: string;
  label: string;
}

const CarouselRounded: React.FC<IEventCollection> = ({ apicall, label }) => {
  const [eventData, setEventData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await basicGetApi.get(`${apicall}`);
      console.log(response);
      setEventData(response.data.result);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold pb-5">{label}</h1>
        <div className="w-full ">
          <Carousel className="w-full relative">
            <CarouselContent>
              <CarouselItem className="basis-2/3 md:basis-1/3 lg:basis-1/4 py-5">
                <div className="flex flex-col justify-between border-none shadow-lg rounded-lg bg-white w-full">
                  <Skeleton className="rounded-tr-lg rounded-tl-lg h-48" />
                  <div className="py-3 px-5 md:py-4 flex-col flex gap-2">
                    <Skeleton className="w-full h-10 rounded-lg" />
                    <Skeleton className="w-full h-5 rounded-lg" />
                  </div>
                  <hr></hr>
                  <div className="flex gap-3 items-center py-3 px-5 ">
                    <Skeleton className="rounded-full w-7 h-7 lg:w-9 lg:h-9" />
                    <Skeleton className="w-full h-10 rounded-lg" />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="basis-2/3 md:basis-1/3 lg:basis-1/4 py-5">
                <div className="flex flex-col justify-between border-none shadow-lg rounded-lg bg-white w-full">
                  <Skeleton className="rounded-tr-lg rounded-tl-lg h-48" />
                  <div className="py-3 px-5 md:py-4 flex-col flex gap-2">
                    <Skeleton className="w-full h-10 rounded-lg" />
                    <Skeleton className="w-full h-5 rounded-lg" />
                  </div>
                  <hr></hr>
                  <div className="flex gap-3 items-center py-3 px-5 ">
                    <Skeleton className="rounded-full w-7 h-7 lg:w-9 lg:h-9" />
                    <Skeleton className="w-full h-10 rounded-lg" />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="basis-2/3 md:basis-1/3 lg:basis-1/4 py-5">
                <div className="flex flex-col justify-between border-none shadow-lg rounded-lg bg-white w-full">
                  <Skeleton className="rounded-tr-lg rounded-tl-lg h-48" />
                  <div className="py-3 px-5 md:py-4 flex-col flex gap-2">
                    <Skeleton className="w-full h-10 rounded-lg" />
                    <Skeleton className="w-full h-5 rounded-lg" />
                  </div>
                  <hr></hr>
                  <div className="flex gap-3 items-center py-3 px-5 ">
                    <Skeleton className="rounded-full w-7 h-7 lg:w-9 lg:h-9" />
                    <Skeleton className="w-full h-10 rounded-lg" />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="basis-2/3 md:basis-1/3 lg:basis-1/4 py-5">
                <div className="flex flex-col justify-between border-none shadow-lg rounded-lg bg-white w-full">
                  <Skeleton className="rounded-tr-lg rounded-tl-lg h-48" />
                  <div className="py-3 px-5 md:py-4 flex-col flex gap-2">
                    <Skeleton className="w-full h-10 rounded-lg" />
                    <Skeleton className="w-full h-5 rounded-lg" />
                  </div>
                  <hr></hr>
                  <div className="flex gap-3 items-center py-3 px-5 ">
                    <Skeleton className="rounded-full w-7 h-7 lg:w-9 lg:h-9" />
                    <Skeleton className="w-full h-10 rounded-lg" />
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="opacity-0 hover:opacity-100 w-full h-full absolute top-0 transition-opacity">
              <CarouselPrevious className="left-3" />
              <CarouselNext className="right-3 md:right-9" /> 
            </div>
          </Carousel>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div className="flex flex-col py-0">
      <h1 className="text-2xl font-bold pb-5 pt-0">{label}</h1>
      <div className="w-full ">
        <Carousel className="w-full relative">
          <CarouselContent>
            {eventData.map((value: any, index: number) => {
              {
                console.log("ini value", value);
              }
              return (
                <CarouselItem
                  key={index}
                  className="basis-2/3 md:basis-1/2 lg:basis-1/5 py-4"
                >
                  <RoundedCard title={value.title} pict={value.imgEvent} />
                  {/**Perlu include di backend */}
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="opacity-0 hover:opacity-100 w-full h-full absolute top-0 transition-opacity">
            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3 md:right-9" /> 
          </div>
        </Carousel>
      </div>
    </div>
  );
};
export default CarouselRounded;
