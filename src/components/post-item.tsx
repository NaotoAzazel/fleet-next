import { formatDate } from "@/lib/utils";
import { Transport } from "@/types";

import PostOperations from "@/components/post-operations";
import { Image } from "@/components/image";

import { Skeleton } from "@/components/ui/skeleton";

export function PostItem({ post }: { post: Transport }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-row items-center">
        <Image.Small src={post.image} />
        <div className="grid gap-1 ml-2">
          <p className="font-heading font-bold">{post.name}</p>
          <div>
            <p className="text-sm text-muted-foreground">
              {post.category.name} | {post.color.name} | {post.plate} | {formatDate(post.createdAt?.toDateString())}
            </p>
          </div>
        </div>
      </div>
      <PostOperations post={post} />
    </div>
  )
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="flex flex-row items-center p-4">
      <Image.SmallSkeleton />
      <div className="grid gap-1 ml-2 w-full">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}