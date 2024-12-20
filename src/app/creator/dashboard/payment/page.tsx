import { Button } from '@/components/ui/button';
import React from 'react';

const PaymentPage = () => {
  return (
    <div className="px-10 flex justify-center items-center h-full">
      <div className="w-3/4 h-[70vh] bg-gray-100 rounded-xl p-10 flex flex-col justify-between">
        <div className="flex justify-between">
          <p className="text-6xl">Visa</p>
          <Button>Edit</Button>
        </div>
        <div className="flex flex-col justify-end gap-2">
          <p className="text-6xl text-gray-500">JOHN DOE</p>
          <p className="text-8xl text-gray-500">0121 1313 1331</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
