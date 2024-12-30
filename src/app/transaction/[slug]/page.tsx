/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IoMdTime } from 'react-icons/io';
import { MdDateRange } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { basicGetApi } from '@/app/config/axios';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const slug = (await params).slug;
        console.log('getting data');
        const responseEvent = await basicGetApi.get(`event/${slug}`);
        console.log(responseEvent);
        setEventData(responseEvent.data.result);

        const responseTransaction = await basicGetApi.get(`transaction/details/18`);
        //18 represent user. But this logic is totally WRONG. What if user had previous order?
        console.log('tICKET RESPONSE: ', responseTransaction.data.result);
        setTransactionDetailData(responseTransaction.data.result);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    console.log('getting data');
    getData();
  }, []);

  useEffect(() => {
    if (transactionDetailData) {
      let finalPrice = 0;
      let pretotal = 0;
      let platformFee = 50;
      transactionDetailData.forEach((value: any) => {
        pretotal += value.subtotal;
      });
      setSubtotal(pretotal);
      finalPrice = pretotal + platformFee - discount;
      setFinalPrice(finalPrice);
    }
  }, [transactionDetailData]);

  //form validation
  const formSchema = z.object({
    coupon: z.string().optional(),
    payment: z.enum(['BANK_TRANSFER', 'E_WALLET', 'CREDIT_CARD']),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coupon: '',
      payment: 'BANK_TRANSFER',
      terms: true,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('transactiondetaildata:', transactionDetailData);
    let transactionDetailsIds;
    if (transactionDetailData && transactionDetailData.length > 0) {
      // Extract transaction_details_id from each item
      transactionDetailsIds = transactionDetailData.map((value: any) => value.transaction_details_id);

      const payloadTransaction = {
        data: {
          evenId: eventData.event_id,
          transactionDetailsId: transactionDetailsIds,
          totalAmount: finalPrice,
          isPaid: false,
          paymentMethod: values.payment,
          coupon: values.coupon,
        },
      };

      console.log('payload:', payloadTransaction);
      try {
        const postTransaction = await basicGetApi.post('/transaction', payloadTransaction);
        route.push('/transaction/confirm');
      } catch (error) {
        console.log(error);
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
                    <div className="flex-col flex text-lg md:text-xl justify-center gap-2">
                      <h1 className="flex gap-3">
                        {' '}
                        <IoLocationOutline />
                        {eventData.event_location.address_name} {eventData.event_location.address}
                      </h1>
                      <h1 className="flex gap-3">
                        {' '}
                        <IoMdTime />
                        {eventData.startTime} - {eventData.endTime}
                      </h1>
                      {eventData.endDate ? (
                        <h1 className="flex gap-3">
                          {' '}
                          <MdDateRange /> {eventData.startDate} - {eventData.endDate} {eventData.timezone}
                        </h1>
                      ) : (
                        <h1 className="flex gap-3">
                          {' '}
                          <MdDateRange /> {eventData.startDate} {eventData.timezone}
                        </h1>
                      )}
                    </div>
                  </div>
                </div>
                <div className="price flex flex-col gap-2">
                  <h1 className="font-bold text-lg">Your Order</h1>
                  <div className="flex flex-col">
                    <div className="ticket w-full flex justify-between text-base py-2 border-t border-b lg:px-7">
                      <div>
                        <h1>Ticket Types</h1>
                      </div>
                      <div>
                        <h1>Quantity</h1>
                      </div>
                      <div>
                        <h1>Price</h1>
                      </div>
                    </div>
                    <div className="ticket w-full flex flex-col justify-between text-base py-2 lg:px-7">
                      {transactionDetailData.length > 0 ? (
                        transactionDetailData.map((value: any, index: number) => {
                          return (
                            <div className="w-full flex justify-between" key={index}>
                              <h1>{value.ticket_types.types}</h1>
                              <h1>{value.quantity_bought}</h1>
                              <h1>{value.ticket_types.price}</h1>
                            </div>
                          );
                        })
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
                    <h1 className="text-2xl font-bold">Your details</h1>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl flex flex-col gap-3">
                      <h1>Fullname: {transactionDetailData[0]?.user?.name as any}</h1>
                      <h1>Email: {transactionDetailData[0]?.user?.email as any}</h1>
                      <h1>Phone Number: {transactionDetailData[0]?.user?.profile?.phone as any}</h1>
                      <h1>Address: </h1>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Card>
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
                    <h1>Rp. 50</h1>
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
                    <h1>Input your coupon</h1>
                    <div className="flex gap-3 justify-between items-center h-full ">
                      <input type="text" className="h-8 w-full border rounded-lg shadow-sm p-2" />
                      <Button type="button">Input coupon</Button>
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
                                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="CREDIT_CARD" />
                                      </FormControl>
                                      <FormLabel className="font-normal">Credit Card</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="BANK_TRANSFER" />
                                      </FormControl>
                                      <FormLabel className="font-normal">Bank Transfer</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="E_WALLET" />
                                      </FormControl>
                                      <FormLabel className="font-normal">E-Wallet</FormLabel>
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
                    <input type="checkbox" id="terms" value="" /> <h1>I agree to terms and condition</h1>
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
