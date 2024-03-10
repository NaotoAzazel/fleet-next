"use client"

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectSeparator, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { sortParams } from "@/config/filter-options";

export default function SetSort() {
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback(
    (selectedValue: string) => {
      let params = new URLSearchParams(window.location.search);
      if(selectedValue.length) params.set("sort", selectedValue);
      else params.delete("sort");

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      })
    }, [pathname, router]
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sortQuery = params.get("sort") ?? "";

    const isValid = sortParams.find(param => param.value === sortQuery);
    setValue(isValid ? sortQuery : "");
  }, [])

  useEffect(() => {
    if(value === "reset") {
      setValue("");
    }; 
    
    handleClick(value);
  }, [value, handleClick])

  return (
    <Select 
      value={value}
      onValueChange={setValue}
    >
      <SelectTrigger className="lg:w-[180px]">
        <SelectValue placeholder="Сортировка" />
      </SelectTrigger>
      <SelectContent>
        {sortParams.map(sort => (
          <SelectItem
            key={sort.value} 
            value={sort.value}
          >
            {sort.label}
          </SelectItem>
        ))}
        {value.length > 1 && (
          <div>
            <SelectSeparator />
            <SelectItem value="reset">
              Сбросить
            </SelectItem>
          </div>
        )}
      </SelectContent>
    </Select>
  )
}