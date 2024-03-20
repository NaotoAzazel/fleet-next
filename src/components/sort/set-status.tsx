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
import { statusParams } from "@/config/filter-options";

export default function SetStatus() {
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback(
    (selectedValue: string) => {
      let params = new URLSearchParams(window.location.search);
      if(selectedValue.length) params.set("status", selectedValue);
      else params.delete("status");

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      })
    }, [pathname, router]
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const statusQuery = params.get("status") ?? "";

    const isValid = statusParams.find(param => param.value === statusQuery);
    setValue(isValid ? statusQuery : "");
  }, [])

  useEffect(() => {
    if(value === "reset") {
      setValue("");
    }; 

    handleClick(value);
  }, [value, handleClick])

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="lg:w-[180px]">
        <SelectValue placeholder="Статус" />
      </SelectTrigger>
      <SelectContent>
        {statusParams.map(status => (
          <SelectItem
            key={status.value} 
            value={status.value}
          >
            {status.label}
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