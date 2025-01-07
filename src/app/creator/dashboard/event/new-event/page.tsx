/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Input } from '@/components/global-components/CustomInput';
import { Textarea } from '@/components/ui/textarea';
import React, { useRef, useState } from 'react';
import { DatePickerWithRange } from './DatePickerRange';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { basicGetApi } from '@/app/config/axios';

const formSchema = z.object({
  eventTitle: z.string().min(4, { message: 'Must be more than 4 characters long' }).max(200, { message: 'Must be less than 200 characters long' }),
  eventCategory: z.string(),
  eventDescription: z.string().min(50, { message: 'Must be more than 50 or more characters long' }),
  startEndDate: z.object({
    from: z.date(),
    to: z.date(),
  }),
  startTime: z.string(),
  endTime: z.string(),
  timezone: z.string(),
  addressName: z.string().max(100, { message: 'must be less than 100 characters long' }),
  address: z.string().min(4, { message: 'Must be more than e characters long' }),
  city: z.string(),
  country: z.string(),
  zipcode: z.string().optional(),
});

const NewEventPage = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventTitle: '',
      eventCategory: '',
      eventDescription: '',
      startEndDate: {
        from: new Date(),
        to: new Date(),
      },
      startTime: '',
      endTime: '',
      timezone: 'UTC',
      addressName: '',
      address: '',
      city: '',
      country: '',
    },
  });
  const ticketName = useRef<HTMLInputElement>(null);
  const ticketPrice = useRef<HTMLInputElement>(null);
  const ticketQuantity = useRef<HTMLInputElement>(null);
  const addTicket = () => {
    setTickets([
      ...tickets,
      {
        types: ticketName.current?.value,
        price: ticketPrice.current?.value,
        quantityAvailable: ticketQuantity.current?.value,
      },
    ]);
  };
  const deleteTicket = (idx: number) => {
    setTickets(tickets.filter((e, i) => i != idx));
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const token = localStorage.getItem('tkn') || sessionStorage.getItem('tkn');
      if (tickets[0]) {
        console.log(values, tickets);
        const response = await basicGetApi.post(
          '/event',
          {
            eventTitle: values.eventTitle,
            eventDescription: values.eventDescription,
            eventTimeDate: {
              startDate: values.startEndDate.from,
              endDate: values.startEndDate.to,
              startTime: values.startTime,
              endTime: values.endTime,
              timezone: 'UTC+7',
            },
            eventCategory: values.eventCategory.split(','),
            eventLocation: {
              addressName: values.addressName,
              address: values.address,
              city: values.city,
              country: values.country,
              zipcode: values.zipcode,
            },
            ticketTypes: [...tickets],
            eventImg: 'http://anythinganything.com',
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response);
      } else {
        alert('ticket cant be empty');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-5 px-10 gap-10">
      <div className=" flex flex-col gap-10 col-span-3 mb-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <p className="text-xl">Event Banner</p>
              <div className="w-full h-80 bg-gray-200 rounded-xl overflow-hidden">{/* <Image/> */}</div>
              <Input type="file" id="eventimg" />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xl">General Information</p>
              <FormField
                control={form.control}
                name="eventTitle"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl>
                      <Input {...field} title="Event name" placeholder="enter event name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventCategory"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl>
                      <Input title="Event category" placeholder='enter event category, separate each category with ","' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventDescription"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl>
                      <div>
                        <label htmlFor="description" className="text-sm">
                          Description
                        </label>
                        <Textarea {...field} placeholder="event description" id="description" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="startEndDate"
                  render={({ field }) => (
                    <FormItem className="w-full h-[75px]">
                      <FormControl>
                        <div className="">
                          <label htmlFor="" className="text-sm">
                            Start-End date
                          </label>
                          <DatePickerWithRange field={field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="w-full h-[75px]">
                      <FormControl>
                        <div>
                          <label htmlFor="start-time" className="text-sm">
                            Start Time
                          </label>
                          <Input type="time" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem className="w-full h-[75px]">
                      <FormControl>
                        <div>
                          <label htmlFor="end-time" className="text-sm">
                            End Time
                          </label>
                          <Input type="time" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem className="w-full h-[75px]">
                      <FormControl>
                        <div>
                          <label htmlFor="start-time" className="text-sm">
                            Time Zone
                          </label>
                          <Input type="text" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xl">Event Address</p>
              <FormField
                control={form.control}
                name="addressName"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl>
                      <Input title="Address name" placeholder="enter the address name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl>
                      <Input title="Address" placeholder="enter the address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full h-[75px]">
                      <FormControl>
                        <Input title="Country" placeholder="enter the country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full h-[75px]">
                      <FormControl>
                        <Input title="City" placeholder="enter the city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl>
                      <Input title="Zipcode" placeholder="enter the zipcode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </div>
      <div className="col-span-2 border p-10 h-fit rounded-xl">
        <p className="text-xl">Ticket</p>
        <div className="flex flex-col gap-2 py-10">
          <Input title="Ticket name" placeholder="enter ticket name" ref={ticketName} />
          <Input title="Ticket price" type="number" placeholder="enter ticket price" ref={ticketPrice} />
          <Input title="Quantity" type="number" placeholder="enter ticket quantity" ref={ticketQuantity} />
          <Button type="button" className="w-full rounded-full" onClick={addTicket}>
            Add Ticket
          </Button>
        </div>
        <div className="w-full flex flex-col gap-2">
          {tickets.map((e, i) => (
            <Card className="p-4 flex justify-between" key={i}>
              <div>
                <p>{e.types}</p>
                <p>Rp. {e.price}</p>
                <p>{e.quantityAvailable} seats</p>
              </div>
              <div className="flex flex-col gap-1">
                {/* <Button type="button">Edit</Button> */}
                <Button type="button" onClick={() => deleteTicket(i)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewEventPage;
