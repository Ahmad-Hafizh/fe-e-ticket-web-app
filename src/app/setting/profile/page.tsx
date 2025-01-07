'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { basicGetApi } from '@/app/config/axios';
import { addProfile } from '@/lib/redux/reducers/profileSlice';
import { DatePickerForm } from '@/components/global-components/DatePicker';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const accInfoSchema = z.object({
  name: z.string().min(4, { message: 'Must be more than 4 or more characters long' }).max(100, { message: 'Must be less than 100 characters long' }),
  phone: z.string().max(20, { message: 'Must be less than 20 characters long' }),
});
const persInfoSchema = z.object({
  birth_date: z.date().optional(),
  gender: z.string().optional(),
});
const address = z.object({
  address: z.string(),
  city: z.string(),
  country: z.string(),
  zipcode: z.string().optional(),
});

const SettingPage = () => {
  const dispatch = useAppDispatch();
  const getProfile = async () => {
    try {
      const token = localStorage.getItem('tkn') || sessionStorage.getItem('tkn');
      const response = await basicGetApi.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addProfile(response.data.result));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const user = useAppSelector((state) => state.userReducer);
  const profile = useAppSelector((state) => state.profileReducer);

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
    <>
      <p className="text-5xl font-semibold">Account</p>
      <div className="flex flex-col gap-4">
        <p className="text-2xl">Your Photo</p>
        <div className="flex items-center gap-6 ">
          <div className="w-32 h-32 rounded-full relative border">{user.pfp_url ? <Image src={user.pfp_url} alt="user profile picture" fill className="absolute" /> : <p>loading</p>}</div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="font-semibold">file smaller than 10MB and at least 512px by 512px</p>
              <p className="text-gray-600 w-4/5 leading-tight text-sm">this pictur will be shown as your profile picture. it will also help people and us to recognize you</p>
              <div className="flex items-center gap-2 mt-2">
                <Button type="button">upload</Button>
                <Button type="button" className="bg-transparent border hover:bg-gray-200">
                  <FaRegTrashCan className="text-black" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                        <Input id="fullname" defaultValue={user.name} />
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
                <label htmlFor="phone" className="text-sm">
                  Phone
                </label>
                <Input id="phone" defaultValue={user.phone} />
              </div>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="text-2xl">Personal Details</p>
          <div className="flex gap-2">
            <Button type="button" className="">
              save changes
            </Button>
            <Button type="button" className="bg-transparent border hover:bg-gray-200">
              <IoClose className="text-black" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          <div className="col-span-1">
            <label htmlFor="birth_date" className="text-sm">
              Birth date
            </label>
            <Input id="birth_date" type="date" />
            {/* <DatePickerForm /> */}
          </div>
          <div className="col-span-1">
            <label htmlFor="phone" className="text-sm">
              Gender
            </label>
            <Input id="phone" defaultValue={user.phone} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="text-2xl">Address</p>
          <div className="flex gap-2">
            <Button type="button" className="">
              save changes
            </Button>
            <Button type="button" className="bg-transparent border hover:bg-gray-200">
              <IoClose className="text-black" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          <div className="col-span-2">
            <label htmlFor="address" className="text-sm">
              Address
            </label>
            <Input id="address" defaultValue={profile.address} />
          </div>
          <div>
            <label htmlFor="country" className="text-sm">
              Country
            </label>
            <Input id="country" defaultValue={profile.country} />
          </div>
          <div>
            <label htmlFor="city" className="text-sm">
              City
            </label>
            <Input id="city" defaultValue={profile.city} />
          </div>
          <div>
            <label htmlFor="zipcode" className="text-sm">
              Zipcode (optional)
            </label>
            <Input id="zipcode" defaultValue={profile.zipcode} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPage;
