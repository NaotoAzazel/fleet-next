import MaxWidthWrapper from "@/components/max-width-wrapper";
import Header from "@/components/header";
import SortButton from "@/components/sort-button";
import { Input } from "@/components/ui/input";

export default function TransportPage() {
  return (
    <MaxWidthWrapper>
      <div className="grid flex-1 my-7">
        <Header heading="Список доступного транспорта" text="Резервируйте транспорт в один клик" />

        {/* <div className="flex flex-col mt-4 space-y-2 md:space-y-0 lg:space-x-2 sm:flex-row"> */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between lg:justify-normal">
          <SortButton />
          <Input 
            className="w-[240px]" 
            type="text" 
            placeholder="Найти транспорт..."
          />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}