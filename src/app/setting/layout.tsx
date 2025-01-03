import * as React from 'react';
import Link from 'next/link';

interface ISettingLayoutProps {
  children: React.ReactNode;
}

const SettingLayout: React.FunctionComponent<ISettingLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen px-5 xl:px-[15%] grid grid-cols-4 gap-4">
      <div className="border p-10 flex flex-col">
        <Link href="/setting/profile">Profile</Link>
        <Link href="/setting/rewards">Rewards</Link>
        <Link href="/setting/referral">Referral</Link>
        <Link href="/setting/transaction">Transaction</Link>
        <Link href="/sign-in">Switch Account</Link>
        <p>Sign Out</p>
      </div>
      <div className="col-span-3 p-10 flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default SettingLayout;
