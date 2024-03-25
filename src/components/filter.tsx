import Search from "@/components/search/search";
import SetStatus from "@/components/sort/set-status";
import SetSort from "@/components/sort/set-sort";

export default function Filter() {
  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between lg:justify-normal">
      <Search />
      <div className="flex gap-2 sm:overflow-x-visible sm:justify-normal justify-between flex-row items-center">
        <SetSort />
        <SetStatus />
      </div>
    </div>
  )
}