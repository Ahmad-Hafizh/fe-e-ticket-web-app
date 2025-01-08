"use client";
import { basicGetApi } from "@/app/config/axios";
import { useAppSelector } from "@/lib/redux/hooks";
import { headers } from "next/headers";
import React, { useEffect, useState } from "react";

const TransactionSettingPage = () => {
  const [transactionList, setTransactionList] = useState<any[]>([]);
  const token = localStorage.getItem("tkn") || sessionStorage.getItem("tkn");

  const updateTransaction = async () => {
    const response = await basicGetApi.get(`transaction/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("Ini data:", data);
    setTransactionList(data);
  };
  useEffect(() => {
    updateTransaction();
  }, []);
  return (
    <>
      <p>Transaction List</p>
    </>
  );
};

export default TransactionSettingPage;
