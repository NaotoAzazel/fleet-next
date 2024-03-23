import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function Header({
  heading,
  text,
  children,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <h1 className="font-heading font-bold text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}

interface HeaderSkeletonProps 
  extends HeaderProps {};

Header.Skeleton = function HeaderSkeleton({
  heading,
  text,
  children,
}: HeaderSkeletonProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1 w-full">
        <h1 className="font-heading font-bold text-3xl md:text-4xl">{heading}</h1>
        {text && <Skeleton className="h-6 w-1/3" />}
      </div>
      {children}
    </div>
  )
}