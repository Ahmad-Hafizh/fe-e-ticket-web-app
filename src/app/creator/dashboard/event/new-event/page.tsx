/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/components/global-components/CustomInput";
import { Textarea } from "@/components/ui/textarea";
import React, { useRef, useState, useEffect } from "react";
import { DatePickerWithRange } from "./DatePickerRange";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { basicGetApi } from "@/app/config/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  eventBanner: z
    .any()
    .refine((file) => file, { message: "File is required" })
    .refine(
      (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file?.type),
      { message: "Invalid image file type" }
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, {
      message: "File size should not exceed 5MB",
    }),
  eventTitle: z
    .string()
    .min(4, { message: "Must be more than 4 characters long" })
    .max(200, { message: "Must be less than 200 characters long" }),
  eventCategory: z
    .array(z.string())
    .min(1, { message: "At least one category must be selected" }),
  eventDescription: z
    .string()
    .min(50, { message: "Must be more than 50 or more characters long" }),
  startEndDate: z.object({
    from: z.date(),
    to: z.date(),
  }),
  startTime: z.string(),
  endTime: z.string(),
  timezone: z.string(),
  addressName: z
    .string()
    .max(100, { message: "must be less than 100 characters long" }),
  address: z
    .string()
    .min(4, { message: "Must be more than e characters long" }),
  city: z.string(),
  country: z.string(),
  zipcode: z.string().optional(),
  organizer_coupon_code: z.string().optional(),
  discount: z.string().optional(),
  quantity: z.string().optional(),
  couponStartEndDate: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

