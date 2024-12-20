'use client';
import React, { useState } from 'react';
import OrganizationRegis from './OrgRegis';
import BankRegis from './BankRegis';

const CreatorRegisterPage = () => {
  const [page, setPage] = useState(0);
  console.log(page);

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
          />
        </div>
      )}
    </div>
  );
};

export default CreatorRegisterPage;
