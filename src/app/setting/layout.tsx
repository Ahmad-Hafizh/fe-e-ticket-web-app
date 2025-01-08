import * as React from 'react';
import Link from 'next/link';
// import { AuthGuard } from '@/guard/AuthGuard';

interface ISettingLayoutProps {
  children: React.ReactNode;
}

const SettingLayout: React.FunctionComponent<ISettingLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen px-5 xl:px-[15%] grid grid-cols-4 gap-4">
      <div className="flex flex-col relative">
        <div className="sticky top-32 border flex flex-col">
          <Link href="/setting/profile">Profile</Link>
          <Link href="/setting/rewards">Rewards</Link>
          <Link href="/setting/referral">Referral</Link>
          <Link href="/setting/transaction">Transaction</Link>
          <Link href="/sign-in">Switch Account</Link>
          <p>Sign Out</p>
        </div>
      </div>
      <div className="col-span-3 p-10 flex flex-col gap-10">{children}</div>
    </div>
  );
};

export default SettingLayout;
