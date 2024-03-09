import { Button } from "@/components/ui/button";
import { Transport } from "@/types";

export default function ProductCard({ post }: { post: Transport }) {
  return (
    <div className="border border-borderColor overflow-hidden rounded-[10px]">
      <div className="flex flex-col border-borderColor p-0">
        <div className="relative flex pb-48 inset-0">
          <div className="absolute inset-0">
            <div className="flex w-full h-full items-center justify-center bg-secondary">
              <img 
                // src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&height=900&width=1600&fit=bounds" 
                className="absolute h-full w-full inset-0 border-borderColor object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                alt="text"
              /> 
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