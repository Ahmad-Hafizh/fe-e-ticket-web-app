/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { z } from 'zod';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/global-components/CustomInput';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  bank_name: z.string().min(4, { message: 'Must be more than 4 or more characters long' }).max(50, { message: 'Must be less than 50 characters long' }),
  bank_account_name: z.string().min(4, { message: 'Must be more than 4 or more characters long' }).max(50, { message: 'Must be less than 50 characters long' }),
  bank_account_number: z.string().min(4, { message: 'Must be more than 4 or more characters long' }).max(20, { message: 'Must be less than 20 characters long' }),
});

interface IBankRegis {
  onNext: () => void;
  setData: (data: any) => void;
  currentData: any;
  onSubmitAllData: () => void;
}

export default function BankRegis({ onNext, setData, currentData, onSubmitAllData }: IBankRegis) {
  const route = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bank_name: currentData?.bank_name || '',
      bank_account_name: currentData?.bank_account_name || '',
      bank_account_number: currentData?.bank_account_number || '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setData(values);
    onSubmitAllData();
    route.replace('/creator/dashboard');
  }

  return (
    <div className="w-5/6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="grid grid-rows-3">
            <FormField
              control={form.control}
              name="bank_name"
              render={({ field }) => (
                <FormItem className="w-full h-20 relative">
                  <FormControl>
                    <Input placeholder="Enter Bank Name" {...field} title="Bank Name" />
                  </FormControl>
                  <FormMessage className="text-xs ml-6 !mt-0 " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bank_account_name"
              render={({ field }) => (
                <FormItem className="w-full h-20 relative">
                  <FormControl>
                    <Input placeholder="Bank Account Name" {...field} title="Bank Account Name" />
                  </FormControl>
                  <FormMessage className="text-xs ml-6 !mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bank_account_number"
              render={({ field }) => (
                <FormItem className="w-full h-20 relative">
                  <FormControl>
                    <Input placeholder="Bank Account Number" {...field} title="Bank Account Number" />
                  </FormControl>
                  <FormMessage className="text-xs ml-6 !mt-0" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6 !mt-0">
            <Button
              type="button"
              className="w-full rounded-full !mt-0 border bg-white text-black hover:text-white"
              onClick={() => {
                onNext();
                setData(form.getValues());
              }}
            >
              Previous
            </Button>
            <Button type="submit" className="w-full rounded-full !mt-0">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
