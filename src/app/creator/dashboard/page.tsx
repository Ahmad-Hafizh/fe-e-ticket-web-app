'use client';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const DashboardPage = () => {
  const chartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 },
  ];
  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full px-10 flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <p className="text-5xl">Hi Organizer</p>
        <div className="flex gap-1 items-center">
          <p>Report of</p>
          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Today" defaultValue="today" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
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
          <p className="text-5xl">$400000</p>
        </div>
        <div className="border h-40 px-4 py-6 rounded-xl flex flex-col gap-4 justify-start">
          <p className="text-xl">Events Total</p>
          <p className="text-5xl">40</p>
        </div>
        <div className="border h-40 px-4 py-6 rounded-xl flex flex-col gap-4 justify-start">
          <p className="text-xl">Attendee Total</p>
          <p className="text-5xl">400</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[60vh]">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
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
