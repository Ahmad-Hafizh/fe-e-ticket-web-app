/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { basicGetApi } from "@/app/config/axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppSelector } from "@/lib/redux/hooks";

interface ITransactionPage {
  params: { slug: string };
}

const TransactionPage: React.FC<ITransactionPage> = ({ params }) => {
  const route = useRouter();
  const [eventData, setEventData] = useState<any | null>(null);
  const [transactionDetailData, setTransactionDetailData] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [subtotal, setSubtotal] = useState<any>(0);
  const [finalPrice, setFinalPrice] = useState<any>(0);
  const [discount, setDiscount] = useState<any>(0);
  const [error, setError] = useState<any | null>(null);
  const [coupon, setCoupon] = useState<boolean>(false);

  const user = useAppSelector((state) => state.userReducer);

  // if (!user.name) {
  //   route.push("/sign-in");
  // }
  // console.log("ini user:", user);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const transactionData = sessionStorage.getItem("transaction-data")
          ? JSON.parse(sessionStorage.getItem("transaction-data")!)
          : null;
        if (!transactionData) {
          route.push("/");
        }
        setEventData(transactionData.event);
        setTransactionDetailData(transactionData.ticket.data);
        console.log("Ini transactionData: ", transactionData.ticket.data);
        console.log("Ini transactionDetailData: ", transactionDetailData);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    console.log("getting data");
    getData();
  }, []);

  console.log("ini event data:", eventData);
  //tambah kondisi untuk menyertakan pakai kupon apa enggak?
  useEffect(() => {
    if (transactionDetailData) {
      let finalPrice = 0;
      let pretotal = 0;
      let platformFee = 50;
      transactionDetailData.forEach((value: any) => {
        pretotal += value.subtotal;
      });

      setSubtotal(pretotal);
      if (pretotal === 0) {
        finalPrice = pretotal + 0 - 0;
        setFinalPrice(finalPrice);
      } else {
        finalPrice = pretotal + platformFee - discount;
        setFinalPrice(finalPrice);
      }
    }
  }, [transactionDetailData, discount]);


  let isCouponValid = true;
  // const now = new Date();
  // if (
  //   eventData?.organizer_coupon?.quantity > 0 &&
  //   new Date(eventData.organizer_coupon?.start_date) <= now &&
  //   new Date(eventData.organizer_coupon?.expired_date) > now
  // ) {
  //   isCouponValid = true;
  // }

  //form validation
  const formSchema = z.object({
    coupon: z.string().optional(),
    payment: z.enum(["BANK_TRANSFER", "E_WALLET", "CREDIT_CARD"]),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coupon: "",
      payment: "BANK_TRANSFER",
      terms: true,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let transactionDetailsIds;
    if (transactionDetailData && transactionDetailData.length > 0) {
      // Extract transaction_details_id from each item
      transactionDetailsIds = transactionDetailData.map(
        (value: any) => value.transaction_details_id
      );

      const payloadTransaction = {
        data: {
          transactionDetailsId: transactionDetailsIds,
          totalAmount: finalPrice,
          isPaid: false,
          paymentMethod: values.payment,
          coupon: values.coupon,
        },
      };

      const transactionData = sessionStorage.getItem("transaction-data")
        ? JSON.parse(sessionStorage.getItem("transaction-data")!)
        : null;

      const payloadUltimate = {
        ...transactionData,
        transactions: payloadTransaction?.data,
      };


      const userData =
        localStorage.getItem("tkn") || sessionStorage.getItem("tkn");

      console.log("payload siap kirim:", payloadUltimate);
      try {
        const send = await basicGetApi.post(
          `/transaction/${payloadUltimate.event.event_id}`,
          {
            payloadUltimate,
          },
          {
            headers: {
              Authorization: `Bearer ${userData}`,
            },
          }
        );
        console.log("Ini send:", send);
        transactionData.transaction = {
          transaction_id: send.data.result.transaction_id,
          payment_method: values.payment,
          total: finalPrice,
        };
        if (coupon) {
          transactionData.coupon = true;
        }
        sessionStorage.setItem(
          "transaction-data",
          JSON.stringify(transactionData)
        );
        // route.push(`/transaction/confirm/${send.data.result.transaction_id}`);
        route.push(`/transaction/payment`);
      } catch (error) {
        console.log("Ini error", error);
      }
    }
  }
  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="bg-white w-full h-full lg:px-48 py-10 flex flex-col gap-20 ">
      <div className="bg-white lg:grid lg:grid-cols-[2fr_1fr] relative ">
        <div className="lg:flex lg:flex-col lg:items-start lg:justify-start px-5 rounded-xl">
          <div className="flex flex-col justify-start items-start w-full gap-8">
            {/* <h1 className="font-bold text-2xl p-3">Order Details</h1> */}
            <Card className="w-full h-full p-3">
              <CardHeader>
                <h1 className="font-bold text-2xl">Event Details</h1>
              </CardHeader>
              <CardContent className="flex flex-col gap-8">
                <div className="Event flex gap-8 md:flex-row flex-col">
                  <div className="img w-72 h-44 bg-red-500 rounded-lg">
                    <img src={eventData.imgEvent} className="w-full h-full" />
                  </div>
                  <div className="event details flex flex-col gap-3">
                    <h1 className="font-bold text-2xl">{eventData.title}</h1>
                    <div className="flex-col flex text-md md:text-xl justify-center gap-2">
                      <h1 className="flex gap-3 items-center">
                        {" "}
                        <IoLocationOutline />
                        {eventData.event_location.address_name}{" "}
                        {eventData.event_location.address}
                      </h1>
                      <h1 className="flex gap-3 items-center">
                        {" "}
                        <IoMdTime />
                        {eventData.startTime} - {eventData.endTime}{" "}
                        {eventData.timezone}
                      </h1>
                      {eventData.endDate ? (
                        <h1 className="flex gap-3 items-center">
                          {" "}
                          <MdDateRange /> {eventData.startDate.slice(
                            0,
                            10
                          )} - {eventData.endDate.slice(0, 10)}
                        </h1>
                      ) : (
                        <h1 className="flex gap-3 items-center">
                          {" "}
                          <MdDateRange /> {eventData.startDate}{" "}
                          {eventData.timezone}
                        </h1>
                      )}
                    </div>
                  </div>
                </div>
                <div className="price flex flex-col gap-2">
                  <h1 className="font-bold text-lg">Your Order</h1>
                  <div className="flex flex-col">
                    <div className="ticket w-full grid grid-cols-3 text-base py-3 border-t border-b lg:px-10">
                      <div className="w-full col-span-1 place-items-start">
                        <h1>Ticket Types</h1>
                      </div>
                      <div className="w-full col-span-1 place-items-center">
                        <h1>Quantity</h1>
                      </div>
                      <div className="w-full col-span-1 place-items-end">
                        <h1>Price</h1>
                      </div>
                    </div>
                    <div className="ticket w-full grid grid-cols-3 text-base py-2 lg:px-10">
                      {transactionDetailData.length > 0 ? (
                        transactionDetailData.map(
                          (value: any, index: number) => {
                            return (
                              <div
                                className="w-full col-span-3 grid grid-cols-3 py-2"
                                key={index}
                              >
                                <h1 className="flex items-center justify-start col-span-">
                                  {value?.types}
                                </h1>
                                <h1 className="flex items-center justify-center col-span-">
                                  {value?.quantityBought}
                                </h1>
                                <h1 className="flex items-center justify-end col-span-">
                                  {value?.price}
                                </h1>
                              </div>
                            );
                          }
                        )
                      ) : (
                        <div>No transaction details available</div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="w-full h-full">
              {/* <h1 className="text-2xl font-bold">Your details</h1> */}
              <div>
                <Card className="w-full h-full p-3">
                  <CardHeader>
                    <h1 className="text-xl font-bold">Your details</h1>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg flex flex-col gap-3">
                      <h1>Fullname: {user.name}</h1>
                      <h1>Email: {user.email}</h1>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full relative px-5 lg:px-0 py-8 lg:py-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Card className="p-3">
                <CardHeader>
                  <h1 className="text-xl font-bold">Summary</h1>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 py-3">
                  <div className="flex justify-between">
                    <h1>Total Ticket Price</h1>
                    <h1>Rp. {subtotal}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1>Platform Fee</h1>
                    <h1>Rp. {finalPrice === 0 ? "0" : 50}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1>Discount Coupon</h1>
                    <h1>Rp. {discount}</h1>
                  </div>
                  <div className="flex justify-between  font-bold py-2 text-lg">
                    <h1>Total Price</h1>
                    <h1>Rp. {finalPrice}</h1>
                  </div>
                  <div className="flex flex-col py-2 gap-2">
                    {isCouponValid ? (

                      <h1 className="text-lg font-bold">Choose your coupon</h1>
                    ) : (
                      <h1 className="text-lg font-bold">No coupon available</h1>
                    )}

                    <div className="flex gap-3 justify-between items-center h-full ">
                      {isCouponValid && (
                        <Card className="w-full h-fit px-5 py-3 flex justify-between items-center">
                          <div className="flex flex-col">
                            <h1 className="font-bold">
                              Code:{" "}

                              {
                                eventData?.organizer_coupon
                                  ?.organizer_coupon_code
                              }
                            </h1>
                            <h1 className="text-sm">
                              Disc: Rp.{eventData?.organizer_coupon?.discount}
                            </h1>
                            <h1 className="text-sm">
                              Only {eventData?.organizer_coupon?.quantity} left

                            </h1>
                          </div>
                          <input
                            type="radio"

                            value={eventData?.organizer_coupon?.discount}

                            onChange={(e) => {
                              setDiscount(parseInt(e.target.value));
                              if (e.target.value) {
                                setCoupon(true);
                              } else {
                                setCoupon(false);
                              }
                            }}
                          />
                        </Card>
                      )}
                    </div>
                    <Accordion type="single" collapsible defaultValue="item-1">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <h1 className="text-lg font-bold">Payment Method</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                          <FormField
                            control={form.control}
                            name="payment"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="CREDIT_CARD" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Credit Card
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="BANK_TRANSFER" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Bank Transfer
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="E_WALLET" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        E-Wallet
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <div className="flex gap-2 justify-start items-center w-full">
                    <input type="checkbox" id="terms" value="" />{" "}
                    <h1>I agree to terms and condition</h1>
                  </div>
                  <div className="w-full">
                    <Button className="w-full h-full">Buy now</Button>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
