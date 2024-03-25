import { Button } from "@/components/ui/button";
import { Image } from "@/components/image";

import { Transport } from "@/types";

export default function ProductCard({ post }: { post: Transport }) {
  return (
    <div className="border overflow-hidden rounded">
      <div className="flex flex-col p-0">
        <div className="relative flex pb-48 inset-0">
          <div className="absolute inset-0">
            <div className="flex w-full h-full items-center justify-center">
              <Image src={post.image} className="absolute h-full w-full border-b rounded-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h1>{post.name}</h1>
      </div>

      <div className="flex items-center p-4">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
          >
            Подробнее
          </Button>
          <Button 
            size="sm" 
            className="w-full" 
          >
            Вернуть
          </Button>
        </div>
      </div>
    </div>
  )
}