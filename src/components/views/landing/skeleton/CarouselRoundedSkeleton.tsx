import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const CarouselRoundedSkeleton = () => {
  return (
    <div className="flex flex-col py-0">
      <Skeleton className="text-2xl font-bold mb-12 pt-0 w-1/3 h-6 lg:h-7 lg:w-1/4" />
      <div className="w-full ">
        <Carousel className="w-full relative">
          <CarouselContent>
            <CarouselItem className="basis-2/3 md:basis-1/2 lg:basis-1/5 py-4">
              <div className="flex flex-col gap-4 items-center">
                <Skeleton className="rounded-full w-24 h-24 lg:w-32 lg:h-32" />
                <Skeleton className="rounded-lg w-1/3 h-6 lg:w-1/3 lg:h-6" />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-2/3 md:basis-1/2 lg:basis-1/5 py-4">
              <div className="flex flex-col gap-4 items-center">
                <Skeleton className="rounded-full w-24 h-24 lg:w-32 lg:h-32" />
                <Skeleton className="rounded-lg w-1/3 h-6 lg:w-1/3 lg:h-6" />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-2/3 md:basis-1/2 lg:basis-1/5 py-4">
              <div className="flex flex-col gap-4 items-center">
                <Skeleton className="rounded-full w-24 h-24 lg:w-32 lg:h-32" />
                <Skeleton className="rounded-lg w-1/3 h-6 lg:w-1/3 lg:h-6" />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-2/3 md:basis-1/2 lg:basis-1/5 py-4">
              <div className="flex flex-col gap-4 items-center">
                <Skeleton className="rounded-full w-24 h-24 lg:w-32 lg:h-32" />
                <Skeleton className="rounded-lg w-1/3 h-6 lg:w-1/3 lg:h-6" />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-2/3 md:basis-1/2 lg:basis-1/5 py-4">
              <div className="flex flex-col gap-4 items-center">
                <Skeleton className="rounded-full w-24 h-24 lg:w-32 lg:h-32" />
                <Skeleton className="rounded-lg w-1/3 h-6 lg:w-1/3 lg:h-6" />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-2/3 md:basis-1/2 lg:basis-1/5 py-4">
              <div className="flex flex-col gap-4 items-center">
                <Skeleton className="rounded-full w-24 h-24 lg:w-32 lg:h-32" />
                <Skeleton className="rounded-lg w-1/3 h-6 lg:w-1/3 lg:h-6" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="opacity-0 hover:opacity-100 w-full h-full absolute top-0 transition-opacity">
            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3 md:right-9" /> 
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselRoundedSkeleton;
