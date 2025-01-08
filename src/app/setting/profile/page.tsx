'use client';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { basicGetApi } from '@/app/config/axios';
import { addProfile } from '@/lib/redux/reducers/profileSlice';
import AccInfoPage from './AccInfo';
import PersInfoPage from './PersInfo';
import AddressPage from './Address';

const SettingPage = () => {
  const dispatch = useAppDispatch();
  const getProfile = async () => {
    try {
      const token = localStorage.getItem('tkn') || sessionStorage.getItem('tkn');
      const response = await basicGetApi.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addProfile(response.data.result));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const user = useAppSelector((state) => state.userReducer);

  return (
    <>
      <p className="text-5xl font-semibold">Account</p>
      <div className="flex flex-col gap-4">
        <p className="text-2xl">Your Photo</p>
        <div className="flex items-center gap-6 ">
          <div className="w-32 h-32 rounded-full relative border">{user.pfp_url ? <Image src={user.pfp_url} alt="user profile picture" fill className="absolute" /> : <p>loading</p>}</div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="font-semibold">file smaller than 10MB and at least 512px by 512px</p>
              <p className="text-gray-600 w-4/5 leading-tight text-sm">this pictur will be shown as your profile picture. it will also help people and us to recognize you</p>
              <div className="flex items-center gap-2 mt-2">
                <Button type="button">upload</Button>
                <Button type="button" className="bg-transparent border hover:bg-gray-200">
                  <FaRegTrashCan className="text-black" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AccInfoPage />
      <PersInfoPage />
      <AddressPage />
    </>
  );
};

export default SettingPage;
