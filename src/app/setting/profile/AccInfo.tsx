'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/redux/hooks';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const accInfoSchema = z.object({
  name: z.string().min(4, { message: 'Must be more than 4 or more characters long' }).max(100, { message: 'Must be less than 100 characters long' }),
  phone: z.string().max(20, { message: 'Must be less than 20 characters long' }),
});

const AccInfoPage = () => {
  const user = useAppSelector((state) => state.userReducer);

  const accInfoForm = useForm<z.infer<typeof accInfoSchema>>({
    resolver: zodResolver(accInfoSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
    },
  });

  const submitAccInfo = (value: z.infer<typeof accInfoSchema>) => {
    console.log('ini value acc infov', value);
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...accInfoForm}>
        <form onSubmit={accInfoForm.handleSubmit(submitAccInfo)}>
          <div className="flex justify-between">
            <p className="text-2xl">Account Information</p>
            <div className="flex gap-2">
              <Button type="submit" className="">
                save changes
              </Button>
              <Button type="button" className="bg-transparent border hover:bg-gray-200">
                <IoClose className="text-black" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-4">
            <div className="col-span-2">
              <FormField
                name="name"
                control={accInfoForm.control}
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="fullname" className="text-sm">
                      Fullname
                    </label>
                    <FormControl>
                      <Input id="fullname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <Input id="email" defaultValue={user.email} disabled />
            </div>
            <div className="col-span-1">
              <FormField
                name="phone"
                control={accInfoForm.control}
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="phone" className="text-sm">
                      Phone
                    </label>
                    <FormControl>
                      <Input id="phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccInfoPage;
