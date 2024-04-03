import { Button } from "@/components/ui/button";
import { MyImage } from "@/components/image";

import { Transport } from "@/types";

export default function ProductCard({ post }: { post: Transport }) {
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