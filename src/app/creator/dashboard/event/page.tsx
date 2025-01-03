'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { basicGetApi } from '@/app/config/axios';
import { useAppSelector } from '@/lib/redux/hooks';
import { DataTable } from './DataTable';
import { columns, Event } from './columns';

const EventPage = () => {
  const organizer = useAppSelector((state) => state.organizerReducer);

  const [eventList, setEventList] = useState<Event[]>([]);
  const getEventList = async () => {
    try {
      const response = await basicGetApi.get(`/event?eo=${organizer.organizer_id}`);
      console.log(response.data.result);
      setEventList(response.data.result);
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
        </div>
      </div>
      <div>
        <DataTable columns={columns} data={eventList} />
      </div>
    </div>
  );
};

export default EventPage;
