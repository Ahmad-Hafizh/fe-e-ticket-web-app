import EventCard from "@/components/global-components/EventCard";
import RoundedCard from "@/components/global-components/RoundedCard";
import TopEvent from "./section/TopEvent";
import Jumbotron from "./section/Jumbotron";
import EventCarousel from "./section/EventCarousel";
import NavbarComponent from "@/components/global-components/Navbar";
import Footer from "@/components/global-components/Footer";
import { Carousel } from "@/components/ui/carousel";
import CarouselRounded from "@/components/global-components/CarouselRounded";
import Category from "./section/Category";


export default function Home() {
  const fakedData = [
    {
      linkHref: "https://google.com",
      imgSrc:
        "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=3603&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "This is an example",
    },
    {
      linkHref: "https://google.com",
      imgSrc:
        "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=3603&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "This is an example",
    },
    {
      linkHref: "https://google.com",
      imgSrc:
        "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=3603&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "This is an example",
    },
  ];

  return (
    <>
      <NavbarComponent />
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
