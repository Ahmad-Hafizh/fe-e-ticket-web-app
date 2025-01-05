import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const EventCarouselSkeleton = () => {
  return (
    <div className="flex flex-col py-0">
      <Skeleton className="text-2xl mb-12 pt-0 w-1/3 h-6 lg:h-7 lg:w-1/4" />
      <div className="w-full ">
        <Carousel className="w-full relative group">
          <CarouselContent>
            <CarouselItem className="basis-2/3 md:basis-1/3 lg:basis-1/4 py-5">
              <div className="flex flex-col justify-between border-none shadow-lg rounded-lg bg-white w-full">
                <Skeleton className="rounded-tr-lg rounded-tl-lg h-48" />
                <div className="py-3 px-5 md:py-4 flex-col flex gap-2">
                  <Skeleton className="w-full h-10 rounded-lg" />
                  <Skeleton className="w-full h-5 rounded-lg" />
                </div>
                <hr></hr>
                <div className="flex gap-3 items-center py-3 px-5 ">
                  <Skeleton className="rounded-full w-7 h-7 lg:w-9 lg:h-9" />
                  <Skeleton className="w-full h-10 rounded-lg" />
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="basis-2/3 md:basis-1/3 lg:basis-1/4 py-5">
              <div className="flex flex-col justify-between border-none shadow-lg rounded-lg bg-white w-full">
                <Skeleton className="rounded-tr-lg rounded-tl-lg h-48" />
                <div className="py-3 px-5 md:py-4 flex-col flex gap-2">
                  <Skeleton className="w-full h-10 rounded-lg" />
                  <Skeleton className="w-full h-5 rounded-lg" />
                </div>
                <hr></hr>
                <div className="flex gap-3 items-center py-3 px-5 ">
                  <Skeleton className="rounded-full w-7 h-7 lg:w-9 lg:h-9" />
                  <Skeleton className="w-full h-10 rounded-lg" />
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="basis-2/3 md:basis-1/3 lg:basis-1/4 py-5">
              <div className="flex flex-col justify-between border-none shadow-lg rounded-lg bg-white w-full">
                <Skeleton className="rounded-tr-lg rounded-tl-lg h-48" />
                <div className="py-3 px-5 md:py-4 flex-col flex gap-2">
                  <Skeleton className="w-full h-10 rounded-lg" />
                  <Skeleton className="w-full h-5 rounded-lg" />
                </div>
                <hr></hr>
                <div className="flex gap-3 items-center py-3 px-5 ">
                  <Skeleton className="rounded-full w-7 h-7 lg:w-9 lg:h-9" />
                  <Skeleton className="w-full h-10 rounded-lg" />
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="basis-2/3 md:basis-1/3 lg:basis-1/4 py-5">
              <div className="flex flex-col justify-between border-none shadow-lg rounded-lg bg-white w-full">
                <Skeleton className="rounded-tr-lg rounded-tl-lg h-48" />
                <div className="py-3 px-5 md:py-4 flex-col flex gap-2">
                  <Skeleton className="w-full h-10 rounded-lg" />
                  <Skeleton className="w-full h-5 rounded-lg" />
                </div>
                <hr></hr>
                <div className="flex gap-3 items-center py-3 px-5 ">
                  <Skeleton className="rounded-full w-7 h-7 lg:w-9 lg:h-9" />
                  <Skeleton className="w-full h-10 rounded-lg" />
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-3 hidden group-hover:flex" />
          <CarouselNext className="right-3 hidden group-hover:flex" />
        </Carousel>
      </div>
    </div>
  );
};

export default EventCarouselSkeleton;
