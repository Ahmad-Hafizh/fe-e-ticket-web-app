/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { basicGetApi } from "@/app/config/axios";
// import { useAppSelector } from "@/lib/redux/hooks";
// import { headers } from "next/headers";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { totalmem } from "os";

const TransactionSettingPage = () => {
  const [transactionList, setTransactionList] = useState<any[]>([]);
  const route = useRouter();
  const updateTransaction = async () => {
    const token = localStorage.getItem("tkn") || sessionStorage.getItem("tkn");
    const response = await basicGetApi.get(`transaction/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data.result;
    console.log("Ini data:", data);
    setTransactionList(data);
  };
  useEffect(() => {
    updateTransaction();
  }, []);
  return (
    <>
      <p>Transaction List</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction Number</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionList.map((transaction: any, index: number) => {
            let status = "";
            if (transaction.payment_proof && !transaction.isPaid) {
              status = "Waiting confirmation";
            } else if (transaction.payment_proof && transaction.isPaid) {
              status = "Paid";
            } else if (!transaction.payment_proof) {
              status = "Upload Proof";
            }
            return (
              <TableRow
                key={index}
                className="cursor-pointer"
                onClick={() => {
                  const data = {
                    transaction: {
                      payment_method: transaction.payment_method,
                      total: transaction.total_amount,
                      transaction_id: transaction.transaction_id,
                    },
                  };
                  sessionStorage.setItem(
                    "transaction-data",
                    JSON.stringify(data)
                  );

                  if (status === "Upload Proof") {
                    route.push(".././transaction/payment");
                  }
                }}
              >
                <TableCell className="font-medium">
                  {transaction.transaction_id}
                </TableCell>
                <TableCell>
                  {transaction?.transaction_details[0]?.event?.title || "Event"}
                </TableCell>
                <TableCell>{transaction.payment_method}</TableCell>
                <TableCell>{transaction.total_amount}</TableCell>
                <TableCell className="flex justify-end">
                  {status === "Upload Proof" ? (
                    <p className="bg-blue-700 py-1 px-2 rounded-full text-white w-fit">
                      {status}
                    </p>
                  ) : (
                    <p className="bg-green-700 py-1 px-2 rounded-full text-white w-fit">
                      {status}
                    </p>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default TransactionSettingPage;
