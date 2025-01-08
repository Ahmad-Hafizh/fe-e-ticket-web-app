'use client';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/redux/hooks';
import React from 'react';
import { IoClose } from 'react-icons/io5';
// import { DatePickerForm } from '@/components/global-components/DatePicker';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { basicGetApi } from '@/app/config/axios';

const persInfoSchema = z.object({
  birth_date: z.date().optional(),
  gender: z.string().optional(),
});

const PersInfoPage = () => {
  const profile = useAppSelector((state) => state.profileReducer);

  const persInfoForm = useForm<z.infer<typeof persInfoSchema>>({
    resolver: zodResolver(persInfoSchema),
    defaultValues: {
      birth_date: new Date(profile.birth_date as string),
      gender: profile.gender,
    },
  });

  const submitPersInfo = async (value: z.infer<typeof persInfoSchema>) => {
    try {
      const token = localStorage.getItem('tkn') || sessionStorage.getItem('tkn');
      const response = await basicGetApi.patch('/users/update-profile', value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      toast({
        title: response.data.message,
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Please check your input again',
        description: <p>there is something wrong</p>,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...persInfoForm}>
        <form onSubmit={persInfoForm.handleSubmit(submitPersInfo)}>
          <div className="flex justify-between">
            <p className="text-2xl">Personal Details</p>
            <div className="flex gap-2">
              <Button type="submit" className="">
                save changes
              </Button>
              <Button type="button" className="bg-transparent border hover:bg-gray-200">
                <IoClose className="text-black" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 align-middle">
            <div className="col-span-1 flex items-end">
              <FormField
                control={persInfoForm.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="w-full">
                          <Button variant={'outline'} className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                            {field.value instanceof Date && !isNaN(field.value.getTime()) ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date('1900-01-01')} initialFocus captionLayout="dropdown" />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                name="gender"
                control={persInfoForm.control}
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="gender" className="text-sm">
                      Gender
                    </label>
                    <FormControl>
                      <Input id="gender" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersInfoPage;
