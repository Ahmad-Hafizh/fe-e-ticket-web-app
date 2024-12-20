import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CircleFadingPlus } from 'lucide-react';
import Link from 'next/link';

const Event = () => {
  return (
    <div className="px-10 flex flex-col gap-4">
      <div className="flex justify-between ">
        <Input type="text" placeholder="Search your events" className="w-96" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">A-Z</SelectItem>
            <SelectItem value="dark">Oldest Event</SelectItem>
            <SelectItem value="system">Active</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Tabs defaultValue="all" className="w-full flex flex-col gap-2">
          <TabsList className="w-fit">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="unactive">Unactive</TabsTrigger>
          </TabsList>
          <div className="w-full bg-[#f5f5f5] min-h-[65vh] rounded-xl p-4 grid grid-cols-4 gap-10">
            <Link href="/creator/dashboard/event/new-event" className="w-full bg-white rounded-lg h-80 shadow-md flex flex-col justify-center items-center gap-4 cursor-pointer">
              <CircleFadingPlus className="w-20 h-20" />
              <p className="text-xl">New Event</p>
            </Link>
            <TabsContent value="all">All events list</TabsContent>
            <TabsContent value="active">Active events list</TabsContent>
            <TabsContent value="draft">Draft events list</TabsContent>
            <TabsContent value="unactive">Unactive events list</TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Event;
