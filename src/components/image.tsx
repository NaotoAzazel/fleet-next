import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";

interface ImageProps 
  extends React.ImgHTMLAttributes<HTMLImageElement> {};

export function MyImage({ 
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
    <Image
      fill
      src={src.startsWith("data:image/") 
        ? src
        : `https://ucarecdn.com/${src}/-/preview/800x600/`
      }
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

interface ImageContainerProps 
  extends React.ImgHTMLAttributes<HTMLImageElement> {};

MyImage.Container = function ImageContainer({
  children
}: ImageContainerProps) {
  return (
    <div className="flex flex-col p-0">
      <div className="relative flex pb-48 inset-0">
        <div className="absolute inset-0">
          <div className="flex w-full h-full items-center justify-center absolute">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ImageSkeletonProps 
  extends React.ImgHTMLAttributes<HTMLImageElement> {};

MyImage.Skeleton = function ImageSkeleton({
  className
}: ImageSkeletonProps) {
  return (
    <Skeleton className={cn("py-20 w-full", className)} />
  )
}

interface SmallImageProps 
  extends React.ImgHTMLAttributes<HTMLImageElement> {};

MyImage.Small = function SmallImage({
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
    <Image
      width={74}
      height={110}
      alt="Small-image"
      loading="lazy"
      src={`https://ucarecdn.com/${src}/-/preview/300x220/`}
      className={cn("w-12 h-10 object-cover rounded", className)}
    />
  )
}

interface SmallImageSkeletonProps 
  extends React.ImgHTMLAttributes<HTMLImageElement> {};

MyImage.SmallSkeleton = function SmallImageSkeleton({
  className
}: SmallImageSkeletonProps) {
  return (
    <Skeleton className={cn("w-12 h-10", className)} />
  )
}