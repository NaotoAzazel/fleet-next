import { MyImage } from "@/components/image";
import { DetailDialog } from "./detail-dialog";
import ReserveButton from "./reserve-button";

import { Skeleton } from "@/components/ui/skeleton";

import { Transport } from "@/types";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function ProductCard({ post }: { post: Transport }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="border overflow-hidden rounded">
      <MyImage.Container>
        <MyImage 
          src={post.image} 
          className="absolute h-full w-full border-b rounded-none" 
        />
      </MyImage.Container>

      <div className="p-4">
        <h1>{post.name}</h1>
      </div>

      <div className="flex items-center p-4 pt-1">
        <div className="flex w-full items-center space-x-2">
          <ReserveButton 
            postId={post.id} 
            takeById={post.takeBy} 
            userId={session?.user.id} 
          />
          <DetailDialog post={post} />
        </div>
      </div>
    </div>
  )
}

ProductCard.Skeleton = function ProductCardSkeleton() {
  return (
    <div className="border overflow-hidden rounded">
      <MyImage.Container>
        <Skeleton className="rounded-none w-full py-24"/>
      </MyImage.Container>

      <div className="p-4">
        <Skeleton className="h-6 w-1/3" />
      </div>

      <div className="flex items-center p-4">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <Skeleton className="h-9 px-3 w-full"/>
          <Skeleton className="h-9 px-3 w-full"/>
        </div>
      </div>
    </div>
  )
}