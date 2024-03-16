import { formatDate } from "@/lib/utils";

export default function StatisticItem({ 
  username, 
  actions,
  createdAt
}: {
  username: string,
  actions: number,
  createdAt: Date | null
}) {
  return (
    <div className="flex items-center">
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">
          {username}
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