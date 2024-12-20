"use client";

import { useEffect, useState } from "react";
import { basicGetApi } from "@/app/config/axios";
import React from "react";
import Navbar from "../../../components/global-components/Navbar";
import { Button } from "@/components/ui/button";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { set } from "zod";
import { Skeleton } from "@/components/ui/skeleton";

interface IEventDetailPage {
  params: { slug: string };
}

const EventDetailPage: React.FC<IEventDetailPage> = ({ params }) => {
  const [eventData, setEventData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [selectValue, setSelectValue] = useState<string>("0");
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const slug = (await params).slug;
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
    return (
      <>
        <Navbar />
        <div className="bg-white w-full h-full lg:px-48 py-10 flex flex-col gap-20">
          <div className="bg-white lg:grid lg:grid-cols-[2fr_1fr]">
            <div className="lg:flex lg:flex-col lg:items-end lg:justify-end">
              <div className="bg-white w-full h-full px-10 md:px-20 lg:px-6 pt-10 lg:pb-4 pb-0 flex flex-col gap-5">
                <Skeleton className="w-full h-30 rounded-lg shadow-sm lg:mb-3" />
                <Skeleton className="w-20 h-6 rounded-lg shadow-sm lg:mb-3" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return <div>Error...</div>;
  }

  const selectValueSetting = (e: any) => {
    setSelectValue(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white w-full h-full lg:px-48 py-10 flex flex-col gap-20 ">
        <div className="bg-white lg:grid lg:grid-cols-[2fr_1fr] relative ">
          <div className="lg:flex lg:flex-col lg:items-end lg:justify-end">
            <div className="bg-white w-full h-full px-10 md:px-20 lg:px-6 pt-10 lg:pb-4 pb-0 flex flex-col gap-5">
              <img
                src={eventData.imgEvent}
                className="w-full rounded-lg shadow-sm lg:mb-3"
              />
              <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                {eventData.title}
              </h1>
            </div>
            <div className="bg-white w-full h-full px-10 md:px-20 lg:px-6 pb-6 pt-2 flex flex-col gap-1">
              {eventData.endDate ? (
                <h3 className="text-sm md:text-lg w-full flex items-center gap-1">
                  <MdDateRange />{" "}
                  <span className="font-bold hidden md:inline">Date :</span>{" "}
                  {eventData.startDate.slice(0, 10)} --{" "}
                  {eventData.endDate.slice(0, 10)}
                </h3>
              ) : (
                <h3 className="text-sm md:text-lg w-full flex items-center gap-1">
                  <MdDateRange />{" "}
                  <span className="font-bold hidden md:inline">Time :</span>
                  {eventData.startDate} ({eventData.timezone})
                </h3>
              )}
              <h3 className="text-sm md:text-lg w-full flex items-center gap-1">
                <IoMdTime />{" "}
                <span className="font-bold hidden md:inline">Time :</span>{" "}
                {eventData.startTime} - {eventData.endTime} (
                {eventData.timezone})
              </h3>

              <h3 className="text-sm md:text-lg w-full flex items-center gap-1">
                <IoLocationOutline />
                <span className="font-bold hidden md:inline">
                  {" "}
                  Location :
                </span>{" "}
                {eventData.event_location.address_name},{" "}
                {eventData.event_location.address},{" "}
                {eventData.event_location.zipcode}
                <a className="text-blue-500 font-bold underline" href="#">
                  Google Maps
                </a>
              </h3>
            </div>
            <div className="bg-white w-full h-full px-10 md:px-20 lg:px-6 py-5 flex flex-col">
              <h1 className="text-xl font-bold">Description</h1>
              <p className="text-lg">{eventData.description}</p>
            </div>
            <div className="bg-white w-full h-full px-10 md:px-20 lg:px-6 py-3 flex flex-col lg:hidden">
              <h1 className="text-xl font-bold">Ticket</h1>
              <div className="ticket-container">
                {eventData.ticket_types.map((ticket: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="ticket flex justify-between py-2 lg:py-4 lg:px-10 my-3 items-center bg-gray-100 rounded-lg shadow-md px-3"
                    >
                      <div>
                        <h1 className="text-lg font-bold">{ticket.types}</h1>
                        <h2 className="text-md">Price: IDR.{ticket.price}</h2>
                      </div>
                      <div className="flex gap-2 items-center">
                        <h2 className="text-md">Quantity</h2>
                        <select className="p-2" onChange={selectValueSetting}>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </select>
                        {/* <Button>Buy Ticket</Button> */}
                      </div>
                    </div>
                  );
                })}
                <div className="ticket flex justify-between py-2 lg:py-4 lg:px-10 my-3 items-center bg-gray-100 rounded-lg shadow-md px-3">
                  <div>
                    <h1>Total ticket : {selectValue}</h1>
                    <h1>Total Price : {selectValue}</h1>
                  </div>
                  <Button className="bg-blue-400 text-lg font-semibold">
                    Buy Ticket
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white w-full h-full px-10 md:px-20 lg:px-6 py-5 flex flex-col">
              <h1 className="text-xl font-bold">Organized by</h1>
              <div className="ticket flex gap-2 justify-between py-2 my-3 items-center bg-gray-50 rounded-lg shadow-md px-3">
                <img
                  src={eventData.organizer_id}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h1 className="text-md font-bold">Organizer name</h1>
                  <h1 className="text-sm">organizer@email.com</h1>
                </div>
                <Button>Contact</Button>
              </div>
            </div>
          </div>
          <div className="w-full h-full relative ">
            <div className="lg:block hidden sticky top-[10%]">
              <div className="bg-white w-full h-full px-10 md:px-32 lg:px-4 py-10 flex flex-col sticky top-0">
                <h1 className="text-2xl font-bold">Ticket</h1>
                <div className="ticket-container">
                  {eventData.ticket_types.map((ticket: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="ticket flex justify-between py-2 lg:py-4 lg:px-8 my-3 items-center bg-gray-100 rounded-lg shadow-md px-3"
                      >
                        <div>
                          <h1 className="text-lg font-bold">{ticket.types}</h1>
                          <h2 className="text-md">Price: IDR.{ticket.price}</h2>
                        </div>
                        <div className="flex gap-2 items-center">
                          <h2 className="text-md">Quantity</h2>
                          <select
                            className="p-2 rounded-lg"
                            onChange={selectValueSetting}
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                          </select>
                          {/* <Button>Buy Ticket</Button> */}
                        </div>
                      </div>
                    );
                  })}
                  <div className="ticket flex sticky justify-between py-2 lg:py-4 lg:px-8 my-3 items-center bg-gray-100 rounded-lg shadow-md px-3">
                    <div
                      className="sticky
                "
                    >
                      <h1 className=" font-bold">
                        Total ticket : {selectValue}
                      </h1>
                      <h1 className=" font-bold">
                        Total Price : Rp. {selectValue}
                      </h1>
                    </div>
                    <Button className="bg-blue-400 text-lg font-semibold">
                      Buy Ticket
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailPage;
