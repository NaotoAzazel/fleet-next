"use client"

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";

export default function Search() {
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  
  const handleSearchParams = useCallback(
    (debouncedValue: string) => {
      let params = new URLSearchParams(window.location.search);
      if (debouncedValue.length > 0) params.set("search", debouncedValue);
      else params.delete("search");

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      })
    }, [pathname, router]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search") ?? "";
    setInputValue(searchQuery);
  }, []);

  useEffect(() => {
    if (debouncedValue.length > 0 && !mounted) {
      setMounted(true);
    }
  }, [debouncedValue, mounted])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue)
    }, 500);

    return () => {
      clearTimeout(timer)
    };
  }, [inputValue]);

  useEffect(() => {
    if (mounted) handleSearchParams(debouncedValue);
  }, [debouncedValue, handleSearchParams, mounted])

  return (
    <Input 
      className="w-full" 
      type="text" 
      placeholder="Найти транспорт..."
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
    />
  )
}