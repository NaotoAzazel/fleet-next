import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface StatisticCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function StatisticCard({
  className,
  children,
  ...props
}: StatisticCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface StatisticCardSection
  extends React.HTMLAttributes<HTMLDivElement> {}

StatisticCard.Section = function StatisticCardSection({
  className,
  children
}: StatisticCardSection) {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  )
}

interface StatisticCardLabel
  extends React.HTMLAttributes<HTMLDivElement> {}

StatisticCard.Label = function StatisticCardLabel({
  className,
  ...props
}: StatisticCardLabel) {
  return (
    <h3
      className={cn("tracking-tight text-sm font-medium", className)}
      {...props}
    />
  )
}

interface StatisticCardDescription
  extends React.HTMLAttributes<HTMLDivElement> {}

StatisticCard.Description = function StatisticCardDescription({
  className,
  ...props
}: StatisticCardDescription) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}


interface StatisticCardIcon
  extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof Icons
}

StatisticCard.Icon = function StatisticCardIcon({
  name,
  className,
  ...props
}: StatisticCardIcon) {
  const Icon = Icons[name];

  if(!Icon) { 
    return null;
  }

  return (
    <Icon
      className={cn("h-4 w-4 text-gray-400", className)} 
      {...props} 
    />
  )
}

interface StatisticCardAmount 
  extends React.HTMLAttributes<HTMLHeadingElement> {}

StatisticCard.Amount = function StatisticCardAmount({
  className,
  ...props
}: StatisticCardAmount) {
  return (
    <h2
      className="text-2xl font-bold"
      {...props}
    />
  )
}