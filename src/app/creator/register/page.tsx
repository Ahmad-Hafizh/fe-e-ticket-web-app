/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import OrganizationRegis from './OrgRegis';
import BankRegis from './BankRegis';

const CreatorRegisterPage = () => {
  const [page, setPage] = useState(0);
  const [organization, setOrganization] = useState({});
  const [bank, setBank] = useState({});

  const onSubmitAllData = () => {
    console.log({ ...organization, ...bank });
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