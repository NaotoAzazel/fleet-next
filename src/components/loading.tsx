import { Icons } from "@/components/icons"; 
import { cn } from "@/lib/utils";

interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement> {};

export default function Loading({
  className
}: LoadingProps) {
  return (
    <div className={cn(
      "inline-flex items-center justify-center text-muted-foreground p-24",
      className
    )}
    >
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      <p>Загрузка...</p>
    </div>
  )
}