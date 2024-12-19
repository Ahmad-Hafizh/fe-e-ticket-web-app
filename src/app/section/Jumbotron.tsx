"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Image from "next/image";

const Jumbotron = () => {
  const images = [
    {
      url: "/xample.jpg",
    },
    {
      url: "/xample.jpg",
    },
    {
      url: "/xample.jpg",
    },
    {
      url: "/xample.jpg",
    },
    {
      url: "/xample.jpg",
    },
  ];
  //Carousel Jumbotron
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="w-full ">
      <Carousel
        plugins={[plugin.current]}
        className="w-full relative"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((e, index) => (
            <CarouselItem key={index} className="basis-full ">
              <div className="rounded-xl overflow-hidden">
                <div className="relative w-full h-96 overflow-hidden">
                  <Image
                    src={e.url}
                    alt="jumbotron img"
                    fill
                    className="absolute"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="opacity-0 hover:opacity-100 w-full h-full absolute top-0 transition-opacity">
          <CarouselPrevious className="left-3" />
          <CarouselNext className="right-3" />
        </div>
      </Carousel>
    </div>
  );
  //Carousel Event Pilihan (Picked for you)
  //Carousel Category
};
export default Jumbotron;
