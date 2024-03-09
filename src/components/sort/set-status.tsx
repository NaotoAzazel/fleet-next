"use client"

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Button } from "@/config/buttons";

export default function SetStatus({
  buttons
}: { 
  buttons: Button[],
}) {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback(
    (selectedValue: string) => {
      let params = new URLSearchParams(window.location.search);
      if(selectedValue.length) params.set("s", selectedValue);
      else params.delete("s");

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      })
    }, [pathname, router]
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sortQuery = params.get("s") ?? "";
    setSelectedValue(sortQuery);
  }, [])

  useEffect(() => {
    handleClick(selectedValue);
  }, [selectedValue, handleClick])

  // TODO: remake this for combobox instead of use select
  return (
    <Select value={selectedValue} onValueChange={setSelectedValue}>
      <SelectTrigger className="lg:w-[180px]">
        <SelectValue placeholder="Статус" />
      </SelectTrigger>
      <SelectContent>
        {buttons.map(button => (
          <SelectItem
            key={button.value} 
            value={button.value}
          >
            {button.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}