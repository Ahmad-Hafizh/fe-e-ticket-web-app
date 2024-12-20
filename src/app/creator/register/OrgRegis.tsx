/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { z } from 'zod';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  organization_name: z.string().min(4, { message: 'Must be more than 4 or more characters long' }).max(50, { message: 'Must be less than 50 characters long' }),
  organization_email: z.string().email({ message: 'Invalid email address' }).min(4, { message: 'Must be more than 4 or more characters long' }).max(50, { message: 'Must be less than 50 characters long' }),
  organization_phone: z.string().min(4, { message: 'Must be more than 4 or more characters long' }).max(20, { message: 'Must be less than 20 characters long' }),
  organization_address: z.string().min(4, { message: 'Must be more than 4 or more characters long' }).max(150, { message: 'Must be less than 150 characters long' }),
});

interface IOrganizationRegis {
  onNext: () => void;
  setData: (data: any) => void;
  currentData: any;
}

export default function OrganizationRegis({ onNext, setData, currentData }: IOrganizationRegis) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization_name: currentData.organization_name || '',
      organization_email: currentData.organization_email || '',
      organization_phone: currentData.organization_phone || '',
      organization_address: currentData.organization_address || '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setData(values);
    onNext();
  }

  return (
    <div className="w-5/6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="grid grid-rows-4">
            <FormField
              control={form.control}
              name="organization_name"
              render={({ field }) => (
                <FormItem className="w-full h-20 relative">
                  <FormLabel className="text-xs ml-7 absolute top-1">Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization Name" {...field} className="w-full rounded-full pt-8 pb-5 px-7 !mt-0" />
                  </FormControl>
                  <FormMessage className="text-xs ml-6 !mt-0 " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organization_email"
              render={({ field }) => (
                <FormItem className="w-full h-20 relative">
                  <FormLabel className="text-xs ml-7 absolute top-1">Organization Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization Email" {...field} className="w-full rounded-full pt-8 pb-5 px-7 !mt-0" />
                  </FormControl>
                  <FormMessage className="text-xs ml-6 !mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organization_phone"
              render={({ field }) => (
                <FormItem className="w-full h-20 relative">
                  <FormLabel className="text-xs ml-7 absolute top-1">Organization Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization Phone" {...field} className="w-full rounded-full pt-8 pb-5 px-7 !mt-0" />
                  </FormControl>
                  <FormMessage className="text-xs ml-6 !mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organization_address"
              render={({ field }) => (
                <FormItem className="w-full h-20 relative">
                  <FormLabel className="text-xs ml-7 absolute top-1 ">Organization Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization Address" {...field} className="w-full rounded-full pt-8 pb-5 px-7 !mt-0" />
                  </FormControl>
                  <FormMessage className="text-xs ml-6 !mt-0" />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full rounded-full !mt-0">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
