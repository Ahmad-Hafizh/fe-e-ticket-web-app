'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/redux/hooks';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { basicGetApi } from '@/app/config/axios';
import { toast } from '@/hooks/use-toast';

const addressSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  zipcode: z.string().optional(),
});

const AddressPage = () => {
  const profile = useAppSelector((state) => state.profileReducer);
  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: profile.address,
      city: profile.city,
      country: profile.country,
      zipcode: profile.zipcode,
    },
  });

  const submitAddress = async (value: z.infer<typeof addressSchema>) => {
    try {
      const token = localStorage.getItem('tkn') || sessionStorage.getItem('tkn');
      const response = await basicGetApi.patch('/users/update-profile', value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      toast({
        title: response.data.message,
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Please check your input again',
        description: <p>there is something wrong</p>,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...addressForm}>
        <form onSubmit={addressForm.handleSubmit(submitAddress)}>
          <div className="flex justify-between">
            <p className="text-2xl">Address</p>
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
                name="address"
                control={addressForm.control}
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="address" className="text-sm">
                      Address
                    </label>
                    <FormControl>
                      <Input id="address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                name="country"
                control={addressForm.control}
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="country" className="text-sm">
                      Country
                    </label>
                    <FormControl>
                      <Input id="country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                name="city"
                control={addressForm.control}
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="city" className="text-sm">
                      City
                    </label>
                    <FormControl>
                      <Input id="city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                name="zipcode"
                control={addressForm.control}
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="zipcode" className="text-sm">
                      Zipcode (optional)
                    </label>
                    <FormControl>
                      <Input id="zipcode" {...field} />
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

export default AddressPage;
