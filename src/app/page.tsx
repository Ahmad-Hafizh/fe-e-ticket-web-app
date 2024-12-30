// import EventCard from '@/components/global-components/EventCard';
// import RoundedCard from '@/components/global-components/RoundedCard';
"use client";
import TopEvent from "../components/views/landing/TopEvent";
import Jumbotron from "../components/views/landing/Jumbotron";
import EventCarousel from "../components/views/landing/EventCarousel";
import Footer from "@/components/global-components/Footer";
import CarouselRounded from "@/components/global-components/CarouselRounded";
import Category from "../components/views/landing/Category";
import { basicGetApi } from "./config/axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [allEvent, setAllEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getApi = async () => {
    try {
      setIsLoading(true);
      const response = await basicGetApi.get("/event/all");
      console.log("ini event all", response.data);
      setAllEvent(response);
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
      <div className="bg-white w-full h-full px-10 md:px-32 lg:px-48 py-10 flex flex-col gap-20">
        {/**Component Slider Jumbotron */}
        <Jumbotron apicall="/event?cat=Music" />
        {/**Component Slider Event (Event pilihan) */}
        <EventCarousel
          label="Event Picked for You"
          apicall="/event?cat=Music"
        />
      </div>
      {/**Component Slider Rounded (kategori) */}
      <div className="bg-blue-900">
        <div className=" w-full h-full px-10 md:px-32 lg:px-48 py-10 flex flex-col gap-20">
          <TopEvent />
        </div>
      </div>
      <div className="bg-white w-full h-full px-10 md:px-32 lg:px-48 py-10 flex flex-col gap-20">
        <EventCarousel
          label="Event in your location"
          apicall="/event?city=Surabaya"
        />
      </div>
      <div className="bg-white w-full h-full px-10 md:px-32 lg:px-48 py-10 flex flex-col gap-20">
        <CarouselRounded label="Creator" apicall="/event?city=Surabaya" />
      </div>
      <div className="bg-white w-full h-full px-10 md:px-32 lg:px-48 py-10 flex flex-col gap-20">
        <Category label="Category" apicall="/event?city=Surabaya" />
      </div>

      {/**Component List Event (Top event) */}
      {/**Component Slider Event (Event by city) */}
      {/**Component Banner */}
      {/**Component Slider Rounded (creator) */}
      {/**Component Slider Event (Event by top rated) */}
      <Footer />
    </>
  );
}
