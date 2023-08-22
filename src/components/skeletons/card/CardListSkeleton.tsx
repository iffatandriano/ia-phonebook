import React from "react";
import { Skeleton } from "../../ui/skeleton";

const CardListSkeleton = () => {
  return (
    <div className="mx-2 p-1 bg-white rounded-[8px]">
      <div className="py-2 px-4 flex flex-col gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index: number) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Skeleton className="w-14 h-14 rounded-full border border-gray-200" />

              <div className="flex flex-col">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardListSkeleton;
