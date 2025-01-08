/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import EventCard from '@/components/global-components/EventCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

import { useRouter } from 'next/navigation';

interface IEventCollection {
  label: string;
  eventDataFromLandingPage: any[];
}

interface IEventData {
  title: string;
  imgEvent: string;
  startDate: string;
  organizer: any;
  ticket_types: any[];
}

const EventCarousel: React.FC<IEventCollection> = ({ eventDataFromLandingPage, label }) => {
  const [eventData, setEventData] = useState<IEventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  // const getData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await basicGetApi.get(`${apicall}`);
  //     setEventData(response.data.result);
  //     setLoading(false);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  useEffect(() => {
    setEventData(eventDataFromLandingPage);
    setLoading(false);
  }, []);

  const route = useRouter();

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div className="flex flex-col py-0">
      <h1 className="text-2xl font-bold pb-5 pt-0">{label}</h1>
      <div className="w-full ">
        <Carousel className="w-full relative group">
          <CarouselContent>
            {Array.from({ length: 8 }).map((e, index: number) => {
              if (!loading && eventData[index]) {
                const event: IEventData = eventData[index];
                return (
                  <CarouselItem key={index} className="basis-2/3 md:basis-1/2 lg:basis-1/4 py-4">
                    <EventCard
                      eventImg={event.imgEvent}
                      eventOrganizerName={event.organizer.organizer_name || ''}
                      eventPrice={`${Math.min(...event.ticket_types.map((ticket: any) => ticket.price))}`}
                      eventOrganizerProfile={event.organizer.organizer_logo || ''}
                      eventStartDate={event.startDate}
                      eventTitle={event.title}
                      onClick={() => {
                        route.push(`/event/${event.title}`);
                      }}
                    />
                  </CarouselItem>
                );
              } else {
                return (
                  <CarouselItem className="basis-2/3 md:basis-1/3 lg:basis-1/4 py-5" key={index}>
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
                );
              }
            })}
          </CarouselContent>
          <CarouselPrevious className="left-3 hidden group-hover:flex" />
          <CarouselNext className="right-3 hidden group-hover:flex" />
        </Carousel>
      </div>
    </div>
  );
};
export default EventCarousel;
