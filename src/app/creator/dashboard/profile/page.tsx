'use client';
// import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/lib/redux/hooks';
// import { Label } from '@/components/ui/label';
import React from 'react';

const Profile = () => {
  const profile = useAppSelector((state) => state.organizerReducer);
  return (
    <div className="w-full h-full flex flex-col px-10">
      <div className="flex flex-col gap-4">
        <div className="w-full h-80 bg-gray-100 rounded-t-xl">{/* <Image/> */}</div>
        <div className=" flex px-10 relative">
          <div className="relative mt-[-80px]">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-100 border-white border-4 z-10">{/* <Image/> */}</div>
          </div>
          <div className="flex-1 flex items-start mt-3 justify-between ml-5 gap-2">
            <div>
              <p className="text-3xl ">{profile.organizer_name}</p>
              <p>{profile.organizer_email}</p>
            </div>
            {/* <button className="border px-4 py-2">upload new photo</button> */}
            {/* <input type="file" className="" placeholder="upload new photo" />
            <p className="text-sm text-gray-500">
              At least 512x512 px recommended <br />
              Image file only
            </p> */}
            <div className="flex gap-4">
              <Button type="button">Discard</Button>
              <Button type="button">Save</Button>
            </div>
          </div>
        </div>
        <div className="my-10 px-10 w-4/5 flex flex-col gap-4">
          <div className="grid grid-cols-3">
            <p>Name</p>
            <Input type="text" placeholder="Organization Name" className="col-span-2" defaultValue={profile.organizer_name} />
          </div>
          <div className="grid grid-cols-3">
            <p>Email</p>
            <Input type="text" placeholder="Organization Email" className="col-span-2" defaultValue={profile.organizer_email} />
          </div>
          <div className="grid grid-cols-3">
            <p>Phone</p>
            <Input type="text" placeholder="Organization Phone" className="col-span-2" defaultValue={profile.organizer_phone} />
          </div>
          <div className="grid grid-cols-3">
            <p>Bio</p>
            <textarea name="bio" id="bio" className="w-full border rounded col-span-2" defaultValue={profile.organizer_bio} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
