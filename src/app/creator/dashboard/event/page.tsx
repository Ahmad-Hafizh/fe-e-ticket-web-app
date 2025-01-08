'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { basicGetApi } from '@/app/config/axios';
import { DataTable } from './DataTable';
import { columns, Event } from './columns';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LuPlus } from 'react-icons/lu';
const EventPage = () => {
  const route = useRouter();

  const [eventList, setEventList] = useState<Event[]>([]);
  const getEventList = async () => {
    try {
      const response = await basicGetApi.get(`/search?eo=11&page=1`);
      console.log('ini', response.data.result);
      setEventList(response.data.result.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEventList();
  }, []);

  console.log(eventList);

  return (
    <div className="px-10 flex flex-col gap-4">
      <div className="flex justify-between ">
        <Input type="text" placeholder="Search your events" className="w-96" />
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">All</SelectItem>
              <SelectItem value="dark">Active</SelectItem>
              <SelectItem value="system">Draft</SelectItem>
              <SelectItem value="system">Unactive</SelectItem>
            </SelectContent>
          </Select>
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

          <Button variant={'secondary'} onClick={() => route.push('event/new-event')} className="flex justify-between gap-5 shadow-sm">
            New Event <LuPlus />
          </Button>
        </div>
      </div>
      <div>
        <DataTable columns={columns} data={eventList} />
      </div>
    </div>
  );
};

export default EventPage;
