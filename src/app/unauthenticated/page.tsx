import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Unauthenticated: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-5">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold">You are not Signed in</h1>
        <p className="text-sm text-center">
          please sign in first to access the page. click the button below to redirect,
          <br /> sign in if you already have an account, sign up if you dont have an account
        </p>
      </div>
      <div className="flex justify-center gap-5">
        <Link href={'/sign-in'}>
          <Button>Sign In</Button>
        </Link>
        <Link href={'/sign-up'}>
          <Button>Sign up</Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthenticated;
