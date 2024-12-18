"use client";
import EventCard from "@/components/global-components/EventCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { basicGetApi } from "../config/axios";
import { useEffect, useState } from "react";

interface IEventCollection {
  apicall: string;
  label: string;
}

const EventCarousel: React.FC<IEventCollection> = ({ apicall, label }) => {
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
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  // const images = [
  //   {
  //     url: "/xample.jpg",
  //   },
  //   {
  //     url: "/xample.jpg",
  //   },
  //   {
  //     url: "/xample.jpg",
  //   },
  //   {
  //     url: "/xample.jpg",
  //   },
  //   {
  //     url: "/xample.jpg",
  //   },
  // ];

  return (
    <div className="flex flex-col">
      <h1>{label}</h1>
      <div className="w-full ">
        <Carousel className="w-full relative">
          <CarouselContent>
            {/* {eventData.map((value: any, index: number) => ( */}
            <CarouselItem
              key={1}
              className="basis-2/3 md:basis-1/3 lg:basis-1/4"
            >
              <EventCard
                eventImg={eventData.imgEvent}
                eventOrganizerName={eventData.organizerName}
                eventPrice={eventData.eventPrice}
                eventOrganizerProfile={eventData.organizerProfile}
                eventStartDate={eventData.startDate}
                eventTitle={eventData.title}
              />
            </CarouselItem>
            {/* ))} */}
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
export default EventCarousel;
