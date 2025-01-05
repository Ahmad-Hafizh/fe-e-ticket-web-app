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
import { basicGetApi } from "../../../app/config/axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { get } from "http";
import { set } from "zod";

interface IEventCollection {
  eventDataFromMain: any[];
}

interface IEventData {
  title: string;
  imgEvent: string;
  startDate: string;
  organizer: any;
  ticket_types: any[];
}

const EventCarouselLocation: React.FC<IEventCollection> = ({
  eventDataFromMain,
}) => {
  const [eventData, setEventData] = useState<IEventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [open, setOpen] = useState<any>(false);
  const [value, setValue] = useState<any>("");
  const [location, setAllLocation] = useState<any | null>([]);

  useEffect(() => {
    setEventData(eventDataFromMain);
    getAllLocation();
    setLoading(false);
  }, []);

  //   const getData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await basicGetApi.get(`${apicall}`);
  //       setEventData(response.data.result);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getData();
  //   }, []);

  const route = useRouter();

  if (error) {
    return <div>Error {error}</div>;
  }

  const getAllLocation = async () => {
    try {
      const response = await basicGetApi.get("/event/location");
      if (response.data.result) {
        setAllLocation(response.data.result);
      } else {
        throw new Error("Error get location");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchByLocation = async (location: string) => {
    try {

      const response = await basicGetApi.get(`/search?city=${location}&page=1`);
      setEventData(response.data.result.events);
      console.log("Inii response: ", response);
      console.log("Ini evendata:", eventData);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col py-0">
      <div className="flex items-start gap-4 py-3">
        <h1 className="text-2xl font-bold pt-2">Event in </h1>
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                role="combobox"
                aria-expanded={open}
                className="h-full bg-transparent text-black hover:bg-transparent hover:text-black"
              >
                <h1 className="text-lg">
                  {value || location[0]?.city_name || "Select a city.."}
                </h1>
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search city..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No city found.</CommandEmpty>
                  <CommandGroup>
                    {location.map((loc: any, index: number) => (
                      <CommandItem
                        key={index}
                        value={loc.city_name}
                        onSelect={(currentValue) => {
                          setValue(currentValue);
                          fetchByLocation(currentValue);
                          setOpen(false);
                        }}
                      >
                        {loc.city_name}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === loc.city_name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="w-full ">
        <Carousel className="w-full relative group">
          <CarouselContent>
            {Array.from({ length: 8 }).map((e, index: number) => {
              if (!loading && eventData[index]) {
                const event: IEventData = eventData[index];
                return (
                  <CarouselItem
                    key={index}
                    className="basis-2/3 md:basis-1/2 lg:basis-1/4 py-4"
                  >
                    <EventCard
                      eventImg={event.imgEvent}
                      eventOrganizerName={event.organizer.organizer_name || ""}
                      eventPrice={`${Math.min(
                        ...event.ticket_types.map((ticket: any) => ticket.price)
                      )}`}
                      eventOrganizerProfile={
                        event.organizer.organizer_logo || ""
                      }
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
                  <CarouselItem
                    className="basis-2/3 md:basis-1/3 lg:basis-1/4 py-5"
                    key={index}
                  >
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
export default EventCarouselLocation;
