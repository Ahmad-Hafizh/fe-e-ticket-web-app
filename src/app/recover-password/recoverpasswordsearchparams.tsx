'use client';
import React, { useRef } from 'react';
import { Input } from '@/components/global-components/CustomInput';
import { Button } from '@/components/ui/button';
// import { basicGetApi } from '../config/axios';
// import { useSearchParams } from 'next/navigation';

const RecoverPassPage = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confPasswordRef = useRef<HTMLInputElement>(null);
  // const searchParams = useSearchParams();
  // const sendNewPassword = async () => {
  //   try {
  //     const token = searchParams.get('a_t');
  //     const response = await basicGetApi.patch(
  //       '/users/recover-password',
  //       { password: passwordRef.current?.value },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     alert(response.data.message || 'success');
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const onSubmit = () => {
    if (passwordRef.current?.value === confPasswordRef.current?.value) {
      // sendNewPassword();
    } else {
      alert('confirm password is not similar');
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-2/5 h-3/4 border rounded-xl py-10 px-20 flex flex-col justify-center items-center gap-10">
        <div>
          <h1 className="text-4xl text-center">Create New Password</h1>
          <p className="text-center">Enter your new password and confirm it</p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Input title="new password" placeholder="Enter your new Password" ref={passwordRef} />
          <Input title="confirm new password" placeholder="Confirm your new Password" ref={confPasswordRef} />
          <Button type="submit" className="w-full rounded-full" onClick={onSubmit}>
            Send Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassPage;
