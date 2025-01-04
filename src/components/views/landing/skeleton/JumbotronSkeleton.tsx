import { Skeleton } from "@/components/ui/skeleton";

const JumbotronSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="w-full h-96 rounded-xl" />
    </div>
  );
};

export default JumbotronSkeleton;
