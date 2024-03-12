import { formatDate } from "@/lib/utils";
import { Transport } from "@/types";
import PostOperations from "./post-operations";

export default function PostItem({ post }: { post: Transport }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <p className="font-heading font-bold">{post.name}</p>
        <div>
          <p className="text-sm text-muted-foreground">
            {post.category.name} | {post.color.name} | {post.plate} | {formatDate(post.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <PostOperations post={post} />
    </div>
  )
}