'use client';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/redux/hooks';
import React from 'react';

const PaymentPage = () => {
  const organizerBank = useAppSelector((state) => state.organizerReducer.bank_account);
  return (
    <div className="px-10 flex justify-center items-center h-full">
      <div className="w-3/4 h-[70vh] bg-gray-100 rounded-xl p-10 flex flex-col justify-between">
        <div className="flex justify-between">
          <p className="text-6xl">{organizerBank.bank_name}</p>
          <Button>Edit</Button>
        </div>
        <div className="flex flex-col justify-end gap-2">
          <p className="text-6xl text-gray-500 uppercase">{organizerBank.bank_account_name}</p>
          <p className="text-8xl text-gray-500">{organizerBank.bank_account_number}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
