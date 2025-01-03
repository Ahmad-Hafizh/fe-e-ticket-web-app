'use client';
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useAppSelector } from '@/lib/redux/hooks';
import { basicGetApi } from '@/app/config/axios';

interface IDataStat {
  date: string | Date;
  total_revenue: string;
  total_seat: string;
  total_transaction: string;
}

const DashboardPage = () => {
  const profile = useAppSelector((state) => state.organizerReducer);
  const [dataRange, setDataRange] = useState('week');
  const [data, setData] = useState<IDataStat[]>([]);

  const endDate = new Date();
  const dataBody = {
    range: 'DAY',
    end: endDate.toISOString().split('T')[0],
    start: new Date(new Date().setDate(endDate.getDate() - 6)).toISOString().split('T')[0],
    datasCount: 7,
  };

  if (dataRange === 'week') {
    dataBody.range = 'DAY';
    dataBody.end = endDate.toISOString().split('T')[0];
    dataBody.start = new Date(new Date().setDate(endDate.getDate() - 6)).toISOString().split('T')[0];
    dataBody.datasCount = 7;
  } else if (dataRange === 'month') {
    dataBody.range = 'WEEK';
    dataBody.end = endDate.toISOString();
    dataBody.start = new Date(new Date().setMonth(endDate.getMonth() - 1)).toISOString();
    dataBody.datasCount = 4;
  } else if (dataRange === 'year') {
    dataBody.range = 'MONTH';
    dataBody.end = endDate.toISOString();
    dataBody.start = new Date(new Date().setFullYear(endDate.getFullYear() - 1)).toISOString();
    dataBody.datasCount = 12;
  }

  const getStat = async () => {
    try {
      const token = localStorage.getItem('tkn');
      const response = await basicGetApi.post(
        '/organizer/stat',
        {
          range: dataBody.range,
          end: dataBody.end,
          start: dataBody.start,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStat();
  }, [dataRange]);

  const dateData = Array.from({ length: dataBody.datasCount }).map((e, i) => {
    const date = new Date(dataBody.start);
    const startWeek = new Date(dataBody.start);

    if (dataBody.range == 'DAY') {
      date.setDate(date.getDate() + i);
      const foundData = data.find((v) => new Date(v.date).getDate() === date.getDate());
      if (foundData) {
        return { date: date.toLocaleString(undefined, { day: '2-digit', month: 'long', year: 'numeric' }), desktop: foundData.total_revenue };
      } else {
        return { date: date.toLocaleString(undefined, { day: '2-digit', month: 'long', year: 'numeric' }), desktop: 0 };
      }
    } else if (dataBody.range == 'WEEK') {
      date.setTime(date.getTime() + ((new Date(dataBody.end).getTime() - new Date(dataBody.start).getTime()) / 4) * (i + 1));
      startWeek.setTime(startWeek.getTime() + ((new Date(dataBody.end).getTime() - new Date(dataBody.start).getTime()) / 4) * i);

      const foundData = data.find((v) => {
        return new Date(v.date).getTime() <= date.getTime() && new Date(v.date).getTime() > startWeek.getTime();
      });

      if (foundData) {
        return { date: startWeek.toLocaleString(undefined, { day: '2-digit', month: 'long', year: 'numeric' }), desktop: foundData.total_revenue };
      } else {
        return { date: startWeek.toLocaleString(undefined, { day: '2-digit', month: 'long', year: 'numeric' }), desktop: 0 };
      }
    } else if (dataBody.range == 'MONTH') {
      date.setMonth(date.getMonth() + (i + 1));
      const foundData = data.find((v) => {
        return new Date(v.date).getMonth() === date.getMonth() && new Date(v.date).getFullYear() === date.getFullYear();
      });
      if (foundData) {
        return { date: date.toLocaleString(undefined, { day: '2-digit', month: 'long', year: 'numeric' }), desktop: foundData.total_revenue };
      } else {
        return { date: date.toLocaleString(undefined, { day: '2-digit', month: 'long', year: 'numeric' }), desktop: 0 };
      }
    }
  });

  const chartConfig = {
    desktop: {
      label: 'date',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full px-10 flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <p className="text-5xl">Hi {profile.organizer_name} 👋</p>
        <div className="flex gap-1 items-center">
          <p>Report of </p>
          <Select onValueChange={(value: string) => setDataRange(value)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Week" defaultValue="week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="border h-40 px-4 py-6 rounded-xl flex flex-col gap-4 justify-start">
          <p className="text-xl">Revenue Total</p>
          <p className="text-5xl">
            Rp.
            {data.reduce((total, current) => {
              return total + parseInt(current.total_revenue);
            }, 0)}
          </p>
        </div>
        <div className="border h-40 px-4 py-6 rounded-xl flex flex-col gap-4 justify-start">
          <p className="text-xl">Transaction Total</p>
          <p className="text-5xl">
            {data.reduce((total, current) => {
              return total + parseInt(current.total_transaction);
            }, 0)}
          </p>
        </div>
        <div className="border h-40 px-4 py-6 rounded-xl flex flex-col gap-4 justify-start">
          <p className="text-xl">Attendee Total</p>
          <p className="text-5xl">
            {data.reduce((total, current) => {
              return total + parseInt(current.total_seat);
            }, 0)}
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={dateData} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
