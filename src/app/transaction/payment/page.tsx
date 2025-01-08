"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { basicGetApi } from "@/app/config/axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<any>("");

  const route = useRouter();

  const sessionData = JSON.parse(sessionStorage.getItem("transaction-data")!);
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("transaction-data")!);
    if (data) {
      setPaymentMethod(data.transaction.payment_method);


      const formattedRupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(data.transaction.total);

      setTotalPrice(formattedRupiah);
      console.log(totalPrice);
    } else {
      route.push("/");
    }
  }, []);

  const token = localStorage.getItem("tkn") || sessionStorage.getItem("tkn");
  const fileSizeLimit = 10 * 1024 * 1024; //10mb
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("transaction-data")!);
    const totalAmount = data.transaction.total;
    setTotalPrice(totalAmount);
  }, []);


  const formSchema = z.object({
    proofOfPayment: z
      .any()

      .refine((file) => file, { message: "File is required" })

      .refine(
        (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
        { message: "Invalid image file type" }
      )
      .refine((file) => file.size <= fileSizeLimit, {
        message: "File size should not exceed 5MB",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleForm = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("proofOfPayment", values.proofOfPayment); // file input
    formData.append("transactionId", sessionData.transaction.transaction_id); // transactionId

    try {

      const response = await basicGetApi.post("/transaction/proof", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        route.push("/transaction/redirect");
      }

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white w-full h-full lg:px-48 py-10 flex flex-col gap-20 ">
      <div className="bg-white lg:grid lg:grid-cols-[2fr_1fr] relative ">
        <div className="lg:flex lg:flex-col lg:items-start lg:justify-start px-5 rounded-xl">
          <div className="flex flex-col justify-start items-start w-full gap-8">
            {/* <h1 className="font-bold text-2xl p-3">Order Details</h1> */}
            <Card className="w-full h-full p-3">
              <CardHeader>
                <h1 className="font-bold text-2xl">
                  Payment Method :{" "}
                  {paymentMethod === "E_WALLET" ? "E-WALLET" : ""}{" "}
                  {paymentMethod === "BANK_TRANSFER" ? "Bank Transfer" : ""}{" "}
                  {paymentMethod === "CREDIT_CARD" ? "Credit Card" : ""}
                </h1>

                <h1 className="font-bold text-2xl">Amount : {totalPrice}</h1>

              </CardHeader>
              <CardContent className="flex flex-col gap-8">
                {paymentMethod === "E_WALLET" ? (
                  <div>
                    <h1 className="">Please transfer your fund to:</h1>
                    <h1 className="">081233010101010</h1>
                  </div>
                ) : (
                  <></>
                )}
                {paymentMethod === "BANK_TRANSFER" ? (
                  <div>
                    <h1 className="">Please transfer your fund to:</h1>
                    <h1 className="">Bank Mandiri</h1>
                  </div>
                ) : (
                  <></>
                )}
                {paymentMethod === "CREDIT_CARD" ? (
                  <div>
                    <h1 className="">Please transfer your fund to:</h1>
                    <h1 className="">081233010101010</h1>
                  </div>
                ) : (
                  <></>
                )}
              </CardContent>
            </Card>
            <div className="w-full h-full">
              {/* <h1 className="text-2xl font-bold">Your details</h1> */}
              <div>
                <Card className="w-full h-full p-3">
                  <CardHeader>
                    <h1 className="text-xl font-bold">
                      Upload your proof of payment here:
                    </h1>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleForm)}>
                        <FormField
                          control={form.control}
                          name="proofOfPayment"
                          render={({ field }) => (
                            <FormItem className="w-full h-20 relative">
                              <FormControl>
                                <Input
                                  //   {...field}
                                  title="proofOfPayment"
                                  type="file"
                                  onChange={(e) => {
                                    const files = e.target.files;
                                    const file = files?.[0];
                                    console.log("File:", file); // Log the file object
                                    console.log("File type:", file?.type); // Log the file type
                                    field.onChange(file || null);

                                    if (file instanceof File) {
                                      console.log("This is a valid file!");
                                    } else {
                                      console.log("This is not a file!");
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="text-xs ml-6 !mt-0 " />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Submit Payment</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full relative px-5 lg:px-0 py-8 lg:py-0">
          {paymentMethod === "E_WALLET" ? (
            <Card className="p-3">
              <CardHeader>
                <h1 className="text-lg font-bold">How to pay with E-WALLET:</h1>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 py-2">
                <div className="text-sm">
                  <li>Choose “E-Wallet” as your payment method.</li>
                  <li>
                    {" "}
                    Select your preferred e-wallet (e.g., GoPay, OVO, Dana).
                  </li>
                  <li>Confirm the payment amount.</li>
                  <li>
                    {" "}
                    Send the exact amount to the e-wallet address provided.
                  </li>
                  <li>Upload the proof of payment.</li>
                  <li>
                    Wait for the confirmation message. Admin will confirm.
                  </li>
                </div>
              </CardContent>
            </Card>
          ) : (
            <></>
          )}
          {paymentMethod === "BANK_TRANSFER" ? (
            <Card className="p-3">
              <CardHeader>
                <h1 className="text-lg font-bold">
                  How to pay with Bank Transfer:
                </h1>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 py-2">
                <div className="text-sm">
                  <li>
                    Select “Bank Transfer” as the payment method during
                    checkout.
                  </li>
                  <li>
                    {" "}
                    Note the bank account number or transfer details provided.
                  </li>
                  <li>Open your banking app or ATM.</li>
                  <li> Transfer the total amount of your order</li>
                  <li>Upload the proof of payment.</li>
                  <li>
                    Wait for the confirmation message. Admin will confirm.
                  </li>
                </div>
              </CardContent>
            </Card>
          ) : (
            <></>
          )}
          {paymentMethod === "CREDIT_CARD" ? (
            <Card className="p-3">
              <CardHeader>
                <h1 className="text-lg font-bold">
                  How to pay with Credit Card:
                </h1>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 py-2">
                <div className="text-sm">
                  <li>Choose “Credit Card” as your payment method.</li>
                  <li>
                    {" "}
                    Note the bank account number or transfer details provided.
                  </li>
                  <li>Open your banking app or ATM.</li>
                  <li> Transfer the total amount of your order</li>
                  <li>Upload the proof of payment.</li>
                  <li>
                    Wait for the confirmation message. Admin will confirm.
                  </li>
                </div>
              </CardContent>
            </Card>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
