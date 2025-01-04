import { Skeleton } from "@/components/ui/skeleton";

const BannerSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-full h-64 rounded-xl shadow-md" />
    </div>
  );
};

export default BannerSkeleton;
