import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageProps 
  extends React.ImgHTMLAttributes<HTMLImageElement> {};

export function Image({ 
  className,
  src,
 }: ImageProps) {
  if(!src) {
    return (
      <div 
        className={cn(
          "rounded py-20 w-full flex flex-col items-center", 
          className
        )}
      >
        <p className="text-muted-foreground text-sm">Картинку не найдено</p>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt="Product-Image"
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={cn(
        "inset-0 object-cover rounded",
        className
      )}
    />
  )
}

interface ImageSkeletonProps 
  extends React.ImgHTMLAttributes<HTMLImageElement> {};

Image.Skeleton = function ImageSkeleton({
  className
}: ImageSkeletonProps) {
  return (
    <Skeleton className={cn("py-20 w-full", className)} />
  )
}

interface SmallImageProps 
  extends React.ImgHTMLAttributes<HTMLImageElement> {};

Image.Small = function SmallImage({
  src,
  className
}: SmallImageProps) {
  if(!src) {
    return (
      <div 
        className={cn(
          "py-3 px-4 border rounded flex flex-row items-center", 
          className
        )}
      >
        <Icons.image className="w-4 h-4 text-muted-foreground" />
      </div>
    )
  }

  return (
    <img
      src={src}
      className={cn("w-12 h-10 object-cover rounded", className)}
    />
  )
}

interface SmallImageSkeletonProps 
  extends React.ImgHTMLAttributes<HTMLImageElement> {};

Image.SmallSkeleton = function SmallImageSkeleton({
  className
}: SmallImageSkeletonProps) {
  return (
    <Skeleton className={cn("w-12 h-10", className)} />
  )
}