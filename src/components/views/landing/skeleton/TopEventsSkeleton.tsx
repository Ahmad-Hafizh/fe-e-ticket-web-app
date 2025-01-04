import { Skeleton } from "@/components/ui/skeleton";
import exp from "constants";

const TopEventsSkeleton = () => {
  return (
    <div className="flex flex-col gap-7 w-full">
      <div className="flex justify-center items-center w-full lg:justify-start">
        <Skeleton className="mb-5 pt-0 w-1/3 h-8 lg:h-9 lg:w-1/4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 w-full ">
        <div className="flex gap-4 items-center justify-center lg:items-start lg:mb-10 cursor-pointer">
          <Skeleton className="text-6xl md:text-8xl lg:text-7xl font-black text-white" />
          <Skeleton className="relative w-full h-24 md:h-32 lg:h-60 rounded-xl shadow-lg overflow-hidden" />
        </div>
        <div className="flex gap-4 items-center justify-center lg:items-start lg:mb-10 cursor-pointer">
          <Skeleton className="text-6xl md:text-8xl lg:text-7xl font-black text-white" />
          <Skeleton className="relative w-full h-24 md:h-32 lg:h-60 rounded-xl shadow-lg overflow-hidden" />
        </div>
        <div className="flex gap-4 items-center justify-center lg:items-start lg:mb-10 cursor-pointer">
          <Skeleton className="text-6xl md:text-8xl lg:text-7xl font-black text-white" />
          <Skeleton className="relative w-full h-24 md:h-32 lg:h-60 rounded-xl shadow-lg overflow-hidden" />
        </div>
      </div>
    </div>
  );
};

export default TopEventsSkeleton;
