'use client';
import { Input } from '@/components/global-components/CustomInput';
import { Button } from '@/components/ui/button';
import React, { useRef } from 'react';
import { basicGetApi } from '../config/axios';

const ForgotPassPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const sendRecovery = async () => {
    try {
      const response = await basicGetApi.post('/users/forgot-password', { email: emailInputRef.current?.value });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-2/5 h-3/4 border rounded-xl py-10 px-20 flex flex-col justify-center items-center gap-10">
        <div>
          <h1 className="text-4xl text-center">Forgot Your Password?</h1>
          <p className="text-center">enter your email we will send you a recovery link</p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Input title="Email" placeholder="Enter your recovery email" ref={emailInputRef} />
          <Button type="submit" className="w-full rounded-full" onClick={sendRecovery}>
            Send Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
