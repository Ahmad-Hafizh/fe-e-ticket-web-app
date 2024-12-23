import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/global-components/CustomInput';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  referralCode: z.string().max(8, { message: 'Referral code must be less than 8 characters' }).optional(),
});

interface IReferral {
  onNext: () => void;
  onSetData: (values: any) => void;
  currentData: any;
}

const Referral = ({ onNext, onSetData, currentData }: IReferral) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      referralCode: currentData.referralCode || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSetData(values.referralCode);
  };

  return (
    <div className="p-10 flex justify-center items-start flex-col gap-10 bg-white rounded-xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold ">
          Have a <br /> Referral code
        </h1>
        <p className="text-gray-600">Get yourself a coupon, and your friend a worth point</p>
      </div>
      <div className="w-3/4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="referralCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} title="Referral Code" type="text" placeholder="your friend referral code" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button
                type="button"
                className="w-full rounded-full bg-transparent text-black border hover:text-white"
                onClick={() => {
                  onNext();
                  onSetData(form.getValues().referralCode);
                }}
              >
                Back
              </Button>
              <Button type="submit" className="w-full rounded-full">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Referral;
