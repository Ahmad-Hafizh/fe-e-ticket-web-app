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
import { basicGetApi } from "../config/axios";

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

  //Carousel Jumbotron
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  if (loading) {
    return (
      <div className="w-full">
        <Carousel
          plugins={[plugin.current]}
          className="w-full relative"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            <CarouselItem className="basis-full">
              <div className="rounded-xl overflow-hidden">
                <div className="relative w-full h-96 overflow-hidden">
                  <Skeleton className="absolute w-full h-full rounded-lg" />
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="opacity-0 hover:opacity-100 w-full h-full absolute top-0 transition-opacity">
            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3" />
          </div>
        </Carousel>
      </div>
    );
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div className="w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full relative"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {eventData.map((value: any, index: number) => (
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
          ))}
        </CarouselContent>
        <div className="opacity-0 hover:opacity-100 w-full h-full absolute top-0 transition-opacity">
          <CarouselPrevious className="left-3" />
          <CarouselNext className="right-3" />
        </div>
      </Carousel>
    </div>
  );
  //Carousel Event Pilihan (Picked for you)
  //Carousel Category
};
export default Jumbotron;
