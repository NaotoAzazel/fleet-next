import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function StatisticItem({ 
  username, 
  actions,
  createdAt
}: {
  username: string | null,
  actions: number,
  createdAt: Date | null
}) {
  return (
    <div className="flex items-center">
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">
          {username || "Некорректно имя"}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatDate(createdAt?.toDateString() || "Дату не найдено")}
        </p>
      </div>
      <div 
        className="ml-auto font-medium"
      >
        {actions}
      </div>
    </div>
  )
}

StatisticItem.Skeleton = function StatisticItemSkeleton() {
  return (
    <div className="flex items-center">
      <div className="space-y-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
      <div className="ml-auto">
        <Skeleton className="w-6 h-6" />
      </div>
    </div>
  )
}