/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from '../event/DataTable';
import { basicGetApi } from '@/app/config/axios';
import { columns } from './columns';

interface ITrans {
  date: string;
  event: string;
  isPaid: boolean;
  payment_method: string;
  total_amount: number;
  transaction_id: number;
  payment_proof: string | null;
}

const TransactionEOPage = () => {
  const [trans, setTrans] = useState<ITrans[]>([]);

  const getTransData = async () => {
    try {
      const token = localStorage.getItem('tkn') || sessionStorage.getItem('tkn');
      const response = await basicGetApi.get('/transaction/organizer', { headers: { Authorization: `Bearer ${token}` } });
      const dataTable: any[] = response.data.result;
      const transformedData = dataTable.map((e: any) => {
        return {
          transaction_id: e.transaction_id,
          date: e.createdAt,
          event: e.transaction_details[0].event.title,
          isPaid: e.isPaid,
          payment_method: e.payment_method,
          total_amount: e.total_amount,
          payment_proof: e.payment_proof,
        };
      });
      setTrans([...trans, ...transformedData]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransData();
  }, []);

  return (
    <div className="px-10 flex flex-col gap-4">
      <div>
        <DataTable columns={columns} data={trans} />
      </div>
    </div>
  );
};

export default TransactionEOPage;
