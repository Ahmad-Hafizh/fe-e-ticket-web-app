import { Input } from '@/components/global-components/CustomInput';
import React from 'react';

const SettingPage = () => {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-40 h-40 rounded-full bg-slate-200"></div>
        <div className="flex flex-col gap-2">
          <p className="text-xl">Upload new profile picture</p>
          <div>
            <input type="file" />
            <p className="text-xs">minimal 512x512 px at max 32 mb</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl">Personal Information</p>
        <Input title="fullname" value={'john doe'} />
        <Input title="email" value={'johndoe@gmail.com'} />
        <Input title="phone" value={'085810602695'} />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl">Address</p>
        <div>
          <p>home address</p>
          <Input title="country" value={'indonesia'} />
          <Input title="city" value={'surabaya'} />
          <Input title="address" value={'jl pemuda'} />
          <Input title="zip code" value={'121313'} />
        </div>
      </div>
    </>
  );
};

export default SettingPage;
