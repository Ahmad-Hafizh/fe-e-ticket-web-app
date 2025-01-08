/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import OrganizationRegis from './OrgRegis';
import BankRegis from './BankRegis';
import { basicGetApi } from '@/app/config/axios';
import { useRouter } from 'next/navigation';

interface IOrganization {
  organization_name: string;
  organization_email: string;
  organization_phone: string;
  organization_address: string;
}

interface IBank {
  bank_name: string;
  bank_account_name: string;
  bank_account_number: string;
}

const CreatorRegisterPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [organization, setOrganization] = useState<IOrganization | null>(null);
  const [bank, setBank] = useState<IBank | null>(null);
  const router = useRouter();

  const onSubmitAllData = async () => {
    try {
      const token = localStorage.getItem('tkn');
      const response = await basicGetApi.patch(
        '/users/update-role',
        {
          organizer_name: organization?.organization_name,
          organizer_email: organization?.organization_email,
          organizer_phone: organization?.organization_phone,
          organizer_address: organization?.organization_address,
          bank_name: bank?.bank_name,
          bank_account_name: bank?.bank_account_name,
          bank_account_number: bank?.bank_account_number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('update success');
      console.log(response);
      router.push('/creator/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 grid grid-cols-2 p-10">
      <div></div>
      {page === 0 ? (
        <div className="bg-white rounded-xl py-10 px-20 flex flex-col gap-10 justify-center items-center">
          <div>
            <h1 className="text-5xl font-bold text-center">Unlock the power of Event Organizer</h1>
            <p className="text-center mt-4">
              Lorem ipsum dolor sit amet consectetur, <br />
              adipisicing elit. Iure, totam?
            </p>
          </div>
          <OrganizationRegis
            onNext={() => {
              setPage(1);
            }}
            setData={(data: any) => {
              setOrganization(data);
            }}
            currentData={organization}
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl py-10 px-20 flex flex-col gap-10 justify-center items-center">
          <div>
            <h1 className="text-5xl font-bold text-center">Register Bank Account</h1>
            <p className="text-center mt-4">
              Lorem ipsum dolor sit amet consectetur, <br />
              adipisicing elit. Iure, totam?
            </p>
          </div>
          <BankRegis
            onNext={() => {
              setPage(0);
            }}
            setData={(data: any) => {
              setBank(data);
            }}
            currentData={bank}
            onSubmitAllData={onSubmitAllData}
          />
        </div>
      )}
    </div>
  );
};

export default CreatorRegisterPage;
