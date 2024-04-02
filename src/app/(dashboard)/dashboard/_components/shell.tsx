import { cn } from "@/lib/utils";

interface DashboardShellProps 
  extends React.HTMLAttributes<HTMLDivElement> {};

export default function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("grid items-start gap-4", className)} {...props}>
      {children}
    </div>
  )
}