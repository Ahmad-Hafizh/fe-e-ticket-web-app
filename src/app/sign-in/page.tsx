'use client';
import { Input } from '@/components/global-components/CustomInput';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { basicGetApi } from '../config/axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/redux/hooks';
import { signIn } from '@/lib/redux/reducers/userSlice';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  email: z
    .string()
    .min(4, { message: "Email must be more than 4 characters" })
    .max(100, { message: "Email must be less than 100 characters" })
    .email({ message: "email is invalid" }),
  password: z
    .string()
    .min(4, { message: "password must be more than 8 characters" })
    .max(100, { message: "Email must be less than 100 characters" }),
});

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const [remember, setRemember] = useState(false);
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await basicGetApi.post("/users/signin", {
        email: values.email,
        password: values.password,
      });

      dispatch(signIn(response.data.result));
      if (remember) {
        localStorage.setItem('tkn', response.data.result.token);
      } else {
        sessionStorage.setItem('tkn', response.data.result.token);
      }
      route.push('/');

      // localStorage.setItem("tkn", response.data.result.token);
      // const redirect = localStorage.getItem("redirectTo"); //LOCAL STORAGE REDIRECT SATRIO EDIT
      // if (redirect) {
      //   route.push(redirect);
      //   localStorage.removeItem("redirectTo");
      // } else {
      //   route.push("/");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen grid grid-cols-2 p-10">
      <div className="w-full p-20 flex flex-col gap-10 justify-center h-full">
        <div>
          <h1 className="text-6xl">
            Sign to your <br />
            Account
          </h1>
          <p>Sign in to your account to access the feature</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-rows-2 ">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="h-[75px]">
                    <FormControl>
                      <Input
                        {...field}
                        title="Email"
                        placeholder="Enter your email address"
                      />
                    </FormControl>
                    <FormMessage className="!mt-0 ml-5" />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        title="Password"
                        placeholder="Enter your password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage className="!mt-0 ml-5" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-1 items-center ml-5 mb-2">
              <Checkbox id="keep-login-button" onCheckedChange={() => setRemember(!remember)} defaultChecked={remember} />
              <label htmlFor="keep-login-button">Remember me</label>
            </div>
            <Button type="submit" className="w-full rounded-full">
              Sign in
            </Button>
          </form>
        </Form>
      </div>

      <div className="w-full h-full bg-gray-100 rounded-xl">
        <div className="w-full h-full relative">
          <Image src="/signup.svg" alt="sign in image" fill />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
