import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Unauthenticated: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-5">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold">You are not a organizer</h1>
        <p className="text-sm text-center">
          please register to be a user. click the button below to redirect,
          <br /> Register if you wanna be an organizer
        </p>
      </div>
      <div className="flex justify-center gap-5">
        <Link href={'/creator/register'}>
          <Button>Register</Button>
        </Link>
        <Link href={'/'}>
          <Button>Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthenticated;
