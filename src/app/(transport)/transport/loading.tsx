import { Header } from "@/components/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";

import { Skeleton } from "@/components/ui/skeleton";

import { ProductCard } from "./_components/product-card";

export default function TransportPageLoading() {
  return (
    <MaxWidthWrapper>
      <div className="grid flex-1 my-7">
        <Header 
          heading="Список доступного транспорта" 
          text="Резервируйте транспорт в один клик" 
        />
         <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between lg:justify-normal">
          <Skeleton className="w-full h-10 px-3" />
          <div className="flex gap-2 sm:overflow-x-visible sm:justify-normal justify-between flex-row items-center">
            <Skeleton className="h-10 w-full lg:w-[180px] px-3" />
            <Skeleton className="h-10 w-full lg:w-[180px] px-3" />
          </div>
        </div>

        <div className="my-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array(8).fill(0).map((_, i) => (
            <ProductCard.Skeleton key={i} />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}