/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { basicGetApi } from "../../../app/config/axios";

interface IJumbotron {
  apicall: string;
}

const Jumbotron: React.FC<IJumbotron> = ({ apicall }) => {
  const [eventData, setEventData] = useState<any | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await basicGetApi.get(`${apicall}`);
      setEventData(response.data.result);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //Carousel Jumbotron
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div className="w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full relative group"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {loading ? (
            <CarouselItem className="basis-full">
              <div className="rounded-xl overflow-hidden">
                <div className="relative w-full h-96 overflow-hidden">
                  <Skeleton className="absolute w-full h-full rounded-lg" />
                </div>
              </div>
            </CarouselItem>
          ) : (
            eventData.map((value: any, index: number) => (
              <CarouselItem key={index} className="basis-full">
                <div className="rounded-xl overflow-hidden">
                  <div className="relative w-full h-96 overflow-hidden">
                    <Image
                      src={value.imgEvent}
                      alt="jumbotron img"
                      fill
                      className="absolute object-cover rounded-lg"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="left-3 hidden group-hover:flex" />
        <CarouselNext className="right-3 hidden group-hover:flex" />
      </Carousel>
    </div>
  );
  //Carousel Event Pilihan (Picked for you)
  //Carousel Category
};
export default Jumbotron;