const NewEventPage = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const route = useRouter();

  const fixedCategories = [
    "Music",
    "Festival",
    "International",
    "Nature",
    "Adventure",
    "Foodies",
    "Health",
    "Travel",
    "Pop Culture",
  ];

  const fixedTimezone = ["UTC+7", "UTC+8", "UTC+9"];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventBanner: null,
      eventTitle: "",
      eventCategory: [],
      eventDescription: "",
      startEndDate: {
        from: new Date(),
        to: new Date(),
      },
      startTime: "",
      endTime: "",
      timezone: "UTC+7",
      addressName: "",
      address: "",
      city: "",
      country: "Indonesia",
      zipcode: "",
      organizer_coupon_code: "",
      discount: "",
      quantity: "",
      couponStartEndDate: {
        from: new Date(),
        to: new Date(),
      },
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

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("City: ", values.city);
    try {
      const formData = new FormData();

      formData.append("eventTitle", values.eventTitle);
      formData.append("eventDescription", values.eventDescription);
      formData.append(
        "eventTimeDate",
        JSON.stringify({
          startDate: values.startEndDate.from.toISOString().split("T")[0],
          endDate: values.startEndDate.to.toISOString().split("T")[0],
          startTime: values.startTime,
          endTime: values.endTime,
          timezone: values.timezone,
        })
      );
      formData.append("eventCategory", JSON.stringify(values.eventCategory));
      formData.append(
        "eventLocation",
        JSON.stringify({
          addressName: values.addressName,
          address: values.address,
          city: values.city,
          country: values.country,
          zipcode: values.zipcode,
        })
      );
      formData.append("ticketTypes", JSON.stringify(tickets));
      formData.append(
        "organizerCouponInput",
        JSON.stringify({
          organizer_coupon_code: values.organizer_coupon_code,
          discount: values.discount,
          quantity: values.quantity,
          startDate: values.couponStartEndDate.from.toISOString().split("T")[0],
          endDate: values.couponStartEndDate.to.toISOString().split("T")[0],
        })
      );

      if (values.eventBanner) {
        formData.append("eventBanner", values.eventBanner);
      }

      if (tickets[0]) {
        const token =
          localStorage.getItem("tkn") || sessionStorage.getItem("tkn");

        const response = await basicGetApi.post("/event", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          route.push("/creator/dashboard/event");
        }
        console.log("ini response:", response);
      } else {
        alert("ticket cant be empty");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-5 px-10 gap-10">
      <div className=" flex flex-col gap-10 col-span-3 mb-10">
        <div className="banner"></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 pb-5">
              <p className="text-xl font-bold">Event Banner</p>
              <div className="banner flex flex-col gap-3">
                <div className="w-full h-fit bg-gray-200 rounded-xl overflow-hidden">
                  {imageUrl ? (
                    <img src={imageUrl} className="object-cover" />
                  ) : (
                    <></>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="eventBanner"
                  render={({ field }) => (
                    <FormItem className="mt-3 -mb-0.5">
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) => {
                            const files = e.target.files;
                            const file = files?.[0];
                            console.log("File:", file);
                            console.log("File type:", file?.type);
                            field.onChange(file || null);
                            if (file) {
                              const fileUrl = URL.createObjectURL(file);
                              setImageUrl(fileUrl);
                            }

                            if (file instanceof File) {
                              console.log("This is a valid file!");
                            } else {
                              console.log("This is not a file!");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <h1 className="text-sm px-3 -mt-1 mb-5">
                  File must be less than 10MB
                </h1>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xl font-bold">General Information</p>
              <FormField
                control={form.control}
                name="eventTitle"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl>
                      <Input
                        {...field}
                        title="Event name"
                        placeholder="enter event name"
                      />
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
                        <Textarea
                          {...field}
                          placeholder="event description"
                          id="description"
                        />
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
                <div className="flex flex-col mt-6">
                  <h1 className="text-sm">Timezone</h1>
                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem className="w-full h-[75px]">
                        <FormControl>
                          <Select
                            {...field}
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                            name="timezone"
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              {fixedTimezone.map((timezone) => (
                                <SelectItem key={timezone} value={timezone}>
                                  {timezone}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <p>Category</p>
              <FormField
                control={form.control}
                name="eventCategory"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl>
                      <div className="flex justify-between">
                        {fixedCategories.map((category: any, index: number) => (
                          <div key={index} className="flex">
                            <Input
                              title={category}
                              type="checkbox"
                              id={category}
                              value={category}
                              onChange={(e) => {
                                const updatedCategories = e.target.checked
                                  ? [...field.value, category]
                                  : field.value.filter(
                                      (cat: any) => cat !== category
                                    );
                                field.onChange(updatedCategories);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xl font-bold">Event Address</p>
              <FormField
                control={form.control}
                name="addressName"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl>
                      <Input
                        title="Address name"
                        placeholder="enter the address name"
                        {...field}
                      />
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
                      <Input
                        title="Address"
                        placeholder="enter the address"
                        {...field}
                      />
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
                        <Input title="Country" disabled {...field} />
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
                        <Input
                          title="City"
                          placeholder="enter the city"
                          {...field}
                        />
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
                      <Input
                        title="Zipcode"
                        placeholder="enter the zipcode"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xl font-bold">Event Coupon (Optional)</p>
              <FormField
                control={form.control}
                name="organizer_coupon_code"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl>
                      <Input
                        title="Coupon code"
                        placeholder="enter the coupon code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl>
                      <Input
                        title="Discount (in currency)"
                        placeholder="enter the discount amount"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl>
                      <Input
                        title="Coupon quantity (per transaction)"
                        placeholder="enter coupon quantity"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="couponStartEndDate"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl>
                      <div className="">
                        <label htmlFor="" className="text-sm">
                          Coupon Start and End date
                        </label>
                        <DatePickerWithRange field={field} />
                      </div>
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
        <p className="text-xl font-bold">Ticket</p>
        <div className="flex flex-col gap-2 py-10">
          <Input
            title="Ticket name"
            placeholder="enter ticket name"
            ref={ticketName}
          />
          <Input
            title="Ticket price"
            type="number"
            placeholder="enter ticket price"
            ref={ticketPrice}
          />
          <Input
            title="Quantity"
            type="number"
            placeholder="enter ticket quantity"
            ref={ticketQuantity}
          />
          <Button
            type="button"
            className="w-full rounded-full"
            onClick={addTicket}
          >
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
