/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface IEventData {
  eventDataFromLandingPage: any[];
}

const Banner: React.FC<IEventData> = ({ eventDataFromLandingPage }) => {
  const [eventData, setEventData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRouter();

  useEffect(() => {
    setEventData(eventDataFromLandingPage);
    setLoading(false);
  }, []);

  return (
    <div className="w-full h-64 rounded-xl shadow-md overflow-hidden cursor-pointer" onClick={() => route.push(`/event/${eventData[0]?.title}`)}>
      <img src={eventData[0]?.imgEvent} className="w-full h-full object-cover" />
    </div>
  );
};

export default Banner;
