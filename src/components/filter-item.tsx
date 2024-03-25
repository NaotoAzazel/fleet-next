import { FilterItem, FilterType } from "@/types";

import { Skeleton } from "@/components/ui/skeleton";
import FilterOperations from "@/components/filter-operations";

export function FilterItem({ 
  data, 
  filterType 
}: { 
  data: FilterItem,
  filterType: FilterType
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <p className="font-heading font-bold">{data.name}</p>
      </div>
      <FilterOperations post={data} filterType={filterType} />  
    </div>
  )
}

FilterItem.Skeleton = function FilterItemSkeleton() {
  return (
    <div className="p-4">
      <Skeleton className="h-6 w-1/6" />
    </div>
  )
}