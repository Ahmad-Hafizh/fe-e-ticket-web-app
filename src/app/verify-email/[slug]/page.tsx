'use client';
import { Button } from '@/components/ui/button';
import React, { Suspense } from 'react';
import { basicGetApi } from '../../config/axios';
// import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface IVerifyEmailPage {
  params: Promise<{ slug: string }>;
}

const VerifyEmailPage: React.FC<IVerifyEmailPage> = ({ params }) => {
  const route = useRouter();
  const onVerify = async () => {
    try {
      const token = (await params).slug;
      // const token = queryUrl.get('a_t');
      const response = await basicGetApi.patch('/users/verify', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      alert('verify success');
      route.replace('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Suspense>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-2/5 h-3/4 border rounded-xl py-10 px-20 flex flex-col justify-center items-center gap-10">
          <div>
            <h1 className="text-5xl text-center">Verify Your Email</h1>
            <p className="text-center mt-2">
              click the button below to verify your email <br />
              and enjoy all the features
            </p>
          </div>
          <Button type="button" onClick={onVerify} className=" rounded-full">
            Verify Email
          </Button>
        </div>
      </div>
    </Suspense>
  );
};

export default VerifyEmailPage;
