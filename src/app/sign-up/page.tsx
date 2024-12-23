/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Register from './Register';
import Referral from './Referral';

const SignUpPage = () => {
  const [data, setData] = useState<any>({});
  const [userData, setUserData] = useState<any>({});
  const [page, setPage] = useState('register');

  return (
    <div className="grid grid-cols-2 p-10 w-full h-screen ">
      {page === 'register' ? (
        <Register
          onNext={() => setPage('referral')}
          onSetData={(values: any) => {
            setData({ ...data, ...values });
          }}
          onSetUserData={(user: any) => {
            setUserData(user);
          }}
          currentData={data}
        />
      ) : (
        <Referral
          onNext={() => setPage('register')}
          onSetData={(values: any) => {
            setData({ ...data, referralCode: values });
          }}
          onResetData={() => {
            setData({});
          }}
          userData={userData}
          currentData={data}
        />
      )}
      <div className="p-10 flex justify-center items-center bg-gray-100 rounded-xl">
        <div className="w-full relative h-full ">
          <Image src="/signup.svg" fill className="absolute" alt="signup image" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
