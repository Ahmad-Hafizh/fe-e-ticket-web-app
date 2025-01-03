"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { basicGetApi } from "../config/axios";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/global-components/EventCard";
import { useRouter, useSearchParams } from "next/navigation";

const searchPage = () => {
  const [allLocation, setAllLocation] = useState<any>([]);
  const [url, setUrl] = useState<string>("");
  const [filterData, setFilterData] = useState<any>([]);

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

  const showEvent = async () => {
    try {
      const response = await basicGetApi.get(`/search?${url}`);
      const filteredData = response.data.result;
      setFilterData(filteredData);
      console.log("filterData", filterData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLocation();
    showEvent();
  }, []);

  const params = useSearchParams();
  const router = useRouter();

  const updateParams = (key: string, value: string) => {
    const searchParams = new URLSearchParams(params.toString());
    console.log(searchParams);
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    router.push(`?${searchParams.toString()}`);
  };

  const handlingFilter = (id: string, event: any) => {
    updateParams(id, event);
  };

  return (
    <div className="bg-white w-full h-full px-10 md:px-32 lg:px-48 py-10 flex flex-col gap-20 border border-red-500">
      <div className="container lg:grid lg:grid-cols-4">
        <div className="filter w-full p-4">
          <div>
            <h1>Filter</h1>
          </div>
          <div>
            <Accordion type="multiple">
              <AccordionItem value="category">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-2 justify-between items-center">
                    <label>Music</label>
                    <input type="checkbox" id="category" name="music" />
                  </div>
                  <div className="flex gap-2 justify-between items-center">
                    <label>Festival</label>
                    <input type="checkbox" id="category" name="music" />
                  </div>
                  <div className="flex gap-2 justify-between items-center">
                    <label>Food</label>
                    <input type="checkbox" id="category" name="music" />
                  </div>
                  <div className="flex gap-2 justify-between items-center">
                    <label>Accoustic</label>
                    <input type="checkbox" id="category" name="music" />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="location">
                <AccordionTrigger>Location city and country</AccordionTrigger>
                <AccordionContent>
                  {allLocation &&
                    allLocation
                      .map((value: any, index: number) => {
                        return (
                          <div className="flex justify-between" key={index}>
                            <h3>{value.city_name}</h3>
                            <input
                              type="checkbox"
                              id="location"
                              name={`${value.city_name}`}
                              onChange={(e) =>
                                handlingFilter("city", e.target.name)
                              }
                            />
                          </div>
                        );
                      })
                      .slice(0, 5)}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger>Price</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center w-fit">
                    <input
                      type="number"
                      id="price"
                      name="min"
                      className="border rounded-sm p-2 shadow-sm"
                      placeholder="Price from Rp..."
                    />{" "}
                    -
                    <input
                      type="number"
                      id="price"
                      name="max"
                      className="border rounded-sm p-2 shadow-sm"
                      placeholder="Price to Rp..."
                    />
                  </div>
                  <Button>Set Price</Button>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="date">
                <AccordionTrigger>Date</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center w-full">
                    <input
                      type="date"
                      id="price"
                      name="min"
                      className="border rounded-sm p-2  shadow-sm"
                      placeholder="Price from Rp..."
                    />
                    <input
                      type="date"
                      id="price"
                      name="max"
                      className="border rounded-sm p-2  shadow-sm"
                      placeholder="Price to Rp..."
                    />
                  </div>
                  <Button>Set Date</Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="product w-full p-4 col-span-3">
          <div className="flex gap-1 flex-wrap justify-between">
            {filterData &&
              filterData.map((value: any, index: number) => {
                return (
                  <EventCard
                    key={index}
                    eventTitle={value.title}
                    eventImg={value.imgEvent}
                    eventStartDate={value.startDate}
                    eventPrice={value.event_price}
                    eventOrganizerName={value.organizer.organizer_name}
                    eventOrganizerProfile={value.organizer.organizer_profile}
                    onClick={() => {}}
                    size="w-1/5"
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default searchPage;
