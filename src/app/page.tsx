// import EventCard from '@/components/global-components/EventCard';
// import RoundedCard from '@/components/global-components/RoundedCard';
'use client';
import TopEvent from '../components/views/landing/TopEvent';
import Jumbotron from '../components/views/landing/Jumbotron';
import EventCarousel from '../components/views/landing/EventCarousel';
import EventCarouselLocation from '../components/views/landing/EventCarouselLocation';
import Footer from '@/components/global-components/Footer';
import CarouselRounded from '@/components/global-components/CarouselRounded';
import Category from '../components/views/landing/Category';
import { basicGetApi } from './config/axios';
import { useEffect, useState } from 'react';
import Banner from '@/components/views/landing/Banner';
import JumbotronSkeleton from '@/components/views/landing/skeleton/JumbotronSkeleton';
import EventCarouselSkeleton from '@/components/views/landing/skeleton/EventCarouselSkeleton';
import BannerSkeleton from '@/components/views/landing/skeleton/Banner';
import TopEventsSkeleton from '@/components/views/landing/skeleton/TopEventsSkeleton';
import CarouselRoundedSkeleton from '@/components/views/landing/skeleton/CarouselRoundedSkeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const [allEvent, setAllEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getApi = async () => {
    try {
      setIsLoading(true);
      const response = await basicGetApi.get('/event/');
      console.log('ini event all', response.data.result);
      setAllEvent(response.data.result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      {/* <div className="bg-gradient-to-tr from-[#FFB457] to-[#FF705B] w-full h-full px-14 md:px-32 lg:px-48 py-20"> */}
      <div className="bg-white w-full h-full py-14 px-10 md:px-32 lg:px-48 lg:py-20 lg:pb-24 flex flex-col gap-14 lg:gap-20 ">
        {/**Component Slider Jumbotron */}

        {allEvent?.topEvents ? <Jumbotron eventDataFromLandingPage={allEvent.topEvents} /> : <JumbotronSkeleton />}

        {/**Component Slider Event (Event pilihan) */}
        {allEvent?.topEvents ? <EventCarousel label="Event Picked for You" eventDataFromLandingPage={allEvent.categories} /> : <EventCarouselSkeleton />}
      </div>
      {/**Component Slider Rounded (kategori) */}
      <div className="bg-blue-950">
        <div className=" w-full h-full px-10 md:px-32 lg:px-48 py-16 lg:py-20 flex flex-col gap-20">{allEvent?.topEvents ? <TopEvent eventData={allEvent.topEvents} /> : <TopEventsSkeleton />}</div>
      </div>

      <div className="bg-white w-full h-full px-10 md:px-32 lg:px-48 py-12 lg:py-20 flex flex-col gap-20">{allEvent?.location ? <EventCarouselLocation eventDataFromMain={allEvent.location} /> : <EventCarouselSkeleton />}</div>
      <div className="bg-white w-full h-full px-10 md:px-32 py-8 lg:py-10 lg:px-48 flex flex-col gap-20">{allEvent?.categories ? <Banner eventDataFromLandingPage={allEvent.categories} /> : <BannerSkeleton />}</div>
      <div className="bg-white w-full h-full px-10 md:px-32 lg:px-48 py-8 lg:py-12 flex flex-col gap-20">{allEvent?.location ? <CarouselRounded eventDataFromMain={allEvent.organizer} /> : <CarouselRoundedSkeleton />}</div>
      <div className="bg-white w-full h-full px-10 md:px-32 lg:px-48 py-16 lg:py-20 lg:pb-28 flex flex-col gap-20">
        {allEvent?.topEvents ? <EventCarousel label="Nature Inspired" eventDataFromLandingPage={allEvent.categories} /> : <EventCarouselSkeleton />}
      </div>
      <div className="flex justify-center items-center pb-16">
        <Link href="/search">
          <Button variant={'secondary'}>Check More Events</Button>
        </Link>
      </div>
      {/* <div className="bg-white w-full h-full px-10 md:px-32 lg:px-48 py-10 flex flex-col gap-20">
        <Category label="Category" apicall="/search?city=Surabaya" />
      </div> */}

      {/**Component List Event (Top event) */}
      {/**Component Slider Event (Event by city) */}
      {/**Component Banner */}
      {/**Component Slider Rounded (creator) */}
      {/**Component Slider Event (Event by top rated) */}
      <Footer />
    </>
  );
}
