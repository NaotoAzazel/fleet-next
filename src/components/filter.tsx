"use client"

import SortButton from "./sort-button";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

const sortParams = [
  { name: "Алфавит: А-Я", value: "alp-asc" },
  { name: "Алфавит: Я-А", value: "alp-desc" }
];

const statusParams = [
  { name: "Доступна", value: "avai" },
  { name: "Недоступна", value: "unavai" }
];

export default function Filter() {
  const searchParams = useSearchParams().toString();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();

  const [search, setSearch] = useState<string>(params.get("s") || "");
  const [status, setStatus] = useState<string>(params.get("status") || "");
  const [sort, setSort] = useState<string>(params.get("sort") || "");
  
  useEffect(() => {
    const encodedSearch = encodeURI(search);

    if(search.length) params.set("s", encodedSearch);
    else params.delete("s");
    router.push(`/transport?${params.toString()}`);
  }, [search]);

  useEffect(() => {
    const encodedSearch = encodeURI(sort);

    if(sort.length) params.set("sort", encodedSearch);
    else params.delete("sort");
    router.push(`/transport?${params.toString()}`);
  }, [sort])

  useEffect(() => {
    const encodedSearch = encodeURI(status);

    if(status.length) params.set("status", encodedSearch);
    else params.delete("status");
    router.push(`/transport?${params.toString()}`);
  }, [status])

  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between lg:justify-normal">
      <Input 
        className="w-full md:w-[240px]" 
        type="text" 
        placeholder="Найти транспорт..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="flex gap-2 w-full sm:justify-normal justify-between flex-row items-center">
        <SortButton 
          placeholder="Сортировка" 
          buttons={sortParams}
          value={sort}
          onValueChange={setSort}
        />
        <SortButton 
          placeholder="Статус" 
          buttons={statusParams} 
          value={status}
          onValueChange={setStatus}
        />
      </div>
    </div>
  )
}