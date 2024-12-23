/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
// import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/global-components/CustomInput';
import { basicGetApi } from '../config/axios';

const formSchema = z.object({
  name: z.string().min(4, { message: 'Must be more than 4 or more characters long' }).max(100, { message: 'Must be less than 100 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }).min(4, { message: 'Must be more than 4 or more characters long' }).max(100, { message: 'Must be less than 100 characters long' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).max(100, { message: 'Password must be less than 100 characters long' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }).max(100, { message: 'Password must be less than 100 characters long' }),
});

interface IRegister {
  onNext: () => void;
  onSetData: (values: any) => void;
  currentData: any;
  onSetUserData: (user: any) => void;
}

const Register = ({ onNext, onSetData, currentData, onSetUserData }: IRegister) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentData.name || undefined,
      email: currentData.email || undefined,
      password: currentData.password || undefined,
      confirmPassword: currentData.confirmPassword || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.password != values.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Password does not match',
      });
    } else {
      onSetData(values);
      try {
        const response = await basicGetApi.post('/users/signup', {
          name: values.name,
          email: values.email,
          password: values.password,
        });

        console.log(response.data.result);
        onSetUserData(response.data.result);
        alert('account added');
        onNext();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="p-10 flex justify-center items-start flex-col gap-10 bg-white rounded-xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold ">
          Create your <br /> Account
        </h1>
        <p className="text-gray-600">Lets start joining events that you like, get your ticket from anywhere</p>
      </div>
      <div className="w-3/4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-rows-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full h-[75px]">
                    <FormControl className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input {...field} placeholder="Enter your fullname" className="w-full" title="Fullname" />
                    </FormControl>
                    <FormMessage className="ml-5 !mt-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input {...field} placeholder="Enter your email address" className="w-full" title="Email" />
                    </FormControl>
                    <FormMessage className="ml-5 !mt-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input {...field} placeholder="Enter your password" className="w-full" title="Password" type="password" />
                    </FormControl>
                    <FormMessage className="ml-5 !mt-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input {...field} placeholder="confirm your password" className="w-full" title="Confirm Password" type="password" />
                    </FormControl>
                    <FormMessage className="ml-5 !mt-0" />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="!mt-2 w-full rounded-full">
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
