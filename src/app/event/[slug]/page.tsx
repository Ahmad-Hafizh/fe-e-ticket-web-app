/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { basicGetApi } from "@/app/config/axios";
import React from "react";
import Navbar from "../../../components/global-components/Navbar";
import { Button } from "@/components/ui/button";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewSubmit from "@/components/views/event/message";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import axios from 'axios';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { user } from "@nextui-org/theme";
import { useAppSelector } from "@/lib/redux/hooks";

interface IEventDetailPage {
  params: { slug: string };
}

const EventDetailPage: React.FC<IEventDetailPage> = ({ params }) => {
  const route = useRouter();
  const [eventData, setEventData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [selectValue, setSelectValue] = useState<string>("0");

  //Track ticket quantities
  const [ticketQuantities, setTicketQuantities] = useState<[]>([]);
  const [totalTicketQuantity, setTotalTicketQuantity] = useState<number>(0);
  const [totalTicketprice, setTotalTicketPrice] = useState<number>(0);

  const user = useAppSelector((state) => state.userReducer);

  let isCustomer;
  if (eventData) {
    const filteredCustomers = eventData.customer.filter(
      (cust: any) => cust.email === user.email
    );
    isCustomer = filteredCustomers.length > 0;
  }

  let isFinished;
  if (eventData) {
    const nowdate = Date.now();
    const eventDate = new Date(eventData.endDate).getTime();
    if (eventDate < nowdate) {
      isFinished = true;
    }
  }

  let isReviewed = false;
  if (eventData) {
    const reviewed = eventData.review.forEach((value: any) => {
      console.log("Ini value.user.email: ", value.user.email);
      console.log("Ini user.email: ", user.email);
      if (value.user.email === user.email) {
        isReviewed = true;
        return;
      }
    });
  }

  const updateTicketQuantity = (ticket: number, quantity: number) => {
    const updatedQuantities: any = [...ticketQuantities];
    updatedQuantities[ticket] = quantity; // Update the specific index
    setTicketQuantities(updatedQuantities);
  };

  //Total ticket
  const totalQuantity = ticketQuantities.reduce((a, b) => a + b, 0);
  const totalPrice = ticketQuantities.reduce((a, b, index) => {
    const price = eventData.ticket_types[index].price;
    return a + b * price;
  }, 0);

  useEffect(() => {
    setTotalTicketQuantity(totalQuantity);
    setTotalTicketPrice(totalPrice);
  }, [ticketQuantities]);

  useEffect(() => {
    const currentUrl = window.location.pathname;
    localStorage.setItem("redirectTo", currentUrl);

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

  console.log("Event Data", eventData);

  if (loading) {
    return (
      <>
        <div className="bg-white w-full h-full lg:px-48 py-10 flex flex-col gap-20">
          <div className="bg-white lg:grid lg:grid-cols-[2fr_1fr]">
            <div className="lg:flex lg:flex-col lg:items-end lg:justify-end">
              <div className="bg-white w-full h-full px-10 md:px-20 lg:px-6 pt-10 lg:pb-4 pb-0 flex flex-col gap-5">
                <Skeleton className="w-full h-96 rounded-lg shadow-sm lg:mb-3" />
                <div className="flex flex-col gap-3">
                  <Skeleton className="w-20 h-6 rounded-lg shadow-sm lg:mb-3" />
                  <Skeleton className="w-36 h-6 rounded-lg shadow-sm lg:mb-3" />
                  <Skeleton className="w-36 h-6 rounded-lg shadow-sm lg:mb-3" />
                </div>
              </div>
            </div>
            <div className=" p-8">
              <Skeleton className="w-full rounded-lg h-full" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return <div>Error...</div>;
  }
  console.log("Ini eventdATA", eventData);

  const submitTransactionDetails = () => {
    const payloadDetails = ticketQuantities.map((quantity, index) => {
      if (quantity > 0) {
        const ticketTypes = eventData.ticket_types[index];
        return {
          eventId: eventData.event_id,
          ticketTypesId: ticketTypes.ticket_types_id,
          types: ticketTypes.types,
          quantityBought: quantity,
          price: ticketTypes.price,
          subtotal: quantity * ticketTypes.price,
        };
      }
      return null;
    });

    const filteredPayloadDetails = payloadDetails.filter(
      (value) => value !== null
    );

    const payloadTransactionDetails = {
      data: filteredPayloadDetails,
    };

    return payloadTransactionDetails;
  };

  console.log("Ini ticketquantities: ", ticketQuantities);
  console.log("Ini eventdetails:", eventData.ticket_types);

  return (
    <>
      <div className="bg-white w-full h-full lg:px-48 py-10 flex flex-col gap-20 ">
        <div className="bg-white lg:grid lg:grid-cols-[2fr_1fr] relative ">
          <div className="lg:flex lg:flex-col lg:items-end lg:justify-end">
            <div className="bg-white w-full h-full px-10 md:px-20 lg:px-6 pt-10 lg:pb-4 pb-0 flex flex-col gap-5">
              {loading ? (
                <img
                  src={eventData.imgEvent}
                  className="w-full rounded-lg shadow-sm lg:mb-3"
                />
              ) : (
                <Skeleton className="w-full rounded-lg shadow-sm lg:mb-3" />
              )}
              <img
                src={eventData.imgEvent}
                className="w-full rounded-lg shadow-sm lg:mb-3"
              />
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                  {eventData.title}
                </h1>
                <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl flex items-center gap-1">
                  <FaStar />
                  {eventData.score || 4} / <span className="text-lg">5</span>
                </h1>
              </div>
            </div>
            <div className="bg-white w-full h-full px-10 md:px-20 lg:px-6 pb-6 pt-2 flex flex-col gap-1">
              {eventData.endDate ? (
                <h3 className="text-sm md:text-lg w-full flex items-center gap-1">
                  <MdDateRange />{" "}
                  <span className="font-bold hidden md:inline">Date :</span>{" "}
                  {eventData.startDate.slice(0, 10)} -{" "}
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
              <h1 className="text-xl font-bold">Descriptionss</h1>
              <p className="text-lg">{eventData.description}</p>
            </div>
            {isFinished ? (
              <></>
            ) : (
              <div className="bg-white w-full h-full px-10 md:px-20 lg:px-6 py-3 flex flex-col lg:hidden">
                <h1 className="text-xl font-bold">Ticketss</h1>
                <div className="ticket-container">
                  {eventData.ticket_types.map((ticket: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="ticket flex justify-between py-2 lg:py-4 lg:px-10 my-3 items-center bg-gray-100 rounded-lg shadow-md px-3"
                      >
                        <div>
                          <h1 className="text-lg font-bold">{ticket.types}</h1>
                          {ticket.price === 0 ? (
                            <h2 className="text-md">Price: FREE</h2>
                          ) : (
                            <h2 className="text-md">
                              Price: IDR.{ticket.price}
                            </h2>
                          )}
                          {ticket.quantity_available === 0 ? (
                            <></>
                          ) : (
                            <h2 className="text-sm">
                              Only {ticket.quantity_available} left.
                            </h2>
                          )}
                        </div>
                        <div className="flex gap-2 items-center">
                          {ticket.quantity_available === 0 ? (
                            <h2 className="text-md">SOLD</h2>
                          ) : (
                            <>
                              <h2 className="text-md">Quantity</h2>
                              <select
                                className="p-2"
                                onChange={(e) =>
                                  updateTicketQuantity(
                                    index,
                                    parseInt(e.target.value)
                                  )
                                }
                                value={ticketQuantities[index]}
                              >
                                {[...Array(8).keys()].map((num) => (
                                  <option key={num} value={num}>
                                    {num}
                                  </option>
                                ))}
                                {/* Ticket dibatasi 7, karena mencegah calo. Array(8) index ke 0 */}
                              </select>
                            </>
                          )}
                          {/* <Button>Buy Ticket</Button> */}
                        </div>
                      </div>
                    );
                  })}
                  <div className="ticket flex justify-between py-2 lg:py-4 lg:px-10 my-3 items-center bg-gray-100 rounded-lg shadow-md px-3">
                    <div>
                      <h1>Total ticket : {totalQuantity}</h1>
                      <h1>Total Price : Rp. {totalPrice}</h1>
                    </div>
                    {localStorage.getItem("tkn") ||
                    sessionStorage.getItem("tkn") ? (
                      <Button
                        type="submit"
                        onClick={() => {
                          const payload = submitTransactionDetails();
                          console.log("ini payload: ", payload);
                          console.log("ini event: ", eventData);
                          const payloadUltimate = {
                            ticket: payload,
                            event: eventData,
                          };
                          console.log("ini payloadultimate: ", payloadUltimate);
                          const payloadEventAndTicket = basicGetApi.post(
                            "/transaction/details",
                            payload
                          );
                          sessionStorage.setItem(
                            "transaction-data",
                            JSON.stringify(payloadUltimate)
                          );
                          route.push(`/transaction/${eventData.event_id}`);
                        }}
                      >
                        Buy Now
                      </Button>
                    ) : (
                      <Link href={`/sign-in`}>
                        <Button type="submit">Buy Now</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white w-full h-full px-10 md:px-20 lg:px-6 py-5 flex flex-col">
              <h1 className="text-xl font-bold">Organized by</h1>
              <div className="ticket flex gap-2 py-2 my-3 items-center justify-start bg-gray-50 rounded-lg shadow-md px-3">
                <img
                  src={eventData.organizer.organizer_logo}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h1 className="text-md font-bold">
                    {eventData.organizer.organizer_name}
                  </h1>
                  <h1 className="text-sm">
                    {eventData.organizer.organizer_email}
                  </h1>
                </div>
              </div>
            </div>
            {isCustomer && !isReviewed ? (
              <div className="bg-white w-full h-full px-10 md:px-20 lg:px-6 py-3 flex flex-col gap-6">
                <h1 className="text-xl font-bold">
                  What do you think of this event?
                </h1>
                <div className="ticket flex flex-col justify-between p-5 lg:p-10 items-center bg-gray-100 rounded-lg shadow-md">
                  <ReviewSubmit eventId={eventData.event_id} />
                </div>
              </div>
            ) : (
              <></>
            )}
            {eventData.review[0] && (
              <div className="bg-white w-full h-full px-10 md:px-20 lg:px-6 py-5 flex flex-col">
                <h1 className="text-xl font-bold my-3">
                  What they say about this event..
                </h1>
                <div className="ticket flex flex-col justify-between items-center gap-6">
                  {eventData.review.map((value: any, index: number) => {
                    return (
                      <div
                        className="bg-gray-200 rounded-lg shadow-md px-5 pt-4 w-full flex flex-col gap-3"
                        key={index}
                      >
                        <div className="flex justify-between items-center">
                          <div className="avatar flex items-center gap-3">
                            <img
                              src={value.user.pfp_url}
                              className="rounded-full h-10 w-10"
                            />
                            <h1 className="text-lg font-bold">
                              {value.user.name}
                            </h1>
                          </div>
                          <div className="score">
                            <h1 className="font-bold flex items-center gap-1">
                              {value.score} <FaStar />
                            </h1>
                          </div>
                        </div>
                        <div className="paragraph">
                          <p>{value.review_text}</p>
                        </div>
                        <div className="review image">
                          <p>{value.review_img}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="w-full h-full relative ">
            <div className="lg:block hidden sticky top-[10%]">
              {isFinished ? (
                <></>
              ) : (
                <div className="bg-white w-full h-full px-10 md:px-32 lg:px-4 py-10 flex flex-col sticky top-0">
                  <h1 className="text-2xl font-bold">Ticketss</h1>
                  <div className="ticket-container">
                    {eventData.ticket_types.map(
                      (ticket: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="ticket flex justify-between py-2 lg:py-4 lg:px-8 my-3 items-center bg-gray-100 rounded-lg shadow-md px-3"
                          >
                            <div>
                              <h1 className="text-lg font-bold">
                                {ticket.types}
                              </h1>
                              {ticket.price === 0 ? (
                                <h2 className="text-md">Price: FREE</h2>
                              ) : (
                                <h2 className="text-md">
                                  Price: IDR.{ticket.price}
                                </h2>
                              )}
                              {ticket.quantity_available === 0 ? (
                                <></>
                              ) : (
                                <h2 className="text-sm">
                                  Only {ticket.quantity_available} left.
                                </h2>
                              )}
                            </div>
                            <div className="flex gap-2 items-center">
                              {ticket.quantity_available === 0 ? (
                                <h2 className="text-md font-bold text-red-700">
                                  SOLD
                                </h2>
                              ) : (
                                <>
                                  <h2 className="text-md">Quantity</h2>
                                  <select
                                    className="p-2"
                                    onChange={(e) =>
                                      updateTicketQuantity(
                                        index,
                                        parseInt(e.target.value)
                                      )
                                    }
                                    value={ticketQuantities[index]}
                                  >
                                    {[...Array(8).keys()].map((num) => (
                                      <option key={num} value={num}>
                                        {num}
                                      </option>
                                    ))}
                                    {/* Ticket dibatasi 7, karena mencegah calo. Array(8) index ke 0 */}
                                  </select>
                                </>
                              )}

                              {/* <Button>Buy Ticket</Button> */}
                            </div>
                          </div>
                        );
                      }
                    )}
                    <div className="ticket flex sticky justify-between py-2 lg:py-4 lg:px-8 my-3 items-center bg-gray-100 rounded-lg shadow-md px-3">
                      <div
                        className="sticky
                "
                      >
                        <h1 className=" font-bold">
                          Total ticket : {totalQuantity}
                        </h1>
                        <h1 className=" font-bold">
                          Total Price : Rp. {totalPrice}
                        </h1>
                      </div>

                      {localStorage.getItem("tkn") ||
                      sessionStorage.getItem("tkn") ? (
                        <Button
                          type="submit"
                          onClick={() => {
                            const payload = submitTransactionDetails();
                            console.log("ini payload: ", payload);
                            console.log("ini event: ", eventData);
                            const payloadUltimate = {
                              ticket: payload,
                              event: eventData,
                            };
                            console.log(
                              "ini payloadultimate: ",
                              payloadUltimate
                            );
                            const payloadEventAndTicket = basicGetApi.post(
                              "/transaction/details",
                              payload
                            );
                            sessionStorage.setItem(
                              "transaction-data",
                              JSON.stringify(payloadUltimate)
                            );
                            route.push(`/transaction/${eventData.event_id}`);
                          }}
                        >
                          Buy Now
                        </Button>
                      ) : (
                        <Link href={`/sign-in`}>
                          <Button type="submit">Buy Now</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailPage;
